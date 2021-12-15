import {ADD_DEBUG} from "libs/nomo-utils.js";
import broadcaster from "json/broadcaster.json";

var streamerArray = [],
    streamerArray_name = [],
    streamerArray_display_name = [],
    streamerArray_AutoComplete = [],
    streamerArray_regex = [];

var bt = broadcaster.data.twitch;

for(const property in bt){
    streamerArray.push([]);
    var sal = streamerArray.length - 1;

    streamerArray[sal].push(property.toLowerCase());
    streamerArray[sal].push(bt[property].dn);
    
    streamerArray_name.push(property);
    streamerArray_display_name.push(bt[property].dn);
    streamerArray_AutoComplete.push(`${bt[property].dn} (${property})`);

    if(bt[property].nn !== undefined && $.isArray(bt[property].nn)){
        streamerArray[sal] = streamerArray[sal].concat(bt[property].nn);
    }
    if(bt[property].sn !== undefined && $.isArray(bt[property].sn)){
        streamerArray[sal] = streamerArray[sal].concat(bt[property].sn);
    }

    // regex 생성
    var tempstr = `^(${streamerArray[sal].join("|")})`;
    streamerArray_regex.push(new RegExp(tempstr, "i"));
}

var ADD_streamer_nick = function(id){
    var temp_id = id.toLowerCase();
    if(streamerArray_name !== [] || streamerArray_display_name !== []){
        var id_index = $.inArray(temp_id, streamerArray_name);
        if (id_index !== -1){
            return streamerArray_display_name[id_index];
        } else {
            return id;
        }
    } else {
        ADD_DEBUG("ADD_streamer_nick 함수에서 id 리턴중 null");
    }
};

export {streamerArray, ADD_streamer_nick, streamerArray_name, streamerArray_display_name, streamerArray_AutoComplete, streamerArray_regex};