import {ADD_DEBUG} from "libs/nomo-utils.js";
export function event_hijacking(){
    // 이벤트 탈취
    // console.log("이벤트 탈취 시작");
    // unsafeWindow.document._addEventListener = unsafeWindow.document.addEventListener;
    // unsafeWindow.document.addEventListener = function(a,b,c){
    //     // if(a === "visibilitychange"){
    //     //     console.log(a,b,c);
    //     //     return;
    //     // }
    //     console.log(a,b,c);

    //     if(c==undefined)
    //         c=false;
    //     this._addEventListener(a,b,c);
    //     if(!this.eventListenerList)
    //         this.eventListenerList = {};
    //     if(!this.eventListenerList[a])
    //         this.eventListenerList[a] = [];
    //     //this.removeEventListener(a,b,c); // TODO - handle duplicates..
    //     this.eventListenerList[a].push({listener:b,useCapture:c});
    // };

    Element.prototype._addEventListener = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function(a,b,c){
        // if(a === "visibilitychange"){
        //     console.log(a,b,c);
        //     return;
        // }

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

        /*
        if(!unsafeWindow.eventListenerList)
            unsafeWindow.eventListenerList = {};
        if(!unsafeWindow.eventListenerList[a])
            unsafeWindow.eventListenerList[a] = [];
        // this.removeEventListener(a,b,c); // TODO - handle duplicates..
        unsafeWindow.eventListenerList[a].push({listener:b,useCapture:c});
        */
    };
}