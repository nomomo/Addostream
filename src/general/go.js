import {ADD_DEBUG} from "libs/nomo-utils.js";
var keys = {};

export function easy_go(){
    // keyboard shortcuts
    $(document).keydown(function (e) {
        keys[e.which] = true;

        var obj_keys = Object.keys(keys);
        if(obj_keys.length === 2 && $.inArray("18", obj_keys) !== -1 && $.inArray("71", obj_keys) !== -1){
            ADD_DEBUG("ALT+G");
        }
    });

    $(document).keyup(function (e) {
        delete keys[e.which];
    });
}