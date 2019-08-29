import nomo_const from "general/const.js";
import {ADD_DEBUG} from "libs/nomo-utils.js";
import {newdsStream} from "general/unsafewindow.js";
import {ADD_multitwitch_layout} from "general/multitwitch.js";

export const ADD_get_page_type = function (){
    var document_url = document.location.href;
    document_url = document_url.toLowerCase();
    var keyword_stream = document_url.indexOf("#/stream/");
    var keyword_uchat = document_url.indexOf("uchat2.php");
    var keyword_setting = document_url.indexOf("#/addostream");
    var keyword_setting_nw = document_url.indexOf("dostream.com/addostream");
    var insagirl = document_url.indexOf("insagirl-toto.appspot.com/hrm/");
    if(keyword_uchat !== -1){
        return nomo_const.C_UCHAT;
    }
    else if(keyword_stream !== -1){
        return nomo_const.C_STREAM;
    }
    else if(keyword_setting !== -1){
        return nomo_const.C_SETTING;
    }
    else if(keyword_setting_nw !== -1){
        return nomo_const.C_SETTING_NW;
    }
    else if(insagirl !== -1){
        return nomo_const.C_INSAGIRL;
    }
    else{
        return nomo_const.C_MAIN;
    }
};

export function ADD_get_page_type_str(){
    return nomo_const.urlCheckerText[ADD_get_page_type()];
}

export const nomo = {
    getVal: async function(key, init){
        return await GM.getValue(key, init);
    },
    setVal: async function(key, value){
        await GM.setValue(key, value);//JSON.stringify(value));
    }
};

export const isDebug = async function(){
    return await nomo.getVal("ADD_DEBUG_MODE", false);
};

const READ_ONLY = true;
export async function GM_cache(name, time_ms, readonly){
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
export async function GM_cache_read(name, time_ms){
    return await GM_cache(name, time_ms, READ_ONLY);
}
export async function GM_cache_write(name){
    ADD_DEBUG(name, "작성됨");
    var currentDate = Number(new Date());
    await GM.setValue(name, currentDate);
}

export function reloadMain(){
    if(nomo_global.PAGE === nomo_const.C_MAIN){
        ADD_DEBUG("reloadMain");
        if(typeof newdsStream === "function"){
        //if((web_browser === "firefox") && (typeof exportFunction === "function")){
            window.page = new newdsStream();
        }
        else{
            ADD_DEBUG("!!!!!!!!!! dsStream 실행됨");
            window.page = new dsStream();
        }
        window.page.reload();
        ADD_multitwitch_layout();
    }
}