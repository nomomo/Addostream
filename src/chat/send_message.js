import {ADD_DEBUG} from "../libs/nomo-utils.js";
import nomo_const from "../general/const.js";
//import * as nomo_common from "../general/common.js";
import {goScrollDown, isChatScrollOn} from "./control.js";

//////////////////////////////////////////////////////////////////////////////////
// 채팅창 시스템 메시지
export function ADD_send_sys_msg(msg, delay, type){
    ADD_DEBUG("ADD_send_sys_msg", msg, delay);
    var divClass = "line fired system";
    if(type !== undefined && type !== null){
        if(type === 1){
            divClass = "line fired system";
        }
        else if(type === 2){
            divClass = "line";
        }
        else{
            divClass = "line fired system";
        }
    }
    var msg_text = "<div class=\""+divClass+"\" title=\"Dosteam+ System Message\"><span class=\"nick\" nick=\"system\"></span><span class=\"chatContent\">"+msg+"</span></div>";

    if(delay === 0 || delay === undefined){
        var iframeElemGlobal = nomo_global.GLOBAL_CHAT_CONTENT_DIV,
            $iframeElem,
            iframeElems = nomo_global.GLOBAL_CHAT_IFRAME;

        if(iframeElemGlobal !== undefined && iframeElemGlobal.length !== 0){
            ADD_DEBUG("정상적으로 시스템 메시지 출력 - ", msg);
            $iframeElem = iframeElemGlobal;
            //var conversation_contents_elem = $iframeElem; //$iframeDocument.find("div.content");
            $iframeElem.append(msg_text);
            if( iframeElems !== undefined && iframeElems.length !== 0&& isChatScrollOn()){
                goScrollDown();
            }
        }
        // 채팅창 존재하지 않는 경우에 대한 에러처리
        else{
            ADD_DEBUG("채팅창이 없어서 채팅창이 생성될 때 까지 기다린다. - " + msg);
            // CASE1: 채팅창 iframe 은 있는 경우
            // if($("u-chat > iframe").length !== 0){
            //     ADD_DEBUG("SYS-MSG CASE1: 채팅창 iframe 은 있는 경우", $("u-chat > iframe"));
            //     var $iframeDocument =  $("u-chat > iframe").contents().first();
            //     $iframeDocument.one("DOMNodeInserted", "div.contentWrap", function() {
            //         $iframeElem = $(this).find("div.content");
            //         nomo_global.GLOBAL_CHAT_CONTENT_DIV = $iframeElem;
            //         $iframeElem.append(msg_text);
            //         if( iframeElems !== undefined && iframeElems.length !== 0&& isChatScrollOn()){
            //             goScrollDown();
            //         }
            //         ADD_DEBUG("시스템 메시지 출력 - ", msg);
            //     });
            // }
            // test

            if ($("u-chat > iframe").length !== 0) {
                ADD_DEBUG("SYS-MSG CASE1: 채팅창 iframe 은 있는 경우", $("u-chat > iframe"));
                var $iframeDocument = $("u-chat > iframe").contents().first();
            
                // Use arrive.js to handle the insertion of div.contentWrap
                $iframeDocument[0].arrive("div.contentWrap", {onlyOnce: true, existing: true}, function() {
                    $iframeElem = $(this).find("div.content");
                    nomo_global.GLOBAL_CHAT_CONTENT_DIV = $iframeElem;
                    $iframeElem.append(msg_text);
                    if (iframeElems !== undefined && iframeElems.length !== 0 && isChatScrollOn()) {
                        goScrollDown();
                    }
                    ADD_DEBUG("시스템 메시지 출력 - ", msg);
                });
            }
            // CASE2: 채팅창 iframe 도 없는 경우
            else{
                ADD_DEBUG("SYS-MSG CASE2: 채팅창 iframe 도 없는 경우");
                // $(document).one("DOMNodeInserted", "u-chat > iframe", function() {
                //     //ADD_DEBUG("DOMNodeInserted u-chat > iframe 진입");
                //     $(this).one("load", function(){
                //         //ADD_DEBUG("DOMNodeInserted u-chat > iframe 로드 완료");
                //         var $iframeDocument = $(this).contents().first();
                //         $iframeDocument.one("DOMNodeInserted", "div.line", function() {
                //             $iframeElem = $(this).parent();//find("div.content");
                //             nomo_global.GLOBAL_CHAT_CONTENT_DIV = $iframeElem;
                //             $iframeElem.append(msg_text);
                //             if(isChatScrollOn()){
                //                 goScrollDown();
                //             }
                //         });
                //     });
                // });
                $(document).arrive("u-chat > iframe", {onlyOnce: true, existing: true}, function() {
                    var $iframe = $(this);
                    $iframe.one("load", function() {
                        var $iframeDocument = $iframe.contents().first();
                
                        $iframeDocument[0].arrive("div.line", {onlyOnce: true}, function() {
                            var $lineElem = $(this).parent(); // Assuming you want the parent of div.line
                            nomo_global.GLOBAL_CHAT_CONTENT_DIV = $lineElem;
                            $lineElem.append(msg_text);
                            if (isChatScrollOn()) {
                                goScrollDown();
                            }
                        });
                    });
                });
            }
        }   // 함수 진입 시 채팅창 존재 여부에 대한 if문
    }   // delay 에 대한 if문
    else{
        setTimeout(function(){
            ADD_send_sys_msg(msg, 0);
        }, delay);
    }
}

// 메인 프레임에서 호출하는 용도
// eslint-disable-next-line no-unused-vars
export function ADD_send_sys_msg_from_main_frame(msg, delay, type){
    if(nomo_global.PAGE !== nomo_const.C_UCHAT){
        ADD_DEBUG("메인 or 스트림에서 메시지 함수 호출 => iframe 내 함수 재호출 함");
        if($(".chat-container > iframe").length !== 0 && typeof $(".chat-container > iframe")[0].contentWindow.ADD_send_sys_msg === "function"){
            $(".chat-container > iframe")[0].contentWindow.ADD_send_sys_msg(msg, delay, type);
        }
        return;
    }
}