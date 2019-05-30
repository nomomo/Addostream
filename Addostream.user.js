// ==UserScript==
// @name        Addostream
// @namespace   Addostream
// @description 두스트림에 기능을 추가한다.
// @include     *.dostream.com/*
// @version     1.50.0
// @icon        https://raw.githubusercontent.com/nomomo/Addostream/master/images/logo.png
// @homepageURL https://nomomo.github.io/Addostream/
// @supportURL  https://github.com/nomomo/Addostream/issues
// @downloadURL https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js
// @updateURL   https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js
// @run-at      document-start
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require     https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.libs.js?20190115
// @require     https://embed.twitch.tv/embed/v1.js
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
// @grant       GM.notification
// @grant       GM_notification
// @grant       GM.addValueChangeListener
// @grant       GM_addValueChangeListener
// @grant       GM.removeValueChangeListener
// @grant       GM_removeValueChangeListener
// @grant       unsafeWindow
// @connect     appspot.com
// @connect     coord.dostream.com
// ==/UserScript==
// eslint-disable-next-line no-unused-vars
/*global $, jQuery, ADD_config, Twitch, nude, Colors, GM, unsafeWindow, GM_addStyle, GM_getValue, GM_setValue, GM_xmlhttpRequest, GM_registerMenuCommand, GM_deleteValue, GM_listValues, GM_getResourceText, GM_getResourceURL, GM_log, GM_openInTab, GM_setClipboard, GM_info, GM_getMetadata, GM_notification, GM_getTab, GM_getTabs, GM_saveTab, $, document, console, location, setInterval, setTimeout, clearInterval, page, ignores, exportFunction, dsStream, web_browser, chat_manager_main, chat_manager, Autolinker */
/* eslint-disable no-global-assign */
"use strict";
(async () => {
    var ADD_DEBUG_MODE = await ADD_GetVal("ADD_DEBUG_MODE", false);
    const C_MAIN = 0, C_STREAM = 1, C_UCHAT = 2, C_SETTING = 3, C_SETTING_NW = 4;
    const urlCheckerText = ["MAIN--","STREAM","UCHAT-","SETTING", "SETTING-NW"];
    var GM_page = urlCheck();

    ADD_DEBUG("DEBUG MODE ON");
    var i;  // inerator

    
    // 탭별 채팅 홀드 고유 변수 생성 or 읽어오기
    async function chat_hold_read(){
        if(GM_getTab === undefined || GM_getTabs === undefined || GM_saveTab === undefined){
            return;
        }

        // 파라미터
        var created = Number(new Date());
        
        // 현재 탭 파라미터 읽기
        GM_getTab(function(thisTabData){
            ADD_DEBUG("현재 탭 파라미터 읽기 시작");
            if(thisTabData.created) {
                // 기존에 탭 열려있었던 경우
                created = thisTabData.created;
                ADD_DEBUG("기존에 열려있던 탭", thisTabData);
            }
            else{
                // 처음 열린 탭인경우
                thisTabData.created  = created;
                GM_saveTab(thisTabData);
                ADD_DEBUG("처음 열린 탭", thisTabData);
            }
        });

        // 모든 탭 정보 읽어오기
        GM_getTabs(async function(all_tabs){
            ADD_DEBUG("모든 탭 정보 읽기 시작");
            if(all_tabs.length === 1){
                // 탭이 하나밖에 없는 경우 무조건 채팅 로드함
                // +++ chat hold 변수를 내 탭의 created 값으로 업데이트
                await GM.setValue("ADD_chathold", created);
            }
        });
    }

    // 체크박스 클릭 시 동작
    function chat_hold_checked(checked){
        if(checked === undefined || typeof checked !== "boolean"){
            return false;
        }

        // 체크한 경우
        if(checked){
            // chat hold 변수를 내 탭의 created 값으로 업데이트
            // 채팅창 없는 경우 채팅창 생성

        }
        // 체크 해제한 경우
        else{
            // chat hold 변수를 읽음
            // chat hold 변수가 내 탭의 created 값과 동일한 경우 undefined 로 업데이트
            //                                      동일하지 않으면 아무 작업 안 함
            // 채팅창 제거
        }
    }

    function chat_hold_DOE(){
        if(!ADD_config.chat_hold){
            $(".chat_hold").remove();
            $(".chat-container_mod").addClass("chat-container").removeClass("chat-container_mod");
            return;
        }

        if($(".chat_hold").length === 0){
            // DOE 생성
        }
    }
    // var chat_container = $(".chat-container");
    // if(chat_container.length !== 0){
    //     chat_hold();
    // }
    // else{
    //     $(document).ready(function(){
    //         chat_hold();
    //     });
    // }

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                                    Migration
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    var mig = await GM.getValue("mig",{"190225_json":false});

    // 190225 - json
    if(!mig["190225_json"]){
        //console.log("migration start - 190225_json", mig["190225_json"]);
        var listValues = await GM.listValues();
        //console.log("listValues", listValues);
        for(var key=0; key<listValues.length; key++){
            var key_str = listValues[key];
            var val = await GM.getValue(key_str);
            if(key_str === undefined || val === undefined){
                continue;
            }

            console.log("old", key, key_str, val);
            val = IsJsonStringReturn(val);

            if(key_str === "ADD_chat_manager_data"){
                for(i in val){
                    if(val[i].modified_date === undefined){
                        val[i].modified_date = Number(new Date());
                    }
                    else if(!$.isNumeric(val[i].modified_date)){
                        val[i].modified_date = Number(new Date(val[i].modified_date.replace(/"/g,"")));
                    }
                }
            }
            if(key_str === "ADD_Blocked_Chat"){
                for(i in val){
                    if(val[i].created === undefined){
                        val[i].created = Number(new Date());
                    }
                    else if(!$.isNumeric(val[i].created)){
                        val[i].created = Number(new Date(val[i].created.replace(/"/g,"")));
                    }
                }
            }
            await GM.setValue(key_str, val);
            //console.log("new", key, key_str, val);
        }
        mig["190225_json"] = true;
        await GM.setValue("mig",mig);
    }

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                               GLOBAL VARIABLES
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    const ADD_CLIENT_ID_TWITCH = "phcxzq5994awjrevkt45p6711bt77s";
    // 설정 클릭 시 enable 요소가 있는 설정을 아래 배열에 등록
    const ADD_config_enable_init = ["ADD_config_top_fix","ADD_config_alarm","ADD_config_thumbnail_mouse","ADD_config_streamer_hide","ADD_config_chat_ctr","ADD_config_chat_image_preview","ADD_config_imgur_preview_safe","ADD_config_remember_platform","ADD_config_chat_block","ADD_config_insagirl_button"];
    const API_INTERVAL_MIN_TIME = 1.0;
    const SEND_LOCATION_EVENT_MIN_TIME = 10.0;
    const ADD_UNIQUE_WINDOW_RELOAD_MAX = 5;
    const ADD_CHAT_IMAGE_ADDITIONAL_LOAD_MAX = 5;

    var first_main_call = false,                  // 첫번째 main 호출인지 체크함
        first_api_call = true,                    // 첫번째 api 호출인지 체크함
        api_push_forced = false,                  // true 이면 twitch api를 강제로 push 함, Setting save 시 사용
        local_api_refresh = true,                 // Setting save 버튼 연속으로 눌렀을 때 막기 위한 용도
        unique_window_check = true,               // Unique window 감지용
        unique_window, unique_window_cookie,      // Unique Window 체크용 변수 생성

        ADD_unique_window = Number(new Date()) + Math.floor(Math.random()*1000000) + 1,
        ADD_unique_window_event_ID,
        ADD_is_unique_window_reload = false,
        ADD_unique_window_reload_counter = 0,

        chatting_arrive_check = null,             // 채팅창 arrive 체크용
        dostream_fix = false,                     // 두스트림 공사중인지 여부 체크
        isGoScrollDown = true;                    // 스크롤 내림 여부 기억
    
    var is_send_location = true;                  // 좌표 보내기 이벤트
    var getTimeStampRes = "";

    var checkedStreamerFromList = [],
        twitch_api_cookie = [],
        ADD_status = [],
        ADD_status_init = {"ad_remove":0,"auto_image":0,"api_call":0,"update":0},
        ADD_now_playing = {id:"", display_name:"", title:""};

    // API로 접근해서 스트리머 이름을 가져올 수도 있으나,
    // API CALL 을 줄이기 위해 원래부터 두스 MAIN에 있던 스트리머 이름을 적어둔다.
    var streamerArray = [["hanryang1125","풍월량","풍온","김영태","영태"],["ddahyoni","따효니","효니"],["kss7749","쉐리","쉐옹"],["looksam","룩삼"],["yapyap30","얍얍"],["saddummy","서새봄냥","서새봄","새봄추","새봄"],["109ace","철면수심","철수형","철쑤","쑤심","진배"],["rhdgurwns","공혁준","공선생","르건즈","혁준이","혁주니","혁준"],["gmdkdsla","흐앙님","흐앙"],["jungtaejune","똘똘똘이","똘3","똘삼","정태준"],["mascahs","마스카"],["steelohs","스틸로"],["kimdoe","김도"],["togom","토곰"],["htk_","흐트크"],["ogn_lol","OGN 롤챔스"],["kanetv8","케인TV","케인"],["yumyumyu77","소풍왔니","소풍이","소풍","작은풍","원유리"],["tjskdutls","서나랑","스나랑"],["sung0","쥬팬더"],["game2eye","홍방장"],["cocopopp671","초승달","승따리","승딸이","승딸","승달"],["dingception","딩셉션"],["redtea","홍차"],["zzamtiger0310","짬타수아","짬타"],["rldnddl789","아빠킹"],["eulcs1","EU LCS"],["kkoma","Kkoma"],["1983kej","단군","김의중","의중"],["lol_peanut","Peanut"],["faker","Faker","faker","페이커","이상혁","상혁","페온"],["nrmtzv","으음"],["nicegametv","나겜"],["teaminven","인벤"],["capta1n_pony","포니"],["huni","Huni"],["sktt1_wolf","Wolf"],["bang","Bang"],["wpghd321","류제홍"],["jmjdoc","칸데르니아","칸데","두방"],["yungi131","윤기"],["mediamuse","미디어뮤즈","미뮤"],["veritaskk","Veritas","베리타스","싸세"],["themarinekr","김정민"],["tvindra","인드라"],["tranth","자동"],["seine1026","세인님"],["sonycast_","소니쇼","소니쿤"],["dou3796","뱅붕"],["rudbeckia7","연두는말안드뤄","연두"],["trisha","트리샤"],["naseongkim","김나성","나성"],["dlxowns45","태준이"],["handongsuk","한동숙","동수칸","동숙"],["alenenwooptv","웁_게임방송"],["mr_coat","노래하는코트"],["ajehr","머독"],["lol_crown","Crown"],["rooftopcat99","옥냥이"],["myzet1990","개구멍"],["yoonroot","윤루트"],["sn400ja","액시스마이콜","마이콜"],["tape22222","테이프2"],["miracle0o0","미라클티비"],["bighead033","빅헤드"],["wkgml","견자희"],["queenhuz","후즈"],["kiyulking","김기열"],["asdn6388","나락호프"],["lol_cuvee","Cuvee"],["VSL","VSL"],["drlee_kor","이민우33세"],["CoreJJ","CoreJJ"],["lol_ambition","앰비션","엠비션","강찬밥","강찬용"],["Axenix","아제닉스"],["maknoonlol","막눈"],["zilioner","침착맨","이말년"],["timeofcreate","홍랑"],["twitchshow","트위치쇼"],["kangqui","강퀴"],["team_spiritzero","Team Spiritzero"],["zizionmy","젼마이"],["lol_blank","Blank"],["ogn_ow","OGN 오버워치"],["juankorea","주안코리아"],["woowakgood","우왁굳"],["www0606","푸딩"],["runner0608","러너"],["flowervin","꽃빈"],["h920103","이초홍","초홍"],["hj0514","백설양"],["pbstream77","피비스트림"],["llilka","릴카"],["beyou0728","피유","끠유"],["serayang","세라양"],["mister903","갱생레바","레바"],["what9honggildong","왓구홍길동"],["chicken_angel","통닭천사"],["godbokihs","갓보기"],["yuriseo","서유리"],["kimminyoung","아옳이","김민영"],["gabrielcro","가브리엘","가비"],["starcraft_kr","스타크래프트 KR"],["yeziss","신예지"],["ch1ckenkun","치킨쿤","보해"],["lds7131","더헬"],["nodolly","노돌리"],["haku861024","정직원"],["nanajam777","우정잉","정잉"],["leehunnyeo","별루다"],["streamer2u","이유님"],["hatsalsal","햇살살"],["pommel0303","폼멜"],["hosu0904","호수"],["surrenderhs","서렌더"],["eukkzzang","윾짱"],["gageu","가그"],["ange_i","요뿌니"],["menpa1030","멘파"],["dua3362","서넹"],["dda_ju","다주"],["taesangyun","태상"],["oreo4679","리치1"],["dmdtkadl69","응삼이"],["sigwon","시권"],["rngudwnswkd","푸린"],["jungjil","정질"],["ses836","인간젤리"],["DrAquinas","DrAquinas"],["tree2512","말퓨"],["frog135","게구리"],["leechunhyang","이춘향"],["cherrypach","꽃핀"],["lovelyyeon","연두부"],["yd0821","양띵"],["2chamcham2","탬탬버린","탬탬"],["jinu6734","김진우"],["ddolking555","똘킹"],["erenjjing","에렌디라"],["suk_tv","석티비"],["h0720","군림보"],["rellacast","렐라"],["silphtv","실프"],["playhearthstonekr","playhearthstonekr"],["mirage720","미라지오빠"],["1am_shin","신기해"],["maruemon1019","마루에몽"],["ulsanbigwhale","울산큰고래"],["areuming","알밍"],["esther950","에쓰더"],["pacific8815","쌍베","전상빈"],["dogswellfish","개복어"],["yeonchobom","연초봄"],["ssambahong","홍진영"],["Twipkr","트윕KR"],["reniehour","레니아워"],["caroline9071","숑아"],["ssambahong","쌈바홍","홍진영"],["Funzinnu","Funzinnu"],["loveseti","미모"],["kimgaeune","김총무님"],["1uming","루밍이","루밍"],["invenk01","김영일","K01","김01"],["sal_gu","살인마협회장","살협"],["flurry1989","플러리","로겨","조현수","겨러리"],["holsbro","홀스형","홀스"],["hn950421","고말숙","말숙"],["jaeheeng2","햄재희","재희"],["hwkang2","캡틴잭","캡잭","캡짹"],["yunlovejoy","도여사"],["yatoring","야토링"],["lolluk4","루ㅋ4"],["rkdthdus930","강소연","타노스","탑분쇄기","수장님"],["seogui","서긔"],["pikra10","재슥짱"],["playoverwatch_kr","오버워치 이스포츠"],["maxim_korea_official","남자매거진맥심"],["hanururu","하느르"],["obm1025","오킹"],["acro_land","아크로"],["choerakjo","최락조"],["megthomatho","맥또마또"],["s1032204","삐부"],["rkdwl12","강지"],["jaewon4915","김재원"],["zennyrtlove","신재은"],["2sjshsk","유누"],["queenmico","미코"],["lsd818","득털"],["wlswnwlswn","진주몬"],["apzks1236","학살"],["sunbaking","선바"],["rockid1818","모모88"],["moogrr1211","무굴"],["twitchkr","TwitchKR"],["tlfjaos","시러맨"],["dawnhs","DawN"],["mata","마타타마","마타"],["lol_khan","Khan"],["buzzbean11","대도서관","대도"],["mhj1682","카트문호준","문호준"],["remguri","렘쨩"],["heavyrainism","호무새"],["lck_korea","LCK Korea"],["lol_madlife","매드라이프","매라"],["lol_helios","헬리오스"],["pparkshy","샤이"],["pubgkorea","PUBGKorea"],["riotgames","Riot Games"],["lisalove","리즈리사"],["mbcmlt","엠비씨마리텔"],["mbcmlt1","엠비씨마리텔1"],["mbcmlt2","엠비씨마리텔2"],["mbcmlt3","엠비씨마리텔3"],["mbcmlt4","엠비씨마리텔4"],["mbcmlt5","엠비씨마리텔5"],["mbcmlt6","엠비씨마리텔6"],["mbcmlt7","엠비씨마리텔7"],["mbcmlt8","엠비씨마리텔8"],["mbcmlt9","엠비씨마리텔9"],["insec13","인섹"],["realkidcozyboy","키드밀리"],["sbsmobile24","배거슨라이브","배거슨","배성재"],["ok_ja","박옥자누나","박옥자","옥자"],["boxer_lim","임요환"],["kimukihun","기무기훈"],["needsonyun","사신갓","사신"],["dardarae","달다래오","차짬좌"],["taezzang","태은짱","태은쨩","태은"],["jammi95","잼미님","잼미"],["coppag2","꿀혜"],["overwatchleague_kr","오버워치리그"],["fastloves","홍진호"],["jinsooo0","진수0","진수"],["wltn4765","지수소녀"],["gamesdonequick","GamesDoneQuick"],["dragon3652","스피드소닉"],["parkjand","박잔디"],["jinnytty","윰찌니"],["danpaeng2","단팽이"],["inas1220","야생의딸기"],["limlim72","진자림"],["bongsoon0115","봉순"],["eodyd188","밴쯔","벤쯔"],["duedrop","권이슬","이슬이","이스리","권자봉"],["so_urf","소우릎"],["lo10002","혜요"],["GhostGC","고스트","수광","수팡"],["mari0712","마리"]];
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

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                            UserScript Value Set
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    // function deepCopy(obj){
    //     //return Object.assign({}, obj);
    //     //jQuery.extend({}, obj);
    //     return JSON.parse(JSON.stringify(obj));
    // }

    async function ADD_SetVal(key, value){
        await GM.setValue(key, value);//JSON.stringify(value));
    }

    async function ADD_GetVal(key, init){
        return await GM.getValue(key, init);
    }

    if(typeof GM.registerMenuCommand === "function"){
        GM.registerMenuCommand("상세 설정 열기", function(){
            var ww = $(window).width(),
                wh = $(window).height();
            var wn = (ww > 850 ? 850 : ww/5*4);
            var left  = (ww/2)-(wn/2),
                top = (wh/2)-(wh/5*4/2);
            window.open("http://www.dostream.com/addostream/","winname",
                "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width="+wn+",height="+wh/5*4+",top="+top+",left="+left);
        });
        // GM.registerMenuCommand("버그 제보", function(){
        //     window.open("https://github.com/nomomo/Addostream/issues", "_blank");
        // });
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 현재 화면이 어디인지를 체크함

    function urlCheck(){
        var document_url = location.href;
        document_url = document_url.toLowerCase();
        var keyword_stream = document_url.indexOf("#/stream/");
        var keyword_uchat = document_url.indexOf("uchat2.php");
        var keyword_setting = document_url.indexOf("#/addostream");
        var keyword_setting_nw = document_url.indexOf("dostream.com/addostream");
        if(keyword_uchat !== -1){
            return C_UCHAT;
        }
        else if(keyword_stream !== -1){
            return C_STREAM;
        }
        else if(keyword_setting !== -1){
            return C_SETTING;
        }
        else if(keyword_setting_nw !== -1){
            return C_SETTING_NW;
        }
        else{
            return C_MAIN;
        }
    }

    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    function IsJsonStringReturn(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return str;
        }
        return JSON.parse(str);
    }

    var GM_setting = (function($, global, document){
        // local vars
        var $g_elem;
        var name_ = "";
        var changed_key = [];
        const settings_full = {
            last_version : { disable:true, category:"dev", depth:1, type: "set", value: Number(ADD_version_string(GM.info.script.version)), title:"마지막 버전", desc:"" },
            version_check : { category:"general", category_name:"일반", depth:1, type: "checkbox", value:true, title:"새 버전 체크", desc:"새로운 애드온 버전이 있는지 자체적으로 체크함"},
            version_check_interval : { under_dev:true, category:"general", depth:2, type: "text", value:12, valid:"number", min_value:1, title:"새 버전 체크 주기", desc:"새 버전을 체크할 시간 간격<br />시간 단위로 입력, 최소 1시간(기본값: 12)"},
            history : { category:"general", depth:1, type: "checkbox", value: false, title:"나의 시청 기록 보기", desc:"두스트림 상단에 나의 시청 기록을 표시함", change:function(){ADD_Channel_History_Run();} },
            history_hide_icon : { category:"general", depth:2, type: "checkbox", value: false, title:"플랫폼 아이콘 숨기기", desc:"시청 기록에서 플랫폼 아이콘을 숨김", change:function(){ADD_Channel_History_Run();} },
            max_history : { under_dev:true, category:"general", depth:2, type: "text", value: 20, valid:"number", min_value:1, title:"시청 기록 최대 개수", desc:"(기본값: 20)" },
            
            insagirl_button : { category:"general", depth:1, type: "checkbox", value: false, title:"빠른 좌표 보기 활성", desc:"좌표 페이지를 두스트림 내부에서 불러오는 기능을 활성", change:function(){hrm_DOE();} },
            insagirl_block_by_nick : { category:"general", depth:2, type: "checkbox", value: false, title:"차단한 유저의 좌표 숨기기", desc:"채팅매니저에서 차단한 유저의 좌표를 숨김" },
            insagirl_block_dobae : { category:"general", depth:2, type: "checkbox", value: false, title:"연속된 동일 좌표 숨기기", desc:"동일 유저가 같은 좌표를 연속하여 올릴 경우<br />가장 최근의 것만 남기고 숨김" },
            insagirl_block_dobae_by_href : { category:"general", depth:3, type: "checkbox", value: false, title:"동일 유저가 아닐 경우에도 숨김", desc:"유저에 상관 없이 동일 좌표가 연속되는 경우 무조건 숨김" },
            insagirl_select : { under_dev:true, category:"general", depth:3, type: "radio", value: 1, title:"좌표 사이트 선택", desc:"", radio: {dostream: {title: "<span style='font-size:11px;'>coord.dostream.com</span>", value:1}, insagirl: {title: "<span style='font-size:11px;'>insagirl-hrm.appspot.com</span>", value:2}} },
            
            theme_leftchat : { under_dev:true, category:"general", depth:1, type: "checkbox", value: false, title:"채팅창 위치를 왼쪽으로 변경", desc:"", change:function(){ADD_customStyle();} },

            list : { category:"list", category_name:"리스트", depth:1, type: "checkbox", value:true, title:"메인 리스트 관리 기능 사용", desc:"메인 리스트 관리 기능을 일괄적으로 켜고 끈다."},
            main_list_two_column : { under_dev:true, category:"list", depth:2, type: "checkbox", value:false, title:"[실험실] 메인 리스트를 두 줄로 표시", desc:"- 모니터 가로 해상도 1920 이상에 권장<br />- 섬네일 기능 사용 시 중간 설정이 적당함", change:function(){reloadMain();}},
            main_list_cache : { under_dev:true, category:"list", depth:2, type: "checkbox", value:true, title:"메인 리스트 캐쉬", desc:"빠른 메인 로딩을 위해 메인 리스트를 캐쉬함"},
            main_list_cache_time : { under_dev:true, category:"list", depth:3, type: "text", value: 3, valid:"number", min_value:1, title:"캐쉬 간격", desc:"분 단위로 입력, 최소 1분(기본값: 3)" },
            button_set : { under_dev:true, category:"list", depth:2, type: "checkbox", value:true, title:"버튼 모음 생성", desc:"- 트위치, 카카오, 유투브, 멀티트위치 버튼 모음을 생성<br />- 리스트에 멀티트위치 선택을 위한 체크박스를 생성"},
            button_chatmode : { under_dev:true, category:"list", depth:2, type: "checkbox", value:true, title:"채팅 모드 버튼 생성", desc:"리스트의 각 항목에 채팅 모드 버튼을 생성"},
            show_display_name : { under_dev:true, category:"list", depth:2, type: "checkbox", value:true, title:"스트리머 이름 보이기", desc:"표시 가능한 스트리머의 이름 및 아이디를 표시"},
            top_fix : { category:"list", depth:2, type: "checkbox", value: false, title:"특정 스트리머 상단 고정", desc:"두스 메인 리스트의 최상단에 원하는 스트리머를 고정"},
            top_fix_ID : { category:"list", depth:3, type: "tag", value: ["hanryang1125"], valid:"array_string", title:"등록할 스트리머 ID", desc:"스트리머 ID를 콤마(,)로 구분하여 입력<br />영문, 숫자, 언더바(_) 만 입력 가능"},
            top_off_fix : { category:"list", depth:3, type: "checkbox", value: false, title:"오프라인 시에도 고정", desc:""},
            alarm : { category:"list", depth:2, type: "checkbox", value: false, title:"메인에 스트리머 추가", desc:"기본 두스 메인 리스트에 없는 Twitch 스트리머를<br />메인 리스트에 추가 (Twitch API 사용)" },
            top_alarm_ID : { category:"list", depth:3, type: "tag", value: ["hanryang1125"], valid:"array_string", title:"등록할 스트리머 ID", desc:"스트리머 ID를 콤마(,)로 구분하여 입력<br />영문, 숫자, 언더바(_) 만 입력 가능" },
            alarm_gap : { category:"list", depth:3, type: "text", value: 5, valid:"number", min_value:1, title:"조회 간격", desc:"분 단위로 입력, 최소 1분(기본값: 5)" },
            alarm_noti : { category:"list", depth:3, type: "checkbox", value: false, title:"온라인 시 알림(수정 중)", desc:"위 목록에 등록된 스트리머가 온라인이 될 때<br />데스크톱 메시지로 알림" },
            alarm_main_reload : { under_dev:true, category:"list", depth:3, type: "checkbox", value: true, title:"스트림 정보 갱신 시 리스트 새로고침", desc:"두스트림 메인 화면인 경우<br />스트림 정보 갱신 시 두스 메인 리스트를<br />자동으로 새로고침 함" },
            alarm_show_game_name : { under_dev:true, category:"list", depth:3, type: "checkbox", value: false, title:"[실험실] 게임 이름 표시", desc:"게임 이름을 표시할 수 있는 경우 리스트에 표시" },
            alarm_sort_by_viewer : { under_dev:true, category:"list", depth:3, type: "checkbox", value: false, title:"[실험실] 시청자 수로 정렬", desc:"입력한 순서로 정렬하는 대신<br />시청자 수가 많은 스트리머가 위로 오도록 정렬" },
            thumbnail_mouse : { category:"list", depth:2, type: "checkbox", value: false, title:"섬네일에 마우스 올렸을 시 확대", desc:"두스 메인 리스트의 섬네일에 마우스를 올렸을 때 확대한 팝업을 띄움" },
            thumbnail_size : { category:"list", depth:3, type: "radio", value: 1, title:"섬네일 사이즈", desc:"", radio: {small: {title: "작음", value:1}, medium: {title: "보통", value:2}, large:{title: "큼", value:3} } },
            thumbnail_refresh : { under_dev:true, category:"list", depth:2, type: "checkbox", value: true, title:"리스트 섬네일 자동 갱신", desc:"- 리스트 섬네일을 자동으로 갱신<br />- 체크 해제 시 새로고침 이전까지 초기 접속 시 섬네일 유지됨" },
            thumbnail_refresh_gap : { under_dev:true, category:"list", depth:3, type: "text", value: 5, valid:"number", min_value:1, title:"갱신 간격", desc:"분 단위로 입력, 최소 1분(기본값: 5)" },
            streamer_hide : { category:"list", depth:2, type: "checkbox", value: false, title:" 특정 스트리머 숨기기", desc:"기본 두스트림에 메인에 노출하고 싶지 않은<br />Twitch 스트리머를 메인 리스트에서 제거" },                 // 메인에 스트리머 숨기기 사용 여부
            streamer_hide_ID : { category:"list", depth:3, type: "tag", value: ["nalcs1", "nalcs2"], valid:"array_string", title:"등록할 스트리머 ID", desc:"스트리머 ID를 콤마(,)로 구분하여 입력<br />영문, 숫자, 언더바(_) 만 입력 가능" },
            remember_platform : { category:"list", depth:2, type: "checkbox", value: false, title:"특정 플랫폼 숨기기", desc:"기본 두스트림에 메인에 노출하고 싶지 않은<br />플랫폼에 해당되는 항목을 메인 리스트에서 제거" },
            remember_twitch : { category:"list", depth:3, type: "checkbox", value: false, title:"트위치 숨기기", desc:"" },
            remember_kakao : { category:"list", depth:3, type: "checkbox", value: false, title:"카카오 숨기기", desc:"" },
            remember_youtube : { category:"list", depth:3, type: "checkbox", value: false, title:"유투브 숨기기", desc:"" },
            list_sort_by_viewer : { under_dev:true, category:"list", depth:2, type: "checkbox", value: false, title:"[실험실] 무조건 시청자 수로 정렬", desc:"- 무조건 시청자 수가 많은 항목이 위로 오도록 정렬<br />- 리스트 순서와 관련된 다른 모든 설정을 무시" },

            playing_quick_list_button : { category:"playing", category_name:"재생 중", depth:1, type: "checkbox", value: true, title:"퀵 리스트 버튼 표시", desc:"재생 중 팝업으로 메인 리스트를 볼 수 있도록<br />퀵 리스트 버튼을 표시", change:function(){$(window).trigger("hashchange");} },
            playing_chat_button : { category:"playing", depth:1, type: "checkbox", value: true, title:"트위치↔멀티트위치 전환 버튼 표시", desc:"트위치 또는 멀티트위치 재생 시<br />서로 전환할 수 있는 버튼을 표시", change:function(){$(window).trigger("hashchange");} },
            playing_twip_button : { under_dev:true, category:"playing", depth:1, type: "checkbox", value: false, title:"Twip 버튼 표시", desc:"트위치 재생 시 Twip donate 버튼을 표시<br />donate 창은 새 창으로 열림", change:function(){$(window).trigger("hashchange");} },
            playing_setting_button : { category:"playing", depth:1, type: "checkbox", value: true, title:"설정 버튼 표시", desc:"재생 중 설정 버튼을 표시.<br />체크 해제 시 설정 버튼은 메인에서만 노출됨", change:function(){$(window).trigger("hashchange");} },

            chat_ctr : { category:"chat", category_name:"채팅", depth:1, type: "checkbox", value: false, title:"채팅 제어", desc:"- 채팅 관련 기능을 일괄적으로 켜고 끔<br />- 채팅 관련 기능은 새로고침 해야 적용됨" },
            chat_memo : { category:"chat", depth:2, type: "checkbox", value: true, title:"채팅매니저 기능 사용 (메모 기능)", desc:"- 채팅 닉네임 클릭 시 메모하기 버튼 표시<br />- 닉네임별 메모 작성/차단 가능<br />- 작성한 메모는 채팅창의 닉네임 뒤에 표시됨<br />- 차단 기능은 기존 두스 차단 기능과 별개로<br />　작동하므로, 차단목록이 날아가더라도 보존됨", append:"<span class='show_memo_log btn btn-primary'>채팅매니저 관리</span>" },
            chat_adb : { disable:true, category:"chat", depth:2, type: "checkbox", value: false, title:"광고 제거", desc:"" },
            hide_nick_change : { disable:true, category:"", depth:2, type: "checkbox", value: false, title:"닉네임 변경 메시지 숨기기", desc:"" },
            sys_meg : { category:"chat", depth:2, type: "checkbox", value: true, title:"작동 상태 알림", desc:"애드온의 작동 상태를 채팅창에 메시지로 알림" },
            url_self : { category:"chat", depth:2, type: "checkbox", value: true, title:"두스트림 좌표의 경우 현재 창에서 열기", desc:"두스 좌표가 새 창으로 열리는 것을 막음" },
            chat_scroll : { category:"chat", depth:2, type: "checkbox", value: true, title:"자동스크롤 변경", desc:"- 채팅창의 자동스크롤이 끊기는 것을 방지하기 위해<br />　자동스크롤의 동작 방식을 변경<br /><br /><strong>동작 원칙:</strong><br />- 마우스 휠을 위로 굴리면 자동스크롤 멈춤<br />- 더 보기 버튼을 누르거나 맨 아래로 휠 하여<br />　자동스크롤을 재시작할 수 있음<br />- 그 이외의 모든 스크롤 관련 동작은 무시됨" },
            chat_scroll_down_min : { under_dev:true, category:"chat", depth:3, type: "text", value: 30, valid:"number", min_value:0, title:"자동 스크롤 재시작 거리(px)", desc:"스크롤이 정지 상태일 때 스크롤 내림 시<br />최하단과의 거리가 설정 값 이하가 되면<br />자동스크롤을 재시작(기본값:30)" },
            send_location_button : { category:"chat", depth:2, type: "checkbox", value: true, title:"좌표 보내기 버튼 활성", desc:"클릭 시 현재 주소를 채팅창 입력란에 바로 복사", change:function(){ADD_send_location_DOE();} },
            send_location_button_top : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"좌표 버튼을 채팅창 상단에 고정", desc:"체크 해제 시 채팅창 하단에 고정됨", change:function(){ADD_send_location_DOE();} },
            send_location_existing : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"기존에 입력해둔 채팅 내용 유지", desc:"좌표 보내기 버튼을 눌렀을 때, 채팅 입력란의 내용을 유지하고 좌표 링크를 뒤에 덧붙임" },
            send_location_immediately : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"[실험실] 좌표 바로 전송", desc:"- 좌표 버튼을 누르면 좌표를 채팅 입력란에<br />　복사하는 것을 건너뛰고 채팅창에 바로 전송<br />- 재사용 대기시간: 10초" },
            chat_image_preview : { category:"chat", depth:2, type: "checkbox", value: false, title:"이미지 미리보기", desc:"이미지 주소 형태의 링크가 채팅창에 등록되면 바로 보여줌" },
            imgur_preview_safe : { category:"chat", depth:3, type: "checkbox", value: true, title:"후방주의 기능 활성", desc:"이미지를 어둡게 가려진 상태로 보여줌<br />버튼을 클릭해야 이미지 보기 가능" },
            imgur_preview_opacity : { category:"chat", depth:4, type: "text", value: 0.93, valid:"number", min_value:0, max_value:1, title:"박스 투명도", desc:"0:투명, 1:불투명, 기본값:0.93" },
            nudity_block : { disable:true, category:"chat", depth:4, type: "checkbox", value: false, title:"피부톤 이미지에만 후방주의 기능 활성", desc:"피부톤 이미지인 경우에만 후방주의 기능을 활성<br />너굴맨이 이미지를 먼저 확인한 후 피부색이 없어야 출력하므로 이미지가 조금 늦게 뜰 수 있다.<br />추가 이미지 로드 시에는 적용되지 않는다." },
            chat_image_youtube_thumb : { category:"chat", depth:3, type: "checkbox", value: false, title:"유투브 섬네일 미리보기", desc:"" },
            chat_image_youtube_thumb_nonsafe : { under_dev:true, category:"chat", depth:4, type: "checkbox", value: false, title:"[실험실] 유투브 섬네일에 대해 후방 주의 기능 사용하지 않음", desc:"" },
            chat_image_twitch_thumb : { category:"chat", depth:3, type: "checkbox", value: false, title:"트위치 클립 섬네일 미리보기", desc:"" },
            chat_image_twitch_thumb_nonsafe : { under_dev:true, category:"chat", depth:4, type: "checkbox", value: false, title:"[실험실] 트위치 클립 섬네일에 대해 후방 주의 기능 사용하지 않음", desc:"" },
            imgur_preview : { category:"chat", depth:3, type: "checkbox", value: false, title:"Imgur 이미지 미리보기", desc:"Imgur 주소 형태의 링크가 채팅창에 등록되면 바로 보여줌<br />(Imgur API 사용)" },
            imgur_preview_gif_as_mp4 : { under_dev:true, category:"chat", depth:4, type: "checkbox", value: true, title:"gif 를 동영상 형태로 불러옴", desc:"gif 파일 대신 mp4 파일이 사용 가능한 경우 더 빠른 로딩을 위해 동영상 형태로 불러옴" },
            gfycat_preview : { category:"chat", depth:3, type: "checkbox", value: false, title:"Gfycat 동영상 미리보기", desc:"Gfycat 주소 형태의 링크가 채팅창에 등록되면 바로 보여줌<br />(Gfycat API 사용, 테스트 중)" },
            chat_video_autoplay : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: true, title:"동영상 자동 재생", desc:"Imgur, Gfycat 등에서 동영상을 불러오는 경우 음소거 된 상태로 자동 재생함" },
            chat_image_mouseover_prevent : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: true, title:"이미지 링크 주소에 마우스 올려도 팝업 띄우지 않음", desc:"이미지 미리보기 기능을 사용하는 경우, 이미지 링크 주소에 마우스 커서를 올렸을 때 작은 미리보기 팝업을 띄우는 것을 막음" },
            chat_image_max_width : { under_dev:true, category:"chat", depth:3, type: "text", value: 325, valid:"number", min_value:1, title:"이미지 최대 너비(width, px)", desc:"이미지 가로(width) 최대 길이(기본값:325)" },
            chat_image_max_height : { under_dev:true, category:"chat", depth:3, type: "text", value: 1000, valid:"number", min_value:1, title:"이미지 최대 높이(height, px)", desc:"이미지 세로(height) 최대 길이(기본값:1000)" },
            chat_nick_colorize : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: false, title:"[실험실] 닉네임 색상화", desc:"채팅 닉네임에 임의의 색상을 적용" },
            chat_url_decode : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: true, title:"한글 URL을 구분 가능하도록 변경", desc:"채팅 내에서 유니코드 형태의 URL 링크 감지 시,<br />내용을 알아볼 수 있도록 표시<br />예) <a href='https://namu.wiki/w/%ED%92%8D%EC%9B%94%EB%9F%89' target='_blank'>https://namu.wiki/w/%ED%92%8D%EC%9B%94%EB%9F%89</a> → <a href='https://namu.wiki/w/%ED%92%8D%EC%9B%94%EB%9F%89' target='_blank'>https://namu.wiki/w/풍월량</a>" },
            chat_unicode_err_replace : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: true, title:"� 문자를 공백으로 변경", desc:"텍스트 인코딩 문제 발생 시 표시되는 � 문자를 공백으로 대체" },
            chat_block : { category:"chat", depth:2, type: "checkbox", value: false, title:"금지단어 기반 채팅 차단", desc:"채팅 내용 또는 닉네임에 금지단어 리스트에 추가한 단어가 포함되어 있는 경우 해당 채팅을 차단함" },
            chat_block_tag : { category:"chat", depth:3, type: "tag", valid:"array_word", value: ["네다통","통구이","민주화","ㅁㅈㅎ","느금마","니애미","니어미","니엄마","니애비","느그애비","느그애미","애미터","애미뒤","앰뒤","앰창"], title:"금지단어 리스트", desc:"콤마로 구분" },
            chat_block_noti : { category:"chat", depth:3, type: "checkbox", value: false, title:"차단 후 &lt;message deleted&gt; 로 표시", desc:"- 차단 후 기존 채팅 내용을 &lt;message deleted&gt; 로 대체<br />- 마우스를 올리면 툴팁으로 내용을 볼 수 있음" },
            chat_block_nickname : { category:"chat", depth:3, type: "checkbox", value: false, title:"검색대상: 닉네임", desc:"채팅 닉네임에 금지단어가 있으면 차단" },
            chat_block_contents : { category:"chat", depth:3, type: "checkbox", value: false, title:"검색대상: 내용", desc:"- 채팅 내용에 금지단어가 있으면 차단<br />- 닉네임을 바꿔가며 유사 내용을 도배하는 환경에서 유용" },
            chat_block_record : { category:"chat", depth:2, type: "checkbox", value: true, title:"채팅 차단 로그 기록", desc:"금지단어 및 채팅매니저에 의해 차단된 채팅 로그를 기록함", append:"<span class='show_blocked_chat btn btn-primary'>채팅 로그 보기</span><span class='reset_blocked_chat btn btn-primary'>채팅 로그 초기화</span>"},
            chat_block_log_letter_limit : { under_dev:true, category:"chat", depth:3, type: "text", value: 40, valid:"number", min_value:0, max_value:100000, title:"채팅 내용을 잘라서 기록", desc:"채팅 로그 기록 시 설정된 글자 수 만큼 채팅 내용을 잘라서 기록함(기본값 40)" },
            chat_block_log_limit : { under_dev:true, category:"chat", depth:3, type: "text", value: 100, valid:"number", min_value:0, max_value:100000, title:"차단된 채팅 로그 최대 개수", desc:"- 채팅매니저 차단, 금지단어 차단에 의해 기록된 채팅 로그의 최대 개수를 설정<br />- 이 값을 크게 설정할 시 리소스를 많이 차지할 수 있으며, 알 수 없는 에러가 발생할 수 있음<br />(기본값 100)" },
            
            chat_dobae_block : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: false, title:"[실험실] 도배 채팅 숨기기", desc:"동일 유저가 지정된 시간 내 유사한 문장을<br />지정된 횟수 이상 반복하여 입력하는 경우<br />도배로 판단하고 내용을 숨김" },
            chat_dobae_judge : { under_dev:true, category:"chat", depth:3, type: "text", value: 0.8, valid:"number", min_value:0.1, max_value:1, title:"문장 유사도", desc:"도배로 판단할 문장 유사도 설정<br />1 : 문장이 완전 일치하는 경우에만 차단<br />0 에 가까울 수록 불일치하는 경우에도 차단<br />(기본값:0.8)" },
            chat_dobae_timelimit : { under_dev:true, category:"chat", depth:3, type: "text", value: 8, valid:"number", min_value:0, max_value:120, title:"판단 시간 (초)", desc:"지정된 시간 이전에 올라온 채팅에 대해서는<br />도배 여부를 판단하지 않음. 기본값:8초" },
            chat_dobae_repeat : { under_dev:true, category:"chat", depth:3, type: "text", value: 4, valid:"number", min_value:2, max_value:10, title:"반복 입력 수 (회)", desc:"지정된 반복 입력 수 이상 올라온 채팅부터 숨김.<br />기본값:4회" },
            chat_dobae_onlylink : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"링크 포함 시에만 도배 판단", desc:"채팅 내용에 링크가 포함된 경우에만 도배 여부를 판단" },
            chat_dobae_block_record : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"채팅 차단 로그에 기록", desc:"도배로 판단된 채팅을 채팅 차단 로그에 기록" },
            chat_dobae_block_autoban : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"도배 유저를 채팅매니저로 자동 차단", desc:"<span style='color:red;'>주의!! 설정 값에 따라 무차별 차단이 발생할 수 있으니 사용에 유의하십시오.<br />예) ㅋㅋㅋ를 반복 입력하는 유저도 차단됨.<br />링크 포함 시에만 도배 판단 기능을 활성화하고 사용할 것을 권장합니다.</span><br />작동 상태 알림 기능이 켜진 경우<br />차단 여부를 채팅창에 시스템 메시지로 알림" },
            
            chat_auto_reload : { disable:true, category:"chat", depth:2, type: "checkbox", value: false, title:"채팅 중지 시 자동 새로고침 설정", desc:"채팅이 중지된 경우,<br />채팅창 상단의 Auto Reload가 설정된 창에서<br />채팅을 자동으로 새로고침 함 (10초 내 최대 5회)" },
            chat_autoKeyword : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: false, title:"[실험실] 스트리머 닉네임을 링크로 변환", desc:"스트리머 닉네임 감지 시 자동으로 링크로 변환함" },

            broadcaster_mode : { under_dev:true, category:"broadcast", category_name:"방송 모드", depth:1, type: "checkbox", value: false, title:"[실험실] 방송 모드", desc:"채팅창을 방송에 적합한 모드로 변경<br />Xsplit 등에서 스크린 캡쳐 후, 크로마키(기본값 blue)를 이용하여 배경색을 제거할 수 있습니다.", change:function(){if(GM_page === C_UCHAT){broadcaster_theme_css();}}},
            broadcaster_font_size : { under_dev:true, category:"broadcast", depth:2, type: "text", value: 1.0, valid:"number", min_value:0.1, max_value:10, title:"글씨 크기 조절(배수)", desc:"", change:function(){if(GM_page === C_UCHAT){broadcaster_theme_css();}} },
            broadcaster_bg_color : { under_dev:true, category:"broadcast", depth:2, type: "text", value: "blue", title:"배경 색상", desc:"예) blue, white, #fff, rgb(255, 255, 255)", change:function(){if(GM_page === C_UCHAT){broadcaster_theme_css();}} },
            broadcaster_nick_hide : { under_dev:true, category:"broadcast", depth:2, type: "checkbox", value:false, title:"닉네임의 일부를 숨김", desc:"예) 닉네임을 abcd**** 형태로 표시함" },
            broadcater_theme : { under_dev:true, category:"broadcast", depth:2, type: "radio", value: "box", title:"테마", desc:"", radio: {box: {title: "Box", value:"box"}, twitch: {title: "Twitch", value:"twitch"}, simple: {title: "Simple", value:"simple"} }, change:function(){if(GM_page === C_UCHAT){broadcaster_theme_css();}}},

            under_dev : { category:"advanced", category_name:"고급", depth:1, type: "checkbox", value: false, title:"실험실 기능 및 고급 기능 설정", desc:"실험 중인 기능 및 고급 기능을 직접 설정" },
            theme : { under_dev:true, category:"advanced", depth:2, type: "radio", value: "box", title:"[실험실] 테마", desc:"", radio: {default: {title: "기본", value:"default"}, black: {title: "어두운 테마", value:"black"} }, change:function(){ADD_theme();}},
            twitch_interacite : { disable:true, category:"advanced", depth:1, type: "checkbox", value: false, title:"반응형 트위치 사용", desc:"" },
            twitch_interacite_unmute : { disable:true, category:"advanced", depth:2, type: "checkbox", value: true, title:"시작 시 음소거 하지 않음", desc:"" },
            popup_player : { under_dev:true, category:"advanced", depth:1, type: "checkbox", value: false, title:"[실험실] 시청 중 이동 시 팝업 플레이어 사용", desc:"" },
            chat_sword : { disable:true, category:"advanced", depth:1, type: "checkbox", value: false, title:"관리자 진은검 아이콘 달기", desc:"" }
        };
        var settings_init = {};
        var settings = {};
        var $inputs = {};

        /////////////////////////////////////////////////
        // private functions
        var init_ = async function(){
            //ADD_DEBUG("init_");
            for(var key in settings_full){
                settings_init[key] = settings_full[key].value;
            }

            await load_();
            if(!hasSameKey_(settings_init, settings)){
                // 추가
                for(key in settings_init){
                    if(settings[key] === undefined){
                        settings[key] = settings_init[key];
                    }
                }
                // 삭제
                for(key in settings){
                    if(settings_init[key] === undefined){
                        delete settings[key];
                    }
                }
                await save_();
            }
        };
        var save_ = async function(){
            //ADD_DEBUG("save_");
            if(name_ !== ""){
                await GM.setValue(name_, settings);
            }
            global[name_] = settings;
            
            // changed_key: 배열,       인덱스번호, 값(키)
            $.each(changed_key, function(eindex, evalue){
                if(settings_full[evalue].change !== undefined){
                    settings_full[evalue].change(settings[evalue]);
                }
            });
            changed_key = [];
        };
        var load_ = async function(){
            ADD_DEBUG("load_");
            if(name_ !== ""){
                settings = await GM.getValue(name_, settings);
            }
            global[name_] = settings;
        };
        var event_ = async function(){
            if(typeof GM.addValueChangeListener === "function"){
                ADD_DEBUG("설정에 대한 addValueChangeListener 바인드");
                GM.addValueChangeListener(name_, async function(val_name, old_value, new_value, remote) {
                    if(remote){
                        ADD_DEBUG("다른 창에서 설정 변경됨. val_name, old_value, new_value:", val_name, old_value, new_value);
                        await load_();
                        // old_value: obj,       ekey:키, evalue:값(old 설정값)
                        $.each(old_value, function(ekey, evalue){
                            if(settings_full[ekey].change !== undefined && old_value[ekey] !== new_value[ekey]){
                                settings_full[ekey].change(settings[ekey]);
                            }
                        });
                        changed_key = [];
                        // 설정 변경 시 바뀌는 이벤트들
                    }
                });
            }

            $(document).on("input", "input[gm_setting_key='under_dev']", function(){
                ADD_DEBUG("실험실 기능 온오프 이벤트");
                var $this = $(this);
                if($this.is(":checked")){
                    $(".GM_setting_under_dev").css("opacity", 0).slideDown("fast").animate(
                        { opacity: 1 },
                        { queue: false, duration: "fast" }
                    );
                }
                else{
                    $(".GM_setting_under_dev").css("opacity", 1).slideUp("fast").animate(
                        { opacity: 0.0 },
                        { queue: false, duration: "fast" }
                    );
                }
            });
        };
        var addStyle_ = function(){
            GM.addStyle(`
            /*
            @media (min-width: 768px){
                #GM_setting {
                    width: 420px;
                }
            }
            @media (min-width: 992px){
                #GM_setting {
                    width: 640px;
                }
            }
            @media (min-width: 1200px){
                #GM_setting {
                    width: 800px;
                }
            }
            @media (min-width: 1550px){
                #GM_setting {
                    width: 1170px;
                }
            }
            */
            #GM_setting {margin-left:auto; margin-right:auto; padding:0;font-size:13px;max-width:1400px; min-width:750px; box-sizing:content-box;}
            #GM_setting_head{margin-left:auto; margin-right:auto; padding:20px 0px 10px 10px;font-size:18px;font-weight:800;max-width:1400px; min-width:750px; box-sizing:content-box;}
            #GM_setting li {word-break:break-all;list-style:none;margin:0px;padding:8px;border-top:1px solid #eee;}
            
            #GM_setting .GM_setting_depth1.GM_setting_category {border-top: 2px solid #999;margin-top:20px;padding-top:10px;}
            #GM_setting li[GM_setting_key='version_check'] {margin-top:0px !important}

            #GM_setting .GM_setting_category_name{display:table-cell;width:80px;padding:0 0 0 0px;font-weight:700;vertical-align:top;}
            #GM_setting .GM_setting_category_blank{display:table-cell;width:80px;padding:0 0 0 0px;vertical-align:top;}

            #GM_setting .GM_setting_list_head{display:table-cell;box-sizing:content-box;vertical-align:top;}
            #GM_setting .GM_setting_depth1 .GM_setting_list_head {padding-left:0px;width:300px;}
            #GM_setting .GM_setting_depth2 .GM_setting_list_head {padding-left:30px;width:270px;}
            #GM_setting .GM_setting_depth3 .GM_setting_list_head {padding-left:60px;width:240px;}
            #GM_setting .GM_setting_depth4 .GM_setting_list_head {padding-left:90px;width:210px;}
            #GM_setting .GM_setting_depth5 .GM_setting_list_head {padding-left:120px;width:180px;}

            #GM_setting .GM_setting_title{display:block;font-weight:700;}
            #GM_setting .GM_setting_desc{display:block;font-size:11px;}

            #GM_setting .GM_setting_input_container {display:table-cell;padding:0 0 0 30px;vertical-align:top;}
            #GM_setting .GM_setting_input_container span{vertical-align:top;}
            #GM_setting .GM_setting_input_container span.btn{margin:0 0 0 10px;}
            #GM_setting input{display:inline}
            #GM_setting input[type="text"]{
                width: 100px;
                height: 30px;
                padding: 5px 5px;
                font-size:12px;
            }
            #GM_setting textarea{
                width: 250px;
                height: 30px;
                padding: 5px 5px;
                font-size:12px;
            }
            #GM_setting input[type="checkbox"] {
                display:none;
                width: 20px;height:20px;
                padding: 0; margin:0;
            }
            #GM_setting input[type="radio"] {
                width: 20px;height:20px;
                padding: 0; margin:0;
            }

            #GM_setting .radio-inline{
                padding-left:0;
                padding-right:10px;
            }
            #GM_setting .radio-inline input{
                margin:0 5px 0 0;
            }

            #GM_setting .GM_setting_item_disable, #GM_setting .GM_setting_item_disable .GM_setting_title, #GM_setting .GM_setting_item_disable .GM_setting_desc{color:#ccc !important}
            #GM_setting .invalid input, #GM_setting .invalid textarea{border-color:#dc3545;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;color:#dc3545;}
            #GM_setting .invalid input:focus, #GM_setting .invalid textarea:focus{border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220,53,69,.25);outline:0;color:#dc3545;}
            #GM_setting .invalid {color:#dc3545}
            #GM_setting .invalid_text {font-size:12px;padding:5px 0 0 5px;}

            #GM_setting .GM_setting_under_dev .GM_setting_title{color:#6441a5;font-style:italic}

            #GM_setting  .btn-xxs {cursor:pointer;padding:4px 4px;} /*padding: 1px 2px;font-size: 9px;line-height: 1.0;border-radius: 3px;margin:0 2px 2px 0;*/
            #GM_setting  .btn-xxs .glyphicon{}
            #GM_setting  .btn-xxs span.glyphicon {font-size:11px; opacity: 0.1;}
            #GM_setting  .btn-xxs.active span.glyphicon {opacity: 0.9;}
            #GM_setting  .btn-xxs.disable {opacity: 0.3;cursor:not-allowed;}
            `);
        };
        var createDOE_ = function(elem){
            //ADD_DEBUG("createDOE_");
            $inputs = {};

            var $elem = $(elem);
            $g_elem = $elem;
            if($elem.find("#GM_setting_container").length !== 0){
                $elem.empty();
            }
            var $container = $("<div id='GM_setting_container'></div>");
            var $setting_head = $(`
                <div id='GM_setting_head'>
                    <div style='height:25px;display:inline-block;width:200px;'>상세 설정</div>
                    <div style='display:flex;height:25px;float:right;'>
                        <a href='https://nomomo.github.io/Addostream/' target='_blank' style='font-size:12px;font-weight:normal;align-self:flex-end;'>ADDostram v`+version_str+` (https://nomomo.github.io/Addostream/)</a>
                    </div>
                </div>
                `);
            var $ul = $("<ul id='GM_setting'></ul>");
            $elem.append($container);
            $container.append($setting_head).append($ul);
            for(var key in settings_full){
                var category = settings_full[key].category;
                var depth = settings_full[key].depth;
                var type = settings_full[key].type;
                var title = settings_full[key].title;
                var desc = settings_full[key].desc;
                var category_name = settings_full[key].category_name;

                var $inputContainer = $("<div class='GM_setting_input_container form-group'></div>");
                var isTextarea = (type === "tag" || type === "textarea");
                var $input;

                if(type === "radio"){
                    var radioObj = settings_full[key].radio;
                    $input = $("<div GM_setting_type='radio'></div>");
                    for(var radiokey in radioObj){
                        var $label = $("<label class='radio-inline'>"+radioObj[radiokey].title+"</label>");
                        var $temp_input = $("<input name='GM_setting_"+key+"' class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' onfocus='this.blur()' />").attr({
                            "value": radioObj[radiokey].value,
                            "type": (type === "set" ? type === "text" : ( type === "tag" ? "textarea" : type )),
                            "GM_setting_type": type,
                            "GM_setting_key": key,
                            "GM_setting_category": (category === undefined ? "default" : category),
                        });
                        $temp_input.prependTo($label);
                        $input.append($label);
                    }
                }
                else{
                    $input = $("<"+(isTextarea ? "textarea " : "input ")+"class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' "+(type === "checkbox"? "onfocus='this.blur()'" : "")+(isTextarea ?"></textarea>":" />")).attr({
                        "type": (type === "set" ? type === "text" : ( type === "tag" ? "textarea" : type )),
                        "GM_setting_type": type,
                        "GM_setting_key": key,
                        "GM_setting_category": (category === undefined ? "default" : category),
                    });
                }

                var $category;
                if(category_name !== undefined){
                    $category = $("<div class='GM_setting_category_name'>"+category_name+"</div>");
                }
                else{
                    $category = $("<div class='GM_setting_category_blank'></div>");
                }

                var $head = $("<div class='GM_setting_list_head'></div>");
                var $title = $("<span class='GM_setting_title'>"+title+"</span>");
                var $desc = $("<span class='GM_setting_desc'>"+desc+"</span>");
                var $li = $("<li GM_setting_key='"+key+"' GM_setting_depth='"+depth+"' class='"+(settings_full[key].under_dev ? "GM_setting_under_dev " : "")+(category_name !== undefined ? "GM_setting_category " : "")+"GM_setting_depth"+depth+"'></li>");
                $ul.append($li);
                $head.append($title).append($desc);

                if(type === "checkbox"){
                    var $label_container = $(`
                    <label class="btn btn-default btn-xxs"><span class="glyphicon glyphicon-ok"></span></label>
                    `);
                    $label_container.prepend($input).appendTo($inputContainer);

                    $input.on("change",function(){
                        if($(this).is(":checked")){
                            $(this).closest("label").addClass("active");
                        }
                        else{
                            $(this).closest("label").removeClass("active");
                        }

                        if($(this).is(":disabled")){
                            $(this).closest("label").addClass("disable").prop("disabled", true);
                        }
                        else{
                            $(this).closest("label").removeClass("disable").prop("disabled", false);
                        }
                    });
                }
                else{
                    $inputContainer.append($input);
                }

                $li.append($category).append($head).append($inputContainer);
                $inputs[key] = $input;
                
                if(settings_full[key].append !== undefined){
                    $inputContainer.append(settings_full[key].append);
                }

                if( (!ADD_DEBUG_MODE && settings_full[key].disable) || (!ADD_config.under_dev && settings_full[key].under_dev) ){
                    ADD_DEBUG("숨김", key);
                    $li.css("display","none");
                }
            }

            // 설정 on-off 이벤트
            $elem.find("input[type='checkbox']").on("click", function(){
                usageCheck_($elem);
            });

            // 자동 저장 이벤트
            var timeoutId;
            $elem.find("input, textarea").on("input", function() {  // "input[type='text']"  input propertychange
                ADD_DEBUG("GM_setting - text change");

                var $this = $(this);
                var val = getInputValue_($this);
                var this_key = $this.attr("GM_setting_key");
                var validation = validation_(this_key, val);
                $this.closest("div").find(".invalid_text").remove();
                if(validation.valid){
                    $this.closest("div").removeClass("invalid");
                }
                else{
                    ADD_DEBUG("validation", validation);
                    $this.closest("div").addClass("invalid");
                    $this.after("<div class='invalid_text'>"+validation.message+"</div>");
                }

                clearTimeout(timeoutId);
                timeoutId = setTimeout(function() {
                    // 저장 시도
                    // 정상적으로 값이 체크 된 경우
                    var g_validation = true;
                    $.each( $inputs, function( ekey, evalue ) {
                        var temp = validation_(ekey, getInputValue_(evalue));
                        if(!temp.valid){
                            g_validation = false;
                            return false;
                        }
                    });
                    if(g_validation){
                        read_();
                        save_();
                        message_($elem, "자동 저장 완료! "+(new Date()).toLocaleTimeString());
                    }
                }, 1000);
            });

            write_();
            usageCheck_($elem);

            // 리셋 버튼 추가
            $ul.append(`<li class="GM_setting_category GM_setting_depth1">
                <div class="GM_setting_category_name">초기화</div>
                <div class="GM_setting_list_head">
                    <span class="GM_setting_title">
                        <span class="GM_setting_reset btn btn-primary" style="margin-left:0;">설정 초기화</span>
                        <span class="GM_setting_reset_all btn btn-primary">전체 초기화(새로고침 필요)</span>
                    </span>
                    <span class="GM_setting_desc"></span>
                </div>
                <div class="GM_setting_input_container form-group">
                </div>
            </li>`);
            $ul.find(".GM_setting_reset").on("click", async function(){
                var conf = confirm("설정을 초기화 하시겠습니까?");
                if(conf){
                    await GM_setting.reset();
                    GM_setting.createDOE($g_elem);
                    message_($g_elem, "설정 초기화 완료! "+(new Date()).toLocaleTimeString());
                }
            });
            $ul.find(".GM_setting_reset_all").on("click", async function(){
                var conf = confirm("전체 초기화를 진행하시겠습니까?");
                if(conf){
                    var listValues = await GM.listValues();
                    for(var key=0; key<listValues.length; key++){
                        var key_str = listValues[key];
                        await GM.deleteValue(key_str);
                    }
                    await GM_setting.reset();
                    GM_setting.createDOE($g_elem);
                    message_($g_elem, "전체 초기화 완료! "+(new Date()).toLocaleTimeString());
                }
            });
            $ul.find(".reset_blocked_chat").on("click", function(){
                var conf = confirm("채팅 로그를 초기화 하시겠습니까?");
                if(conf){
                    ADD_SetVal("ADD_Blocked_Chat", []);
                    message_($g_elem, "채팅 로그 초기화 완료! "+(new Date()).toLocaleTimeString());
                }
            });
        };
        var message_ = function($elem, msg){
            if($elem === undefined){
                return;
            }
            $elem.find(".GM_setting_autosaved").animate({bottom:"+=40px"}, {duration:300, queue: false}); // cleqrQueue().dequeue().finish().stop("true","true")
            // @keyframes glow {to {text-shadow: 0 0 10px white;box-shadow: 0 0 10px #5cb85c;}}
            $("<div style='animation: glow .5s 10 alternate; position:fixed; left:10px; bottom:20px; z-index:10000000;' class='GM_setting_autosaved btn btn-success'>"+msg+"</div>")
                .appendTo($elem)
                .fadeIn("fast")
                .animate({opacity:1}, 6000, function(){
                    $(this).fadeOut("fast").delay(600).remove();
                })
                .animate({left:"+=30px"}, {duration:300, queue: false});
        };
        var read_ = async function(){
            ADD_DEBUG("read_");
            for(var key in $inputs){
                var $input = $inputs[key];
                var val = getInputValue_($input);

                if(settings_full[key].type === "tag"){
                    val = val.replace(/\s/g,"").split(",");
                    if(val.length === 1 && val[0] === ""){
                        val = [];
                    }
                }

                // 이전 설정과 변경된 값 키 체크
                if(settings[key] !== val && changed_key.indexOf(key) === -1){
                    changed_key.push(key);
                }
                settings[key] = val;
            }
        };
        var write_ = async function(){
            ADD_DEBUG("write_");
            for(var key in $inputs){
                var $input = $inputs[key];
                writeInputValue_($input, settings[key]);
            }
        };
        var getInputValue_ = function($input){
            var val;
            switch($input.attr("GM_setting_type")){
            case "checkbox":
                val = $input.prop("checked");
                break;
            case "set": // 현재 text 와 동일
                val = $input.val();
                break;
            case "text":
                val = $input.val();
                break;
            case "tag":  // 현재 textarea 와 동일
                val = $input.val();
                break;
            case "textarea":
                val = $input.val();
                break;
            case "radio":
                val = $input.find("input:checked").val();
                break;
            default:
                //ADD_DEBUG($input);
                val = undefined;
                break;
            }
            return val;
        };
        var writeInputValue_ = function($input, val){
            switch($input.attr("GM_setting_type")){
            case "checkbox":
                $input.prop("checked",val).trigger("change");
                break;
            case "set": // 현재 text 와 동일
                $input.val(val);
                break;
            case "text":
                $input.val(val);
                break;
            case "tag":  // 현재 textarea 와 동일
                $input.val(val);
                $input.height("auto");
                $input.height($input.prop("scrollHeight")+"px");
                break;
            case "textarea":
                $input.val(val);
                $input.height("auto");
                $input.height($input.prop("scrollHeight")+"px");
                break;
            case "radio":
                $input.find("input[value="+val+"]").prop("checked",true);
                break;
            default:
                break;
            }
        };
        var usageCheck_ = async function($elem){
            // 일단 다 켠다.
            var $lis = $elem.find("li");
            $lis.removeClass("GM_setting_item_disable");
            $lis.find("input, textarea").prop("disabled", false);
            $lis.find("input[type='checkbox']").trigger("change");

            var enable = [true];
            for(i=0; i<$lis.length; i++){
                var $curr = $($lis[i]);
                var curr_depth = $curr.attr("GM_setting_depth");
                var curr_key = $curr.attr("GM_setting_key");

                if(i !== 0){
                    var $prev = $($lis[i-1]);
                    var prev_depth = $prev.attr("GM_setting_depth");
                    if(prev_depth < curr_depth){
                        var $prev_checkbox = $prev.find("input[type='checkbox']");
                        // 이전 요소가 체크박스이고, 켜져있으면 현재 요소도 켠다.
                        if($prev_checkbox.length !== 0 && $prev_checkbox.is(":checked")){
                            enable[prev_depth] = true;
                        }
                        else{
                            enable[prev_depth] = false;
                        }
                    }
                }

                for(var e=0; e<curr_depth; e++){
                    if(settings_full[curr_key].disable || !enable[e]){
                        $curr.addClass("GM_setting_item_disable");
                        $curr.find("input, textarea").prop("disabled", true);
                        $curr.find("input[type='checkbox']").trigger("change");
                        break;
                    }
                }
            }
        };
        var validation_ = function(key, val){
            var val_array;
            var duplicate;
            var sorted_array;
            var regex_array_string = /^[A-Za-z0-9 _,]*$/;
            //var regex_number = /^[0-9]*$/;
            var valid = true;
            var message = "";

            // 숫자의 경우
            if(settings_full[key].valid === "number"){
                valid = $.isNumeric(val);
                if(val === ""){
                    message += "반드시 값이 입력되어야 합니다.";
                }
                else if(!valid){
                    message += "숫자만 입력 가능합니다.";
                }
                else{
                    if(settings_full[key].min_value !== undefined && settings_full[key].min_value > val){
                        valid = false;
                        message += "입력 값은 "+ settings_full[key].min_value +"이상의 숫자이어야 합니다.";
                    }
                    else if(settings_full[key].max_value !== undefined && settings_full[key].max_value < val){
                        valid = false;
                        message += "입력 값은 "+ settings_full[key].max_value +"이하의 숫자이어야 합니다.";
                    }
                }
            }
            // array_string - ID 태그
            else if(val !== "" && settings_full[key].valid === "array_string"){
                val_array = $.map(val.split(","), $.trim);
                var match = val.match(regex_array_string);
                //ADD_DEBUG(match);
                if(match === null || match.length === 0){
                    valid = false;
                    message += "영문, 숫자, 콤마(,), 언더바(_) 만 입력 가능합니다.";
                }
                else if($.inArray("", val_array) !== -1){
                    valid = false;
                    message += "공백 값 등 값이 존재하지 않는 항목이 존재합니다.";
                    ADD_DEBUG(val_array, $.inArray("", val_array));
                }
                else if((new Set(val_array)).size !== val_array.length ){
                    valid = false;
                    duplicate = [];
                    sorted_array = val_array.sort();
                    for (var i = 0; i < val_array.length - 1; i++) {
                        if (sorted_array[i + 1] == sorted_array[i] && $.inArray(sorted_array[i], duplicate) === -1) {
                            duplicate.push(sorted_array[i]);
                        }
                    }
                    message += "중복된 값이 존재합니다: " + duplicate.join(",");
                }
                else{
                    for (var j = 0; j < val_array.length; j++) {
                        //ADD_DEBUG(val_array, val_array[j].indexOf(" "));
                        if(val_array[j].indexOf(" ") !== -1){
                            valid = false;
                            message += "문자열 내 공백이 존재하는 항목이 있습니다: " + val_array[j];
                            break;
                        }
                    }
                }
            }
            // array_word - 금지단어
            else if(val !== "" && settings_full[key].valid === "array_word"){
                val_array = $.map(val.split(","), $.trim);
                if($.inArray("", val_array) !== -1){
                    valid = false;
                    message += "공백 값 등 값이 존재하지 않는 항목이 존재합니다.";
                    ADD_DEBUG(val_array, $.inArray("", val_array));
                }
                else if((new Set(val_array)).size !== val_array.length ){
                    valid = false;
                    duplicate = [];
                    sorted_array = val_array.sort();
                    for (var k = 0; k < val_array.length - 1; k++) {
                        if (sorted_array[k + 1] == sorted_array[k] && $.inArray(sorted_array[k], duplicate) === -1) {
                            duplicate.push(sorted_array[k]);
                        }
                    }
                    message += "중복된 값이 존재합니다: " + duplicate.join(",");
                }
            }

            var return_obj = {valid:valid, message:message};
            return return_obj;
        };
        var hasSameKey_ = function(a,b) {
            var aKeys = Object.keys(a).sort();
            var bKeys = Object.keys(b).sort();
            return JSON.stringify(aKeys) === JSON.stringify(bKeys);
        };

        /////////////////////////////////////////////////
        // public interface
        return {
            init: async function(name){
                name_ = name;
                ADD_DEBUG("GM_setting - init");
                await init_();
                await event_();
                addStyle_();
            },
            load: async function(){
                ADD_DEBUG("GM_setting - load");
                await load_();
                //return settings;
            },
            save: async function(){
                ADD_DEBUG("GM_setting - save");
                await save_();
            },
            save_overwrite: async function(){
                // old_value: obj,       ekey:키, evalue:값(old 설정값)
                var old_value = settings;
                var new_value = global[name_];
                $.each(old_value, function(ekey, evalue){
                    if(settings_full[ekey].change !== undefined && old_value[ekey] !== new_value[ekey]){
                        settings_full[ekey].change(new_value[ekey]);
                    }
                });
                settings = global[name_];
                ADD_DEBUG("GM_setting - save_overwrite");
                await save_();
            },
            reset: async function(){
                await GM.setValue(name_, settings_init);
                await load_();
            },
            createDOE: function(elem){
                createDOE_(elem);
            },
            getType: function(key){
                if(settings_full[key] !== undefined){
                    return settings_full[key].type;
                }
                else{
                    return undefined;
                }
            },
            message: function($elem, msg){
                message_($elem, msg);
            }
        };
    })(jQuery, window, document);

    const READ_ONLY = true;
    async function GM_cache(name, time_ms, readonly){
        var currentDate = Number(new Date());
        var cachedDate = Number(await GM.getValue(name, currentDate - time_ms*2.0));
        var is = currentDate - cachedDate > time_ms;
        ADD_DEBUG(name, (currentDate - cachedDate)/1000, ">", time_ms/1000 , "?", is);
        if(is){
            ADD_DEBUG(name, "캐시 갱신됨");
            if(readonly === undefined || !readonly){
                await GM.setValue(name, currentDate);
            }
            return true;
        }
        else{
            ADD_DEBUG(name, "캐시 갱신하지 않음");
            return false;
        }
    }
    async function GM_cache_read(name, time_ms){
        return await GM_cache(name, time_ms, READ_ONLY);
    }
    async function GM_cache_write(name){
        ADD_DEBUG(name, "작성됨");
        var currentDate = Number(new Date());
        await GM.setValue(name, currentDate);
    }

    function ADD_DEBUG(/**/){
        if(GM_page !== C_UCHAT){
            //return false;
        }
        if(ADD_DEBUG_MODE){
            var args = arguments,
                args_length = args.length,
                args_copy = args;
            for (var i=args_length;i>0;i--){
                args[i] = args_copy[i-1];
            }
            args[0] = "+["+urlCheckerText[GM_page]+"]  ";
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

    // 버전 체크
    async function checkNewVersion(){
        if(!ADD_config.version_check){
            return false;
        }
        ADD_DEBUG("checkNewVersion");
        const root = "https://raw.githubusercontent.com/nomomo/Addostream/master/";
        var ver_fut,
            ADD_version_cur_pre_fut,
            ver_fut_text = "",
            update_log = "",
            notice = "";

        var ADD_version_last_check_time = await ADD_GetVal("ADD_version_last_check_time");
        if(ADD_version_last_check_time === undefined){
            ADD_DEBUG("Version - 이전에 버전 체크한 시간이 없어 새로 쓴다 - 2일 전");
            ADD_version_last_check_time = new Date(Date.parse(new Date()) - 2 * 1000 * 60 * 60 * 24);
            await ADD_SetVal("ADD_version_last_check_time", ADD_version_last_check_time);
        }
        var time_pre = new Date(ADD_version_last_check_time);
        var time_cur = new Date();
        var time_bet = Number((time_cur - time_pre)/60/60/1000).toFixed(4);  // 소수점 4자리만큼 시간 얻기

        // 현재 및 이전 버전을 확인함
        if(ADD_config.last_version === undefined || ADD_config.last_version === null){
            await GM_setting.load();
        }

        var ver_pre = Number(ADD_config.last_version);
        var ver_cur = version;
        var ADD_version_cur_pre_fut_init = {
            ver_cur:ver_cur,
            ver_pre:ver_pre,
            ver_fut:ver_cur,
            ver_fut_text:version_str,
            update_log:"",
            notice:""
        };

        var ADD_version_cur_pre_fut_old = await ADD_GetVal("ADD_version_cur_pre_fut", ADD_version_cur_pre_fut_init);

        if(!$.isNumeric(ADD_config.version_check_interval) || ADD_config.version_check_interval <= 1){
            ADD_config.version_check_interval = 1;
        }
        if(time_bet > ADD_config.version_check_interval){
            try {
                var response = await $.ajax({
                    url: root + "package.json",
                    type: "GET",
                    dataType:"json"
                });
                ADD_DEBUG("Version - 버전확인 성공", response);

                update_log = response.update;
                ver_fut_text = response.version;
                notice = response.notice;
                ver_fut = Number(ADD_version_string(ver_fut_text));

                ADD_version_cur_pre_fut = {
                    ver_cur:ver_cur,
                    ver_pre:ver_pre,
                    ver_fut:ver_fut,
                    ver_fut_text:ver_fut_text,
                    update_log:update_log,
                    notice:notice
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
            ADD_version_cur_pre_fut = await ADD_GetVal("ADD_version_cur_pre_fut", ADD_version_cur_pre_fut_init);
            ver_fut = ADD_version_cur_pre_fut.ver_fut;
            ver_fut_text = ADD_version_cur_pre_fut.ver_fut_text;
            update_log = ADD_version_cur_pre_fut.update_log;

            ADD_DEBUG("Version - 현재 와의 시간 차이 : " + time_bet + " 시간 < " + ADD_config.version_check_interval + " 이므로 체크하지 않음", ADD_version_cur_pre_fut);
        }

        ADD_DEBUG("Version - 현재 버전: "+ver_cur+", 이전 버전: "+ver_pre+" , 최신 버전: "+ver_fut, ADD_version_cur_pre_fut);

        var msg_text = "두스트림 애드온이 동작 중 입니다 (v"+version_str+")";

        // 현재 버전(ver_cur) > 이전 버전(ver_pre)
        if(ver_cur > ver_pre && ver_fut > ver_pre){
            msg_text = msg_text + "<br />애드온이 최근 업데이트 됨. ("+version_str+")";
            if(update_log !== undefined && update_log !== null && update_log !== ""){
                msg_text = msg_text +"<br />업데이트 내역: "+update_log;
            }
            // 이전 버전(ver_pre) 업데이트
            ADD_config.last_version = version;
            await GM_setting.save();
        }
        // 업데이트 가능한 버전(ver_fut) > 현재 버전(ver_cur)
        else if(ver_fut > ver_cur ){
            msg_text = msg_text + "<br />새로운 버전(<a href=\"https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js\" target=\"_blank\">v"+ver_fut_text+"</a>) 으로 업데이트 가능";
        }
        else if(ver_cur === ver_pre){
            msg_text = msg_text + "<br />현재 최신 버전 입니다.";
        }

        if(ADD_config.sys_meg){
            ADD_send_sys_msg(msg_text);
        }

        if(ADD_version_cur_pre_fut_old.notice !== ADD_version_cur_pre_fut.notice && ADD_version_cur_pre_fut.notice !== undefined && ADD_version_cur_pre_fut.notice !== "" && ADD_version_cur_pre_fut.notice !== null){
            ADD_send_sys_msg("두드온 공지: "+ADD_version_cur_pre_fut.notice);
        }

        /*
        if(GM_page !== C_UCHAT && new_version_available && $("#new_version_available_text").length !== 0){
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

    function ADD_customStyle(){
        if(GM_page === C_MAIN || GM_page === C_STREAM){
            if(ADD_config.theme_leftchat){
                $("body").addClass("leftchat");
            }
            else{
                $("body").removeClass("leftchat");
            }
        }
    }

    function ADD_addStyle(){
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
            #multitwitch { 
                cursor: pointer;
                display: inline-block;
                font-size: 12px;
                line-height: 20px;
                margin: 0 5px 0 0;
                padding: 5px 10px;
                background: #eee;
                color: #222;
            }
            #popup_ADD_test{ top:50px; right:-90px; }
            #popup_ADD_config, #popup_ADD_quick, #popup_ADD_test {display:none; font-size:12px; z-index:10000; position:absolute; width:502px;}
            #popup_ADD_config table td:nth-child(1){width:160px;}
            #popup_ADD_config table td:nth-child(2){/*width:310px;*/}
            #popup_ADD_config{ top:50px; right:10px; }
            #popup_ADD_config .input_text_by_tag { display:none; }
            #popup_ADD_config  .no_border {border:none;}
            #ADD_change_multi, #ADD_twip {opacity:0; display:inline-block}/*{ display:none; }*/
            /*.onstream #ADD_change_multi { opacity:1; display:inline-block !important;}*/
            #ADD_quick_list {opacity:0; display:inline-block}/*{ display:none; }*/
            /*.onstream #ADD_quick_list { opacity:1; display:inline-block !important;}*/
            #popup_ADD_quick .modal-body{ padding:10px; }
            #popup_ADD_quick { top:50px; right:10px; }
            #popup_ADD_quick .quick_list_title { padding:0 5px 2px 5px; margin-bottom:0px; border-bottom:2px solid rgb(221, 221, 221); font-weight:700;}
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
            .ADD_li_box{position:absolute; top:-42px; right:70px; height:30px; vertical-align:middle; text-align:center; font-size:12px; z-index:5; margin:0;}
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
            .td_strong{font-weight:700;}

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
            .lightbox-opened img{max-width: 100%;box-shadow: 0 0 6px 3px #333; opacity:1.0;margin-top:40px;}
            .lightbox-opened img.chat_image, .lightbox-opened video.chat_image{display:block;max-width: 100%;box-shadow: 0 0 6px 3px #333; opacity:1.0; margin:40px auto 0px auto;}
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
            #hrm_DOE{display: none;z-index: 1001;position: absolute;top: 45px;/*bottom: 50%;*/width: 100%;overflow-y: scroll;border-left: 1px solid #bdc3c7;}
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

            #stream .main-streams>ul.main_list_two_column>li{
                display:inline-block;
                width:calc(50% - 5px);
                float:left;
                padding:0;
                box-sizing:border-box;
            }
            #stream .main-streams>ul.main_list_two_column>li:nth-child(odd){
                margin:0 10px 0 0;
            }
            
            #memo_contents td, #memo_contents th{
                padding:2px 5px !important;
            }
            #memo_contents th{
                white-space:nowrap;
            }

            /* left chatwrap*/
            body.leftchat div.chat {
                right:unset;
                left:0;
            }
            body.leftchat div.wrap {
                margin-right:unset;
                margin-left:345px;
            }
            body.leftchat div.wrap.wide{
                margin:0;
            }
            body.leftchat .chat.closed button.chat-close{
                right:unset;
                left:0;
            }
            body.leftchat .chat-btns button.chat-close{
                float:left;
            }
            body.leftchat .stream_zoomout{
                left:unset !important;
                right:30px;
            }
        `);
    }


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                                 CSS THEME
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // 테마
    const ADD_theme_list = ["default", "black"];
    const theme_css_string = `
    <style id="ADD_theme_css" type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,900');

        /* define theme */
        :root{
        }
        body.theme-black{
            --main-background:#000;
            --main-border-color:#222;
            --main-font-color:#999;

            --drag-font-color:#000;
            --drag-background:#ccc;

            --link-font-color:#999;
            --link-visited-font-color:#666;

            --bs-button-background:#000;
            --bs-button-border-color:#333;
            --bs-button-font-color:#999;
            --bs-button-hover-background:#111;
            --bs-button-hover-border-color:#444;
            --bs-button-hover-font-color:#888;

            --tagit-label-background:#222;
            --tagit-label-font-color:#aaa;
            --tagit-label-border-color:#000;

            --tooltip-background:rgba(38,38,38,.9);
            --tooltip-font-color:#aaa;
            --tooltip-arrow-right:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2838,%2038,%2038,%200.9%29%22%20transform%3D%22rotate%2890%206%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;
            --tooltip-arrow-left:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2838,%2038,%2038,%200.9%29%22%20transform%3D%22rotate%28-90%2018%2018%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;
            --tooltip-arrow-bottom:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2838,%2038,%2038,%200.9%29%22%20transform%3D%22rotate%28180%2018%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;
            --tooltip-arrow-top:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2838,%2038,%2038,%200.9%29%22%20transform%3D%22rotate%280%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;

            --main-list-font-color:#aaa;
            --main-list-line-color:#222;
            --main-list-top-button-font-color:#aaa;
            --main-list-top-button-background:#111;
            --main-list-top-button-multi-background:#222;
            
            --main-list-fixed-streamer-background:#000;

            --main-list-flatform-font-color:#aaa;
            --main-list-viewer-font-color:#aaa;
            --main-list-viewer-twitch-background:#111;
            --main-list-viewer-afreeca-background:#111;
            --main-list-viewer-kakao-background:#111;
            --main-list-viewer-daumpot-background:#111;
            --main-list-viewer-youtube-background:#111;

            --main-list-hover-background:#050505;
            
            --logo-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAANCAYAAADG4RJzAAAACXBIWXMAAAsTAAALEwEAmpwYAABIZmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE3LTA3LTI5VDAyOjExOjEwKzA5OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0xMi0yM1QwMjo1MjoxOCswOTowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMTItMjNUMDI6NTI6MTgrMDk6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmNmY2NhNTc1LTQ5M2ItMmQ0ZC04NTYxLTE4YTJlMTg3NDU4OTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmQzNTQyYWUyLWU3NDAtMTFlNy04MTc3LTg1NWM2NWM0OGMwYTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmNjMGIwYjdjLWE2MGItYTM0Ny1hNzFiLWRlMWVlNTM2MmRkNTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpjYzBiMGI3Yy1hNjBiLWEzNDctYTcxYi1kZTFlZTUzNjJkZDU8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMDctMjlUMDI6MTE6MTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZDZlNmM5ZDctYTQ5NS0yYjQ4LWFkNTQtODk4Y2YxOGYxNmNiPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA3LTI5VDAyOjExOjEwKzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmE2MjE4M2JhLWM2ZjItY2U0MC04ZjZkLTQ1YWU5YWViNzRjMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMi0yM1QwMjo0OToxMCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gaW1hZ2UvcG5nIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3A8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo0MzZkMDcyNS1kZDc3LTNmNGUtYmIzYi0zMzlhOTZhNjE4YzU8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTItMjNUMDI6NDk6MTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YjE0YWEyNzItOWFjZC1lMzRlLTgxNjMtMWU4NzhiZDAwZWNjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEyLTIzVDAyOjUyOjE4KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNmY2NhNTc1LTQ5M2ItMmQ0ZC04NTYxLTE4YTJlMTg3NDU4OTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMi0yM1QwMjo1MjoxOCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6YjE0YWEyNzItOWFjZC1lMzRlLTgxNjMtMWU4NzhiZDAwZWNjPC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjQzNmQwNzI1LWRkNzctM2Y0ZS1iYjNiLTMzOWE5NmE2MThjNTwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmNjMGIwYjdjLWE2MGItYTM0Ny1hNzFiLWRlMWVlNTM2MmRkNTwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+RG9zdHJlYW0rPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5Eb3N0cmVhbSs8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpPnhtcC5kaWQ6Q0Q5MDgzNDI5NTUyMTFFMzg5N0RFOTExMjE3RDQ2Mzk8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjkxPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjEzPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6a2oV1AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAOySURBVHja7Fivb+Q4GH2pim6pSQtWc6QszMSktyga4vKgU8iwQfkDohSUDTIbMioKb8go6JiJ2bCi6EhJ6BVV8gLHEyexM9Vql9ydpYA4jr/n973vRxKhH3Gu9CFFcMhyjW3dRfh//NDQWk9m4lwrJTQnGD8hXAultFK5jgH9qwARLrTKY/2fIJtwESbUEv6ryOj3z2P8K8h+eXn55/Hx8XeX7Ct3wc0dC7/d1dG+ApAmmDkjzrVSyrk8DjtHh3MJrgmI5kJpdSzAAKQHBXePOLfrTcQN9xMb0/09ohjeNZfgXOfO2qmt8blsxPd4+/mQOG5vb3+7vr7+GpKW2URwTQKpwih/nGYMQHfOgnHI8Kg2zseELEWVeTYcjnAxwjnD1ZM02AtjmhLm2jrb6NcKIeakB/hSSumnp6c/Asq+wR0D0LbogIVCyHB3Myj6kEqU6y3qzr7TRXVZQiLFhhNzAJaAoUJzCu+6FFX2WZVR7E4TbHGujwWDLMsBw9sr5GjNnyiYRLne4WTP1tVRWUoAEq9vHhxVBrqtI5cLxlpk1D3rPHVYRwFAkiR/ufdXs67DtezvS3pwRPNNCsgGsvtMFkuRxMPdaUcjujtFVnmrFQD5irdwO4Tnk81o28gSEScpgAr7unO4LRznXsLZou2G6DY4Sqx3J9cDYACqzHGWR5wPDw9fKKURpTQCgKZpvrn3A9lkhdUFuozXLThjTDbyQiQAXb1Hdc7Hnm5nMap6ArzPYm24bgwJffow0WaJCe8djKbJWmI8AJ8OL4tzGFdT77VtSKb9waz6PuEcR8fRjtKI0gwVGIqjwue7mp4sbxHpMaQHU1QPQEYpKN1G51Dv18xJ8UVTLyAvgW4EXD7/+/u7/vj4+Nudu/6M90zh2CAFUO1r6/UgWSZHS5SzuD1FO0rxzIU+Fhvw562uO0RhQpbI+kkfXK6KAwTaiJ5MmtQSEOf9/f1VUNnjFDHvgYuCAVU2FKiuRQuAnavloBiWsCFHxvmsYnetH7g3qpaeBTFcHnF+RDFVsdfWUj0Ji3MhjYQ3jPO+B64yDAXNqLQxiRjjlu5oKn9pIsBEzKTFDBSs1YpcKMrz9GQwbODWAcLF0M51Eo0EWMJgHG5aNvtrYu7EqS1/zjfnCogzMExRWf4pgvW2DhbB2T+VyXrChT4W7MKeRHNhlGZHlVE0icIYWoWMuh2B/12gQrl+Rt31qYVwLfqPpnPakQx2TpZr7O+OY1tWXKN3rX0C16a3JfV8rn8fAJWt/iNyFCmZAAAAAElFTkSuQmCC");
            
            --modal-content-shadow:0 3px 9px rgba(205,205,205,.25);

            --history-font-color:#999;
            --history-gradient:linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 40px);

            --hrm-doe-font-color:#ccc;

            --chat-nick-color:#ccc;
            --chat-content-color:#ccc;
            --chat-image-container-background-color:#222;
            --chat-image-container-color:#ccc;
            --chat-input-color:#ccc;

            --chat-more-color:#fff;
            --chat-more-background:rgba(0,0,0,.75);
        }

        /* apply theme */
        body.theme{
            background-color: var(--main-background);
            color: var(--main-font-color);
        }

        body.theme a,
        body.theme a:hover,
        body.theme a:focus{
            color: var(--link-font-color);
        }

        /* font */
        body.theme.theme-black .container, 
        body.theme.theme-black #hrm_DOE,
        body.theme.theme-black .wrap div.line, 
        body.theme.theme-black .wrap .chatContent, 
        body.theme.theme-black .wrap span.nick,
        body.theme.theme-black .wrap .conversation_memo,
        body.theme.theme-black button:not(.chat-close),
        body.theme.theme-black .chatContent a.autokeyword,
        body.theme.theme-black .chatContent a.autokeyword:link {
            font-family: 'Noto Sans KR', serif !important;
        }
        body.theme.theme-black .h_text_container span{
            font-family: "Malgun Gothic", 맑은고딕, "맑은 고딕", Dotum, "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        }
        body.theme.theme-black .wrap .conversation_memo{
            vertical-align: middle !important;
        }

        body.theme ::selection {
            background: var(--drag-background);
            color: var(--drag-font-color);
            text-shadow: none;
        }
        body.theme ::-moz-selection {
            background: var(--drag-background);
            color: var(--drag-font-color);
            text-shadow: none;
        }
        body.theme ::-webkit-selection {
            background: var(--drag-background);
            color: var(--drag-font-color);
            text-shadow: none;
        }

        /* bs button */
        body.theme .btn{
            background-color: var(--bs-button-background);
            border-color: var(--bs-button-border-color);
            color: var(--bs-button-font-color);
        }
        body.theme .btn:hover, body.theme .btn:focus, body.theme .btn:active, body.theme .btn.active, body.theme .open .dropdown-toggle.btn{
            background-color: var(--bs-button-hover-background);
            border-color: var(--bs-button-hover-border-color);
            color: var(--bs-button-hover-font-color);
        }
        body.theme .btn-default{
            background-color: var(--bs-button-background);
            border-color: var(--bs-button-border-color);
            color: var(--bs-button-font-color);
        }
        body.theme .btn-default:hover, body.theme .btn-default:focus, body.theme .btn-default:active, body.theme .btn-default.active, body.theme .open .dropdown-toggle.btn-default{
            background-color: var(--bs-button-hover-background);
            border-color: var(--bs-button-hover-border-color);
            color: var(--bs-button-hover-font-color);
        }

        /* modal body */
        body.theme .modal-content{
            box-shadow: var(--modal-content-shadow);
        }
        body.theme .modal-body,
        body.theme .modal-footer,
        body.theme .modal-body input,
        body.theme .modal-body textarea{
            background-color: var(--main-background);
            color: var(--main-font-color);
            border-color: var(--main-border-color);
        }
        body.theme #popup_ADD_quick .title, body.theme #popup_ADD_quick .from{
            color: var(--main-font-color);
        }
        body.theme #popup_ADD_config table td,
        body.theme #popup_ADD_quick li,
        body.theme #popup_ADD_quick .quick_list_title,
        body.theme .modal-body .table>thead>tr>th,
        body.theme .modal-body table td,
        body.theme .modal-body li{
            border-color: var(--main-border-color);
        }
        body.theme #popup_ADD_quick li>a:hover,
        body.theme .modal-body tr:hover,
        body.theme .modal-body li>a:hover{
            background-color: var(--main-list-hover-background);
        }
        body.theme .table-hover>tbody>tr>td.active:hover,
        body.theme .table-hover>tbody>tr>th.active:hover,
        body.theme .table-hover>tbody>tr.active:hover>td,
        body.theme .table-hover>tbody>tr.active:hover>th,
        body.theme .table>thead>tr>td.active,
        body.theme .table>tbody>tr>td.active,
        body.theme .table>tfoot>tr>td.active,
        body.theme .table>thead>tr>th.active,
        body.theme .table>tbody>tr>th.active,
        body.theme .table>tfoot>tr>th.active,
        body.theme .table>thead>tr.active>td,
        body.theme .table>tbody>tr.active>td,
        body.theme .table>tfoot>tr.active>td,
        body.theme .table>thead>tr.active>th,
        body.theme .table>tbody>tr.active>th,
        body.theme .table>tfoot>tr.active>th{
            background-color: var(--main-background);
        }

        /* tagit */
        body.theme ul.tagit li.tagit-choice{
            background-color: var(--tagit-label-background);
            color: var(--tagit-label-font-color);
            border-color: var(--tagit-label-border-color);
        }
        body.theme ul.tagit{
            border-color: var(--main-border-color);
        }
        body.theme ul.tagit li.tagit-new input{
            color: var(--tagit-label-font-color);
        }
        body.theme .tagit-autocomplete{
            background-color: var(--tagit-label-background);
            color: var(--tagit-label-font-color);
            border-color: var(--tagit-label-border-color);
        }
        body.theme .tagit-autocomplete li a{
            color: var(--tagit-label-font-color);
        }

        /* tooltip */
        body.theme [aria-label][role~="tooltip"]:after{
            background-color: var(--tooltip-background);
            color: var(--tooltip-font-color);
        }
        body.theme [role~="tooltip"][data-microtip-position="right"]:before{
            background: var(--tooltip-arrow-right);
        }
        body.theme [role~="tooltip"][data-microtip-position|="left"]:before{
            background: var(--tooltip-arrow-left);
        }
        body.theme [role~="tooltip"][data-microtip-position="bottom"]:before{
            background: var(--tooltip-arrow-bottom);
        }
        body.theme [role~="tooltip"][data-microtip-position="top"]:before{
            background: var(--tooltip-arrow-top);
        }

        /* main list */
        body.theme #stream .search .checkbox, body.theme #stream .search .checkbox.checked {
            color: var(--main-list-top-button-font-color);
            background-color: var(--main-list-top-button-background);
        }
        body.theme #stream #multitwitch{
            color: var(--main-list-top-button-font-color);
            background-color: var(--main-list-top-button-multi-background);
        }

        body.theme #stream .main-streams>ul>li{
            border-bottom-color: var(--main-list-line-color);
        }
        body.theme .main-streams>ul>li>a{
            color: var(--main-list-font-color);
        }
        body.theme .main-streams>ul>li .stream-wrap>.info>.from{
            color: var(--main-list-flatform-font-color);
        }
        body.theme .main-streams>ul>li .stream-wrap>.info>.viewers{
            color: var(--main-list-viewer-font-color);
        }
        body.theme .main-streams>ul>li>a:hover, body.theme .main-streams>ul>li>a:focus{
            background-color: var(--main-list-hover-background);
        }
        body.theme .main-streams>ul>li .stream-wrap>.info>.from.twitch{
            background-color: var(--main-list-viewer-twitch-background);
        }
        body.theme .main-streams>ul>li .stream-wrap>.info>.from.afreeca{
            background-color: var(--main-list-viewer-afreeca-background);
        }
        body.theme .main-streams>ul>li .stream-wrap>.info>.from.kakao{
            background-color: var(--main-list-viewer-kakao-background);
        }
        body.theme .main-streams>ul>li .stream-wrap>.info>.from.youtube{
            background-color: var(--main-list-viewer-youtube-background);
        }
        body.theme .main-streams>ul>li .stream-wrap>.info>.from.daumpot{
            background-color: var(--main-list-viewer-daumpot-background);
        }
        body.theme .fixed_streamer{
            background-color: var(--main-list-fixed-streamer-background);
        }
        body.theme .icon_star{
            color: var(--main-list-font-color);
        }

        /* logo */
        body.theme .nav-brand, body.theme .nav-brand_mod {
            background-image: var(--logo-image) !important;
        }

        /* history */
        body.theme .h_container:before {
            background-image: var(--history-gradient) !important;
        }
        body.theme #history_elem a {
            color: var(--history-font-color);
        }

        /* playing */
        body.theme.theme-black div.wrap header.clearfix.onstream {
            border-bottom: 1px solid #222;
        }

        /* chat */
        body.theme .chat-btns button,
        body.theme .chat-btns button.btn-blue,
        body.theme .chat-btns button.btn-blue:hover,
        body.theme .chat-btns button.btn-blue:focus,
        body.theme .chat-btns button.btn-blue:active {
            color: var(--main-font-color) !important;
            background-color: var(--main-background) !important;
            border-color: var(--main-border-color) !important;
        }
        body.theme #btnRefreshChat, body.theme.leftchat .chat-close{
            border-left:1px solid;
        }
        body.theme.leftchat #btnRefreshChat, body.theme .chat-close{
            border-left:0px;
        }
        body.theme.theme-black .chat-btns button{
            border-right:1px solid;
            border-top:1px solid;
            border-bottom:1px solid;
        }
        body.theme.theme-black .chat-btns button#btnOpenHrm_ADD{
            border-top:0px;
        }
        body.theme.theme-black div.wrap{
            border-top:0px;
        }

        body.theme div.chat-ignore,
        body.theme div.chat-container,
        body.theme div.wrap,
        body.theme div.black{
            border-color: var(--main-border-color) !important;
            background-color: var(--main-background) !important;
        }
        body.theme div.wrap,
        body.theme div.line,
        body.theme span.chatContent,
        body.theme span.nick,
        body.theme span.conversation_memo{
            backface-visibility: hidden !important;
            transform: translateZ(0) scale(1,1)!important;
        }
        body.theme div.line span.nick:not(.colorized){
            color: var(--chat-nick-color) !important;
        }
        body.theme div.line span.chatContent{
            color: var(--chat-content-color) !important;
        }

        body.theme .imgur_container,
        body.theme .imgur_container .imgur_more_images_button,
        .imgur_container .viewers,
        body.theme .imgur_image_title{
            color: var(--chat-image-container-color) !important;
        }
        body.theme .imgur_container .ADD_tr, 
        body.theme .imgur_container .ADD_br, 
        body.theme .imgur_container .simple_image, 
        body.theme .imgur_container .simple_image_container, 
        body.theme .imgur_container .imgur_more_image_div, 
        body.theme .imgur_container .imgur_more_image_div_container,
        body.theme .imgur_container .imgur_image_title:hover{
            background-color: var(--chat-image-container-background-color) !important;
        }
        body.theme.theme-black .chatContent a.autokeyword:after,
        body.theme.theme-black .chatContent a.autokeyword:after{
            background-color: lightslategrey !important;
        }
        body.theme .chatInput, body.theme .bottom.black [contenteditable=true]:not(:focus):empty:before{
            color: var(--chat-input-color) !important;
        }

        body.theme .latest_chat_new{
            color: var(--chat-more-color) !important;
            background-color: var(--chat-more-background) !important;
        }
        body.theme .keyword_pass{
            color: var(--chat-nick-color) !important;
        }
        /* uchat logo */
        body.theme.theme-black div.wrap .top .logo:after{
            content:' ';
            background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDUtMzBUMTQ6MDk6MzgrMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE5LTA1LTMwVDE0OjA5OjM4KzA5OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wNS0zMFQxNDowOTozOCswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZDk1OWNjYjUtNTVlOS1iZTQzLWJhZDMtMjJmNjY5YWE5Nzg0PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MWZhOWVmYWItODI5OS0xMWU5LWE5YjgtYzU2MWQ4Mzg1ZTA0PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6YTBhYjNmYmEtZmMwMi04NjQ5LTkzMjUtYjU3NGIwZGE4YTAzPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmEwYWIzZmJhLWZjMDItODY0OS05MzI1LWI1NzRiMGRhOGEwMzwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wNS0zMFQxNDowOTozOCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpkOTU5Y2NiNS01NWU5LWJlNDMtYmFkMy0yMmY2NjlhYTk3ODQ8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDUtMzBUMTQ6MDk6MzgrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MzI8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MzI8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PrF6kUkAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAzNJREFUeNrEVj1L61AY7klykrRBKCpORUGkze5QcGjpooL4A4oojt0cdSp2cnLo5OTg1MEfIFIEpVQUnETwg5QKLoKWkjQJTXJOzh0C4dw0/fTKfYdDzpM3z5O85/0ISKfT7XYbABD510YIicfjrCRJv8EeiUQAAN1ulwllJ4R4q38xsQYX2DuOQwhhWdYn9S4QQgAACOG4Yn8J2LadTCYPDw9jsVjAT9f1YrHYbDY5jptcwLKsTCaTTqdDXVdWVl5eXsYVYHqjNm6qBNYhAhjjflyu69LvYds2xpgQ4rquv1qWNShEoiheX18nk8lsNjs3N+fjn5+fNzc39XpdEAQP6Xa7a2trhUKBZVmaoV6vHx8f0yBIpVKBLGq1WgcHB/v7+z5eKpXK5fLMzAzHcV4cDMM4PT1dXV0NvK9hGJlMptPpMAwTEiJCCMdxkiQhhGgcISRJEp27AAA6YnQeMgxDHwbTr0AGn3y/aoAQYoxpf26yEoUQVioV13VzuVw0GvXA+/v7arWq67ofn75fMNQEQajVaru7u7e3tx6iqmqhUDg5OaHZJxcghPA8L4qif1oYY5Zle1sA8/OWObhImcgv238SGL0jDe3eTCh7oNBCxwAAwJsQfjF6M2MkgXa7TSOyLBNCAg+7ritJ0tLSkrf9/v42TTOQo+ECHMc1m00aWV9fT6VShmHQGqqqbmxszM/Pe9vHx0fTNEcKEYTw7e3t/f3dR6ampsrl8uLioqZpuq53Oh3TNDc3N4vFou9zeXkZ6Kwh3dQPkWEYW1tbR0dHNK5p2tXVlaIoAIDl5eVcLuffenh4yOfzowr447NUKu3s7AxNpFarlc/nFUURBKE3F/qmqWVZgaMOtefn5+3t7dfX11D28G4KADBNM5vN7u3teU1GUZSFhQVRFGm3j4+P8/Pzs7MzVVVjsVi/gggJEcZ4enq6UqnYtn1xcVGtVhuNRiKRkGU5kUgIgqBpWqPReHp6+vr6ikaj/pgbVQAhJMvy7Ozs3d2drus8z0MIEUKO43hTDADAsizP8/SMG0PAq2THcQRBCMy/CYzrLVHv19HLuR+yE0KYeDz+Q5bBv+9/BgBHF61tM1Y9dAAAAABJRU5ErkJggg==') no-repeat;
            position:absolute;
            top:0px;
            left:0px;
            width:24px;
            height:24px;
            background-size: cover;
        }

        /* settings */
        body.theme #GM_setting li,
        body.theme #GM_setting .GM_setting_depth1.GM_setting_category{
            border-color: var(--main-border-color);
        }
        body.theme.theme-black #GM_setting .GM_setting_under_dev .GM_setting_title{
            color:#ccc;
        }
        body.theme .form-control{
            color: var(--main-font-color) !important;
            background-color: var(--main-background) !important;
            border-color: var(--main-border-color) !important;
        }

        /* lightbox-opened */
        body.theme .lightbox-opened table td,
        body.theme .lightbox-opened table tr,
        body.theme .lightbox-opened table th,
        body.theme .lightbox-opened table{
            color: var(--main-font-color);
            border-color: var(--main-border-color) !important;
            background-color: var(--main-background) !important;
        }
        body.theme .lightbox-opened-white-background{
            color: var(--main-font-color);
            border-color: var(--main-border-color) !important;
            background-color: var(--main-background) !important;
        }

        /* hrm_DOE */
        body.theme #hrm_DOE, body.theme #hrm_DOE li {
            color: var(--main-font-color) !important;
            border-color: var(--main-border-color) !important;
            background-color: var(--main-background) !important;
        }
        body.theme #hrm_DOE a{
            color:var(--hrm-doe-font-color) !important;
        }
        body.theme.theme-black #hrm_DOE a{
            font-style: italic;
            font-size:0.9em;
        }
        body.theme #hrm_DOE a:visited{
            color:var(--link-visited-font-color) !important;
        }
    </style>
    `;

    function ADD_theme(theme){
        if(theme === undefined){
            theme = ADD_config.theme;
        }
        var $target_document = $(document);

        var container = "body";
        // if(GM_page === C_MAIN || GM_page === C_STREAM || GM_page === C_SETTING || GM_page === C_SETTING_NW){
        //     container = "body";
        // }
        // else
        if(GM_page === C_UCHAT && $GLOBAL_IFRAME_DOCUMENT !== undefined){
            container = $GLOBAL_IFRAME_DOCUMENT.find("body").first();
            $target_document = $GLOBAL_IFRAME_DOCUMENT;
        }
        for(var theme_name in ADD_theme_list){
            $(container).removeClass(theme_name);
        }
        
        if($target_document.find("#ADD_theme_css").length === 0){
            $target_document.find("head").append(theme_css_string);
        }

        if(theme === "default" || theme === undefined || $.inArray(theme, ADD_theme_list) === -1){
            $(container).removeClass("theme");
            ADD_DEBUG("테마 기본값 사용", theme);
        }
        else{
            $(container).addClass("theme").addClass("theme-"+theme);
            ADD_DEBUG("테마 변경 완료", theme);
        }
    }


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                             HIJACKED FUNCTION
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    var newdsStream = function(){
        if(!first_main_call){
            ADD_DEBUG("newdsStream hijacked");
            first_main_call = true;
        }
        this.reload = function(){
            if(GM_page == C_SETTING){
                ADD_DEBUG("설정 페이지 첫 접속");
                GM_setting.createDOE($("#stream"));
                return false;
            }
            else{
                parse_data_from_list(0);
                ADD_multitwitch_DOE();
            }
        };
        $(".loader_container").fadeIn(200).fadeOut(200);
    };

    var newdostream = function(q){
        if(!first_main_call){
            ADD_DEBUG("newdostream hijacked");
        }
        q = q.split("/");
        switch(q[1]){
        case "stream":
            $("header").addClass("onstream");
            $("#stream").addClass("onstream");
            $(".footer").hide();
            if(ADD_config.popup_player && $(".stream_zoomout").length !== 0 && q[3] === ADD_now_playing.id){
                ADD_DEBUG("stream_zoomout 복구", $(".stream_zoomout"));
                $("#stream").remove();
                $(".stream_zoomout").attr("style","").removeClass("stream_zoomout").attr("id","stream").addClass("onstream");
                $(".stream_zoomin_screen").remove();
            }
            else{
                ADD_DEBUG("스트림 생성");
                page = "stream";
                $("#stream").load("/stream.php", {"from":q[2], "chan":q[3]});
            }
            break;
        case "addostream":
            $("header").removeClass("onstream");
            $("#stream").removeClass("onstream");
            $(".footer").show();
            $("#stream").html("");
            GM_setting.createDOE($("#stream"));
            break;
        default:
            $.ajax({
                url: "/main2.php",
                dataType: "html",
                success: function(data) {
                    $("#stream").html(data);
                    $("header").removeClass("onstream");
                    $("#stream").removeClass("onstream");
                    $(".footer").show();
                    page = new newdsStream();
                    page.reload();
                },
                error: function(){
                    ADD_DEBUG("/main2.php 로드 중 에러 발생");
                    if(dostream_fix){
                        $.ajax({
                            url: "/index.php",
                            dataType: "html",
                            success: function(data) {
                                ADD_DEBUG("/index.php 에서 내용 가져오기");
                                var $tempdata = $(data);
                                var $tempstream = $tempdata.find("#stream");
                                $("header").removeClass("onstream");
                                $("#stream").removeClass("onstream");
                                $(".footer").show();
                                $("#stream").html($tempstream);
                                page = new newdsStream();
                                page.reload();

                                // GC
                                $tempdata = null;
                            }
                        });
                    }
                }
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
            ADD_DEBUG("date가 아니다");
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
    function transferTime(pastms){
        //지나간 초
        var pastSecond = parseInt((pastms)/1000,10);
    
        var date;
        var hour;
        var min;
        var str = "";
    
        var restSecond = 0;
        if(pastSecond > 86400){
            date = parseInt(pastSecond / 86400,10);
            restSecond = pastSecond % 86400;
            str = date + "일 ";
            if(restSecond > 3600){
                hour = parseInt(restSecond / 3600,10);
                restSecond = restSecond % 3600;
                str = str + hour + "시간 전";
                // if(restSecond > 60){
                //     min = parseInt(restSecond / 60,10);
                //     restSecond = restSecond % 60;
                //     str = str + min + "분 " + restSecond + "초 전";
                // }else{
                //     str = str + restSecond + "초 전";
                // }
            }
            else if(restSecond > 60){
                min = parseInt(restSecond / 60,10);
                restSecond = restSecond % 60;
                str = str + min + "분 전";// + restSecond + "초 전";
            }else{
                str = str + restSecond + "초 전";
            }
        }else if(pastSecond > 3600){
            hour = parseInt(pastSecond / 3600,10);
            restSecond = pastSecond % 3600;
            str = str + hour + "시간 ";
            if(restSecond > 60){
                min = parseInt(restSecond / 60,10);
                restSecond = restSecond % 60;
                str = str + min + "분 전";// + restSecond + "초 전";
            }
            else{
                str = str + restSecond + "초 전";
            }
        }else if(pastSecond > 60){
            min = parseInt(pastSecond / 60,10);
            restSecond = pastSecond % 60;
            str = str + min + "분 " + restSecond + "초 전";
        }else{
            str = pastSecond + "초 전";
        }
    
        return str;
    }
    //////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////
    // 파싱 후 데이터 정리
    async function parse_data_from_list(flag){
        ADD_DEBUG("RUNNING - parse_data_from_list");
        var GM_cache_stream_list = true;
        if(ADD_config.main_list_cache){
            var main_list_cache_time = ADD_config.main_list_cache_time;
            if(!$.isNumeric(main_list_cache_time) || main_list_cache_time < 1){
                main_list_cache_time = 1;
            }
            GM_cache_stream_list = await GM_cache_read("GM_cache_stream_list", Number(ADD_config.main_list_cache_time)*60*1000);
        }
        if(GM_cache_stream_list){
            $.ajax({
                url: "http://www.dostream.com/dev/stream_list.php",
                type: "GET",
                dataType:"json",
                success:function(data){
                    if(data === null){
                        ADD_DEBUG("기본 파싱 리스트 존재하지 않음");
                        data = [];
                        // return;
                    }
                    else{
                        ADD_DEBUG("기본 파싱 리스트 콜 성공");
                    }
                    GM_cache_write("GM_cache_stream_list");
                    GM.setValue("ADD_stream_list", data);
                    ADD_run(data,flag);

                },
                error:function(){
                    ADD_DEBUG("파싱 실패함");
                    ADD_run([],flag);
                }
            });
        }
        else{
            ADD_DEBUG("기본 리스트 캐시된 것 읽어옴");
            var data = await GM.getValue("ADD_stream_list", []);
            ADD_run(data,flag);
        }
    }


    //////////////////////////////////////////////////////////////////////////////////
    // 파싱 데이터 이용하여 DOE 생성
    async function ADD_run(data,flag){
        var append = "";
        var $ul;
        if(!ADD_config.list){
            $(data).each(function(k, data) {
                var from = data.from;
                switch(data.from) {
                case "afreeca":
                    from = "아프리카";
                    break;
                case "twitch":
                    from = "트위치";
                    break;
                case "kakao":
                    from = "카카오";
                    break;
                case "youtube":
                    from = "유투브";
                    break;
                default:
                    from = data.from;
                }

                append += "<li class=\""+data.from+"\">\
                <a href=\"/#/stream"+data.url+"\">\
                <img src=\""+data.image+"\" width=\"90\" hieght=\"60\">\
                <div class=\"stream-wrap\">\
                <div class=\"title\">"+(data.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"))+"</div>\
                <div class=\"info\">\
                <div class=\"from "+data.from+"\">"+from+"</div>\
                <div class=\"viewers\"><span class=\"glyphicon glyphicon-user\"></span> "+data.viewers+"</div>\
                </div>\
                </div>\
                </a>\
                </li>";
            });
            //$("#stream .main-streams ul").empty().append(append);
            if(flag === 0){
                $ul = $("#stream .main-streams ul");
                if($ul === undefined){
                    $("#stream .main-streams").append("<ul></ul>");
                }
                $("#stream .main-streams ul").empty().hide().append(append).fadeIn(300);
            }
            else{
                $("#popup_ADD_quick ul").empty().hide().append(append).fadeIn(300);
            }
            return;
        }

        // 메인 접속 시 실행될 것들.
        checkedStreamerFromList = [];
        ADD_DEBUG("ADD_run - 파싱된 데이터 이용하여 스트림 리스트 DOE 생성");
        // 숨길 대상 스트리머 지우기
        if(ADD_config.streamer_hide){
            var h_index_ary = [];
            var hide_streamer = ADD_config.streamer_hide_ID;
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

        // 기존 항목들의 추가 항목 초기화
        for(i=0; i<data.length ; i++ ){
            data[i].main_fixed = false;
            data[i].main_favorite = false;
            data[i].display_name = "";
        }

        // Twitch api 쿠키로부터 스트리머 가져오기
        if ( ADD_config.alarm && (!!$.cookie("twitch_api_cookie")) ){
            ADD_DEBUG("DOE 생성을 위해 Twitch API cookie 쿠키 정리 중...");
            // 로컬 변수 선언
            var $temp_api_cookie = JSON.parse($.cookie("twitch_api_cookie"));
            if($temp_api_cookie === undefined || $temp_api_cookie === null || $temp_api_cookie.length === 0){
                ADD_DEBUG("DOE 생성 중 Twitch API cookie 확인 실패!");
                ADD_DEBUG("$temp_api_cookie", $temp_api_cookie);
            }
            else{
                // 시청자 순으로 정렬하기 (alarm_sort_by_viewer)
                if(ADD_config.alarm_sort_by_viewer){
                    $temp_api_cookie.sort(function(a, b) {
                        return b.viewers - a.viewers;
                        //return b.viewers > a.viewers ? -1 : b.viewers < a.viewers ? 1 : 0;
                    });
                }                

                for(i=0; i<$temp_api_cookie.length ; i++ ){
                    var t_index = data.map(function(o){ return o.streamer; }).indexOf($temp_api_cookie[i].name);
                    if(t_index !== -1){
                        data[t_index].title = $temp_api_cookie[i].status;
                        data[t_index].viewers = $temp_api_cookie[i].viewers;
                        data[t_index].display_name = $temp_api_cookie[i].display_name;
                        data[t_index].main_favorite = true;

                        data.splice(0, 0, data.splice(t_index, 1)[0]);
                    }
                    else{
                        var temp_one = {};
                        temp_one.title = $temp_api_cookie[i].status;
                        if($temp_api_cookie[i].game !== undefined){
                            temp_one.game = $temp_api_cookie[i].game;
                        }
                        temp_one.from = "twitch";
                        temp_one.url = "/twitch/"+$temp_api_cookie[i].name;
                        temp_one.image = "http://static-cdn.jtvnw.net/previews-ttv/live_user_"+$temp_api_cookie[i].name+"-240x180.jpg";
                        temp_one.streamer = $temp_api_cookie[i].name;
                        temp_one.viewers = $temp_api_cookie[i].viewers;
                        temp_one.display_name = $temp_api_cookie[i].display_name;
                        temp_one.main_fixed = false;
                        temp_one.main_favorite = true;

                        data.unshift(temp_one);
                        temp_one = null;
                    }
                }
            }
        }

        // 고정 시킬 스트리머 순서 맨 위로 올리기
        if(ADD_config.top_fix){
            var fixed_streamer = ADD_config.top_fix_ID;
            var alarm_streamer = ADD_config.top_alarm_ID;
            for(i=fixed_streamer.length-1; i>=0; i--){
                var fixed_streamer_id = fixed_streamer[i].toLowerCase();
                var f_index = data.map(function(o){ return o.streamer; }).indexOf(fixed_streamer_id);
                // 이미 목록에 있는 경우
                if(f_index !== -1){
                    data[f_index].main_fixed = true;
                    data.splice(0, 0, data.splice(f_index, 1)[0]);
                }
                // 목록에 없는 경우(오프라인 상태인 경우)
                else if(ADD_config.top_off_fix){
                    var temp_one2 = {};

                    if( ADD_config.alarm && ($.inArray(fixed_streamer_id, alarm_streamer) !== -1) ){
                        //temp_one2.title = "스트림이 오프라인 상태이거나, 메인 추가 목록에 추가되지 않아 상태를 확인할 수 없습니다.";
                        temp_one2.title = "스트림이 오프라인 상태입니다.";
                    }
                    else{// if(ADD_config.alarm){ //  && (!!$.cookie("twitch_api_cookie")
                        temp_one2.title = "스트림이 오프라인 상태입니다.";
                    }

                    temp_one2.from = "twitch";
                    temp_one2.url = "/twitch/"+fixed_streamer_id;
                    temp_one2.image = "http://static-cdn.jtvnw.net/previews-ttv/live_user_"+fixed_streamer_id+"-240x180.jpg";
                    temp_one2.streamer = fixed_streamer_id;
                    temp_one2.viewers = 0;
                    temp_one2.display_name = "";
                    temp_one2.main_fixed = true;
                    temp_one2.main_favorite = false;

                    data.unshift(temp_one2);
                }
            }
        }

        if(ADD_config.thumbnail_refresh){
            var thumbRefreshGap = ADD_config.thumbnail_refresh_gap;
            if(!$.isNumeric(thumbRefreshGap) || Number(thumbRefreshGap) < 1){
                thumbRefreshGap = 1;
            }
            var isThumbRefresh = await GM_cache("thumbnail_refresh",Number(thumbRefreshGap)*60*1000);
            
            if(isThumbRefresh){
                getTimeStampRes = "?" + getTimeStamp("m");
            }
        }

        // display_name 채우기, 섬네일 수정하기
        for(i=0; i<data.length ; i++ ){
            if(data[i].streamer == "togom"){
                data[i].viewers = data[i].viewers * 100;
            }

            if(ADD_config.thumbnail_refresh){
                data[i].image += getTimeStampRes;
            }
            
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

        // 무조건 시청자 순으로 정렬하는 경우, 재정렬 한다.
        if(ADD_config.list_sort_by_viewer){
            data.sort(function(a, b) {
                return b.viewers - a.viewers;
            });
        }

        $(data).each(function(k, data){
            var twitch_append = "";
            var fixed_class = "";
            var fixed_append = "";
            var favorite_class = "";
            var favorite_append = "";
            var display_name = "";

            if(ADD_config.remember_platform){
                if(data.from === "twitch" && ADD_config.remember_twitch){
                    return true;
                }
                else if(data.from === "kakao" && ADD_config.remember_kakao){
                    return true;
                }
                else if(data.from === "youtube" && ADD_config.remember_youtube){
                    return true;
                }
            }

            if(data.from === "twitch"){
                twitch_append=`
                  <div class="ADD_li_box_container">
                      <div class="ADD_li_box">
                          <div class="ADD_checkbox_container"` + (ADD_config.button_set ? "" : " style='display:none'") +`>
                              <label class="btn btn-default btn-xs" aria-label="멀티트위치 체크박스" data-microtip-position="top-left" role="tooltip">
                                  <input class="ADD_checkbox" type="checkbox" name="chk" value="`+data.streamer+`" onfocus="this.blur()" autocomplete="off" />
                                  <span class="glyphicon glyphicon-ok"></span>
                              </label>
                          </div>
                          <div class="multitwitch_button"` + (ADD_config.button_chatmode ? "" : " style='display:none'") +`>
                              <a href="/#/stream/multitwitch/`+data.streamer+`">
                                  <span class="btn btn-default btn-xs" aria-label="채팅모드" data-microtip-position="top-right" role="tooltip"><span class="glyphicon glyphicon-comment"></span></span>
                              </a>
                          </div>
                      </div>
                  </div>
                  `;
                if(!ADD_config.show_display_name){
                    display_name = "트위치";
                }
                else if(data.display_name === ""){
                    display_name = data.streamer;
                }
                else{
                    display_name = data.display_name+" ("+data.streamer+")";
                }
            }
            else{
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
            var game = "";
            if(ADD_config.alarm_show_game_name && data.game !== undefined){
                game = "<div class=\"game\" style='float:left;margin-left:10px;color:#333'> - "+data.game+"</div>";
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
                              `+game+`
                              <div class="viewers">
                                  <span class="glyphicon glyphicon-user"></span> `+data.viewers+`
                              </div>
                          </div>
                      </div>
                  </a>
                  `+twitch_append+`
              </li>`;
        });

        if(flag === 0){
            $ul = $("#stream .main-streams ul");
            if($ul === undefined){
                $("#stream .main-streams").append("<ul></ul>");
            }
            $("#stream .main-streams ul").empty().hide().append(append).fadeIn(300);
            if(ADD_config.main_list_two_column){
                $("#stream .main-streams ul").addClass("main_list_two_column");
            }
            else{
                $("#stream .main-streams ul").removeClass("main_list_two_column");
            }
        }
        else{
            $("#popup_ADD_quick ul").empty().hide().append(append).fadeIn(300);
        }

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

        // 채팅 관련됨
        if(GM_page === C_UCHAT){
            // 좌표 버튼
            ADD_send_location_DOE();

            ADD_chatting_arrive();
        }
        else{
            // 섬네일 마우스 오버 설정 관련됨
            ADD_thumbnail_mouseover();

            // history 기능 관련됨
            ADD_Channel_History_Run();

            // 빠른 좌표 버튼 생성 관련됨
            hrm_DOE();

            // 데스크탑 알림 권한 관련됨
            if(ADD_config.alarm_noti){
                ADD_DEBUG("Notification.permission = ", Notification.permission);
                if (Notification.permission !== "granted")
                    Notification.requestPermission();
            }
        }
    }


    //////////////////////////////////////////////////////////////////////////////////
    // 설정 창에 설정 값을 덮어씌우기 위한 함수
    function ADD_var_to_config_form(){
        for(var key in ADD_config){
            var ADD_ct = ADD_config[key];
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
            ADD_config_type = GM_setting.getType(key);//ADD_config_ID.attr('type');

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
                else{
                    ADD_config_ID.parent("label.btn").removeClass("active");
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
        if(ADD_config.under_dev){
            $(".ADD_under_dev").show();
        }
        else{
            $(".ADD_under_dev").hide();
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 설정창 값을 변수에 저장
    async function ADD_save_config_to_data(){
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
            ADD_config_type = GM_setting.getType(key);//ADD_config_ID.attr('type');

            // 위에서 찾은 각 설정창 타입에 맞게 쿠키에 입력한다.
            if (ADD_config_type == "text" || ADD_config_type == "none"){
                // 1. 설정창 타입이 text 인 경우
                ADD_config[key] = ADD_config_ID.val();
            }
            else if (ADD_config_type == "checkbox"){
                // 2. 설정창 타입이 checkbox 인 경우
                ADD_config[key] = ADD_config_ID.prop("checked");
            }
            else if (ADD_config_type == "radio"){
                // 3. 설정창 타입이 radio 인 경우
                ADD_config[key] = ADD_config_ID.val();
            }
            else if (ADD_config_type == "tag"){
                // 4. 설정창 타입이 tag 인 경우
                if(key === "top_fix_ID" || key === "top_alarm_ID" || key === "streamer_hide_ID"){
                    ADD_config[key] = ADD_config_ID.val().replace(/\s/g,"").toLowerCase().split(",");
                }
                else{
                    ADD_config[key] = ADD_config_ID.val().replace(/\s/g,"").split(",");
                }
            }

            // GC
            ADD_config_ID_text = null;
            ADD_config_ID = null;
            ADD_config_type = null;
        }

        // 데이터 저장
        await GM_setting.save_overwrite();
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
        if(Number(ADD_status.ad_remove) > 0 && ADD_config.chat_adb){
            ADD_text += '광고 차단: '+ADD_status.ad_remove+ '회, ';
        }
        if(Number(ADD_status.auto_image) > 0 && ADD_config.imgur_preview){
            ADD_text += 'Imgur 로드: '+ADD_status.auto_image+ '회, ';
        }
        if(Number(ADD_status.api_call) > 0 && ADD_config.alarm){
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
    async function twitch_api(){
        if(!ADD_config.alarm){
            return false;
        }

        // api 갱신 간격 검증
        var ADD_config_alarm_gap = Number(ADD_config.alarm_gap);
        if($.isNumeric(ADD_config.alarm_gap) && ADD_config_alarm_gap < API_INTERVAL_MIN_TIME){
            ADD_config_alarm_gap = 1.0;
        }

        // api 업데이트 여부 확인
        var api_update = await GM_cache("GM_cache_twitch_api", ADD_config_alarm_gap*60*1000);

        // 호출 가능 시 호출
        if (unique_window_check && (api_push_forced || api_update)){
            api_push_forced = false;
            var ch_ids_array = ADD_config.top_alarm_ID;
            var ch_ids_string = ch_ids_array.join(",").replace(/\s/g,"").toLowerCase();
            if(ch_ids_array.length > 0){
                var twitch_jqxhr = $.ajax({
                    url:"https://api.twitch.tv/kraken/streams?offset=0&limit=100&channel="+ch_ids_string,
                    type: "GET",
                    contentType: "application/json",
                    dataType:"json",
                    headers: {"Client-ID": ADD_CLIENT_ID_TWITCH},
                })
                    .done(function(channel){
                        ADD_status_cookie_add_data("api_call");
                        var temp_twitch_api_cookie = [];
                        // temp 에 이전 api 쿠키를 복사한다.
                        // 현재는 desktop alarm 이 켜진 경우만 복사한다.
                        if ( (!!$.cookie("twitch_api_cookie")) && ADD_config.alarm_noti)
                            temp_twitch_api_cookie = JSON.parse($.cookie("twitch_api_cookie"));

                        var streams = channel.streams;
                        var temp_body = "";

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

                                var noti_detail;
                                // 데스크톱 알림 허용인 경우
                                // if( ADD_config.alarm_noti ){
                                //     // 첫번째 call 이고 기존 쿠키 존재 안 하는 경우 (완전히 첫 접속인 경우)
                                //     if(first_api_call && (!$.cookie("twitch_api_cookie"))){
                                //         if(i !== 0){
                                //             temp_body += ", ";
                                //         }
                                //         temp_body += stream.channel.name;

                                //         if(i === streams.length -1){
                                //             noti_detail = {
                                //                 title: "Dostream+",
                                //                 text: temp_body,
                                //                 image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC",
                                //                 //highlight: true,
                                //                 timeout: 6000
                                //                 //ondone: function(){},
                                //                 //onclick: function(){},
                                //             };
                                //             GM.notification(noti_detail);
                                //         }
                                //     }

                                //     // 기존 쿠키 존재 하는 경우
                                //     else if( ($.cookie("twitch_api_cookie")) ){
                                //         // 이전 api call 한 내역에 이번에 api call 한 이름이 있는지 체크
                                //         var first_call_check = temp_twitch_api_cookie.filter(function (obj){
                                //             return obj.name === stream.channel.name;
                                //         })[0];

                                //         // 이전에 call 하지 않은 스트리머인 경우 개별 데스크톱 알림
                                //         if(first_call_check === undefined || first_call_check === null){
                                //             noti_detail = {
                                //                 title: stream.channel.display_name,
                                //                 text: stream.channel.game+" - "+stream.viewers+" viewers\n"+stream.channel.status,
                                //                 image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC",
                                //                 //highlight: true,
                                //                 timeout: 6000
                                //                 //ondone: function(){},
                                //                 //onclick: function(){},
                                //             };
                                //             GM.notification(noti_detail);

                                //             // GC
                                //             first_call_check = null;
                                //         }
                                //         else{
                                //             ADD_DEBUG(stream.channel.name + " : 이전에 이미 api call 하였으므로 알림하지 않음");
                                //         }
                                //     }
                                // }

                                // GC
                                stream = null;
                            } // streams 에 대한 for문 끝
                            $.cookie("twitch_api_cookie", JSON.stringify(twitch_api_cookie), { expires : (new Date()).getMinutes() + 10, path : "/" });
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

                        // 메인일 경우 리로드
                        ADD_DEBUG("Twitch API - API 호출에 의하여 메인 리로드 됨");
                        if(ADD_config.alarm_main_reload){
                            reloadMain();
                        }

                        // 채팅에 메시지 띄움
                        /*
                        if(ADD_config.sys_meg !== undefined && ADD_config.sys_meg){
                            var temp_date = new Date();
                            temp_date = leadingZeros(temp_date.getFullYear(), 4) + "-" + leadingZeros(temp_date.getMonth() + 1, 2) + "-" +  leadingZeros(temp_date.getDate(), 2) + " " + leadingZeros(temp_date.getHours(), 2) + ":" + leadingZeros(temp_date.getMinutes(), 2) + ":" + leadingZeros(temp_date.getSeconds(), 2);
                            ADD_send_sys_msg_from_main_frame("Twitch API 호출 완료 ("+temp_date+")",0);
                        }
                        */

                        GM_cache_write("GM_cache_twitch_api");
                    })
                    .fail(function(error){
                        ADD_DEBUG("Twitch API - Request failed", error);
                    })
                    .always(function(){
                        ADD_DEBUG("Twitch API - Complete");
                    });
            }
        }
        else{
            // not update
            if ( $.cookie("twitch_api_cookie") ){
                // 쿠키 존재 시 변수로 쓴다.
                twitch_api_cookie = JSON.parse($.cookie("twitch_api_cookie"));
            }
            // 메인일 경우 리로드
            ADD_DEBUG("Twitch API - API 호출 없이 메인 리로드 됨");
            if(ADD_config.alarm_main_reload){
                reloadMain();
            }
        }
    }


    //////////////////////////////////////////////////////////////////////////////////
    // Twitch API를 주기적으로 호출
    var ADD_API_SET_INTERVAL;
    async function twitch_api_call_interval(){
        if(!ADD_config.alarm){
            clearInterval(ADD_API_SET_INTERVAL);
            return false;
        }

        var intervalTime = Number(ADD_config.alarm_gap);
        if(!$.isNumeric(intervalTime) || intervalTime < API_INTERVAL_MIN_TIME){
            intervalTime = API_INTERVAL_MIN_TIME;
        }
        intervalTime = intervalTime*1000*60;

        if (ADD_API_SET_INTERVAL){
            clearInterval(ADD_API_SET_INTERVAL);
        }

        ADD_API_SET_INTERVAL = setInterval(async function(){
            ADD_DEBUG("twitch_api_call_interval 에 의해 twitch_api() 함수 호출됨");
            await twitch_api();
        }, intervalTime);
    }


    ////////////////////////////////// UNIQUE WINDOW /////////////////////////////////
    // 다중창 체크하여 Twitch api 호출 막음
    function ADD_multiwindow_prevent(){
        unique_window = new Date();
        unique_window = Number(unique_window.getTime());
        $.cookie("unique_window", unique_window, { expires : 30, path : "/" });

        /*
        setInterval(function(){
            unique_window_cookie = Number($.cookie("unique_window"));
            if((unique_window_check === true)&&(unique_window != unique_window_cookie)){
                ADD_DEBUG("unique window = ",unique_window);
                ADD_DEBUG("unique window cookie is ",unique_window_cookie);
                unique_window_check = false;
                $("#notice_text").show().addClass("ADD_twitch_api_again").html("(+) 새 창에서 접속 감지 됨. 현재 창에서 다시 시작하려면 클릭.").on("click", function(){
                    ADD_twitch_api_again(ONLY_STREAM);
                });
                $("#notice_text2").show().addClass("ADD_twitch_api_again_with_chat").html("[채팅까지 다시시작]").on("click", function(){
                    ADD_twitch_api_again(WITH_CHAT);
                });
                $("#notice_text_elem").show();
                clearInterval(ADD_API_SET_INTERVAL);
            }
        }, 1000);
        */
    }

    const ONLY_STREAM = 1;
    const WITH_CHAT = 2;
    /**
     * 멀티창 방지 후 재시작 버튼 클릭 시 동작
     * @param {number} TYPE 1:ONLY_STREAM, 2:WITH_CHAT
     */
    function ADD_twitch_api_again(TYPE){    // 주석2
        // 주석1
        if( $(".ADD_twitch_api_again").length !== 0 ){
            $("#notice_text2").hide().removeClass("ADD_twitch_api_again_with_chat").html("");
            $(".ADD_twitch_api_again").removeClass("ADD_twitch_api_again");
            $("#notice_text").html("(+) Dostram+의 API 갱신 재시작^^7").delay(2000).fadeOut("fast");
            $("#notice_text_elem").delay(2000).fadeOut("fast");
            unique_window = new Date();
            unique_window = Number(unique_window.getTime());
            $.cookie("unique_window", unique_window, { expires : 30, path : "/" });
            unique_window_check = true;
            twitch_api_call_interval();

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

    // 설정 관련 버튼, 팝업 DOE 생성
    function ADD_config_DOE(){
        // 설정 버튼 및 팝업 생성
        $("header .container").append(`
            <div style="position:relative;margin-left:170px;">
                <div id="notice_text_elem" title="Dosteam+ System Message"><span id="notice_text">문어문어문어문어<br />블러드트레일 블러드트레일</span><span id="notice_text2"></span></div>
                    <div id="history_elem"></div>
                    <div class="AD_title">
                        <span id="ADD_twip" class="btn btn-default" aria-label="Twip donate" data-microtip-position="left" role="tooltip">
                            <span class="glyphicon glyphicon-usd"></span>
                        </span>
                        <span id="ADD_change_multi" class="btn btn-default" aria-label="멀티트위치↔트위치 전환" data-microtip-position="bottom" role="tooltip">
                            <span class="glyphicon glyphicon-resize-horizontal"></span>
                        </span>
                    <span id="ADD_quick_list" class="btn btn-default" aria-label="퀵리스트" data-microtip-position="bottom" role="tooltip">
                        <span class="glyphicon glyphicon-list"></span>
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
                            <ul class="stream_list"></ul>
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
                                                    </label> 상태 알림
                                                </span>
                                            </span>
                                            <span aria-label="좌표 보내기 버튼 생성" data-microtip-position="top-left" role="tooltip">
                                                <span style="margin-left:10px;">
                                                    <label class="btn btn-default btn-xxs">
                                                        <input type="checkbox" id="ADD_config_send_location_button" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />
                                                        <span class="glyphicon glyphicon-ok"></span>
                                                    </label> 좌표 버튼
                                                </span>
                                            </span>
                                            <span style="margin-left:10px;">
                                                <span class="show_memo_log" style="text-decoration:underline;cursor:pointer;">
                                                    [채팅매니저 관리]
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
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="no_border">
                                        </td>
                                        <td>
                                            <span aria-label="채팅창의 자동스크롤이 뜬금없이 끊기는 것을 방지\n마우스 휠을 위로 돌렸을 때 더 잘 멈추도록 함\n채팅 정지 시 더 이상 마지막 채팅을 보여주지 않음" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_chat_scroll" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 자동스크롤 변경(TEST)
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
                                                </label> Imgur
                                            </span>
                                        </span>
                                        <span style="padding-left:10px;">
                                            <span aria-label="Gfycat 주소 형태의 링크가\n채팅창에 등록되면 바로 보여줌\n(Gfycat API 사용, 테스트 중)" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_gfycat_preview" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_image_preview_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> Gfycat
                                            </span>
                                        </span>
                                        <span style="padding-left:10px;">
                                            <span aria-label="트위치 클립 주소 형태의 링크가\n채팅창에 등록되면 섬네일을 표시\n(테스트 중)" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_chat_image_twitch_thumb" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_image_preview_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 트위치
                                            </span>
                                        </span>
                                            <span style="padding-left:10px;">
                                                <span aria-label="유투브 주소 형태의 링크가\n채팅창에 등록되면 섬네일을 표시\n(테스트 중)" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                <label class="btn btn-default btn-xxs">
                                                    <input type="checkbox" id="ADD_config_chat_image_youtube_thumb" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_image_preview_form form_enabled" />
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </label> 유투브
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
                                            <span style="display:none;">
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
                                        <span style="margin-left:20px;">
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
                                        <span class="expand_window_on" target_elem="#block_contents_tr" toggle_on="▼ 단어 보기" toggle_off="▲ 메뉴 닫기" style="margin-left:5px;text-decoration:underline;cursor:pointer">▼ 단어 보기</span>
                                        <span class="tooltip_container" aria-label="차단된 채팅 기록 보기" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                            <span class="show_blocked_chat" style="float:right;text-decoration:underline;cursor:pointer;">[Log]</span>
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
                                                <span aria-label="이전 시청 기록 보여줌" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                    <label class="btn btn-default btn-xxs">
                                                        <input type="checkbox" id="ADD_config_history" class="" onfocus="this.blur()"  />
                                                        <span class="glyphicon glyphicon-ok"></span>
                                                    </label> 시청 기록
                                                </span>
                                            </span>
                                            <span style="float:right;">
                                                <span style="margin-left:50px;">
                                                    <span aria-label="두스 내에서 좌표 페이지 호출" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                        <label class="btn btn-default btn-xxs">
                                                            <input type="checkbox" id="ADD_config_insagirl_button" class="" onfocus="this.blur()"  />
                                                            <span class="glyphicon glyphicon-ok"></span>
                                                        </label> 빠른 좌표
                                                    </span>
                                                </span>
                                                <span style="margin-left:10px;">
                                                    <span aria-label="채팅매니저에서 차단한 유저의 좌표를\n빠른 좌표 페이지에서 보이지 않도록 함" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                                        <label class="btn btn-default btn-xxs">
                                                            <input type="checkbox" id="ADD_config_insagirl_block_by_nick" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_insagirl_button_form form_enabled" />
                                                            <span class="glyphicon glyphicon-ok"></span>
                                                        </label> 좌표 차단
                                                    </span>
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr style="display:none;">
                                        <td class="td_strong">
                                            <label class="btn btn-default btn-xxs">
                                                <input type="checkbox" id="ADD_config_twitch_interacite" class="" onfocus="this.blur()"  />
                                                <span class="glyphicon glyphicon-ok"></span>
                                            </label> 반응형 트위치 사용</td>
                                        <td>
                                        <td>

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

        var sortable_options = {
            placeholder: "sortable-placeholder",
            start: function(event, ui) {
                ui.placeholder.addClass("tagit-choice ui-widget-content ui-state-default ui-corner-all tagit-choice-editable").css("background-color","yellow");
                ui.placeholder.html(ui.item.html());
            },
            cursor: "move",
            distance: 5,
            opacity: 0.5,
            revert: 100,
            out: function( event, ui ) {
                ADD_DEBUG("sortable change", event, ui);
                var input_vars = [];
                $(this).find("span.tagit-label").each(function(){
                    input_vars.push($(this).text());
                });
                var input_text = input_vars.join(",");
                var input_id = $(this).attr("id").replace("_Tags","");
                $("#"+input_id).val(input_text);
            }
        };
        $("#ADD_config_top_fix_ID_Tags").tagit({autocomplete: {delay: 0},onTagExists:TagExist,preprocessTag:preprocessingTag,availableTags:streamerArray_AutoComplete,singleField: true,singleFieldNode: $("#ADD_config_top_fix_ID")});
        $("#ADD_config_top_fix_ID_Tags").sortable(sortable_options);
        $("#ADD_config_top_fix_ID_Tags").disableSelection();

        $("#ADD_config_top_alarm_ID_Tags").tagit({autocomplete: {delay: 0},onTagExists:TagExist,preprocessTag:preprocessingTag,availableTags:streamerArray_AutoComplete,singleField: true,singleFieldNode: $("#ADD_config_top_alarm_ID")});
        $("#ADD_config_top_alarm_ID_Tags").sortable(sortable_options);
        $("#ADD_config_top_alarm_ID_Tags").disableSelection();

        $("#ADD_config_streamer_hide_ID_Tags").tagit({autocomplete: {delay: 0},onTagExists:TagExist,preprocessTag:preprocessingTag,availableTags:streamerArray_AutoComplete,singleField: true,singleFieldNode: $("#ADD_config_streamer_hide_ID")});
        $("#ADD_config_streamer_hide_ID_Tags").sortable(sortable_options);
        $("#ADD_config_streamer_hide_ID_Tags").disableSelection();

        $("#ADD_config_chat_block_tag_Tags").tagit({autocomplete: {delay: 0},singleField: true,singleFieldNode: $("#ADD_config_chat_block_tag")});
        $("#ADD_config_chat_block_tag_Tags").sortable(sortable_options);
        $("#ADD_config_chat_block_tag_Tags").disableSelection();

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
                ADD_DEBUG("채널 히스토리 등록 중 #/stream/ 을 찾지 못함", document_url);
                return null;
            }
        }
    }

    // 쿠키 작성 동작
    function ADD_Channel_history_cookie(rw_array){
        // rw_array[0]:channel_id, rw_array[1]:channel_nick, rw_array[2]:platform
        // 쿠키 읽어서 변수에 담는다

        var ADD_MAX_HISTORY = ADD_config.max_history;

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
            var $temp_array = rw_array[0].split("&");
            for (var j=0; j<$temp_array.length; j++){
                if(j !== 0){
                    ch_text = ch_text+"&";
                }
                ch_text = ch_text+ADD_streamer_nick($temp_array[j]).toUpperCase();
            }
            if(rw_array[2] === "multitwitch"){
                ch_text = ch_text+"(멀티)";
            }
            rw_array[1] = ch_text;

            // 기존 쓰여진 쿠키에 중복 여부 찾기
            var found_h = false;
            for(var i=0;i<ADD_h_cookie.length;i++){
                if(ADD_h_cookie[i][0] !== undefined && rw_array[0] === ADD_h_cookie[i][0] && rw_array[2] === ADD_h_cookie[i][2]){
                    ADD_h_cookie.splice(i,1);
                    // unshift : 맨앞추가, pust : 맨뒤추가
                    ADD_h_cookie.unshift(rw_array);
                    found_h = true;
                    break;
                }
            }
            if(!found_h){
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

        var ADD_MAX_HISTORY = ADD_config.max_history;

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

                // 아이콘 숨기기
                if(ADD_config.history_hide_icon){
                    platform_class = "";
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
                h_text = h_text + "<div class=\"h_text_container\">" + from2 + platform_class + "<a class=" + ch_stream + " href=\"" + "http://www.dostream.com/#/stream/" + ch_stream + "/" + ch_streamer_id + "\" title=\"" + h_title_text + "\">" + ch_text + "</a></div>";
            }
            h_text = h_text + "</span>";
            if(fade){
                $("#history_elem").hide().html(h_text).fadeIn(1000);
            }
            else {
                $("#history_elem").html(h_text);
            }

            if(urlCheck() === C_STREAM){
                $("#history_elem a:first").addClass("nowplaying");
            }
            else{
                $("#history_elem a:first").removeClass("nowplaying");
            }

            // $(".h_text_container a").draggable({
            //     helper: "clone",
            //     delay: 0,
            //     start: function(event, ui) {
            //         var href = $(ui.helper).attr("href");
            //         var stream = href.split("/stream/").pop();
            //         var text = $(ui.helper).text();
            //         $(ui.helper).css({"background-color":"#fff","padding":"10px","border-radius":"3px","font-size":"14px","display":"inline-block","height":"40px"});
            //         $("#stream").css("position","relative").prepend(`
            //             <div id="stream_screen" style="position:absolute;z-index:1000;background-color:rgba(0,0,0,0.5);width:100%;height:calc(100% - 45px);padding:20px;">
            //                 <div style="width:100%;height:100%;position:relative;">
            //                     <div class="drag_select_area" style="width:100%;height:100%;opacity:0.2;position:absolute;z-index:900;">
            //                         <div class="drag_tl" style="display:inline-block;width:45%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
            //                         <div class="drag_none" style="display:inline-block;width:10%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
            //                         <div class="drag_tr" style="display:inline-block;width:45%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
                                    
            //                         <div class="drag_l" style="display:inline-block;width:45%;height:20%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
            //                         <div class="drag_whole" style="display:inline-block;width:10%;height:20%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
            //                         <div class="drag_r" style="display:inline-block;width:45%;height:20%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
                                    
            //                         <div class="drag_bl" style="display:inline-block;width:45%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
            //                         <div class="drag_none" style="display:inline-block;width:10%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
            //                         <div class="drag_br" style="display:inline-block;width:45%;height:40%;padding:5px;"><div style="width:100%;height:100%;border:2px dashed blue;"></div></div>
            //                     </div>

            //                     <div class="drag_show_area" style="opacity:0.9;">
            //                         <div class="drag_whole" style="display:none;position:absolute;width:100%;height:100%;top:0;left:0;padding:5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">전체</div></div>
            //                         <div class="drag_l" style="display:none;position:absolute;width:50%;height:100%;top:0;left:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">왼쪽</div></div>
            //                         <div class="drag_r" style="display:none;position:absolute;width:50%;height:100%;top:0;right:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">오른쪽</div></div>
                                    
            //                         <div class="drag_tl" style="display:none;position:absolute;width:50%;height:50%;top:0;left:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">왼쪽 위</div></div>
            //                         <div class="drag_tr" style="display:none;position:absolute;width:50%;height:50%;top:0;right:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">오른쪽 위</div></div>
            //                         <div class="drag_bl" style="display:none;position:absolute;width:50%;height:50%;bottom:0;left:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">왼쪽 아래</div></div>
            //                         <div class="drag_br" style="display:none;position:absolute;width:50%;height:50%;bottom:0;right:0;padding:5px;5px;z-index:800;"><div style="width:100%;height:100%;border:5px dashed white;">오른쪽 아래</div></div>
            //                     </div>
            //                 </div>
            //             </div>
            //         `);
            //         $("div.drag_select_area > div").hover(function(){
            //             var drag_class = $(this).attr("class");
            //             ADD_DEBUG("fire", drag_class);
            //             if(drag_class !== undefined){
            //                 $(".drag_show_area")
            //                     .find("."+drag_class).show()
            //                     .find("div").html("<div style='width:100%;text-align:center;'>"+stream+"</div>")
            //                     .css({"font-size":"18px","color":"#fff","text-align":"center","display":"flex","align-self":"center","align-items":"center","justify-items":"center"});
            //             }
            //         },function(){
            //             var drag_class = $(this).attr("class");
            //             ADD_DEBUG("fire", drag_class);
            //             if(drag_class !== undefined){
            //                 $(".drag_show_area").find("."+drag_class).hide();
            //             }
            //         });
            //     },
            //     stop:function(event, ui){
            //         $("#stream_screen").remove();
            //         $("#stream").css("position","unset");
            //     },
            //     revert: true,
            //     revertDuration: 10
            // });
        }
        else{
            ADD_DEBUG("ADD_Channel_History_DOE 에서 배열 크기가 null 입니다");
        }
    }

    // DOE 및 이벤트 생성
    function ADD_Channel_History_Run(){
        if(GM_page === C_UCHAT){
            return false;
        }

        var ADD_history = ADD_config.history;
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
        if(GM_page === C_MAIN || GM_page === C_SETTING){
            // 메인으로 접속하는 경우
            total_history = ADD_Channel_history_cookie();
        }
        else if(GM_page === C_STREAM){
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

    
    $(document).on("click", ".show_blocked_chat", async () => {
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
                        + "<span class='blocked_chat_date' style='width:110px;margin-right:10px;display:inline-block;white-space:nowrap;overflow:hidden;'>"
                        + getTimeStampWithDash(new Date(temp_obj.created), "s")
                        + "</span>|<span class='blocked_chat_nick' style='width:60px;margin:0 10px 0 10px;display:inline-block;text-align:center;white-space:nowrap;overflow:hidden;'>"
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

        // var ADD_Blocked_Chat_event_ID;
        // if(typeof GM_addValueChangeListener === "function" && typeof GM_removeValueChangeListener === "function" ){
        //     ADD_DEBUG("채팅 차단창에서 addValueChangeListener 바인드");
        //     GM_removeValueChangeListener(ADD_Blocked_Chat_event_ID);
        //     ADD_Blocked_Chat_event_ID = GM_addValueChangeListener("ADD_Blocked_Chat", async function(val_name, old_value, new_value, remote) {
        //         if(remote && $("#ADD_blocked_chat_container").length !== 0){
        //             ADD_Blocked_Chat = new_value;
        //             Blocked_text = "";
        //             for(var i=(ADD_Blocked_Chat.length - 1); i>=0; i--){
        //                 if(typeof ADD_Blocked_Chat[i] === "object"){
        //                     // {"created":date, "nick":nick, "content":content};
        //                     var temp_obj = ADD_Blocked_Chat[i];
        //                     Blocked_text = Blocked_text
        //                         + "<span class='blocked_chat_date' style='width:110px;margin-right:10px;display:inline-block;white-space:nowrap;overflow:hidden;'>"
        //                         + getTimeStampWithDash(new Date(temp_obj.created), "s")
        //                         + "</span>|<span class='blocked_chat_nick' style='width:60px;margin:0 10px 0 10px;display:inline-block;text-align:center;white-space:nowrap;overflow:hidden;'>"
        //                         + temp_obj.nick
        //                         + "</span>:<span class='blocked_chat_content' style='margin:0 0 0 10px;'>"
        //                         + temp_obj.content
        //                         + "</span><br />";
        //                 }
        //                 else{
        //                     Blocked_text = Blocked_text + ADD_Blocked_Chat[i]+"<br />";
        //                 }
        //             }
        //             $("#ADD_blocked_text").empty().html(Blocked_text);
        //         }
        //     });

        //     $(document).one("click", "#ADD_blocked_chat_container", function(e){
        //         ADD_DEBUG("블록챗 갱신 이벤트 삭제됨");
        //         if(typeof GM_removeValueChangeListener === "function" ){
        //             GM_removeValueChangeListener(ADD_Blocked_Chat_event_ID);
        //         }
        //     });
        // }

        $("body").append(`
            <div class="lightbox-opened" id="ADD_blocked_chat_container">
                <div class="lightbox-opened-white-background modal-content" style="cursor:default;max-width:1200px;min-width:500px;display:table;">
                    <div style="font-family:'Noto Sans KR', '맑은 고딕', 'malgun gothic', dotum, serif;">
                        <span style="font-weight:900;font-size:14px;">차단 기록 보기</span><br />
                        <span style="margin:0 0 5px 0;display:inline-block;">차단된 채팅은 최대 `+ADD_config.chat_block_log_limit+`개까지 저장됩니다.</span><br />
                        <span id="ADD_blocked_text">`+Blocked_text+`</span>
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

            var block_tag_arr = ADD_config.chat_block_tag;
            for(var i=0;i<block_tag_arr.length;i++){
                // 금지 단어에서 찾은 경우
                if(block_tag_arr[i] !== "" && block_tag_arr[i] !== " " && searchTarget.indexOf(block_tag_arr[i]) !== -1){
                    force_ = true;
                    break;
                }
            }
        }

        if(force_){
            // 기존 금지 단어 로그 불러와서 저장하기
            if(ADD_config.chat_block_record){
                var ADD_Blocked_Chat = await ADD_GetVal("ADD_Blocked_Chat", []);
                if(ADD_Blocked_Chat.length >= ADD_config.chat_block_log_limit){
                    ADD_Blocked_Chat.shift();
                }
                var chat_block_log_letter_limit = ADD_config.chat_block_log_letter_limit;
                if($.isNumeric(chat_block_log_letter_limit) || chat_block_log_letter_limit < 0){
                    chat_block_log_letter_limit = 40;
                }
                var temp_obj = {"created":Number(date), "nick":nick, "content":content.substr(0,chat_block_log_letter_limit)};
                ADD_Blocked_Chat.push(temp_obj);
                await ADD_SetVal("ADD_Blocked_Chat", ADD_Blocked_Chat);
            }
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

            if(chat_manager !== undefined && nick !== undefined && nick !== ""){
                chat_manager.updateModifiedDate(nick);
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
            { title: "임시로 DEBUG 모드 켜고 끄기",
                func:function(){
                    ADD_DEBUG_MODE = !ADD_DEBUG_MODE;
                    alert("ADD_DEBUG_MODE : " + ADD_DEBUG_MODE);
                }
            },
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
                    await ADD_SetVal("ADD_version_last_check_time",new Date(Date.parse(new Date()) - 2 * 1000 * 60 * 60 * 24));
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
                func:async function(){
                    var inputString = prompt("설정 이름 입력","");
                    if(ADD_config[inputString] !== undefined && typeof ADD_config[inputString] === "boolean"){
                        ADD_config[inputString] = !ADD_config[inputString];
                        await GM_setting.save();
                        alert("설정변경 - ADD_config."+inputString+" : "+ADD_config[inputString]);
                    }
                    else{
                        alert(inputString + "을 찾을 수 없음");
                    }

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
            },
            {
                title: "인터렉티브 트위치 - 뮤트",
                func:async function(){
                    // ADD_DEBUG("twitch_player.getMuted()", twitch_player.getMuted());
                    // twitch_player.setMuted(false);
                    // ADD_DEBUG("twitch_player.getMuted()", twitch_player.getMuted());
                    // twitch_player.setMuted(true);
                    // twitch_player.setMuted(1);
                    // twitch_player.setMuted();
                    // ADD_DEBUG("twitch_player.getMuted()", twitch_player.getMuted());
                    // //twitch_player.setVolume(0);
                    // ADD_DEBUG(twitch_player._playerState.muted);
                    // twitch_player._playerState.muted = true;
                    // twitch_player.setMuted(true);
                    // ADD_DEBUG("twitch_player.getMuted()", twitch_player.getMuted());
                    // ADD_DEBUG(twitch_player._playerState.muted);

                    // twitch_player.prototype._sendCommand = function(e, t) {
                    //     var n = {
                    //         eventName: e,
                    //         params: t,
                    //         namespace: o.PLAYER_BRIDGE_MESSAGE_NAMESPACE
                    //     };
                    //     this._everywhereWindow.postMessage(n, "*")
                    // }

                    twitch_player._sendCommand("setMuted", [true]);
                    twitch_player.setMuted(false);

                }
            },
            {
                title: "설정 페이지로 이동",
                func:function(){
                    window.location.href = "http://www.dostream.com/#/addostream";
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
                    GM_setting.createDOE($("#setting_contents"));
                }
            },
            {
                title: "chatlog_local 보기",
                func:function(){
                    console.log($(".chat-container > iframe")[0].contentWindow.chatlog_local);
                }
            }
        ];

        text_e.forEach(function(obj){
            var $tempText = $(`
            <tr class="active">
                <td>`+obj.title+`</td>
                <td><span style="cursor:pointer;font-weight:700;">실행</span></td>
            </tr>
            `).on("click",function(){
                obj.func();
            });

            $("#popup_ADD_test_tbody").append($tempText);
        });
    }

    function reloadMain(){
        if(GM_page === C_MAIN){
            ADD_DEBUG("reloadMain");
            if(typeof newdsStream === "function"){
            //if((web_browser === "firefox") && (typeof exportFunction === "function")){
                page = new newdsStream();
            }
            else{
                ADD_DEBUG("!!!!!!!!!! dsStream 실행됨");
                page = new dsStream();
            }
            page.reload();
            ADD_multitwitch_DOE();
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 멀티트위치 관련 버튼 생성 함수
    function ADD_multitwitch_DOE(){
        if(!ADD_config.button_set){
            $(".main-streams div.search").remove();
            return false;
        }
        if( $(".search").length === 0 && $(".main-streams").length !== 0){
            $(".main-streams").prepend(`<div class="search">
            <a class="checkbox twitch checked">트위치</a><a class="checkbox kakao checked">카카오</a><a class="checkbox youtube checked">유튜브</a>
        </div>`);
        }
        else{
            //ADD_DEBUG('search',$('.search').length === 0);
            //ADD_DEBUG("main-streams 존재?: ",$(".main-streams").length !== 0);
            return;
        }
        // 멀티트위치 버튼
        if( $("#multitwitch").length === 0 && $(".search").length !== 0 )
            $(".search").append("<span aria-label=\"체크한 스트리머를 멀티트위치로 실행\" data-microtip-position=\"right\" role=\"tooltip\"><span id=\"multitwitch\">멀티트위치</span></span>");

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
                IndexCheckedID = $.inArray(checkedStreamerFromList[i], ADD_config.streamer_hide_ID);
                if(IndexCheckedID == -1){
                    (ADD_config.streamer_hide_ID).push(checkedStreamerFromList[i]);
                }
            }
            await GM_setting.save();
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

    var prev_nick = "", prev_href = "", prev_count = 0;
    var coord_length = 20;
    async function parse_insagirl(page){
        ADD_DEBUG("RUNNING - parse_coord, page:"+page);
        if(page === 0 || page === 1){
            prev_nick = "";
            prev_href = "";
            prev_count = 0;
            last_prev_count_elem = undefined;
        }
        if(coord_length === undefined || coord_length === null || coord_length === 0){
            coord_length = 20;
        }

        var coord_url = "";
        if(ADD_config.insagirl_select == 1){    // 기본 두스트림의 경우
            coord_url = "http://coord.dostream.com/api/?offset="+String(parseInt((page-1)*coord_length));
            $("#hrmbodyexpand").html(coord_length+"개 더 보기");
        }
        else if(ADD_config.insagirl_select == 2){   // 인사걸의 경우
            coord_url = "http://insagirl-hrm.appspot.com/json2/2/1/"+page+"/";
            $("#hrmbodyexpand").html("더 보기");
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
            onload: async function(response){
                if($("#hrm_DOE").length === 0){
                    ADD_DEBUG("hrm_DOE가 없다");
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

                var hrm_DOE_HTML = "";
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
                    var content = autolinker.link(data[z].message);//.replace(expUrl, "<a href=\"$&\" target=\"_blank\">$&</a>");
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
                                    hrm_DOE_HTML = hrm_DOE_HTML + "<li style='font-size:11px;display:flex;align-items:center;color:#ccc;text-align:center;padding:2px 10px;'><span style='flex:1;border-bottom:1px solid #ccc;margin-right:10px;'></span>" + prev_count + "개의 좌표 숨겨짐" + "<span style='flex:1;border-bottom:1px solid #ccc;margin-left:10px;'></span></li>";
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
                        if(href.toLowerCase().indexOf("dostream.com/#/stream/twitch/") !== -1 || href.toLowerCase().indexOf("dostream.com/#/stream/multitwitch/") !== -1){
                            var ch_text = "";
                            var ch_streamer_id = href.split("/").pop();
        
                            var $temp_array = ch_streamer_id.split("&");
                            for (var j=0; j<$temp_array.length; j++){
                                if(j !== 0){
                                    ch_text = ch_text+"&";
                                }
                                var temp_id = ADD_streamer_nick($temp_array[j]).toUpperCase();
                                ch_text = ch_text+temp_id;
                            }
        
                            if(ch_text.toLowerCase() !== ch_streamer_id.toLowerCase()){
                                content = content + " <span class=\"keyword_pass\" style=\"color:#000;font-weight:700;vertical-align:top;\">["+ch_text+"]</span>";
                            }
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
                    hrm_DOE_HTML = hrm_DOE_HTML + "<li>" + l + nick + ": " + content + "</li>";
                    added = added + 1;
                }
                // var myLinkedHtml = autolinker.link(hrm_DOE_HTML);
                // $("#hrm_DOE ul:first").append(myLinkedHtml);
                if(added == 0 && prev_count !== 0){
                    prev_count = 20;
                    hrm_DOE_HTML = hrm_DOE_HTML + "<li style='display:flex;align-items:center;color:#ccc;text-align:center;padding: 0 10px;'><span style='flex:1;border-bottom:1px solid #ccc;margin-right:10px;'></span>" + prev_count + "개의 좌표 숨겨짐" + "<span style='flex:1;border-bottom:1px solid #ccc;margin-left:10px;'></span></li>";
                    prev_count = 0;
                }

                if(ADD_config.insagirl_select == 1){
                    $("#hrm_DOE ul:first").append(hrm_DOE_HTML);
                } else {
                    $("#hrm_DOE ul:first").empty().append(hrm_DOE_HTML);
                }
                
            }, onerror: async function(){
                ADD_DEBUG("좌표 파싱 중 에러 발생");
                await ADD_SetVal("Cross_Origin_Hrm", false);
            }
        });
        // GM_xmlhttpRequest({
        //     url: "http://insagirl-hrm.appspot.com/json2/2/1/"+page+"/",
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/javascript"
        //     },
        //     onload: async function(response){
        //         if($("#hrm_DOE").length === 0){
        //             ADD_DEBUG("hrm_DOE가 없다");
        //             return;
        //         }
        //         // 채팅 매니저 불러오기
        //         if(ADD_config.insagirl_block_by_nick){
        //             get_chat_manager_from_main_frame();
        //         }
        //         //var expUrl = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?/=~_|!:,.;]*)[-A-Z0-9+&@#/%=~_|])/ig;
        //         var data = response.responseText;
        //         var hrm_DOE_HTML = "";
        //         data = JSON.parse(data);
        //         data = data.v;
        //         for(var z=0; z<data.length; z++){
        //             data[z] = data[z].split("|");
        //             var nick = data[z][1];
        //             if(ADD_config.insagirl_block_by_nick && chat_manager !== undefined && chat_manager.getIsBlock(nick)){
        //                 continue;
        //             }
        //             var content = data[z][2];//.replace(expUrl, "<a href=\"$&\" target=\"_blank\">$&</a>");
        //             var a = (new Date).getTime();
        //             var e = data[z][0];
        //             var i = Math.floor((a - e) / 1e3),
        //                 r = parseInt(i / 3600),
        //                 s = parseInt(i / 60) % 60,
        //                 u = i % 60,
        //                 l = "(" + (r > -1 && 10 > r ? "0" + r : r) + ":" + (s > -1 && 10 > s ? "0" + s : s) + ":" + (u > -1 && 10 > u ? "0" + u : u) + ")";
        //             //if(content.indexOf("#/stream/") !== -1){
        //             //    content = content.replace("target=\"_blank\"","");
        //             //}
        //             hrm_DOE_HTML = hrm_DOE_HTML + "<li>" + l + nick + ": " + content + "</li>";
        //         }
        //         var myLinkedHtml = autolinker.link(hrm_DOE_HTML);
        //         $("#hrm_DOE ul:first").html("").append(myLinkedHtml);
        //     }, onerror: async function(){
        //         ADD_DEBUG("좌표 파싱 중 에러 발생");
        //         await ADD_SetVal("Cross_Origin_Hrm", false);
        //     }
        // });
    }

    function hrm_DOE(){
        if(GM_page === C_UCHAT){
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
            $("#hrm_DOE").fadeOut("300").delay("700").remove();
            $(".chat-container").css("top","45px");
            return false;
        }
        else if(!ADD_config.insagirl_button && $("#btnOpenHrm").length !== 0 && $("#btnOpenHrm_ADD").length === 0){
            return false;
        }
        else if($("#btnOpenHrm").length !== 0 && $("#btnOpenHrm_ADD").length == 0){
            ADD_DEBUG("좌표 버튼 기능 변경");
            $("#btnOpenHrm").before("<button class=\"btn-blue\" style=\"margin-right:-80px;background-color:#446cb3;margin-bottom:-45px;\"></button>")
                .after("<button id=\"btnOpenHrm_ADD\" class=\"btn-blue\" style=\"height:0px;display:none\" onfocus=\"this.blur()\">▼</button>").css("transition","width 1s, height 1s, transform 1s").css("height","22.5px");
            $("#btnOpenHrm_ADD").css("transition","width 2s, height 2s, transform 2s").css("height","22px").delay("700").fadeIn("300");
            $(".chat-ignore").after(`
            <div id="hrm_DOE">
                <ul></ul>
                <div style="padding:5px;">
                    <button id="hrmbodyexpand" type="button" page="2" class="btn btn-primary btn-block">더 보기</button>
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
        var page = parseInt($(this).attr("page"));
        await parse_insagirl(page);
        $(this).attr("page",String(parseInt(page+1)));
        
        if(ADD_config.insagirl_select == 2){
            $("#hrmbodyexpand").hide();
        }
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
                var link = "";
                var img_title = "";
                var temp;
                // images 가 존재할 경우 - gallery
                if(response_data.images !== undefined){
                    var gallery_title = response_data.title;
                    for(i=0;i<response_data.images.length;i++){
                        temp = response_data.images[i];
                        ADD_DEBUG("type:gallery",temp.link);
                        if(ADD_config.imgur_preview_gif_as_mp4 && response_data.images.mp4 !== undefined && response_data.images.mp4 !== null){
                            link = temp.mp4;
                        }
                        else{
                            link = temp.link;
                        }
                        img_title = temp.title;
                        temp_obj = {
                            link:link,
                            title:(img_title !== undefined && img_title !== null ? img_title : (gallery_title !== undefined && gallery_title !== null ? gallery_title : "")),
                            width:temp.width,
                            height:temp.height,
                            views:temp.views
                        };
                        img_arr.push(temp_obj);
                    }
                }
                // data가 배열 형태일 경우 - album
                else if(response_data[0] !== undefined) {
                    for(i=0;i<response_data.length;i++){
                        temp = response_data[i];
                        ADD_DEBUG("type:album",temp.link);
                        if(ADD_config.imgur_preview_gif_as_mp4 && temp.mp4 !== undefined && temp.mp4 !== null){
                            link = temp.mp4;
                        }
                        else{
                            link = temp.link;
                        }
                        img_title = temp.title;
                        temp_obj = {
                            link:link,
                            title:(img_title !== undefined && img_title !== null ? img_title : ""),
                            width:temp.width,
                            height:temp.height,
                            views:temp.views
                        };
                        img_arr.push(temp_obj);
                    }
                    //imgur_call_again = true;
                }
                // data가 배열이 아닐 경우 - image
                else {
                    ADD_DEBUG("type:image",response_data.link);
                    temp = response_data;
                    if(ADD_config.imgur_preview_gif_as_mp4 && temp.mp4 !== undefined && temp.mp4 !== null){
                        link = temp.mp4;
                    }
                    else{
                        link = temp.link;
                    }
                    img_title = temp.title;
                    temp_obj = {
                        link:link,
                        title:(img_title !== undefined && img_title !== null ? img_title : ""),
                        width:temp.width,
                        height:temp.height,
                        views:temp.views
                    };
                    img_arr.push(temp_obj);
                }

                // 갤러리 타입 에러나는 경우 - 현재 적용 안 함
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
        var views = "";
        var views_style = "";
        //var nudity_block = ADD_config.nudity_block;

        if($line === undefined || iframeElems === undefined || documentElem === undefined || arr === undefined || img_length === 0){
            ADD_DEBUG("chatImageDOEfromLinks - 이미지 오브젝트가 존재하지 않음", arr);
            return false;
        }

        // 기본 컨테이너 생성
        //<div style="font-weight: normal;font-size:11px;padding-top:5px;">by <strong>HFDFKDKF</strong> - 4 hr</div>
        var $ADD_image_container = $(`
            <div class="imgur_container">
                <div class="imgur_safe_screen" style="display:none;">
                    <span class="imgur_safe_button btn btn-default align-middle" style="display:none;">View image</span>
                </div>
                <div class="imgur_control_button ADD_tr">
                    <span class="imgur_image_title">`+(arr[0].title !== undefined && arr[0].title !== null ? "" + arr[0].title : "")+`</span>
                    <span class="imgur_control_hide glyphicon glyphicon-minus-sign" style="display:none;">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0MjoyNSswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MzA1ZmM0ZTItOWVjOC05NTQzLTgzODQtZGI0YWJiMDkwMWYyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6N2E1NmRlNDEtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Y2NkMjU2MTItZDgzNC01MTQzLTliNTUtNTg4YTNkMTliMmIwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNjZDI1NjEyLWQ4MzQtNTE0My05YjU1LTU4OGEzZDE5YjJiMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozMDVmYzRlMi05ZWM4LTk1NDMtODM4NC1kYjRhYmIwOTAxZjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PuZjetEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA99JREFUeNp8lc9rFGcYxz/vm9mZMTszO7PZZLPZoEncdAnSJHVJKERERZpecujB9mAL/Q8KPRU08dJDrx568lRohfbQQwNCDkIr7cFAQQQRW1GbxE1qNetuktnZyfzoITNhKzQPfJmZ7zzP9/k+Ly/vK3gjTp2aQAh4/Pjpgq5rC7u7e7NBEJwAUBTlL8PIrnpeZ7lSGV2OY3jw4CFHhm3n5m07dw+IUwghYiFE3M3Zdu6ebefmjxQTQiymBVLKp5ZlXimVimcLhb4ThULfiVKpeNayzCtSyqddzRb/T+xq6sKyrMVKZYzBwQGq1XGKxQGKxYP3wcEBKpUxLMta7HJ/9VBoZuY0/f2Fua5xLmWz2e5eQ8BPCYZSMsm5lNb19xfmZmZOQ602TT7vPDtwZl7r68szOjqS1o0APtBJ4Ccco6Mj9PXlsSzzGhDn886zWm0aoaqZ93x/fwWoT0xUy8eO6SiKwurq7wA/J67eShr8AdSBc7OzNYIgoN32ePjw0XNgSFUz89IwjMsAjpO77rou9foWa2sbqcPjwJ2u8e8kHGtrG9TrW7iui+PkrgMYhnFZaTZbs8nHbcsy6XR8ALa2/h4GikAZOJkIlhNu2LLMDQBNU4mi6Haj0aTZbM0qYRgeFwKiKKrv7OwShlHq5hbQC7wPPH5jU9xqt71JAN/3iaKoLgSEYXhcEUIAMUEQABBFh4KyS+Db5Plx+i8I9pN8eVgrhEAqirIexyClHMpms2iahqZpAO0uwR8TpNFO87LZLFLKoTgGRVHWpaapdwGCILyg6zpSSjIZ5U2HZxIcus9kFKSU6LpOEIQXkvW8K207dxOg0Xj9mRCQzzsYhgGw3yXweYI09g3DIJ93EOKgNjkHbkrbtleklGtBEJS3txtL1eo4pmkC3AAiYBN4mWAz4W6Ypkm1Os72dmMpCIKylHLNtu0VMTf3LpubW3NPnjz7FaBaHf/Itq0fXr7cxvM6RFGIEAfTx3GElD3oukahkOf169aHjx79+T3A2NjImVJp8LeearVCqTS4vrOzE+7u7l149Wr7kuu2Y8MwfjnYASClPEQmo6IoCuvrz5c2NupfA5RKxcWpqbe/EwJ6Tp4cpadHUi6X77iuG7VaO+c9zzvfbLY+DcPAjKKYOI4Jw9D2/f2pvb29T168+Ocb13U/ABgeHlqq1d75Mo4joihCXLx4jjiO6e3txfM87t9/MN9oNL7y/f3po85OVc3ccxzni8nJUyu6ruO6LkIIlHRDBkGA53k4jrPS23tspdlsLXQ6/oLv+/+5AlRVXdU0dTmXs5Y1TcfzPBRFIV2efwcAVYSABgRv8C8AAAAASUVORK5CYII=" />
                    </span>
                    <span class="imgur_control_remove glyphicon glyphicon-remove-sign" style="">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0Mjo0NyswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZWMzOWJmMzYtMmRjOS0wMDQwLWI3ZjktY2QxYTViZjBmZjIyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OGFlNTk3MjgtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Yjk0ZmQ5ZTEtMjEzMi1mNDRlLWIyYTMtZDBhMWVhOTA1ZjEwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmI5NGZkOWUxLTIxMzItZjQ0ZS1iMmEzLWQwYTFlYTkwNWYxMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplYzM5YmYzNi0yZGM5LTAwNDAtYjdmOS1jZDFhNWJmMGZmMjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pj4Iwe0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABQJJREFUeNpclEuIHEUYx/9V1TWz3dWzPbtm9jGzs7tJ1JgEEhOTQEjU7OID1Agq8RRBAgqCHnLJKYnxBXoRPagIggeNHgIKKoIgonnp5qEhqHm46+5mTHZmd57d0z0z3V1VHiYJmu/48fGrj49//QhuqbVrV4MQYHp6dmdPT3Jns+lvieN4jBACw2BXOOenLMv8SgjxNecc2ewwhDARRTEAgNwKTKedhwG8Va831t/oEUKgNQDom3Oc8/PptLNvw4Z13yWTCQRBC4SQ/wMJIQe01q8CAKV0zrbFR0JYx6IonldKgTE2GsfRvY2G95xSahwAcrnhgxs33v2alBJhGIL9B7YfwGvXtzw4ODjwpFL6mGVZ851Op6GUbphm4ooQ9rHe3tS7yWRC+n4w6XnNCc/zZD6fOxrHEmzz5o2Iomib7wefXmc/rbX+YGwsjyBoYWBgGYKgDUoJ+vr64Loeenp6MDY2etQ0e/6sVKq7mk1/Uin1fW+vUzCUUpBSHgaA3t7UIcbYESEsDA0NwvOayOdH4DgOCKGglKBcriCTyYBzjtWrVx1pNBqvlEpLL8/Ozh9OpVLjrFKpPNRs+i8CuLZixfLHh4YGMTw8hEqleuf8fGGvYRjzuVy2ZlkmlpbK2ULhnz3LlvXP2rbwGw0XjuP8WCwuPh/HMq+1/pk5jnOw1Wqv7+tzXqeUnvA8H1EUYWZm9jnf919ZWCjtzmRue0cpJX/55fSldruzy/eDOULIad8PYJomOp2O4fv+g1prRRhjF6SUd+XzuU3ptHM2kUhgfHwM9Xq9/+TJqS9brfZ9nPMLjNGw3e6sF0Kc27Jl4yNCWAtXry4gimI0Gu49hcI/ZzjnFwkAnxBY2exwlnO+oLXG6OgIMpllCMMQJ05MfV2r1R+7fuMfd+zYPsE5x+LiEv7+ew6MMURRPFwsFq8BJKCEdKMYxzGiKIKUCowZoJQiimJTKdV7I1pxHNvVat2hlCCZTN6AIY7jm3+EGoZR0BqglGYty0J/fxqWZaJYLN35ww9HLzca7n3ptPOt4/R+EQStTceP/zw3PT27ljEGIQQSCQ5KSVZrDYAUaDKZmOq+Lidt24bnNTE3N48zZ37bG0XRiG3b5+6/f9uj27dvfcqyzOMA0hcv/vXMtWtFUEqQStkIw2iyexIxxQYGMi3X9XaHYbhmcDDztm3bGBnJQgjxV6vVnt60acMLQliSc45UKvWx6zYvb926+fN02vE9rwkAKJWWjkgpU5Zl7mOjo/mZcrmyR0qZNwym161b+1O97kIpVeHcmMrnR+TCQhG+76O/vw9hGP5umqZ/6tRZFApXsbhYPiilfFwI68qaNXe9xO64YyUMg52u1ep7XNebkFJeIIT8US5XEMcSruuiULiKUmkJQRCAMYpyuYJSaQkAngbIe10b6Ueq1VqBrVp1O4aHhwqe58lm058sl6u7Wq2Wtm3xUxxL1Ot1JBI9iOMYQdAC5xyGYaBare0nhLzfDYneL6X6LAwjsJUrl4MxilwudzQIAuW63kS73Z5wXe9ZpWSKUgZAQ0qVJoSsbzb93dVq7RMp5RNdS+GA1njjprUeeGAHtNawLAvtdhvnz//xcK1WezMMo7tvcSW60eiWZZnnO53OPinVd/+dYytWjHdNSwiCIIBSmLEs80NK6a+UsiYAQ2vdA6DNGL1k2+IbIcxD4+Oje6vV+oyU8n/G/3cAFcF5BFWY41IAAAAASUVORK5CYII=" />
                    </span>
                </div>
                <div class="simple_image_container">
                    <div class="viewers" style="display:none;"><span>👁 </span></div>
                    <div class="simple_image"></div>
                </div>
                <div class="imgur_more_images" style="display:none;"></div>
                <div class="imgur_control_button ADD_br">
                    <span class="imgur_more_images_button" style="opacity:0.0"></span>
                    <span class="imgur_control_hide glyphicon glyphicon-minus-sign" style="display:none;">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0MjoyNSswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MzA1ZmM0ZTItOWVjOC05NTQzLTgzODQtZGI0YWJiMDkwMWYyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6N2E1NmRlNDEtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Y2NkMjU2MTItZDgzNC01MTQzLTliNTUtNTg4YTNkMTliMmIwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNjZDI1NjEyLWQ4MzQtNTE0My05YjU1LTU4OGEzZDE5YjJiMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozMDVmYzRlMi05ZWM4LTk1NDMtODM4NC1kYjRhYmIwOTAxZjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PuZjetEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA99JREFUeNp8lc9rFGcYxz/vm9mZMTszO7PZZLPZoEncdAnSJHVJKERERZpecujB9mAL/Q8KPRU08dJDrx568lRohfbQQwNCDkIr7cFAQQQRW1GbxE1qNetuktnZyfzoITNhKzQPfJmZ7zzP9/k+Ly/vK3gjTp2aQAh4/Pjpgq5rC7u7e7NBEJwAUBTlL8PIrnpeZ7lSGV2OY3jw4CFHhm3n5m07dw+IUwghYiFE3M3Zdu6ebefmjxQTQiymBVLKp5ZlXimVimcLhb4ThULfiVKpeNayzCtSyqddzRb/T+xq6sKyrMVKZYzBwQGq1XGKxQGKxYP3wcEBKpUxLMta7HJ/9VBoZuY0/f2Fua5xLmWz2e5eQ8BPCYZSMsm5lNb19xfmZmZOQ602TT7vPDtwZl7r68szOjqS1o0APtBJ4Ccco6Mj9PXlsSzzGhDn886zWm0aoaqZ93x/fwWoT0xUy8eO6SiKwurq7wA/J67eShr8AdSBc7OzNYIgoN32ePjw0XNgSFUz89IwjMsAjpO77rou9foWa2sbqcPjwJ2u8e8kHGtrG9TrW7iui+PkrgMYhnFZaTZbs8nHbcsy6XR8ALa2/h4GikAZOJkIlhNu2LLMDQBNU4mi6Haj0aTZbM0qYRgeFwKiKKrv7OwShlHq5hbQC7wPPH5jU9xqt71JAN/3iaKoLgSEYXhcEUIAMUEQABBFh4KyS+Db5Plx+i8I9pN8eVgrhEAqirIexyClHMpms2iahqZpAO0uwR8TpNFO87LZLFLKoTgGRVHWpaapdwGCILyg6zpSSjIZ5U2HZxIcus9kFKSU6LpOEIQXkvW8K207dxOg0Xj9mRCQzzsYhgGw3yXweYI09g3DIJ93EOKgNjkHbkrbtleklGtBEJS3txtL1eo4pmkC3AAiYBN4mWAz4W6Ypkm1Os72dmMpCIKylHLNtu0VMTf3LpubW3NPnjz7FaBaHf/Itq0fXr7cxvM6RFGIEAfTx3GElD3oukahkOf169aHjx79+T3A2NjImVJp8LeearVCqTS4vrOzE+7u7l149Wr7kuu2Y8MwfjnYASClPEQmo6IoCuvrz5c2NupfA5RKxcWpqbe/EwJ6Tp4cpadHUi6X77iuG7VaO+c9zzvfbLY+DcPAjKKYOI4Jw9D2/f2pvb29T168+Ocb13U/ABgeHlqq1d75Mo4joihCXLx4jjiO6e3txfM87t9/MN9oNL7y/f3po85OVc3ccxzni8nJUyu6ruO6LkIIlHRDBkGA53k4jrPS23tspdlsLXQ6/oLv+/+5AlRVXdU0dTmXs5Y1TcfzPBRFIV2efwcAVYSABgRv8C8AAAAASUVORK5CYII=" />
                    </span>
                    <span class="imgur_control_remove glyphicon glyphicon-remove-sign" style="">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0Mjo0NyswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZWMzOWJmMzYtMmRjOS0wMDQwLWI3ZjktY2QxYTViZjBmZjIyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OGFlNTk3MjgtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Yjk0ZmQ5ZTEtMjEzMi1mNDRlLWIyYTMtZDBhMWVhOTA1ZjEwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmI5NGZkOWUxLTIxMzItZjQ0ZS1iMmEzLWQwYTFlYTkwNWYxMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplYzM5YmYzNi0yZGM5LTAwNDAtYjdmOS1jZDFhNWJmMGZmMjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pj4Iwe0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABQJJREFUeNpclEuIHEUYx/9V1TWz3dWzPbtm9jGzs7tJ1JgEEhOTQEjU7OID1Agq8RRBAgqCHnLJKYnxBXoRPagIggeNHgIKKoIgonnp5qEhqHm46+5mTHZmd57d0z0z3V1VHiYJmu/48fGrj49//QhuqbVrV4MQYHp6dmdPT3Jns+lvieN4jBACw2BXOOenLMv8SgjxNecc2ewwhDARRTEAgNwKTKedhwG8Va831t/oEUKgNQDom3Oc8/PptLNvw4Z13yWTCQRBC4SQ/wMJIQe01q8CAKV0zrbFR0JYx6IonldKgTE2GsfRvY2G95xSahwAcrnhgxs33v2alBJhGIL9B7YfwGvXtzw4ODjwpFL6mGVZ851Op6GUbphm4ooQ9rHe3tS7yWRC+n4w6XnNCc/zZD6fOxrHEmzz5o2Iomib7wefXmc/rbX+YGwsjyBoYWBgGYKgDUoJ+vr64Loeenp6MDY2etQ0e/6sVKq7mk1/Uin1fW+vUzCUUpBSHgaA3t7UIcbYESEsDA0NwvOayOdH4DgOCKGglKBcriCTyYBzjtWrVx1pNBqvlEpLL8/Ozh9OpVLjrFKpPNRs+i8CuLZixfLHh4YGMTw8hEqleuf8fGGvYRjzuVy2ZlkmlpbK2ULhnz3LlvXP2rbwGw0XjuP8WCwuPh/HMq+1/pk5jnOw1Wqv7+tzXqeUnvA8H1EUYWZm9jnf919ZWCjtzmRue0cpJX/55fSldruzy/eDOULIad8PYJomOp2O4fv+g1prRRhjF6SUd+XzuU3ptHM2kUhgfHwM9Xq9/+TJqS9brfZ9nPMLjNGw3e6sF0Kc27Jl4yNCWAtXry4gimI0Gu49hcI/ZzjnFwkAnxBY2exwlnO+oLXG6OgIMpllCMMQJ05MfV2r1R+7fuMfd+zYPsE5x+LiEv7+ew6MMURRPFwsFq8BJKCEdKMYxzGiKIKUCowZoJQiimJTKdV7I1pxHNvVat2hlCCZTN6AIY7jm3+EGoZR0BqglGYty0J/fxqWZaJYLN35ww9HLzca7n3ptPOt4/R+EQStTceP/zw3PT27ljEGIQQSCQ5KSVZrDYAUaDKZmOq+Lidt24bnNTE3N48zZ37bG0XRiG3b5+6/f9uj27dvfcqyzOMA0hcv/vXMtWtFUEqQStkIw2iyexIxxQYGMi3X9XaHYbhmcDDztm3bGBnJQgjxV6vVnt60acMLQliSc45UKvWx6zYvb926+fN02vE9rwkAKJWWjkgpU5Zl7mOjo/mZcrmyR0qZNwym161b+1O97kIpVeHcmMrnR+TCQhG+76O/vw9hGP5umqZ/6tRZFApXsbhYPiilfFwI68qaNXe9xO64YyUMg52u1ep7XNebkFJeIIT8US5XEMcSruuiULiKUmkJQRCAMYpyuYJSaQkAngbIe10b6Ueq1VqBrVp1O4aHhwqe58lm058sl6u7Wq2Wtm3xUxxL1Ot1JBI9iOMYQdAC5xyGYaBare0nhLzfDYneL6X6LAwjsJUrl4MxilwudzQIAuW63kS73Z5wXe9ZpWSKUgZAQ0qVJoSsbzb93dVq7RMp5RNdS+GA1njjprUeeGAHtNawLAvtdhvnz//xcK1WezMMo7tvcSW60eiWZZnnO53OPinVd/+dYytWjHdNSwiCIIBSmLEs80NK6a+UsiYAQ2vdA6DNGL1k2+IbIcxD4+Oje6vV+oyU8n/G/3cAFcF5BFWY41IAAAAASUVORK5CYII=" />
                    </span>
                </div>
            </div>`);
        // var $ADD_image_container = $(`
        // <div class="imgur_container">
        //     <div class="imgur_safe_screen" style="display:none;">
        //         <span class="imgur_safe_button btn btn-default align-middle" style="display:none;">View image</span>
        //     </div>
        //
        //     <!-- 블록 -->
        //     <div class="imgur_control_button ADD_tr">
        //         <span class="imgur_image_title">`+(arr[0].title !== undefined && arr[0].title !== null ? "" + arr[0].title : "")+`</span>
        //         <span class="imgur_control_hide glyphicon glyphicon-minus-sign" style="display:none;">
        //             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0MjoyNSswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MzA1ZmM0ZTItOWVjOC05NTQzLTgzODQtZGI0YWJiMDkwMWYyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6N2E1NmRlNDEtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Y2NkMjU2MTItZDgzNC01MTQzLTliNTUtNTg4YTNkMTliMmIwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNjZDI1NjEyLWQ4MzQtNTE0My05YjU1LTU4OGEzZDE5YjJiMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozMDVmYzRlMi05ZWM4LTk1NDMtODM4NC1kYjRhYmIwOTAxZjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PuZjetEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA99JREFUeNp8lc9rFGcYxz/vm9mZMTszO7PZZLPZoEncdAnSJHVJKERERZpecujB9mAL/Q8KPRU08dJDrx568lRohfbQQwNCDkIr7cFAQQQRW1GbxE1qNetuktnZyfzoITNhKzQPfJmZ7zzP9/k+Ly/vK3gjTp2aQAh4/Pjpgq5rC7u7e7NBEJwAUBTlL8PIrnpeZ7lSGV2OY3jw4CFHhm3n5m07dw+IUwghYiFE3M3Zdu6ebefmjxQTQiymBVLKp5ZlXimVimcLhb4ThULfiVKpeNayzCtSyqddzRb/T+xq6sKyrMVKZYzBwQGq1XGKxQGKxYP3wcEBKpUxLMta7HJ/9VBoZuY0/f2Fua5xLmWz2e5eQ8BPCYZSMsm5lNb19xfmZmZOQ602TT7vPDtwZl7r68szOjqS1o0APtBJ4Ccco6Mj9PXlsSzzGhDn886zWm0aoaqZ93x/fwWoT0xUy8eO6SiKwurq7wA/J67eShr8AdSBc7OzNYIgoN32ePjw0XNgSFUz89IwjMsAjpO77rou9foWa2sbqcPjwJ2u8e8kHGtrG9TrW7iui+PkrgMYhnFZaTZbs8nHbcsy6XR8ALa2/h4GikAZOJkIlhNu2LLMDQBNU4mi6Haj0aTZbM0qYRgeFwKiKKrv7OwShlHq5hbQC7wPPH5jU9xqt71JAN/3iaKoLgSEYXhcEUIAMUEQABBFh4KyS+Db5Plx+i8I9pN8eVgrhEAqirIexyClHMpms2iahqZpAO0uwR8TpNFO87LZLFLKoTgGRVHWpaapdwGCILyg6zpSSjIZ5U2HZxIcus9kFKSU6LpOEIQXkvW8K207dxOg0Xj9mRCQzzsYhgGw3yXweYI09g3DIJ93EOKgNjkHbkrbtleklGtBEJS3txtL1eo4pmkC3AAiYBN4mWAz4W6Ypkm1Os72dmMpCIKylHLNtu0VMTf3LpubW3NPnjz7FaBaHf/Itq0fXr7cxvM6RFGIEAfTx3GElD3oukahkOf169aHjx79+T3A2NjImVJp8LeearVCqTS4vrOzE+7u7l149Wr7kuu2Y8MwfjnYASClPEQmo6IoCuvrz5c2NupfA5RKxcWpqbe/EwJ6Tp4cpadHUi6X77iuG7VaO+c9zzvfbLY+DcPAjKKYOI4Jw9D2/f2pvb29T168+Ocb13U/ABgeHlqq1d75Mo4joihCXLx4jjiO6e3txfM87t9/MN9oNL7y/f3po85OVc3ccxzni8nJUyu6ruO6LkIIlHRDBkGA53k4jrPS23tspdlsLXQ6/oLv+/+5AlRVXdU0dTmXs5Y1TcfzPBRFIV2efwcAVYSABgRv8C8AAAAASUVORK5CYII=" />
        //         </span>
        //         <span class="imgur_control_remove glyphicon glyphicon-remove-sign" style="">
        //             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0Mjo0NyswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZWMzOWJmMzYtMmRjOS0wMDQwLWI3ZjktY2QxYTViZjBmZjIyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OGFlNTk3MjgtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Yjk0ZmQ5ZTEtMjEzMi1mNDRlLWIyYTMtZDBhMWVhOTA1ZjEwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmI5NGZkOWUxLTIxMzItZjQ0ZS1iMmEzLWQwYTFlYTkwNWYxMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplYzM5YmYzNi0yZGM5LTAwNDAtYjdmOS1jZDFhNWJmMGZmMjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pj4Iwe0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABQJJREFUeNpclEuIHEUYx/9V1TWz3dWzPbtm9jGzs7tJ1JgEEhOTQEjU7OID1Agq8RRBAgqCHnLJKYnxBXoRPagIggeNHgIKKoIgonnp5qEhqHm46+5mTHZmd57d0z0z3V1VHiYJmu/48fGrj49//QhuqbVrV4MQYHp6dmdPT3Jns+lvieN4jBACw2BXOOenLMv8SgjxNecc2ewwhDARRTEAgNwKTKedhwG8Va831t/oEUKgNQDom3Oc8/PptLNvw4Z13yWTCQRBC4SQ/wMJIQe01q8CAKV0zrbFR0JYx6IonldKgTE2GsfRvY2G95xSahwAcrnhgxs33v2alBJhGIL9B7YfwGvXtzw4ODjwpFL6mGVZ851Op6GUbphm4ooQ9rHe3tS7yWRC+n4w6XnNCc/zZD6fOxrHEmzz5o2Iomib7wefXmc/rbX+YGwsjyBoYWBgGYKgDUoJ+vr64Loeenp6MDY2etQ0e/6sVKq7mk1/Uin1fW+vUzCUUpBSHgaA3t7UIcbYESEsDA0NwvOayOdH4DgOCKGglKBcriCTyYBzjtWrVx1pNBqvlEpLL8/Ozh9OpVLjrFKpPNRs+i8CuLZixfLHh4YGMTw8hEqleuf8fGGvYRjzuVy2ZlkmlpbK2ULhnz3LlvXP2rbwGw0XjuP8WCwuPh/HMq+1/pk5jnOw1Wqv7+tzXqeUnvA8H1EUYWZm9jnf919ZWCjtzmRue0cpJX/55fSldruzy/eDOULIad8PYJomOp2O4fv+g1prRRhjF6SUd+XzuU3ptHM2kUhgfHwM9Xq9/+TJqS9brfZ9nPMLjNGw3e6sF0Kc27Jl4yNCWAtXry4gimI0Gu49hcI/ZzjnFwkAnxBY2exwlnO+oLXG6OgIMpllCMMQJ05MfV2r1R+7fuMfd+zYPsE5x+LiEv7+ew6MMURRPFwsFq8BJKCEdKMYxzGiKIKUCowZoJQiimJTKdV7I1pxHNvVat2hlCCZTN6AIY7jm3+EGoZR0BqglGYty0J/fxqWZaJYLN35ww9HLzca7n3ptPOt4/R+EQStTceP/zw3PT27ljEGIQQSCQ5KSVZrDYAUaDKZmOq+Lidt24bnNTE3N48zZ37bG0XRiG3b5+6/f9uj27dvfcqyzOMA0hcv/vXMtWtFUEqQStkIw2iyexIxxQYGMi3X9XaHYbhmcDDztm3bGBnJQgjxV6vVnt60acMLQliSc45UKvWx6zYvb926+fN02vE9rwkAKJWWjkgpU5Zl7mOjo/mZcrmyR0qZNwym161b+1O97kIpVeHcmMrnR+TCQhG+76O/vw9hGP5umqZ/6tRZFApXsbhYPiilfFwI68qaNXe9xO64YyUMg52u1ep7XNebkFJeIIT8US5XEMcSruuiULiKUmkJQRCAMYpyuYJSaQkAngbIe10b6Ueq1VqBrVp1O4aHhwqe58lm058sl6u7Wq2Wtm3xUxxL1Ot1JBI9iOMYQdAC5xyGYaBare0nhLzfDYneL6X6LAwjsJUrl4MxilwudzQIAuW63kS73Z5wXe9ZpWSKUgZAQ0qVJoSsbzb93dVq7RMp5RNdS+GA1njjprUeeGAHtNawLAvtdhvnz//xcK1WezMMo7tvcSW60eiWZZnnO53OPinVd/+dYytWjHdNSwiCIIBSmLEs80NK6a+UsiYAQ2vdA6DNGL1k2+IbIcxD4+Oje6vV+oyU8n/G/3cAFcF5BFWY41IAAAAASUVORK5CYII=" />
        //         </span>
        //     </div>
        //     <div class="simple_image_container">
        //         <div class="viewers" style="display:none;"><span>👁 </span></div>
        //         <div class="simple_image">
        //         </div>
        //     </div>
        //     <!-- 블록 끝 -->
        //
        //     <div class="imgur_control_button ADD_br">
        //         <span class="imgur_more_images_button" style="opacity:0.0"></span>
        //         <span class="imgur_control_hide glyphicon glyphicon-minus-sign" style="display:none;">
        //             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0MjoyNSswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MzA1ZmM0ZTItOWVjOC05NTQzLTgzODQtZGI0YWJiMDkwMWYyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6N2E1NmRlNDEtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Y2NkMjU2MTItZDgzNC01MTQzLTliNTUtNTg4YTNkMTliMmIwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNjZDI1NjEyLWQ4MzQtNTE0My05YjU1LTU4OGEzZDE5YjJiMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozMDVmYzRlMi05ZWM4LTk1NDMtODM4NC1kYjRhYmIwOTAxZjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6MjUrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PuZjetEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA99JREFUeNp8lc9rFGcYxz/vm9mZMTszO7PZZLPZoEncdAnSJHVJKERERZpecujB9mAL/Q8KPRU08dJDrx568lRohfbQQwNCDkIr7cFAQQQRW1GbxE1qNetuktnZyfzoITNhKzQPfJmZ7zzP9/k+Ly/vK3gjTp2aQAh4/Pjpgq5rC7u7e7NBEJwAUBTlL8PIrnpeZ7lSGV2OY3jw4CFHhm3n5m07dw+IUwghYiFE3M3Zdu6ebefmjxQTQiymBVLKp5ZlXimVimcLhb4ThULfiVKpeNayzCtSyqddzRb/T+xq6sKyrMVKZYzBwQGq1XGKxQGKxYP3wcEBKpUxLMta7HJ/9VBoZuY0/f2Fua5xLmWz2e5eQ8BPCYZSMsm5lNb19xfmZmZOQ602TT7vPDtwZl7r68szOjqS1o0APtBJ4Ccco6Mj9PXlsSzzGhDn886zWm0aoaqZ93x/fwWoT0xUy8eO6SiKwurq7wA/J67eShr8AdSBc7OzNYIgoN32ePjw0XNgSFUz89IwjMsAjpO77rou9foWa2sbqcPjwJ2u8e8kHGtrG9TrW7iui+PkrgMYhnFZaTZbs8nHbcsy6XR8ALa2/h4GikAZOJkIlhNu2LLMDQBNU4mi6Haj0aTZbM0qYRgeFwKiKKrv7OwShlHq5hbQC7wPPH5jU9xqt71JAN/3iaKoLgSEYXhcEUIAMUEQABBFh4KyS+Db5Plx+i8I9pN8eVgrhEAqirIexyClHMpms2iahqZpAO0uwR8TpNFO87LZLFLKoTgGRVHWpaapdwGCILyg6zpSSjIZ5U2HZxIcus9kFKSU6LpOEIQXkvW8K207dxOg0Xj9mRCQzzsYhgGw3yXweYI09g3DIJ93EOKgNjkHbkrbtleklGtBEJS3txtL1eo4pmkC3AAiYBN4mWAz4W6Ypkm1Os72dmMpCIKylHLNtu0VMTf3LpubW3NPnjz7FaBaHf/Itq0fXr7cxvM6RFGIEAfTx3GElD3oukahkOf169aHjx79+T3A2NjImVJp8LeearVCqTS4vrOzE+7u7l149Wr7kuu2Y8MwfjnYASClPEQmo6IoCuvrz5c2NupfA5RKxcWpqbe/EwJ6Tp4cpadHUi6X77iuG7VaO+c9zzvfbLY+DcPAjKKYOI4Jw9D2/f2pvb29T168+Ocb13U/ABgeHlqq1d75Mo4joihCXLx4jjiO6e3txfM87t9/MN9oNL7y/f3po85OVc3ccxzni8nJUyu6ruO6LkIIlHRDBkGA53k4jrPS23tspdlsLXQ6/oLv+/+5AlRVXdU0dTmXs5Y1TcfzPBRFIV2efwcAVYSABgRv8C8AAAAASUVORK5CYII=" />
        //         </span>
        //         <span class="imgur_control_remove glyphicon glyphicon-remove-sign" style="">
        //             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAA57GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMTBUMTQ6MzY6MjErMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0xMFQxNDo0Mjo0NyswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZWMzOWJmMzYtMmRjOS0wMDQwLWI3ZjktY2QxYTViZjBmZjIyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OGFlNTk3MjgtMTQ5YS0xMWU5LTliNTktOGI2NTYzNDFkMWM3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Yjk0ZmQ5ZTEtMjEzMi1mNDRlLWIyYTMtZDBhMWVhOTA1ZjEwPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmI5NGZkOWUxLTIxMzItZjQ0ZS1iMmEzLWQwYTFlYTkwNWYxMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0xMFQxNDozNjoyMSswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplYzM5YmYzNi0yZGM5LTAwNDAtYjdmOS1jZDFhNWJmMGZmMjI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMTBUMTQ6NDI6NDcrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pj4Iwe0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABQJJREFUeNpclEuIHEUYx/9V1TWz3dWzPbtm9jGzs7tJ1JgEEhOTQEjU7OID1Agq8RRBAgqCHnLJKYnxBXoRPagIggeNHgIKKoIgonnp5qEhqHm46+5mTHZmd57d0z0z3V1VHiYJmu/48fGrj49//QhuqbVrV4MQYHp6dmdPT3Jns+lvieN4jBACw2BXOOenLMv8SgjxNecc2ewwhDARRTEAgNwKTKedhwG8Va831t/oEUKgNQDom3Oc8/PptLNvw4Z13yWTCQRBC4SQ/wMJIQe01q8CAKV0zrbFR0JYx6IonldKgTE2GsfRvY2G95xSahwAcrnhgxs33v2alBJhGIL9B7YfwGvXtzw4ODjwpFL6mGVZ851Op6GUbphm4ooQ9rHe3tS7yWRC+n4w6XnNCc/zZD6fOxrHEmzz5o2Iomib7wefXmc/rbX+YGwsjyBoYWBgGYKgDUoJ+vr64Loeenp6MDY2etQ0e/6sVKq7mk1/Uin1fW+vUzCUUpBSHgaA3t7UIcbYESEsDA0NwvOayOdH4DgOCKGglKBcriCTyYBzjtWrVx1pNBqvlEpLL8/Ozh9OpVLjrFKpPNRs+i8CuLZixfLHh4YGMTw8hEqleuf8fGGvYRjzuVy2ZlkmlpbK2ULhnz3LlvXP2rbwGw0XjuP8WCwuPh/HMq+1/pk5jnOw1Wqv7+tzXqeUnvA8H1EUYWZm9jnf919ZWCjtzmRue0cpJX/55fSldruzy/eDOULIad8PYJomOp2O4fv+g1prRRhjF6SUd+XzuU3ptHM2kUhgfHwM9Xq9/+TJqS9brfZ9nPMLjNGw3e6sF0Kc27Jl4yNCWAtXry4gimI0Gu49hcI/ZzjnFwkAnxBY2exwlnO+oLXG6OgIMpllCMMQJ05MfV2r1R+7fuMfd+zYPsE5x+LiEv7+ew6MMURRPFwsFq8BJKCEdKMYxzGiKIKUCowZoJQiimJTKdV7I1pxHNvVat2hlCCZTN6AIY7jm3+EGoZR0BqglGYty0J/fxqWZaJYLN35ww9HLzca7n3ptPOt4/R+EQStTceP/zw3PT27ljEGIQQSCQ5KSVZrDYAUaDKZmOq+Lidt24bnNTE3N48zZ37bG0XRiG3b5+6/f9uj27dvfcqyzOMA0hcv/vXMtWtFUEqQStkIw2iyexIxxQYGMi3X9XaHYbhmcDDztm3bGBnJQgjxV6vVnt60acMLQliSc45UKvWx6zYvb926+fN02vE9rwkAKJWWjkgpU5Zl7mOjo/mZcrmyR0qZNwym161b+1O97kIpVeHcmMrnR+TCQhG+76O/vw9hGP5umqZ/6tRZFApXsbhYPiilfFwI68qaNXe9xO64YyUMg52u1ep7XNebkFJeIIT8US5XEMcSruuiULiKUmkJQRCAMYpyuYJSaQkAngbIe10b6Ueq1VqBrVp1O4aHhwqe58lm058sl6u7Wq2Wtm3xUxxL1Ot1JBI9iOMYQdAC5xyGYaBare0nhLzfDYneL6X6LAwjsJUrl4MxilwudzQIAuW63kS73Z5wXe9ZpWSKUgZAQ0qVJoSsbzb93dVq7RMp5RNdS+GA1njjprUeeGAHtNawLAvtdhvnz//xcK1WezMMo7tvcSW60eiWZZnnO53OPinVd/+dYytWjHdNSwiCIIBSmLEs80NK6a+UsiYAQ2vdA6DNGL1k2+IbIcxD4+Oje6vV+oyU8n/G/3cAFcF5BFWY41IAAAAASUVORK5CYII=" />
        //         </span>
        //     </div>
        // </div>`);

        // 크기 설정
        $ADD_image_container.css("max-width",ADD_config.chat_image_max_width+"px");
        if(arr[0] !== undefined && arr[0].width !== undefined && arr[0].height !== undefined){
            var width = arr[0].width,
                height = arr[0].height,
                max_ratio = Math.min(1.0, ADD_config.chat_image_max_width/width, ADD_config.chat_image_max_height/height),
                width_mod = width*max_ratio,
                height_mod = height*max_ratio;
            $ADD_image_container.find(".simple_image").css("width",width_mod+"px").css("height",height_mod+"px");
            ADD_DEBUG("width",width,"height",height,"max_ratio",max_ratio,width_mod,height_mod);
        }

        if(arr[0].views !== undefined && arr[0].views !== null && $.isNumeric(arr[0].views)){
            views = (arr[0].views >= 1000 ? (Number(arr[0].views) / 1000).toFixed(1) + "k" : ""+arr[0].views);
            views_style = "";
        }
        else{
            views = "";
            views_style = "display:none;";
        }
        $ADD_image_container.find(".viewers").attr("style",views_style).find("span").append(views);

        // 이미지가 하나를 초과한 경우 처리
        if(img_length > 1){
            var loop_length = img_length;
            var temp_text = img_length-1+"개의 이미지를 클릭하여 추가 로드";

            // 최대 5개 까지만 더 보여준다.
            if(img_length > ADD_CHAT_IMAGE_ADDITIONAL_LOAD_MAX+1){
                loop_length = ADD_CHAT_IMAGE_ADDITIONAL_LOAD_MAX+1;
                temp_text = (img_length-1)+"개 중 "+ADD_CHAT_IMAGE_ADDITIONAL_LOAD_MAX+"개의 이미지를 클릭하여 추가 로드";
            }

            // 추가 이미지 로드 위한 컨테이너 생성
            for(i=1;i<loop_length;i++){
                var iwidth_mod = "auto";
                var iheight_mod = "auto";
                if(arr[i] !== undefined && arr[i].width !== undefined && arr[i].height !== undefined){
                    var iwidth = arr[i].width,
                        iheight = arr[i].height,
                        imax_ratio = Math.min(1.0, ADD_config.chat_image_max_width/iwidth, ADD_config.chat_image_max_height/iheight);
                    iwidth_mod = iwidth*imax_ratio,
                    iheight_mod = iheight*imax_ratio;
                    ADD_DEBUG("width",iwidth,"height",iheight,"max_ratio",imax_ratio,iwidth_mod,iheight_mod);
                }

                if(arr[i].views !== undefined && arr[i].views !== null && $.isNumeric(arr[i].views)){
                    views = (arr[i].views >= 1000 ? (Number(arr[i].views) / 1000).toFixed(1) + "k" : ""+arr[i].views);
                    views_style = "";
                }
                else{
                    views = "";
                    views_style = "display:none;";
                }

                $ADD_image_container
                    .find(".imgur_more_images")
                    .append(`
                    <div class='ADD_tr'>
                        <div class='imgur_image_title'>`+(arr[i].title !== undefined && arr[i].title !== null ? "" + arr[i].title : "")+`</div>
                    </div>
                    <div class='imgur_more_image_div_container'>
                        <div class="viewers" style="`+views_style+`">
                            <span>👁 `+views+`</span>
                        </div>
                        <div class='imgur_more_image_div' imagehref="`+arr[i].link+`"
                        style='
                            max-width:`+ADD_config.chat_image_max_width+`px;
                            max-height:`+ADD_config.chat_image_max_height+`px;
                            width:`+iwidth_mod+`px;
                            height:`+iheight_mod+`px;'>
                        </div>
                    </div>
                    `);
            }

            // 추가 이미지 로드 위한 버튼 작동
            $ADD_image_container
                .find(".imgur_more_images_button")
                .css("opacity","1.0")
                .css("cursor","pointer")
                .html(temp_text)
                .one("click",function(){
                    // 버튼 클릭 시 작동
                    var temp_isChatScrollOn = isChatScrollOn();
                    var $imgur_more_images = $ADD_image_container.find("div.imgur_more_images");
                    $imgur_more_images.find(".imgur_more_image_div").each(function(){
                        var video_img_url = $(this).attr("imagehref");
                        // video 인지 image 인지 체크
                        if(isVideo(video_img_url)){
                            $(this).html("<video loop controls autoplay muted src=\""+$(this).attr("imagehref")+"\" class=\"imgur_image_in_chat open-lightbox\"></video>")
                                .find("video")
                                .on("load",function(){
                                    if( temp_isChatScrollOn ){
                                        ADD_DEBUG("Imgur 비디오 추가 로드 완료됨");
                                        goScrollDown();
                                    }
                                });
                        } else{
                            $(this).html("<img src=\""+$(this).attr("imagehref")+"\" class=\"imgur_image_in_chat open-lightbox\" style=\"\" />")
                                .find("img")
                                .on("load",function(){
                                    if( temp_isChatScrollOn ){
                                        ADD_DEBUG("Imgur 이미지 추가 로드 완료됨");
                                        goScrollDown();
                                    }
                                });
                        }
                    });
                    $imgur_more_images.show();
                    $(this).html("");
                });
        }

        // imgur safe screen 투명도 설정
        if((ADD_config.imgur_preview_safe && arr[0].type !== "youtube" && arr[0].type !== "twitch_clip")
            || (ADD_config.imgur_preview_safe &&
            ((ADD_config.chat_image_youtube_thumb && !ADD_config.chat_image_youtube_thumb_nonsafe && arr[0].type === "youtube") || 
            (ADD_config.chat_image_twitch_thumb && !ADD_config.chat_image_twitch_thumb_nonsafe && arr[0].type === "twitch_clip")))){
            var safe_screen_opacity = Number(ADD_config.imgur_preview_opacity);
            if(!$.isNumeric(ADD_config.imgur_preview_opacity) || safe_screen_opacity < 0 || safe_screen_opacity > 1){
                safe_screen_opacity = 0.93;
            }
            $ADD_image_container.find(".imgur_safe_screen").css("opacity",safe_screen_opacity).css("display","inline-flex");
            $ADD_image_container.find(".imgur_control_hide").css("display","inline-flex");
            $ADD_image_container.find(".imgur_safe_button").css("display","inline-block");
        }

        // 일단 스크롤 내리고, 스크롤 존재 여부 기억해놓기
        if(isChatScrollOn()){
            goScrollDown();
        }
        var temp_isChatScrollOn = isChatScrollOn();


        // 첫 번째 링크의 비디오 여부 체크
        ADD_DEBUG(arr, arr[0].html);
        if(arr[0].html !== undefined){
            newimg = $(arr[0].html);
            //$ADD_image_container.on("mouseover", function(e){
            //    e.stopPropagation();
            //});
        }
        else if(isVideo(arr[0].link)){
            var autoplay = "";
            if(ADD_config.chat_video_autoplay){
                autoplay = "autoplay";
            }
            newimg = $("<video type=\"video/mp4\" loop controls muted "+autoplay+" src=\""+arr[0].link+"\" class=\"imgur_image_in_chat open-lightbox\" style=\"max-width:"+ADD_config.chat_image_max_width+"px !important;max-height:"+ADD_config.chat_image_max_height+"px !important;\"></video>");
        }
        else{
            newimg = $(`
                <img src=`+arr[0].link+" class=\"imgur_image_in_chat open-lightbox\" style=\"cursor:pointer;max-width:"+ADD_config.chat_image_max_width+"px !important;max-height:"+ADD_config.chat_image_max_height+`px !important;" />
            `);
        }

        // 재생 버튼 추가
        if(arr[0].type === "youtube" ||  arr[0].type === "twitch_clip"){
            var $play_container = $(`
            <div class="play_container">
                <div class="play_button">
                </div>
            </div>
            `);
            $play_container.addClass("youtube").attr("image_type",arr[0].type).attr("image_id",arr[0].id);
            $play_container.hover(
                function(){
                    $(this).addClass("hover");
                },  function(){
                    $(this).removeClass("hover");
                }
            );
            $ADD_image_container.find("div.simple_image").append($play_container);
            $ADD_image_container.find(".open-lightbox").removeClass(".open-lightbox");

            // 재생버튼 동작
            $play_container.one("click", function(){
                var $play_iframe;
                if(arr[0].type === "youtube"){
                    $play_iframe = $(`
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/`+arr[0].id+`?rel=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    `);
                    $(this).closest("div").empty().append($play_iframe);
                }
                else if(arr[0].type === "twitch_clip"){
                    $play_iframe = $(`
                        <iframe src="https://clips.twitch.tv/embed?clip=`+arr[0].id+`&muted=false&autoplay=true" autoplay; frameborder="0" allowfullscreen="true" height="100%" width="100%"></iframe>
                    `);
                    $(this).closest("div.imgur_container").find("div.viewers").hide();
                    $(this).closest("div.simple_image").empty().append($play_iframe);
                }
            });
        }

        // 이미지 로드 완료 여부 체크
        var temp_func = function(){
            // 이미지 컨테이너 삽입
            $line.append($ADD_image_container);

            // 실제 이미지 삽입
            $line.find("div.simple_image").append(newimg);
            if( temp_isChatScrollOn ){
                ADD_DEBUG("이미지 로드 완료됨");
                goScrollDown();
            }
        };

        if(arr[0].html !== undefined || isVideo(arr[0].link)){
            temp_func();
        }
        else{
            if (newimg.complete !== undefined && newimg.complete) {
                temp_func();
            }
            // 이미지 로드 미 완료 시, 로드 끝날 때 까지 기다림
            else {
                $(newimg).one("load", function() {
                    temp_func();
                });
            }
        }

        // 이미지 로드 회수 기록
        ADD_status_cookie_add_data("auto_image");
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 채팅 div.line element 제어
    unsafeWindow.chatlog_local = {};
    async function chatElemControl($line, documentElem, iframeElems){
        $line.addClass("fired");

        // latest_chat 에 해당하는 경우 제외함
        if($line.closest("div.latest_chat_content").length !== 0){
            return;
        }

        // 스크롤 여부 기억
        var temp_isChatScrollOn = isChatScrollOn();
        var myLine = false;

        // 시스템 엘리먼트의 경우
        if($line.hasClass("system")){
            //ADD_DEBUG("SYSTEM ELEMENT 캐치됨 : ", $line.text());

            // 서버 연결 끊긴 경우
            if( $line.html().indexOf("서버 연결 끊김") != -1 ){
                ADD_DEBUG("채팅 중지 됨!!!");
                if(ADD_config.chat_auto_reload){
                    if(ADD_unique_window_reload_counter > ADD_UNIQUE_WINDOW_RELOAD_MAX){
                        $line.addClass("ADD_chat_again").prop("title", "Dosteam+ System Message").css("cursor","pointer").html("채팅 갱신 횟수가 초과되었습니다. 채팅을 다시 시작하려면 클릭");
                    }
                }
                else{
                    $line.addClass("ADD_chat_again").prop("title", "Dosteam+ System Message").css("cursor","pointer").html("채팅 중지 됨. 채팅을 다시 시작하려면 클릭");
                }
            }

            if( $line.html().indexOf("연결 시도") != -1 || $line.html().indexOf("연결 완료") != -1 ){
                $line.remove();
            }
            return true;
        }

        // 나 자신인지 확인
        if($line.hasClass("myLine")){
            myLine = true;
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

        if(ADD_config.chat_unicode_err_replace){
            $content.html($content.html().replace(/�/g," "));
        }

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

        var admin_pass = false;
        if($content.css("font-weight") == 700){
            admin_pass = true;
            ADD_DEBUG("PASS");
            if (ADD_config.chat_sword){
                $nick.prepend(`
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAXlJREFUOBFjFNmR9p+BCoCJCmaAjWAh1aBJOvEMkdJWcG2iO9PBbJJcVKbsi2II3DQgg2iDooCuKFXxQdaLwibKIEdhLYZerRgUjSDO8qfH4GIEw0iHV4ZhnkE6AwsTM1wTiNF9ZwtD193NcDG8BklzCDEsN8pl4GHhgGv48+8vQ/G1JQzLkFwDksTwWq1qIIMshzADHwsnwwrjXAYJDgG4IV/+/GCIOjcFwxCQAhQXsTIyMyTK2TMESpoyPP3xnkGDRwpuyIsfHxgiz01muPL5CVwMmYHiot///zJsfHGWQZZTmMFCUAWu7saXZwweJztxGgJSiGIQSKDh5loQBQcn3t9h8D7ZBXThO7gYNgaK1zo1IxkCJExQ1EkBwwgUXp/+fEcRR+fAXVQDDOQkOQcGITYehne/vjAo7y1gmPVwHwMXMztDjIwNuj4MPtxFP//9hktueHEG7ILqGysZQJgYADeo++4WsHp2JlaGltvridGLooZx0JVHAJAXZtm+dA7iAAAAAElFTkSuQmCC" style="width:16px;height:16px;margin-right:-1px;" />
                `);
            }
        }

        // 채팅 차단
        // Case 1: 금지단어로 차단하는 경우
        if(ADD_config.chat_block && !admin_pass){
            // Case 1-1 채팅 내용 기반
            if(await ADD_chatBlock($line, false, nick, content, createdDate, false, ADD_config.chat_block_contents, ADD_config.chat_block_noti)) return false;
            // Case 1-2 닉네임 기반
            if(await ADD_chatBlock($line, false, nick, content, createdDate, ADD_config.chat_block_nickname, false, ADD_config.chat_block_noti)) return false;
        }
        // Case 2: 채팅 매니저로 차단하는 경우
        if(chat_manager !== undefined && !admin_pass){
            var isBlock = chat_manager.getIsBlock(nick);
            if(isBlock){
                var isShowDelMsg = chat_manager.getIsShowDelMsg(nick);
                if(await ADD_chatBlock($line, true, nick, content, createdDate, false, false, isShowDelMsg)) return false;
            }
        }

        // 광고 차단하기
        if(ADD_config.chat_adb && !admin_pass){
            /* // 현재 광고가 없으므로 주석처리한다.
            if( $('span:first', $line).html().replace(/\s/g,'') == '[광고]' )
            {
                ADD_DEBUG('광고 메시지 감지됨!',content);
                $line.remove();
                ADD_status_cookie_add_data('ad_remove');
            }
            */
        }

        // 과거 채팅 비교 및 기록하기
        if( ADD_config.chat_dobae_block && !myLine && (!ADD_config.chat_dobae_onlylink || ADD_config.chat_dobae_onlylink && $content.find("a").length > 0)){
            var new_createdDate = Number(createdDate);
            var last_similar_content = "";
            var last_similar;
            var similar;
            var dobae_repeat = 0;

            if(chatlog_local[nick] === undefined){
                // 초기화
                chatlog_local[nick] = {};
                chatlog_local[nick].value = [];
            }
            else{
                // 검색
                var old_arr = chatlog_local[nick].value;
                for(var ind=old_arr.length-1; ind>=0; ind--){
                    var old_createdDate = old_arr[ind].createdDate;
                    
                    // 시간제한 확인
                    if( new_createdDate - old_createdDate > ADD_config.chat_dobae_timelimit * 1000 ){
                        // console.log("지우기 전" + JSON.stringify(chatlog_local[nick].value));
                        // console.log("지울 개수", ind+1);
                        old_arr.splice(0,ind+1);
                        chatlog_local[nick].value = old_arr;
                        // console.log("지운 후" + JSON.stringify(chatlog_local[nick].value));
                        break;
                    }
                    var old_content = old_arr[ind].content;
                    
                    // 도배 여부 판단
                    similar = diceCoefficient(old_content, content);
                    if(similar >= ADD_config.chat_dobae_judge){
                        dobae_repeat = dobae_repeat + 1;
                        last_similar_content = old_content;
                        last_similar = similar;
                    }
                }
            }

            // 새 값 추가
            if(chatlog_local[nick].value.length >= ADD_config.chat_dobae_repeat + 10){
                chatlog_local[nick].value.shift();
            }
            chatlog_local[nick].value.push({content:content, createdDate:new_createdDate});

            // 도배인 경우
            if(dobae_repeat + 1 >= ADD_config.chat_dobae_repeat){
                // 로그에 기록
                if(ADD_config.chat_dobae_block_record){
                    var ADD_Blocked_Chat = await ADD_GetVal("ADD_Blocked_Chat", []);
                    if(ADD_Blocked_Chat.length >= ADD_config.chat_block_log_limit){
                        ADD_Blocked_Chat.shift();
                    }
                    var chat_block_log_letter_limit = ADD_config.chat_block_log_letter_limit;
                    if($.isNumeric(chat_block_log_letter_limit) || chat_block_log_letter_limit < 0){
                        chat_block_log_letter_limit = 40;
                    }
                    ADD_Blocked_Chat.push({"created":Number(createdDate), "nick":nick, "content":"[도배] "+content.substr(0,chat_block_log_letter_limit)});
                    await ADD_SetVal("ADD_Blocked_Chat", ADD_Blocked_Chat);
                }
                ADD_DEBUG("도배 차단됨, ["+last_similar_content+"], ["+content+"] :"+last_similar);

                $line.remove();
                if(ADD_config.chat_dobae_block_autoban){
                    ADD_send_sys_msg("[도배 유저 자동 차단] 닉네임: "+nick +"<br />마지막 채팅: "+content);
                    chat_manager.simpleBlock(nick,content);
                }

                return;
            }
        }

        // 메모 달기 및 닉네임 색깔 적용하기
        if((chat_manager !== undefined && ADD_config.chat_memo) && !ADD_config.broadcaster_mode){
            var memo_index = chat_manager.indexFromData(nick);

            if(memo_index !== -1){
                var temp_obj = chat_manager.getData(memo_index);
                var temp_display_name = temp_obj.display_name;
                var temp_color = temp_obj.color;

                // 색깔 적용하기
                if(temp_color !== undefined && temp_color !== null && temp_color !== ""){   //  && temp_color.toLowerCase().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i
                    $line.find("span.nick").addClass("colorized").css("color",temp_color);
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
                    $line.find("span.nick").after("<span class=\"conversation_memo\" style=\"color:red;font-weight:700;vertical-align:inherit;display:-webkit-inline-box\"> "+ temp_text +"</span>");
                    if( temp_isChatScrollOn ){
                        goScrollDown();
                    }
                }
            }

            // 수정한 날짜 업데이트
            chat_manager.updateModifiedDate(nick);
        }

        // 닉네임 색상화
        if(ADD_config.chat_nick_colorize || ADD_config.broadcaster_mode){
            if(!$line.find("span.nick").hasClass("colorized")){
                var temp_color2 = Colors.random(nick);
                if(ADD_config.broadcaster_mode && temp_color2.name.indexOf("blue") !== -1){
                    temp_color2.rgb = "pink";
                    temp_color2.name = temp_color2.name+"_pink_replaced";
                }
                $line.find("span.nick").addClass("colorized").css("color",temp_color2.rgb).attr("colorzied",temp_color2.name);
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
            },0);
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
                    $aElem.addClass("topClick");
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

                    var $temp_array = ch_streamer_id.split("&");
                    for (var j=0; j<$temp_array.length; j++){
                        if(j !== 0){
                            ch_text = ch_text+"&";
                        }
                        var temp_id = ADD_streamer_nick($temp_array[j]).toUpperCase();
                        ch_text = ch_text+temp_id;
                    }

                    if(ch_text.toLowerCase() !== ch_streamer_id.toLowerCase()){
                        $aElem.after(" <span class=\"keyword_pass\" style=\"color:#000;font-weight:700;vertical-align:top;\">["+ch_text+"]</span>");
                    }

                    // 스크롤 내리기
                    if( temp_isChatScrollOn ){
                        goScrollDown();
                    }
                }

            });
        }

        // 방송 용 닉
        if(ADD_config.broadcaster_mode){
            var nick_for_broadcaster = (ADD_config.broadcater_theme === "twitch" ? $nick.html() : $nick.html().replace(":",""));
            if(ADD_config.broadcaster_nick_hide){
                nick_for_broadcaster = nick_for_broadcaster.substring(0,4)+"****"+(ADD_config.broadcater_theme === "twitch" ? ":" : "");
            }
            $nick.html(nick_for_broadcaster);
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
                chatImageDOEfromLinks($line, documentElem, iframeElems, ADD_chat_images);
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

                        var $temp_arr = [];
                        var temp_img_obj = {type:"youtube", id:youtube_id, link: data.thumbnail_url, title: "[Youtube] "+data.title+" - "+data.author_name, "width":data.thumbnail_width, "height":data.thumbnail_height};
                        $temp_arr.push(temp_img_obj);
                        ADD_DEBUG(temp_img_obj);
                        chatImageDOEfromLinks($line, documentElem, iframeElems, $temp_arr);
                });
            }
        }
        /* eslint-enable */


        // gfy 이미지 로부터 찾기
        if(!image_found && ADD_config.chat_image_preview && !ADD_config.broadcaster_mode && ADD_config.gfycat_preview && hrefs.length !== 0 && ADD_chat_images.length === 0){
            ADD_DEBUG(hrefs[0].match(/(?:http:|https:|)(?:\/\/|)(?:gfycat\.com\/(?:\w*\/)*)(\w+$)/));
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
                                <div style='position:relative; width:`+width_mod+`px;
                                    height:`+height_mod+`px;'>
                                    <iframe src='https://gfycat.com/ifr/` + gfy_name + gfy_autoplay + `' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe>
                                </div>
                            `;
                            var title = response.gfyItem.title + " - " + response.gfyItem.userDisplayName;

                            var $temp_arr = [];
                            var temp_img_obj = {link: "", title: title, html:gfy_html, width:width_mod, height:height_mod, views:response.gfyItem.views};
                            $temp_arr.push(temp_img_obj);
                            ADD_DEBUG(temp_img_obj);
                            chatImageDOEfromLinks($line, documentElem, iframeElems, $temp_arr);

                            // GC
                            response = null;
                        },
                        error:function(error){
                            ADD_DEBUG("Gfycat API - Request failed", error);
                            var gfy_html = `
                                <div style='position:relative; padding-bottom:calc(56.25% + 44px); margin-top:3px;'>
                                    <iframe src='https://gfycat.com/ifr/` + gfycat_id + `' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe>
                                </div>
                            `;

                            var $temp_arr = [];
                            var temp_img_obj = {"link": "", "title": "", "html":gfy_html};
                            $temp_arr.push(temp_img_obj);
                            ADD_DEBUG(temp_img_obj);
                            chatImageDOEfromLinks($line, documentElem, iframeElems, $temp_arr);
                        }
                    });
                }
            }

        }

        // twitch clip 섬네일 으로 부터 찾기(앞에서 링크는 찾았는데, 이미지 링크는 못 찾은 경우)
        if(!image_found && ADD_config.chat_image_preview && !ADD_config.broadcaster_mode && ADD_config.chat_image_twitch_thumb && hrefs.length !== 0 && ADD_chat_images.length === 0){
            if(hrefs[0].match(/(\.twitch\.tv\/\w*\/clip\/|clips\.twitch\.tv\/(embed\?clip=)?)([a-zA-Z]*)/)){
                var twitch_thumb_match = hrefs[0].match(/(\.twitch\.tv\/\w*\/clip\/|clips\.twitch\.tv\/(embed\?clip=)?)([a-zA-Z]*)/);

                if(twitch_thumb_match){
                    image_found = true;
                    var twitch_thumb_id = twitch_thumb_match.pop();
                    ADD_DEBUG("Twitch Clip API 호출 - id:", twitch_thumb_id);
                    $.ajax({
                        url:"https://api.twitch.tv/kraken/clips/"+twitch_thumb_id,
                        type: "GET",
                        headers: {"Client-ID": ADD_CLIENT_ID_TWITCH, "Accept":"application/vnd.twitchtv.v5+json"},

                        // API CALL SUCCESS
                        success:function(response){
                            ADD_DEBUG("Twitch Clip API 호출 완료", response);
                            var image_url = response.thumbnails.medium;
                            var title = response.title + " - " + response.broadcaster.display_name;

                            var $temp_arr = [];
                            var temp_img_obj = {type:"twitch_clip", id:twitch_thumb_id, link: image_url, title: "[Twitch] "+title, width:480, height:272, views:response.views};
                            $temp_arr.push(temp_img_obj);
                            chatImageDOEfromLinks($line, documentElem, iframeElems, $temp_arr);

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
                getImgurData($line, documentElem, iframeElems, ADD_imgur_id, ADD_imgur_type);
            }
        }

        // 향상된 자동스크롤
        if(ADD_config.chat_scroll){
            // var scroll_height_check = documentElem.find(".content").prop("scrollHeight") - (documentElem.find(".content").scrollTop()+documentElem.find(".content").height());
            // if(temp_isChatScrollOn && scroll_height_check < 100.0){
            //     // 100픽셀보다 덜 차이날 경우 스크롤을 강제로 내린다;
            //     goScrollDown();
            // }
            goScrollDown();
        }

        //if(true){   // 개수 초과된 채팅 지우기 && 스크롤이 정지 상태 이면...    (UCHAT 기본값: 300)
        //$(document).find("div.line:lt(-300)")
        //}   // 

        chatting_arrive_check = true;
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 좌표 보내기 버튼 DOE 생성하기 위한 함수
    function ADD_send_location_DOE(){
        ADD_DEBUG("ADD_config.send_location_button", ADD_config.send_location_button);
        if(!ADD_config.send_location_button && $GLOBAL_IFRAME_DOCUMENT !== undefined && $GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").length !== 0){
            $GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_button").off("click");
            $GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").remove();
            return false;
        }

        // 채팅창 존재 여부 확인, 좌표 보내기 버튼 이미 존재하는지 확인
        if($GLOBAL_IFRAME_DOCUMENT !== undefined && $GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").length === 0 ){
            // 채팅창 생성
            var $ADD_send_location_button_elem = $(`
                <div id="ADD_send_location_container"><!--width:20px;height:20px;font-size:20px-->
                    <span id="ADD_send_location_notice"></span>
                    <!--<span aria-label="현재 주소를 채팅 입력란에 복사" data-microtip-position="top-left" role="tooltip">-->
                        <span id="ADD_send_location_button"><!--class="glyphicon glyphicon-send">-->
                            <img title="좌표" style="opacity:0.5;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAA7pmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTktMDEtMDhUMTY6NDI6MjgrMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wMS0wOFQxNjo1NDowMyswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTktMDEtMDhUMTY6NTQ6MDMrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MmY4MzI3ZTMtNzgzMS1jZTRmLWJkZmItZTY5NDJiNzc4ZTQ5PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OGRiMjM2YzQtMTMxYS0xMWU5LTlkYTItZWYzMGRkNDIzNmUwPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NDY4NmJiNDYtNzJlYy0wMDRjLWE0ZmUtYmVlNTg0ODNiYTQxPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjQ2ODZiYjQ2LTcyZWMtMDA0Yy1hNGZlLWJlZTU4NDgzYmE0MTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0wMS0wOFQxNjo0MjoyOCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5YmVjNjgyOS0yYjY5LTRlNDctYmU4OS0xMTIwZjg3Yzg0YWM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDEtMDhUMTY6NTQ6MDMrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MmY4MzI3ZTMtNzgzMS1jZTRmLWJkZmItZTY5NDJiNzc4ZTQ5PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE5LTAxLTA4VDE2OjU0OjAzKzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjI1PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjI1PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4mNu0LAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAYaSURBVHjajJZZUJVXEsd7HqbyNvNs1czD1FRqMpPFJcYFUEgUIiIY5F5AvCwCGlbZLxd0cGQPImBkUYNLQGKiiUomSsioE8BiADGyaLjiZQdlEQQiCpHc3zwczOVOpabSVae+qj7d/T+n+3+6P8HUIZiMQq9JaKoTTuQJxVlCRYlQdkQoSFnHvt0ZJAZcQ+/fTcz2MeJ0vSQH3yA7IY+cxA2U5grHMqWzrl7Kn/DnqhGWt08jt6eRS/2zIlYgjbXCmWLhZL5w0OCF3v8uYe4QtAl87MHTBrztLMv3HQhzh8RAE/FaD+PV2iXRj5jK6zZ/cnXMLEdNs5LTNrUIpOe+cLdFKC/6PfG6y4RsBd3boF0DkRrIjIWSTDhdAEczISsW9mjVvmYl44lB5LaNzsUMwOE+6kq7ZqWw4wcp7pheAOn8XpicEGqq/kCkdpDAd5VztDdcLIPRB/yijA3DpTIIWM/HF2oImYUPeyD81gzab0evhzZMHD90Z+pVoaNVGHkgtDS9RKT2Ib7vKICSDHgyza+SmXG+H5pCPwThN6dxqx5kZd0zVtfOzqS0P31ZMLYL/d1CWtRVttspgHOl1kEGe+HLCji8H7LjoSAFKsuhv/tnkyPVjWyoHOC1rx/zl1YIrbo/8VXzPakzjYoCOVPsiu9C/o9lWwNUFEGAE7y3Aja/Ci6vq6/bCgh2hKoz6IsrkCVvknL+Ouc7hkkt/pwn4Z4/cjzFg/ZGEaovCIkBfXjbQpQXmM0WgEPJ4LYMNGsgcBOkRkKuAdL2QIQbhDtj2OyK/NWZuIJTyuenSQh+GzxWQLzfOJfPi3DuxCp2ucC2t6D6CwvA+ROw5Q1F3ZQQuPud9Q0fdGLQ+iD2geidnOGbs5a9misqK7tc4GS+k5D/9yx87CHKE57OKKPRB+C/URkmB1vfbkEMpV8gb3mh1+2EcBcI2ggPB9Xm0ycQqYUd9pAVVy6khNTisRpykywRvqwAt+Ww0wkGLMXFeAs+P0bSB0XIH9eiP10Jwz0QsRVcl8EnJdap9rKFxJ2tqh6aNXAi12KQtxec/6aY9ELaGpjxeBO9vT3yihPxqXmWvYwY2PI6fJBg0Z09CtrVoPfrExL8htGusT5FerRiUGGqRVeaQYfjUsTLgPc6R6aKMhl7Ns/kczNzR7MXDhVrsa8sZ3bbKszxfmNCYkA3mtVwctHJcpOUU06iRXezhudb3qBt00omXFYwdOkzmh/P8h/TAM17YzE6r+ThgVhmZud4DjwqO8ptV1s6I3TDwr7dNWjWqBS9kAunFXWDnGFkyKJvuA4Ho6G+GjMwB4x3mej1debOlrU05aTR+GiGtoER2g8k0uLuwJ3oQKOQvy+b7esg1gfm5hbo2Qc6B8WuAxH/v6XkGcDbBnQOPOu6x4gZOoz3adnlSes2B7rS9BeFUwVred8VPFbBvy9bnMs+BNelsH2dKmj3PevgvZ3qYXrbKWYtIs7ThloaXGy5qXVksOSQp3DtKyHO9yGeNpDgax0oLQq2LldzZLcrZMVBcbpi3ftuSu+2HP4RDvPzP7uZDTsZdLflfoRudqSq8jfCrXrhVIEG/42gWQ3lhdZAJZmww0HVaMtScHlNdQK3ZaobFKbCTxYAPvtIxfF1gGNZBnpNIrQ0Ce3NQvKuenasB+1auHLOGqjzjhpWmbGqf2XGKDYaW63t/nVR3c5nPej9u+kyCqYOEVoahf4e4Wbd7whzn8Rvgyp42RF4/uOvmyfz8+qdedqokRy82UxT7Z/4YVro6RSh+57QZRSmJ4X6a68QunWCwHdV5zUEwLdXYGLsl4M/fgR1X0NSkEpR0CYIcZvj2j9tmJsTBnuFgZ5FIEP9ahQXZywhwe8G4dvUqbwWRkDeXvj0mOprnx6H/H1K722n/gUiNRChuU1J5sv0mIThB8JgzwJIl1GtwT7h1g2h9JBQVijsD91DlGc3Ye6qUfos1OvF8rYDf0cIfQ+ivAZJ3ZNEYbrwUa7Q1iwMDy26yWKQ7+qFonShvEg4aBDSo4XCNA+Sg8uI190mTjdEzPZx4nRDJPi1sT/sLDl6H9Kjf8vh/UJxuvL/H5D/DgCCYVJ6ZqFEVAAAAABJRU5ErkJggg==" />
                        </span>
                    <!--</span>-->
                </div>`);
            $GLOBAL_IFRAME_DOCUMENT.find(".contentWrap").after($ADD_send_location_button_elem);
            $GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_button").on("click", function(){
                ADD_DEBUG("Send location", location.href);
                var text = "";
                var $chatInput = $GLOBAL_IFRAME_DOCUMENT.find(".chatInput");
                if(ADD_config.send_location_existing){
                    text = $chatInput.html() + " " + parent.window.location.href;
                }
                else{
                    text = parent.window.location.href;
                }
                //
                $chatInput.focus().html(text);

                if(ADD_config.send_location_immediately && is_send_location){
                    is_send_location = false;
                    $ADD_send_location_button_elem.hide();

                    var rooms = GLOBAL_CHAT_IFRAME.contentWindow.rooms;
                    var roomid = Object.keys(rooms)[0];
                    var room = rooms[roomid].room;
                    var style =  {
                        bold: room.setting.data["style.bold"]   // true or false
                        , italic: room.setting.data["style.italic"]    // true or false
                        , underline: room.setting.data["style.underline"]   // true or false
                        , color: $(".chatInput", rooms[room.id].layout).css("color")   // "rgb(51,51,51)"
                    };
                    room.action.send(text, style);

                    // 쿨타임
                    setTimeout(function(){
                        is_send_location = true;
                        $ADD_send_location_button_elem.fadeIn("fast");
                    }, SEND_LOCATION_EVENT_MIN_TIME*1000);
                }
            });
        }
        else{
            ADD_DEBUG("채팅창이 존재하지 않아 ADD_send_location_DOE 함수에서 좌표보내기 버튼을 생성하지 못함");
        }

        if($GLOBAL_IFRAME_DOCUMENT !== undefined && $GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").length !== 0){
            if(ADD_config.send_location_button_top){
                $GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").addClass("send_location_button_top");
            }
            else{
                $GLOBAL_IFRAME_DOCUMENT.find("#ADD_send_location_container").removeClass("send_location_button_top");
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    // 채팅창에서 문자열 탐지, 이벤트 bind, API 함수 호출 동작 실행
    var GLOBAL_CHAT_CONTENT_DIV = undefined;
    var GLOBAL_CHAT_IFRAME = undefined;
    var $GLOBAL_CHAT_IFRAME = undefined;
    var $GLOBAL_IFRAME_DOCUMENT = undefined;
    async function ADD_chatting_arrive(){
        ADD_DEBUG("ADD_chatting_arrive 함수 실행됨. ADD_config.chat_ctr: " + ADD_config.chat_ctr + " , chatting_arrive_check: "+chatting_arrive_check);
        // 기존에 꺼져있는 경우
        if(!chatting_arrive_check || chatting_arrive_check === null){
            // True 이면 켠다.
            if (ADD_config.chat_ctr){
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
            if(!ADD_config.chat_ctr){
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
        if(chatting_arrive_check && ADD_config.chat_ctr){

            // (no src) iframe 생길 때 event
            $(document).arrive("u-chat > iframe", {existing: true}, async iframeElems => {
                GLOBAL_CHAT_IFRAME = iframeElems;
                $GLOBAL_CHAT_IFRAME = $(iframeElems);
                $GLOBAL_IFRAME_DOCUMENT = $GLOBAL_CHAT_IFRAME.contents().first();

                chatDoeEvntFunc($GLOBAL_IFRAME_DOCUMENT);

                // 채팅창 생성될 때 노티하기
                $GLOBAL_IFRAME_DOCUMENT.one("DOMNodeInserted", "div.content", async function (){
                    // 채팅 엘리먼트 저장
                    GLOBAL_CHAT_CONTENT_DIV = $(this);

                    // head에 CSS 추가
                    broadcaster_theme_css();

                    // 테마 적용
                    ADD_theme();

                    if($GLOBAL_IFRAME_DOCUMENT.find("#ADD_chat_css").length === 0){
                        $GLOBAL_IFRAME_DOCUMENT.find("head").append(`
                            <style id="ADD_chat_css" type="text/css">
                            #ADD_send_location_container {
                                position: absolute;
                                bottom: 10px;
                                right: 10px;
                                width: 25px;
                                height: 25px;
                                cursor: pointer;
                                z-index:100000;
                            }
                            #ADD_send_location_container.send_location_button_top{
                                top: 10px;
                                bottom: unset;
                            }

                            .black .myLine{
                                background:unset;
                            }
                            .imgur_container{
                                line-height:100%;
                                position:relative;
                            }
                            .imgur_container .imgur_safe_screen{
                                z-index:1000;
                                align-items:center;
                                position:absolute;
                                top:31px;
                                left:0;
                                text-align:center;
                                vertical-align:middle;
                                width:100%;
                                height:calc(100% - 62px);
                                background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJElEQVQImWPo6ur6D8MMDAz/GZA5XV1dEAEYB8pGcLq6uv4DAKP8I1nj691jAAAAAElFTkSuQmCC) repeat;
                            }
                            .imgur_container .imgur_safe_screen .imgur_safe_button{
                                border-radius: 5px;
                                padding: 10px 15px;
                                background: rgba(255,255,255,1);
                                border: 1px solid #666;
                                opacity: 1.0;
                                line-height: 150%;
                                margin: 0 auto;
                                text-align: center;
                                vertical-align: middle;
                                cursor: pointer;
                                color: #19171c;
                                font-size: 14px;
                                font-family: "Lucida Console", Monaco, monospace, Impact, "Malgun Gothic",sans-serif;
                                box-shadow: 3px 4px 10px 1px rgba(0, 0, 0, 0.35);
                            }
                            .imgur_container .ADD_tr{
                                border-top-left-radius: 5px;
                                border-top-right-radius: 5px;
                                margin: 5px 0 0 0;
                            }
                            .imgur_container .ADD_tr, .imgur_container .ADD_br{
                                display: flex;
                                justify-content: space-between;
                                box-sizing: border-box;
                                padding: 7px;
                                height:31px;
                            }
                            .imgur_container .ADD_tr img, .imgur_container .ADD_br img{
                                width:17px;
                                height:17px;
                            }
                            .imgur_container .imgur_image_title{
                                width:100%;
                                min-width:0;
                                padding:1px 5px;
                                display:inline-block;
                                align-self:center;
                                color:#000;
                                font-size: 12px;
                                font-weight:700;
                                text-align:left;
                                margin-right:10px;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                                overflow:hidden;
                                line-height:130%;
                                cursor:default;
                            }
                            .imgur_container .imgur_image_title:hover{
                                text-overflow: unset;
                                white-space: unset;
                                z-index: 100000;
                                background-color: #9e9e9e;
                                border-radius: 5px;
                                align-self: baseline;
                                padding: 1px 12px 10px 12px;
                                width: 100%;
                                box-sizing: border-box;
                                position: absolute;
                                top: 7px;
                                left: 0;
                                min-height:23px;
                            }
                            .imgur_container .imgur_control_hide, .imgur_container .imgur_control_remove{
                                display: inline-flex;
                                cursor: pointer;
                                text-align: center;
                            }
                            .imgur_container .imgur_control_remove{
                                margin-left:7px;
                            }
                            .imgur_container .ADD_tr, .imgur_container .ADD_br,
                            .imgur_container .simple_image,
                            .imgur_container .simple_image_container,
                            .imgur_container .imgur_more_image_div,
                            .imgur_container .imgur_more_image_div_container{
                                background-color:#9e9e9e;
                            }
                            .imgur_container .imgur_more_image_div{
                                margin:0 auto;
                            }
                            .imgur_container .simple_image_container, .imgur_container .imgur_more_image_div_container{
                                width:100%;
                            }
                            .imgur_container .simple_image{
                                margin:0 auto;
                            }
                            .imgur_container .simple_image_container,
                            .imgur_container .imgur_more_image_div_container{
                                position:relative;
                                margin:0 auto;
                            }
                            .imgur_container .viewers{
                                z-index: 1100;
                                line-height: 1.42857143;
                                font-size: 12px;
                                padding: 1px 4px;
                                background: #000;
                                display: inline-block;
                                position: absolute;
                                top: 0px;
                                right: 0px;
                                color: #fff;
                            }
                            .imgur_container .imgur_more_images_button{
                                width:100%;
                                min-width:0;
                                padding-left:5px;
                                display:inline-block;
                                align-self:center;
                                color:#000;
                                font-size: 12px;
                                font-weight:700;
                                text-align:center;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                                overflow:hidden;
                            }
                            .imgur_container .simple_image video, .imgur_container .imgur_more_images video,
                            .imgur_container .simple_image img, .imgur_container .imgur_more_images img{
                                width:100%;
                                height:100%;
                                z-index:100;
                                cursor:pointer;
                                margin:0 auto;
                                display:inline-block;
                            }
                            .imgur_container .imgur_more_images .ADD_tr{
                                position:relative;
                            }
                            .imgur_container .play_container{
                                width: 100%;
                                height: 100%;
                                display: flex;
                                position: absolute;
                                align-items: center;
                                justify-content: center;
                            }
                            .imgur_container .play_container.hover .play_button{
                                display:block;
                                cursor:pointer;
                            }
                            .imgur_container .play_container .play_button{
                                display:none;
                                width:100%;
                                height:100%;
                                background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABaCAYAAAA/xl1SAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjBEQjEyRDJFQzRCMTFFNkFEQjVENzAwNDkwOUQ4MDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjBEQjEyRDNFQzRCMTFFNkFEQjVENzAwNDkwOUQ4MDYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMERCMTJEMEVDNEIxMUU2QURCNUQ3MDA0OTA5RDgwNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMERCMTJEMUVDNEIxMUU2QURCNUQ3MDA0OTA5RDgwNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgmImiEAAAs1SURBVHja7J1/aBXZFcfvzHsxL3G3xthdY1xjXtJUYaGSlQj+wO2mtpZSCsZGrGJMNwhV0T+0GtH8ZxSNSsBALIgbiT+gTSNSloX9Y9fGBgMqu2ugIHXzw7jGuK4xippo3rzp3DBX7js5d968JK55M+fAZX7kzr3z8j7ve++5c+4dzTRNRkb2pkynfwEZAUhGAJKREYBkBCAZGQFIRgCSkRGAZAQgGRkBSEYAkpERgGQEIBnZRFrQCx9C0zRX+dxG/mhuC0zQzHGGHsHb8kIkU9Dvv8A4sGkuz8VwoTqH1WX6PB4uSNChYGkuYXMLrYnAOQpKP8IY9Dl4mgNw2jhhlKHTpC08NwpGP4HoFwCdwIPQuTnnFkATUT0TlK1URT+AGPQZfBh42hiOYXmmQvlMF8eOIHodwqDP4MOgEud05LwquVU+pxSVwHN0XLwMYdBn8MkA6gh4OrKV8zg1yZjCRe39qHQM4RP7UT9CGPQhfPGAg/u6SyV0UjqRdAf4dHAO6xeaBGDygegEnzgOSOcCAD45QTXEFEtWPSwZmAcsXaerICQFTC71U8HnBB22DSDAxlPAqNTcGnYS8OnSMQOwmYhSMsXQDQGYRIbBJytbwEWCZagAlPt5Bki6pICG9EMRMBoSfLqiX0gKmGTqB5NK5YJ2ko8hgAHEIWGI42EgAEbAviaBKMNsMPXgt+dU0OteMHQwAgrFE7ClSCAGEQgDimYYNr8GAl/A3kaQH4mB3D9UQfKCkww8Bvp/0LvFwFNtRV4d9AkhMKakfhEJvmHQ7GsARAixDtTQZPigNwGYBEMv0POFiiYgm2LvizQFUcQRiDZv3py/ePHi3EAgMAKKYRjRtra27hMnTnRIChiREr/2JQAQ6z/K+xrijKienCTvl+aF8U370amTt6uCToYPS6+APHfu3K+KiooKw+Hw+8FgMAW7j0gkMtzV1fXfa9eufb1+/fovbOUT6aUiCYUUWwNJ0LkZgdET353HAMScDdjcxgMvVaSQZadPn165evXqNSroVMZhbG5u/kd5efnnQ5ZZp15IKR6IstMijx/GDHITgJMTQD2B5laGjm9D9n6osrLyF7t27frzjBkzZsH6uru7v+/o6HgQtWxEci3Lz89/Jzc3912Y9+HDh/eOHDnScPjw4XbrUIA4ZEMnwzgMQIQqCB/nEYCTGEBdMcQSBOAJ+ELSNu348ePLt23bthlC19jY+PWpU6e6enp6hrD7yMnJCVVUVITLysoKIYx1dXUntm/fftnaHQQgQkUcBv1HAyghATgJAYT9v4DC05UdjFQppQn46uvrf2k5GX8RZT9//nzo4MGDXx44cOB/idzTvn37fr53797i9PT0kDhnOSl/27Jly78lCAeRplnuN8KmWO4PeoJALwKIqV8KUL9USfFCNoBpFjQfVFdX7xHl9vb29peWlv7rypUrA2O5ryVLlmQ0NTX9ITs7O1Ocq6qqOmTB/JUNnwBxCIEQ9gmhChKAkwxArP+HwTcFg89K6f39/UenT5+excu8e/fuD5bX23Tv3r0X47m3WbNmpVpecens2bN/yo8fPXrUl5mZ+VcurgoIXzpAGNMP9AKAXpwXDMcAmUIV5b4hH2ZZKeB7+vTp4Jo1az4dL3zceBm8LF4mP+Z18LrAGCN89Kcj9z6WaQEE4BuGUDUuqAOnJGXt2rV/EhfX1NS0jLXZxYyXxcsUx3ZdKQBC+JQFPm3RvPhFeV0BMc941DPhs2fPrtB1feSpUFdXV9/+/ftvqgrPyMgI3rx584+HDh16P5Gb4mXysu1hm+D58+d/w/BAh3iBsARgkiqhcoxwxYoVH4kLzpw5c8OpwHA4nDZv3rz3Kisrf93T07O+pKQky+3NNDQ0fCP2i4uLP2TO4V7Mq9B5FUDNhRKOUsOsrKy0mTNnzuUXDA8PR2pra2+5rXDOnDnvNDc3r21tbf1tYWHh2/Hy19XVfcvr4Pu8Tl63S9XT4nxWAjAJm+URGNetW5crMlmK9mBgYCCSaOFLly6d39bWVmYp3CLeRKvy8bKtZvh7cVxWVpaXAHSkgEmqiE7TMbWFCxfmiAs6Ozt/GGtlqampKeXl5Us6Ojo27ty582eqfLdv334o9hcsWPCeA3iqucgEYBI1w3HzTps27S1JoYbGewOZmZlvHz169PfcUZk/f/5URAVf1SHVrb2mz0gA+tXy8vKyli9fPoP+E87mtYhoM9G8jx8/fioNsYQm4iauX7/+7datWy9fvXr1CTKM86oOue7X9BlJAScBjKr1WUbSjRs3vhMXzJ07d1yKdefOnQcbN278Z1FR0acYfLAOu+6YECuH+6Y+YJLDiK5a0NjY2CkyhcPhd528WJXxiJna2tovc3JyzlnlfafKx8vmdYhju+6ow/2RF5zEza+bpTKifX19g/fv37/NL0hJSQlaTWee2woNyy5evPhVQUFBw44dO9rj5edl8zr4Pq+T181Gr5zgBkaTAEwu5WPMYdJ4S0vLf8QFFRUVHzgV+OTJk0g0GjXb29u7i4uLz65atepyb2+vq6AFuWy7TqeIZ+YHJfRiOBYWCyiHYono51dhWKFQ6K1nz559Ip4HV1VVfeYUgJqfn5/W0dExmMg98gDV6urq3/F9C+DI1KlTPx4aGuJOiByWJYfry8GpWEwghWMlSXMMlUWetzsSb2eB8KKpqenv4oI9e/Z8tGjRop+oCk8UPh6YyssUx7wuXieLDb+HEc/yDDjPOiJ+DUiNmQPCE1dBqymt+TECUrOzs3fb6icHpGLqRwGpSdrfY3H6ffKkn2FbBYeOHTt2WlzIgeHgOClhPOPXyvBx43XY0zSHmfMEJNgfZF7sF3qxCcbG/OD8Whk+oTgvrH7fN3zikAzhpUuX1lVWVhYkehP8Gn6tDB8vm9fB8ND7ePOAPdkM07RMZFpmfX39h/LMOG48mJTHCrqZlrlhw4YF4XA4Jk7QnhHXwmhapi8AnJCJ6bt37/44MzNzVMApnyN869at+4ZhjPzzAoGAVlBQMBObmN7f399XU1PzCU1M9w+ATktzqOYIo0tzZGRkpJ88eXJlSUlJqRiicWt8qOXChQtNmzZt+nxgYOA5c16aA5sLTEtzJCGAjNHiRATgGwYQW/VetUhRkCW+PFvA6h/mLVu2LI+vCWOrXbS1tbXT6ud1OnjaLxEgI4gTEkH6fOhTEgJwcgGINcO6ojnGmmSnBSqDTL1MLxzyMRTetmprODgcUP1ivGJ6XevkHoaRVxaNSufEgo8GyC+rjDxmCFdHdbtEL1wlFSqioYBOvgdsWMlT5uU1omWwdGk8EObB3tchN6NBhi+x67RKvgpCuGA5XHgIOhtR5vGABC9GRGPL18rv3zAQSGVwRBMt1C/CJu41DdjQitsm15OD0X55T4i84rwOml/TBgxTsNfxohpsazLnQARGCpjcKqgx/A1EOmh6hQLKoL6OV3Vh0EUBwIz54FGc1xVQBSEDjonstJhs9Ku85IWC3L4tEwsDMxXDKm7gIwVMQhVUQagBhZNVEzbXUPUm6nWtpiIPCh8f9JOGmwjAJIZQ7hfKQzQ6GLb5MV5YzRwcjRj4SAG9CaEpQRVVKBx2zMC+qfCszTEcM7/A5xcv2HQABXsDkcacX3idSL0mUqfq3Kgfidfh89MwjBlHsTSHvGNdIMhUbOP9zRfg+Q3AmC9WWlXfVAzdaGxiX43qBKEvwfMlgNgXjcCIqSBD+n1uhn6czvkWOt8DGA8ABZRxYRpLXX43jf4nZG/SaH1AMgKQjAAkIyMAyQhAMjICkIwAJCMjAMkIQDIyApCMACQjIwDJCEAysgm1/wswAKKXtPVbc6NeAAAAAElFTkSuQmCC);
                                background-repeat:no-repeat;
                                background-position:center center;
                            }
                            .chatContent a.autokeyword, .chatContent a.autokeyword:link{
                                z-index:1;
                                color:#000;
                                font-family:dotum;
                                position:relative
                            }
                            .chatContent a.autokeyword:after, .chatContent a.autokeyword:after{
                                opacity: 0.33;
                                z-index: -100;
                                height: calc(100% + 6px);
                                width: calc(100% + 4px);
                                content: " ";
                                position: absolute;
                                bottom: -3px;
                                right: -2px;
                                border-radius: 7px;
                                background-color: powderblue;
                            }
                            </style>
                            `);
                    }
                    
                    // 버전 체크
                    await checkNewVersion();

                    // 채팅 매니저 초기화
                    chat_manager.init($GLOBAL_IFRAME_DOCUMENT);

                    // 좌표 보내기 버튼 생성
                    ADD_send_location_DOE();

                    // 향상된 자동스크롤 위해서 최신 채팅 엘리먼트 숨기기
                    if(ADD_config.chat_scroll){
                        var $latest_chat = $GLOBAL_IFRAME_DOCUMENT.find("div.latest_chat");
                        $latest_chat.css("margin",0).css("padding",0).css("height","0").css("border","0").css("overflow","hidden");
                    }

                    // 자동 새로고침 DOE 생성
                    ADD_chat_auto_reload.DOE();
                });


                // 마우스 오버 시 이미지 뜨는 것 막기
                $GLOBAL_IFRAME_DOCUMENT.on("DOMNodeInserted", "div#popupWrap", function (){
                    if(ADD_config.chat_image_preview && ADD_config.chat_image_mouseover_prevent){
                        var $imgElems = $(this).find("img");
                        if($imgElems.length == 1 && $imgElems.parent().css("width") == "200px"){
                            $imgElems.parent().remove();
                        }
                    }
                });

                // 이미지 mouseover 시 팝업 대신
                //$iframeDocument.on("DOMNodeInserted", "div#popupWrap", function (){

                //});

                // 채팅 라인 생성될 때 함수적용
                $GLOBAL_IFRAME_DOCUMENT.on("DOMNodeInserted", "div.line", function (){
                    var $line = $(this);
                    if(!($line.hasClass("fired"))){
                        chatElemControl($line, $GLOBAL_IFRAME_DOCUMENT, iframeElems);
                    
                        $line.on("click", function(){
                            ADD_DEBUG("타노스!");
                        });
                    }
                });

                // 유저목록 생성될 때 함수적용
                $GLOBAL_IFRAME_DOCUMENT.on("DOMNodeInserted", "div.userFloor", function (){
                    var $userFloor = $(this);
                    setTimeout(function(){
                        if(!($userFloor.hasClass("fired"))){
                            $userFloor.addClass("fired");
                            var list_nick = $userFloor.attr("nick");
                            if(chat_manager !== undefined && ADD_config.chat_memo){
                                var memo_index = chat_manager.indexFromData(list_nick);
                    
                                if(memo_index !== -1){
                                    var temp_obj = chat_manager.getData(memo_index);
                                    var temp_display_name = temp_obj.display_name;
                    
                                    // 메모 달기
                                    var temp_text;
                                    if(temp_display_name !== undefined){
                                        if(temp_display_name === ""){
                                            temp_text = "*";
                                        }
                                        else{
                                            temp_text = "["+[temp_display_name]+"]";
                                        }
                                        $userFloor.append("<span class=\"conversation_memo\" style=\"color:red;font-weight:700;vertical-align:inherit;display:-webkit-inline-box\">&nbsp"+ temp_text +"</span>");
                                    }
                                }
                            }
                        }
                    },1);
                });

                // 채팅창에 있는 두스 링크 클릭 시 이벤트
                $GLOBAL_IFRAME_DOCUMENT.on("click",".topClick",function(e){
                    e.preventDefault();
                    parent.window.location.href = this.href;
                });

                // 채팅창 닉네임 클릭 시 "메모하기" 버튼 생성하기
                $GLOBAL_IFRAME_DOCUMENT.on("click", "span.nick, div.nick", function (){
                    if(!ADD_config.chat_memo){
                        $GLOBAL_IFRAME_DOCUMENT.find("#do_memo").remove();
                        $GLOBAL_IFRAME_DOCUMENT.find("#memo_isSavedMemo").hide();
                        return;
                    }
                    var $this = $(this);

                    // 창 위치 재설정하기
                    var $content = $GLOBAL_IFRAME_DOCUMENT.find("div.content").first();
                    var offsetHeight = $content[0].offsetHeight;
                    var $popupWrap = $GLOBAL_IFRAME_DOCUMENT.find("#popupWrap");
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
                        detail_content = $this.closest("div.line").find("span.chatContent").text().substr(0, 40);
                    }
                    var temp_obj = {"nick":nick,"detail_content":detail_content};
                    var $memo_button = $("<div id=\"do_memo\" class=\"floor\" style=\"color:red;font-weight:700;\">메모하기</div>");
                    $GLOBAL_IFRAME_DOCUMENT.find(".usermenu_popup").first().append($memo_button);
                    $memo_button.on("click",async function(){
                        await chat_manager.openSimpleDOE(temp_obj);
                    });
                });

                //////////////////////////////////////////////////////////////////////////////////
                // imgur click event
                $GLOBAL_IFRAME_DOCUMENT.on("click", ".imgur_safe_button", function(){
                    $(this).parent(".imgur_safe_screen").addClass("clicked").fadeOut(300);
                });
                $GLOBAL_IFRAME_DOCUMENT.on("click", ".imgur_control_hide", function(){
                    ADD_DEBUG("Chatting 내 호출된 imgur 이미지 에서 - 버튼 클릭됨");
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
                });
                $GLOBAL_IFRAME_DOCUMENT.on("click", ".imgur_control_remove", function(){
                    ADD_DEBUG("Chatting 내 호출된 imgur 이미지 에서 x 버튼 클릭됨");
                    $(this).closest(".imgur_container").remove();
                });

                // 스크롤바 관련 이벤트 - 향상된 자동 스크롤
                if(ADD_config.chat_scroll){
                    ADD_DEBUG("CHAT - Scroll 이벤트 ON");
                    $GLOBAL_IFRAME_DOCUMENT.on("wheel.chatScrollFunc mousewheel.chatScrollFunc", "div.content", function(event) {//div.wrap div.contentWrap
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
                                var roomid = "";
                                if(iframeElems.contentWindow !== undefined &&
                                    iframeElems.contentWindow.rooms !== undefined){
                                    if(iframeElems.contentWindow.rooms["dostest"] !== undefined){
                                        roomid = "dostest";
                                    }
                                    else if(iframeElems.contentWindow.rooms["dostream"] !== undefined){
                                        roomid = "dostream";
                                    }
                                    else{
                                        roomid = Object.keys(iframeElems.contentWindow.rooms)[0];
                                    }
                                }

                                if(roomid !== undefined && roomid !== "" && roomid !== null){
                                    iframeElems.contentWindow.rooms[roomid].room.setting.data["option.autoScroll"] = 0;
                                    iframeElems.contentWindow.rooms[roomid].room.log.temp_scroll_stop = 0;

                                    // 대체 latest_chat 생성
                                    if($GLOBAL_IFRAME_DOCUMENT.find(".latest_chat_new_container").length === 0){
                                        var $latest_chat_new = $(`
                                        <div class="latest_chat_new_container" style="display:none;">
                                            <div class="latest_chat_new" style="background:rgba(0,0,0,.75);bottom:30px;color:#faf9fa;padding:5px;height:28px;font-size:12px;position:fixed;justify-content:center;align-items:center;text-align:center;width:100%;box-sizing:border-box;z-index:1000;cursor:pointer;border-radius:4px;">
                                                <span>아래에서 더 많은 메시지를 확인하세요.</span>
                                            </div>
                                        </div>
                                        `);
                                        $GLOBAL_IFRAME_DOCUMENT.find("div.wrap").first().append($latest_chat_new);
                                        $latest_chat_new.on("click", function(){
                                            isGoScrollDown = true;
                                            goScrollDown();
                                            $(this).hide();
                                        });
                                    }

                                    $GLOBAL_IFRAME_DOCUMENT.find(".latest_chat_new_container").stop("true","true").show();
                                    isGoScrollDown = false;
                                    $GLOBAL_IFRAME_DOCUMENT.find(".latest_chat").stop("true","true").show();
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
                            if(isChatScrollOn()){
                                isGoScrollDown = true;
                                $GLOBAL_IFRAME_DOCUMENT.find(".latest_chat_new_container").stop("true","true").hide();
                            }

                            var scrollHeight = $(this)[0].scrollHeight;
                            var scrollTop = $(this)[0].scrollTop;
                            var height = $(this).height();

                            if(scrollHeight - scrollTop - height <= ADD_config.chat_scroll_down_min){
                                isGoScrollDown = true;
                                goScrollDown();
                                $GLOBAL_IFRAME_DOCUMENT.find(".latest_chat_new_container").stop("true","true").hide();
                            }
                        }
                    });
                }


            });


        } // else 끝
    } // ADD_chatting_arrive 함수 끝

    function broadcaster_theme_css(){
        // 방송 모드 종료 시
        if(GM_page === C_UCHAT && !ADD_config.broadcaster_mode && $GLOBAL_IFRAME_DOCUMENT !== undefined && $GLOBAL_IFRAME_DOCUMENT.find("#ADD_broadcaster_mode_css").length !== 0){
            $GLOBAL_IFRAME_DOCUMENT.find("#ADD_broadcaster_mode_css").remove();
            ADD_theme();
            return false;
        }

        // 방송 모드 시작 시
        if(GM_page === C_UCHAT && ADD_config.broadcaster_mode && $GLOBAL_IFRAME_DOCUMENT !== undefined){
            ADD_theme("default");
            if($GLOBAL_IFRAME_DOCUMENT.find("#ADD_broadcaster_mode_css").length !== 0){
                $GLOBAL_IFRAME_DOCUMENT.find("#ADD_broadcaster_mode_css").remove();
            }
            var temp_theme_txt = "";
            ADD_DEBUG("broadcaster theme:",ADD_config.broadcater_theme);
            if(ADD_config.broadcater_theme === "box"){
                temp_theme_txt = `
                div.line {
                    background:linear-gradient(rgba(70, 70, 70, .6), rgba(50, 50, 50, .7));
                    text-shadow:0 0 1px rgba(0, 0, 0, .6), 0 0 2px rgba(0, 0, 0, .6);
                    box-shadow:0 0 4px rgba(0, 0, 0, .4);
                    margin:0.3em 10px;
                    padding:0.3em 0.5em !important;
                    border-radius:0.3em;
                    animation:flipInX .5s ease, fadeOutUp 1s ease 15s forwards;
                }
                span.nick{
                    font-size:0.8em !important;
                }
                span.chatContent {
                    display:block;
                    color:#fff !important;
                }
                `;
            }
            else if(ADD_config.broadcater_theme === "twitch"){
                temp_theme_txt = `
                div.line {
                    animation: fadeOut 1s ease 15s forwards !important;
                    text-shadow: 0 0 1px #666, 1px 1px 0 #000 !important;
                }
                span.chatContent {
                    font-weight:400 !important;
                    color: #fafafa !important;
                }
                `;
            }
            else{
                temp_theme_txt = `
                div.line {
                    animation: fadeOut 1s ease 15s forwards !important;
                    text-shadow: 0 0 1px #666, 1px 1px 0 #000 !important;
                }
                span.chatContent {
                    font-weight:400 !important;
                    display:block;
                    color: #fafafa !important;
                }
                `;
            }
            $GLOBAL_IFRAME_DOCUMENT.find("head").append(`
                <style id="ADD_broadcaster_mode_css" type="text/css">
                @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,900');
                *, div.line, .chatContent, span.nick {
                    font-family: 'Noto Sans KR', serif !important;
                    font-size:calc(24px * `+ADD_config.broadcaster_font_size+`) !important;
                }
                body { font-family: 'Noto Sans KR', serif !important; font-weight:400 !important;}
                .nano > .nano-content{
                    padding:0.5em 0;
                }
                p.tooltip.hidden{
                    display:none;
                }
                div.top.black, .nano-pane, .nano-slider{/* 상단바, 스크롤바 숨기기 */
                    display:none;
                    background:unset !important;
                    box-shadow:unset;
                }
                div.middle.black{
                    height:calc(100% - 28px) !important;
                    background-color:`+ADD_config.broadcaster_bg_color+` !important; /* 중앙부 배경색 */
                }
                div.nano-pane, div.bottom.black{/* 하단 그림자, 배경 숨기기 */
                    background:unset !important;
                    box-shadow:unset;
                }

                /* 두드온 호환 */
                div.latest_chat_new, div.latest_chat_new span, div.chatInput {
                    font-size:12px !important;
                }
                div#ADD_send_location_container {
                    display:none !important;
                }
                .animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated.infinite{-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.animated.hinge{-webkit-animation-duration:2s;animation-duration:2s}.animated.bounceIn,.animated.bounceOut,.animated.flipOutX,.animated.flipOutY{-webkit-animation-duration:.75s;animation-duration:.75s}@-webkit-keyframes bounce{0%,20%,53%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1);-webkit-transform:translateZ(0);transform:translateZ(0)}40%,43%{-webkit-transform:translate3d(0,-30px,0);transform:translate3d(0,-30px,0)}40%,43%,70%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06)}70%{-webkit-transform:translate3d(0,-15px,0);transform:translate3d(0,-15px,0)}90%{-webkit-transform:translate3d(0,-4px,0);transform:translate3d(0,-4px,0)}}@keyframes bounce{0%,20%,53%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1);-webkit-transform:translateZ(0);transform:translateZ(0)}40%,43%{-webkit-transform:translate3d(0,-30px,0);transform:translate3d(0,-30px,0)}40%,43%,70%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06)}70%{-webkit-transform:translate3d(0,-15px,0);transform:translate3d(0,-15px,0)}90%{-webkit-transform:translate3d(0,-4px,0);transform:translate3d(0,-4px,0)}}.bounce{-webkit-animation-name:bounce;animation-name:bounce;-webkit-transform-origin:center bottom;transform-origin:center bottom}@-webkit-keyframes flash{0%,50%,to{opacity:1}25%,75%{opacity:0}}@keyframes flash{0%,50%,to{opacity:1}25%,75%{opacity:0}}.flash{-webkit-animation-name:flash;animation-name:flash}@-webkit-keyframes pulse{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes pulse{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.pulse{-webkit-animation-name:pulse;animation-name:pulse}@-webkit-keyframes rubberBand{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}30%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}40%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,.85,1);transform:scale3d(1.15,.85,1)}65%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes rubberBand{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}30%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}40%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,.85,1);transform:scale3d(1.15,.85,1)}65%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.rubberBand{-webkit-animation-name:rubberBand;animation-name:rubberBand}@-webkit-keyframes shake{0%,to{-webkit-transform:translateZ(0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}@keyframes shake{0%,to{-webkit-transform:translateZ(0);transform:translateZ(0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}.shake{-webkit-animation-name:shake;animation-name:shake}@-webkit-keyframes headShake{0%{-webkit-transform:translateX(0);transform:translateX(0)}6.5%{-webkit-transform:translateX(-6px) rotateY(-9deg);transform:translateX(-6px) rotateY(-9deg)}18.5%{-webkit-transform:translateX(5px) rotateY(7deg);transform:translateX(5px) rotateY(7deg)}31.5%{-webkit-transform:translateX(-3px) rotateY(-5deg);transform:translateX(-3px) rotateY(-5deg)}43.5%{-webkit-transform:translateX(2px) rotateY(3deg);transform:translateX(2px) rotateY(3deg)}50%{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes headShake{0%{-webkit-transform:translateX(0);transform:translateX(0)}6.5%{-webkit-transform:translateX(-6px) rotateY(-9deg);transform:translateX(-6px) rotateY(-9deg)}18.5%{-webkit-transform:translateX(5px) rotateY(7deg);transform:translateX(5px) rotateY(7deg)}31.5%{-webkit-transform:translateX(-3px) rotateY(-5deg);transform:translateX(-3px) rotateY(-5deg)}43.5%{-webkit-transform:translateX(2px) rotateY(3deg);transform:translateX(2px) rotateY(3deg)}50%{-webkit-transform:translateX(0);transform:translateX(0)}}.headShake{-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-name:headShake;animation-name:headShake}@-webkit-keyframes swing{20%{-webkit-transform:rotate(15deg);transform:rotate(15deg)}40%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}60%{-webkit-transform:rotate(5deg);transform:rotate(5deg)}80%{-webkit-transform:rotate(-5deg);transform:rotate(-5deg)}to{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}@keyframes swing{20%{-webkit-transform:rotate(15deg);transform:rotate(15deg)}40%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}60%{-webkit-transform:rotate(5deg);transform:rotate(5deg)}80%{-webkit-transform:rotate(-5deg);transform:rotate(-5deg)}to{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}.swing{-webkit-transform-origin:top center;transform-origin:top center;-webkit-animation-name:swing;animation-name:swing}@-webkit-keyframes tada{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}10%,20%{-webkit-transform:scale3d(.9,.9,.9) rotate(-3deg);transform:scale3d(.9,.9,.9) rotate(-3deg)}30%,50%,70%,90%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate(3deg);transform:scale3d(1.1,1.1,1.1) rotate(3deg)}40%,60%,80%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate(-3deg);transform:scale3d(1.1,1.1,1.1) rotate(-3deg)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes tada{0%{-webkit-transform:scaleX(1);transform:scaleX(1)}10%,20%{-webkit-transform:scale3d(.9,.9,.9) rotate(-3deg);transform:scale3d(.9,.9,.9) rotate(-3deg)}30%,50%,70%,90%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate(3deg);transform:scale3d(1.1,1.1,1.1) rotate(3deg)}40%,60%,80%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate(-3deg);transform:scale3d(1.1,1.1,1.1) rotate(-3deg)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.tada{-webkit-animation-name:tada;animation-name:tada}@-webkit-keyframes wobble{0%{-webkit-transform:none;transform:none}15%{-webkit-transform:translate3d(-25%,0,0) rotate(-5deg);transform:translate3d(-25%,0,0) rotate(-5deg)}30%{-webkit-transform:translate3d(20%,0,0) rotate(3deg);transform:translate3d(20%,0,0) rotate(3deg)}45%{-webkit-transform:translate3d(-15%,0,0) rotate(-3deg);transform:translate3d(-15%,0,0) rotate(-3deg)}60%{-webkit-transform:translate3d(10%,0,0) rotate(2deg);transform:translate3d(10%,0,0) rotate(2deg)}75%{-webkit-transform:translate3d(-5%,0,0) rotate(-1deg);transform:translate3d(-5%,0,0) rotate(-1deg)}to{-webkit-transform:none;transform:none}}@keyframes wobble{0%{-webkit-transform:none;transform:none}15%{-webkit-transform:translate3d(-25%,0,0) rotate(-5deg);transform:translate3d(-25%,0,0) rotate(-5deg)}30%{-webkit-transform:translate3d(20%,0,0) rotate(3deg);transform:translate3d(20%,0,0) rotate(3deg)}45%{-webkit-transform:translate3d(-15%,0,0) rotate(-3deg);transform:translate3d(-15%,0,0) rotate(-3deg)}60%{-webkit-transform:translate3d(10%,0,0) rotate(2deg);transform:translate3d(10%,0,0) rotate(2deg)}75%{-webkit-transform:translate3d(-5%,0,0) rotate(-1deg);transform:translate3d(-5%,0,0) rotate(-1deg)}to{-webkit-transform:none;transform:none}}.wobble{-webkit-animation-name:wobble;animation-name:wobble}@-webkit-keyframes jello{0%,11.1%,to{-webkit-transform:none;transform:none}22.2%{-webkit-transform:skewX(-12.5deg) skewY(-12.5deg);transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{-webkit-transform:skewX(6.25deg) skewY(6.25deg);transform:skewX(6.25deg) skewY(6.25deg)}44.4%{-webkit-transform:skewX(-3.125deg) skewY(-3.125deg);transform:skewX(-3.125deg) skewY(-3.125deg)}55.5%{-webkit-transform:skewX(1.5625deg) skewY(1.5625deg);transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{-webkit-transform:skewX(-.78125deg) skewY(-.78125deg);transform:skewX(-.78125deg) skewY(-.78125deg)}77.7%{-webkit-transform:skewX(.390625deg) skewY(.390625deg);transform:skewX(.390625deg) skewY(.390625deg)}88.8%{-webkit-transform:skewX(-.1953125deg) skewY(-.1953125deg);transform:skewX(-.1953125deg) skewY(-.1953125deg)}}@keyframes jello{0%,11.1%,to{-webkit-transform:none;transform:none}22.2%{-webkit-transform:skewX(-12.5deg) skewY(-12.5deg);transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{-webkit-transform:skewX(6.25deg) skewY(6.25deg);transform:skewX(6.25deg) skewY(6.25deg)}44.4%{-webkit-transform:skewX(-3.125deg) skewY(-3.125deg);transform:skewX(-3.125deg) skewY(-3.125deg)}55.5%{-webkit-transform:skewX(1.5625deg) skewY(1.5625deg);transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{-webkit-transform:skewX(-.78125deg) skewY(-.78125deg);transform:skewX(-.78125deg) skewY(-.78125deg)}77.7%{-webkit-transform:skewX(.390625deg) skewY(.390625deg);transform:skewX(.390625deg) skewY(.390625deg)}88.8%{-webkit-transform:skewX(-.1953125deg) skewY(-.1953125deg);transform:skewX(-.1953125deg) skewY(-.1953125deg)}}.jello{-webkit-animation-name:jello;animation-name:jello;-webkit-transform-origin:center;transform-origin:center}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(.97,.97,.97);transform:scale3d(.97,.97,.97)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(.97,.97,.97);transform:scale3d(.97,.97,.97)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}.bounceIn{-webkit-animation-name:bounceIn;animation-name:bounceIn}@-webkit-keyframes bounceInDown{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:none;transform:none}}@keyframes bounceInDown{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:none;transform:none}}.bounceInDown{-webkit-animation-name:bounceInDown;animation-name:bounceInDown}@-webkit-keyframes bounceInLeft{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{-webkit-transform:none;transform:none}}@keyframes bounceInLeft{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{-webkit-transform:none;transform:none}}.bounceInLeft{-webkit-animation-name:bounceInLeft;animation-name:bounceInLeft}@-webkit-keyframes bounceInRight{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(3000px,0,0);transform:translate3d(3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0);transform:translate3d(-25px,0,0)}75%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}90%{-webkit-transform:translate3d(-5px,0,0);transform:translate3d(-5px,0,0)}to{-webkit-transform:none;transform:none}}@keyframes bounceInRight{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(3000px,0,0);transform:translate3d(3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0);transform:translate3d(-25px,0,0)}75%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}90%{-webkit-transform:translate3d(-5px,0,0);transform:translate3d(-5px,0,0)}to{-webkit-transform:none;transform:none}}.bounceInRight{-webkit-animation-name:bounceInRight;animation-name:bounceInRight}@-webkit-keyframes bounceInUp{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,3000px,0);transform:translate3d(0,3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}75%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}90%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes bounceInUp{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,3000px,0);transform:translate3d(0,3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}75%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}90%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.bounceInUp{-webkit-animation-name:bounceInUp;animation-name:bounceInUp}@-webkit-keyframes bounceOut{20%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}to{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}}@keyframes bounceOut{20%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}to{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}}.bounceOut{-webkit-animation-name:bounceOut;animation-name:bounceOut}@-webkit-keyframes bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}@keyframes bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}.bounceOutDown{-webkit-animation-name:bounceOutDown;animation-name:bounceOutDown}@-webkit-keyframes bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0);transform:translate3d(20px,0,0)}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}@keyframes bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0);transform:translate3d(20px,0,0)}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}.bounceOutLeft{-webkit-animation-name:bounceOutLeft;animation-name:bounceOutLeft}@-webkit-keyframes bounceOutRight{20%{opacity:1;-webkit-transform:translate3d(-20px,0,0);transform:translate3d(-20px,0,0)}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}@keyframes bounceOutRight{20%{opacity:1;-webkit-transform:translate3d(-20px,0,0);transform:translate3d(-20px,0,0)}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}.bounceOutRight{-webkit-animation-name:bounceOutRight;animation-name:bounceOutRight}@-webkit-keyframes bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}@keyframes bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}.bounceOutUp{-webkit-animation-name:bounceOutUp;animation-name:bounceOutUp}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn}@-webkit-keyframes fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInDown{-webkit-animation-name:fadeInDown;animation-name:fadeInDown}@-webkit-keyframes fadeInDownBig{0%{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInDownBig{0%{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInDownBig{-webkit-animation-name:fadeInDownBig;animation-name:fadeInDownBig}@-webkit-keyframes fadeInLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInLeft{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInLeft{-webkit-animation-name:fadeInLeft;animation-name:fadeInLeft}@-webkit-keyframes fadeInLeftBig{0%{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInLeftBig{0%{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInLeftBig{-webkit-animation-name:fadeInLeftBig;animation-name:fadeInLeftBig}@-webkit-keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInRight{-webkit-animation-name:fadeInRight;animation-name:fadeInRight}@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInRightBig{-webkit-animation-name:fadeInRightBig;animation-name:fadeInRightBig}@-webkit-keyframes fadeInUp{0%{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUp{0%{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInUp{-webkit-animation-name:fadeInUp;animation-name:fadeInUp}@-webkit-keyframes fadeInUpBig{0%{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUpBig{0%{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}to{opacity:1;-webkit-transform:none;transform:none}}.fadeInUpBig{-webkit-animation-name:fadeInUpBig;animation-name:fadeInUpBig}@-webkit-keyframes fadeOut{0%{opacity:1}to{opacity:0}}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.fadeOut{-webkit-animation-name:fadeOut;animation-name:fadeOut}@-webkit-keyframes fadeOutDown{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes fadeOutDown{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.fadeOutDown{-webkit-animation-name:fadeOutDown;animation-name:fadeOutDown}@-webkit-keyframes fadeOutDownBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}@keyframes fadeOutDownBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}.fadeOutDownBig{-webkit-animation-name:fadeOutDownBig;animation-name:fadeOutDownBig}@-webkit-keyframes fadeOutLeft{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}@keyframes fadeOutLeft{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}.fadeOutLeft{-webkit-animation-name:fadeOutLeft;animation-name:fadeOutLeft}@-webkit-keyframes fadeOutLeftBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}@keyframes fadeOutLeftBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}.fadeOutLeftBig{-webkit-animation-name:fadeOutLeftBig;animation-name:fadeOutLeftBig}@-webkit-keyframes fadeOutRight{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@keyframes fadeOutRight{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}.fadeOutRight{-webkit-animation-name:fadeOutRight;animation-name:fadeOutRight}@-webkit-keyframes fadeOutRightBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}@keyframes fadeOutRightBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}.fadeOutRightBig{-webkit-animation-name:fadeOutRightBig;animation-name:fadeOutRightBig}@-webkit-keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes fadeOutUp{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}.fadeOutUp{-webkit-animation-name:fadeOutUp;animation-name:fadeOutUp}@-webkit-keyframes fadeOutUpBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}@keyframes fadeOutUpBig{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}.fadeOutUpBig{-webkit-animation-name:fadeOutUpBig;animation-name:fadeOutUpBig}@-webkit-keyframes flip{0%{-webkit-transform:perspective(400px) rotateY(-1turn);transform:perspective(400px) rotateY(-1turn)}0%,40%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}40%{-webkit-transform:perspective(400px) translateZ(150px) rotateY(-190deg);transform:perspective(400px) translateZ(150px) rotateY(-190deg)}50%{-webkit-transform:perspective(400px) translateZ(150px) rotateY(-170deg);transform:perspective(400px) translateZ(150px) rotateY(-170deg)}50%,80%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}80%{-webkit-transform:perspective(400px) scale3d(.95,.95,.95);transform:perspective(400px) scale3d(.95,.95,.95)}to{-webkit-transform:perspective(400px);transform:perspective(400px);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}@keyframes flip{0%{-webkit-transform:perspective(400px) rotateY(-1turn);transform:perspective(400px) rotateY(-1turn)}0%,40%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}40%{-webkit-transform:perspective(400px) translateZ(150px) rotateY(-190deg);transform:perspective(400px) translateZ(150px) rotateY(-190deg)}50%{-webkit-transform:perspective(400px) translateZ(150px) rotateY(-170deg);transform:perspective(400px) translateZ(150px) rotateY(-170deg)}50%,80%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}80%{-webkit-transform:perspective(400px) scale3d(.95,.95,.95);transform:perspective(400px) scale3d(.95,.95,.95)}to{-webkit-transform:perspective(400px);transform:perspective(400px);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}.animated.flip{-webkit-backface-visibility:visible;backface-visibility:visible;-webkit-animation-name:flip;animation-name:flip}@-webkit-keyframes flipInX{0%{-webkit-transform:perspective(400px) rotateX(90deg);transform:perspective(400px) rotateX(90deg);opacity:0}0%,40%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}40%{-webkit-transform:perspective(400px) rotateX(-20deg);transform:perspective(400px) rotateX(-20deg)}60%{-webkit-transform:perspective(400px) rotateX(10deg);transform:perspective(400px) rotateX(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotateX(-5deg);transform:perspective(400px) rotateX(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}@keyframes flipInX{0%{-webkit-transform:perspective(400px) rotateX(90deg);transform:perspective(400px) rotateX(90deg);opacity:0}0%,40%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}40%{-webkit-transform:perspective(400px) rotateX(-20deg);transform:perspective(400px) rotateX(-20deg)}60%{-webkit-transform:perspective(400px) rotateX(10deg);transform:perspective(400px) rotateX(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotateX(-5deg);transform:perspective(400px) rotateX(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}.flipInX{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipInX;animation-name:flipInX}@-webkit-keyframes flipInY{0%{-webkit-transform:perspective(400px) rotateY(90deg);transform:perspective(400px) rotateY(90deg);opacity:0}0%,40%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}40%{-webkit-transform:perspective(400px) rotateY(-20deg);transform:perspective(400px) rotateY(-20deg)}60%{-webkit-transform:perspective(400px) rotateY(10deg);transform:perspective(400px) rotateY(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotateY(-5deg);transform:perspective(400px) rotateY(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}@keyframes flipInY{0%{-webkit-transform:perspective(400px) rotateY(90deg);transform:perspective(400px) rotateY(90deg);opacity:0}0%,40%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}40%{-webkit-transform:perspective(400px) rotateY(-20deg);transform:perspective(400px) rotateY(-20deg)}60%{-webkit-transform:perspective(400px) rotateY(10deg);transform:perspective(400px) rotateY(10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotateY(-5deg);transform:perspective(400px) rotateY(-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}.flipInY{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipInY;animation-name:flipInY}@-webkit-keyframes flipOutX{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotateX(-20deg);transform:perspective(400px) rotateX(-20deg);opacity:1}to{-webkit-transform:perspective(400px) rotateX(90deg);transform:perspective(400px) rotateX(90deg);opacity:0}}@keyframes flipOutX{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotateX(-20deg);transform:perspective(400px) rotateX(-20deg);opacity:1}to{-webkit-transform:perspective(400px) rotateX(90deg);transform:perspective(400px) rotateX(90deg);opacity:0}}.flipOutX{-webkit-animation-name:flipOutX;animation-name:flipOutX;-webkit-backface-visibility:visible!important;backface-visibility:visible!important}@-webkit-keyframes flipOutY{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotateY(-15deg);transform:perspective(400px) rotateY(-15deg);opacity:1}to{-webkit-transform:perspective(400px) rotateY(90deg);transform:perspective(400px) rotateY(90deg);opacity:0}}@keyframes flipOutY{0%{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotateY(-15deg);transform:perspective(400px) rotateY(-15deg);opacity:1}to{-webkit-transform:perspective(400px) rotateY(90deg);transform:perspective(400px) rotateY(90deg);opacity:0}}.flipOutY{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipOutY;animation-name:flipOutY}@-webkit-keyframes lightSpeedIn{0%{-webkit-transform:translate3d(100%,0,0) skewX(-30deg);transform:translate3d(100%,0,0) skewX(-30deg);opacity:0}60%{-webkit-transform:skewX(20deg);transform:skewX(20deg)}60%,80%{opacity:1}80%{-webkit-transform:skewX(-5deg);transform:skewX(-5deg)}to{-webkit-transform:none;transform:none;opacity:1}}@keyframes lightSpeedIn{0%{-webkit-transform:translate3d(100%,0,0) skewX(-30deg);transform:translate3d(100%,0,0) skewX(-30deg);opacity:0}60%{-webkit-transform:skewX(20deg);transform:skewX(20deg)}60%,80%{opacity:1}80%{-webkit-transform:skewX(-5deg);transform:skewX(-5deg)}to{-webkit-transform:none;transform:none;opacity:1}}.lightSpeedIn{-webkit-animation-name:lightSpeedIn;animation-name:lightSpeedIn;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}@-webkit-keyframes lightSpeedOut{0%{opacity:1}to{-webkit-transform:translate3d(100%,0,0) skewX(30deg);transform:translate3d(100%,0,0) skewX(30deg);opacity:0}}@keyframes lightSpeedOut{0%{opacity:1}to{-webkit-transform:translate3d(100%,0,0) skewX(30deg);transform:translate3d(100%,0,0) skewX(30deg);opacity:0}}.lightSpeedOut{-webkit-animation-name:lightSpeedOut;animation-name:lightSpeedOut;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}@-webkit-keyframes rotateIn{0%{transform-origin:center;-webkit-transform:rotate(-200deg);transform:rotate(-200deg);opacity:0}0%,to{-webkit-transform-origin:center}to{transform-origin:center;-webkit-transform:none;transform:none;opacity:1}}@keyframes rotateIn{0%{transform-origin:center;-webkit-transform:rotate(-200deg);transform:rotate(-200deg);opacity:0}0%,to{-webkit-transform-origin:center}to{transform-origin:center;-webkit-transform:none;transform:none;opacity:1}}.rotateIn{-webkit-animation-name:rotateIn;animation-name:rotateIn}@-webkit-keyframes rotateInDownLeft{0%{transform-origin:left bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}0%,to{-webkit-transform-origin:left bottom}to{transform-origin:left bottom;-webkit-transform:none;transform:none;opacity:1}}@keyframes rotateInDownLeft{0%{transform-origin:left bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}0%,to{-webkit-transform-origin:left bottom}to{transform-origin:left bottom;-webkit-transform:none;transform:none;opacity:1}}.rotateInDownLeft{-webkit-animation-name:rotateInDownLeft;animation-name:rotateInDownLeft}@-webkit-keyframes rotateInDownRight{0%{transform-origin:right bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}0%,to{-webkit-transform-origin:right bottom}to{transform-origin:right bottom;-webkit-transform:none;transform:none;opacity:1}}@keyframes rotateInDownRight{0%{transform-origin:right bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}0%,to{-webkit-transform-origin:right bottom}to{transform-origin:right bottom;-webkit-transform:none;transform:none;opacity:1}}.rotateInDownRight{-webkit-animation-name:rotateInDownRight;animation-name:rotateInDownRight}@-webkit-keyframes rotateInUpLeft{0%{transform-origin:left bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}0%,to{-webkit-transform-origin:left bottom}to{transform-origin:left bottom;-webkit-transform:none;transform:none;opacity:1}}@keyframes rotateInUpLeft{0%{transform-origin:left bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}0%,to{-webkit-transform-origin:left bottom}to{transform-origin:left bottom;-webkit-transform:none;transform:none;opacity:1}}.rotateInUpLeft{-webkit-animation-name:rotateInUpLeft;animation-name:rotateInUpLeft}@-webkit-keyframes rotateInUpRight{0%{transform-origin:right bottom;-webkit-transform:rotate(-90deg);transform:rotate(-90deg);opacity:0}0%,to{-webkit-transform-origin:right bottom}to{transform-origin:right bottom;-webkit-transform:none;transform:none;opacity:1}}@keyframes rotateInUpRight{0%{transform-origin:right bottom;-webkit-transform:rotate(-90deg);transform:rotate(-90deg);opacity:0}0%,to{-webkit-transform-origin:right bottom}to{transform-origin:right bottom;-webkit-transform:none;transform:none;opacity:1}}.rotateInUpRight{-webkit-animation-name:rotateInUpRight;animation-name:rotateInUpRight}@-webkit-keyframes rotateOut{0%{transform-origin:center;opacity:1}0%,to{-webkit-transform-origin:center}to{transform-origin:center;-webkit-transform:rotate(200deg);transform:rotate(200deg);opacity:0}}@keyframes rotateOut{0%{transform-origin:center;opacity:1}0%,to{-webkit-transform-origin:center}to{transform-origin:center;-webkit-transform:rotate(200deg);transform:rotate(200deg);opacity:0}}.rotateOut{-webkit-animation-name:rotateOut;animation-name:rotateOut}@-webkit-keyframes rotateOutDownLeft{0%{transform-origin:left bottom;opacity:1}0%,to{-webkit-transform-origin:left bottom}to{transform-origin:left bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}}@keyframes rotateOutDownLeft{0%{transform-origin:left bottom;opacity:1}0%,to{-webkit-transform-origin:left bottom}to{transform-origin:left bottom;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}}.rotateOutDownLeft{-webkit-animation-name:rotateOutDownLeft;animation-name:rotateOutDownLeft}@-webkit-keyframes rotateOutDownRight{0%{transform-origin:right bottom;opacity:1}0%,to{-webkit-transform-origin:right bottom}to{transform-origin:right bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}}@keyframes rotateOutDownRight{0%{transform-origin:right bottom;opacity:1}0%,to{-webkit-transform-origin:right bottom}to{transform-origin:right bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}}.rotateOutDownRight{-webkit-animation-name:rotateOutDownRight;animation-name:rotateOutDownRight}@-webkit-keyframes rotateOutUpLeft{0%{transform-origin:left bottom;opacity:1}0%,to{-webkit-transform-origin:left bottom}to{transform-origin:left bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}}@keyframes rotateOutUpLeft{0%{transform-origin:left bottom;opacity:1}0%,to{-webkit-transform-origin:left bottom}to{transform-origin:left bottom;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}}.rotateOutUpLeft{-webkit-animation-name:rotateOutUpLeft;animation-name:rotateOutUpLeft}@-webkit-keyframes rotateOutUpRight{0%{transform-origin:right bottom;opacity:1}0%,to{-webkit-transform-origin:right bottom}to{transform-origin:right bottom;-webkit-transform:rotate(90deg);transform:rotate(90deg);opacity:0}}@keyframes rotateOutUpRight{0%{transform-origin:right bottom;opacity:1}0%,to{-webkit-transform-origin:right bottom}to{transform-origin:right bottom;-webkit-transform:rotate(90deg);transform:rotate(90deg);opacity:0}}.rotateOutUpRight{-webkit-animation-name:rotateOutUpRight;animation-name:rotateOutUpRight}@-webkit-keyframes hinge{0%{transform-origin:top left}0%,20%,60%{-webkit-transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}20%,60%{-webkit-transform:rotate(80deg);transform:rotate(80deg);transform-origin:top left}40%,80%{-webkit-transform:rotate(60deg);transform:rotate(60deg);-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;opacity:1}to{-webkit-transform:translate3d(0,700px,0);transform:translate3d(0,700px,0);opacity:0}}@keyframes hinge{0%{transform-origin:top left}0%,20%,60%{-webkit-transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}20%,60%{-webkit-transform:rotate(80deg);transform:rotate(80deg);transform-origin:top left}40%,80%{-webkit-transform:rotate(60deg);transform:rotate(60deg);-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;opacity:1}to{-webkit-transform:translate3d(0,700px,0);transform:translate3d(0,700px,0);opacity:0}}.hinge{-webkit-animation-name:hinge;animation-name:hinge}@-webkit-keyframes rollIn{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0) rotate(-120deg);transform:translate3d(-100%,0,0) rotate(-120deg)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes rollIn{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0) rotate(-120deg);transform:translate3d(-100%,0,0) rotate(-120deg)}to{opacity:1;-webkit-transform:none;transform:none}}.rollIn{-webkit-animation-name:rollIn;animation-name:rollIn}@-webkit-keyframes rollOut{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0) rotate(120deg);transform:translate3d(100%,0,0) rotate(120deg)}}@keyframes rollOut{0%{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0) rotate(120deg);transform:translate3d(100%,0,0) rotate(120deg)}}.rollOut{-webkit-animation-name:rollOut;animation-name:rollOut}@-webkit-keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}.zoomIn{-webkit-animation-name:zoomIn;animation-name:zoomIn}@-webkit-keyframes zoomInDown{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInDown{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInDown{-webkit-animation-name:zoomInDown;animation-name:zoomInDown}@-webkit-keyframes zoomInLeft{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(10px,0,0);transform:scale3d(.475,.475,.475) translate3d(10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInLeft{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(-1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(10px,0,0);transform:scale3d(.475,.475,.475) translate3d(10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInLeft{-webkit-animation-name:zoomInLeft;animation-name:zoomInLeft}@-webkit-keyframes zoomInRight{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInRight{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);transform:scale3d(.1,.1,.1) translate3d(1000px,0,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);transform:scale3d(.475,.475,.475) translate3d(-10px,0,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInRight{-webkit-animation-name:zoomInRight;animation-name:zoomInRight}@-webkit-keyframes zoomInUp{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomInUp{0%{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);transform:scale3d(.1,.1,.1) translate3d(0,1000px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}60%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomInUp{-webkit-animation-name:zoomInUp;animation-name:zoomInUp}@-webkit-keyframes zoomOut{0%{opacity:1}50%{-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%,to{opacity:0}}@keyframes zoomOut{0%{opacity:1}50%{-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%,to{opacity:0}}.zoomOut{-webkit-animation-name:zoomOut;animation-name:zoomOut}@-webkit-keyframes zoomOutDown{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomOutDown{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);transform:scale3d(.475,.475,.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomOutDown{-webkit-animation-name:zoomOutDown;animation-name:zoomOutDown}@-webkit-keyframes zoomOutLeft{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(42px,0,0);transform:scale3d(.475,.475,.475) translate3d(42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(-2000px,0,0);transform:scale(.1) translate3d(-2000px,0,0);-webkit-transform-origin:left center;transform-origin:left center}}@keyframes zoomOutLeft{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(42px,0,0);transform:scale3d(.475,.475,.475) translate3d(42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(-2000px,0,0);transform:scale(.1) translate3d(-2000px,0,0);-webkit-transform-origin:left center;transform-origin:left center}}.zoomOutLeft{-webkit-animation-name:zoomOutLeft;animation-name:zoomOutLeft}@-webkit-keyframes zoomOutRight{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-42px,0,0);transform:scale3d(.475,.475,.475) translate3d(-42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(2000px,0,0);transform:scale(.1) translate3d(2000px,0,0);-webkit-transform-origin:right center;transform-origin:right center}}@keyframes zoomOutRight{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(-42px,0,0);transform:scale3d(.475,.475,.475) translate3d(-42px,0,0)}to{opacity:0;-webkit-transform:scale(.1) translate3d(2000px,0,0);transform:scale(.1) translate3d(2000px,0,0);-webkit-transform-origin:right center;transform-origin:right center}}.zoomOutRight{-webkit-animation-name:zoomOutRight;animation-name:zoomOutRight}@-webkit-keyframes zoomOutUp{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}@keyframes zoomOutUp{40%{opacity:1;-webkit-transform:scale3d(.475,.475,.475) translate3d(0,60px,0);transform:scale3d(.475,.475,.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(.55,.055,.675,.19);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}to{opacity:0;-webkit-transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);transform:scale3d(.1,.1,.1) translate3d(0,-2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(.175,.885,.32,1);animation-timing-function:cubic-bezier(.175,.885,.32,1)}}.zoomOutUp{-webkit-animation-name:zoomOutUp;animation-name:zoomOutUp}@-webkit-keyframes slideInDown{0%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInDown{0%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.slideInDown{-webkit-animation-name:slideInDown;animation-name:slideInDown}@-webkit-keyframes slideInLeft{0%{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInLeft{0%{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.slideInLeft{-webkit-animation-name:slideInLeft;animation-name:slideInLeft}@-webkit-keyframes slideInRight{0%{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInRight{0%{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.slideInRight{-webkit-animation-name:slideInRight;animation-name:slideInRight}@-webkit-keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.slideInUp{-webkit-animation-name:slideInUp;animation-name:slideInUp}@-webkit-keyframes slideOutDown{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes slideOutDown{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.slideOutDown{-webkit-animation-name:slideOutDown;animation-name:slideOutDown}@-webkit-keyframes slideOutLeft{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}@keyframes slideOutLeft{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}.slideOutLeft{-webkit-animation-name:slideOutLeft;animation-name:slideOutLeft}@-webkit-keyframes slideOutRight{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@keyframes slideOutRight{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}.slideOutRight{-webkit-animation-name:slideOutRight;animation-name:slideOutRight}@-webkit-keyframes slideOutUp{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes slideOutUp{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{visibility:hidden;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}.slideOutUp{-webkit-animation-name:slideOutUp;animation-name:slideOutUp}
                `+temp_theme_txt+`
                </style>
            `);
        }
    }

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
                var $this = $(this);
                var image = $this.attr("src");
                parent.$("html").addClass("no-scroll");
                var simple_image = "";
                if(isVideo(image)){
                    simple_image = "<video class='chat_image' loop controls muted autoplay src=\""+image+"\"></video>";
                }
                else{
                    simple_image = "<img class='chat_image' src=\""+image+"\" />";
                }
                parent.$("body").append("<div class=\"lightbox-opened\">"+simple_image+"</div>");
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
        });
    }

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    var ADD_chat_auto_reload = {
        // 부모창에서 unique_window 값 가져올 수 있도록 수정 필요
        DOE: async function(){
            if(!ADD_config.chat_auto_reload){
                $GLOBAL_IFRAME_DOCUMENT.find(".newWindowResponse").off("input");
                if(typeof GM.removeValueChangeListener === "function"){
                    GM.removeValueChangeListener(ADD_unique_window_event_ID);
                }
                else{
                    clearInterval(ADD_unique_window_event_ID);
                }
                $(".newWindowRseponseContainer").remove();
                return false;
            }
            
            // DOE 생성
            if($(".newWindowRseponseContainer").length === 0){
                var temp_uw = getUrlVars()["uw"];
                var temp_uwc = getUrlVars()["uwc"];
                if(temp_uw !== undefined && temp_uwc !== undefined){
                    ADD_unique_window = temp_uw;
                    ADD_unique_window_reload_counter = temp_uwc;
                }

                var $middlebox = $GLOBAL_IFRAME_DOCUMENT.find("div.middlebox");
                var $newWindowResponse = $(`
                <div class="newWindowRseponseContainer" style="font-size:9px;display: inline-block;float:right;vertical-align:middle;height: auto;padding: 5px;">
                <span style="padding-right:3px;">자동 새로고침</span>
                    <input type="checkbox" class="newWindowResponse">
                </div>
                `);
                $middlebox.append($newWindowResponse);

                // 현재 창에서 체크박스 컨트롤
                $GLOBAL_IFRAME_DOCUMENT.find(".newWindowResponse").on("input", function(){
                    var $this = $(this);
                    if($this.is(":checked")){
                        ADD_is_unique_window_reload = true;
                        GM.setValue("ADD_unique_window", ADD_unique_window);
                    }
                    else{
                        ADD_is_unique_window_reload = false;
                    }
                });

                // 다른창에서 체크에 의한 체크박스 컨트롤
                if(typeof GM.addValueChangeListener === "function"){
                    ADD_unique_window_event_ID = GM.addValueChangeListener("ADD_unique_window", async function(val_name, old_value, new_value, remote) {
                        if(remote){
                            ADD_DEBUG("다른 창에서 설정 변경됨. val_name, old_value, new_value:", val_name, old_value, new_value);
                            if(ADD_is_unique_window_reload && new_value !== ADD_unique_window){
                                ADD_is_unique_window_reload = false;
                                $GLOBAL_IFRAME_DOCUMENT.find(".newWindowResponse").prop("checked", false);
                            }
                        }
                    });
                }
                else{
                    ADD_unique_window_event_ID = setTimeout(async function(){
                        var new_value = await GM.getValue("ADD_unique_window", ADD_unique_window);
                        if(ADD_is_unique_window_reload && new_value !== ADD_unique_window){
                            ADD_is_unique_window_reload = false;
                            $GLOBAL_IFRAME_DOCUMENT.find(".newWindowResponse").prop("checked", false);
                        }
                    }, 1000);
                }
            }
        },
        EXE:function(){
            if(!ADD_config.chat_auto_reload){
                return false;
            }
            if(ADD_is_unique_window_reload && ADD_unique_window_reload_counter < ADD_UNIQUE_WINDOW_RELOAD_MAX){
                ADD_unique_window_reload_counter += 1;
                window.location.href = "http://www.dostream.com/uchat2.php?uw="+ADD_unique_window+"&uwc="+ADD_unique_window_reload_counter;

                // setTimeout(function(){
                //     ADD_unique_window_reload_counter -= 1;
                // }, 10000);
            }
        }
    };

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
            var iframeElemGlobal = GLOBAL_CHAT_CONTENT_DIV,
                $iframeElem,
                iframeElems = GLOBAL_CHAT_IFRAME;

            if(iframeElemGlobal !== undefined && iframeElemGlobal.length !== 0){
                ADD_DEBUG("정상적으로 시스템 메시지 출력 - ", msg);
                $iframeElem = iframeElemGlobal;
                //var conversation_contents_elem = $iframeElem; //$iframeDocument.find("div.content");
                $iframeElem.append(msg_text);
                if( iframeElems !== undefined && iframeElems.length !== 0&& isChatScrollOn()){
                    goScrollDown();
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
                        GLOBAL_CHAT_CONTENT_DIV = $iframeElem;
                        //ADD_DEBUG("$iframeElem", $iframeElem);
                        $iframeElem.append(msg_text);
                        if( iframeElems !== undefined && iframeElems.length !== 0&& isChatScrollOn()){
                            goScrollDown();
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
                                GLOBAL_CHAT_CONTENT_DIV = $iframeElem;
                                $iframeElem.append(msg_text);
                                if(isChatScrollOn()){
                                    goScrollDown();
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
        if(GM_page !== C_UCHAT){
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
        // 일단 먼저 끈다.
        $(document).unbindArrive("li.is_notme");

        // arrive bind 및 unbind
        if(ADD_config.chat_ctr){
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
                if(ADD_config.chat_block){
                    // Case 1-1 채팅 내용 기반
                    if(await ADD_chatBlock(elem, false, nick, content, createdDate, false, ADD_config.chat_block_contents, ADD_config.chat_block_noti)) return false;
                    // Case 1-2 닉네임 기반
                    if(await ADD_chatBlock(elem, false, nick, content, createdDate, ADD_config.chat_block_nickname, false, ADD_config.chat_block_noti)) return false;
                }
                // Case 2: 채팅 매니저로 차단하는 경우
                if(chat_manager !== undefined && elem !== undefined){
                    var isBlock = chat_manager.getIsBlock(nick);
                    if(isBlock){
                        var isShowDelMsg = chat_manager.getIsShowDelMsg(nick);
                        if(await ADD_chatBlock(elem, true, nick, content, createdDate, false, false, isShowDelMsg)) return false;
                    }
                }

            });

            var $iframeDocument = $("ul#uha_chat_msgs");

            // 채팅 매니저 초기화
            chat_manager.init($("div#uha_chat"));

            // 채팅창 생성될 때 노티하기
            GLOBAL_CHAT_CONTENT_DIV = $(this);
            if(ADD_config.sys_meg !== undefined && ADD_config.sys_meg){
                setTimeout(function(){
                    ADD_DEBUG("채팅창에서 애드온 동작");
                    $iframeDocument.append("<li class=\"uha_info\"><span class=\"name\">안내</span>두스트림 애드온이 임시 동작중입니다(우하하).<br />현재는 강제단차 및 키워드 차단 기능만 제공합니다.</li>");
                },3000);
            }

            // 채팅창 닉네임 클릭 시 강제단차 DOE 생성하기
            // var $uhaha_do_memo = $("<span id=\"uhaha_do_memo\" style=\"cursor:pointer;color:red;\">차단하기</span><br />");
            // $(document).on("click", "span.name", function (){
            //     $(document).find("#uha_chat_contextmenu_close").before($uhaha_do_memo);
            // });

            // 메모하기 클릭 시 이벤트
            // $uhaha_do_memo.on("click", async function(){
            //     var temp_nick = $("#uha_chat_targetname").html();
            //     var temp_obj = {"nick":temp_nick,"display_name":"현재 우하하에서 메모 동작X","isBlock":true};
            //     await chat_manager.openSimpleDOE(temp_obj);
            // });

            // 채팅창 닉네임 클릭 시 강제단차 DOE 생성하기
            $(document).on("click", "span.name", function (){
                if($("#uhaha_forced_dancha").length !== 0){
                    var $uhaha_forced_dancha = $("<span id=\"uhaha_forced_dancha\" style=\"cursor:pointer;color:red;\">강제단차</span><br />");
                    $(document).find("#uha_chat_contextmenu_close").before($uhaha_forced_dancha);

                    $uhaha_forced_dancha.on("click", function(){
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
                }
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
        // 일단 먼저 끈다.
        $(document).off("mouseenter mouseleave", "li.twitch>a>img, li.kakao>a>img, li.youtube>a>img");
        $(".ADD_thumb_elem_container").fadeOut("fast");

        if(!ADD_config.thumbnail_mouse){
            return false;
        }

        // 켠다.
        $(document).on({
            mouseenter: async function(){
                if(!ADD_config.thumbnail_mouse){
                    return false;
                }
                var thumb_this = $(this);
                var thumb_this_parent = thumb_this.parent("a");
                var thumb_size_class;

                switch(ADD_config.thumbnail_size){
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
                ADD_thumb_href = thumb_this.attr("src");

                if(ADD_config.thumbnail_refresh){
                    var thumbRefreshGap = ADD_config.thumbnail_refresh_gap;
                    if(!$.isNumeric(thumbRefreshGap) || Number(thumbRefreshGap) < 1){
                        thumbRefreshGap = 1;
                    }
                    var isThumbRefresh = await GM_cache("thumbnail_refresh",Number(thumbRefreshGap)*60*1000);
                    
                    if(isThumbRefresh){
                        getTimeStampRes = "?" + getTimeStamp("m");
                    }
    
                    ADD_thumb_href += getTimeStampRes;
                }

                // check image size
                switch(ADD_config.thumbnail_size){
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
                if(!ADD_config.thumbnail_mouse){
                    return false;
                }
                var thumb_this = $(this);
                var thumb_this_parent = thumb_this.parent("a");
                if( thumb_this_parent.find(".ADD_thumb_elem_container").length !== 0 )
                {
                    thumb_this_parent.find(".ADD_thumb_elem_container").fadeOut("fast");
                }
            }
        }, "li.twitch>a>img, li.kakao>a>img, li.youtube>a>img");
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
        if(GM_page !== C_UCHAT){
            ADD_DEBUG("메인 or 스트림에서 메시지 함수 호출 => iframe 내 함수 재호출 함");
            if($(".chat-container > iframe").length !== 0 && $(".chat-container > iframe")[0].contentWindow.chat_manager !== undefined){
                ADD_DEBUG("iframe  의 chat manager 함수를 가져왔다.");
                chat_manager = $(".chat-container > iframe")[0].contentWindow.chat_manager;
            }
            else{
                ADD_DEBUG("메인 의 chat manager 함수를 가져왔다.");
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
                <div class="modal-content" style="font-size:12px;text-align:left;margin:0 auto;max-width:1000px;">
                    <div id="memo_contents" class="modal-body">
                        <div style="padding:2px 0 5px 5px;font-family:'Noto Sans KR', '맑은 고딕', 'malgun gothic', dotum, serif;">
                            <span style="font-weight:900;font-size:14px;">채팅매니저 관리</span><br />
                            두스트림 창이 여러개 열려 있고, 다른 창에서 채팅매니저 기록을 수정하는 경우 데이터가 이상해질 수 있습니다.<br />
                            본 기능은 언제든 갑작스럽게 사라지거나 동작하지 않을 수 있습니다 (테스트 중).<br />
                            캠페인: 채팅창에서 메모 내용을 언급하지 말고 혼자 조용히 사용해주세요.
                        </div>
                        <table class="table table-condensed table-striped table-bordered" style="font-size:12px;margin-bottom:5px;font-family:'Noto Sans KR';table-layout:fixed;">
                            <thead>
                                <tr>
                                    <th style="width:40px;" class="index">#</th>
                                    <th style="width:80px;">닉네임</th>
                                    <th style="width:100px;">표시명</th>
                                    <th style="max-width:290px;" class="ADD_under_dev">상세 내용</th>
                                    <th style="width:70px;" class="ADD_under_dev">표시 색상</th>
                                    <th style="width:70px;">채팅 차단</th>
                                    <th style="width:80px;">차단 시 표시</th>
                                    <th style="width:100px;">마지막 채팅</th>
                                    <th style="width:80px;" class="th_mod">수정</th>
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
        var newDate = Number(new Date());
        for (var i=0;i<chat_manager_data.length;i++){
            var modified_date_color = "";
            //var keys = ["nick","display_name","detail_content","modified_date","isBlock","isShowDelMsg"];
            var nick = chat_manager_data[i].nick;
            var color = chat_manager_data[i].color;
            var display_name = chat_manager_data[i].display_name;
            var detail_content = chat_manager_data[i].detail_content;
            var modified_date_diff = newDate - Number(new Date(chat_manager_data[i].modified_date));
            if(modified_date_diff > 1000*60*60*24*30){
                modified_date_color = "color:orangered";
            }
            else if(modified_date_diff > 1000*60*60*24*7){
                modified_date_color = "color:lightcoral";
            }
            var modified_date = transferTime(modified_date_diff);//.replace("일 ","일 <br />");
            var isBlock = chat_manager_data[i].isBlock;
            var isShowDelMsg = chat_manager_data[i].isShowDelMsg;
            $tbody.append(`
                <tr>
                    <td class="index">`+(i+1)+`</td>
                    <td class="nick">`+nick+`</td>
                    <td class="display_name">`+display_name+`</td>
                    <td class="detail_content ADD_under_dev" style="word-break:break-all">`+detail_content+`</td>
                    <td class="color ADD_under_dev">`+color+`</td>
                    <td class="isBlock">`+isBlock+`</td>
                    <td class="isShowDelMsg">`+isShowDelMsg+`</td>
                    <td class="modified_date" style="`+modified_date_color+"\">"+modified_date+`</td>
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
                    <td class="modified_date" style="font-size:9px;"></td>
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
        if(ADD_config.under_dev){
            $(".ADD_under_dev").show();
        }
        else{
            $(".ADD_under_dev").hide();
        }
    };

    // 메모 로그 버튼 클릭 시
    $(document).on("click", ".show_memo_log", async () => {
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
        var placeholder = chat_manager.getPlaceholder();
        if($this.hasClass("new")){
            $tr.find(".index").text(index);
            temp_obj = chat_manager.getInitObj();
        }
        else{
            temp_obj = data[index];
        }

        $td.each(function(){
            var $that = $(this);
            var temp_class = $that.attr("class").replace("ADD_under_dev","").replace(/\s/g,"");
            ADD_DEBUG("temp_class", temp_class);
            if($that.hasClass("detail_content")){
                $that.html(`
                    <textarea style="width:230px;height:60px;margin:0;" placeholder="`+placeholder[temp_class]+"\">"+temp_obj[temp_class]+`</textarea>
                `);
            }
            else if($that.hasClass("display_name") || ($this.hasClass("new") && $that.hasClass("nick")) || $that.hasClass("color") ){
                $that.html(`
                    <div style="">
                        <input autocomplete="off" style="width:120px;margin:0;" type="text" value="`+temp_obj[temp_class]+"\" placeholder=\""+placeholder[temp_class]+`" />
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
        //temp_obj.modified_date = Number(new Date());
        $td.each(function(){
            var $that = $(this);
            var temp_class = $that.attr("class").replace("ADD_under_dev","").replace(/\s/g,"");
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
        if(temp_obj.nick === ""){
            alert("닉네임은 반드시 입력되어야 합니다.");
            return;
        }

        var confirmValText = "정말 저장하시겠습니까?\n"
            + "닉네임: " + temp_obj.nick + "\n"
            + "표시명: " + temp_obj.display_name + "\n";

        if(ADD_config.under_dev){
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

    var Colors = {
        names: {
            orange:"#FF4500",brownishorange:"#DAA520",darkgreen:"#008000",blue:"#0000FF",blueviolet:"#8a2be2",brown:"#a52a2a",cadetblue:"#5f9ea0",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",crimson:"#dc143c",darkblue:"#00008b",darkgoldenrod:"#b8860b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",forestgreen:"#228b22",grey:"#808080",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",lightcoral:"#f08080",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightslategrey:"#778899",limegreen:"#32cd32",magenta:"magenta",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",navy:"#000080",olive:"olive",olivedrab:"#6b8e23",orangered:"#ff4500",orchid:"#da70d6",pink:"#FF69B4",purple:"purple",red:"#FF0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",seagreen:"#2e8b57",sienna:"#a0522d",slateblue:"#6a5acd",slategrey:"#708090",steelblue:"#4682b4",tan:"#d2b48c",tomato:"#ff6347",violet:"#ee82ee",
        },
        random: function(str) {
            if(str === undefined){
                var result;
                var count = 0;
                for (var prop in this.names){
                    if (Math.random() < 1/++count){
                        result = prop;
                    }
                }
                return { name: result, rgb: this.names[result]};
            }
            else{
                var hash = 0;
                for (var i = 0; i < str.length; i++) {
                    hash = str.charCodeAt(i) + ((hash << 5) - hash);
                    hash = hash & hash;
                }
                var hashkeys = Object.keys(this.names);
                hash = ((hash % hashkeys.length) + hashkeys.length) % hashkeys.length;
                var hashkey = hashkeys[hash];
                return { name: hashkey, rgb: this.names[hashkey] };
            }
        }
    };

    var chat_manager = (function(){
        //var keys = ["nick","display_name","detail_content","color","modified_date","isBlock","isShowDelMsg"];
        var initObj = {"nick":"닉네임", "display_name":"", "detail_content":"", "color":"","modified_date":Number(new Date()), "isBlock":false, "isShowDelMsg":false};
        var placeholder = {"nick":"닉네임", "display_name":"채팅창에 표시할 내용", "detail_content":"상세 내용", "color":"#333","modified_date":Number(new Date()), "isBlock":false, "isShowDelMsg":false};
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
            <div id="memo_simple_doe_container" style="z-index: 100000;background-color:rgba(51,51,51,0.8);cursor:pointer;height:100%;left:0;overflow-y:scroll;padding:0;position:absolute;
                text-align:center;top: 0;width: 100%;display:none;">
                <div id="memo_simple_doe" style="width:100%;position:absolute;top:50%;margin-top:-50%;cursor:default;">
                    <div style="width:300px;margin:0 auto;background-color:rgba(255,255,255,0.87);border:2px solid #555;border-radius:15px;color:#000;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
                        <div style="padding:10px 0 5px 0;font-size:13px;font-weight:700;">
                            <span id="memo_nick" style="color:red;"></span>
                            <span style="">에 메모 입력</span>
                            <span id="memo_isSavedMemo" style="display:none;color:blue;">(새 메모 작성)</span>
                        </div>
                        <table style="width:270px;table-layout:fixed;vertical-align:middle;margin:0 15px;"><tbody>
                            <tr>
                                <td style="width:70px;font-weight:700;vertical-align:middle;padding:4px 0;border-top:1px solid #aaa;">표시할 별명</td>
                                <td style="padding:4px 0;border-top:1px solid #aaa;"><input autocomplete="off" id="memo_display_name" placeholder="`+placeholder.display_name+`" type="text" style="width:180px;height:20px;padding:1px 0 1px 3px;border:1px solid #aaa;" value=""/></td>
                            </tr>
                            <tr class="ADD_under_dev" style="display:none;">
                                <td style="width:70px;font-weight:700;vertical-align:middle;padding:4px 0;border-top:1px solid #aaa;">상세 내용<br />(기록용)</td>
                                <td style="padding:4px 0;border-top:1px solid #aaa;"><textarea id="memo_detail_content" placeholder="`+placeholder.detail_content+`" style="width:180px;height:80px;padding:1px 0 1px 3px;border:1px solid #aaa;" value=""></textarea></td>
                            </tr>
                            <tr style="display:none;">
                                <td style="width:70px;font-weight:700;vertical-align:middle;padding:4px 0;border-top:1px solid #aaa;">수정한 날짜</td>
                                <td style="padding:4px 0;border-top:1px solid #aaa;""><input autocomplete="off" id="memo_modified_date" type="text" style="width:180px;height:20px;padding:1px 0 1px 3px;border:1px solid #aaa;" value=""/></td>
                            </tr>
                            <tr class="ADD_under_dev" style="display:none;">
                                <td style="width:70px;font-weight:700;vertical-align:middle;padding:4px 0;border-top:1px solid #aaa;">표시할 색상</td>
                                <td style="padding:4px 0;border-top:1px solid #aaa;">
                                    <input autocomplete="off" id="memo_color" type="text" placeholder="`+placeholder.color+`" style="width:180px;height:20px;padding:1px 0 1px 3px;border:1px solid #aaa;" value=""/>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="vertical-align:middle;padding:5px 0 5px 20px;text-align:left;border-top:1px solid #aaa;">
                                    <span style="font-weight:700;margin-right:5px;">채팅 차단</span>
                                    <input id="memo_isBlock" type="checkbox" style="cursor:pointer;width:15px;height:15px;padding:1px 5px 1px 3px;"/>
                                    <span style="font-size:11px;">(두스 기본 차단과는 별개로 작동)</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="vertical-align:middle;padding:5px 0 5px 20px;text-align:left;border-top:1px solid #aaa;border-bottom:1px solid #aaa;">
                                    <span style="font-weight:700;margin-right:5px;">채팅 차단 시 Message deleted 로 표시</span>
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
                                캠페인: 채팅창에서 메모 내용을 언급하지 말고<br />혼자 조용히 사용해주세요.<br />클린채팅 합시다.
                            </span>
                            <div id="memo_change_text" style="padding:5px 0px;display:none;">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            `);
            //ADD_DEBUG($mainFrame, $mainFrame.find("body"));
            var $body = $mainFrame.find("body");
            if($body.length !== 0){
                $body.first().addClass("chat_manager_added").append($simpleMemoElem);
            }
            else{
                $mainFrame.append($simpleMemoElem);
            }
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

            if(ADD_config.under_dev){
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
            obj_simple.modified_date = Number(new Date());  // 수정 시간 갱신
            addObjtoData(obj_simple);
            await saveData();

            // 차단할 경우 삭제
            if(obj_simple.isBlock){
                var $lines = GLOBAL_CHAT_CONTENT_DIV.find(".line");
                $lines.each(function(ind, elem){
                    var nick = $(elem).find(".nick").first().attr("nick");
                    var content = $(elem).find(".chatContent").first().html();
                    if(nick === obj_simple.nick){
                        if(ADD_config.chat_block_noti){
                            $(elem).attr("data-tiptext", nick + ": " + content + " - {ago}").html("<div style=\"text-align:center;color:#aaa;\">&ltmessage deleted&gt</div>");
                        }
                        else{
                            $(elem).remove();
                        }
                    }
                });

                // 차단 후 메시지
                if(ADD_config.sys_meg){
                    ADD_send_sys_msg("[채팅매니저 차단] 닉네임: "+obj_simple.nick);
                }
            }
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

            // 메모 닉���임 입력창 초기화 이벤트
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
            modified_date = $modified_date.val();
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
            $modified_date.val(obj_simple.modified_date);
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
            getPlaceholder: function(){
                return JSON.parse(JSON.stringify(placeholder)); // deepCopy
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
            simpleBlock: async function(nick, content){
                var temp_obj = objInit({nick:nick, display_name:"도배", detail_content:content, modified_date:Number(new Date()), isBlock:true});
                addObjtoData(temp_obj);
                await saveData();
            },
            openManagerDOE: function(){

            },
            updateModifiedDate: async function(local_nick){
                var temp_obj = getObjFromNick(local_nick);
                if(temp_obj !== undefined){
                    temp_obj.modified_date = Number(new Date());
                    saveData(); // await
                }
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
    //                              MAIN - 실행 영역
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////     페이지 로드 전 1회 실행     //////////////////////////

    const version_str = GM.info.script.version;
    var version = Number(ADD_version_string(version_str));
    ADD_DEBUG("현재 버전 - ", version_str, version);
    
    // GM_setting
    window.GM_setting = GM_setting;
    await GM_setting.init("ADD_config");
    await GM_setting.load();

    // 채팅창 아닌 경우
    if(GM_page !== C_UCHAT){
        // Call Twitch api
        await twitch_api();
        await twitch_api_call_interval();

        // Multiwindows checker
        ADD_multiwindow_prevent();
    }

    ///////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// $(document).ready //////////////////////////////
    $(document).ready(function(){
        ADD_DEBUG("DOCUMENT_READY");
        // 두번째 iframe 동작 방지
        if(web_browser === "firefox" && GM_page === C_UCHAT && $("u-chat").length === 0){
            return;
        }

        // 새 창 설정
        if(GM_page === C_SETTING_NW){
            $("body").empty().css("padding","0px 30px 30px 30px");
            $("head").append(`
                <link href="/js/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
                <link href="/css/dostream.css?20180429" media="screen" rel="stylesheet" type="text/css">
            `);
            document.title = "두스트림 - ADDostream 상세 설정 페이지";
            GM_setting.createDOE($("body"));
        }
        
        // Hijacking
        if(GM_page !== C_UCHAT){
            // Firefox 의 경우
            if((web_browser === "firefox") && (typeof exportFunction === "function")){
                unsafeWindow.dostream = exportFunction(newdostream, unsafeWindow);
                unsafeWindow.dsStream = exportFunction(newdsStream, unsafeWindow);
            }
            // 그 이외(Chrome 등)의 경우
            else{// if(web_browser === 'chrome')
                unsafeWindow.dsStream = newdsStream;
                unsafeWindow.dostream = newdostream;
                reloadMain();
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////
        // 공통 사항
        // CSS LOAD
        ADD_customStyle();
        ADD_addStyle();
        ADD_head_append();

        // 설정에 따라 바뀌는 이벤트 묶기
        ADD_event_binding();

        // 테마 적용
        // if(ADD_config.theme !== "Default" && ADD_config.theme !== undefined){
        //     ADD_change_theme(ADD_config.theme);
        // }
        ADD_theme();

        ///////////////////////////////////////////////////////////////////////////////////
        // 메인 or 스트림인 경우
        if(GM_page !== C_UCHAT){
            // Create Config DOE
            ADD_config_DOE();
            ADD_test_DOE();
            //twitch_interacite();

            // Change Logo class name
            $(".nav-brand").removeClass("nav-brand").addClass("nav-brand_mod");

            // Create Loading DOE
            $(".nav-brand_mod").empty().append("<div class=\"loader_container\" style=\"display:none;\"><div class=\"loader\"></div></div>");

            // History DOE
            ADD_Channel_History_Run();

            // Write config form from cookie
            ADD_var_to_config_form();

            // UHAHA Chat waiting
            $(document).arrive("#uha_chat", {onlyOnce: true, existing: true}, function(){
                ADD_chatting_arrive_for_UHAHA();
            });
        }

        ///////////////////////////////////////////////////////////////////////////////////
        // 채팅의 경우
        if(GM_page === C_UCHAT){
            // 테스트용 코드
            unsafeWindow.ADD_send_sys_msg = ADD_send_sys_msg;

            // nude.js
            // nude.init();

            // chat manager
            unsafeWindow.chat_manager = chat_manager;
        }
        else{
            // chat manager
            window.chat_manager_main = chat_manager;
        }

        pageChange();
    });


    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// $(document).load /////////////////////////////
    // DOE 로드 후 실행되어야 할 것들을 이 곳에 적는다
    // window.addEventListener ("load", function(){
    //     ADD_DEBUG("WINDOW_LOAD");
    // });


    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //                                    EVENT
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    // 디바운스 예시
    // var inside3 = $(".inside-3");
    // var thing3 = $(".thing-3");
    // var count3 = $(".count-3");
    // inside3.on('scroll', _.debounce(function() {
    // thing3.css("top", inside3[0].scrollTop);
    // count3.html(parseInt(count3.html())+1);
    // }, 100));

    //////////////////////////////////////////////////////////////////////////////////
    // change page check event
    function pageChange(){
        $(window).on("hashchange", function(e){   // $(window).on("popstate hashchange", function(e){
            ADD_DEBUG("페이지 이동", e);
            var document_url = location.href.toLowerCase();
            GM_page = urlCheck();
            if(GM_page === C_UCHAT){
                return;
            }
            if(GM_page === C_STREAM){
                ADD_now_playing.id = document_url.split("/").pop();
                ADD_now_playing.display_name = ADD_streamer_nick(ADD_now_playing.id);
            }

            // 스트림 계속 이어 보기 관련
            if(ADD_config.popup_player && GM_page !== C_MAIN){
                ADD_DEBUG("onpopstate - 페이지 이동", urlCheckerText[GM_page]);
                $(".stream_zoomout").remove();
                $(".stream_zoomin_screen").remove();
            }

            // 재생 중 트위치<->멀티트위치 전환 버튼 설정
            var twitch_url = document_url.indexOf("/twitch/");
            var multitwitch_url = document_url.indexOf("/multitwitch/");
            if(ADD_config.playing_chat_button && twitch_url  !== -1 || multitwitch_url  !== -1){
                $("#ADD_change_multi").css("opacity", "1.0").fadeIn(300);
            }
            else{
                $("#ADD_change_multi").css("opacity", "0.0").hide(300);
            }

            // 재생 중 트윕 버튼 설정
            if(ADD_config.playing_twip_button && (twitch_url  !== -1 || (multitwitch_url !== -1 && document_url.indexOf("&") === -1))){
                $("#ADD_twip").css("opacity", "1.0").fadeIn(300);
            }
            else{
                $("#ADD_twip").css("opacity", "0.0").hide(300);
            }

    
            // 재생 중 퀵 리스트 버튼 보이기
            if(ADD_config.playing_quick_list_button && GM_page === C_STREAM){
                $("#ADD_quick_list").css("opacity", "1.0").fadeIn(300);
            }
            else{
                $("#ADD_quick_list").css("opacity", "0.0").hide(300);
            }

            // 설정 화면에서 설정 버튼 숨기기
            if(GM_page === C_SETTING){
                $("#ADD_config").css("opacity", "0.0").hide();
            }
            // 재생 중 설정 버튼 숨기기
            else if(!ADD_config.playing_setting_button){
                if(GM_page === C_MAIN){
                    $("#ADD_config").css("opacity", "1.0").fadeIn(300);
                }
                else{
                    $("#ADD_config").css("opacity", "0.0").hide();
                }
            }
            else{
                $("#ADD_config").css("opacity", "1.0").fadeIn(300);
            }
        }).trigger("hashchange");
    }

    
    $(document).on("click", "header .nav-brand, header .nav-brand_mod", function(e){
        if(GM_page === C_MAIN){
            page = new dsStream();
            page.reload();
            ADD_multitwitch_DOE();
        }
        // 스트림 계속 이어 보기
        else if(ADD_config.popup_player && GM_page !== C_SETTING){
            //e.preventDefault();
            var display_name = ADD_now_playing.display_name;
            var ch_text = "";
            if(display_name.indexOf("&").length !== -1){
                var $temp_array = display_name.split("&");
                for (var j=0; j<$temp_array.length; j++){
                    if(j !== 0){
                        ch_text = ch_text+"&";
                    }
                    var temp_id = ADD_streamer_nick($temp_array[j]).toUpperCase();
                    ch_text = ch_text+temp_id;
                }
                display_name = ch_text;
            }
            if($(".stream_zoomout").length === 0){
                ADD_DEBUG("stream_zoomout 생성");
                $("#stream").addClass("stream_zoomout").attr("id","").after("<div id='stream'></div>");
                $(".stream_zoomout").css("position","fixed").css("bottom","30px").css("left","30px")
                    .css("padding","0").css("margin","0").css("width","280px").css("height","157.5px").css("z-index","100").css("border-radius","4px");
                var $doe = $(`
                <div class="stream_zoomin_screen" style="display:none;background:rgba(0,0,0,.6);user-select:none;">
                    <div class="stream_zoom_header" style="width:280px;height:40px;padding:5px;position:absolute;z-index:101;background:rgba(0,0,0,.6);color:#fff;font-size:20px;vertical-align:middle;">
                        <div style="display:inline-flex;margin-left:10px;margin-right:10px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;cursor:default;">
                            <span style="font-size:14px;">`+display_name+` 시청 중</span>
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
                        <div class="button_pause" style="margin-left:20px;cursor:pointer;padding:10px;display:none;">
                        <svg width="30px" height="30px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
                            <path d="M8 2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3zm7 0a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3z" style="fill:currentColor" fill-rule="evenodd"></path>
                        </svg>
                        </div>
                    </div>
                    <div style="width:280px;height:157.5px;padding:5px 10px;position:absolute;z-index:100;background-color:#000;opacity:0.5;"></div>
                </div>`);
                $(".stream_zoomout").prepend($doe);
                $doe.find(".button_expand").on("click", function(){
                    window.location.href = "http://www.dostream.com/#/stream/twitch/"+ADD_now_playing.id;
                    // 나머지 동작은 newdostream 에서 처리한다.
                    //$("#stream").empty();
                    //$(".stream_zoomout").attr("style","").removeClass("stream_zoomout").attr("id","stream");
                });
                $doe.find(".button_pause").on("click", function(){
                    twitch_player.pause();
                });
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
            window.open($(this).attr("href"), "_self");

        }
        // 스트림 계속 이어 보기 끝
    });

    var twitch_player;
    // function twitch_interacite(){
    //     if(!ADD_config.twitch_interacite || GM_page === C_UCHAT){
    //         return false;
    //     }

    //     // 헤드에 스크립트 추가
    //     // if($("#twitch_interactive_head").length === 0){
    //     //     ADD_DEBUG("헤드에 인터렉티브 트위치 스크립트 추가");
    //     //     $("head").append("<script id='twitch_interactive_head' src='https://embed.twitch.tv/embed/v1.js'></script>");
    //     // }

    //     // 페이지 이동 시 이벤트
    //     $(window).on("hashchange", function(e){
    //         ADD_DEBUG("onhashchange",e);
    //         twitch_interacite_run();
    //     }).trigger("hashchange");
    // }

    // // 인터렉티브 트위치 삽입하는 함수
    // function twitch_interacite_run(){
    //     if(ADD_config.twitch_interacite && GM_page === C_STREAM && location.href.toLowerCase().indexOf("/twitch/") !== -1){
    //         var stream_id = location.href.split("/").pop();
    //         ADD_DEBUG("인터렉티브 트위치");

    //         var temp_func = function(e){
    //             ADD_DEBUG("DOMNodeInserted", e);
    //             $("#stream").empty().html("<div id='twitch-embed' style='width:100%;height:100%'></div>"); // margin-top:-45px;padding-top:45px;box-sizing:border-box;font-size:0;
    //             var embed = new Twitch.Embed("twitch-embed", {
    //                 channel: stream_id,
    //                 width: "100%",
    //                 height: "100%",
    //                 layout: "video",
    //                 muted: ADD_config.twitch_interacite_unmute
    //             });
    //             embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
    //                 twitch_player = embed.getPlayer();
    //                 twitch_player.play();
    //                 ADD_DEBUG("embed", embed);
    //                 ADD_DEBUG("player", twitch_player);

    //                 // setVolume(0) : mute
    //                 // setMuted(false) : mute 풀기
    //             });

    //         };

    //         ADD_DEBUG("#stream iframe DOMNodeInserted 대기");
    //         $(document).one("DOMNodeInserted", "#stream", function(e){
    //             temp_func(e);
    //         });
    //     }
    // }

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
    $(document).on("click", "#ADD_twip", function(){
        if(ADD_now_playing.id !== undefined && ADD_now_playing.id !== ""){
            var ww = $(window).width(),
                wh = $(window).height();
            var wn = (ww > 850 ? 850 : ww/5*4);
            var left  = (ww/2)-(wn/2),
                top = (wh/2)-(wh/5*4/2);
            window.open("https://twip.kr/"+ADD_now_playing.id,"winname",
                "directories=yes,titlebar=yes,toolbar=yes,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width="+wn+",height="+wh/5*4+",top="+top+",left="+left);
        }
        else{
            ADD_DEBUG("ADD_now_playing 이 없다.", ADD_now_playing);
        }
    });

    //////////////////////////////////////////////////////////////////////////////////
    // 퀵리스트 온오프 이벤트
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
            $("#popup_ADD_quick").stop(true,true).fadeOut(300).find("ul").empty();
            $("#ADD_quick_list").removeClass("btn_opend");
        }
    });

    // 설정 창 온오프 이벤트
    $(document).on("click", "#ADD_config", async function(e){
        e.stopPropagation();
        if (!$("#ADD_config").hasClass("btn_opend")){
            await GM_setting.load();
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
    $(document).on("click", "html, ul.stream_list", function(){
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
        await ADD_save_config_to_data();

        if (local_api_refresh === true){
            local_api_refresh = false;
            api_push_forced = true;

            await twitch_api();
            twitch_api_call_interval();
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
        if(ADD_config.theme !== undefined){
            ADD_change_theme(ADD_config.theme);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    // reset cookie event
    $(document).on("click", "#Cookie_reset", async () => {
        var r = confirm("모든 설정을 초기화 하려면 확인(OK) 버튼을 누르세요.");
        if (r == true){
            await GM_setting.reset();
            ADD_var_to_config_form();
            ADD_status_cookie_remove();

            // 블록된 채팅 로그 초기화
            await ADD_SetVal("ADD_Blocked_Chat",[]);

            // 메모 쿠키 초기화
            await GM.deleteValue("ADD_chat_manager_data");

            // 테마 리셋
            if(ADD_config.theme !== undefined){
                ADD_change_theme(ADD_config.theme);
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
        var $temp_ADD_config = await GM.getValue("ADD_config");
        if(!IsJsonString($temp_ADD_config)){
            $temp_ADD_config = JSON.stringify($temp_ADD_config);
        }
        var $temp_ADD_chat_memo = await GM.getValue("ADD_chat_manager_data",[]);
        if(!IsJsonString($temp_ADD_chat_memo)){
            $temp_ADD_chat_memo = JSON.stringify($temp_ADD_chat_memo);
        }

        var backup_text = "<<<ADD_chat_memo>>>"+$temp_ADD_chat_memo+"<<<ADD_config>>>"+$temp_ADD_config+"<<<END>>>";
        var MD5_key = MD5(backup_text);
        ADD_DEBUG("backup_text",backup_text);
        ADD_DEBUG("MD5_key",MD5_key);

        backup_text = "<VERIFICATION_KEY:"+MD5_key+">"+backup_text;
        $("html").addClass("no-scroll");
        var backup_doe_text = `
            <div class="lightbox-opened">
            <div class="backup_doe" style="position: absolute; top: 50%;left:50%; width: 600px; height:300px; margin-left:-300px; margin-top:-150px;">
            <div style="width:600px;height:200px;cursor:default;" class="modal-content">
            <div style="padding:7px 0;font-size:12px;"><span style="font-weight:700;">Backup & Restore - 메모 및 주요 설정 백업 및 복원</span><br />복원 방법: 아래 기존 백업한 내용을 붙여넣기 후 SAVE (버전이 다르면 복원되지 않을 수 있음)</div>
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
        var $temp_ADD_config = await GM.getValue("ADD_config");
        var $temp_ADD_chat_memo = await GM.getValue("ADD_chat_manager_data", []);
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
                    else if($temp_ADD_config == restore_config && $temp_ADD_chat_memo == recorver_chat_memo){
                        text_contents = "현재 설정과 복원할 설정이 같아서 복원하지 않습니다. <br />나가려면 배경화면을 누르세요.";
                    }
                    else {
                        restore_config = IsJsonStringReturn(restore_config);
                        window["ADD_config"] = restore_config;
                        await GM_setting.save_overwrite();
                        ADD_var_to_config_form();
                        recorver_chat_memo = IsJsonStringReturn(recorver_chat_memo);
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
        ADD_DEBUG("ADD_config",ADD_config);
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

    // 스크롤 내림 여부 확인
    function isChatScrollOn(){
        // 향상된 자동 스크롤 사용 시
        if(ADD_config.chat_scroll){
            return isGoScrollDown;
        }
        // 향상된 자동 스크롤 사용하지 않는 경우
        else{
            var elem = $GLOBAL_IFRAME_DOCUMENT.find(".latest_chat");
            if(elem.length !== 0 && elem.is(":visible")){
                // ADD_DEBUG("현재 스크롤은 정지 상태 입니다");
                return false;
            }
            else if(elem.length !== 0 && !elem.is(":visible")){
                //ADD_DEBUG('현재 스크롤은 Free 상태 입니다');
                return true;
            }
            else{
                ADD_DEBUG("현재 스크롤은 알 수 없음 상태이므로 정지 상태로 가정", elem.length);
                return false;
            }
        }
    }

    function goScrollDown(){
        var roomid = "";
        if(GLOBAL_CHAT_IFRAME.contentWindow !== undefined &&
            GLOBAL_CHAT_IFRAME.contentWindow.rooms !== undefined){
            if(GLOBAL_CHAT_IFRAME.contentWindow.rooms["dostest"] !== undefined){
                roomid = "dostest";
            }
            else if(GLOBAL_CHAT_IFRAME.contentWindow.rooms["dostream"] !== undefined){
                roomid = "dostream";
            }
            else{
                roomid = Object.keys(GLOBAL_CHAT_IFRAME.contentWindow.rooms)[0];
            }
        }

        if(isGoScrollDown && roomid !== undefined && roomid !== "" && roomid !== null &&
            GLOBAL_CHAT_CONTENT_DIV !== undefined &&
            GLOBAL_CHAT_CONTENT_DIV.length !== 0){
            GLOBAL_CHAT_IFRAME.contentWindow.rooms[roomid].room.setting.data["option.autoScroll"] = 1;
            GLOBAL_CHAT_IFRAME.contentWindow.rooms[roomid].room.log.temp_scroll_stop = 0;
            GLOBAL_CHAT_CONTENT_DIV.scrollTop(GLOBAL_CHAT_CONTENT_DIV[0].scrollHeight);
        }
        else{
            //ADD_DEBUG("에러!! iframeElems GLOBAL_CHAT_ELEM", iframeElems, GLOBAL_CHAT_ELEM);
        }
    }


    $(document).on("click", "#at", function(){
        SIGONGJOA();
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
// 유저 정보 가져오기 $("iframe").contentWindow.rooms["dostream"].room.user.get("Guest_09713")
// $("iframe").contentWindow.rooms["dostream"].room.user["nick"].session

function diceCoefficient(l, r){
    if (l.length < 2 || r.length < 2) return 0;
  
    let lBigrams = new Map();
    for (let i = 0; i < l.length - 1; i++) {
        const bigram = l.substr(i, 2);
        const count = lBigrams.has(bigram)
            ? lBigrams.get(bigram) + 1
            : 1;
  
        lBigrams.set(bigram, count);
    }
  
    let intersectionSize = 0;
    for (let i = 0; i < r.length - 1; i++) {
        const bigram = r.substr(i, 2);
        const count = lBigrams.has(bigram)
            ? lBigrams.get(bigram)
            : 0;
  
        if (count > 0) {
            lBigrams.set(bigram, count - 1);
            intersectionSize++;
        }
    }
  
    return (2.0 * intersectionSize) / (l.length + r.length - 2);
}
