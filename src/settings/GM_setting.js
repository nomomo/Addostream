var GM_setting = (function ($, global, document) { //
    var version = "22.5.31";

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // local vars
    var $g_elem;
    var latestCreatedLayout = undefined;
    var name_ = "";
    var changed_key = [];
    var settings_init = {};
    var _settings = {};
    var settings = {};
    var $inputs = {};
    var DEBUG = false;
    
    /////////////////////////////////////////////////////////////////////////////////////////////////
    var CONSOLE_MSG = function(/**/){
        if(!DEBUG) return;
        var args = arguments, args_length = args.length, args_copy = args;
        for (var i=args_length;i>0;i--) args[i] = args_copy[i-1];
        args[0] = "+[GM_SETTINGS]  ";
        args.length = args_length + 1;
        console.log.apply(console, args);
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // multi language
    var userLang = (navigator.language || navigator.userLanguage).toLowerCase().substring(0, 2); // ko, en, cn, tw, zh
    var userSelectedLang = userLang;
    var defaultLang = "ko";
    var useMultiLang = false;
    const multilang = {
        "en":{
            "title_settings":"Settings",
            "title_reset":"Reset",
            "donate":"Donate",
            "buymeacoffee":"Buy me a coffee",
            "buymeacoffeeDesc":"Support my projects by buying me a coffee! ☕",
            "toonation":"Toonation",
            "button_reset_settings":"Reset Settings",
            "confirm_reset_settings":"Are you sure you want to reset the settings?",
            "complete_reset_settings":"Settings reset complete!",
            "button_reset_settings_all":"Script reset (refresh is required)",
            "confirm_reset_settings_all":"Do you really want to reset script?",
            "complete_reset_settings_all":"Script initialization complete!",
            "auto_saved":"Autosaved: ",
            "err_val_req":"A value must be entered.",
            "err_num_req":"Only numbers can be entered.",
            "err_num_over":"The input value must be a number greater than or equal to : ",
            "err_num_not_more_than":"The input value must be a number less than or equal to: ",
            "err_valid_array_string":"Only English letters, numbers, commas (,) and underscores (_) can be entered.",
            "err_value_empty":"Something for which no value exists, such as an empty value.",
            "err_value_dup":"Duplicate value exists: ",
            "err_value_blank":"There is an item of a space in the string: ",
            "setting_changed_from_other_window":"설정이 다른 창에서 변경되어 다시 불러옵니다."
        },
        "ko":{
            "title_settings":"Settings",
            "title_reset":"Reset",
            "donate":"후원하기",
            "buymeacoffee":"Buy me a coffee 로 커피 한 잔 사주기",
            "buymeacoffeeDesc":"커피 한 잔☕ 으로 프로젝트를 지원해주세요~",
            "toonation":"Toonation 으로 후원하기",
            "button_reset_settings":"Reset Settings",
            "confirm_reset_settings":"진짜 설정을 초기화 할까요?",
            "complete_reset_settings":"설정 초기화 완료!",
            "button_reset_settings_all":"전체 초기화(새로고침 필요)",
            "confirm_reset_settings_all":"진짜 스크립트를 모두 초기화 할까요?",
            "complete_reset_settings_all":"스크립트 초기화 완료!",
            "auto_saved":"자동 저장 됨: ",
            "err_val_req":"반드시 값이 입력되어야 합니다.",
            "err_num_req":"숫자만 입력 가능합니다.",
            "err_num_over":"입력 값은 다음 값 이상의 숫자이어야 합니다. : ",
            "err_num_not_more_than":"입력 값은 다음 값 이하의 숫자이어야 합니다. : ",
            "err_valid_array_string":"영문, 숫자, 콤마(,), 언더바(_) 만 입력 가능합니다.",
            "err_value_empty":"공백 값 등 값이 존재하지 않는 항목이 존재합니다.",
            "err_value_dup":"중복된 값이 존재합니다: ",
            "err_value_blank":"문자열 내 공백이 존재하는 항목이 있습니다: ",
            "setting_changed_from_other_window":"설정이 다른 창에서 변경되어 다시 불러옵니다: "
        }
    };
    var getTextFromObjectbyLang = function(obj){
        var resText = "";
        if(typeof obj === "object"){
            var objkeys = Object.keys(obj);
            if(objkeys.length === 0){
                return resText;
            }
            if(obj[userSelectedLang] !== undefined){
                resText = obj[userSelectedLang];
            }
            else if(obj[defaultLang] !== undefined){
                resText = obj[userSelectedLang];
            }
            else{
                resText = obj[objkeys[0]];
            }
        }
        else{
            resText = obj;
        }
        return resText;
    };
    var getSystemTextbyLang = function(msg){
        if(multilang[userSelectedLang] !== undefined){
            return multilang[userSelectedLang][msg];
        }
        else if(multilang[defaultLang] !== undefined){
            return multilang[defaultLang][msg];
        }
        else{
            return "";
        }
    };
    var changeLang = function(){
        if(latestCreatedLayout == undefined){
            CONSOLE_MSG("NO CREATED LAYOUT");
            return;
        }
        var $latestCreatedLayout = $(latestCreatedLayout);
        $latestCreatedLayout.empty();
        createlayout_(latestCreatedLayout);
    };


    //
    //
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // private functions
    /////////////////////////////////////////////////////////////////////////////////////////////////
    var init_ = async function (user_settings) {
        CONSOLE_MSG("init_", _settings);
        if(user_settings){
            if(user_settings.DEBUG){
                DEBUG = true;
                CONSOLE_MSG("GM_setting - DEBUG", DEBUG);
            }
            if(user_settings.CONSOLE_MSG){
                CONSOLE_MSG = user_settings.CONSOLE_MSG;
            }
            if(user_settings.SETTINGS){
                _settings = user_settings.SETTINGS;
            }
            if(user_settings.MULTILANG){
                useMultiLang = true;
                if(user_settings.LANG_DEFAULT){
                    defaultLang = user_settings.LANG_DEFAULT;
                }
            }
        }
        else{
            // error
        }
        for (var key in _settings) {
            settings_init[key] = _settings[key].value;
        }
        settings_init["Lang"] = "";

        await load_();
        if (!hasSameKey_(settings_init, settings)) {
            // 추가
            for (key in settings_init) {
                if (settings[key] === undefined) {
                    settings[key] = settings_init[key];
                }
            }
            // 삭제
            for (key in settings) {
                if (settings_init[key] === undefined) {
                    delete settings[key];
                }
            }
            await save_();
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    var save_ = async function () {
        //CONSOLE_MSG("save_");
        if (name_ !== "") {
            await GM.setValue(name_, settings);
        }
        global[name_] = settings;

        // changed_key: 배열,       인덱스번호, 값(키)
        $.each(changed_key, function (eindex, evalue) {
            if (_settings[evalue] !== undefined && _settings[evalue].change !== undefined) {
                _settings[evalue].change(settings[evalue]);
            }
        });
        changed_key = [];
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    var load_ = async function () {
        CONSOLE_MSG("load_");
        if (name_ !== "") {
            settings = await GM.getValue(name_, settings);
        }
        settings["Lang"] = await loadLang_();
        global[name_] = settings;
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    var loadLang_ = async function() {
        userSelectedLang = await GM.getValue("GM_SETTING_LANG", userLang);
        CONSOLE_MSG("loadLang_", userSelectedLang);
        return userSelectedLang;
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    var saveLang_ = async function(lang) {
        if(lang == undefined){
            await GM.setValue("GM_SETTING_LANG", userSelectedLang);
            CONSOLE_MSG("saveLang_", userSelectedLang);
        }
        else{
            await GM.setValue("GM_SETTING_LANG", lang);
            CONSOLE_MSG("saveLang_", lang);
        }
    };

    var reCreateTable_ = function($tbody, key, val) {
        $tbody.empty();
        $tbody.empty();
        for(var i=0;i<val.length;i++){
            var $tr = $(`<tr></tr>`);
            for(var j=0;j<val[i].length;j++){
                if(j==0){
                    $tr.append(`<td>${i+1}</td>`);
                }
                $tr.append(`<td>${val[i][j]}</td>`);
            }
            $tr.append(`<td class="table_btn_container"><span title="Modify" alt="Modify" class="glyphicon glyphicon-pencil cp table_modify" GM_setting_key="${key}"></span><span title="Save" alt="Save" style="display:none;" class="glyphicon glyphicon-floppy-disk cp table_save" GM_setting_key="${key}"></span></td>`);
            $tr.append(`<td class="table_btn_container"><span title="Delete" alt="Delete" class="glyphicon glyphicon-trash cp table_delete" GM_setting_key="${key}"></span><span title="Cancel" alt="Cancel" style="display:none;" class="glyphicon glyphicon-remove cp table_cancel" GM_setting_key="${key}"></span></td>`);
            $tbody.append($tr);
        }
        var $tr_new = $(`<tr></tr>`);
        for(var k=0;k<_settings[key].head.length;k++){   // index
            if(k==0){
                $tr_new.append(`<td></td>`);
            }
            $tr_new.append(`<td></td>`);
        }
        $tr_new.append(`<td class="table_btn_container"><span title="New" alt="New" class="glyphicon glyphicon-plus cp table_new" GM_setting_key="${key}"></span><span title="Save" alt="Save" style="display:none;" class="glyphicon glyphicon-floppy-disk cp table_new_save" GM_setting_key="${key}"></span></td>`);
        $tr_new.append(`<td class="table_btn_container"><span title="Cancel" alt="Cancel" style="display:none;" class="glyphicon glyphicon-remove cp table_new_cancel" GM_setting_key="${key}"></span></td>`);
        $tbody.append($tr_new);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    var event_ = async function () {
        if (typeof GM.addValueChangeListener === "function") {
            CONSOLE_MSG("설정에 대한 addValueChangeListener 바인드");
            GM.addValueChangeListener(name_, async function (val_name, old_value, new_value, remote) {
                if (remote) {
                    CONSOLE_MSG("다른 창에서 설정 변경됨. val_name, old_value, new_value:", val_name, old_value, new_value);
                    await load_();
                    // old_value: obj,       ekey:키, evalue:값(old 설정값)
                    $.each(old_value, function (ekey, _evalue) {
                        if (_settings[ekey] !== undefined && _settings[ekey].change !== undefined && old_value[ekey] !== new_value[ekey]) {
                            _settings[ekey].change(settings[ekey]);
                        }
                    });
                    changed_key = [];
                    // 설정 변경 시 바뀌는 이벤트들

                    if(latestCreatedLayout !== undefined){
                        createlayout_(latestCreatedLayout);
                        message_(getSystemTextbyLang("setting_changed_from_other_window") + (new Date()).toLocaleTimeString(), $g_elem);
                    }
                }
            });
        }

        $(document).on("input", "input[gm_setting_key='under_dev']", function () {
            CONSOLE_MSG("실험실 기능 온오프 이벤트");
            var $this = $(this);
            if ($this.is(":checked")) {
                $(".GM_setting_under_dev").css("opacity", 0).slideDown("fast").animate({
                    opacity: 1
                }, {
                    queue: false,
                    duration: "fast"
                });
            } else {
                $(".GM_setting_under_dev").css("opacity", 1).slideUp("fast").animate({
                    opacity: 0.0
                }, {
                    queue: false,
                    duration: "fast"
                });
            }
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    var addStyle_ = function () {
        GM.addStyle( /*css*/ `
#GM_setting .btn {font-size:12px;}
.GM_setting_autosaved.btn {
    max-width:100%;
    font-size:12px;
    white-space:pre-wrap;
    user-select:text;
}
#GM_setting .btn-xxs {
    cursor: pointer;
    padding: 4px 4px;
}
#GM_setting label.btn-xxs {
    box-sizing: content-box;
    width:11px;
    height:11px;
}
#GM_setting a{
    color: #428bca;
    text-decoration: none;
}
#GM_setting a:hover, #GM_setting a:focus {
    color: #2a6496;
    text-decoration: underline;
}
#GM_setting {clear:both;margin-left:auto; margin-right:auto; padding:0;max-width:1400px; min-width:750px; box-sizing:content-box;}
#GM_setting, #GM_setting table {font-size:13px;}
#GM_setting_head{margin-left:auto; margin-right:auto; padding:20px 0px 10px 10px;font-size:18px;font-weight:800;max-width:1400px; min-width:750px; box-sizing:content-box;}
#GM_setting li {display:flex;list-style:none;margin:0px;padding:10px;border-top:1px solid #eee;}

#GM_setting .GM_setting_depth1.GM_setting_category {border-top: 2px solid #999;margin-top:30px;padding-top:10px;}
#GM_setting li[GM_setting_key='version_check'] {margin-top:0px !important}

#GM_setting .GM_setting_category_name{display:block;box-sizing:border-box;padding:0 0 0 0px;font-weight:700;vertical-align:top;flex:0 0 100px;}
#GM_setting .GM_setting_category_blank{display:block;box-sizing:border-box;padding:0 0 0 0px;vertical-align:top;flex:0 0 100px;}

#GM_setting .GM_setting_list_head{display:block;box-sizing:border-box;vertical-align:top;flex:1 0 315px;}
#GM_setting .GM_setting_depth1 .GM_setting_list_head {padding-left:10px;}
#GM_setting .GM_setting_depth2 .GM_setting_list_head {padding-left:40px;}
#GM_setting .GM_setting_depth3 .GM_setting_list_head {padding-left:70px;}
#GM_setting .GM_setting_depth4 .GM_setting_list_head {padding-left:100px;}
#GM_setting .GM_setting_depth5 .GM_setting_list_head {padding-left:130px;}

#GM_setting .GM_setting_title{display:block;font-weight:700;}
#GM_setting .GM_setting_desc{display:block;font-size:11px;}

#GM_setting .GM_setting_input_container {display:block;box-sizing:border-box;padding:0 0 0 30px;vertical-align:top;flex:1 1 100%;}
#GM_setting .GM_setting_input_container span{vertical-align:top;}
#GM_setting .GM_setting_input_container span.btn{margin:0 0 0 10px;}
#GM_setting input{display:inline}
#GM_setting input[type="text"]{ width: 100px; height: 30px; padding: 5px 5px; font-size:12px; }
#GM_setting textarea{ width: 250px; height: 30px; padding: 5px 5px; font-size:12px; }
#GM_setting input[type="checkbox"] { display:none; width: 20px;height:20px; padding: 0; margin:0; }
#GM_setting input[type="radio"] {width: 20px;height:20px; padding: 0; margin:0; }

#GM_setting .radio-inline{ padding-left:0; padding-right:10px; }
#GM_setting .radio-inline input{ margin:0 5px 0 0; }

#GM_setting table {margin:0; width:100%;}
#GM_setting th, #GM_setting td {height: 24px;}
#GM_setting table th, #GM_setting table td{padding:2px 5px;}
#GM_setting table th {border: 1px solid; border-color: inherit;}
#GM_setting .table_btn_container {white-space: nowrap; vertical-align:middle; width:24px; font-size:14px; padding:0; text-align:center;}
#GM_setting .table_btn_container span {padding:0}
#GM_setting table input[type="text"] {padding:1px 2px; height:auto; width:100%; margin-left:auto; margin-right:auto;}

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

#GM_setting_footer { padding: 30px 0 30px 0; margin: 30px 0 0 0; border-top: 1px solid #ccc; text-align: center; font-size:13px; letter-spacing:0.2px; }
#GM_setting_footer .footer_divider { margin: 0 5px; display: inline-block; width: 1px; height: 13px; background-color: #ebebeb; }

#GM_setting .cp {cursor:pointer}

#GM_setting .form-group {margin-bottom:0px;}
`);
    };





    /////////////////////////////////////////////////////////////////////////////////////////////////
    var createlayout_ = function (elem) {
        //CONSOLE_MSG("createlayout_");
        $inputs = {};

        var $elem = $(elem);
        $g_elem = $elem;
        if ($elem.find("#GM_setting_container").length !== 0) {
            $elem.empty();
        }
        var $container = $("<div id='GM_setting_container'></div>");
        var $setting_head = $( /*html*/ `
<div id='GM_setting_head'>
<div style='height:25px;display:inline-block;white-space:nowrap'>Settings</div>
<div style='display:flex;height:25px;float:right;'>
    <div id='GM_homepage_link' style='align-self: flex-end;'>
        <a href='${(GM.info.script.homepage)}' target='_blank' style='font-size:12px;font-weight:normal;align-self:flex-end;'>${(GM.info.script.name)} v${(GM.info.script.version)} (${(GM.info.script.homepage)})</a>
    </div>
    <div id='GM_multilang' style='margin-left:15px;'>
        <select id='GM_multilang_select' class="form-control input-sm">
            <option value="ko">한국어</option>
            <option value="en">English</option>
        </select>
    </div>
</div>
</div>`);

        // show homepage link
        if(GM.info !== undefined && GM.info !== null && GM.info.script !== undefined && GM.info.script !== null && GM.info.script.homepage !== undefined && GM.info.script.homepage !== null && GM.info.script.homepage !== ""){
            $setting_head.find("#GM_homepage_link").show();
        }
        else{
            $setting_head.find("#GM_homepage_link").hide();
        }

        // show multilang option combobox
        var $GM_multilang = $setting_head.find("#GM_multilang");
        if(useMultiLang){
            $GM_multilang.show();
            var $GM_multilang_select = $GM_multilang.find("#GM_multilang_select");
            $GM_multilang_select.val(userSelectedLang);
            $GM_multilang_select.on('change', async function (e) {
                var prevUserSelectedLang = userSelectedLang;
                var optionSelected = $("option:selected", this);
                var valueSelected = this.value;
                userSelectedLang = this.value;
                CONSOLE_MSG(`LANG VALUE CHANGED FROM ${prevUserSelectedLang} TO ${userSelectedLang}`);
                await saveLang_();
                changeLang();
            });
        }
        else{
            $GM_multilang.hide();
        }

        var $ul = $("<ul id='GM_setting'></ul>");
        var $prev = undefined;
        $elem.append($container);
        $container.append($setting_head).append($ul);
        for (var key in _settings) {
            var category = _settings[key].category;
            var depth = _settings[key].depth;
            var type = _settings[key].type;
            var title = getTextFromObjectbyLang(_settings[key].title);
            var desc = getTextFromObjectbyLang(_settings[key].desc);
            var category_name = getTextFromObjectbyLang(_settings[key].category_name);
            var radio_enable_value = _settings[key].radio_enable_value;

            var $inputContainer = $("<div class='GM_setting_input_container form-group'></div>");
            var isTextarea = $.inArray(type, ["tag","textarea","object"]) !== -1;
            var $input;

            if (type === "radio") {
                var radioObj = _settings[key].radio;
                $input = $("<div GM_setting_type='radio'></div>");
                for (var radiokey in radioObj) {
                    var $label = $("<label class='radio-inline'>" + getTextFromObjectbyLang(radioObj[radiokey].title) + "</label>");
                    var $temp_input = $("<input name='GM_setting_" + key + "' class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' onfocus='this.blur()' />").attr({
                        "value": radioObj[radiokey].value,
                        "type": (type === "set" ? type === "text" : (type === "tag" ? "textarea" : type)),
                        "GM_setting_type": type,
                        "GM_setting_key": key,
                        "GM_setting_category": (category === undefined ? "default" : category),
                        "GM_setting_radio_enable_value": (radio_enable_value === undefined ? "none" : radio_enable_value)
                    });
                    $temp_input.prependTo($label);
                    $input.append($label);
                }
            }
            else if (type === "combobox"){
                var comboboxObj = _settings[key].options;
                $input = $(`<select name="GM_setting_${key}" class='form-control input-sm select-inline'></select>`).attr({
                    "GM_setting_type": type,
                    "GM_setting_key": key,
                    "GM_setting_category": (category === undefined ? "default" : category),
                    "GM_setting_radio_enable_value": (radio_enable_value === undefined ? "none" : radio_enable_value)
                });
                for (var comboboxKey in comboboxObj) {
                    var $temp_option = $(`<option spellcheck='false' value="${comboboxKey}" onfocus='this.blur()'>${getTextFromObjectbyLang(comboboxObj[comboboxKey].title)}</option>`);
                    $input.append($temp_option);
                }
            }
            else if (type === "table"){
                $input = $(`<table name="GM_setting_${key}" class="table table-bordered table-striped table-hover"><thead><tr></tr></thead><tbody></tbody></table>`).attr({
                    "GM_setting_type": type,
                    "GM_setting_key": key,
                    "GM_setting_category": (category === undefined ? "default" : category),
                    "GM_setting_radio_enable_value": (radio_enable_value === undefined ? "none" : radio_enable_value)
                });
                var $theadtr = $input.find("thead tr");
                $theadtr.append(`<th>#</th>`);
                for(var i=0;i<_settings[key].head.length;i++){
                    $theadtr.append(`<th>${_settings[key].head[i]}</th>`);
                }
                $theadtr.append(`<th class="table_btn_container"> </th>`);
                $theadtr.append(`<th class="table_btn_container"> </th>`);
            }
            else {
                $input = $(`<${(isTextarea ? "textarea " : "input ")} class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' ${(type === "checkbox" ? "onfocus='this.blur()'" : "")}${(isTextarea ? "></textarea>" : " />")}`)
                    .attr({
                        "type": (type === "set" ? type === "text" : (type === "tag" ? "textarea" : type)),
                        "GM_setting_type": type,
                        "GM_setting_key": key,
                        "GM_setting_category": (category === undefined ? "default" : category),
                        "GM_setting_radio_enable_value": (radio_enable_value === undefined ? "none" : radio_enable_value)
                    });
            }

            var $category;
            if (category_name !== undefined) {
                $category = $(`<div class='GM_setting_category_name'>${category_name}</div>`);
            } else {
                $category = $("<div class='GM_setting_category_blank'></div>");
            }

            var $head = $("<div class='GM_setting_list_head'></div>");
            var $title = $(`<span class='GM_setting_title'>${title}</span>`);
            var $desc = $(`<span class='GM_setting_desc'>${desc}</span>`);
            var $li = $(`<li ${(_settings[key].radio_enable_value !== undefined ? " GM_setting_radio_enable_value='"+_settings[key].radio_enable_value+"'" : "")}
                GM_setting_key='${key}'
                GM_setting_depth='${depth}'
                class='${(_settings[key].under_dev ? "GM_setting_under_dev " : "")} ${(category_name !== undefined && $prev !== undefined && category !== $prev.category ? "GM_setting_category " : "")} GM_setting_depth${depth}'
                style='${(_settings[key].under_dev && !settings.under_dev ? "display:none;opacity:0" : "")}'></li>`);
            $ul.append($li);
            $head.append($title).append($desc);

            if (type === "checkbox") {
                var $label_container = $(`<label class="btn btn-default btn-xxs"><span class="glyphicon glyphicon-ok"></span></label>`);
                $label_container.prepend($input).appendTo($inputContainer);

                $input.on("change", function () {
                    if ($(this).is(":checked")) {
                        $(this).closest("label").addClass("active");
                    } else {
                        $(this).closest("label").removeClass("active");
                    }

                    if ($(this).is(":disabled")) {
                        $(this).closest("label").addClass("disable").prop("disabled", true);
                    } else {
                        $(this).closest("label").removeClass("disable").prop("disabled", false);
                    }
                });
            } else {
                $inputContainer.append($input);
            }

            $li.append($category).append($head).append($inputContainer);
            $inputs[key] = $input;

            if (_settings[key].append !== undefined) {
                $inputContainer.append(_settings[key].append);
            }

            // 디버그 설정 숨기기
            // if( (!nomo_global.DEBUG && _settings[key].disable) || (_settings[key].under_dev) ){    // if( (!nomo_global.DEBUG && _settings[key].disable) || (!ADD_config.under_dev && _settings[key].under_dev) ){
            //     CONSOLE_MSG("숨김", key);
            //     $li.css("display","none");
            // }

            $prev = _settings[key];
        }

        write_();
        usageCheck_($elem);

        // 설정 on-off 이벤트
        $elem.find("input[type='checkbox']").on("click", function () {
            usageCheck_($elem);
        });

        $elem.find("input[type='radio']").on("click", function () {
            usageCheck_($elem);
        });
        
        // Table 관련 이벤트
        $container.on("click", ".table_modify", function(e){
            CONSOLE_MSG("clicked table_modify btn");
            var $e = $(e.target);
            var $tbody = $e.closest("tbody");
            var $tr = $e.closest("tr");
            $tbody.find(".table_modify").hide();
            $tbody.find(".table_delete").hide();
            $tbody.find(".table_new").hide();
            $tbody.find(".table_save").hide();
            $tbody.find(".table_cancel").hide();
            $tr.find(".table_save").show();
            $tr.find(".table_cancel").show();
            var $tds = $tr.find("td");
            for(var i=0;i<$tds.length - 2;i++){
                if(i==0) continue;
                var $td = $($tds[i]);
                var text = $td.text();
                $td.html(`<input type="text" value="${text}" orivalue="${text}"></input>`);
            }
        });

        $container.on("click", ".table_save", async function(e){
            CONSOLE_MSG("clicked table_save btn");
            var $e = $(e.target);
            var $tr = $e.closest("tr");
            var $tdinputs = $tr.find("input");
            var index = Number($tr.find("td").first().text()) - 1;
            var key = $e.attr("GM_setting_key");
            console.log($tdinputs);
            for(var i=0;i<$tdinputs.length;i++){
                settings[key][index][i] = $($tdinputs[i]).val();
            }
            await save_();
            message_(getSystemTextbyLang("auto_saved") + (new Date()).toLocaleTimeString(), $g_elem);
            
            // createlayout_($g_elem);
            var $tbody = $e.closest("tbody");
            var val = settings[key];
            reCreateTable_($tbody, key, val);
        });

        $container.on("click", ".table_cancel", function(e){
            CONSOLE_MSG("clicked table_cancel btn");
            var $e = $(e.target);
            //createlayout_($g_elem);

            var key = $e.attr("GM_setting_key");
            var $tbody = $e.closest("tbody");
            var val = settings[key];
            reCreateTable_($tbody, key, val);
        });

        $container.on("click", ".table_delete", async function(e){
            CONSOLE_MSG("clicked table_delete btn");
            var $e = $(e.target);
            var confirm_res = confirm("Delete?");
            if(!confirm_res) return;
            var $tr = $e.closest("tr");
            var index = Number($tr.find("td").first().text()) - 1;
            $tr.remove();

            var key = $e.attr("GM_setting_key");
            settings[key].splice(index, 1);
            await save_();

            //createlayout_($g_elem);
            var $tbody = $e.closest("tbody");
            var val = settings[key];
            reCreateTable_($tbody, key, val);
            message_(getSystemTextbyLang("auto_saved") + (new Date()).toLocaleTimeString(), $g_elem);
        });

        $container.on("click", ".table_new", function(e){
            CONSOLE_MSG("clicked table_new btn");
            var $e = $(e.target);
            var $tbody = $e.closest("tbody");
            $tbody.find(".table_modify").hide();
            $tbody.find(".table_delete").hide();
            $tbody.find(".table_new").hide();
            $tbody.find(".table_new_save").show();
            $tbody.find(".table_new_cancel").show();

            var $tr = $e.closest("tr");
            var $tds = $tr.find("td");
            for(var i=0;i<$tds.length - 2;i++){
                if(i==0) continue;
                var $td = $($tds[i]);
                $td.html(`<input type="text" value=""></input>`);
            }
        });
        
        $container.on("click", ".table_new_save", async function(e){
            CONSOLE_MSG("clicked table_new_save btn");
            var $e = $(e.target);
            var $tr = $e.closest("tr");
            var $tdinputs = $tr.find("input");
            var temp = [];
            for(var i=0;i<$tdinputs.length;i++){
                temp.push($($tdinputs[i]).val());
            }
            var key = $e.attr("GM_setting_key");
            settings[key].push(temp);
            await save_();
            message_(getSystemTextbyLang("auto_saved") + (new Date()).toLocaleTimeString(), $g_elem);

            //createlayout_($g_elem);
            var $tbody = $e.closest("tbody");
            var val = settings[key];
            reCreateTable_($tbody, key, val);

        });

        
        $container.on("click", ".table_new_cancel", function(e){
            CONSOLE_MSG("clicked table_new_cancel btn");
            //createlayout_($g_elem);
            var key = $(e.target).attr("GM_setting_key");
            var $tbody = $(e.target).closest("tbody");
            var val = settings[key];
            reCreateTable_($tbody, key, val);
        });

        // 자동 저장 이벤트
        $container.find("select").on("change", function(){
            CONSOLE_MSG("GM_setting - select change");
            validateAndSave_($(this), $elem, $inputs);
        });
        $container.find("input, textarea").on("input", function () { // "input[type='text']"  input propertychange
            CONSOLE_MSG("GM_setting - text change");
            validateAndSave_($(this), $elem, $inputs);
        });

        // 리셋 버튼 추가
        $ul.append( /*html*/ `<li class="GM_setting_category GM_setting_depth1">
            <div class="GM_setting_category_name">${getSystemTextbyLang("title_reset")}</div>
            <div class="GM_setting_list_head">
                <span class="GM_setting_title">
                    <span class="GM_setting_reset btn btn-primary" style="margin-left:0;">${getSystemTextbyLang("button_reset_settings")}</span>
                    <!--<span class="GM_setting_reset_all btn btn-primary">${"button_reset_settings_all"}</span>-->
                </span>
                <span class="GM_setting_desc"></span>
            </div>
            <div class="GM_setting_input_container form-group">
            </div>
        </li>`);
        $ul.find(".GM_setting_reset").on("click", async function () {
            var conf = confirm(getSystemTextbyLang("confirm_reset_settings"));
            if (conf) {
                await GM_setting.reset();
                GM_setting.createlayout($g_elem);
                message_(getSystemTextbyLang("complete_reset_settings") + (new Date()).toLocaleTimeString(), $g_elem);
            }
        });
        $ul.find(".GM_setting_reset_all").on("click", async function () {
            var conf = confirm(getSystemTextbyLang("confirm_reset_settings_all"));
            if (conf) {
                var listValues = await GM.listValues();
                for (var key = 0; key < listValues.length; key++) {
                    var key_str = listValues[key];
                    await GM.deleteValue(key_str);
                }
                await GM_setting.reset();
                GM_setting.createlayout($g_elem);
                message_(getSystemTextbyLang("complete_reset_settings_all") + (new Date()).toLocaleTimeString(), $g_elem);
            }
        });

        // 후원 버튼 추가
        $ul.append( /*html*/ `<li class="GM_setting_category GM_setting_depth1">
        <div class="GM_setting_category_name">${getSystemTextbyLang("donate")}</div>
        <div class="GM_setting_list_head">
            <span class="GM_setting_title">
                ${getSystemTextbyLang("buymeacoffee")}
            </span>
            <span class="GM_setting_desc">
                ${getSystemTextbyLang("buymeacoffeeDesc")}
            </span>
        </div>
        <div class="GM_setting_input_container form-group">
        <a href="https://www.buymeacoffee.com/nomomo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="41" width="174"></a>
        </div>
        </li>
        <li class="GM_setting_depth1">
        <div class="GM_setting_category_blank"></div>
            <div class="GM_setting_list_head">
                <span class="GM_setting_title">
                    ${getSystemTextbyLang("toonation")}
                </span>
                <span class="GM_setting_desc"></span>
            </div>
            <div class="GM_setting_input_container form-group">
            <a href="https://toon.at/donate/636947867320352181" target="_blank"><img src="https://raw.githubusercontent.com/nomomo/Addostream/master/assets/toonation_b11.gif" height="41" alt="Donate with Toonation" /></a>
            </div>
        </li>
    `);
        // footer 추가
        $ul.after(/*html*/`
        <div id="GM_setting_footer">
            <a href="${(GM.info.script.homepage)}" target="_blank">${(GM.info.script.name)}</a> v${(GM.info.script.version)}
            <div class="footer_divider"></div> GM Setting v${version}
            <div class="footer_divider"></div> ©2017-${(new Date()).getFullYear()} <a href="https://nomo.asia/" target="_blank">NOMO</a></div>
        `);
    };
    var timeoutId_ = undefined;
    var message_ = function (msg, $elem) {
        if ($elem === undefined) {
            return;
        }
        var prefix = "GM_setting_autosaved";
        $elem.find("." + prefix).animate({
            bottom: "+=40px"
        }, {
            duration: 300,
            queue: false
        }); // cleqrQueue().dequeue().finish().stop("true","true")
        // @keyframes glow {to {text-shadow: 0 0 10px white;box-shadow: 0 0 10px #5cb85c;}}
        $("<div style='animation: glow .5s 10 alternate; position:fixed; left:10px; bottom:20px; z-index:10000000;' class='" + prefix + " btn btn-success'>" + msg + "</div>")
            .appendTo($elem)
            .fadeIn("fast")
            .animate({
                opacity: 1
            }, 6000, function () {
                $(this).fadeOut("fast").delay(600).remove();
            })
            .animate({
                left: "+=30px"
            }, {
                duration: 300,
                queue: false
            });
    };
    var read_ = async function () {
        CONSOLE_MSG("read_");
        for (var key in $inputs) {
            if(_settings[key].autosavepass && settings[key] !== undefined || settings[key].type === "table"){
                continue;
            }

            var $input = $inputs[key];
            var val = getInputValue_($input);

            if (_settings[key].type === "tag") {
                val = val.split(","); // val = val.replace(/\s/g,"").split(",");
                if (val.length === 1 && val[0] === "") {
                    val = [];
                }
                $.each(val, function (index, value) {
                    val[index] = value.replace(/^\s*|\s*$/g, "");
                });
            }

            // 이전 설정과 변경된 값 키 체크
            if (settings[key] !== val && changed_key.indexOf(key) === -1) {
                changed_key.push(key);
            }
            settings[key] = val;
        }
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////



    /////////////////////////////////////////////////////////////////////////////////////////////////
    var write_ = async function () {
        CONSOLE_MSG("write_");
        for (var key in $inputs) {
            var $input = $inputs[key];
            writeInputValue_($input, settings[key]);
        }
    };
    
    /////////////////////////////////////////////////////////////////////////////////////////////////
    var getInputValue_ = function ($input) {
        var val;
        switch ($input.attr("GM_setting_type")) {
        case "checkbox":
            val = $input.prop("checked");
            break;
        case "set": // 현재 text 와 동일
            val = $input.val();
            break;
        case "text":
            val = $input.val();
            break;
        case "tag": // 현재 textarea 와 동일
            val = $input.val();
            break;
        case "object": // 현재 textarea 와 동일
            val = JSON.parse($input.val());
            break;
        case "textarea":
            val = $input.val();
            break;
        case "radio":
            val = $input.find("input:checked").val();
            break;
        case "combobox":
            val = $input.find('option:selected').val();
            break;
        case "table":
            var $tbody = $input.find("tbody");
            val = [];
            var $trs = $tbody.find("tr");
            for(var i=0; i<$trs.length - 1;i++){    // 마지막 라인은 new 에 대한 것이므로 읽지 않음
                val.push([]);
                var $tr = $($trs[i]);
                var $tds = $tr.find("td");
                for(var j=0; j<$tds.length - 2;j++){
                    if(j===0) continue; // index
                    var text = $($tds[j]).text();
                    val[i][j-1] = text;
                }
            }
            break;
        default:
            //CONSOLE_MSG($input);
            val = undefined;
            break;
        }
        return val;
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    var writeInputValue_ = function ($input, val) {
        switch ($input.attr("GM_setting_type")) {
        case "checkbox":
            $input.prop("checked", val).trigger("change");
            break;
        case "set": // 현재 text 와 동일
            $input.val(val);
            break;
        case "text":
            $input.val(val);
            break;
        case "tag": // 현재 textarea 와 동일
            $input.val(val);
            $input.height("auto");
            $input.height(String(Number($input.prop("scrollHeight")) + 0) + "px");
            break;
        case "object": // 현재 textarea 와 동일
            $input.val(JSON.stringify(val));
            $input.height("auto");
            $input.height(String(Number($input.prop("scrollHeight")) + 0) + "px");
            break;
        case "textarea":
            $input.val(val);
            $input.height("auto");
            $input.height(String(Number($input.prop("scrollHeight")) + 0) + "px");
            break;
        case "radio":
            $input.find("input[value=" + val + "]").prop("checked", true);
            break;
        case "combobox":
            $input.find("option[value=" + val + "]").prop("selected", true);
            break;
        case "table":
            var $tbody = $input.find("tbody");
            var key = $input.attr("GM_setting_key");
            $tbody.empty();
            for(var i=0;i<val.length;i++){
                var $tr = $(`<tr></tr>`);
                for(var j=0;j<val[i].length;j++){
                    if(j==0){
                        $tr.append(`<td>${i+1}</td>`);
                    }
                    $tr.append(`<td>${val[i][j]}</td>`);
                }
                $tr.append(`<td class="table_btn_container"><span title="Modify" alt="Modify" class="glyphicon glyphicon-pencil cp table_modify" GM_setting_key="${key}"></span><span title="Save" alt="Save" style="display:none;" class="glyphicon glyphicon-floppy-disk cp table_save" GM_setting_key="${key}"></span></td>`);
                $tr.append(`<td class="table_btn_container"><span title="Delete" alt="Delete" class="glyphicon glyphicon-trash cp table_delete" GM_setting_key="${key}"></span><span title="Cancel" alt="Cancel" style="display:none;" class="glyphicon glyphicon-remove cp table_cancel" GM_setting_key="${key}"></span></td>`);
                $tbody.append($tr);
            }
            var $tr_new = $(`<tr></tr>`);
            for(var k=0;k<_settings[key].head.length;k++){   // index
                if(k==0){
                    $tr_new.append(`<td></td>`);
                }
                $tr_new.append(`<td></td>`);
            }
            $tr_new.append(`<td class="table_btn_container"><span title="New" alt="New" class="glyphicon glyphicon-plus cp table_new" GM_setting_key="${key}"></span><span title="Save" alt="Save" style="display:none;" class="glyphicon glyphicon-floppy-disk cp table_new_save" GM_setting_key="${key}"></span></td>`);
            $tr_new.append(`<td class="table_btn_container"><span title="Cancel" alt="Cancel" style="display:none;" class="glyphicon glyphicon-remove cp table_new_cancel" GM_setting_key="${key}"></span></td>`);
            $tbody.append($tr_new);
            break;
        default:
            break;
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    var usageCheck_ = async function ($elem) {
        // 일단 다 켠다.
        var $lis = $elem.find("li");
        $lis.removeClass("GM_setting_item_disable");
        $lis.find("input, textarea, select").prop("disabled", false);
        $lis.find("input[type='checkbox']").trigger("change");

        var enable = [true, true];
        var $prev, prevTopRadioVal, prevTopRadioDepth = 1000;
        for (var i = 0; i < $lis.length; i++) {
            var $curr = $($lis[i]);
            var curr_depth = $curr.attr("GM_setting_depth");
            var curr_key = $curr.attr("GM_setting_key");
            var curr_radio_enable_value = $curr.attr("GM_setting_radio_enable_value");
            var curr_type = $curr.find("[gm_setting_type]").attr("gm_setting_type");

            if (i == 0){
                //
            }
            else {
                $prev = $($lis[i - 1]);
                var prev_depth = $prev.attr("GM_setting_depth");
                if(prevTopRadioDepth >= curr_depth){
                    prevTopRadioVal = undefined;
                    prevTopRadioDepth = 1000;
                }

                if (prev_depth == curr_depth && prev_depth > 0){
                    if(prevTopRadioVal !== undefined){
                        if(prevTopRadioVal == curr_radio_enable_value){
                            enable[prev_depth-1] = true;
                        }
                        else{
                            enable[prev_depth-1] = false;
                        }
                    }
                }
                else if (prev_depth < curr_depth) {
                    prevTopRadioVal = undefined;
                    var $prev_checkbox = $prev.find("input[type='checkbox']");
                    var $prev_radio = $prev.find("input[type='radio']");
                    var $prev_combobox = $prev.find("select");
                    // 이전 요소가 체크박스이고, 켜져있으면 현재 요소도 켠다.
                    if ($prev_checkbox.length !== 0 && $prev_checkbox.is(":checked")) {
                        enable[prev_depth] = true;
                    }
                    // 이전 요소가 라디오
                    else if($prev_radio.length !== 0){
                        prevTopRadioVal = $prev.find("input[type='radio']:checked").val();
                        prevTopRadioDepth = prev_depth;
                        //curr_radio_enable_value ||
                        if($prev.find("input[type='radio']:checked").val() == curr_radio_enable_value){
                            enable[prev_depth] = true;
                        }
                        else{
                            enable[prev_depth] = false;
                        }
                    }
                    // 이전 요소가 combobox 이면 일단 전부 켠다.
                    else if($prev_combobox.length !== 0){
                        enable[prev_depth] = true;
                    }
                    else {
                        enable[prev_depth] = false;
                    }

                    // 이전 요소가 체크박스가 아니면 그냥 켠다.
                    // if($prev_checkbox.length !== 0){
                    //     enable[prev_depth] = true;
                    // }
                }
            }

            for (var e = 0; e < curr_depth; e++) {
                if (_settings[curr_key].disable || !enable[e]) {
                    $curr.addClass("GM_setting_item_disable");
                    $curr.find("input, textarea, select").prop("disabled", true);
                    $curr.find("input[type='checkbox']").trigger("change");
                    break;
                }
            }
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // validation
    var validation_ = function (key, val) {
        var val_array;
        var duplicate;
        var sorted_array;
        var regex_array_string = /^[A-Za-z0-9 _,]*$/;
        //var regex_number = /^[0-9]*$/;
        var valid = true;
        var message = "";

        // 숫자의 경우
        if (_settings[key].valid === "number") {
            valid = $.isNumeric(val);
            if (val === "") {
                // "반드시 값이 입력되어야 합니다."
                message += getSystemTextbyLang("err_val_req");
            } else if (!valid) {
                // "숫자만 입력 가능합니다."
                message += getSystemTextbyLang("err_num_req");
            } else {
                if (_settings[key].min_value !== undefined && _settings[key].min_value > val) {
                    valid = false;
                    // "입력 값은 다음 값 이상의 숫자이어야 합니다. : "
                    message += getSystemTextbyLang("err_num_over") + _settings[key].min_value;
                } else if (_settings[key].max_value !== undefined && _settings[key].max_value < val) {
                    valid = false;
                    // "입력 값은 다음 값 이하의 숫자이어야 합니다. : "
                    message += getSystemTextbyLang("err_num_not_more_than") + _settings[key].max_value;
                }
            }
        }
        // array_string - ID 태그
        else if (val !== "" && _settings[key].valid === "array_string") {
            val_array = $.map(val.split(","), $.trim);
            var match = val.match(regex_array_string);
            //CONSOLE_MSG(match);
            if (match === null || match.length === 0) {
                valid = false;
                // "영문, 숫자, 콤마(,), 언더바(_) 만 입력 가능합니다."
                message += getSystemTextbyLang("err_valid_array_string");
            } else if ($.inArray("", val_array) !== -1) {
                valid = false;
                // "공백 값 등 값이 존재하지 않는 항목이 존재합니다."
                message += getSystemTextbyLang("err_value_empty");
                CONSOLE_MSG(val_array, $.inArray("", val_array));
            } else if ((new Set(val_array)).size !== val_array.length) {
                valid = false;
                duplicate = [];
                sorted_array = val_array.sort();
                for (var i = 0; i < val_array.length - 1; i++) {
                    if (sorted_array[i + 1] == sorted_array[i] && $.inArray(sorted_array[i], duplicate) === -1) {
                        duplicate.push(sorted_array[i]);
                    }
                }
                // "중복된 값이 존재합니다: "
                message += getSystemTextbyLang("err_value_dup") + duplicate.join(",");
            } else {
                for (var j = 0; j < val_array.length; j++) {
                    //CONSOLE_MSG(val_array, val_array[j].indexOf(" "));
                    if (val_array[j].indexOf(" ") !== -1) {
                        valid = false;
                        // "문자열 내 공백이 존재하는 항목이 있습니다: "
                        message += getSystemTextbyLang("err_value_blank") + val_array[j];
                        break;
                    }
                }
            }
        }
        // array_word - 금지단어
        else if (val !== "" && _settings[key].valid === "array_word") {
            val_array = $.map(val.split(","), $.trim);
            if ($.inArray("", val_array) !== -1) {
                valid = false;
                // "공백 값 등 값이 존재하지 않는 항목이 존재합니다."
                message += getSystemTextbyLang("err_value_empty");
                CONSOLE_MSG(val_array, $.inArray("", val_array));
            } else if ((new Set(val_array)).size !== val_array.length) {
                valid = false;
                duplicate = [];
                sorted_array = val_array.sort();
                for (var k = 0; k < val_array.length - 1; k++) {
                    if (sorted_array[k + 1] == sorted_array[k] && $.inArray(sorted_array[k], duplicate) === -1) {
                        duplicate.push(sorted_array[k]);
                    }
                }
                // "중복된 값이 존재합니다: "
                message += getSystemTextbyLang("err_value_dup") + duplicate.join(",");
            }
        }

        var return_obj = {
            valid: valid,
            message: message
        };
        return return_obj;
    };

    //////////////////////
    // validate and save
    var validateAndSave_ = function($this, $elem, $inputs){
        var val = getInputValue_($this);
        var this_key = $this.attr("GM_setting_key");
        var validation = validation_(this_key, val);
        $this.closest("div").find(".invalid_text").remove();
        if (validation.valid) {
            $this.closest("div").removeClass("invalid");
        } else {
            CONSOLE_MSG("validation", validation);
            $this.closest("div").addClass("invalid");
            $this.after("<div class='invalid_text'>" + validation.message + "</div>");
        }

        clearTimeout(timeoutId_);
        timeoutId_ = setTimeout(function () {
            // 저장 시도
            // 정상적으로 값이 체크 된 경우
            var g_validation = true;
            $.each($inputs, function (ekey, evalue) {
                var temp = validation_(ekey, getInputValue_(evalue));
                if (!temp.valid) {
                    g_validation = false;
                    return false;
                }
            });
            if (g_validation) {
                read_();
                save_();
                message_(getSystemTextbyLang("auto_saved") + (new Date()).toLocaleTimeString(), $elem);
            }
        }, 1000);
    };

    ///////////////////////
    // check if there are same keys in object
    var hasSameKey_ = function (a, b) {
        var aKeys = Object.keys(a).sort();
        var bKeys = Object.keys(b).sort();
        return JSON.stringify(aKeys) === JSON.stringify(bKeys);
    };


    //
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // public interface
    /////////////////////////////////////////////////////////////////////////////////////////////////
    return {
        init: async function (name, user_settings) {
            name_ = name;
            await init_(user_settings);
            await event_();
            addStyle_();
        },
        load: async function () {
            CONSOLE_MSG("GM_setting - load");
            await load_();
            //return settings;
        },
        save: async function () {
            CONSOLE_MSG("GM_setting - save");
            await save_();
        },
        save_overwrite: async function () {
            // old_value: obj,       ekey:키, evalue:값(old 설정값)
            var old_value = settings;
            var new_value = global[name_];
            CONSOLE_MSG("_settings", _settings);
            $.each(old_value, function (ekey, _evalue) {
                if (_settings[ekey] !== undefined && _settings[ekey].change !== undefined && old_value[ekey] !== new_value[ekey]) {
                    _settings[ekey].change(new_value[ekey]);
                }
            });
            settings = global[name_];
            CONSOLE_MSG("GM_setting - save_overwrite");
            await save_();
        },
        // update: async function (key, value) {
        //     settings[key] = global[name_][key]
        // },
        reset: async function () {
            await GM.setValue(name_, settings_init);
            await load_();
        },
        createlayout: function (elem) {
            latestCreatedLayout = elem;
            createlayout_(elem);
        },
        getType: function (key) {
            if (_settings[key] !== undefined) {
                return _settings[key].type;
            } else {
                return undefined;
            }
        },
        message: function (msg, $elem) {
            message_(msg, $elem);
        }
    };
})(jQuery, window, document);







export {GM_setting};