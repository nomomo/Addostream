import {ADD_DEBUG, IsJsonStringReturn} from "libs/nomo-utils.js";

export default async function(){    
    var mig = await GM.getValue("mig",{"190225_json":true});
    // 190225 - json
    if(!mig["190225_json"]){
        ADD_DEBUG("Migration 시작 - 190225_json", mig["190225_json"]);
        var i;
        var listValues = await GM.listValues();
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
    
    // // GM.cookie 지원 여부에 따라 옵션 on-off 를 결정함
    // if(!mig["240106_GM_cookie"]){
    //     ADD_DEBUG("Migration 시작 - 240106_GM_cookie", mig["240106_GM_cookie"]);
        
    //     let conf = await GM.getValue("ADD_config");
    //     ADD_DEBUG("OLD VAR:", conf.chzzk_sign_in_iframe);
    //     if(GM.cookie){
    //         conf.chzzk_sign_in_iframe = true;
    //     }
    //     else{
    //         conf.chzzk_sign_in_iframe = false;
    //     }
    //     await GM.setValue("ADD_config", conf);
    //     ADD_DEBUG("NEW VAR:", conf.chzzk_sign_in_iframe);

    //     mig["240106_GM_cookie"] = true;
    //     await GM.setValue("mig",mig);
    // }
}