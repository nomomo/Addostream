import {ADD_DEBUG, IsJsonStringReturn} from "libs/nomo-utils.js";

export default async function(){    
    var mig = await GM.getValue("mig",{"190912":true, "190225_json":true});
    if(!mig["190912"]){
        ADD_DEBUG("Migration 시작 - 190912", mig["190912"]);
        var conf = await GM.getValue("ADD_config");
        ADD_DEBUG("OLD VAR:", conf.insagirl_select);
        if(conf !== undefined){
            conf.insagirl_select = 2;
            await GM.setValue("ADD_config", conf);
        }
        ADD_DEBUG("NEW VAR:", conf.insagirl_select);

        mig["190912"] = true;
        await GM.setValue("mig",mig);
    }

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
}