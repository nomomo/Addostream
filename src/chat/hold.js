
// 탭별 채팅 홀드 고유 변수 생성 or 읽어오기
async function chat_hold_read(){
    if(GM_getTab === undefined || GM_getTabs === undefined || GM_saveTab === undefined){
        return;
    }

    // 파라미터
    var created = Number(new Date());
    
    // 현재 탭 파라미터 읽기
    GM_getTab(function(thisTabData){
        ADD_DEBUG("현재 탭 파라미터 읽기 시작");
        if(thisTabData.created) {
            // 기존에 탭 열려있었던 경우
            created = thisTabData.created;
            ADD_DEBUG("기존에 열려있던 탭", thisTabData);
        }
        else{
            // 처음 열린 탭인경우
            thisTabData.created  = created;
            GM_saveTab(thisTabData);
            ADD_DEBUG("처음 열린 탭", thisTabData);
        }
    });

    // 모든 탭 정보 읽어오기
    GM_getTabs(async function(all_tabs){
        ADD_DEBUG("모든 탭 정보 읽기 시작");
        if(all_tabs.length === 1){
            // 탭이 하나밖에 없는 경우 무조건 채팅 로드함
            // +++ chat hold 변수를 내 탭의 created 값으로 업데이트
            await GM.setValue("ADD_chathold", created);
        }
    });
}

// 체크박스 클릭 시 동작
function chat_hold_checked(checked){
    if(checked === undefined || typeof checked !== "boolean"){
        return false;
    }

    // 체크한 경우
    if(checked){
        // chat hold 변수를 내 탭의 created 값으로 업데이트
        // 채팅창 없는 경우 채팅창 생성

    }
    // 체크 해제한 경우
    else{
        // chat hold 변수를 읽음
        // chat hold 변수가 내 탭의 created 값과 동일한 경우 undefined 로 업데이트
        //                                      동일하지 않으면 아무 작업 안 함
        // 채팅창 제거
    }
}

function chat_hold_layout(){
    if(!ADD_config.chat_hold){
        $(".chat_hold").remove();
        $(".chat-container_mod").addClass("chat-container").removeClass("chat-container_mod");
        return;
    }

    if($(".chat_hold").length === 0){
        // layout 생성
    }
}
// var chat_container = $(".chat-container");
// if(chat_container.length !== 0){
//     chat_hold();
// }
// else{
//     $(document).ready(function(){
//         chat_hold();
//     });
// }