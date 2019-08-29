import nomo_const from "../general/const.js";
import {ADD_DEBUG} from "../libs/nomo-utils.js";

//////////////////////////////////////////////////////////////////////////////////
// 좌표 보내기 버튼 layout 생성하기 위한 함수
export function ADD_send_location_layout(){
    ADD_DEBUG("ADD_config.send_location_button", ADD_config.send_location_button);
    if(!ADD_config.send_location_button && nomo_global.$GLOBAL_IFRAME_DOCUMENT !== undefined && nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").length !== 0){
        nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_button").off("click");
        nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").remove();
        return false;
    } else if(!ADD_config.send_location_button){
        return false;
    }

    // 채팅창 존재 여부 확인, 좌표 보내기 버튼 이미 존재하는지 확인
    if(nomo_global.$GLOBAL_IFRAME_DOCUMENT !== undefined && nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").length === 0 ){
        // 채팅창 생성
        var $ADD_send_location_button_elem = $(`
            <div id="ADD_send_location_container"><!--width:20px;height:20px;font-size:20px-->
                <span id="ADD_send_location_notice"></span>
                <!--<span aria-label="현재 주소를 채팅 입력란에 복사" data-microtip-position="top-left" role="tooltip">-->
                    <span id="ADD_send_location_button" class="glyphicon glyphicon-send">
                    </span>
                <!--</span>-->
            </div>`);
        nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".contentWrap").after($ADD_send_location_button_elem);
        nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_button").on("click", function(){
            ADD_DEBUG("Send location", location.href);
            var text = "";
            var $chatInput = nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".chatInput");
            if(ADD_config.send_location_existing){
                text = $chatInput.html() + " " + parent.window.location.href;
            }
            else{
                text = parent.window.location.href;
            }
            //
            $chatInput.focus().html(text);

            if(ADD_config.send_location_immediately && nomo_global.is_send_location){
                nomo_global.is_send_location = false;
                $ADD_send_location_button_elem.hide();

                var rooms = nomo_global.GLOBAL_CHAT_IFRAME.contentWindow.rooms;
                var roomid = Object.keys(rooms)[0];
                var room = rooms[roomid].room;
                var style =  {
                    bold: room.setting.data["style.bold"]   // true or false
                    , italic: room.setting.data["style.italic"]    // true or false
                    , underline: room.setting.data["style.underline"]   // true or false
                    , color: $(".chatInput", rooms[room.id].layout).css("color")   // "rgb(51,51,51)"
                };
                room.action.send(text, style);

                // 쿨타임
                setTimeout(function(){
                    nomo_global.is_send_location = true;
                    $ADD_send_location_button_elem.fadeIn("fast");
                }, nomo_const.SEND_LOCATION_EVENT_MIN_TIME*1000);
            }
        });
    }
    else{
        ADD_DEBUG("채팅창이 존재하지 않아 ADD_send_location_layout 함수에서 좌표보내기 버튼을 생성하지 못함");
    }

    if(nomo_global.$GLOBAL_IFRAME_DOCUMENT !== undefined && nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").length !== 0){
        if(ADD_config.send_location_button_top){
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").addClass("send_location_button_top");
        }
        else{
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").removeClass("send_location_button_top");
        }
    }
}