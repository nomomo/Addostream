import nomo_const from "general/const.js";
import * as nomo_common from "general/common.js";
import { ADD_streamer_nick, streamerArray } from "general/streamer-lib.js";
import {ADD_chatBlock, chat_basic_css, getImgurData, chatImagelayoutfromLinks, goScrollDown, isVideo} from "chat/control.js";
import * as utils from "libs/nomo-utils.js";
import { broadcaster_theme_css } from "general/theme.js";
import { ADD_send_location_layout } from "chat/send_coord.js";
var ADD_DEBUG = utils.ADD_DEBUG;

function UHAHA_sys_msg(msg, raw){
    var $uha_chat_msgs = $("#uha_chat_msgs");
    var isScrollDown = false;
    if($uha_chat_msgs.length > 0){
        if(($uha_chat_msgs.prop("scrollTop") >= $uha_chat_msgs.prop("scrollHeight") - $uha_chat_msgs.height() - 40)){
            isScrollDown = true;
        }

        if(raw !== undefined && raw){
            $(msg).appendTo($uha_chat_msgs);
        }
        else {
            $(`<li class="is_notme"><span class="name" data-date="${String(Number(new Date())).substr(0,10)}" data-name="Dostream+">Dostream+</span>
                            <span class="text">${msg}</span></li>`)
                .appendTo($uha_chat_msgs);
        }

        if(isScrollDown){
            $uha_chat_msgs.animate({ scrollTop: 1000000000000  }, 1);
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////
// 우하하용 채팅 도구
export async function ADD_chatting_arrive_for_UHAHA(){
    ADD_DEBUG("ADD_chatting_arrive_for_UHAHA 함수 실행");
    nomo_global.$GLOBAL_IFRAME_DOCUMENT = $(document);

    // 일단 먼저 끈다.
    $(document).unbindArrive("li.is_notme");

    // arrive bind 및 unbind
    if(ADD_config.chat_ctr){
        $(document).arrive("li.is_notme", async elems => {
            // 일정 개수 넘을 시 자동 채팅창 초기화
            if(ADD_config.uhaha_auto_remove){
                var auto_remove_count = Number(ADD_config.uhaha_auto_remove_count);
                if(auto_remove_count < 200){
                    auto_remove_count = 200;
                }

                // ADD_DEBUG(nomo_global.uhaha_chat_auto_remove_counter);
                var line_auto_remove_length = nomo_global.uhaha_chat_auto_remove_counter - auto_remove_count;
                if(line_auto_remove_length > 0){
                    chatlog_local = {};
                    nomo_global.uhaha_chat_auto_remove_counter = 0;
                    $("#uha_chat_btnclear").trigger("click");
                    UHAHA_sys_msg(`자동 싹쓸이 개수(${auto_remove_count})에 도달하여 채팅창을 초기화 했습니다.`);
                }
            }

            nomo_global.uhaha_chat_auto_remove_counter = nomo_global.uhaha_chat_auto_remove_counter + 1;
            uhaha_arrive(elems);

        });

        $(document).arrive("li.is_me", async elems => {
            uhaha_arrive(elems);
        });

        // 채팅 매니저 초기화
        chat_manager.init($("div#uha_chat"));

        // 채팅창 생성될 때 노티하기
        nomo_global.GLOBAL_CHAT_CONTENT_DIV = $(this);
        if(ADD_config.sys_meg !== undefined && ADD_config.sys_meg){
            setTimeout(function(){
                ADD_DEBUG("채팅창에서 애드온 동작");
                UHAHA_sys_msg("<li class=\"uha_info\"><span class=\"system\">안내: </span>두스트림 애드온이 임시 동작중입니다(우하하).<br />일부 기능만 제공합니다.</li>", true);
            },3000);
        }

        // 채팅창 닉네임 클릭 시 강제단차 layout 생성하기
        $(document).on("click", "span.name", async function (){
            ADD_DEBUG("우하하 span.name 클릭됨", $(this).attr("data-sid"));
            var $nick = $(this);
            var unique_id = $nick.attr("data-sid");
            var nick = $nick.text();
            var content = $nick.closest("li").find("span.text").text();

            // 고유코드 UI 생성
            if($("uhaha_unique_id").length === 0){
                $("#uha_chat_targetname").after(`<br /><span id="uhaha_unique_id">고유ID:${unique_id}</span>`);
            }
            else if(unique_id === undefined){
                $("uhaha_unique_id").html(``);
            }
            else{
                $("uhaha_unique_id").html(`고유ID:${unique_id}`);
            }

            // 강체단차 UI 생성
            // if($("#uhaha_forced_dancha").length === 0){
            //     $("<span id=\"uhaha_forced_dancha\" style=\"cursor:pointer;color:red;\">강제단차</span><br />")
            //         .on("click", function(){
            //             ADD_DEBUG("강제단차 등록 이벤트 실행");
            //             var forced_dancha_nick = $nick.attr("data-sid");//$("#uha_chat_targetname").html();
        
            //             var ADD_ignores = $.cookie("ignores");
            //             if(ADD_ignores === null || ADD_ignores === undefined){
            //                 ADD_ignores = [];
            //             } else {
            //                 ADD_ignores = JSON.parse(ADD_ignores);
            //             }
            //             if(forced_dancha_nick !== null || forced_dancha_nick !== undefined){
            //                 (ADD_ignores).push(forced_dancha_nick);
            //                 $.cookie("ignores", JSON.stringify(ADD_ignores), { expires : 365, path : "/" });
            //                 if(ignores !== null && ignores !== undefined){
            //                     ignores = ADD_ignores;
            //                 }
            //             }
            //             ADD_DEBUG("ADD_ignores", ADD_ignores);
            //             $(document).find("#uha_chat_contextmenu").hide();
            //         })
            //         .insertBefore("#uha_chat_contextmenu_close");
            // }

            // 메모하기 UI 생성
            if($("#uhaha_memo").length === 0){
                $("<span id=\"uhaha_memo\" style=\"cursor:pointer;color:red;\">메모하기</span><br />")
                    .on("click", async function(){
                        var detail_content = "[UHAHA]"+nick+":"+content.substr(0, 40);
                        var temp_obj = {"nick":unique_id,"display_name":nick,"detail_content":detail_content};
                        await chat_manager.openSimplelayout(temp_obj);
                    })
                    .insertBefore("#uha_chat_contextmenu_close");
            }

            // 창 위치 재설정하기
            var $chat_container = $("div.chat-container").first();
            var offsetHeight = $chat_container[0].offsetHeight;
            var $uha_chat_contextmenu = $("#uha_chat_contextmenu");
            var popupTop = Number($uha_chat_contextmenu.css("top").replace("px",""));
            var popupHeight = Number($uha_chat_contextmenu.css("height").replace("px",""));
            var dif = popupTop + popupHeight - offsetHeight + 30;
            if(dif>0){
                $uha_chat_contextmenu.css("top",(popupTop-dif)+"px");
            }
        });

        var temp_addStyle = `
        #uha_chat_msgs > li > .name:after{
            color:#555;
        }
        #uha_chat_targetname {
            padding: 5px;
            font-size: 14px;
        }
        #uha_chat_whisper, #uha_chat_invite, #uha_chat_mute, #uha_chat_contextmenu_close, #uhaha_unique_id, #uhaha_forced_dancha, #uhaha_memo {
            font-size: 12px;
            padding: 2px 5px;
            border-top:1px solid #ccc;
            display: inline-block;
            width: 100%;
        }
        #uha_chat_msgs.uhaha_delete_button_hide li span.delete {
            display:none !important;
        }
        ${chat_basic_css}
        `;
        GM_addStyle(temp_addStyle);

        // 이벤트 수정
        $("#uha_chat_msgs").off("click","a");


        //////////////////////////////////////////////////////////////////////////////////
        // imgur click event
        $(document)
            .on("click", ".imgur_safe_button", function(){
                $(this).closest(".imgur_container").removeClass("blurred");
                $(this).parent(".imgur_safe_screen").addClass("clicked").fadeOut(300);
            })
            .on("click", ".imgur_control_hide", function(){
                ADD_DEBUG("Chatting 내 호출된 imgur 이미지 에서 - 버튼 클릭됨");
                $(this).closest(".imgur_container").addClass("blurred");
                var $safe_screen = $(this).closest(".imgur_container").find(".imgur_safe_screen");
                if($safe_screen.hasClass("clicked")){
                    var safe_screen_opacity = Number(ADD_config.imgur_preview_opacity);
                    if(!($.isNumeric(ADD_config.imgur_preview_opacity))){
                        safe_screen_opacity = 0.93;
                    }
                    else if(safe_screen_opacity < 0 || safe_screen_opacity > 1){
                        safe_screen_opacity = 0.93;
                    }
                    $safe_screen.removeClass("clicked").fadeTo(300, safe_screen_opacity);
                }
                else{
                    $safe_screen.addClass("clicked").fadeOut(300);
                }
            })
            .on("click", ".imgur_control_remove", function(){
                ADD_DEBUG("Chatting 내 호출된 imgur 이미지 에서 x 버튼 클릭됨");
                $(this).closest(".imgur_container").remove();
            });
        
        // 채팅창 내 Lightbox 클릭 시 Lightbox 띄움
        $(document).on("click", ".imgur_image_in_chat.open-lightbox", function(e){
            e.preventDefault();
            var $this = $(this);
            var image = $this.attr("src");
            $("html").addClass("no-scroll");
            var simple_image = "";
            if(isVideo(image)){
                simple_image = "<video class='chat_image' loop controls muted autoplay src=\""+image+"\"></video>";
            }
            else{
                simple_image = "<img class='chat_image' src=\""+image+"\" />";
            }
            $("body").append("<div class=\"lightbox-opened\">"+simple_image+"</div>");
        });

        // 싹쓸이 버튼 클릭 시
        $("#uha_chat_btnclear").on("click", function(){
            chatlog_local = {};
            nomo_global.uhaha_chat_auto_remove_counter = 0;
        });

        // delete 버튼 숨김 적용
        uhaha_chat_delete_hide();

        // 스크롤바 관련 이벤트 - 향상된 자동 스크롤
        if(ADD_config.uhaha_chat_scroll){
            ADD_DEBUG("CHAT - Scroll 이벤트 ON");
            $("#uha_chat_msgs").on("wheel.chatScrollFunc mousewheel.chatScrollFunc", function(event) {//div.wrap div.contentWrap
                //마우스휠 위로 돌릴때 이벤트
                //ADD_DEBUG(event);
                var scroll_val = -1;
                if (event.type == "mousewheel"){
                    scroll_val = event.originalEvent.wheelDelta;
                }
                else if (event.type == "wheel"){
                    scroll_val = event.originalEvent.deltaY * (-1);
                }
                if (scroll_val >= 0) {
                    // 세로 스크롤바가 있을 경우 처리
                    if( $(this).get(0).scrollHeight > $(this).innerHeight() ){  //find("div.content").first(). find("div.content").
                        // 대체 latest_chat 생성
                        if($("#uha_chat").find(".latest_chat_new_container").length === 0){
                            var $latest_chat_new = $(`
                            <div style="position:relative;">
                                <div class="latest_chat_new_container" style="display:none;">
                                    <div class="latest_chat_new" style="background:rgba(0,0,0,.75);bottom:0px;color:#faf9fa;padding:5px;height:28px;font-size:12px;position:absolute;justify-content:center;align-items:center;text-align:center;width:100%;box-sizing:border-box;z-index:1000;cursor:pointer;border-radius:4px;">
                                        <span>아래에서 더 많은 메시지를 확인하세요.</span>
                                    </div>
                                </div>
                            </div>
                            `);
                            $("#uha_chat").append($latest_chat_new);
                            $latest_chat_new.on("click", function(){
                                nomo_global.isGoScrollDown = true;
                                goScrollDown();
                                $("#uha_chat").find(".latest_chat_new_container").hide();
                            });
                        }

                        $("#uha_chat").find(".latest_chat_new_container").stop("true","true").show();
                        nomo_global.isGoScrollDown = false;
                        // 대체 latest_chat 생성 끝
                    }
                    else {
                        // 스크롤바가 없는 경우
                    }

                }

                else {
                    //마우스휠 아래로 돌릴때 이벤트
                    if(nomo_global.isGoScrollDown){//if(isChatScrollOn()){
                        nomo_global.isGoScrollDown = true;
                        $("#uha_chat").find(".latest_chat_new_container").stop("true","true").hide();
                    }

                    var scrollHeight = $(this)[0].scrollHeight;
                    var scrollTop = $(this)[0].scrollTop;
                    var height = $(this).height();

                    if(scrollHeight - scrollTop - height <= ADD_config.chat_scroll_down_min){
                        nomo_global.isGoScrollDown = true;
                        goScrollDown();
                        $("#uha_chat").find(".latest_chat_new_container").stop("true","true").hide();
                    }
                }
            });
        }

        ADD_send_location_layout(2);
    } // else 끝

    // 방송 모드
    if(nomo_global.DEBUG && ADD_config.broadcaster_mode){
        nomo_global.$GLOBAL_IFRAME_DOCUMENT = $(document);
        broadcaster_theme_css();
    }
}

var first_date = undefined;
async function uhaha_arrive(elems){
    if(ADD_config.chat_image_max_width > 320){
        ADD_config.chat_image_max_width = 320;
    }

    var $uha_chat_msgs = $("#uha_chat_msgs");
    var temp_isChatScrollOn = $uha_chat_msgs.prop("scrollTop") >= $uha_chat_msgs.prop("scrollHeight") - $uha_chat_msgs.height() - 40;

    var elem = $(elems);
    var $line = elem;

    // 필수 요소 검증
    var myLine = false;
    var $nick = elem.find("span.name").first();
    var $content = elem.find("span.text");
    var unique_id = $nick.attr("data-sid");
    var nick = $nick.text();
    var content = $content.text();
    var createdDate = new Date(Number($nick.attr("data-date"))*1000);

    if(first_date === undefined){
        first_date = new Date(Number($("#uha_chat_msgs li:first").find("span.name").attr("data-date"))*1000);
    }

    
    // 나 자신인지 확인
    if($line.hasClass("is_me")){
        myLine = true;
    }

    // 강제단차 이벤트
    var ADD_ignores = $.cookie("ignores");
    if(ADD_ignores === null || ADD_ignores === undefined){
        ADD_ignores = [];
    } else {
        ADD_ignores = JSON.parse(ADD_ignores);
    }
    //if($.inArray(nick, ADD_ignores) !== -1){
    if($.inArray(nick, ADD_ignores) !== -1 || $.inArray(unique_id, ADD_ignores) !== -1){
        ADD_DEBUG("강제단차 닉 차단", unique_id, nick, content);
        elem.remove();
        return;
    }
    
    // Case 1: 금지단어로 차단하는 경우
    if(ADD_config.chat_block){
        // Case 1-1 채팅 내용 기반
        if(await ADD_chatBlock(elem, false, nick, content, createdDate, false, ADD_config.chat_block_contents, ADD_config.chat_block_noti)) return false;
        // Case 1-2 닉네임 기반
        if(await ADD_chatBlock(elem, false, nick, content, createdDate, ADD_config.chat_block_nickname, false, ADD_config.chat_block_noti)) return false;
    }
    // Case 2: 채팅 매니저로 차단하는 경우
    if(chat_manager !== undefined && elem !== undefined){
        var isBlock = chat_manager.getIsBlock(unique_id);
        if(isBlock){
            var isShowDelMsg = chat_manager.getIsShowDelMsg(unique_id);
            if(await ADD_chatBlock(elem, true, unique_id, nick+":"+content, createdDate, false, false, isShowDelMsg)) return false;
        }
    }

    // 과거 채팅 비교 및 기록하기
    if( ADD_config.chat_dobae_block && (!ADD_config.chat_dobae_onlylink || ADD_config.chat_dobae_onlylink && $content.find("a").length > 0) && Number(createdDate) > Number(first_date)){
        var new_createdDate = Number(createdDate);
        var last_similar_content = "";
        var last_similar;
        var similar;
        var dobae_repeat = 0;

        if(chatlog_local[unique_id] === undefined){
            // 초기화
            chatlog_local[unique_id] = {};
            chatlog_local[unique_id].value = [];
        }
        else{
            // 검색
            var old_arr = chatlog_local[unique_id].value;
            for(var ind=old_arr.length-1; ind>=0; ind--){
                var old_createdDate = old_arr[ind].createdDate;
                
                // 시간제한 확인
                if( new_createdDate - old_createdDate > ADD_config.chat_dobae_timelimit * 1000 ){
                    // console.log("지우기 전" + JSON.stringify(chatlog_local[unique_id].value));
                    // console.log("지울 개수", ind+1);
                    old_arr.splice(0,ind+1);
                    chatlog_local[unique_id].value = old_arr;
                    // console.log("지운 후" + JSON.stringify(chatlog_local[unique_id].value));
                    break;
                }
                var old_content = old_arr[ind].content;
                
                // 도배 여부 판단
                similar = utils.diceCoefficient(old_content, content);
                if(similar >= ADD_config.chat_dobae_judge){
                    dobae_repeat = dobae_repeat + 1;
                    last_similar_content = old_content;
                    last_similar = similar;
                }
            }
        }

        // 새 값 추가
        if(chatlog_local[unique_id].value.length >= ADD_config.chat_dobae_repeat + 10){
            chatlog_local[unique_id].value.shift();
        }
        chatlog_local[unique_id].value.push({content:content, createdDate:new_createdDate});

        // 도배인 경우
        if(dobae_repeat + 1 >= ADD_config.chat_dobae_repeat){
            // 로그에 기록
            if(ADD_config.chat_dobae_block_record){
                var ADD_Blocked_Chat = await nomo_common.nomo.getVal("ADD_Blocked_Chat", []);
                if(ADD_Blocked_Chat.length >= ADD_config.chat_block_log_limit){
                    ADD_Blocked_Chat.shift();
                }
                var chat_block_log_letter_limit = ADD_config.chat_block_log_letter_limit;
                if($.isNumeric(chat_block_log_letter_limit) || chat_block_log_letter_limit < 0){
                    chat_block_log_letter_limit = 40;
                }
                ADD_Blocked_Chat.push({"created":Number(createdDate), "nick":unique_id, "content":"[도배] "+content.substr(0,chat_block_log_letter_limit)});
                await nomo_common.nomo.setVal("ADD_Blocked_Chat", ADD_Blocked_Chat);
            }
            ADD_DEBUG("도배 차단됨, ["+last_similar_content+"], ["+content+"] :"+last_similar);

            $line.remove();

            // 도배 자동 차단 사용 시
            if(ADD_config.chat_dobae_block_autoban && (dobae_repeat + 1 >= ADD_config.chat_dobae_block_autoban_repeat)){
                if(ADD_config.chat_dobae_block_onlylink){   // 링크 포함시에만 차단하는 경우
                    if($content.find("a").length > 0){  // 가장 마지막 채팅에 링크 포함되어있는지 여부 확인
                        //ADD_send_sys_msg("[도배 유저 자동 차단] 닉네임: "+nick +"<br />마지막 채팅: "+content);
                        $(`<li class="is_notme"><span class="name" data-date="${String(Number(new Date())).substr(0,10)}" data-name="Dostream+">Dostream+</span>
                        <span class="text">[도배 유저 자동 차단]<br />닉네임: ${nick}<br />마지막 채팅: ${content}</span></li>`).appendTo("#uha_chat_msgs");
                        chat_manager.simpleBlock(unique_id,nick+" : "+content);
                    }
                }
                else {   // 링크 포함여부 상관 없이 차단하는 경우
                    // ADD_send_sys_msg("[도배 유저 자동 차단] 닉네임: "+nick +"<br />마지막 채팅: "+content);
                    $(`<li class="is_notme"><span class="name" data-date="${String(Number(new Date())).substr(0,10)}" data-name="Dostream+">Dostream+</span>
                        <span class="text">[도배 유저 자동 차단]<br />닉네임: ${nick}<br />마지막 채팅: ${content}</span></li>`).appendTo("#uha_chat_msgs");
                    chat_manager.simpleBlock(unique_id,nick+" : "+content);
                }
            }

            return;
        }
    }

    // Imgur image preview 시
    var ADD_chat_images = [];

    // 링크 엘리먼트 찾기
    var $aElems = $line.find("a");
    var hrefs = [];
    if($aElems.length !== 0){
        $aElems.each(function(index){
            var $aElem = $($aElems[index]);
            var href = $aElem.attr("href");
            hrefs[index] = href;

            // 두스트림 링크인 경우 현재창에서 열기
            if(ADD_config.url_self && href.toLowerCase().indexOf("dostream.com/#/stream/") !== -1){
                $aElem.addClass("topClick").attr("target","_top");
                // 본 블락에서는 클래스만 추가하고, 실제 동작은 ADD_chatting_arrive() 에 선언된 이벤트로 동작함
            }

            // URL Decode (percent encoding → text)
            if(ADD_config.chat_url_decode){
                $aElem.html(decodeURIComponent($aElem.html()));
            }

            // 트위치 링크인 경우 닉네임을 링크 끝에 추가하기
            if(href.toLowerCase().indexOf("dostream.com/#/stream/twitch/") !== -1 || href.toLowerCase().indexOf("dostream.com/#/stream/multitwitch/") !== -1){
                var ch_text = "";
                var ch_streamer_id = href.split("/").pop();

                var temp_array = ch_streamer_id.split("&");
                for (var j=0; j<temp_array.length; j++){
                    if(j !== 0){
                        ch_text = ch_text+"&";
                    }
                    var temp_id = ADD_streamer_nick(temp_array[j]);//.toUpperCase();
                    ch_text = ch_text+temp_id;
                }

                //if(ch_text.toLowerCase() !== ch_streamer_id.toLowerCase()){
                //if(ch_text !== ch_streamer_id){
                if(ch_text !== undefined || ch_text !== ""){
                    $aElem.after(" <span class=\"keyword_pass\" style=\"color:#000;font-weight:700;vertical-align:top;\">["+ch_text+"]</span>");
                }

                // 스크롤 내리기
                if( temp_isChatScrollOn ){
                    goScrollDown();
                }
            }

        });
    }

    // 이미지 주소로부터 링크 찾기
    var image_found = false;
    if(ADD_config.chat_image_preview && hrefs.length !== 0 && !ADD_config.broadcaster_mode){
        //ADD_DEBUG("$aElems", $aElems, $aElems.length);
        for(var index=0;index<hrefs.length;index++){
            var image_url = "";
            var image_title = "";
            //var image_width = undefined;
            //var image_height = undefined;
            var href = hrefs[index];

            ADD_DEBUG("a arc : ", href, href.length);
            if(href === undefined || href === null || href == ""){
                return true;
            }

            // 원래부터 UCHAT에 있던 정규표현식을 그대로 긇어와서 씀 - 문제있어서 수정함
            if(href.match(/\.(jpg|jpeg|png|gif)$/gi)){// && href.indexOf("imgur.com") === -1){
                image_url = href;
            }
            // else if (href && href.match(/^(https?)?:?\/\/(\w+\.)?imgur.com\/(\w*\d\w*)+(\.[a-zA-Z]{3})?$/)){
            //     image_url = href+".jpg";
            // }

            if(image_url !== ""){
                ADD_DEBUG("이미지 발견", image_url);
                var temp_img_obj = {link: image_url, title: image_title};
                ADD_chat_images.push(temp_img_obj);
            }
        }

        if(ADD_chat_images.length !== 0){
            image_found = true;
            chatImagelayoutfromLinks($line, ADD_chat_images);
        }
    }   // 이미지 더 찾기 끝

    //else if(href.match(/youtu(be\.com|\.be)(\/\watch\?v=|\/embed\/|\/)(.{11})/)){
    /* eslint-disable */
    if(!image_found && ADD_config.chat_image_preview && !ADD_config.broadcaster_mode && ADD_config.chat_image_youtube_thumb && hrefs.length !== 0 && ADD_chat_images.length === 0 && hrefs[0].indexOf("dostream.com/#/stream/") === -1){
        var youtube_match = hrefs[0].match(/^.*(?:youtu\.?be(?:\.com)?\/)(?:embed\/)?(?:(?:(?:(?:watch\?)?(?:time_continue=(?:[0-9]+))?.+v=)?([a-zA-Z0-9_-]+))(?:\?t\=(?:[0-9a-zA-Z]+))?)/);
        if(youtube_match){
            image_found = true;
            var youtube_id = youtube_match.pop();
            var youtube_url = 'https://www.youtube.com/watch?v=' + youtube_id;

            $.getJSON('https://noembed.com/embed',
                {format: 'json', url: youtube_url}, function (data) {
                    ADD_DEBUG("youtube getJSON", youtube_id, data);

                    var temp_arr = [];
                    var temp_img_obj = {type:"youtube", id:youtube_id, link: data.thumbnail_url, title: "" + (data.title !== undefined ? data.title : "") + (data.author_name !== undefined ? " - " + data.author_name : ""), "width":data.thumbnail_width, "height":data.thumbnail_height};
                    temp_arr.push(temp_img_obj);
                    ADD_DEBUG("temp_img_obj", temp_img_obj);
                    chatImagelayoutfromLinks($line, temp_arr);
            });
        }
    }
    /* eslint-enable */


    // gfy 이미지 로부터 찾기
    if(!image_found && ADD_config.chat_image_preview && !ADD_config.broadcaster_mode && ADD_config.gfycat_preview && hrefs.length !== 0 && ADD_chat_images.length === 0){
        if(hrefs[0].match(/(?:http:|https:|)(?:\/\/|)(?:gfycat\.com\/(?:\w*\/)*)(\w+$)/)){
            image_found = true;
            var gfycat_id = href.match(/(?:http:|https:|)(?:\/\/|)(?:gfycat\.com\/(?:\w*\/)*)(\w+$)/).pop();

            // 에러처리
            if(gfycat_id.indexOf("/") !== -1 || gfycat_id.indexOf("?") !== -1 || gfycat_id.indexOf(".") !== -1){
                ADD_DEBUG("gfycat_id error", hrefs[0].match(/(?:http:|https:|)(?:\/\/|)(?:gfycat\.com\/(?:\w*\/)*)(\w+$)/));
                image_found = false;
            }
            else{
                ADD_DEBUG("Gfycat API 호출 - id:", gfycat_id);
                $.ajax({
                    url:"https://api.gfycat.com/v1test/gfycats/"+gfycat_id,
                    type: "GET",

                    // API CALL SUCCESS
                    success:function(response){
                        ADD_DEBUG("Gfycat API API 호출 완료", response);
                        var gfy_name = response.gfyItem.gfyName;
                        //var gfy_ratio = 100.0 * response.gfyItem.height / response.gfyItem.width;   // percent 값
                        var width = response.gfyItem.width,
                            height = response.gfyItem.height,
                            max_ratio = Math.min(1.0, ADD_config.chat_image_max_width/width, ADD_config.chat_image_max_height/height),
                            width_mod = width*max_ratio,
                            height_mod = height*max_ratio + 44;
                        var gfy_autoplay = "?autoplay=" + (ADD_config.chat_video_autoplay?"1":"0");
                        // 세로 길이가 1000px 보다 큰 경우
                        // if(3.32 * gfy_ratio + 44 > ADD_config.chat_image_max_height){
                        //     gfy_ratio = 301;
                        // }
                        // padding-bottom:calc(`+gfy_ratio+`% + 44px)

                        var gfy_html = `
                            <div style='position:relative; margin:0 auto; width:`+width_mod+`px;
                                height:`+height_mod+`px;'>
                                <iframe src='https://gfycat.com/ifr/` + gfy_name + gfy_autoplay + `' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe>
                            </div>
                        `;
                        var title = response.gfyItem.title + " - " + (response.gfyItem.userDisplayName !== undefined ? response.gfyItem.userDisplayName : response.gfyItem.userName);

                        var temp_arr = [];
                        var temp_img_obj = {type:"gfycat", link: "", title: title, html:gfy_html, width:width_mod, height:height_mod, views:response.gfyItem.views};
                        temp_arr.push(temp_img_obj);
                        ADD_DEBUG(temp_img_obj);
                        chatImagelayoutfromLinks($line, temp_arr);

                        // GC
                        response = null;
                    },
                    error:function(error){
                        ADD_DEBUG("Gfycat API - Request failed", error);
                        var gfy_html = `
                            <div style='position:relative; margin:0 auto; padding-bottom:calc(56.25% + 44px); margin-top:3px;'>
                                <iframe src='https://gfycat.com/ifr/` + gfycat_id + `' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe>
                            </div>
                        `;

                        var temp_arr = [];
                        var temp_img_obj = {"link": "", "title": "", "html":gfy_html};
                        temp_arr.push(temp_img_obj);
                        ADD_DEBUG(temp_img_obj);
                        chatImagelayoutfromLinks($line, temp_arr);
                    }
                });
            }
        }

    }

    // twitch clip 섬네일 으로 부터 찾기(앞에서 링크는 찾았는데, 이미지 링크는 못 찾은 경우)
    if(!image_found && ADD_config.chat_image_preview && !ADD_config.broadcaster_mode && ADD_config.chat_image_twitch_thumb && hrefs.length !== 0 && ADD_chat_images.length === 0){
        if(hrefs[0].match(/(\.twitch\.tv\/\w*\/clip\/|clips\.twitch\.tv\/(embed\?clip=)?)([a-zA-Z0-9]*)/)){
            var twitch_thumb_match = hrefs[0].match(/(\.twitch\.tv\/\w*\/clip\/|clips\.twitch\.tv\/(embed\?clip=)?)([a-zA-Z0-9]*)/);

            if(twitch_thumb_match){
                image_found = true;
                var twitch_thumb_id = twitch_thumb_match.pop();
                ADD_DEBUG("Twitch Clip API 호출 - id:", twitch_thumb_id);
                $.ajax({
                    url:"https://api.twitch.tv/kraken/clips/"+twitch_thumb_id,
                    type: "GET",
                    headers: {"Client-ID": nomo_const.ADD_CLIENT_ID_TWITCH, "Accept":"application/vnd.twitchtv.v5+json"},

                    // API CALL SUCCESS
                    success:function(response){
                        ADD_DEBUG("Twitch Clip API 호출 완료", response);
                        var image_url = response.thumbnails.medium;
                        var title = (response.title !== undefined ? response.title : "") + (response.broadcaster.display_name !== undefined ? " - " + response.broadcaster.display_name : "");

                        var temp_arr = [];
                        var temp_img_obj = {type:"twitch_clip", id:twitch_thumb_id, link: image_url, title: ""+title, width:480, height:272, views:response.views};
                        temp_arr.push(temp_img_obj);
                        chatImagelayoutfromLinks($line, temp_arr);

                        // GC
                        response = null;
                    },
                    error:function(error){
                        ADD_DEBUG("Twitch Clip API - Request failed", error);
                    }
                });
            }

        }
    }

    // imgur api 로부터 찾기
    if(!image_found && ADD_config.chat_image_preview && !ADD_config.broadcaster_mode && ADD_config.imgur_preview && hrefs.length !== 0 && ADD_chat_images.length === 0){
        var ADD_imgur_id, ADD_imgur_type, ADD_imgur_match,
            ADD_imgur_reg = /https?:\/\/(\w+\.)?imgur.com\/(a\/|gallery\/)?(\w*)+(\.[a-zA-Z]{3})?/;

        // 정규표현식을 통해 imgur 링크 포함 여부 확인, global check 하지 않고 먼저 나온 하나만 확인함
        ADD_imgur_match = hrefs[0].match(ADD_imgur_reg);

        if(ADD_imgur_match !== null){
            // 로컬 변수 선언
            ADD_imgur_id = ADD_imgur_match[3];

            // 이미지 type 체크
            switch(ADD_imgur_match[2]){
            case undefined:
                // a/ 에 대한 구문이 없는 경우 이미지임
                ADD_imgur_type = 0;
                break;
            case "a/":
                // a/ 에 대한 구문이 있는 경우 앨범임
                ADD_imgur_type = 1;
                break;
            case "gallery/":
                // 갤러리
                ADD_imgur_type = 2;
                break;
            default:
                // 여기까지 오면 안 된다.
                ADD_imgur_type = 10;
                break;
            }

            // imgur api 호출
            image_found = true;
            ADD_DEBUG("ADD_imgur_id = "+ADD_imgur_id+"  ADD_imgur_type = "+ADD_imgur_type);
            getImgurData($line, ADD_imgur_id, ADD_imgur_type);
        }
    }

    // 메모 달기
    if((chat_manager !== undefined && ADD_config.chat_memo) && !ADD_config.broadcaster_mode){
        var memo_index = chat_manager.indexFromData(unique_id);

        if(memo_index !== -1){
            var temp_obj = chat_manager.getData(memo_index);
            var temp_display_name = temp_obj.display_name;
            var temp_color = temp_obj.color;

            // 색깔 적용하기
            if(temp_color !== undefined && temp_color !== null && temp_color !== ""){
                $nick.addClass("colorized").css("color",temp_color);
            }

            // 메모 달기
            var temp_text;
            if(temp_display_name !== undefined){
                if(temp_display_name === ""){
                    temp_text = "*";
                }
                else{
                    temp_text = "["+[temp_display_name]+"]";
                }
                $nick.append("<span class=\"conversation_memo\" style=\"color:red !important;font-weight:700;vertical-align:inherit;display:-webkit-inline-box\"> "+ temp_text +"</span>");
                if( temp_isChatScrollOn ){
                    goScrollDown();
                }
            }
        }

        // 수정한 날짜 업데이트
        chat_manager.updateModifiedDate(unique_id);
    }

    // 닉네임 색상화
    var debug_color = "";
    if(ADD_config.chat_nick_colorize || (ADD_config.broadcaster_mode && ADD_config.broadcaster_use_nick_color)){
        if(!$nick.hasClass("colorized")){
            // 유니크 아이디에 따른 고유-랜덤 색 생성
            var temp_color2 = utils.Colors.random(unique_id);

            // 방송모드 관련(blue or green 배경 색과 같은 닉네임 색을 핑크로 변경)
            if(ADD_config.broadcaster_mode){
                var temp_ckey = (ADD_config.broadcaster_bg_color).replace(/\s/g,"").toLowerCase();
                
                if($.inArray(temp_ckey, ["blue", "rgb(0,0,255)", "#0000ff"]) !== -1){
                    temp_ckey = "blue";
                }
                else if($.inArray(temp_ckey, ["green", "rgb(0,255,0)", "#00ff00"]) !== -1){
                    temp_ckey = "green";
                }
                
                if(temp_color2.name.indexOf(temp_ckey) !== -1 || $.inArray(temp_color2.name, ["mediumturquoise", "indigo", "olive"]) !== -1){
                    temp_color2.rgb = "pink";
                    temp_color2.name = temp_color2.name+"_pink_replaced";
                }
            }
            
            // 닉네임 색 적용
            $nick.addClass("colorized").attr("style","color:"+temp_color2.rgb+" !important;").attr("colorzied",temp_color2.name);
            debug_color = temp_color2.rgb;
        }
    }

    // 링크 찾기
    var $a_elems = $content.find("a");
    if($a_elems.length > 0){
        for(var i = 0; i<$a_elems.length; i++){
            var $a = $($a_elems[i]);
            $a.unbind("click");
        }
    }

    // 키워드 링크 추가하기
    if(ADD_config.chat_autoKeyword && !ADD_config.broadcaster_mode){
        setTimeout(function(){
            var rep = 0;
            var br = true;
            while(rep<10 && br){
                br = false;
                var $textNodes = $content
                    .find("*")
                    .andSelf()
                    .contents()
                    .filter(function() {
                        return this.nodeType === 3 &&
                            !$(this).parent("a").length && 
                            !$(this).hasClass("keyword_pass") &&
                            !$(this).parent().hasClass("keyword_pass");
                    });

                $textNodes.each(function(index, element) {
                    var contentText = $(element).text();
                    $.each(streamerArray, function(si, sv){
                        var id = sv[0];
                        for(var s=1;s<sv.length; s++){
                            var disp_name = sv[s];
                            if(!ADD_config.chat_autoKeyword_1char && disp_name.length === 1){
                                continue;
                            }
                            if(contentText.indexOf(disp_name) !== -1){
                                contentText = contentText.split(disp_name).join("<a href='http://www.dostream.com/#/stream/twitch/"+id+"' class='topClick autokeyword'>"+disp_name+"</a>");   // replaceAll
                                $(element).replaceWith(contentText);
                                //ADD_DEBUG("contentText", sv, contentText, $(element));
                                rep = rep + 1;
                                br = true;
                                break;
                            }
                        }

                        if(br){
                            return false;
                        }
                    });

                    if(br){
                        return false;
                    }

                    $(element).addClass("keyword_pass");
                });
            }
        },1);
    }

    if(nomo_global.DEBUG){
        unsafeWindow.$(document).trigger("chat_line", {"id":unique_id, "nick":nick, "content":content, "color":debug_color, "me":myLine, "date":createdDate});
    }
}

export function uhaha_chat_delete_hide() {
    if($("#uha_chat_msgs").length !== 0){
        if(ADD_config.uhaha_delete_button_hide){
            $("#uha_chat_msgs").addClass("uhaha_delete_button_hide");
        }
        else{
            $("#uha_chat_msgs").removeClass("uhaha_delete_button_hide");
        }
    }
}