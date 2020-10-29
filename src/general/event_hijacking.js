import {ADD_DEBUG} from "libs/nomo-utils.js";
import nomo_const from "general/const.js";
export function event_hijacking(){

    if(nomo_global.PAGE == nomo_const.C_EMBEDED_TWITCH){

        if(ADD_config.twitch_control && ADD_config.twitch_frontPageMode){
            ADD_DEBUG("fetch override!");
            var realFetch = unsafeWindow.fetch;
            unsafeWindow.fetch = function(input, init) {
                if ( arguments.length >= 2 && typeof input === 'string' && input.includes('/access_token') ) {
                    var url = new URL(arguments[0]);
                    url.searchParams.set("player_type", "frontpage");
                    arguments[0] = url.href;
                    ADD_DEBUG("twitch fetch catched!", url);
                }
                return realFetch.apply(this, arguments);
            };
        }

        if(ADD_config.twitch_control && ADD_config.twitch_disable_visibilitychange){
            unsafeWindow._addEventListener = unsafeWindow.addEventListener;
            unsafeWindow.addEventListener = function(a,b,c){
                if(a === "visibilitychange" || a === "blur" || a === "webkitvisibilitychange"){
                    ADD_DEBUG("player.twitch.tv window 의 visibilitychange 이벤트 무력화", a, b, c);
                    return;
                }

                if(c==undefined)
                    c=false;
                this._addEventListener(a,b,c);
            };
            unsafeWindow.document._addEventListener = unsafeWindow.document.addEventListener;
            unsafeWindow.document.addEventListener = function(a,b,c){
                if(a === "visibilitychange" || a === "blur" || a === "webkitvisibilitychange"){
                    ADD_DEBUG("player.twitch.tv document 의 visibilitychange 이벤트 무력화", a, b, c);
                    return;
                }

                if(c==undefined)
                    c=false;
                this._addEventListener(a,b,c);
                // if(!this.eventListenerList)
                //     this.eventListenerList = {};
                // if(!this.eventListenerList[a])
                //     this.eventListenerList[a] = [];
                // //this.removeEventListener(a,b,c); // TODO - handle duplicates..
                // this.eventListenerList[a].push({listener:b,useCapture:c});
            };

            // for (var event_name of ["visibilitychange", "webkitvisibilitychange", "blur"]) {
            //     unsafeWindow.addEventListener(event_name, function(event) {
            //         event.stopImmediatePropagation();
            //     }, true);
            // }
        }
    }

    Element.prototype._addEventListener = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function(a,b,c){
        // if(a === "scroll"){
        //     console.log(a,b,c,this);
        //     if(this.id === "uha_chat_msgs"){
        //         ADD_DEBUG("우하하 스크롤 이벤트 삭제");
        //         return;
        //     }
        // }

        // 우하하 채팅에서 링크 클릭 시 이벤트 무시하기
        if(a === "click"){
            if(this.id === "uha_chat_msgs" && this.nodeName.toLowerCase() === "ul"){
                // console.log(a,b,c,this);
                var _b = b;
                b = function(e){
                    // console.log($(e.target), $(e.target).parent("span.text").length);
                    // 부모가 span.text 인 경우 함수 실행하지 않음
                    if($(e.target).parent("span.text").length !== 0){
                        return;
                    }
                    _b(e);
                };
                // return;
            }
        }

        if(c==undefined)
            c=false;
        this._addEventListener(a,b,c);
        
        // if(!unsafeWindow.eventListenerList)
        //     unsafeWindow.eventListenerList = {};
        // if(!unsafeWindow.eventListenerList[a])
        //     unsafeWindow.eventListenerList[a] = [];
        // // this.removeEventListener(a,b,c); // TODO - handle duplicates..
        // unsafeWindow.eventListenerList[a].push({listener:b,useCapture:c});
    };
}