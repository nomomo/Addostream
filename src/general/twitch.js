import { ADD_send_sys_msg_from_main_frame } from "chat/send_message.js";
import * as nomo_common from "general/common.js";
import nomo_const from "general/const.js";
import { ADD_var_to_config_form } from "general/menu_layout.js";
import * as utils from "libs/nomo-utils.js";
import {escapeHtml} from "libs/nomo-utils.js";
import { TwitchHelixAPI } from "api/twitchapi.js";
var ADD_DEBUG = utils.ADD_DEBUG;

/**
 * user id 를 api 호출로 읽어와서 캐시 및 호출 가능한 id 리턴
 * @param ch_ids_array - twitch api 호출할 login id
 * @returns 호출 가능한 id array
 */
async function twitch_api_get_user_ids(ch_ids_array) {
    var return_arr = [];

    // 1. 저장된 IDs 리스트 읽기 (key-value)
    var ADD_twitch_user_ids = await nomo_common.nomo.getVal("ADD_twitch_user_ids", {});

    // 2. 입력된 배열 체크하여 문제있을 경우 함수 종료
    if (ch_ids_array === undefined || ch_ids_array === null || ch_ids_array.length === 0) {
        return utils.filter_obj_by_arr(ADD_twitch_user_ids, ch_ids_array);
    }

    // 3. 기존에 저장된 ID 값과 비교하여 새로 호출 필요한 것만 필터링
    ADD_DEBUG("아이디 긁어오기 - 현재 저장된 Twitch ID 리스트", ADD_twitch_user_ids);
    var ch_ids_keys = Object.keys(ADD_twitch_user_ids);
    var new_req = $.grep(ch_ids_array, function (n, _j) {
        return $.inArray(n, ch_ids_keys) === -1;
    });

    // 3-1. 새로 호출하지 않아도 되는 경우
    if (new_req <= 0) {
        ADD_DEBUG("아이디 긁어오기 - 추가 호출하지 않아도 된다");
        return utils.filter_obj_by_arr(ADD_twitch_user_ids, ch_ids_array);
    }

    // 3-2. 새로 호출 필요한 경우
    ADD_DEBUG("아이디 긁어오기 - 새로 호출해야 하는 타겟: ", new_req);
    var ch_ids_string = new_req.join(",").replace(/\s/g, "").toLowerCase();

    //return ADD_twitch_user_ids;
    $.ajax({
        url: "https://api.twitch.tv/kraken/users?login=" + ch_ids_string,
        type: "GET",
        dataType: "json",
        async: false,
        timeout: 2000,
        headers: {
            "Accept": "application/vnd.twitchtv.v5+json",
            "Client-ID": nomo_const.ADD_CLIENT_ID_TWITCH
        },
    })
        .done(function (channel) {
            ADD_DEBUG("Twitch API - Request done", channel);
            var users = channel.users;
            if (users.length !== 0) {
                // for 문 돌면서 id_ ??? 를 숫자로 구성된 ids 배열에 push 해야함
                for (var i = 0; i < users.length; i++) {
                    ADD_DEBUG("users[name]", users[i].name, "users[i]._id", users[i]._id);
                    ADD_twitch_user_ids[users[i].name] = users[i]._id;
                }
            }

            ADD_DEBUG("호출 끝", typeof ADD_twitch_user_ids, ADD_twitch_user_ids);
        })
        .fail(function (error) {
            ADD_DEBUG("Twitch API - Request failed", error);
        })
        .always(function (com) {
            ADD_DEBUG("Twitch API - Complete", com);
        });

    // 배열을 저장해야함
    await nomo_common.nomo.setVal("ADD_twitch_user_ids", ADD_twitch_user_ids);
    ADD_DEBUG("아이디 긁어오기 - 저장 끝", ADD_twitch_user_ids);
    return_arr = utils.filter_obj_by_arr(ADD_twitch_user_ids, ch_ids_array);

    var null_ids = [];
    for (var i = 0; i < ch_ids_array.length; i++) {
        if (!(ch_ids_array[i] in ADD_twitch_user_ids)) {
            null_ids.push(ch_ids_array[i]);
        }
    }

    if (null_ids.length > 0) {
        var msg = "Twitch API 호출 중 다음의 아이디를 찾지 못했습니다. " + escapeHtml(null_ids.join(", ")) + ". 메인에 스트리머 추가 리스트에서 해당 아이디가 제거되었습니다.";
        ADD_send_sys_msg_from_main_frame(msg);
        ADD_config.top_alarm_ID = ADD_config.top_alarm_ID.filter(function (elem) {
            return $.inArray(elem, null_ids) === -1;
        });
        await GM_setting.save();

        // 설정창 켜져있는 경우
        if ($("#popup_ADD_config").is(":visible")) {
            ADD_var_to_config_form();
        }
    }

    return return_arr;
}

var isHelix401 = false;
export async function twitch_api(option) {
    if (!ADD_config.alarm) {
        return false;
    }

    // 설정 저장 후 강제 새로고침 되어야 하는지 확인한다.
    var is_forced = await nomo_common.nomo.getVal("ADD_twitch_api_refresh_force", false);
    if(is_forced){
        await nomo_common.nomo.setVal("ADD_twitch_api_refresh_force", false);
        nomo_global.api_push_forced = true;
        ADD_DEBUG("twitch_api - 설정 저장 직후 강제 새로고침");
    }

    // api 갱신 간격 검증
    var ADD_config_alarm_gap = Number(ADD_config.alarm_gap);
    if ($.isNumeric(ADD_config.alarm_gap) && ADD_config_alarm_gap < nomo_const.API_INTERVAL_MIN_TIME) {
        ADD_config_alarm_gap = 1.0;
    }

    // api 업데이트 여부 확인
    var api_update = await nomo_common.GM_cache("GM_cache_twitch_api", ADD_config_alarm_gap * 60 * 1000);

    // 호출 가능 시 호출
    if (nomo_global.unique_window_check && (nomo_global.api_push_forced || api_update)) {
        nomo_global.api_push_forced = false;
        var ch_ids_array = ADD_config.top_alarm_ID;
        if (ch_ids_array.length > 0) {
            var new_ch_ids_string = ch_ids_array.join("&user_login=").replace(/\s/g, "").toLowerCase();
            var response = await TwitchHelixAPI("streams?first=100&user_login="+new_ch_ids_string);
            if(!response.ok){
                ADD_DEBUG("Twitch API to call list - Request failed", response);
                if(response.status == 401){
                    if(!isHelix401){
                        isHelix401 = true;
                        ADD_send_sys_msg_from_main_frame(`[Dostream+] Twitch API 사용을 위한 토큰이 유효하지 않습니다. 메인에 스트리머 추가 설정을 끄거나, <a class="OpenTwitchAuth" style="text-decoration:underline !important" href="https://www.dostream.com/addostream/twitch/auth/" target="_blank">이 링크를 클릭하여 Dostream+ 와 Twitch 계정 연결을 완료하십시오.</a>`);
                    }
                }
                else{
                    ADD_send_sys_msg_from_main_frame(`[Dostream+] Twitch API 오류가 발생했습니다. Error: ${JSON.stringify(response)}`);
                }
            }
            else{
                ADD_DEBUG("Twitch API to call list - request succeeded", response);
                var streams = response.data.data;

                // 온라인 스트리머가 있는 경우
                if (streams.length !== 0) {
                    for (var i = 0; i < streams.length; i++) {
                        if (i === 0) {
                            // API 변수 초기화
                            nomo_global.twitch_api_cookie = [];
                        }

                        var stream = streams[i];
                        if (stream !== null) {
                            nomo_global.twitch_api_cookie[i] = {
                                "name": stream.user_login,
                                "display_name": stream.user_name,
                                "status": stream.title,
                                "viewers": stream.viewer_count,
                                "game": stream.game_name
                            };
                        }

                        // GC
                        stream = null;
                    } // streams 에 대한 for문 끝
                    $.cookie("twitch_api_cookie", JSON.stringify(nomo_global.twitch_api_cookie), {
                        expires: (new Date()).getMinutes() + 10,
                        path: "/"
                    });
                }
                // 온라인 스트리머가 없는 경우
                else {
                    ADD_DEBUG("Twitch API - NO ONLINE STREAMER, API cookie is REMOVED");
                    $.removeCookie("twitch_api_cookie");
                }

                // 처음 api 호출 끝나면 false 로 바꾼다.
                if (nomo_global.first_api_call) {
                    nomo_global.first_api_call = false;
                }

                // 메인일 경우 리로드
                ADD_DEBUG("Twitch API - API 호출에 의하여 메인 리로드 됨");
                if (ADD_config.alarm_main_reload && nomo_global.PAGE === nomo_const.C_MAIN) {
                    nomo_common.reloadMain();
                }

                // 채팅에 메시지 띄움
                /*
                if(ADD_config.sys_meg !== undefined && ADD_config.sys_meg){
                    var temp_date = new Date();
                    temp_date = leadingZeros(temp_date.getFullYear(), 4) + "-" + leadingZeros(temp_date.getMonth() + 1, 2) + "-" +  leadingZeros(temp_date.getDate(), 2) + " " + leadingZeros(temp_date.getHours(), 2) + ":" + leadingZeros(temp_date.getMinutes(), 2) + ":" + leadingZeros(temp_date.getSeconds(), 2);
                    ADD_send_sys_msg_from_main_frame("Twitch API 호출 완료 ("+temp_date+")",0);
                }
                */

                nomo_common.GM_cache_write("GM_cache_twitch_api");
                nomo_global.list_update_time = new Date();
                ADD_DEBUG("리스트 업데이트 시간 갱신 - 트위치 api:", nomo_global.list_update_time);
            }

            // $.ajax({
            //     url: "https://api.twitch.tv/kraken/streams/?offset=0&limit=100&channel=" + new_ch_ids_string,
            //     type: "GET",
            //     dataType: "json",
            //     headers: {
            //         "Accept": "application/vnd.twitchtv.v5+json",
            //         "Client-ID": nomo_const.ADD_CLIENT_ID_TWITCH
            //     },
            // })
            //     .done(function (channel) {
            //         var streams = channel.streams;
            //         ADD_DEBUG("Twitch API - request succeeded", channel);

            //         // 온라인 스트리머가 있는 경우
            //         if (streams.length !== 0) {
            //             for (var i = 0; i < streams.length; i++) {
            //                 if (i === 0) {
            //                     // API 변수 초기화
            //                     nomo_global.twitch_api_cookie = [];
            //                 }

            //                 var stream = streams[i];
            //                 if (stream !== null) {
            //                     nomo_global.twitch_api_cookie[i] = {
            //                         "name": stream.channel.name,
            //                         "display_name": stream.channel.display_name,
            //                         "status": stream.channel.status,
            //                         "viewers": stream.viewers,
            //                         "game": stream.channel.game
            //                     };
            //                 }

            //                 // GC
            //                 stream = null;
            //             } // streams 에 대한 for문 끝
            //             $.cookie("twitch_api_cookie", JSON.stringify(nomo_global.twitch_api_cookie), {
            //                 expires: (new Date()).getMinutes() + 10,
            //                 path: "/"
            //             });
            //         }
            //         // 온라인 스트리머가 없는 경우
            //         else {
            //             ADD_DEBUG("Twitch API - NO ONLINE STREAMER, API cookie is REMOVED");
            //             $.removeCookie("twitch_api_cookie");
            //         }

            //         // 처음 api 호출 끝나면 false 로 바꾼다.
            //         if (nomo_global.first_api_call) {
            //             nomo_global.first_api_call = false;
            //         }

            //         // 메인일 경우 리로드
            //         ADD_DEBUG("Twitch API - API 호출에 의하여 메인 리로드 됨");
            //         if (ADD_config.alarm_main_reload && nomo_global.PAGE === nomo_const.C_MAIN) {
            //             nomo_common.reloadMain();
            //         }

            //         // 채팅에 메시지 띄움
            //         /*
            //         if(ADD_config.sys_meg !== undefined && ADD_config.sys_meg){
            //             var temp_date = new Date();
            //             temp_date = leadingZeros(temp_date.getFullYear(), 4) + "-" + leadingZeros(temp_date.getMonth() + 1, 2) + "-" +  leadingZeros(temp_date.getDate(), 2) + " " + leadingZeros(temp_date.getHours(), 2) + ":" + leadingZeros(temp_date.getMinutes(), 2) + ":" + leadingZeros(temp_date.getSeconds(), 2);
            //             ADD_send_sys_msg_from_main_frame("Twitch API 호출 완료 ("+temp_date+")",0);
            //         }
            //         */

            //         nomo_common.GM_cache_write("GM_cache_twitch_api");
            //         nomo_global.list_update_time = new Date();
            //         ADD_DEBUG("리스트 업데이트 시간 갱신 - 트위치 api:", nomo_global.list_update_time);
            //     })
            //     .fail(function (error) {
            //         ADD_DEBUG("Twitch API - Request failed", error);
            //     })
            //     .always(function () {
            //         ADD_DEBUG("Twitch API - Complete");
            //     });
        }
    } else {
        // not update
        if ($.cookie("twitch_api_cookie")) {
            // 쿠키 존재 시 변수로 쓴다.
            nomo_global.twitch_api_cookie = JSON.parse($.cookie("twitch_api_cookie"));
        }

        // API 업데이트 하지 않는 경우
        // twitch_api_call_interval 에 의해 호출되는 경우가 아니면 메인 리로드 하지 않도록 함
        if(option !== undefined && option.main_refresh !== undefined && option.main_refresh){
            ADD_DEBUG("Twitch API - API 호출 없이 메인 리로드 됨");
            if (ADD_config.alarm_main_reload && nomo_global.PAGE === nomo_const.C_MAIN) {
                nomo_common.reloadMain();
            }
        }
    }
}

/**
 * Twitch API를 주기적으로 호출
 */
export async function twitch_api_call_interval() {
    if (!ADD_config.alarm) {
        clearInterval(nomo_global.ADD_API_SET_INTERVAL);
        return false;
    }

    var api_call_interval = Number(ADD_config.alarm_gap);
    if (!$.isNumeric(api_call_interval) || api_call_interval < nomo_const.API_INTERVAL_MIN_TIME) {
        api_call_interval = nomo_const.API_INTERVAL_MIN_TIME;
    }
    api_call_interval = api_call_interval * 1000 * 60;

    if (nomo_global.ADD_API_SET_INTERVAL) {
        clearInterval(nomo_global.ADD_API_SET_INTERVAL);
    }

    nomo_global.ADD_API_SET_INTERVAL = setInterval(async function () {
        ADD_DEBUG("twitch_api_call_interval 에 의해 twitch_api() 함수 호출됨");
        await twitch_api({"main_refresh":true});
    }, api_call_interval);
}