import * as nomo_common from "./common.js";
import { ADD_DEBUG } from "../libs/nomo-utils.js";
import {versionStrtoNum} from "settings/version.js";

var nomo_global_manager = async function(global){
    var init_var = {
        DEBUG: await nomo_common.isDebug(),
        version_str: GM.info.script.version,
        version: Number(versionStrtoNum(GM.info.script.version)),
        PAGE: nomo_common.ADD_get_page_type(),
        PAGE_str: nomo_common.ADD_get_page_type_str(),

        is_send_location: true,     // 좌표 보내기 이벤트
        dostream_fix: false,        // 두스트림 공사중인지 여부 체크
        
        local_api_refresh: true,                 // Setting save 버튼 연속으로 눌렀을 때 막기 위한 용도
        
        // 트위치 api
        ADD_twitch_user_ids: {},
        ADD_API_SET_INTERVAL: undefined,
        api_push_forced: false,                  // true 이면 twitch api를 강제로 push 함, Setting save 시 사용
        twitch_api_cookie: [],
        first_api_call: true,                    // 첫번째 api 호출인지 체크함
        unique_window_check: true,               // Unique window 감지용

        // 채팅
        chatting_arrive_check: null,             // 채팅창 arrive 체크용
        isGoScrollDown: true,                     // 채팅창 스크롤 내림 여부 기억

        // unique window
        unique_window: undefined,      // Unique Window 체크용 변수 생성

        // 채팅 자동 새로고침
        ADD_unique_window: Number(new Date()) + Math.floor(Math.random()*1000000) + 1,
        ADD_unique_window_event_ID: undefined,
        ADD_is_unique_window_reload: false,
        ADD_unique_window_reload_counter: 0,

        ADD_now_playing: {id:"", display_name:"", title:"", toonat_link:"", twip_link:""},
        
        getTimeStampRes: "",
        multitwitch_checked_streamer_arr: [],

        GLOBAL_CHAT_IFRAME: undefined,
        $GLOBAL_CHAT_IFRAME: undefined,
        $GLOBAL_IFRAME_DOCUMENT: undefined,
        GLOBAL_CHAT_CONTENT_DIV: undefined,

        // 우하하 채팅
        uhaha_chat_auto_remove_counter: 0,

        // night mode
        night_mode: false,
        night_mode_transition: undefined,
        night_mode_on: undefined,
        night_mode_end: undefined,
        night_mode_black: false,
        night_mode_direct_call: false
    };

    var init = async function(){
        if(global.nomo_global === undefined){
            global.nomo_global = init_var;
        }

        if(global.chatlog_local === undefined){
            unsafeWindow.chatlog_local = {};
        }
    };

    init();
    ADD_DEBUG("global.nomo_global", global.nomo_global);

    /////////////////////////////////////////////////
    // public interface
    return {
        get:function(){
            if(global.nomo_global === undefined){
                init();
            }
            return global.nomo_global;
        }
    };
};

export default nomo_global_manager;