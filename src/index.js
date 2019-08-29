//import "general/event_hijacking.js";
import "libs/arrive.js";
import web_browser from "libs/jquery-browser.js";
// import lib_nude from "libs/nude.js";
// lib_nude();

import nomo_global_manager from "general/global.js";
import * as utils from "libs/nomo-utils.js";
const ADD_DEBUG = utils.ADD_DEBUG;

//import ADD_migration from "./settings/migration.js";
import {GM_setting} from "settings/main.js";

import nomo_const from "general/const.js";
import * as nomo_common from "general/common.js";
import * as nomo_theme from "general/theme.js";
import ADD_channel_history_run from "general/browse_history.js";
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
// import {easy_go} from "general/go.js";


"use strict";

(async () => {
    await nomo_global_manager(window);
    
    // Migration
    // ADD_migration();

    // 설정 불러오기
    window.GM_setting = GM_setting;
    await GM_setting.init("ADD_config");
    await GM_setting.load();

    //////////////////////////////////////////////////////////////////////////////////
    // 메인 또는 스트림인 경우
    if(nomo_global.PAGE == nomo_const.C_MAIN || nomo_global.PAGE == nomo_const.C_STREAM){
        // Call Twitch api
        await twitch_api();
        await twitch_api_call_interval();

        $(document).ready(function(){
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

            // 좌측 채팅 적용
            nomo_theme.ADD_leftchat_change();

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

            window.chat_manager_main = chat_manager;

            ADD_page_change(jQuery, window, document);

            // UHAHA Chat waiting
            $(document).arrive("#uha_chat", {onlyOnce: true, existing: true}, function(){
                get_chat_manager_from_main_frame();
                ADD_chatting_arrive_for_UHAHA();

                // $("#uha_chat_msgs").on("click", "a", function(e){
                //     ADD_DEBUG("clicked 2");
                //     e.stopImmediatePropagation();
                //     e.stopPropagation();
                // });
            });
        });

        // $(document).on("click", "#uha_chat_msgs a", function(e){
        //     ADD_DEBUG("clicked 1");
        //     e.stopImmediatePropagation();
        //     e.stopPropagation();
        // });
    }
    // 채팅인 경우
    else if(nomo_global.PAGE == nomo_const.C_UCHAT){
        $(document).ready(function(){
            ADD_DEBUG("DOCUMENT_READY");
            // 두번째 iframe 동작 방지
            if(web_browser === "firefox" && $("u-chat").length === 0){
                return;
            }

            // 테마 적용
            nomo_theme.ADD_theme();

            ADD_chat_event_binding();

            unsafeWindow.ADD_send_sys_msg = ADD_send_sys_msg;
            unsafeWindow.chat_manager = chat_manager;
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

            // 1회 등록 필요한 event
            ADD_event_bind_init();

            GM_setting.createlayout($("body"));
        });
    }
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