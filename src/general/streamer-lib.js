import {ADD_DEBUG} from "libs/nomo-utils.js";
import broadcaster from "json/broadcaster.json";

var streamerArray = [],
    streamerArray_name = [],
    streamerArray_display_name = [],
    streamerArray_AutoComplete = [];

for(const property in broadcaster.data){
    streamerArray.push([]);
    var sal = streamerArray.length - 1;

    streamerArray[sal].push(property.toLowerCase());
    streamerArray[sal].push(broadcaster.data[property].dn);
    
    streamerArray_name.push(property);
    streamerArray_display_name.push(broadcaster.data[property].dn);
    streamerArray_AutoComplete.push(`${broadcaster.data[property].dn} (${property})`);

    if(broadcaster.data[property].nn !== undefined && $.isArray(broadcaster.data[property].nn)){
        streamerArray[sal] = streamerArray[sal].concat(broadcaster.data[property].nn);
    }
    if(broadcaster.data[property].sn !== undefined && $.isArray(broadcaster.data[property].sn)){
        streamerArray[sal] = streamerArray[sal].concat(broadcaster.data[property].sn);
    }
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

export {streamerArray, ADD_streamer_nick, streamerArray_name, streamerArray_display_name, streamerArray_AutoComplete};