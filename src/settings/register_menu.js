export default (function(){
    if(typeof GM.registerMenuCommand === "function"){
        GM.registerMenuCommand("상세 설정 열기", function(){
            var ww = $(window).width(),
                wh = $(window).height();
            var wn = (ww > 850 ? 850 : ww/5*4);
            var left  = (ww/2)-(wn/2),
                top = (wh/2)-(wh/5*4/2);
            window.open("http://www.dostream.com/addostream/","winname",
                "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width="+wn+",height="+wh/5*4+",top="+top+",left="+left);
        });
        // GM.registerMenuCommand("버그 제보", function(){
        //     window.open("https://github.com/nomomo/Addostream/issues", "_blank");
        // });
    }
})();