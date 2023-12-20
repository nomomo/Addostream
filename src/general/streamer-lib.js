import {ADD_DEBUG} from "libs/nomo-utils.js";
import broadcaster from "json/broadcaster.json";

var streamerArray = [],
    streamerArray_name = [],
    streamerArray_display_name = [],
    streamerArray_AutoComplete = [],
    streamerArray_regex = [];

var bt = broadcaster.data.twitch;

for(const property in bt){
    let item = bt[property];
    streamerArray.push([]);
    var sal = streamerArray.length - 1;

    streamerArray[sal].push(property.toLowerCase());
    streamerArray[sal].push(item.dn);
    
    streamerArray_name.push(property);
    streamerArray_display_name.push(item.dn);
    streamerArray_AutoComplete.push(`${item.dn} (${property})`);

    if(item.nn !== undefined && $.isArray(item.nn)){
        streamerArray[sal] = streamerArray[sal].concat(item.nn);
    }
    if(item.sn !== undefined && $.isArray(item.sn)){
        streamerArray[sal] = streamerArray[sal].concat(item.sn);
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

// var getStreamerIDFromNick = function(nick){
//     var temp_nick = nick.toLowerCase().replace(/(^\s|\s$)/g,"");
//     for(var i=0; i<streamerArray.length; i++){
//         for(var j=0; j<streamerArray[i].length; ++j){
//             if(temp_nick == streamerArray[i][j]){
//                 return streamerArray_name[i];
//             }
//         }
//     }
//     return null;
// };

var getStreamerIdAndDisplayNameFromNick = function(nick){
    var temp_nick = nick.toLowerCase().replace(/(^\s|\s$)/g,"");
    for(var i=0; i<streamerArray.length; i++){
        for(var j=0; j<streamerArray[i].length; ++j){
            if(temp_nick == streamerArray[i][j]){
                return { id: streamerArray_name[i], display_name: streamerArray_display_name[i]};
            }
        }
    }
    return { id: null, display_name: null};
};

// export {streamerArray, ADD_streamer_nick, streamerArray_name, streamerArray_display_name, streamerArray_AutoComplete, streamerArray_regex, getStreamerIDFromNick, getStreamerIdAndDisplayNameFromNick};
export {broadcaster, streamerArray, ADD_streamer_nick, streamerArray_name, streamerArray_display_name, streamerArray_AutoComplete, streamerArray_regex, getStreamerIdAndDisplayNameFromNick};