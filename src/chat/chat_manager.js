import nomo_const from "general/const.js";
import * as nomo_common from "general/common.js";
import {ADD_DEBUG} from "libs/nomo-utils.js";
import {ADD_send_sys_msg} from "chat/send_message.js";

export var chat_manager = (function(){
    //var keys = ["nick","display_name","detail_content","color","modified_date","isBlock","isShowDelMsg"];
    var initObj = {"nick":"닉네임", "display_name":"", "detail_content":"", "color":"","modified_date":Number(new Date()), "isBlock":false, "isShowDelMsg":false};
    var placeholder = {"nick":"닉네임", "display_name":"채팅창에 표시할 내용", "detail_content":"상세 내용", "color":"#333","modified_date":Number(new Date()), "isBlock":false, "isShowDelMsg":false};
    var data = [];//[{"nick":"11","display_name":"111"},{"nick":"22","display_name":"222"}];
    var obj_simple = {};
    var isSavedMemo = false;
    var nick, display_name, detail_content, color, modified_date, isBlock, isShowDelMsg;
    var $mainFrame;
    var $memo_simple_layout_container, $memo_simple_layout, $memo_isSavedMemo, $simpleMemoElem,
        $memo_button_save, $memo_button_delete, $memo_button_close, $nick, $display_name,
        $detail_content, $color, $modified_date, $isBlock, $isShowDelMsg;
    var $memo_change_text;
    var $memo_button;

    /////////////////////////////////////////////////
    // private functions
    var initManager = async function(){
        // 메모 데이터 읽기
        await loadData();

        // 숨겨진 메모 입력 layout 만들기
        $simpleMemoElem = $(`
        <div id="memo_simple_layout_container" style="z-index: 100000;background-color:rgba(51,51,51,0.8);cursor:pointer;height:100%;left:0;overflow-y:scroll;padding:0;position:absolute;
            text-align:center;top: 0;width: 100%;display:none;">
            <div id="memo_simple_layout" style="width:100%;position:absolute;top:50%;margin-top:-50%;cursor:default;">
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
        var $body = $mainFrame.find("body");
        if($body.length !== 0){
            $body.first().addClass("chat_manager_added").append($simpleMemoElem);
        }
        else{
            $mainFrame.append($simpleMemoElem);
        }
        $memo_simple_layout_container = $mainFrame.find("#memo_simple_layout_container");
        $memo_simple_layout = $simpleMemoElem.find("#memo_simple_layout");

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
    var closeSimplelayout = function(){
        $memo_simple_layout_container.fadeOut("fast");
        $memo_change_text.css("display","none");
    };
    var saveSimplelayout = async function(){
        getObjFromSimplelayout();
        obj_simple.modified_date = Number(new Date());  // 수정 시간 갱신
        addObjtoData(obj_simple);
        await saveData();

        // 차단할 경우 삭제
        if(obj_simple.isBlock){
            var $lines = nomo_global.GLOBAL_CHAT_CONTENT_DIV.find(".line");
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
        $memo_simple_layout_container.on("click", function(){
            closeSimplelayout();
        });
        $memo_button_close.on("click", function(){
            closeSimplelayout();
        });

        // 창 끄기 방지 이벤트
        $memo_simple_layout.on("click", function(e){
            e.stopPropagation();
        });
        ADD_DEBUG("채팅 매니저 이벤트 등록 완료");

        // 메모 저장 이벤트
        $memo_button_save.on("click", async function(){
            await saveSimplelayout();
            $memo_change_text.fadeOut("fast").html("메모가 저장되었습니다.").fadeIn("fast");
            ADD_DEBUG("메모 저장 이벤트 끝", data);
        });

        // 메모 삭제 이벤트
        $memo_button_delete.on("click", async function(){
            getObjFromSimplelayout();
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
        data = await nomo_common.nomo.getVal("ADD_chat_manager_data",[]);
        // ADD_DEBUG("채팅 매니저 데이터 로드", data);
    };
    var saveData = async function(){
        await nomo_common.nomo.setVal("ADD_chat_manager_data",data);
        // ADD_DEBUG("채팅 매니저 데이터 저장", data);
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
    // Simplelayout 에서 변수 읽어오기
    var getObjFromSimplelayout = function(){
        nick = $nick.text();
        display_name = $display_name.val();
        color = $color.val();
        detail_content = $detail_content.val();
        modified_date = $modified_date.val();
        isBlock = $isBlock.is(":checked");
        isShowDelMsg = $isShowDelMsg.is(":checked");

        obj_simple = {"nick":nick, "display_name":display_name, "detail_content":detail_content, "color":color, "modified_date":modified_date, "isBlock":isBlock, "isShowDelMsg":isShowDelMsg};
    };
    // Simplelayout 에 변수 쓰기
    var writeObjFromSimplelayout = function(){
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
            await nomo_common.nomo.setVal("ADD_chat_manager_data",[]);
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
        openSimplelayout: async function(obj){
            ADD_DEBUG("Simplelayout 오픈", obj);
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

            // layout에 값을 덮어씌운다.
            writeObjFromSimplelayout();

            // layout 요소를 보인다.
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
            var memo_index = getObjIndexFromData(nick);
            var new_nick = "도배";
            var new_content = content;
            if(memo_index !== -1){
                var memo_obj = chat_manager.getData(memo_index);
                new_nick = memo_obj.display_name + "_도배";
                new_content = memo_obj.detail_content + "_도배_" + content;
            }
            var temp_obj = objInit({nick:nick, display_name:new_nick, detail_content:new_content, modified_date:Number(new Date()), isBlock:true});
            addObjtoData(temp_obj);
            await saveData();
        },
        openManagerlayout: function(){

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


/**
 * main 에서 chat iframe 의 chat_manager 함수를 가져온다.
 */
export function get_chat_manager_from_main_frame(){
    if(nomo_global.PAGE !== nomo_const.C_UCHAT){
        if($(".chat-container > iframe").length !== 0 && $(".chat-container > iframe")[0].contentWindow.chat_manager !== undefined){
            ADD_DEBUG("iframe  의 chat manager 함수를 가져왔다.");
            window.chat_manager = $(".chat-container > iframe")[0].contentWindow.chat_manager;
        }
        else{
            ADD_DEBUG("메인 의 chat manager 함수를 가져왔다.");
            window.chat_manager = chat_manager_main;
        }
        return;
    }
}

// 유저 정보 가져오기 $("iframe").contentWindow.rooms["dostream"].room.user.get("Guest_09713")
// $("iframe").contentWindow.rooms["dostream"].room.user["nick"].session