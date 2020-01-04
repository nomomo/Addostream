import {ADD_DEBUG} from "libs/nomo-utils.js";

export function point_clicker(){
    ADD_DEBUG("[TPAC] point_clicker");
    window.$container = undefined;
    $(document).arrive(".community-points-summary", {
        existing: true
    }, function(elem){
        window.$container = $(elem);
        ADD_DEBUG("[TPAC] container found", window.$container);
        window.$container.unbindArrive(".tw-interactive");
        window.$container.arrive(".tw-interactive", function(but){
            var $but = $(but);
            if(!$but.hasClass("TPAC")){
                ADD_DEBUG("[TPAC]", "but found", $but);
                $but.trigger("click");
            }
            $but.addClass("TPAC");
        });
    });
}