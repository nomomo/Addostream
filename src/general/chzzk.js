import {ADD_DEBUG} from "libs/nomo-utils.js";

export function chzzk_main() {
    ADD_DEBUG("CHZZK");
    let isTopWindow = window.self === window.top;
    if (isTopWindow) {
        ADD_DEBUG("CHZZK TOP WINDOW");
        return;
    }

    // // 치지직 로그인
    // if (ADD_config.chzzk_sign_in_iframe) {
    //     chzzk_sign_in_iframe();
    // }

    // 채팅 토글 이벤트
    window.addEventListener('message', function (event) {
        if (event.origin !== 'https://dostream.com' && event.origin !== 'https://www.dostream.com') {
            return;
        }

        ADD_DEBUG("got message in iframe from dostream.com", event);
        const data = event.data;
        if (data.action === 'toggleChat') {
            ChatToggle();
        }
    });

    if (ADD_config.chzzk_onlyVideo) {
        // GM_addStyle(`
        // #live_player_layout{
        //     position:fixed !important;
        //     left:0px !important;
        //     top:0px !important;
        //     z-index:10000000000000 !important;
        //     width:100% !important;
        //     height:100% !important;
        // }
        // `);

        // auto close 알림창
        $(document).arrive('[class^="band_banner_container__"]', {
            existing: true
        }, function (subElem) {
            let $subElem = $(subElem);
            if ($subElem.text().indexOf("별도 권한을 부여받은") !== -1) {
                $subElem.find("button").first().click();
            }
        });


        let player = undefined;
        let $player = undefined;
        let handleVideoReadyFired = false;
        let handleVideoReady = function () {
            if (handleVideoReadyFired) return;
            handleVideoReadyFired = true;
            let viewmode_buttons = document.querySelectorAll(".pzp-pc__viewmode-button");
            if (viewmode_buttons.length == 1) {
                viewmode_buttons[0].click();
            } else {
                // 치즈나이프와의 충돌 방지
                for (let i = 0; i < viewmode_buttons.length; i++) {
                    let button = viewmode_buttons[i];
                    if (button.getAttribute('aria-label') === '넓은 화면') {
                        button.click();
                        break;
                    }
                }
            }

            if (!ADD_config.chzzk_show_chat_default) {
                document.querySelector('[class^="live_chatting_header_button__"]').click();
            }
        };

        // 자동 넓은 화면
        $(document).arrive("video.webplayer-internal-video", {
            onlyOnce: true,
            existing: true
        }, function (elem) {
            ADD_DEBUG("elem", elem);
            player = elem;
            $player = $(player);

            if (player.readyState >= 2) {
                handleVideoReady();
            } else {
                player.addEventListener('loadedmetadata', function once() {
                    player.removeEventListener('loadedmetadata', once);
                    handleVideoReady();
                });
            }
        });

        // display current quality
        GM_addStyle(`
        .NCCL_pzp_qset { border-radius: 8px; color: #fff; padding: 4px 6px !important; opacity:0; transition-property: opacity; transition-duration: 0.2s; }
        .pzp.pzp-pc.pzp-pc--controls .NCCL_pzp_qset { opacity:1; position:relative }
        .pzp.pzp-pc.pzp-pc--controls .NCCL_pzp_qset:hover .NCCL_pzp_qset_tooltip { visibility: visible }
        .pzp.pzp-pc.pzp-pc--controls .NCCL_pzp_qset .NCCL_pzp_qset_tooltip{
        font-family: -apple-system, BlinkMacSystemFont, Helvetica, Apple SD Gothic Neo, sans-serif;
        -webkit-font-smoothing: antialiased;
        color: #fff;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        margin: 0;
        padding: 0;
        position: absolute;
        top: -40px;
        left: 50%;
        height: 27px;
        padding: 0 12px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 14px;
        font-size: 13px;
        line-height: 28px;
        text-align: center;
        color: #fff;
        white-space: nowrap;
        visibility: hidden;
        transition-property: opacity;
        transform: translateX(-50%);
    }
        `);
        let that = {
            isSetMaxQuality: false,
            insertQsetDisplay: function () {
                let that = this;
                if ($(document).find(".NCCL_pzp_qset").length == 0 && this.$NCCL_pzp_qset == undefined) {
                    this.$NCCL_pzp_qset = $(`<div class="NCCL_pzp_qset"></div>`);
                    $(document).find(".pzp-pc__bottom-buttons-right").prepend(this.$NCCL_pzp_qset);
                }
            }
        };
        $(document).arrive(".pzp-pc-ui-setting-quality-item", {
            onlyOnce: true,
            existing: true
        }, function (subElem) {
            if (that.isSetMaxQuality) return;
            let $subElem = $(subElem);
            let $ul = $subElem.closest("ul");
            let $qlis = $ul.find("li");
            //NOMO_DEBUG("$qlis", $qlis);

            if ($qlis.length > 1) {
                $(document).arrive(".pzp-pc-setting-intro-quality", {
                    onlyOnce: true,
                    existing: true
                }, function (liElem) {
                    //that.isSetMaxQuality = true;
                    //$qlis[1].click();

                    that.insertQsetDisplay();
                    let text = $(liElem).find(".pzp-pc-ui-setting-intro-panel__value").text();
                    that.latestVideoQuality = text;
                    that.$NCCL_pzp_qset.html(`${text}`); // color:#03C75A;

                    // BANJJAK
                    setTimeout(function () {
                        that.$NCCL_pzp_qset.addClass("BANJJAK");
                    }, 200);
                    setTimeout(function () {
                        that.$NCCL_pzp_qset.removeClass("BANJJAK");
                        //that.$NCCL_pzp_qset.fadeOut(300);
                    }, 3000);

                    // new MutationObserver
                    let observer = new MutationObserver(function (mutations) {
                        mutations.forEach(function (mutation) {
                            if (!that.firstPlayed) {
                                if (that.latestVideoQuality !== mutation.target.wholeText) {
                                    that.$NCCL_pzp_qset.text(mutation.target.wholeText);
                                    that.latestVideoQuality = mutation.target.wholeText;
                                }
                                return;
                            }
                            ADD_DEBUG(mutation);
                            that.insertQsetDisplay();
                            that.$NCCL_pzp_qset.text(mutation.target.wholeText);

                            // fadeIn and fadeOut
                            setTimeout(function () {
                                that.$NCCL_pzp_qset.fadeIn(300);
                            }, 200);
                            setTimeout(function () {
                                that.$NCCL_pzp_qset.fadeOut(300);
                            }, 3000);
                        });
                    });
                    observer.observe(liElem, {
                        attributes: false,
                        childList: false,
                        characterData: true,
                        subtree: true
                    });
                });
            }
        });

    }

    // function setCookieSameSiteNone(targetCookieName) {
    //     try {
    //         GM.cookie.list({
    //             name: targetCookieName
    //         }).then(function (cookies, error) {
    //             if (!error) {
    //                 for (let i = 0; i < cookies.length; i++) {
    //                     if(cookies[i].sameSite == "no_restriction" && cookies[i].secure == true){
    //                         continue;
    //                     }

    //                     GM_cookie.delete(cookies[i], function () {
    //                         ADD_DEBUG(error || 'GM_cookie.delete success');
    //                         cookies[i].sameSite = "no_restriction";
    //                         cookies[i].secure = true;
    //                         ADD_DEBUG("Try to set new cookie", cookies[0]);
    //                         GM.cookie.set(cookies[i])
    //                             .then(function () {
    //                                 ADD_DEBUG('set cookie done');
    //                             }, function (error) {
    //                                 ADD_DEBUG('set cookie error', error);
    //                             });
    //                     });
    //                 }
    //             }
    //         });
    //     }
    //     catch(e){
    //         ADD_DEBUG("error from setCookieSameSiteNone", e);
    //     }
    // }

    // function chzzk_sign_in_iframe() {
    //     try {
    //         if(!GM.cookie){
    //             ADD_DEBUG("GM.cookie is not supported");
    //             return;
    //         }

    //         const targetCookies = ["NID_AUT", "NID_SES", "NID_JKL"];

    //         GM.cookie.list({}).then(function (cookies, error) {
    //             ADD_DEBUG("get all coockies", cookies, error);
    //         });

    //         for (const ck of targetCookies) {
    //             setCookieSameSiteNone(ck);
    //         }

    //         // 다른 창에서 쿠키 변경된 경우 때문에 문제 발생하는 경우를 방지
    //         setInterval(function(){
    //             for (const ck of targetCookies) {
    //                 setCookieSameSiteNone(ck);
    //             }
    //         },250);

    //         if (cookieStore) {
    //             cookieStore.addEventListener("change", function (event) {
    //                 ADD_DEBUG("cookie change event", event.changed);

    //                 if (event.changed.length > 0 && event.changed[0].sameSite != "none" && targetCookies.includes(event.changed[0].name)) {
    //                     setCookieSameSiteNone(event.changed[0].name);
    //                 }

    //             });
    //         } else {
    //             console.log("cookieStore is not supported.");
    //         }
    //     } catch (e) {
    //         ADD_DEBUG("error from chzzk_sign_in_iframe", e);
    //     }
    // }

    function ChatToggle() {
        ADD_DEBUG("ChatToggle");
        let $chatShowBtn = $('[class^="live_information_player_folded_button__"]').first();
        let $chatHideBtn = $('[class^="live_chatting_header_button__"]').first();

        ADD_DEBUG($chatShowBtn.length, "chatShowBtn.is(':hidden')", $chatShowBtn.is(':hidden'));
        ADD_DEBUG($chatHideBtn.length, "chatHideBtn.is(':hidden')", $chatHideBtn.is(':hidden'));

        if (!$chatHideBtn.is(':hidden')) {
            ADD_DEBUG("click hide button");
            $chatHideBtn.trigger("click");
        } else {
            ADD_DEBUG("click show button");
            $chatShowBtn.click();
        }
    }

}