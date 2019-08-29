import {ADD_streamer_nick} from "general/streamer-lib.js";
import {ADD_DEBUG} from "libs/nomo-utils.js";

export async function external_insagirl(){
    ADD_DEBUG("인사걸에서 실행됨", document.location.href);
    var coord_prev_a = undefined;
    var coord_prev_count = 0;
    var $coord_prev = undefined;
    var coord_prev_nick = undefined;

    // 채팅 매니저 불러오기
    if(ADD_config.insagirl_block_by_nick){
        await chat_manager.reloadData();
    }

    $(document).arrive("#hrmbody > tr", {existing: true}, async (e) => {
    //$(document).on("DOMNodeInserted", "#hrmbody > tr", function (e){
        //var $target = $(e.target);
        var $target = $(e);
        if($target.hasClass("fired") || $target.prop("tagName").toLowerCase() !== "tr"){
            return false;
        }
        $target.addClass("fired");

        // 필수 정보 얻기
        var coord_nick = "";
        var $coord_a = $target.find("a").first();
        try{
            coord_nick = $target.text().split(")")[1].split(":").shift();
        }
        catch(err){
            ADD_DEBUG("error: coord_nick", err);
        }

        // 링크 존재 시
        if($coord_a !== undefined && $coord_a.length > 0){
            var coord_a = $coord_a.attr("href");
            //console.log(coord_a, coord_nick);
            
            // 채팅 매니저에 의한 차단
            if(ADD_config.insagirl_block_by_nick && chat_manager !== undefined && chat_manager.getIsBlock(coord_nick)){
                coord_prev_count = 0;
                ADD_DEBUG("채팅 매니저에 의한 차단", coord_nick);
                $target.remove();
            }
            // 도배에 의한 차단
            else if(ADD_config.insagirl_block_dobae && coord_prev_a === coord_a && (ADD_config.insagirl_block_dobae_by_href || (!ADD_config.insagirl_block_dobae_by_href && coord_prev_nick === coord_nick))){
                $target.remove();
                coord_prev_count = coord_prev_count + 1;
            }
            else { // 중복 아닐 시
                if(coord_prev_count > 1){
                    ADD_DEBUG("중복", coord_prev_count);
                    $coord_prev.find("td").first().append("<span class='fired' style='background-color:lightpink;border-radius:50%;margin-left:5px;white-space:nowrap;padding:5px;font-size:0.85em;' title='중복' alt='중복'>+"+coord_prev_count+"</span>");
                    coord_prev_count = 0;
                }

                // 트위치 링크인경우 이름 추가
                if(coord_a.toLowerCase().indexOf("dostream.com/#/stream/twitch/") !== -1 || coord_a.toLowerCase().indexOf("dostream.com/#/stream/multitwitch/") !== -1){
                    var ch_text = "";
                    var ch_streamer_id = coord_a.split("/").pop();

                    var temp_array = ch_streamer_id.split("&");
                    for (var j=0; j<temp_array.length; j++){
                        if(j !== 0){
                            ch_text = ch_text+"&";
                        }
                        var temp_id = ADD_streamer_nick(temp_array[j]);
                        ch_text = ch_text+temp_id;
                    }
                    if(ch_text !== undefined || ch_text !== ""){
                        $coord_a.after(" <span class='fired' style='font-weight:700;'>["+ch_text+"]</span>");
                    }
                }

                $coord_prev = $target;
            }
            coord_prev_a = coord_a;
            coord_prev_nick = coord_nick;
        }
        // 링크 존재하지 않을 시
        else{
            coord_prev_a = undefined;
            $coord_prev = $target;
            coord_prev_nick = coord_nick;
        }
    });
}