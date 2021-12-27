import {ADD_DEBUG} from "libs/nomo-utils.js";
import {ADD_multitwitch_layout} from "general/multitwitch.js";
import {ADD_parse_list_data} from "general/list.js";
import { twitch_api } from "general/twitch";

var newdsStream = function(){
    this.reload = function(){
        ADD_parse_list_data(0);
        ADD_multitwitch_layout();
    };
    $(".loader_container").stop().fadeIn(200).fadeOut(200);
};

var newdostream = function(q){
    q = q.split("/");
    switch(q[1]){
    case "stream":
        $("header").addClass("onstream");
        $("#stream").addClass("onstream");
        $(".footer").hide();
        if(ADD_config.popup_player && $(".stream_zoomout").length !== 0 && q[3] === nomo_global.ADD_now_playing.id){
            ADD_DEBUG("stream_zoomout 복구", $(".stream_zoomout"));
            $("#stream").remove();
            $(".stream_zoomout").attr("style","").removeClass("stream_zoomout").attr("id","stream").addClass("onstream");
            $(".stream_zoomin_screen").remove();
        }
        else{
            ADD_DEBUG("스트림 생성");
            page = "stream";
            $("#stream").load("/stream.php", {"from":q[2], "chan":q[3]});
        }
        break;
    default:
        $.ajax({
            url: "/main2.php",
            dataType: "html",
            success: function(data) {
                $("#stream").html(data);
                $("header").removeClass("onstream");
                $("#stream").removeClass("onstream");
                $(".footer").show();
                page = new newdsStream();
                page.reload();
            },
            error: function(){
                ADD_DEBUG("/main2.php 로드 중 에러 발생");
                if(nomo_global.dostream_fix){
                    $.ajax({
                        url: "/index.php",
                        dataType: "html",
                        success: function(data) {
                            ADD_DEBUG("/index.php 에서 내용 가져오기");
                            var $tempdata = $(data);
                            var $tempstream = $tempdata.find("#stream");
                            $("header").removeClass("onstream");
                            $("#stream").removeClass("onstream");
                            $(".footer").show();
                            $("#stream").html($tempstream);
                            page = new newdsStream();
                            page.reload();
                        }
                    });
                }
            }
        });
        break;
    }
};

export {newdsStream, newdostream};