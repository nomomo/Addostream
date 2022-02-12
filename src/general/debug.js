import * as utils from "libs/nomo-utils.js";
var ADD_DEBUG = utils.ADD_DEBUG;
import * as nomo_common from "general/common.js";
import nomo_const from "general/const.js";
import {m3u8_override} from "general/m3u8player.js";

// test event 테스트 이벤트;
export function ADD_test(){
    var text_e = [
        { title: "임시로 DEBUG 모드 켜고 끄기",
            func:function(){
                nomo_global.DEBUG = !nomo_global.DEBUG;
                alert("nomo_global.DEBUG : " + nomo_global.DEBUG);
            }
        },
        { title: "메모 초기화",
            func:async function(){
                var r = confirm("진짜 초기화?");
                if(r){
                    //ADD_memo_init();
                    await nomo_common.nomo.setVal("ADD_chat_manager_data",[]);
                    ADD_DEBUG("채팅 매니저 데이터 초기화");

                    // 메모 불러오기
                    // ADD_chat_memo = await ADD_GetVal("ADD_chat_memo");
                    // 메모 저장
                    // await nomo_common.nomo.setVal("ADD_chat_memo", JSON.stringify(ADD_chat_memo));
                }
            }
        },
        { title: "채팅에 글쓰기",
            func:function(){
                var elem = $(".chat-container > iframe").contents().first().find("u-chat > iframe").contents().first();
                var chatElem = elem.find("div.content.nano-content")[0];
                var inputString = prompt("imgur 이미지 주소 입력","https://imgur.com/a/45ps1");
                var appendText = `<div class="line" data-tiptext="55f2bc0c - {ago}" created="1546774913"><span class="nick" nick="55f2bc0c">55f2bc0c:</span>&nbsp;<span class="chatContent" style="color: #333333; font-size: 9pt;">
                                `+inputString+"</span></div>";
                $(chatElem).append(appendText);
            }
        },
        { title: "입력한 주소를 링크로 출력",
            func:function(){
                var elem = $(".chat-container > iframe").contents().first().find("u-chat > iframe").contents().first();
                var chatElem = elem.find("div.content.nano-content")[0];
                var inputString = prompt("링크 주소 입력","https://imgur.com/a/45ps1");
                var appendText = `<div class="line" data-tiptext="55f2bc0c - {ago}" created="1546774913">
                                    <span class="nick" nick="55f2bc0c">55f2bc0c:</span>&nbsp;<span class="chatContent" style="color: #333333; font-size: 9pt;">`+
                                        "<a target=\"_blank\" href=\""+inputString+"\">"
                                        +inputString+`
                                        </a></span></div>`;
                $(chatElem).append(appendText);
            }
        },
        { title: "Desktop notification 시도",
            func:function(){
                var noti_detail = {
                    title: "title",
                    text: "body",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC",
                    //highlight: true,
                    timeout: 6000
                    //ondone: function(){},
                    //onclick: function(){},
                };

                // GM_notification(text, title, image, onclick);
                GM.notification(noti_detail);

                //$("#easyNotify").easyNotify(noti_options);
            }
        },
        { title: "버전 체크 시간 초기화",
            func:async function(){
                await nomo_common.nomo.setVal("ADD_version_last_check_time",new Date(Date.parse(new Date()) - 2 * 1000 * 60 * 60 * 24));
            }
        },
        {
            title: "개발중 기능 on-off",
            func:async function(){
                ADD_config.under_dev = !ADD_config.under_dev;
                await GM_setting.save();
                if(ADD_config.under_dev){
                    $(".ADD_under_dev").show();
                }
                else{
                    $(".ADD_under_dev").hide();
                }
                alert("개발중 기능 설정 변겅\nADD_config.under_dev: "+!ADD_config.under_dev+" → "+ADD_config.under_dev);
            }
        },
        {
            title: "입력한 설정 on-off",
            func:function(){
                setTimeout(async function(){
                    var inputString = prompt("설정 이름 입력","");
                    if(ADD_config[inputString] !== undefined && typeof ADD_config[inputString] === "boolean"){
                        ADD_config[inputString] = !ADD_config[inputString];
                        await GM_setting.save();
                        alert("설정변경 - ADD_config."+inputString+" : "+ADD_config[inputString]);
                    }
                    else{
                        alert(inputString + "을 찾을 수 없음");
                    }
                },1);
            }
        },
        {
            title: "stream 내 video 접근",
            func:async function(){
                var $iframe = $("#stream").find("iframe");
                ADD_DEBUG("iframe", $iframe, $iframe[0], $iframe[0].contentWindow); // 여기까진 oK
                // error: cross-origin frame
                //var $iframeDocument = $iframe.contents().first();
                //ADD_DEBUG("iframeDocument", $iframeDocument);

                // 플레이어는 layout 로 생성되어서 안 먹힘
                // var src = $iframe.attr("src");
                // GM_xmlhttpRequest({
                //     url: src,
                //     method: "GET",
                //     onload: function(response){
                //         ADD_DEBUG("response", response, response.responseText);
                //         // var respText    = response.responseText.replace (/<script(?:.|\n|\r)+?<\/script>/gi, "");
                //         // respText        = respText.replace (/<img[^>]+>/gi, "");
                //         // var respDoc     = $(respText);

                //     },
                //     error: function(error){
                //         ADD_DEBUG("error", error);
                //     }
                // });
            }
        },
        {
            title: "설정 페이지로 이동",
            func:function(){
                window.location.href = "https://www.dostream.com/#/addostream";
            }
        },
        {
            title: "설정 창 띄우기",
            func:function(){
                var $setting_container = $(`
                <div class="lightbox-opened">
                    <div style="display:flex;margin-top:50px;cursor:default;"><!--lightbox-opened-white-background-->
                        <div class="modal-content" style="font-size:12px;text-align:left;margin:0 auto;max-width:1250px;">
                            <div id="setting_contents" class="modal-body" style="padding:10px 50px 10px 50px;">
                            </div>
                        </div>
                    </div>
                </div>
                `);
                $("body").append($setting_container);
                GM_setting.createlayout($("#setting_contents"));
            }
        },
        {
            title: "chatlog_local 보기",
            func:function(){
                console.log($(".chat-container > iframe")[0].contentWindow.chatlog_local);
            }
        },
        {
            title: "modal 창 열기",
            func:function(){
                $(`
                <div style="position:absolute;top:50%;left:50%;" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title" id="exampleModalLabel">New message</h4>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="form-group">
                          <label class="control-label">이동할 페이지를 입력하세요:</label>
                          <input type="text" class="form-control" id="coord_input">
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Go</button>
                    </div>
                  </div>
                </div>
              </div>
                `)
                    .appendTo("body");
            }
        },
        {
            title: "입력한 내용 우하하에 삽입",
            func: function(){
                var elem = $("#uha_chat_msgs");
                var inputString = prompt("채팅내용 입력","https://imgur.com/a/45ps1");
                var appendText = 
                `<li class="is_notme"><span class="name" data-date="${String(Number(new Date())).substr(0,10)}" data-sid="2fc48b61c2d7fdca" data-name="몽고뽕나무${Math.random()}">몽고뽕나무${Math.random()}</span>
                <span class="text">${inputString}</span><time>17:42</time><span class="delete">👁</span></li>`;
                $(elem).append(appendText);
            }
        },
        {
            title: "입력한 내용 링크로 우하하에 삽입",
            func: function(){
                var elem = $("#uha_chat_msgs");
                var inputString = prompt("링크 입력","https://imgur.com/a/45ps1");
                var appendText = 
                `<li class="is_notme"><span class="name" data-date="${String(Number(new Date())).substr(0,10)}" data-sid="2fc48b61c2d7fdca" data-name="몽고뽕나무${Math.random()}">몽고뽕나무${Math.random()}</span>
                <span class="text"><a href="${inputString}" target="_uha_kr">${inputString}</a></span><time>17:42</time><span class="delete">👁</span></li>`;
                $(elem).append(appendText);
            }
        },
        {
            title: "m3u8 테스트",
            func:function(){
                m3u8_override();
            }
        }
    ];

    // 디버그 모드의 경우 디버그용 버튼 및 팝업 생성
    if(nomo_global.DEBUG){
        $("#ADD_quick_list").before(// html
            `
<span id="ADD_test_button" class="btn btn-default">
<span class="glyphicon glyphicon-wrench" style="color:#999;">
</span>
</span>
`);
        $("#popup_ADD_config").before(// html
            `
<div id="popup_ADD_test" class="modal-dialog">
<div class="modal-content">
<div class="modal-body">
    <table class="table table-condensed table-hover" style="margin-bottom:0px;">
        <thead><tr><th>DEBUG MODE</th><th></th></tr></thead>
        <tbody id="popup_ADD_test_tbody">
        </tbody>
    </table>
</div>
</div>
</div>
`);

        // 이벤트 일괄 등록
        text_e.forEach(function(obj){
            var $tempText = $(//html
                `
<tr class="active">
    <td>${obj.title}</td>
    <td><span style="cursor:pointer;font-weight:700;">실행</span></td>
</tr>
`)
                .on("click",function(){
                    obj.func();
                });

            $("#popup_ADD_test_tbody").append($tempText);
        });
    }
}