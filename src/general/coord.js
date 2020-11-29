import "libs/autolinker.js";
import {ADD_send_sys_msg_from_main_frame} from "chat/send_message.js";
import nomo_const from "general/const.js";
import * as nomo_common from "general/common.js";
import {ADD_DEBUG} from "libs/nomo-utils.js";
import {ADD_streamer_nick} from "general/streamer-lib.js";
import {get_chat_manager_from_main_frame} from "chat/chat_manager.js";

// 편한 좌표보기 관련 함수
var autolinker = new Autolinker( {
    urls : {
        schemeMatches : true,
        wwwMatches    : true,
        tldMatches    : true
    },
    email       : true,
    phone       : false,
    mention     : false,
    hashtag     : false,

    stripPrefix : false,
    stripTrailingSlash : true,
    newWindow   : true,

    truncate : {
        length   : 0,
        location : "end"
    },

    className : "auto_a"
} );

// auto_a 링크 클릭 시 이벤트
$(document).on("click", "a.auto_a", function (e) {
    var $this = $(this);
    if($this.attr("href").indexOf("dostream.com") !== -1){
        e.preventDefault();
        window.open($this.attr("href"), "_self");
    }
});

export function hrm_layout(){
    if(nomo_global.PAGE === nomo_const.C_UCHAT){
        return false;
    }
    $("#btnOpenHrm").off("click");
    $("#btnOpenHrm").on("click", function(e){
        e.preventDefault();
        var href="";
        if(ADD_config.insagirl_select == 1){
            href="http://coord.dostream.com";
        }
        else if(ADD_config.insagirl_select == 2){
            href="http://insagirl-toto.appspot.com/hrm/?where=2";
        }
        
        window.open(href);
        $(this).blur();
        return false;
    });

    if(!ADD_config.insagirl_button && $("#btnOpenHrm").length !== 0 && $("#btnOpenHrm_ADD").length !== 0){
        $("#btnOpenHrm_ADD").fadeOut("300").delay("700").remove();
        $("#btnOpenHrm").css("transition","width 1s, height 1s, transform 1s").css("height","45px");
        $("#hrm_layout").fadeOut("300").delay("700").remove();
        $(".chat-container").css("top","45px");
        return false;
    }
    else if(!ADD_config.insagirl_button && $("#btnOpenHrm").length !== 0 && $("#btnOpenHrm_ADD").length === 0){
        return false;
    }
    else if($("#btnOpenHrm").length !== 0 && $("#btnOpenHrm_ADD").length == 0){
        var $btnOpenHrm_ADD = $("<button id=\"btnOpenHrm_ADD\" class=\"btn-blue\" style=\"height:0px;display:none\" onfocus=\"this.blur()\">▼</button>")
            .on("click", async function(){
                if($("#hrm_layout").is(":hidden")){
                    if(await checkCrossAccess("http://insagirl-hrm.appspot.com/json2/2/1/1/","Cross_Origin_Hrm", function(){$("#btnOpenHrm_ADD").trigger("click");})){
                        await ADD_parse_insagirl(1);
        
                        $(this).html("▲");
        
                        var hrmlayoutHeight = await nomo_common.nomo.getVal("ADD_hrmlayoutHeight" , $(".chat-container").height() * 0.5);
                        var chatContainerHeight = $(".chat-container").height();
        
                        var chatHeight = chatContainerHeight - hrmlayoutHeight - 5;
                        if(chatHeight <= 100 ){
                            hrmlayoutHeight = Math.max(0, chatContainerHeight - 100 - 5);
                        }
        
                        $("#hrm_layout").height(`${hrmlayoutHeight}px`).show();
                        $("#hrm_split_bar").css("top",(hrmlayoutHeight+45)+"px").show();
                        $("#ADD_hrmbodyexpand").show();
        
                        $(".chat-container").css("top",(hrmlayoutHeight+45+5)+"px");
                    }
                }
                else{
                    $(this).html("▼");
                    $("#hrm_layout").hide();
                    $("#hrm_split_bar").hide();
                    $("#hrm_layout ul:first").html("");
                    $(".chat-container").css("top","45px");
                }
            });
        ADD_DEBUG("좌표 버튼 기능 변경");
        $("#btnOpenHrm")//.before("<button class=\"btn-blue\" style=\"margin-right:-80px;margin-bottom:-45px;\"></button>")
            .after($btnOpenHrm_ADD).css("transition","none").css("height","22.5px");
        $("#btnOpenHrm_ADD").css("transition","all 0s").css("height","22.5px").show();//delay("700").fadeIn("300");
        
        // hrm_layout 생성
        var $hrm_layout = $(//html
            `
<div id="hrm_layout">
    <ul></ul>
    <div style="padding:5px;">
        <button id="ADD_hrmbodyexpand" type="button" page="2" class="btn btn-primary btn-block">더 보기</button>
    </div>
</div>
            `)
            .insertAfter($(".chat-ignore").first());

        // 크기조절 바 생성
        $(`<div id="hrm_split_bar" style="cursor:ns-resize;position:absolute;width:100%;height:5px;background-color:#666;display:none;"></div>`)
            .on("mousedown", function (e) {   // 크기조절 동작
                e.preventDefault();
                $("html").addClass("no-scroll");

                // 초기 Y, 각 엘리먼트 높이 저장
                var initY = e.pageY;
                var hrmlayoutHeight = $("#hrm_layout").height();
                var new_hrmlayoutHeight = hrmlayoutHeight;
                var chatContainerHeight = $(".chat-container").height();
                var new_chatContainerHeight = chatContainerHeight;

                // iframe 가릴 스크린 생성
                $("#hrm_split_bar").after(`
                    <div class="chat_container_screen" style="width:100%;height:100%;position:absolute;z-index:5000"></div>
                `);
                $(".chat_container_screen").css("top",$("#hrm_layout").height()+45+5+"px");

                $(document).on("mousemove.hrm_mousemove", function (e) {
                    e.preventDefault();

                    // 움직인 거리 계산
                    var pageY = e.pageY;
                    var movedY = pageY - initY;
                    ADD_DEBUG("hrmlayoutHeight", hrmlayoutHeight, "chatContainerHeight", chatContainerHeight, "pageY", pageY, "movedY", movedY, "new_hrmlayoutHeight", new_hrmlayoutHeight);

                    // 새 height 계산
                    new_hrmlayoutHeight = hrmlayoutHeight + movedY;
                    new_chatContainerHeight = chatContainerHeight - movedY;

                    // 조건 반영 후 크기 설정
                    if (new_hrmlayoutHeight < 0){
                        new_hrmlayoutHeight = 0;
                    }
                    if ( new_chatContainerHeight >= 100) {
                        $("#hrm_layout").height(new_hrmlayoutHeight);
                        $("#hrm_split_bar").css("top",(new_hrmlayoutHeight+45)+"px");
                        $(".chat-container").css("top",(new_hrmlayoutHeight+45+5)+"px");
                        $(".chat_container_screen").css("top",(new_hrmlayoutHeight+45+5)+"px");
                    }
                });

                $(document).one("mouseup", async function(){
                    $(document).off("mousemove.hrm_mousemove");
                    $(".chat_container_screen").remove();
                    await nomo_common.nomo.setVal("ADD_hrmlayoutHeight" , $("#hrm_layout").height());
                    $("html").removeClass("no-scroll");
                });
            })
            .insertAfter("#hrm_layout");

        
        // 추가로드 버튼 클릭 시 동작
        $hrm_layout.find("#ADD_hrmbodyexpand").on("click", async function(){
            var page = parseInt($(this).attr("page"));
            await ADD_parse_insagirl(page);
            $(this).attr("page",String(parseInt(page+1)));
            
            if(ADD_config.insagirl_select == 2){
                $("#ADD_hrmbodyexpand").hide();
            }
        });
    }
    else{
        ADD_DEBUG("좌표 버튼이 이미 존재 or 좌표 버튼을 찾지 못함");
    }
}

var prev_nick = "", prev_href = "", prev_count = 0;
var coord_length = 20;
var coord_fail = false;
async function ADD_parse_insagirl(page){
    ADD_config.insagirl_select = 2;
    ADD_DEBUG("RUNNING - parse_coord, page:"+page);
    if(page === 0 || page === 1){
        prev_nick = "";
        prev_href = "";
        prev_count = 0;
        //last_prev_count_elem = undefined;
    }
    if(coord_length === undefined || coord_length === null || coord_length === 0){
        coord_length = 20;
    }

    var coord_url = "";
    if(ADD_config.insagirl_select == 1){    // 기본 두스트림의 경우
        coord_url = "http://coord.dostream.com/api/?offset="+String(parseInt((page-1)*coord_length));
        $("#ADD_hrmbodyexpand").html(coord_length+"개 더 보기");
    }
    else if(ADD_config.insagirl_select == 2){   // 인사걸의 경우
        coord_url = "http://insagirl-hrm.appspot.com/json2/2/1/"+page+"/";
        $("#ADD_hrmbodyexpand").html("더 보기");
    }
    else{
        ADD_DEBUG("예상하지 못한 설정변수", ADD_config.insagirl_select);
        return;
    }
    
    GM_xmlhttpRequest({
        url:coord_url,
        method: "GET",
        headers: {
            "Content-Type": "application/javascript"
        },
        timeout: 2000,
        onload: async function(response){
            coord_fail = false;
            if($("#hrm_layout").length === 0){
                ADD_DEBUG("hrm_layout가 없다");
                return;
            }
            // 채팅 매니저 불러오기
            if(ADD_config.insagirl_block_by_nick){
                get_chat_manager_from_main_frame();
            }
            //var expUrl = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?/=~_|!:,.;]*)[-A-Z0-9+&@#/%=~_|])/ig;
            var data = JSON.parse(response.responseText);
            if(ADD_config.insagirl_select == 2){
                data = data.v;
            }
            coord_length = data.length;

            var hrm_layout_HTML = "";
            var added = 0;
            for(var z=0; z<data.length; z++){
                if(ADD_config.insagirl_select == 2){
                    data[z] = data[z].split("|");
                    data[z] = {created:Number(data[z][0]), user:data[z][1], message:data[z][2]};
                }

                var nick = data[z].user;
                if(ADD_config.insagirl_block_by_nick && chat_manager !== undefined && chat_manager.getIsBlock(nick)){
                    continue;
                }
                var content = autolinker.link(data[z].message.replace("http://dostream.com/", "https://dostream.com/").replace("http://www.dostream.com/", "https://www.dostream.com/"));//.replace(expUrl, "<a href=\"$&\" target=\"_blank\">$&</a>");
                var $temp_a = $("<span>"+content+"</span>").find("a");
                
                // 연속된 좌표 숨기기
                if(ADD_config.insagirl_block_dobae){
                    if($temp_a.length > 0){
                        var temp_href = $temp_a.first().attr("href");
                        if((ADD_config.insagirl_block_dobae_by_href || nick === prev_nick) && temp_href === prev_href){
                            // ADD_DEBUG("연속된 좌표 숨기기", content, temp_href);
                            prev_count = prev_count + 1;
                            continue;
                        }
                        else{
                            prev_href = temp_href;
                            if(prev_count > 0){
                                hrm_layout_HTML = hrm_layout_HTML + "<li style='font-size:11px;display:flex;align-items:center;color:#ccc;text-align:center;padding:2px 10px;'><span style='flex:1;border-bottom:1px solid #ccc;margin-right:10px;'></span>" + prev_count + "개의 좌표 숨겨짐" + "<span style='flex:1;border-bottom:1px solid #ccc;margin-left:10px;'></span></li>";
                            }
                            prev_count = 0;
                        }
                    }
                    else{
                        prev_href = "";
                    }
                    prev_nick = nick;
                }

                $temp_a.each(function(index, href_i){
                    var $href_i = $(href_i);
                    var href = $href_i.attr("href");
                    const regex_m3u8 = /^https?:\/\/.+\.m3u8/i;
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
                        if(ch_text !== undefined || ch_text !== ""){
                            content = content + " <span class=\"keyword_pass ch_text\" style=\"font-weight:700;vertical-align:top;\">["+ch_text+"]</span>";
                        }
                    }
                    else if(regex_m3u8.test(href)){
                        content = content + " " + `<a href="https://www.dostream.com/#/stream/m3u8/${href}" class="keyword_pass ch_text" style="display:inline-block;margin-left:0px;font-weight:700;vertical-align:baseline;">[M3U8 PLAYER]</a>`;
                        
                    }
                });

                var a = (new Date).getTime();
                var e = Number(new Date(data[z].created));
                var i = Math.floor((a - e) / 1e3),
                    r = parseInt(i / 3600),
                    s = parseInt(i / 60) % 60,
                    u = i % 60,
                    l = "(" + (r > -1 && 10 > r ? "0" + r : r) + ":" + (s > -1 && 10 > s ? "0" + s : s) + ":" + (u > -1 && 10 > u ? "0" + u : u) + ")";
                    //if(content.indexOf("#/stream/") !== -1){
                    //    content = content.replace("target=\"_blank\"","");
                    //}
                hrm_layout_HTML = hrm_layout_HTML + "<li>" + l + nick + ": " + content + "</li>";
                added = added + 1;
            }
            // var myLinkedHtml = autolinker.link(hrm_layout_HTML);
            // $("#hrm_layout ul:first").append(myLinkedHtml);
            if(added == 0 && prev_count !== 0){
                prev_count = 20;
                hrm_layout_HTML = hrm_layout_HTML + "<li style='display:flex;align-items:center;color:#ccc;text-align:center;padding: 0 10px;'><span style='flex:1;border-bottom:1px solid #ccc;margin-right:10px;'></span>" + prev_count + "개의 좌표 숨겨짐" + "<span style='flex:1;border-bottom:1px solid #ccc;margin-left:10px;'></span></li>";
                prev_count = 0;
            }

            if(ADD_config.insagirl_select == 1){
                $("#hrm_layout ul:first").append(hrm_layout_HTML);
            } else {
                $("#hrm_layout ul:first").empty().append(hrm_layout_HTML);
            }
            
        }, onerror: async function(){
            ADD_DEBUG("좌표 파싱 중 에러 발생 - onerror");
            // await replace_coord(page);
        }, ontimeout: async function(){
            ADD_DEBUG("좌표 파싱 중 에러 발생 - ontimeout");
            // await replace_coord(page);
        }
    });

    var replace_coord = async function(_page){
        //await nomo_common.nomo.setVal("Cross_Origin_Hrm", false);
        if(!coord_fail){
            coord_fail = true;
            var coord_ori = (ADD_config.insagirl_select == 1 ? "coord.dostream.com" : "insagirl-hrm.appspot.com");
            var coord_new = (ADD_config.insagirl_select == 1 ? "insagirl-hrm.appspot.com" : "coord.dostream.com");
            ADD_send_sys_msg_from_main_frame(coord_ori+" 가 응답하지 않아 좌표 사이트를 "+coord_new+" 으로 변경합니다. 설정을 영구적으로 변경하려면 <a href='https://www.dostream.com/addostream/' target='_blank' style='text-decoration:underline;'>[애드온 상세 설정]</a>에서 [고급 기능 설정]을 활성화한 후, [좌표 사이트 선택] 옵션을 변경하십시오.");

            ADD_config.insagirl_select = (ADD_config.insagirl_select == 1 ? 2 : 1);
            await ADD_parse_insagirl(_page);
        }
    };
}


// 좌표 보기 시 Cross Access 체크 및 공지하기
async function checkCrossAccess(url, varname, callback){
    var checkVal = false;
    checkVal = await nomo_common.nomo.getVal(varname);
    if(checkVal === undefined){
        checkVal = false;
        await nomo_common.nomo.setVal(varname, checkVal);
    }

    if(checkVal === false){
        $("html").addClass("no-scroll");
        $("body").append("<div class=\"lightbox-opened\"><img src=\"https://raw.githubusercontent.com/nomomo/Addostream/master/images/cross_origin.jpg\" /></div>");

        $(document).one("click",".lightbox-opened",async function(){
            GM_xmlhttpRequest({
                url: url,
                method: "GET",
                headers: {
                    "Content-Type": "application/javascript"
                },
                onload: async function(){   // response
                    ADD_DEBUG("엑세스 성공");
                    await nomo_common.nomo.setVal(varname, true);
                    callback();
                }, onerror: async function(){
                    ADD_DEBUG("엑세스 실패");
                    await nomo_common.nomo.setVal(varname, false);
                }
            });
        });
        return false;
    }
    else{
        return true;
    }
}