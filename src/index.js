import {event_hijacking} from "general/event_hijacking.js";
import "libs/arrive.js";
import web_browser from "libs/jquery-browser.js";
// import lib_nude from "libs/nude.js";
// lib_nude();

import nomo_global_manager from "general/global.js";
import {ADD_DEBUG} from "libs/nomo-utils.js";

import ADD_migration from "./settings/migration.js";
import {GM_setting} from "settings/main.js";

import nomo_const from "general/const.js";
import * as nomo_common from "general/common.js";
import * as nomo_theme from "general/theme.js";
import {ADD_channel_history_run} from "general/browse_history.js";
import {newdsStream, newdostream} from "general/unsafewindow.js";
import {ADD_multitwitch_layout} from "general/multitwitch.js";
import {ADD_basic_layout, ADD_var_to_config_form, ADD_simple_config_event} from "general/menu_layout.js";
import {twitch_api, twitch_api_call_interval} from "general/twitch.js";
import {ADD_main_event_binding, ADD_chat_event_binding, ADD_event_bind_init} from "general/event.js";

import {ADD_chatting_arrive_for_UHAHA} from "chat/control_uhaha.js";
import {ADD_send_sys_msg} from "chat/send_message.js";
import {ADD_test} from "general/debug.js";
import "settings/register_menu.js";
import {chat_manager, get_chat_manager_from_main_frame} from "chat/chat_manager.js";
import {external_insagirl} from "external_site/insagirl.js";
import {ADD_page_change} from "general/page_change.js";
import {ADD_popup_player} from "general/popup_player.js";
// import {point_clicker} from "general/point_clicker.js";
// import { test } from "general/import_test.js";
// import {easy_go} from "general/go.js";
// import "general/ingyeodo.js";

"use strict";

(async () => {
    // dynamic import example
    // const {test2, test} = await import("general/import_test.js");

    // global 변수 선언
    await nomo_global_manager(window);
    
    // Migration
    ADD_migration();

    // 설정 불러오기
    window.GM_setting = GM_setting;
    await GM_setting.init("ADD_config");
    await GM_setting.load();

    // 이벤트 탈취
    event_hijacking();

    //////////////////////////////////////////////////////////////////////////////////
    // 메인 또는 스트림인 경우
    if(nomo_global.PAGE == nomo_const.C_MAIN || nomo_global.PAGE == nomo_const.C_STREAM || nomo_global.PAGE == nomo_const.C_M3U8PLAYER){
        // Call Twitch api
        await twitch_api();
        await twitch_api_call_interval();

        $(document).ready(function(){
            window.chat_manager_main = chat_manager;
            // Hijacking
            // Firefox 의 경우
            if((web_browser === "firefox") && (typeof exportFunction === "function")){
                unsafeWindow.dostream = exportFunction(newdostream, unsafeWindow);
                unsafeWindow.dsStream = exportFunction(newdsStream, unsafeWindow);
            }
            // 그 이외(Chrome 등)의 경우
            else{   // if(web_browser === 'chrome')
                unsafeWindow.dsStream = newdsStream;
                unsafeWindow.dostream = newdostream;
                nomo_common.reloadMain();
            }

            // 기본 css 적용
            nomo_theme.ADD_basic_style();

            // 테마 적용
            nomo_theme.ADD_theme();
            nomo_theme.ADD_night_mode({message:false});

            // 기본 레이아웃 생성
            ADD_basic_layout();

            // 1회 등록 필요한 event
            ADD_event_bind_init();

            // ON-OFF 에 따라 바뀌는 이벤트 적용
            ADD_main_event_binding();

            // 이벤트 할당
            ADD_simple_config_event();
            ADD_var_to_config_form();

            // 테스트용
            if(nomo_global.DEBUG){
                // easy_go();
                ADD_test();
            }

            // Change Logo class name & add loader
            $(".nav-brand")
                .removeClass("nav-brand")
                .addClass("nav-brand_mod")
                .empty()
                .append(`<div class="loader_container" style="display:none;"><div class="loader"></div></div>`)
                .on("click", function(){
                    if(nomo_global.PAGE === nomo_const.C_MAIN){
                        twitch_api();
                        page = new dsStream();
                        page.reload();
                        ADD_multitwitch_layout();
                    }
                    // 스트림 계속 이어 보기
                    else if(ADD_config.popup_player){
                        //e.preventDefault();
                        twitch_api();
                        ADD_popup_player();
                    }
                });

            // History layout
            ADD_channel_history_run();


            ADD_page_change(jQuery, window, document);

            // UHAHA Chat waiting
            $(document).arrive("#uha_chat", {onlyOnce: true, existing: true}, function(){
                get_chat_manager_from_main_frame();
                ADD_chatting_arrive_for_UHAHA();
            });
        });
    }
    // 채팅인 경우
    else if(nomo_global.PAGE == nomo_const.C_UCHAT){
        $(document).ready(function(){
            ADD_DEBUG("DOCUMENT_READY");
            unsafeWindow.ADD_send_sys_msg = ADD_send_sys_msg;
            unsafeWindow.chat_manager = chat_manager;

            // 두번째 iframe 동작 방지
            if(web_browser === "firefox" && $("u-chat").length === 0){
                return;
            }

            // 테마 적용
            nomo_theme.ADD_theme();
            nomo_theme.ADD_night_mode({message:false});

            ADD_chat_event_binding();
        });
    }
    // 상세 설정인 경우
    else if(nomo_global.PAGE == nomo_const.C_SETTING_NW){
        window.chat_manager = chat_manager;
        $(document).ready(function(){
            $("body").empty().css("padding","0px 30px 30px 30px");
            $("head").append(`
                <link href="/js/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
                <link href="/css/dostream.css?20180429" media="screen" rel="stylesheet" type="text/css">
            `);
            document.title = "두스트림 - ADDostream 상세 설정 페이지";
            
            // 기본 css 적용
            nomo_theme.ADD_basic_style();

            // 테마 적용
            nomo_theme.ADD_theme();

            // 1회 등록 필요한 event
            ADD_event_bind_init();

            GM_setting.createlayout($("body"));
        });
    }
    // 외부 사이트 - EMBEDED TWITCH
    else if(nomo_global.PAGE === nomo_const.C_EMBEDED_TWITCH){
        if(ADD_config.twitch_control){
            $(document).ready(function(){
                $(document).arrive("div.player-video", {onlyOnce: true, existing: true}, function(){
                    ADD_DEBUG("EMBEDED_PLAYER", unsafeWindow.player);

                    // 1초 간격으로 player 활성 상태 확인
                    var is_playing_counter = 0;
                    var is_playing = false;
                    var si = setInterval(function(){
                        if(unsafeWindow.player !== undefined){
                            is_playing = unsafeWindow.player.isPlaying();
                        }
                        ADD_DEBUG("현재 상태:", is_playing);
                        if(is_playing){
                            clearInterval(si);

                            // 화질 설정
                            if(ADD_config.twitch_start_highest_quality){
                                setTimeout(function(){
                                    var highest_quality = unsafeWindow.player.getQualities()[1];
                                    ADD_DEBUG("highest_quality", unsafeWindow.player.getQualities());
                                    unsafeWindow.player.setQuality(highest_quality.group);
                                    ADD_DEBUG("최고 화질 설정", highest_quality);
                                },2000);
                            }
            
                            // 음소거 처리
                            // if(ADD_config.twitch_start_unmute){
                            //     setTimeout(function(){
                            //         unsafeWindow.player.setMuted(false);
                            //     },2000);
                            // }
                        }
                        else{
                            is_playing_counter = is_playing_counter + 1;
                            ADD_DEBUG("1초 후 재시도 합니다. 현재 시도 수:", is_playing_counter);

                            if(is_playing_counter > 10){
                                ADD_DEBUG("10회 시도에 실패하였습니다");
                                clearInterval(si);
                            }
                        }
                    },1000);
        
                    // 에러 처리
                    $(document).arrive(".pl-error", function(elem){
                        var $elem = $(elem);
                        var errorText = $elem.text();
                        ADD_DEBUG("pl_error 생성됨", errorText);
                        if(errorText.indexOf("#")){
                            $elem.html(errorText + "<br />1초후 자동 새로고침");
                            setTimeout(function(){
                                unsafeWindow.player.play();
                            },1000);
                            // $("button.player-button").trigger("click");
                        }
                    });
                });
            });
        }
        return;
    }
    // else if(nomo_global.PAGE === nomo_const.C_TWITCH){
    //     if(ADD_config.twitch_point_clicker){
    //         ADD_DEBUG("[TPAC] IS RUNNiNG");
    //         point_clicker();
    //     }
    //     return;
    // }
    // 외부 사이트 - 인사걸
    else if(nomo_global.PAGE === nomo_const.C_INSAGIRL){
        window.chat_manager = chat_manager;
        if(!ADD_config.insagirl_modify_directly){
            return;
        }
        external_insagirl();
        return;
    }

    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// $(document).load /////////////////////////////
    // layout 로드 후 실행되어야 할 것들을 이 곳에 적는다
    // window.addEventListener ("load", function(){
    //     ADD_DEBUG("WINDOW_LOAD");
    // });

})();