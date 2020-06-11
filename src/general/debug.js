import * as utils from "libs/nomo-utils.js";
var ADD_DEBUG = utils.ADD_DEBUG;
import * as nomo_common from "general/common.js";
import nomo_const from "general/const.js";


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
            title: "트위치 컨트롤 패널에서 투네이션 링크 가져오기",
            func:function(){
                //[{"data":{"user":{"id":"152596920","self":{"subscriptionBenefit":null,"__typename":"UserSelfConnection"},"__typename":"User"}},"extensions":{"durationMilliseconds":24,"operationName":"ExtensionsForChannelCurrentUser"}},{"data":{"currentUser":{"id":"72346108","login":"pingpink","roles":{"isStaff":null,"isSiteAdmin":null,"__typename":"UserRoles"},"__typename":"User"},"user":{"id":"152596920","login":"lol_ambition","panels":[{"id":"38542165","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-8528b7fe-32ac-46f5-b9cd-19bb5f6f7122","linkURL":"http://invite.blitz.gg/ambitiontwitch","description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"37456010","type":"EXTENSION","slotID":"extension-panel-2","__typename":"ExtensionPanel","__typename":"ExtensionPanel","__typename":"ExtensionPanel"},{"id":"32810632","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-c112083a-9ab6-48f0-b058-e12b95670557","linkURL":"http://twip.kr/lol_ambition","description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"32810639","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-4e277b54-0647-46d1-9459-43f5648922fa","linkURL":"https://www.twitch.tv/products/lol_ambition/ticket","description":"- 오프라인 이벤트 우선 초청!\n","__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"35947432","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-60afc2cd-c7b7-495e-aede-80ac8ab1fc11","linkURL":"https://www.twitch.tv/lol_ambition/videos?filter=highlights\u0026sort=time","description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"40600374","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-7a7e7da1-a808-4b49-85b9-e7ad6db91f4f","linkURL":"https://toon.at/donate/636948107406151844","description":"- 써보는중 화면에 안나올 수도 있음!","__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"38497443","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-4b270383-6977-4c66-bed8-85a8baf133d1","linkURL":"https://tgd.kr/20959561","description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"32810647","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-94096cae-602b-4729-b584-d4287d970209","linkURL":"https://tgd.kr/lol_ambition","description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"32819922","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-32f56782-3914-4e1e-9ba6-032ce05f5467","linkURL":"https://www.youtube.com/channel/UCHYMpkGhNIr8A0m2H3lIjUA","description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"36769376","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-47f7805c-4a4e-45e3-a85c-77c290284583","linkURL":"https://sixshop.co.kr/ambitionrise","description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"35918517","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-06e7d54b-cc18-4023-860f-3e4abc7d0b2d","linkURL":"https://www.twitch.tv/lol_ambition/clips?filter=clips\u0026range=7d","description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"33402538","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-a8f6b645-8e31-4027-9fa2-01cdff0fd2a8","linkURL":"https://twitter.com/lol_ambition","description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"34043014","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-caf969a7-8f69-4828-b461-05a6f7b874c0","linkURL":"https://www.facebook.com/lolambition/?modal=admin_todo_tour","description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"34283790","type":"EXTENSION","slotID":"extension-panel-1","__typename":"ExtensionPanel","__typename":"ExtensionPanel","__typename":"ExtensionPanel"},{"id":"32810652","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-bc81e2bb-7a50-413d-91fb-de9dbf88616c","linkURL":"https://www.instagram.com/ambition921027/","description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"34519520","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-044a9f8b-d0be-40b7-8d67-e04fc5c24c76","linkURL":"https://tgd.kr/lol_ambition","description":"*텀블러 5월 1일 이후 발송분부터는 디자인변경이 있을 예정입니다! 이미지 나오면 공유드릴게요!\n*에코백도 디자인변경 및 수량제작 일정때문에 잠시 중단되어 있습니다!! :)","__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"32957547","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-6479c235-d0c7-4a2e-b297-e6d55be8b467","linkURL":null,"description":"스폰서십/광고/협찬 등 방송과 관련된 문의는 아래의 메일로 보내주세요! 빠르게 검토하여 회신드릴 수 있도록 하겠습니다. 감사합니다!\n\ncksdyd1037@gmail.com\n\nPlease send inquiries related with broadcasting such as sponsorships, advertisements, collaborations to the email address below. We'll review and respond as soon as possible :) Thank you always!\n\ncksdyd1037@gmail.com","__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"},{"id":"32819932","type":"DEFAULT","title":null,"imageURL":"https://static-cdn.jtvnw.net/jtv_user_pictures/panel-152596920-image-68708b21-953b-4c5a-97c5-2592fae8ad2c","linkURL":null,"description":null,"__typename":"DefaultPanel","__typename":"DefaultPanel","__typename":"DefaultPanel"}],"__typename":"User"}},"extensions":{"durationMilliseconds":40,"operationName":"ChannelPanels"}},{"data":{"currentUser":{"id":"72346108","login":"pingpink","whisperThreads":{"edges":[],"__typename":"WhisperThreadConnection"},"__typename":"User"}},"extensions":{"durationMilliseconds":32,"operationName":"Whispers_Whispers_UserWhisperThreads"}}]
                // GM_xmlhttpRequest({
                //     url:"https://gql.twitch.tv/gql",
                //     method: "POST",
                //     headers: {
                //         //"Content-Type": "application/javascript",
                //         "Client-ID": "kimne78kx3ncx6brgo4mv6wki5h1ko",//ADD_CLIENT_ID_TWITCH,
                //         "Accept-Language": "ko-KR",
                //         "Content-Type": "text/plain;charset=UTF-8",
                //         "DNT": "1",
                //         "type": "POST",
                //         "Origin": "https://www.twitch.tv",
                //         "Referer": "https://www.twitch.tv/lol_ambition",
                //     },
                //     onload:function(channel){
                //         ADD_DEBUG("Twitch API(Control panel) - Request succeed", channel);
                //     },
                //     onerror:function(error){
                //         ADD_DEBUG("Twitch API(Control panel) - Request failed", error);
                //     }
                // });
                GM_xmlhttpRequest({
                    url: "https://api.twitch.tv/api/channels/rhdgurwns/panels?client_id="+nomo_const.ADD_CLIENT_ID_TWITCH,
                    method: "GET",
                    dataType:"json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    onload: function (data) {
                        var temp_response = utils.IsJsonStringReturn(data.responseText);
                        ADD_DEBUG("Succeed", temp_response);
                        $.each(temp_response, function(index, value){
                            if(value.data !== undefined && value.data.link !== undefined && value.data.link.indexOf("https://toon.at/donate/") !== -1){
                                var toonat_link = value.data.link;
                                ADD_DEBUG("찾았다", toonat_link);
                                return false;
                            }
                        });
                    },
                    onerror: function (err) {
                        ADD_DEBUG("error", err);
                    }
                });
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
            title: "트위치 컨트롤 패널 테스트2",
            func:function(){
                var temp_id = "144200210";
                GM_xmlhttpRequest({
                    // url: "https://api.twitch.tv/kraken/streams/?offset=0&limit=100&channel="+temp_id+"&api_version=5",
                    url: "https://api.twitch.tv/kraken/panels?channel="+temp_id,
                    //url: "https://api.twitch.tv/helix/panels?channel="+temp_id,
                    method: "GET",
                    dataType:"json",
                    headers: {
                        'Accept': 'application/vnd.twitchtv.v5+json',
                        'Client-ID': nomo_const.ADD_CLIENT_ID_TWITCH
                    },
                    onload: function (data) {
                        var temp_response = utils.IsJsonStringReturn(data.responseText);
                        ADD_DEBUG("Succeed", temp_response);
                    },
                    onerror: function (err) {
                        ADD_DEBUG("error", err);
                    }
                });
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