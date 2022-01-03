import * as nomo_common from "general/common.js";
import nomo_const from "general/const.js";
import { ADD_streamer_nick, streamerArray, streamerArray_name, streamerArray_regex } from "general/streamer-lib.js";
import * as nomo_theme from "general/theme.js";
import * as utils from "libs/nomo-utils.js";
import * as nomo_version from "settings/version.js";
import { ADD_send_location_layout } from "chat/send_coord.js";
import { ADD_send_sys_msg } from "chat/send_message.js";
import { uchat_connect_waiting, uchat_connect_check_clear} from "chat/server_connector.js";
import { getStreamerIdAndDisplayNameFromNick } from "general/streamer-lib.js";
import {escapeHtml} from "libs/nomo-utils.js";
// import * as hold from "chat/hold.js";
// import lib_nude from "libs/nude.js";
const ADD_DEBUG = utils.ADD_DEBUG;

const ADD_UNIQUE_WINDOW_RELOAD_MAX = 5;
const ADD_CHAT_IMAGE_ADDITIONAL_LOAD_MAX = 5;
export var chat_basic_css = `#ADD_send_location_button {
    width:24px;height:24px;font-size:18px;cursor:pointer;
}
#ADD_send_location_container {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    z-index:100000;
}
#ADD_send_location_container.send_location_button_top{
    top: 10px;
    bottom: unset;
}
#uha_chat #ADD_send_location_container{
    bottom: 58px;
}
#uha_chat #ADD_send_location_container.send_location_button_top{
    top: 38px;
    bottom: unset;
}

.black .myLine{
    background:unset;
}
.imgur_container{
    line-height:100%;
    position:relative;
}
.imgur_container .imgur_safe_screen{
    z-index:1000;
    align-items:center;
    position:absolute;
    top:31px;
    left:0;
    text-align:center;
    vertical-align:middle;
    width:100%;
    height:calc(100% - 62px);
    background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJElEQVQImWPo6ur6D8MMDAz/GZA5XV1dEAEYB8pGcLq6uv4DAKP8I1nj691jAAAAAElFTkSuQmCC) repeat;
}
.imgur_container.blurred .simple_image_container {
    overflow:hidden;
}
.imgur_container.blurred img, .imgur_container.blurred video{
    filter:blur(5px);
}
.imgur_container .imgur_safe_screen .imgur_safe_button{
    border-radius: 5px;
    padding: 10px 15px;
    background: rgba(255,255,255,1);
    border: 1px solid #666;
    opacity: 1.0;
    line-height: 150%;
    margin: 0 auto;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    color: #19171c;
    font-size: 14px;
    font-family: "Lucida Console", Monaco, monospace, Impact, "Malgun Gothic",sans-serif;
    box-shadow: 3px 4px 10px 1px rgba(0, 0, 0, 0.35);
}
.imgur_container .ADD_tr{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 5px 0 0 0;
}
.imgur_container .ADD_tr, .imgur_container .ADD_br{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 7px;
    height:31px;
}
.imgur_container .ADD_br .videoType{
    white-space: nowrap;
    font-size: 12px;
    line-height: 130%;
    padding: 1px 5px;
    font-weight: bold;
}
.imgur_container .ADD_tr img, .imgur_container .ADD_br img{
    width:17px;
    height:17px;
}
.imgur_container .imgur_image_title{
    width:100%;
    min-width:0;
    padding:1px 5px;
    display:inline-block;
    align-self:center;
    font-size: 12px;
    font-weight:700;
    text-align:left;
    margin-right:10px;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    line-height:130%;
    cursor:default;
}
.imgur_container .imgur_image_title:hover{
    text-overflow: unset;
    white-space: unset;
    z-index: 100000;
    background-color: #9e9e9e;
    border-radius: 5px;
    align-self: baseline;
    padding: 1px 12px 10px 12px;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    top: 7px;
    left: 0;
    min-height:23px;
}
.imgur_container .imgur_control_hide, .imgur_container .imgur_control_remove{
    font-size: 14px;
    display: inline-flex;
    cursor: pointer;
    text-align: center;
}
.imgur_container .imgur_control_remove{
    margin-left:7px;
}
.imgur_container .ADD_tr, .imgur_container .ADD_br,
.imgur_container .simple_image,
.imgur_container .simple_image_container,
.imgur_container .imgur_more_image_div,
.imgur_container .imgur_more_image_div_container{
    background-color:#9e9e9e;
}
.imgur_container .imgur_more_image_div{
    margin:0 auto;
}
.imgur_container .simple_image_container, .imgur_container .imgur_more_image_div_container{
    width:100%;
}
.imgur_container .simple_image{
    text-align:center;
    margin:0 auto;
}
.imgur_container .simple_image.whauto img{
    width:auto;
    height:auto;
}
.imgur_container .simple_image_container,
.imgur_container .imgur_more_image_div_container{
    position:relative;
    margin:0 auto;
}
.imgur_container .viewers{
    z-index: 1100;
    line-height: 1.42857143;
    font-size: 12px;
    padding: 1px 4px;
    background: #000;
    display: inline-block;
    position: absolute;
    top: 0px;
    right: 0px;
    color: #fff;
}
.imgur_container .imgur_more_images_button{
    width:100%;
    min-width:0;
    padding-left:5px;
    display:inline-block;
    align-self:center;
    font-size: 12px;
    font-weight:700;
    text-align:center;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
}
.imgur_container .simple_image video, .imgur_container .imgur_more_images video,
.imgur_container .simple_image img, .imgur_container .imgur_more_images img{
    width:100%;
    height:100%;
    z-index:100;
    cursor:pointer;
    margin:0 auto;
    display:inline-block;
}
.imgur_container .imgur_more_images .ADD_tr{
    position:relative;
}
.imgur_container .play_container{
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
}
.imgur_container .play_container.hover .play_button{
    display:block;
    cursor:pointer;
}
.imgur_container .play_container .play_button{
    display:none;
    width:100%;
    height:100%;
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABaCAYAAAA/xl1SAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjBEQjEyRDJFQzRCMTFFNkFEQjVENzAwNDkwOUQ4MDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjBEQjEyRDNFQzRCMTFFNkFEQjVENzAwNDkwOUQ4MDYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMERCMTJEMEVDNEIxMUU2QURCNUQ3MDA0OTA5RDgwNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMERCMTJEMUVDNEIxMUU2QURCNUQ3MDA0OTA5RDgwNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgmImiEAAAs1SURBVHja7J1/aBXZFcfvzHsxL3G3xthdY1xjXtJUYaGSlQj+wO2mtpZSCsZGrGJMNwhV0T+0GtH8ZxSNSsBALIgbiT+gTSNSloX9Y9fGBgMqu2ugIHXzw7jGuK4xippo3rzp3DBX7js5d968JK55M+fAZX7kzr3z8j7ve++5c+4dzTRNRkb2pkynfwEZAUhGAJKREYBkBCAZGQFIRgCSkRGAZAQgGRkBSEYAkpERgGQEIBnZRFrQCx9C0zRX+dxG/mhuC0zQzHGGHsHb8kIkU9Dvv8A4sGkuz8VwoTqH1WX6PB4uSNChYGkuYXMLrYnAOQpKP8IY9Dl4mgNw2jhhlKHTpC08NwpGP4HoFwCdwIPQuTnnFkATUT0TlK1URT+AGPQZfBh42hiOYXmmQvlMF8eOIHodwqDP4MOgEud05LwquVU+pxSVwHN0XLwMYdBn8MkA6gh4OrKV8zg1yZjCRe39qHQM4RP7UT9CGPQhfPGAg/u6SyV0UjqRdAf4dHAO6xeaBGDygegEnzgOSOcCAD45QTXEFEtWPSwZmAcsXaerICQFTC71U8HnBB22DSDAxlPAqNTcGnYS8OnSMQOwmYhSMsXQDQGYRIbBJytbwEWCZagAlPt5Bki6pICG9EMRMBoSfLqiX0gKmGTqB5NK5YJ2ko8hgAHEIWGI42EgAEbAviaBKMNsMPXgt+dU0OteMHQwAgrFE7ClSCAGEQgDimYYNr8GAl/A3kaQH4mB3D9UQfKCkww8Bvp/0LvFwFNtRV4d9AkhMKakfhEJvmHQ7GsARAixDtTQZPigNwGYBEMv0POFiiYgm2LvizQFUcQRiDZv3py/ePHi3EAgMAKKYRjRtra27hMnTnRIChiREr/2JQAQ6z/K+xrijKienCTvl+aF8U370amTt6uCToYPS6+APHfu3K+KiooKw+Hw+8FgMAW7j0gkMtzV1fXfa9eufb1+/fovbOUT6aUiCYUUWwNJ0LkZgdET353HAMScDdjcxgMvVaSQZadPn165evXqNSroVMZhbG5u/kd5efnnQ5ZZp15IKR6IstMijx/GDHITgJMTQD2B5laGjm9D9n6osrLyF7t27frzjBkzZsH6uru7v+/o6HgQtWxEci3Lz89/Jzc3912Y9+HDh/eOHDnScPjw4XbrUIA4ZEMnwzgMQIQqCB/nEYCTGEBdMcQSBOAJ+ELSNu348ePLt23bthlC19jY+PWpU6e6enp6hrD7yMnJCVVUVITLysoKIYx1dXUntm/fftnaHQQgQkUcBv1HAyghATgJAYT9v4DC05UdjFQppQn46uvrf2k5GX8RZT9//nzo4MGDXx44cOB/idzTvn37fr53797i9PT0kDhnOSl/27Jly78lCAeRplnuN8KmWO4PeoJALwKIqV8KUL9USfFCNoBpFjQfVFdX7xHl9vb29peWlv7rypUrA2O5ryVLlmQ0NTX9ITs7O1Ocq6qqOmTB/JUNnwBxCIEQ9gmhChKAkwxArP+HwTcFg89K6f39/UenT5+excu8e/fuD5bX23Tv3r0X47m3WbNmpVpecens2bN/yo8fPXrUl5mZ+VcurgoIXzpAGNMP9AKAXpwXDMcAmUIV5b4hH2ZZKeB7+vTp4Jo1az4dL3zceBm8LF4mP+Z18LrAGCN89Kcj9z6WaQEE4BuGUDUuqAOnJGXt2rV/EhfX1NS0jLXZxYyXxcsUx3ZdKQBC+JQFPm3RvPhFeV0BMc941DPhs2fPrtB1feSpUFdXV9/+/ftvqgrPyMgI3rx584+HDh16P5Gb4mXysu1hm+D58+d/w/BAh3iBsARgkiqhcoxwxYoVH4kLzpw5c8OpwHA4nDZv3rz3Kisrf93T07O+pKQky+3NNDQ0fCP2i4uLP2TO4V7Mq9B5FUDNhRKOUsOsrKy0mTNnzuUXDA8PR2pra2+5rXDOnDnvNDc3r21tbf1tYWHh2/Hy19XVfcvr4Pu8Tl63S9XT4nxWAjAJm+URGNetW5crMlmK9mBgYCCSaOFLly6d39bWVmYp3CLeRKvy8bKtZvh7cVxWVpaXAHSkgEmqiE7TMbWFCxfmiAs6Ozt/GGtlqampKeXl5Us6Ojo27ty582eqfLdv334o9hcsWPCeA3iqucgEYBI1w3HzTps27S1JoYbGewOZmZlvHz169PfcUZk/f/5URAVf1SHVrb2mz0gA+tXy8vKyli9fPoP+E87mtYhoM9G8jx8/fioNsYQm4iauX7/+7datWy9fvXr1CTKM86oOue7X9BlJAScBjKr1WUbSjRs3vhMXzJ07d1yKdefOnQcbN278Z1FR0acYfLAOu+6YECuH+6Y+YJLDiK5a0NjY2CkyhcPhd528WJXxiJna2tovc3JyzlnlfafKx8vmdYhju+6ow/2RF5zEza+bpTKifX19g/fv37/NL0hJSQlaTWee2woNyy5evPhVQUFBw44dO9rj5edl8zr4Pq+T181Gr5zgBkaTAEwu5WPMYdJ4S0vLf8QFFRUVHzgV+OTJk0g0GjXb29u7i4uLz65atepyb2+vq6AFuWy7TqeIZ+YHJfRiOBYWCyiHYono51dhWKFQ6K1nz559Ip4HV1VVfeYUgJqfn5/W0dExmMg98gDV6urq3/F9C+DI1KlTPx4aGuJOiByWJYfry8GpWEwghWMlSXMMlUWetzsSb2eB8KKpqenv4oI9e/Z8tGjRop+oCk8UPh6YyssUx7wuXieLDb+HEc/yDDjPOiJ+DUiNmQPCE1dBqymt+TECUrOzs3fb6icHpGLqRwGpSdrfY3H6ffKkn2FbBYeOHTt2WlzIgeHgOClhPOPXyvBx43XY0zSHmfMEJNgfZF7sF3qxCcbG/OD8Whk+oTgvrH7fN3zikAzhpUuX1lVWVhYkehP8Gn6tDB8vm9fB8ND7ePOAPdkM07RMZFpmfX39h/LMOG48mJTHCrqZlrlhw4YF4XA4Jk7QnhHXwmhapi8AnJCJ6bt37/44MzNzVMApnyN869at+4ZhjPzzAoGAVlBQMBObmN7f399XU1PzCU1M9w+ATktzqOYIo0tzZGRkpJ88eXJlSUlJqRiicWt8qOXChQtNmzZt+nxgYOA5c16aA5sLTEtzJCGAjNHiRATgGwYQW/VetUhRkCW+PFvA6h/mLVu2LI+vCWOrXbS1tbXT6ud1OnjaLxEgI4gTEkH6fOhTEgJwcgGINcO6ojnGmmSnBSqDTL1MLxzyMRTetmprODgcUP1ivGJ6XevkHoaRVxaNSufEgo8GyC+rjDxmCFdHdbtEL1wlFSqioYBOvgdsWMlT5uU1omWwdGk8EObB3tchN6NBhi+x67RKvgpCuGA5XHgIOhtR5vGABC9GRGPL18rv3zAQSGVwRBMt1C/CJu41DdjQitsm15OD0X55T4i84rwOml/TBgxTsNfxohpsazLnQARGCpjcKqgx/A1EOmh6hQLKoL6OV3Vh0EUBwIz54FGc1xVQBSEDjonstJhs9Ku85IWC3L4tEwsDMxXDKm7gIwVMQhVUQagBhZNVEzbXUPUm6nWtpiIPCh8f9JOGmwjAJIZQ7hfKQzQ6GLb5MV5YzRwcjRj4SAG9CaEpQRVVKBx2zMC+qfCszTEcM7/A5xcv2HQABXsDkcacX3idSL0mUqfq3Kgfidfh89MwjBlHsTSHvGNdIMhUbOP9zRfg+Q3AmC9WWlXfVAzdaGxiX43qBKEvwfMlgNgXjcCIqSBD+n1uhn6czvkWOt8DGA8ABZRxYRpLXX43jf4nZG/SaH1AMgKQjAAkIyMAyQhAMjICkIwAJCMjAMkIQDIyApCMACQjIwDJCEAysgm1/wswAKKXtPVbc6NeAAAAAElFTkSuQmCC);
    background-repeat:no-repeat;
    background-position:center center;
}

.chatContent a.autokeyword, .chatContent a.autokeyword:link{
    font-family:dotum;
}
a.autokeyword, a.autokeyword:link{
    white-space:nowrap;
    z-index:1;
    color:#000;
    position:relative
}
a.autokeyword:after, a.autokeyword:after{
    opacity: 0.33;
    z-index: -100;
    height: calc(100% + 6px);
    width: calc(100% + 4px);
    content: " ";
    position: absolute;
    top: -3px;
    right: -2px;
    border-radius: 7px;
    background-color: powderblue;
}

body.tooltip_hide p.tooltip {
    display:none !important;
}

.chat_video_play_top_fix {
    transform:unset !important;
}
.chat_video_play_top_fix .imgur_container{
    position:fixed;
    top:23px;
    left:5;
    z-index:1000000;
}
#uha_chat_msgs .chat_video_play_top_fix .imgur_container{
    top:71px;
}
.chat_video_play_top_fix .ADD_br{
    display:none;
}
body.leftchat .wrap, body.leftchat .chat-ignore, body.leftchat .chat-container {
    border-left:none !important;
    border-right:1px solid #d3d3d3;
}

.line span, .line img, .chatContent a.autokeyword, .chatContent a.autokeyword:link {
    vertical-align:baseline !important;
}

div.ADD_type_and_go {
    color: inherit;
    font-size: 20px;
    position: absolute;
    width: 20px;
    height: auto;
    right: 35px;
    top: 1px;
    opacity: 0.8;
    cursor: pointer;
}
div.ADD_type_and_go:focus, div.ADD_type_and_go:hover {
    opacity: 1.0;
    border: none;
    outline: 0px solid transparent;
}

`;

// 상위 frame 의 주소 설정
function setParentWindowLocation(href){
    window.parent.location.href = href;
}

// url 을 감지하여 $elem 뒤에 좌표 버튼을 덧붙인다
function url_to_coord(url, $elem){
    const regex_twitch = "";
    // const regex_afreeca = "";
    // const regex_kakao = "";

    // 정규표현식으로 id 추출한다
    if(regex_twitch.test(url)){
        var temp = url.split("/");
        if(temp.length !== 0){
            temp = temp.pop();
        }

        // 좌표 버튼을 덧붙인다
        var $coord = $(`<span style="font-weight:bold">[]</span>`);
        $elem.after($coord);
    }
}

// 채팅창에서 문자열 탐지, 이벤트 bind, API 함수 호출 동작 실행
var version_message_once = false;
export async function ADD_chatting_arrive(){
    ADD_DEBUG("ADD_chatting_arrive 함수 실행됨");
    // 기존에 꺼져있는 경우
    if(!nomo_global.chatting_arrive_check || nomo_global.chatting_arrive_check === null){
        // True 이면 켠다.
        if (ADD_config.chat_ctr){
            nomo_global.chatting_arrive_check = true;
            // 오로지 이 경우만 return 하지 않는다.
        }
        // 그 외의 경우 그냥 나간다.
        else{
            return;
        }
    }
    // 기존에 켜져있는 경우
    else{
        // False 이면 끈다.
        if(!ADD_config.chat_ctr){
            $(document).unbindArrive(".user_conversation");
            $(document).unbindArrive(".system");
            nomo_global.chatting_arrive_check = false;
            return;
        }
        // 그 외의 경우 그냥 나간다.
        else{
            return;
        }
    }

    ADD_DEBUG("nomo_global.chatting_arrive_check: " + nomo_global.chatting_arrive_check);

    // arrive bind 및 unbind
    if(nomo_global.chatting_arrive_check && ADD_config.chat_ctr){

        // (no src) iframe 생길 때 event
        uchat_connect_waiting();
        $(document).arrive("u-chat > iframe", {existing: true}, async iframeElems => {
            ADD_DEBUG("채팅 iframe 생성");
            if($(iframeElems).attr("src") !== undefined && $(iframeElems).attr("src").indexOf("uchat.io") !== -1){
                ADD_DEBUG("의미를 알 수 없는 iframe 이므로 리턴", $(iframeElems).attr("src"));
                return;
            }
            nomo_global.GLOBAL_CHAT_IFRAME = iframeElems;
            nomo_global.$GLOBAL_CHAT_IFRAME = $(iframeElems);
            nomo_global.$GLOBAL_IFRAME_DOCUMENT = nomo_global.$GLOBAL_CHAT_IFRAME.contents().first();

            chatDoeEvntFunc(nomo_global.$GLOBAL_IFRAME_DOCUMENT);

            //////////////////////////////////////////////////////////////////////////////////////////
            // 채팅창 생성될 때 노티하기
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.one("DOMNodeInserted", "div.content", async function (){
                ADD_DEBUG("채팅 div.content 생성");
                if($(this).hasClass("fired")){
                    ADD_DEBUG("already fired");
                    return;
                }
                $(this).addClass("fired");
                // nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".userListWrap").hide();

                uchat_connect_check_clear();
                // 채팅 엘리먼트 저장
                nomo_global.GLOBAL_CHAT_CONTENT_DIV = $(this);

                // 테마 적용
                nomo_theme.ADD_theme();
                nomo_theme.ADD_night_mode({message:true});

                // head에 CSS 추가
                nomo_theme.broadcaster_theme_css();

                var debug_css = `
                    .userListWrap {
                        height:300px !important;
                        border-bottom:2px solid #666 !important;
                    }
                `;

                if(nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#ADD_chat_css").length === 0){
                    nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("head").append(`
                        <style id="ADD_chat_css" type="text/css">
                        ${nomo_global.DEBUG ? debug_css : ""}
                        ${chat_basic_css}
                        /*!
                        * Bootstrap v3.3.7 (http://getbootstrap.com)
                        * Copyright 2011-2016 Twitter, Inc.
                        * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
                        */
                        /*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */
                        html{font-family:sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}body{margin:0}@font-face{font-family:'Glyphicons Halflings';src:url(https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.eot);src:url(https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.eot?#iefix) format("embedded-opentype"),url(https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff2) format("woff2"),url(https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff) format("woff"),url(https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.ttf) format("truetype"),url(https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular) format("svg")}.glyphicon{position:relative;top:1px;display:inline-block;font-family:'Glyphicons Halflings';font-style:normal;font-weight:400;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.glyphicon-asterisk:before{content:"\\002a"}.glyphicon-plus:before{content:"\\002b"}.glyphicon-euro:before,.glyphicon-eur:before{content:"\\20ac"}.glyphicon-minus:before{content:"\\2212"}.glyphicon-cloud:before{content:"\\2601"}.glyphicon-envelope:before{content:"\\2709"}.glyphicon-pencil:before{content:"\\270f"}.glyphicon-glass:before{content:"\\e001"}.glyphicon-music:before{content:"\\e002"}.glyphicon-search:before{content:"\\e003"}.glyphicon-heart:before{content:"\\e005"}.glyphicon-star:before{content:"\\e006"}.glyphicon-star-empty:before{content:"\\e007"}.glyphicon-user:before{content:"\\e008"}.glyphicon-film:before{content:"\\e009"}.glyphicon-th-large:before{content:"\\e010"}.glyphicon-th:before{content:"\\e011"}.glyphicon-th-list:before{content:"\\e012"}.glyphicon-ok:before{content:"\\e013"}.glyphicon-remove:before{content:"\\e014"}.glyphicon-zoom-in:before{content:"\\e015"}.glyphicon-zoom-out:before{content:"\\e016"}.glyphicon-off:before{content:"\\e017"}.glyphicon-signal:before{content:"\\e018"}.glyphicon-cog:before{content:"\\e019"}.glyphicon-trash:before{content:"\\e020"}.glyphicon-home:before{content:"\\e021"}.glyphicon-file:before{content:"\\e022"}.glyphicon-time:before{content:"\\e023"}.glyphicon-road:before{content:"\\e024"}.glyphicon-download-alt:before{content:"\\e025"}.glyphicon-download:before{content:"\\e026"}.glyphicon-upload:before{content:"\\e027"}.glyphicon-inbox:before{content:"\\e028"}.glyphicon-play-circle:before{content:"\\e029"}.glyphicon-repeat:before{content:"\\e030"}.glyphicon-refresh:before{content:"\\e031"}.glyphicon-list-alt:before{content:"\\e032"}.glyphicon-lock:before{content:"\\e033"}.glyphicon-flag:before{content:"\\e034"}.glyphicon-headphones:before{content:"\\e035"}.glyphicon-volume-off:before{content:"\\e036"}.glyphicon-volume-down:before{content:"\\e037"}.glyphicon-volume-up:before{content:"\\e038"}.glyphicon-qrcode:before{content:"\\e039"}.glyphicon-barcode:before{content:"\\e040"}.glyphicon-tag:before{content:"\\e041"}.glyphicon-tags:before{content:"\\e042"}.glyphicon-book:before{content:"\\e043"}.glyphicon-bookmark:before{content:"\\e044"}.glyphicon-print:before{content:"\\e045"}.glyphicon-camera:before{content:"\\e046"}.glyphicon-font:before{content:"\\e047"}.glyphicon-bold:before{content:"\\e048"}.glyphicon-italic:before{content:"\\e049"}.glyphicon-text-height:before{content:"\\e050"}.glyphicon-text-width:before{content:"\\e051"}.glyphicon-align-left:before{content:"\\e052"}.glyphicon-align-center:before{content:"\\e053"}.glyphicon-align-right:before{content:"\\e054"}.glyphicon-align-justify:before{content:"\\e055"}.glyphicon-list:before{content:"\\e056"}.glyphicon-indent-left:before{content:"\\e057"}.glyphicon-indent-right:before{content:"\\e058"}.glyphicon-facetime-video:before{content:"\\e059"}.glyphicon-picture:before{content:"\\e060"}.glyphicon-map-marker:before{content:"\\e062"}.glyphicon-adjust:before{content:"\\e063"}.glyphicon-tint:before{content:"\\e064"}.glyphicon-edit:before{content:"\\e065"}.glyphicon-share:before{content:"\\e066"}.glyphicon-check:before{content:"\\e067"}.glyphicon-move:before{content:"\\e068"}.glyphicon-step-backward:before{content:"\\e069"}.glyphicon-fast-backward:before{content:"\\e070"}.glyphicon-backward:before{content:"\\e071"}.glyphicon-play:before{content:"\\e072"}.glyphicon-pause:before{content:"\\e073"}.glyphicon-stop:before{content:"\\e074"}.glyphicon-forward:before{content:"\\e075"}.glyphicon-fast-forward:before{content:"\\e076"}.glyphicon-step-forward:before{content:"\\e077"}.glyphicon-eject:before{content:"\\e078"}.glyphicon-chevron-left:before{content:"\\e079"}.glyphicon-chevron-right:before{content:"\\e080"}.glyphicon-plus-sign:before{content:"\\e081"}.glyphicon-minus-sign:before{content:"\\e082"}.glyphicon-remove-sign:before{content:"\\e083"}.glyphicon-ok-sign:before{content:"\\e084"}.glyphicon-question-sign:before{content:"\\e085"}.glyphicon-info-sign:before{content:"\\e086"}.glyphicon-screenshot:before{content:"\\e087"}.glyphicon-remove-circle:before{content:"\\e088"}.glyphicon-ok-circle:before{content:"\\e089"}.glyphicon-ban-circle:before{content:"\\e090"}.glyphicon-arrow-left:before{content:"\\e091"}.glyphicon-arrow-right:before{content:"\\e092"}.glyphicon-arrow-up:before{content:"\\e093"}.glyphicon-arrow-down:before{content:"\\e094"}.glyphicon-share-alt:before{content:"\\e095"}.glyphicon-resize-full:before{content:"\\e096"}.glyphicon-resize-small:before{content:"\\e097"}.glyphicon-exclamation-sign:before{content:"\\e101"}.glyphicon-gift:before{content:"\\e102"}.glyphicon-leaf:before{content:"\\e103"}.glyphicon-fire:before{content:"\\e104"}.glyphicon-eye-open:before{content:"\\e105"}.glyphicon-eye-close:before{content:"\\e106"}.glyphicon-warning-sign:before{content:"\\e107"}.glyphicon-plane:before{content:"\\e108"}.glyphicon-calendar:before{content:"\\e109"}.glyphicon-random:before{content:"\\e110"}.glyphicon-comment:before{content:"\\e111"}.glyphicon-magnet:before{content:"\\e112"}.glyphicon-chevron-up:before{content:"\\e113"}.glyphicon-chevron-down:before{content:"\\e114"}.glyphicon-retweet:before{content:"\\e115"}.glyphicon-shopping-cart:before{content:"\\e116"}.glyphicon-folder-close:before{content:"\\e117"}.glyphicon-folder-open:before{content:"\\e118"}.glyphicon-resize-vertical:before{content:"\\e119"}.glyphicon-resize-horizontal:before{content:"\\e120"}.glyphicon-hdd:before{content:"\\e121"}.glyphicon-bullhorn:before{content:"\\e122"}.glyphicon-bell:before{content:"\\e123"}.glyphicon-certificate:before{content:"\\e124"}.glyphicon-thumbs-up:before{content:"\\e125"}.glyphicon-thumbs-down:before{content:"\\e126"}.glyphicon-hand-right:before{content:"\\e127"}.glyphicon-hand-left:before{content:"\\e128"}.glyphicon-hand-up:before{content:"\\e129"}.glyphicon-hand-down:before{content:"\\e130"}.glyphicon-circle-arrow-right:before{content:"\\e131"}.glyphicon-circle-arrow-left:before{content:"\\e132"}.glyphicon-circle-arrow-up:before{content:"\\e133"}.glyphicon-circle-arrow-down:before{content:"\\e134"}.glyphicon-globe:before{content:"\\e135"}.glyphicon-wrench:before{content:"\\e136"}.glyphicon-tasks:before{content:"\\e137"}.glyphicon-filter:before{content:"\\e138"}.glyphicon-briefcase:before{content:"\\e139"}.glyphicon-fullscreen:before{content:"\\e140"}.glyphicon-dashboard:before{content:"\\e141"}.glyphicon-paperclip:before{content:"\\e142"}.glyphicon-heart-empty:before{content:"\\e143"}.glyphicon-link:before{content:"\\e144"}.glyphicon-phone:before{content:"\\e145"}.glyphicon-pushpin:before{content:"\\e146"}.glyphicon-usd:before{content:"\\e148"}.glyphicon-gbp:before{content:"\\e149"}.glyphicon-sort:before{content:"\\e150"}.glyphicon-sort-by-alphabet:before{content:"\\e151"}.glyphicon-sort-by-alphabet-alt:before{content:"\\e152"}.glyphicon-sort-by-order:before{content:"\\e153"}.glyphicon-sort-by-order-alt:before{content:"\\e154"}.glyphicon-sort-by-attributes:before{content:"\\e155"}.glyphicon-sort-by-attributes-alt:before{content:"\\e156"}.glyphicon-unchecked:before{content:"\\e157"}.glyphicon-expand:before{content:"\\e158"}.glyphicon-collapse-down:before{content:"\\e159"}.glyphicon-collapse-up:before{content:"\\e160"}.glyphicon-log-in:before{content:"\\e161"}.glyphicon-flash:before{content:"\\e162"}.glyphicon-log-out:before{content:"\\e163"}.glyphicon-new-window:before{content:"\\e164"}.glyphicon-record:before{content:"\\e165"}.glyphicon-save:before{content:"\\e166"}.glyphicon-open:before{content:"\\e167"}.glyphicon-saved:before{content:"\\e168"}.glyphicon-import:before{content:"\\e169"}.glyphicon-export:before{content:"\\e170"}.glyphicon-send:before{content:"\\e171"}.glyphicon-floppy-disk:before{content:"\\e172"}.glyphicon-floppy-saved:before{content:"\\e173"}.glyphicon-floppy-remove:before{content:"\\e174"}.glyphicon-floppy-save:before{content:"\\e175"}.glyphicon-floppy-open:before{content:"\\e176"}.glyphicon-credit-card:before{content:"\\e177"}.glyphicon-transfer:before{content:"\\e178"}.glyphicon-cutlery:before{content:"\\e179"}.glyphicon-header:before{content:"\\e180"}.glyphicon-compressed:before{content:"\\e181"}.glyphicon-earphone:before{content:"\\e182"}.glyphicon-phone-alt:before{content:"\\e183"}.glyphicon-tower:before{content:"\\e184"}.glyphicon-stats:before{content:"\\e185"}.glyphicon-sd-video:before{content:"\\e186"}.glyphicon-hd-video:before{content:"\\e187"}.glyphicon-subtitles:before{content:"\\e188"}.glyphicon-sound-stereo:before{content:"\\e189"}.glyphicon-sound-dolby:before{content:"\\e190"}.glyphicon-sound-5-1:before{content:"\\e191"}.glyphicon-sound-6-1:before{content:"\\e192"}.glyphicon-sound-7-1:before{content:"\\e193"}.glyphicon-copyright-mark:before{content:"\\e194"}.glyphicon-registration-mark:before{content:"\\e195"}.glyphicon-cloud-download:before{content:"\\e197"}.glyphicon-cloud-upload:before{content:"\\e198"}.glyphicon-tree-conifer:before{content:"\\e199"}.glyphicon-tree-deciduous:before{content:"\\e200"}.glyphicon-cd:before{content:"\\e201"}.glyphicon-save-file:before{content:"\\e202"}.glyphicon-open-file:before{content:"\\e203"}.glyphicon-level-up:before{content:"\\e204"}.glyphicon-copy:before{content:"\\e205"}.glyphicon-paste:before{content:"\\e206"}.glyphicon-alert:before{content:"\\e209"}.glyphicon-equalizer:before{content:"\\e210"}.glyphicon-king:before{content:"\\e211"}.glyphicon-queen:before{content:"\\e212"}.glyphicon-pawn:before{content:"\\e213"}.glyphicon-bishop:before{content:"\\e214"}.glyphicon-knight:before{content:"\\e215"}.glyphicon-baby-formula:before{content:"\\e216"}.glyphicon-tent:before{content:"\\26fa"}.glyphicon-blackboard:before{content:"\\e218"}.glyphicon-bed:before{content:"\\e219"}.glyphicon-apple:before{content:"\\f8ff"}.glyphicon-erase:before{content:"\\e221"}.glyphicon-hourglass:before{content:"\\231b"}.glyphicon-lamp:before{content:"\\e223"}.glyphicon-duplicate:before{content:"\\e224"}.glyphicon-piggy-bank:before{content:"\\e225"}.glyphicon-scissors:before{content:"\\e226"}.glyphicon-bitcoin:before{content:"\\e227"}.glyphicon-btc:before{content:"\\e227"}.glyphicon-xbt:before{content:"\\e227"}.glyphicon-yen:before{content:"\\00a5"}.glyphicon-jpy:before{content:"\\00a5"}.glyphicon-ruble:before{content:"\\20bd"}.glyphicon-rub:before{content:"\\20bd"}.glyphicon-scale:before{content:"\\e230"}.glyphicon-ice-lolly:before{content:"\\e231"}.glyphicon-ice-lolly-tasted:before{content:"\\e232"}.glyphicon-education:before{content:"\\e233"}.glyphicon-option-horizontal:before{content:"\\e234"}.glyphicon-option-vertical:before{content:"\\e235"}.glyphicon-menu-hamburger:before{content:"\\e236"}.glyphicon-modal-window:before{content:"\\e237"}.glyphicon-oil:before{content:"\\e238"}.glyphicon-grain:before{content:"\\e239"}.glyphicon-sunglasses:before{content:"\\e240"}.glyphicon-text-size:before{content:"\\e241"}.glyphicon-text-color:before{content:"\\e242"}.glyphicon-text-background:before{content:"\\e243"}.glyphicon-object-align-top:before{content:"\\e244"}.glyphicon-object-align-bottom:before{content:"\\e245"}.glyphicon-object-align-horizontal:before{content:"\\e246"}.glyphicon-object-align-left:before{content:"\\e247"}.glyphicon-object-align-vertical:before{content:"\\e248"}.glyphicon-object-align-right:before{content:"\\e249"}.glyphicon-triangle-right:before{content:"\\e250"}.glyphicon-triangle-left:before{content:"\\e251"}.glyphicon-triangle-bottom:before{content:"\\e252"}.glyphicon-triangle-top:before{content:"\\e253"}.glyphicon-console:before{content:"\\e254"}.glyphicon-superscript:before{content:"\\e255"}.glyphicon-subscript:before{content:"\\e256"}.glyphicon-menu-left:before{content:"\\e257"}.glyphicon-menu-right:before{content:"\\e258"}.glyphicon-menu-down:before{content:"\\e259"}.glyphicon-menu-up:before{content:"\\e260"}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}:before,:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}
                        </style>
                        `);
                }
                
                // 버전 체크
                if(!version_message_once){
                    await nomo_version.checkNewVersion();
                }
                else{
                    version_message_once = true;
                }

                var temp_func = function(){nomo_version.checkNewVersion(true);};
                utils.resetAtMidnight(temp_func);

                // 채팅 매니저 초기화
                chat_manager.init(nomo_global.$GLOBAL_IFRAME_DOCUMENT);

                // 좌표 보내기 버튼 생성
                ADD_send_location_layout();

                // 향상된 자동스크롤 위해서 최신 채팅 엘리먼트 숨기기
                if(ADD_config.chat_scroll){
                    var $latest_chat = nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("div.latest_chat");
                    $latest_chat.css("margin",0).css("padding",0).css("height","0").css("border","0").css("overflow","hidden");
                }

                // 자동 새로고침 layout 생성
                //await hold.chat_hold_read();
                //hold.chat_hold_layout();

                // 툴팁 숨기기 토글
                chat_tooltip_toggle();

                // 스크롤 시 이벤트
                // nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".content").on("scroll", function(e){
                //     ADD_DEBUG("scrolled", e);
                // });

                // chat_type_and_go
                chat_type_and_go_main();
            });


            // 마우스 오버 시 이미지 뜨는 것 막기
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.on("DOMNodeInserted", "div#popupWrap", function (){
                if(ADD_config.chat_image_preview && ADD_config.chat_image_mouseover_prevent){
                    var $imgElems = $(this).find("img");
                    if($imgElems.length == 1 && $imgElems.parent().css("width") == "200px"){
                        $imgElems.parent().remove();
                    }
                }
            });

            // 채팅 라인 생성될 때 함수적용
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.on("DOMNodeInserted", "div.line", function (){
                var $line = $(this);
                if(!($line.hasClass("fired"))){
                    chatElemControl($line);
                }
            });

            // 유저목록 생성될 때 함수적용
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.on("DOMNodeInserted", "div.userFloor", function (){
                var $userFloor = $(this);
                setTimeout(function(){
                    if(!($userFloor.hasClass("fired"))){
                        $userFloor.addClass("fired");
                        var list_nick = $userFloor.attr("nick");
                        if(chat_manager !== undefined && ADD_config.chat_memo){
                            var memo_index = chat_manager.indexFromData(list_nick);
                
                            if(memo_index !== -1){
                                var temp_obj = chat_manager.getData(memo_index);
                                var temp_display_name = temp_obj.display_name;
                
                                // 메모 달기
                                var temp_text;
                                if(temp_display_name !== undefined){
                                    if(temp_display_name === ""){
                                        temp_text = "*";
                                    }
                                    else{
                                        temp_text = "["+[temp_display_name]+"]";
                                    }
                                    if(chat_manager.getIsBlock(list_nick)){
                                        temp_text = temp_text + " - 차단됨";
                                    }
                                    $userFloor.append("<span class=\"conversation_memo\" style=\"color:red;font-weight:700;vertical-align:inherit;display:-webkit-inline-box\">&nbsp"+ temp_text +"</span>");
                                    
                                    if(ADD_config.chat_userlist_memo_top){
                                        $userFloor.prependTo($userFloor.closest("div.member-list"));
                                        ADD_DEBUG("temp_display_name", temp_display_name);
                                    }
                                }
                            }
                        }
                    }
                },1);
            });

            // 채팅창에 있는 두스 링크 클릭 시 이벤트
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.on("click",".topClick",function(e){
                ADD_DEBUG("TOP CLICKED");
                e.preventDefault();
                ADD_DEBUG("PARENT WINDOW LOCATION HREF", parent.window.location.href);
                window.parent.location.href = this.href;
            });

            // 채팅창 닉네임 클릭 시 "메모하기" 버튼 생성하기
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.on("click", "span.nick, div.nick", function (){
                if(!ADD_config.chat_memo){
                    nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#do_memo").remove();
                    nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#memo_isSavedMemo").hide();
                    return;
                }
                var $this = $(this);

                // 창 위치 재설정하기
                var $content = nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("div.content").first();
                var offsetHeight = $content[0].offsetHeight;
                var $popupWrap = nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("#popupWrap");
                var popupTop = Number($popupWrap.css("top").replace("px",""));
                var popupHeight = Number($popupWrap.css("height").replace("px","")) + 33;
                var dif = popupTop + popupHeight - offsetHeight - 56 ;
                if(dif>0){
                    $popupWrap.css("top",(popupTop-dif)+"px");
                }

                // 필수 내용 찾기
                var nick = $this.attr("nick");
                var detail_content;

                // 유저 목록에서 선택한 경우
                if($this.hasClass("userFloor")){
                    detail_content = "";
                }
                // 채팅에서 선택한 경우
                else{
                    detail_content = $this.closest("div.line").find("span.chatContent").text().substr(0, 40);
                }
                var temp_obj = {"nick":nick,"detail_content":detail_content};
                var $memo_button = $("<div id=\"do_memo\" class=\"floor\" style=\"color:red;font-weight:700;\">메모하기</div>");
                nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".usermenu_popup").first().append($memo_button);
                $memo_button.on("click",async function(){
                    await chat_manager.openSimplelayout(temp_obj);
                });
            });

            //////////////////////////////////////////////////////////////////////////////////
            // imgur click event
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.on("click", ".imgur_safe_button", function(){
                $(this).closest(".imgur_container").removeClass("blurred");
                $(this).parent(".imgur_safe_screen").addClass("clicked").fadeOut(300);
            });
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.on("click", ".imgur_control_hide", function(){
                ADD_DEBUG("Chatting 내 호출된 imgur 이미지 에서 - 버튼 클릭됨");
                $(this).closest(".imgur_container").addClass("blurred");
                var $safe_screen = $(this).closest(".imgur_container").find(".imgur_safe_screen");
                if($safe_screen.hasClass("clicked")){
                    var safe_screen_opacity = Number(ADD_config.imgur_preview_opacity);
                    if(!($.isNumeric(ADD_config.imgur_preview_opacity))){
                        safe_screen_opacity = 0.93;
                    }
                    else if(safe_screen_opacity < 0 || safe_screen_opacity > 1){
                        safe_screen_opacity = 0.93;
                    }
                    $safe_screen.removeClass("clicked").fadeTo(300, safe_screen_opacity);
                }
                else{
                    $safe_screen.addClass("clicked").fadeOut(300);
                }
            });
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.on("click", ".imgur_control_remove", function(){
                ADD_DEBUG("Chatting 내 호출된 imgur 이미지 에서 x 버튼 클릭됨");
                $(this).closest(".imgur_container").remove();
            });

            // .chatInput 클릭 관련 이벤트
            if(ADD_config.chat_input_click){
                nomo_global.$GLOBAL_IFRAME_DOCUMENT.on("click", ".chatInput", function(e){
                    $(e.target).blur();
                    $(e.target).focus();
                });
            }

            // 스크롤바 관련 이벤트 - 향상된 자동 스크롤
            if(ADD_config.chat_scroll){
                ADD_DEBUG("CHAT - Scroll 이벤트 ON");
                nomo_global.$GLOBAL_IFRAME_DOCUMENT.on("wheel.chatScrollFunc mousewheel.chatScrollFunc", "div.content", function(event) {//div.wrap div.contentWrap
                    //마우스휠 위로 돌릴때 이벤트
                    //ADD_DEBUG(event);
                    var scroll_val = -1;
                    if (event.type == "mousewheel"){
                        scroll_val = event.originalEvent.wheelDelta;
                    }
                    else if (event.type == "wheel" || event.type == "scroll"){
                        scroll_val = event.originalEvent.deltaY * (-1);
                    }
                    // ADD_DEBUG("scroll_val", scroll_val);
                    if (scroll_val >= 0) {
                        // 세로 스크롤바가 있을 경우 처리
                        if( $(this).get(0).scrollHeight > $(this).innerHeight() ){  //find("div.content").first(). find("div.content").
                            // UCHAT의 설정을 직접 변경한다.
                            var roomid = "";
                            if(iframeElems.contentWindow !== undefined &&
                                iframeElems.contentWindow.rooms !== undefined){
                                if(iframeElems.contentWindow.rooms["dostest"] !== undefined){
                                    roomid = "dostest";
                                }
                                else if(iframeElems.contentWindow.rooms["dostream"] !== undefined){
                                    roomid = "dostream";
                                }
                                else{
                                    roomid = Object.keys(iframeElems.contentWindow.rooms)[0];
                                }
                            }

                            if(roomid !== undefined && roomid !== "" && roomid !== null){
                                iframeElems.contentWindow.rooms[roomid].room.setting.data["option.autoScroll"] = 0;
                                iframeElems.contentWindow.rooms[roomid].room.log.temp_scroll_stop = 0;

                                // 대체 latest_chat 생성
                                if(nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".latest_chat_new_container").length === 0){
                                    var $latest_chat_new = $(`
                                    <div class="latest_chat_new_container" style="display:none;">
                                        <div class="latest_chat_new" style="background:rgba(0,0,0,.75);bottom:30px;color:#faf9fa;padding:5px;height:28px;font-size:12px;position:fixed;justify-content:center;align-items:center;text-align:center;width:100%;box-sizing:border-box;z-index:1000;cursor:pointer;border-radius:4px;">
                                            <span>아래에서 더 많은 메시지를 확인하세요.</span>
                                        </div>
                                    </div>
                                    `);
                                    nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("div.wrap").first().append($latest_chat_new);
                                    $latest_chat_new.on("click", function(){
                                        nomo_global.isGoScrollDown = true;
                                        goScrollDown();
                                        $(this).hide();
                                    });
                                }

                                nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".latest_chat_new_container").stop("true","true").show();
                                nomo_global.isGoScrollDown = false;
                                nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".latest_chat").stop("true","true").show();
                                // 대체 latest_chat 생성 끝
                            }
                            else{
                                ADD_DEBUG("에러!! iframeElems.contentWindow.rooms", iframeElems.contentWindow.rooms);
                            }
                        }
                        else {
                            // 스크롤바가 없는 경우
                        }

                    }

                    else {
                        //마우스휠 아래로 돌릴때 이벤트
                        if(isChatScrollOn()){
                            nomo_global.isGoScrollDown = true;
                            nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".latest_chat_new_container").stop("true","true").hide();
                        }

                        var scrollHeight = $(this)[0].scrollHeight;
                        var scrollTop = $(this)[0].scrollTop;
                        var height = $(this).height();

                        // ADD_DEBUG(scrollHeight - scrollTop - height, ADD_config.chat_scroll_down_min);
                        if(scrollHeight - scrollTop - height <= ADD_config.chat_scroll_down_min){
                            nomo_global.isGoScrollDown = true;
                            goScrollDown();
                            nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".latest_chat_new_container").stop("true","true").hide();
                        }
                    }
                });
            }


        });
    } // else 끝
} // ADD_chatting_arrive 함수 끝

function chatDoeEvntFunc(elem){
    $(elem[0]).one("DOMNodeInserted", "div.content", function() {
        ADD_DEBUG("iframe 내 div.content 로드 완료!");
        //var elem = $('.chat-container > iframe').contents().first().find('u-chat > iframe').contents().first();
        //var elem = $('u-chat > iframe').contents().first();
        var elemHead = $(elem).find("head");
        var elemContent = $(elem).find("div.content");

        if(elemHead.length === 0 && elemContent.length === 0){
            ADD_DEBUG("채팅창에 이벤트 바인드하지 못함");
            ADD_DEBUG("elemHead.length",elemHead.length,"elemContent.length",elemContent.length);
            return false;
        }

        // 채팅창 내 Lightbox 클릭 시 Lightbox 띄움
        $(elem).on("click", ".open-lightbox", function(e){
            e.preventDefault();
            var $this = $(this);
            var image = $this.attr("src");
            parent.$("html").addClass("no-scroll");
            var simple_image = "";
            if(isVideo(image)){
                simple_image = "<video class='chat_image' loop controls muted autoplay src=\""+image+"\"></video>";
            }
            else{
                simple_image = "<img class='chat_image' src=\""+image+"\" />";
            }
            parent.$("body").append("<div class=\"lightbox-opened\">"+simple_image+"</div>");
        });

        // Close Lightbox
        //$(elem).on('click', '.lightbox-opened', function(){
        //    $('html').removeClass('no-scroll');
        //    $('.lightbox-opened').remove();
        //});

        // 채팅 다시 시작
        $(elem).on("click", ".ADD_chat_again", function(){
            //$('.chat-container').html('<iframe src="./uchat2.php" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>');
            location.reload();
        });
    });
}

export function chatImagelayoutfromLinks($line, arr){
    var i;
    var newimg;
    var img_length = arr.length;
    var views = "";
    var views_style = "";
    var nudity_block = ADD_config.nudity_block;

    if($line === undefined || arr === undefined || img_length === 0){
        ADD_DEBUG("chatImagelayoutfromLinks - 이미지 오브젝트가 존재하지 않음", arr);
        return false;
    }

    // 기본 컨테이너 생성
    //<div style="font-weight: normal;font-size:11px;padding-top:5px;">by <strong>HFDFKDKF</strong> - 4 hr</div>
    var $ADD_image_container = $(`
        <div class="imgur_container">
            <div class="imgur_safe_screen" style="display:none;">
                <span class="imgur_safe_button btn btn-default align-middle" style="display:none;">View image</span>
            </div>
            <div class="imgur_control_button ADD_tr">
                <span class="imgur_image_title">`+(arr[0].title !== undefined && arr[0].title !== null ? "" + arr[0].title : "")+`</span>
                <span class="imgur_control_hide glyphicon glyphicon-minus-sign" style="display:none;">
                </span>
                <span class="imgur_control_remove glyphicon glyphicon-remove-sign" style="">
                </span>
            </div>
            <div class="simple_image_container">
                <div class="viewers" style="display:none;"><span>👁 </span></div>
                <div class="simple_image"></div>
            </div>
            <div class="imgur_more_images" style="display:none;"></div>
            <div class="imgur_control_button ADD_br">
                <span class="videoType" style="display:none"></span>
                <span class="imgur_more_images_button" style="opacity:0.0"></span>
                <span class="imgur_control_hide glyphicon glyphicon-minus-sign" style="display:none;">
                </span>
                <span class="imgur_control_remove glyphicon glyphicon-remove-sign" style="">
                </span>
            </div>
        </div>`);
    // var $ADD_image_container = $(`
    // <div class="imgur_container">
    //     <div class="imgur_safe_screen" style="display:none;">
    //         <span class="imgur_safe_button btn btn-default align-middle" style="display:none;">View image</span>
    //     </div>
    //
    //     <!-- 블록 -->
    //     <div class="imgur_control_button ADD_tr">
    //         <span class="imgur_image_title">`+(arr[0].title !== undefined && arr[0].title !== null ? "" + arr[0].title : "")+`</span>
    //         <span class="imgur_control_hide glyphicon glyphicon-minus-sign" style="display:none;">
    //             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0MjoyNSswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MzA1ZmM0ZTItOWVjOC05NTQzLTgzODQtZGI0YWJiMDkwMWYyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6N2E1NmRlNDEtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Y2NkMjU2MTItZDgzNC01MTQzLTliNTUtNTg4YTNkMTliMmIwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNjZDI1NjEyLWQ4MzQtNTE0My05YjU1LTU4OGEzZDE5YjJiMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozMDVmYzRlMi05ZWM4LTk1NDMtODM4NC1kYjRhYmIwOTAxZjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PuZjetEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA99JREFUeNp8lc9rFGcYxz/vm9mZMTszO7PZZLPZoEncdAnSJHVJKERERZpecujB9mAL/Q8KPRU08dJDrx568lRohfbQQwNCDkIr7cFAQQQRW1GbxE1qNetuktnZyfzoITNhKzQPfJmZ7zzP9/k+Ly/vK3gjTp2aQAh4/Pjpgq5rC7u7e7NBEJwAUBTlL8PIrnpeZ7lSGV2OY3jw4CFHhm3n5m07dw+IUwghYiFE3M3Zdu6ebefmjxQTQiymBVLKp5ZlXimVimcLhb4ThULfiVKpeNayzCtSyqddzRb/T+xq6sKyrMVKZYzBwQGq1XGKxQGKxYP3wcEBKpUxLMta7HJ/9VBoZuY0/f2Fua5xLmWz2e5eQ8BPCYZSMsm5lNb19xfmZmZOQ602TT7vPDtwZl7r68szOjqS1o0APtBJ4Ccco6Mj9PXlsSzzGhDn886zWm0aoaqZ93x/fwWoT0xUy8eO6SiKwurq7wA/J67eShr8AdSBc7OzNYIgoN32ePjw0XNgSFUz89IwjMsAjpO77rou9foWa2sbqcPjwJ2u8e8kHGtrG9TrW7iui+PkrgMYhnFZaTZbs8nHbcsy6XR8ALa2/h4GikAZOJkIlhNu2LLMDQBNU4mi6Haj0aTZbM0qYRgeFwKiKKrv7OwShlHq5hbQC7wPPH5jU9xqt71JAN/3iaKoLgSEYXhcEUIAMUEQABBFh4KyS+Db5Plx+i8I9pN8eVgrhEAqirIexyClHMpms2iahqZpAO0uwR8TpNFO87LZLFLKoTgGRVHWpaapdwGCILyg6zpSSjIZ5U2HZxIcus9kFKSU6LpOEIQXkvW8K207dxOg0Xj9mRCQzzsYhgGw3yXweYI09g3DIJ93EOKgNjkHbkrbtleklGtBEJS3txtL1eo4pmkC3AAiYBN4mWAz4W6Ypkm1Os72dmMpCIKylHLNtu0VMTf3LpubW3NPnjz7FaBaHf/Itq0fXr7cxvM6RFGIEAfTx3GElD3oukahkOf169aHjx79+T3A2NjImVJp8LeearVCqTS4vrOzE+7u7l149Wr7kuu2Y8MwfjnYASClPEQmo6IoCuvrz5c2NupfA5RKxcWpqbe/EwJ6Tp4cpadHUi6X77iuG7VaO+c9zzvfbLY+DcPAjKKYOI4Jw9D2/f2pvb29T168+Ocb13U/ABgeHlqq1d75Mo4joihCXLx4jjiO6e3txfM87t9/MN9oNL7y/f3po85OVc3ccxzni8nJUyu6ruO6LkIIlHRDBkGA53k4jrPS23tspdlsLXQ6/oLv+/+5AlRVXdU0dTmXs5Y1TcfzPBRFIV2efwcAVYSABgRv8C8AAAAASUVORK5CYII=" />
    //         </span>
    //         <span class="imgur_control_remove glyphicon glyphicon-remove-sign" style="">
    //             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0Mjo0NyswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZWMzOWJmMzYtMmRjOS0wMDQwLWI3ZjktY2QxYTViZjBmZjIyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OGFlNTk3MjgtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Yjk0ZmQ5ZTEtMjEzMi1mNDRlLWIyYTMtZDBhMWVhOTA1ZjEwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmI5NGZkOWUxLTIxMzItZjQ0ZS1iMmEzLWQwYTFlYTkwNWYxMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplYzM5YmYzNi0yZGM5LTAwNDAtYjdmOS1jZDFhNWJmMGZmMjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pj4Iwe0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABQJJREFUeNpclEuIHEUYx/9V1TWz3dWzPbtm9jGzs7tJ1JgEEhOTQEjU7OID1Agq8RRBAgqCHnLJKYnxBXoRPagIggeNHgIKKoIgonnp5qEhqHm46+5mTHZmd57d0z0z3V1VHiYJmu/48fGrj49//QhuqbVrV4MQYHp6dmdPT3Jns+lvieN4jBACw2BXOOenLMv8SgjxNecc2ewwhDARRTEAgNwKTKedhwG8Va831t/oEUKgNQDom3Oc8/PptLNvw4Z13yWTCQRBC4SQ/wMJIQe01q8CAKV0zrbFR0JYx6IonldKgTE2GsfRvY2G95xSahwAcrnhgxs33v2alBJhGIL9B7YfwGvXtzw4ODjwpFL6mGVZ851Op6GUbphm4ooQ9rHe3tS7yWRC+n4w6XnNCc/zZD6fOxrHEmzz5o2Iomib7wefXmc/rbX+YGwsjyBoYWBgGYKgDUoJ+vr64Loeenp6MDY2etQ0e/6sVKq7mk1/Uin1fW+vUzCUUpBSHgaA3t7UIcbYESEsDA0NwvOayOdH4DgOCKGglKBcriCTyYBzjtWrVx1pNBqvlEpLL8/Ozh9OpVLjrFKpPNRs+i8CuLZixfLHh4YGMTw8hEqleuf8fGGvYRjzuVy2ZlkmlpbK2ULhnz3LlvXP2rbwGw0XjuP8WCwuPh/HMq+1/pk5jnOw1Wqv7+tzXqeUnvA8H1EUYWZm9jnf919ZWCjtzmRue0cpJX/55fSldruzy/eDOULIad8PYJomOp2O4fv+g1prRRhjF6SUd+XzuU3ptHM2kUhgfHwM9Xq9/+TJqS9brfZ9nPMLjNGw3e6sF0Kc27Jl4yNCWAtXry4gimI0Gu49hcI/ZzjnFwkAnxBY2exwlnO+oLXG6OgIMpllCMMQJ05MfV2r1R+7fuMfd+zYPsE5x+LiEv7+ew6MMURRPFwsFq8BJKCEdKMYxzGiKIKUCowZoJQiimJTKdV7I1pxHNvVat2hlCCZTN6AIY7jm3+EGoZR0BqglGYty0J/fxqWZaJYLN35ww9HLzca7n3ptPOt4/R+EQStTceP/zw3PT27ljEGIQQSCQ5KSVZrDYAUaDKZmOq+Lidt24bnNTE3N48zZ37bG0XRiG3b5+6/f9uj27dvfcqyzOMA0hcv/vXMtWtFUEqQStkIw2iyexIxxQYGMi3X9XaHYbhmcDDztm3bGBnJQgjxV6vVnt60acMLQliSc45UKvWx6zYvb926+fN02vE9rwkAKJWWjkgpU5Zl7mOjo/mZcrmyR0qZNwym161b+1O97kIpVeHcmMrnR+TCQhG+76O/vw9hGP5umqZ/6tRZFApXsbhYPiilfFwI68qaNXe9xO64YyUMg52u1ep7XNebkFJeIIT8US5XEMcSruuiULiKUmkJQRCAMYpyuYJSaQkAngbIe10b6Ueq1VqBrVp1O4aHhwqe58lm058sl6u7Wq2Wtm3xUxxL1Ot1JBI9iOMYQdAC5xyGYaBare0nhLzfDYneL6X6LAwjsJUrl4MxilwudzQIAuW63kS73Z5wXe9ZpWSKUgZAQ0qVJoSsbzb93dVq7RMp5RNdS+GA1njjprUeeGAHtNawLAvtdhvnz//xcK1WezMMo7tvcSW60eiWZZnnO53OPinVd/+dYytWjHdNSwiCIIBSmLEs80NK6a+UsiYAQ2vdA6DNGL1k2+IbIcxD4+Oje6vV+oyU8n/G/3cAFcF5BFWY41IAAAAASUVORK5CYII=" />
    //         </span>
    //     </div>
    //     <div class="simple_image_container">
    //         <div class="viewers" style="display:none;"><span>👁 </span></div>
    //         <div class="simple_image">
    //         </div>
    //     </div>
    //     <!-- 블록 끝 -->
    //
    //     <div class="imgur_control_button ADD_br">
    //         <span class="imgur_more_images_button" style="opacity:0.0"></span>
    //         <span class="imgur_control_hide glyphicon glyphicon-minus-sign" style="display:none;">
    //             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0MjoyNSswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MzA1ZmM0ZTItOWVjOC05NTQzLTgzODQtZGI0YWJiMDkwMWYyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6N2E1NmRlNDEtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Y2NkMjU2MTItZDgzNC01MTQzLTliNTUtNTg4YTNkMTliMmIwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNjZDI1NjEyLWQ4MzQtNTE0My05YjU1LTU4OGEzZDE5YjJiMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozMDVmYzRlMi05ZWM4LTk1NDMtODM4NC1kYjRhYmIwOTAxZjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PuZjetEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA99JREFUeNp8lc9rFGcYxz/vm9mZMTszO7PZZLPZoEncdAnSJHVJKERERZpecujB9mAL/Q8KPRU08dJDrx568lRohfbQQwNCDkIr7cFAQQQRW1GbxE1qNetuktnZyfzoITNhKzQPfJmZ7zzP9/k+Ly/vK3gjTp2aQAh4/Pjpgq5rC7u7e7NBEJwAUBTlL8PIrnpeZ7lSGV2OY3jw4CFHhm3n5m07dw+IUwghYiFE3M3Zdu6ebefmjxQTQiymBVLKp5ZlXimVimcLhb4ThULfiVKpeNayzCtSyqddzRb/T+xq6sKyrMVKZYzBwQGq1XGKxQGKxYP3wcEBKpUxLMta7HJ/9VBoZuY0/f2Fua5xLmWz2e5eQ8BPCYZSMsm5lNb19xfmZmZOQ602TT7vPDtwZl7r68szOjqS1o0APtBJ4Ccco6Mj9PXlsSzzGhDn886zWm0aoaqZ93x/fwWoT0xUy8eO6SiKwurq7wA/J67eShr8AdSBc7OzNYIgoN32ePjw0XNgSFUz89IwjMsAjpO77rou9foWa2sbqcPjwJ2u8e8kHGtrG9TrW7iui+PkrgMYhnFZaTZbs8nHbcsy6XR8ALa2/h4GikAZOJkIlhNu2LLMDQBNU4mi6Haj0aTZbM0qYRgeFwKiKKrv7OwShlHq5hbQC7wPPH5jU9xqt71JAN/3iaKoLgSEYXhcEUIAMUEQABBFh4KyS+Db5Plx+i8I9pN8eVgrhEAqirIexyClHMpms2iahqZpAO0uwR8TpNFO87LZLFLKoTgGRVHWpaapdwGCILyg6zpSSjIZ5U2HZxIcus9kFKSU6LpOEIQXkvW8K207dxOg0Xj9mRCQzzsYhgGw3yXweYI09g3DIJ93EOKgNjkHbkrbtleklGtBEJS3txtL1eo4pmkC3AAiYBN4mWAz4W6Ypkm1Os72dmMpCIKylHLNtu0VMTf3LpubW3NPnjz7FaBaHf/Itq0fXr7cxvM6RFGIEAfTx3GElD3oukahkOf169aHjx79+T3A2NjImVJp8LeearVCqTS4vrOzE+7u7l149Wr7kuu2Y8MwfjnYASClPEQmo6IoCuvrz5c2NupfA5RKxcWpqbe/EwJ6Tp4cpadHUi6X77iuG7VaO+c9zzvfbLY+DcPAjKKYOI4Jw9D2/f2pvb29T168+Ocb13U/ABgeHlqq1d75Mo4joihCXLx4jjiO6e3txfM87t9/MN9oNL7y/f3po85OVc3ccxzni8nJUyu6ruO6LkIIlHRDBkGA53k4jrPS23tspdlsLXQ6/oLv+/+5AlRVXdU0dTmXs5Y1TcfzPBRFIV2efwcAVYSABgRv8C8AAAAASUVORK5CYII=" />
    //         </span>
    //         <span class="imgur_control_remove glyphicon glyphicon-remove-sign" style="">
    //             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0Mjo0NyswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZWMzOWJmMzYtMmRjOS0wMDQwLWI3ZjktY2QxYTViZjBmZjIyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OGFlNTk3MjgtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Yjk0ZmQ5ZTEtMjEzMi1mNDRlLWIyYTMtZDBhMWVhOTA1ZjEwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmI5NGZkOWUxLTIxMzItZjQ0ZS1iMmEzLWQwYTFlYTkwNWYxMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplYzM5YmYzNi0yZGM5LTAwNDAtYjdmOS1jZDFhNWJmMGZmMjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pj4Iwe0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABQJJREFUeNpclEuIHEUYx/9V1TWz3dWzPbtm9jGzs7tJ1JgEEhOTQEjU7OID1Agq8RRBAgqCHnLJKYnxBXoRPagIggeNHgIKKoIgonnp5qEhqHm46+5mTHZmd57d0z0z3V1VHiYJmu/48fGrj49//QhuqbVrV4MQYHp6dmdPT3Jns+lvieN4jBACw2BXOOenLMv8SgjxNecc2ewwhDARRTEAgNwKTKedhwG8Va831t/oEUKgNQDom3Oc8/PptLNvw4Z13yWTCQRBC4SQ/wMJIQe01q8CAKV0zrbFR0JYx6IonldKgTE2GsfRvY2G95xSahwAcrnhgxs33v2alBJhGIL9B7YfwGvXtzw4ODjwpFL6mGVZ851Op6GUbphm4ooQ9rHe3tS7yWRC+n4w6XnNCc/zZD6fOxrHEmzz5o2Iomib7wefXmc/rbX+YGwsjyBoYWBgGYKgDUoJ+vr64Loeenp6MDY2etQ0e/6sVKq7mk1/Uin1fW+vUzCUUpBSHgaA3t7UIcbYESEsDA0NwvOayOdH4DgOCKGglKBcriCTyYBzjtWrVx1pNBqvlEpLL8/Ozh9OpVLjrFKpPNRs+i8CuLZixfLHh4YGMTw8hEqleuf8fGGvYRjzuVy2ZlkmlpbK2ULhnz3LlvXP2rbwGw0XjuP8WCwuPh/HMq+1/pk5jnOw1Wqv7+tzXqeUnvA8H1EUYWZm9jnf919ZWCjtzmRue0cpJX/55fSldruzy/eDOULIad8PYJomOp2O4fv+g1prRRhjF6SUd+XzuU3ptHM2kUhgfHwM9Xq9/+TJqS9brfZ9nPMLjNGw3e6sF0Kc27Jl4yNCWAtXry4gimI0Gu49hcI/ZzjnFwkAnxBY2exwlnO+oLXG6OgIMpllCMMQJ05MfV2r1R+7fuMfd+zYPsE5x+LiEv7+ew6MMURRPFwsFq8BJKCEdKMYxzGiKIKUCowZoJQiimJTKdV7I1pxHNvVat2hlCCZTN6AIY7jm3+EGoZR0BqglGYty0J/fxqWZaJYLN35ww9HLzca7n3ptPOt4/R+EQStTceP/zw3PT27ljEGIQQSCQ5KSVZrDYAUaDKZmOq+Lidt24bnNTE3N48zZ37bG0XRiG3b5+6/f9uj27dvfcqyzOMA0hcv/vXMtWtFUEqQStkIw2iyexIxxQYGMi3X9XaHYbhmcDDztm3bGBnJQgjxV6vVnt60acMLQliSc45UKvWx6zYvb926+fN02vE9rwkAKJWWjkgpU5Zl7mOjo/mZcrmyR0qZNwym161b+1O97kIpVeHcmMrnR+TCQhG+76O/vw9hGP5umqZ/6tRZFApXsbhYPiilfFwI68qaNXe9xO64YyUMg52u1ep7XNebkFJeIIT8US5XEMcSruuiULiKUmkJQRCAMYpyuYJSaQkAngbIe10b6Ueq1VqBrVp1O4aHhwqe58lm058sl6u7Wq2Wtm3xUxxL1Ot1JBI9iOMYQdAC5xyGYaBare0nhLzfDYneL6X6LAwjsJUrl4MxilwudzQIAuW63kS73Z5wXe9ZpWSKUgZAQ0qVJoSsbzb93dVq7RMp5RNdS+GA1njjprUeeGAHtNawLAvtdhvnz//xcK1WezMMo7tvcSW60eiWZZnnO53OPinVd/+dYytWjHdNSwiCIIBSmLEs80NK6a+UsiYAQ2vdA6DNGL1k2+IbIcxD4+Oje6vV+oyU8n/G/3cAFcF5BFWY41IAAAAASUVORK5CYII=" />
    //         </span>
    //     </div>
    // </div>`);

    // 크기 설정
    $ADD_image_container.css("max-width",ADD_config.chat_image_max_width+"px");
    if(arr[0] !== undefined && arr[0].type !== "gfycat" && arr[0].width !== undefined && arr[0].height !== undefined){
        var width = arr[0].width,
            height = arr[0].height,
            max_ratio = Math.min(1.0, ADD_config.chat_image_max_width/width, ADD_config.chat_image_max_height/height),
            width_mod = width*max_ratio,
            height_mod = height*max_ratio;
        $ADD_image_container.find(".simple_image").css("width",width_mod+"px").css("height",height_mod+"px");
        ADD_DEBUG("width",width,"height",height,"max_ratio",max_ratio,width_mod,height_mod);
    }
    else if(arr[0] !== undefined){
        ADD_DEBUG("이미지의 width, height 데이터가 없다");
        $ADD_image_container.find(".simple_image").addClass("whauto");
    }

    if(arr[0].views !== undefined && arr[0].views !== null && $.isNumeric(arr[0].views)){
        views = (arr[0].views >= 1000 ? (Number(arr[0].views) / 1000).toFixed(1) + "k" : ""+arr[0].views);
        views_style = "";
    }
    else{
        views = "";
        views_style = "display:none;";
    }
    $ADD_image_container.find(".viewers").attr("style",views_style).find("span").append(views);

    // 이미지가 하나를 초과한 경우 처리
    if(img_length > 1){
        var loop_length = img_length;
        var temp_text = img_length-1+"개의 이미지를 클릭하여 추가 로드";

        // 최대 5개 까지만 더 보여준다.
        if(img_length > ADD_CHAT_IMAGE_ADDITIONAL_LOAD_MAX+1){
            loop_length = ADD_CHAT_IMAGE_ADDITIONAL_LOAD_MAX+1;
            temp_text = (img_length-1)+"개 중 "+ADD_CHAT_IMAGE_ADDITIONAL_LOAD_MAX+"개의 이미지를 클릭하여 추가 로드";
        }

        // 추가 이미지 로드 위한 컨테이너 생성
        for(i=1;i<loop_length;i++){
            var iwidth_mod = "auto";
            var iheight_mod = "auto";
            if(arr[i] !== undefined && arr[i].width !== undefined && arr[i].height !== undefined){
                var iwidth = arr[i].width,
                    iheight = arr[i].height,
                    imax_ratio = Math.min(1.0, ADD_config.chat_image_max_width/iwidth, ADD_config.chat_image_max_height/iheight);
                iwidth_mod = iwidth*imax_ratio,
                iheight_mod = iheight*imax_ratio;
                ADD_DEBUG("width",iwidth,"height",iheight,"max_ratio",imax_ratio,iwidth_mod,iheight_mod);
            }

            if(arr[i].views !== undefined && arr[i].views !== null && $.isNumeric(arr[i].views)){
                views = (arr[i].views >= 1000 ? (Number(arr[i].views) / 1000).toFixed(1) + "k" : ""+arr[i].views);
                views_style = "";
            }
            else{
                views = "";
                views_style = "display:none;";
            }

            $ADD_image_container
                .find(".imgur_more_images")
                .append(`
                <div class='ADD_tr'>
                    <div class='imgur_image_title'>`+(arr[i].title !== undefined && arr[i].title !== null ? "" + arr[i].title : "")+`</div>
                </div>
                <div class='imgur_more_image_div_container'>
                    <div class="viewers" style="`+views_style+`">
                        <span>👁 `+views+`</span>
                    </div>
                    <div class='imgur_more_image_div' imagehref="`+arr[i].link+`"
                    style='
                        max-width:`+ADD_config.chat_image_max_width+`px;
                        max-height:`+ADD_config.chat_image_max_height+`px;
                        width:`+iwidth_mod+`px;
                        height:`+iheight_mod+`px;'>
                    </div>
                </div>
                `);
        }

        // 추가 이미지 로드 위한 버튼 작동
        $ADD_image_container
            .find(".imgur_more_images_button")
            .css("opacity","1.0")
            .css("cursor","pointer")
            .html(temp_text)
            .one("click",function(){
                // 버튼 클릭 시 작동
                var temp_isChatScrollOn = isChatScrollOn();
                var $imgur_more_images = $ADD_image_container.find("div.imgur_more_images");
                $imgur_more_images.find(".imgur_more_image_div").each(function(){
                    var video_img_url = $(this).attr("imagehref");
                    // video 인지 image 인지 체크
                    if(isVideo(video_img_url)){
                        $(this).html("<video loop controls autoplay muted src=\""+$(this).attr("imagehref")+"\" class=\"imgur_image_in_chat open-lightbox\"></video>")
                            .find("video")
                            .on("load",function(){
                                if( temp_isChatScrollOn ){
                                    ADD_DEBUG("Imgur 비디오 추가 로드 완료됨");
                                    goScrollDown();
                                }
                            });
                    } else{
                        $(this).html("<img src=\""+$(this).attr("imagehref")+"\" class=\"imgur_image_in_chat open-lightbox\" style=\"\" />")
                            .find("img")
                            .on("load",function(){
                                if( temp_isChatScrollOn ){
                                    ADD_DEBUG("Imgur 이미지 추가 로드 완료됨");
                                    goScrollDown();
                                }
                            });
                    }
                });
                $imgur_more_images.show();
                $(this).html("");
            });
    }

    // if(nudity_block){
    //     if(window.nude === undefined){
    //         lib_nude();
    //     }
    //     var is_video = isVideo(arr[0].link);
    //     ADD_DEBUG("IMAGE_LOAD_START", arr[0].link);
    //     var newimage = undefined;
    //     if(is_video){
    //         newimage = document.createElement("video");
    //         newimage.crossOrigin = "Anonymous";
    //         newimage.src = arr[0].link;
    //         newimage.height = "500";
    //         newimage.width = "500";
    //         newimage.play();
    //         $(newimage).one("timeupdate", function(){
    //             nude.checkNudeImage(newimage);
    //         });
    //     }
    //     else{
    //         newimage = new Image();
    //         $(newimage).one("load", function() {
    //             ADD_DEBUG("CHECK START AFTER LOAD");
    //             nude.checkNudeImage(newimage);
    //             ADD_DEBUG("CHECK END AFTER LOAD");
    //         });
    //         newimage.crossOrigin = "Anonymous";
    //         newimage.src = arr[0].link;
    //     }
    // }

    // imgur safe screen 투명도 설정
    if((ADD_config.imgur_preview_safe && arr[0].type !== "youtube" && arr[0].type !== "twitch_clip")
        || (ADD_config.imgur_preview_safe &&
        ((ADD_config.chat_image_youtube_thumb && !ADD_config.chat_image_youtube_thumb_nonsafe && arr[0].type === "youtube") || 
        (ADD_config.chat_image_twitch_thumb && !ADD_config.chat_image_twitch_thumb_nonsafe && arr[0].type === "twitch_clip")))){
        var safe_screen_opacity = Number(ADD_config.imgur_preview_opacity);
        if(!$.isNumeric(ADD_config.imgur_preview_opacity) || safe_screen_opacity < 0 || safe_screen_opacity > 1){
            safe_screen_opacity = 0.93;
        }
        $ADD_image_container.find(".imgur_safe_screen").css("opacity",safe_screen_opacity).css("display","inline-flex");
        $ADD_image_container.find(".imgur_control_hide").css("display","inline-flex");
        $ADD_image_container.find(".imgur_safe_button").css("display","inline-block");
        $ADD_image_container.addClass("blurred");
    }

    // 일단 스크롤 내리고, 스크롤 존재 여부 기억해놓기
    if(isChatScrollOn()){
        goScrollDown();
    }
    var temp_isChatScrollOn = isChatScrollOn();


    // 첫 번째 링크의 비디오 여부 체크
    ADD_DEBUG(arr, arr[0].html);
    if(arr[0].html !== undefined){
        newimg = $(arr[0].html);
        //$ADD_image_container.on("mouseover", function(e){
        //    e.stopPropagation();
        //});
    }
    else if(isVideo(arr[0].link)){
        var autoplay = "";
        if(ADD_config.chat_video_autoplay){
            autoplay = "autoplay";
        }
        newimg = $("<video type=\"video/mp4\" loop controls muted "+autoplay+" src=\""+arr[0].link+"\" class=\"imgur_image_in_chat open-lightbox\" style=\"max-width:"+ADD_config.chat_image_max_width+"px !important;max-height:"+ADD_config.chat_image_max_height+"px !important;\"></video>");
    }
    else{
        newimg = $(`
            <img src=`+arr[0].link+" class=\"imgur_image_in_chat open-lightbox\" style=\"cursor:pointer;max-width:"+ADD_config.chat_image_max_width+"px !important;max-height:"+ADD_config.chat_image_max_height+`px !important;" />
        `);
    }

    // 재생 버튼 추가
    if(arr[0].type === "youtube" ||  arr[0].type === "twitch_clip"){
        var $play_container = $(`
        <div class="play_container">
            <div class="play_button">
            </div>
        </div>
        `);
        $play_container.addClass("youtube").attr("image_type",arr[0].type).attr("image_id",arr[0].id);
        $play_container.hover(
            function(){
                $(this).addClass("hover");
            },  function(){
                $(this).removeClass("hover");
            }
        );
        $ADD_image_container.find("div.simple_image").append($play_container);
        $ADD_image_container.find(".open-lightbox").removeClass(".open-lightbox");

        var videoTypeText = "";
        if(arr[0].type === "youtube"){
            videoTypeText = "[Youtube]";
        }
        else if(arr[0].type === "twitch_clip"){
            videoTypeText = "[Twitch]";
        }
        $ADD_image_container.find(".videoType").css("display","inline-block").text(videoTypeText);

        // 재생버튼 동작
        $play_container.one("click", function(){
            var $play_iframe;
            var is_play_iframe_inserted = false;
            if(arr[0].type === "youtube"){
                $play_iframe = $(`
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/`+arr[0].id+`?rel=0&autoplay=1${arr[0].start_time !== undefined ? "&start="+arr[0].start_time : ""}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `);
                $(this).closest("div").empty().append($play_iframe);
                is_play_iframe_inserted = true;
            }
            else if(arr[0].type === "twitch_clip"){
                $play_iframe = $(`
                    <iframe src="https://clips.twitch.tv/embed?clip=`+arr[0].id+`&muted=false&autoplay=true&parent=www.dostream.com" autoplay; frameborder="0" allowfullscreen="true" height="100%" width="100%"></iframe>
                `);
                $(this).closest("div.imgur_container").find("div.viewers").hide();
                // $(this).closest("div.simple_image").empty().append($play_iframe);
                $(this).closest("div").empty().append($play_iframe);
                is_play_iframe_inserted = true;
            }

            // 재생 시 상단 고정하기
            console.log(ADD_config.chat_video_play_top_fix, is_play_iframe_inserted);
            if(ADD_config.chat_video_play_top_fix && is_play_iframe_inserted){
                var $content = $(this).closest("div.content");
                var $line = $(this).closest("div.line");
                if($content.length === 0){
                    $content = $(this).closest("#uha_chat_msgs");
                }
                if($line.length === 0){
                    $line = $(this).closest("li");
                }
                $content.find(".chat_video_play_top_fix").removeClass("chat_video_play_top_fix").find("div.imgur_container").remove();
                $line.addClass("chat_video_play_top_fix");
                // console.log($(this).closest("div.line"));
            }
        });
    }

    // 이미지 로드 완료 여부 체크
    var temp_func = function(){
        // 이미지 컨테이너 삽입
        $line.append($ADD_image_container);

        // 실제 이미지 삽입
        $line.find("div.simple_image").append(newimg);
        if( temp_isChatScrollOn ){
            ADD_DEBUG("이미지 로드 완료됨");
            goScrollDown();
        }
    };

    if(arr[0].html !== undefined || isVideo(arr[0].link)){
        temp_func();
    }
    else{
        if (newimg.complete !== undefined && newimg.complete) {
            temp_func();
        }
        // 이미지 로드 미 완료 시, 로드 끝날 때 까지 기다림
        else {
            $(newimg).one("load", function() {
                temp_func();
            });
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////
// 채팅 div.line element 제어
async function chatElemControl($line){
    $line.addClass("fired");

    // latest_chat 에 해당하는 경우 제외함
    if($line.closest("div.latest_chat_content").length !== 0){
        return;
    }

    // 스크롤 여부 기억
    var temp_isChatScrollOn = isChatScrollOn();
    var myLine = false;

    // 시스템 엘리먼트의 경우
    if($line.hasClass("system")){
        //ADD_DEBUG("SYSTEM ELEMENT 캐치됨 : ", $line.text());

        // 서버 연결 끊긴 경우
        if( $line.html().indexOf("서버 연결 끊김") != -1 ){
            ADD_DEBUG("채팅 중지 됨!!!");
            // if(ADD_config.chat_auto_reload){
            //     if(nomo_global.ADD_unique_window_reload_counter > ADD_UNIQUE_WINDOW_RELOAD_MAX){
            //         $line.addClass("ADD_chat_again").prop("title", "Dosteam+ System Message").css("cursor","pointer").html("채팅 갱신 횟수가 초과되었습니다. 채팅을 다시 시작하려면 클릭");
            //     }
            // }

            var temp_html = $line.html();
            $line.addClass("ADD_chat_again").prop("title", "Dosteam+ System Message").css("cursor","pointer").html(temp_html+"<br /><br />채팅 중지 됨. 채팅을 다시 시작하려면 클릭");
        }

        if( $line.html().indexOf("연결 시도") != -1 || $line.html().indexOf("연결 완료") != -1 ){
            $line.remove();
        }
        return true;
    }

    // 나 자신인지 확인
    if($line.hasClass("myLine")){
        myLine = true;
    }

    // 필수 엘리먼트 검증
    var $nick = $line.find(".nick");
    var $content = $line.find(".chatContent");
    if ($nick.length === 0 || $content.length === 0){
        ADD_DEBUG("nick, content elem을 찾을 수 없다", $nick, $content);
        return false;
    }

    // 필수 내용 찾기
    var nick = $line.find(".nick").attr("nick");
    var content = $line.find(".chatContent").text();

    if(ADD_config.chat_unicode_err_replace){
        $content.html($content.html().replace(/�/g," "));
    }

    // 닉네임 및 채팅 내용 체크
    if(nick === undefined || nick == "" || content === undefined){
        ADD_DEBUG("닉네임 또는 채팅 내용 판독 불가", "nick", nick, "content", content);
        return false;
    }

    // 채팅 등록된 시간 구하기
    var createdDate;
    var created = $line.attr("created");
    if(created !== undefined || created !== null){
        createdDate = new Date(created * 1000);
    }
    else{
        createdDate = new Date();
    }

    var admin_pass = false;
    if($content.css("font-weight") == 700){
        admin_pass = true;
        ADD_DEBUG("PASS");
        if (ADD_config.chat_sword){
            $nick.prepend(`
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAXlJREFUOBFjFNmR9p+BCoCJCmaAjWAh1aBJOvEMkdJWcG2iO9PBbJJcVKbsi2II3DQgg2iDooCuKFXxQdaLwibKIEdhLYZerRgUjSDO8qfH4GIEw0iHV4ZhnkE6AwsTM1wTiNF9ZwtD193NcDG8BklzCDEsN8pl4GHhgGv48+8vQ/G1JQzLkFwDksTwWq1qIIMshzADHwsnwwrjXAYJDgG4IV/+/GCIOjcFwxCQAhQXsTIyMyTK2TMESpoyPP3xnkGDRwpuyIsfHxgiz01muPL5CVwMmYHiot///zJsfHGWQZZTmMFCUAWu7saXZwweJztxGgJSiGIQSKDh5loQBQcn3t9h8D7ZBXThO7gYNgaK1zo1IxkCJExQ1EkBwwgUXp/+fEcRR+fAXVQDDOQkOQcGITYehne/vjAo7y1gmPVwHwMXMztDjIwNuj4MPtxFP//9hktueHEG7ILqGysZQJgYADeo++4WsHp2JlaGltvridGLooZx0JVHAJAXZtm+dA7iAAAAAElFTkSuQmCC" style="width:16px;height:16px;margin-right:-1px;" />
            `);
        }
    }

    // 채팅 차단
    // Case 1: 금지단어로 차단하는 경우
    if(ADD_config.chat_block && !admin_pass){
        // Case 1-1 채팅 내용 기반
        if(await ADD_chatBlock($line, false, nick, content, createdDate, false, ADD_config.chat_block_contents, ADD_config.chat_block_noti)) return false;
        // Case 1-2 닉네임 기반
        if(await ADD_chatBlock($line, false, nick, content, createdDate, ADD_config.chat_block_nickname, false, ADD_config.chat_block_noti)) return false;
    }
    // Case 2: 채팅 매니저로 차단하는 경우
    if(chat_manager !== undefined && !admin_pass){
        var isBlock = chat_manager.getIsBlock(nick);
        if(isBlock){
            var isShowDelMsg = chat_manager.getIsShowDelMsg(nick);
            if(await ADD_chatBlock($line, true, nick, content, createdDate, false, false, isShowDelMsg)) return false;
        }
    }

    // 광고 차단하기
    if(ADD_config.chat_adb && !admin_pass){
        /* // 현재 광고가 없으므로 주석처리한다.
        if( $('span:first', $line).html().replace(/\s/g,'') == '[광고]' )
        {
            ADD_DEBUG('광고 메시지 감지됨!',content);
            $line.remove();
        }
        */
    }

    // 과거 채팅 비교 및 기록하기
    if( ADD_config.chat_dobae_block && !myLine && (!ADD_config.chat_dobae_onlylink || ADD_config.chat_dobae_onlylink && $content.find("a").length > 0)){
        var new_createdDate = Number(createdDate);
        var last_similar_content = "";
        var last_similar;
        var similar;
        var dobae_repeat = 0;

        if(chatlog_local[nick] === undefined){
            // 초기화
            chatlog_local[nick] = {};
            chatlog_local[nick].value = [];
        }
        else{
            // 검색
            var old_arr = chatlog_local[nick].value;
            for(var ind=old_arr.length-1; ind>=0; ind--){
                var old_createdDate = old_arr[ind].createdDate;
                
                // 시간제한 확인
                if( new_createdDate - old_createdDate > ADD_config.chat_dobae_timelimit * 1000 ){
                    // console.log("지우기 전" + JSON.stringify(chatlog_local[nick].value));
                    // console.log("지울 개수", ind+1);
                    old_arr.splice(0,ind+1);
                    chatlog_local[nick].value = old_arr;
                    // console.log("지운 후" + JSON.stringify(chatlog_local[nick].value));
                    break;
                }
                var old_content = old_arr[ind].content;
                
                // 도배 여부 판단
                similar = utils.diceCoefficient(old_content, content);
                if(similar >= ADD_config.chat_dobae_judge){
                    dobae_repeat = dobae_repeat + 1;
                    last_similar_content = old_content;
                    last_similar = similar;
                }
            }
        }

        // 새 값 추가
        if(chatlog_local[nick].value.length >= ADD_config.chat_dobae_repeat + 10){
            chatlog_local[nick].value.shift();
        }
        chatlog_local[nick].value.push({content:content, createdDate:new_createdDate});

        // 도배인 경우
        if(dobae_repeat + 1 >= ADD_config.chat_dobae_repeat){
            // 로그에 기록
            if(ADD_config.chat_dobae_block_record){
                var ADD_Blocked_Chat = await nomo_common.nomo.getVal("ADD_Blocked_Chat", []);
                if(ADD_Blocked_Chat.length >= ADD_config.chat_block_log_limit){
                    ADD_Blocked_Chat.shift();
                }
                var chat_block_log_letter_limit = ADD_config.chat_block_log_letter_limit;
                if($.isNumeric(chat_block_log_letter_limit) || chat_block_log_letter_limit < 0){
                    chat_block_log_letter_limit = 40;
                }
                ADD_Blocked_Chat.push({"created":Number(createdDate), "nick":nick, "content":"[도배] "+content.substr(0,chat_block_log_letter_limit)});
                await nomo_common.nomo.setVal("ADD_Blocked_Chat", ADD_Blocked_Chat);
            }
            ADD_DEBUG("도배 차단됨, ["+last_similar_content+"], ["+content+"] :"+last_similar);

            $line.remove();

            // 도배 자동 차단 사용 시
            if(ADD_config.chat_dobae_block_autoban && (dobae_repeat + 1 >= ADD_config.chat_dobae_block_autoban_repeat)){
                if(ADD_config.chat_dobae_block_onlylink){   // 링크 포함시에만 차단하는 경우
                    if($content.find("a").length > 0){  // 가장 마지막 채팅에 링크 포함되어있는지 여부 확인
                        ADD_send_sys_msg("[도배 유저 자동 차단] 닉네임: "+escapeHtml(nick) +"<br />마지막 채팅: "+escapeHtml(content));
                        chat_manager.simpleBlock(nick,content);
                    }
                }
                else {   // 링크 포함여부 상관 없이 차단하는 경우
                    ADD_send_sys_msg("[도배 유저 자동 차단] 닉네임: "+escapeHtml(nick) +"<br />마지막 채팅: "+escapeHtml(content));
                    chat_manager.simpleBlock(nick,content);
                }
            }

            return;
        }
    }

    // 메모 달기 및 닉네임 색깔 적용하기
    if((chat_manager !== undefined && ADD_config.chat_memo) && !ADD_config.broadcaster_mode){
        var memo_index = chat_manager.indexFromData(nick);

        if(memo_index !== -1){
            var temp_obj = chat_manager.getData(memo_index);
            var temp_display_name = temp_obj.display_name;
            var temp_color = temp_obj.color;

            // 색깔 적용하기
            if(temp_color !== undefined && temp_color !== null && temp_color !== ""){   //  && temp_color.toLowerCase().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i
                $line.find("span.nick").addClass("colorized").css("color",temp_color);
            }

            // 메모 달기
            var temp_text;
            if(temp_display_name !== undefined){
                if(temp_display_name === ""){
                    temp_text = "*";
                }
                else{
                    temp_text = "["+[temp_display_name]+"]";
                }
                $line.find("span.nick").after("<span class=\"conversation_memo\" style=\"color:red;font-weight:700;vertical-align:inherit;display:-webkit-inline-box\"> "+ temp_text +"</span>");
                if( temp_isChatScrollOn ){
                    goScrollDown();
                }
            }
        }

        // 수정한 날짜 업데이트
        chat_manager.updateModifiedDate(nick);
    }

    // 닉네임 색상화
    var debug_color = "";
    if((!ADD_config.broadcaster_mode && ADD_config.chat_nick_colorize) || (ADD_config.broadcaster_mode)){
        if(!$line.find("span.nick").hasClass("colorized")){
            // 닉네임에 따른 고유-랜덤 색 생성
            var temp_color2 = utils.Colors.random(nick);

            // 방송모드 관련(blue or green 배경 색과 같은 닉네임 색을 핑크로 변경)
            if(ADD_config.broadcaster_mode){
                var temp_ckey = (ADD_config.broadcaster_bg_color).replace(/\s/g,"").toLowerCase();
                
                if($.inArray(temp_ckey, ["blue", "rgb(0,0,255)", "#0000ff"]) !== -1){
                    temp_ckey = "blue";
                }
                else if($.inArray(temp_ckey, ["green", "rgb(0,255,0)", "#00ff00"]) !== -1){
                    temp_ckey = "green";
                }
                
                if(temp_color2.name.indexOf(temp_ckey) !== -1 || $.inArray(temp_color2.name, ["mediumturquoise", "indigo", "olive"]) !== -1){
                    temp_color2.rgb = "pink";
                    temp_color2.name = temp_color2.name+"_pink_replaced";
                }
            }
            
            // 닉네임 색 적용
            $line.find("span.nick").addClass("colorized").css("color",temp_color2.rgb).attr("colorzied",temp_color2.name);
            debug_color = temp_color2.rgb;
        }
    }

    // 테마 적용 시 닉네임 색상 바꾸기
    // if(ADD_config.theme_on){
    //     $content.attr("style","");
    // }
    
    // 키워드 링크 추가하기
    if(ADD_config.chat_autoKeyword && !ADD_config.broadcaster_mode){
        setTimeout(function(){
            try{
                var rep = 0;
                var br = true;
                while(rep<10 && br){
                    br = false;
                    var $textNodes = $content
                        .find("*")
                        .andSelf()
                        .contents()
                        .filter(function() {
                            return this.nodeType === 3 &&
                                !$(this).parent("a").length && 
                                !$(this).hasClass("keyword_pass") &&
                                !$(this).parent().hasClass("keyword_pass");
                        });

                    $textNodes.each(function(index, element) {            
                        var contentText = $(element).text();
                        if(ADD_config.chat_autoKeyword_startwith){
                            var tempary = contentText.split(" ");
                            for(var i=0;i<tempary.length;i++){
                                for(var j=0;j<streamerArray_regex.length;j++){
                                    var v = tempary[i];
                                    var id = streamerArray[j][0];
                                    var match = v.match(streamerArray_regex[j]);
                                    if(match !== null){
                                        if(match[1] !== "던" && !ADD_config.chat_autoKeyword_1char && match[1].length === 1){
                                            continue;
                                        }
                                        tempary[i] = tempary[i].replace(match[1],"<a href='https://www.dostream.com/#/stream/twitch/"+id+"' class='topClick autokeyword'>"+match[1]+"</a>");
                                        break;
                                    }
                                }
                            }
                            contentText = tempary.join(" ");
                            $(element).replaceWith(contentText);
                            $(element).addClass("keyword_pass");
                            br = false;
                        }
                        else{
                            $.each(streamerArray, function(si, sv){
                                var id = sv[0];
                                for(var s=1;s<sv.length; s++){
                                    var disp_name = sv[s];
                                    if(disp_name !== "던" && !ADD_config.chat_autoKeyword_1char && disp_name.length === 1){
                                        continue;
                                    }
                                    if(contentText.indexOf(disp_name) !== -1){
                                        contentText = contentText.split(disp_name).join("<a href='https://www.dostream.com/#/stream/twitch/"+id+"' class='topClick autokeyword'>"+disp_name+"</a>");   // replaceAll
                                        $(element).replaceWith(contentText);
                                        //ADD_DEBUG("contentText", sv, contentText, $(element));
                                        rep = rep + 1;
                                        br = true;
                                        break;
                                    }
                                }

                                if(br){
                                    return false;
                                }
                            });
                        }

                        if(br){
                            return false;
                        }

                        $(element).addClass("keyword_pass");
                    });
                }
            }
            catch(e){
                ADD_DEBUG("키워드 링크 추가 중 에러", e);
            }
        },1);
    }

    // Imgur image preview 시
    var ADD_chat_images = [];

    // 링크 엘리먼트 찾기
    var $aElems = $line.find("a");
    var hrefs = [];
    if($aElems.length !== 0){
        $aElems.each(function(index){
            var $aElem = $($aElems[index]);
            var href = $aElem.attr("href");
            hrefs[index] = escapeHtml(href);

            // 두스트림 링크인 경우 현재창에서 열기
            if(ADD_config.url_self && href.toLowerCase().indexOf("dostream.com/#/stream/") !== -1){
                $aElem.addClass("topClick");
                // 본 블락에서는 클래스만 추가하고, 실제 동작은 ADD_chatting_arrive() 에 선언된 이벤트로 동작함
            }

            // URL Decode (percent encoding → text)
            if(ADD_config.chat_url_decode){
                $aElem.html(decodeURIComponent($aElem.html()));
            }

            // const regex_twitch = /^https?:\/\/(?:www\.|)twitch\.tv\/([a-zA-Z1-9-_]+)/;
            const regex_platform = /^https?:\/\/(?:www\.|play.|)(twitch|afreeca)(?:\.tv|tv\.com)\/([a-zA-Z0-9-_]+)/i;
            const regex_m3u8 = /^https?:\/\/.+\.m3u8/i;
            var match_platform = null;
            if(ADD_config.chat_auto_coor_twitch_afreeca){
                match_platform = href.match(regex_platform);
            }

            // 트위치 or 아프리카 링크인 경우
            if(ADD_config.chat_auto_coor_twitch_afreeca && match_platform !== null && match_platform[2] !== undefined){
                $aElem.after(`<a href="https://www.dostream.com/#/stream/${match_platform[1]}/${match_platform[2]}" target="_blank" class="topClick" style="display:inline-block;margin-left:0px;font-weight:700;vertical-align:baseline;">[${ADD_streamer_nick(match_platform[2])}]</a>`);
                
                // 스크롤 내리기
                if( temp_isChatScrollOn ){
                    goScrollDown();
                }
            }
            // 두스 트위치 링크인 경우 닉네임을 링크 끝에 추가하기
            else if(href.toLowerCase().indexOf("dostream.com/#/stream/twitch/") !== -1 || href.toLowerCase().indexOf("dostream.com/#/stream/multitwitch/") !== -1){
                var ch_text = "";
                var ch_streamer_id = href.split("/").pop();

                var temp_array = ch_streamer_id.split("&");
                for (var j=0; j<temp_array.length; j++){
                    if(j !== 0){
                        ch_text = ch_text+"&";
                    }
                    var temp_id = ADD_streamer_nick(temp_array[j]);//.toUpperCase();
                    ch_text = ch_text+temp_id;
                }

                //if(ch_text.toLowerCase() !== ch_streamer_id.toLowerCase()){
                //if(ch_text !== ch_streamer_id){
                if(ch_text !== undefined || ch_text !== ""){
                    $aElem.append(" <span class=\"keyword_pass\" class=\"ch_text\" style=\"font-weight:700;vertical-align:baseline;\">["+ch_text+"]</span>");
                }

                // 스크롤 내리기
                if( temp_isChatScrollOn ){
                    goScrollDown();
                }
            }
            // M3U8 링크인 경우
            else if(href.indexOf('dostream.com/#/stream/m3u8') == -1 && regex_m3u8.test(href)){
                $aElem.after(` <a href="https://www.dostream.com/#/stream/m3u8/${href}}" target="_blank" class="topClick" style="display:inline-block;margin-left:0px;font-weight:700;vertical-align:baseline;">[M3U8 PLAYER]</a>`);
                // 스크롤 내리기
                if( temp_isChatScrollOn ){
                    goScrollDown();
                }
            }

        });
    }

    // 방송 용 닉
    if(ADD_config.broadcaster_mode){
        var nick_for_broadcaster = (ADD_config.broadcater_theme === "twitch" ? $nick.html() : $nick.html().replace(":",""));
        if(ADD_config.broadcaster_nick_hide){
            nick_for_broadcaster = nick_for_broadcaster.substring(0,4)+"****"+(ADD_config.broadcater_theme === "twitch" ? ":" : "");
        }
        $nick.html(nick_for_broadcaster);
    }

    // 이미지 주소로부터 링크 찾기
    var image_found = false;
    if(ADD_config.chat_image_preview && hrefs.length !== 0 && !ADD_config.broadcaster_mode){
        //ADD_DEBUG("$aElems", $aElems, $aElems.length);
        for(var index=0;index<hrefs.length;index++){
            var image_url = "";
            var image_title = "";
            //var image_width = undefined;
            //var image_height = undefined;
            var href = hrefs[index];

            ADD_DEBUG("a arc : ", href, href.length);
            if(href === undefined || href === null || href == ""){
                return true;
            }

            // 원래부터 UCHAT에 있던 정규표현식을 그대로 긇어와서 씀 - 문제있어서 수정함
            if(href.match(/\.(jpg|jpeg|png|gif)$/gi)){// && href.indexOf("imgur.com") === -1){
                image_url = href;
            }
            // else if (href && href.match(/^(https?)?:?\/\/(\w+\.)?imgur.com\/(\w*\d\w*)+(\.[a-zA-Z]{3})?$/)){
            //     image_url = href+".jpg";
            // }

            if(image_url !== ""){
                ADD_DEBUG("이미지 발견", image_url);
                var temp_img_obj = {link: image_url, title: image_title};
                ADD_chat_images.push(temp_img_obj);
            }
        }

        if(ADD_chat_images.length !== 0){
            image_found = true;
            chatImagelayoutfromLinks($line, ADD_chat_images);
        }
    }   // 이미지 더 찾기 끝

    //else if(href.match(/youtu(be\.com|\.be)(\/\watch\?v=|\/embed\/|\/)(.{11})/)){
    /* eslint-disable */
    if(!image_found && ADD_config.chat_image_preview && !ADD_config.broadcaster_mode && ADD_config.chat_image_youtube_thumb && hrefs.length !== 0 && ADD_chat_images.length === 0 && hrefs[0].indexOf("dostream.com/#/stream/") === -1){
        var youtube_match = hrefs[0].match(/^.*(?:youtu\.?be(?:\.com)?\/)(?:embed\/)?(?:(?:(?:(?:watch\?)?(?:time_continue=(?:[0-9]+))?.+v=)?([a-zA-Z0-9_-]+))(?:\?t\=(?:[0-9a-zA-Z]+))?)/);
        if(youtube_match){
            image_found = true;
            var youtube_id = youtube_match.pop();
            var youtube_url = 'https://www.youtube.com/watch?v=' + youtube_id;
            var youtube_st = hrefs[0].match(/t=\d+/);
            if(youtube_st){
                youtube_st = youtube_st[0].split("=").pop();
            }
            else{
                youtube_st = undefined;
            }

            $.getJSON('https://noembed.com/embed',
                {format: 'json', url: youtube_url}, function (data) {
                    ADD_DEBUG("youtube getJSON", youtube_id, data);

                    var temp_arr = [];
                    var temp_img_obj = {type:"youtube", id:youtube_id, link: data.thumbnail_url, title: "" + (data.title !== undefined ? data.title : "") + (data.author_name !== undefined ? " - " + data.author_name : ""), "width":data.thumbnail_width, "height":data.thumbnail_height};
                    if(youtube_st !== undefined){
                        temp_img_obj["start_time"]  = youtube_st;
                    }
                    temp_arr.push(temp_img_obj);
                    ADD_DEBUG("temp_img_obj", temp_img_obj);
                    chatImagelayoutfromLinks($line, temp_arr);
            });
        }
    }
    /* eslint-enable */


    // gfy 이미지 로부터 찾기
    if(!image_found && ADD_config.chat_image_preview && !ADD_config.broadcaster_mode && ADD_config.gfycat_preview && hrefs.length !== 0 && ADD_chat_images.length === 0){
        if(hrefs[0].match(/(?:http:|https:|)(?:\/\/|)(?:gfycat\.com\/(?:\w*\/)*)(\w+$)/)){
            image_found = true;
            var gfycat_id = href.match(/(?:http:|https:|)(?:\/\/|)(?:gfycat\.com\/(?:\w*\/)*)(\w+$)/).pop();

            // 에러처리
            if(gfycat_id.indexOf("/") !== -1 || gfycat_id.indexOf("?") !== -1 || gfycat_id.indexOf(".") !== -1){
                ADD_DEBUG("gfycat_id error", hrefs[0].match(/(?:http:|https:|)(?:\/\/|)(?:gfycat\.com\/(?:\w*\/)*)(\w+$)/));
                image_found = false;
            }
            else{
                ADD_DEBUG("Gfycat API 호출 - id:", gfycat_id);
                $.ajax({
                    url:"https://api.gfycat.com/v1test/gfycats/"+gfycat_id,
                    type: "GET",

                    // API CALL SUCCESS
                    success:function(response){
                        ADD_DEBUG("Gfycat API API 호출 완료", response);
                        var gfy_name = response.gfyItem.gfyName;
                        //var gfy_ratio = 100.0 * response.gfyItem.height / response.gfyItem.width;   // percent 값
                        var width = response.gfyItem.width,
                            height = response.gfyItem.height,
                            max_ratio = Math.min(1.0, ADD_config.chat_image_max_width/width, ADD_config.chat_image_max_height/height),
                            width_mod = width*max_ratio,
                            height_mod = height*max_ratio + 44;
                        var gfy_autoplay = "?autoplay=" + (ADD_config.chat_video_autoplay?"1":"0");
                        // 세로 길이가 1000px 보다 큰 경우
                        // if(3.32 * gfy_ratio + 44 > ADD_config.chat_image_max_height){
                        //     gfy_ratio = 301;
                        // }
                        // padding-bottom:calc(`+gfy_ratio+`% + 44px)

                        var gfy_html = `
                            <div style='position:relative; margin:0 auto; width:`+width_mod+`px;
                                height:`+height_mod+`px;'>
                                <iframe src='https://gfycat.com/ifr/` + gfy_name + gfy_autoplay + `' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe>
                            </div>
                        `;
                        var title = response.gfyItem.title + " - " + (response.gfyItem.userDisplayName !== undefined ? response.gfyItem.userDisplayName : response.gfyItem.userName);

                        var temp_arr = [];
                        var temp_img_obj = {type:"gfycat", link: "", title: title, html:gfy_html, width:width_mod, height:height_mod, views:response.gfyItem.views};
                        temp_arr.push(temp_img_obj);
                        ADD_DEBUG(temp_img_obj);
                        chatImagelayoutfromLinks($line, temp_arr);

                        // GC
                        response = null;
                    },
                    error:function(error){
                        ADD_DEBUG("Gfycat API - Request failed", error);
                        var gfy_html = `
                            <div style='position:relative; margin:0 auto; padding-bottom:calc(56.25% + 44px); margin-top:3px;'>
                                <iframe src='https://gfycat.com/ifr/` + gfycat_id + `' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe>
                            </div>
                        `;

                        var temp_arr = [];
                        var temp_img_obj = {"link": "", "title": "", "html":gfy_html};
                        temp_arr.push(temp_img_obj);
                        ADD_DEBUG(temp_img_obj);
                        chatImagelayoutfromLinks($line, temp_arr);
                    }
                });
            }
        }

    }

    // twitch clip 섬네일 으로 부터 찾기(앞에서 링크는 찾았는데, 이미지 링크는 못 찾은 경우)
    if(!image_found && ADD_config.chat_image_preview && !ADD_config.broadcaster_mode && ADD_config.chat_image_twitch_thumb && hrefs.length !== 0 && ADD_chat_images.length === 0){
        if(hrefs[0].match(/(\.twitch\.tv\/\w*\/clip\/|clips\.twitch\.tv\/(embed\?clip=)?)([a-zA-Z0-9-_]*)/)){
            var twitch_thumb_match = hrefs[0].match(/(\.twitch\.tv\/\w*\/clip\/|clips\.twitch\.tv\/(embed\?clip=)?)([a-zA-Z0-9-_]*)/);

            if(twitch_thumb_match){
                image_found = true;
                var twitch_thumb_id = twitch_thumb_match.pop();
                ADD_DEBUG("Twitch Clip API 호출 - id:", twitch_thumb_id);
                $.ajax({
                    url:"https://api.twitch.tv/kraken/clips/"+twitch_thumb_id,
                    type: "GET",
                    headers: {"Client-ID": nomo_const.ADD_CLIENT_ID_TWITCH, "Accept":"application/vnd.twitchtv.v5+json"},

                    // API CALL SUCCESS
                    success:function(response){
                        ADD_DEBUG("Twitch Clip API 호출 완료", response);
                        var image_url = response.thumbnails.medium;
                        var title = (response.title !== undefined ? response.title : "") + (response.broadcaster.display_name !== undefined ? " - " + response.broadcaster.display_name : "");

                        var temp_arr = [];
                        var temp_img_obj = {type:"twitch_clip", id:twitch_thumb_id, link: image_url, title: ""+title, width:480, height:272, views:response.views};
                        temp_arr.push(temp_img_obj);
                        chatImagelayoutfromLinks($line, temp_arr);

                        // GC
                        response = null;
                    },
                    error:function(error){
                        ADD_DEBUG("Twitch Clip API - Request failed", error);
                    }
                });
            }

        }
    }

    // imgur api 로부터 찾기
    if(!image_found && ADD_config.chat_image_preview && !ADD_config.broadcaster_mode && ADD_config.imgur_preview && hrefs.length !== 0 && ADD_chat_images.length === 0){
        var ADD_imgur_id, ADD_imgur_type, ADD_imgur_match,
            ADD_imgur_reg = /https?:\/\/(\w+\.)?imgur.com\/(a\/|gallery\/)?(\w*)+(\.[a-zA-Z]{3})?/;

        // 정규표현식을 통해 imgur 링크 포함 여부 확인, global check 하지 않고 먼저 나온 하나만 확인함
        ADD_imgur_match = hrefs[0].match(ADD_imgur_reg);

        if(ADD_imgur_match !== null){
            // 로컬 변수 선언
            ADD_imgur_id = ADD_imgur_match[3];
            if(ADD_imgur_id !== "undefined"){
                // 이미지 type 체크
                switch(ADD_imgur_match[2]){
                case undefined:
                    // a/ 에 대한 구문이 없는 경우 이미지임
                    ADD_imgur_type = 0;
                    break;
                case "a/":
                    // a/ 에 대한 구문이 있는 경우 앨범임
                    ADD_imgur_type = 1;
                    break;
                case "gallery/":
                    // 갤러리
                    ADD_imgur_type = 2;
                    break;
                default:
                    // 여기까지 오면 안 된다.
                    ADD_imgur_type = 10;
                    break;
                }

                // imgur api 호출
                image_found = true;
                ADD_DEBUG("ADD_imgur_id = "+ADD_imgur_id+"  ADD_imgur_type = "+ADD_imgur_type);
                getImgurData($line, ADD_imgur_id, ADD_imgur_type);
            }
        }
    }

    // 향상된 자동스크롤
    if(ADD_config.chat_scroll){
        // var scroll_height_check = documentElem.find(".content").prop("scrollHeight") - (documentElem.find(".content").scrollTop()+documentElem.find(".content").height());
        // if(temp_isChatScrollOn && scroll_height_check < 100.0){
        //     // 100픽셀보다 덜 차이날 경우 스크롤을 강제로 내린다;
        //     goScrollDown();
        // }
        goScrollDown();
    }

    //if(true){   // 개수 초과된 채팅 지우기 && 스크롤이 정지 상태 이면...    (UCHAT 기본값: 300)
    //$(document).find("div.line:lt(-300)")
    //}   // 

    if(nomo_global.DEBUG && typeof unsafeWindow.$ !== undefined && typeof unsafeWindow.$ === "function"){
        unsafeWindow.$(document).trigger("chat_line", {"id":nick, "nick":nick, "content":content, "color":debug_color, "me":myLine, "date":createdDate});
    }

    nomo_global.chatting_arrive_check = true;
}

// 금지 단어에서 채팅 차단하기
export async function ADD_chatBlock(elem, force, nick, content, date, isNick, isContent, isShowDelMsg){
    var force_ = force;

    // 금지단어 찾기
    if(!force_){
        // 검색 대상 설정
        var searchTarget;
        if(isNick){
            searchTarget = nick;
        }
        else if(isContent){
            searchTarget = content;
        }
        else{
            return false;
        }

        var block_tag_arr = ADD_config.chat_block_tag;
        for(var i=0;i<block_tag_arr.length;i++){
            // 금지 단어에서 찾은 경우
            if(block_tag_arr[i] !== "" && block_tag_arr[i] !== " " && searchTarget.indexOf(block_tag_arr[i]) !== -1){
                force_ = true;
                break;
            }
        }
    }

    if(force_){
        // 기존 금지 단어 로그 불러와서 저장하기
        if(ADD_config.chat_block_record){
            var ADD_Blocked_Chat = await nomo_common.nomo.getVal("ADD_Blocked_Chat", []);
            if(ADD_Blocked_Chat.length >= ADD_config.chat_block_log_limit){
                ADD_Blocked_Chat.shift();
            }
            var chat_block_log_letter_limit = ADD_config.chat_block_log_letter_limit;
            if($.isNumeric(chat_block_log_letter_limit) || chat_block_log_letter_limit < 0){
                chat_block_log_letter_limit = 40;
            }
            var temp_obj = {"created":Number(date), "nick":nick, "content":content.substr(0,chat_block_log_letter_limit)};
            ADD_Blocked_Chat.push(temp_obj);
            await nomo_common.nomo.setVal("ADD_Blocked_Chat", ADD_Blocked_Chat);
        }
        ADD_DEBUG("채팅 차단 완료", temp_obj);

        // message deleted 표시하기
        if(isShowDelMsg){
            elem.html("<div style=\"text-align:center;color:#aaa;\">&ltmessage deleted&gt</div>");

            // UCHAT의 경우 - 마우스 올리면 차단된 내용 보여주게 처리
            var $line = elem.closest("div.line");
            if($line.length !== 0 && $line.attr("data-tiptext") !== undefined && $line.attr("data-tiptext") !== null){
                $line.attr("data-tiptext", nick + ": " + content + " - {ago}");
            }
        }
        // message deleted로 표시하지 않는 경우 메시지 지우기
        else{
            elem.remove();
        }

        if(chat_manager !== undefined && nick !== undefined && nick !== ""){
            chat_manager.updateModifiedDate(nick);
        }
        return true;
    }

    return false;
}

export function goScrollDown(){
    if(nomo_global.GLOBAL_CHAT_IFRAME === undefined && $("#uha_chat_msgs").length > 0){
        var $uha_chat_msgs = $("#uha_chat_msgs");
        // if($uha_chat_msgs.prop("scrollTop") >= $uha_chat_msgs.prop("scrollHeight") - $uha_chat_msgs.height() - 40){
        //     $uha_chat_msgs.scrollTop($uha_chat_msgs.prop("scrollHeight"));
        // }
        $uha_chat_msgs.scrollTop($uha_chat_msgs.prop("scrollHeight"));
        return;
    }

    var roomid = "";
    if(nomo_global.GLOBAL_CHAT_IFRAME.contentWindow !== undefined &&
        nomo_global.GLOBAL_CHAT_IFRAME.contentWindow.rooms !== undefined){
        if(nomo_global.GLOBAL_CHAT_IFRAME.contentWindow.rooms["dostest"] !== undefined){
            roomid = "dostest";
        }
        else if(nomo_global.GLOBAL_CHAT_IFRAME.contentWindow.rooms["dostream"] !== undefined){
            roomid = "dostream";
        }
        else{
            roomid = Object.keys(nomo_global.GLOBAL_CHAT_IFRAME.contentWindow.rooms)[0];
        }
    }

    if(nomo_global.isGoScrollDown && roomid !== undefined && roomid !== "" && roomid !== null &&
        nomo_global.GLOBAL_CHAT_CONTENT_DIV !== undefined &&
        nomo_global.GLOBAL_CHAT_CONTENT_DIV.length !== 0){
        nomo_global.GLOBAL_CHAT_IFRAME.contentWindow.rooms[roomid].room.setting.data["option.autoScroll"] = 1;
        nomo_global.GLOBAL_CHAT_IFRAME.contentWindow.rooms[roomid].room.log.temp_scroll_stop = 0;
        nomo_global.GLOBAL_CHAT_CONTENT_DIV.scrollTop(nomo_global.GLOBAL_CHAT_CONTENT_DIV[0].scrollHeight);
    }
    else{
        //ADD_DEBUG("에러!! iframeElems GLOBAL_CHAT_ELEM", iframeElems, GLOBAL_CHAT_ELEM);
    }
}

// 스크롤 내림 여부 확인
export function isChatScrollOn(){
    // 향상된 자동 스크롤 사용 시
    if(ADD_config.chat_scroll){
        return nomo_global.isGoScrollDown;
    }
    // 향상된 자동 스크롤 사용하지 않는 경우
    else{
        var elem = nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".latest_chat");
        if(elem.length !== 0 && elem.is(":visible")){
            // ADD_DEBUG("현재 스크롤은 정지 상태 입니다");
            return false;
        }
        else if(elem.length !== 0 && !elem.is(":visible")){
            //ADD_DEBUG('현재 스크롤은 Free 상태 입니다');
            return true;
        }
        else{
            ADD_DEBUG("현재 스크롤은 알 수 없음 상태이므로 정지 상태로 가정", elem.length);
            return false;
        }
    }
}

// 타겟 url 이 동영상인지 체크
export function isVideo(target_url){
    if(target_url !== undefined && (target_url.indexOf(".mp4") !== -1 || target_url.indexOf(".gifv") !== -1 || target_url.indexOf(".flv") !== -1 || target_url.indexOf(".webm") !== -1)){
        return true;
    }
    return false;
}

export function chat_tooltip_toggle(){
    if(ADD_config.chat_tooltip_hide){
        nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("body").addClass("tooltip_hide");
    }
    else{
        nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("body").removeClass("tooltip_hide");
    }
}

// Imgur API 접근하여 이미지 정보 가져옴
export function getImgurData($line, Imgur_ID, Imgur_type){
    // Imgur_type --------------- 0 = image   ,    1 = album    ,    2 = gallery    ,    10 = etc
    var imgur_api_call_url = "https://api.imgur.com/3/";
    var imgur_client_id = "a57c643ca3a51ee";
    var img_arr = [];
    var imgur_type_text = "";
    var imgur_call_again = false;

    switch(Imgur_type){
    case 0:
        imgur_type_text = "image";
        imgur_api_call_url = imgur_api_call_url+"image/"+Imgur_ID;
        break;
    case 1:
        imgur_type_text = "album";
        imgur_api_call_url = imgur_api_call_url+"album/"+Imgur_ID+"/images";
        break;
    case 2:
        imgur_type_text = "gallery";
        imgur_api_call_url = imgur_api_call_url+"gallery/"+Imgur_ID; // imgur_api_call_url+"gallery/album/"+Imgur_ID;
        // 테스트 예시: https://imgur.com/gallery/FyhGofX - OK
        break;
    case 10:
        return false;
    default:
        break;
    }
    ADD_DEBUG(imgur_type_text, "  imgur_api_call_url", imgur_api_call_url);

    $.ajax({
        url: imgur_api_call_url,
        //async: false, // return 하는 경우 주석 풀면 됨
        type: "GET",
        //contentType: 'application/json',
        dataType:"json",
        headers: {
            "Authorization": "Client-ID "+imgur_client_id
        },
        success:function(response){
            var i=0, temp_obj;
            ADD_DEBUG("Imgur api request succeed");
            ADD_DEBUG("response: ",response);

            var response_data = response.data;
            var link = "";
            var img_title = "";
            var temp;
            // images 가 존재할 경우 - gallery
            if(response_data.images !== undefined){
                var gallery_title = response_data.title;
                for(i=0;i<response_data.images.length;i++){
                    temp = response_data.images[i];
                    ADD_DEBUG("type:gallery",temp.link);
                    if(ADD_config.imgur_preview_gif_as_mp4 && response_data.images.mp4 !== undefined && response_data.images.mp4 !== null){
                        link = temp.mp4;
                    }
                    else{
                        link = temp.link;
                    }
                    img_title = temp.title;
                    temp_obj = {
                        link:link,
                        title:(img_title !== undefined && img_title !== null ? img_title : (gallery_title !== undefined && gallery_title !== null ? gallery_title : "")),
                        width:temp.width,
                        height:temp.height,
                        views:temp.views
                    };
                    img_arr.push(temp_obj);
                }
            }
            // data가 배열 형태일 경우 - album
            else if(response_data[0] !== undefined) {
                for(i=0;i<response_data.length;i++){
                    temp = response_data[i];
                    ADD_DEBUG("type:album",temp.link);
                    if(ADD_config.imgur_preview_gif_as_mp4 && temp.mp4 !== undefined && temp.mp4 !== null){
                        link = temp.mp4;
                    }
                    else{
                        link = temp.link;
                    }
                    img_title = temp.title;
                    temp_obj = {
                        link:link,
                        title:(img_title !== undefined && img_title !== null ? img_title : ""),
                        width:temp.width,
                        height:temp.height,
                        views:temp.views
                    };
                    img_arr.push(temp_obj);
                }
                //imgur_call_again = true;
            }
            // data가 배열이 아닐 경우 - image
            else {
                ADD_DEBUG("type:image",response_data.link);
                temp = response_data;
                if(ADD_config.imgur_preview_gif_as_mp4 && temp.mp4 !== undefined && temp.mp4 !== null){
                    link = temp.mp4;
                }
                else{
                    link = temp.link;
                }
                img_title = temp.title;
                temp_obj = {
                    link:link,
                    title:(img_title !== undefined && img_title !== null ? img_title : ""),
                    width:temp.width,
                    height:temp.height,
                    views:temp.views
                };
                img_arr.push(temp_obj);
            }

            // 갤러리 타입 에러나는 경우 - 현재 적용 안 함
            if(Imgur_type == 2 && imgur_call_again){
                // gallery 타입의 경우 album 주소를 가져오므로 첫번째 album 에 대하여 재호출한다.
                var temp_link = img_arr[0].link;
                if(temp_link !== null && temp_link !== undefined){
                    var call_again_link = temp_link.split("a");
                    if(call_again_link !== null && call_again_link !== undefined && call_again_link.length > 2){
                        getImgurData($line, call_again_link[1], 1);
                    }
                }
            }
            else{
                chatImagelayoutfromLinks($line, img_arr);
                response_data = null;
                response = null;
            }
        },
        error:function(response){
            // request failed
            ADD_DEBUG("Imgur api request failed", response);
            var temp_text = "<br />error:"+ escapeHtml(response.responseJSON.data.error);
            var temp_error_code = " (CODE:" + escapeHtml(response.responseJSON.status) + ")";
            ADD_send_sys_msg("Imgur 이미지 로드 중 오류가 발생했습니다."+temp_error_code+temp_text);
        }
    });
}

export function chat_type_and_go_main(){
    ADD_DEBUG("chat_type_and_go_main 실행됨", ADD_config.chat_type_and_go);
    if(nomo_global.$GLOBAL_IFRAME_DOCUMENT === undefined){
        return;
    }
    if(ADD_config.chat_type_and_go){
        if(nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".chatInput").length !== 0 && nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".ADD_type_and_go").length === 0){
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".chatInput").css("padding-right","35px");

            var $type_and_go = $(`<div class="ADD_type_and_go" tabindex="-1"><span class="glyphicon glyphicon-arrow-right"></span></div>`);
            $type_and_go.on("keydown", function(e){
                e.preventDefault();
                if(e.shiftKey && e.keyCode == 9){    // SHIFT + TAB
                    nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".chatInput").focus();
                }
                else if(e.keyCode == 13){           // ENTER
                    type_and_go_run();
                }
            }).on("click", function(){
                type_and_go_run();
            });
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".inputContent").append($type_and_go);
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".chatInput").on("keydown.type_and_go", function(e) { 
                if(e.altKey && e.keyCode == 71){    // ALT + G
                    type_and_go_run();
                }
                else if(e.keyCode === 9) { // TAB
                    nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".ADD_type_and_go").focus();
                }
            });
        }
    }
    else{
        nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".ADD_type_and_go").remove();
        nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".chatInput").off("keydown.type_and_go");
        nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".chatInput").css("padding-right","6px");
    }
}

function type_and_go_run(){
    var $etarget, etargetText, streamerid, streamerDisplayName;
    $etarget = nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".chatInput").first();
    etargetText =  $etarget.text();

    if(etargetText.replace(/\s/g, "") == ""){
        ADD_send_sys_msg(`스트리머 아이디 or 닉네임 or 별칭을 입력해주세요.`);
        $etarget.focus();
        return;
    }

    var res = getStreamerIdAndDisplayNameFromNick(etargetText);
    streamerid = res.id;
    streamerDisplayName = res.display_name;

    var engToKor = "";
    if(streamerid == null){
        engToKor = utils.engTypeToKor(etargetText);
        res = getStreamerIdAndDisplayNameFromNick(engToKor);
        streamerid = res.id;
        streamerDisplayName = res.display_name;
    }

    if(streamerid !== null){
        setParentWindowLocation("https://www.dostream.com/#/stream/twitch/"+streamerid);
        $etarget.blur();
        $etarget.html("");
        $etarget.focus();
        ADD_send_sys_msg(`다음으로 이동합니다: ${streamerDisplayName}(${streamerid})`);
    }
    else{
        ADD_send_sys_msg(`해당하는 스트리머를 찾을 수 없습니다: ${escapeHtml(etargetText)}`);
        $etarget.focus();
    }
}

