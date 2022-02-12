import { nomo } from "general/common";
import nomo_const from "general/const.js";
import * as nomo_common from "general/common.js";
import {ADD_DEBUG} from "libs/nomo-utils.js";
import {ADD_send_sys_msg_from_main_frame} from "chat/send_message.js";

var client_id = nomo_const.ADD_CLIENT_ID_TWITCH;
var redirect_url = "https://www.dostream.com/addostream/twitch/auth/";
var getTwitchOAutu_url = `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_url)}&response_type=token`;
var isCooltime = false;

async function saveTwitchOAuth(token){
    if(token !== undefined && token !== ""){
        nomo_global.TwitchOAuthToken = token;
        await nomo_common.nomo.setVal("TwitchOAuthToken", token);
        ADD_DEBUG("saveTwitchOAuth saved", token);
    }
    else{
        ADD_DEBUG("saveTwitchOAuth failed", token);
    }
}

async function loadTwitchOAuth(){
    var token = await nomo_common.nomo.getVal("TwitchOAuthToken", undefined);
    if(token === undefined || token === null || token === ""){
        token = undefined;
    }
    ADD_DEBUG("loadTwitchOAuth load", token);
    return token;
}

async function TwitchHelixAPI(target){
    if(!nomo_global.TwitchOAuthToken){
        ADD_DEBUG("TwitchHelixAPI - token undefined", nomo_global.TwitchOAuthToken);
        return {"data":{}, "status":401, "ok":false, "error":"Unauthorized", "message":"Invalid OAuth token"};
    }

    var response = await fetch(
        'https://api.twitch.tv/helix/'+target,
        {
            "headers": {
                "Client-ID": client_id,
                "Authorization": "Bearer " + nomo_global.TwitchOAuthToken
            }
        }
    );
    try{
        if(response.ststus == 401){
            saveTwitchOAuth(undefined);
        }
    }
    catch(e){
        ADD_DEBUG("Helix 401 체크 중 error", e);
    }
    return {data:await response.json(), ok:response.ok, status:response.status};
}

async function checkTwitchOAuth(){
    ADD_DEBUG("run checkTwitchOAuth", client_id, nomo_global.TwitchOAuthToken);
    $("#checkTwitchOAuthResultsContainer").show();
    var response = await fetch(
        'https://api.twitch.tv/helix/users?login=hanryang1125',
        {
            "headers": {
                "Client-ID": client_id,
                "Authorization": "Bearer " + nomo_global.TwitchOAuthToken
            }
        }
    );
    var parsedData = await response.json();
    ADD_DEBUG(response);
    if(response.status == 401){
        document.getElementById('checkTwitchOAuthResults').innerHTML = `<p>- <span style="color:red">Twitch API 호출에 실패했습니다.</span> Twitch 계정을 Dostream+ 와 연결하지 않았거나, 유효하지 않은 OAuth token 을 사용하였습니다. Token 갱신이 필요합니다. 이미 Twitch 계정을 Dostream+ 와 연결한 경우, Twitch 와 Dostream+ 연동 하기 버튼을 클릭하여 토큰 갱신을 시도하십시오.<br />- Error:${JSON.stringify(parsedData)}</p>`;
    }
    else if(response.status == 429){
        document.getElementById('checkTwitchOAuthResults').innerHTML = `<p>- <span style="color:red">Twitch API 호출에 실패했습니다.</span> 짧은 기간동안 너무 많은 API 요청이 이루어진 것 같습니다. 잠시 후 다시 시도해보십시오.<br />- Error:${JSON.stringify(parsedData)}</p>`;
    }
    else {
        try{
            document.getElementById('checkTwitchOAuthResults').innerHTML = '<p>- Hanryang1125\'s Twitch Profile from Helix API:</p>';
            var table = document.createElement('table');
            document.getElementById('checkTwitchOAuthResults').append(table);
            for (var key in parsedData.data[0]) {
                var tr = document.createElement('tr');
                table.append(tr);
                var td = document.createElement('td');
                td.textContent = key;
                tr.append(td);
                td = document.createElement('td');
                td.textContent = parsedData.data[0][key];
                tr.append(td);
            }
            document.getElementById('checkTwitchOAuthResultsContainer').append('\n정보가 정상적으로 표시되었다면 연동에 성공한 것입니다. 이 창을 닫아도 됩니다.');
        }
        catch(err){
            document.getElementById('checkTwitchOAuthResults').textContent = '알 수 없는 이유로 인하여 실패했습니다. Error:'+err;
        }
    }
    return (response.status == 200 ? true : false);
}

async function createTwitchOAuthLayout($elem){
    ADD_DEBUG("run createTwitchOAuthLayout. saved token: ", nomo_global.TwitchOAuthToken);

    GM.addStyle(/*css*/`
        .twitchAuthLayoutContainer {max-width:800px;margin:0 auto; padding-bottom:30px; letter-spacing:-0.5px; font-size:16px;line-height:160%;}
        #checkTwitchOAuthResultsContainer {}
        #checkTwitchOAuthResults { margin:5px 0px 5px 15px; padding-left:15px; border-left:3px solid #eee;}
        #checkTwitchOAuthResults, #checkTwitchOAuthResults table { font-size:16px; }
        .twitchAuthLayoutContainer h1 {font-size:32px;margin:30px 0;}
        .twitchAuthLayoutContainer .btn {margin:20px 0; display:block; font-size:16px;}
        .twitchAuthLayoutContainer a:hover, .twitchAuthLayoutContainer a:visited, .twitchAuthLayoutContainer a:focus {text-decoration:none;}
        .btn-twitch {background-color:#6441A4; color:#fff;}
        .btn-twitch:hover, .btn-twitch:focus {background-color:#52318e;}
        .twitchAuthLayoutContainer .footer {margin-top:0px;text-align:center;}
    `);

    var $layout = $(/*html*/`
    <div class="twitchAuthLayoutContainer">
        <a href="https://www.dostream.com/addostream/twitch/auth/"><h1>Dostream+ Twitch 계정 연결 안내 페이지</h1></a>
        <span><a href="https://blog.twitch.tv/en/2021/07/15/legacy-twitch-api-v5-shutdown-details-and-timeline/" target="_blank">Twitch 정책 변경</a>으로 인하여, Dostream+ 의 <span style="text-decoration:underline;">메인에 스트리머 추가</span> 기능과 <span style="text-decoration:underline;">트위치 클립 섬네일 미리보기</span> 기능을 사용하려면 Twitch 계정과 Dostream+ 을 연동해야 합니다. 해당 기능을 사용하기 위해 Twitch 계정과 Dostream+ 를 연동하려면 아래의 <span style="background-color:#6441A4; color:#fff;">Twitch 와 Dostream+ 연동 하기</span>을 클릭하세요.
        <br /><br />
        Twitch 계정이 없거나, Dostream+ 에 연동하기 찝찝하다면 연동하지 않아도 됩니다. 이 때 <span style="text-decoration:underline;">메인에 스트리머 추가</span> 기능이 켜져있는 경우 매 접속 시 안내 메시지를 채팅에 1회 출력하므로, 이것이 거슬린다면 설정에서 해당 기능을 끄세요. 트위치 클립 섬네일 기능의 경우 연동하지 않으면 섬네일이 검정 이미지로 표시됩니다.</span>
        <br /><br />
        <a href="${getTwitchOAutu_url}" target="_self"><span class="btn btn-lg btn-primary btn-twitch">Twitch 와 Dostream+ 연동 하기</span></a>
        <span id="checkTwitchOAuth" class="btn btn-lg btn-primary">현재 인증 여부 확인</span></a>
        <div id="checkTwitchOAuthResultsContainer" style="display:none;">
            Twitch 계정과 Dostream+ 가 정상적으로 연결된 경우, Twitch API 로부터 가져온 풍월량의 Twitch Profile 정보가 아래에 표시될 것입니다.
            <div id="checkTwitchOAuthResults"></div>
        </div>
        <a href="https://www.twitch.tv/settings/connections" target="_blank"><span class="btn btn-lg btn-primary">연결 끊으러 가기 (https://www.twitch.tv/settings/connections)</span></a>
    </div>
    `);
    $layout.find("#checkTwitchOAuth").on("click", function(){
        checkTwitchOAuth();
    });
    $elem.append($layout);

    var parsedHash = new URLSearchParams(window.location.hash.substr(1));
    //var matched = document.location.href.match(/access_token=([a-zA-Z0-9-_]+)/)
    if (parsedHash.get('access_token')) {
        var access_token = parsedHash.get('access_token');
        ADD_DEBUG("GOT access_token", access_token);
        await saveTwitchOAuth(access_token);
        if(checkTwitchOAuth()){
            $(".twitchAuthLayoutContainer").empty().append(`<div style="padding:30px;text-align:center;font-size:18px;">Twitch 계정과 Dostream+ 의 연동이 완료되었습니다.
            <br />${window.opener ? "3초 후 자동으로 창이 닫힙니다." : "이 창을 닫아도 됩니다."}<br /><br /><span style="font-size:14px;letter-spacing:0.5px;">Token : ${access_token}</span></div>`);
            if(window.opener){
                setTimeout(function(){
                    window.close();
                },3000);
            }
        }
    }
    // else if(matched !== null){
    //     var access_token = matched[1];
    //     ADD_DEBUG("GOT access_token", access_token);
    //     await saveTwitchOAuth(access_token);
    // }
}

export {TwitchHelixAPI, createTwitchOAuthLayout, loadTwitchOAuth, saveTwitchOAuth};