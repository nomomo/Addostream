import nomo_const from "general/const.js";
import * as nomo_common from "general/common.js";
import * as nomo_theme from "general/theme.js";
import {ADD_DEBUG} from "libs/nomo-utils.js";
import ADD_channel_history_run from "general/browse_history.js";
import * as nomo_coord from "general/coord.js";
import {ADD_send_location_layout} from "chat/send_coord.js";
import {versionStrtoNum} from "settings/version.js";
import {memoLoglayoutInit} from "chat/simple_memo_log.js";
import {blocked_chat_layout} from "general/menu_layout.js";
import {chat_tooltip_toggle} from "chat/control.js";
import {uhaha_chat_delete_hide} from "chat/control_uhaha.js";

export var GM_setting = (function($, global, document){ // 
    ADD_DEBUG("GM_setting 시작");
    // local vars
    var $g_elem;
    var name_ = "";
    var changed_key = [];
    const settings_full = {
        last_version : { disable:true, category:"dev", depth:1, type: "set", value: Number(versionStrtoNum(GM.info.script.version)), title:"마지막 버전", desc:"" },
        version_check : { category:"general", category_name:"일반", depth:1, type: "checkbox", value:true, title:"새 버전 체크", desc:"새로운 애드온 버전이 있는지 자체적으로 체크함"},
        version_check_interval : { under_dev:true, category:"general", depth:2, type: "text", value:12, valid:"number", min_value:1, title:"새 버전 체크 주기", desc:"새 버전을 체크할 시간 간격<br />시간 단위로 입력, 최소 1시간(기본값: 12)"},
        history : { category:"general", depth:1, type: "checkbox", value: false, title:"나의 시청 기록 보기", desc:"두스트림 상단에 나의 시청 기록을 표시함", change:function(){ADD_channel_history_run();} },
        history_hide_icon : { category:"general", depth:2, type: "checkbox", value: false, title:"플랫폼 아이콘 숨기기", desc:"시청 기록에서 플랫폼 아이콘을 숨김", change:function(){ADD_channel_history_run();} },
        max_history : { under_dev:true, category:"general", depth:2, type: "text", value: 20, valid:"number", min_value:1, title:"시청 기록 최대 개수", desc:"(기본값: 20)" },
        
        theme_leftchat : { category:"theme", category_name:"테마", depth:1, type: "checkbox", value: false, title:"채팅창 위치를 왼쪽으로 변경", desc:"", change:function(){nomo_theme.ADD_leftchat_change();} },
        theme_on : { category:"theme", depth:1, type: "checkbox", value: false, title:"테마 기능 사용", desc:"", change:function(){nomo_theme.ADD_theme();}},
        theme : { category:"theme", depth:2, type: "radio", value: "default", title:"테마 선택", desc:"", radio: {default: {title: "기본", value:"default"}, black: {title: "어두운 테마", value:"black"} }, change:function(){nomo_theme.ADD_theme();}},
        theme_self_bold_chat : { under_dev:true, category:"theme", depth:2, type: "checkbox", value: false, title:"자신의 채팅을 굵게 표시", desc:"", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.ADD_theme();}} },
        theme_font_size : { category:"theme", depth:2, type: "text", value: 1.0, valid:"number", min_value:0.1, max_value:10, title:"채팅 글씨 크기 조절(배수)", desc:"(기본값: 1.0)", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.ADD_theme();}} },
        theme_font_custom : { category:"theme", depth:2, type: "radio", value: "default", radio: {default: {title: "기본", value:"default"}, NotoSanskr: {title: "Noto Sans KR", value:"NotoSanskr"}}, title:"폰트 변경", desc:"일부 OS, 브라우저에서 적용되지 않을 수 있음", change:function(){nomo_theme.ADD_theme();} },
        theme_night_mode : { under_dev:false, category:"theme", depth:2, type: "checkbox", value: "default", title:"[실험실] 야간 모드", desc:"지정된 시간에 테마를 black 으로 바꿈", change:function(){nomo_theme.ADD_night_mode();}},
        theme_night_mode_start : { under_dev:true, category:"theme", depth:3, type: "text", value: 0, valid:"number", min_value:0, max_value:24, title:"시작 시간", desc:"0 ~ 24<br />참고) X시 30분의 경우 X.5 처럼 소수점으로 입력", change:function(){nomo_theme.ADD_night_mode();}},
        theme_night_mode_end : { under_dev:true, category:"theme", depth:3, type: "text", value: 7, valid:"number", min_value:0, max_value:24, title:"종료 시간", desc:"0 ~ 24", change:function(){nomo_theme.ADD_night_mode();}},

        insagirl_button : { category:"coord", category_name:"좌표", depth:1, type: "checkbox", value: false, title:"빠른 좌표 보기 활성", desc:"좌표 페이지를 두스트림 내부에서 불러오는 기능을 활성", change:function(){nomo_coord.hrm_layout();} },
        insagirl_block_by_nick : { category:"coord", depth:1, type: "checkbox", value: false, title:"차단한 유저의 좌표 숨기기", desc:"채팅매니저에서 차단한 유저의 좌표를 숨김" },
        insagirl_block_dobae : { category:"coord", depth:1, type: "checkbox", value: false, title:"연속된 동일 좌표 숨기기", desc:"동일 유저가 같은 좌표를 연속하여 올릴 경우<br />가장 최근의 것만 남기고 숨김" },
        insagirl_block_dobae_by_href : { category:"coord", depth:2, type: "checkbox", value: false, title:"동일 유저가 아닐 경우에도 숨김", desc:"유저에 상관 없이 동일 좌표가 연속되는 경우 무조건 숨김" },
        insagirl_select : { under_dev:true, category:"coord", category_name:"좌표 - 고급", depth:1, type: "radio", value: 2, title:"좌표 사이트 선택", desc:"", radio: {dostream: {title: "<span style='font-size:11px;'>coord.dostream.com</span>", value:1}, insagirl: {title: "<span style='font-size:11px;'>insagirl-hrm.appspot.com</span>", value:2}} },
        insagirl_modify_directly : { under_dev:true, category:"coord", depth:1, type: "checkbox", value: false, title:"[실험실] 좌표 사이트에 직접 적용", desc:"실험 중" },
        
        list : { category:"list", category_name:"리스트", depth:1, type: "checkbox", value:true, title:"메인 리스트 관리 기능 사용", desc:"메인 리스트 관리 기능을 일괄적으로 켜고 끈다."},
        show_display_name : { under_dev:true, category:"list", depth:2, type: "checkbox", value:true, title:"스트리머 이름 보이기", desc:"표시 가능한 스트리머의 이름 및 아이디를 표시"},
        
        thumbnail_mouse : { category:"list", category_name:"리스트 - 섬네일", depth:2, type: "checkbox", value: false, title:"섬네일에 마우스 올렸을 시 확대", desc:"두스 메인 리스트의 섬네일에 마우스를 올렸을 때 확대한 팝업을 띄움" },
        thumbnail_size : { category:"list", depth:3, type: "radio", value: 1, title:"섬네일 사이즈", desc:"", radio: {small: {title: "작음", value:1}, medium: {title: "보통", value:2}, large:{title: "큼", value:3} } },
        thumbnail_refresh : { under_dev:true, category:"list", depth:2, type: "checkbox", value: true, title:"리스트 섬네일 자동 갱신", desc:"- 리스트 섬네일을 자동으로 갱신<br />- 체크 해제 시 새로고침 이전까지 초기 접속 시 섬네일 유지됨" },
        thumbnail_refresh_gap : { under_dev:true, category:"list", depth:3, type: "text", value: 5, valid:"number", min_value:1, title:"갱신 간격", desc:"분 단위로 입력, 최소 1분(기본값: 5)" },

        top_fix : { category:"list", category_name:"리스트<br />- 상단 고정", depth:2, type: "checkbox", value: false, title:"특정 스트리머 상단 고정", desc:"두스 메인 리스트의 최상단에 원하는 스트리머를 고정"},
        top_fix_ID : { category:"list", depth:3, type: "tag", value: ["hanryang1125"], valid:"array_string", title:"등록할 스트리머 ID", desc:"스트리머 ID를 콤마(,)로 구분하여 입력<br />영문, 숫자, 언더바(_) 만 입력 가능"},
        top_off_fix : { category:"list", depth:3, type: "checkbox", value: false, title:"오프라인 시에도 고정", desc:""},
                
        alarm : { category:"list", category_name:"리스트 - 추가", depth:2, type: "checkbox", value: false, title:"메인에 스트리머 추가", desc:"기본 두스 메인 리스트에 없는 Twitch 스트리머를<br />메인 리스트에 추가 (Twitch API 사용)" },
        top_alarm_ID : { category:"list", depth:3, type: "tag", value: ["hanryang1125"], valid:"array_string", title:"등록할 스트리머 ID", desc:"스트리머 ID를 콤마(,)로 구분하여 입력<br />영문, 숫자, 언더바(_) 만 입력 가능", change:async function(){await nomo_common.nomo.setVal("ADD_twitch_api_refresh_force", true);} },
        alarm_gap : { category:"list", depth:3, type: "text", value: 5, valid:"number", min_value:1, title:"조회 간격", desc:"분 단위로 입력, 최소 1분(기본값: 5)" },
        alarm_noti : { category:"list", depth:3, type: "checkbox", value: false, title:"온라인 시 알림(수정 중)", desc:"위 목록에 등록된 스트리머가 온라인이 될 때<br />데스크톱 메시지로 알림" },
        alarm_main_reload : { under_dev:true, category:"list", depth:3, type: "checkbox", value: true, title:"스트림 정보 갱신 시 리스트 새로고침", desc:"두스트림 메인 화면인 경우<br />스트림 정보 갱신 시 두스 메인 리스트를<br />자동으로 새로고침 함" },
        alarm_show_game_name : { under_dev:true, category:"list", depth:3, type: "checkbox", value: false, title:"[실험실] 게임 이름 표시", desc:"게임 이름을 표시할 수 있는 경우 리스트에 표시" },
        alarm_sort_by_viewer : { under_dev:true, category:"list", depth:3, type: "checkbox", value: false, title:"[실험실] 시청자 수로 정렬", desc:"입력한 순서로 정렬하는 대신<br />시청자 수가 많은 스트리머가 위로 오도록 정렬" },
        streamer_hide : { category:"list", category_name:"리스트 - 제거", depth:2, type: "checkbox", value: false, title:" 특정 스트리머 숨기기", desc:"기본 두스트림에 메인에 노출하고 싶지 않은<br />Twitch 스트리머를 메인 리스트에서 제거" },                 // 메인에 스트리머 숨기기 사용 여부
        streamer_hide_ID : { category:"list", depth:3, type: "tag", value: ["nalcs1", "nalcs2"], valid:"array_string", title:"등록할 스트리머 ID", desc:"스트리머 ID를 콤마(,)로 구분하여 입력<br />영문, 숫자, 언더바(_) 만 입력 가능" },
        remember_platform : { category:"list", depth:2, type: "checkbox", value: false, title:"특정 플랫폼 숨기기", desc:"기본 두스트림에 메인에 노출하고 싶지 않은<br />플랫폼에 해당되는 항목을 메인 리스트에서 제거" },
        remember_twitch : { category:"list", depth:3, type: "checkbox", value: false, title:"트위치 숨기기", desc:"" },
        remember_kakao : { category:"list", depth:3, type: "checkbox", value: false, title:"카카오 숨기기", desc:"" },
        remember_youtube : { category:"list", depth:3, type: "checkbox", value: false, title:"유투브 숨기기", desc:"" },
        
        main_list_cache : { under_dev:true, category:"list", category_name:"리스트 - 고급", depth:2, type: "checkbox", value:true, title:"메인 리스트 캐쉬", desc:"빠른 메인 로딩을 위해 메인 리스트를 캐쉬함"},
        main_list_cache_time : { under_dev:true, category:"list", depth:3, type: "text", value: 3, valid:"number", min_value:1, title:"캐쉬 간격", desc:"분 단위로 입력, 최소 1분(기본값: 3)" },
        button_set : { under_dev:true, category:"list", depth:2, type: "checkbox", value:true, title:"버튼 모음 생성", desc:"- 트위치, 카카오, 유투브, 멀티트위치 버튼 모음을 생성<br />- 리스트에 멀티트위치 선택을 위한 체크박스를 생성"},
        button_chatmode : { under_dev:true, category:"list", depth:2, type: "checkbox", value:true, title:"채팅 모드 버튼 생성", desc:"리스트의 각 항목에 채팅 모드 버튼을 생성"},
        list_sort_by_viewer : { under_dev:true, category:"list", depth:2, type: "checkbox", value: false, title:"[실험실] 무조건 시청자 수로 정렬", desc:"- 무조건 시청자 수가 많은 항목이 위로 오도록 정렬<br />- 리스트 순서와 관련된 다른 모든 설정을 무시" },
        main_list_two_column : { under_dev:true, category:"list", depth:2, type: "checkbox", value:false, title:"[실험실] 메인 리스트를 두 줄로 표시", desc:"- 모니터 가로 해상도 1920 이상에 권장<br />- 섬네일 기능 사용 시 중간 설정이 적당함", change:function(){nomo_common.reloadMain();}},

        playing_quick_list_button : { category:"playing", category_name:"재생 중", depth:1, type: "checkbox", value: true, title:"퀵 리스트 버튼 표시", desc:"재생 중 팝업으로 메인 리스트를 볼 수 있도록<br />퀵 리스트 버튼을 표시", change:function(){$(window).trigger("hashchange");} },
        playing_setting_button : { category:"playing", depth:1, type: "checkbox", value: true, title:"설정 버튼 표시", desc:"재생 중 설정 버튼을 표시.<br />체크 해제 시 설정 버튼은 메인에서만 노출됨", change:function(){$(window).trigger("hashchange");} },
        playing_chat_button : { category:"playing", depth:1, type: "checkbox", value: true, title:"트위치↔멀티트위치 전환 버튼 표시", desc:"트위치 또는 멀티트위치 재생 시<br />서로 전환할 수 있는 버튼을 표시", change:function(){$(window).trigger("hashchange");} },
        playing_twip_button : { under_dev:true, category:"playing", category_name:"재생 중 - 고급", depth:1, type: "checkbox", value: false, title:"[실험실] Twip 버튼 표시", desc:"트위치 재생 시 Twip donate 버튼을 표시<br /> - 스트리머의 Dashboard 에 기재된 twip.kr 링크로 접속<br />　링크를 찾을 수 없는 경우 버튼 표시하지 않음<br /><br />주의사항: <br /> - 반드시 주소창의 주소 및 도네이션 수령자가 올바른지 확인할 것<br /> - 오작동으로 잘못 도네이션 되더라도 책임지지 않음", change:function(){$(window).trigger("hashchange");} },
        playing_twip_button_force : { under_dev:true, category:"playing", depth:2, type: "checkbox", value: false, title:"[실험실] Twip 버튼을 항상 표시", desc:"Dashboard 에 twip.kr 링크가 없더라도 무조건 표시<br />https://twip.kr/donate/{streamer-id} 링크로 접속", change:function(){$(window).trigger("hashchange");} },
        playing_toonat_button : { under_dev:true, category:"playing", depth:1, type: "checkbox", value: false, title:"[실험실] Toonation 버튼 표시", desc:"트위치 재생 시 Toonation donate 버튼을 표시<br /> - 스트리머의 Dashboard 에 기재된 toon.at 링크로 접속<br />　링크를 찾을 수 없는 경우 버튼 표시하지 않음<br /><br />주의사항:<br /> - 반드시 주소창의 주소 및 도네이션 수령자가 올바른지 확인할 것<br /> - 오작동으로 잘못 도네이션 되더라도 책임지지 않음", change:function(){$(window).trigger("hashchange");} },

        chat_ctr : { category:"chat", category_name:"채팅 - 일반", depth:1, type: "checkbox", value: true, title:"채팅 제어", desc:"- 채팅 관련 기능을 일괄적으로 켜고 끔<br />- 채팅 관련 기능은 새로고침 해야 적용됨" },
        chat_memo : { category:"chat", depth:2, type: "checkbox", value: true, title:"채팅매니저 기능 사용 (메모 기능)", desc:"- 채팅 닉네임 클릭 시 메모하기 버튼 표시<br />- 닉네임별 메모 작성/차단 가능<br />- 작성한 메모는 채팅창의 닉네임 뒤에 표시됨<br />- 차단 기능은 기존 두스 차단 기능과 별개로<br />　작동하므로, 차단목록이 날아가더라도 보존됨", append:$("<span class='show_memo_log btn btn-primary'>채팅매니저 관리</span>").on("click", async () => {
            ADD_DEBUG("메모 로그 버튼 클릭됨");
            memoLoglayoutInit();
        }) },
        chat_userlist_memo_top : {  disable:true, category:"chat", depth:3, type: "checkbox", value: false, title:"유저리스트 관리", desc:"" },
        chat_adb : { disable:true, category:"chat", depth:2, type: "checkbox", value: false, title:"광고 제거", desc:"" },
        hide_nick_change : { disable:true, category:"", depth:2, type: "checkbox", value: false, title:"닉네임 변경 메시지 숨기기", desc:"" },
        url_self : { category:"chat", depth:2, type: "checkbox", value: true, title:"두스트림 좌표의 경우 현재 창에서 열기", desc:"두스 좌표가 새 창으로 열리는 것을 막음" },
        chat_scroll : { category:"chat", depth:2, type: "checkbox", value: true, title:"자동스크롤 변경", desc:"- 채팅창의 자동스크롤이 끊기는 것을 방지하기 위해<br />　자동스크롤의 동작 방식을 변경<br /><br /><strong>동작 원칙:</strong><br />- 마우스 휠을 위로 굴리면 자동스크롤 멈춤<br />- 더 보기 버튼을 누르거나 맨 아래로 휠 하여<br />　자동스크롤을 재시작할 수 있음<br />- 그 이외의 모든 스크롤 관련 동작은 무시됨" },
        chat_scroll_down_min : { under_dev:true, category:"chat", depth:3, type: "text", value: 50, valid:"number", min_value:0, title:"자동 스크롤 재시작 거리(px)", desc:"스크롤이 정지 상태일 때 스크롤 내림 시<br />최하단과의 거리가 설정 값 이하가 되면<br />자동스크롤을 재시작(기본값:50)" },
        send_location_button : { category:"chat", depth:2, type: "checkbox", value: false, title:"좌표 보내기 버튼 활성", desc:"클릭 시 현재 주소를 채팅창 입력란에 바로 복사", change:function(){ADD_send_location_layout();} },
        send_location_button_top : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"좌표 버튼을 채팅창 상단에 고정", desc:"체크 해제 시 채팅창 하단에 고정됨", change:function(){ADD_send_location_layout();} },
        send_location_existing : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"기존에 입력해둔 채팅 내용 유지", desc:"좌표 보내기 버튼을 눌렀을 때, 채팅 입력란의 내용을 유지하고 좌표 링크를 뒤에 덧붙임" },
        send_location_immediately : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: false, title:"[실험실] 좌표 바로 전송", desc:"- 좌표 버튼을 누르면 좌표를 채팅 입력란에<br />　복사하는 것을 건너뛰고 채팅창에 바로 전송<br />- 재사용 대기시간: 10초" },
        
        chat_image_preview : { category:"chat", category_name:"채팅<br />- 이미지 미리보기", depth:2, type: "checkbox", value: true, title:"이미지 미리보기", desc:"이미지 주소 형태의 링크가 채팅창에 등록되면 바로 보여줌" },
        imgur_preview_safe : { category:"chat", depth:3, type: "checkbox", value: true, title:"후방주의 기능 활성", desc:"이미지를 어둡게 가려진 상태로 보여줌<br />버튼을 클릭해야 이미지 보기 가능" },
        imgur_preview_opacity : { category:"chat", depth:4, type: "text", value: 0.93, valid:"number", min_value:0, max_value:1, title:"박스 투명도", desc:"0:투명, 1:불투명, 기본값:0.93" },
        nudity_block : { disable:true, category:"chat", depth:4, type: "checkbox", value: false, title:"피부톤 이미지에만 후방주의 기능 활성", desc:"피부톤 이미지인 경우에만 후방주의 기능을 활성<br />너굴맨이 이미지를 먼저 확인한 후 피부색이 없어야 출력하므로 이미지가 조금 늦게 뜰 수 있다.<br />추가 이미지 로드 시에는 적용되지 않는다." },
        chat_image_youtube_thumb : { category:"chat", depth:3, type: "checkbox", value: true, title:"유투브 섬네일 미리보기", desc:"" },
        chat_image_youtube_thumb_nonsafe : { under_dev:true, category:"chat", depth:4, type: "checkbox", value: false, title:"유투브 섬네일에 대해 후방 주의 기능 사용하지 않음", desc:"" },
        chat_image_twitch_thumb : { category:"chat", depth:3, type: "checkbox", value: true, title:"트위치 클립 섬네일 미리보기", desc:"" },
        chat_image_twitch_thumb_nonsafe : { under_dev:true, category:"chat", depth:4, type: "checkbox", value: false, title:"트위치 클립 섬네일에 대해 후방 주의 기능 사용하지 않음", desc:"" },
        imgur_preview : { category:"chat", depth:3, type: "checkbox", value: true, title:"Imgur 이미지 미리보기", desc:"Imgur 주소 형태의 링크가 채팅창에 등록되면 바로 보여줌<br />(Imgur API 사용)" },
        imgur_preview_gif_as_mp4 : { under_dev:true, category:"chat", depth:4, type: "checkbox", value: true, title:"gif 를 동영상 형태로 불러옴", desc:"gif 파일 대신 mp4 파일이 사용 가능한 경우 더 빠른 로딩을 위해 동영상 형태로 불러옴" },
        gfycat_preview : { category:"chat", depth:3, type: "checkbox", value: true, title:"Gfycat 동영상 미리보기", desc:"Gfycat 주소 형태의 링크가 채팅창에 등록되면 바로 보여줌<br />(Gfycat API 사용, 테스트 중)" },
        chat_video_autoplay : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: true, title:"동영상 자동 재생", desc:"Imgur, Gfycat 등에서 동영상을 불러오는 경우 음소거 된 상태로 자동 재생함" },
        chat_image_mouseover_prevent : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: true, title:"이미지 링크 주소에 마우스 올려도 팝업 띄우지 않음", desc:"이미지 미리보기 기능을 사용하는 경우, 이미지 링크 주소에 마우스 커서를 올렸을 때 작은 미리보기 팝업을 띄우는 것을 막음(UCHAT의 기본 기능)" },
        chat_image_max_width : { under_dev:true, category:"chat", depth:3, type: "text", value: 325, valid:"number", min_value:1, title:"이미지 최대 너비(width, px)", desc:"이미지 가로(width) 최대 길이(기본값:325)" },
        chat_image_max_height : { under_dev:true, category:"chat", depth:3, type: "text", value: 600, valid:"number", min_value:1, title:"이미지 최대 높이(height, px)", desc:"이미지 세로(height) 최대 길이(기본값:600)" },
        
        chat_block : { category:"chat", category_name:"채팅<br />- 금지단어 차단", depth:2, type: "checkbox", value: false, title:"금지단어 기반 채팅 차단 사용", desc:"채팅 내용 또는 닉네임에 금지단어 리스트에 추가한 단어가 포함되어 있는 경우 해당 채팅을 차단함" },
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
                            message_("채팅 로그 초기화 완료! "+(new Date()).toLocaleTimeString(), $g_elem);
                        }
                    });
                return $return.append($show_blocked_chat).append($reset_blocked_chat);
            })()
        },
        chat_block_log_letter_limit : { under_dev:true, category:"chat", depth:3, type: "text", value: 40, valid:"number", min_value:0, max_value:100000, title:"채팅 내용을 잘라서 기록", desc:"채팅 로그 기록 시 설정된 글자 수 만큼 채팅 내용을 잘라서 기록함(기본값 40)" },
        chat_block_log_limit : { under_dev:true, category:"chat", depth:3, type: "text", value: 100, valid:"number", min_value:0, max_value:100000, title:"차단된 채팅 로그 최대 개수", desc:"- 채팅매니저 차단, 금지단어 차단에 의해 기록된 채팅 로그의 최대 개수를 설정<br />- 이 값을 크게 설정할 시 리소스를 많이 차지할 수 있으며, 알 수 없는 에러가 발생할 수 있음<br />(기본값:100)" },
        
        chat_dobae_block : { category:"chat", category_name:"채팅 - 도배 대응", depth:2, type: "checkbox", value: false, title:"도배 채팅 숨기기 사용", desc:"동일 유저가 짧은 시간동안 유사한 문장을<br />지정된 횟수 이상 반복하여 입력하는 경우<br />도배로 판단하고 내용을 숨김" },
        chat_dobae_repeat : { category:"chat", depth:3, type: "text", value: 2, valid:"number", min_value:2, max_value:10, title:"채팅 숨김 - 반복 입력 수 (회)", desc:"지정된 반복 입력 수 이상 올라온 채팅부터 숨김.<br />(기본값:2회)" },
        chat_dobae_onlylink : { category:"chat", depth:3, type: "checkbox", value: false, title:"채팅 내용에 링크 포함 시에만 도배 판단", desc:"채팅 내용에 링크가 포함된 것만 도배 판단을 위해 카운트함" },
        chat_dobae_block_autoban : { category:"chat", depth:3, type: "checkbox", value: false, title:"도배 유저를 채팅매니저로 자동 차단", desc:"<span style='color:red;'>설정 값에 따라 무차별 차단이 발생할 수 있으니 사용에 유의하십시오.<br />예) ㅋㅋㅋ를 반복 입력하는 유저도 차단됨" },
        chat_dobae_block_autoban_repeat : { category:"chat", depth:4, type: "text", value: 4, valid:"number", min_value:2, max_value:10, title:"유저 차단 - 반복 입력 수 (회)", desc:"지정된 반복 입력 수 이상 올라온 채팅부터 차단.<br />(기본값:4회)" },
        chat_dobae_block_onlylink : { category:"chat", depth:4, type: "checkbox", value: false, title:"채팅 내용에 링크 포함 시에만 차단", desc:"- 채팅 내용에 링크가 포함되지 않은 경우<br />　채팅은 숨기지만 자동 차단은 하지 않음<br />- [링크 포함 시에만 도배 판단] 옵션을<br />　끄는 것을 권장함" },
        chat_dobae_judge : { under_dev:true, category:"chat", depth:3, type: "text", value: 0.8, valid:"number", min_value:0.1, max_value:1, title:"문장 유사도", desc:"도배로 판단할 문장 유사도 설정<br />1 : 문장이 완전 일치하는 경우에만 차단<br />0 에 가까울 수록 불일치하는 경우에도 차단<br />(기본값:0.8)" },
        chat_dobae_timelimit : { under_dev:true, category:"chat", depth:3, type: "text", value: 8, valid:"number", min_value:0, max_value:120, title:"판단 시간 (초)", desc:"지정된 시간 이전에 올라온 채팅에 대해서는<br />도배 여부를 판단하지 않음(기본값:8초)" },
        chat_dobae_block_record : { under_dev:true, category:"chat", depth:3, type: "checkbox", value: true, title:"채팅 차단 로그에 기록", desc:"도배로 판단된 채팅을 채팅 차단 로그에 기록" },
        
        chat_autoKeyword : { category:"chat", depth:2, type: "checkbox", category_name:"채팅 - 고급", value: true, title:"스트리머 닉네임을 링크로 변환", desc:"스트리머 닉네임 감지 시 자동으로 링크로 변환함" },
        chat_autoKeyword_1char : { disable:true, category:"chat", depth:3, type: "checkbox", value: false, title:"[실험실] 한 글자 별칭도 링크로 변환함", desc:"한 글자 별칭도 링크로 변환함" },
        chat_url_decode : { category:"chat", depth:2, type: "checkbox", value: true, title:"한글 URL을 구분 가능하도록 변경", desc:"채팅 내에서 유니코드 형태의 URL 링크 감지 시,<br />내용을 알아볼 수 있도록 표시<br />예) <a href='https://namu.wiki/w/%ED%92%8D%EC%9B%94%EB%9F%89' target='_blank'>https://namu.wiki/w/%ED%92%8D%EC%9B%94%EB%9F%89</a> → <a href='https://namu.wiki/w/%ED%92%8D%EC%9B%94%EB%9F%89' target='_blank'>https://namu.wiki/w/풍월량</a>" },
        sys_meg : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: true, title:"작동 상태 알림", desc:"애드온의 작동 상태를 채팅창에 메시지로 알림" },
        chat_nick_colorize : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: false, title:"닉네임 색상화", desc:"채팅 닉네임에 임의의 색상을 적용" },
        chat_unicode_err_replace : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: true, title:"� 문자를 공백으로 변경", desc:"텍스트 인코딩 문제 발생 시 표시되는 � 문자를 공백으로 대체" },
        chat_tooltip_hide :  { category:"chat", depth:2, type: "checkbox", value: false, title:"채팅창 툴팁 숨김", desc:"채팅 내용에 마우스를 올렸을 때 툴팁이 뜨는 것을 막음", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){chat_tooltip_toggle();}} },
        chat_auto_reload : { disable:true, category:"chat", depth:2, type: "checkbox", value: false, title:"채팅 중지 시 자동 새로고침 설정", desc:"채팅이 중지된 경우,<br />채팅창 상단의 Auto Reload가 설정된 창에서<br />채팅을 자동으로 새로고침 함 (10초 내 최대 5회)" },

        uhaha_auto_remove : { under_dev:true, category:"chat", category_name:"채팅 - 고급(우하하)", depth:2, type: "checkbox", value: false, title:"[실험실] 우하하 채팅 자동 싹쓸이", desc:"우하하 채팅창 사용 시 누적 채팅 개수가 일정 개수를 넘으면 자동으로 싹쓸이를 실행하여 채팅이 느려지는 것을 방지.<br /><br />채팅을 맨 위로 스크롤하여 이전 채팅을 불러올 시 이상 동작할 수 있으니 주의하십시오." },
        uhaha_auto_remove_count : { under_dev:true, category:"chat", depth:3, type: "text", value: 1000, valid:"number", min_value:200, max_value:100000, title:"[실험실] 자동 싹쓸이를 실행할 채팅 개수", desc:"(기본값:1000, 범위:200~100000)" },
        uhaha_delete_button_hide : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: false, title:"[실험실] 우하하 채팅 삭제 버튼 숨기기", desc:"우하하 채팅창 사용 시 채팅에 마우스를 올렸을 때 뜨는 삭제 버튼을 숨김", change:function(){uhaha_chat_delete_hide();} },
        uhaha_chat_scroll : { under_dev:true, category:"chat", depth:2, type: "checkbox", value: true, title:"[실험실] 자동스크롤 다시 시작 버튼 생성", desc:"채팅창에서 마우스 스크롤을 위로 올린 경우, 클릭하면 자동스크롤을 재시작 할 수 있는 버튼을 생성" },

        twitch_control : { under_dev:true, category_name:"트위치 플레이어", category:"twitch", depth:1, type: "checkbox", value: false, title:"[실험실] 트위치 플레이어 관련 기능 사용", desc:"" },
        twitch_start_highest_quality : { under_dev:true, category:"twitch", depth:2, type: "checkbox", value: false, title:"[실험실] 트위치 시청 시 항상 가장 좋은 화질로 시작", desc:"" },
        twitch_start_unmute : { disable:true, under_dev:true, category:"advanced", depth:2, type: "checkbox", value: false, title:"[실험실] 트위치 시청 시작 시 음소거 하지 않음", desc:"" },
        twitch_disable_visibilitychange : { under_dev:true, category:"twitch", depth:2, type: "checkbox", value: false, title:"[실험실] 트위치 시청 중 탭 비활성화 시 자동 화질 변경 무시", desc:"" },
        twitch_error_auto_restart : { under_dev:true, category:"twitch", depth:2, type: "checkbox", value: false, title:"[실험실] 트위치 시청 중 오류 발생 시 자동 재시작", desc:"예) #2000 에러" },
        // twitch_server_view : { under_dev:true, category:"advanced", depth:2, type: "checkbox", value: false, title:"[실험실] 마지막으로 접속된 트위치 서버 표시", desc:"" },
        twitch_interacite : { disable:true, category:"advanced", depth:2, type: "checkbox", value: false, title:"반응형 트위치 사용", desc:"" },

        broadcaster_mode : { under_dev:true, category:"broadcast", category_name:"방송 모드", depth:1, type: "checkbox", value: false, title:"[실험실] 방송 모드", desc:"채팅창을 방송에 적합한 모드로 변경<br />Xsplit 등에서 스크린 캡쳐 후, 크로마키(기본값 blue)를 이용하여 배경색을 제거할 수 있습니다.", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}}},
        broadcaster_font_size : { under_dev:true, category:"broadcast", depth:2, type: "text", value: 1.0, valid:"number", min_value:0.1, max_value:10, title:"글씨 크기 조절(배수)", desc:"", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}} },
        broadcaster_bg_color : { under_dev:true, category:"broadcast", depth:2, type: "text", value: "blue", title:"배경 색상", desc:"예) blue, white, #fff, rgb(255, 255, 255)", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}} },
        broadcaster_nick_hide : { under_dev:true, category:"broadcast", depth:2, type: "checkbox", value:false, title:"닉네임의 일부를 숨김", desc:"예) 닉네임을 abcd**** 형태로 표시함" },
        broadcaster_use_nick_color : { under_dev:true, category:"broadcast", depth:2, type: "checkbox", value:true, title:"닉네임 색상화 사용", desc:"닉네임을 랜덤으로 색상화 함<br />참고: 배경색이 blue 또는 green 일 경우<br />크로마키를 위해 해당 색으로는 닉네임을 표시하지 않음" },
        broadcaster_msg_time : { under_dev:true, category:"broadcast", depth:2, type: "text", value: 15.0, valid:"number", min_value:0, max_value:300, title:"메시지 표시 시간", desc:"새로운 채팅이 올라오면 설정한 시간 이후 사라짐<br />0초로 설정해 두면 항상 메시지를 표시<br />(기본값:15초)", change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}} },
        broadcater_theme : { under_dev:true, category:"broadcast", depth:2, type: "radio", value: "box", title:"테마", desc:"", radio: {box: {title: "Box", value:"box"}, twitch: {title: "Twitch", value:"twitch"}, simple: {title: "Simple", value:"simple"} }, change:function(){if(nomo_common.ADD_get_page_type() === nomo_const.C_UCHAT){nomo_theme.broadcaster_theme_css();}}},

        under_dev : { category:"advanced", category_name:"고급", depth:1, type: "checkbox", value: false, title:"실험실 기능 및 고급 기능 설정", desc:"실험 중인 기능 및 고급 기능을 직접 설정" },
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
                    $.each(old_value, function(ekey, _evalue){
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

#GM_setting .GM_setting_category_name{display:table-cell;width:110px;padding:0 0 0 0px;font-weight:700;vertical-align:top;}
#GM_setting .GM_setting_category_blank{display:table-cell;width:110px;padding:0 0 0 0px;vertical-align:top;}

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

#GM_setting .btn-xxs {cursor:pointer;padding:4px 4px;} /*padding: 1px 2px;font-size: 9px;line-height: 1.0;border-radius: 3px;margin:0 2px 2px 0;*/
#GM_setting .btn-xxs .glyphicon{}
#GM_setting .btn-xxs span.glyphicon {font-size:11px; opacity: 0.1;}
#GM_setting .btn-xxs.active span.glyphicon {opacity: 0.9;}
#GM_setting .btn-xxs.disable {opacity: 0.3;cursor:not-allowed;}
`);
    };
    var createlayout_ = function(elem){
        //ADD_DEBUG("createlayout_");
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
    <a href='https://nomomo.github.io/Addostream/' target='_blank' style='font-size:12px;font-weight:normal;align-self:flex-end;'>ADDostram v`+nomo_global.version_str+` (https://nomomo.github.io/Addostream/)</a>
</div>
</div>`);
        var $ul = $("<ul id='GM_setting'></ul>");
        var $prev = undefined;
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
            var $li = $("<li GM_setting_key='"+key+"' GM_setting_depth='"+depth+"' class='"+(settings_full[key].under_dev ? "GM_setting_under_dev " : "")+(category_name !== undefined && category !== $prev.category ? "GM_setting_category " : "")+"GM_setting_depth"+depth+"'></li>");
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

            if( (!nomo_global.DEBUG && settings_full[key].disable) || (!ADD_config.under_dev && settings_full[key].under_dev) ){
                ADD_DEBUG("숨김", key);
                $li.css("display","none");
            }

            $prev = settings_full[key];
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
                    message_("자동 저장 완료! "+(new Date()).toLocaleTimeString(), $elem);
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
                GM_setting.createlayout($g_elem);
                message_("설정 초기화 완료! "+(new Date()).toLocaleTimeString(), $g_elem);
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
                GM_setting.createlayout($g_elem);
                message_("전체 초기화 완료! "+(new Date()).toLocaleTimeString(), $g_elem);
            }
        });
    };
    var message_ = function(msg, $elem){
        if($elem === undefined){
            return;
        }
        var prefix = "GM_setting_autosaved";
        $elem.find("."+prefix).animate({bottom:"+=40px"}, {duration:300, queue: false}); // cleqrQueue().dequeue().finish().stop("true","true")
        // @keyframes glow {to {text-shadow: 0 0 10px white;box-shadow: 0 0 10px #5cb85c;}}
        $("<div style='animation: glow .5s 10 alternate; position:fixed; left:10px; bottom:20px; z-index:10000000;' class='"+prefix+" btn btn-success'>"+msg+"</div>")
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
                val = val.split(","); // val = val.replace(/\s/g,"").split(",");
                if(val.length === 1 && val[0] === ""){
                    val = [];
                }
                $.each(val, function(index, value){
                    val[index] = value.replace(/^\s*|\s*$/g, "");
                });
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
        for(var i=0; i<$lis.length; i++){
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

                    // 이전 요소가 체크박스가 아니면 그냥 켠다.
                    // if($prev_checkbox.length !== 0){
                    //     enable[prev_depth] = true;
                    // }
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
            $.each(old_value, function(ekey, _evalue){
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
        createlayout: function(elem){
            createlayout_(elem);
        },
        getType: function(key){
            if(settings_full[key] !== undefined){
                return settings_full[key].type;
            }
            else{
                return undefined;
            }
        },
        message: function(msg, $elem){
            message_(msg, $elem);
        }
    };
})(jQuery, window, document);