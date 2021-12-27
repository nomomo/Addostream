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


function makeHangul(nCho, nJung, nJong) {
    return String.fromCharCode(0xac00 + nCho * 21 * 28 + nJung * 28 + nJong + 1);
}

export function engTypeToKor(src) {
    var ENG_KEY = "rRseEfaqQtTdwWczxvgkoiOjpuPhynbml";
    var KOR_KEY = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ";
    var CHO_DATA = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
    var JUNG_DATA = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
    var JONG_DATA = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

    var res = "";
    if (src.length == 0)
        return res;

    var nCho = -1,
        nJung = -1,
        nJong = -1; // 초성, 중성, 종성

    for (var i = 0; i < src.length; i++) {
        var ch = src.charAt(i);
        var p = ENG_KEY.indexOf(ch);
        if (p == -1) { // 영자판이 아님
            // 남아있는 한글이 있으면 처리
            if (nCho != -1) {
                if (nJung != -1) // 초성+중성+(종성)
                    res += makeHangul(nCho, nJung, nJong);
                else // 초성만
                    res += CHO_DATA.charAt(nCho);
            } else {
                if (nJung != -1) // 중성만
                    res += JUNG_DATA.charAt(nJung);
                else if (nJong != -1) // 복자음
                    res += JONG_DATA.charAt(nJong);
            }
            nCho = -1;
            nJung = -1;
            nJong = -1;
            res += ch;
        } else if (p < 19) { // 자음
            if (nJung != -1) {
                if (nCho == -1) { // 중성만 입력됨, 초성으로
                    res += JUNG_DATA.charAt(nJung);
                    nJung = -1;
                    nCho = CHO_DATA.indexOf(KOR_KEY.charAt(p));
                } else { // 종성이다
                    if (nJong == -1) { // 종성 입력 중
                        nJong = JONG_DATA.indexOf(KOR_KEY.charAt(p));
                        if (nJong == -1) { // 종성이 아니라 초성이다
                            res += makeHangul(nCho, nJung, nJong);
                            nCho = CHO_DATA.indexOf(KOR_KEY.charAt(p));
                            nJung = -1;
                        }
                    } else if (nJong == 0 && p == 9) { // ㄳ
                        nJong = 2;
                    } else if (nJong == 3 && p == 12) { // ㄵ
                        nJong = 4;
                    } else if (nJong == 3 && p == 18) { // ㄶ
                        nJong = 5;
                    } else if (nJong == 7 && p == 0) { // ㄺ
                        nJong = 8;
                    } else if (nJong == 7 && p == 6) { // ㄻ
                        nJong = 9;
                    } else if (nJong == 7 && p == 7) { // ㄼ
                        nJong = 10;
                    } else if (nJong == 7 && p == 9) { // ㄽ
                        nJong = 11;
                    } else if (nJong == 7 && p == 16) { // ㄾ
                        nJong = 12;
                    } else if (nJong == 7 && p == 17) { // ㄿ
                        nJong = 13;
                    } else if (nJong == 7 && p == 18) { // ㅀ
                        nJong = 14;
                    } else if (nJong == 16 && p == 9) { // ㅄ
                        nJong = 17;
                    } else { // 종성 입력 끝, 초성으로
                        res += makeHangul(nCho, nJung, nJong);
                        nCho = CHO_DATA.indexOf(KOR_KEY.charAt(p));
                        nJung = -1;
                        nJong = -1;
                    }
                }
            } else { // 초성 또는 (단/복)자음이다
                if (nCho == -1) { // 초성 입력 시작
                    if (nJong != -1) { // 복자음 후 초성
                        res += JONG_DATA.charAt(nJong);
                        nJong = -1;
                    }
                    nCho = CHO_DATA.indexOf(KOR_KEY.charAt(p));
                } else if (nCho == 0 && p == 9) { // ㄳ
                    nCho = -1;
                    nJong = 2;
                } else if (nCho == 2 && p == 12) { // ㄵ
                    nCho = -1;
                    nJong = 4;
                } else if (nCho == 2 && p == 18) { // ㄶ
                    nCho = -1;
                    nJong = 5;
                } else if (nCho == 5 && p == 0) { // ㄺ
                    nCho = -1;
                    nJong = 8;
                } else if (nCho == 5 && p == 6) { // ㄻ
                    nCho = -1;
                    nJong = 9;
                } else if (nCho == 5 && p == 7) { // ㄼ
                    nCho = -1;
                    nJong = 10;
                } else if (nCho == 5 && p == 9) { // ㄽ
                    nCho = -1;
                    nJong = 11;
                } else if (nCho == 5 && p == 16) { // ㄾ
                    nCho = -1;
                    nJong = 12;
                } else if (nCho == 5 && p == 17) { // ㄿ
                    nCho = -1;
                    nJong = 13;
                } else if (nCho == 5 && p == 18) { // ㅀ
                    nCho = -1;
                    nJong = 14;
                } else if (nCho == 7 && p == 9) { // ㅄ
                    nCho = -1;
                    nJong = 17;
                } else { // 단자음을 연타
                    res += CHO_DATA.charAt(nCho);
                    nCho = CHO_DATA.indexOf(KOR_KEY.charAt(p));
                }
            }
        } else { // 모음
            if (nJong != -1) { // (앞글자 종성), 초성+중성
                // 복자음 다시 분해
                var newCho; // (임시용) 초성
                if (nJong == 2) { // ㄱ, ㅅ
                    nJong = 0;
                    newCho = 9;
                } else if (nJong == 4) { // ㄴ, ㅈ
                    nJong = 3;
                    newCho = 12;
                } else if (nJong == 5) { // ㄴ, ㅎ
                    nJong = 3;
                    newCho = 18;
                } else if (nJong == 8) { // ㄹ, ㄱ
                    nJong = 7;
                    newCho = 0;
                } else if (nJong == 9) { // ㄹ, ㅁ
                    nJong = 7;
                    newCho = 6;
                } else if (nJong == 10) { // ㄹ, ㅂ
                    nJong = 7;
                    newCho = 7;
                } else if (nJong == 11) { // ㄹ, ㅅ
                    nJong = 7;
                    newCho = 9;
                } else if (nJong == 12) { // ㄹ, ㅌ
                    nJong = 7;
                    newCho = 16;
                } else if (nJong == 13) { // ㄹ, ㅍ
                    nJong = 7;
                    newCho = 17;
                } else if (nJong == 14) { // ㄹ, ㅎ
                    nJong = 7;
                    newCho = 18;
                } else if (nJong == 17) { // ㅂ, ㅅ
                    nJong = 16;
                    newCho = 9;
                } else { // 복자음 아님
                    newCho = CHO_DATA.indexOf(JONG_DATA.charAt(nJong));
                    nJong = -1;
                }
                if (nCho != -1) // 앞글자가 초성+중성+(종성)
                    res += makeHangul(nCho, nJung, nJong);
                else // 복자음만 있음
                    res += JONG_DATA.charAt(nJong);

                nCho = newCho;
                nJung = -1;
                nJong = -1;
            }
            if (nJung == -1) { // 중성 입력 중
                nJung = JUNG_DATA.indexOf(KOR_KEY.charAt(p));
            } else if (nJung == 8 && p == 19) { // ㅘ
                nJung = 9;
            } else if (nJung == 8 && p == 20) { // ㅙ
                nJung = 10;
            } else if (nJung == 8 && p == 32) { // ㅚ
                nJung = 11;
            } else if (nJung == 13 && p == 23) { // ㅝ
                nJung = 14;
            } else if (nJung == 13 && p == 24) { // ㅞ
                nJung = 15;
            } else if (nJung == 13 && p == 32) { // ㅟ
                nJung = 16;
            } else if (nJung == 18 && p == 32) { // ㅢ
                nJung = 19;
            } else { // 조합 안되는 모음 입력
                if (nCho != -1) { // 초성+중성 후 중성
                    res += makeHangul(nCho, nJung, nJong);
                    nCho = -1;
                } else // 중성 후 중성
                    res += JUNG_DATA.charAt(nJung);
                nJung = -1;
                res += KOR_KEY.charAt(p);
            }
        }
    }

    // 마지막 한글이 있으면 처리
    if (nCho != -1) {
        if (nJung != -1) // 초성+중성+(종성)
            res += makeHangul(nCho, nJung, nJong);
        else // 초성만
            res += CHO_DATA.charAt(nCho);
    } else {
        if (nJung != -1) // 중성만
            res += JUNG_DATA.charAt(nJung);
        else { // 복자음
            if (nJong != -1)
                res += JONG_DATA.charAt(nJong);
        }
    }

    return res;
}