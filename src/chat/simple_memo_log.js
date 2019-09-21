import * as utils from "libs/nomo-utils.js";
import {get_chat_manager_from_main_frame} from "chat/chat_manager.js";
var ADD_DEBUG = utils.ADD_DEBUG;
import nomo_const from "general/const.js";

var chat_manager_data = [],
    $memo_container;

export async function memoLoglayoutInit(){
    if(nomo_global.PAGE === nomo_const.C_MAIN){
        get_chat_manager_from_main_frame();
    }

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
                                <th style="width:120px;">닉네임</th>
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
    writeMemoLogtolayout($memo_container);
}

async function writeMemoLogtolayout(){
    $("html").addClass("no-scroll");
    var $tbody = $memo_container.find("tbody");
    $tbody.html("");
    var newDate = Number(new Date());
    for (var i=0;i<chat_manager_data.length;i++){
        var modified_date_color = "";
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
        var modified_date = utils.transferTime(modified_date_diff);
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

    
}


////////////////////////////////////////////////////////////////////
// 이벤트 등록
////////////////////////////////////////////////////////////////////

// 수정 버튼 클릭 시
$(document)
    .on("click", "span.mod", function(){
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
    })
    .on("click", "span.cancel", function(){
        writeMemoLogtolayout($memo_container);
    })
    // 삭제 버튼 클릭 시
    .on("click", "span.del", async function(){
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
        writeMemoLogtolayout($memo_container);
    })
    // 저장 버튼 클릭 시
    .on("click", "span.save", async function(){
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
            writeMemoLogtolayout($memo_container);
        }
        else{
            alert("취소 되었습니다.");
        }
    });