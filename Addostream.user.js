// ==UserScript==
// @name        Addostream
// @namespace   Addostream
// @description 두스트림에 기능을 추가한다.
// @include     *.dostream.com/*
// @version     1.48.0
// @icon        url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC)
// @homepageURL https://nomomo.github.io/Addostream/
// @supportURL  https://github.com/nomomo/Addostream/issues
// @downloadURL https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js
// @updateURL   https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js
// @run-at      document-start
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require     https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.libs.js?20190117
// @grant       GM.addStyle
// @grant       GM_addStyle
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.deleteValue
// @grant       GM_deleteValue
// @grant       GM.listValues
// @grant       GM_listValues
// @grant       GM.info
// @grant       GM_info
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @grant       GM.registerMenuCommand
// @grant       GM_registerMenuCommand
// @grant       unsafeWindow
// @connect     appspot.com
// ==/UserScript==
// eslint-disable-next-line no-unused-vars
/*global $, jQuery, nude, GM, unsafeWindow, GM_addStyle, GM_getValue, GM_setValue, GM_xmlhttpRequest, GM_registerMenuCommand, GM_deleteValue, GM_listValues, GM_getResourceText, GM_getResourceURL, GM_log, GM_openInTab, GM_setClipboard, GM_info, GM_getMetadata, $, document, console, location, setInterval, setTimeout, clearInterval, page, ignores, exportFunction, dsStream, web_browser, chat_manager_main, chat_manager, Autolinker */
"use strict";
(async () => {
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                               GLOBAL VARIABLES
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    
    var i;

    // API로 접근해서 스트리머 이름을 가져올 수도 있으나,
    // API CALL 을 줄이기 위해 원래부터 두스 MAIN에 있던 스트리머 이름을 적어두기로 한다.
    var streamerArray = [
        ["hanryang1125","풍월량"],
        ["ddahyoni","따효니"],
        ["kss7749","쉐리"],
        ["looksam","룩삼"],
        ["yapyap30","얍얍"],
        ["saddummy","서새봄냥"],
        ["109ace","철면수심"],
        ["rhdgurwns","공혁준"],
        ["gmdkdsla","흐앙님"],
        ["jungtaejune","똘똘똘이"],
        ["mascahs","마스카"],
        ["steelohs","스틸로"],
        ["kimdoe","김도"],
        ["togom","토곰"],
        ["ogn_lol","OGN 롤챔스"],
        ["kanetv8","케인TV"],
        ["yumyumyu77","소풍왔니"],
        ["sung0","쥬팬더"],
        ["game2eye","홍방장"],
        ["cocopopp671","초승달"],
        ["dingception","딩셉션"],
        ["redteahs","홍차"],
        ["zzamtiger0310","짬타수아"],
        ["rldnddl789","아빠킹"],
        ["eulcs1","EU LCS"],
        ["kkoma","Kkoma"],
        ["1983kej","단군"],
        ["lol_peanut","Peanut"],
        ["faker","Faker"],
        ["nrmtzv","으음"],
        ["nicegametv","나겜"],
        ["teaminven","인벤"],
        ["capta1n_pony","포니"],
        ["huni","Huni"],
        ["sktt1_wolf","Wolf"],
        ["bang","Bang"],
        ["wpghd321","류제홍"],
        ["jmjdoc","칸데르니아"],
        ["yungi131","윤기"],
        ["mediamuse","미디어뮤즈"],
        ["veritaskk","Veritas"],
        ["themarinekr","김정민"],
        ["tvindra","인드라"],
        ["tranth","자동"],
        ["seine1026","세인님"],
        ["sonycast_","소니쇼"],
        ["dou3796","뱅붕"],
        ["rudbeckia7","연두는말안드뤄"],
        ["trisha","트리샤"],
        ["naseongkim","김나성"],
        ["mari0712","마리"],
        ["dlxowns45","태준이"],
        ["handongsuk","한동숙"],
        ["alenenwooptv","웁_게임방송"],
        ["mr_coat","노래하는코트"],
        ["ajehr","머독"],
        ["lol_crown","Crown"],
        ["rooftopcat99","옥냥이"],
        ["myzet1990","개구멍"],
        ["yoonroot","윤루트"],
        ["sn400ja","액시스마이콜"],
        ["tape22222","테이프2"],
        ["miracle0o0","미라클티비"],
        ["bighead033","빅헤드"],
        ["wkgml","견자희"],
        ["queenhuz","후즈"],
        ["kiyulking","김기열"],
        ["asdn6388","나락호프"],
        ["lol_cuvee","Cuvee"],
        ["VSL","VSL"],
        ["drlee_kor","이민우33세"],
        ["CoreJJ","CoreJJ"],
        ["lol_ambition","앰비션"],
        ["Axenix","아제닉스"],
        ["maknoonlol","막눈"],
        ["zilioner","침착맨"],
        ["timeofcreate","홍랑"],
        ["twitchshow","트위치쇼"],
        ["kangqui","강퀴"],
        ["team_spiritzero","team_spiritzero"],
        ["zizionmy","젼마이"],
        ["lol_blank","Blank"],
        ["ogn_ow","OGN 오버워치"],
        ["juankorea","주안코리아"],
        ["woowakgood","우왁굳"],
        ["www0606","푸딩"],
        ["runner0608","러너"],
        ["flowervin","꽃빈"],
        ["h920103","이초홍"],
        ["hj0514","백설양"],
        ["pbstream77","피비스트림"],
        ["llilka","릴카"],
        ["beyou0728","피유"],
        ["serayang","세라양"],
        ["mister903","갱생레바"],
        ["what9honggildong","왓구홍길동"],
        ["chicken_angel","통닭천사"],
        ["godbokihs","갓보기"],
        ["yuriseo","서유리"],
        ["kimminyoung","아옳이"],
        ["gabrielcro","가브리엘"],
        ["starcraft_kr","스타크래프트 KR"],
        ["yeziss","신예지"],
        ["ch1ckenkun","치킨쿤"],
        ["lds7131","더헬"],
        ["nodolly","노돌리"],
        ["haku861024","정직원"],
        ["nanajam777","우정잉"],
        ["leehunnyeo","별루다"],
        ["streamer2u","이유님"],
        ["hatsalsal","햇살살"],
        ["pommel0303","폼멜"],
        ["hosu0904","호수"],
        ["surrenderhs","서렌더"],
        ["s_wngud","뜨뜨뜨뜨"],
        ["eukkzzang","윾짱"],
        ["gageu","가그"],
        ["ange_i","요뿌니"],
        ["menpa1030","멘파"],
        ["dua3362","서넹"],
        ["dda_ju","다주"],
        ["taesangyun","태상"],
        ["oreo4679","리치1"],
        ["dmdtkadl69","응삼이"],
        ["sigwon","시권"],
        ["rngudwnswkd","푸린_"],
        ["jungjil","정질"],
        ["ses836","인간젤리"],
        ["DrAquinas","DrAquinas"],
        ["tree2512","말퓨"],
        ["frog135","게구리"],
        ["leechunhyang","이춘향"],
        ["cherrypach","꽃핀"],
        ["lovelyyeon","연두부"],
        ["yd0821","양띵"],
        ["2chamcham2","탬탬버린"],
        ["jinu6734","김진우"],
        ["ddolking555","똘킹"],
        ["erenjjing","에렌디라"],
        ["suk_tv","석티비"],
        ["h0720","군림보"],
        ["rellacast","렐라"],
        ["silphtv","실프"],
        ["playhearthstonekr","playhearthstonekr"],
        ["mirage720","미라지오빠"],
        ["1am_shin","신기해"],
        ["maruemon1019","마루에몽"],
        ["ulsanbigwhale","울산큰고래"],
        ["areuming","알밍"],
        ["esther950","에쓰더"],
        ["pacific8815","쌍베"],
        ["dogswellfish","개복어"],
        ["yeonchobom","연초봄"],
        ["DawNHS","던"],
        ["ssambahong","홍진영"],
        ["Twipkr","트윕KR"],
        ["reniehour","레니아워"],
        ["caroline9071","숑아"],
        ["ssambahong","쌈바홍"],
        ["Funzinnu","Funzinnu"],
        ["loveseti","미모"],
        ["kimgaeune","김총무님"],
        ["1uming","루밍이"],
        ["invenk01","김영일"],
        ["sal_gu","살인마협회장"],
        ["flurry1989","플러리"],
        ["hols7","홀스"],
        ["holsbro","홀스"],
        ["hn950421","고말숙"],
        ["hwkang2","캡틴잭"],
        ["yunlovejoy","도여사"],
        ["yatoring","야토링"],
        ["lolluk4","루ㅋ4"],
        ["rkdthdus930","강소연"],
        ["seogui","서긔"],
        ["pikra10","재슥짱"],
        ["playoverwatch_kr","오버워치 이스포츠"],
        ["maxim_korea_official","남자매거진맥심"],
        ["hanururu","하느르"],
        ["obm1025","오킹"],
        ["acro_land","아크로"],
        ["choerakjo","최락조"],
        ["megthomatho","맥또마또"],
        ["s1032204","삐부"],
        ["rkdwl12","강지"],
        ["jaewon4915","김재원"],
        ["zennyrtlove","신재은"],
        ["2sjshsk","유누"],
        ["queenmico","미코"],
        ["lsd818","득털"],
        ["wlswnwlswn","진주몬"],
        ["apzks1236","학살"],
        ["sunbaking","선바"],
        ["rockid1818","모모88"],
        ["moogrr1211","무굴"],
        ["twitchkr","TwitchKR"],
        ["tlfjaos","시러맨"],
        ["dawnhs","DawN"],
        ["mata","마타타마"],
        ["lol_khan","Khan"],
        ["buzzbean11","대도서관"],
        ["mhj1682","카트문호준"],
        ["remguri","렘쨩"],
        ["heavyrainism","호무새"],
        ["lck_korea","LCK Korea"]
    ];
    //['',''],
    //DoFLIX 23592060
    //DosLive 23612163
    var streamerArray_name = [],
        streamerArray_display_name = [],
        streamerArray_AutoComplete = [];

    for(i=0; i<streamerArray.length; i++){
        streamerArray_name[i] = streamerArray[i][0];
        streamerArray_display_name[i] = streamerArray[i][1];
        streamerArray_AutoComplete[i] = streamerArray[i][1]+" ("+streamerArray[i][0]+")";
    }

    function ADD_streamer_nick(id){
        var temp_id = id.toLowerCase();
        if(streamerArray_name !== [] || streamerArray_display_name !== []){
            var id_index = $.inArray(temp_id, streamerArray_name);
            if (id_index !== -1){
                return streamerArray_display_name[id_index];
            } else {
                return id;
            }
        } else {
            ADD_DEBUG("ADD_streamer_nick 함수에서 id 리턴중 null");
        }
    }

    var checkedStreamerFromList = [];
    var ADD_API_SET_INTERVAL;           //
    var twitch_api_cookie = [];         // Twitch api 쿠키

    // 설정 클릭 시 enable 요소가 있는 설정을 아래 배열에 등록
    var ADD_config_enable_init = ["ADD_config_top_fix"
        ,"ADD_config_alarm"
        ,"ADD_config_thumbnail_mouse"
        ,"ADD_config_streamer_hide"
        ,"ADD_config_chat_ctr"
        ,"ADD_config_chat_image_preview"
        ,"ADD_config_imgur_preview_safe"
        ,"ADD_config_remember_platform"
        ,"ADD_config_chat_block"
    ];

    var ADD_status = [],
        ADD_status_init = {"ad_remove" : 0
            ,"auto_image" : 0
            ,"api_call" : 0
            ,"update" : 0
        };

    var first_main_call = false,                  // 첫번째 main 호출인지 체크함
        first_api_call = true,                    // 첫번째 api 호출인지 체크함
        api_push_forced = false,                  // true 이면 twitch api를 강제로 push 함, Setting save 시 사용
        local_api_refresh = true,                 // Setting save 버튼 연속으로 눌렀을 때 막기 위한 용도
        unique_window_check = true,               // Unique window 감지용
        unique_window, unique_window_cookie,      // Unique Window 체크용 변수 생성
        chatting_arrive_check = null,             // 채팅창 arrive 체크용
        thumbnail_check = null;                   // 섬네일 마우스 오버 설정 변경 체크용
        //chatting_scroll_pause = null,             // 스크롤 강제로 멈출지 여부
        //goScrollDown_run = true,                  // 스크롤 강제로 내림 여부
        //goScrollDown_delay = 1.0;                 // 스크롤 강제로 내릴 때 delay 값 (기본값 1초)

    const C_MAIN = 0;
    const C_STREAM = 1;
    const C_UCHAT = 2;
    const urlCheckerText = ["MAIN--","STREAM","UCHAT-"];
    
    var ADD_Client_ID = "phcxzq5994awjrevkt45p6711bt77s";

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                            UserScript Value Set
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    function deepCopy(obj){
        //return Object.assign({}, obj);
        //jQuery.extend({}, obj);
        return JSON.parse(JSON.stringify(obj));
    }

    async function ADD_SetVal(key, value){
        await GM.setValue(key, JSON.stringify(value));
    }

    async function ADD_GetVal(key, init){
        var temp = await GM.getValue(key);
        if (temp !== undefined && temp !== null){
            return JSON.parse(temp);
        }
        else if(init !== undefined){
            await GM.setValue(key, JSON.stringify(init));
            return init;
        }
        else{
            return undefined;
        }
    }

    let ADD_config = {};
    const ADD_config_init = {
        top_fix : { type: "checkbox", value: false },                       // 상단 FIX 사용 여부
        top_off_fix : { type: "checkbox", value: false },                   //     오프라인 시에도 고정 여부
        top_fix_ID : { type: "tag", value: ["hanryang1125"] },              //     상단 고정할 스트리머 ID 배열
        alarm : { type: "checkbox", value: false },                         // 메인 스트리머 추가 사용 여부
        alarm_gap : { type: "text", value: 5 },                             //     Twitch API 호출할 간격
        top_alarm_ID : { type: "tag", value: ["hanryang1125"] },            //                호출할 ID 배열
        alarm_noti : { type: "checkbox", value: false },                    //     호출 시 데스크톱 메시지로 알림
        thumbnail_mouse : { type: "checkbox", value: false },               // 메인 섬네일 마우스 ON 시 이미지 확대 사용 여부
        thumbnail_size : { type: "radio", value: 1 },                       //                        이미지 크기
        streamer_hide : { type: "checkbox", value: false },                 // 메인에 스트리머 숨기기 사용 여부
        streamer_hide_ID : { type: "tag", value: ["nalcs1", "nalcs2"] },    //                      대상 ID 배열
        remember_platform : { type: "checkbox", value: false },             // 특정 플랫폼 숨기기
        remember_twitch : { type: "checkbox", value: false },               //     트위치
        remember_kakao : { type: "checkbox", value: false },                //     카카오
        remember_youtube : { type: "checkbox", value: false },              //     유투브
        last_version : { type: "set", value: version },                     // 업데이트 전 지난 버전 기록
        under_dev : { type: "checkbox", value: false },                     // 개발 중 기능 활성화 여부
        chat_ctr : { type: "checkbox", value: false },                       // 채팅 컨트롤 기능 사용 여부
        chat_adb : { type: "checkbox", value: false },                      //     광고 차단 기능 사용 여부
        chat_image_preview : { type: "checkbox", value: true },             //     이미지 미리보기 사용 여부
        chat_image_youtube_thumb : { type: "checkbox", value: false },       //           유투브 이미지 미리보기
        chat_image_twitch_thumb : { type: "checkbox", value: false },        //           트위치 섬네일 미리보기
        imgur_preview : { type: "checkbox", value: true },                  //           Imgur 이미지 미리보기 사용 여부
        imgur_preview_safe : { type: "checkbox", value: true },             //           후방주의 기능 사용 여부
        imgur_preview_opacity : { type: "text", value: 0.93 },              //                  후방주의 스크린 투명도
        nudity_block : { type: "checkbox", value: false },                  //           성인 이미지 차단 기능 사용 여부
        sys_meg : { type: "checkbox", value: true },                       //     시스템 메시지로 작동 상황 알림 사용 여부
        url_self : { type: "checkbox", value: true },                      //     두스 좌표는 현재창으로 열기
        chat_scroll : { type: "checkbox", value: true },                    //     향상된 채팅 스크롤
        hide_nick_change : { type: "checkbox", value: false },              //     닉네임 변경 메시지 숨김 여부
        chat_block : { type: "checkbox", value: false },                    //     금지단어 기반 채팅 차단 사용 여부
        chat_block_noti : { type: "checkbox", value: true },               //           차단 시 <message deleted 로 표시>
        chat_block_nickname : { type: "checkbox", value: false },           //           닉네임에서 차단
        chat_block_contents : { type: "checkbox", value: false },           //           채팅 내용에서 차단
        chat_block_tag : { type: "tag", value: ["네다통","통구이","민주화","ㅁㅈㅎ","느금마","니애미","니어미","니엄마","니애비","느그애비","느그애미","애미터","애미뒤","앰뒤","앰창"] },
        theme : { type: "text", value: "default" },                         //     테마 기능 사용 여부
        history : { type: "checkbox", value: false },                        //     시청 기록 표시 사용 여부
        max_history : { type: "text", value: 20 },                          //           최대 기록 개수
        insagirl_button : { type: "checkbox", value: false },               //     빠른 좌표 보기 기능 사용 여부
        insagirl_block_by_nick : { type: "checkbox", value: false },         //           메모 기능에서 차단된 닉에 해당하는 좌표 숨기기
        popup_player : { type: "checkbox", value: false }                    //    이어 보기
    };

    async function ADD_config_var_write(){
        if(ADD_config === undefined  || ADD_config === null){
            ADD_config = deepCopy(ADD_config_init);
        }
        await ADD_SetVal("ADD_config",ADD_config);
    }

    async function ADD_config_var_read(){
        var ADD_config_temp = await ADD_GetVal("ADD_config");
        if(ADD_config_temp === undefined || ADD_config_temp === null || ADD_config_temp === {}){
            ADD_config = deepCopy(ADD_config_init);
            await ADD_config_var_write();
            return;
        }

        ADD_config = deepCopy(ADD_config_init);
        for(var key in ADD_config){
            if(ADD_config_temp[key] !== undefined && ADD_config_temp[key] !== null){
                ADD_config[key] = ADD_config_temp[key];
            }
        }
    }

    function ADD_DEBUG(/**/){
        var urlche = urlCheck();
        if(urlche !== C_UCHAT){
            //return false;
        }
        if(ADD_DEBUG_MODE){
            var args = arguments,
                args_length = args.length,
                args_copy = args;
            for (var i=args_length;i>0;i--){
                args[i] = args_copy[i-1];
            }
            args[0] = "+["+urlCheckerText[urlche]+"]  ";
            args.length = args_length + 1;
            console.log.apply(console, args);
        }
    }

    // 버전 문자열을 체크하기 쉬운 숫자로 변환
    function ADD_version_string(str){
        var tempString = str.toString();
        var tempStringArray = tempString.split(".");
        for (var i = 0; i<tempStringArray.length; i++){
            if(tempStringArray[i].length < 2){
                tempStringArray[i] = "0"+tempStringArray[i];
            }
        }
        return tempStringArray.join("");
    }
    
    // 12시간에 한 번 버전 체크
    const VERSION_CHECK_TIME_INTERVAL = 12;
    async function checkNewVersion(){
        const root = "https://raw.githubusercontent.com/nomomo/Addostream/master/";
        var ver_fut,
            ADD_version_cur_pre_fut,
            ver_fut_text = "",
            update_log = "",
            return_val = "";

        var ADD_version_last_check_time = await ADD_GetVal("ADD_version_last_check_time");
        if(ADD_version_last_check_time === undefined){
            ADD_DEBUG("Version - 이전에 버전 체크한 시간이 없어 새로 쓴다 - 2일 전");
            ADD_version_last_check_time = new Date(Date.parse(new Date()) - 2 * 1000 * 60 * 60 * 24);
            await ADD_SetVal("ADD_version_last_check_time", ADD_version_last_check_time);
        }
        var time_pre = new Date(ADD_version_last_check_time);
        var time_cur = new Date();
        var time_bet = Number((time_cur - time_pre)/60/60/1000).toFixed(4);  // 소수점 4자리만큼 시간 얻기
        var ADD_version_cur_pre_fut_init = {
            ver_cur:ver_cur,
            ver_pre:ver_pre,
            ver_fut:ver_cur,
            ver_fut_text:version_str,
            update_log:""
        };

        // 현재 및 이전 버전을 확인함
        if(ADD_config.last_version === undefined || ADD_config.last_version === null){
            await ADD_config_var_read();
        }

        var ver_pre = Number(ADD_config.last_version.value);
        var ver_cur = version;

        if(time_bet > VERSION_CHECK_TIME_INTERVAL){
            try {
                var response = await $.ajax({
                    url: root + "package.json",
                    type: "GET",
                    dataType:"json"
                });
                ADD_DEBUG("Version - 버전확인 성공", return_val);

                update_log = response.update;
                ver_fut_text = response.version;
                ver_fut = Number(ADD_version_string(ver_fut_text));

                ADD_version_cur_pre_fut = {
                    ver_cur:ver_cur,
                    ver_pre:ver_pre,
                    ver_fut:ver_fut,
                    ver_fut_text:ver_fut_text,
                    update_log:update_log
                };

                // 읽어온 변수 저장
                ADD_SetVal("ADD_version_cur_pre_fut", ADD_version_cur_pre_fut);

                // 버전 체크 시간을 다시 씀
                await ADD_SetVal("ADD_version_last_check_time",new Date());

                response = null;

            } catch (error){
                ADD_DEBUG("Version - 버전확인 실패");
                console.error(error);
            }
        }
        else{
            //ADD_DEBUG("Version - 현재 버전 체크 시간 :",getTimeStampWithText(time_cur,"s"));
            //ADD_DEBUG("Version - 이전 버전 체크 시간 :",getTimeStampWithText(time_pre,"s"));
            ADD_version_cur_pre_fut = await ADD_GetVal("ADD_version_cur_pre_fut", ADD_version_cur_pre_fut_init);
            ver_fut = ADD_version_cur_pre_fut.ver_fut;
            ver_fut_text = ADD_version_cur_pre_fut.ver_fut_text;
            update_log = ADD_version_cur_pre_fut.update_log;
            
            ADD_DEBUG("Version - 현재 와의 시간 차이 : " + time_bet + " 시간 < " + VERSION_CHECK_TIME_INTERVAL + " 이므로 체크하지 않음", ADD_version_cur_pre_fut);
        }

        ADD_DEBUG("Version - 현재 버전: "+ver_cur+", 이전 버전: "+ver_pre+" , 최신 버전: "+ver_fut);

        var msg_text = "두스트림 애드온이 동작 중 입니다 (v"+version_str+")";

        // 현재 버전(ver_cur) > 이전 버전(ver_pre)
        if(ver_cur > ver_pre && ver_fut > ver_pre){
            msg_text = msg_text + "<br />애드온이 최근 업데이트 됨. ("+version_str+")";
            if(update_log !== undefined && update_log !== null && update_log !== ""){
                msg_text = msg_text +"<br />업데이트 내역: "+update_log;
            }
            // 이전 버전(ver_pre) 업데이트
            ADD_config.last_version.value = version;
            await ADD_config_var_write();
        }
        // 업데이트 가능한 버전(ver_fut) > 현재 버전(ver_cur)
        else if(ver_fut > ver_cur ){
            msg_text = msg_text + "<br />새로운 버전(<a href=\"https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js\" target=\"_blank\">v"+ver_fut_text+"</a>) 으로 업데이트 가능";
        }
        else if(ver_cur === ver_pre){
            msg_text = msg_text + "<br />현재 최신 버전 입니다.";
        }

        if(ADD_config.sys_meg.value){
            ADD_send_sys_msg(msg_text);
        }

        /*
        if(urlCheck() !== C_UCHAT && new_version_available && $("#new_version_available_text").length !== 0){
            $("#new_version_available_text").show().html("- <a href=\"https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js\" target=\"_blank\">New Version(v"+ver_fut_text+") Available!</a>");
            $("#github_url_text").hide();
        }
        */

        return true;
    }


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                                      CSS
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    function ADD_head_append(){
        var text = "<link href=\"https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,900\" rel=\"stylesheet\">";
        var font_css = `
            <style id="ADD_head_appended" type="text/css">
                #history_elem a{font-family: "Noto Sans KR", "맑은 고딕", malgun gothic, dotum, serif; font-weight:400;}
                #history_elem a.nowplaying{font-family: "Noto Sans KR", serif; font-weight:900;}
            </style>
            `;
        $("head").append(text+font_css);
    }

    function Addostream_CSS(){
        GM_addStyle(`
            /* microtip.css
            * @author Ghosh
            * https://github.com/ghosh/microtip
            * MIT licensed
            */
            [aria-label][role~="tooltip"]{position:relative}[aria-label][role~="tooltip"]:before,[aria-label][role~="tooltip"]:after{transform:translate3d(0,0,0);-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;opacity:0;pointer-events:none;transition:all var(--microtip-transition-duration,.18s) var(--microtip-transition-easing,ease-in-out) var(--microtip-transition-delay,0s);position:absolute;box-sizing:border-box;z-index:10;transform-origin:top}[aria-label][role~="tooltip"]:before{background-size:100% auto!important;content:""}[aria-label][role~="tooltip"]:after{background:rgba(17,17,17,.9);border-radius:4px;color:#fff;content:attr(aria-label);font-size:var(--microtip-font-size,11px);font-weight:var(--microtip-font-weight,normal);text-transform:var(--microtip-text-transform,none);padding:.5em 1em;white-space:nowrap;box-sizing:content-box}[aria-label][role~="tooltip"]:hover:before,[aria-label][role~="tooltip"]:hover:after,[aria-label][role~="tooltip"]:focus:before,[aria-label][role~="tooltip"]:focus:after{opacity:1;pointer-events:auto}[role~="tooltip"][data-microtip-position|="top"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%280%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:6px;width:18px;margin-bottom:5px}[role~="tooltip"][data-microtip-position|="top"]:after{margin-bottom:11px}[role~="tooltip"][data-microtip-position|="top"]:before{transform:translate3d(-50%,0,0);bottom:100%;left:50%}[role~="tooltip"][data-microtip-position|="top"]:hover:before{transform:translate3d(-50%,-5px,0)}[role~="tooltip"][data-microtip-position|="top"]:after{transform:translate3d(-50%,0,0);bottom:100%;left:50%}[role~="tooltip"][data-microtip-position="top"]:hover:after{transform:translate3d(-50%,-5px,0)}[role~="tooltip"][data-microtip-position="top-left"]:after{transform:translate3d(calc(-100% + 16px),0,0);bottom:100%}[role~="tooltip"][data-microtip-position="top-left"]:hover:after{transform:translate3d(calc(-100% + 16px),-5px,0)}[role~="tooltip"][data-microtip-position="top-right"]:after{transform:translate3d(calc(0% + -16px),0,0);bottom:100%}[role~="tooltip"][data-microtip-position="top-right"]:hover:after{transform:translate3d(calc(0% + -16px),-5px,0)}[role~="tooltip"][data-microtip-position|="bottom"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%28180%2018%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:6px;width:18px;margin-top:5px;margin-bottom:0}[role~="tooltip"][data-microtip-position|="bottom"]:after{margin-top:11px}[role~="tooltip"][data-microtip-position|="bottom"]:before{transform:translate3d(-50%,-10px,0);bottom:auto;left:50%;top:100%}[role~="tooltip"][data-microtip-position|="bottom"]:hover:before{transform:translate3d(-50%,0,0)}[role~="tooltip"][data-microtip-position|="bottom"]:after{transform:translate3d(-50%,-10px,0);top:100%;left:50%}[role~="tooltip"][data-microtip-position="bottom"]:hover:after{transform:translate3d(-50%,0,0)}[role~="tooltip"][data-microtip-position="bottom-left"]:after{transform:translate3d(calc(-100% + 16px),-10px,0);top:100%}[role~="tooltip"][data-microtip-position="bottom-left"]:hover:after{transform:translate3d(calc(-100% + 16px),0,0)}[role~="tooltip"][data-microtip-position="bottom-right"]:after{transform:translate3d(calc(0% + -16px),-10px,0);top:100%}[role~="tooltip"][data-microtip-position="bottom-right"]:hover:after{transform:translate3d(calc(0% + -16px),0,0)}[role~="tooltip"][data-microtip-position="left"]:before,[role~="tooltip"][data-microtip-position="left"]:after{bottom:auto;left:auto;right:100%;top:50%;transform:translate3d(10px,-50%,0)}[role~="tooltip"][data-microtip-position="left"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%28-90%2018%2018%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:18px;width:6px;margin-right:5px;margin-bottom:0}[role~="tooltip"][data-microtip-position="left"]:after{margin-right:11px}[role~="tooltip"][data-microtip-position="left"]:hover:before,[role~="tooltip"][data-microtip-position="left"]:hover:after{transform:translate3d(0,-50%,0)}[role~="tooltip"][data-microtip-position="right"]:before,[role~="tooltip"][data-microtip-position="right"]:after{bottom:auto;left:100%;top:50%;transform:translate3d(-10px,-50%,0)}[role~="tooltip"][data-microtip-position="right"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%2890%206%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:18px;width:6px;margin-bottom:0;margin-left:5px}[role~="tooltip"][data-microtip-position="right"]:after{margin-left:11px}[role~="tooltip"][data-microtip-position="right"]:hover:before,[role~="tooltip"][data-microtip-position="right"]:hover:after{transform:translate3d(0,-50%,0)}[role~="tooltip"][data-microtip-size="small"]:after{white-space:pre-line;width:80px}[role~="tooltip"][data-microtip-size="medium"]:after{white-space:pre-line;width:150px}[role~="tooltip"][data-microtip-size="large"]:after{white-space:pre-line;width:260px}[role~="tooltip"][data-microtip-size="custom"]:after{white-space:pre;text-align:center}[data-microtip-size="custom2"]:after{white-space:pre-line;text-align:center}\

            /* Customize CSS for tagit*/
            ul.tagit {
                cursor:pointer;
                margin: 0px;
                -webkit-padding-start: 5px !important;
                min-height:30px;
            }
            ul.tagit li span {
                text-overflow:ellipsis;
            }
            ul.tagit li.tagit-choice {
                cursor:default;
            }
            ul.tagit li.tagit-new {
                padding: .25em 4px .25em 3px !important;
                min-width:80px;
                width:80px;
                max-width:120px;
                float:left;
            }

            /* https://raw.githubusercontent.com/aehlke/tag-it/master/css/jquery.tagit.css */
            ul.tagit {
                padding: 1px 5px;
                overflow: auto;
                margin-left: inherit; /* usually we don't want the regular ul margins. */
                margin-right: inherit;
            }
            ul.tagit li {
                display: block;
                float: left;
                margin: 2px 5px 2px 0;
            }
            ul.tagit li.tagit-choice {
                position: relative;
                line-height: inherit;
            }
            input.tagit-hidden-field {
                display: none;
            }
            ul.tagit li.tagit-choice-read-only {
                padding: .2em .5em .2em .5em;
            }

            ul.tagit li.tagit-choice-editable {
                padding: .2em 18px .2em .5em;
            }

            ul.tagit li.tagit-new {
                padding: .25em 4px .25em 0;
            }

            ul.tagit li.tagit-choice a.tagit-label {
                cursor: pointer;
                text-decoration: none;
            }
            ul.tagit li.tagit-choice .tagit-close {
                cursor: pointer;
                position: absolute;
                right: .1em;
                top: 50%;
                margin-top: -8px;
                line-height: 17px;
            }

            /* used for some custom themes that don't need image icons */
            ul.tagit li.tagit-choice .tagit-close .text-icon {
                display: none;
            }

            ul.tagit li.tagit-choice input {
                display: block;
                float: left;
                margin: 2px 5px 2px 0;
            }
            ul.tagit input[type="text"] {
                -moz-box-sizing:    border-box;
                -webkit-box-sizing: border-box;
                box-sizing:         border-box;

                -moz-box-shadow: none;
                -webkit-box-shadow: none;
                box-shadow: none;

                border: none;
                margin: 0;
                padding: 0;
                width: inherit;
                background-color: inherit;
                outline: none;
            }

            /* Optional scoped theme for tag-it which mimics the zendesk widget. */
            ul.tagit {
                border-style: solid;
                border-width: 1px;
                border-color: #C6C6C6;
                background: inherit;
            }
            ul.tagit li.tagit-choice {
                -moz-border-radius: 6px;
                border-radius: 6px;
                -webkit-border-radius: 6px;
                border: 1px solid #CAD8F3;
                background: none;
                background-color: #DEE7F8;

                font-weight: normal;
            }
            ul.tagit li.tagit-choice .tagit-label:not(a){
                /*color: #555;*/
            }
            ul.tagit li.tagit-choice a.tagit-close {
                text-decoration: none;
            }
            ul.tagit li.tagit-choice .tagit-close {
                right: .4em;
            }
            ul.tagit li.tagit-choice .ui-icon {
                display: none;
            }
            ul.tagit li.tagit-choice .tagit-close .text-icon {
                display: inline;
                font-family: arial, sans-serif;
                font-size: 16px;
                line-height: 16px;
                color: #777;
            }
            ul.tagit li.tagit-choice:hover, ul.tagit li.tagit-choice.remove {
                background-color: #bbcef1;
                border-color: #6d95e0;
            }
            ul.tagit li.tagit-choice a.tagLabel:hover,
            ul.tagit li.tagit-choice a.tagit-close .text-icon:hover {
                color: #222;
            }
            ul.tagit input[type="text"] {
                color: #333333;
                background: none;
            }
            .ui-widget {
                font-size: 1.0em;
            }

            /* Forked from a jQuery UI theme, so that we don't require the jQuery UI CSS as a dependency. */
            .tagit-autocomplete.ui-autocomplete { position: absolute; cursor: default; }
            * html .tagit-autocomplete.ui-autocomplete { width:1px; } /* without this, the menu expands to 100% in IE6 */
            .tagit-autocomplete.ui-menu {
                list-style:none;
                padding: 2px;
                margin: 0;
                display:block;
                float: left;
            }
            .tagit-autocomplete.ui-menu .ui-menu {
                margin-top: -3px;
            }
            .tagit-autocomplete.ui-menu .ui-menu-item {
                font-size:11px;;
                margin:0;
                padding: 0;
                zoom: 1;
                float: left;
                clear: left;
                width: 100%;
            }
            .tagit-autocomplete.ui-menu .ui-menu-item a {
                text-decoration:none;
                display:block;
                padding:.2em .4em;
                line-height:1.5;
                zoom:1;
            }
            .tagit-autocomplete .ui-menu .ui-menu-item a.ui-state-hover,
            .tagit-autocomplete .ui-menu .ui-menu-item a.ui-state-active {
                font-weight: normal;
                margin: -1px;
            }
            .tagit-autocomplete.ui-widget-content { border: 1px solid #aaaaaa; background: #ffffff 50% 50% repeat-x; color: #222222;}
            .tagit-autocomplete.ui-corner-all, .tagit-autocomplete .ui-corner-all { -moz-border-radius: 4px; -webkit-border-radius: 4px; -khtml-border-radius: 4px; border-radius: 4px; }
            .tagit-autocomplete .ui-state-hover, .tagit-autocomplete .ui-state-focus { border: 1px solid #999999; background: #dadada; font-weight: normal; color: #212121; }
            .tagit-autocomplete .ui-state-active  { border: 1px solid #aaaaaa; }
            .tagit-autocomplete .ui-widget-content { border: 1px solid #aaaaaa; }
            .tagit .ui-helper-hidden-accessible { position: absolute !important; clip: rect(1px,1px,1px,1px); }


            // Dostream+ CSS
            .search a.afreeca{display:none !important;}
             ul.nav{display:none !important;}
             #streamSearchForm{display:none !important;}
            .onstream .nav-brand_mod{height:45px;text-decoration:none;color:#fff;}
            .nav-brand_mod{display:block;float:left;width:112px;height:63px;margin:0 20px 0 24.5px;background-position:center center;background-repeat:no-repeat;}
            .nav-brand, .nav-brand_mod{color:#fff;overflow:visible;margin-left:24.5px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAANCAYAAADG4RJzAAAACXBIWXMAAAsTAAALEwEAmpwYAAA752lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTctMDctMjlUMDI6MTE6MTArMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE3LTA3LTI5VDAyOjExOjEwKzA5OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNy0wNy0yOVQwMjoxMToxMCswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZDZlNmM5ZDctYTQ5NS0yYjQ4LWFkNTQtODk4Y2YxOGYxNmNiPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6YjljODIzOTYtNzNiNy0xMWU3LTgxMzItZWJiZTQwMzI0ZjNkPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Y2MwYjBiN2MtYTYwYi1hMzQ3LWE3MWItZGUxZWU1MzYyZGQ1PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNjMGIwYjdjLWE2MGItYTM0Ny1hNzFiLWRlMWVlNTM2MmRkNTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wNy0yOVQwMjoxMToxMCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpkNmU2YzlkNy1hNDk1LTJiNDgtYWQ1NC04OThjZjE4ZjE2Y2I8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMDctMjlUMDI6MTE6MTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+KzwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+KzwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOkJhZz4KICAgICAgICAgPC9waG90b3Nob3A6VGV4dExheWVycz4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDpDRDkwODM0Mjk1NTIxMUUzODk3REU5MTEyMTdENDYzOTwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+OTE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTM8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pvkq298AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA9FJREFUeNrsWD2u2zgQ/rTIBbJQ8zphF3idKrHhBQw3OoCqwI0rqfIBBPdW5e41Qir1VmP4AmxYWd0DduHuFRaQI0wKkhb1Q8kIEiywCAEWIoczw/n5ZkSPiAAATcFoU8E5eH7GMfY9/B4/Poiom9cDRVFKpztRb/1+ojSKKIoOdKXB3k+c91NK0eH6y/j/1/MP2/Dt7QYgQOAPPOLH3vGcg6PCpmh+jdfbmvZ7gWQV/i+CmDEmGWOf7bWesT/ehfu0H3vbBEB1QQNQb68piDFmzYJGNG1NWY+GEctqatFSnTFi6z0EgGrDYPNoCkOfUd3a3wMZQ/5FQ8MrdGfVzOqaCot2KKt/L71m9NXrRQNyWCwC8NkBI3c6pRFF6YnuDqi4n9IRzFwP0WBN87EhR8OQQgjrnAUZivc0TKm9iCLN435Ke3qO9LoeHrRLOkUDvWxZDxmaNk1tOfP20jz+csDIB94FgCCAD8wUQoH3jy6iNxVHfj4i9s0Z34tzBTlvdauCTlwgkGAOIeayyuwlpcQuHOjWFLTeC/A873R4eQXv0XzFXnDk5x1Cczc/9vKcA+B4fZnQIykhj7Fn20KIAKW07zoJHcQYM9H+j/39adR12JKn+xKtXEv1WwXwHNx/BsUqXJodQm3wcCc92WEA3W4A+Cte3O0QvoQG0Y6ejLUdLxUBCbaxb9l2D4EE2/AZPe0aZfTIcd6FtgcgACSl5SwTnEkXnFJKZhmeAPwtpfx3jNntDbcFcymvG+WUML7iC5kA+PEWyQOPDfb1OM9klTbA5F5DlwpAslJG0Birss0Yxs3bmU0DWtU49DPg+eCcKpDae0HgClN9MRN9TzinG6G3k9KTskQCgf2aYaqAOVwMJ8IYHaqNKqoboJQSUh69R6prmrFRprJJB9CkAQdd2vL9v+k5Nvac91Sxf0MFINnGi5GsMJpjNcpbZfRzzoHqDY8IdxpkYc/64ZJSelLuvHBBt9kodhhwMgMWglNK+aeUctrYfYiY7oGRlF2B8gMEAMSjWnYRIy4C4CuFkU2hW7wOOvwgeF7xuT2nDsujKdbYD6N4UtZcPXEH5wyMuBk2he6BkxJyF3p2lK4UEMPuNdUlOPJcZYDKmL4zVMFajQrW7dYuFOUxPCkdrCwB0NZZ1//6HCsOiIuAcrjqk83TxNiJQ1nTmO/8AZwZHl0PxOYfRXA+uqFj9KYyoG/rjNZ7scCzpTpTkWZGUkqsLgx91RKU0u4Ips8CCfLzF8S+fstpa8r0T9PjnYcLmDWen7F9X/dlmeDqnTXyW9gyJ1vSifF9AJJYNd1acLVBAAAAAElFTkSuQmCC")}
            .nav-brand:hover, .nav-brand:visited, .nav-brand:active, .nav-brand_mod:hover, .nav-brand_mod:visited, .nav-brand_mod:active {text-decoration:none;color:#fff;}
            .onstream .AD_title{height:45px;padding:7px 0}
            .AD_title {position:absolute; top:0; right:10px; height:63px; padding:16px 0; font-size:11px; font-style:italic; color:#999; z-index:1500;user-select:none;}
            .icon_star{position:absolute !important;top:10px; right:25px; z-index:10;}
            .icon_pushpin{position:absolute !important;top:10px; right:10px; z-index:50;}
            #ADD_config {cursor:pointer; padding-right:10px;}
            #ADD_test_button {cursor:pointer;position:absolute;right:-100px;}
            #popup_ADD_test{ top:50px; right:-90px; }
            #popup_ADD_config, #popup_ADD_quick, #popup_ADD_test {display:none; font-size:12px; z-index:10000; position:absolute; width:502px;}
            #popup_ADD_config table td:nth-child(1){width:160px;}
            #popup_ADD_config table td:nth-child(2){/*width:310px;*/}
            #popup_ADD_config{ top:50px; right:10px; }
            #popup_ADD_config .input_text_by_tag { display:none; }
            #popup_ADD_config  .no_border {border:none;}
            #ADD_change_multi {opacity:0; display:inline-block}/*{ display:none; }*/
            /*.onstream #ADD_change_multi { opacity:1; display:inline-block !important;}*/
            #ADD_quick_list {opacity:0; display:inline-block}/*{ display:none; }*/
            /*.onstream #ADD_quick_list { opacity:1; display:inline-block !important;}*/
            #popup_ADD_quick .modal-body{ padding:10px; }
            #popup_ADD_quick { top:50px; right:10px; }
            #popup_ADD_quick .quick_list_title { padding:0 5px 2px 5px; margin-bottom:0px; border-bottom:2px solid rgb(221, 221, 221); font-weight:bold;}
            #popup_ADD_quick ul { list-style:none; margin:0;padding:0;display:block;font-size:11px;}
            #popup_ADD_quick li { border-bottom:1px solid #eee; display:block;}
            #popup_ADD_quick a { padding:5px 5px 5px 5px; display:block;color:#333;text-decoration:none;}
            #popup_ADD_quick li>a:hover { background-color:#d3d3d3;}
            #popup_ADD_quick img { float:left;display:block;width:60px;height:30px;vertical-align:middle;border:0; margin-right:10px;}
            #popup_ADD_quick .title {overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding-right:40px;color:#222}
            #popup_ADD_quick .info {}
            #popup_ADD_quick .from {float:left;color:#666;}
            #popup_ADD_quick .viewers { text-align: right; color: #7d7d7b;}
            #popup_ADD_quick .ADD_checkbox {display:none;}
            #popup_ADD_quick .ADD_li_box {right:45px;top:-27px;height:10px;font-size:10px;}
            #popup_ADD_quick .ADD_li_box .btn {font-size:9px;padding:1px 2px;letter-spacing:-0.5px; border:0; opacity:0.7;border-radius:0px;}
            #popup_ADD_quick .icon_star{top:7px; right:15px; z-index:10;}
            #popup_ADD_quick .icon_pushpin{top:7px; right:5px; z-index:50;}
            #popup_ADD_quick .ADD_thumb_elem{left:70px;}
            #popup_ADD_quick .ADD_thumb_elem{width:290px; height:163px; !important;}
            .modal-content {box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);background-clip: padding-box;background-color: #fff;border: 1px solid rgba(0, 0, 0, 0.2);border-radius: 6px;outline: 0 none;}
            .modal-content {opacity:0.93}
            .modal-body {padding: 10px 10px 5px 10px;}
            .modal-footer {border-top: 1px solid #e5e5e5;padding: 10px 15px;text-align: right;}
            #ADD_config_Success {font-size:11px;}
            .btn {font-size: 12px;}
            .main-streams>ul>li>a{padding: 10px 5px 10px 15px !important;}
            .ADD_li_box_container{position:relative;}
            .ADD_li_box{position:absolute; top:-42px; right:70px; height:30px; vertical-align:middle; text-align:center; font-size:12px; z-index:100; margin:0;}
            .ADD_li_box:before{content: "";display:inline-block;vertical-align: middle;height: 100%;}
            #popup_ADD_quick .ADD_checkbox_container{display:none;}
            #popup_ADD_quick .multitwitch_button btn:hover{background:none;}
            .ADD_checkbox_container{display:inline-block;line-height:100%;vertical-align:middle; }
            .ADD_checkbox{display:none;width:15px;height:15px;margin:1px 2px 1px 0 !important;border:none !important;}
            .ADD_li_box .btn-default{color:#7d7d7d}
            .ADD_checkbox_container .btn span.glyphicon {opacity: 0.2;}
            .ADD_checkbox_container .btn.active span.glyphicon {opacity: 1; color:#9B59B6}
            .multitwitch_button{vertical-align:middle;display:inline-block;} //background-color:#eee; padding:5px 8px; height:26px;
            .form_disabled {color:#888;}
            .form_enabled {color:#222;}
            #popup_ADD_config table td {height:26px; line-height: 1.5; font-size:11px; padding:2px 5px 2px 10px; vertical-align:middle; border-top-color:#e5e5e5;}
            #popup_ADD_config table td label{vertical-align:middle;}
            #popup_ADD_config table td input[type="text"]{font-size:11px;}
            #popup_ADD_config table td input[type="checkbox"]{vertical-align:middle; margin-bottom:0; margin-top:0;}
            #popup_ADD_config table td input[type="radio"]{vertical-align:middle; margin-bottom:0; margin-top:0;}
            #popup_ADD_config table td .tooltip_container{float:right;}
            .btn-success {margin-right: 10px;}
            .btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active, .open .dropdown-toggle.btn-success {background-color: #5cb85c;border-color: #4cae4c;color: #fff;cursor: Default;margin-right: 10px;}
            .confirm_selection {animation: glow .5s infinite alternate;}
            @keyframes glow {to {text-shadow: 0 0 10px white;box-shadow: 0 0 10px #5cb85c;}}
           .multitwitch_ready {animation: glow2 0.5s 4 alternate;}
            @keyframes glow2 {to {text-shadow: 0 0 10px white;box-shadow: 0 0 10px #6441A4;}}
            .fixed_streamer{background-color:#f5f5f5;}
            .td_strong{font-weight:bold;}

            #history_elem{color:#666;position:relative;top:0px;left:0px;height:63px;padding-top:5px;text-align:left; margin-right:170px; vertical-align:middle;z-index:800;}
            .onstream #history_elem {height:45px;}
            #history_elem:before{content: "";display:inline-block;vertical-align: middle;height: 100%;}
            .h_container:before{content: "";position:absolute;top:0;right:-5px; background-image: linear-gradient(to right, rgba(255,255,255,0) 0px, rgba(255,255,255,1) 40px); width:50px;height:57px;pointer-events: none;margin:3px 0;}
            .onstream .h_container:before{height:39px;}
            #history_elem a{color:#555;font-size:12px;height:20px;display:inline-block;text-transform:capitalize}
            #history_elem a:hover{color:#000;}
            #history_elem .h_text_container{display:inline-block}
            #history_elem .h_container{vertical-align:middle;display:inline-block;width:100%;white-space: nowrap;overflow: hidden;}
            #history_elem .h_icon{display:inline-block;width:16px;height:16px;margin:2px 4px 5px 0px;background-position:0px 0px;background-repeat:no-repeat;vertical-align:middle;user-select: none;}
            #history_elem .h_twitch{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTgtMTItMjBUMTg6NTg6NDArMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOC0xMi0yMFQyMDowMzoxNiswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTgtMTItMjBUMjA6MDM6MTYrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6M2MwM2JhMDYtNTg0Zi0wYjRmLWExMWItZmQ4ODJmNzVmZTA4PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6ZGExZjkzMWYtMDQ0Ni0xMWU5LTgwZDktYWUxYWExNjI1N2EyPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6YTliYjRkYmEtMzNiZC02YzQ2LThhMjMtYWY4YTk2YzA1NzBiPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmE5YmI0ZGJhLTMzYmQtNmM0Ni04YTIzLWFmOGE5NmMwNTcwYjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOC0xMi0yMFQxODo1ODo0MCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozYzAzYmEwNi01ODRmLTBiNGYtYTExYi1mZDg4MmY3NWZlMDg8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTItMjBUMjA6MDM6MTYrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTY8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTY8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PnZYmwsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAltJREFUeNqU0r9rFFEQB/AvaFpTWgTBv8DGSrCSNDaCZvfN7iUSL/YxFnaWimBl46/bN7u3FxQR9PxdKLnc7czu3uVSBCIodrESC4tgY4w8i7scavBXMcW8eXz4vuHh2eT6IRvIZxuIY9L/rQ2kXvm0Vuk4NrrBJItM8pBJmkzaZJJm4i83f+yZ5D6TPh4CXxAFshmTOmvUWqNgysAksCZDFChq0yuDfnjOJGBf9zLpFpM6MOkmD4HIF1iTIzKrsJ4cvDVTHr46/wG1oDtuTfuIDXScScG+jjHp192Ap4hMjogKMGmPSV2t0t3DpHODyNk8m+xvgCAigSXtM6ljrzPGJGeZcseULfwDoIhIwaQrTOos6RBQx5Sd+yNQ8xQcKNKZHHGgfWvUWaOjBBFlC5Hp7AC7l8ikuH5ScHmygxun9GI91HZEOdiUR5n0TerpsfqUwv4WMIqaJ7g02ca1E4o0FESBIPZLsC+44+doTAmsL6eH/2Dr5x0YRRIqGtMFbFDirv8IDfMSEXXBpLAksH5WZVLHRlxMxZURwKQfmbTNpKuWyncJtfbf8x9MxJS9tlSsMWnOpF1L6iyJS73ifN30ADb5JpvcjYrUWSq2U/PqQkKdt5bK0czSYF43RWXR6yExPSAO5UkcSj+uZM/jMNNBGnFM+Tab3MUk74d32nEoawnlx1NTouH1UDc9IDnTQr06KA47B9joNyZ1MYmzVK7XKsW+pLqEeG4J6ek2UlMg9btoeN0dYBnJ7DI46MB6MsGknwbPyF/cDPu4PV2iPttCXG0hnemg/gvwfQASrjdph/qqHwAAAABJRU5ErkJggg==);}
            #history_elem .h_afreeca{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAC4jAAAuIwF4pT92AAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAX2NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOmNycz0iaHR0cDovL25zLmFkb2JlLmNvbS9jYW1lcmEtcmF3LXNldHRpbmdzLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6YjhmOGZmZTgtMDQzYi0xMWU5LTgwZDktYWUxYWExNjI1N2EyPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gaW1hZ2UvanBlZyB0byBpbWFnZS90aWZmPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpiOGViZWFjMi1jZTkyLTQzNGUtYTZlNi1jM2VlNjZkYzVkMDI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTItMjBUMTg6NDM6MTgrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDYW1lcmEgUmF3IDkuOSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjRmMWRkNzI1LWFlNmQtOTY0Mi1iOTQxLWI4MjZiMjc2YzZiMTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOC0xMi0yMFQxODo0Mzo1MSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gaW1hZ2UvdGlmZiB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGltYWdlL3RpZmYgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDowN2FlNTBhZC02NzQ1LTU1NGYtYjIyNi01ODVkNTMyNDlmMDI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTItMjBUMTg6NDM6NTErMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPjg5QUU5RjFDRkRBQUUxNEI3NzQzRDE0QThCMjQ4NjdDPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6NGYxZGQ3MjUtYWU2ZC05NjQyLWI5NDEtYjgyNmIyNzZjNmIxPC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOmI4ZWJlYWMyLWNlOTItNDM0ZS1hNmU2LWMzZWU2NmRjNWQwMjwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD44OUFFOUYxQ0ZEQUFFMTRCNzc0M0QxNEE4QjI0ODY3Qzwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjA3YWU1MGFkLTY3NDUtNTU0Zi1iMjI2LTU4NWQ1MzI0OWYwMjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPGNyczpSYXdGaWxlTmFtZT4yNDZ4MHcuanBnPC9jcnM6UmF3RmlsZU5hbWU+CiAgICAgICAgIDxjcnM6VmVyc2lvbj45Ljk8L2NyczpWZXJzaW9uPgogICAgICAgICA8Y3JzOlByb2Nlc3NWZXJzaW9uPjYuNzwvY3JzOlByb2Nlc3NWZXJzaW9uPgogICAgICAgICA8Y3JzOldoaXRlQmFsYW5jZT5BcyBTaG90PC9jcnM6V2hpdGVCYWxhbmNlPgogICAgICAgICA8Y3JzOkF1dG9XaGl0ZVZlcnNpb24+MTM0MzQ4ODAwPC9jcnM6QXV0b1doaXRlVmVyc2lvbj4KICAgICAgICAgPGNyczpJbmNyZW1lbnRhbFRlbXBlcmF0dXJlPjA8L2NyczpJbmNyZW1lbnRhbFRlbXBlcmF0dXJlPgogICAgICAgICA8Y3JzOkluY3JlbWVudGFsVGludD4wPC9jcnM6SW5jcmVtZW50YWxUaW50PgogICAgICAgICA8Y3JzOlNhdHVyYXRpb24+MDwvY3JzOlNhdHVyYXRpb24+CiAgICAgICAgIDxjcnM6U2hhcnBuZXNzPjA8L2NyczpTaGFycG5lc3M+CiAgICAgICAgIDxjcnM6THVtaW5hbmNlU21vb3RoaW5nPjA8L2NyczpMdW1pbmFuY2VTbW9vdGhpbmc+CiAgICAgICAgIDxjcnM6Q29sb3JOb2lzZVJlZHVjdGlvbj4wPC9jcnM6Q29sb3JOb2lzZVJlZHVjdGlvbj4KICAgICAgICAgPGNyczpWaWduZXR0ZUFtb3VudD4wPC9jcnM6VmlnbmV0dGVBbW91bnQ+CiAgICAgICAgIDxjcnM6U2hhZG93VGludD4wPC9jcnM6U2hhZG93VGludD4KICAgICAgICAgPGNyczpSZWRIdWU+MDwvY3JzOlJlZEh1ZT4KICAgICAgICAgPGNyczpSZWRTYXR1cmF0aW9uPjA8L2NyczpSZWRTYXR1cmF0aW9uPgogICAgICAgICA8Y3JzOkdyZWVuSHVlPjA8L2NyczpHcmVlbkh1ZT4KICAgICAgICAgPGNyczpHcmVlblNhdHVyYXRpb24+MDwvY3JzOkdyZWVuU2F0dXJhdGlvbj4KICAgICAgICAgPGNyczpCbHVlSHVlPjA8L2NyczpCbHVlSHVlPgogICAgICAgICA8Y3JzOkJsdWVTYXR1cmF0aW9uPjA8L2NyczpCbHVlU2F0dXJhdGlvbj4KICAgICAgICAgPGNyczpWaWJyYW5jZT4wPC9jcnM6VmlicmFuY2U+CiAgICAgICAgIDxjcnM6SHVlQWRqdXN0bWVudFJlZD4wPC9jcnM6SHVlQWRqdXN0bWVudFJlZD4KICAgICAgICAgPGNyczpIdWVBZGp1c3RtZW50T3JhbmdlPjA8L2NyczpIdWVBZGp1c3RtZW50T3JhbmdlPgogICAgICAgICA8Y3JzOkh1ZUFkanVzdG1lbnRZZWxsb3c+MDwvY3JzOkh1ZUFkanVzdG1lbnRZZWxsb3c+CiAgICAgICAgIDxjcnM6SHVlQWRqdXN0bWVudEdyZWVuPjA8L2NyczpIdWVBZGp1c3RtZW50R3JlZW4+CiAgICAgICAgIDxjcnM6SHVlQWRqdXN0bWVudEFxdWE+MDwvY3JzOkh1ZUFkanVzdG1lbnRBcXVhPgogICAgICAgICA8Y3JzOkh1ZUFkanVzdG1lbnRCbHVlPjA8L2NyczpIdWVBZGp1c3RtZW50Qmx1ZT4KICAgICAgICAgPGNyczpIdWVBZGp1c3RtZW50UHVycGxlPjA8L2NyczpIdWVBZGp1c3RtZW50UHVycGxlPgogICAgICAgICA8Y3JzOkh1ZUFkanVzdG1lbnRNYWdlbnRhPjA8L2NyczpIdWVBZGp1c3RtZW50TWFnZW50YT4KICAgICAgICAgPGNyczpTYXR1cmF0aW9uQWRqdXN0bWVudFJlZD4wPC9jcnM6U2F0dXJhdGlvbkFkanVzdG1lbnRSZWQ+CiAgICAgICAgIDxjcnM6U2F0dXJhdGlvbkFkanVzdG1lbnRPcmFuZ2U+MDwvY3JzOlNhdHVyYXRpb25BZGp1c3RtZW50T3JhbmdlPgogICAgICAgICA8Y3JzOlNhdHVyYXRpb25BZGp1c3RtZW50WWVsbG93PjA8L2NyczpTYXR1cmF0aW9uQWRqdXN0bWVudFllbGxvdz4KICAgICAgICAgPGNyczpTYXR1cmF0aW9uQWRqdXN0bWVudEdyZWVuPjA8L2NyczpTYXR1cmF0aW9uQWRqdXN0bWVudEdyZWVuPgogICAgICAgICA8Y3JzOlNhdHVyYXRpb25BZGp1c3RtZW50QXF1YT4wPC9jcnM6U2F0dXJhdGlvbkFkanVzdG1lbnRBcXVhPgogICAgICAgICA8Y3JzOlNhdHVyYXRpb25BZGp1c3RtZW50Qmx1ZT4wPC9jcnM6U2F0dXJhdGlvbkFkanVzdG1lbnRCbHVlPgogICAgICAgICA8Y3JzOlNhdHVyYXRpb25BZGp1c3RtZW50UHVycGxlPjA8L2NyczpTYXR1cmF0aW9uQWRqdXN0bWVudFB1cnBsZT4KICAgICAgICAgPGNyczpTYXR1cmF0aW9uQWRqdXN0bWVudE1hZ2VudGE+MDwvY3JzOlNhdHVyYXRpb25BZGp1c3RtZW50TWFnZW50YT4KICAgICAgICAgPGNyczpMdW1pbmFuY2VBZGp1c3RtZW50UmVkPjA8L2NyczpMdW1pbmFuY2VBZGp1c3RtZW50UmVkPgogICAgICAgICA8Y3JzOkx1bWluYW5jZUFkanVzdG1lbnRPcmFuZ2U+MDwvY3JzOkx1bWluYW5jZUFkanVzdG1lbnRPcmFuZ2U+CiAgICAgICAgIDxjcnM6THVtaW5hbmNlQWRqdXN0bWVudFllbGxvdz4wPC9jcnM6THVtaW5hbmNlQWRqdXN0bWVudFllbGxvdz4KICAgICAgICAgPGNyczpMdW1pbmFuY2VBZGp1c3RtZW50R3JlZW4+MDwvY3JzOkx1bWluYW5jZUFkanVzdG1lbnRHcmVlbj4KICAgICAgICAgPGNyczpMdW1pbmFuY2VBZGp1c3RtZW50QXF1YT4wPC9jcnM6THVtaW5hbmNlQWRqdXN0bWVudEFxdWE+CiAgICAgICAgIDxjcnM6THVtaW5hbmNlQWRqdXN0bWVudEJsdWU+MDwvY3JzOkx1bWluYW5jZUFkanVzdG1lbnRCbHVlPgogICAgICAgICA8Y3JzOkx1bWluYW5jZUFkanVzdG1lbnRQdXJwbGU+MDwvY3JzOkx1bWluYW5jZUFkanVzdG1lbnRQdXJwbGU+CiAgICAgICAgIDxjcnM6THVtaW5hbmNlQWRqdXN0bWVudE1hZ2VudGE+MDwvY3JzOkx1bWluYW5jZUFkanVzdG1lbnRNYWdlbnRhPgogICAgICAgICA8Y3JzOlNwbGl0VG9uaW5nU2hhZG93SHVlPjA8L2NyczpTcGxpdFRvbmluZ1NoYWRvd0h1ZT4KICAgICAgICAgPGNyczpTcGxpdFRvbmluZ1NoYWRvd1NhdHVyYXRpb24+MDwvY3JzOlNwbGl0VG9uaW5nU2hhZG93U2F0dXJhdGlvbj4KICAgICAgICAgPGNyczpTcGxpdFRvbmluZ0hpZ2hsaWdodEh1ZT4wPC9jcnM6U3BsaXRUb25pbmdIaWdobGlnaHRIdWU+CiAgICAgICAgIDxjcnM6U3BsaXRUb25pbmdIaWdobGlnaHRTYXR1cmF0aW9uPjA8L2NyczpTcGxpdFRvbmluZ0hpZ2hsaWdodFNhdHVyYXRpb24+CiAgICAgICAgIDxjcnM6U3BsaXRUb25pbmdCYWxhbmNlPjA8L2NyczpTcGxpdFRvbmluZ0JhbGFuY2U+CiAgICAgICAgIDxjcnM6UGFyYW1ldHJpY1NoYWRvd3M+MDwvY3JzOlBhcmFtZXRyaWNTaGFkb3dzPgogICAgICAgICA8Y3JzOlBhcmFtZXRyaWNEYXJrcz4wPC9jcnM6UGFyYW1ldHJpY0RhcmtzPgogICAgICAgICA8Y3JzOlBhcmFtZXRyaWNMaWdodHM+MDwvY3JzOlBhcmFtZXRyaWNMaWdodHM+CiAgICAgICAgIDxjcnM6UGFyYW1ldHJpY0hpZ2hsaWdodHM+MDwvY3JzOlBhcmFtZXRyaWNIaWdobGlnaHRzPgogICAgICAgICA8Y3JzOlBhcmFtZXRyaWNTaGFkb3dTcGxpdD4yNTwvY3JzOlBhcmFtZXRyaWNTaGFkb3dTcGxpdD4KICAgICAgICAgPGNyczpQYXJhbWV0cmljTWlkdG9uZVNwbGl0PjUwPC9jcnM6UGFyYW1ldHJpY01pZHRvbmVTcGxpdD4KICAgICAgICAgPGNyczpQYXJhbWV0cmljSGlnaGxpZ2h0U3BsaXQ+NzU8L2NyczpQYXJhbWV0cmljSGlnaGxpZ2h0U3BsaXQ+CiAgICAgICAgIDxjcnM6U2hhcnBlblJhZGl1cz4rMS4wPC9jcnM6U2hhcnBlblJhZGl1cz4KICAgICAgICAgPGNyczpTaGFycGVuRGV0YWlsPjI1PC9jcnM6U2hhcnBlbkRldGFpbD4KICAgICAgICAgPGNyczpTaGFycGVuRWRnZU1hc2tpbmc+MDwvY3JzOlNoYXJwZW5FZGdlTWFza2luZz4KICAgICAgICAgPGNyczpQb3N0Q3JvcFZpZ25ldHRlQW1vdW50PjA8L2NyczpQb3N0Q3JvcFZpZ25ldHRlQW1vdW50PgogICAgICAgICA8Y3JzOkdyYWluQW1vdW50PjA8L2NyczpHcmFpbkFtb3VudD4KICAgICAgICAgPGNyczpMZW5zUHJvZmlsZUVuYWJsZT4wPC9jcnM6TGVuc1Byb2ZpbGVFbmFibGU+CiAgICAgICAgIDxjcnM6TGVuc01hbnVhbERpc3RvcnRpb25BbW91bnQ+MDwvY3JzOkxlbnNNYW51YWxEaXN0b3J0aW9uQW1vdW50PgogICAgICAgICA8Y3JzOlBlcnNwZWN0aXZlVmVydGljYWw+MDwvY3JzOlBlcnNwZWN0aXZlVmVydGljYWw+CiAgICAgICAgIDxjcnM6UGVyc3BlY3RpdmVIb3Jpem9udGFsPjA8L2NyczpQZXJzcGVjdGl2ZUhvcml6b250YWw+CiAgICAgICAgIDxjcnM6UGVyc3BlY3RpdmVSb3RhdGU+MC4wPC9jcnM6UGVyc3BlY3RpdmVSb3RhdGU+CiAgICAgICAgIDxjcnM6UGVyc3BlY3RpdmVTY2FsZT4xMDA8L2NyczpQZXJzcGVjdGl2ZVNjYWxlPgogICAgICAgICA8Y3JzOlBlcnNwZWN0aXZlQXNwZWN0PjA8L2NyczpQZXJzcGVjdGl2ZUFzcGVjdD4KICAgICAgICAgPGNyczpQZXJzcGVjdGl2ZVVwcmlnaHQ+MDwvY3JzOlBlcnNwZWN0aXZlVXByaWdodD4KICAgICAgICAgPGNyczpQZXJzcGVjdGl2ZVg+MC4wMDwvY3JzOlBlcnNwZWN0aXZlWD4KICAgICAgICAgPGNyczpQZXJzcGVjdGl2ZVk+MC4wMDwvY3JzOlBlcnNwZWN0aXZlWT4KICAgICAgICAgPGNyczpBdXRvTGF0ZXJhbENBPjA8L2NyczpBdXRvTGF0ZXJhbENBPgogICAgICAgICA8Y3JzOkV4cG9zdXJlMjAxMj4wLjAwPC9jcnM6RXhwb3N1cmUyMDEyPgogICAgICAgICA8Y3JzOkNvbnRyYXN0MjAxMj4wPC9jcnM6Q29udHJhc3QyMDEyPgogICAgICAgICA8Y3JzOkhpZ2hsaWdodHMyMDEyPjA8L2NyczpIaWdobGlnaHRzMjAxMj4KICAgICAgICAgPGNyczpTaGFkb3dzMjAxMj4wPC9jcnM6U2hhZG93czIwMTI+CiAgICAgICAgIDxjcnM6V2hpdGVzMjAxMj4wPC9jcnM6V2hpdGVzMjAxMj4KICAgICAgICAgPGNyczpCbGFja3MyMDEyPjA8L2NyczpCbGFja3MyMDEyPgogICAgICAgICA8Y3JzOkNsYXJpdHkyMDEyPjA8L2NyczpDbGFyaXR5MjAxMj4KICAgICAgICAgPGNyczpEZWZyaW5nZVB1cnBsZUFtb3VudD4wPC9jcnM6RGVmcmluZ2VQdXJwbGVBbW91bnQ+CiAgICAgICAgIDxjcnM6RGVmcmluZ2VQdXJwbGVIdWVMbz4zMDwvY3JzOkRlZnJpbmdlUHVycGxlSHVlTG8+CiAgICAgICAgIDxjcnM6RGVmcmluZ2VQdXJwbGVIdWVIaT43MDwvY3JzOkRlZnJpbmdlUHVycGxlSHVlSGk+CiAgICAgICAgIDxjcnM6RGVmcmluZ2VHcmVlbkFtb3VudD4wPC9jcnM6RGVmcmluZ2VHcmVlbkFtb3VudD4KICAgICAgICAgPGNyczpEZWZyaW5nZUdyZWVuSHVlTG8+NDA8L2NyczpEZWZyaW5nZUdyZWVuSHVlTG8+CiAgICAgICAgIDxjcnM6RGVmcmluZ2VHcmVlbkh1ZUhpPjYwPC9jcnM6RGVmcmluZ2VHcmVlbkh1ZUhpPgogICAgICAgICA8Y3JzOkRlaGF6ZT4wPC9jcnM6RGVoYXplPgogICAgICAgICA8Y3JzOlRvbmVNYXBTdHJlbmd0aD4wPC9jcnM6VG9uZU1hcFN0cmVuZ3RoPgogICAgICAgICA8Y3JzOkNvbnZlcnRUb0dyYXlzY2FsZT5GYWxzZTwvY3JzOkNvbnZlcnRUb0dyYXlzY2FsZT4KICAgICAgICAgPGNyczpUb25lQ3VydmVOYW1lPkxpbmVhcjwvY3JzOlRvbmVDdXJ2ZU5hbWU+CiAgICAgICAgIDxjcnM6VG9uZUN1cnZlPgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaT4wLCAwPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+MjU1LCAyNTU8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L2NyczpUb25lQ3VydmU+CiAgICAgICAgIDxjcnM6VG9uZUN1cnZlUmVkPgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaT4wLCAwPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+MjU1LCAyNTU8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L2NyczpUb25lQ3VydmVSZWQ+CiAgICAgICAgIDxjcnM6VG9uZUN1cnZlR3JlZW4+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpPjAsIDA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT4yNTUsIDI1NTwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwvY3JzOlRvbmVDdXJ2ZUdyZWVuPgogICAgICAgICA8Y3JzOlRvbmVDdXJ2ZUJsdWU+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpPjAsIDA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT4yNTUsIDI1NTwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwvY3JzOlRvbmVDdXJ2ZUJsdWU+CiAgICAgICAgIDxjcnM6VG9uZUN1cnZlTmFtZTIwMTI+TGluZWFyPC9jcnM6VG9uZUN1cnZlTmFtZTIwMTI+CiAgICAgICAgIDxjcnM6VG9uZUN1cnZlUFYyMDEyPgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaT4wLCAwPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+MjU1LCAyNTU8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L2NyczpUb25lQ3VydmVQVjIwMTI+CiAgICAgICAgIDxjcnM6VG9uZUN1cnZlUFYyMDEyUmVkPgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaT4wLCAwPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+MjU1LCAyNTU8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L2NyczpUb25lQ3VydmVQVjIwMTJSZWQ+CiAgICAgICAgIDxjcnM6VG9uZUN1cnZlUFYyMDEyR3JlZW4+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpPjAsIDA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT4yNTUsIDI1NTwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwvY3JzOlRvbmVDdXJ2ZVBWMjAxMkdyZWVuPgogICAgICAgICA8Y3JzOlRvbmVDdXJ2ZVBWMjAxMkJsdWU+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpPjAsIDA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT4yNTUsIDI1NTwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwvY3JzOlRvbmVDdXJ2ZVBWMjAxMkJsdWU+CiAgICAgICAgIDxjcnM6Q2FtZXJhUHJvZmlsZT5FbWJlZGRlZDwvY3JzOkNhbWVyYVByb2ZpbGU+CiAgICAgICAgIDxjcnM6Q2FtZXJhUHJvZmlsZURpZ2VzdD41NDY1MEEzNDFCNUI1Q0NBRTg0NDJEMEI0M0E5MkJDRTwvY3JzOkNhbWVyYVByb2ZpbGVEaWdlc3Q+CiAgICAgICAgIDxjcnM6TGVuc1Byb2ZpbGVTZXR1cD5MZW5zRGVmYXVsdHM8L2NyczpMZW5zUHJvZmlsZVNldHVwPgogICAgICAgICA8Y3JzOlVwcmlnaHRWZXJzaW9uPjE1MTM4ODE2MDwvY3JzOlVwcmlnaHRWZXJzaW9uPgogICAgICAgICA8Y3JzOlVwcmlnaHRDZW50ZXJNb2RlPjA8L2NyczpVcHJpZ2h0Q2VudGVyTW9kZT4KICAgICAgICAgPGNyczpVcHJpZ2h0Q2VudGVyTm9ybVg+MC41PC9jcnM6VXByaWdodENlbnRlck5vcm1YPgogICAgICAgICA8Y3JzOlVwcmlnaHRDZW50ZXJOb3JtWT4wLjU8L2NyczpVcHJpZ2h0Q2VudGVyTm9ybVk+CiAgICAgICAgIDxjcnM6VXByaWdodEZvY2FsTW9kZT4wPC9jcnM6VXByaWdodEZvY2FsTW9kZT4KICAgICAgICAgPGNyczpVcHJpZ2h0Rm9jYWxMZW5ndGgzNW1tPjM1PC9jcnM6VXByaWdodEZvY2FsTGVuZ3RoMzVtbT4KICAgICAgICAgPGNyczpVcHJpZ2h0UHJldmlldz5GYWxzZTwvY3JzOlVwcmlnaHRQcmV2aWV3PgogICAgICAgICA8Y3JzOlVwcmlnaHRUcmFuc2Zvcm1Db3VudD42PC9jcnM6VXByaWdodFRyYW5zZm9ybUNvdW50PgogICAgICAgICA8Y3JzOlVwcmlnaHRGb3VyU2VnbWVudHNDb3VudD4wPC9jcnM6VXByaWdodEZvdXJTZWdtZW50c0NvdW50PgogICAgICAgICA8Y3JzOkhhc1NldHRpbmdzPlRydWU8L2NyczpIYXNTZXR0aW5ncz4KICAgICAgICAgPGNyczpIYXNDcm9wPkZhbHNlPC9jcnM6SGFzQ3JvcD4KICAgICAgICAgPGNyczpBbHJlYWR5QXBwbGllZD5UcnVlPC9jcnM6QWxyZWFkeUFwcGxpZWQ+CiAgICAgICAgIDx4bXA6UmF0aW5nPjA8L3htcDpSYXRpbmc+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTgtMTItMjBUMTg6NDM6NTErMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE4LTEyLTIwVDE4OjQzOjUxKzA5OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTgtMTItMjBUMTg6NDI6NTQrMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOklDQ1Byb2ZpbGU+QWRvYmUgUkdCICgxOTk4KTwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjMwMDAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjMwMDAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkV4aWZWZXJzaW9uPjAyMjE8L2V4aWY6RXhpZlZlcnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjE2PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjE2PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7imCzsAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAAOPSURBVHjaTNJ9UNMFHMfx7z8d13Vpl8EFYQoDJEAYbczjwTaQId1Bx+PQYeMsmSmh7KQgYMCF0ZEg+HAGAounjT1QILCNAn6BCirEvGNZCGwGOKQTEZd4XMl9+qNu8sfn39d9/ngTAJpatdPtuTW6PfWc7lg3qN344M2vG00uPzD3qOo7M00vLNI+Sd83J09fP/izaZl0A/PUprcQACIAZHm6RkPmh6QxLtLdxQ2q7bAkcxI7ZjQ/WqlW8zvJyofKPQXtaOieizcvbJDh5iPqn1h9Acyvr5PxFxvlnRmj+s4FMowu0dHiG2liGSP/qOhadmJW/2FN3xxdMz+hM013yDBmo/lneAE8xHMauf+EMmomnQVZ1z+JPmRsEp1gzvKSu8whKVcsSdn91R9k/nQ5TtInPZLPOI9O/Un3/toETK48o0v1JmlqwEWwuQ14KUIN9zAVXN/tgWtwD9x4SrjzVfBN02OLbz1yy0Zlts0PTGcHQyYCyuwIrAJ4FZAK6rAlWo89Gd9iT8YlbA9W4WD9XXy1AkiHgN3ivn+Kq8f5DmA5Ty8Z8yvAXs9gNAakw8JqRVSpHKU2b5QteGF/oQzpSiCuoBqhCak4PmJH6c21LAfwOEVZOBiUD3IhZHkL8IdXJxIUR1AwHYii34JwoFYEiQ7gxSXhFSKcGFlBhQ1fOoD7wspKO+c0bJwSgF2M42w13u9JQ4GZgy8mOTik2A9R3WMUzvyNXJMdBxqtiMlmzjuAj8W6qqrQC2DCzuEUvwFOPAZpdVKUWvxRYvFHcvWHCBaN4/D3i4jOG8dbbAWCIpUXHUCgxFjyckwntsZ24fX4brwa2ApXrhZc8WVwxXVwC9XBybMRHiHN2BHSDJ9oLd5L761wAJ+WjWW+vVcFZ14bxLJBGIatSD42CM+IXniG9yLpGAPDkBWSzxg489qwk98O0cnhXAeQX3NLyIpUY5dQB7cwJaRFV6HWz0DRMQVFxxTU+lkclV+FW5gSvjE67OSr8HnljQQH0NQ76xKS2PXra+wm+Md2YBu3BU7vKOAhUMND0A4nPwW2cVvgF6vFG9wWBMd3zpxrnXZ3AEvroGbDPHeXUPPIK0oNVqQaPkItfKI1/02oBStSDe99GrCilKu12unwB/ZNJc4sg27NPiX5edN2ce5ASmoOkxOZbiwPF3XXRKT11PDFV8pTcgZkmfLx1FMVwzuYiUVa+h/4dwAkdl1n/FtmhQAAAABJRU5ErkJggg==);}
            #history_elem .h_youtube{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTgtMTItMjBUMTg6NDE6MzcrMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOC0xMi0yMFQxODo0MjoxNSswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTgtMTItMjBUMTg6NDI6MTUrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6YmYwNmRjNTUtNGM2Mi02ODQ5LThjNTYtNDZmNWU2ZDEzNzVkPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6ODE4ZjQ4NDAtMDQzYi0xMWU5LTgwZDktYWUxYWExNjI1N2EyPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Zjg4YjMwZDMtMjVmOC02NjQwLTk2MzUtNzlhYWI4ODBmM2M2PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmY4OGIzMGQzLTI1ZjgtNjY0MC05NjM1LTc5YWFiODgwZjNjNjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOC0xMi0yMFQxODo0MTozNyswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpiZjA2ZGM1NS00YzYyLTY4NDktOGM1Ni00NmY1ZTZkMTM3NWQ8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTItMjBUMTg6NDI6MTUrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTY8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTY8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PrHtih0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAcpJREFUeNqs009rE0EYx/EngggK0ip28sfZzexmd9puFgqeQt+AeK9/XoKgvoHiUXpQEUmL11701rfQjQndZku2NaWhpdGt2bqglVYSBE/y8+Cm7upFjAMfBub58tyGANAoaOQFh5ZJh2VZiWx5P7Llw8iWC5Etn0a2rEa2fBGrxm8LcfPgQ1nOhpZJFFrmXGiZCC0Tvb+U6O9QMGV4wZSBX0wElkSXXcY7tYCgPIn0PMWnfVk62JclJHXNEt7fuI69kkAnQ+gaGrrTMt38vEPaNfSjXUPHKV1g+9xZfF1v4luvh7e3bmLrTAadS2PYm55EqjX0Y9rRtZMdXcMpUcRmhvBlZQXDMwgCdGYr2B4fQ6rVtT61hXbSFhqG3qhFeEQYrK4CAL73+/hYXUR7ZgZbVyaQbNtCG5Cvik++KjDU4iqa5y/g88tXOFpeRitfQIMILZbFpl5CsvVVcUweLx54vIikDc1Ak+VRJ4J7cRwbQoenpJtYSG5B9dyCit+tTeTh5hW4V/+cJfjUyClzjZyCf3Sb6jmFall+rcb4XYfxeYfxRw7jjx3GnzmMLzqMLzmMP3cYfxLP5muM33ud5ZV6TvkPn2nUBT8GAIcnSAUTj83WAAAAAElFTkSuQmCC);}
            #history_elem .h_kakao{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABmElEQVQ4jaWTu0oDURCG/zm7WVfRQvDaeEFIEDQQJYUIYmwES19BjekUfA2x0sj6BDZ23roFLdUERBQbxUAwCKvNErOXc46FRDeJGwIOTHFgvv+f4cxASolgCicX9631Pa8YfXALEe4WItwrRu99K7MrnHy8vv73Icq6b63tuy/E3RfIv5O4b6WzUpT1KkffKp+6/7Z4Kp3LFFoIapsz1b7zJVB7hQEA/9jYaRUGAOlcpPjH5g4AkHDycb80lQck+3GITADqMOTnSbM+hDqQSzBhG+kgDACkjkHtPYbScwRShsL6YMI20kxWzIUwD9axDHXwDqxrC6BIo0TFXGCSP8eaDsy6oHRvQ+2/BrXN1ArwpxgLwRqClEGQMtyoT8rIY3OUQ9gGvNdxiPJhnejoIyM9ZYah0r2BX5oFf88AwmrsSk+ZJJxc3C9N136jlgRpSQjbAMDDhhLqwE2CkZa4ZZ0rB7XOVxB2tgkMsM5Vg7TEbXCVz6RzOR9KBL0Dq/zvY8Lf55zZ9Yqxe7egcbegca8Yq57zZH39F6zRNWO4RSGRAAAAAElFTkSuQmCC);}
            #history_elem .h_okru{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaElEQVQ4jXVTXUhTYRh+zs+2s58czm0mWyd3iNSgTCuliyDM6A+6CiGJtBv1om6iqy666GIQCElJ4CqwLhITAgmbQRwvylgKot3MTTFdTnTqoR088+znbF3YxnaOvVcf7/M87/e87/e9BFRxhjWfaKu3dTWx5hanRVcNALGd9PKPiMSPzAm+6Yj0s5hP5A9lBop5fMX19FKNtQsAqS78L7KfQ/GBR/7ofTGpyIUCZQbKONjOfapzMuf/IyyJYEye6Hy3dFVMKjIFAL3X2f5m1nyjhEWQMHGnoSt3If1nHUCuADnMtIct11eMz8fHiGbWXD94k5spsU0QcHf0g3HVAQDkaBCrb+4CuVzxFdnbQ0sNdNtJW7e6Z6aqFibuFBa9rQCAIw+/gKmqhbwWLKaRbfW2brqJtbSoe1RkEQSlA1NVs2eI0kGRRc0smllLC2030x41kBai2PT3wX3nBQBg09+HtBDVFHBYaI7WZAE4rz2A3lGNjVEvAODA8YugrZWIjfVquOSWlFlWJ7d5H5JrIdgv9MDe2oPkWgjbvE8j3pIyy+T0b4lXA8quCGnhOyhTGSijFdJiAMqudgZTEYkn388KPhQ/MgB9xSG4O55j4+MTbIx64e54Br39sFqfG5kTfNRqPLV+7KDR7bEZGvNINpWAFPoGKTyJ5HoYUngSqa0IkMsW1PyC+MoX2HxJAICVoUxv27nxow7mnMbnPjEfk792Di1djstKggKAZCaX9gfjw5zdUOmxGRpQtGRq2/yi+Preh5VbcVlJYD/i2WpLY36dbaa9PyIkMr+mItLE8KwwEFjZmSnm/wVtfuF8Cyl7UwAAAABJRU5ErkJggg==);}

            #notice_text_elem{display:none;font-size:10px;color:#666;position:absolute;top:0px;left:0px;width:100%;height:63px;text-align:left;padding-right:170px; vertical-align:middle;overflow: hidden;text-overflow: ellipsis;z-index:1000; background:white;white-space: nowrap;}
            .onstream #notice_text_elem {height:45px;}
            #notice_text_elem:before{content: "";display:inline-block;vertical-align: middle;height: 100%;background:white;}
            #notice_text, #notice_text2{display:inline-block;vertical-align:middle;line-height:150%;}

            #at {cursor:pointer;display:inline-block;margin:4px 2px 0 2px;height:24px;animation-name: at_spin;animation-duration: 18s;animation-iteration-count: infinite;animation-timing-function: linear;}
            @keyframes at_spin{0%{transform:rotate(0)}25%{transform:rotate(90deg);text-shadow:0 0 3px #F0F8FF}50%{transform:rotate(180deg);text-shadow:0 0 8px #B0E0E6}100%{transform:rotate(359deg)}}
            .ADD_under_dev {display:none;}
            .imgur_container {position:relative;}
            .imgur_safe_screen {display:inline-flex;z-index:1000;align-items:center;position:absolute;top:0;left:0;text-align:center;vertical-align:middle;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJElEQVQImWPo6ur6D8MMDAz/GZA5XV1dEAEYB8pGcLq6uv4DAKP8I1nj691jAAAAAElFTkSuQmCC) repeat;}
            .imgur_control_button_container{position:relative;}
            .imgur_control_button{position:absolute;width:60px;height:20px;text-align:right;z-index:999;}
            .ADD_tr_10_10{top:10px;right:10px;}
            .ADD_br_10_10{bottom:10px;right:10px;}
            .imgur_control_button span{font-size:15px; display:inline-block;opacity:0.5;cursor:pointer;text-align:center;background:white;border-radius:30px;padding:2px;height:18px;width:16px;line-height:100%;font-family: "Malgun Gothic","맑은고딕","맑은 고딕",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif;}
            .imgur_safe_button {opacity:1.0;color:rgba(0, 0, 0, 1.0);line-height:200%;margin:0 auto;text-align:center;vertical-align:middle;cursor:pointer;color:black;font-size:12px;font-family: "Malgun Gothic","맑은고딕","맑은 고딕",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif;}
            .imgur_image_in_chat {max-width:320px !important;max-height:1000px !important;padding:5px 0px;margin:0 auto;display:inline-block;}
            .lightbox-opened img{max-width: 100%;box-shadow: 0 0 6px 3px #333; opacity:1.0;margin-top:40px;}
            .lightbox-opened {z-index: 100000;background-color: rgba(51,51,51,0.8);cursor: pointer;height: 100%;left: 0;overflow-y: scroll;padding: 24px;position: fixed;text-align: center;top: 0;width: 100%;}
            .lightbox-opened:before {background-color: rgba(51,51,51,0.8);color: #eee;content: "x";font-family: sans-serif;padding: 6px 12px;position: fixed;text-transform: uppercase;}
            .no-scroll {overflow: hidden;}
            #ADD_send_location_container {position:absolute;bottom:55px;right:10px;z-index:10;vertical-align:middle;}
            #ADD_send_location_notice {display:none;width:60px;height:24px;font-size:10px;color:#333;background-color:#f5f5f5;}
            #ADD_send_location_button {width:24px;height:24px;font-size:18px;cursor:pointer;}
            div.ADD_thumb_elem_container{position:relative;display:none;}
            div.ADD_thumb_elem_container div.ADD_thumb_elem{position:absolute;top:0px;left:105px;z-index:300;}
            div.ADD_thumb_elem_container img.ADD_thumb_img{z-index:400;}
            div.ADD_thumb_elem_container div.ADD_thumb_size_0{width:240px;height:180px;}
            div.ADD_thumb_elem_container div.ADD_thumb_size_1{width:20vw;height:calc(20vw / 16 * 9);}
            div.ADD_thumb_elem_container div.ADD_thumb_size_2{width:30vw;height:calc(30vw / 16 * 9);}
            div.ADD_thumb_elem_container div.ADD_thumb_size_3{width:40vw;height:calc(40vw / 16 * 9);}
            div.ADD_thumb_elem_container div.ADD_thumb_elem::before{content: "";position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin:auto;width: 60px;height: 60px;animation: ADD_180_rotate 0.8s infinite linear;border: 8px solid #333;border-right-color: transparent;border-radius: 50%;z-index:-1;
            }
            .loader_container{position:relative;width:100%;height:100%;}
            .loader {position:absolute;top:0;bottom:0;right:-20px;margin:auto 0;border: 2px solid #f3f3f3;border-top: 2px solid #666;border-radius: 50%;width: 20px;height: 20px;animation: ADD_180_rotate 0.8s cubic-bezier(0.4, 0, 1, 1) infinite;
            }
            @keyframes ADD_180_rotate {
              0%    { transform: rotate(0deg); }
              100%  { transform: rotate(360deg); }
            }
            .ADD_chat_again, .ADD_twitch_api_again, .ADD_twitch_api_again_with_chat{cursor:pointer;}
            .modal-body tbody tr:hover {background-color:#E6E6E6;}
            .lightbox-opened-white-background {background-color:#fff; max-width:600px; margin:0 auto; text-align:left;padding:15px;font-size:12px}
            .modal-body tbody .btn-xxs {padding: 1px 2px;font-size: 9px;line-height: 1.0;border-radius: 3px;margin:0 2px 2px 0;cursor:pointer;}
            .modal-body tbody .btn-xxs .glyphicon{}
            .modal-body tbody .btn-xxs span.glyphicon {opacity: 0.2;}
            .modal-body tbody .btn-xxs.active span.glyphicon {opacity: 1;}
            .modal-body tbody .btn-xxs.disable {opacity: 0.3;cursor:not-allowed;}
            #popup_ADD_config .modal-body tbody input[type="checkbox"]{display:none;}
            #new_version_available_text a{color:#E3242B}
            #btnOpenHrm_ADD{margin-left: -80px;margin-top: 22.5px;height:22.5px;}
            #hrm_DOE{display: none;background: rgba(255, 255, 255, 0.93);z-index: 1001;position: absolute;top: 45px;/*bottom: 50%;*/width: 100%;overflow-y: scroll;border-left: 1px solid #bdc3c7;}
            #hrm_DOE ul{list-style:none;margin:0;padding:5px 0 0 0;}
            #hrm_DOE li{color:#000;padding:3px 10px;word-break: break-all;font-size:12px;}
            #hrm_DOE a:visited{color:#660099}

            .btn-group>.btn-group:not(:last-child)>.btn, .btn-group>.btn:not(:last-child):not(.dropdown-toggle) {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
            .btn-group>.btn-group:not(:first-child)>.btn, .btn-group>.btn:not(:first-child) {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }
            .btn-group .btn+.btn, .btn-group .btn+.btn-group, .btn-group .btn-group+.btn, .btn-group .btn-group+.btn-group, .btn-group-vertical .btn+.btn, .btn-group-vertical .btn+.btn-group, .btn-group-vertical .btn-group+.btn, .btn-group-vertical .btn-group+.btn-group {
                margin-left: -1px;
            }
            .btn-group-vertical>.btn:hover, .btn-group>.btn:hover {
                z-index: 1;
            }
            .btn-group-vertical>.btn, .btn-group>.btn {
                position: relative;
                -ms-flex: 0 1 auto;
                flex: 0 1 auto;
            }

        `);
    }


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                                 CSS THEME
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // 테마
    var ADD_THEME = {
        Default : {},
        Dark : {
            header_ftc : "#ccc !important",
            chat_contents_bgc : "#191919 !important",
            chat_fc : "#ccc !important",
            color_lightest: "#ababab !important",
            color_lighter : "#999 !important",
            color_mid : "#777 !important",
            color_hard : "#333 !important",
            color_harder : "#222 !important",
            color_hardest : "#111 !important",
            chat_container_bdc : "#000 !important",
            color_complementary : "#fff !important",
            complementary_bgc_alpha : "rgba(21,21,21,0.8) !important",
            tagit_color : "#999 !important",
            tagit_bgc : "#222",
            tagit_bg : "#222 50% 50% repeat-x",
            tagit_bdc :"#111",
            logo : "url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAANCAYAAADG4RJzAAAACXBIWXMAAAsTAAALEwEAmpwYAABIZmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE3LTA3LTI5VDAyOjExOjEwKzA5OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0xMi0yM1QwMjo1MjoxOCswOTowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMTItMjNUMDI6NTI6MTgrMDk6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmNmY2NhNTc1LTQ5M2ItMmQ0ZC04NTYxLTE4YTJlMTg3NDU4OTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmQzNTQyYWUyLWU3NDAtMTFlNy04MTc3LTg1NWM2NWM0OGMwYTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmNjMGIwYjdjLWE2MGItYTM0Ny1hNzFiLWRlMWVlNTM2MmRkNTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpjYzBiMGI3Yy1hNjBiLWEzNDctYTcxYi1kZTFlZTUzNjJkZDU8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMDctMjlUMDI6MTE6MTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZDZlNmM5ZDctYTQ5NS0yYjQ4LWFkNTQtODk4Y2YxOGYxNmNiPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA3LTI5VDAyOjExOjEwKzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmE2MjE4M2JhLWM2ZjItY2U0MC04ZjZkLTQ1YWU5YWViNzRjMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMi0yM1QwMjo0OToxMCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gaW1hZ2UvcG5nIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3A8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo0MzZkMDcyNS1kZDc3LTNmNGUtYmIzYi0zMzlhOTZhNjE4YzU8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTItMjNUMDI6NDk6MTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YjE0YWEyNzItOWFjZC1lMzRlLTgxNjMtMWU4NzhiZDAwZWNjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEyLTIzVDAyOjUyOjE4KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNmY2NhNTc1LTQ5M2ItMmQ0ZC04NTYxLTE4YTJlMTg3NDU4OTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMi0yM1QwMjo1MjoxOCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6YjE0YWEyNzItOWFjZC1lMzRlLTgxNjMtMWU4NzhiZDAwZWNjPC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjQzNmQwNzI1LWRkNzctM2Y0ZS1iYjNiLTMzOWE5NmE2MThjNTwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmNjMGIwYjdjLWE2MGItYTM0Ny1hNzFiLWRlMWVlNTM2MmRkNTwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+RG9zdHJlYW0rPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5Eb3N0cmVhbSs8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpPnhtcC5kaWQ6Q0Q5MDgzNDI5NTUyMTFFMzg5N0RFOTExMjE3RDQ2Mzk8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjkxPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjEzPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6a2oV1AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAOySURBVHja7Fivb+Q4GH2pim6pSQtWc6QszMSktyga4vKgU8iwQfkDohSUDTIbMioKb8go6JiJ2bCi6EhJ6BVV8gLHEyexM9Vql9ydpYA4jr/n973vRxKhH3Gu9CFFcMhyjW3dRfh//NDQWk9m4lwrJTQnGD8hXAultFK5jgH9qwARLrTKY/2fIJtwESbUEv6ryOj3z2P8K8h+eXn55/Hx8XeX7Ct3wc0dC7/d1dG+ApAmmDkjzrVSyrk8DjtHh3MJrgmI5kJpdSzAAKQHBXePOLfrTcQN9xMb0/09ohjeNZfgXOfO2qmt8blsxPd4+/mQOG5vb3+7vr7+GpKW2URwTQKpwih/nGYMQHfOgnHI8Kg2zseELEWVeTYcjnAxwjnD1ZM02AtjmhLm2jrb6NcKIeakB/hSSumnp6c/Asq+wR0D0LbogIVCyHB3Myj6kEqU6y3qzr7TRXVZQiLFhhNzAJaAoUJzCu+6FFX2WZVR7E4TbHGujwWDLMsBw9sr5GjNnyiYRLne4WTP1tVRWUoAEq9vHhxVBrqtI5cLxlpk1D3rPHVYRwFAkiR/ufdXs67DtezvS3pwRPNNCsgGsvtMFkuRxMPdaUcjujtFVnmrFQD5irdwO4Tnk81o28gSEScpgAr7unO4LRznXsLZou2G6DY4Sqx3J9cDYACqzHGWR5wPDw9fKKURpTQCgKZpvrn3A9lkhdUFuozXLThjTDbyQiQAXb1Hdc7Hnm5nMap6ArzPYm24bgwJffow0WaJCe8djKbJWmI8AJ8OL4tzGFdT77VtSKb9waz6PuEcR8fRjtKI0gwVGIqjwue7mp4sbxHpMaQHU1QPQEYpKN1G51Dv18xJ8UVTLyAvgW4EXD7/+/u7/vj4+Nudu/6M90zh2CAFUO1r6/UgWSZHS5SzuD1FO0rxzIU+Fhvw562uO0RhQpbI+kkfXK6KAwTaiJ5MmtQSEOf9/f1VUNnjFDHvgYuCAVU2FKiuRQuAnavloBiWsCFHxvmsYnetH7g3qpaeBTFcHnF+RDFVsdfWUj0Ji3MhjYQ3jPO+B64yDAXNqLQxiRjjlu5oKn9pIsBEzKTFDBSs1YpcKMrz9GQwbODWAcLF0M51Eo0EWMJgHG5aNvtrYu7EqS1/zjfnCogzMExRWf4pgvW2DhbB2T+VyXrChT4W7MKeRHNhlGZHlVE0icIYWoWMuh2B/12gQrl+Rt31qYVwLfqPpnPakQx2TpZr7O+OY1tWXKN3rX0C16a3JfV8rn8fAJWt/iNyFCmZAAAAAElFTkSuQmCC\") !important",
            lock_image : "url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAwCAYAAAALiLqjAAAACXBIWXMAAAsTAAALEwEAmpwYAABEymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE3LTEyLTIzVDAzOjA2OjQ2KzA5OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMTItMjNUMDM6MDc6NTkrMDk6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE3LTEyLTIzVDAzOjA3OjU5KzA5OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjFmZTViOGVjLWVhNWItNjM0ZC1iNjg3LTk0ZDg2MGJjMThkMzwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjBiNDMzMDVjLWU3NDMtMTFlNy04MTc3LTg1NWM2NWM0OGMwYTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDpkNjI5YTBjNC1kYWUxLTQ4NDMtYmNlYy1kOTBmZDkwOTFhZWQ8L3N0UmVmOmluc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPnhtcC5kaWQ6MDQ2MmIwMTUtY2FkNy0zZDQxLWJiOWYtMWZhMzc3ODU3NTVlPC9zdFJlZjpkb2N1bWVudElEPgogICAgICAgICAgICA8c3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6MTQ5QjI5OURCQjJGMTFFM0EwMkZGODhCQzc4QTZCNDY8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjE0OUIyOTlEQkIyRjExRTNBMDJGRjg4QkM3OEE2QjQ2PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozNTIyMmY1MC0yOWJiLWE0NDItOTNhOC0xZmE2MGVjNzk4M2Y8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTItMjNUMDM6MDc6MDkrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZWM3NmY4MWUtODBmZi00NTRjLThlOWUtMDdiYmFmZjUzYjdhPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEyLTIzVDAzOjA3OjUwKzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcDwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gaW1hZ2UvcG5nIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3A8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjA0NjJiMDE1LWNhZDctM2Q0MS1iYjlmLTFmYTM3Nzg1NzU1ZTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMi0yM1QwMzowNzo1MCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpkNjI5YTBjNC1kYWUxLTQ4NDMtYmNlYy1kOTBmZDkwOTFhZWQ8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTItMjNUMDM6MDc6NTkrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNvbnZlcnRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6cGFyYW1ldGVycz5mcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+ZGVyaXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6cGFyYW1ldGVycz5jb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWZlNWI4ZWMtZWE1Yi02MzRkLWI2ODctOTRkODYwYmMxOGQzPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEyLTIzVDAzOjA3OjU5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjI0PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjQ4PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz58brDwAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAM7SURBVHjaxNfLixxVFAbwX1X3GN8ag6IgKiooriQ+0OjCjWAi6D8w6EYQ3bhwYURwJYhuhGwkrhRHN7pzIYMgPjYG8UEwCMZFGBR1UEcz0Uky3VVuTsm1qO661VG80FTd7nvPd97n62JlZcWCq4zPNPajeK/bhxYVXmMSz+YdijMFKFHhUjyPL/EFnsMlAVYuCtAIvxGHsB8nsIVn4rsb4kw5FKCIi2O8gZ24FXdjD+7EZXg1UaQoB2oPD2I3HsFnWArQT/AY7sD9zZ1FYrAPG3g39pMkk97BJvY2Vo9bl0ftLGhZMMW1+Al/xPkqOXMc67gm9nUbYJrhom9DkBBet5T6Gb+nAEUcOgcP4byWVumqsYbv8CR+w+s4nZzZm9yvUgsuiLze2aFVezVpuIa3AqBRdOPfqOS+dP5budSCP/EyLoxYzLOgjvRcx6mO33QBjHEzdmE7A+CsiMVonjkpwA7chYsGxOCKloy5ABP8GMJPZ1hwdqRklQuwhYM4v6ce0hj8mqRo3QdwLp6ONlxluGiEY3itlaYzAcpkX/QAFMmdItdFp7AaQ2OSYcEOfB8ZNxegMetEDI3xLH92WLGd1EFvDLRmbA7ApO/QuGX2ep9PO7Kp8n+uf2g7hyMVCe9JaUun9svLyzNjME+JScdgKvtcVGYIr2NW7MenOIwDuCqlJ4sANMIvx/sxjER7eByfB12ZC5IzcA7iFtyH23APbgr28GZ035mtpezhnrfjgZi/qxGzMb7Bw7gay/NklT2W3RvPt5NaaabdRziakKx6CEBj7nVBUTaSVB0l2fdDwoHktIq0qkU7/jpIVkrXG8WOBnXJ7kUpe94XAlfxRIeAhiOt4angph+2a2MWwB68GP4e9WTZJOQcCIAz/gMyaI1n+P4wXgmu1KdEFXTzgz5elGbPrqiBzQyAKS7GV10NdBbAlUHCJhkNsTlzfY6LGvM2YxRuZAR5GnP8+BCAI3gBJzMmXBWU5+OcGDRpuhvPhvk5abqEl/BeXwyatTRr6s1pK6MhLjoWRbOZQa6mQfmP5LioqYNDeHQAYxjhlxyAOgHaHgBQJXO6zonBVrTiIauThBV1Xf+nveivAQAt4uqU7ORcMgAAAABJRU5ErkJggg==\") !important",
            body_back : "#111 url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAIAAAD+THXTAAAACXBIWXMAAAsTAAALEwEAmpwYAABBB2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE3LTEyLTIzVDA2OjU0OjEwKzA5OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0xMi0yM1QwNjo1ODo1MCswOTowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMTItMjNUMDY6NTg6NTArMDk6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjUwYTFkMjdhLTk2NWQtY2Q0Zi1iNzI0LTQ2MDJlNjk2ZDk0NTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjQ2ZTg2OGUwLWU3NjMtMTFlNy1hNmI0LTkzMDUzYzQzNDczNzwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjgyYmYzNDJkLWJhZWEtMzc0NS1iOWVjLTdiZGM1MDNjY2RkMTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo4MmJmMzQyZC1iYWVhLTM3NDUtYjllYy03YmRjNTAzY2NkZDE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTItMjNUMDY6NTQ6MTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZTg0YTJiNDItMGM2MC1lYTQ2LTkxNmEtOTMwYzJhZTE2N2ExPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEyLTIzVDA2OjU1OjIwKzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmM1MjIwMjQyLTE1MTItYTk0OC05NzVhLTY2NzM4ODliNWY0NTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMi0yM1QwNjo1ODo1MCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo1MGExZDI3YS05NjVkLWNkNGYtYjcyNC00NjAyZTY5NmQ5NDU8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTItMjNUMDY6NTg6NTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOmM1MjIwMjQyLTE1MTItYTk0OC05NzVhLTY2NzM4ODliNWY0NTwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDo4MmJmMzQyZC1iYWVhLTM3NDUtYjllYy03YmRjNTAzY2NkZDE8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo4MmJmMzQyZC1iYWVhLTM3NDUtYjllYy03YmRjNTAzY2NkZDE8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjcwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjcwPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz55EBHqAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAoqSURBVHjajFvZcttADNMeaeNO+9Bm+v8falnbBzgQClCe+KHjerXagyQIHmkfHx9rrW3b1lr4sm1ba23OuW3bcRzHcWC0tbZ9fnrv+PfxeOAXfQBz11qPx8Mmbts2xmitYUh/x3/nnL33tda+77orvqT3jnWxMfyOVVprY4xxu934NH7FqtgQd6+fOSdepyu11vDeMca2bZiL7zn38XiMMfBmnhn3iFHdhq4y58RhWmu9d12do10lw1tca1E4vNc8z1qr9z7n5J7whaKzU805eeu6LcoH56F4ubQ+oBfEFfEqzBq32011A0LHejySagVUkc9T4mstvQuO8g0qPXyO44AWHccBXYWy6cupI9yYKSqeH2Pwzb3UY9MWnOHt7S2NiruErMq5YwyM6nnw2fcdbz6OA9/zHjEdr7Lp2AxGTzvXs7bWUrL8AhW38+QCdoulNuZL8i6+8qG+6bbH+/s7Dqp4YEvC7KBa0BPdh6qEYYmiBb/bmykrQwsFg6u7wGagwMSScbvdMKD3pDNplJAhdsaHuQ8aDFWXKoGbIhjQFMcYwAMKk7DJdfXNsEzFg1Knepqdfrf3Yn+w2rWW2h7+3fddNVmxi66Gc7kW9ko5c7uqDpDznBMYqNeKk2CfrbXZe8dKelaIkh7TjARvB1rQIfIB+Byex8wMo9BAWxePYa5eTeKbOoOc3ktjVWZAfTD7MRXVB/Ta8v2GFrqzK5BQRYC09Tps1vj+/bviAWGR58lt0ScakNAGKA1zCbzg+/2OS6FhqLk/Hg88ZrQGWA9TTOwlUeqnvD7XUCedPkdtgDhGf8LT8hmM4oONAt+StVDPFVHsLiB5k79CyxPxVFson/QtODlPwgeIYJBJKhLvggiRjCZRShFszrnve45ilpmGswfz35QVOQsRzEQPLHrh4PU8ybNekIPkWcYtbLdd2RQfSgfFH1+ghWq/LoO5uaeSCtrvSQ5s6YSop+LhglWIuj+MKj9QQZk/LdkD7CdJICw+kUadKeWsARKxhEBwiuR2u0Er1AWpoMx+MJmnent7U/+jUZDu2GJHntYIgQIsb7kEd7VbHvV5pF+/fnFJixDzPMQD7AZXa/FCRiKmkDgVEcwsh8cz1qJoQT1KFrttWy/9LNSXEXVpl2BDJfMYY4Bb2Hk0alTrUvNQ1pL2RpQzy8Tok0zRGBw3PjVEldAsUkHPghSLJuwibU/2knJi+Z50NmdwkROY8chNK5rjwBkRQFev4hQyAFuUUYwR0xIPVMjKeE7EO83rfz+gYELk4aixHsYLhpZYWBmNCZnBthEoW3fJx7gFzrPW+o9rMw7T7ALvG/RcEYbojN3Q/zDsMW5h8YLhkJ6HtqHZtcwRZO6ttdapvgwK9I6JYzaaATmYRxJkHEnxQOcyikl84/M8T4kHYwyDqG784DUDMJKfvMkSaxqnlPyAaHE1aqGrqSUuwrIDpy2Zxeu2GO0xs6Wgp/F22rTxEgtGiBYle6A20hdZuEE6pvbcywybsQfGycZuDS3ohfW0KQEdpfTMg3EUb04OzrsjGz4l8fHxkU7J1IYZNks1lfG2ajLxOrlM4pslmOwuVMKKB3bI4zh6qgpREkmCRIsrPCjjhXR6V/yAaKHsToegAokHlBUONhX+1fS5quZmy3gmd8YpeReZqSpRLl9L46GbLjVrrTVzu8aCM5+o/tTyeJrHJB/TpB8TupCV1lSY7oVT1nDTEt9Xxn+yB40m1E9bxUGlR7SwGCFjdUVIFbiFxrxHorOxB+gbc08ZnlIbnyDOtckAiD8at1p2ToORMvdAc1J8M79no8lEYV26qN4CNqYlj67pzIwmKBzkHkpLYLT3IhFHyyyRRqPmrHqUlqlGZYSmZ3YbgrIMm2pFmce8Sh5QZ67ugjZTBgSavi3TQ0zQejqF6liCG+z4fr8noNNLYNPGTRj2UntpHmSl5OaWn8IvoCyMU1TVmWkxlBo/fvzQfIhmFzS3qh5GOWjyA52rNcUMH1W2PIZSJ0MLPk+XSLTQFNX4+fOnAaLhgU7mBeO/iH/MpjXbmKFrk08G2xy60nPgQRkuYMNjjDMfopdNPEhXzcdKPLA8c3KZK19X4kFZX72iLDS5k7ZanhVStgybSqDkB1cc7KpskaMM8q9AKPHAamrPyoVBFiRwv9/L3AW9fsYqWqy3zH3ykuyo0IyvWRq9E2MN41lnk8D7+7uhcNbr0+LJ7sg8ytYE3CitQrm5Wp1Fe5nuLZmHJlLUnbY/f/5k/HjVMVHGp1rXKEdNellHUV21xLW1IiQI0f2cJMZyqCWxpwaXQXWpY+lty6KgalQaDzPpZZGGW6JCPfXZNGrf91RxTrjKv6nXK/HgKkwsR82DXRVtqRQaR5+0Vat3JXtgNJHn0fy12pXqpFbNVD7qT3UuKalmKvWcOIYGJv8RoqxJKaRoVwQ1kI5Y2cMzTu7dOqyYXVAhM3rVoFXrGup/bJRVd3okHZ3ZAWKRTPp4iiu9HtdOjWITB3OgigeW7kltZAzPN6tlaq2xp+PT3IPalTGAKzygBDg3o6ArvmMBjrl4uuDsilCQ6KW7JCInuSYesNXkih9kGyLnokmANm0NLZpLrPmBVOnVAeJgz8pFmU9UfqC1OvU/ltnQUc3JaKMmm6/UvxseaDRAeFA6aiUicvO1VreEuvXdaSuUWq2iBTfHaE/RInORyuWsy4X2o6Nqt9ZtpBycozNryYYWGm5A38wu2XpmQb7GOaU/hRawEUUZQFnATqujFuho/2L/QfYJXGUXSjzItlSjcCWvZ0JX9VyBV+P88wrgas0nlpm9FxGBer3EAxZwSz9BpX3xZmPlWoe2WuAznUIOxrKh7YkWz0D/ih+UtQkagKKcZueYcNS5ihY5inQVWZh2BnZCfiaTMieqbcMle9AaaUYExg/oCaBFxANeq6oW/Sw/WvX4L075+/evNjYa56d3ym5+hkxlrHHVX8dsDom2rktcVVPR5gG+kOFpho/dWKbdN1/9Gg8yT1+2FmieWWk7D0aqVULU/X7XOD/TusDAbhGBRWxlvPCV7ILGMPkGhDAlqWeAUzYvXvUU02fs+z7VpSYeaI1dR7ljnasVyKzwWgrAtCBryTqqzRaPx+Pbt29244pSz9yD1p6zf6fsTsjeBYsXMvdgf0ljfxih59H0hpWSzWFkl1T7/ft39hCU2oirIu8o1TUjUGYMzeKNHJSjCtxIUKsmGw551+RVn0B2tJTumNykjKvNJ5a9P+Wo8YOyplhksL+YP0BEkL2xigeWiTfGaaVlNRjDAxtVdptN0Zk+OKuAL+KFqyifNqAthjpXG9z658c0x+bqny9gFEsr3FkVtDgSNcpKN1n0TVZv3E97ZC0at+ws+U7ZFWB4UHrz7PR6Hr6M8vXo1qtpZTW6PyXIhHJtmODV0AtnrkubA+2WlV5mjRSv7VZHuoomymyjRgRlUtewKCHxqmqY8UL2jCdBA0XChv8NAONbx0GVv8YOAAAAAElFTkSuQmCC\") repeat scroll left top !important",
            border_top : "1px solid #000 !important",
            border_left : "1px solid #000 !important",
            none : "none !important",
            line_gradient_default : "linear-gradient(to right, rgba(19,19,19,0), rgba(19,19,19,1)) !important",
            line_gradient_onstream : "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1)) !important"
        }
    };

    var ADD_THEME_CONNECT = {
        header_ftc : {
            "color" : [],
            "background-color" : []
        },
        chat_contents_bgc : {
            "color" : [],
            "background-color" : [".fixed_streamer"]
        },
        chat_fc : {
            "color" : [".modal-body",".modal-content","#stream .title","#multitwitch",".search a.checked",".search a","input.conversation","input.conversation::placeholder","#btnRefreshChat","#btnIgnoreList","#btnOpenHrm",".chat-close span","#Cookie_reset",".modal-body select",".modal-body input[type=\"text\"]",".lightbox-opened-white-background","#memo_textbox","#memo_text","input.uchat_nick","div.floor label",".uchat_setting_wrap div.top","textarea"],
            "background-color" : []
        },
        color_lightest :{
            "color" : ["#view_additional_message",".conversation_contents",".conversation_contents a","div.from","#popup_ADD_quick div.title"]
        },
        color_lighter : {
            "color" : ["#stream .viewers",".btn-default","#stream .glyphicon",".large_check span","#ADD_send_location_button","#ADD_send_location_button::before",".topbar",".topbar a ",".topbar span"]
        },
        color_mid : {
            "color" : ["label.btn-xxs"]
        },
        color_hard : {
            "color" : [".tagit-label"],
            "background-color" : [".modal-body",".modal-footer",".modal-body td",".modal-content",".warp",".ADD_checkbox","::-webkit-scrollbar-track-piece",".search a"]
        },
        color_harder : {
            "color" : [".nav-brand",".nav-brand_mod"],
            "background-color" : ["::-webkit-scrollbar-track",".lightbox-opened-white-background","#multitwitch",".search a.checked",".uchat_setting_wrap div.top","label.btn-xxs"],
            "border-color" : [".modal-body td",".modal-body tr",".modal-body th",".modal-footer",".modal-body ul.tagit","#popup_ADD_quick .quick_list_title","label.btn-xxs"]
        },
        color_hardest : {
            "color" : [],
            "background-color" : ["body",".conversation_contents",".chat-dostream_super",".user_conversation",".topbar",".modal-body tbody tr:hover",".btn-default","#chat-dostream .input",".large_check input",".large_check input","#Cookie_reset",".modal-body select",".modal-body input[type=\"text\"]","#btnRefreshChat","#btnIgnoreList","#btnOpenHrm",".chat-close","::-webkit-scrollbar-thumb","#popup_ADD_quick li>a:hover",".user_menu_background","#memo_textbox","input.uchat_nick","textarea"],
            "border-color" : []
        },
        chat_container_bdc : {
            "color" : [],
            "background-color" : [".main-streams>ul>li>a:hover","header.onstream","div.onstream","div.from",".uchat_setting_wrap div.content"],
            "border-color" : ["#chat-dostream .input",".btn-default",".chat-container","input.conversation","input[type=\"text\"]",".topbar","#stream .main-streams>ul>li",".modal-body select",".modal-body ul",".modal-body li","textarea"],
        },
        color_complementary : {
            "color" : [],
            "background-color" : []
        },
        complementary_bgc_alpha : {
            "color" : [],
            "background-color" : ["#view_additional_message"]
        },
        tagit_color: {
            "color" : ["ul.tagit li.tagit-choice","ul.tagit li span"]
        },
        tagit_bgc: {
            "background-color" : ["ul.tagit li.tagit-choice:not(.ui-state-highlight)"]
        },
        tagit_bg: {
            "background" : ["ui-autocomplete",".tagit-autocomplete.ui-widget-content"]
        },
        tagit_bdc: {
            "border-color" : ["ul.tagit li.tagit-choice",".tagit-autocomplete.ui-widget-content"]
        },
        logo : {
            "background-image" : [".nav-brand",".nav-brand_mod"]
        },
        lock_image : {
            "background-image" : [".uchat_scroll"]
        },
        body_back : {
            "background" : ["#stream .container"]
        },
        border_top : {
            "border-top" : [".topbar"]
        },
        border_left : {
            "border-left" : ["#btnRefreshChat"]
        },
        none : {
            "background" : ["#popup_ADD_quick .multitwitch_button .btn-default","#popup_ADD_quick div.from",".modal-body li.tagit-new input"]
        },
        line_gradient_default : {
            "background-image" : [".h_container:before"]
        },
        line_gradient_onstream : {
            "background-image" : [".onstream .h_container:before"]
        }
    };

    function ADD_change_theme(key){
        key = key.replace(/\s/g,"");
        if(!(key in ADD_THEME)){
            key = "Default";
        }

        if( $("#ADD_THEME_CSS").length === 0){
            $("head").append("<style id=\"ADD_THEME_CSS\" rel=\"stylesheet\" type=\"text/css\"></style>");
        }
        else{
            $("#ADD_THEME_CSS").html("");
        }

        if(key == "Default"){
            $("#ADD_THEME_CSS").html("");
            return;
        }

        var append_text = "";
        for(var key2 in ADD_THEME_CONNECT){
            for(var prop in ADD_THEME_CONNECT[key2]){
                var temp_obj = ADD_THEME_CONNECT[key2][prop];
                var bt_length = temp_obj.length;
                if(bt_length !== 0){
                    for(var i=0; i<bt_length; i++){
                        append_text += append_theme_line(key,temp_obj[i],prop,key2) + "\n";
                    }
                }
            }

        }

        $("#ADD_THEME_CSS").append(append_text);
    }

    function append_theme_line(key,element,property,value){
        var key_value = ADD_THEME[key][value];
        if (key_value === undefined){
            key_value = ADD_THEME["Default"][value];
        }
        var append_text = element + " { " + property + ":"+ key_value +"} ";
        return append_text;
    }

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                             HIJACKED FUNCTION
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    var newdsStreamForExportFunction = function(){
        ADD_DEBUG("newdsStream hijacked");
        first_main_call = true;
        $(".loader_container").fadeIn(200);
        //var d = this;
        this.reload = function(){
            parse_data_from_list(0);
        };
        $(".loader_container").fadeOut(200);
        ADD_multitwitch_DOE();
        //hrm_DOE();
    };

    var newdostreamForExportFunction = function(q){
        ADD_DEBUG("newdostream hijacked");
        q = q.split("/");
        switch(q[1]){
        case "stream":
            $("header").addClass("onstream");
            $("#stream").addClass("onstream");
            $(".footer").hide();
            page = "stream";
            $("#stream").load("/stream.php", {"from":q[2], "chan":q[3]});
            break;
        default:
            $("header").removeClass("onstream");
            $("#stream").removeClass("onstream");
            $(".footer").show();
            $("#stream").load("/main2.php",function(){
                page = new newdsStreamForExportFunction();
                page.reload();
            });
            break;
        }
    };

    //////////////////////////////////////////////////////////////////////////////////
    // 현재 시간 리턴용
    function leadingZeros(n, digits){
        var zero = "";
        n = n.toString();

        if (n.length < digits){
            for (i = 0; i < digits - n.length; i++)
                zero += "0";
        }
        return zero + n;
    }

    function getTimeStamp(flag){
        var d = new Date();

        var s = "" +
        leadingZeros(d.getFullYear(), 4) +
        leadingZeros(d.getMonth() + 1, 2) +
        leadingZeros(d.getDate(), 2) +
        leadingZeros(d.getHours(), 2);

        if(flag === "m" || flag === "s"){
            s += leadingZeros(d.getMinutes(), 2);
        }

        if(flag === "s"){
            s += leadingZeros(d.getSeconds(), 2);
        }

        return s;
    }

    function getTimeStampWithText(d, flag){
        if($.type(d) !== "date"){
            return "";
        }

        var s = "" +
        d.getFullYear() + "년 " +
        (d.getMonth() + 1) + "월 " +
        d.getDate() + "일 " +
        d.getHours() + "시 ";

        if(flag === "m" || flag === "s"){
            s += d.getMinutes() + "분 ";
        }

        if(flag === "s"){
            s += d.getSeconds() + "초";
        }

        return s;
    }
    function getTimeStampWithDash(d, flag){
        if($.type(d) !== "date"){
            return "";
        }

        var s = "" +
        d.getFullYear() + "/" +
        (d.getMonth() + 1) + "/" +
        d.getDate() + " " +
        d.getHours() + "";

        if(flag === "m" || flag === "s"){
            s += ":" + leadingZeros(d.getMinutes(), 2);
        }

        if(flag === "s"){
            s += ":" + leadingZeros(d.getSeconds(), 2);
        }

        return s;
    }
    //////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////
    // 파싱 후 데이터 정리
    function parse_data_from_list(flag){
        ADD_DEBUG("RUNNING - parse_data_from_list");
        $.ajax({
            url: "http://www.dostream.com/dev/stream_list.php",
            async: false,
            type: "GET",
            dataType:"json",
            success:function(data){
                var i;
                if(data === null){
                    ADD_DEBUG("기본 파싱 리스트 존재하지 않음");
                    data = [];
                    // return;
                }
                var getTimeResult = "?" + getTimeStamp("m");

                // 숨길 대상 스트리머 지우기
                if(ADD_config.streamer_hide.value){
                    var h_index_ary = [];
                    var hide_streamer = ADD_config.streamer_hide_ID.value;
                    for(i=0; i<hide_streamer.length; i++){
                        var h_index = data.map(function(o){ return o.streamer; }).indexOf(hide_streamer[i]);
                        if(h_index !== -1){
                            h_index_ary.push(h_index);
                        }
                    }
                    h_index_ary.sort(function(a, b){ // 내림차순
                        return b - a;
                    });

                    for(i=0; i<h_index_ary.length; i++){
                    // 저장된 index가 내림차순이므로 마지막에서부터 지운다.
                        data.splice(h_index_ary[i],1);
                    }
                }

                // 새로 추가한 항목 초기화
                for(i=0; i<data.length ; i++ ){
                    data[i].main_fixed = false;
                    data[i].main_favorite = false;
                    data[i].display_name = "";
                }

                // Twitch api 쿠키로부터 스트리머 가져오기
                if ( ADD_config.alarm.value && (!!$.cookie("twitch_api_cookie")) ){
                    ADD_DEBUG("DOE 생성을 위해 Twitch API cookie 쿠키 정리 중...");
                    // 로컬 변수 선언
                    var temp_api_cookie = JSON.parse($.cookie("twitch_api_cookie"));
                    if(temp_api_cookie === undefined || temp_api_cookie === null || temp_api_cookie.length === 0){
                        ADD_DEBUG("DOE 생성 중 Twitch API cookie 확인 실패!");
                        ADD_DEBUG("temp_api_cookie", temp_api_cookie);
                    }
                    else{
                        for(i=0; i<temp_api_cookie.length ; i++ ){
                            var t_index = data.map(function(o){ return o.streamer; }).indexOf(temp_api_cookie[i].name);
                            if(t_index !== -1){
                                data[t_index].title = temp_api_cookie[i].status;
                                data[t_index].viewers = temp_api_cookie[i].viewers;
                                data[t_index].display_name = temp_api_cookie[i].display_name;
                                data[t_index].main_favorite = true;

                                data.splice(0, 0, data.splice(t_index, 1)[0]);
                            }
                            else{
                                var temp_one = {};
                                temp_one.title = temp_api_cookie[i].status;
                                temp_one.from = "twitch";
                                temp_one.url = "/twitch/"+temp_api_cookie[i].name;
                                temp_one.image = "http://static-cdn.jtvnw.net/previews-ttv/live_user_"+temp_api_cookie[i].name+"-240x180.jpg";
                                temp_one.streamer = temp_api_cookie[i].name;
                                temp_one.viewers = temp_api_cookie[i].viewers;
                                temp_one.display_name = temp_api_cookie[i].display_name;
                                temp_one.main_fixed = false;
                                temp_one.main_favorite = true;

                                data.unshift(temp_one);
                                temp_one = null;
                            }
                        }
                    }

                    // GC
                    temp_api_cookie = null;
                }


                // 고정 시킬 스트리머 순서 맨 위로 올리기
                if(ADD_config.top_fix.value){
                    var fixed_streamer = ADD_config.top_fix_ID.value;
                    var alarm_streamer = ADD_config.top_alarm_ID.value;
                    for(i=fixed_streamer.length-1; i>=0; i--){
                        var f_index = data.map(function(o){ return o.streamer; }).indexOf(fixed_streamer[i]);
                        // 이미 목록에 있는 경우
                        if(f_index !== -1){
                            data[f_index].main_fixed = true;
                            data.splice(0, 0, data.splice(f_index, 1)[0]);
                        }
                        // 목록에 없는 경우(오프라인 상태인 경우)
                        else if(ADD_config.top_off_fix.value){
                            var temp_one2 = {};

                            if( ADD_config.alarm && ($.inArray(fixed_streamer[i],alarm_streamer) !== -1) ){
                                //temp_one2.title = "스트림이 오프라인 상태이거나, 메인 추가 목록에 추가되지 않아 상태를 확인할 수 없습니다.";
                                temp_one2.title = "스트림이 오프라인 상태입니다.";
                            }
                            else if(ADD_config.alarm){ //  && (!!$.cookie("twitch_api_cookie")
                                temp_one2.title = "스트림이 오프라인 상태입니다.";
                            }

                            temp_one2.from = "twitch";
                            temp_one2.url = "/twitch/"+fixed_streamer[i];
                            temp_one2.image = "http://static-cdn.jtvnw.net/previews-ttv/live_user_"+fixed_streamer[i].name+"-240x180.jpg";
                            temp_one2.streamer = fixed_streamer[i];
                            temp_one2.viewers = 0;
                            temp_one2.display_name = "";
                            temp_one2.main_fixed = true;
                            temp_one2.main_favorite = false;

                            data.unshift(temp_one2);

                            // GC
                            temp_one2 = null;
                        }
                    }
                }


                // display_name 채우기, 섬네일 수정하기
                for(i=0; i<data.length ; i++ ){
                    if(data[i].streamer == "togom"){
                        data[i].viewers = data[i].viewers * 100;
                    }

                    data[i].image += getTimeResult;
                    if(data[i].main_favorite === true)
                        continue;

                    for(var j=0; j<streamerArray.length; j++){
                        // 트위치가 아닌 경우
                        if(data[i].from !== "twitch"){
                            data[i].display_name = "";
                            break;
                        }

                        // 기존 스트리머 이름 목록에서 찾은 경우
                        if(streamerArray[j][0] === data[i].streamer){
                            data[i].display_name = streamerArray[j][1];
                            break;
                        }

                        // 못 찾은 경우
                        if(j === streamerArray.length-1){
                            data[i].display_name = "";//data[i].streamer;
                            break;
                        }
                    }
                }

                ADD_run(data,flag);

            },
            error:function(){
                ADD_DEBUG("파싱 실패함");
            }
        });
    }


    //////////////////////////////////////////////////////////////////////////////////
    // 파싱 데이터 이용하여 DOE 생성
    function ADD_run(json,flag){
        // 메인 접속 시 실행될 것들.
        checkedStreamerFromList = [];

        var append = "";
        ADD_DEBUG("ADD_run - 파싱된 데이터 이용하여 스트림 리스트 DOE 생성");
        //console.log('json :',json);
        $(json).each(function(k, data){
            var twitch_append = "";
            var fixed_class = "";
            var fixed_append = "";
            var favorite_class = "";
            var favorite_append = "";
            var display_name = "";

            if(ADD_config.remember_platform.value){
                if(data.from === "twitch" && ADD_config.remember_twitch.value){
                    return true;
                }
                else if(data.from === "kakao" && ADD_config.remember_kakao.value){
                    return true;
                }
                else if(data.from === "youtube" && ADD_config.remember_youtube.value){
                    return true;
                }
            }

            if(data.from === "twitch")
            {
                twitch_append=`
                  <div class="ADD_li_box_container">
                      <div class="ADD_li_box">
                          <div class="ADD_checkbox_container">
                              <label class="btn btn-default btn-xs" aria-label="멀티트위치 체크박스" data-microtip-position="top-left" role="tooltip">
                                  <input class="ADD_checkbox" type="checkbox" name="chk" value="`+data.streamer+`" onfocus="this.blur()" autocomplete="off" />
                                  <span class="glyphicon glyphicon-ok"></span>
                              </label>
                          </div>
                          <div class="multitwitch_button">
                              <a href="/#/stream/multitwitch/`+data.streamer+`">
                                  <span class="btn btn-default btn-xs" aria-label="채팅모드" data-microtip-position="top-right" role="tooltip"><span class="glyphicon glyphicon-comment"></span></span>
                              </a>
                          </div>
                      </div>
                  </div>
                  `;
                if(data.display_name === ""){
                    display_name = data.streamer;
                }
                else{
                    display_name = data.display_name+" ("+data.streamer+")";
                }
            }
            else
            {
                switch(data.from){
                case "afreeca":
                    display_name = "아프리카";
                    break;
                case "kakao":
                    display_name = "카카오";
                    break;
                case "youtube":
                    display_name = "유투브";
                    break;
                default:
                    display_name = data.from;
                }
            }

            if(data.main_fixed){
                fixed_class = " fixed_streamer";
                fixed_append = "<div style=\"position:relative;\"><div class=\"glyphicon glyphicon-pushpin icon_pushpin\"></div></div>";
            }
            if(data.main_favorite){
                favorite_class = " favorite_streamer";
                favorite_append = "<div style=\"position:relative;color:#333;\"><div class=\"glyphicon glyphicon-star icon_star\"></div></div>";
            }
            append += `
                  <li id="twitch_`+data.streamer+"\" class=\""+data.from+fixed_class+favorite_class+`">
                  `+fixed_append+favorite_append+`
                  <a href="/#/stream`+data.url+`">
                      <img src="`+data.image+`" width="90" hieght="60">
                      <div class="stream-wrap">
                          <div class="title">`+(data.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"))+`</div>
                          <div class="info">
                              <div class="from `+data.from+"\">"+display_name+`</div>
                              <div class="viewers">
                                  <span class="glyphicon glyphicon-user"></span> `+data.viewers+`
                              </div>
                          </div>
                      </div>
                  </a>
                  `+twitch_append+`
              </li>`;

            // GC
            twitch_append = null;
            display_name = null;
            fixed_class = null;
            fixed_append = null;
            favorite_class = null;
            favorite_append = null;
        });

        if(flag === 0)
            $("#stream .main-streams ul").empty().hide().append(append).fadeIn(300);
        else
            $("#popup_ADD_quick ul").empty().hide().append(append).fadeIn(300);

        // GC
        append = null;
    }



    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                          FUNCTION - COOKIE AND config
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////
    // 설정으로 인해 on-off 되는 이벤트는 이곳에서 관리
    function ADD_event_binding(){
        // 섬네일 마우스 오버 설정 관련됨
        if(ADD_config.thumbnail_mouse.value !== undefined){
            ADD_thumbnail_mouseover();
        }

        if(urlCheck() === C_UCHAT){
            ADD_chatting_arrive();
        }
        else {
            $(document).arrive("#uha_chat", {onlyOnce: true, existing: true}, function(){
                ADD_DEBUG("FIRED");
                ADD_chatting_arrive_for_UHAHA();
            });
        }

        // 채팅창 스크롤 관련됨
        //if(ADD_config.chat_scroll.value !== undefined){
        //    ADD_chat_scroll_pause();
        //}

        // history 기능 관련됨
        ADD_Channel_History_Run();

        // 좌표 버튼 생성 관련됨
        hrm_DOE();

        // 데스크탑 알림 권한 관련됨
        if(ADD_config.alarm_noti.value !== undefined && ADD_config.alarm_noti.value){
            ADD_DEBUG("Notification.permission = ", Notification.permission);
            if (Notification.permission !== "granted")
                Notification.requestPermission();
        }
    }    


    //////////////////////////////////////////////////////////////////////////////////
    // 설정 창에 설정 값을 덮어씌우기 위한 함수
    function ADD_var_to_config_form(){
        ADD_config_var_read();
        for(var key in ADD_config){
            var ADD_ct = ADD_config[key].value;
            var ADD_config_ID_text;
            var ADD_config_type;

            // 설정 key와 동일한 ID를 가진 요소를 찾아서 변수에 저장한다.
            if (key == "thumbnail_size")
                ADD_config_ID_text = "#ADD_config_"+key+"_"+ADD_ct;
            else
                ADD_config_ID_text = "#ADD_config_"+key;
            var ADD_config_ID = $(ADD_config_ID_text);

            // 해당 ID 값 가진 엘리먼트가 존재하지 않을 시 다음 for문으로 넘어간다.
            if(ADD_config_ID.length === 0)
                continue;

            // 해당 ID 요소의 type 을 변수에 저장한다.
            ADD_config_type = ADD_config[key].type;//ADD_config_ID.attr('type');

            // 위에서 찾은 각 설정창 타입에 맞게 변수를 입력해준다.
            if (ADD_config_type == "text"){
                // 1. 설정창 타입이 text 인 경우
                ADD_config_ID.val(ADD_ct);
            }
            else if (ADD_config_type == "checkbox"){
                // 2. 설정창 타입이 checkbox 인 경우
                ADD_config_ID.prop("checked", ADD_ct);
                if(ADD_ct){
                    ADD_config_ID.parent("label.btn").removeClass("active").addClass("active");
                }
            }
            else if (ADD_config_type == "radio"){
                // 3. 설정창 타입이 radio 인 경우
                ADD_config_ID.prop("checked", true);
            }
            else if (ADD_config_type == "tag"){
                $("#ADD_config_"+key+"_Tags").tagit("removeAll");
                for(var i=0; i<ADD_ct.length; i++){
                    $("#ADD_config_"+key+"_Tags").tagit("createTag", ADD_ct[i]);
                }
            }
        }

        // 테마 관련 하드코딩
        var theme = $("#ADD_config_theme").val();
        var str = "";
        $( "select option:selected" ).each(function(){
            str += $("#ADD_config_theme_select option:selected").text();
        });
        if(str !== theme){
            $("#ADD_config_theme_select option[value="+theme+"]").prop("selected", true);
        }

        // 설정 팝업 내 체크에 따른 enable 여부 초기화
        ADD_config_enable();    // ADD_config_enable(ADD_config_enable_init);

        // 설정 팝업 내 개발 중 옵션을 보여주는지 여부를 확인하여 초기화
        // if(ADD_config.under_dev.value){
        //     $(".ADD_under_dev").show();
        // }
        // else{
        //     $(".ADD_under_dev").hide();
        // }
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 설정창 값을 변수에 저장
    async function ADD_save_config_to_data(){
        // 설정 변수가 없는 경우, 기본값으로 초기화한다.
        if (ADD_config === undefined || ADD_config === null)
            ADD_config_var_read();

        for(var key in ADD_config){
            // 로컬 변수 선언
            var ADD_config_ID_text;
            var ADD_config_ID;
            var ADD_config_type;

            // 설정 key와 동일한 ID를 가진 요소를 찾아서 변수에 저장한다.
            if (key == "thumbnail_size"){
                ADD_config_ID_text = "input[name=ADD_config_"+key+"]:checked";
            }
            else{
                ADD_config_ID_text = "#ADD_config_"+key;
            }

            ADD_config_ID = $(ADD_config_ID_text);

            // 해당 ID 값 가진 엘리먼트가 존재하지 않을 시 다음 for문으로 넘어간다.
            if(ADD_config_ID.length === 0){
                // GC
                ADD_config_ID_text = null;
                ADD_config_ID = null;
                ADD_config_type = null;

                continue;
            }

            // 해당 ID 요소의 type 을 변수에 저장한다.
            ADD_config_type = ADD_config[key].type;//ADD_config_ID.attr('type');

            // 위에서 찾은 각 설정창 타입에 맞게 쿠키에 입력한다.
            if (ADD_config_type == "text" || ADD_config_type == "none"){
                // 1. 설정창 타입이 text 인 경우
                ADD_config[key].value = ADD_config_ID.val();
            }
            else if (ADD_config_type == "checkbox"){
                // 2. 설정창 타입이 checkbox 인 경우
                ADD_config[key].value = ADD_config_ID.prop("checked");
            }
            else if (ADD_config_type == "radio"){
                // 3. 설정창 타입이 radio 인 경우
                ADD_config[key].value = ADD_config_ID.val();
            }
            else if (ADD_config_type == "tag"){
                // 4. 설정창 타입이 tag 인 경우
                ADD_config[key].value = ADD_config_ID.val().replace(/\s/g,"").toLowerCase().split(",");
            }

            // GC
            ADD_config_ID_text = null;
            ADD_config_ID = null;
            ADD_config_type = null;
        }

        // 데이터 저장
        await ADD_config_var_write();
    }


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                          FUNCTION -  STATUS CHECK
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////
    // 설정 변수 초기화
    function ADD_status_var_initialize(){
        // 글로벌 변수를 가져와서 초기화 함
        ADD_status = ADD_status_init;
    }

    // 쿠키 쓰기
    function ADD_status_cookie_write(){
        // status 쿠키가 존재하지 않고, 전역 변수도 없는 경우
        if ((!$.cookie("ADD_status")) && (typeof ADD_status !== "undefined") ){
            // 글로벌 변수를 가져와서 초기화 함
            ADD_status_var_initialize();
        }
        // status 쿠키가 존재하는 경우
        $.cookie("ADD_status", JSON.stringify(ADD_status), { expires : 365*2, path : "/" });
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 쿠키 지우기
    function ADD_status_cookie_remove(){
        // 설정 쿠키값이 존재하는 경우 쿠키값을 지운다.
        if ($.cookie("ADD_status"))
            $.removeCookie("ADD_status");
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 쿠키 읽기
    function ADD_status_cookie_read(){
        // 쿠키값 존재 시 읽어서 변수에 저장함
        if ($.cookie("ADD_status"))
            ADD_status = JSON.parse($.cookie("ADD_status"));
        else
            ADD_status_var_initialize();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 값 추가 하기
    function ADD_status_cookie_add_data(_key){
        // 읽음
        ADD_status_cookie_read();

        // 설정 변수 존재하고, 키도 존재하는 경우
        if ( (typeof ADD_status !== "undefined") && (_key in ADD_status) ){
            // 해당 키에 +1 함
            ADD_status[_key] = Number(ADD_status[_key]) + 1;
        }

        // 쿠키 쓰기
        ADD_status_cookie_write();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 채팅창에 쓰기
    /*
    function ADD_status_noti(){
        ADD_send_sys_msg("두스트림 애드온이 동작 중 입니다 (v"+version_str+")",0.0);
        ADD_status_cookie_read();
        
        ADD_text = '';
        if(Number(ADD_status.ad_remove) > 0 && ADD_config.chat_adb.value){
            ADD_text += '광고 차단: '+ADD_status.ad_remove+ '회, ';
        }
        if(Number(ADD_status.auto_image) > 0 && ADD_config.imgur_preview.value){
            ADD_text += 'Imgur 로드: '+ADD_status.auto_image+ '회, ';
        }
        if(Number(ADD_status.api_call) > 0 && ADD_config.alarm.value){
            ADD_text += '\(+\) API 호출: '+ADD_status.api_call+ '회, ';
        }
        if(ADD_text !== ''){
            ADD_send_sys_msg(ADD_text,0.0);
        }
        
    }
    */

    //////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                              FUNCTION - API
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////
    // Twitch API
    function twitch_api(){
        var ADD_config_alarm = ADD_config.alarm.value;

        // ADD_config_alarm === false 이면 return.
        if(!ADD_config_alarm){
            return false;
        }

        // 로컬변수 선언
        var ADD_config_alarm_gap;
        var api_update = true;
        var api_pre_time;
        var now_time = new Date();
        var next_time;

        // 쿠키에 저장된 api 갱신 간격 검증
        ADD_config_alarm_gap = Number(ADD_config.alarm_gap.value);
        if($.isNumeric(ADD_config.alarm_gap.value) && ADD_config_alarm_gap < 1.0)
            ADD_config_alarm_gap = 1.0;

        // 업데이트 여부 계산
        if ($.cookie("api_check_pre_time")){
            api_pre_time = new Date($.cookie("api_check_pre_time"));
            var left_time = (api_pre_time - now_time) + ADD_config_alarm_gap*60*1000; // 남은 시간 in ms
            api_update = left_time < 0 ;

            // 다음 업데이트 시간 계산
            next_time = new Date(api_pre_time.getTime() + ADD_config_alarm_gap*60*1000);
        }

        if (unique_window_check && ADD_config_alarm && (api_push_forced || api_update)){
            api_push_forced = false;

            // 쿠키 업데이트
            var api_expires = new Date();
            $.cookie("api_check_pre_time", api_expires, { expires : 365, path : "/" });
            //ADD_DEBUG("Current time is "+now_time+".\nCookie time for api update is "+api_expires+".\nCookie is updated.");

            // cookie check
            if (($.cookie("api_check_pre_time"))){
                // 로컬 변수 선언
                var possibleChannels = ADD_config.top_alarm_ID.value;
                var possibleChannelsString = possibleChannels.join(",").replace(" ", "");
                var possibleChannelsNo = possibleChannels.length;

                if(possibleChannelsNo > 0){
                    ADD_DEBUG("Api call channels no. :"+possibleChannels.length + ", name : " + possibleChannelsString.replace(" ", ""));
                    $.ajax({
                        url:"https://api.twitch.tv/kraken/streams?offset=0&limit=100&channel="+possibleChannelsString.replace(" ", ""),
                        type: "GET",
                        contentType: "application/json",
                        dataType:"json",
                        headers: {"Client-ID": ADD_Client_ID},

                        // API CALL SUCCESS
                        success:function(channel){
                            ADD_status_cookie_add_data("api_call");
                            var temp_twitch_api_cookie = [];
                            // temp 에 이전 api 쿠키를 복사한다.
                            // 현재는 desktop alarm 이 켜진 경우만 복사한다.
                            if ( (!!$.cookie("twitch_api_cookie")) && ADD_config.alarm_noti.value)
                                temp_twitch_api_cookie = JSON.parse($.cookie("twitch_api_cookie"));//twitch_api_cookie.slice(0);

                            var streams = channel.streams;
                            var temp_body = "";
                            var noti_check = ((ADD_config.alarm_noti.value !== undefined) && ADD_config.alarm_noti.value);
                            api_expires.setMinutes( api_expires.getMinutes() + 10 );

                            //ADD_DEBUG("Twitch API - noti_check", noti_check);
                            ADD_DEBUG("Twitch API - request succeeded", channel);

                            // 온라인 스트리머가 있는 경우
                            if(streams.length !== 0){
                                for (var i = 0; i < streams.length; i++){
                                    if(i === 0){
                                        // API 변수 초기화
                                        twitch_api_cookie = [];
                                    }

                                    var stream = streams[i];
                                    if (stream !== null){
                                        twitch_api_cookie[i] = {
                                            "name" : stream.channel.name,
                                            "display_name" : stream.channel.display_name,
                                            "status" : stream.channel.status,
                                            "viewers" : stream.viewers,
                                            "game" : stream.channel.game
                                        };
                                    }

                                    var noti_options;
                                    // 데스크톱 알림 허용인 경우
                                    if( noti_check ){
                                        // 첫번째 call 이고 기존 쿠키 존재 안 하는 경우 (완전히 첫 접속인 경우)
                                        if(first_api_call && (!$.cookie("twitch_api_cookie"))){
                                            if(i !== 0){
                                                temp_body += ", ";
                                            }
                                            temp_body += stream.channel.name;

                                            if(i === streams.length -1){
                                                ADD_DEBUG("Twitch API - 첫번째 알림", temp_body);
                                                noti_options = {
                                                    title: "Dostream+",
                                                    options: {
                                                        body: temp_body,
                                                        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC",
                                                        lang: "ko-KR"
                                                    }
                                                };
                                                $("#easyNotify").easyNotify(noti_options);
                                            }
                                        }

                                        // 기존 쿠키 존재 하는 경우
                                        else if( ($.cookie("twitch_api_cookie")) ){
                                            // 이전 api call 한 내역에 이번에 api call 한 이름이 있는지 체크
                                            var first_call_check = temp_twitch_api_cookie.filter(function (obj){
                                                return obj.name === stream.channel.name;
                                            })[0];

                                            // 이전에 call 하지 않은 스트리머인 경우 개별 데스크톱 알림
                                            if(first_call_check === undefined || first_call_check === null)
                                            {
                                                noti_options = {
                                                    title: stream.channel.display_name,
                                                    options: {
                                                        body: stream.channel.game+" - "+stream.viewers+" viewers\n"+stream.channel.status,
                                                        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC",
                                                        lang: "ko-KR"
                                                    }
                                                };

                                                $("#easyNotify").easyNotify(noti_options);

                                                // GC
                                                first_call_check = null;
                                                noti_options = null;
                                            }
                                            else{
                                                ADD_DEBUG(stream.channel.name + " : 이전에 이미 api call 하였으므로 알림하지 않음");
                                            }
                                        }
                                    }

                                    // GC
                                    stream = null;
                                } // streams 에 대한 for문 끝

                                // 쿠키 쓰기
                                $.cookie("twitch_api_cookie", JSON.stringify(twitch_api_cookie), { expires : api_expires, path : "/" });
                            }
                            // 온라인 스트리머가 없는 경우
                            else{
                                ADD_DEBUG("Twitch API - NO ONLINE STREAMER, API cookie is REMOVED");
                                $.removeCookie("twitch_api_cookie");
                            }

                            // 처음 api 호출 끝나면 false 로 바꾼다.
                            if(first_api_call)
                                first_api_call = false;

                            // GC
                            temp_twitch_api_cookie = null;
                            streams = null;
                            temp_body = null;
                            noti_check = null;

                            // 메인일 경우 리로드
                            ADD_DEBUG("Twitch API - API 호출에 의하여 메인 리로드 됨");
                            reloadMain();

                            // 채팅에 메시지 띄움
                            /*
                            if(ADD_config.sys_meg.value !== undefined && ADD_config.sys_meg.value){
                                var temp_date = new Date();
                                temp_date = leadingZeros(temp_date.getFullYear(), 4) + "-" + leadingZeros(temp_date.getMonth() + 1, 2) + "-" +  leadingZeros(temp_date.getDate(), 2) + " " + leadingZeros(temp_date.getHours(), 2) + ":" + leadingZeros(temp_date.getMinutes(), 2) + ":" + leadingZeros(temp_date.getSeconds(), 2);
                                ADD_send_sys_msg_from_main_frame("Twitch API 호출 완료 ("+temp_date+")",0);
                            }
                            */
                        },

                        // API CALL ERROR
                        error:function(){
                            ADD_DEBUG("Twitch API - Request failed");
                        }
                    });
                }

            }
        }
        else{
            // not update
            var left_time_text = Math.floor(left_time/60/1000)+" min "+Math.floor((left_time/1000)%60)+" sec";
            ADD_DEBUG("Twitch API - 이전 API 업데이트 시간 : ",getTimeStampWithText(api_pre_time,"s"));
            ADD_DEBUG("Twitch API - 현재 시간              : ",getTimeStampWithText(now_time,"s"));
            ADD_DEBUG("Twitch API - 다음 API 업데이트 시간 : ",getTimeStampWithText(next_time,"s"));
            ADD_DEBUG("Twitch API - API 업데이트 남은 시간 : ",left_time_text);
            if ( $.cookie("twitch_api_cookie") ){
                // 쿠키 존재 시 변수로 쓴다.
                twitch_api_cookie = JSON.parse($.cookie("twitch_api_cookie"));
            }
        }
    }


    //////////////////////////////////////////////////////////////////////////////////
    // Twitch API를 주기적으로 호출하기 위한 함수
    function ADD_API_CALL_INTERVAL(){
        var intervalTime = Number(ADD_config.alarm_gap.value);
        if (intervalTime < 1.0)
            intervalTime = 1.0;
        intervalTime = intervalTime*1000*60;

        if (ADD_API_SET_INTERVAL)
            clearInterval(ADD_API_SET_INTERVAL);

        ADD_API_SET_INTERVAL = setInterval(function(){
            ADD_DEBUG("ADD_API_CALL_INTERVAL()");

            // Call Twitch api
            twitch_api();
        }, intervalTime);
    }


    ////////////////////////////////// UNIQUE WINDOW /////////////////////////////////
    // 다중창 체크하여 Twitch api 호출 막음
    function ADD_multiwindow_prevent(){
        unique_window = new Date();
        unique_window = Number(unique_window.getTime());
        $.cookie("unique_window", unique_window, { expires : 30, path : "/" });

        setInterval(function(){
            unique_window_cookie = Number($.cookie("unique_window"));
            if((unique_window_check === true)&&(unique_window != unique_window_cookie)){
                ADD_DEBUG("unique window = ",unique_window);
                ADD_DEBUG("unique window cookie is ",unique_window_cookie);
                unique_window_check = false;
                $("#notice_text").show().addClass("ADD_twitch_api_again").html("(+) 새 창에서 접속 감지 됨. 현재 창에서 다시 시작하려면 클릭.");
                $("#notice_text2").show().addClass("ADD_twitch_api_again_with_chat").html("[채팅까지 다시시작]");
                $("#notice_text_elem").show();
                clearInterval(ADD_API_SET_INTERVAL);
            }
        }, 1000);

    }
    const ONLY_STREAM = 1;
    const WITH_CHAT = 2;

    function ADD_twitch_api_again(TYPE){
        if( $(".ADD_twitch_api_again").length !== 0 ){
            $("#notice_text2").hide().removeClass("ADD_twitch_api_again_with_chat").html("");
            $(".ADD_twitch_api_again").removeClass("ADD_twitch_api_again");
            $("#notice_text").html("(+) Dostram+의 API 갱신 재시작^^7").delay(2000).fadeOut("fast");
            $("#notice_text_elem").delay(2000).fadeOut("fast");
            unique_window = new Date();
            unique_window = Number(unique_window.getTime());
            $.cookie("unique_window", unique_window, { expires : 30, path : "/" });
            unique_window_check = true;
            ADD_API_CALL_INTERVAL();

            if(TYPE == WITH_CHAT){
                $(".chat-container").html("<iframe src=\"./uchat2.php\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\"></iframe>");
            }
        }
    }


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                                FUNCTION - DOE
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    // 17-09-19 : 임시로 필요 없는 것을 숨긴다.
    function ADD_temp(){
        if( $("ul.nav").length !== 0 )
            $("ul.nav").remove();
        if( $("#streamSearchForm").length !== 0 )
            $("#streamSearchForm").remove();
    }
    // 임시 복구용
    ADD_temp();


    //////////////////////////////////////////////////////////////////////////////////
    // 설정 관련 버튼, 팝업 DOE 생성
    function ADD_config_DOE(){
        // 설정 버튼 및 팝업 생성
        $("header .container").append(`
            <div style="position:relative;margin-left:170px;">
                <div id="notice_text_elem" title="Dosteam+ System Message"><span id="notice_text">문어문어문어문어<br />블러드트레일 블러드트레일</span><span id="notice_text2"></span></div>
                    <div id="history_elem"></div>
                    <div class="AD_title">
                        <span id="ADD_change_multi" class="btn btn-default" aria-label="멀티트위치↔트위치 전환" data-microtip-position="left" role="tooltip">
                            <span class="glyphicon glyphicon-resize-horizontal">
                        </span>
                    </span>
                    <span id="ADD_quick_list" class="btn btn-default" aria-label="퀵리스트" data-microtip-position="bottom" role="tooltip">
                        <span class="glyphicon glyphicon-list">
                        </span>
                    </span>
                    <span id="ADD_config" class="btn btn-default" aria-label="설정" data-microtip-position="right" role="tooltip">
                        <span class="glyphicon glyphicon-cog">
                        </span>
                    </span>
                </div>

                <div id="popup_ADD_quick" class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="quick_list_title">Quick list</div>
                            <ul></ul>
                        </div>
                    </div>
                </div>

                <div id="popup_ADD_config" class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <table class="table table-condensed" style="margin-bottom:0px;">
                                <thead>
                                    <tr>
                                        <th colspan="2">
                                            <a href="https://nomomo.github.io/Addostream/" target="_blank">ADDostram v`+version_str+`</a>
                                            <span id="new_version_available_text" style="display:none;"></span>
                                            <a id="github_url_text" href="https://nomomo.github.io/Addostream/" target="_blank"><span style="font-weight:normal;font-size:11px;margin-left:5px;">(https://nomomo.github.io/Addostream/)</span></a>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="td_strong">
                                            <span aria-label="두스 메인 리스트의 최상단에\n원하는 스트리머를 고정" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_top_fix" onfocus="this.blur()"  />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 특정 스트리머 상단 고정
                                            </span>
                                        </td>
                                        <td>
                                            <input type="text" id="ADD_config_top_fix_ID" style="width:100%;" class="input_text_by_tag ADD_config_top_fix_form form_enabled" />
                                            <ul id="ADD_config_top_fix_ID_Tags"></ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="no_border"></td>
                                        <td>
                                            <label class="btn btn-default btn-xxs">
                                                <input type="checkbox" id="ADD_config_top_off_fix" onfocus="this.blur()" class="ADD_config_top_fix_form form_enabled" />
                                                <span class="glyphicon glyphicon-ok"></span>
                                            </label> 오프라인 시에도 고정
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td_strong">
                                            <span aria-label="기본 두스트림에 메인에 없는\nTwitch 스트리머를 메인에 추가\n(Twitch API 사용)" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_alarm" onfocus="this.blur()"  />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 메인에 스트리머 추가
                                            </span>
                                        </td>
                                        <td><input type="text" id="ADD_config_top_alarm_ID" style="width:100%;" class="input_text_by_tag ADD_config_alarm_form form_enabled" /><ul id="ADD_config_top_alarm_ID_Tags"></ul></td>
                                    </tr>
                                    <tr>
                                        <td class="no_border"></td>
                                        <td>
                                            <span aria-label="스트리머 상태 조회를 위한 시간 간격" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                조회 간격(최소 1분) <input type="text" id="ADD_config_alarm_gap" style="width:20px;height:20px;padding-left:5px;" class="ADD_config_alarm_form form_enabled" />
                                            </span>
                                            <span aria-label="위 목록에 등록된 스트리머가\n온라인이 되면 알림" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <span style="padding-left:15px;">
                                                    <label class="btn btn-default btn-xxs">
                                                        <input type="checkbox" id="ADD_config_alarm_noti" onfocus="this.blur()" class="ADD_config_alarm_form form_enabled" />
                                                        <span class="glyphicon glyphicon-ok"></span>
                                                    </label> 온라인 시 알림
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td_strong">
                                            <span aria-label="기본 두스트림에 메인에 노출하고 싶지 않은\nTwitch 스트리머를 메인 리스트에서 제거" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_streamer_hide" onfocus="this.blur()"  />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 특정 스트리머 숨기기
                                            </span>
                                        </td>
                                        <td>
                                        <span class="expand_window_on" target_elem="#ADD_config_streamer_hide_ID_container" toggle_on="▼ 목록 보기" toggle_off="▲ 목록 닫기" style="text-decoration:underline;cursor:pointer">▼ 목록 보기</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="no_border" style="height:0px;padding-top:0px;padding-bottom:0px;"></td>
                                        <td class="no_border" style="height:0px;padding-top:0px;padding-bottom:0px;">
                                            <div id="ADD_config_streamer_hide_ID_container" style="display:none;padding-top:2px;padding-bottom:2px;">
                                                <input type="text" id="ADD_config_streamer_hide_ID" style="width:100%;" class="input_text_by_tag ADD_config_streamer_hide_form form_enabled" />
                                                <ul id="ADD_config_streamer_hide_ID_Tags"></ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td_strong">
                                            <span aria-label="기본 두스트림에 메인에 노출하고 싶지 않은\n플랫폼에 해당되는 항목을 메인 리스트에서 제거" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_remember_platform" onfocus="this.blur()"  />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 특정 플랫폼 숨기기
                                            </span>
                                        </td>
                                        <td>
                                            <span style="margin-left:0px;">
                                            <label class="btn btn-default btn-xxs">
                                                <input type="checkbox" id="ADD_config_remember_twitch" class="ADD_config_remember_platform_form form_enabled" onfocus="this.blur()"  />
                                                <span class="glyphicon glyphicon-ok"></span>
                                            </label> 트위치
                                            </span>
                                            <span style="margin-left:10px;">
                                            <label class="btn btn-default btn-xxs">
                                                <input type="checkbox" id="ADD_config_remember_kakao" class="ADD_config_remember_platform_form form_enabled" onfocus="this.blur()"  />
                                                <span class="glyphicon glyphicon-ok"></span>
                                            </label> 카카오
                                            </span>
                                            <span style="margin-left:10px;">
                                            <label class="btn btn-default btn-xxs">
                                                <input type="checkbox" id="ADD_config_remember_youtube" class="ADD_config_remember_platform_form form_enabled" onfocus="this.blur()"  />
                                                <span class="glyphicon glyphicon-ok"></span>
                                            </label> 유투브
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td_strong">
                                            <label class="btn btn-default btn-xxs">
                                                <input type="checkbox" id="ADD_config_chat_ctr" onfocus="this.blur()"  />
                                                <span class="glyphicon glyphicon-ok"></span>
                                            </label> 채팅 컨트롤
                                            <span class="tooltip_container" aria-label="채팅 관련 기능을 활성화\n채팅 관련 기능은 새로고침 해야 적용됨" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <span class="glyphicon glyphicon-question-sign" style="color:#333;"></span>
                                            </span>
                                        </td>
                                        <td>
                                            <span aria-label="애드온의 작동 상태를 채팅창 메시지로 알림" data-microtip-position="top-left" role="tooltip">
                                                <span style="margin-left:0px;">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_sys_meg" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 작동 상태 알림
                                                </span>
                                            </span>
                                            <!--
                                            <span style="margin-left:10px;">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_chat_adb" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label>  광고 차단
                                            </span>
                                            <span style="margin-left:10px;">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_hide_nick_change" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label>  닉변 메시지 차단
                                            </span>
                                            -->
                                            <span id="show_memo_log" style="text-decoration:underline;cursor:pointer;margin-left:10px;">
                                                [메모 관리]
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="no_border"></td>
                                        <td>
                                            <span aria-label="채팅창의 자동스크롤이 뜬금없이 끊기는 것을 방지,\n마우스 휠을 위로 돌렸을 때 더 잘 멈추도록 함" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_chat_scroll" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 향상된 자동스크롤
                                            </span>
                                            <span style="margin-left:10px;">
                                                <span aria-label="채팅 내 좌표 링크 클릭 시 현재 창에서 열림.\nctrl 또는 shift 키를 누른 채로 클릭 시\n기존처럼 새 탭으로 열 수 있음." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_url_self" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 두스 좌표 현재 창 열기
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="no_border" style="height:16px;padding:2px 5px 0px 10px;"></td>
                                        <td style="height:16px;padding:2px 5px 0px 10px;">
                                            <span aria-label="이미지 주소 형태의 링크가\n채팅창에 등록되면 바로 보여줌" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_chat_image_preview" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 이미지 미리보기
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                    <td class="no_border" style="height:16px;padding:1px 5px 1px 10px;"></td>
                                    <td class="no_border" style="height:16px;padding:1px 5px 1px 10px;">
                                        <span style="padding-left:20px;">
                                            <span aria-label="Imgur 주소 형태의 링크가\n채팅창에 등록되면 바로 보여줌\n(Imgur API 사용)" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_imgur_preview" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_image_preview_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> Imgur 이미지
                                            </span>
                                        </span>
                                        <span style="padding-left:10px;">
                                            <span aria-label="트위치 주소 형태의 링크가\n채팅창에 등록되면 섬네일을 표시" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_chat_image_twitch_thumb" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_image_preview_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 트위치 링크
                                            </span>
                                        </span>
                                            <span style="padding-left:10px;">
                                                <span aria-label="유투브 주소 형태의 링크가\n채팅창에 등록되면 섬네일을 표시" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_chat_image_youtube_thumb" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_image_preview_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 유투브 링크
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="no_border" style="height:16px;padding:1px 5px 1px 10px;"></td>
                                        <td class="no_border" style="height:16px;padding:1px 5px 1px 10px;">
                                            <span aria-label="이미지를 어둡게 가려진 상태로 보여줌\n버튼을 클릭해야 이미지 보기 가능" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <span style="margin-left:20px;"></span>
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_imgur_preview_safe" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_image_preview_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 후방주의 기능 활성
                                            </span>
                                            <span class="ADD_under_dev">
                                            <span aria-label="피부톤 이미지인 경우에만 후방주의 기능을 활성\n너굴맨이 이미지를 먼저 확인한 후\n피부색이 없어야 출력하므로 이미지가 조금 늦게 뜰 수 있다.\n추가 이미지 로드 시에는 적용되지 않는다." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <span style="margin-left:20px;"></span>
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_nudity_block" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_image_preview_form ADD_config_imgur_preview_safe_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 피부톤 이미지만
                                            </span>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="no_border" style="height:16px;padding:0px 5px 3px 10px;"></td>
                                        <td class="no_border" style="height:16px;padding:0px 5px 3px 10px;">
                                            <span style="margin-left:40px;">└ 박스 투명도(0:투명, 1:불투명)</span> <input type="text" id="ADD_config_imgur_preview_opacity" style="width:32px;height:20px;padding-left:3px;" class="ADD_config_chat_ctr_form ADD_config_chat_image_preview_form ADD_config_imgur_preview_safe_form form_enabled" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="no_border" style="height:16px;padding:3px 5px 0px 10px;"></td>
                                        <td style="height:16px;padding:3px 5px 0px 10px;">
                                            <span aria-label="채팅 내용 또는 닉네임에 금지단어가 있으면 채팅을 차단함\n(닉 바꿔가면서 도배 시 유용)" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_chat_block" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 금지단어 기반 채팅 차단
                                            </span>
                                            <span style="margin-left:10px;">
                                                <span aria-label="채팅이 삭제되면 &lt;message deleted&gt; 로 표시" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                    <label class="btn btn-default btn-xxs">
                                                        <input type="checkbox" id="ADD_config_chat_block_noti" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_block_form form_enabled" />
                                                        <span class="glyphicon glyphicon-ok"></span>
                                                    </label> 삭제 여부 알림
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="no_border" style="height:16px;padding:1px 5px 3px 10px;"></td>
                                        <td class="no_border" style="height:16px;padding:1px 5px 3px 10px;">
                                        <span style="margin-left:25px;">
                                            검색 대상:
                                            <span style="margin-left:5px;">
                                                <span aria-label="채팅 내용에 금지단어가 있으면 차단" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                    <label class="btn btn-default btn-xxs">
                                                        <input type="checkbox" id="ADD_config_chat_block_contents" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_block_form form_enabled" />
                                                        <span class="glyphicon glyphicon-ok"></span>
                                                    </label> 내용
                                                </span>
                                            </span>
                                        </span>
                                        <span style="margin-left:5px;">
                                            <span aria-label="채팅 닉네임에 금지단어가 있으면 차단\n닉네임이 바뀌는 환경에서 유용함(ex. 우하하)" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_chat_block_nickname" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_block_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 닉네임
                                            </span>
                                        </span>
                                        <span class="expand_window_on" target_elem="#block_contents_tr" toggle_on="▼ 단어 보기" toggle_off="▲ 메뉴 닫기" style="margin-left:10px;text-decoration:underline;cursor:pointer">▼ 단어 보기</span>
                                        <span class="tooltip_container" aria-label="차단된 채팅 기록 보기" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                            <span id="show_blocked_chat" style="float:right;text-decoration:underline;cursor:pointer;">[Log]</span>
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="no_border" style="height:0px;padding-top:0px;padding-bottom:0px;"></td>
                                        <td class="no_border" style="height:0px;padding-top:0px;padding-bottom:0px;">
                                            <div id="block_contents_tr" style="display:none;padding-top:2px;padding-bottom:2px;">
                                                <input type="text" id="ADD_config_chat_block_tag" style="width:100%;" class="input_text_by_tag ADD_config_chat_ctr_form ADD_config_chat_block_form form_enabled" /><ul id="ADD_config_chat_block_tag_Tags"></ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td_strong">
                                            <label class="btn btn-default btn-xxs">
                                                <input type="checkbox" id="ADD_config_thumbnail_mouse" class="" onfocus="this.blur()"  />
                                                <span class="glyphicon glyphicon-ok"></span>
                                            </label> 섬네일 마우스온 확대</td>
                                        <td>
                                            <label class="radio-inline">
                                                <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_1" value="1" class="ADD_config_thumbnail_mouse_form form_enabled" onfocus="this.blur()"> 작음
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_2" value="2" class="ADD_config_thumbnail_mouse_form form_enabled" onfocus="this.blur()"> 중간
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_3" value="3" class="ADD_config_thumbnail_mouse_form form_enabled" onfocus="this.blur()"> 큼
                                            </label>
                                        </td>
                                    </tr>
                                    <tr class="debug_active" style="display:none;">
                                        <td class="td_strong">개발 중 기능 표시 <span class="glyphicon glyphicon-wrench" style="color:#999;"></span>
                                            <span class="tooltip_container" aria-label="개발 중인 기능을 보여준다. 해당 기능들은 완성되지 않았으며 불안정함." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>
                                            </span>
                                        </td>
                                        <td><input type="checkbox" id="ADD_config_under_dev" onfocus="this.blur()" class="form_enabled" /></td>
                                    </tr>
                                    <tr>
                                        <td class="td_strong">
                                            기타 기능 On-Off
                                        </td>
                                        <td>
                                            <span style="margin-left:0px;">
                                            <label class="btn btn-default btn-xxs">
                                                <input type="checkbox" id="ADD_config_history" class="" onfocus="this.blur()"  />
                                                <span class="glyphicon glyphicon-ok"></span>
                                            </label> 시청 기록 표시
                                            </span>
                                            <span style="margin-left:10px;">
                                            <label class="btn btn-default btn-xxs">
                                                <input type="checkbox" id="ADD_config_insagirl_button" class="" onfocus="this.blur()"  />
                                                <span class="glyphicon glyphicon-ok"></span>
                                            </label> 빠른 좌표 보기
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="td_strong">테마 (현재 사용 불가)</td>
                                        <td>
                                            <span aria-label="설정 저장해야 재접속 시 유지됨." data-microtip-position="top-right" role="tooltip">
                                            <select id="ADD_config_theme_select">
                                                <option value="Default" selected>Default</option>
                                                <option value="Dark">Dark</option>
                                            </select>
                                                <input type="text" id="ADD_config_theme" style="width:50%;display:none;" class="form_disabled" />
                                            </span>
                                        </td>
                                    </tr>
                              </tbody>
                           </table>
                        </div>
                        <div class="modal-footer">
                          <!--<div class="glyphicon glyphicon-ok bg-success" style="display:block;float:left;height:30px; width:100%;padding:7px 0px;">Saved successfully!</div>-->
                          <div id="ADD_config_Success" class="btn btn-success confirm_selection" style="display:none;">Done! 문제 발생 시 새로고침 or 재설치!</div>
                            <button type="button" id="ADD_config_restore" class="btn btn-default btn-sm">Backup & Restore</button>
                            <button type="button" id="Cookie_reset" class="btn btn-sm">Reset</button>
                            <button type="button" id="ADD_config_save" class="btn btn-primary btn-sm">Save</button>
                        </div>
                     </div>
                  </div>

              </div>
            `);


        // 디버그 모드의 경우 디버그용 버튼 및 팝업 생성
        if(ADD_DEBUG_MODE){
            $("#ADD_quick_list").before(`
                         <span id="ADD_test_button" class="btn btn-default">
                            <span class="glyphicon glyphicon-wrench" style="color:#999;">
                            </span>
                         </span>
                         `);
            $("#popup_ADD_config").before(`
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
        }

        // @
        if($(".footer").html() !== undefined){
            var at_fix = $(".footer").html().replace("@","<div id=\"at\" title=\"????\">@</div>");
            $(".footer").html(at_fix);
        }

        // 자동완성 이후 처리
        // 현재 사용하지 않으므로 주석처리 한다.
        /*
        var afterTagCreate = function(event, ui){
            var tag_elem = ui.tag.children("span.tagit-label");
            var tag_text = tag_elem.html();
            if(tag_text === null || tag_text === undefined){
                return;
            }
            if(tag_text.indexOf("\(") != -1 && tag_text.indexOf("\)") != -1){
                tag_text = tag_text.split("\(")[1].split("\)")[0].replace(" ","");
                if(tag_text === undefined || tag_text === null){
                    return;
                }
                if($.inArray(tag_text, streamerArray_name) != -1){
                    tag_elem.html(tag_text);
                }
            }
            else {
                var temp_index = $.inArray(tag_text, streamerArray_display_name);
                if(temp_index != -1){
                    tag_elem.html(streamerArray_name[temp_index]);
                }
            }
        };
        */

        var preprocessingTag = function(val){
            var tag_text = val;
            if(tag_text === null || tag_text === undefined){
                return val;
            }
            if(tag_text.indexOf("(") != -1 && tag_text.indexOf(")") != -1){
                tag_text = tag_text.split("(")[1].split(")")[0].replace(" ","");
                if(tag_text === undefined || tag_text === null){
                    return val;
                }
                if($.inArray(tag_text, streamerArray_name) != -1){
                    return tag_text;
                }
            }
            else {
                var temp_index = $.inArray(tag_text, streamerArray_display_name);
                if(temp_index != -1){
                    return streamerArray_name[temp_index];
                }
            }
            return val;
        };

        var TagExist = function(evt, ui){
            var new_elem = ui.existingTag.closest("ul").find("li.tagit-new input[type=\"text\"]");
            var new_elem_text = new_elem.val();
            new_elem.val(preprocessingTag(new_elem_text));
            //addEvent('onTagExists: ' + eventTags.tagit('tagLabel', ui.existingTag));
        };

        $("#myTags").tagit({singleField: true,singleFieldNode: $("#my")});
        $("#ADD_config_top_fix_ID_Tags").tagit({autocomplete: {delay: 0},onTagExists:TagExist,preprocessTag:preprocessingTag,availableTags:streamerArray_AutoComplete,singleField: true,singleFieldNode: $("#ADD_config_top_fix_ID")});
        $("#ADD_config_top_alarm_ID_Tags").tagit({autocomplete: {delay: 0},onTagExists:TagExist,preprocessTag:preprocessingTag,availableTags:streamerArray_AutoComplete,singleField: true,singleFieldNode: $("#ADD_config_top_alarm_ID")});
        $("#ADD_config_streamer_hide_ID_Tags").tagit({autocomplete: {delay: 0},onTagExists:TagExist,preprocessTag:preprocessingTag,availableTags:streamerArray_AutoComplete,singleField: true,singleFieldNode: $("#ADD_config_streamer_hide_ID")});
        $("#ADD_config_chat_block_tag_Tags").tagit({autocomplete: {delay: 0},singleField: true,singleFieldNode: $("#ADD_config_chat_block_tag")});

        $("li.tagit-new").each(function(){ $(this).hide(); });
        $("input:text .ui-autocomplete-input").each(function(){ $(this).attr("spellcheck", false); });
    }

    // Theme 바뀔 때 이벤트
    $(document).on("change", "#ADD_config_theme_select", function(){
        var str = "";
        $( "select option:selected" ).each(function(){
            str += $( this ).text();
        });
        $("#ADD_config_theme").val( str );
        ADD_change_theme(str);
    });

    ////////////////////////////////////////////////////////////////
    // 이전 시청 기록
    // 주소 체크
    function check_stream_and_chennel_from_location(){
        if(urlCheck() === C_STREAM){
            var document_url = location.href;
            // 유투브의 경우에만 대소문자 구분함
            if(document_url !== null && document_url.indexOf("#/stream/youtube/") === -1){
                document_url = document_url.toLowerCase();
            }

            if(document_url !== null && document_url.indexOf("#/stream/") !== -1){
                var keyword_stream = (document_url.split("#/stream/"));
                keyword_stream = keyword_stream[1];
                var keyword_channel = keyword_stream.split("/");
                if(keyword_channel.length !== 2){
                    ADD_DEBUG("check_stream_and_chennel_from_location 에서 / 개수로 인한 에러 발생");
                    return null;
                }
                else{
                    var return_array = [];
                    return_array[0] = keyword_channel[1];
                    return_array[1] = keyword_channel[1];
                    return_array[2] = keyword_channel[0];
                    return return_array;
                }
            }
            else{
                ADD_DEBUG("채널 히스토리 등록 중 #/stream/ 을 찾지 못함");
                return null;
            }
        }
    }

    // 쿠키 작성 동작
    function ADD_Channel_history_cookie(rw_array){
        // rw_array[0]:channel_id, rw_array[1]:channel_nick, rw_array[2]:platform
        // 쿠키 읽어서 변수에 담는다

        var ADD_MAX_HISTORY = ADD_config.max_history.value;

        var ADD_h_cookie = $.cookie("ADD_h_cookie");
        if(ADD_h_cookie === null || ADD_h_cookie === undefined){
            ADD_h_cookie = [];
        } else {
            ADD_h_cookie = JSON.parse(ADD_h_cookie);
        }

        // read
        if(rw_array === undefined || rw_array === null || rw_array === 0){
            // 읽기만 하는 경우에는 그냥 리턴
            // ADD_DEBUG('히스토리 변경 없음');
        }
        // write
        else{
            // 아이디에 따른 닉네임 찾기
            var ch_text = "";
            var temp_array = rw_array[0].split("&");
            for (var j=0; j<temp_array.length; j++){
                if(j !== 0){
                    ch_text = ch_text+"&";
                }
                ch_text = ch_text+ADD_streamer_nick(temp_array[j]).toUpperCase();
            }
            if(rw_array[2] === "multitwitch"){
                ch_text = ch_text+"(멀티)";
            }
            rw_array[1] = ch_text;

            // 기존 쓰여진 쿠키에 중복 여부 찾기
            var finded_h = false;
            for(var i=0;i<ADD_h_cookie.length;i++){
                if(ADD_h_cookie[i][0] !== undefined && rw_array[0] === ADD_h_cookie[i][0] && rw_array[2] === ADD_h_cookie[i][2]){
                    ADD_h_cookie.splice(i,1);
                    // unshift : 맨앞추가, pust : 맨뒤추가
                    ADD_h_cookie.unshift(rw_array);
                    finded_h = true;
                    break;
                }
            }
            if(!finded_h){
                ADD_h_cookie.unshift(rw_array);
            }
        }

        // 쿠키 쓰기
        if(ADD_h_cookie.length > ADD_MAX_HISTORY){
            ADD_h_cookie = ADD_h_cookie.slice(0,ADD_MAX_HISTORY-1);
        }

        //ADD_DEBUG('히스토리 쓰기: ',rw_array, ADD_h_cookie);
        $.cookie("ADD_h_cookie", JSON.stringify(ADD_h_cookie), { expires : 365, path : "/" });

        return ADD_h_cookie;

    }

    function ADD_Channel_History_DOE(ADD_h_cookie, fade){
        if($("#history_elem").length === -1){
            ADD_DEBUG("#history_elem 을 찾을 수 없습니다");
            return false;
        }

        var ADD_MAX_HISTORY = ADD_config.max_history.value;

        var ch_streamer_id = "";
        var ch_streamer_nick = "";
        var ch_stream = "";
        var ch_text = "";
        var h_text = "";
        var from2 = "";
        var platform_class = "";
        var h_title_text = "";
        var ch_stream_text = "";

        if(ADD_h_cookie !== null){
            h_text = "<span class=\"h_container\">";

            for(var i=0;i<ADD_h_cookie.length;i++){
                if(ADD_MAX_HISTORY === i)
                    break;

                ch_text = "";
                ch_streamer_id = ADD_h_cookie[i][0];
                ch_streamer_nick = ADD_h_cookie[i][1];
                ch_stream = ADD_h_cookie[i][2];
                ch_stream_text = ch_stream.substring(0, 1).toUpperCase() + ch_stream.substring(1, ch_stream.length).toLowerCase();

                switch(ch_stream){
                case "twitch":
                    platform_class = "h_twitch";
                    ch_text = ch_streamer_nick;
                    break;
                case "kakao":
                    platform_class = "h_kakao";
                    ch_text = ch_streamer_id;
                    break;
                case "youtube":
                    platform_class = "h_youtube";
                    ch_text = ch_streamer_id;
                    break;
                case "afreeca":
                    platform_class = "h_afreeca";
                    ch_text = ch_streamer_id;
                    break;
                case "multitwitch":
                    platform_class = "h_twitch";
                    ch_text = ch_streamer_nick;
                    break;
                case "okru":
                    ch_stream_text = "OK";
                    platform_class = "h_okru";
                    ch_text = ch_streamer_id + "(OK)";
                    break;
                default:
                    platform_class = "";//"h_" + ch_stream;
                    ch_text = ch_streamer_id + "(" + ch_stream + ")";
                    break;
                }

                if(i == 0){
                    from2 = "";
                }
                else{
                    from2 = "<span style=\"color:#bbb;padding:0px 6px;user-select: none;\">〈</span>";
                }

                if(platform_class !== ""){
                    platform_class = "<span class=\"h_icon "+ platform_class +"\" title=\"" +  ch_stream_text  + "\"></span>";
                }

                h_title_text = ch_streamer_nick + "(" + ch_streamer_id  + ") - " + ch_stream_text;
                h_text = h_text + "<div class=\"h_text_container\">" + from2 + platform_class + "<a href=\"" + "http://www.dostream.com/#/stream/" + ch_stream + "/" + ch_streamer_id + "\" title=\"" + h_title_text + "\">" + ch_text + "</a></div>";
            }
            h_text = h_text + "</span>";
            if(fade){
                $("#history_elem").hide().html(h_text).fadeIn(1000);
            }
            else {
                $("#history_elem").html(h_text);
            }

            if(urlCheck()  === C_STREAM){
                $("#history_elem a:first").addClass("nowplaying");
            }
        }
        else{
            ADD_DEBUG("ADD_Channel_History_DOE 에서 배열 크기가 null 입니다");
        }
    }

    // DOE 및 이벤트 생성
    function ADD_Channel_History_Run(){
        var urlcheck = urlCheck();
        if(urlcheck === C_UCHAT){
            return false;
        }

        var ADD_history = ADD_config.history.value;
        if(!ADD_history){
            if($("#history_elem").length !== 0){
                $("#history_elem").html("");
            }
            $(window).off("hashchange.history");
            return false;
        }

        var current_info = [];
        var total_history = [];

        // Case 1. 초기 접속 시
        if(urlcheck === C_MAIN){
            // 메인으로 접속하는 경우
            total_history = ADD_Channel_history_cookie();
        }
        else if(urlcheck === C_STREAM){
            // 스트림 주소로 직접 접속하는 경우
            current_info = check_stream_and_chennel_from_location();
            total_history = ADD_Channel_history_cookie(current_info);
        }

        // Case 2. 이벤트로 인해 접속하는 경우
        $(window).on("hashchange.history", function(){
            current_info = check_stream_and_chennel_from_location();
            total_history = ADD_Channel_history_cookie(current_info);

            ADD_Channel_History_DOE(total_history, false);
        });

        // DOE 지우고 새로쓰기
        ADD_Channel_History_DOE(total_history, true);
    }

    ////////////////////////////////////////////////////////////////
    // 차단된 채팅 로그 보기
    $(document).on("click", ".expand_window_on", function(){
        var $target_elem = $(this).attr("target_elem");
        var toggle_on = $(this).attr("toggle_on");
        var toggle_off = $(this).attr("toggle_off");
        if ($($target_elem).is(":visible")) {
            $(this).text(toggle_on);                
        } else {
            $(this).text(toggle_off);                
        }
        $($target_elem).slideToggle("fast");
    });

    $(document).on("click", "#show_blocked_chat", async () => {
        $("html").addClass("no-scroll");
        var ADD_Blocked_Chat = await ADD_GetVal("ADD_Blocked_Chat", []);
        var Blocked_text = "";
        if(ADD_Blocked_Chat.length === 0){
            Blocked_text = "현재 차단된 채팅이 없습니다.";
        }
        else{
            for(var i=(ADD_Blocked_Chat.length - 1); i>=0; i--){
                if(typeof ADD_Blocked_Chat[i] === "object"){
                    // {"created":date, "nick":nick, "content":content};
                    var temp_obj = ADD_Blocked_Chat[i];
                    Blocked_text = Blocked_text
                        + "<span class='blocked_chat_date' style='width:110px;margin-right:10px;display:inline-block;'>"
                        + getTimeStampWithDash(new Date(temp_obj.created), "s")
                        + "</span>|<span class='blocked_chat_nick' style='width:60px;margin:0 10px 0 10px;display:inline-block;text-align:center;'>"
                        + temp_obj.nick
                        + "</span>:<span class='blocked_chat_content' style='margin:0 0 0 10px;'>"
                        + temp_obj.content
                        + "</span><br />";
                }
                else{
                    Blocked_text = Blocked_text + ADD_Blocked_Chat[i]+"<br />";
                }
            }
        }
        $("body").append(`
            <div class="lightbox-opened">
                <div class="lightbox-opened-white-background modal-content" style="cursor:default;max-width:1200px;min-width:500px;display:table;">
                    <div style="font-family:'Noto Sans KR', '맑은 고딕', 'malgun gothic', dotum, serif;">
                        <span style="font-weight:900;font-size:14px;">차단 기록 보기</span><br />
                        <span style="margin:0 0 5px 0;display:inline-block;">차단된 채팅은 최대 100개까지 저장됩니다.</span><br />
                        `+Blocked_text+`
                    </div>
                </div>
            </div>
            `);
    });

    // 금지 단어에서 채팅 차단하기
    async function ADD_chatBlock(elem, force, nick, content, date, isNick, isContent, isShowDelMsg){
        var force_ = force;

        // 금지단어 찾기
        if(!force_){
            // 검색 대상 설정
            var searchTarget;
            if(isNick){
                searchTarget = nick;
            }
            else if(isContent){
                searchTarget = content;
            }
            else{
                return false;
            }

            var block_tag_arr = ADD_config.chat_block_tag.value;
            for(var i=0;i<block_tag_arr.length;i++){
                // 금지 단어에서 찾은 경우
                if(searchTarget.indexOf(block_tag_arr[i]) !== -1){
                    force_ = true;
                    break;
                }
            }
        }

        if(force_){
            // 기존 금지 단어 로그 불러와서 저장하기
            var ADD_Blocked_Chat = await ADD_GetVal("ADD_Blocked_Chat", []);
            if(ADD_Blocked_Chat.length > 100){
                ADD_Blocked_Chat.shift();
            }
            var temp_obj = {"created":date, "nick":nick, "content":content};
            ADD_Blocked_Chat.push(temp_obj);
            await ADD_SetVal("ADD_Blocked_Chat", ADD_Blocked_Chat);
            ADD_DEBUG("채팅 차단 완료", temp_obj);

            // message deleted 표시하기
            if(isShowDelMsg){
                elem.html("<div style=\"text-align:center;color:#aaa;\">&ltmessage deleted&gt</div>");

                // UCHAT의 경우 - 마우스 올리면 차단된 내용 보여주게 처리
                var $line = elem.closest("div.line");
                if($line.length !== 0 && $line.attr("data-tiptext") !== undefined && $line.attr("data-tiptext") !== null){
                    $line.attr("data-tiptext", nick + ": " + content + " - {ago}");
                }
            }
            // message deleted로 표시하지 않는 경우 메시지 지우기
            else{
                elem.remove();
            }
            
            return true;
        }
        
        return false;
    }

    ////////////////////////////////////////////////////////////////////
    // TAGS TEXT INPUT FOCUS EVENT
    $(document).on("click", "ul.tagit", function(){
        $(this).find("li.tagit-new").show();
        $(this).find("li.tagit-new input:text").focus();
    });

    $(document).on("focusout", "li.tagit-new input:text", function(){
        $(this).closest("li.tagit-new").hide();
        $(this).val("");
    });

    //SPAN 영역에 클릭 이벤트 설정
    $(document).on("click", "li.tagit-choice", function(event){
        event.stopPropagation();
    });

    //////////////////////////////////////////////////////////////////////////////////
    // test event 테스트 이벤트
    var text_e;
    function ADD_test_DOE(){
        text_e = [
            { title: "메모 초기화",
                func:async function(){
                    var r = confirm("진짜 초기화?");
                    if(r){
                        //ADD_memo_init();
                        await ADD_SetVal("ADD_chat_manager_data",[]);
                        ADD_DEBUG("채팅 매니저 데이터 초기화");
                        
                        // 메모 불러오기
                        // ADD_chat_memo = await ADD_GetVal("ADD_chat_memo");
                        // 메모 저장
                        // await ADD_SetVal("ADD_chat_memo", JSON.stringify(ADD_chat_memo));
                    }
                }
            },
            { title: "Imgur 이미지 채팅창에 출력",
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
                    var noti_options = {
                        title: "title",
                        options: {
                            body: "body",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC",
                            lang: "ko-KR"
                        }
                    };
            
                    $("#easyNotify").easyNotify(noti_options);
                    noti_options = null;
                }
            },
            { title: "버전 체크 시간 초기화",
                func:async function(){
                    await ADD_SetVal("ADD_version_last_check_time",new Date(Date.parse(new Date()) - 2 * 1000 * 60 * 60 * 24));
                }
            },
            {
                title: "개발중 기능 on-off",
                func:async function(){
                    ADD_config.under_dev.value = !ADD_config.under_dev.value;
                    ADD_config_var_write();
                    if(ADD_config.under_dev.value){
                        $(".ADD_under_dev").show();
                    }
                    else{
                        $(".ADD_under_dev").hide();
                    }
                    alert("개발중 기능 설정 변겅\nADD_config.under_dev.value: "+!ADD_config.under_dev.value+" → "+ADD_config.under_dev.value);
                }
            },
            {
                title: "insagirl_block_by_nick 기능 on-off",
                func:async function(){
                    ADD_config.insagirl_block_by_nick.value = !ADD_config.insagirl_block_by_nick.value;
                    ADD_config_var_write();
                    alert("개발중 기능 설정 변겅\nADD_config.insagirl_block_by_nick value: "+!ADD_config.insagirl_block_by_nick.value+" → "+ADD_config.insagirl_block_by_nick.value);
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

                    // 플레이어는 DOE 로 생성되어서 안 먹힘
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
            }
        ];

        text_e.forEach(function(obj){
            var $tempText = $(`
            <tr class="active">
                <td>`+obj.title+`</td>
                <td><span style="cursor:pointer;font-weight:bold;">실행</span></td>
            </tr>
            `).on("click",function(){
                obj.func();
            });

            $("#popup_ADD_test_tbody").append($tempText);
        });
    }


    //////////////////////////////////////////////////////////////////////////////////
    // 현재 화면이 어디인지를 체크함
    function urlCheck(){
        var document_url = location.href;
        document_url = document_url.toLowerCase();
        var keyword_stream = document_url.indexOf("#/stream/");
        var keyword_uchat = document_url.indexOf("uchat2.php");
        if(keyword_uchat !== -1){
            return C_UCHAT;
        }
        else if( keyword_stream !== -1 ){
            return C_STREAM;
        }
        else{
            return C_MAIN;
        }
    }

    function reloadMain(){
        if(urlCheck() !== C_STREAM){
            //if(typeof newdsStream === "function"){
            if((web_browser === "firefox") && (typeof exportFunction === "function")){
                page = new newdsStreamForExportFunction();
            }
            else{
                page = new dsStream();
            }
            page.reload();
            ADD_multitwitch_DOE();
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 멀티트위치 관련 버튼 생성 함수
    function ADD_multitwitch_DOE(){
        if( $(".search").length === 0 && $(".main-streams").length !== 0){
            $(".main-streams").prepend(`<div class="search">
            <a class="checkbox twitch checked">트위치</a><a class="checkbox kakao checked">카카오</a><a class="checkbox youtube checked">유튜브</a>
        </div>`);
        }
        else{
            //ADD_DEBUG('search',$('.search').length === 0);
            ADD_DEBUG("main-streams 존재?: ",$(".main-streams").length !== 0);
            return;
        }
        // 멀티트위치 버튼
        if( $("#multitwitch").length === 0 && $(".search").length !== 0 )
            $(".search").append("<span aria-label=\"체크한 스트리머를 멀티트위치로 실행\" data-microtip-position=\"right\" role=\"tooltip\"><span id=\"multitwitch\" style=\"cursor: pointer; display:inline-block; font-size:12px; line-height:20px; margin:0 5px 0 0; padding: 5px 10px; background: #eee none repeat scroll 0 0; color: #222;\">멀티트위치</span></span>");

        // Hide Streamer 버튼
        if( $("#addHideStreamer").length === 0 && $(".search").length !== 0 )
            $(".search").append("<span style=\"float:right;\"><span aria-label=\"체크한 스트리머를 메인에서 숨김\" data-microtip-position=\"left\" role=\"tooltip\"><span id=\"addHideStreamer\" style=\"display:none; cursor: pointer; font-size:12px; line-height:20px; margin:0 5px 0 0; padding: 5px 10px; background: #C64D4D none repeat scroll 0 0; color: #fff;\">HIDE</span></span></span>");
    }

    // 멀티트위치 버튼 동작 관련 함수
    function multitwitch_run(){
        var multitext = checkedStreamerFromList.join("&");
        if(checkedStreamerFromList.length === 0)
            alert("Check the checkboxs to use multitwitch!");
        else
            $(location).attr("href","/#/stream/multitwitch/"+multitext);
    }

    // Hide Streamer 버튼 동작 관련 함수
    async function addHideStreamer_run(){
        var IndexCheckedID = true;
        if(checkedStreamerFromList.length !== 0){
            for(var i=0; i<checkedStreamerFromList.length; i++){
                IndexCheckedID = $.inArray(checkedStreamerFromList[i], ADD_config.streamer_hide_ID.value);
                if(IndexCheckedID == -1){
                    (ADD_config.streamer_hide_ID.value).push(checkedStreamerFromList[i]);
                }
            }
            await ADD_config_var_write();
            ADD_var_to_config_form();
            reloadMain();
            $("#addHideStreamer").hide();
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
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

    async function parse_insagirl(page){
        ADD_DEBUG("RUNNING - parse_insagirl");
        GM_xmlhttpRequest({
            url: "http://insagirl-hrm.appspot.com/json2/2/1/"+page+"/",
            method: "GET",
            headers: {
                "Content-Type": "application/javascript"
            },
            onload: async function(response){
                if($("#hrm_DOE").length === 0){
                    ADD_DEBUG("hrm_DOE가 없다");
                    return;
                }
                // 채팅 매니저 불러오기
                if(ADD_config.insagirl_block_by_nick.value){
                    get_chat_manager_from_main_frame();
                }
                //var expUrl = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?/=~_|!:,.;]*)[-A-Z0-9+&@#/%=~_|])/ig;
                var data = response.responseText;
                var hrm_DOE_HTML = "";
                data = JSON.parse(data);
                data = data.v;
                for(var z=0; z<data.length; z++){
                    data[z] = data[z].split("|");
                    var nick = data[z][1];
                    if(ADD_config.insagirl_block_by_nick.value && chat_manager !== undefined && chat_manager.getIsBlock(nick)){
                        continue;
                    }
                    var content = data[z][2];//.replace(expUrl, "<a href=\"$&\" target=\"_blank\">$&</a>");
                    var a = (new Date).getTime();
                    var e = data[z][0];
                    var i = Math.floor((a - e) / 1e3),
                        r = parseInt(i / 3600),
                        s = parseInt(i / 60) % 60,
                        u = i % 60,
                        l = "(" + (r > -1 && 10 > r ? "0" + r : r) + ":" + (s > -1 && 10 > s ? "0" + s : s) + ":" + (u > -1 && 10 > u ? "0" + u : u) + ")";
                    //if(content.indexOf("#/stream/") !== -1){
                    //    content = content.replace("target=\"_blank\"","");
                    //}
                    hrm_DOE_HTML = hrm_DOE_HTML + "<li>" + l + nick + ": " + content + "</li>";
                }
                var myLinkedHtml = autolinker.link(hrm_DOE_HTML);
                $("#hrm_DOE ul:first").html("").append(myLinkedHtml);
            }, onerror: async function(){
                ADD_DEBUG("좌표 파싱 중 에러 발생");
                await ADD_SetVal("Cross_Origin_Hrm", false);
            }
        });
    }

    function hrm_DOE(){
        if(urlCheck() === C_UCHAT){
            return false;
        }

        var ADD_insagirl_button = ADD_config.insagirl_button.value;
        if(!ADD_insagirl_button && $("#btnOpenHrm").length !== 0 && $("#btnOpenHrm_ADD").length !== 0){
            $("#btnOpenHrm_ADD").fadeOut("300").delay("700").remove();
            $("#btnOpenHrm").css("transition","width 1s, height 1s, transform 1s").css("height","45px");
            $("#hrm_DOE").fadeOut("300").delay("700").remove();
            $(".chat-container").css("top","45px");
            return false;
        }
        else if(!ADD_insagirl_button && $("#btnOpenHrm").length !== 0 && $("#btnOpenHrm_ADD").length === 0){
            return false;
        }
        else if($("#btnOpenHrm").length !== 0 && $("#btnOpenHrm_ADD").length == 0){
            ADD_DEBUG("좌표 버튼 기능 변경");
            $("#btnOpenHrm").before("<button class=\"btn-blue\" style=\"margin-right:-80px;background-color:#446cb3;margin-bottom:-45px;\"></button>")
                .after("<button id=\"btnOpenHrm_ADD\" class=\"btn-blue\" style=\"height:0px;display:none\">▼</button>").css("transition","width 1s, height 1s, transform 1s").css("height","22.5px");
            $("#btnOpenHrm_ADD").css("transition","width 2s, height 2s, transform 2s").css("height","22px").delay("700").fadeIn("300");
            $(".chat-ignore").after(`
            <div id="hrm_DOE">
                <ul></ul>
                <div style="padding:5px;">
                    <button id="hrmbodyexpand" type="button" class="btn btn-primary btn-block">더 보기</button>
                </div>
            </div>
            `);
            $("#hrm_DOE").after(`
                <div id="hrm_split_bar" style="cursor:ns-resize;position:absolute;width:100%;height:5px;background-color:#666;display:none;"></div>
            `);
        }
        else{
            ADD_DEBUG("좌표 버튼이 이미 존재 or 좌표 버튼을 찾지 못함");
        }
    }

    $(document).on("click","#btnOpenHrm_ADD",async function(){
        
        if($("#hrm_DOE").is(":hidden")){
            if(await checkCrossAccess("http://insagirl-hrm.appspot.com/json2/2/1/1/","Cross_Origin_Hrm", function(){$("#btnOpenHrm_ADD").trigger("click");})){
                await parse_insagirl(1);

                $(this).html("▲");

                var hrmDOEHeight = await ADD_GetVal("ADD_hrmDOEHeight" , $(".chat-container").height() * 0.5);
                var chatContainerHeight = $(".chat-container").height();

                var chatHeight = chatContainerHeight - hrmDOEHeight - 5;
                if(chatHeight <= 100 ){
                    hrmDOEHeight = Math.max(0, chatContainerHeight - 100 - 5);
                }

                $("#hrm_DOE").height(hrmDOEHeight+"px").show();
                $("#hrm_split_bar").css("top",(hrmDOEHeight+45)+"px").show();
                $("#hrmbodyexpand").show();

                $(".chat-container").css("top",(hrmDOEHeight+45+5)+"px");
            }
        }
        else{
            $(this).html("▼");
            $("#hrm_DOE").hide();
            $("#hrm_split_bar").hide();
            $("#hrm_DOE ul:first").html("");
            $(".chat-container").css("top","45px");
        }
    });

    // 편한 좌표 보기 크기 조절 이벤트
    $(document).on("mousedown", "#hrm_split_bar", function (e) {
        e.preventDefault();
        $("html").addClass("no-scroll");
        
        // 초기 Y, 각 엘리먼트 높이 저장
        var initY = e.pageY;
        var hrmDOEHeight = $("#hrm_DOE").height();
        var new_hrmDOEHeight = hrmDOEHeight;
        var chatContainerHeight = $(".chat-container").height();
        var new_chatContainerHeight = chatContainerHeight;
        
        // iframe 가릴 스크린 생성
        $("#hrm_split_bar").after(`
            <div class="chat_container_screen" style="width:100%;height:100%;position:absolute;z-index:5000"></div>
        `);
        $(".chat_container_screen").css("top",$("#hrm_DOE").height()+45+5+"px");
        
        $(document).on("mousemove.hrm_mousemove", function (e) {
            e.preventDefault();
            
            // 움직인 거리 계산
            var pageY = e.pageY;
            var movedY = pageY - initY;
            ADD_DEBUG("hrmDOEHeight", hrmDOEHeight, "chatContainerHeight", chatContainerHeight, "pageY", pageY, "movedY", movedY, "new_hrmDOEHeight", new_hrmDOEHeight);

            // 새 height 계산
            new_hrmDOEHeight = hrmDOEHeight + movedY;
            new_chatContainerHeight = chatContainerHeight - movedY;

            // 조건 반영 후 크기 설정
            if (new_hrmDOEHeight < 0){
                new_hrmDOEHeight = 0;
            }
            if ( new_chatContainerHeight >= 100) {
                $("#hrm_DOE").height(new_hrmDOEHeight);
                $("#hrm_split_bar").css("top",(new_hrmDOEHeight+45)+"px");
                $(".chat-container").css("top",(new_hrmDOEHeight+45+5)+"px");
                $(".chat_container_screen").css("top",(new_hrmDOEHeight+45+5)+"px");
            }
        });

        $(document).one("mouseup", async function(){
            $(document).off("mousemove.hrm_mousemove");
            $(".chat_container_screen").remove();
            await ADD_SetVal("ADD_hrmDOEHeight" , $("#hrm_DOE").height());
            $("html").removeClass("no-scroll");
        });
    });

    $(document).on("click", "a.auto_a", function (e) {
        var $this = $(this);
        if($this.attr("href").indexOf("dostream.com") !== -1){
            e.preventDefault();
            window.open($this.attr("href"), "_self");
        }
    });

    // 좌표 보기 시 Cross Access 체크 및 공지하기
    async function checkCrossAccess(url, varname, callback){
        var checkVal = false;
        checkVal = await ADD_GetVal(varname);
        if(checkVal === undefined){
            checkVal = false;
            await ADD_SetVal(varname, checkVal);
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
                        await ADD_SetVal(varname, true);
                        callback();
                    }, onerror: async function(){
                        ADD_DEBUG("엑세스 실패");
                        await ADD_SetVal(varname, false);
                    }
                });
            });
            return false;
        }
        else{
            return true;
        }
    }

    $(document).on("click","#hrmbodyexpand",async function(){
        await parse_insagirl(2);
        $("#hrmbodyexpand").hide();
    });

    //////////////////////////////////////////////////////////////////////////////////
    // 체크박스 클릭 시 이벤트
    $(document).on("click", "input[name=chk]", function(){
        var thisVal = $(this).val();
        var IndexThisVal = $.inArray(thisVal, checkedStreamerFromList);
        $(this).parent("label.btn").toggleClass("active");

        if(IndexThisVal === -1){
            checkedStreamerFromList.push(thisVal);
        }
        else{
            checkedStreamerFromList.splice(IndexThisVal,1);
        }

        if( $("#multitwitch").hasClass("multitwitch_ready") ){
            $("#multitwitch").removeClass("multitwitch_ready");
        }

        if($("input[name=chk]:checked").length >= 1){
            $("#addHideStreamer").fadeIn("fast");

            setTimeout(
                function(){
                    $("#multitwitch").addClass("multitwitch_ready");
                },100);
        }
        else{
            $("#addHideStreamer").fadeOut("fast");
        }
    });

    $(document).on("click", "#popup_ADD_config table td input[type=\"checkbox\"]", function(){
        $(this).parent("label.btn").toggleClass("active");
    });

    //////////////////////////////////////////////////////////////////////////////////
    // run Multitwitch
    $(document).on("click", "#multitwitch", function(){
        multitwitch_run();
    });

    //////////////////////////////////////////////////////////////////////////////////
    // run addHideStreamer
    $(document).on("click", "#addHideStreamer", function(){
        addHideStreamer_run();
    });


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                               FUNCTION - CHAT
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    // 타겟 url 이 동영상인지 체크
    function isVideo(target_url){
        if(target_url !== undefined && (target_url.indexOf(".mp4") !== -1 || target_url.indexOf(".gifv") !== -1 || target_url.indexOf(".flv") !== -1 || target_url.indexOf(".webm") !== -1)){
            return true;
        }
        return false;
    }

    // Imgur API 접근하여 이미지 정보 가져옴
    function getImgurData($line, documentElem, iframeElems, Imgur_ID, Imgur_type){
        // Imgur_type --------------- 0 = image   ,    1 = album    ,    2 = gallery    ,    10 = etc
        var imgur_api_call_url = "https://api.imgur.com/3/";
        var imgur_client_id = "a57c643ca3a51ee";
        var img_arr = [];
        var imgur_type_text = "";
        var imgur_call_again = false;

        switch(Imgur_type){
        case 0:
            imgur_type_text = "image";
            imgur_api_call_url = imgur_api_call_url+"image/"+Imgur_ID;
            break;
        case 1:
            imgur_type_text = "album";
            imgur_api_call_url = imgur_api_call_url+"album/"+Imgur_ID+"/images";
            break;
        case 2:
            imgur_type_text = "gallery";
            imgur_api_call_url = imgur_api_call_url+"gallery/"+Imgur_ID; // imgur_api_call_url+"gallery/album/"+Imgur_ID;
            // 테스트 예시: https://imgur.com/gallery/FyhGofX - OK
            break;
        case 10:
            return false;
        default:
            break;
        }
        ADD_DEBUG(imgur_type_text, "  imgur_api_call_url", imgur_api_call_url);

        $.ajax({
            url: imgur_api_call_url,
            //async: false, // return 하는 경우 주석 풀면 됨
            type: "GET",
            //contentType: 'application/json',
            dataType:"json",
            headers: {
                "Authorization": "Client-ID "+imgur_client_id
            },
            success:function(response){
                var i=0, temp_obj;
                ADD_DEBUG("Imgur api request succeed");
                ADD_DEBUG("response: ",response);

                var response_data = response.data;
                // images 가 존재할 경우 - gallery
                if(response_data.images !== undefined){
                    for(i=0;i<response_data.images.length;i++){
                        ADD_DEBUG("type:album",response_data.images[i].link);
                        temp_obj = {link:response_data.images[i].link, title:response_data.images[i].title};
                        img_arr.push(temp_obj);
                    }
                }
                // data가 배열 형태일 경우 - album
                else if(response_data[0] !== undefined) {
                    for(i=0;i<response_data.length;i++){
                        ADD_DEBUG("type:album",response_data[i].link);
                        temp_obj = {link:response_data[i].link, title:response_data[i].title};
                        img_arr.push(temp_obj);
                    }
                    imgur_call_again = true;
                }
                // data가 배열이 아닐 경우 - image
                else {
                    ADD_DEBUG("type:image",response_data.link);
                    temp_obj = {link:response_data.link, title:response_data.title};
                    img_arr.push(temp_obj);
                }

                if(Imgur_type == 2 && imgur_call_again){
                    // gallery 타입의 경우 album 주소를 가져오므로 첫번째 album 에 대하여 재호출한다.
                    var temp_link = img_arr[0].link;
                    if(temp_link !== null && temp_link !== undefined){
                        var call_again_link = temp_link.split("a");
                        if(call_again_link !== null && call_again_link !== undefined && call_again_link.length > 2){
                            getImgurData($line, documentElem, iframeElems, call_again_link[1], 1);
                        }
                    }
                }
                else{
                    chatImageDOEfromLinks($line, documentElem, iframeElems, img_arr);
                    response_data = null;
                    response = null;
                }
            },
            error:function(response){
                // request failed
                ADD_DEBUG("Imgur api request failed", response);
                var temp_text = "<br />error:"+ response.responseJSON.data.error;
                var temp_error_code = " (CODE:" + response.responseJSON.status + ")";
                ADD_send_sys_msg("Imgur 이미지 로드 중 오류가 발생했습니다."+temp_error_code+temp_text);
            }
        });
    }

    function chatImageDOEfromLinks($line, documentElem, iframeElems, arr){
        var i;
        var newimg;
        var img_length = arr.length;
        //var nudity_block = ADD_config.nudity_block.value;

        if($line === undefined || iframeElems === undefined || documentElem === undefined || arr === undefined || img_length === 0){
            ADD_DEBUG("chatImageDOEfromLinks - 이미지 오브젝트가 존재하지 않음", arr);
            return false;
        }
        
        // 기본 컨테이너 생성
        var $ADD_image_container = $(`
            <div class="imgur_container" style="position:relative;text-align:center">
                <div class="imgur_safe_screen" style="display:none;opacity:0.0;z-index:1000;align-items:center;position:absolute;top:0;left:0;text-align:center;vertical-align:middle;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJElEQVQImWPo6ur6D8MMDAz/GZA5XV1dEAEYB8pGcLq6uv4DAKP8I1nj691jAAAAAElFTkSuQmCC) repeat;">
                    <span class="imgur_safe_button btn btn-default align-middle"
                    style="padding:5px 15px;background:white;border-radius:20px;border:1px solid #333;opacity:1.0;color:rgba(0, 0, 0, 1.0);line-height:120%;margin:0 auto;text-align:center;vertical-align:middle;cursor:pointer;color:black;font-size:12px;font-family: "Malgun Gothic","맑은고딕","맑은 고딕",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif;">
                    Image show
                    </span>
                </div>
                <div class="imgur_control_button ADD_tr_10_10" style="top:12px;right:10px;position:absolute;width:50px;height:30px;text-align:right;z-index:999;">
                    <span class="imgur_control_hide glyphicon glyphicon-minus-sign" style="display:none;font-size:15px;opacity:0.5;cursor:pointer;text-align:center;color:#333;border-radius:30px;padding:1px;margin-right:1.5px;height:18px;width:16px;line-height:100%;font-family: "Malgun Gothic","맑은고딕","맑은 고딕",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif;">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0MjoyNSswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MzA1ZmM0ZTItOWVjOC05NTQzLTgzODQtZGI0YWJiMDkwMWYyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6N2E1NmRlNDEtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Y2NkMjU2MTItZDgzNC01MTQzLTliNTUtNTg4YTNkMTliMmIwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNjZDI1NjEyLWQ4MzQtNTE0My05YjU1LTU4OGEzZDE5YjJiMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozMDVmYzRlMi05ZWM4LTk1NDMtODM4NC1kYjRhYmIwOTAxZjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PuZjetEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA99JREFUeNp8lc9rFGcYxz/vm9mZMTszO7PZZLPZoEncdAnSJHVJKERERZpecujB9mAL/Q8KPRU08dJDrx568lRohfbQQwNCDkIr7cFAQQQRW1GbxE1qNetuktnZyfzoITNhKzQPfJmZ7zzP9/k+Ly/vK3gjTp2aQAh4/Pjpgq5rC7u7e7NBEJwAUBTlL8PIrnpeZ7lSGV2OY3jw4CFHhm3n5m07dw+IUwghYiFE3M3Zdu6ebefmjxQTQiymBVLKp5ZlXimVimcLhb4ThULfiVKpeNayzCtSyqddzRb/T+xq6sKyrMVKZYzBwQGq1XGKxQGKxYP3wcEBKpUxLMta7HJ/9VBoZuY0/f2Fua5xLmWz2e5eQ8BPCYZSMsm5lNb19xfmZmZOQ602TT7vPDtwZl7r68szOjqS1o0APtBJ4Ccco6Mj9PXlsSzzGhDn886zWm0aoaqZ93x/fwWoT0xUy8eO6SiKwurq7wA/J67eShr8AdSBc7OzNYIgoN32ePjw0XNgSFUz89IwjMsAjpO77rou9foWa2sbqcPjwJ2u8e8kHGtrG9TrW7iui+PkrgMYhnFZaTZbs8nHbcsy6XR8ALa2/h4GikAZOJkIlhNu2LLMDQBNU4mi6Haj0aTZbM0qYRgeFwKiKKrv7OwShlHq5hbQC7wPPH5jU9xqt71JAN/3iaKoLgSEYXhcEUIAMUEQABBFh4KyS+Db5Plx+i8I9pN8eVgrhEAqirIexyClHMpms2iahqZpAO0uwR8TpNFO87LZLFLKoTgGRVHWpaapdwGCILyg6zpSSjIZ5U2HZxIcus9kFKSU6LpOEIQXkvW8K207dxOg0Xj9mRCQzzsYhgGw3yXweYI09g3DIJ93EOKgNjkHbkrbtleklGtBEJS3txtL1eo4pmkC3AAiYBN4mWAz4W6Ypkm1Os72dmMpCIKylHLNtu0VMTf3LpubW3NPnjz7FaBaHf/Itq0fXr7cxvM6RFGIEAfTx3GElD3oukahkOf169aHjx79+T3A2NjImVJp8LeearVCqTS4vrOzE+7u7l149Wr7kuu2Y8MwfjnYASClPEQmo6IoCuvrz5c2NupfA5RKxcWpqbe/EwJ6Tp4cpadHUi6X77iuG7VaO+c9zzvfbLY+DcPAjKKYOI4Jw9D2/f2pvb29T168+Ocb13U/ABgeHlqq1d75Mo4joihCXLx4jjiO6e3txfM87t9/MN9oNL7y/f3po85OVc3ccxzni8nJUyu6ruO6LkIIlHRDBkGA53k4jrPS23tspdlsLXQ6/oLv+/+5AlRVXdU0dTmXs5Y1TcfzPBRFIV2efwcAVYSABgRv8C8AAAAASUVORK5CYII=" />
                    </span>
                    <span class="imgur_control_remove glyphicon glyphicon-remove-sign" style="display:inline-block;font-size:15px;opacity:0.5;cursor:pointer;text-align:center;color:#333;border-radius:30px;padding:1px;margin-right:1.5px;height:18px;width:16px;line-height:100%;font-family: "Malgun Gothic","맑은고딕","맑은 고딕",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif;">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0Mjo0NyswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZWMzOWJmMzYtMmRjOS0wMDQwLWI3ZjktY2QxYTViZjBmZjIyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OGFlNTk3MjgtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Yjk0ZmQ5ZTEtMjEzMi1mNDRlLWIyYTMtZDBhMWVhOTA1ZjEwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmI5NGZkOWUxLTIxMzItZjQ0ZS1iMmEzLWQwYTFlYTkwNWYxMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplYzM5YmYzNi0yZGM5LTAwNDAtYjdmOS1jZDFhNWJmMGZmMjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pj4Iwe0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABQJJREFUeNpclEuIHEUYx/9V1TWz3dWzPbtm9jGzs7tJ1JgEEhOTQEjU7OID1Agq8RRBAgqCHnLJKYnxBXoRPagIggeNHgIKKoIgonnp5qEhqHm46+5mTHZmd57d0z0z3V1VHiYJmu/48fGrj49//QhuqbVrV4MQYHp6dmdPT3Jns+lvieN4jBACw2BXOOenLMv8SgjxNecc2ewwhDARRTEAgNwKTKedhwG8Va831t/oEUKgNQDom3Oc8/PptLNvw4Z13yWTCQRBC4SQ/wMJIQe01q8CAKV0zrbFR0JYx6IonldKgTE2GsfRvY2G95xSahwAcrnhgxs33v2alBJhGIL9B7YfwGvXtzw4ODjwpFL6mGVZ851Op6GUbphm4ooQ9rHe3tS7yWRC+n4w6XnNCc/zZD6fOxrHEmzz5o2Iomib7wefXmc/rbX+YGwsjyBoYWBgGYKgDUoJ+vr64Loeenp6MDY2etQ0e/6sVKq7mk1/Uin1fW+vUzCUUpBSHgaA3t7UIcbYESEsDA0NwvOayOdH4DgOCKGglKBcriCTyYBzjtWrVx1pNBqvlEpLL8/Ozh9OpVLjrFKpPNRs+i8CuLZixfLHh4YGMTw8hEqleuf8fGGvYRjzuVy2ZlkmlpbK2ULhnz3LlvXP2rbwGw0XjuP8WCwuPh/HMq+1/pk5jnOw1Wqv7+tzXqeUnvA8H1EUYWZm9jnf919ZWCjtzmRue0cpJX/55fSldruzy/eDOULIad8PYJomOp2O4fv+g1prRRhjF6SUd+XzuU3ptHM2kUhgfHwM9Xq9/+TJqS9brfZ9nPMLjNGw3e6sF0Kc27Jl4yNCWAtXry4gimI0Gu49hcI/ZzjnFwkAnxBY2exwlnO+oLXG6OgIMpllCMMQJ05MfV2r1R+7fuMfd+zYPsE5x+LiEv7+ew6MMURRPFwsFq8BJKCEdKMYxzGiKIKUCowZoJQiimJTKdV7I1pxHNvVat2hlCCZTN6AIY7jm3+EGoZR0BqglGYty0J/fxqWZaJYLN35ww9HLzca7n3ptPOt4/R+EQStTceP/zw3PT27ljEGIQQSCQ5KSVZrDYAUaDKZmOq+Lidt24bnNTE3N48zZ37bG0XRiG3b5+6/f9uj27dvfcqyzOMA0hcv/vXMtWtFUEqQStkIw2iyexIxxQYGMi3X9XaHYbhmcDDztm3bGBnJQgjxV6vVnt60acMLQliSc45UKvWx6zYvb926+fN02vE9rwkAKJWWjkgpU5Zl7mOjo/mZcrmyR0qZNwym161b+1O97kIpVeHcmMrnR+TCQhG+76O/vw9hGP5umqZ/6tRZFApXsbhYPiilfFwI68qaNXe9xO64YyUMg52u1ep7XNebkFJeIIT8US5XEMcSruuiULiKUmkJQRCAMYpyuYJSaQkAngbIe10b6Ueq1VqBrVp1O4aHhwqe58lm058sl6u7Wq2Wtm3xUxxL1Ot1JBI9iOMYQdAC5xyGYaBare0nhLzfDYneL6X6LAwjsJUrl4MxilwudzQIAuW63kS73Z5wXe9ZpWSKUgZAQ0qVJoSsbzb93dVq7RMp5RNdS+GA1njjprUeeGAHtNawLAvtdhvnz//xcK1WezMMo7tvcSW60eiWZZnnO53OPinVd/+dYytWjHdNSwiCIIBSmLEs80NK6a+UsiYAQ2vdA6DNGL1k2+IbIcxD4+Oje6vV+oyU8n/G/3cAFcF5BFWY41IAAAAASUVORK5CYII=" />
                    </span>
                </div>
                <div class="imgur_control_button ADD_br_10_10" style="bottom:12px;right:10px;position:absolute;width:50px;height:30px;text-align:right;z-index:999;">
                    <span class="imgur_control_hide glyphicon glyphicon-minus-sign" style="display:none;font-size:15px;opacity:0.5;cursor:pointer;text-align:center;color:#333;border-radius:30px;padding:1px;margin-right:1.5px;height:18px;width:16px;line-height:100%;font-family: "Malgun Gothic","맑은고딕","맑은 고딕",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif;">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0MjoyNSswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MzA1ZmM0ZTItOWVjOC05NTQzLTgzODQtZGI0YWJiMDkwMWYyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6N2E1NmRlNDEtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Y2NkMjU2MTItZDgzNC01MTQzLTliNTUtNTg4YTNkMTliMmIwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNjZDI1NjEyLWQ4MzQtNTE0My05YjU1LTU4OGEzZDE5YjJiMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozMDVmYzRlMi05ZWM4LTk1NDMtODM4NC1kYjRhYmIwOTAxZjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PuZjetEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA99JREFUeNp8lc9rFGcYxz/vm9mZMTszO7PZZLPZoEncdAnSJHVJKERERZpecujB9mAL/Q8KPRU08dJDrx568lRohfbQQwNCDkIr7cFAQQQRW1GbxE1qNetuktnZyfzoITNhKzQPfJmZ7zzP9/k+Ly/vK3gjTp2aQAh4/Pjpgq5rC7u7e7NBEJwAUBTlL8PIrnpeZ7lSGV2OY3jw4CFHhm3n5m07dw+IUwghYiFE3M3Zdu6ebefmjxQTQiymBVLKp5ZlXimVimcLhb4ThULfiVKpeNayzCtSyqddzRb/T+xq6sKyrMVKZYzBwQGq1XGKxQGKxYP3wcEBKpUxLMta7HJ/9VBoZuY0/f2Fua5xLmWz2e5eQ8BPCYZSMsm5lNb19xfmZmZOQ602TT7vPDtwZl7r68szOjqS1o0APtBJ4Ccco6Mj9PXlsSzzGhDn886zWm0aoaqZ93x/fwWoT0xUy8eO6SiKwurq7wA/J67eShr8AdSBc7OzNYIgoN32ePjw0XNgSFUz89IwjMsAjpO77rou9foWa2sbqcPjwJ2u8e8kHGtrG9TrW7iui+PkrgMYhnFZaTZbs8nHbcsy6XR8ALa2/h4GikAZOJkIlhNu2LLMDQBNU4mi6Haj0aTZbM0qYRgeFwKiKKrv7OwShlHq5hbQC7wPPH5jU9xqt71JAN/3iaKoLgSEYXhcEUIAMUEQABBFh4KyS+Db5Plx+i8I9pN8eVgrhEAqirIexyClHMpms2iahqZpAO0uwR8TpNFO87LZLFLKoTgGRVHWpaapdwGCILyg6zpSSjIZ5U2HZxIcus9kFKSU6LpOEIQXkvW8K207dxOg0Xj9mRCQzzsYhgGw3yXweYI09g3DIJ93EOKgNjkHbkrbtleklGtBEJS3txtL1eo4pmkC3AAiYBN4mWAz4W6Ypkm1Os72dmMpCIKylHLNtu0VMTf3LpubW3NPnjz7FaBaHf/Itq0fXr7cxvM6RFGIEAfTx3GElD3oukahkOf169aHjx79+T3A2NjImVJp8LeearVCqTS4vrOzE+7u7l149Wr7kuu2Y8MwfjnYASClPEQmo6IoCuvrz5c2NupfA5RKxcWpqbe/EwJ6Tp4cpadHUi6X77iuG7VaO+c9zzvfbLY+DcPAjKKYOI4Jw9D2/f2pvb29T168+Ocb13U/ABgeHlqq1d75Mo4joihCXLx4jjiO6e3txfM87t9/MN9oNL7y/f3po85OVc3ccxzni8nJUyu6ruO6LkIIlHRDBkGA53k4jrPS23tspdlsLXQ6/oLv+/+5AlRVXdU0dTmXs5Y1TcfzPBRFIV2efwcAVYSABgRv8C8AAAAASUVORK5CYII=" />
                    </span>
                    <span class="imgur_control_remove glyphicon glyphicon-remove-sign" style="display:inline-block;font-size:15px;opacity:0.5;cursor:pointer;text-align:center;color:#333;border-radius:30px;padding:1px;margin-right:1.5px;height:18px;width:16px;line-height:100%;font-family: "Malgun Gothic","맑은고딕","맑은 고딕",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif;">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0Mjo0NyswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZWMzOWJmMzYtMmRjOS0wMDQwLWI3ZjktY2QxYTViZjBmZjIyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OGFlNTk3MjgtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Yjk0ZmQ5ZTEtMjEzMi1mNDRlLWIyYTMtZDBhMWVhOTA1ZjEwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmI5NGZkOWUxLTIxMzItZjQ0ZS1iMmEzLWQwYTFlYTkwNWYxMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplYzM5YmYzNi0yZGM5LTAwNDAtYjdmOS1jZDFhNWJmMGZmMjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pj4Iwe0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABQJJREFUeNpclEuIHEUYx/9V1TWz3dWzPbtm9jGzs7tJ1JgEEhOTQEjU7OID1Agq8RRBAgqCHnLJKYnxBXoRPagIggeNHgIKKoIgonnp5qEhqHm46+5mTHZmd57d0z0z3V1VHiYJmu/48fGrj49//QhuqbVrV4MQYHp6dmdPT3Jns+lvieN4jBACw2BXOOenLMv8SgjxNecc2ewwhDARRTEAgNwKTKedhwG8Va831t/oEUKgNQDom3Oc8/PptLNvw4Z13yWTCQRBC4SQ/wMJIQe01q8CAKV0zrbFR0JYx6IonldKgTE2GsfRvY2G95xSahwAcrnhgxs33v2alBJhGIL9B7YfwGvXtzw4ODjwpFL6mGVZ851Op6GUbphm4ooQ9rHe3tS7yWRC+n4w6XnNCc/zZD6fOxrHEmzz5o2Iomib7wefXmc/rbX+YGwsjyBoYWBgGYKgDUoJ+vr64Loeenp6MDY2etQ0e/6sVKq7mk1/Uin1fW+vUzCUUpBSHgaA3t7UIcbYESEsDA0NwvOayOdH4DgOCKGglKBcriCTyYBzjtWrVx1pNBqvlEpLL8/Ozh9OpVLjrFKpPNRs+i8CuLZixfLHh4YGMTw8hEqleuf8fGGvYRjzuVy2ZlkmlpbK2ULhnz3LlvXP2rbwGw0XjuP8WCwuPh/HMq+1/pk5jnOw1Wqv7+tzXqeUnvA8H1EUYWZm9jnf919ZWCjtzmRue0cpJX/55fSldruzy/eDOULIad8PYJomOp2O4fv+g1prRRhjF6SUd+XzuU3ptHM2kUhgfHwM9Xq9/+TJqS9brfZ9nPMLjNGw3e6sF0Kc27Jl4yNCWAtXry4gimI0Gu49hcI/ZzjnFwkAnxBY2exwlnO+oLXG6OgIMpllCMMQJ05MfV2r1R+7fuMfd+zYPsE5x+LiEv7+ew6MMURRPFwsFq8BJKCEdKMYxzGiKIKUCowZoJQiimJTKdV7I1pxHNvVat2hlCCZTN6AIY7jm3+EGoZR0BqglGYty0J/fxqWZaJYLN35ww9HLzca7n3ptPOt4/R+EQStTceP/zw3PT27ljEGIQQSCQ5KSVZrDYAUaDKZmOq+Lidt24bnNTE3N48zZ37bG0XRiG3b5+6/f9uj27dvfcqyzOMA0hcv/vXMtWtFUEqQStkIw2iyexIxxQYGMi3X9XaHYbhmcDDztm3bGBnJQgjxV6vVnt60acMLQliSc45UKvWx6zYvb926+fN02vE9rwkAKJWWjkgpU5Zl7mOjo/mZcrmyR0qZNwym161b+1O97kIpVeHcmMrnR+TCQhG+76O/vw9hGP5umqZ/6tRZFApXsbhYPiilfFwI68qaNXe9xO64YyUMg52u1ep7XNebkFJeIIT8US5XEMcSruuiULiKUmkJQRCAMYpyuYJSaQkAngbIe10b6Ueq1VqBrVp1O4aHhwqe58lm058sl6u7Wq2Wtm3xUxxL1Ot1JBI9iOMYQdAC5xyGYaBare0nhLzfDYneL6X6LAwjsJUrl4MxilwudzQIAuW63kS73Z5wXe9ZpWSKUgZAQ0qVJoSsbzb93dVq7RMp5RNdS+GA1njjprUeeGAHtNawLAvtdhvnz//xcK1WezMMo7tvcSW60eiWZZnnO53OPinVd/+dYytWjHdNSwiCIIBSmLEs80NK6a+UsiYAQ2vdA6DNGL1k2+IbIcxD4+Oje6vV+oyU8n/G/3cAFcF5BFWY41IAAAAASUVORK5CYII=" />
                    </span>
                </div>
                <div class="simple_image_container"><!--이미지가 삽입되는 부분--></div>
                <div class="imgur_more_images" style="display:none;"></div>
                <div class="imgur_more_images_button" style="text-align:center;cursor:pointer;margin:2px 0px;">
                </div>
            </div>`);

        // 이미지가 하나를 초과한 경우 처리
        if(img_length > 1){
            var loop_length = img_length;
            var temp_text = "";

            // 최대 10개 까지만 보여준다.
            if(img_length > 10){
                loop_length = 10;
                temp_text = (img_length-1)+"개 중 ";
            }

            // 추가 이미지 로드 위한 컨테이너 생성
            for(i=1;i<loop_length;i++){
                $ADD_image_container.find(".imgur_more_images").first().append("<div imagehref=\""+arr[i].link+"\"></div></a>");
            }

            // 추가 이미지 로드 위한 버튼 생성
            $ADD_image_container.find(".imgur_more_images_button").first().append(
                temp_text+(loop_length-1)+`개의 이미지를 클릭하여 바로 로드.<br />
                `).show().on("click",function(){
                $ADD_image_container.find(".ADD_br_10_10").css("bottom","2px");
            });
            $ADD_image_container.find(".ADD_br_10_10").css("bottom","21px");
        }

        // imgur safe screen 투명도 설정
        if(ADD_config.imgur_preview_safe.value){
            var safe_screen_opacity = Number(ADD_config.imgur_preview_opacity.value);
            if(!($.isNumeric(ADD_config.imgur_preview_opacity.value))){
                safe_screen_opacity = 0.93;
            }
            else if(safe_screen_opacity < 0 || safe_screen_opacity > 1){
                safe_screen_opacity = 0.93;
            }
            $ADD_image_container.find(".imgur_safe_screen").css("opacity",safe_screen_opacity).css("display","inline-flex");
            $ADD_image_container.find(".imgur_control_hide").css("display","inline-block");
            $ADD_image_container.find(".imgur_safe_button").css("display","inline-block");
        }

        // 일단 스크롤 내리고, 스크롤 존재 여부 기억해놓기
        if( isChatScrollOn(documentElem.find(".latest_chat")) ){
            goScrollDown(iframeElems);
        }
        var temp_isChatScrollOn = isChatScrollOn(documentElem.find(".latest_chat"));


        // 첫 번째 링크의 비디오 여부 체크
        if(isVideo(arr[0].link)){
            newimg = $("<video loop controls muted autoplay src=\""+arr[0].link+"\" class=\"imgur_image_in_chat open-lightbox\" style=\"z-index:100;cursor:pointer;max-width:330px !important;max-height:1000px !important;padding:5px 0px;margin:0 auto;display:inline-block;\"></video>");
        }
        else{
            newimg = $(`
                <img src=`+arr[0].link+` class="imgur_image_in_chat open-lightbox" style="cursor:pointer;max-width:330px !important;max-height:1000px !important;padding:5px 0px;margin:0 auto;display:inline-block;" />
            `);
        }

        // 이미지 로드 완료 여부 체크
        var temp_func = function(){
            // 이미지 컨테이너 삽입
            $line.append($ADD_image_container);

            // 실제 이미지 삽입
            $line.find("div.simple_image_container").append(newimg);
            if( temp_isChatScrollOn ){
                ADD_DEBUG("이미지 로드 완료됨");
                goScrollDown(iframeElems);
                GLOBAL_CHAT_ELEM.stop("true","true").animate({ scrollTop: 1000000 }, "0");
            }
        };

        if (newimg.complete) {
            temp_func();
        }
        // 이미지 로드 미 완료 시, 로드 끝날 때 까지 기다림
        else {
            $(newimg).one("load", function() {
                temp_func();
            });
        }

        // 이미지 로드 회수 기록
        ADD_status_cookie_add_data("auto_image");
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 채팅 div.line element 제어
    async function chatElemControl($line, documentElem, iframeElems){
        $line.addClass("fired");

        // 스크롤 여부 기억
        var temp_isChatScrollOn = isChatScrollOn(documentElem.find(".latest_chat"));

        // 시스템 엘리먼트의 경우
        if($line.hasClass("system")){
            //ADD_DEBUG("SYSTEM ELEMENT 캐치됨 : ", $line.text());
            
            // 서버 연결 끊긴 경우
            if( $line.html().indexOf("서버 연결 끊김") != -1 ){
                ADD_DEBUG("채팅 중지 됨!!!");
                $line.addClass("ADD_chat_again").prop("title", "Dosteam+ System Message").css("cursor","pointer").html("채팅 중지 됨. 채팅을 다시 시작하려면 클릭");
            }

            if( $line.html().indexOf("연결 시도") != -1 || $line.html().indexOf("연결 완료") != -1 ){
                $line.remove();
            }
            return true;
        }

        // 필수 엘리먼트 검증
        var $nick = $line.find(".nick");
        var $content = $line.find(".chatContent");
        if ($nick.length === 0 || $content.length === 0){
            ADD_DEBUG("nick, content elem을 찾을 수 없다", $nick, $content);
            return false;
        }

        // 필수 내용 찾기
        var nick = $line.find(".nick").attr("nick");
        var content = $line.find(".chatContent").text();

        // 닉네임 및 채팅 내용 체크
        if(nick === undefined || nick == "" || content === undefined){
            ADD_DEBUG("닉네임 또는 채팅 내용 판독 불가", "nick", nick, "content", content);
            return false;
        }

        // 채팅 등록된 시간 구하기
        var createdDate;
        var created = $line.attr("created");
        if(created !== undefined || created !== null){
            createdDate = new Date(created * 1000);
        }
        else{
            createdDate = new Date();
        }

        // 채팅 차단
        // Case 1: 금지단어로 차단하는 경우
        if(ADD_config.chat_block.value){
            // Case 1-1 채팅 내용 기반
            if(await ADD_chatBlock($line, false, nick, content, createdDate, false, ADD_config.chat_block_contents.value, ADD_config.chat_block_noti.value)) return false;
            // Case 1-2 닉네임 기반
            if(await ADD_chatBlock($line, false, nick, content, createdDate, ADD_config.chat_block_nickname.value, false, ADD_config.chat_block_noti.value)) return false;
        }
        // Case 2: 채팅 매니저로 차단하는 경우
        if(chat_manager !== undefined){
            var isBlock = chat_manager.getIsBlock(nick);
            if(isBlock){
                var isShowDelMsg = chat_manager.getIsShowDelMsg(nick);
                if(await ADD_chatBlock($line, true, nick, content, createdDate, false, false, isShowDelMsg)) return false;
            }
        }
        
        // 광고 차단하기
        if(ADD_config.chat_adb.value){
            /* // 현재 광고가 없으므로 주석처리한다.
            if( $('span:first', $line).html().replace(/\s/g,'') == '[광고]' )
            {
                ADD_DEBUG('광고 메시지 감지됨!',content);
                $line.remove();
                ADD_status_cookie_add_data('ad_remove');
            }
            */
        }      

        // 향상된 자동스크롤
        if(ADD_config.chat_scroll.value){
            var scroll_height_check = documentElem.find(".content").prop("scrollHeight") - (documentElem.find(".content").scrollTop()+documentElem.find(".content").height());
            if(temp_isChatScrollOn && scroll_height_check < 100.0){
                // 100픽셀보다 덜 차이날 경우 스크롤을 강제로 내린다;
                goScrollDown(iframeElems);
            }
        }

        // 메모 달기 및 닉네임 색깔 적용하기
        if(chat_manager !== undefined){
            var memo_index = chat_manager.indexFromData(nick);

            if(memo_index !== -1){
                var temp_obj = chat_manager.getData(memo_index);
                var temp_display_name = temp_obj.display_name;
                var temp_color = temp_obj.color;
                var temp_latest_chat = isChatScrollOn(documentElem.find(".latest_chat"));

                // 색깔 적용하기
                if(temp_color !== undefined && temp_color !== null && temp_color !== ""){   //  && temp_color.toLowerCase().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i
                    $line.find("span.nick").css("color",temp_color);
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
                    $line.find("span.nick").after("<span class=\"conversation_memo\" style=\"color:red;font-weight:bold;vertical-align:inherit;display:-webkit-inline-box\"> "+ temp_text +"</span>");
                    if( temp_latest_chat ){
                        goScrollDown(iframeElems);
                    }
                }
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
                if(ADD_config.url_self.value && href.toLowerCase().indexOf("dostream.com/#/stream/") !== -1){
                    $aElem.addClass("topClick");
                    // 본 블락에서는 클래스만 추가하고, 실제 동작은 ADD_chatting_arrive() 에 선언된 이벤트로 동작함
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
                        var temp_id = ADD_streamer_nick(temp_array[j]).toUpperCase();
                        ch_text = ch_text+temp_id;
                    }

                    if(ch_text.toLowerCase() !== ch_streamer_id.toLowerCase()){
                        $aElem.after(" <span style=\"color:#000;font-weight:bold;vertical-align:top;\">["+ch_text+"]</span>");
                    }

                    // 스크롤 내리기
                    if( temp_latest_chat ){
                        goScrollDown(iframeElems);
                    }
                }

            });
        }

        // 이미지 주소로부터 링크 찾기
        if(ADD_config.chat_image_preview.value && hrefs.length !== 0){
            //ADD_DEBUG("$aElems", $aElems, $aElems.length);
            for(var index=0;index<hrefs.length;index++){
                var image_url = "";
                var href = hrefs[index];
                
                ADD_DEBUG("a arc : ", href, href.length);
                if(href === undefined || href === null || href == ""){
                    return true;
                }
            
                // 원래부터 UCHAT에 있던 정규표현식을 그대로 긇어와서 씀 - 문제있어서 수정함
                if(href.match(/\.(jpg|jpeg|png|gif)$/gi) && href.indexOf("imgur.com") === -1){
                    image_url = href;
                }
                else if (href && href.match(/^(https?)?:?\/\/(\w+\.)?imgur.com\/(\w*\d\w*)+(\.[a-zA-Z]{3})?$/)){
                    image_url = href+".jpg";
                }
                //else if(href.match(/youtu(be\.com|\.be)(\/\watch\?v=|\/embed\/|\/)(.{11})/)){
                /* eslint-disable */
                else if(ADD_config.chat_image_youtube_thumb.value && href.match(/^.*(?:youtu\.?be(?:\.com)?\/)(?:embed\/)?(?:(?:(?:(?:watch\?)?(?:time_continue=(?:[0-9]+))?.+v=)?([a-zA-Z0-9_-]+))(?:\?t\=(?:[0-9a-zA-Z]+))?)/)){
                    image_url = "http://img.youtube.com/vi/"+href.match(/^.*(?:youtu\.?be(?:\.com)?\/)(?:embed\/)?(?:(?:(?:(?:watch\?)?(?:time_continue=(?:[0-9]+))?.+v=)?([a-zA-Z0-9_-]+))(?:\?t\=(?:[0-9a-zA-Z]+))?)/).pop()+"/0.jpg";
                }
                /*
                    //else if() gfycat
                    ADD_DEBUG("pop", href.match(/(?:http:|https:|)(?:\/\/|)(?:gfycat\.com\/(?:\w*\/)*)(\w+$)/));
                    image_url = "https://giant.gfycat.com/"+href.match(/(?:http:|https:|)(?:\/\/|)(?:gfycat\.com\/(?:\w*\/)*)(\w+$)/).pop()+".webm";
                }
                */
                /* eslint-enable */

                if(image_url !== ""){
                    ADD_DEBUG("이미지 발견", image_url);
                    var temp_img_obj = {"link": image_url, "title": ""};
                    ADD_chat_images.push(temp_img_obj);
                }
            }

            if(ADD_chat_images.length !== 0){
                chatImageDOEfromLinks($line, documentElem, iframeElems, ADD_chat_images);
            }
        }   // 이미지 더 찾기 끝
        
        // twitch clip 섬네일 으로 부터 찾기(앞에서 링크는 찾았는데, 이미지 링크는 못 찾은 경우)         
        if(ADD_config.chat_image_preview.value && ADD_config.chat_image_twitch_thumb.value && hrefs.length !== 0 && ADD_chat_images.length === 0){
            if(hrefs[0].match(/(\.twitch\.tv\/\w*\/clip\/|clips\.twitch\.tv\/)([a-zA-Z]*)/)){
                var twitch_thumb_match = hrefs[0].match(/(\.twitch\.tv\/\w*\/clip\/|clips\.twitch\.tv\/)([a-zA-Z]*)/);

                if(twitch_thumb_match){
                    var twitch_thumb_id = twitch_thumb_match.pop();
                    ADD_DEBUG("Twitch Clip API 호출 - id:", twitch_thumb_id);
                    $.ajax({
                        url:"https://api.twitch.tv/kraken/clips/"+twitch_thumb_id,
                        type: "GET",
                        headers: {"Client-ID": ADD_Client_ID, "Accept":"application/vnd.twitchtv.v5+json"},

                        // API CALL SUCCESS
                        success:function(response){
                            ADD_DEBUG("Twitch Clip API 호출 완료", response);
                            var image_url = response.thumbnails.medium;
                            var title = response.title + " - " + response.broadcaster.display_name;

                            var temp_arr = [];
                            var temp_img_obj = {"link": image_url, "title": title};
                            temp_arr.push(temp_img_obj);
                            chatImageDOEfromLinks($line, documentElem, iframeElems, temp_arr);
                            
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
        if(ADD_config.chat_image_preview.value && ADD_config.imgur_preview.value && hrefs.length !== 0 && ADD_chat_images.length === 0){
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
                ADD_DEBUG("ADD_imgur_id = "+ADD_imgur_id+"  ADD_imgur_type = "+ADD_imgur_type);
                getImgurData($line, documentElem, iframeElems, ADD_imgur_id, ADD_imgur_type);
            }
        }

        chatting_arrive_check = true;
    }


    //////////////////////////////////////////////////////////////////////////////////
    // 좌표 보내기 버튼 DOE 생성하기 위한 함수
    function ADD_send_location_DOE($iframeElem){
        var ADD_send_location_button_id = $("#ADD_send_location_button");
        var ADD_send_location_button_elem;

        // 채팅창 존재 여부 확인, 좌표 보내기 버튼 이미 존재하는지 확인
        if( ($iframeElem.length !== 0) && (ADD_send_location_button_id.length === 0) ){
            // 채팅창 생성
            ADD_send_location_button_elem = `
                <div id="ADD_send_location_container" style="position:fixed;bottom:45px;right:15px;width:25px;height:25px;text-align:center;cursor:pointer;"><!--width:20px;height:20px;font-size:20px-->
                    <span id="ADD_send_location_notice"></span>
                    <!--<span aria-label="현재 주소를 채팅 입력란에 복사" data-microtip-position="top-left" role="tooltip">-->
                        <span id="ADD_send_location_button"><!--class="glyphicon glyphicon-send">-->
                            <img title="좌표" style="opacity:0.5;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAA7pmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMDhUMTY6NDI6MjgrMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0wOFQxNjo1NDowMyswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMDhUMTY6NTQ6MDMrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MmY4MzI3ZTMtNzgzMS1jZTRmLWJkZmItZTY5NDJiNzc4ZTQ5PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OGRiMjM2YzQtMTMxYS0xMWU5LTlkYTItZWYzMGRkNDIzNmUwPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NDY4NmJiNDYtNzJlYy0wMDRjLWE0ZmUtYmVlNTg0ODNiYTQxPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjQ2ODZiYjQ2LTcyZWMtMDA0Yy1hNGZlLWJlZTU4NDgzYmE0MTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0wOFQxNjo0MjoyOCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5YmVjNjgyOS0yYjY5LTRlNDctYmU4OS0xMTIwZjg3Yzg0YWM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMDhUMTY6NTQ6MDMrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MmY4MzI3ZTMtNzgzMS1jZTRmLWJkZmItZTY5NDJiNzc4ZTQ5PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE5LTAxLTA4VDE2OjU0OjAzKzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjI1PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjI1PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4mNu0LAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAYaSURBVHjajJZZUJVXEsd7HqbyNvNs1czD1FRqMpPFJcYFUEgUIiIY5F5AvCwCGlbZLxd0cGQPImBkUYNLQGKiiUomSsioE8BiADGyaLjiZQdlEQQiCpHc3zwczOVOpabSVae+qj7d/T+n+3+6P8HUIZiMQq9JaKoTTuQJxVlCRYlQdkQoSFnHvt0ZJAZcQ+/fTcz2MeJ0vSQH3yA7IY+cxA2U5grHMqWzrl7Kn/DnqhGWt08jt6eRS/2zIlYgjbXCmWLhZL5w0OCF3v8uYe4QtAl87MHTBrztLMv3HQhzh8RAE/FaD+PV2iXRj5jK6zZ/cnXMLEdNs5LTNrUIpOe+cLdFKC/6PfG6y4RsBd3boF0DkRrIjIWSTDhdAEczISsW9mjVvmYl44lB5LaNzsUMwOE+6kq7ZqWw4wcp7pheAOn8XpicEGqq/kCkdpDAd5VztDdcLIPRB/yijA3DpTIIWM/HF2oImYUPeyD81gzab0evhzZMHD90Z+pVoaNVGHkgtDS9RKT2Ib7vKICSDHgyza+SmXG+H5pCPwThN6dxqx5kZd0zVtfOzqS0P31ZMLYL/d1CWtRVttspgHOl1kEGe+HLCji8H7LjoSAFKsuhv/tnkyPVjWyoHOC1rx/zl1YIrbo/8VXzPakzjYoCOVPsiu9C/o9lWwNUFEGAE7y3Aja/Ci6vq6/bCgh2hKoz6IsrkCVvknL+Ouc7hkkt/pwn4Z4/cjzFg/ZGEaovCIkBfXjbQpQXmM0WgEPJ4LYMNGsgcBOkRkKuAdL2QIQbhDtj2OyK/NWZuIJTyuenSQh+GzxWQLzfOJfPi3DuxCp2ucC2t6D6CwvA+ROw5Q1F3ZQQuPud9Q0fdGLQ+iD2geidnOGbs5a9misqK7tc4GS+k5D/9yx87CHKE57OKKPRB+C/URkmB1vfbkEMpV8gb3mh1+2EcBcI2ggPB9Xm0ycQqYUd9pAVVy6khNTisRpykywRvqwAt+Ww0wkGLMXFeAs+P0bSB0XIH9eiP10Jwz0QsRVcl8EnJdap9rKFxJ2tqh6aNXAi12KQtxec/6aY9ELaGpjxeBO9vT3yihPxqXmWvYwY2PI6fJBg0Z09CtrVoPfrExL8htGusT5FerRiUGGqRVeaQYfjUsTLgPc6R6aKMhl7Ns/kczNzR7MXDhVrsa8sZ3bbKszxfmNCYkA3mtVwctHJcpOUU06iRXezhudb3qBt00omXFYwdOkzmh/P8h/TAM17YzE6r+ThgVhmZud4DjwqO8ptV1s6I3TDwr7dNWjWqBS9kAunFXWDnGFkyKJvuA4Ho6G+GjMwB4x3mej1debOlrU05aTR+GiGtoER2g8k0uLuwJ3oQKOQvy+b7esg1gfm5hbo2Qc6B8WuAxH/v6XkGcDbBnQOPOu6x4gZOoz3adnlSes2B7rS9BeFUwVred8VPFbBvy9bnMs+BNelsH2dKmj3PevgvZ3qYXrbKWYtIs7ThloaXGy5qXVksOSQp3DtKyHO9yGeNpDgax0oLQq2LldzZLcrZMVBcbpi3ftuSu+2HP4RDvPzP7uZDTsZdLflfoRudqSq8jfCrXrhVIEG/42gWQ3lhdZAJZmww0HVaMtScHlNdQK3ZaobFKbCTxYAPvtIxfF1gGNZBnpNIrQ0Ce3NQvKuenasB+1auHLOGqjzjhpWmbGqf2XGKDYaW63t/nVR3c5nPej9u+kyCqYOEVoahf4e4Wbd7whzn8Rvgyp42RF4/uOvmyfz8+qdedqokRy82UxT7Z/4YVro6RSh+57QZRSmJ4X6a68QunWCwHdV5zUEwLdXYGLsl4M/fgR1X0NSkEpR0CYIcZvj2j9tmJsTBnuFgZ5FIEP9ahQXZywhwe8G4dvUqbwWRkDeXvj0mOprnx6H/H1K722n/gUiNRChuU1J5sv0mIThB8JgzwJIl1GtwT7h1g2h9JBQVijsD91DlGc3Ye6qUfos1OvF8rYDf0cIfQ+ivAZJ3ZNEYbrwUa7Q1iwMDy26yWKQ7+qFonShvEg4aBDSo4XCNA+Sg8uI190mTjdEzPZx4nRDJPi1sT/sLDl6H9Kjf8vh/UJxuvL/H5D/DgCCYVJ6ZqFEVAAAAABJRU5ErkJggg==" />
                        </span>
                    <!--</span>-->
                </div>`;
            $iframeElem.after(ADD_send_location_button_elem);
            ADD_DEBUG("좌표보내기 버튼을 생성함");
        }
        else{
            ADD_DEBUG("채팅창이 존재하지 않아 ADD_send_location_DOE 함수에서 좌표보내기 버튼을 생성하지 못함");
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 채팅창에서 문자열 탐지, 이벤트 bind, API 함수 호출 동작 실행
    var GLOBAL_CHAT_ELEM = undefined;
    var GLOBAL_CHAT_IFRAME_ELEMS = undefined;
    async function ADD_chatting_arrive(){
        ADD_DEBUG("ADD_chatting_arrive 함수 실행됨. ADD_config.chat_ctr.value: " + ADD_config.chat_ctr.value + " , chatting_arrive_check: "+chatting_arrive_check);
        // 기존에 꺼져있는 경우
        if(!chatting_arrive_check || chatting_arrive_check === null){
            // True 이면 켠다.
            if (ADD_config.chat_ctr.value){
                chatting_arrive_check = true;
                // 오로지 이 경우만 return 하지 않는다.
            }
            // 그 외의 경우 그냥 나간다.
            else{
                return;
            }
        }
        // 기존에 켜져있는 경우
        else{
            // False 이면 끈다.
            if(!ADD_config.chat_ctr.value){
                $(document).unbindArrive(".user_conversation");
                $(document).unbindArrive(".system");
                chatting_arrive_check = false;
                return;
            }
            // 그 외의 경우 그냥 나간다.
            else{
                return;
            }
        }

        ADD_DEBUG("chatting_arrive_check: " + chatting_arrive_check);

        // arrive bind 및 unbind
        if(chatting_arrive_check && ADD_config.chat_ctr.value){

            // (no src) iframe 생길 때 event
            $(document).arrive("u-chat > iframe", {existing: true}, async iframeElems => {
                GLOBAL_CHAT_IFRAME_ELEMS = iframeElems;
                var $iframeElem = $(iframeElems);
                var $iframeDocument = $iframeElem.contents().first();

                chatDoeEvntFunc($iframeDocument);

                // 채팅창 생성될 때 노티하기
                $iframeDocument.one("DOMNodeInserted", "div.content", function (){
                    // 채팅 엘리먼트 저장
                    GLOBAL_CHAT_ELEM = $(this);

                    // 버전 체크
                    checkNewVersion();

                    // 채팅 매니저 초기화
                    chat_manager.init($iframeDocument);

                    // 좌표 버튼 생성
                    ADD_send_location_DOE($iframeDocument.find(".content"));

                    // 향상된 자동스크롤 위해서 최신 채팅 엘리먼트 숨기기
                    if(ADD_config.chat_scroll.value){
                        var $latest_chat = $iframeDocument.find("div.latest_chat");
                        $latest_chat.css("margin",0).css("padding",0).css("height","0").css("border","0").css("overflow","hidden");
                    }
                });


                // 마우스 오버 시 이미지 뜨는 것 막기
                $iframeDocument.on("DOMNodeInserted", "div#popupWrap", function (){
                    //ADD_DEBUG("popup에 노드 삽입 감지됨");
                    var $imgElems = $(this).find("img");
                    if($imgElems.length == 1 && $imgElems.parent().css("width") == "200px"){
                        $imgElems.parent().remove();
                    }
                });

                // 이미지 mouseover 시 팝업 대신
                //$iframeDocument.on("DOMNodeInserted", "div#popupWrap", function (){

                //});

                // 채팅 라인 생성될 때 함수적용
                $iframeDocument.on("DOMNodeInserted", "div.line", function (){
                    var $line = $(this);
                    if(!($line.hasClass("fired"))){
                        chatElemControl($line, $iframeDocument, iframeElems);
                    }
                });

                // 채팅창에 있는 두스 링크 클릭 시 이벤트
                $iframeDocument.on("click",".topClick",function(e){
                    e.preventDefault();
                    parent.window.location.href = this.href;
                });

                // 채팅창 닉네임 클릭 시 "메모하기" 버튼 생성하기
                $iframeDocument.on("click", "span.nick, div.nick", function (){
                    var $this = $(this);

                    // 창 위치 재설정하기
                    var $content = $iframeDocument.find("div.content").first();
                    var offsetHeight = $content[0].offsetHeight;
                    var $popupWrap = $iframeDocument.find("#popupWrap");
                    var popupTop = Number($popupWrap.css("top").replace("px",""));
                    var popupHeight = Number($popupWrap.css("height").replace("px","")) + 33;
                    var dif = popupTop + popupHeight - offsetHeight - 56 ;
                    if(dif>0){
                        $popupWrap.css("top",(popupTop-dif)+"px");
                    }
                    
                    // 필수 내용 찾기
                    var nick = $this.attr("nick");
                    var detail_content;
                    
                    // 유저 목록에서 선택한 경우
                    if($this.hasClass("userFloor")){
                        detail_content = "";
                    } 
                    // 채팅에서 선택한 경우
                    else{
                        detail_content = $this.closest("div.line").find("span.chatContent").text();
                    }
                    var temp_obj = {"nick":nick,"detail_content":detail_content};
                    var $memo_button = $("<div id=\"do_memo\" class=\"floor\" style=\"color:red;font-weight:bold;\">메모하기</div>");
                    $iframeDocument.find(".usermenu_popup").first().append($memo_button);
                    $memo_button.on("click",async function(){
                        await chat_manager.openSimpleDOE(temp_obj);
                    });
                });

                //////////////////////////////////////////////////////////////////////////////////
                // imgur click event
                $iframeDocument.on("click", ".imgur_safe_button", function(){
                    $(this).parent(".imgur_safe_screen").fadeOut(500);
                });
                $iframeDocument.on("click", ".imgur_control_hide", function(){
                    ADD_DEBUG("Chatting 내 호출된 imgur 이미지 에서 - 버튼 클릭됨");
                    $(this).closest(".imgur_container").find(".imgur_safe_screen").fadeTo(500, 0.93);
                });
                $iframeDocument.on("click", ".imgur_control_remove", function(){
                    ADD_DEBUG("Chatting 내 호출된 imgur 이미지 에서 x 버튼 클릭됨");
                    $(this).closest(".imgur_container").hide();
                });

                // 추가 이미지 로드
                $iframeDocument.on("click", ".imgur_more_images_button", function(){
                    var temp_isChatScrollOn = isChatScrollOn($iframeDocument.find(".latest_chat"));
                    ADD_DEBUG("imgur_more_images_button 클릭됨");
                    var prev_div = $(this).prev("div.imgur_more_images");
                    prev_div.find("div").each(function(){
                        var video_img_url = $(this).attr("imagehref");
                        // video 인지 image 인지 체크
                        if(isVideo(video_img_url)){
                            $(this).html("<video loop controls autoplay muted src=\""+$(this).attr("imagehref")+"\" class=\"imgur_image_in_chat open-lightbox\" style=\"z-index:100;cursor:pointer;max-width:330px !important;max-height:1000px !important;padding:5px 0px;margin:0 auto;display:inline-block;\"></video>").find("video").on("load",function(){
                                if( temp_isChatScrollOn ){
                                    ADD_DEBUG("Imgur 비디오 추가 로드 완료됨");
                                    goScrollDown(iframeElems);
                                }
                            });
                        } else{
                            $(this).html("<img src=\""+$(this).attr("imagehref")+"\" class=\"imgur_image_in_chat open-lightbox\" style=\"cursor:pointer;max-width:330px !important;max-height:1000px !important;padding:5px 0px;margin:0 auto;display:inline-block;\" />").find("img").on("load",function(){
                                if( temp_isChatScrollOn ){
                                    ADD_DEBUG("Imgur 이미지 추가 로드 완료됨");
                                    goScrollDown(iframeElems);
                                }
                            });
                        }
                    });
                    prev_div.show();
                    $(this).remove();
                });

                /*
                $iframeDocument.on("click", "img.imgur_image_in_chat", function(){
                    ADD_DEBUG("IMAGE_LOAD_START");
                    var newimg = new Image();
                    newimg.crossOrigin = "Anonymous";
                    var temp_text = "?" + getTimeStamp("s");
                    newimg.src = this.src + temp_text;
                    if (newimg.complete) {
                        ADD_DEBUG("CHECK START");
                        checkNudeImage(newimg);
                        ADD_DEBUG("CHECK END");
                    } else {
                        $(newimg).on("load", function() {
                            ADD_DEBUG("CHECK START AFTER LOAD");
                            checkNudeImage(newimg);
                            ADD_DEBUG("CHECK END AFTER LOAD");
                        });
                    }
                });
                */

                // 스크롤바 관련 이벤트 - 향상된 자동 스크롤
                if(ADD_config.chat_scroll.value){
                    ADD_DEBUG("CHAT - Scroll 이벤트 ON");
                    $iframeDocument.on("wheel.chatScrollFunc mousewheel.chatScrollFunc", "div.content", function(event) {//div.wrap div.contentWrap
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
                                // UCHAT의 설정을 직접 변경한다.
                                if(iframeElems.contentWindow !== undefined && 
                                    iframeElems.contentWindow.rooms !== undefined &&
                                    iframeElems.contentWindow.rooms["dostest"] !== undefined){
                                    iframeElems.contentWindow.rooms["dostest"].room.setting.data["option.autoScroll"] = 0;
                                    iframeElems.contentWindow.rooms["dostest"].room.log.temp_scroll_stop = 0;

                                    // 대체 latest_chat 생성
                                    if($iframeDocument.find(".latest_chat_new_container").length === 0){
                                        var $latest_chat_new = $(`
                                        <div class="latest_chat_new_container" style="display:none;">
                                            <div class="latest_chat_new" style="background:rgba(0,0,0,.75);bottom:30px;color:#faf9fa;padding:5px;height:28px;font-size:12px;position:fixed;justify-content:center;align-items:center;text-align:center;width:100%;box-sizing:border-box;z-index:1000;cursor:pointer;border-radius:4px;">
                                                <span>아래에서 더 많은 메시지를 확인하세요.</span>
                                            </div>
                                        </div>
                                        `);
                                        $iframeDocument.find("div.wrap").first().append($latest_chat_new);
                                        $latest_chat_new.on("click", function(){
                                            isGoScrollDown = true;
                                            goScrollDown(iframeElems);
                                            GLOBAL_CHAT_ELEM.stop("true","true").animate({ scrollTop: 1000000 }, "0");
                                            $(this).hide();
                                        });
                                        // $latest_chat_new.on("wheel mousewheel", function(event) {

                                        // }
                                    }
                                    $iframeDocument.find(".latest_chat_new_container").stop("true","true").show();
                                    isGoScrollDown = false;
                                    $iframeDocument.find(".latest_chat").stop("true","true").show();
                                    // 대체 latest_chat 생성 끝
                                }
                                else{
                                    ADD_DEBUG("에러!! iframeElems.contentWindow.rooms", iframeElems.contentWindow.rooms);
                                }
                            }
                            else {
                                // 스크롤바가 없는 경우
                            }
        
                        }
        
                        else {
                            //마우스휠 아래로 돌릴때 이벤트
                            //ADD_DEBUG("오토스크롤", iframeElems.contentWindow.rooms["dostest"].room.setting.data["option.autoScroll"]);
                            if( isChatScrollOn($iframeDocument.find(".latest_chat")) ){
                                isGoScrollDown = true;
                                $iframeDocument.find(".latest_chat_new_container").stop("true","true").hide();
                            }
                        }
                    });
                }


            });


        } // else 끝
    } // ADD_chatting_arrive 함수 끝


    //////////////////////////////////////////////////////////////////////////////////
    // chatDoeEvntFunc
    function chatDoeEvntFunc(elem){
        $(elem[0]).one("DOMNodeInserted", "div.content", function() {
            ADD_DEBUG("iframe 내 div.content 로드 완료!");
            //var elem = $('.chat-container > iframe').contents().first().find('u-chat > iframe').contents().first();
            //var elem = $('u-chat > iframe').contents().first();
            var elemHead = $(elem).find("head");
            var elemContent = $(elem).find("div.content");

            if(elemHead.length === 0 && elemContent.length === 0){
                ADD_DEBUG("채팅창에 이벤트 바인드하지 못함");
                ADD_DEBUG("elemHead.length",elemHead.length,"elemContent.length",elemContent.length);
                return false;
            }

            // 채팅창 내 Lightbox 클릭 시 Lightbox 띄움
            $(elem).on("click", ".open-lightbox", function(e){
                e.preventDefault();
                var image = $(this).attr("src");
                parent.$("html").addClass("no-scroll");
                var simple_image_container = "";
                if(isVideo(image)){
                    simple_image_container = "<video loop controls muted autoplay src=\""+image+"\"></video>";
                }
                else{
                    simple_image_container = "<img src=\""+image+"\" />";
                }
                parent.$("body").append("<div class=\"lightbox-opened\">"+simple_image_container+"</div>");
            });

            // Close Lightbox
            //$(elem).on('click', '.lightbox-opened', function(){
            //    $('html').removeClass('no-scroll');
            //    $('.lightbox-opened').remove();
            //});

            // 채팅 다시 시작
            $(elem).on("click", ".ADD_chat_again", function(){
                //$('.chat-container').html('<iframe src="./uchat2.php" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>');
                location.reload();
            });

            // 좌표 보내기 버튼 동작
            $(elem).on("click", "#ADD_send_location_button", function(){
                ADD_DEBUG("Send location", location.href);
                $(elem).find("div.chatInput").focus().html(parent.window.location.href);
            });

            // src 없는 iframe 내 CSS 생성
            
            /* eslint-disable */
            /*
            if(elemHead.find("#ADD_UCHATCSS").length === 0){
                ADD_DEBUG("Iframe에 접근합니다.");
                var ADD_UCHATCSS = `
                    <style type="text/css" id="ADD_UCHATCSS">
                        .imgur_container {position:relative;text-align:center}
                        .imgur_safe_screen {display:inline-flex;z-index:1000;align-items:center;position:absolute;top:0;left:0;text-align:center;vertical-align:middle;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJElEQVQImWPo6ur6D8MMDAz/GZA5XV1dEAEYB8pGcLq6uv4DAKP8I1nj691jAAAAAElFTkSuQmCC) repeat;}
                        .imgur_control_button_container{position:relative;}
                        .imgur_control_button{position:absolute;width:60px;height:20px;text-align:right;z-index:999;}
                        .ADD_tr_10_10{top:10px;right:15px;}
                        .ADD_br_10_10{bottom:20px;right:15px;}
                        .imgur_control_button span{font-size:15px; display:inline-block;opacity:0.3;cursor:pointer;text-align:center;background:#fff;color:#333;border-radius:30px;padding:1px;margin-right:1.5px;height:18px;width:16px;line-height:100%;font-family: "Malgun Gothic","맑은고딕","맑은 고딕",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif;}
                        .imgur_safe_button {padding:2px 15px;background:white;border-radius:20px;border:1px solid #333;opacity:1.0;color:rgba(0, 0, 0, 1.0);line-height:200%;margin:0 auto;text-align:center;vertical-align:middle;cursor:pointer;color:black;font-size:12px;font-family: "Malgun Gothic","맑은고딕","맑은 고딕",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif;}
                        .imgur_image_in_chat {cursor:pointer;max-width:330px !important;max-height:1000px !important;padding:5px 0px;margin:0 auto;display:inline-block;}
                    </style>
                `;
                if(elemHead.length !== 0){
                    ADD_DEBUG("Iframe 내 css를 성공적으로 추가했습니다.");
                    elemHead.append(ADD_UCHATCSS);
                }
                else{
                    ADD_DEBUG("Iframe 내 head 를 찾을 수 없습니다",elemHead);
                }
            }
            else{
                ADD_DEBUG("Iframe 내 css가 이미 존재하므로 추가하지 않습니다");
            }
            */
            /* eslint-enable */
            
        });
    }


    //////////////////////////////////////////////////////////////////////////////////
    // 채팅창 시스템 메시지
    function ADD_send_sys_msg(msg, delay, type){
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
            var iframeElemGlobal = GLOBAL_CHAT_ELEM,
                $iframeElem,
                iframeElems = GLOBAL_CHAT_IFRAME_ELEMS;

            if(iframeElemGlobal !== undefined && iframeElemGlobal.length !== 0){
                ADD_DEBUG("정상적으로 시스템 메시지 출력 - ", msg);
                $iframeElem = iframeElemGlobal;
                //var conversation_contents_elem = $iframeElem; //$iframeDocument.find("div.content");
                $iframeElem.append(msg_text);
                if( iframeElems !== undefined && iframeElems.length !== 0 && isChatScrollOn($iframeElem.closest("div.wrap").find(".latest_chat")) ){
                    goScrollDown(iframeElems);
                }
            }
            // 채팅창 존재하지 않는 경우에 대한 에러처리
            else{
                ADD_DEBUG("채팅창이 없어서 채팅창이 생성될 때 까지 기다린다. - " + msg);
                // CASE1: 채팅창 iframe 은 있는 경우
                if($("u-chat > iframe").length !== 0){
                    ADD_DEBUG("SYS-MSG CASE1: 채팅창 iframe 은 있는 경우", $("u-chat > iframe"));
                    var $iframeDocument =  $("u-chat > iframe").contents().first(); //.contents().first();
                    //ADD_DEBUG("iframeDocument", $iframeDocument);
                    $iframeDocument.one("DOMNodeInserted", "div.contentWrap", function() {
                        $iframeElem = $(this).find("div.content");
                        GLOBAL_CHAT_ELEM = $iframeElem;
                        //ADD_DEBUG("$iframeElem", $iframeElem);
                        $iframeElem.append(msg_text);
                        if( iframeElems !== undefined && iframeElems.length !== 0 && isChatScrollOn($iframeElem.closest("div.wrap").find(".latest_chat")) ){
                            goScrollDown(iframeElems);
                        }
                        ADD_DEBUG("시스템 메시지 출력 - ", msg);
                    });
                }
                // CASE2: 채팅창 iframe 도 없는 경우
                else{
                    ADD_DEBUG("SYS-MSG CASE2: 채팅창 iframe 도 없는 경우");
                    $(document).one("DOMNodeInserted", "u-chat > iframe", function() {
                        //ADD_DEBUG("DOMNodeInserted u-chat > iframe 진입");
                        $(this).one("load", function(){
                            //ADD_DEBUG("DOMNodeInserted u-chat > iframe 로드 완료");
                            var $iframeDocument = $(this).contents().first();
                            $iframeDocument.one("DOMNodeInserted", "div.line", function() {
                                $iframeElem = $(this).parent();//find("div.content");
                                GLOBAL_CHAT_ELEM = $iframeElem;
                                $iframeElem.append(msg_text);
                                if( isChatScrollOn($iframeElem.closest("div.wrap").find(".latest_chat")) ){
                                    goScrollDown($iframeElem);
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
    function ADD_send_sys_msg_from_main_frame(msg, delay, type){
        if(urlCheck() !== C_UCHAT){
            ADD_DEBUG("메인 or 스트림에서 메시지 함수 호출 => iframe 내 함수 재호출 함");
            if($(".chat-container > iframe").length !== 0 && typeof $(".chat-container > iframe")[0].contentWindow.ADD_send_sys_msg === "function"){
                $(".chat-container > iframe")[0].contentWindow.ADD_send_sys_msg(msg, delay, type);
            }
            return;
        }
    }


    
    //////////////////////////////////////////////////////////////////////////////////
    // 우하하용 채팅 도구
    async function ADD_chatting_arrive_for_UHAHA(){
        // 기존에 꺼져있는 경우
        if(!chatting_arrive_check || chatting_arrive_check === null){
            // True 이면 켠다.
            if (ADD_config.chat_ctr.value){
                chatting_arrive_check = true;
                // 오로지 이 경우만 return 하지 않는다.
            }
            // 그 외의 경우 그냥 나간다.
            else{
                return;
            }
        }
        // 기존에 켜져있는 경우
        else{
            // False 이면 끈다.
            if(!ADD_config.chat_ctr.value){
                $(document).unbindArrive(".user_conversation");
                $(document).unbindArrive(".system");
                chatting_arrive_check = false;
                return;
            }
            // 그 외의 경우 그냥 나간다.
            else{
                return;
            }
        }

        // arrive bind 및 unbind
        if(chatting_arrive_check && ADD_config.chat_ctr.value){
            $(document).arrive("li.is_notme", async elems => {
                var elem = $(elems);

                var nick = elem.find("span.name").text();
                var content = elem.find("span.text").text();

                // 강제단차 이벤트
                var ADD_ignores = $.cookie("ignores");
                if(ADD_ignores === null || ADD_ignores === undefined){
                    ADD_ignores = [];
                } else {
                    ADD_ignores = JSON.parse(ADD_ignores);
                }

                if($.inArray(nick, ADD_ignores) !== -1){
                    ADD_DEBUG("강제단차 닉 차단", nick, content);
                    elem.remove();
                    return;
                }

                var createdDate = new Date();
                // Case 1: 금지단어로 차단하는 경우
                if(ADD_config.chat_block.value){
                    // Case 1-1 채팅 내용 기반
                    if(await ADD_chatBlock(elem, false, nick, content, createdDate, false, ADD_config.chat_block_contents.value, ADD_config.chat_block_noti.value)) return false;
                    // Case 1-2 닉네임 기반
                    if(await ADD_chatBlock(elem, false, nick, content, createdDate, ADD_config.chat_block_nickname.value, false, ADD_config.chat_block_noti.value)) return false;
                }
                // Case 2: 채팅 매니저로 차단하는 경우
                if(chat_manager === undefined && elem === undefined){
                    var isBlock = chat_manager.getIsBlock(nick);
                    if(isBlock){
                        var isShowDelMsg = chat_manager.getIsShowDelMsg(nick);
                        if(await ADD_chatBlock(elem, true, nick, content, createdDate, false, false, isShowDelMsg)) return false;
                    }
                }

            });

            var $iframeDocument = $("ul#uha_chat_msgs");
            // 채팅창 생성될 때 노티하기
            GLOBAL_CHAT_ELEM = $(this);
            if(ADD_config.sys_meg.value !== undefined && ADD_config.sys_meg.value){
                setTimeout(function(){
                    ADD_DEBUG("채팅창에서 애드온 동작");
                    $iframeDocument.append("<li class=\"uha_info\"><span class=\"name\">안내</span>두스트림 애드온이 임시 동작중입니다(우하하).<br />현재는 강제단차 및 키워드 차단 기능만 제공합니다.</li>");
                },3000);
            }
            //ADD_send_location_DOE($iframeDocument);


            // 채팅창에 있는 두스 링크 클릭 시 이벤트
            //$(document).on('click','.topClick',function(e){
            //    e.preventDefault();
            //    window.parent.location.href = this.href;
            //})

            // 채팅창 닉네임 클릭 시 강제단차 DOE 생성하기
            $(document).on("click", "span.name", function (){
                $(document).find("#uha_chat_contextmenu_close").before("<span id=\"uhaha_forced_dancha\" style=\"cursor:pointer;color:red;\">강제단차</span><br />");
            });

            // 강제단차 등록 이벤트
            $(document).on("click", "#uhaha_forced_dancha", function(){
                ADD_DEBUG("강제단차 등록 이벤트 실행");
                var forced_dancha_nick = $("#uha_chat_targetname").html();

                var ADD_ignores = $.cookie("ignores");
                if(ADD_ignores === null || ADD_ignores === undefined){
                    ADD_ignores = [];
                } else {
                    ADD_ignores = JSON.parse(ADD_ignores);
                }
                if(forced_dancha_nick !== null || forced_dancha_nick !== undefined){
                    (ADD_ignores).push(forced_dancha_nick);
                    $.cookie("ignores", JSON.stringify(ADD_ignores), { expires : 365, path : "/" });
                    if(ignores !== null && ignores !== undefined){
                        ignores = ADD_ignores;
                    }
                }
                ADD_DEBUG("ADD_ignores", ADD_ignores);
                $(document).find("#uha_chat_contextmenu").hide();
            });

            return;

        } // else 끝
    }

    //////////////////////////////////////////////////////////////////////////////////
    // Open Lightbox
    /*
    // Lightbox 를 여는 동작을 iframe 내에서 호출된 스크립트에서 하므로 주석처리 한다.
    $(document).on('click', '.open-lightbox', function(e){
      e.preventDefault();
      var image = $(this).attr('href');
      $('html').addClass('no-scroll');
      $('body').append('<div class="lightbox-opened"><img src="' + image + '"></div>');
    });
    */

    // Close Lightbox
    $(document).on("click", ".lightbox-opened", function(e){
        e.stopPropagation();
        $("html").removeClass("no-scroll");
        $(".lightbox-opened").remove();
    });

    ////////////////////////////////////////////////////////////////////////////////
    // thumbnail image hover event
    function ADD_thumbnail_mouseover(){
        if(thumbnail_check === ADD_config.thumbnail_mouse.value){
            // 이전 설정과 변경된 설정이 같으면 리턴한다.
            ADD_DEBUG("Thumbnail - 기존 thumb 이벤트 bind 설정과 같으므로 리턴한다");
            return;
        }
        else if ( (thumbnail_check === null) && (!ADD_config.thumbnail_mouse.value) ){
            // 초기 조건이 False 이므로 리턴한다.
            ADD_DEBUG("Thumbnail - 초기 thumb 이벤트 설정이 False 이므로 리턴한다");
            return;
        }
        else{
            // 이전 설정과 변경된 설정이 다르면 Global 변수를 업데이트 한다.
            ADD_DEBUG("Thumbnail - 설정 바뀌었으므로 변수 업데이트, "+ thumbnail_check +" --> " + ADD_config.thumbnail_mouse.value);
            thumbnail_check = ADD_config.thumbnail_mouse.value;
        }

        if(!thumbnail_check){
            // 설정이 변경되고 false 이면 true 에서 false 로 바뀐 것이므로 off 한다.
            ADD_DEBUG("Thumbnail - 설정 OFF");
            $(document).off("mouseenter mouseleave", "li.twitch>a>img, li.kakao>a>img, li.youtube>a>img");
        }
        else{
            $(document).on({
                mouseenter: function(){
                    var getTimeResult = "?" + getTimeStamp("m");
                    var thumb_this = $(this);
                    var thumb_this_parent = thumb_this.parent("a");
                    var thumb_size_class;

                    switch(ADD_config.thumbnail_size.value){
                    case "1":
                        // size : small
                        thumb_size_class = "ADD_thumb_size_1";
                        break;
                    case "2":
                        // size : medium
                        thumb_size_class = "ADD_thumb_size_2";
                        break;
                    case "3":
                        // size : large
                        thumb_size_class = "ADD_thumb_size_3";
                        break;
                    default:
                        thumb_size_class = "ADD_thumb_size_0";
                        // default
                        break;
                    }

                    var ADD_thumb_href = "";
                    ADD_thumb_href = thumb_this.attr("src") + getTimeResult;
                    // check image size
                    switch(ADD_config.thumbnail_size.value){
                    case "1":
                        // size : small
                        // 240 과 360 은 차이가 크지 않으므로 그냥 쓴다.
                        // ADD_thumb_href = ADD_thumb_href.replace('240x180','360x180');
                        break;
                    case "2":
                        // size : medium
                        ADD_thumb_href = ADD_thumb_href.replace("240x180","640x360");
                        break;
                    case "3":
                        // size : large
                        ADD_thumb_href = ADD_thumb_href.replace("240x180","1280x720");
                        break;
                    default:
                        // 아무 작업도 하지 않음
                        break;
                    }
                    if( thumb_this_parent.find(".ADD_thumb_elem_container").length === 0 ){ // 기존에 섬네일 영역 존재 안 하는 경우
                        var ADD_thumb_elem_string = `
                          <div class="ADD_thumb_elem_container">
                              <div class="ADD_thumb_elem `+thumb_size_class+`">
                                  <img class="ADD_thumb_img" style="width:100%;height:100%;" src="`+ADD_thumb_href+`" />
                              </div>
                          </div>
                          `;
                        thumb_this.after(ADD_thumb_elem_string);
                        thumb_this_parent.find(".ADD_thumb_elem_container").fadeIn("fast");
                    }
                    else // 기존에 이미 존재하는 경우
                    {
                        thumb_this_parent.find(".ADD_thumb_img").attr("src",ADD_thumb_href); // 주소 업데이트
                        thumb_this_parent.find(".ADD_thumb_elem_container").fadeIn("fast");
                    }

                    if( !(thumb_this_parent.find(".ADD_thumb_elem").hasClass(thumb_size_class)) ){
                        thumb_this_parent.find(".ADD_thumb_elem").removeClass("ADD_thumb_size_1 ADD_thumb_size_2 ADD_thumb_size_3 ADD_thumb_size_0").addClass(thumb_size_class);
                    }
                },
                mouseleave:function(){
                    var thumb_this = $(this);
                    var thumb_this_parent = thumb_this.parent("a");
                    if( thumb_this_parent.find(".ADD_thumb_elem_container").length !== 0 )
                    {
                        thumb_this_parent.find(".ADD_thumb_elem_container").fadeOut("fast");
                    }
                }
            }, "li.twitch>a>img, li.kakao>a>img, li.youtube>a>img");
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                             FUNCTION - CHAT MEMO
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    
    // 메모 기록 보기
    var chat_manager_data = [],
        $memo_container;

    function get_chat_manager_from_main_frame(){
        if(urlCheck() !== C_UCHAT){
            ADD_DEBUG("메인 or 스트림에서 메시지 함수 호출 => iframe 내 함수 재호출 함");
            if($(".chat-container > iframe").length !== 0 && $(".chat-container > iframe")[0].contentWindow.chat_manager !== undefined){
                ADD_DEBUG("iframe  의 chat manager 함수를 가져왔다.");
                chat_manager = $(".chat-container > iframe")[0].contentWindow.chat_manager;
            }
            else{
                ADD_DEBUG("메인  의 chat manager 함수를 가져왔다.");
                chat_manager = chat_manager_main;
            }
            return;
        }
    }

    var memoLogDOEInit = async function(){
        get_chat_manager_from_main_frame();

        // data load
        if(chat_manager !== undefined){
            chat_manager_data = await chat_manager.reloadData();
        }
        else{
            return;
        }
        ADD_DEBUG("메모 기록 로드 완료, data: ", chat_manager_data);

        $memo_container = $(`
        <div class="lightbox-opened">
            <div style="display:flex;margin-top:50px;cursor:default;"><!--lightbox-opened-white-background-->
                <div class="modal-content" style="font-size:12px;text-align:left;margin:0 auto;max-width:1200px;">
                    <div id="memo_contents" class="modal-body">
                        <div style="padding:2px 0 5px 5px;font-family:'Noto Sans KR', '맑은 고딕', 'malgun gothic', dotum, serif;">
                            <span style="font-weight:900;font-size:14px;">메모 관리</span><br />
                            두스트림 창이 여러개 열려 있고, 다른 창에서 메모 기록을 수정하는 경우 데이터가 이상해질 수 있습니다.<br />
                            본 기능은 언제든 갑작스럽게 사라지거나 동작하지 않을 수 있습니다 (테스트 중).
                            캠페인: 채팅창에서 메모 내용을 언급하지 말고 혼자 조용히 사용해주세요.
                        </div>
                        <table class="table table-condensed table-striped table-bordered" style="margin-bottom:5px;font-family:'Noto Sans KR'">
                            <thead>
                                <tr>
                                    <th style="width:40px;" class="index">#</th>
                                    <th style="width:140px;">닉네임</th>
                                    <th style="width:140px;">표시명</th>
                                    <th style="width:250px;" class="ADD_under_dev">상세 내용</th>
                                    <th style="width:140px;" class="ADD_under_dev">표시 색상</th>
                                    <th style="width:100px;">채팅 차단</th>
                                    <th style="width:80px;">차단 시 표시</th>
                                    <th style="width:120px;">수정한 날짜</th>
                                    <th style="width:70px;" class="th_mod">수정</th>
                                    <th style="width:40px;">삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan=7">메모 데이터가 없습니다.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        `);
        $("body").append($memo_container);
        writeMemoLogtoDOE($memo_container);
    };
    
    var writeMemoLogtoDOE = async function(){
        $("html").addClass("no-scroll");
        var $tbody = $memo_container.find("tbody");
        $tbody.html("");
        for (var i=0;i<chat_manager_data.length;i++){
            //var keys = ["nick","display_name","detail_content","modified_date","isBlock","isShowDelMsg"];
            var nick = chat_manager_data[i].nick;
            var color = chat_manager_data[i].color;
            var display_name = chat_manager_data[i].display_name;
            var detail_content = chat_manager_data[i].detail_content;
            var modified_date = getTimeStampWithText(new Date(chat_manager_data[i].modified_date.replace(/"/g,"")), "s").replace("일 ","일 <br />");
            var isBlock = chat_manager_data[i].isBlock;
            var isShowDelMsg = chat_manager_data[i].isShowDelMsg;
            $tbody.append(`
                <tr>
                    <td class="index">`+(i+1)+`</td>
                    <td class="nick">`+nick+`</td>
                    <td class="display_name">`+display_name+`</td>
                    <td class="detail_content ADD_under_dev">`+detail_content+`</td>
                    <td class="color ADD_under_dev">`+color+`</td>
                    <td class="isBlock">`+isBlock+`</td>
                    <td class="isShowDelMsg">`+isShowDelMsg+`</td>
                    <td class="modified_date">`+modified_date+`</td>
                    <td class="fix">
                        <span memo_index="`+i+`" class="mod" style="cursor:pointer;text-decoration:underline;">수정</span>
                        <span memo_index="`+i+`" class="save" style="cursor:pointer;text-decoration:underline;display:none;">저장</span>
                        <span memo_index="`+i+`" class="cancel" style="cursor:pointer;text-decoration:underline;margin-left:5px;display:none;">취소</span>
                    </td>
                    <td class="fix"><span memo_index="`+i+`" class="del" style="cursor:pointer;text-decoration:underline;">삭제</span></td>
                </tr>
            `);
        }
        $tbody.append(`
                <tr class="new_memo_tr">
                    <td class="index"></td>
                    <td class="nick"></td>
                    <td class="display_name"></td>
                    <td class="detail_content ADD_under_dev"></td>
                    <td class="color ADD_under_dev"></td>
                    <td class="isBlock"></td>
                    <td class="isShowDelMsg"></td>
                    <td class="modified_date"></td>
                    <td class="fix">
                        <span memo_index="`+(chat_manager_data.length+1)+`" class="mod new" style="cursor:pointer;text-decoration:underline;">새 메모</span>
                        <span memo_index="`+(chat_manager_data.length+1)+`" class="save new" style="cursor:pointer;text-decoration:underline;display:none;">저장</span>
                        <span memo_index="`+(chat_manager_data.length+1)+`" class="cancel" style="cursor:pointer;text-decoration:underline;margin-left:5px;display:none;">취소</span>
                    </td>
                    <td class="fix"></td>
                </tr>
            `);
        $tbody.find("td").css("overflow","hidden");
        //$memo_container.find(".index").show();

        // 개발중 기능 on-off
        if(ADD_config.under_dev.value){
            $(".ADD_under_dev").show();
        }
        else{
            $(".ADD_under_dev").hide();
        }
    };

    // 메모 로그 버튼 클릭 시
    $(document).on("click", "#show_memo_log", async () => {
        memoLogDOEInit();
    });

    // 수정 버튼 클릭 시
    $(document).on("click", "span.mod", function(){
        var data = chat_manager_data;
        var $this = $(this);
        $this.hide();
        var $tr = $this.closest("tr");
        $tr.find("span.save").show();
        $tr.find("span.cancel").show();
        var $td = $tr.find("td");
        var index = $this.attr("memo_index");
        var temp_obj = {};
        if($this.hasClass("new")){
            $tr.find(".index").text(index);
            temp_obj = chat_manager.getInitObj();
        }
        else{
            temp_obj = data[index];
        }

        $td.each(function(){
            var $that = $(this);
            var temp_class = $that.attr("class");
            if($that.hasClass("detail_content")){
                $that.html(`
                    <textarea style="width:230px;height:60px;margin:0;">`+temp_obj[temp_class]+`</textarea>
                `);
            }
            else if($that.hasClass("display_name") || ($this.hasClass("new") && $that.hasClass("nick")) || $that.hasClass("color") ){
                $that.html(`
                    <div style="">
                        <input autocomplete="off" style="width:120px;margin:0;" type="text" value="`+temp_obj[temp_class]+`" />
                    </div>
                `);
            }
            else if($that.hasClass("isShowDelMsg") || $that.hasClass("isBlock")){
                $that.html(`
                    <input style="width:20px;height:20px;" type="checkbox" />
                `);
                $that.find("input").prop("checked",temp_obj[temp_class]);
            }
            else{
                return true;
            }
        });
    });

    // 취소 버튼 클릭 시
    $(document).on("click", "span.cancel", function(){
        writeMemoLogtoDOE($memo_container);
    });

    // 삭제 버튼 클릭 시
    $(document).on("click", "span.del", async function(){
        var $this = $(this);
        var index = $this.attr("memo_index");
        var nick = chat_manager_data[index].nick;

        var promptAns = confirm(nick+"에 대한 메모를 정말 삭제하시겠습니까?");
        if(!promptAns){
            return;
        }

        if(await chat_manager.deleteData(nick)){
            ADD_DEBUG(nick+"에 대한 메모를 성공적으로 삭제 완료");
            //alert("삭제 되었습니다.");
        }
        else{
            ADD_DEBUG(nick+"에 대한 메모를 삭제 실패");
        }

        // 다시 읽기
        chat_manager_data = await chat_manager.reloadData();

        // 다시 쓰기
        writeMemoLogtoDOE($memo_container);
    });

    // 저장 버튼 클릭 시
    $(document).on("click", "span.save", async function(){
        var data = chat_manager_data;
        var $this = $(this);
        var $tr = $this.closest("tr");
        var $td = $tr.find("td");
        var index = $this.attr("memo_index");
        var temp_obj = {};
        if($this.hasClass("new")){
            temp_obj = chat_manager.getInitObj();
        }
        else{
            temp_obj = data[index];
        }
        temp_obj.modified_date = new Date();
        $td.each(function(){
            var $that = $(this);
            var temp_class = $that.attr("class");
            if($that.hasClass("detail_content")){
                temp_obj[temp_class] = $that.find("textarea").val();
            }
            else if($that.hasClass("display_name") || $that.hasClass("color") || ($this.hasClass("new") && $that.hasClass("nick")) ){
                temp_obj[temp_class] = $that.find("input").val();
            }
            else if($that.hasClass("isShowDelMsg") || $that.hasClass("isBlock")){
                temp_obj[temp_class] = $that.find("input").is(":checked");
            }
            else{
                return true;
            }
        });

        var confirmValText = "정말 저장하시겠습니까?\n"
            + "닉네임: " + temp_obj.nick + "\n"
            + "표시명: " + temp_obj.display_name + "\n";

        if(ADD_config.under_dev.value){
            confirmValText = confirmValText
            + "상세 내용: " + temp_obj.detail_content + "\n"
            + "표시 색상: " + temp_obj.color + "\n";
        }
        confirmValText = confirmValText
            + "채팅 차단 여부: " + temp_obj.isBlock + "\n"
            + "차단시 표시 여부: " + temp_obj.isShowDelMsg;

        var confirmVal = confirm(confirmValText);
        if(confirmVal){
            // 중복된 닉네임이 존재하는 경우
            if($this.hasClass("new") && chat_manager.indexFromData(temp_obj.nick) !== -1){
                if(!confirm("닉네임 \"" +temp_obj.nick+"\"에 대한 메모가 이미 존재합니다. 덮어쓰시겠습니까?")){
                    alert("취소 되었습니다.");
                    return;
                }
            }
            
            // 저장하기
            await chat_manager.addandSaveData(temp_obj);

            // 다시 읽기
            chat_manager_data = await chat_manager.reloadData();

            alert("저장 되었습니다.");
            
            // 다시 쓰기
            writeMemoLogtoDOE($memo_container);
        }
        else{
            alert("취소 되었습니다.");
        }
    });

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                                 채팅 매니저
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    var chat_manager = (function(){
        //var keys = ["nick","display_name","detail_content","color","modified_date","isBlock","isShowDelMsg"];
        var initObj = {"nick":"닉네임", "display_name":"채팅창에 표시할 메모", "detail_content":"상세한 메모 내용 입력", "color":"","modified_date":new Date(), "isBlock":false, "isShowDelMsg":false};
        var data = [];//[{"nick":"11","display_name":"111"},{"nick":"22","display_name":"222"}];
        var obj_simple = {};
        var isSavedMemo = false;
        var nick, display_name, detail_content, color, modified_date, isBlock, isShowDelMsg;
        var $mainFrame;
        var $memo_simple_doe_container, $memo_simple_doe, $memo_isSavedMemo, $simpleMemoElem, 
            $memo_button_save, $memo_button_delete, $memo_button_close, $nick, $display_name, 
            $detail_content, $color, $modified_date, $isBlock, $isShowDelMsg;
        var $memo_change_text;
        var $memo_button;

        /////////////////////////////////////////////////
        // private functions
        var initManager = async function(){
            // 메모 데이터 읽기
            await loadData();

            // 기존 메모 기록 가져오기
            memoMigration();

            // 숨겨진 메모 입력 DOE 만들기
            $simpleMemoElem = $(`
            <div id="memo_simple_doe_container" style="z-index: 100000;background-color:rgba(51,51,51,0.8);cursor:pointer;height:100%;left:0;overflow-y:scroll;padding:0;position: fixed;
                text-align:center;top: 0;width: 100%;display:none;">
                <div id="memo_simple_doe" style="width:100%;position:absolute;top:50%;margin-top:-50%;cursor:default;">
                    <div style="width:300px;margin:0 auto;background-color:rgba(255,255,255,0.87);border:2px solid #555;border-radius:15px;color:#000;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
                        <div style="padding:10px 0 5px 0;font-size:13px;font-weight:bold;">
                            <span id="memo_nick" style="color:red;"></span>
                            <span style="">에 메모 입력</span>
                            <span id="memo_isSavedMemo" style="display:none;color:blue;">(새 메모 작성)</span>
                        </div>
                        <table style="width:270px;table-layout:fixed;vertical-align:middle;margin:0 15px;"><tbody>
                            <tr>
                                <td style="width:70px;font-weight:bold;vertical-align:middle;padding:4px 0;border-top:1px solid #aaa;">표시할 별명</td>
                                <td style="padding:4px 0;border-top:1px solid #aaa;"><input autocomplete="off" id="memo_display_name" type="text" style="width:180px;height:20px;padding:1px 0 1px 3px;border:1px solid #aaa;" value=""/></td>
                            </tr>
                            <tr class="ADD_under_dev" style="display:none;">
                                <td style="width:70px;font-weight:bold;vertical-align:middle;padding:4px 0;border-top:1px solid #aaa;">상세 내용<br />(기록용)</td>
                                <td style="padding:4px 0;border-top:1px solid #aaa;"><textarea id="memo_detail_content" style="width:180px;height:80px;padding:1px 0 1px 3px;border:1px solid #aaa;" value=""></textarea></td>
                            </tr>
                            <tr class="ADD_under_dev" style="display:none;">
                                <td style="width:70px;font-weight:bold;vertical-align:middle;padding:4px 0;border-top:1px solid #aaa;">수정한 날짜</td>
                                <td style="padding:4px 0;border-top:1px solid #aaa;""><input autocomplete="off" id="memo_modified_date" type="text" style="width:180px;height:20px;padding:1px 0 1px 3px;border:1px solid #aaa;" value=""/></td>
                            </tr>
                            <tr class="ADD_under_dev" style="display:none;">
                                <td style="width:70px;font-weight:bold;vertical-align:middle;padding:4px 0;border-top:1px solid #aaa;">표시할 색상</td>
                                <td style="padding:4px 0;border-top:1px solid #aaa;">
                                    <input autocomplete="off" id="memo_color" type="text" style="width:180px;height:20px;padding:1px 0 1px 3px;border:1px solid #aaa;" value=""/>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="vertical-align:middle;padding:5px 0 5px 20px;text-align:left;border-top:1px solid #aaa;">
                                    <span style="font-weight:bold;margin-right:5px;">채팅 차단</span>
                                    <input id="memo_isBlock" type="checkbox" style="cursor:pointer;width:15px;height:15px;padding:1px 5px 1px 3px;"/>
                                    <span style="font-size:11px;">(두스 기본 차단과는 별개로 작동)</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="vertical-align:middle;padding:5px 0 5px 20px;text-align:left;border-top:1px solid #aaa;border-bottom:1px solid #aaa;">
                                    <span style="font-weight:bold;margin-right:5px;">채팅 차단 시 Message deleted 로 표시</span>
                                    <input id="memo_isShowDelMsg" type="checkbox" style="cursor:pointer;width:15px;height:15px;padding:1px 0 1px 3px;"/>
                                </td>
                            </tr>
                        </tbody></table>

                        <div id="memo_button_container" style="padding:10px 0 5px 0;font-size:13px;">
                            <span id="memo_button_save" class="memo_button" style="background-color:#fff;cursor:pointer;border:1px solid #999;border-radius:3px;padding:4px 6px;margin:2px; 0px">저장</span>
                            <span id="memo_button_delete" class="memo_button" style="background-color:#fff;cursor:pointer;border:1px solid #999;border-radius:3px;padding:4px 6px;margin:2px; 0px">메모 삭제</span>
                            <span id="memo_button_close" class="memo_button" style="background-color:#fff;cursor:pointer;border:1px solid #999;border-radius:3px;padding:4px 6px;margin:2px; 0px">나가기</span>
                        </div>

                        <div id="memo_text_container" style="padding:5px 0px;">
                            <span id="memo_text" style="">
                                캠페인: 채팅창에서 메모 내용을 언급하지 말고<br />혼자 조용히 사용해주세요.
                            </span>
                            <div id="memo_change_text" style="padding:5px 0px;display:none;">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            `);
            //ADD_DEBUG($mainFrame, $mainFrame.find("body"));
            $mainFrame.find("body").first().addClass("chat_manager_added").append($simpleMemoElem);
            $memo_simple_doe_container = $mainFrame.find("#memo_simple_doe_container");
            $memo_simple_doe = $simpleMemoElem.find("#memo_simple_doe");

            $memo_isSavedMemo = $simpleMemoElem.find("#memo_isSavedMemo");
            $nick = $simpleMemoElem.find("#memo_nick");
            $display_name = $simpleMemoElem.find("#memo_display_name");
            $detail_content = $simpleMemoElem.find("#memo_detail_content");
            $color = $simpleMemoElem.find("#memo_color");
            $modified_date = $simpleMemoElem.find("#memo_modified_date");
            $isBlock = $simpleMemoElem.find("#memo_isBlock");
            $isShowDelMsg = $simpleMemoElem.find("#memo_isShowDelMsg");

            $memo_button_save = $simpleMemoElem.find("#memo_button_save");
            $memo_button_delete = $simpleMemoElem.find("#memo_button_delete");
            $memo_button_close = $simpleMemoElem.find("#memo_button_close");
            $memo_button = $simpleMemoElem.find(".memo_button");

            $memo_change_text = $simpleMemoElem.find("#memo_change_text");

            initEvent();
            ADD_DEBUG("채팅 매니저 초기화 완료");

            if(ADD_config.under_dev.value){
                $mainFrame.find(".ADD_under_dev").show();
            }
            else{
                $mainFrame.find(".ADD_under_dev").hide();
            }
        };
        // 기존 버전 채팅 메모를 새 버전에 덮어씌운다.
        var memoMigration = async function(){
            var temp_old_memo = await ADD_GetVal("ADD_chat_memo");
            if(temp_old_memo === undefined){
                ADD_DEBUG("채팅 메모를 migration 할 것이 없습니다");
                return;
            }
            ADD_DEBUG("채팅 메모 migration 시작:", typeof temp_old_memo, temp_old_memo);
            if(typeof temp_old_memo === "string"){
                temp_old_memo = JSON.parse(temp_old_memo);
            }
            for (var key in temp_old_memo){
                if(key === "key"){
                    continue;
                }
                var temp_obj = objInit({nick:key, display_name:temp_old_memo[key], detail_content:""});
                addObjtoData(temp_obj);
            }
            saveData();
            await GM.deleteValue("ADD_chat_memo");
            ADD_DEBUG("migration 완료!", data);
        };
        var closeSimpleDOE = function(){
            $memo_simple_doe_container.fadeOut("fast");
            $memo_change_text.css("display","none");
        };
        var saveSimpleDOE = async function(){
            getObjFromSimpleDOE();
            obj_simple.modified_date = JSON.stringify(new Date());  // 수정 시간 갱신
            addObjtoData(obj_simple);
            await saveData();
        };
        // 모든 이벤트 초기화
        var initEvent = function(){
            $memo_button
                .mousedown(function(){
                    $(this).css("box-shadow","inset 0 3px 5px rgba(0, 0, 0, .150)")
                        .css("border","1px solid #666");
                })
                .mouseup(function() {
                    $(this).css("box-shadow","none")
                        .css("border","1px solid #999");
                })
                .mouseover(function(){
                    $(this).css("background-color","#eee");
                })
                .mouseleave(function(){
                    $(this).css("background-color","#fff")
                        .css("box-shadow","none")
                        .css("border","1px solid #999");
                });

            // 창 끄기 이벤트
            $memo_simple_doe_container.on("click", function(){
                closeSimpleDOE();
            });
            $memo_button_close.on("click", function(){
                closeSimpleDOE();
            });

            // 창 끄기 방지 이벤트
            $memo_simple_doe.on("click", function(e){
                e.stopPropagation();
            });
            ADD_DEBUG("채팅 매니저 이벤트 등록 완료");

            // 메모 저장 이벤트
            $memo_button_save.on("click", async function(){
                await saveSimpleDOE();
                $memo_change_text.fadeOut("fast").html("메모가 저장되었습니다.").fadeIn("fast");
                ADD_DEBUG("메모 저장 이벤트 끝", data);
            });

            // 메모 삭제 이벤트
            $memo_button_delete.on("click", async function(){
                getObjFromSimpleDOE();
                deleteObjfromData(obj_simple);
                await saveData();
                $memo_change_text.fadeOut("fast").html("메모가 삭제되었습니다.").fadeIn("fast");
                ADD_DEBUG("메모 삭제 이벤트 끝", data);
            });

            // 메모 닉네임 입력창 초기화 이벤트
            $display_name.on("click", function(){
                var $this = $(this);
                if($this.val() == "채팅창에 표시할 내용"){
                    $this.val("");
                }
            });
        };
        var loadData = async function(){
            data = await ADD_GetVal("ADD_chat_manager_data",[]);
            //ADD_DEBUG("채팅 매니저 데이터 로드", data);
        };
        var saveData = async function(){
            await ADD_SetVal("ADD_chat_manager_data",data);
            ADD_DEBUG("채팅 매니저 데이터 저장", data);
        };
        var getObjIndexFromData = function(/* nick or */obj){
            var local_nick = "";
            if(typeof obj === "object"){
                local_nick = obj.nick;
            }
            else if(typeof obj === "string"){
                local_nick = obj;
            }
            else{
                return -1;
            }
            var index = data.findIndex(obj => {
                return obj.nick === local_nick;
            });
            return index;
        };
        var addObjtoData = function(obj){
            var index = getObjIndexFromData(obj);
            if (index === -1){
                data.push(obj);
            }
            else{
                data[index] = obj;
            }
        };
        var deleteObjfromData = function(/*nick or */obj){
            var index = getObjIndexFromData(obj);
            if (index !== -1){
                data.splice(index, 1);
                return true;
            }
            else{
                return false;
            }
        };
        var getObjFromNick = function(local_nick){
            //data = loadData();
            var temp_obj = data.find(obj => {
                return obj.nick === local_nick;
            });
            return temp_obj;
        };
        // obj 에 변수가 다 채워져 있지 않을 경우 초기화 용
        var objInit = function(obj){
            var temp_obj = JSON.parse(JSON.stringify(initObj)); // deepCopy
            for (var key in obj){
                temp_obj[key] = obj[key];
            }
            return temp_obj;
        };
        // SimpleDOE 에서 변수 읽어오기
        var getObjFromSimpleDOE = function(){
            nick = $nick.text();
            display_name = $display_name.val();
            color = $color.val();
            detail_content = $detail_content.val();
            modified_date = new Date(JSON.parse($modified_date.val()));
            isBlock = $isBlock.is(":checked");
            isShowDelMsg = $isShowDelMsg.is(":checked");

            obj_simple = {"nick":nick, "display_name":display_name, "detail_content":detail_content, "color":color, "modified_date":modified_date, "isBlock":isBlock, "isShowDelMsg":isShowDelMsg};
        };
        // SimpleDOE 에 변수 쓰기
        var writeObjFromSimpleDOE = function(){
            $nick.text(obj_simple.nick);
            $display_name.val(obj_simple.display_name);
            $color.val(obj_simple.color);
            $detail_content.val(obj_simple.detail_content);
            $modified_date.val(JSON.stringify(obj_simple.modified_date));
            $isBlock.attr("checked",obj_simple.isBlock);
            $isShowDelMsg.attr("checked",obj_simple.isShowDelMsg);
        };

        /////////////////////////////////////////////////
        // public interface
        return {
            init: function(mainFrame){
                $mainFrame = mainFrame;
                initManager();
            },
            indexFromData: function(local_nick){
                var index = getObjIndexFromData(local_nick);
                return index;
            },
            getInitObj: function(){
                return JSON.parse(JSON.stringify(initObj)); // deepCopy
            },
            getData: function(index){
                if(index === undefined){
                    return data;
                }
                else{
                    return data[index];
                }
            },
            deleteData: async function(local_nick/* or obj */){
                var returnval = deleteObjfromData(local_nick);
                await saveData();
                return returnval;
            },
            reloadData: async function(){
                await loadData();
                return data;
            },
            addandSaveData: async function(obj){
                addObjtoData(objInit(obj));
                await saveData();
            },
            initData: async function(){
                await ADD_SetVal("ADD_chat_manager_data",[]);
                ADD_DEBUG("채팅 매니저 데이터 초기화", data);
            },
            getIsBlock: function(local_nick){
                var index = getObjIndexFromData(local_nick);
                if(index !== -1){
                    var res_temp = data[index].isBlock;
                    return res_temp;
                }
                else{
                    return false;
                }
            },
            getIsShowDelMsg: function(local_nick){
                var index = getObjIndexFromData(local_nick);
                if(index !== -1){
                    var res_temp = data[index].isShowDelMsg;
                    return res_temp;
                }
                else{
                    return false;
                }
            },
            openSimpleDOE: async function(obj){
                ADD_DEBUG("SimpleDOE 오픈", obj);
                await loadData();

                // 기존 정보를 가져온다.
                obj_simple = getObjFromNick(obj.nick);

                // 만약 기존 정보가 존재하지 않을 경우, 새 정보를 가져온다.
                if(obj_simple === undefined){
                    obj_simple = objInit(obj);
                    isSavedMemo = false;
                }
                else{
                    isSavedMemo = true;
                }

                // DOE에 값을 덮어씌운다.
                writeObjFromSimpleDOE();

                // DOE 요소를 보인다.
                //$("html").css("overflow","hidden"); // 기본 값이 hidden 이다.
                $simpleMemoElem.fadeIn("fast");

                // 새 메모 작성 시 표시한다.
                if(isSavedMemo){
                    $memo_isSavedMemo.hide();
                }
                else{
                    $memo_isSavedMemo.show();
                }
            },
            openManagerDOE: function(){

            }
        };
    })();


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                                   Nude.js
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    // eslint-disable-next-line no-unused-vars
    function checkNudeImage(node) {
        var returnVal = false;
        if(typeof nude !== undefined){
            nude.load(node);
            // Scan it
            nude.scan(function(result){
                if(result){
                    ADD_DEBUG("피부톤 이미지 발견!");
                    returnVal = true;
                }
                else{
                    ADD_DEBUG("Nudity 통과");
                    returnVal = false;
                }
            });
        }
        return returnVal;
    }


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                                 MAIN - 실행 영역
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////// 페이지 로드 전에 해도 되는 것들 ///////////////////////
    // DEBUG mode
    var ADD_DEBUG_MODE = false;
    ADD_DEBUG_MODE = await ADD_GetVal("ADD_DEBUG_MODE");
    if(ADD_DEBUG_MODE === undefined){
        ADD_DEBUG_MODE = false;
        await ADD_SetVal("ADD_DEBUG_MODE", ADD_DEBUG_MODE);
    }
    ADD_DEBUG("DEBUG MODE ON");

    // 호출된 페이지
    /*
    var statusText = "UNKNOWN";
    switch(urlCheck()){
    case C_MAIN :
        statusText = "MAIN";
        break;
    case C_STREAM :
        statusText = "STREAM";
        break;
    case C_UCHAT :
        statusText = "U_CHAT";
        break;
    default :
        statusText = "UNKNOWN";
    }
    ADD_DEBUG("현재 스크립트가 호출된 곳: "+statusText);
    */

    // Version check
    const version_str = GM.info.script.version;
    var version = Number(ADD_version_string(version_str));
    
    // Read addon config. var
    await ADD_config_var_read();

    // 채팅창 아닌 경우
    if(urlCheck() !== C_UCHAT){
        // Call Twitch api
        twitch_api();
        ADD_API_CALL_INTERVAL();

        // Multiwindows checker
        ADD_multiwindow_prevent();
    }


    ///////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// $(document).ready //////////////////////////////
    $(document).ready(function(){
        ADD_DEBUG("DOCUMENT_READY");

        ///////////////////////////////////////////////////////////////////////////////////
        // Hijacking
        if(urlCheck() !== C_UCHAT){
            // Firefox 의 경우
            if((web_browser === "firefox") && (typeof exportFunction === "function")){
                unsafeWindow.dsStream = exportFunction(newdsStreamForExportFunction, unsafeWindow);
                ADD_DEBUG("firefox - unsafeWindow", unsafeWindow);
                unsafeWindow.dostream = exportFunction(newdostreamForExportFunction, unsafeWindow);

                $(document).on("click", "header .nav-brand, header .nav-brand_mod", function(){
                    if( urlCheck() !== C_STREAM ){
                        page = new newdsStreamForExportFunction();
                        page.reload();
                        ADD_multitwitch_DOE();
                    }
                });
            }

            // 그 이외(Chrome 등)의 경우
            else{// if(web_browser === 'chrome')
                unsafeWindow.dsStream = function(){
                    ADD_DEBUG("dsStream hijacked");
                    first_main_call = true;
                    $(".loader_container").fadeIn(200);
                    //var d = this;
                    this.reload = function(){
                        parse_data_from_list(0);
                    };
                    $(".loader_container").fadeOut(200);
                    ADD_multitwitch_DOE();
                };

                $(document).on("click", "header .nav-brand, header .nav-brand_mod", function(e){
                    if( urlCheck() !== C_STREAM ){
                        page = new dsStream();
                        page.reload();
                        ADD_multitwitch_DOE();
                        // hrm_DOE();
                    }
                    // 스트림 계속 이어 보기
                    else if(ADD_config.under_dev.value && ADD_config.popup_player.value){
                        e.preventDefault();
                        if($(".stream_zoomout").length !== -1){
                            $("#stream").addClass("stream_zoomout").attr("id","").after("<div id='stream'></div>");
                            $(".stream_zoomout").css("position","fixed").css("bottom","30px").css("left","30px")
                                .css("padding","0").css("margin","0").css("width","280px").css("height","157.5px").css("z-index","100").css("border-radius","4px");
                            $(".stream_zoomout").prepend(`
                                <div class="stream_zoomin_screen" style="display:none;background:rgba(0,0,0,.6);user-select:none;">
                                    <div class="stream_zoom_header" style="width:280px;height:40px;padding:5px;position:absolute;z-index:101;background:rgba(0,0,0,.6);color:#fff;font-size:20px;vertical-align:middle;">
                                        <div style="display:inline-flex;margin-left:10px;margin-right:10px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;cursor:default;">
                                            <span style="font-size:14px;">테스트 시청 중</span>
                                        </div>
                                        <div class="stream_zoomin_close" style="display:inline-flex;width:30px;height:30px;justify-content:center;cursor:pointer;float:right;font-family:unset;">
                                            <!--<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>-->
                                            X
                                        </div>
                                    </div>
                                    <div class="stream_zoom_button_container" style="width:280px;height:117.5px;position:absolute;z-index:101;top:40px;left:0;display:flex;justify-content:center;align-items:center;color:#fff;">
                                        <div class="button_expand" style="cursor:pointer;padding:10px;">
                                            <svg width="30px" height="30px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
                                                <path d="M13.146 9.354l-.646-.646-1.146 1.146a.5.5 0 0 1-.707 0l-.5-.5a.5.5 0 0 1 0-.707L11.293 7.5l-.646-.646A.499.499 0 0 1 11 6h2.5a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-.854.354zM18 3v11a.985.985 0 0 1-.235.621c-.022.027-.034.062-.058.086-.017.016-.04.023-.057.038A.987.987 0 0 1 17 15H13.003a1.001 1.001 0 1 1 0-2H16V4H6v4.997a1.001 1.001 0 1 1-2 0V3.003v-.002V3c0-.235.094-.442.229-.612.024-.03.038-.068.064-.095.015-.014.036-.021.051-.034A.989.989 0 0 1 5 2h12c.229 0 .43.09.598.22.035.027.078.043.109.073.011.012.016.028.027.04A.986.986 0 0 1 18 3zm-9.111 9c.614 0 1.11.498 1.11 1.111v3.778C10 17.502 9.504 18 8.89 18H3.112A1.112 1.112 0 0 1 2 16.889v-3.778C2 12.498 2.498 12 3.112 12h5.777z" style="fill:currentColor" fill-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div class="button_pause" style="margin-left:20px;cursor:pointer;padding:10px;">
                                        <svg width="30px" height="30px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
                                            <path d="M8 2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3zm7 0a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3z" style="fill:currentColor" fill-rule="evenodd"></path>
                                        </svg>
                                        </div>
                                    </div>
                                    <div style="width:280px;height:157.5px;padding:5px 10px;position:absolute;z-index:100;background-color:#000;opacity:0.5;"></div>
                                </div>
                            `);
                        }
                        window.open($(this).attr("href"), "_self");
                        $(".stream_zoomout").on("mouseover",function(){
                            $(".stream_zoomin_screen").fadeIn("fast");

                            $(".stream_zoomin_screen").one("mouseleave", function(){
                                $(this).fadeOut("fast");
                            });
                        });
                        $(".stream_zoomin_close").on("click", function(){
                            $(".stream_zoomout").remove();
                            $(".stream_zoomin_screen").remove();
                        });

                    }
                    // 스트림 계속 이어 보기 끝
                });
            }

            setTimeout(function(){
                if(!first_main_call){
                    // HIJACKING 이 늦게 발생한 경우 재호출한다.
                    ADD_DEBUG("초기 접속 시 100ms 이내 메인 리로드 하지 않을 시 강제 리로드 함");
                    reloadMain();
                }
            }, 100);
        }
        ///////////////////////////////////////////////////////////////////////////////////
        // 공통 사항
        // CSS LOAD
        Addostream_CSS();
        ADD_head_append();

        // 설정에 따라 바뀌는 이벤트 묶기
        ADD_event_binding();

        // 테마 적용
        if(ADD_config.theme.value !== "Default" && ADD_config.theme.value !== undefined){
            ADD_change_theme(ADD_config.theme.value);
        }

        ///////////////////////////////////////////////////////////////////////////////////
        // 메인인 경우
        if(urlCheck() !== C_UCHAT){
            // Create Config DOE
            ADD_config_DOE();
            ADD_test_DOE();
            pageChange();

            // Change Logo class name
            $(".nav-brand").removeClass("nav-brand").addClass("nav-brand_mod");
                
            // Create Loading DOE
            $(".nav-brand_mod").empty().append("<div class=\"loader_container\" style=\"display:none;\"><div class=\"loader\"></div></div>");

            // Create Multitwitch button DOE
            ADD_multitwitch_DOE();

            // History DOE
            ADD_Channel_History_Run();

            // Write config form from cookie
            ADD_var_to_config_form();
        }

        ///////////////////////////////////////////////////////////////////////////////////
        // 채팅의 경우
        if(urlCheck() == C_UCHAT){
            // 테스트용 코드
            unsafeWindow.ADD_send_sys_msg = ADD_send_sys_msg;

            // nude.js
            nude.init();

            // chat manager
            unsafeWindow.chat_manager = chat_manager;
        }
        else{
            // chat manager
            window.chat_manager_main = chat_manager;
        }
    });


    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// $(document).load /////////////////////////////
    // DOE 로드 후 실행되어야 할 것들을 이 곳에 적는다
    window.addEventListener ("load", function(){
        ADD_DEBUG("WINDOW_LOAD");
    });


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                                    EVENT
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////
    // change page check event
    function pageChange(){
        var document_url = location.href;
        document_url = document_url.toLowerCase();
        var now = urlCheck();
        var twitch_url = document_url.indexOf("/twitch/");
        var multitwitch_url = document_url.indexOf("/multitwitch/");
        if( (twitch_url  !== -1) || (multitwitch_url  !== -1) ){
            $("#ADD_change_multi").css("opacity", "1.0").fadeIn(300);
        }
        else{
            $("#ADD_change_multi").css("opacity", "0.0").fadeOut(300);

        }

        if( now === C_STREAM){
            $("#ADD_quick_list").css("opacity", "1.0").fadeIn(300);
        }
        else{
            $("#ADD_quick_list").css("opacity", "0.0").fadeOut(300);
        }
    }

    // 페이지 이동 시 이벤트
    if(urlCheck() !== C_UCHAT){
        window.onpopstate = function(){

            // 스트림 계속 이어 보기
            if(ADD_config.under_dev.value && ADD_config.popup_player.value && urlCheck() !== C_MAIN){
                ADD_DEBUG("onpopstate - 페이지 이동", urlCheckerText[urlCheck()]);
                $(".stream_zoomout").remove();
                $(".stream_zoomin_screen").remove();
            }
            // 스트림 계속 이어 보기 끝
            
            pageChange();
        };
    }

    //////////////////////////////////////////////////////////////////////////////////
    // change multitwitch event
    $(document).on("click", "#ADD_change_multi", function(){
        var document_url = location.href;
        var lowercase_document_url = document_url.toLowerCase();
        var stream_url = lowercase_document_url.indexOf("/stream/");
        var twitch_url = lowercase_document_url.indexOf("/twitch/");
        var multitwitch_url = lowercase_document_url.indexOf("/multitwitch/");
        var move_url = "";
        if(stream_url !== -1){
            if(twitch_url !== -1){
                move_url = document_url.replace("/twitch/","/multitwitch/");
                window.location.href = move_url;
            }
            else if(multitwitch_url !== -1){
                /*
                var eff_url = document_url.split("/multitwitch/")[1];
                // 멀티 트위치 하나 이상인 경우
                ADD_DEBUG("오케이");
                if(eff_url.indexOf("&") !== -1){
                    var eff_url_arr = eff_url.split("&");
                    var $multi_window = $(`
                        <div id="popup_ADD_multitwitch" class="modal-dialog">
                            <div class="modal-content" style="display:inline-flex">
                                    <div class="btn-group" style="display:inline-flex">
                                    </div>
                            </div>
                        </div>
                    `);
                    for(var i=0; i<eff_url_arr.length; i++){
                        $multi_window.find(".btn-group").append(`
                            <button type="button" class="btn btn-primary">
                                <a href='http://www.dostream.com/#/stream/twitch/`+eff_url_arr[i]+"' style='font-style:normal;color:#fff'>"+(i+1)+`</a>
                            </button>
                        `);
                    }
                    $(this).after($multi_window);
                }
                */
                move_url = document_url.replace("/multitwitch/","/twitch/");
                window.location.href = move_url;
            }
        }
    });


    //////////////////////////////////////////////////////////////////////////////////
    // 퀵 리스트 온오프 이벤트
    $(document).on("click", "#ADD_quick_list", function(e){
        e.stopPropagation();
        if (!$("#ADD_quick_list").hasClass("btn_opend")){
            parse_data_from_list(1);
            $("#popup_ADD_quick").stop(true,true).fadeIn(300);
            $("#ADD_quick_list").toggleClass("btn_opend");

            $("#popup_ADD_config").stop(true,true).fadeOut(300);
            $("#ADD_config").removeClass("btn_opend");

            $("#popup_ADD_test").stop(true,true).fadeOut(300);
            $("#ADD_test_button").removeClass("btn_opend");
        }
        else{
            $("#popup_ADD_quick").stop(true,true).fadeOut(300);
            $("#ADD_quick_list").removeClass("btn_opend");
        }
    });

    // 설정 창 온오프 이벤트
    $(document).on("click", "#ADD_config", function(e){
        e.stopPropagation();
        if (!$("#ADD_config").hasClass("btn_opend")){
            ADD_var_to_config_form();
            $("#popup_ADD_config").stop(true,true).fadeIn(300);
            $("#ADD_config").toggleClass("btn_opend");

            $("#popup_ADD_quick").stop(true,true).fadeOut(300);
            $("#ADD_quick_list").removeClass("btn_opend");

            $("#popup_ADD_test").stop(true,true).fadeOut(300);
            $("#ADD_test_button").removeClass("btn_opend");
        }
        else{
            $("#popup_ADD_config").stop(true,true).fadeOut(300);
            $("#ADD_config").removeClass("btn_opend");
        }
    });

    // 디버그 창 온오프 이벤트
    $(document).on("click", "#ADD_test_button", function(e){
        e.stopPropagation();
        if (!$("#ADD_test_button").hasClass("btn_opend")){
            $("#popup_ADD_test").stop(true,true).fadeIn(300);
            $("#ADD_test_button").toggleClass("btn_opend");

            $("#popup_ADD_quick").stop(true,true).fadeOut(300);
            $("#ADD_quick_list").removeClass("btn_opend");

            $("#popup_ADD_config").stop(true,true).fadeOut(300);
            $("#ADD_config").removeClass("btn_opend");
        }
        else{
            $("#popup_ADD_test").stop(true,true).fadeOut(300);
            $("#ADD_test_button").removeClass("btn_opend").addClass("btn_closed");
        }
    });

    // 바깥 부분 클릭 했을 때 창 닫기
    //$(document).on("click", "a.nav-brand, a.nav-brand_mod, #stream, div.footer", function(){
    $(document).on("click", function(){
        // 퀵 리스트 창
        if ($("#ADD_quick_list").hasClass("btn_opend")){
            $("#popup_ADD_quick").stop(true,true).fadeOut(300);
            $("#ADD_quick_list").removeClass("btn_opend").addClass("btn_closed");
        }

        // 설정 창
        if ($("#ADD_config").hasClass("btn_opend")){
            $("#popup_ADD_config").stop(true,true).fadeOut(300);
            $("#ADD_config").removeClass("btn_opend").addClass("btn_closed");
        }

        // 디버그 창
        if ($("#ADD_test_button").hasClass("btn_opend")){
            $("#popup_ADD_test").stop(true,true).fadeOut(300);
            $("#ADD_test_button").removeClass("btn_opend").addClass("btn_closed");
        }
    });




    //////////////////////////////////////////////////////////////////////////////////
    // Save cookie event

    $(document).on("click", "#ADD_config_save", async () => {
        ADD_save_config();
    });

    async function ADD_save_config(){
        ADD_save_config_to_data();
        await ADD_config_var_write();

        if (local_api_refresh === true)
        {
            local_api_refresh = false;
            api_push_forced = true;

            twitch_api();
            ADD_API_CALL_INTERVAL();
            setTimeout(function(){
                local_api_refresh = true;
            }, 5000);
        }

        // 이벤트 재결합
        ADD_DEBUG("설정 저장에 의한 이벤트 바인딩");
        ADD_event_binding();

        // 설정 팝업 알림 영역 표시
        $("#ADD_config_Success").fadeIn("1000").delay("3000").fadeOut("1000");

        // 메인일 경우 메인 리로드
        reloadMain();

        // 테마 재적용
        if(ADD_config.theme.value !== undefined){
            ADD_change_theme(ADD_config.theme.value);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    // reset cookie event
    $(document).on("click", "#Cookie_reset", async () => {
        var r = confirm("모든 설정을 초기화 하려면 확인(OK) 버튼을 누르세요.");
        if (r == true){
            ADD_config = deepCopy(ADD_config_init);
            await ADD_config_var_write();
            ADD_var_to_config_form();
            ADD_status_cookie_remove();

            // 블록된 채팅 로그 초기화
            await ADD_SetVal("ADD_Blocked_Chat",[]);

            // 메모 쿠키 초기화
            await GM.deleteValue("ADD_chat_manager_data");

            // 테마 리셋
            if(ADD_config.theme.value !== undefined){
                ADD_change_theme(ADD_config.theme.value);
            }

            // 버전 체크 데이터 리셋
            var ADD_version_last_check_time = new Date(Date.parse(new Date()) - 2 * 1000 * 60 * 60 * 24);
            await ADD_SetVal("ADD_version_last_check_time",ADD_version_last_check_time);

            // 설정 팝업 알림 영역 표시
            $("#ADD_config_Success").fadeIn("1000").delay("3000").fadeOut("1000");
            ADD_DEBUG("설정 리셋 완료");
        }
        else {
            alert("설정 초기화가 취소되었습니다.");
            ADD_DEBUG("설정 리셋 취소");
        }
    });

    //////////////////////////////////////////////////////////////////////////////////
    // backup and restore event
    function MD5(s){function L(k,d){return(k<<d)|(k>>>(32-d));}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H);}if(I|d){if(x&1073741824){return(x^3221225472^F^H);}else{return(x^1073741824^F^H);}}else{return(x^F^H);}}function r(d,F,k){return(d&F)|((~d)&k);}function q(d,F,k){return(d&k)|(F&(~k));}function p(d,F,k){return(d^F^k);}function n(d,F,k){return(F^(d|(~k)));}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F);}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F);}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F);}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F);}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++;}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa;}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2);}return k;}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x);}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128);}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128);}}}return d;}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g);}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase();}

    $(document).on("click", "#ADD_config_restore", async () => {
        var temp_ADD_config = await GM.getValue("ADD_config");
        var temp_ADD_chat_memo = await GM.getValue("ADD_chat_manager_data",[]);

        var backup_text = "<<<ADD_chat_memo>>>"+temp_ADD_chat_memo+"<<<ADD_config>>>"+temp_ADD_config+"<<<END>>>";
        var MD5_key = MD5(backup_text);
        backup_text = "<VERIFICATION_KEY:"+MD5_key+">"+backup_text;
        $("html").addClass("no-scroll");
        var backup_doe_text = `
            <div class="lightbox-opened">
            <div class="backup_doe" style="position: absolute; top: 50%;left:50%; width: 600px; height:300px; margin-left:-300px; margin-top:-150px;">
            <div style="width:600px;height:200px;cursor:default;" class="modal-content">
            <div style="padding:7px 0;font-size:12px;"><span style="font-weight:bold;">Backup & Restore - 메모 및 주요 설정 백업 및 복원</span><br />복원 방법: 아래 기존 백업한 내용을 붙여넣기 후 SAVE (버전이 다르면 복원되지 않을 수 있음)</div>
            <textarea spellcheck="false" id="backup_textbox" style="width:90%;height:100px;font-size:11px;padding:2px;white-space: pre-wrap;word-wrap: break-all;">`+backup_text+`</textarea>
            <div style="padding:5px 0;"><span id="backup_ok" class="btn btn-default">SAVE</span></div>
            </div>
            <div id="backup_text_container" style="position:relative;top:10px;left:0px; width:600px;height:30px;font-size:12px;cursor:pointer;"><span id="backup_text" style="color:#fff">저장하지 않고 나가려면 배경화면을 누르세요.</span></div>
            </div>
            </div>
            `;
        $("body").append(backup_doe_text);
    });

    // modal 창 클릭 시 꺼지지 않게 하는 이벤트
    $(document).on("click", "div.modal-content", function(e){
        e.stopPropagation();
    });

    $(document).on("click", "#backup_ok", async () => {
        var temp_ADD_config = await GM.getValue("ADD_config");
        var temp_ADD_chat_memo = await GM.getValue("ADD_chat_manager_data", []);
        var restore_text = $("#backup_textbox").val();
        $("#backup_text").fadeOut(200);
        setTimeout(async () => {
            var text_contents;
            var checked_text1 = restore_text.substr(0,18);
            var checked_text2 = restore_text.substr(restore_text.length-9,9);
            var checked_text3 = restore_text.indexOf("<<<ADD_chat_memo>>>");
            var checked_text4 = restore_text.indexOf("<<<ADD_config>>>");
            if(restore_text === "DEBUG"){
                ADD_DEBUG_MODE = !(ADD_DEBUG_MODE);
                await ADD_SetVal("ADD_DEBUG_MODE", ADD_DEBUG_MODE);
                text_contents = "DEBUG 모드: "+ADD_DEBUG_MODE;
            }
            else if(checked_text1 !== "<VERIFICATION_KEY:"){
                ADD_DEBUG("checked_text1:", checked_text1);
                text_contents = "입력한 내용에 문제가 있습니다.<br />복원할 설정은 반드시 공백 없이 \"&lt;VERIFICATION_KEY:\" 로 시작해야 합니다.";
            }
            else if(checked_text2 !== "<<<END>>>"){
                ADD_DEBUG("checked_text2:", checked_text2);
                text_contents = "입력한 내용에 문제가 있습니다.<br />복원할 설정은 반드시 공백 없이 \"&lt;&lt;&lt;END&gt;&gt;&gt;\" 로 끝나야 합니다.";
            }
            else if(checked_text3 == -1){
                ADD_DEBUG("checked_text3:", checked_text3);
                text_contents = "입력한 내용에 문제가 있습니다. 메모 정보가 없습니다.(&lt;&lt;&lt;ADD_chat_memo&gt;&gt;&gt;)";
            }
            else if(checked_text4 == -1){
                ADD_DEBUG("checked_text4:", checked_text4);
                text_contents = "입력한 내용에 문제가 있습니다. 설정 정보가 없습니다.(&lt;&lt;&lt;ADD_config&gt;&gt;&gt;)";
            }
            else{
                var restore_chat_config = restore_text.substr(51,restore_text.length - 51);
                ADD_DEBUG("restore_chat_config :", restore_chat_config);
                var validation_key = restore_text.substr(18,32);
                var restore_MD5_key = MD5(restore_chat_config);
                ADD_DEBUG("validation_key: ",validation_key);
                ADD_DEBUG("restore_validation_key: ",restore_MD5_key);
                restore_chat_config = restore_chat_config.replace("<<<END>>>","");

                if(validation_key !== restore_MD5_key && validation_key !== "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"){
                    text_contents = "VERIFICATION KEY가 일치하지 않아 정상적인 복원을 보증할 수 없습니다.<br />입력된 키:"+validation_key+"<br />복원한 키:"+restore_MD5_key+"<br />TIP: 강제로 복원하려면 복원키를 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa (a가 32개) 로 입력하세요.";
                }
                else{
                    var recorver_chat_memo = restore_chat_config.split("<<<ADD_chat_memo>>>")[1].split("<<<ADD_config>>>")[0];
                    var restore_config = restore_chat_config.split("<<<ADD_config>>>")[1];
                    ADD_DEBUG("recorver_chat_memo: ",recorver_chat_memo);
                    ADD_DEBUG("restore_config: ",restore_config);

                    if(recorver_chat_memo === null || recorver_chat_memo === undefined){
                        text_contents = "메모 복원 중 오류 발생!<br />나가려면 배경화면을 누르세요.";
                    }
                    else if(restore_config === undefined || restore_config === null){
                        text_contents = "설정 복원 중 오류 발생!<br />나가려면 배경화면을 누르세요.";
                    }
                    else if(temp_ADD_config == restore_config && temp_ADD_chat_memo == recorver_chat_memo){
                        text_contents = "현재 설정과 복원할 설정이 같아서 복원하지 않습니다. <br />나가려면 배경화면을 누르세요.";
                    }
                    else {
                        await GM.setValue("ADD_config", restore_config);
                        ADD_config = JSON.parse(restore_config);
                        ADD_var_to_config_form();
                        await ADD_save_config();
                        await GM.setValue("ADD_chat_manager_data",recorver_chat_memo);
                        text_contents = "설정이 복원되었습니다. 문제 발생 시 확장기능에서 ADDostream을 초기화 or 삭제 후 재설치 하세요. <br /> 나가려면 배경화면을 누르세요.";
                    }
                }
            }
            $("#backup_text").html(text_contents).fadeIn(200);
        }, 200);
    });

    //////////////////////////////////////////////////////////////////////////////////
    // config form click event
    function ADD_config_enable(){   // function ADD_config_enable(id){
        var i,
            $id_elem = [],
            form_class = [],
            $class_elem = [];

        // 먼저 전부 켠다.
        for(i=0;i<ADD_config_enable_init.length;i++){
            // 초기 배열에 있는 값 찾기
            $id_elem[i] = $("#"+ADD_config_enable_init[i]);
            if($id_elem[i].length === 0){
                continue;
            }

            // 초기 배열 이름 + _form 붙은 클래스 찾기
            form_class[i] = "."+$id_elem[i].attr("id")+"_form";
            $class_elem[i] = $(form_class[i]);
            if($class_elem[i].length === 0){
                continue;
            }
            else if($class_elem[i] !== undefined){
                // 찾은 경우 다 켠다.
                $class_elem[i].prop("disabled", false).addClass("form_enabled").removeClass("form_disabled");
                $class_elem[i].parent("label.btn").removeClass("disable");
            }
        }

        // 체크 안 된 것을 끈다.
        for(i=0;i<ADD_config_enable_init.length;i++){
            if( $id_elem[i] !== undefined && !($id_elem[i].is(":checked")) && ($class_elem[i] !== undefined) ){
                $class_elem[i].prop("disabled", true).addClass("form_disabled").removeClass("form_enabled");
                $class_elem[i].parent("label.btn").addClass("disable");
            }
        }
    }

    // 이벤트 일괄 등록
    for(i=0;i<ADD_config_enable_init.length;i++){
        (function(id){
            $(document).on("click", "#"+id, function(){
                ADD_config_enable();    // ADD_config_enable([id]);
            });
        })(ADD_config_enable_init[i]);
    }

    // scroll lock click event
    $(document).on("click", ".uchat_scroll", function(){
        $(this).toggleClass("uchat_scroll_clicked");
    });

    function isChatScrollOn(elem){
        if(elem.length !== 0 && elem.is(":visible")){
            // ADD_DEBUG("현재 스크롤은 정지 상태 입니다");
            return false;
        }
        else if(elem.length !== 0 && !elem.is(":visible")){
            //ADD_DEBUG('현재 스크롤은 Free 상태 입니다');
            return true;
        }
        else{
            ADD_DEBUG("현재 스크롤은 알 수 없음 상태이므로 정지 상태로 가정합니다", elem.length);
            return false;
        }
    }

    var isGoScrollDown = true;
    function goScrollDown(iframeElems){
        if(isGoScrollDown && iframeElems.contentWindow !== undefined && 
            iframeElems.contentWindow.rooms !== undefined &&
            iframeElems.contentWindow.rooms["dostest"] !== undefined && 
            GLOBAL_CHAT_ELEM !== undefined &&
            GLOBAL_CHAT_ELEM.length !== 0){
            iframeElems.contentWindow.rooms["dostest"].room.setting.data["option.autoScroll"] = 1;
            iframeElems.contentWindow.rooms["dostest"].room.log.temp_scroll_stop = 0;
            //GLOBAL_CHAT_ELEM.stop("true","true").animate({ scrollTop: 1000000 }, "0");
        }
        else{
            //ADD_DEBUG("에러!! iframeElems GLOBAL_CHAT_ELEM", iframeElems, GLOBAL_CHAT_ELEM);
        }
    }


    $(document).on("click", "#at", function(){
        SIGONGJOA();
    });


    //////////////////////////////////////////////////////////////////////////////////
    // api again event
    $(document).on("click", ".ADD_twitch_api_again", function(){
        ADD_twitch_api_again(ONLY_STREAM);
    });

    $(document).on("click", ".ADD_twitch_api_again_with_chat", function(){
        ADD_twitch_api_again(WITH_CHAT);
    });


    //////////////////////////////////////////////////////////////////////////////////
    function SIGONGJOA(){
        $("body").append("<div class=\"sigong\"><div class=\"sigong_detail1\"></div><div class=\"sigong_detail2\"></div></div><div class=\"hos\"></div><div style=\"display: none;\"><audio autoplay=\"true\" controls=\"\" class=\"attach_audio\" src=\"http://cdh0912.github.io/assets/files/시공의 폭풍은 정말 최고야.mp3\" type=\"audio/mpeg\"></audio><audio autoplay=\"true\" controls=\"\" class=\"attach_audio\" src=\"http://cdh0912.github.io/assets/files/시공좋아시공좋아.mp3\" type=\"audio/mpeg\"></audio></div>");
        $("head").append(`
        <style id="addostreamCSS" rel="stylesheet" type="text/css">
           body,html{animation-duration:.1s;animation-timing-function:ease-in-out}.hos,.sigong div{background-size:contain;background-position:center}.iframeclass{position:absolute;top:0;left:0;width:100%;height:100%}@keyframes shake{2%{transform:translate(-.5px,-.5px) rotate(.5deg)}4%{transform:translate(2.5px,-1.5px) rotate(-.5deg)}6%,68%,94%{transform:translate(2.5px,.5px) rotate(1.5deg)}8%{transform:translate(-.5px,2.5px) rotate(-.5deg)}10%,78%,86%{transform:translate(1.5px,-.5px) rotate(1.5deg)}12%,90%{transform:translate(.5px,-1.5px) rotate(-.5deg)}14%{transform:translate(.5px,-1.5px) rotate(.5deg)}16%,26%{transform:translate(-.5px,.5px) rotate(.5deg)}18%{transform:translate(-1.5px,1.5px) rotate(.5deg)}20%,96%{transform:translate(-.5px,-1.5px) rotate(-.5deg)}22%,76%{transform:translate(1.5px,1.5px) rotate(.5deg)}24%{transform:translate(-1.5px,2.5px) rotate(1.5deg)}28%{transform:translate(-1.5px,1.5px) rotate(-.5deg)}30%{transform:translate(1.5px,.5px) rotate(.5deg)}32%{transform:translate(1.5px,-.5px) rotate(.5deg)}34%,66%{transform:translate(2.5px,1.5px) rotate(-.5deg)}36%,72%{transform:translate(-1.5px,-.5px) rotate(-.5deg)}38%,62%{transform:translate(1.5px,2.5px) rotate(-.5deg)}40%,98%{transform:translate(-.5px,-1.5px) rotate(.5deg)}42%{transform:translate(.5px,.5px) rotate(.5deg)}44%{transform:translate(1.5px,1.5px) rotate(-.5deg)}46%,64%{transform:translate(-1.5px,.5px) rotate(-.5deg)}48%{transform:translate(1.5px,1.5px) rotate(1.5deg)}50%{transform:translate(.5px,-.5px) rotate(.5deg)}52%,84%{transform:translate(-.5px,.5px) rotate(1.5deg)}54%{transform:translate(1.5px,-1.5px) rotate(.5deg)}56%,74%,92%{transform:translate(-.5px,-1.5px) rotate(1.5deg)}58%{transform:translate(2.5px,1.5px) rotate(.5deg)}60%{transform:translate(-.5px,-.5px) rotate(1.5deg)}70%{transform:translate(-1.5px,-1.5px) rotate(.5deg)}80%{transform:translate(-.5px,1.5px) rotate(1.5deg)}82%{transform:translate(2.5px,2.5px) rotate(.5deg)}88%{transform:translate(2.5px,-1.5px) rotate(.5deg)}0%,100%{transform:translate(0,0) rotate(0)}}@keyframes shake-little{14%,18%,2%,26%,28%,36%,46%,52%,54%,66%,78%,80%,82%,84%{transform:translate(0,0) rotate(.5deg)}16%,22%,30%,38%,4%,40%,42%,48%,58%,6%,60%,62%,64%,68%,74%,8%,88%,90%,96%,98%{transform:translate(2px,2px) rotate(.5deg)}10%,20%,32%,34%,44%,50%,56%,70%,72%,86%,92%,94%{transform:translate(2px,0) rotate(.5deg)}12%,24%,76%{transform:translate(0,2px) rotate(.5deg)}0%,100%{transform:translate(0,0) rotate(0)}}@keyframes spin{0%{transform:rotate(0)}0.1%{transform:rotate(-60deg)}0.2%{transform:rotate(-144deg)}0.25%{transform:rotate(-252deg)}0.3%{transform:rotate(-396deg)}0.35%{transform:rotate(-576deg)}0.4%{transform:rotate(-792deg)}0.45%{transform:rotate(-1152deg)}0.5%{transform:rotate(-1632deg)}0.6%{transform:rotate(-2352deg)}0.7%{transform:rotate(-4012deg)}2.1%{transform:rotate(-56856deg)}2.2%{transform:rotate(-58514deg)}2.3%{transform:rotate(-59234deg)}2.4%{transform:rotate(-59703deg)}2.5%{transform:rotate(-60063deg)}2.6%{transform:rotate(-60279deg)}2.7%{transform:rotate(-60603deg)}2.8%{transform:rotate(-60711deg)}100%{transform:rotate(-82656deg)}}@keyframes scale-up{0%,0.5%{transform:scale(.5)}1%,1.7%{transform:scale(2.5)}2.0%{transform:scale(.5) translate(200px,-200px)}}@keyframes remove-border{1%{border-color:rgba(255,255,255,0);background-color:rgba(255,255,255,0)}}@keyframes fall-header{0%{top:0}0.6%{opacity:1}0.7%{top:350px;transform:scale(0) perspective(450px) rotateY(155deg) rotateZ(100deg);opacity:0}100%{opacity:0}}@keyframes fall-sharemenu{0.5%{transform:translate(-100%,0) rotate(-270deg) scale(.2);opacity:1}0.55%,100%{opacity:0}}@keyframes fall-search_box{0.4%{transform:translate(-10%,-500%) rotate(400deg) scale(0);opacity:1}0.45%,100%{opacity:0}}@keyframes fall-list_btn_top_right{0.5%{transform:translate(45vw,212px) rotate(180deg) scale(.2);transform-origin:left;opacity:1}0.55%,100%{opacity:0}}@keyframes fall-list_btn_top_left{0.5%{transform:translate(-45vw,212px) rotate(180deg) scale(.2);transform-origin:left;opacity:1}0.55%,100%{opacity:0}}@keyframes fall-list_btn_bottom_right{0.5%{transform:translate(45vw,-212px) rotate(180deg) scale(.2);transform-origin:left;opacity:1}0.55%,100%{opacity:0}}@keyframes fall-list_btn_bottom_left{0.5%{transform:translate(-45vw,-312px) rotate(180deg) scale(.2);transform-origin:left;opacity:1}0.55%,100%{opacity:0}}@keyframes fall-cafemenu{0.7%{transform:translate(44vw,-2%) rotate(345deg) scale(.05);opacity:1}0.75%,100%{opacity:0}}@keyframes fall-commentDiv{1%{transform:translate(-6vw,-8vw) rotateX(230deg) rotateY(240deg) scale(.05);opacity:1;transform-origin:top}1.1%,100%{opacity:0}}@keyframes fall-subject{0.5%{transform:translate(45vw,190px) rotate(50deg) scale(.4);transform-origin:right;opacity:1}0.55%,100%{opacity:0}}@keyframes fall-writer{0.5%{transform:translate(40vw,180px) rotate(-60deg) scale(.4);transform-origin:right;opacity:1}0.55%,100%{opacity:0}}@keyframes fall-url{0.5%{transform:translate(45vw,180px) rotate(-45deg) scale(.2);transform-origin:right;opacity:1}0.55%,100%{opacity:0}}@keyframes fall-comment_cnt{0.5%{transform:translate(40vw,-82px) rotate(180deg) scale(.2);transform-origin:left;opacity:1}0.55%,100%{opacity:0}}@keyframes fall-ccl{0.3%{transform:rotate(35deg) translate(-10vw,30%) scale(.8);transform-origin:left;opacity:1}0.5%{transform:rotate(55deg) translate(-20vw,60%) scale(.3);transform-origin:left;opacity:.8}0.52%,100%{opacity:0}}@keyframes appear-hos{0.04%,100%{opacity:1}}@keyframes fall-paging{0.5%{transform:rotate(-45deg) translate(7vw,-400px) scale(.5);opacity:1}0.55%,100%{opacity:0}}@keyframes fall-minidaum{0.5%{transform:rotate(-48deg) translate(-25vw) scale(.5);opacity:1}0.55%,100%{opacity:0}}html{animation-name:shake;animation-iteration-count:190;animation-delay:6.5s}body{animation-name:shake-little;animation-iteration-count:245;animation-delay:0s}.open_article{display:none}.bbs_contents{z-index:0}#header{z-index:2000}#title,.wrap{overflow:visible;animation:1000s fall-header ease-out 8.5s}#shareMenu{z-index:2000}#shareMenu>*{animation:1000s fall-sharemenu cubic-bezier(.85,.18,1,1.01) 7s;z-index:2000}.kakao,.twitch,.youtube{animation:1000s fall-list_btn_top_right cubic-bezier(.85,.18,1,1.01) 9s;z-index:2000}.ADD_checkbox_container{animation:1000s fall-list_btn_top_left cubic-bezier(.85,.18,1,1.01) 7s;z-index:2000}li a img{animation:1000s fall-list_btn_bottom_right cubic-bezier(.85,.18,1,1.01) 7s;z-index:2000}.count span,.count span span,.large_check,.setting_icon,.uchat_scroll{animation:1000s fall-list_btn_bottom_left cubic-bezier(.85,.18,1,1.01) 7s;z-index:2000}.checkbox,.multitwitch{animation:1000s fall-cafemenu linear 8s;z-index:2000}.title{animation:1000s fall-commentDiv linear 10s;z-index:2001}.nav-brand,.nav-brand_mod{animation:1000s fall-subject linear 7s;z-index:2000}#multitwitch,.AD_title,.checkbox{animation:1000s fall-writer linear 8s;z-index:2000}.from,.multitwitch_button{animation:1000s fall-url linear 7s;z-index:2000}.chat-container,.info,.search ul li div{animation:1000s fall-ccl linear 11s;z-index:2000}.info,.search ul li div{animation:1000s fall-ccl linear 7s;z-index:2000}.input{animation:1000s remove-border linear 10s}.footer{animation:1000s fall-paging linear 8s;z-index:2000}.chat-btns button{animation:1000s fall-minidaum linear 10s;z-index:2000}.sigong div{width:300px;height:300px;min-width:300px;top:0;left:0;background-repeat:no-repeat}.sigong .sigong_detail1{position:absolute;//background-image:url(http://cfile263.uf.daum.net/image/2120C1435920967129707D);background-image:url(http://i.imgur.com/pIIwR9c.png)}.sigong .sigong_detail2{//background-image:url(http://cfile290.uf.daum.net/image/2720604359209677295E2D);background-image:url(http://i.imgur.com/k52hCin.png);animation:spin 1000s linear infinite}#user_contents{overflow:visible!important}.hos{//background-image:url(http://cfile278.uf.daum.net/image/2124B4435920967229A02D);background-image:url(http://i.imgur.com/Ur5t9G5.png)}audio{visibility:hidden}@media screen and (min-width:480px){.hos,.sigong{top:300px;position:absolute;right:50%}.sigong{margin-top:-100px;animation:scale-up 1000s linear infinite;z-index:1000;margin-right:-105px}.hos{opacity:0;animation:1000s appear-hos linear 20s;width:708px;height:700px;margin-top:-338px;margin-right:-360px}}@media screen and (max-width:480px){.hos,.mobilebox{position:absolute;left:0;width:100%}.hos,.mobilebox,.sigong,.sigong div{width:100%}@keyframes scale-up{0%,0.5%{transform:scale(.5)}1%,2%{transform:scale(1.2)}2.5%{transform:scale(.21) translate(33%,-47%)}}@keyframes mobile_comment1{0.5%{transform:translate(0,-100px) scale(.4) rotate(-225deg);opacity:1}0.55%{opacity:0}}@keyframes mobile_comment2{0.5%{transform:translate(0,-200px) scale(.4) rotate(-45deg);opacity:1}0.55%{opacity:0}}@keyframes mobile_comment3{0.5%{transform:translate(0,-300%) scale(.4) rotate(70deg);opacity:1}0.55%{opacity:0}}@keyframes mobile_comment4{0.5%{transform:translate(0,-400%) scale(.4) rotate(-80deg);opacity:1}0.55%{opacity:0}}@keyframes mobile_comment5{0.5%{transform:translate(0,-500%) scale(.4) rotate(200deg);opacity:1}0.55%{opacity:0}}@keyframes mobile_subject{1%{transform:translate(0,250px) scale(.2) rotateX(60deg) rotateY(60deg) rotateZ(360deg);opacity:1}1.05%{opacity:0}}@keyframes mobile_navi{0.6%{transform:translate(0,350px) scale(.5) rotate(-145deg);opacity:1}0.65%{opacity:0}}@keyframes mobile_tabcafe{0.6%{transform:translate(0,-100px) scale(.2) rotate(-145deg);opacity:1}0.65%{opacity:0}}@keyframes mobile_optionbtn1{0.6%{transform:translate(-65px,-10px) scale(.5);opacity:1}0.65%{opacity:0}}@keyframes mobile_optionbtn2{0.6%{transform:translate(-100px,-10px) scale(.5);opacity:1}0.65%{opacity:0}}@keyframes fall-nickzzal{0.5%{transform:translate(120px,150px) rotate(200deg) rotateX(60deg) rotateY(60deg) scale(.2);opacity:1}0.55%,100%{opacity:0}}body,html{overflow:hidden}.sigong{animation:scale-up 1000s linear infinite;z-index:1000;display:table-cell}.hos{opacity:0;z-index:-1;animation:1000s appear-hos linear 23s}.mobilebox{display:table;top:0;height:375px;vertical-align:middle}.article_more,.detail_btns,.list_cmt>li:nth-child(1),.list_cmt>li:nth-child(2),.list_cmt>li:nth-child(3),.list_cmt>li:nth-child(4),.list_cmt>li:nth-child(5),.tab_cafe{z-index:2000;position:relative}.list_cmt>li:nth-child(1){animation:1000s mobile_comment1 linear 6s}.list_cmt>li:nth-child(2){animation:1000s mobile_comment2 linear 6.4s}.list_cmt>li:nth-child(3){animation:1000s mobile_comment3 linear 6.8s}.list_cmt>li:nth-child(4){animation:1000s mobile_comment4 linear 7.2s}.list_cmt>li:nth-child(5){animation:1000s mobile_comment5 linear 7.6s}.view_subject{animation:1000s mobile_subject linear 10s;z-index:2000}.cafe_navi{animation:1000s mobile_navi linear 7s;z-index:2000}.tab_cafe{animation:1000s mobile_tabcafe linear 9s}.detail_btns{animation:1000s mobile_optionbtn1 linear 6s}.article_more{animation:1000s mobile_optionbtn2 linear 6.5s}}
        </style>
        `);
        setTimeout(function(){
            $(".wrap").remove();
            $(".chat").remove();
        },20000);

        setTimeout(function(){
            $("body").append(`
                <div id="hos_movie" style="display:none;z-index:0;">
                <iframe class="iframeclass" src="https://www.youtube.com/embed/aKLb7Cc5NvY?rel=0&autoplay=1&start=0&end=8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            `);
            $(".hos").fadeOut(1000);
            $(".sigong").fadeOut(1000);

            setTimeout(function(){
                $("#hos_movie").fadeIn(3000);
            },1000);
        },27000);
    }

})();
