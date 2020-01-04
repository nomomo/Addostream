import nomo_const from "general/const.js";
import {ADD_get_page_type} from "general/common.js";
import {ADD_DEBUG} from "libs/nomo-utils.js";

// 잉여도 로깅을 위한 모듈

// 최근 X일간의 잉여도를 로깅 (기본값: 30일)
// 정확한 기록은 하지 않고 참고용이므로 대충 로깅함

// 로깅 대상
// 전체/1일 시청 시간 (초기 접속 시부터 x초 간격으로 재귀 setTimeout 을 이용하여 로깅)
// 전체/1일 채널별 시청 시간 (x초 간격으로 재귀 setTimeout 을 이용하여 로깅, 페이지 이동 시 마다 clearTimeout)
// 전체/1일 채팅 입력 횟수 (class: myLine 이 탐지되는 횟수를 이용하여 로깅)

// 로깅 제외 대상
// 시청 시간대 - 로깅해야 하는 양이 많다

// 분석
// 일별 평균 시청 시간
// 월별 평균 시청 시간

// 일별 시청 시간 (표 or 그래프)
// 월별 시청 시간 (표 or 그래프)
// 채널 별 시청 시간 (파이 그래프)

// 지금까지 두스에 쓴 전체 시간으로
// 책을 몇권 읽을 수 있을까?
// 몇 km를 걸을 수 있을까?

// 저장 구조 : array
// index 가 "20191023" 형태가 되도록 하여 저장
var ingyeodo_setInterval = undefined;
function ingyeodo(){
    const interval_time = 60000;    // 60s = 1분

    if(!ADD_config.ingyeodo){
        clearInterval(ingyeodo_setInterval);
        return;
    }

    if(nomo_global.is_chat_pause){
        ingyeodo_setInterval = setInterval(function(){
            ingyeodo_repeat();
        },interval_time);
    }
    
}

async function ingyeodo_manager(){
    const ingyeodo_data_init = {
        total: 0,
        year: {
            // 2020:0
        },
        month: {
            // 12:0
        },
        date: {
            // 200103:{d}
        },
    };
}

async function ingyeodo_repeat(){
    var ingyeodo_data = await GM.getValue("ingyeodo_data", {});

    var parent_href = parent.window.location.href;
    var page_type = ADD_get_page_type(parent_href);
    if(page_type === nomo_const.C_MAIN){
        //
    }
    else if(page_type === nomo_const.C_STREAM){
        //
    }
}

$(document).on("ADD_page_change", function(){
    ADD_DEBUG("ADD_page_change from ingyeodo.js");
});