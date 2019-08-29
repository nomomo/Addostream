export default (function(){
    // 이벤트 탈취
    console.log("이벤트 탈취 시작");
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
        //     console.log(b);
        // }

        if(c==undefined)
            c=false;
        this._addEventListener(a,b,c);
        if(!unsafeWindow.eventListenerList)
            unsafeWindow.eventListenerList = {};
        if(!unsafeWindow.eventListenerList[a])
            unsafeWindow.eventListenerList[a] = [];
        //this.removeEventListener(a,b,c); // TODO - handle duplicates..
        unsafeWindow.eventListenerList[a].push({listener:b,useCapture:c});
    };
})();