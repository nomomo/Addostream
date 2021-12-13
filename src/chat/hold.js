

import * as nomo_common from "general/common.js";
import * as utils from "libs/nomo-utils.js";
const ADD_DEBUG = utils.ADD_DEBUG;

var all_tabs;
var this_tab = undefined;

function isHoldSupport(){
    return !(GM_getTab === undefined || GM_getTabs === undefined || GM_saveTab === undefined);
}

function tab_init(){
    return {
        created: Number(new Date()) + Math.random(),
        autoRefresh: false
    };
}

export async function get_current_tab(){
    await GM_getTab(function(thisTabData){
        ADD_DEBUG("현재 탭 파라미터 읽기 시작");
        if(thisTabData.created) {
            ADD_DEBUG("현재 탭은 기존에 열려있던 탭임", thisTabData);
        }
        else{
            // 처음 열린 탭인경우
            thisTabData = tab_init();
            GM_saveTab(thisTabData);
            ADD_DEBUG("현재 탭은 지금 처음 열린 탭임", thisTabData);
        }
        this_tab = utils.deepCopy(thisTabData);
    });
}

export async function get_all_tabs(){
    await GM_getTabs(function(_all_tabs){
        all_tabs = utils.deepCopy(_all_tabs);
        ADD_DEBUG("모든 탭 파라미터 읽기", all_tabs);
    });
}


// 탭별 채팅 홀드 고유 변수 생성 or 읽어오기
export async function read(){
    if(!isHoldSupport() || !nomo_common.isDebug()){
        return;
    }
    
    // 현재 탭 파라미터 읽기
    await get_current_tab();

    // 모든 탭 정보 읽어오기
    await get_all_tabs();
}

export async function init(){
    await read();
    ADD_DEBUG("this_tab", this_tab);
    await GM_getTab(function(thisTabData){
        ADD_DEBUG("현재 탭 파라미터 읽기 시작");
        if(thisTabData.created) {
            ADD_DEBUG("현재 탭은 기존에 열려있던 탭임", thisTabData);
        }
        else{
            // 처음 열린 탭인경우
            thisTabData = tab_init();
            GM_saveTab(thisTabData);
            ADD_DEBUG("현재 탭은 지금 처음 열린 탭임", thisTabData);
        }
    });
}

// 체크박스 클릭 시 동작
function chat_hold_checked(checked){
    GM_getTab(function(thisTabData){
        ADD_DEBUG("현재 탭 파라미터 읽기 시작");
        thisTabData.autoRefresh = checked;
    });

    GM_getTabs(async function(all_tabs){
        //
    });

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

// 체크박스 레이아웃 생성
export function chat_hold_layout(checkedInit){
    if(!nomo_common.isDebug()){
        return;
    }

    // if(!ADD_config.chat_hold){
    //     $(".chat_hold").remove();
    //     $(".chat-container_mod").addClass("chat-container").removeClass("chat-container_mod");
    //     return;
    // }

    if($(".chat_hold").length === 0){
        var $middlebox = nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("div.middlebox");
        var $newWindowResponse = $(`
        <div class="newWindowRseponseContainer" style="font-size:9px;display:inline-block;float:right;vertical-align:middle;height:auto;padding:5px;">
            <input type="checkbox" id="chatHoldCheckbox">
            <label for="chatHoldCheckbox"></label>
        </div>
        `);
        $newWindowResponse.prop("checked", checkedInit);
        $newWindowResponse.on("click", function(e){
            chat_hold_checked(e.target.checked);
        });
        $middlebox.append($newWindowResponse);
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

var ADD_chat_auto_reload = {
    // 부모창에서 unique_window 값 가져올 수 있도록 수정 필요
    layout: async function(){
        if(!ADD_config.chat_auto_reload){
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".newWindowResponse").off("input");
            if(typeof GM.removeValueChangeListener === "function"){
                GM.removeValueChangeListener(nomo_global.ADD_unique_window_event_ID);
            }
            else{
                clearInterval(nomo_global.ADD_unique_window_event_ID);
            }
            $(".newWindowRseponseContainer").remove();
            return false;
        }
        
        // layout 생성
        if($(".newWindowRseponseContainer").length === 0){
            var temp_uw = utils.getUrlVars()["uw"];
            var temp_uwc = utils.getUrlVars()["uwc"];
            if(temp_uw !== undefined && temp_uwc !== undefined){
                nomo_global.ADD_unique_window = temp_uw;
                nomo_global.ADD_unique_window_reload_counter = temp_uwc;
            }

            var $middlebox = nomo_global.$GLOBAL_IFRAME_DOCUMENT.find("div.middlebox");
            var $newWindowResponse = $(`
            <div class="newWindowRseponseContainer" style="font-size:9px;display: inline-block;float:right;vertical-align:middle;height: auto;padding: 5px;">
            <span style="padding-right:3px;">자동 새로고침</span>
                <input type="checkbox" class="newWindowResponse">
            </div>
            `);
            $middlebox.append($newWindowResponse);

            // 현재 창에서 체크박스 컨트롤
            nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".newWindowResponse").on("input", function(){
                var $this = $(this);
                if($this.is(":checked")){
                    nomo_global.ADD_is_unique_window_reload = true;
                    GM.setValue("ADD_unique_window", nomo_global.ADD_unique_window);
                }
                else{
                    nomo_global.ADD_is_unique_window_reload = false;
                }
            });

            // 다른창에서 체크에 의한 체크박스 컨트롤
            if(typeof GM.addValueChangeListener === "function"){
                nomo_global.ADD_unique_window_event_ID = GM.addValueChangeListener("ADD_unique_window", async function(val_name, old_value, new_value, remote) {
                    if(remote){
                        ADD_DEBUG("다른 창에서 설정 변경됨. val_name, old_value, new_value:", val_name, old_value, new_value);
                        if(nomo_global.ADD_is_unique_window_reload && new_value !== nomo_global.ADD_unique_window){
                            nomo_global.ADD_is_unique_window_reload = false;
                            nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".newWindowResponse").prop("checked", false);
                        }
                    }
                });
            }
            else{
                nomo_global.ADD_unique_window_event_ID = setTimeout(async function(){
                    var new_value = await GM.getValue("ADD_unique_window", nomo_global.ADD_unique_window);
                    if(nomo_global.ADD_is_unique_window_reload && new_value !== nomo_global.ADD_unique_window){
                        nomo_global.ADD_is_unique_window_reload = false;
                        nomo_global.$GLOBAL_IFRAME_DOCUMENT.find(".newWindowResponse").prop("checked", false);
                    }
                }, 1000);
            }
        }
    },
    EXE:function(){
        if(!ADD_config.chat_auto_reload){
            return false;
        }
        if(nomo_global.ADD_is_unique_window_reload && nomo_global.ADD_unique_window_reload_counter < 5){
            nomo_global.ADD_unique_window_reload_counter += 1;
            window.location.href = "https://www.dostream.com/uchat2.php?uw="+nomo_global.ADD_unique_window+"&uwc="+nomo_global.ADD_unique_window_reload_counter;

            // setTimeout(function(){
            //     ADD_unique_window_reload_counter -= 1;
            // }, 10000);
        }
    }
};