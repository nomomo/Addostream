import * as nomo_commom from "general/common.js";
import {ADD_send_sys_msg} from "chat/send_message.js";

const CHAT_AUTO_REFRESH_MAX_TIME_LIMIT = 60;
const CHAT_AUTO_REFRESH_TIME = 5;
const CHAT_AUTO_REFRESH_MAX_COUNT = 5;
const CHAT_AUTO_REFRESH_MESSAGE_COUNTDOWN_TIME = 5;

// ADD_chat_auto_refresh 를 읽어서, 이전에 채팅이 자동으로 리프레쉬 되었는지를 확인하고 메시지를 보낸다.
export async function chat_auto_refresh_send_message(){
    var current_time = Number(new Date());
    var previous_refresh = await nomo_commom.nomo.getVal("ADD_chat_auto_refresh",{"prev_time":(current_time - 60*1000),"count":0,"is_refresh":false});

    // 만약 채팅이 최근에 리프레쉬 된 경우
    if(previous_refresh.is_refresh && current_time - previous_refresh.prev_time > CHAT_AUTO_REFRESH_MAX_TIME_LIMIT*1000){
        ADD_send_sys_msg(`최근 채팅이 자동으로 새로고침 되었습니다. (${previous_refresh.count}회) `);
        
        previous_refresh.is_refresh = false;
        await nomo_commom.nomo.setVal("ADD_chat_auto_refresh", previous_refresh);
    }
}

// 채팅이 중단된 경우, X초 후에 채팅을 자동으로 새로고침 한다.
// 다른 창에서 열린 것에 의해서는 새로고침 해서는 안 된다.
export async function chat_auto_refresh(){
    if(false){
        return;
    }

    // CHAT_AUTO_REFRESH_MESSAGE_COUNTDOWN_TIME 만큼 카운트 후 새로고침 한다.
    var countdown = CHAT_AUTO_REFRESH_MESSAGE_COUNTDOWN_TIME;
    ADD_send_sys_msg("채팅이 중단됨.");
    
    // for문 or setTimeout
    ADD_send_sys_msg(`${countdown} 초 후 채팅을 자동으로 새로고침 합니다.`);
    countdown = countdown - 1;

}