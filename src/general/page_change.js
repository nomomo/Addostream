
import {ADD_streamer_nick} from "general/streamer-lib.js";
import nomo_const from "general/const.js";
import * as nomo_common from "general/common.js";
import * as utils from "libs/nomo-utils.js";
import {m3u8_override} from "general/m3u8player.js";
import {get_nesports_playlist} from "general/nesport.js";
const ADD_DEBUG = utils.ADD_DEBUG;

// 주소창의 주소가 변화(페이지 이동) 시 해야할 것을 아래 함수에 작성한다.
export function ADD_page_change($, global, document){
    $(global).on("hashchange", function(e){   // $(window).on("popstate hashchange", function(e){
        ADD_DEBUG("[page_change]", e);
        
        // 현재 url 확인
        var url_current = document.location.href.toLowerCase();

        // page 관련 global 변수 업데이트
        nomo_global.PAGE = nomo_common.ADD_get_page_type();
        nomo_global.PAGE_str = nomo_common.ADD_get_page_type_str();
        
        // 채팅인 경우 나감
        if(nomo_global.PAGE === nomo_const.C_UCHAT){
            return;
        }

        // if(nomo_global.PAGE === nomo_const.C_M3U8PLAYER){
        //     var m3u8_url = url_current.split("/#/m3u8/").pop();
        //     m3u8_override(m3u8_url);
        //     nomo_global.ADD_now_playing.display_name = "m3u8";
        // }

        // 스트림인 경우
        if(nomo_global.PAGE === nomo_const.C_STREAM){
            if(url_current.indexOf("/#/stream/m3u8/") !== -1){
                var m3u8_url = document.location.href.split("/#/stream/m3u8/").pop();
                m3u8_override(m3u8_url);
                nomo_global.ADD_now_playing.display_name = "m3u8";
            }
            else if(url_current.indexOf("/#/stream/nesports/") !== -1){
                var nesports_url = document.location.href.split("/#/stream/m3u8/").pop();
                get_nesports_playlist(nesports_url);
            }
            else{
                nomo_global.ADD_now_playing.id = url_current.split("/").pop();
                nomo_global.ADD_now_playing.display_name = ADD_streamer_nick(nomo_global.ADD_now_playing.id);
                nomo_global.ADD_now_playing.toonat_link = "";
                nomo_global.ADD_now_playing.twip_link = "";
            }
        }

        // 스트림 계속 이어 보기 관련
        if(ADD_config.popup_player && nomo_global.PAGE !== nomo_const.C_MAIN){
            $(".stream_zoomout").remove();
            $(".stream_zoomin_screen").remove();
        }

        // 재생 중 트위치<->멀티트위치 전환 버튼 ON-OFF
        var is_twitch = url_current.indexOf("/twitch/");
        var is_multitwitch = url_current.indexOf("/multitwitch/");
        if(ADD_config.playing_chat_button && is_twitch  !== -1 || is_multitwitch  !== -1){
            $("#ADD_change_multi").css("opacity", "1.0").fadeIn(300);
        }
        else{
            $("#ADD_change_multi").css("opacity", "0.0").hide(300);
        }

        // 도네이션 버튼 추가
        // if((ADD_config.playing_toonat_button || ADD_config.playing_twip_button) && (is_twitch  !== -1 || (is_multitwitch !== -1 && url_current.indexOf("&") === -1))){
        //     GM_xmlhttpRequest({
        //         url: "https://api.twitch.tv/api/channels/"+nomo_global.ADD_now_playing.id+"/panels?client_id="+nomo_const.ADD_CLIENT_ID_TWITCH,
        //         method: "GET",
        //         dataType:"json",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         onload: function (data) {
        //             var temp_response = utils.IsJsonStringReturn(data.responseText);
        //             ADD_DEBUG("Succeed", temp_response);
        //             $.each(temp_response, function(index, value){
        //                 if(value.data !== undefined && value.data.link !== undefined){
        //                     // 투네이션 버튼
        //                     if(ADD_config.playing_toonat_button && value.data.link.indexOf("toon.at/donate/") !== -1){
        //                         nomo_global.ADD_now_playing.toonat_link = value.data.link;
        //                         $("#ADD_toonation").stop(true,true).css("opacity", "1.0").fadeIn(300);
        //                         if($("#history_elem").length !== 0){
        //                             $("#history_elem").addClass("toonat_margin");
        //                         }
        //                         ADD_DEBUG("투네이션 링크를 찾았다");
        //                     }
                            
        //                     // 트윕 버튼
        //                     if(ADD_config.playing_twip_button && value.data.link.indexOf("twip.kr/") !== -1){
        //                         nomo_global.ADD_now_playing.twip_link = value.data.link;
        //                         $("#ADD_twip").stop(true,true).css("opacity", "1.0").fadeIn(300);
        //                         if($("#history_elem").length !== 0){
        //                             $("#history_elem").addClass("twip_margin");
        //                         }
        //                         ADD_DEBUG("트윕 링크를 찾았다");
        //                     }
        //                 }
        //             });

        //             // 투네이션 못 찾은 경우
        //             if(nomo_global.ADD_now_playing.toonat_link === ""){
        //                 ADD_DEBUG("투네이션 링크를 못 찾았다");
        //                 $("#ADD_toonation").stop(true,true).css("opacity", "0.0").hide(300);
        //                 if($("#history_elem").length !== 0){
        //                     $("#history_elem").removeClass("toonat_margin");
        //                 }
        //             }

        //             // 트윕 못 찾은 경우
        //             if(nomo_global.ADD_now_playing.twip_link === ""){
        //                 ADD_DEBUG("트윕 링크를 못 찾았다");
        //                 $("#ADD_twip").stop(true,true).css("opacity", "0.0").hide(300);
        //                 if($("#history_elem").length !== 0){
        //                     $("#history_elem").removeClass("twip_margin");
        //                 }
        //             }
        //         },
        //         onerror: function (err) {
        //             ADD_DEBUG("error", err);
        //             nomo_global.ADD_now_playing.toonat_link = "";
        //             nomo_global.ADD_now_playing.twip_link = "";
        //             $("#ADD_toonation").stop(true,true).css("opacity", "0.0").hide(300);
        //             $("#ADD_twip").stop(true,true).css("opacity", "0.0").hide(300);
        //             if($("#history_elem").length !== 0){
        //                 $("#history_elem").removeClass("toonat_margin").removeClass("twip_margin");
        //             }
        //         }
        //     });
        // }
        // else{
        //     $("#ADD_toonation").stop(true,true).css("opacity", "0.0").hide(300);
        //     $("#ADD_twip").stop(true,true).css("opacity", "0.0").hide(300);
        //     if($("#history_elem").length !== 0){
        //         $("#history_elem").removeClass("toonat_margin").removeClass("twip_margin");
        //     }
        // }


        // 재생 중 트윕 버튼 강제 설정
        // if(ADD_config.playing_twip_button_force && nomo_global.ADD_now_playing.twip_link === "" && (is_twitch  !== -1 || (is_multitwitch !== -1 && url_current.indexOf("&") === -1))){
        //     nomo_global.ADD_now_playing.twip_link = "https://twip.kr/donate/"+nomo_global.ADD_now_playing.id;
        //     ADD_config.playing_twip_button = false;
        //     $("#ADD_twip").stop(true,true).css("opacity", "1.0").fadeIn(300);
        //     if($("#history_elem").length !== 0){
        //         $("#history_elem").addClass("twip_margin");
        //     }
        // }
        // else if(nomo_global.ADD_now_playing.twip_link === ""){
        //     $("#ADD_twip").stop(true,true).css("opacity", "0.0").hide(300);
        //     if($("#history_elem").length !== 0){
        //         $("#history_elem").removeClass("twip_margin");
        //     }
        // }

        // 재생 중 퀵 리스트 버튼 보이기
        if(ADD_config.playing_quick_list_button && nomo_global.PAGE === nomo_const.C_STREAM){
            $("#ADD_quick_list").css("opacity", "1.0").fadeIn(300);
        }
        else{
            $("#ADD_quick_list").css("opacity", "0.0").hide(300);
        }

        // 재생 중 설정 버튼 숨기기
        if(!ADD_config.playing_setting_button){
            if(nomo_global.PAGE === nomo_const.C_MAIN){
                $("#ADD_config").css("opacity", "1.0").fadeIn(300);
            }
            else{
                $("#ADD_config").css("opacity", "0.0").hide();
            }
        }
        else{
            $("#ADD_config").css("opacity", "1.0").fadeIn(300);
        }

        // $(document).trigger("ADD_page_change");
        
    }).trigger("hashchange");
}