import "libs/date_format.js";
import { ADD_DEBUG, getTimeStamp, escapeHtml } from "../libs/nomo-utils.js";
import * as nomo_common from "./common.js";
import { streamer_search_dispname } from "./streamer-lib.js";

//////////////////////////////////////////////////////////////////////////////////
// 파싱 데이터 이용하여 layout 생성
export async function ADD_run(data,flag){
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
            case "chzzk":
                from = "CHZZK";
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

    // 메인 접속 시 실행될 것들
    // 1. 멀티트위치 클릭된 리스트 초기화
    nomo_global.multitwitch_checked_streamer_arr = [];

    if(flag !== 2){
        ADD_DEBUG("ADD_run - 파싱된 데이터 이용하여 스트림 리스트 layout 생성");
    }
    // 숨길 대상 스트리머 지우기
    if(ADD_config.streamer_hide){
        var h_index_ary = [];
        var hide_streamer = ADD_config.streamer_hide_ID;
        for(var i=0; i<hide_streamer.length; i++){
            var h_index = data.map(function(o){return o.streamer;}).indexOf(hide_streamer[i]);
            if(h_index === -1){
                h_index = data.map(function(o){return o.url.split("/").pop();}).indexOf(hide_streamer[i]);
            }
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
        ADD_DEBUG("layout 생성을 위해 Twitch API cookie 쿠키 정리 중...");
        // 로컬 변수 선언
        var temp_api_cookie = JSON.parse($.cookie("twitch_api_cookie"));
        if(temp_api_cookie === undefined || temp_api_cookie === null || temp_api_cookie.length === 0){
            ADD_DEBUG("layout 생성 중 Twitch API cookie 확인 실패!");
            ADD_DEBUG("temp_api_cookie", temp_api_cookie);
        }
        else{
            // 시청자 순으로 정렬하기 (alarm_sort_by_viewer)
            if(ADD_config.alarm_sort_by_viewer){
                temp_api_cookie.sort(function(a, b) {
                    return b.viewers - a.viewers;
                    //return b.viewers > a.viewers ? -1 : b.viewers < a.viewers ? 1 : 0;
                });
            }                

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
                    if(temp_api_cookie[i].game !== undefined){
                        temp_one.game = temp_api_cookie[i].game;
                    }
                    temp_one.from = "twitch";
                    temp_one.url = "/twitch/"+temp_api_cookie[i].name;
                    temp_one.image = "https://static-cdn.jtvnw.net/previews-ttv/live_user_"+temp_api_cookie[i].name+"-240x180.jpg";
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
                temp_one2.image = "https://static-cdn.jtvnw.net/previews-ttv/live_user_"+fixed_streamer_id+"-240x180.jpg";
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
        var isThumbRefresh = await nomo_common.GM_cache("thumbnail_refresh",Number(thumbRefreshGap)*60*1000);
        
        if(isThumbRefresh){
            nomo_global.getTimeStampRes = "?" + getTimeStamp("m");
        }
    }

    // display_name 채우기, 섬네일 수정하기
    for(i=0; i<data.length ; i++ ){
        if(data[i].title.replace(/\s/g,"") == ""){
            data[i].title = "　";
        }

        if(data[i].streamer == "togom"){
            data[i].viewers = data[i].viewers * 100;
        }

        if(ADD_config.thumbnail_refresh){
            data[i].image += nomo_global.getTimeStampRes;
        }
        
        if(data[i].main_favorite === true){
            continue;
        }

            
        if(data[i].from === "afreeca"){
            data[i].display_name = data[i].streamer;
            data[i].streamer = data[i].url.split("/").pop();
        }
        else if(data[i].from === "chzzk"){
            data[i].display_name = data[i].streamer;
            data[i].streamer = data[i].url.split("/").pop();
        }
        else{
            let dispname_temp = streamer_search_dispname(data[i].streamer, data[i].from);
            if(dispname_temp !== data[i].streamer){
                data[i].display_name = dispname_temp;
            }
            else{
                data[i].display_name = "";
            }
        }
    }

    if(flag == 2){
        nomo_global.latestList = data;
        return;
    }

    // 무조건 시청자 순으로 정렬하는 경우, 재정렬 한다.
    if(ADD_config.list_sort_by_viewer){
        data.sort(function(a, b) {
            return b.viewers - a.viewers;
        });
    }

    ADD_DEBUG("list - 정렬된 data", data);
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
            else if(data.from === "afreeca" && ADD_config.remember_afreeca){
                return true;
            }
            else if(data.from === "chzzk" && ADD_config.remember_chzzk){
                return true;
            }
        }

        if(data.from === "twitch"){
            twitch_append=`
                <div class="ADD_li_box_container">
                    <div class="ADD_li_box">
                        <div class="ADD_checkbox_container"` + (ADD_config.button_set ? "" : " style='display:none'") +`>
                            <label class="btn btn-default btn-xs" aria-label="멀티트위치 체크박스" data-microtip-position="top-left" role="tooltip">
                                <input class="ADD_checkbox" type="checkbox" name="chk" value="`+escapeHtml(data.streamer)+`" onfocus="this.blur()" autocomplete="off" />
                                <span class="glyphicon glyphicon-ok"></span>
                            </label>
                        </div>
                        <div class="multitwitch_button"` + (ADD_config.button_chatmode ? "" : " style='display:none'") +`>
                            <a href="/#/stream/multitwitch/`+escapeHtml(data.streamer)+`">
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
                display_name = data.display_name+" ("+data.streamer+")";
                break;
            case "kakao":
                display_name = "카카오";
                break;
            case "youtube":
                display_name = "유투브";
                break;
            case "chzzk":
                display_name = data.display_name;
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
            favorite_append = "<div style=\"position:relative;\"><div class=\"glyphicon glyphicon-star icon_star\"></div></div>";
        }
        var game = "";
        if(ADD_config.alarm_show_game_name && data.game !== undefined){
            game = "<div class=\"game\"> - "+escapeHtml(data.game)+"</div>";
        }
        append += `
                <li id="twitch_`+escapeHtml(data.streamer)+"\" class=\""+data.from+fixed_class+favorite_class+`">
                `+fixed_append+favorite_append+`
                <a href="/#/stream`+escapeHtml(data.url)+`">
                    <img src="`+data.image+`" width="90" hieght="60">
                    <div class="stream-wrap">
                        <div class="title">`+(escapeHtml(data.title))+`</div>
                        <div class="info">
                            <div class="from `+data.from+"\">"+escapeHtml(display_name)+`</div>
                            `+game+`
                            <div class="viewers">
                                <span class="glyphicon glyphicon-user"></span> `+escapeHtml(data.viewers)+`
                            </div>
                        </div>
                    </div>
                </a>
                `+twitch_append+`
            </li>`;
    });

    // 퀵리스트
    if(flag === 0){
        $ul = $("#stream .main-streams ul");
        
        if($ul === undefined){
            ADD_DEBUG("$ul 을 찾을 수 없다.");
            $("#stream .main-streams").append("<ul></ul>");
        }
        $("#stream .main-streams ul").empty().hide().append(append).fadeIn(300);
        $("#stream .main-streams ul").addClass("main_ul_addostream");

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

    // 업데이트 시간 알림
    await get_last_list_update_time();
    if(nomo_global.list_update_time !== undefined){
        var $ul_cont;
        if(flag === 0){
            $ul_cont = $("#stream .main-streams ul");
        }
        else {
            $ul_cont = $("#popup_ADD_quick ul");
        }
        var $last_list_update_time = $ul_cont.closest("div").find(".last_list_update_time");
        if($last_list_update_time.length === 0){
            $ul_cont.after(`
                <div class="last_list_update_time" style="font-size:${flag === 0 ? "11" : "10"}px;color:#999;clear:both;padding:5px 0;text-align:right;"></div>
            `);
            $last_list_update_time = $(".last_list_update_time");
        }
        $last_list_update_time.hide().html(
            `Last Updated : ${new Date(nomo_global.list_update_time).format("yyyy-MM-dd amp hh:mm:ss")}`
        ).fadeIn(300);
    }
}

// 체크박스 클릭 시 이벤트
$(document).on("click", "input[name=chk]", function(){
    var thisVal = $(this).val();
    var IndexThisVal = $.inArray(thisVal, nomo_global.multitwitch_checked_streamer_arr);
    $(this).parent("label.btn").toggleClass("active");

    if(IndexThisVal === -1){
        nomo_global.multitwitch_checked_streamer_arr.push(thisVal);
    }
    else{
        nomo_global.multitwitch_checked_streamer_arr.splice(IndexThisVal,1);
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

//////////////////////////////////////////////////////////////////////////////////
// 파싱 후 데이터 정리
export async function ADD_parse_list_data(flag){
    ADD_DEBUG("RUNNING - ADD_parse_list_data, flag = ", flag);
    var GM_cache_stream_list = true;
    if(ADD_config.main_list_cache || flag == 2){
        var main_list_cache_time = ADD_config.main_list_cache_time;
        if (flag == 2){
            main_list_cache_time = 5;
        }
        else if(!$.isNumeric(main_list_cache_time) || main_list_cache_time < 1){
            main_list_cache_time = 1;
        }
        GM_cache_stream_list = await nomo_common.GM_cache_read("GM_cache_stream_list", Number(ADD_config.main_list_cache_time)*60*1000);
        
    }
    if(GM_cache_stream_list){
        GM_xmlhttpRequest({
            url:"https://www.dostream.com/dev/stream_list.php",
            method: "GET",
            headers: {
                "Content-Type": "application/javascript"
            },
            timeout: 10000,
            onload: async function(response){
                var data = JSON.parse(response.responseText);
                if(data === null){
                    ADD_DEBUG("기본 파싱 리스트 존재하지 않음");
                    data = [];
                    // return;
                }
                else{
                    ADD_DEBUG("기본 파싱 리스트 콜 성공");
                }
                nomo_common.GM_cache_write("GM_cache_stream_list");
                GM.setValue("ADD_stream_list", data);
                ADD_run(data,flag);
                nomo_global.list_update_time = new Date();
                ADD_DEBUG("리스트 업데이트 시간 갱신 - 리스트:", nomo_global.list_update_time);
                
            }, onerror: async function(e){
                ADD_DEBUG("파싱 실패함", e);
                ADD_run([],flag);
            }, ontimeout: async function(e){
                ADD_DEBUG("타임아웃, 파싱 실패함", e);
                ADD_run([],flag);
            }
        });
    }
    else{
        // 데이터 읽어오기
        var data = await GM.getValue("ADD_stream_list", []);
        ADD_DEBUG("기본 리스트 캐시된 것 읽어옴", data);
        // 메인 리스트 갱신
        ADD_run(data,flag);
    }
}

async function get_last_list_update_time(){
    try{
        // 마지막 리스트 갱신 시간 읽어오기
        var GM_cached_time_list = await nomo_common.GM_cache_time_read("GM_cache_stream_list");
        var GM_cached_time_twitch = await nomo_common.GM_cache_time_read("GM_cache_twitch_api");

        // 리스트 갱신 시간 Max 값 찾기
        var GM_cached_time_max_arr = [];
        var GM_cached_time_max;
        if($.isNumeric(GM_cached_time_list)){
            GM_cached_time_max_arr.push(GM_cached_time_list);
        }
        if($.isNumeric(GM_cached_time_twitch)){
            GM_cached_time_max_arr.push(GM_cached_time_twitch);
        }
        if(GM_cached_time_max_arr.length !== 0){
            GM_cached_time_max = Math.max.apply(null, GM_cached_time_max_arr);
        }
        if($.isNumeric(GM_cached_time_twitch)){
            nomo_global.list_update_time = new Date(GM_cached_time_max);
        }
        else{
            nomo_global.list_update_time = undefined;
        }
    }
    catch(e){
        ADD_DEBUG("error from function get_last_list_update_time()", e);
        nomo_global.list_update_time = undefined;
    }
}