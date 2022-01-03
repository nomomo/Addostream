import {ADD_DEBUG} from "libs/nomo-utils.js";
import * as nomo_common from "general/common.js";
import {ADD_send_sys_msg} from "chat/send_message.js";
import {escapeHtml} from "libs/nomo-utils.js";

// 버전 체크
export async function checkNewVersion(force){
    if(!ADD_config.version_check){
        return false;
    }
    if(force === undefined){
        force = false;
    }
    ADD_DEBUG("checkNewVersion");
    const root = "https://raw.githubusercontent.com/nomomo/Addostream/master/";
    var ver_fut,
        ADD_version_cur_pre_fut,
        ver_fut_text = "",
        update_log = "",
        notice = "";

    var ADD_version_last_check_time = await nomo_common.nomo.getVal("ADD_version_last_check_time");
    if(ADD_version_last_check_time === undefined){
        ADD_DEBUG("Version - 이전에 버전 체크한 시간이 없어 새로 쓴다 - 2일 전");
        ADD_version_last_check_time = new Date(Date.parse(new Date()) - 2 * 1000 * 60 * 60 * 24);
        await nomo_common.nomo.setVal("ADD_version_last_check_time", ADD_version_last_check_time);
    }
    var time_pre = new Date(ADD_version_last_check_time);
    var time_cur = new Date();
    var time_bet = Number((time_cur - time_pre)/60/60/1000).toFixed(4);  // 소수점 4자리만큼 시간 얻기

    // 현재 및 이전 버전을 확인함
    if(ADD_config.last_version === undefined || ADD_config.last_version === null){
        await GM_setting.load();
    }

    var ver_pre = Number(ADD_config.last_version);
    var ver_cur = nomo_global.version;
    var ADD_version_cur_pre_fut_init = {
        ver_cur:ver_cur,
        ver_pre:ver_pre,
        ver_fut:ver_cur,
        ver_fut_text:nomo_global.version_str,
        update_log:"",
        notice:""
    };

    var ADD_version_cur_pre_fut_old = await nomo_common.nomo.getVal("ADD_version_cur_pre_fut", ADD_version_cur_pre_fut_init);

    if(!$.isNumeric(ADD_config.version_check_interval) || ADD_config.version_check_interval <= 1){
        ADD_config.version_check_interval = 1;
    }
    if(time_bet > ADD_config.version_check_interval || force){
        try {
            var response = await $.ajax({
                url: root + "package.json",
                type: "GET",
                dataType:"json"
            });
            ADD_DEBUG("Version - 버전확인 성공", response);

            update_log = response.update;
            ver_fut_text = response.version;
            notice = response.notice;
            ver_fut = Number(versionStrtoNum(ver_fut_text));

            ADD_version_cur_pre_fut = {
                ver_cur:ver_cur,
                ver_pre:ver_pre,
                ver_fut:ver_fut,
                ver_fut_text:ver_fut_text,
                update_log:update_log,
                notice:notice
            };

            // 읽어온 변수 저장
            nomo_common.nomo.setVal("ADD_version_cur_pre_fut", ADD_version_cur_pre_fut);

            // 버전 체크 시간을 다시 씀
            await nomo_common.nomo.setVal("ADD_version_last_check_time",new Date());

            response = null;

        } catch (error){
            ADD_DEBUG("Version - 버전확인 실패");
            console.error(error);
        }
    }
    else{
        ADD_version_cur_pre_fut = await nomo_common.nomo.getVal("ADD_version_cur_pre_fut", ADD_version_cur_pre_fut_init);
        ver_fut = ADD_version_cur_pre_fut.ver_fut;
        ver_fut_text = ADD_version_cur_pre_fut.ver_fut_text;
        update_log = ADD_version_cur_pre_fut.update_log;

        ADD_DEBUG("Version - 현재 와의 시간 차이 : " + time_bet + " 시간 < " + ADD_config.version_check_interval + " 이므로 체크하지 않음", ADD_version_cur_pre_fut);
    }

    ADD_DEBUG("Version - 현재 버전: "+ver_cur+", 이전 버전: "+ver_pre+" , 최신 버전: "+ver_fut, ADD_version_cur_pre_fut);

    var msg_text = "두스트림 애드온이 동작 중 입니다 (v"+nomo_global.version_str+")";

    // 현재 버전(ver_cur) > 이전 버전(ver_pre)
    if(ver_cur > ver_pre && ver_fut > ver_pre){
        msg_text = msg_text + "<br />애드온이 최근 업데이트 됨. ("+escapeHtml(nomo_global.version_str)+")";
        if(update_log !== undefined && update_log !== null && update_log !== ""){
            msg_text = msg_text +"<br />업데이트 내역: "+escapeHtml(update_log);
        }
        // 이전 버전(ver_pre) 업데이트
        ADD_config.last_version = nomo_global.version;
        await GM_setting.save();
    }
    // 업데이트 가능한 버전(ver_fut) > 현재 버전(ver_cur)
    else if(ver_fut > ver_cur){
        msg_text = msg_text + "<br />새로운 버전(<a href=\"https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js\" target=\"_blank\">v"+escapeHtml(ver_fut_text)+"</a>) 으로 업데이트 가능";
    }
    else if(ver_cur === ver_pre){
        msg_text = msg_text + "<br />현재 최신 버전 입니다.";
    }

    if(!force && ADD_config.sys_meg){
        ADD_send_sys_msg(msg_text);
    }

    if(force && ADD_config.sys_meg && ver_fut > ver_cur){
        ADD_send_sys_msg("새로운 버전(<a href=\"https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js\" target=\"_blank\">v"+escapeHtml(ver_fut_text)+"</a>) 으로 업데이트 가능");
    }

    if(!force && ADD_version_cur_pre_fut_old.notice !== ADD_version_cur_pre_fut.notice && ADD_version_cur_pre_fut.notice !== undefined && ADD_version_cur_pre_fut.notice !== "" && ADD_version_cur_pre_fut.notice !== null){
        ADD_send_sys_msg("두드온 공지: "+escapeHtml(ADD_version_cur_pre_fut.notice));
    }

    /*
    if(GM_page !== C_UCHAT && new_version_available && $("#new_version_available_text").length !== 0){
        $("#new_version_available_text").show().html("- <a href=\"https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js\" target=\"_blank\">New Version(v"+ver_fut_text+") Available!</a>");
        $("#github_url_text").hide();
    }
    */

    return true;
}

// 버전 문자열을 체크하기 쉬운 숫자로 변환
export function versionStrtoNum(str){
    var tempString = str.toString();
    var tempStringArray = tempString.split(".");
    for (var i = 0; i<tempStringArray.length; i++){
        if(tempStringArray[i].length < 2){
            tempStringArray[i] = "0"+tempStringArray[i];
        }
    }
    return tempStringArray.join("");
}