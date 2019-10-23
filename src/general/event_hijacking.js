import {ADD_DEBUG} from "libs/nomo-utils.js";
import nomo_const from "general/const.js";
export function event_hijacking(){
    // 이벤트 탈취
    // console.log("이벤트 탈취 시작");

    // 아래 코드를 쓰면 isWebAssembly 에 대한 판단을 false 로 만들어서
    // wasmworker.min.js 대신 worker.min.js 를 로드하도록 만든다
    // unsafeWindow.WebAssembly = undefined;

    // // 기본 fetch 훔치기
    // function redefineFetch() {
    //     console.log('inside worker', self);
    //     if (self.fetch == null) {
    //         console.log('null!');
    //     } else {
    //         console.log(self.fetch.toString());
    //     }
    //     console.log("WorkerGlobalScope",WorkerGlobalScope["fetch"]);
    //     const originalFetch = self.fetch;// = self.fetch;
    //     self.fetch = function(input, init){
    //         console.log('overridden', input);
    //         return originalFetch.apply(this, arguments);//originalFetch(input, init);
    //     };
    // }
    // const blob = new Blob(['(' +
    // redefineFetch.toString() + ')()'], {type: 'text/javascript'});
    
    // const blobUrl = window.URL.createObjectURL(blob);
    // const w = new Worker(blobUrl);

    // 성공한 것
    // if(nomo_global.PAGE == nomo_const.C_EMBEDED_TWITCH){
    //     const reader = new FileReader();
    //     reader.addEventListener('loadend', (e) => {
    //         const text = e.srcElement.result;
    //         console.log(text);
    //     });

    //     var realWorker = unsafeWindow.Worker;
    //     unsafeWindow.Worker = function(input){
    //         var newInput = String(input);
    //         console.log(newInput);

    //         var myBlob = "";//"importScripts('https://cvp.twitch.tv/2.14.0/wasmworker.min.js')";

    //         // // async false 가 안 먹히므로 ajax 를 써야한다.
    //         // var xhr = new XMLHttpRequest();
    //         // xhr.open('GET', input, false);
    //         // // xhr.responseType = 'blob';
    //         // xhr.onload = function(e) {
    //         //     if (this.status == 200) {
    //         //         var myBlob = this.response;
    //         //         console.log("xhr", typeof myBlob, myBlob);
    //         //         // myBlob is now the blob that the object URL pointed to.
    //         //         // 이것의 결과로 
    //         //         // importScripts('https://cvp.twitch.tv/2.14.0/wasmworker.min.js') 또는
    //         //         // importScripts('https://cvp.twitch.tv/2.14.0/worker.min.js') 가 나왔다.
    //         //     }
    //         // };
    //         // xhr.send();

    //         $.ajax({
    //             url: newInput,
    //             type: "GET",
    //             async: false,
    //             timeout: 2000,
    //         })
    //             .done(function (response) {
    //                 myBlob = response;
    //                 ADD_DEBUG("ajax response", response);
    //             })
    //             .fail(function (error) {
    //                 myBlob = "importScripts('https://cvp.twitch.tv/2.14.0/wasmworker.min.js')";
    //                 ADD_DEBUG("Request failed", error);
    //             })
    //             .always(function (com) {
    //                 ADD_DEBUG("Complete", com);
    //             });

    //         var workerBlob = new Blob(
    //             [`
    //                 console.log('inside worker', self);
    //                 if (self.fetch == null) {
    //                     console.log('null!');
    //                 } else {
    //                     console.log(self.fetch.toString());
    //                 }
    //                 console.log("WorkerGlobalScope",WorkerGlobalScope["fetch"]);
    //                 const originalFetch = self.fetch;// = self.fetch;
    //                 self.fetch = function(input, init){
    //                     console.log('overridden', input);
    //                     return originalFetch.apply(this, arguments);
    //                 };
    //                 ${myBlob};
    //                 //importScripts('https://cvp.twitch.tv/2.14.0/worker.min.js');
    //             `],
    //             { type:'text/javascript' }
    //         );
    //         var workerBlobUrl = URL.createObjectURL(workerBlob);

    //         // var my_worker = new realWorker(input);
    //         var my_worker = new realWorker(workerBlobUrl);

    //         console.log("my_worker", my_worker);
    //         return my_worker;
    //     };
    // }

    // https://github.com/videojs/m3u8-parser

    if(nomo_global.PAGE == nomo_const.C_EMBEDED_TWITCH){
        // if(ADD_config.twitch_control && ADD_config.twitch_server_view){
        //     var server_list = [
        //         ["def", "Default server", "none"],
        //         ["GL", "Edgecast", "g1.edgecast.hls.ttvnw.net"],
        //         ["US", "San Francisco", "video-edge-2ca3e4.sfo01.hls.ttvnw.net"],
        //         ["US", "Seattle", "video-edge-7e8e10.sea01.hls.ttvnw.net"],
        //         ["US", "San Jose", "video-edge-7e96ac.sjc01.hls.ttvnw.net"],
        //         ["US", "San Jose", "?.sjc02.hls.ttvnw.net"],
        //         ["US", "Chicago", "video-edge-835140.ord02.hls.ttvnw.net"],
        //         ["US", "Washington", "video20.iad02.hls.ttvnw.net"],
        //         ["US", "New York", "video-edge-8fd0d8.jfk03.hls.ttvnw.net"],
        //         ["US", "Los Angeles", "video20.lax01.hls.ttvnw.net"],
        //         ["US", "Dallas", "video20.dfw01.hls.ttvnw.net"],
        //         ["US", "Miami", "video-edge-7ea8a4.mia02.hls.ttvnw.net"],
        //         ["SE", "Stockholm", "video-edge-69c1b0.arn01.hls.ttvnw.net"],
        //         ["UK", "London", "video20.lhr02.hls.ttvnw.net"],
        //         ["NL", "Amsterdam", "video20.ams01.hls.ttvnw.net"],
        //         ["FR", "Paris", "video-edge-49b0d4.cdg01.hls.ttvnw.net"],
        //         ["DE", "Frankfurt", "video-edge-748bd0.fra01.hls.ttvnw.net"],
        //         ["PL", "Warsaw", "video-edge-8f9918.waw01.hls.ttvnw.net"],
        //         ["CZ", "Prague", "video-edge-4ae010.prg01.hls.ttvnw.net"],
        //         ["AU", "Sydney", "video-edge-8c6ee0.syd01.hls.ttvnw.net"],
        //         ["AS", "Hongkong", "video-edge-7cf698.hkg01.hls.ttvnw.net"],
        //         ["AS", "Tokyo", "video-edge-7cfe50.tyo01.hls.ttvnw.net"],
        //         ["AS", "Seoul", "video-edge-780e48.sel01.hls.ttvnw.net"],
        //         ["AS", "Seoul", "??.sel02.abs.hls.ttvnw.net"],
        //         ["AS", "Seoul", "video-edge-0a9354.sel03.hls.ttvnw.net"]
        //     ];
        //     GM_addStyle(`
        //         #current_server{
        //             position:absolute;
        //             bottom:42px;
        //             right:18px;
        //             text-align:right;
        //             font-size:11px;
        //         }
        //     `);
        //     var realFetch = unsafeWindow.fetch;
        //     unsafeWindow.fetch = async function(input) {
        //         ADD_DEBUG("fetch", input);
        //         // ADD_DEBUG("서버찾기", arguments[0].indexOf('.hls.ttvnw.net'));
        //         if ( arguments[0].indexOf('.hls.ttvnw.net') !== -1 ) {
        //             var current_server = arguments[0].match(/(\w+\.hls\.ttvnw\.net)/).shift();   // /vid.*\.(\w+\.hls\.ttvnw\.net)/
        //             ADD_DEBUG("현재 서버:", current_server);
        //             var server_str = current_server.split(".")[0];
        //             var server_name = "";
        //             for(var i=0; i<server_list.length; i++){
        //                 if(server_str === server_list[i][2].split(".")[1]){
        //                     server_name = " ("+server_list[i][0]+"/"+server_list[i][1]+")";
        //                     break;
        //                 }
        //             }

        //             var $player_menu = $(document).find(".player-buttons-right");
        //             if($player_menu.length !== 0){
        //                 $("#current_server").remove();
        //                 $player_menu.prepend(`
        //                     <span id="current_server">${current_server}${server_name}</span>
        //                 `);
        //             }
        //             // var url = new URL(arguments[0]);
        //             // url.searchParams.set('platform', '_');
        //             // arguments[0] = url.href;
        //         }
        //         // var returnvar = realFetch.apply(this, arguments);
        //         // return returnvar;
        //         return realFetch.apply(this, arguments);
        //     };
        // }


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