import * as nomo_common from "general/common.js";
import * as utils from "libs/nomo-utils.js";
var ADD_DEBUG = utils.ADD_DEBUG;

import {ADD_send_location_layout} from "chat/send_coord.js";
import * as nomo_coord from "general/coord.js";
import {ADD_channel_history_run} from "general/browse_history.js";
import {ADD_chatting_arrive} from "chat/control.js";
import * as nomo_theme from "general/theme.js";

// 설정에 따라 ON-OFF 되는 이벤트 모음
export function ADD_main_event_binding(){
    // 섬네일 마우스 오버 설정 관련됨
    ADD_thumbnail_mouseover();

    // history 기능 관련됨
    ADD_channel_history_run();

    // 빠른 좌표 버튼 생성 관련됨
    nomo_coord.hrm_layout();

    // 데스크탑 알림 권한 관련됨
    if(ADD_config.alarm_noti){
        ADD_DEBUG("Notification.permission = ", Notification.permission);
        if (Notification.permission !== "granted")
            Notification.requestPermission();
    }
}

export function ADD_chat_event_binding(){
    // 좌표 버튼
    ADD_send_location_layout();

    ADD_chatting_arrive();
}

// 1회 무조건 실행해야 하는 이벤트 모음
export function ADD_event_bind_init(){
    // Open Lightbox
    /*
    // Lightbox 를 여는 동작을 iframe 내에서 호출된 스크립트에서 하므로 주석처리 한다.
    $(document).on('click', '.open-lightbox', function(e){
      e.preventDefault();
      var image = $(this).attr('href');
      $('html').addClass('no-scroll');
      $('body').append('<div class="lightbox-opened"><img src="' + image + '"></div>');
    });
    */

    // Close Lightbox
    $(document).on("click", ".lightbox-opened", function(e){
        e.stopPropagation();
        $("html").removeClass("no-scroll");
        $(".lightbox-opened").remove();
    });
}

// thumbnail image hover event
function ADD_thumbnail_mouseover(){
    // 일단 먼저 끈다.
    $(document).off("mouseenter mouseleave", "li.twitch>a>img, li.kakao>a>img, li.youtube>a>img");
    $(".ADD_thumb_elem_container").fadeOut("fast");

    if(!ADD_config.thumbnail_mouse){
        return false;
    }

    // 켠다.
    $(document).on({
        mouseenter: async function(_e){
            if(!ADD_config.thumbnail_mouse){
                return false;
            }
            var thumb_this = $(this);
            var thumb_this_parent = thumb_this.parent("a");
            var thumb_size_class;

            switch(ADD_config.thumbnail_size){
            case "1":
                // size : small
                thumb_size_class = "ADD_thumb_size_1";
                break;
            case "2":
                // size : medium
                thumb_size_class = "ADD_thumb_size_2";
                break;
            case "3":
                // size : large
                thumb_size_class = "ADD_thumb_size_3";
                break;
            default:
                thumb_size_class = "ADD_thumb_size_0";
                // default
                break;
            }

            var ADD_thumb_href = "";
            ADD_thumb_href = thumb_this.attr("src");

            if(ADD_config.thumbnail_refresh){
                var thumbRefreshGap = ADD_config.thumbnail_refresh_gap;
                if(!$.isNumeric(thumbRefreshGap) || Number(thumbRefreshGap) < 1){
                    thumbRefreshGap = 1;
                }
                var isThumbRefresh = await nomo_common.GM_cache("thumbnail_refresh",Number(thumbRefreshGap)*60*1000);
                
                if(isThumbRefresh){
                    nomo_global.getTimeStampRes = "?" + utils.getTimeStamp("m");
                }

                ADD_thumb_href += nomo_global.getTimeStampRes;
            }

            // check image size
            switch(ADD_config.thumbnail_size){
            case "1":
                // size : small
                // 240 과 360 은 차이가 크지 않으므로 그냥 쓴다.
                // ADD_thumb_href = ADD_thumb_href.replace('240x180','360x180');
                break;
            case "2":
                // size : medium
                ADD_thumb_href = ADD_thumb_href.replace("240x180","640x360");
                break;
            case "3":
                // size : large
                ADD_thumb_href = ADD_thumb_href.replace("240x180","1280x720");
                break;
            default:
                // 아무 작업도 하지 않음
                break;
            }
            if( thumb_this_parent.find(".ADD_thumb_elem_container").length === 0 ){ // 기존에 섬네일 영역 존재 안 하는 경우
                var ADD_thumb_elem_string = `
                    <div class="ADD_thumb_elem_container">
                        <div class="ADD_thumb_elem `+thumb_size_class+`">
                            <img class="ADD_thumb_img" style="width:100%;height:100%;" src="`+ADD_thumb_href+`" />
                        </div>
                    </div>
                    `;
                thumb_this.after(ADD_thumb_elem_string);
                thumb_this_parent.find(".ADD_thumb_elem_container").fadeIn("fast");
            }
            else // 기존에 이미 존재하는 경우
            {
                thumb_this_parent.find(".ADD_thumb_img").attr("src",ADD_thumb_href); // 주소 업데이트
                thumb_this_parent.find(".ADD_thumb_elem_container").fadeIn("fast");
            }

            if( !(thumb_this_parent.find(".ADD_thumb_elem").hasClass(thumb_size_class)) ){
                thumb_this_parent.find(".ADD_thumb_elem").removeClass("ADD_thumb_size_1 ADD_thumb_size_2 ADD_thumb_size_3 ADD_thumb_size_0").addClass(thumb_size_class);
            }

            // 퀵뷰의 경우 섬네일 위치 설정
            if(thumb_this_parent.closest("#popup_ADD_quick").length !== 0){
                var offsetTop = thumb_this_parent[0].offsetTop;
                var height = thumb_this_parent.find(".ADD_thumb_elem").first().height();
                var heightParent = $("#popup_ADD_quick").height();
                //ADD_DEBUG(heightParent , offsetTop, height);
                thumb_this_parent.find("div.ADD_thumb_elem").first().css("top",(heightParent > offsetTop + height ? offsetTop + 5 : heightParent - height - 15)+"px");
            }
        },
        mouseleave:function(){
            if(!ADD_config.thumbnail_mouse){
                return false;
            }
            var thumb_this = $(this);
            var thumb_this_parent = thumb_this.parent("a");
            if( thumb_this_parent.find(".ADD_thumb_elem_container").length !== 0 )
            {
                thumb_this_parent.find(".ADD_thumb_elem_container").fadeOut("fast");
            }
        }
    }, "li.twitch>a>img, li.kakao>a>img, li.youtube>a>img");
}

// 디바운스 예시
// var inside3 = $(".inside-3");
// var thing3 = $(".thing-3");
// var count3 = $(".count-3");
// inside3.on('scroll', _.debounce(function() {
// thing3.css("top", inside3[0].scrollTop);
// count3.html(parseInt(count3.html())+1);
// }, 100));