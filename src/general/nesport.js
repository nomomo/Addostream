import * as utils from "libs/nomo-utils.js";
import {m3u8_override} from "general/m3u8player.js";
import {ADD_send_sys_msg_from_main_frame} from "chat/send_message.js";
const ADD_DEBUG = utils.ADD_DEBUG;

export function get_nesports_playlist(url){
    ADD_DEBUG("get_nesports_playlist", url);
    // https://game.naver.com/esports/League_of_Legends/live/lck_2023_spring
    if(url.indexOf("https://game.naver.com/esports/") == -1){
        return false;
    }

    let match = url.match(/https:\/\/game\.naver\.com\/esports\/([a-zA-Z0-9가-힣-_!@#$%^&*]+)\/live\/([a-zA-Z0-9가-힣-_!@#$%^&*]+)/i);

    if(match !== null && match.length > 2){
        let loungeId = match[1];
        let season = match[2];

        let queryurl = `https://esports-api.game.naver.com/service/v1/match/liveContents/${season}?loungeId=${loungeId}`;

        // let response = fetch(queryurl, {
        //     "headers": {
        //     },
        //     "mode": 'no-cors',
        //     "referrer": "https://game.naver.com/esports/League_of_Legends/live/lck_2023_spring",
        // }).then(response => {
        //     console.log("got response", response);
        // });

        GM_xmlhttpRequest({
            url:queryurl,
            method: "GET",
            headers: {
                "Content-Type": "application/javascript"
            },
            timeout: 2000,
            onload: async function(response){
                if(response.status !== 200){
                    ADD_DEBUG("esports 파싱 중 에러 발생 - status !== 200", response);
                    ADD_send_sys_msg_from_main_frame("Esports 연결에 실패했습니다. status = " + response.status);
                    return;
                }

                var data = JSON.parse(response.responseText);
                ADD_DEBUG("naver esports", response, data);

                if(data.content === undefined || data.content.match === null || data.content.match === undefined) {
                    ADD_send_sys_msg_from_main_frame("라이브 중인 경기를 찾을 수 없거나, 파싱 중 알 수 없는 에러가 발생했습니다.");
                    return;
                }

                let offline = false;
                if(data.content.match.relay === undefined || data.content.match.relay.livePlayBack === undefined){
                    offline = true;
                }

                let livePlayBack;
                if(!offline){
                    livePlayBack = JSON.parse(data.content.match.relay.livePlayBack);
                    ADD_DEBUG("livePlayBack", livePlayBack);
                    if(livePlayBack === null || livePlayBack === undefined || livePlayBack.media === null || livePlayBack.media === undefined || livePlayBack.media.length === undefined) {
                        offline = true;
                    }
                }
                
                if(offline){
                    if(data.content.match.matchStatus && data.content.match.matchStatus === "BEFORE" && data.content.match.startDate){
                        let title = "";
                        let startDateNum = data.content.match.startDate;
                        let startDate = (new Date(startDateNum)).format("yyyy.MM.dd amp hh:mm");
                        title += `■ 다음 중계 일시 ■`;

                        // get match title
                        try{
                            if(data.content.match.title && data.content.match.nameAcronym){
                                title += `<br />${data.content.match.nameAcronym}<br />${data.content.match.title}`;
                            }
                        }
                        catch(e){
                            ADD_DEBUG("parsing error 1", e);
                        }

                        title += `<br />${startDate}`;

                        // get home-away team name
                        try{
                            if(data.content.match.homeTeam && data.content.match.homeTeam.nameEngAcronym && data.content.match.awayTeam && data.content.match.awayTeam.nameEngAcronym){
                                title += ` | ${data.content.match.homeTeam.nameEngAcronym}-${data.content.match.awayTeam.nameEngAcronym}`;
                            }
                        }
                        catch(e){
                            ADD_DEBUG("parsing error 2", e);
                        }
                        ADD_send_sys_msg_from_main_frame("<hr /><strong>라이브 중인 경기를 찾을 수 없습니다.</strong>");
                        
                        // get next match from predictionListPage
                        try{
                            if(data.content.predictionListPage && data.content.predictionListPage.matches && data.content.predictionListPage.matches.length && data.content.predictionListPage.matches.length > 0){
                                let foundOne = false;
                                let currentTimeNum = Number(new Date());
                                for(var i=0;i<data.content.predictionListPage.matches.length;i++){
                                    let game = data.content.predictionListPage.matches[i];
                                    if(game.matchStatus !== "BEFORE") continue;
                                    if(game.startDate <= startDateNum || game.startDate <= currentTimeNum) continue;
                                    if((game.startDate - currentTimeNum) > 1000 * 60 * 60 * 48) continue;
                                    if(!foundOne) {
                                        foundOne = true;
                                        title += "<br /><br />■ 48시간 내 경기 일정 ■";
                                    }                                    
                                    let gameStartDate = (new Date(game.startDate)).format("yyyy.MM.dd amp hh:mm");
                                    title += `<br />${gameStartDate} | ${game.homeTeam.nameEngAcronym}-${game.awayTeam.nameEngAcronym}`;
                                }
                            }
                        }
                        catch(e){
                            ADD_DEBUG("parsing error 3", e);
                        }

                        ADD_send_sys_msg_from_main_frame(`<strong>${title}</strong><hr />`);
                    }
                    else{
                        ADD_send_sys_msg_from_main_frame("라이브 중인 경기를 찾을 수 없거나, 파싱 중 알 수 없는 에러가 발생했습니다.");
                    }
                    return;
                }


                var found = false;
                var m3u8url = "";
                for(var i=0;i<livePlayBack.media.length;i++){
                    if(livePlayBack.media[i].mediaId === undefined || livePlayBack.media[i].mediaId !== "HLS" || livePlayBack.media[i].path === undefined) continue;
                    m3u8url = livePlayBack.media[i].path;
                    found =  true;
                    break;
                }

                if(found){
                    ADD_DEBUG("m3u8 url", m3u8url);
                    nomo_global.ADD_now_playing.display_name = "nesports";
                    ADD_send_sys_msg_from_main_frame(`Loading <a href="${m3u8url}">M3U8</a> video...`);
                    m3u8_override(m3u8url);
                }
                else{
                    ADD_send_sys_msg_from_main_frame("Esports 파싱에 실패했습니다.");
                }
            }, onerror: async function(e){
                ADD_send_sys_msg_from_main_frame("Esports 파싱 중 에러가 발생했습니다. " + e);
                ADD_DEBUG("esports 파싱 중 에러 발생 - onerror");
            }, ontimeout: async function(){
                ADD_send_sys_msg_from_main_frame("Esports 파싱 중 에러가 발생했습니다. (Timeout)");
                ADD_DEBUG("esports 파싱 중 에러 발생 - ontimeout");
            }
        });
    }
}

