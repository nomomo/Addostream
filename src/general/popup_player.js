import {ADD_streamer_nick} from "general/streamer-lib.js";
import {ADD_DEBUG} from "libs/nomo-utils.js";

export function ADD_popup_player(){
    var display_name = nomo_global.ADD_now_playing.display_name;
    var ch_text = "";
    if(display_name.indexOf("&").length !== -1){
        var temp_array = display_name.split("&");
        for (var j=0; j<temp_array.length; j++){
            if(j !== 0){
                ch_text = ch_text+"&";
            }
            var temp_id = ADD_streamer_nick(temp_array[j]);//.toUpperCase();
            ch_text = ch_text+temp_id;
        }
        display_name = ch_text;
    }
    if($(".stream_zoomout").length === 0){
        ADD_DEBUG("stream_zoomout 생성");
        $("#stream").addClass("stream_zoomout").attr("id","").after("<div id='stream'></div>");
        $(".stream_zoomout").css("position","fixed").css("bottom","30px").css("left","30px")
            .css("padding","0").css("margin","0").css("width","280px").css("height","157.5px").css("z-index","100").css("border-radius","4px");
        var $doe = $(`
        <div class="stream_zoomin_screen" style="display:none;background:rgba(0,0,0,.6);user-select:none;">
            <div class="stream_zoom_header" style="width:280px;height:40px;padding:5px;position:absolute;z-index:101;background:rgba(0,0,0,.6);color:#fff;font-size:20px;vertical-align:middle;">
                <div style="display:inline-flex;margin-left:10px;margin-right:10px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;cursor:default;">
                    <span style="font-size:14px;">`+display_name+` 시청 중</span>
                </div>
                <div class="stream_zoomin_close" style="display:inline-flex;width:30px;height:30px;justify-content:center;cursor:pointer;float:right;font-family:unset;">
                    <!--<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>-->
                    X
                </div>
            </div>
            <div class="stream_zoom_button_container" style="width:280px;height:117.5px;position:absolute;z-index:101;top:40px;left:0;display:flex;justify-content:center;align-items:center;color:#fff;">
                <div class="button_expand" style="cursor:pointer;padding:10px;">
                    <svg width="30px" height="30px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
                        <path d="M13.146 9.354l-.646-.646-1.146 1.146a.5.5 0 0 1-.707 0l-.5-.5a.5.5 0 0 1 0-.707L11.293 7.5l-.646-.646A.499.499 0 0 1 11 6h2.5a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-.854.354zM18 3v11a.985.985 0 0 1-.235.621c-.022.027-.034.062-.058.086-.017.016-.04.023-.057.038A.987.987 0 0 1 17 15H13.003a1.001 1.001 0 1 1 0-2H16V4H6v4.997a1.001 1.001 0 1 1-2 0V3.003v-.002V3c0-.235.094-.442.229-.612.024-.03.038-.068.064-.095.015-.014.036-.021.051-.034A.989.989 0 0 1 5 2h12c.229 0 .43.09.598.22.035.027.078.043.109.073.011.012.016.028.027.04A.986.986 0 0 1 18 3zm-9.111 9c.614 0 1.11.498 1.11 1.111v3.778C10 17.502 9.504 18 8.89 18H3.112A1.112 1.112 0 0 1 2 16.889v-3.778C2 12.498 2.498 12 3.112 12h5.777z" style="fill:currentColor" fill-rule="evenodd"></path>
                    </svg>
                </div>
                <div class="button_pause" style="margin-left:20px;cursor:pointer;padding:10px;display:none;">
                <svg width="30px" height="30px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
                    <path d="M8 2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3zm7 0a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3z" style="fill:currentColor" fill-rule="evenodd"></path>
                </svg>
                </div>
            </div>
            <div style="width:280px;height:157.5px;padding:5px 10px;position:absolute;z-index:100;background-color:#000;opacity:0.5;"></div>
        </div>`);
        $(".stream_zoomout").prepend($doe);
        $doe.find(".button_expand").on("click", function(){
            window.location.href = "http://www.dostream.com/#/stream/twitch/"+nomo_global.ADD_now_playing.id;
            // 나머지 동작은 newdostream 에서 처리한다.
            //$("#stream").empty();
            //$(".stream_zoomout").attr("style","").removeClass("stream_zoomout").attr("id","stream");
        });
        // $doe.find(".button_pause").on("click", function(){
        //     twitch_player.pause();
        // });
        $(".stream_zoomout").on("mouseover",function(){
            $(".stream_zoomin_screen").fadeIn("fast");

            $(".stream_zoomin_screen").one("mouseleave", function(){
                $(this).fadeOut("fast");
            });
        });
        $(".stream_zoomin_close").on("click", function(){
            $(".stream_zoomout").remove();
            $(".stream_zoomin_screen").remove();
        });
    }
    window.open($(this).attr("href"), "_self");
}