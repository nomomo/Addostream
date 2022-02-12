import lib_tagit from "libs/jqueryui-tagit.js";
import {memoLoglayoutInit} from "chat/simple_memo_log.js";
lib_tagit(jQuery);

import {streamerArray_name, streamerArray_display_name, streamerArray_AutoComplete} from "general/streamer-lib.js";
import * as utils from "libs/nomo-utils.js";
var ADD_DEBUG = utils.ADD_DEBUG;
import * as nomo_common from "general/common.js";
import {twitch_api, twitch_api_call_interval} from "general/twitch.js";
import {ADD_main_event_binding} from "general/event.js";

import {ADD_parse_list_data} from "general/list.js";
import {MD5} from "libs/MD5.js";
import {get_chat_manager_from_main_frame} from "chat/chat_manager.js";
import {escapeHtml} from "libs/nomo-utils.js";

// 설정 클릭 시 enable 요소가 있는 설정을 아래 배열에 등록
const ADD_config_enable_init = ["ADD_config_top_fix","ADD_config_alarm","ADD_config_thumbnail_mouse","ADD_config_streamer_hide","ADD_config_chat_ctr","ADD_config_chat_image_preview","ADD_config_imgur_preview_safe","ADD_config_remember_platform","ADD_config_chat_block","ADD_config_insagirl_button"];

// 설정 관련 버튼, 팝업 layout 생성
export function ADD_basic_layout(){
    // 설정 버튼 및 팝업 생성
    var $ADD_basic_layout = $( /*html*/ `
<div style="position:relative;margin-left:170px;">
    <div id="notice_text_elem" title="Dosteam+ System Message">
        <span id="notice_text">문어문어문어문어<br />블러드트레일 블러드트레일</span><span id="notice_text2"></span>
    </div>
    <div id="history_elem"></div>
    <div class="AD_title">
        <span id="ADD_twip" style="display:none;" class="btn btn-default btn-sm" aria-label="Twip donate" data-microtip-position="bottom" role="tooltip">
            <span>Twip</span>
        </span>
        <span id="ADD_toonation" style="display:none;" class="btn btn-default btn-sm" aria-label="Toonation donate" data-microtip-position="bottom" role="tooltip">
            <span>Toon</span>
        </span>
        <span id="ADD_change_multi" class="btn btn-default" aria-label="멀티트위치↔트위치 전환" data-microtip-position="bottom" role="tooltip">
            <span class="glyphicon glyphicon-resize-horizontal"></span>
        </span>
        <span id="ADD_quick_list" class="btn btn-default" aria-label="퀵리스트" data-microtip-position="bottom" role="tooltip">
            <span class="glyphicon glyphicon-list"></span>
        </span>
        <span id="ADD_config" class="btn btn-default" aria-label="설정" data-microtip-position="bottom" role="tooltip">
            <span class="glyphicon glyphicon-cog">
            </span>
        </span>
    </div>

    <div id="popup_ADD_quick" class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <div class="quick_list_title">Quick list</div>
                <div class="stream_list_scroll">
                    <ul class="stream_list"></ul>
                </div>
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
                                <a href="https://nomomo.github.io/Addostream/" target="_blank">ADDostram v${nomo_global.version_str}</a>
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
                                <span aria-label="기본 두스트림에 메인에 없는\nTwitch 스트리머를 메인에 추가\n(본 기능을 활성화하려면 Twitch 계정과의 연동이 필요)" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                    <label class="btn btn-default btn-xxs">
                                        <input type="checkbox" id="ADD_config_alarm" onfocus="this.blur()"  />
                                        <span class="glyphicon glyphicon-ok"></span>
                                    </label> 메인에 스트리머 추가<br />
                                    <div style="padding:3px;">
                                        <a class="OpenTwitchAuth" href="https://www.dostream.com/addostream/twitch/auth/">[Twitch 계정 연동 페이지]</a>
                                    </div>
                                </span>
                            </td>
                            <td>
                            <input type="text" id="ADD_config_top_alarm_ID" style="width:100%;" class="input_text_by_tag ADD_config_alarm_form form_enabled" /><ul id="ADD_config_top_alarm_ID_Tags"></ul></td>
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
                                        </label> 시청기록
                                    </span>
                                    <span style="margin-left:5px;" aria-label="채팅창 위치를 왼쪽으로 변경" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                        <label class="btn btn-default btn-xxs">
                                            <input type="checkbox" id="ADD_config_theme_leftchat" class="" onfocus="this.blur()"  />
                                            <span class="glyphicon glyphicon-ok"></span>
                                        </label> 좌측채팅
                                    </span>
                                </span>
                                <span style="">
                                    <span style="margin-left:5px;">
                                        <span aria-label="두스 내에서 좌표 페이지 호출" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                            <label class="btn btn-default btn-xxs">
                                                <input type="checkbox" id="ADD_config_insagirl_button" class="" onfocus="this.blur()"  />
                                                <span class="glyphicon glyphicon-ok"></span>
                                            </label> 빠른좌표
                                        </span>
                                    </span>
                                    <span style="margin-left:5px;">
                                        <span aria-label="채팅매니저에서 차단한 유저의 좌표를\n빠른 좌표 페이지에서 보이지 않도록 함" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">
                                            <label class="btn btn-default btn-xxs">
                                                <input type="checkbox" id="ADD_config_insagirl_block_by_nick" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_insagirl_button_form form_enabled" />
                                                <span class="glyphicon glyphicon-ok"></span>
                                            </label> 좌표차단
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
        `)
        .appendTo("header .container");

    ///////////////////////////////////////////////////////////////////////
    // event binding
    ///////////////////////////////////////////////////////////////////////
    $ADD_basic_layout
        // 퀵리스트 온오프 이벤트
        .on("click", "#ADD_quick_list", function(e){
            e.stopPropagation();
            if (!$("#ADD_quick_list").hasClass("btn_opend")){
                ADD_parse_list_data(1);
                $("#popup_ADD_quick").stop(true,true).fadeIn(300);
                $("#ADD_quick_list").toggleClass("btn_opend");

                $("#popup_ADD_config").stop(true,true).fadeOut(300);
                $("#ADD_config").removeClass("btn_opend");

                $("#popup_ADD_test").stop(true,true).fadeOut(300);
                $("#ADD_test_button").removeClass("btn_opend");
            }
            else{
                $("#popup_ADD_quick").stop(true,true).fadeOut(300, function(){
                    $("#popup_ADD_quick").find("ul").empty();
                });
                $("#ADD_quick_list").removeClass("btn_opend");
            }
        })
        // 설정 창 온오프 이벤트
        .on("click", "#ADD_config", async function(e){
            e.stopPropagation();
            if (!$("#ADD_config").hasClass("btn_opend")){
                //await GM_setting.load();
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
        })
        // 디버그 창 온오프 이벤트
        .on("click", "#ADD_test_button", function(e){
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
        })
        // 설정 저장 이벤트
        .on("click", "#ADD_config_save", async () => {
            ADD_save_config();
        })
        // 설정 초기화 이벤트
        .on("click", "#Cookie_reset", async () => {
            var r = confirm("모든 설정을 초기화 하려면 확인(OK) 버튼을 누르세요.");
            if (r == true){
                await GM_setting.reset();
                ADD_var_to_config_form();

                // 블록된 채팅 로그 초기화
                await nomo_common.nomo.setVal("ADD_Blocked_Chat",[]);

                // 메모 쿠키 초기화
                await GM.deleteValue("ADD_chat_manager_data");

                // 버전 체크 데이터 리셋
                var ADD_version_last_check_time = new Date(Date.parse(new Date()) - 2 * 1000 * 60 * 60 * 24);
                await nomo_common.nomo.setVal("ADD_version_last_check_time",ADD_version_last_check_time);

                // 설정 팝업 알림 영역 표시
                $("#ADD_config_Success").fadeIn("1000").delay("3000").fadeOut("1000");
                ADD_DEBUG("설정 리셋 완료");
            }
            else {
                alert("설정 초기화가 취소되었습니다.");
                ADD_DEBUG("설정 리셋 취소");
            }
        })
        // 설정 복구 이벤트
        .on("click", "#ADD_config_restore", async () => {
            var temp_ADD_config = await GM.getValue("ADD_config");
            if(!utils.IsJsonString(temp_ADD_config)){
                temp_ADD_config = JSON.stringify(temp_ADD_config);
            }
            var temp_ADD_chat_memo = await GM.getValue("ADD_chat_manager_data",[]);
            if(!utils.IsJsonString(temp_ADD_chat_memo)){
                temp_ADD_chat_memo = JSON.stringify(temp_ADD_chat_memo);
            }

            var backup_text = "<<<ADD_chat_memo>>>"+temp_ADD_chat_memo+"<<<ADD_config>>>"+temp_ADD_config+"<<<END>>>";
            var MD5_key = MD5(backup_text);
            ADD_DEBUG("backup_text",backup_text);
            ADD_DEBUG("MD5_key",MD5_key);

            backup_text = "<VERIFICATION_KEY:"+MD5_key+">"+backup_text;
            $("html").addClass("no-scroll");
            $(`
                <div class="lightbox-opened">
                <div class="backup_layout" style="position: absolute; top: 50%;left:50%; width: 600px; height:300px; margin-left:-300px; margin-top:-150px;">
                <div style="width:600px;height:200px;cursor:default;" class="modal-content">
                <div style="padding:7px 0;font-size:12px;"><span style="font-weight:700;">Backup & Restore - 메모 및 주요 설정 백업 및 복원</span><br />복원 방법: 아래 기존 백업한 내용을 붙여넣기 후 SAVE (버전이 다르면 복원되지 않을 수 있음)</div>
                <textarea spellcheck="false" id="backup_textbox" style="width:90%;height:100px;font-size:11px;padding:2px;white-space: pre-wrap;word-wrap: break-all;">`+backup_text+`</textarea>
                <div style="padding:5px 0;"><span id="backup_ok" class="btn btn-default">SAVE</span></div>
                </div>
                <div id="backup_text_container" style="position:relative;top:10px;left:0px; width:600px;height:30px;font-size:12px;cursor:pointer;"><span id="backup_text" style="color:#fff">저장하지 않고 나가려면 배경화면을 누르세요.</span></div>
                </div>
                </div>
                `)
                // backup and restore event
                .on("click", "#backup_ok", async () => {
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
                            nomo_global.DEBUG = !(nomo_global.DEBUG);
                            await nomo_common.nomo.setVal("nomo_global.DEBUG", nomo_global.DEBUG);
                            text_contents = "DEBUG 모드: "+nomo_global.DEBUG;
                            await nomo_common.nomo.setVal("ADD_DEBUG_MODE", nomo_global.DEBUG);
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
                                else if(temp_ADD_config == restore_config && temp_ADD_chat_memo == recorver_chat_memo){
                                    text_contents = "현재 설정과 복원할 설정이 같아서 복원하지 않습니다. <br />나가려면 배경화면을 누르세요.";
                                }
                                else {
                                    restore_config = utils.IsJsonStringReturn(restore_config);
                                    window["ADD_config"] = restore_config;
                                    await GM_setting.save_overwrite();
                                    ADD_var_to_config_form();
                                    recorver_chat_memo = utils.IsJsonStringReturn(recorver_chat_memo);
                                    await GM.setValue("ADD_chat_manager_data",recorver_chat_memo);
                                    text_contents = "설정이 복원되었습니다. 문제 발생 시 확장기능에서 ADDostream을 초기화 or 삭제 후 재설치 하세요. <br /> 나가려면 배경화면을 누르세요.";
                                }
                            }
                        }
                        $("#backup_text").html(text_contents).fadeIn(200);
                    }, 200);
                })
                .appendTo("body");
        })
        // 메모 로그 버튼 클릭 이벤트
        .on("click", ".show_memo_log", async () => {    
            get_chat_manager_from_main_frame();
            ADD_DEBUG("메모 로그 버튼 클릭됨");
            memoLoglayoutInit();
        })
        // 목록 열기/닫기 이벤트
        .on("click", ".expand_window_on", function(){
            var $target_elem = $(this).attr("target_elem");
            var toggle_on = $(this).attr("toggle_on");
            var toggle_off = $(this).attr("toggle_off");
            if ($($target_elem).is(":visible")) {
                $(this).text(toggle_on);
            } else {
                $(this).text(toggle_off);
            }
            $($target_elem).slideToggle("fast");
        })
        // 트위치<->멀티트위치 버튼 클릭 이벤트
        .on("click", "#ADD_change_multi", function(){
            var document_url = location.href;
            var lowercase_document_url = document_url.toLowerCase();
            var stream_url = lowercase_document_url.indexOf("/stream/");
            var twitch_url = lowercase_document_url.indexOf("/twitch/");
            var multitwitch_url = lowercase_document_url.indexOf("/multitwitch/");
            var move_url = "";
            if(stream_url !== -1){
                if(twitch_url !== -1){
                    if(ADD_config.playing_chat_iframe && lowercase_document_url.indexOf("&") === -1 && lowercase_document_url.indexOf(",") === -1){
                        var $stream = $("#stream");
                        var $stream_chat = $(".stream_chat");
                        if($stream_chat.length === 0){
                            // 채팅 넓이 변수 확인
                            var stream_chat_width = ADD_config.playing_chat_iframe_width;
                            if(!$.isNumeric(stream_chat_width)){
                                stream_chat_width = 300;
                            }

                            // 테마 변수 확인
                            var stream_chat_theme = "";
                            switch (ADD_config.playing_chat_iframe_theme) {
                            case "default":
                                if(ADD_config.theme === "black_youtube" || ADD_config.theme === "dark" || ADD_config.theme === "black" || $("body").hasClass("theme-black") || $("body").hasClass("theme-black_youtube") ){
                                    stream_chat_theme = "&darkpopout";
                                }
                                break;
                            case "black_youtube":
                                stream_chat_theme = "&darkpopout";
                                break;
                            case "dark":
                                stream_chat_theme = "&darkpopout";
                                break;
                            case "white":
                                break;
                            default:
                                break;
                            }

                            // header 높이 계산
                            var $header = $("header");
                            var header_height;
                            if($header.length === 1){
                                header_height = $header.outerHeight();
                            }
                            else{
                                header_height = "45";
                            }
                            $stream.find("iframe").css("width", `calc(100% - ${stream_chat_width}px)`);
                            // leftchat 에 대한 대응은 theme.js 에 추가한 css 를 이용해서 함
                            $stream_chat = $(`<div class="stream_chat" style="position:absolute;margin-top:${header_height}px;top:0;height:calc(100% - ${header_height}px);"></div>`);
                            $stream.append($stream_chat);
                            var $stream_chat_iframe = `<div class="stream_chat_iframe" style="width:${stream_chat_width}px;height:100%;"><iframe src="https://www.twitch.tv/embed/${nomo_global.ADD_now_playing.id}/chat?parent=www.dostream.com${stream_chat_theme}" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen="allowfullscreen"></iframe></div>`;
                            // var $stream_chat_iframe = `<div class="stream_chat_iframe" style="width:${stream_chat_width}px;height:100%;"><iframe src="https://www.twitch.tv/${nomo_global.ADD_now_playing.id}/chat${stream_chat_theme}" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen="allowfullscreen"></iframe></div>`;
                            // var $stream_chat_iframe = `<div class="stream_chat_iframe" style="width:${stream_chat_width}px;height:100%;"><iframe src="https://twitch.tv/chat/embed?channel=${nomo_global.ADD_now_playing.id}${stream_chat_theme}" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen="allowfullscreen"></iframe></div>`;
                            $stream_chat.empty().append($stream_chat_iframe);
                        }
                        else{
                            $stream_chat.remove();
                            $stream.find("iframe").css("width", "100%");
                        }
                    }
                    else{
                        move_url = document_url.replace("/twitch/","/multitwitch/");
                        window.location.href = move_url;
                    }
                }
                else if(multitwitch_url !== -1){
                    /*
                    var eff_url = document_url.split("/multitwitch/")[1];
                    // 멀티 트위치 하나 이상인 경우
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
                                    <a href='https://www.dostream.com/#/stream/twitch/`+eff_url_arr[i]+"' style='font-style:normal;color:#fff'>"+(i+1)+`</a>
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
        })
        // 트윕 버튼 클릭 이벤트
        .on("click", "#ADD_twip", function(){
            if(nomo_global.ADD_now_playing.id !== undefined && nomo_global.ADD_now_playing.id !== ""){
                var ww = $(window).width(),
                    wh = $(window).height();
                var wn = (ww > 850 ? 850 : ww/5*4);
                var left  = (ww/2)-(wn/2),
                    top = (wh/2)-(wh/5*4/2);
                if(nomo_global.ADD_now_playing.twip_link !== undefined && nomo_global.ADD_now_playing.twip_link !== ""){
                    window.open(nomo_global.ADD_now_playing.twip_link,"winname",
                        "directories=yes,titlebar=yes,toolbar=yes,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width="+wn+",height="+wh/5*4+",top="+top+",left="+left);
                }
            }
            else{
                ADD_DEBUG("ADD_now_playing 이 없다.", nomo_global.ADD_now_playing);
            }
        })
        // 투네이션 버튼 클릭 이벤트
        .on("click", "#ADD_toonation", function(){
            if(nomo_global.ADD_now_playing.id !== undefined && nomo_global.ADD_now_playing.id !== ""){
                var ww = $(window).width(),
                    wh = $(window).height();
                var wn = (ww > 850 ? 850 : ww/5*4);
                var left  = (ww/2)-(wn/2),
                    top = (wh/2)-(wh/5*4/2);
    
                if(nomo_global.ADD_now_playing.toonat_link !== undefined && nomo_global.ADD_now_playing.toonat_link !== ""){
                    window.open(nomo_global.ADD_now_playing.toonat_link,"winname",
                        "directories=yes,titlebar=yes,toolbar=yes,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width="+wn+",height="+wh/5*4+",top="+top+",left="+left);
                }
            }
            else{
                ADD_DEBUG("ADD_now_playing 이 없다.", nomo_global.ADD_now_playing);
            }
        })
        .on("click",".OpenTwitchAuth",function(e){
            e.preventDefault();
            var ww = $(window).width(),
                wh = $(window).height();
            var wn = (ww > 850 ? 850 : ww/5*4);
            window.open("https://www.dostream.com/addostream/twitch/auth/","winname",
                "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width="+wn+",height="+wh/5*4);

        });

        
    // 오토컴플리트 클릭 이벤트
    // $(document).on("click", ".tagit-autocomplete, .tagit-autocomplete li", function(e){
    //     e.stopPropagation();
    // });

    // 바깥 부분 클릭 했을 때 창 닫기
    $(document)
        .on("click", "html, ul.stream_list", function(e){
            // 창 닫기 예외 처리 1 - 자동완성 클릭 시
            var $target = $(e.target);
            if($target.parents("ul").filter(function(){
                return $(this).hasClass("ui-autocomplete");
            }).length !== 0){
                return false;
            }

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
        })
        // modal 창 클릭 시 꺼지지 않게 하는 이벤트
        .on("click", "div.modal-content", function(e){
            e.stopPropagation();
        });

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

    $("#ADD_config_chat_block_tag_Tags").tagit({autocomplete: {delay: 0},singleField: true,singleFieldNode: $("#ADD_config_chat_block_tag"),allowSpaces:true});
    $("#ADD_config_chat_block_tag_Tags").sortable(sortable_options);
    $("#ADD_config_chat_block_tag_Tags").disableSelection();

    $("li.tagit-new").each(function(){ $(this).hide(); });
    $("input:text .ui-autocomplete-input").each(function(){ $(this).attr("spellcheck", false); });

    ////////////////////////////////////////////////////////////////////
    $(document)
        // TAGS TEXT INPUT FOCUS EVENT
        .on("click", "ul.tagit", function(){
            $(this).find("li.tagit-new").show();
            $(this).find("li.tagit-new input:text").focus();
        })
        //SPAN 영역에 클릭 이벤트 설정
        .on("click", "li.tagit-choice", function(event){
            event.stopPropagation();
        })
        // 체크박스 라벨 이벤트 설정
        .on("click", "#popup_ADD_config table td input[type=\"checkbox\"]", function(){
            $(this).parent("label.btn").toggleClass("active");
        });

    // footer @
    if($(".footer").html() !== undefined){
        var at_fix = $(".footer").html().replace("@","<div id=\"at\" title=\"????\">@</div>");
        $(".footer")
            .html(at_fix)
            // @ 클릭 시 동작
            .on("click", "#at", function(){
                $("body").append("<div class=\"sigong\"><div class=\"sigong_detail1\"></div><div class=\"sigong_detail2\"></div></div><div class=\"hos\"></div><div style=\"display: none;\"><audio autoplay=\"true\" controls=\"\" class=\"attach_audio\" src=\"https://cdh0912.github.io/assets/files/시공의 폭풍은 정말 최고야.mp3\" type=\"audio/mpeg\"></audio><audio autoplay=\"true\" controls=\"\" class=\"attach_audio\" src=\"https://cdh0912.github.io/assets/files/시공좋아시공좋아.mp3\" type=\"audio/mpeg\"></audio></div>");
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
            });
    }

}

//////////////////////////////////////////////////////////////////////////////////
// 설정 창에 설정 값을 덮어씌우기 위한 함수
export function ADD_var_to_config_form(){
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
    ADD_config_enable();

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
export async function ADD_save_config_to_data(){
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
                ADD_config[key] = ADD_config_ID.val().split(",");
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
// config form click event
function ADD_config_enable(){
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

async function ADD_save_config(){
    await ADD_save_config_to_data();

    if (nomo_global.local_api_refresh === true){
        nomo_global.local_api_refresh = false;
        nomo_global.api_push_forced = true;

        await twitch_api();
        twitch_api_call_interval();
        setTimeout(function(){
            nomo_global.local_api_refresh = true;
        }, 5000);
    }

    // 이벤트 재결합
    ADD_DEBUG("설정 저장에 의한 이벤트 바인딩");
    ADD_main_event_binding();

    // 설정 팝업 알림 영역 표시
    $("#ADD_config_Success").fadeIn("1000").delay("3000").fadeOut("1000");

    // 메인일 경우 메인 리로드
    nomo_common.reloadMain();
}

// 이벤트 일괄 등록 - 1회용
export function ADD_simple_config_event(){
    for(var i=0;i<ADD_config_enable_init.length;i++){
        (function(id){
            $(document).on("click", "#"+id, function(){
                ADD_config_enable();    // ADD_config_enable([id]);
            });
        })(ADD_config_enable_init[i]);
    }

    $(document).on("click", ".show_blocked_chat", async () => {
        await blocked_chat_layout();
    });
        
}

export async function blocked_chat_layout(){
    $("html").addClass("no-scroll");
    var ADD_Blocked_Chat = await nomo_common.nomo.getVal("ADD_Blocked_Chat", []);
    var Blocked_text = "";
    if(ADD_Blocked_Chat.length === 0){
        Blocked_text = "현재 차단된 채팅이 없습니다.";
    }
    else{
        get_chat_manager_from_main_frame();
        await chat_manager.reloadData();

        for(var i=(ADD_Blocked_Chat.length - 1); i>=0; i--){
            if(typeof ADD_Blocked_Chat[i] === "object"){

                // {"created":date, "nick":nick, "content":content};
                var temp_obj = ADD_Blocked_Chat[i];

                // 메모 내용 가져오기
                var temp_display_name = "";
                if(chat_manager !== undefined && ADD_config.chat_memo){
                    var memo_index = chat_manager.indexFromData(temp_obj.nick);
                    if(memo_index !== -1){
                        ADD_DEBUG(memo_index);
                        var memo_obj = chat_manager.getData(memo_index);
                        temp_display_name = " ["+memo_obj.display_name+"]";
                    }
                }

                Blocked_text = Blocked_text
                    + "<tr><td class='blocked_chat_date' style='max-width:130px;padding-right:15px;white-space:nowrap;overflow:hidden;'>"
                    + utils.getTimeStampWithDash(new Date(temp_obj.created), "s")
                    + "</td><td class='blocked_chat_nick' style='max-width:200px;padding-right:15px;text-align:left;white-space:nowrap;overflow:hidden;'>"
                    + escapeHtml(temp_obj.nick)
                    + escapeHtml(temp_display_name)
                    + "</td><td class='blocked_chat_content' style='margin:0 0 0 10px;'>"
                    + escapeHtml(temp_obj.content)
                    + "</td></tr>";
            }
            else{
                Blocked_text = Blocked_text + ADD_Blocked_Chat[i]+"<br />";
            }
        }
    }

    $("body").append(`
        <div class="lightbox-opened" id="ADD_blocked_chat_container">
            <div class="lightbox-opened-white-background modal-content" style="cursor:default;max-width:1200px;min-width:500px;display:table;">
                <div style="font-family:'Noto Sans KR', '맑은 고딕', 'malgun gothic', dotum, serif;">
                    <span style="font-weight:900;font-size:14px;">차단 기록 보기</span><br />
                    <span style="margin:0 0 5px 0;display:inline-block;">차단된 채팅은 최대 `+ADD_config.chat_block_log_limit+`개까지 저장됩니다.<br />캠페인: 채팅창에서 메모 내용을 언급하지 말고 혼자 조용히 사용해주세요.</span><br />
                    <table id="ADD_blocked_text">
                        `+Blocked_text+`
                    </table>
                </div>
            </div>
        </div>
        `);
}