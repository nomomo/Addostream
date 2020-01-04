import nomo_const from "../general/const.js";
import * as nomo_common from "../general/common.js";

export function filter_obj_by_arr(obj, arr){
    var return_arr = [];
    for(var i=0; i<arr.length; i++){
        if(arr[i] in obj){
            return_arr.push(obj[arr[i]]);
        }
    }
    return return_arr;
}

export function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function IsJsonStringReturn(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return str;
    }
    return JSON.parse(str);
}

export async function ADD_DEBUG(/**/){
    if(await nomo_common.isDebug()){
        var args = arguments,
            args_length = args.length,
            args_copy = args;
        for (var i=args_length;i>0;i--){
            args[i] = args_copy[i-1];
        }
        args[0] = "+["+nomo_const.urlCheckerText[nomo_common.ADD_get_page_type()]+"]  ";
        args.length = args_length + 1;
        console.log.apply(console, args);
    }
}

export function deepCopy(obj){
    //return Object.assign({}, obj);
    //jQuery.extend({}, obj);
    return JSON.parse(JSON.stringify(obj));
}

export function resetAtMidnight(callback) {
    var now = new Date();
    var night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // the next day, ...
        0, 0, 0 // ...at 00:00:00 hours
    );
    var msToMidnight = night.getTime() - now.getTime();

    setTimeout(async function() {
        callback();           //      <-- This is the function being called at midnight.
        resetAtMidnight();    //      Then, reset again next midnight.
    }, msToMidnight);
}



//////////////////////////////////////////////////////////////////////////////////
// 현재 시간 리턴용
export function leadingZeros(n, digits){
    var zero = "";
    n = n.toString();

    if (n.length < digits){
        for (var i = 0; i < digits - n.length; i++)
            zero += "0";
    }
    return zero + n;
}

export function getTimeStamp(flag){
    var d = new Date();

    var s = "" +
    leadingZeros(d.getFullYear(), 4) +
    leadingZeros(d.getMonth() + 1, 2) +
    leadingZeros(d.getDate(), 2) +
    leadingZeros(d.getHours(), 2);

    if(flag === "m" || flag === "s"){
        s += leadingZeros(d.getMinutes(), 2);
    }

    if(flag === "s"){
        s += leadingZeros(d.getSeconds(), 2);
    }

    return s;
}

export function getTimeStampWithText(d, flag){
    if($.type(d) !== "date"){
        ADD_DEBUG("date가 아니다");
        return "";
    }

    var s = "" +
    d.getFullYear() + "년 " +
    (d.getMonth() + 1) + "월 " +
    d.getDate() + "일 " +
    d.getHours() + "시 ";

    if(flag === "m" || flag === "s"){
        s += d.getMinutes() + "분 ";
    }

    if(flag === "s"){
        s += d.getSeconds() + "초";
    }

    return s;
}

export function getTimeStampWithDash(d, flag){
    if($.type(d) !== "date"){
        return "";
    }

    var s = "" +
    d.getFullYear() + "/" +
    (d.getMonth() + 1) + "/" +
    d.getDate() + " " +
    d.getHours() + "";

    if(flag === "m" || flag === "s"){
        s += ":" + leadingZeros(d.getMinutes(), 2);
    }

    if(flag === "s"){
        s += ":" + leadingZeros(d.getSeconds(), 2);
    }

    return s;
}

//지나간 초를 ~초전, ~분전 등으로 나타내기
export function transferTime(pastms){
    var pastSecond = parseInt((pastms)/1000,10);

    var date;
    var hour;
    var min;
    var str = "";

    var restSecond = 0;
    if(pastSecond > 86400){
        date = parseInt(pastSecond / 86400,10);
        restSecond = pastSecond % 86400;
        str = date + "일 ";
        if(restSecond > 3600){
            hour = parseInt(restSecond / 3600,10);
            restSecond = restSecond % 3600;
            str = str + hour + "시간 전";
            // if(restSecond > 60){
            //     min = parseInt(restSecond / 60,10);
            //     restSecond = restSecond % 60;
            //     str = str + min + "분 " + restSecond + "초 전";
            // }else{
            //     str = str + restSecond + "초 전";
            // }
        }
        else if(restSecond > 60){
            min = parseInt(restSecond / 60,10);
            restSecond = restSecond % 60;
            str = str + min + "분 전";// + restSecond + "초 전";
        }else{
            str = str + restSecond + "초 전";
        }
    }else if(pastSecond > 3600){
        hour = parseInt(pastSecond / 3600,10);
        restSecond = pastSecond % 3600;
        str = str + hour + "시간 ";
        if(restSecond > 60){
            min = parseInt(restSecond / 60,10);
            restSecond = restSecond % 60;
            str = str + min + "분 전";// + restSecond + "초 전";
        }
        else{
            str = str + restSecond + "초 전";
        }
    }else if(pastSecond > 60){
        min = parseInt(pastSecond / 60,10);
        restSecond = pastSecond % 60;
        str = str + min + "분 " + restSecond + "초 전";
    }else{
        str = pastSecond + "초 전";
    }

    return str;
}

// url 로부터 ? 뒤의 & 로 구분된 변수들 읽어오기
export function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// 유사도 계산 (dice coefficient)
export function diceCoefficient(l, r){
    if (l.length < 2 || r.length < 2) return 0;
  
    let lBigrams = new Map();
    for (let i = 0; i < l.length - 1; i++) {
        const bigram = l.substr(i, 2);
        const count = lBigrams.has(bigram)
            ? lBigrams.get(bigram) + 1
            : 1;
  
        lBigrams.set(bigram, count);
    }
  
    let intersectionSize = 0;
    for (let i = 0; i < r.length - 1; i++) {
        const bigram = r.substr(i, 2);
        const count = lBigrams.has(bigram)
            ? lBigrams.get(bigram)
            : 0;
  
        if (count > 0) {
            lBigrams.set(bigram, count - 1);
            intersectionSize++;
        }
    }
  
    return (2.0 * intersectionSize) / (l.length + r.length - 2);
}

export var Colors = {
    names: {
        orange:"#FF4500",brownishorange:"#DAA520",darkgreen:"#008000",blue:"#0000FF",blueviolet:"#8a2be2",brown:"#a52a2a",cadetblue:"#5f9ea0",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",crimson:"#dc143c",darkblue:"#00008b",darkgoldenrod:"#b8860b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",forestgreen:"#228b22",grey:"#808080",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",lightcoral:"#f08080",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightslategrey:"#778899",limegreen:"#32cd32",magenta:"magenta",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",navy:"#000080",olive:"olive",olivedrab:"#6b8e23",orangered:"#ff4500",orchid:"#da70d6",pink:"#FF69B4",purple:"purple",red:"#FF0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",seagreen:"#2e8b57",sienna:"#a0522d",slateblue:"#6a5acd",slategrey:"#708090",steelblue:"#4682b4",tan:"#d2b48c",tomato:"#ff6347",violet:"#ee82ee",
    },
    random: function(str) {
        if(str === undefined){
            var result;
            var count = 0;
            for (var prop in this.names){
                if (Math.random() < 1/++count){
                    result = prop;
                }
            }
            return { name: result, rgb: this.names[result]};
        }
        else{
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
                hash = hash & hash;
            }
            var hashkeys = Object.keys(this.names);
            hash = ((hash % hashkeys.length) + hashkeys.length) % hashkeys.length;
            var hashkey = hashkeys[hash];
            return { name: hashkey, rgb: this.names[hashkey] };
        }
    }
};