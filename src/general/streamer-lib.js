import {ADD_DEBUG} from "libs/nomo-utils.js";
import broadcaster from "json/broadcaster.json";

var streamer_chzzk = {};
var streamer_twitch = {};
var streamer_aftv = {};
var streamer_youtube = {};

function init_streamer_data()
{
    // preprocessing
    for(const idx in broadcaster.data){
        let item = broadcaster.data[idx];
        if (!item.m || item.m == "y"){
            //ADD_DEBUG("m is not defined", item);
            continue;
        }
        
        // regex 생성
        let tmpary = item.nn;
        //console.log(item);
    
        if(item.dn.length !== 1 || (item.dn.length === 1 && ADD_config.chat_autoKeyword_1char)){
            tmpary.push(item.dn);
        }
        if(item.sn && (ADD_config.chat_autoKeyword_1char || item.sn == "던")){
            tmpary.push(item.sn);
        }
    
        if(tmpary.length === 0){
            ADD_DEBUG("tmpary length is 0", item);
            continue;
        }
    
        var tempstr = "";
        if(ADD_config.chat_autoKeyword_startwith){
            tempstr = `^(${tmpary.join("|")})`;
        }
        else{
            tempstr = `(${tmpary.join("|")})`;
        }
        item.regex = new RegExp(tempstr, "i");
        
        if(item["m"] === "t" && item["tc"]) {
            item.p = "twitch";
            if(!item.tc){
                ADD_DEBUG("error tw type in streamer-lib.js", item);
                continue;
            }
            streamer_twitch[item.tc] = item;
        }

        else if(item["m"] === "c" && item["cc"]) {
            item.p = "chzzk";
            if(!item.cc){
                ADD_DEBUG("error cc type in streamer-lib.js", item);
                continue;
            }
            streamer_chzzk[item.cc] = item;
        }

        else if(item["m"] === "a" && item["ac"]) {
            item.p = "afreeca";
            if(!item.ac){
                ADD_DEBUG("error ac type in streamer-lib.js", item);
                continue;
            }
            streamer_aftv[item.ac] = item;
        }

        else if(item["m"] === "y" && item["yc"]) {
            item.p = "youtube";
            if(!item.yc){
                ADD_DEBUG("error yc type in streamer-lib.js", item);
                continue;
            }
            streamer_youtube[item.yc] = item;
        }
    }
}

function streamer_search_keyword(keyword, start){
    if(!start){
        start = 0;
    }
    let found = null;
    for(let i=start; i<broadcaster.data.length; ++i){
        let item = broadcaster.data[i];

        if(!item.m || item.m == "y" || !item.regex){
            continue;
        }

        var match = keyword.match(item.regex);
        if(match !== null && item[item.m + "c"]){
            found = item;
            found["c"] = found[item.m + "c"];
            break;
        }
    }

    return found;
}

function streamer_replace_keyword_link(text, start){
    let found = false;
    if(!start){
        start = 0;
    }
    for(let i=start; i<broadcaster.data.length; ++i){
        let item = broadcaster.data[i];

        if(!item.m || item.m == "y" || !item.regex){
            continue;
        }

        var match = text.match(item.regex);
        if(match !== null){
            found = true;
            let disp_name = match[0];
            let code = item[item.m + "c"];
            ADD_DEBUG(match, code);
            text = text.split(disp_name).join(`<a href='https://www.dostream.com/#/stream/${item.p}/${code}' class='${item.p} topClick${ADD_config.chat_autoKeyword_emstyle ? " autokeyword" : ""}'>${disp_name}</a>`);   // replaceAll
            break;
        }
    }

    return [found, text];
}

function streamer_search_dispname(id, platform){
    let disp = id;
    try{
        switch(platform){
            case "twitch":
                if(streamer_twitch[id]){
                    disp = streamer_twitch[id].dn
                }
                break;

            case "chzzk":
                if(streamer_chzzk[id]){
                    disp = streamer_chzzk[id].dn;
                }
                break;

            case "afreeca":
                ADD_DEBUG("id", id, streamer_aftv[id]);
                if(streamer_aftv[id]){
                    disp = streamer_aftv[id].dn;
                }
                break;

            case "youtube":
                if(streamer_youtube[id]){
                    disp = streamer_chzzk[id].dn;
                }
                break;

            default:
                if(streamer_chzzk[id]){
                    disp = streamer_chzzk[id].dn;
                }
                else if(streamer_aftv[id]){
                    disp = streamer_aftv[id].dn;
                }
                else if(streamer_youtube[id]){
                    disp = streamer_youtube[id].dn;
                }
                else if (streamer_twitch[id]){
                    disp = streamer_twitch[id].dn
                }
                break;
        }
    }
    catch(e)
    {
        ADD_DEBUG("error from streamer_search_dispname", e, id, platform);
    }
    return disp;
}

export {init_streamer_data, streamer_search_keyword, streamer_search_dispname, streamer_replace_keyword_link};