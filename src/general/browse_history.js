import nomo_const from "general/const.js";
import * as nomo_common from "general/common.js";
import {ADD_streamer_nick} from "general/streamer-lib.js";
import {ADD_DEBUG} from "libs/nomo-utils.js";

/**
 * layout 및 이벤트 생성
 *
 * @param {*} rw_array - rw_array[0]:channel_id, rw_array[1]:channel_nick, rw_array[2]:platform
 * @returns
 */
function ADD_Channel_history_cookie(rw_array){
    var ADD_MAX_HISTORY = ADD_config.max_history;

    var ADD_h_cookie = $.cookie("ADD_h_cookie");
    if(ADD_h_cookie === null || ADD_h_cookie === undefined){
        ADD_h_cookie = [];
    } else {
        ADD_h_cookie = JSON.parse(ADD_h_cookie);
    }

    // read
    if(rw_array === undefined || rw_array === null || rw_array === 0){
        // 읽기만 하는 경우에는 그냥 리턴
        // ADD_DEBUG('히스토리 변경 없음');
    }
    // write
    else{
        // 아이디에 따른 닉네임 찾기
        var ch_text = "";
        var temp_array = rw_array[0].split("&");
        for (var j=0; j<temp_array.length; j++){
            if(j !== 0){
                ch_text = ch_text+"&";
            }
            ch_text = ch_text+ADD_streamer_nick(temp_array[j]);//.toUpperCase();
        }
        if(rw_array[2] === "multitwitch"){
            ch_text = ch_text+"(멀티)";
        }
        rw_array[1] = ch_text;

        // 기존 쓰여진 쿠키에 중복 여부 찾기
        var found_h = false;
        for(var i=0;i<ADD_h_cookie.length;i++){
            if(ADD_h_cookie[i][0] !== undefined && rw_array[0] === ADD_h_cookie[i][0] && rw_array[2] === ADD_h_cookie[i][2]){
                ADD_h_cookie.splice(i,1);
                // unshift : 맨앞추가, pust : 맨뒤추가
                ADD_h_cookie.unshift(rw_array);
                found_h = true;
                break;
            }
        }
        if(!found_h){
            ADD_h_cookie.unshift(rw_array);
        }
    }

    // 쿠키 쓰기
    if(ADD_h_cookie.length > ADD_MAX_HISTORY){
        ADD_h_cookie = ADD_h_cookie.slice(0,ADD_MAX_HISTORY-1);
    }

    //ADD_DEBUG('히스토리 쓰기: ',rw_array, ADD_h_cookie);
    $.cookie("ADD_h_cookie", JSON.stringify(ADD_h_cookie), { expires : 365, path : "/" });

    return ADD_h_cookie;

}

////////////////////////////////////////////////////////////////
// 이전 시청 기록
// 주소 체크
function check_stream_and_chennel_from_location(){
    if(nomo_common.ADD_get_page_type() === nomo_const.C_STREAM){
        var current_url = location.href;
        // 유투브의 경우에만 대소문자 구분함
        if(current_url !== null && current_url.indexOf("#/stream/youtube/") === -1){
            current_url = current_url.toLowerCase();
        }

        if(current_url !== null && current_url.indexOf("#/stream/") !== -1){
            var keyword_stream = (current_url.split("#/stream/"));
            keyword_stream = keyword_stream[1];
            var keyword_channel = keyword_stream.split("/");
            if(keyword_channel.length !== 2){
                ADD_DEBUG("check_stream_and_chennel_from_location 에서 / 개수로 인한 에러 발생");
                return null;
            }
            else{
                var return_array = [];
                return_array[0] = keyword_channel[1];
                return_array[1] = keyword_channel[1];
                return_array[2] = keyword_channel[0];
                return return_array;
            }
        }
        else{
            ADD_DEBUG("채널 히스토리 등록 중 #/stream/ 을 찾지 못함", current_url);
            return null;
        }
    }
}

function ADD_Channel_History_layout(ADD_h_cookie, fade){
    if($("#history_elem").length === -1){
        ADD_DEBUG("#history_elem 을 찾을 수 없습니다");
        return false;
    }

    var ADD_MAX_HISTORY = ADD_config.max_history;

    var ch_streamer_id = "";
    var ch_streamer_nick = "";
    var ch_stream = "";
    var ch_text = "";
    var h_text = "";
    var from2 = "";
    var platform_class = "";
    var h_title_text = "";
    var ch_stream_text = "";

    if(ADD_h_cookie !== null){
        h_text = "<span class=\"h_container\">";

        for(var i=0;i<ADD_h_cookie.length;i++){
            if(ADD_MAX_HISTORY === i)
                break;

            ch_text = "";
            ch_streamer_id = ADD_h_cookie[i][0];
            ch_streamer_nick = ADD_h_cookie[i][1];
            ch_stream = ADD_h_cookie[i][2];
            ch_stream_text = ch_stream.substring(0, 1).toUpperCase() + ch_stream.substring(1, ch_stream.length).toLowerCase();

            switch(ch_stream){
            case "twitch":
                platform_class = "h_twitch";
                ch_text = ch_streamer_nick;
                break;
            case "kakao":
                platform_class = "h_kakao";
                ch_text = ch_streamer_id;
                break;
            case "youtube":
                platform_class = "h_youtube";
                ch_text = ch_streamer_id;
                break;
            case "afreeca":
                platform_class = "h_afreeca";
                ch_text = ch_streamer_id;
                break;
            case "multitwitch":
                platform_class = "h_twitch";
                ch_text = ch_streamer_nick;
                break;
            case "okru":
                ch_stream_text = "OK";
                platform_class = "h_okru";
                ch_text = ch_streamer_id + "(OK)";
                break;
            default:
                platform_class = "";//"h_" + ch_stream;
                ch_text = ch_streamer_id + "(" + ch_stream + ")";
                break;
            }

            // 아이콘 숨기기
            if(ADD_config.history_hide_icon){
                platform_class = "";
            }

            if(i == 0){
                from2 = "";
            }
            else{
                from2 = "<span class=\"glyphicon\" style=\"color:#bbb;padding:0px 6px;user-select: none;\">〈</span>";
            }

            if(platform_class !== ""){
                platform_class = "<span class=\"h_icon "+ platform_class +"\" title=\"" +  ch_stream_text  + "\"></span>";
            }

            h_title_text = ch_streamer_nick + "(" + ch_streamer_id  + ") - " + ch_stream_text;
            h_text = h_text + "<div class=\"h_text_container\">" + from2 + platform_class + "<a class=" + ch_stream + " href=\"" + "https://www.dostream.com/#/stream/" + ch_stream + "/" + ch_streamer_id + "\" title=\"" + h_title_text + "\">" + ch_text + "</a></div>";
        }
        h_text = h_text + "</span>";
        if(fade){
            $("#history_elem").hide().html(h_text).fadeIn(1000);
        }
        else {
            $("#history_elem").html(h_text);
        }

        if(nomo_common.ADD_get_page_type() === nomo_const.C_STREAM){
            $("#history_elem a:first").addClass("nowplaying");
        }
        else{
            $("#history_elem a:first").removeClass("nowplaying");
        }

        // $(".h_text_container a").draggable({
        //     helper: "clone",
        //     delay: 0,
        //     start: function(event, ui) {
        //         var href = $(ui.helper).attr("href");
        //         var stream = href.split("/stream/").pop();
        //         var text = $(ui.helper).text();
        //         $(ui.helper).css({"background-color":"#fff","padding":"10px","border-radius":"3px","font-size":"14px","display":"inline-block","height":"40px"});
        //         $("#stream").css("position","relative").prepend(`
        //             <div id="stream_screen" style="position:absolute;z-index:1000;background-color:rgba(0,0,0,0.5);width:100%;height:calc(100% - 45px);padding:20px;">
        //                 <div style="width:100%;height:100%;position:relative;">
        //                     <div class="drag_select_area" style="width:100%;height:100%;opacity:0.2;position:absolute;z-index:900;">
        //                         <div class="drag_tl" style="display:inline-block;width:45%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
        //                         <div class="drag_none" style="display:inline-block;width:10%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
        //                         <div class="drag_tr" style="display:inline-block;width:45%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
                                
        //                         <div class="drag_l" style="display:inline-block;width:45%;height:20%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
        //                         <div class="drag_whole" style="display:inline-block;width:10%;height:20%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
        //                         <div class="drag_r" style="display:inline-block;width:45%;height:20%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
                                
        //                         <div class="drag_bl" style="display:inline-block;width:45%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
        //                         <div class="drag_none" style="display:inline-block;width:10%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
        //                         <div class="drag_br" style="display:inline-block;width:45%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
        //                     </div>

        //                     <div class="drag_show_area" style="opacity:0.9;">
        //                         <div class="drag_whole" style="display:none;position:absolute;width:100%;height:100%;top:0;left:0;padding:5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">전체</div></div>
        //                         <div class="drag_l" style="display:none;position:absolute;width:50%;height:100%;top:0;left:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">왼쪽</div></div>
        //                         <div class="drag_r" style="display:none;position:absolute;width:50%;height:100%;top:0;right:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">오른쪽</div></div>
                                
        //                         <div class="drag_tl" style="display:none;position:absolute;width:50%;height:50%;top:0;left:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">왼쪽 위</div></div>
        //                         <div class="drag_tr" style="display:none;position:absolute;width:50%;height:50%;top:0;right:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">오른쪽 위</div></div>
        //                         <div class="drag_bl" style="display:none;position:absolute;width:50%;height:50%;bottom:0;left:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">왼쪽 아래</div></div>
        //                         <div class="drag_br" style="display:none;position:absolute;width:50%;height:50%;bottom:0;right:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">오른쪽 아래</div></div>
        //                     </div>
        //                 </div>
        //             </div>
        //         `);
        //         $("div.drag_select_area > div").hover(function(){
        //             var drag_class = $(this).attr("class");
        //             ADD_DEBUG("fire", drag_class);
        //             if(drag_class !== undefined){
        //                 $(".drag_show_area")
        //                     .find("."+drag_class).show()
        //                     .find("div").html("<div style='width:100%;text-align:center;'>"+stream+"</div>")
        //                     .css({"font-size":"18px","color":"#fff","text-align":"center","display":"flex","align-self":"center","align-items":"center","justify-items":"center"});
        //             }
        //         },function(){
        //             var drag_class = $(this).attr("class");
        //             ADD_DEBUG("fire", drag_class);
        //             if(drag_class !== undefined){
        //                 $(".drag_show_area").find("."+drag_class).hide();
        //             }
        //         });
        //     },
        //     stop:function(event, ui){
        //         $("#stream_screen").remove();
        //         $("#stream").css("position","unset");
        //     },
        //     revert: true,
        //     revertDuration: 10
        // });
    }
    else{
        ADD_DEBUG("ADD_Channel_History_layout 에서 배열 크기가 null 입니다");
    }
}

export function ADD_channel_history_run(){
    if(nomo_global.PAGE === nomo_const.C_UCHAT){
        return false;
    }

    var ADD_history = ADD_config.history;
    if(!ADD_history){
        if($("#history_elem").length !== 0){
            $("#history_elem").html("");
        }
        $(window).off("hashchange.history");
        return false;
    }

    var current_info = [];
    var total_history = [];

    // Case 1. 초기 접속 시
    if(nomo_global.PAGE === nomo_const.C_MAIN || nomo_global.PAGE === nomo_const.C_SETTING){
        // 메인으로 접속하는 경우
        total_history = ADD_Channel_history_cookie();
    }
    else if(nomo_global.PAGE === nomo_const.C_STREAM){
        // 스트림 주소로 직접 접속하는 경우
        current_info = check_stream_and_chennel_from_location();
        total_history = ADD_Channel_history_cookie(current_info);
    }

    // Case 2. 이벤트로 인해 접속하는 경우
    $(window).on("hashchange.history", function(){
        current_info = check_stream_and_chennel_from_location();
        total_history = ADD_Channel_history_cookie(current_info);

        ADD_Channel_History_layout(total_history, false);
    });

    // layout 지우고 새로쓰기
    ADD_Channel_History_layout(total_history, true);
}