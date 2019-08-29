import * as nomo_common from "general/common.js";
import {ADD_var_to_config_form} from "general/menu_layout.js";

export function ADD_multitwitch_layout(){
    if(!ADD_config.button_set){
        $(".main-streams div.search").remove();
        return false;
    }
    if( $(".search").length === 0 && $(".main-streams").length !== 0){
        $(".main-streams").prepend(`<div class="search">
        <a class="checkbox twitch checked">트위치</a><a class="checkbox kakao checked">카카오</a><a class="checkbox youtube checked">유튜브</a>
    </div>`);
    }
    else{
        //ADD_DEBUG('search',$('.search').length === 0);
        //ADD_DEBUG("main-streams 존재?: ",$(".main-streams").length !== 0);
        return;
    }
    // 멀티트위치 버튼
    if( $("#multitwitch").length === 0 && $(".search").length !== 0 ){
        $("<span aria-label=\"체크한 스트리머를 멀티트위치로 실행\" data-microtip-position=\"right\" role=\"tooltip\"><span id=\"multitwitch\">멀티트위치</span></span>")
            .appendTo($(".search").first())
            .on("click", function(){    // 클릭 시 동작
                var multitext = nomo_global.multitwitch_checked_streamer_arr.join("&");
                if(nomo_global.multitwitch_checked_streamer_arr.length === 0)
                    alert("Check the checkboxs to use multitwitch!");
                else
                    $(location).attr("href","/#/stream/multitwitch/"+multitext);
            });
    }

    // Hide Streamer 버튼
    if( $("#addHideStreamer").length === 0 && $(".search").length !== 0 ){
        $("<span style=\"float:right;\"><span aria-label=\"체크한 스트리머를 메인에서 숨김\" data-microtip-position=\"left\" role=\"tooltip\"><span id=\"addHideStreamer\" style=\"display:none; cursor: pointer; font-size:12px; line-height:20px; margin:0 5px 0 0; padding: 5px 10px; background: #C64D4D none repeat scroll 0 0; color: #fff;\">HIDE</span></span></span>")
            .appendTo($(".search").first())
            .on("click", async function(){    // 클릭 시 동작
                var IndexCheckedID = true;
                if(nomo_global.multitwitch_checked_streamer_arr.length !== 0){
                    for(var i=0; i<nomo_global.multitwitch_checked_streamer_arr.length; i++){
                        IndexCheckedID = $.inArray(nomo_global.multitwitch_checked_streamer_arr[i], ADD_config.streamer_hide_ID);
                        if(IndexCheckedID == -1){
                            (ADD_config.streamer_hide_ID).push(nomo_global.multitwitch_checked_streamer_arr[i]);
                        }
                    }
                    await GM_setting.save();
                    ADD_var_to_config_form();
                    nomo_common.reloadMain();
                    $("#addHideStreamer").hide();
                }
            });
    }
}