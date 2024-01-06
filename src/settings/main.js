import nomo_const from "general/const.js";
import * as nomo_common from "general/common.js";
import * as nomo_theme from "general/theme.js";
import {ADD_DEBUG} from "libs/nomo-utils.js";
import {ADD_channel_history_run} from "general/browse_history.js";
import * as nomo_coord from "general/coord.js";
import {ADD_send_location_layout} from "chat/send_coord.js";
import {versionStrtoNum} from "settings/version.js";
import {memoLoglayoutInit} from "chat/simple_memo_log.js";
import {blocked_chat_layout} from "general/menu_layout.js";
import {chat_tooltip_toggle, chat_type_and_go_main} from "chat/control.js";
import {uhaha_chat_delete_hide} from "chat/control_uhaha.js";

const _settings = {
    last_version : { disable:true, depth:1, type: "set", value: Number(versionStrtoNum(GM.info.script.version)), title:{ko:"마지막 버전", en:"Latest Version"}, desc:"" },
    //version_check : { category:"version", depth:1, type: "checkbox", value:true, title:"새 버전 체크", desc:"새로운 애드온 버전이 있는지 자체적으로 체크함"},
    //version_check_interval : { under_dev:true, category:"version", depth:2, type: "text", value:12, valid:"number", min_value:1, title:"새 버전 체크 주기", desc:"새 버전을 체크할 시간 간격<br />시간 단위로 입력, 최소 1시간(기본값: 12)"},
    history : { category_name:"일반", category_desc:"", category:"general", depth:1, type: "checkbox", value: false, title:"두스트림 상단에 나의 시청 기록을 표시", desc:"", change:function(){ADD_channel_history_run();} },
    history_hide_icon : { category:"general", depth:2, type: "checkbox", value: false, title:"시청 기록에서 플랫폼 아이콘을 숨김", desc:"", change:function(){ADD_channel_history_run();} },
    max_history : { under_dev:true, category:"general", depth:2, type: "text", value: 20, valid:"number", min_value:1, title:"시청 기록 최대 개수", desc:"(기본값: 20)" },
    
    //tableTest4 : { category:"general", depth:2, type: "table", head:["head1", "head2"], value: [["test1","test2"],["test3","test4"]], title:"테이블 테스트", desc:"(기본값: 20)" },

    theme_leftchat : { category:"theme", category_name:"테마", category_desc:"", depth:1, type: "checkbox", value: false, title:"채팅창 위치를 왼쪽으로 변경", desc:"", change:function(){nomo_theme.ADD_theme();} },
    theme_on : { category:"theme", depth:1, type: "checkbox", value: false, title:"테마 기능 사용", desc:"", change:function(){nomo_theme.ADD_theme();}},
    theme : { category:"theme", depth:2, type: "radio", value: "default", title:"테마 선택", desc:"", radio: {default: {title: "기본", value:"default"}, black: {title: "블랙", value:"black"}, black_youtube: {title: "다크(Youtube Style)", value:"black_youtube"}/*, dark: {title: "다크(테스트)", value:"dark"} */}, change:function(){nomo_theme.ADD_theme();}},
    theme_self_bold_chat : { under_dev:true, category:"theme", depth:2, type: "checkbox", value: false, title:"자신의 채팅을 굵게 표시", desc:"", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.ADD_theme();}} },
    theme_font_size : { category:"theme", depth:2, type: "text", value: 1.0, valid:"number", min_value:0.1, max_value:10, title:"채팅 글씨 크기 조절(배수)", desc:"(기본값: 1.0)", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.ADD_theme();}} },
    theme_font_custom : { category:"theme", depth:2, type: "radio", value: "default", radio: {default: {title: "기본", value:"default"}, NotoSanskr: {title: "Noto Sans KR", value:"NotoSanskr"}}, title:"폰트 변경", desc:"일부 OS, 브라우저에서 적용되지 않을 수 있음", change:function(){nomo_theme.ADD_theme();} },
    theme_night_mode : { under_dev:true, category:"theme", depth:2, type: "checkbox", value: "default", title:"야간 모드", desc:"지정된 시간에 테마를 지정한 테마로 변경", change:function(){nomo_theme.ADD_night_mode();}},
    theme_night_mode_theme : { under_dev:true, category:"theme", depth:3, type: "radio", value: "black", title:"테마 선택", desc:"", radio: { black: {title: "블랙", value:"black"}, black_youtube: {title: "다크", value:"black_youtube"}}, change:function(){{nomo_theme.ADD_night_mode();}} },
    theme_night_mode_start : { under_dev:true, category:"theme", depth:3, type: "text", value: 0, valid:"number", min_value:0, max_value:24, title:"시작 시간", desc:"0 ~ 24<br />참고) X시 30분의 경우 X.5 처럼 소수점으로 입력", change:function(){nomo_theme.ADD_night_mode();}},
    theme_night_mode_end : { under_dev:true, category:"theme", depth:3, type: "text", value: 7, valid:"number", min_value:0, max_value:24, title:"종료 시간", desc:"0 ~ 24", change:function(){nomo_theme.ADD_night_mode();}},

    insagirl_button : { category:"coord", category_name:"좌표", category_desc:"", depth:1, type: "checkbox", value: false, title:"빠른 좌표 보기 활성", desc:"좌표 페이지를 두스트림 내부에서 불러오는 기능을 활성", change:function(){nomo_coord.hrm_layout();} },
    insagirl_block_by_nick : { category:"coord", depth:1, type: "checkbox", value: false, title:"차단한 유저의 좌표 숨기기", desc:"채팅매니저에서 차단한 유저의 좌표를 숨김" },
    insagirl_block_dobae : { category:"coord", depth:1, type: "checkbox", value: false, title:"연속된 동일 좌표 숨기기", desc:"동일 유저가 같은 좌표를 연속하여 올릴 경우 가장 최근의 것만 남기고 숨김" },
    insagirl_block_dobae_by_href : { category:"coord", depth:2, type: "checkbox", value: false, title:"동일 유저가 아닐 경우에도 숨김", desc:"유저에 상관 없이 동일 좌표가 연속되는 경우 무조건 숨김" },
    // insagirl_select : { under_dev:true, category:"coord", category_name:"좌표 - 고급", category_desc:"", depth:1, type: "radio", value: 2, title:"좌표 사이트 선택", desc:"", radio: {dostream: {title: "<span style='font-size:11px;text-decoration:line-through;'>coord.dostream.com</span>", value:1}, insagirl: {title: "<span style='font-size:11px;'>insagirl-hrm.appspot.com</span>", value:2}} },
    // insagirl_modify_directly : { under_dev:true, category:"coord", depth:1, type: "checkbox", value: false, title:"좌표 사이트에 직접 적용", desc:"실험 중" },
    
    list : { category:"list", category_name:"리스트", category_desc:"", depth:1, type: "checkbox", value:true, title:"메인 리스트 관리 기능 사용", desc:"메인 리스트 관리 기능을 일괄적으로 켜고 끈다."},
    show_display_name : { under_dev:true, category:"list", depth:2, type: "checkbox", value:true, title:"스트리머 이름 보이기", desc:"표시 가능한 스트리머의 이름 및 아이디를 표시"},
    
    thumbnail_mouse : { category:"list", category_name:"리스트 - 섬네일", depth:2, type: "checkbox", value: false, title:"섬네일에 마우스 올렸을 시 확대", desc:"두스 메인 리스트의 섬네일에 마우스를 올렸을 때 확대한 팝업을 띄움" },
    thumbnail_size : { category:"list", depth:3, type: "radio", value: 1, title:"섬네일 사이즈", desc:"", radio: {small: {title: "작음", value:1}, medium: {title: "보통", value:2}, large:{title: "큼", value:3} } },
    thumbnail_refresh : { under_dev:true, category:"list", depth:2, type: "checkbox", value: true, title:"리스트 섬네일 자동 갱신", desc:"- 리스트 섬네일을 자동으로 갱신<br />- 체크 해제 시 새로고침 이전까지 초기 접속 시 섬네일 유지됨" },
    thumbnail_refresh_gap : { under_dev:true, category:"list", depth:3, type: "text", value: 5, valid:"number", min_value:1, title:"갱신 간격", desc:"분 단위로 입력, 최소 1분(기본값: 5)" },

    top_fix : { category:"list", category_name:"리스트 - 상단 고정", depth:2, type: "checkbox", value: false, title:"특정 스트리머 상단 고정", desc:"두스 메인 리스트의 최상단에 원하는 스트리머를 고정"},
    top_fix_ID : { category:"list", depth:3, type: "tag", value: ["hanryang1125"], valid:"array_string", title:"고정할 스트리머 ID", desc:"스트리머 ID를 콤마(,)로 구분하여 입력<br />영문, 숫자, 언더바(_) 만 입력 가능"},
    top_off_fix : { category:"list", depth:3, type: "checkbox", value: false, title:"오프라인 시에도 고정", desc:""},
            
    alarm : { category:"list", category_name:"리스트 - 추가", depth:2, type: "checkbox", value: false, title:"메인에 스트리머 추가", desc:"기본 두스 메인 리스트에 없는 Twitch 스트리머를 메인 리스트에 추가 (본 기능을 사용하기 위해서는 Twitch 계정과의 연동이 필요함)", append:$("<span class='btn btn-primary' style='margin-top:30px;'>Twitch 계정 연동</span>").on("click", function(){
        ADD_DEBUG("Twitch 계정 연동 버튼 클릭됨");
        var ww = $(window).width(),
            wh = $(window).height();
        var wn = (ww > 850 ? 850 : ww/5*4);
        window.open("https://www.dostream.com/addostream/twitch/auth/","winname",
            "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width="+wn+",height="+wh/5*4);
    }) },
    top_alarm_ID : { category:"list", depth:3, type: "tag", value: ["hanryang1125"], valid:"array_string", title:"추가할 스트리머 ID", desc:"스트리머 ID를 콤마(,)로 구분하여 입력<br />영문, 숫자, 언더바(_) 만 입력 가능", change:async function(){await nomo_common.nomo.setVal("ADD_twitch_api_refresh_force", true);} },
    alarm_gap : { category:"list", depth:3, type: "text", value: 5, valid:"number", min_value:1, title:"조회 간격", desc:"분 단위로 입력, 최소 1분(기본값: 5)" },
    alarm_noti : { category:"list", depth:3, type: "checkbox", value: false, title:"온라인 시 알림(수정 중)", desc:"위 목록에 등록된 스트리머가 온라인이 될 때 데스크톱 메시지로 알림" },
    alarm_main_reload : { under_dev:true, category:"list", depth:3, type: "checkbox", value: true, title:"스트림 정보 갱신 시 리스트 새로고침", desc:"두스트림 메인 화면인 경우 스트림 정보 갱신 시 두스 메인 리스트를 자동으로 새로고침 함" },
    alarm_show_game_name : { under_dev:true, category:"list", depth:3, type: "checkbox", value: false, title:"게임 이름 표시", desc:"게임 이름을 표시할 수 있는 경우 리스트에 표시" },
    alarm_sort_by_viewer : { under_dev:true, category:"list", depth:3, type: "checkbox", value: false, title:"시청자 수로 정렬", desc:"입력한 순서로 정렬하는 대신 시청자 수가 많은 스트리머가 위로 오도록 정렬" },
    streamer_hide : { category:"list", category_name:"리스트 - 제거", depth:2, type: "checkbox", value: false, title:" 특정 스트리머 숨기기", desc:"기본 두스트림에 메인에 노출하고 싶지 않은 Twitch 스트리머를 메인 리스트에서 제거" },                 // 메인에 스트리머 숨기기 사용 여부
    streamer_hide_ID : { category:"list", depth:3, type: "tag", value: ["nalcs1", "nalcs2"], valid:"array_string", title:"숨길 스트리머 ID", desc:"스트리머 ID를 콤마(,)로 구분하여 입력<br />영문, 숫자, 언더바(_) 만 입력 가능" },
    remember_platform : { category:"list", depth:2, type: "checkbox", value: false, title:"특정 플랫폼 숨기기", desc:"기본 두스트림에 메인에 노출하고 싶지 않은 플랫폼에 해당되는 항목을 메인 리스트에서 제거" },
    remember_twitch : { category:"list", depth:3, type: "checkbox", value: false, title:"트위치 숨기기", desc:"" },
    remember_kakao : { category:"list", depth:3, type: "checkbox", value: false, title:"카카오 숨기기", desc:"" },
    remember_youtube : { category:"list", depth:3, type: "checkbox", value: false, title:"유투브 숨기기", desc:"" },
    remember_afreeca : { category:"list", depth:3, type: "checkbox", value: false, title:"아프리카 숨기기", desc:"" },
    remember_chzzk : { category:"list", depth:3, type: "checkbox", value: false, title:"치지직 숨기기", desc:"" },
    
    main_list_cache : { under_dev:true, category:"list", category_name:"리스트 - 고급", depth:2, type: "checkbox", value:true, title:"메인 리스트 캐쉬", desc:"빠른 메인 로딩을 위해 메인 리스트를 캐쉬함"},
    main_list_cache_time : { under_dev:true, category:"list", depth:3, type: "text", value: 3, valid:"number", min_value:1, title:"캐쉬 간격", desc:"분 단위로 입력, 최소 1분(기본값: 3)" },
    button_set : { under_dev:true, category:"list", depth:2, type: "checkbox", value:true, title:"버튼 모음 생성", desc:"- 트위치, 카카오, 유투브, 멀티트위치 버튼 모음을 생성<br />- 리스트에 멀티트위치 선택을 위한 체크박스를 생성"},
    button_chatmode : { under_dev:true, category:"list", depth:2, type: "checkbox", value:true, title:"채팅 모드 버튼 생성", desc:"리스트의 각 항목에 채팅 모드 버튼을 생성"},
    list_sort_by_viewer : { under_dev:true, category:"list", depth:2, type: "checkbox", value: false, title:"🧪 무조건 시청자 수로 정렬", desc:"- 무조건 시청자 수가 많은 항목이 위로 오도록 정렬<br />- 리스트 순서와 관련된 다른 모든 설정을 무시" },
    main_list_two_column : { under_dev:true, category:"list", depth:2, type: "checkbox", value:false, title:"🧪 메인 리스트를 두 줄로 표시", desc:"- 모니터 가로 해상도 1920 이상에 권장<br />- 섬네일 기능 사용 시 중간 설정이 적당함", change:function(){nomo_common.reloadMain();}},

    playing_quick_list_button : { category:"playing", category_name:"재생 중", category_desc:"", depth:1, type: "checkbox", value: true, title:"퀵 리스트 버튼 표시", desc:"재생 중 팝업으로 메인 리스트를 볼 수 있도록 퀵 리스트 버튼을 표시", change:function(){$(window).trigger("hashchange");} },
    playing_setting_button : { category:"playing", depth:1, type: "checkbox", value: true, title:"설정 버튼 표시", desc:"재생 중 설정 버튼을 표시. 체크 해제 시 설정 버튼은 메인에서만 노출됨", change:function(){$(window).trigger("hashchange");} },
    playing_chat_button : { category:"playing", depth:1, type: "checkbox", value: true, title:"트위치↔멀티트위치 전환 버튼 표시", desc:"트위치 또는 멀티트위치 재생 시 서로 전환할 수 있는 버튼을 표시.<br />치지직의 경우 채팅을 on-off", change:function(){$(window).trigger("hashchange");} },
    playing_chat_iframe : { under_dev:true, category:"playing", depth:2, type: "checkbox", value: false, title:"단독 재생의 경우 페이지 전환 없이 채팅 표시", desc:"트위치로 한 개의 스트림을 단독 재생하고 있는 경우 멀티트위치로 전환하는 대신 popout 채팅을 띄움" },
    playing_chat_iframe_theme : { under_dev:true, category:"playing", depth:3, type: "radio", value: "default", title:"채팅창 테마 선택", desc:"", radio: {default: {title: "애드온 테마를 따름", value:"default"}, white: {title: "White", value:"white"}, dark: {title: "Dark", value:"dark"} }},
    playing_chat_iframe_width : { under_dev:true, category:"playing", depth:3, type: "text", value: 350, title:"채팅 가로 너비(width, px)", min_value:0, max_value:10000, desc:"", change:function(){var $sci = $(".stream_chat_iframe"); var cpage = nomo_common.ADD_get_page_type(); if(ADD_config.playing_chat_iframe && (cpage === nomo_const.C_STREAM || cpage === nomo_const.C_MAIN) && $sci.length !== 0){$sci.css("width", ADD_config.playing_chat_iframe_width+"px");$("#stream > iframe").first().css("width",`calc(100% - ${ADD_config.playing_chat_iframe_width}px)`);}} },
    // playing_twip_button : { disable:true, under_dev:true, category:"playing", category_name:"재생 중 - 고급", depth:1, type: "checkbox", value: false, title:"🧪 Twip 버튼 표시", desc:"트위치 재생 시 Twip donate 버튼을 표시<br /> - 스트리머의 Dashboard 에 기재된 twip.kr 링크로 접속<br />링크를 찾을 수 없는 경우 버튼 표시하지 않음<br /><br />주의사항: <br /> - 반드시 주소창의 주소 및 도네이션 수령자가 올바른지 확인할 것<br /> - 오작동으로 잘못 도네이션 되더라도 책임지지 않음", change:function(){$(window).trigger("hashchange");} },
    // playing_twip_button_force : { disable:true, under_dev:true, category:"playing", depth:2, type: "checkbox", value: false, title:"🧪 Twip 버튼을 항상 표시", desc:"Dashboard 에 twip.kr 링크가 없더라도 무조건 표시<br />https://twip.kr/donate/{streamer-id} 링크로 접속", change:function(){$(window).trigger("hashchange");} },
    // playing_toonat_button : { disable:true, under_dev:true, category:"playing", depth:1, type: "checkbox", value: false, title:"🧪 Toonation 버튼 표시", desc:"트위치 재생 시 Toonation donate 버튼을 표시<br /> - 스트리머의 Dashboard 에 기재된 toon.at 링크로 접속<br />링크를 찾을 수 없는 경우 버튼 표시하지 않음<br /><br />주의사항:<br /> - 반드시 주소창의 주소 및 도네이션 수령자가 올바른지 확인할 것<br /> - 오작동으로 잘못 도네이션 되더라도 책임지지 않음", change:function(){$(window).trigger("hashchange");} },

    chat_ctr : { category:"chat", category_name:"채팅", category_desc:"", depth:1, type: "checkbox", value: true, title:"채팅 제어", desc:"- 채팅 관련 기능을 일괄적으로 켜고 끔<br />- 채팅 관련 기능은 새로고침 해야 적용됨" },
    chat_memo : { category:"chat", depth:2, type: "checkbox", value: true, title:"채팅매니저 기능 사용 (메모 기능)", desc:"- 채팅 닉네임 클릭 시 메모하기 버튼 표시<br />- 닉네임별 메모 작성/차단 가능<br />- 작성한 메모는 채팅창의 닉네임 뒤에 표시됨<br />- 차단 기능은 기존 두스 차단 기능과 별개로 작동하므로, 차단목록이 날아가더라도 보존됨", append:$("<span class='show_memo_log btn btn-primary' style='margin-top:30px;'>채팅매니저 관리</span>").on("click", async () => {
        ADD_DEBUG("메모 로그 버튼 클릭됨");
        memoLoglayoutInit();
    }) },
    chat_userlist_memo_top : {  disable:true, category:"chat", depth:3, type: "checkbox", value: false, title:"유저리스트 관리", desc:"" },
    chat_adb : { disable:true, category:"chat", depth:2, type: "checkbox", value: false, title:"광고 제거", desc:"" },
    hide_nick_change : { disable:true, category:"", depth:2, type: "checkbox", value: false, title:"닉네임 변경 메시지 숨기기", desc:"" },
    url_self : { category:"chat", depth:2, type: "checkbox", value: true, title:"두스트림 좌표의 경우 현재 창에서 열기", desc:"두스 좌표가 새 창으로 열리는 것을 막음" },
    chat_scroll : { category:"chat", depth:2, type: "checkbox", value: true, title:"자동스크롤 변경", desc:"- 채팅창의 자동스크롤이 끊기는 것을 방지하기 위해 자동스크롤의 동작 방식을 변경<br /><br /><strong>동작 원칙:</strong><br />- 마우스 휠을 위로 굴리면 자동스크롤 멈춤<br />- 더 보기 버튼을 누르거나 맨 아래로 휠 하여 자동스크롤을 재시작할 수 있음<br />- 그 이외의 모든 스크롤 관련 동작은 무시됨" },
    chat_scroll_down_min : { under_dev:true, category:"chat", depth:3, type: "text", value: 50, valid:"number", min_value:0, title:"자동 스크롤 재시작 거리(px)", desc:"스크롤이 정지 상태일 때 스크롤 내림 시 최하단과의 거리가 설정 값 이하가 되면 자동스크롤을 재시작(기본값:50)" },
    send_location_button : { category:"chat", depth:2, type: "checkbox", value: false, title:"좌표 보내기 버튼 활성", desc:"클릭 시 현재 주소를 채팅창 입력란에 바로 복사", change:function(){ADD_send_location_layout();} },
    send_location_button_top : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"좌표 버튼을 채팅창 상단에 고정", desc:"체크 해제 시 채팅창 하단에 고정됨", change:function(){ADD_send_location_layout();} },
    send_location_existing : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"기존에 입력해둔 채팅 내용 유지", desc:"좌표 보내기 버튼을 눌렀을 때, 채팅 입력란의 내용을 유지하고 좌표 링크를 뒤에 덧붙임" },
    send_location_immediately : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"좌표 바로 전송", desc:"- 좌표 버튼을 누르면 좌표를 채팅 입력란에 복사하는 것을 건너뛰고 채팅창에 바로 전송<br />- 재사용 대기시간: 10초" },
    
    chat_image_preview : { category:"chat", category_name:"채팅 - 이미지 미리보기", depth:2, type: "checkbox", value: true, title:"이미지 미리보기", desc:"이미지 주소 형태의 링크가 채팅창에 등록되면 바로 보여줌" },
    imgur_preview_safe : { category:"chat", depth:3, type: "checkbox", value: true, title:"후방주의 기능 활성", desc:"이미지를 어둡게 가려진 상태로 보여줌<br />버튼을 클릭해야 이미지 보기 가능" },
    imgur_preview_opacity : { category:"chat", depth:4, type: "text", value: 0.93, valid:"number", min_value:0, max_value:1, title:"박스 투명도", desc:"0:투명, 1:불투명, 기본값:0.93" },
    nudity_block : { disable:true, category:"chat", depth:4, type: "checkbox", value: false, title:"피부톤 이미지에만 후방주의 기능 활성", desc:"피부톤 이미지인 경우에만 후방주의 기능을 활성<br />너굴맨이 이미지를 먼저 확인한 후 피부색이 없어야 출력하므로 이미지가 조금 늦게 뜰 수 있다.<br />추가 이미지 로드 시에는 적용되지 않는다." },
    chat_image_youtube_thumb : { category:"chat", depth:3, type: "checkbox", value: true, title:"유투브 섬네일 미리보기", desc:"" },
    chat_image_youtube_thumb_nonsafe : { under_dev:true, category:"chat", depth:4, type: "checkbox", value: false, title:"유투브 섬네일에 대해 후방 주의 기능 사용하지 않음", desc:"" },
    chat_image_twitch_thumb : { category:"chat", depth:3, type: "checkbox", value: true, title:"트위치 클립 섬네일 미리보기", desc:"" },
    chat_image_twitch_thumb_nonsafe : { under_dev:true, category:"chat", depth:4, type: "checkbox", value: false, title:"트위치 클립 섬네일에 대해 후방 주의 기능 사용하지 않음", desc:"" },
    chat_video_play_top_fix : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"채팅 내 동영상 재생 시 상단 고정", desc:"Youtube, Twitch Clip" },
    imgur_preview : { category:"chat", depth:3, type: "checkbox", value: true, title:"Imgur 이미지 미리보기", desc:"Imgur 주소 형태의 링크가 채팅창에 등록되면 바로 보여줌 (Imgur API 사용)" },
    imgur_preview_gif_as_mp4 : { under_dev:true, category:"chat", depth:4, type: "checkbox", value: true, title:"gif 를 동영상 형태로 불러옴", desc:"gif 파일 대신 mp4 파일이 사용 가능한 경우 더 빠른 로딩을 위해 동영상 형태로 불러옴" },
    gfycat_preview : { category:"chat", depth:3, type: "checkbox", value: true, title:"Gfycat 동영상 미리보기", desc:"Gfycat 주소 형태의 링크가 채팅창에 등록되면 바로 보여줌 (Gfycat API 사용, 테스트 중)" },
    chat_video_autoplay : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: true, title:"동영상 자동 재생", desc:"Imgur, Gfycat 등에서 동영상을 불러오는 경우 음소거 된 상태로 자동 재생함" },
    chat_image_mouseover_prevent : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: true, title:"이미지 링크 주소에 마우스 올려도 팝업 띄우지 않음", desc:"이미지 미리보기 기능을 사용하는 경우, 이미지 링크 주소에 마우스 커서를 올렸을 때 작은 미리보기 팝업을 띄우는 것을 막음(UCHAT의 기본 기능)" },
    chat_image_max_width : { under_dev:true, category:"chat", depth:3, type: "text", value: 325, valid:"number", min_value:1, title:"이미지 최대 너비(width, px)", desc:"이미지 가로(width) 최대 길이(기본값:325)" },
    chat_image_max_height : { under_dev:true, category:"chat", depth:3, type: "text", value: 600, valid:"number", min_value:1, title:"이미지 최대 높이(height, px)", desc:"이미지 세로(height) 최대 길이(기본값:600)" },
    
    chat_block : { category:"chat", category_name:"채팅 - 금지단어 차단", depth:2, type: "checkbox", value: false, title:"금지단어 기반 채팅 차단 사용", desc:"채팅 내용 또는 닉네임에 금지단어 리스트에 추가한 단어가 포함되어 있는 경우 해당 채팅을 차단함" },
    chat_block_tag : { category:"chat", depth:3, type: "tag", valid:"array_word", value: ["네다통","통구이","민주화","ㅁㅈㅎ","느금마","니애미","니어미","니엄마","니애비","느그애비","느그애미","애미터","애미뒤","앰뒤","앰창"], title:"금지단어 리스트", desc:"콤마로 구분" },
    chat_block_noti : { category:"chat", depth:3, type: "checkbox", value: false, title:"차단 후 &lt;message deleted&gt; 로 표시", desc:"- 차단 후 기존 채팅 내용을 &lt;message deleted&gt; 로 대체<br />- 마우스를 올리면 툴팁으로 내용을 볼 수 있음" },
    chat_block_nickname : { category:"chat", depth:3, type: "checkbox", value: false, title:"검색대상: 닉네임", desc:"채팅 닉네임에 금지단어가 있으면 차단" },
    chat_block_contents : { category:"chat", depth:3, type: "checkbox", value: false, title:"검색대상: 내용", desc:"- 채팅 내용에 금지단어가 있으면 차단<br />- 닉네임을 바꿔가며 유사 내용을 도배하는 환경에서 유용<br />- 자주 올라오는 Imgur 이미지를 차단할 때 유용" },
    chat_block_record : { category:"chat", depth:2, type: "checkbox", value: true, title:"채팅 차단 로그 기록", desc:"금지단어 및 채팅매니저에 의해 차단된 채팅 로그를 기록함",
        append:(function(){
            var $return = $(`<span></span>`);
            var $show_blocked_chat = $("<span class='show_blocked_chat btn btn-primary'>채팅 로그 보기</span>")
                .on("click", async function(){
                    ADD_DEBUG("채팅 로그 보기 버튼 클릭됨");
                    await blocked_chat_layout();
                });
            var $reset_blocked_chat = $("<span class='reset_blocked_chat btn btn-primary'>채팅 로그 초기화</span>")
                .on("click", async function(){
                    ADD_DEBUG("채팅 로그 초기화 버튼 클릭됨");
                    var conf = confirm("채팅 로그를 초기화 하시겠습니까?");
                    if(conf){
                        await nomo_common.nomo.setVal("ADD_Blocked_Chat", []);
                        alert("채팅 로그 초기화 완료! "+(new Date()).toLocaleTimeString());
                    }
                });
            var $container = $("<div style='margin-top:30px;'></div>");
            $container.append($show_blocked_chat).append($reset_blocked_chat);
            return $return.append($container);
        })()
    },
    chat_block_log_letter_limit : { under_dev:true, category:"chat", depth:3, type: "text", value: 40, valid:"number", min_value:0, max_value:100000, title:"채팅 내용을 잘라서 기록", desc:"채팅 로그 기록 시 설정된 글자 수 만큼 채팅 내용을 잘라서 기록함(기본값 40)" },
    chat_block_log_limit : { under_dev:true, category:"chat", depth:3, type: "text", value: 100, valid:"number", min_value:0, max_value:100000, title:"차단된 채팅 로그 최대 개수", desc:"- 채팅매니저 차단, 금지단어 차단에 의해 기록된 채팅 로그의 최대 개수를 설정<br />- 이 값을 크게 설정할 시 리소스를 많이 차지할 수 있으며, 알 수 없는 에러가 발생할 수 있음 (기본값:100)" },
    
    chat_dobae_block : { category:"chat", category_name:"채팅 - 도배 대응", depth:2, type: "checkbox", value: false, title:"도배 채팅 숨기기 사용", desc:"동일 유저가 짧은 시간동안 유사한 문장을 지정된 횟수 이상 반복하여 입력하는 경우 도배로 판단하고 내용을 숨김" },
    chat_dobae_repeat : { category:"chat", depth:3, type: "text", value: 2, valid:"number", min_value:2, max_value:10, title:"채팅 숨김 - 반복 입력 수 (회)", desc:"지정된 반복 입력 수 이상 올라온 채팅부터 숨김. (기본값:2회)" },
    chat_dobae_onlylink : { category:"chat", depth:3, type: "checkbox", value: false, title:"채팅 내용에 링크 포함 시에만 도배 판단", desc:"채팅 내용에 링크가 포함된 것만 도배 판단을 위해 카운트함" },
    chat_dobae_block_autoban : { category:"chat", depth:3, type: "checkbox", value: false, title:"도배 유저를 채팅매니저로 자동 차단", desc:"<span style='color:red;'>설정 값에 따라 무차별 차단이 발생할 수 있으니 사용에 유의하십시오.<br />예) ㅋㅋㅋ를 반복 입력하는 유저도 차단됨" },
    chat_dobae_block_autoban_repeat : { category:"chat", depth:4, type: "text", value: 4, valid:"number", min_value:2, max_value:10, title:"유저 차단 - 반복 입력 수 (회)", desc:"지정된 반복 입력 수 이상 올라온 채팅부터 차단. (기본값:4회)" },
    chat_dobae_block_onlylink : { category:"chat", depth:4, type: "checkbox", value: false, title:"채팅 내용에 링크 포함 시에만 차단", desc:"- 채팅 내용에 링크가 포함되지 않은 경우 채팅은 숨기지만 자동 차단은 하지 않음<br />- [링크 포함 시에만 도배 판단] 옵션을 끄는 것을 권장함" },
    chat_dobae_judge : { under_dev:true, category:"chat", depth:3, type: "text", value: 0.8, valid:"number", min_value:0.1, max_value:1, title:"문장 유사도", desc:"도배로 판단할 문장 유사도 설정<br />1 : 문장이 완전 일치하는 경우에만 차단<br />0 에 가까울 수록 불일치하는 경우에도 차단<br />(기본값:0.8)" },
    chat_dobae_timelimit : { under_dev:true, category:"chat", depth:3, type: "text", value: 8, valid:"number", min_value:0, max_value:120, title:"판단 시간 (초)", desc:"지정된 시간 이전에 올라온 채팅에 대해서는 도배 여부를 판단하지 않음(기본값:8초)" },
    chat_dobae_block_record : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: true, title:"채팅 차단 로그에 기록", desc:"도배로 판단된 채팅을 채팅 차단 로그에 기록" },
    
    chat_autoKeyword : { category:"chat", depth:2, type: "checkbox", category_name:"채팅 - 고급", value: true, title:"스트리머 닉네임을 링크로 변환", desc:"스트리머 닉네임 감지 시 자동으로 링크로 변환함" },
    chat_autoKeyword_emstyle : { category:"chat", depth:3, type: "checkbox", value: true, title:"스트리머 닉네임 링크를 강조하여 표시", desc:"" },
    chat_chzzk_onlyLive : { category:"chat", depth:3, type: "checkbox", value: false, title:"치지직 스트리머가 메인 리스트에 라이브인 경우에만 치지직 링크로 변환", desc:"본 옵션이 꺼진 경우, 스크립트가 치지직 스트리머 이름을 감지하면 무조건 치지직 링크로 변환합니다. 본 옵션이 켜진 경우, 치지직 스트리머가 메인 리스트에 존재하는 경우에만 치지직 링크로 변환합니다." },
    chat_autoKeyword_startwith : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"🧪 단어의 시작일 때만 변환", desc:"단어의 시작이 스트리머 닉네임으로 시작하는 경우에만 닉네임을 링크로 변환함" },
    chat_autoKeyword_1char : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"🧪 한 글자 별칭도 링크로 변환", desc:"한 글자 별칭도 링크로 변환함. 단어의 시작일 때만 변환 옵션을 활성화 하는 것을 권장" },
    chat_url_decode : { category:"chat", depth:2, type: "checkbox", value: true, title:"한글 URL을 구분 가능하도록 변경", desc:"채팅 내에서 유니코드 형태의 URL 링크 감지 시, 내용을 알아볼 수 있도록 표시<br />예) <a href='https://namu.wiki/w/%ED%92%8D%EC%9B%94%EB%9F%89' target='_blank'>https://namu.wiki/w/%ED%92%8D%EC%9B%94%EB%9F%89</a> → <a href='https://namu.wiki/w/%ED%92%8D%EC%9B%94%EB%9F%89' target='_blank'>https://namu.wiki/w/풍월량</a>" },
    sys_meg : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: true, title:"작동 상태 알림", desc:"애드온의 작동 상태를 채팅창에 메시지로 알림" },
    chat_nick_colorize : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: false, title:"닉네임 색상화", desc:"채팅 닉네임에 임의의 색상을 적용" },
    chat_unicode_err_replace : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: true, title:"� 문자를 공백으로 변경", desc:"텍스트 인코딩 문제 발생 시 표시되는 � 문자를 공백으로 대체" },
    chat_tooltip_hide :  { category:"chat", depth:2, type: "checkbox", value: false, title:"채팅창 툴팁 숨김", desc:"채팅 내용에 마우스를 올렸을 때 툴팁이 뜨는 것을 막음", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){chat_tooltip_toggle();}} },
    chat_auto_reload : { disable:true, category:"chat", depth:2, type: "checkbox", value: false, title:"채팅 중지 시 자동 새로고침 설정", desc:"채팅이 중지된 경우, 채팅창 상단의 Auto Reload가 설정된 창에서 채팅을 자동으로 새로고침 함 (10초 내 최대 5회)" },
    chat_auto_coor_twitch_afreeca : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: true, title:"가능한 경우 외부 트위치, 아프리카 링크를 두스 좌표로 변환", desc:"" },
    chat_input_click : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: false, title:"채팅 입력 시 입력란 클릭 개선", desc:"가끔 채팅 입력란을 두 번 클릭해야지만 입력란이 활성화 되는 것을 개선한다." },
    chat_type_and_go : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: false, title:"별칭 입력으로 스트림 바로 재생", desc:"채팅 입력란에 스트리머 닉네임 또는 별칭 입력 후 스트림 바로 재생<br />1. 채팅 입력란에서 TAB 키 누른 후 ENTER<br />2. 화살표 버튼 클릭<br />3. ALT + G", change:function(){chat_type_and_go_main();} },

    uhaha_auto_remove : { under_dev:true, category:"chat", category_name:"채팅 - 고급(우하하)", depth:2, type: "checkbox", value: false, title:"🧪 우하하 채팅 자동 싹쓸이", desc:"우하하 채팅창 사용 시 누적 채팅 개수가 일정 개수를 넘으면 자동으로 싹쓸이를 실행하여 채팅이 느려지는 것을 방지.<br /><br />채팅을 맨 위로 스크롤하여 이전 채팅을 불러올 시 이상 동작할 수 있으니 주의하십시오." },
    uhaha_auto_remove_count : { under_dev:true, category:"chat", depth:3, type: "text", value: 1000, valid:"number", min_value:200, max_value:100000, title:"🧪 자동 싹쓸이를 실행할 채팅 개수", desc:"(기본값:1000, 범위:200~100000)" },
    uhaha_delete_button_hide : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: false, title:"우하하 채팅 삭제 버튼 숨기기", desc:"우하하 채팅창 사용 시 채팅에 마우스를 올렸을 때 뜨는 삭제 버튼을 숨김", change:function(){uhaha_chat_delete_hide();} },
    uhaha_chat_scroll : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: true, title:"자동스크롤 다시 시작 버튼 생성", desc:"채팅창에서 마우스 스크롤을 위로 올린 경우, 클릭하면 자동스크롤을 재시작 할 수 있는 버튼을 생성" },

    twitch_control : { under_dev:true, category_name:"트위치 플레이어", category_desc:"", category:"twitch", depth:1, type: "checkbox", value: false, title:"🧪 트위치 플레이어 관련 기능 사용", desc:"" },
    twitch_start_highest_quality : { under_dev:true, category:"twitch", depth:2, type: "checkbox", value: false, title:"🧪 트위치 시청 시 항상 가장 좋은 화질로 시작", desc:"" },
    twitch_start_unmute : { disable:true, under_dev:true, category:"advanced", depth:2, type: "checkbox", value: false, title:"🧪 트위치 시청 시작 시 음소거 하지 않음", desc:"" },
    twitch_disable_visibilitychange : { under_dev:true, category:"twitch", depth:2, type: "checkbox", value: false, title:"🧪 트위치 시청 중 탭 비활성화 시 자동 화질 변경 무시", desc:"" },
    // twitch_frontPageMode : { under_dev:true, category:"twitch", depth:2, type: "checkbox", value: false, title:"🧪 Front Page Mode", desc:"Twitch Front Page 에서 재생하는 것처럼 속여서 중간 광고를 나타나지 않게 합니다." },
    twitch_error_auto_restart : { under_dev:true, category:"twitch", depth:2, type: "checkbox", value: false, title:"🧪 트위치 시청 중 오류 발생 시 자동 재시작", desc:"예) #2000 에러 (현재 동작 안 함)" },
    // twitch_server_view : { under_dev:true, category:"advanced", depth:2, type: "checkbox", value: false, title:"🧪 마지막으로 접속된 트위치 서버 표시", desc:"" },
    twitch_interacite : { disable:true, category:"advanced", depth:2, type: "checkbox", value: false, title:"반응형 트위치 사용", desc:"" },
    //twitch_point_clicker : { disable:true, category:"advanced", depth:1, type: "checkbox", value: false, title:"🧪 채널 포인트 자동 습득", desc:"가능한 경우 채널 포인트 자동 습득<br />참고: 포인트는 www.twitch.tv 에 직접 접속했을 때만 쌓입니다." },

    chzzk_onlyVideo : { category_name:"치지직", category_desc:"", category:"chzzk", depth:1, type: "checkbox", value: true, title:"🧪 CHZZK 플레이어만 표시", desc:"플레이어 주변 레이아웃을 숨기고 플레이어만 표시합니다. 알 수 없는 문제가 발생하면 이 기능을 끄십시오." },
    chzzk_show_chat_default : { category:"chzzk", depth:2, type: "checkbox", value: false, title:"🧪 CHZZK 채팅창 표시", desc:"" },
    //chzzk_sign_in_iframe : { category:"chzzk", depth:1, type: "checkbox", value: true, title:"🧪 CHZZK 로그인 유지", desc:"두스트림에 삽입된 CHZZK에서 로그인 상태가 유지되도록 합니다. 반드시 Tampermonkey Beta 버전에 본 스크립트가 설치되어 있어야 합니다. 로그인은 chzzk.naver.com 에서 직접 해야합니다. 보안에 일부 취약해질 수도 있습니다. 브라우저, Tampermonkey 버전 등에 따라 일부 환경에서 동작하지 않을 수 있습니다. 본 기능을 활성화한 후 다시 비활성화 하려면 본 기능을 끄고 CHZZK에서 로그아웃을 한 번 수행하세요." },


    m3u8_maxQuality : { under_dev:true, category_name:"M3U8 플레이어", category_desc:"", category:"m3u8", depth:1, type: "checkbox", value: true, title:"🧪 항상 최고 화질로 재생", desc:"인터넷 연결 상태에 따라 비디오 품질을 자동으로 조절하는 기능을 비활성화 합니다." },
    m3u8_type : { under_dev:true, category:"m3u8", depth:1, type: "radio", value: "auto", title:"🧪 M3U8 PLAYER 타입", desc:`M3U8 PLAYER 에서 동영상을 재생하는 방식을 선택합니다.<br />- Auto: http 로 시작하거나 서버에서 차단된 m3u8 을 재생할 수 있지만 연결에 필요한 권한을 요구합니다. M3U8 재생 시 연결 허용 관련 팝업이 뜨는 경우 "도메인 항상 허용" 또는 "모든 도메인 항상 허용" 버튼을 클릭 후 새로고침 하세요.<br />- Legacy: 1.55 버전까지의 방식으로 추가 권한을 요구하지 않지만 일부 m3u8 링크의 재생이 불가능 합니다.`, radio: {auto: {title: "Auto", value:"auto"}, legacy: {title: "Legacy", value:"legacy"} }},
    m3u8_potplayer_link : { under_dev:true, category:"m3u8", depth:1, type: "checkbox", value:true, title:"Potplayer 로 재생 버튼을 추가", desc:"" },

    broadcaster_mode : { under_dev:true, category:"broadcast", category_name:"방송 모드", category_desc:"", depth:1, type: "checkbox", value: false, title:"🧪 방송 모드", desc:"채팅창을 방송에 적합한 모드로 변경<br />Xsplit 등에서 스크린 캡쳐 후, 크로마키(기본값 blue)를 이용하여 배경색을 제거할 수 있습니다.", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}}},
    broadcaster_font_size : { under_dev:true, category:"broadcast", depth:2, type: "text", value: 1.0, valid:"number", min_value:0.1, max_value:10, title:"글씨 크기 조절(배수)", desc:"", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}} },
    broadcaster_bg_color : { under_dev:true, category:"broadcast", depth:2, type: "text", value: "blue", title:"배경 색상", desc:"예) blue, white, #fff, rgb(255, 255, 255)", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}} },
    broadcaster_nick_color : { under_dev:true, category:"broadcast", depth:2, type: "text", value: "#ffffff", title:"닉네임 색상", desc:"예) blue, white, #fff, rgb(255, 255, 255)", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}} },
    broadcaster_cont_color : { under_dev:true, category:"broadcast", depth:2, type: "text", value: "#fafafa", title:"채팅 내용 색상", desc:"예) blue, white, #fff, rgb(255, 255, 255)", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}} },
    broadcaster_nick_hide : { under_dev:true, category:"broadcast", depth:2, type: "checkbox", value:false, title:"닉네임의 일부를 숨김", desc:"예) 닉네임을 abcd**** 형태로 표시함" },
    broadcaster_use_nick_color : { under_dev:true, category:"broadcast", depth:2, type: "checkbox", value:true, title:"방송 모드용 닉네임 색상화 사용", desc:"닉네임을 랜덤으로 색상화 함<br />참고: 배경색이 blue 또는 green 일 경우 크로마키를 위해 해당 색으로는 닉네임을 표시하지 않음", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}} },
    broadcaster_msg_time : { under_dev:true, category:"broadcast", depth:2, type: "text", value: 15.0, valid:"number", min_value:0, max_value:300, title:"메시지 표시 시간", desc:"새로운 채팅이 올라오면 설정한 시간 이후 사라짐<br />0초로 설정해 두면 항상 메시지를 표시 (기본값:15초)", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}} },
    broadcater_theme : { under_dev:true, category:"broadcast", depth:2, type: "radio", value: "box", title:"테마", desc:"", radio: {box: {title: "Box", value:"box"}, twitch: {title: "Twitch", value:"twitch"}, simple: {title: "Simple", value:"simple"} }, change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}}},

    under_dev : { category:"advanced", category_name:"고급", category_desc:"", depth:1, type: "checkbox", value: false, title:"실험실 기능 및 고급 기능 설정", desc:"실험 중인 기능 및 고급 기능을 직접 설정<br />실험실 기능은 불안정하며, 언제든 사라질 수 있습니다." },
    popup_player : { under_dev:true, category:"advanced", depth:1, type: "checkbox", value: false, title:"🧪 시청 중 이동 시 팝업 플레이어 사용", desc:"" },
    chat_sword : { disable:true, category:"advanced", depth:1, type: "checkbox", value: false, title:"관리자 진은검 아이콘 달기", desc:"" }
};
export var GM_setting_param = {"DEBUG":false, "SETTINGS":_settings, "CONSOLE_MSG":ADD_DEBUG, "TABS":true, "MULTILANG":false, "packageJsonLink":"https://raw.githubusercontent.com/nomomo/Addostream/master/package.json"};
