//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                External Library
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/*eslint-disable*/
/*! jquery browser | http://jquery.thewikies.com/browser/  MIT */
(function($){$.browserTest=function(a,z){var u="unknown",x="X",m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version="2.0";}if(r.name==="presto"){r.version=($.browser.version>9.27)?"futhark":"linear_b";}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+"").substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,""],["Chrome Safari","Chrome"],["KHTML","Konqueror"],["Minefield","Firefox"],["Navigator","Netscape"]]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[["konqueror","khtml"],["msie","trident"],["opera","presto"]],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace("sunos","solaris")};if(!z){$("html").addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(" "));}};$.browserTest(navigator.userAgent);})(jQuery);
var web_browser = $.browser.name;

/* arrive.js
    * v2.4.1
    * https://github.com/uzairfarooq/arrive
    * MIT licensed
    * Copyright (c) 2014-2017 Uzair Farooq
    */
var Arrive=function(e,t,n){"use strict";function r(e,t,n){l.addMethod(t,n,e.unbindEvent),l.addMethod(t,n,e.unbindEventWithSelectorOrCallback),l.addMethod(t,n,e.unbindEventWithSelectorAndCallback);}function i(e){e.arrive=f.bindEvent,r(f,e,"unbindArrive"),e.leave=d.bindEvent,r(d,e,"unbindLeave");}if(e.MutationObserver&&"undefined"!=typeof HTMLElement){var o=0,l=function(){var t=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;return{matchesSelector:function(e,n){return e instanceof HTMLElement&&t.call(e,n);},addMethod:function(e,t,r){var i=e[t];e[t]=function(){return r.length==arguments.length?r.apply(this,arguments):"function"==typeof i?i.apply(this,arguments):n;};},callCallbacks:function(e,t){t&&t.options.onceOnly&&1==t.firedElems.length&&(e=[e[0]]);for(var n,r=0;n=e[r];r++)n&&n.callback&&n.callback.call(n.elem,n.elem);t&&t.options.onceOnly&&1==t.firedElems.length&&t.me.unbindEventWithSelectorAndCallback.call(t.target,t.selector,t.callback);},checkChildNodesRecursively:function(e,t,n,r){for(var i,o=0;i=e[o];o++)n(i,t,r)&&r.push({callback:t.callback,elem:i}),i.childNodes.length>0&&l.checkChildNodesRecursively(i.childNodes,t,n,r);},mergeArrays:function(e,t){var n,r={};for(n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);for(n in t)t.hasOwnProperty(n)&&(r[n]=t[n]);return r;},toElementsArray:function(t){return n===t||"number"==typeof t.length&&t!==e||(t=[t]),t;}};}(),c=function(){var e=function(){this._eventsBucket=[],this._beforeAdding=null,this._beforeRemoving=null;};return e.prototype.addEvent=function(e,t,n,r){var i={target:e,selector:t,options:n,callback:r,firedElems:[]};return this._beforeAdding&&this._beforeAdding(i),this._eventsBucket.push(i),i;},e.prototype.removeEvent=function(e){for(var t,n=this._eventsBucket.length-1;t=this._eventsBucket[n];n--)if(e(t)){this._beforeRemoving&&this._beforeRemoving(t);var r=this._eventsBucket.splice(n,1);r&&r.length&&(r[0].callback=null);}},e.prototype.beforeAdding=function(e){this._beforeAdding=e;},e.prototype.beforeRemoving=function(e){this._beforeRemoving=e;},e;}(),a=function(t,r){var i=new c,o=this,a={fireOnAttributesModification:!1};return i.beforeAdding(function(n){var i,l=n.target;(l===e.document||l===e)&&(l=document.getElementsByTagName("html")[0]),i=new MutationObserver(function(e){r.call(this,e,n);});var c=t(n.options);i.observe(l,c),n.observer=i,n.me=o;}),i.beforeRemoving(function(e){e.observer.disconnect();}),this.bindEvent=function(e,t,n){t=l.mergeArrays(a,t);for(var r=l.toElementsArray(this),o=0;o<r.length;o++)i.addEvent(r[o],e,t,n);},this.unbindEvent=function(){var e=l.toElementsArray(this);i.removeEvent(function(t){for(var r=0;r<e.length;r++)if(this===n||t.target===e[r])return!0;return!1;});},this.unbindEventWithSelectorOrCallback=function(e){var t,r=l.toElementsArray(this),o=e;t="function"==typeof e?function(e){for(var t=0;t<r.length;t++)if((this===n||e.target===r[t])&&e.callback===o)return!0;return!1;}:function(t){for(var i=0;i<r.length;i++)if((this===n||t.target===r[i])&&t.selector===e)return!0;return!1;},i.removeEvent(t);},this.unbindEventWithSelectorAndCallback=function(e,t){var r=l.toElementsArray(this);i.removeEvent(function(i){for(var o=0;o<r.length;o++)if((this===n||i.target===r[o])&&i.selector===e&&i.callback===t)return!0;return!1;});},this;},s=function(){function e(e){var t={attributes:!1,childList:!0,subtree:!0};return e.fireOnAttributesModification&&(t.attributes=!0),t;}function t(e,t){e.forEach(function(e){var n=e.addedNodes,i=e.target,o=[];null!==n&&n.length>0?l.checkChildNodesRecursively(n,t,r,o):"attributes"===e.type&&r(i,t,o)&&o.push({callback:t.callback,elem:i}),l.callCallbacks(o,t);});}function r(e,t){return l.matchesSelector(e,t.selector)&&(e._id===n&&(e._id=o++),-1==t.firedElems.indexOf(e._id))?(t.firedElems.push(e._id),!0):!1;}var i={fireOnAttributesModification:!1,onceOnly:!1,existing:!1};f=new a(e,t);var c=f.bindEvent;return f.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t);var o=l.toElementsArray(this);if(t.existing){for(var a=[],s=0;s<o.length;s++)for(var u=o[s].querySelectorAll(e),f=0;f<u.length;f++)a.push({callback:r,elem:u[f]});if(t.onceOnly&&a.length)return r.call(a[0].elem,a[0].elem);setTimeout(l.callCallbacks,1,a);}c.call(this,e,t,r);},f;},u=function(){function e(){var e={childList:!0,subtree:!0};return e;}function t(e,t){e.forEach(function(e){var n=e.removedNodes,i=[];null!==n&&n.length>0&&l.checkChildNodesRecursively(n,t,r,i),l.callCallbacks(i,t);});}function r(e,t){return l.matchesSelector(e,t.selector);}var i={};d=new a(e,t);var o=d.bindEvent;return d.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t),o.call(this,e,t,r);},d;},f=new s,d=new u;t&&i(t.fn),i(HTMLElement.prototype),i(NodeList.prototype),i(HTMLCollection.prototype),i(HTMLDocument.prototype),i(Window.prototype);var h={};return r(f,h,"unbindAllArrive"),r(d,h,"unbindAllLeave"),h;}}(window,"undefined"==typeof jQuery?null:jQuery,void 0);

/* easyNotify.js
    * https://github.com/Gabrielr47/easyNotify
    * Author : Gabriel Rodrigues
    */
!function(o){o.fn.easyNotify=function(i){var n=o.extend({title:"Notification",options:{body:"",icon:"",lang:"ko-KR",onClose:"",onClick:"",onError:""}},i);return this.init=function(){var o=this;if("Notification"in window)if("granted"===Notification.permission){var i=new Notification(n.title,n.options);i.onclose=function(){"function"==typeof n.options.onClose&&n.options.onClose();},i.onclick=function(){"function"==typeof n.options.onClick&&n.options.onClick();},i.onerror=function(){"function"==typeof n.options.onError&&n.options.onError();};}else"denied"!==Notification.permission&&Notification.requestPermission(function(i){"granted"===i&&o.init();});else alert("This browser does not support desktop notification");},this.init(),this;};}($);

/*
* jQuery UI Tag-it!
* @version v2.0 (06/2011)
*
* Copyright 2011, Levy Carneiro Jr.
* Released under the MIT license.
* http://aehlke.github.com/tag-it/LICENSE
*
* Homepage: http://aehlke.github.com/tag-it/
* Authors: Levy Carneiro Jr. Martin Rehfeld Tobias Schmidt Skylar Challand Alex Ehlke
* Maintainer: Alex Ehlke - Twitter: @aehlke
* Dependencies: jQuery v1.4+ jQuery UI v1.8+
*/
(function($){

    $.widget("ui.tagit", {
        options: {
            allowDuplicates   : false,
            caseSensitive     : true,
            fieldName         : "tags",
            placeholderText   : null,   // Sets `placeholder` attr on input field.
            readOnly          : false,  // Disables editing.
            removeConfirmation: false,  // Require confirmation to remove tags.
            tagLimit          : null,   // Max number of tags allowed (null for unlimited).

            // Used for autocomplete, unless you override `autocomplete.source`.
            availableTags     : [],

            // Use to override or add any options to the autocomplete widget.
            //
            // By default, autocomplete.source will map to availableTags,
            // unless overridden.
            autocomplete: {},

            // Shows autocomplete before the user even types anything.
            showAutocompleteOnFocus: false,

            // When enabled, quotes are unneccesary for inputting multi-word tags.
            allowSpaces: false,

            // The below options are for using a single field instead of several
            // for our form values.
            //
            // When enabled, will use a single hidden field for the form,
            // rather than one per tag. It will delimit tags in the field
            // with singleFieldDelimiter.
            //
            // The easiest way to use singleField is to just instantiate tag-it
            // on an INPUT element, in which case singleField is automatically
            // set to true, and singleFieldNode is set to that element. This
            // way, you don't need to fiddle with these options.
            singleField: false,

            // This is just used when preloading data from the field, and for
            // populating the field with delimited tags as the user adds them.
            singleFieldDelimiter: ",",

            // Set this to an input DOM node to use an existing form field.
            // Any text in it will be erased on init. But it will be
            // populated with the text of tags as they are created,
            // delimited by singleFieldDelimiter.
            //
            // If this is not set, we create an input node for it,
            // with the name given in settings.fieldName.
            singleFieldNode: null,

            // Whether to animate tag removals or not.
            animate: true,

            // Optionally set a tabindex attribute on the input that gets
            // created for tag-it.
            tabIndex: null,

            // Event callbacks.
            beforeTagAdded      : null,
            afterTagAdded       : null,

            beforeTagRemoved    : null,
            afterTagRemoved     : null,

            onTagClicked        : null,
            onTagLimitExceeded  : null,


            // DEPRECATED:
            //
            // /!\ These event callbacks are deprecated and WILL BE REMOVED at some
            // point in the future. They're here for backwards-compatibility.
            // Use the above before/after event callbacks instead.
            onTagAdded  : null,
            onTagRemoved: null,
            // `autocomplete.source` is the replacement for tagSource.
            tagSource: null
            // Do not use the above deprecated options.
        },

        _create: function(){
            // for handling static scoping inside callbacks
            var that = this;

            // There are 2 kinds of DOM nodes this widget can be instantiated on:
            //     1. UL, OL, or some element containing either of these.
            //     2. INPUT, in which case 'singleField' is overridden to true,
            //        a UL is created and the INPUT is hidden.
            if (this.element.is("input")){
                this.tagList = $("<ul></ul>").insertAfter(this.element);
                this.options.singleField = true;
                this.options.singleFieldNode = this.element;
                this.element.addClass("tagit-hidden-field");
            } else {
                this.tagList = this.element.find("ul, ol").andSelf().last();
            }

            this.tagInput = $("<input type=\"text\" />").addClass("ui-widget-content");

            if (this.options.readOnly) this.tagInput.attr("disabled", "disabled");

            if (this.options.tabIndex){
                this.tagInput.attr("tabindex", this.options.tabIndex);
            }

            if (this.options.placeholderText){
                this.tagInput.attr("placeholder", this.options.placeholderText);
            }

            if (!this.options.autocomplete.source){/*
                this.options.autocomplete.source = function(search, showChoices){
                    var filter = search.term.toLowerCase();
                    var choices = $.grep(this.options.availableTags, function(element){
                        // Only match autocomplete options that begin with the search term.
                        // (Case insensitive.)
                        return (element.toLowerCase().indexOf(filter) === 0);
                    });
                    if (!this.options.allowDuplicates){
                        choices = this._subtractArray(choices, this.assignedTags());
                    }
                    showChoices(choices);
                };*/
                this.options.autocomplete.source = this.options.availableTags;
            }

            if (this.options.showAutocompleteOnFocus){
                //this.tagInput.focus(function(event, ui){
                //    that._showAutocomplete();
                //});

                //if (typeof this.options.autocomplete.minLength === 'undefined'){
                //    this.options.autocomplete.minLength = 0;
                //}
            }
            var focused_value = "";
            this.options.autocomplete.focus = function( event, ui ){
                //console.log(event);
                focused_value = ui.item.value;
                event.preventDefault();
                //return false;
            };

            // Bind autocomplete.source callback functions to this context.
            if ($.isFunction(this.options.autocomplete.source)){
                this.options.autocomplete.source = $.proxy(this.options.autocomplete.source, this);
            }

            // DEPRECATED.
            if ($.isFunction(this.options.tagSource)){
                this.options.tagSource = $.proxy(this.options.tagSource, this);
            }

            this.tagList
                .addClass("tagit")
                .addClass("ui-widget ui-widget-content ui-corner-all")
                // Create the input field.
                .append($("<li class=\"tagit-new\"></li>").append(this.tagInput))
                .click(function(e){
                    var target = $(e.target);
                    if (target.hasClass("tagit-label")){
                        var tag = target.closest(".tagit-choice");
                        if (!tag.hasClass("removed")){
                            that._trigger("onTagClicked", e, {tag: tag, tagLabel: that.tagLabel(tag)});
                        }
                    } else {
                        // Sets the focus() to the input field, if the user
                        // clicks anywhere inside the UL. This is needed
                        // because the input field needs to be of a small size.
                        that.tagInput.focus();
                    }
                });

            // Single field support.
            var addedExistingFromSingleFieldNode = false;
            if (this.options.singleField){
                if (this.options.singleFieldNode){
                    // Add existing tags from the input field.
                    var node = $(this.options.singleFieldNode);
                    var tags = node.val().split(this.options.singleFieldDelimiter);
                    node.val("");
                    $.each(tags, function(index, tag){
                        that.createTag(tag, null, true);
                        addedExistingFromSingleFieldNode = true;
                    });
                } else {
                    // Create our single field input after our list.
                    this.options.singleFieldNode = $("<input type=\"hidden\" style=\"display:none;\" value=\"\" name=\"" + this.options.fieldName + "\" />");
                    this.tagList.after(this.options.singleFieldNode);
                }
            }

            // Add existing tags from the list, if any.
            if (!addedExistingFromSingleFieldNode){
                this.tagList.children("li").each(function(){
                    if (!$(this).hasClass("tagit-new")){
                        that.createTag($(this).text(), $(this).attr("class"), true);
                        $(this).remove();
                    }
                });
            }

            // Events.
            this.tagInput
                .keydown(function(event){
                    //if (event.which == $.ui.keyCode.DOWN){
                    //    console.log('down key pressed!');
                    //    event.preventDefault();
                    //    return false;
                    //}
                    // Backspace is not detected within a keypress, so it must use keydown.
                    if (event.which == $.ui.keyCode.BACKSPACE && that.tagInput.val() === ""){
                        var tag = that._lastTag();
                        if (!that.options.removeConfirmation || tag.hasClass("remove")){
                            // When backspace is pressed, the last tag is deleted.
                            that.removeTag(tag);
                        } else if (that.options.removeConfirmation){
                            tag.addClass("remove ui-state-highlight");
                        }
                    } else if (that.options.removeConfirmation){
                        that._lastTag().removeClass("remove ui-state-highlight");
                    }

                    // Comma/Space/Enter are all valid delimiters for new tags,
                    // except when there is an open quote or if setting allowSpaces = true.
                    // Tab will also create a tag, unless the tag input is empty,
                    // in which case it isn't caught.
                    if (
                        (event.which === $.ui.keyCode.COMMA && event.shiftKey === false) ||
                        event.which === $.ui.keyCode.ENTER ||
                        (
                            event.which == $.ui.keyCode.TAB &&
                            that.tagInput.val() !== ""
                        ) ||
                        (
                            event.which == $.ui.keyCode.SPACE &&
                            that.options.allowSpaces !== true &&
                            (
                                $.trim(that.tagInput.val()).replace( /^s*/, "" ).charAt(0) != "\"" ||
                                (
                                    $.trim(that.tagInput.val()).charAt(0) == "\"" &&
                                    $.trim(that.tagInput.val()).charAt($.trim(that.tagInput.val()).length - 1) == "\"" &&
                                    $.trim(that.tagInput.val()).length - 1 !== 0
                                )
                            )
                        )
                    ){
                        // Enter submits the form if there's no text in the input.
                        if (!(event.which === $.ui.keyCode.ENTER && that.tagInput.val() === "")){
                            event.preventDefault();
                        }

                        // Autocomplete will create its own tag from a selection and close automatically.
                        if (!(that.options.autocomplete.autoFocus && that.tagInput.data("autocomplete-open"))){
                            that.tagInput.autocomplete("close");
                            if( focused_value === "" || focused_value === null || focused_value === undefined){
                                that.createTag(that._cleanedInput());
                            }
                            else {
                                that.tagInput.val(""+focused_value);
                                that.createTag(""+focused_value);
                                focused_value = "";
                            }
                        }
                    }
                }).blur(function(e){
                    // Create a tag when the element loses focus.
                    // If autocomplete is enabled and suggestion was clicked, don't add it.
                    if (!that.tagInput.data("autocomplete-open")){
                        that.createTag(that._cleanedInput());
                    }
                });

            // Autocomplete.
            if (this.options.availableTags || this.options.tagSource || this.options.autocomplete.source){
                var autocompleteOptions = {
                    select: function(event, ui){
                        that.createTag(ui.item.value);
                        // Preventing the tag input to be updated with the chosen value.
                        return false;
                    }
                };
                $.extend(autocompleteOptions, this.options.autocomplete);

                // tagSource is deprecated, but takes precedence here since autocomplete.source is set by default,
                // while tagSource is left null by default.
                autocompleteOptions.source = this.options.tagSource || autocompleteOptions.source;

                this.tagInput.autocomplete(autocompleteOptions).bind("autocompleteopen.tagit", function(event, ui){
                    that.tagInput.data("autocomplete-open", true);
                    focused_value = "";
                }).bind("autocompleteclose.tagit", function(event, ui){
                    that.tagInput.data("autocomplete-open", false);
                });

                this.tagInput.autocomplete("widget").addClass("tagit-autocomplete");
            }
        },

        destroy: function(){
            $.Widget.prototype.destroy.call(this);

            this.element.unbind(".tagit");
            this.tagList.unbind(".tagit");

            this.tagInput.removeData("autocomplete-open");

            this.tagList.removeClass([
                "tagit",
                "ui-widget",
                "ui-widget-content",
                "ui-corner-all",
                "tagit-hidden-field"
            ].join(" "));

            if (this.element.is("input")){
                this.element.removeClass("tagit-hidden-field");
                this.tagList.remove();
            } else {
                this.element.children("li").each(function(){
                    if ($(this).hasClass("tagit-new")){
                        $(this).remove();
                    } else {
                        $(this).removeClass([
                            "tagit-choice",
                            "ui-widget-content",
                            "ui-state-default",
                            "ui-state-highlight",
                            "ui-corner-all",
                            "remove",
                            "tagit-choice-editable",
                            "tagit-choice-read-only"
                        ].join(" "));

                        $(this).text($(this).children(".tagit-label").text());
                    }
                });

                if (this.singleFieldNode){
                    this.singleFieldNode.remove();
                }
            }

            return this;
        },

        _cleanedInput: function(){
            // Returns the contents of the tag input, cleaned and ready to be passed to createTag
            return $.trim(this.tagInput.val().replace(/^"(.*)"$/, "$1"));
        },

        _lastTag: function(){
            return this.tagList.find(".tagit-choice:last:not(.removed)");
        },

        _tags: function(){
            return this.tagList.find(".tagit-choice:not(.removed)");
        },

        assignedTags: function(){
            // Returns an array of tag string values
            var that = this;
            var tags = [];
            if (this.options.singleField){
                tags = $(this.options.singleFieldNode).val().split(this.options.singleFieldDelimiter);
                if (tags[0] === ""){
                    tags = [];
                }
            } else {
                this._tags().each(function(){
                    tags.push(that.tagLabel(this));
                });
            }
            return tags;
        },

        _updateSingleTagsField: function(tags){
            // Takes a list of tag string values, updates this.options.singleFieldNode.val to the tags delimited by this.options.singleFieldDelimiter
            $(this.options.singleFieldNode).val(tags.join(this.options.singleFieldDelimiter)).trigger("change");
        },

        _subtractArray: function(a1, a2){
            var result = [];
            for (var i = 0; i < a1.length; i++){
                if ($.inArray(a1[i], a2) == -1){
                    result.push(a1[i]);
                }
            }
            return result;
        },

        tagLabel: function(tag){
            // Returns the tag's string label.
            if (this.options.singleField){
                return $(tag).find(".tagit-label:first").text();
            } else {
                return $(tag).find("input:first").val();
            }
        },

        _showAutocomplete: function(){
            this.tagInput.autocomplete("search", "");
        },

        _findTagByLabel: function(name){
            var that = this;
            var tag = null;
            this._tags().each(function(i){
                if (that._formatStr(name) == that._formatStr(that.tagLabel(this))){
                    tag = $(this);
                    return false;
                }
            });
            return tag;
        },

        _isNew: function(name){
            return !this._findTagByLabel(name);
        },

        _formatStr: function(str){
            if (this.options.caseSensitive){
                return str;
            }
            return $.trim(str.toLowerCase());
        },

        _effectExists: function(name){
            return Boolean($.effects && ($.effects[name] || ($.effects.effect && $.effects.effect[name])));
        },

        createTag: function(value, additionalClass, duringInitialization){
            var that = this;

            value = $.trim(value);

            if(this.options.preprocessTag){
                value = this.options.preprocessTag(value);
            }

            if (value === ""){
                return false;
            }

            if (!this.options.allowDuplicates && !this._isNew(value)){
                var existingTag = this._findTagByLabel(value);
                if (this._trigger("onTagExists", null, {
                    existingTag: existingTag,
                    duringInitialization: duringInitialization
                }) !== false){
                    if (this._effectExists("highlight")){
                        existingTag.effect("highlight");
                    }
                }
                return false;
            }

            if (this.options.tagLimit && this._tags().length >= this.options.tagLimit){
                this._trigger("onTagLimitExceeded", null, {duringInitialization: duringInitialization});
                return false;
            }

            var label = $(this.options.onTagClicked ? "<a class=\"tagit-label\"></a>" : "<span class=\"tagit-label\"></span>").text(value);

            // Create tag.
            var tag = $("<li></li>")
                .addClass("tagit-choice ui-widget-content ui-state-default ui-corner-all")
                .addClass(additionalClass)
                .append(label);

            if (this.options.readOnly){
                tag.addClass("tagit-choice-read-only");
            } else {
                tag.addClass("tagit-choice-editable");
                // Button for removing the tag.
                var removeTagIcon = $("<span></span>")
                    .addClass("ui-icon ui-icon-close");
                var removeTag = $("<a><span class=\"text-icon\">\xd7</span></a>") // \xd7 is an X
                    .addClass("tagit-close")
                    .append(removeTagIcon)
                    .click(function(e){
                        // Removes a tag when the little 'x' is clicked.
                        that.removeTag(tag);
                    });
                tag.append(removeTag);
            }

            // Unless options.singleField is set, each tag has a hidden input field inline.
            if (!this.options.singleField){
                var escapedValue = label.html();
                tag.append("<input type=\"hidden\" value=\"" + escapedValue + "\" name=\"" + this.options.fieldName + "\" class=\"tagit-hidden-field\" />");
            }

            if (this._trigger("beforeTagAdded", null, {
                tag: tag,
                tagLabel: this.tagLabel(tag),
                duringInitialization: duringInitialization
            }) === false){
                return;
            }

            if (this.options.singleField){
                var tags = this.assignedTags();
                tags.push(value);
                this._updateSingleTagsField(tags);
            }

            // DEPRECATED.
            this._trigger("onTagAdded", null, tag);

            this.tagInput.val("");

            // Insert tag.
            this.tagInput.parent().before(tag);

            this._trigger("afterTagAdded", null, {
                tag: tag,
                tagLabel: this.tagLabel(tag),
                duringInitialization: duringInitialization
            });

            if (this.options.showAutocompleteOnFocus && !duringInitialization){
                setTimeout(function (){ that._showAutocomplete(); }, 0);
            }
        },

        removeTag: function(tag, animate){
            animate = typeof animate === "undefined" ? this.options.animate : animate;

            tag = $(tag);

            // DEPRECATED.
            this._trigger("onTagRemoved", null, tag);

            if (this._trigger("beforeTagRemoved", null, {tag: tag, tagLabel: this.tagLabel(tag)}) === false){
                return;
            }

            if (this.options.singleField){
                var tags = this.assignedTags();
                var removedTagLabel = this.tagLabel(tag);
                tags = $.grep(tags, function(el){
                    return el != removedTagLabel;
                });
                this._updateSingleTagsField(tags);
            }

            if (animate){
                tag.addClass("removed"); // Excludes this tag from _tags.
                var hide_args = this._effectExists("blind") ? ["blind", {direction: "horizontal"}, "fast"] : ["fast"];

                var thisTag = this;
                hide_args.push(function(){
                    tag.remove();
                    thisTag._trigger("afterTagRemoved", null, {tag: tag, tagLabel: thisTag.tagLabel(tag)});
                });

                tag.fadeOut("fast").hide.apply(tag, hide_args).dequeue();
            } else {
                tag.remove();
                this._trigger("afterTagRemoved", null, {tag: tag, tagLabel: this.tagLabel(tag)});
            }

        },

        removeTagByLabel: function(tagLabel, animate){
            var toRemove = this._findTagByLabel(tagLabel);
            if (!toRemove){
                throw "No such tag exists with the name '" + tagLabel + "'";
            }
            this.removeTag(toRemove, animate);
        },

        removeAll: function(){
            // Removes all tags.
            var that = this;
            this._tags().each(function(index, tag){
                that.removeTag(tag, false);
            });
        }

    });
})(jQuery);

/*
* Nude.js - Nudity detection with Javascript and HTMLCanvas
*
* Author: Patrick Wied ( http://www.patrick-wied.at )
* Version: 0.1  (2010-11-21)
* License: MIT License
*/
(function(){
    Array.prototype.remove = function(index) {
        var rest = this.slice(index + 1);
        this.length = index;
        return this.push.apply(this, rest);
    };

    var nude = (function(){
        // private var definition
        var MAX_LENGTH = 500.0;
        var canvas = null,
            ctx = null,
            skinRegions = [],
            resultFn = null,
            // img = null, // NEVER_USED
            // private functions
            initCanvas = function(){
                canvas = document.createElement("canvas");
                // the canvas should not be visible
                canvas.style.display = "none";
                var b = document.getElementsByTagName("body")[0];
                b.appendChild(canvas);
                ctx = canvas.getContext("2d");
            },
            loadImageById = function(id){
                // get the image
                var img = document.getElementById(id);
                // apply the width and height to the canvas element

                // 이미지 리사이즈
                // set size proportional to image
                var max_length = Math.max(img.width,img.height);
                if(max_length > MAX_LENGTH){
                    var ratio = MAX_LENGTH / max_length;
                    canvas.width = img.width * ratio;
                    canvas.height = img.height * ratio;
                    //console.log("image resize: from"+img.width+"x"+img.height+" to "+ canvas.width + "x" + canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
                else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // reset the result function
                    resultFn = null;
                    // draw the image into the canvas element
                    ctx.drawImage(img, 0, 0);
                }

            },
            loadImageByElement = function(element){
                var img = element;
                // 이미지 리사이즈
                // set size proportional to image
                var max_length = Math.max(img.width,img.height);
                if(max_length > MAX_LENGTH){
                    var ratio = MAX_LENGTH / max_length;
                    canvas.width = img.width * ratio;
                    canvas.height = img.height * ratio;
                    //console.log("image resize: from"+img.width+"x"+img.height+" to "+ canvas.width + "x" + canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    /*
                    // https://stackoverflow.com/a/39637827
                    var oc = document.createElement('canvas'),
                        octx = oc.getContext('2d');
                    var cur = {
                        width: Math.floor(img.width * 0.5),
                        height: Math.floor(img.height * 0.5)
                    }

                    oc.width = cur.width;
                    oc.height = cur.height;

                    octx.drawImage(img, 0, 0, cur.width, cur.height);

                    while (cur.width * 0.5 > img.width * ratio) {
                        cur = {
                            width: Math.floor(cur.width * 0.5),
                            height: Math.floor(cur.height * 0.5)
                        };
                        octx.drawImage(oc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
                    }
                    ctx.drawImage(oc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);
                    */
                }
                else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // reset the result function
                    resultFn = null;
                    // draw the image into the canvas element
                    ctx.drawImage(img, 0, 0);
                }
            },
            scanImage = function(){
                // get the image data
                var image = ctx.getImageData(0, 0, canvas.width, canvas.height),
                    imageData = image.data,
                    skinMap = [],
                    detectedRegions = [],
                    mergeRegions = [],
                    width = canvas.width,
                    lastFrom = -1,
                    lastTo = -1;


                var addMerge = function(from, to){
                    lastFrom = from;
                    lastTo = to;
                    var len = mergeRegions.length,
                        fromIndex = -1,
                        toIndex = -1;


                    while(len--){

                        var region = mergeRegions[len],
                            rlen = region.length;

                        while(rlen--){

                            if(region[rlen] == from){
                                fromIndex = len;
                            }

                            if(region[rlen] == to){
                                toIndex = len;
                            }

                        }

                    }

                    if(fromIndex != -1 && toIndex != -1 && fromIndex == toIndex){
                        return;
                    }

                    if(fromIndex == -1 && toIndex == -1){

                        mergeRegions.push([from, to]);

                        return;
                    }
                    if(fromIndex != -1 && toIndex == -1){

                        mergeRegions[fromIndex].push(to);
                        return;
                    }
                    if(fromIndex == -1 && toIndex != -1){
                        mergeRegions[toIndex].push(from);
                        return;
                    }

                    if(fromIndex != -1 && toIndex != -1 && fromIndex != toIndex){
                        mergeRegions[fromIndex] = mergeRegions[fromIndex].concat(mergeRegions[toIndex]);
                        mergeRegions.remove(toIndex);
                        return;
                    }

                };

                // iterate the image from the top left to the bottom right
                var length = imageData.length;
                width = canvas.width;

                for(var i = 0, u = 1; i < length; i+=4, u++){

                    var r = imageData[i],
                        g = imageData[i+1],
                        b = imageData[i+2],
                        x = (u>width)?((u%width)-1):u,
                        y = (u>width)?(Math.ceil(u/width)-1):1;

                    if(classifySkin(r, g, b)){ //
                        skinMap.push({"id": u, "skin": true, "region": 0, "x": x, "y": y, "checked": false});

                        var region = -1,
                            checkIndexes = [u-2, (u-width)-2, u-width-1, (u-width)],
                            checker = false;

                        for(var o = 0; o < 4; o++){
                            var index = checkIndexes[o];
                            if(skinMap[index] && skinMap[index].skin){
                                if(skinMap[index].region!=region && region!=-1 && lastFrom!=region && lastTo!=skinMap[index].region){
                                    addMerge(region, skinMap[index].region);
                                }
                                region = skinMap[index].region;
                                checker = true;
                            }
                        }

                        if(!checker){
                            skinMap[u-1].region = detectedRegions.length;
                            detectedRegions.push([skinMap[u-1]]);
                            continue;
                        }else{

                            if(region > -1){

                                if(!detectedRegions[region]){
                                    detectedRegions[region] = [];
                                }

                                skinMap[u-1].region = region;
                                detectedRegions[region].push(skinMap[u-1]);

                            }
                        }

                    }else{
                        skinMap.push({"id": u, "skin": false, "region": 0, "x": x, "y": y, "checked": false});
                    }

                }

                merge(detectedRegions, mergeRegions);
                analyseRegions();
            },
            // function for merging detected regions
            merge = function(detectedRegions, mergeRegions){

                var length = mergeRegions.length,
                    detRegions = [];


                // merging detected regions
                while(length--){

                    var region = mergeRegions[length],
                        rlen = region.length;

                    if(!detRegions[length])
                        detRegions[length] = [];

                    while(rlen--){
                        var index = region[rlen];
                        detRegions[length] = detRegions[length].concat(detectedRegions[index]);
                        detectedRegions[index] = [];
                    }

                }

                // push the rest of the regions to the detRegions array
                // (regions without merging)
                var l = detectedRegions.length;
                while(l--){
                    if(detectedRegions[l].length > 0){
                        detRegions.push(detectedRegions[l]);
                    }
                }

                // clean up
                clearRegions(detRegions);

            },
            // clean up function
            // only pushes regions which are bigger than a specific amount to the final result
            clearRegions = function(detectedRegions){

                var length = detectedRegions.length;

                for(var i=0; i < length; i++){
                    if(detectedRegions[i].length > 30){
                        skinRegions.push(detectedRegions[i]);
                    }
                }

            },
            analyseRegions = function(){

                // sort the detected regions by size
                var length = skinRegions.length,
                    totalPixels = canvas.width * canvas.height,
                    totalSkin = 0;

                // if there are less than 3 regions
                if(length < 3){
                    resultHandler(false);
                    return;
                }

                // sort the skinRegions with bubble sort algorithm
                (function(){
                    var sorted = false;
                    while(!sorted){
                        sorted = true;
                        for(var i = 0; i < length-1; i++){
                            if(skinRegions[i].length < skinRegions[i+1].length){
                                sorted = false;
                                var temp = skinRegions[i];
                                skinRegions[i] = skinRegions[i+1];
                                skinRegions[i+1] = temp;
                            }
                        }
                    }
                })();

                // count total skin pixels
                while(length--){
                    totalSkin += skinRegions[length].length;
                }

                var text1 = "skin regions length" + skinRegions.length;
                var text2 = "the biggest areas :" + ((skinRegions[0].length/totalSkin)*100) + "%, " + ((skinRegions[1].length/totalSkin)*100)+"%, "+((skinRegions[2].length/totalSkin)*100)+"%";
                if(typeof ADD_DEBUG === 'function'){
                    ADD_DEBUG(text1);
                    ADD_DEBUG(text2);
                }
                else{
                    console.log(text1);
                    console.log(text2);
                }

                // check if there are more than 15% skin pixel in the image
                if((totalSkin/totalPixels)*100 < 15){
                    // if the percentage lower than 15, it's not nude!
                    //console.log("it's not nude :) - total skin percent is "+((totalSkin/totalPixels)*100)+"% ");
                    resultHandler(false);
                    return;
                }

                // check if the largest skin region is less than 35% of the total skin count
                // AND if the second largest region is less than 30% of the total skin count
                // AND if the third largest region is less than 30% of the total skin count
                if((skinRegions[0].length/totalSkin)*100 < 35
                        && (skinRegions[1].length/totalSkin)*100 < 30
                        && (skinRegions[2].length/totalSkin)*100 < 30){
                    // the image is not nude.
                    //console.log("it's not nude :) - less than 35%,30%,30% skin in the biggest areas :" + ((skinRegions[0].length/totalSkin)*100) + "%, " + ((skinRegions[1].length/totalSkin)*100)+"%, "+((skinRegions[2].length/totalSkin)*100)+"%");
                    resultHandler(false);
                    return;

                }

                // check if the number of skin pixels in the largest region is less than 45% of the total skin count
                if((skinRegions[0].length/totalSkin)*100 < 45){
                    // it's not nude
                    //console.log("it's not nude :) - the biggest region contains less than 45%: "+((skinRegions[0].length/totalSkin)*100)+"%");
                    resultHandler(false);
                    return;
                }

                // TODO:
                // build the bounding polygon by the regions edge values:
                // Identify the leftmost, the uppermost, the rightmost, and the lowermost skin pixels of the three largest skin regions.
                // Use these points as the corner points of a bounding polygon.

                // TODO:
                // check if the total skin count is less than 30% of the total number of pixels
                // AND the number of skin pixels within the bounding polygon is less than 55% of the size of the polygon
                // if this condition is true, it's not nude.

                // TODO: include bounding polygon functionality
                // if there are more than 60 skin regions and the average intensity within the polygon is less than 0.25
                // the image is not nude
                if(skinRegions.length > 60){
                    //console.log("it's not nude :) - more than 60 skin regions", skinRegions.length);
                    resultHandler(false);
                    return;
                }


                // otherwise it is nude
                resultHandler(true);

            },
            // the result handler will be executed when the analysing process is done
            // the result contains true (it is nude) or false (it is not nude)
            // if the user passed an result function to the scan function, the result function will be executed
            // otherwise the default resulthandling executes
            resultHandler = function(result){

                if(resultFn){
                    resultFn(result);
                }else{
                    if(result){
                        //console.log("the picture contains nudity");
                    }
                }

            },
            classifySkin = function(r, g, b){
                // A Survey on Pixel-Based Skin Color Detection Techniques
                var rgbClassifier = ((r>95) && (g>40 && g <100) && (b>20) && ((Math.max(r,g,b) - Math.min(r,g,b)) > 15) && (Math.abs(r-g)>15) && (r > g) && (r > b)),
                    nurgb = toNormalizedRgb(r, g, b),
                    nr = nurgb[0],
                    ng = nurgb[1],
                    normRgbClassifier = (((nr/ng)>1.185) && (((r*b)/(Math.pow(r+g+b,2))) > 0.107) && (((r*g)/(Math.pow(r+g+b,2))) > 0.112)),
                    hsv = toHsvTest(r, g, b),
                    h = hsv[0],
                    s = hsv[1],
                    hsvClassifier = (h > 0 && h < 35 && s > 0.23 && s < 0.68);

                return (rgbClassifier || normRgbClassifier || hsvClassifier); //
            },
            toHsvTest = function(r, g, b){
                var h = 0,
                    mx = Math.max(r, g, b),
                    mn = Math.min(r, g, b),
                    dif = mx - mn;

                if(mx == r){
                    h = (g - b)/dif;
                }else if(mx == g){
                    h = 2+((g - r)/dif);
                }else{
                    h = 4+((r - g)/dif);
                }
                h = h*60;
                if(h < 0){
                    h = h+360;
                }

                return [h, 1-(3*((Math.min(r,g,b))/(r+g+b))),(1/3)*(r+g+b)] ;

            },
            toNormalizedRgb = function(r, g, b){
                var sum = r+g+b;
                return [(r/sum), (g/sum), (b/sum)];
            };

        // public interface
        return {
            init: function(){
                initCanvas();
            },
            load: function(param){
                if(typeof(param) == "string"){
                    loadImageById(param);
                }else{
                    loadImageByElement(param);
                }
            },
            scan: function(fn){
                if(arguments.length>0 && typeof(arguments[0]) == "function"){
                    resultFn = fn;
                }
                scanImage();

                // 글로벌 변수 초기화
                skinRegions = [];
                resultFn = null;
                // img = null;
            }
        };
    })();
    // register nude at window object
    window.nude = nude;
})();

/*!
 * Autolinker.js
 * 2.2.2
 *
 * Copyright(c) 2019 Gregory Jacobs <greg@greg-jacobs.com>
 * MIT License
 *
 * https://github.com/gregjacobs/Autolinker.js
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Autolinker=e()}(this,function(){"use strict";function s(t,e){if(Array.prototype.indexOf)return t.indexOf(e);for(var u=0,n=t.length;u<n;u++)if(t[u]===e)return u;return-1}function e(t,e){for(var u=t.length-1;0<=u;u--)!0===e(t[u])&&t.splice(u,1)}var u=function(){function t(t){void 0===t&&(t={}),this.tagName="",this.attrs={},this.innerHTML="",this.whitespaceRegex=/\s+/,this.tagName=t.tagName||"",this.attrs=t.attrs||{},this.innerHTML=t.innerHtml||t.innerHTML||""}return t.prototype.setTagName=function(t){return this.tagName=t,this},t.prototype.getTagName=function(){return this.tagName||""},t.prototype.setAttr=function(t,e){return this.getAttrs()[t]=e,this},t.prototype.getAttr=function(t){return this.getAttrs()[t]},t.prototype.setAttrs=function(t){return Object.assign(this.getAttrs(),t),this},t.prototype.getAttrs=function(){return this.attrs||(this.attrs={})},t.prototype.setClass=function(t){return this.setAttr("class",t)},t.prototype.addClass=function(t){for(var e,u=this.getClass(),n=this.whitespaceRegex,r=u?u.split(n):[],i=t.split(n);e=i.shift();)-1===s(r,e)&&r.push(e);return this.getAttrs().class=r.join(" "),this},t.prototype.removeClass=function(t){for(var e,u=this.getClass(),n=this.whitespaceRegex,r=u?u.split(n):[],i=t.split(n);r.length&&(e=i.shift());){var a=s(r,e);-1!==a&&r.splice(a,1)}return this.getAttrs().class=r.join(" "),this},t.prototype.getClass=function(){return this.getAttrs().class||""},t.prototype.hasClass=function(t){return-1!==(" "+this.getClass()+" ").indexOf(" "+t+" ")},t.prototype.setInnerHTML=function(t){return this.innerHTML=t,this},t.prototype.setInnerHtml=function(t){return this.setInnerHTML(t)},t.prototype.getInnerHTML=function(){return this.innerHTML||""},t.prototype.getInnerHtml=function(){return this.getInnerHTML()},t.prototype.toAnchorString=function(){var t=this.getTagName(),e=this.buildAttrsStr();return["<",t,e=e?" "+e:"",">",this.getInnerHtml(),"</",t,">"].join("")},t.prototype.buildAttrsStr=function(){if(!this.attrs)return"";var t=this.getAttrs(),e=[];for(var u in t)t.hasOwnProperty(u)&&e.push(u+'="'+t[u]+'"');return e.join(" ")},t}();var r=function(){function t(t){void 0===t&&(t={}),this.newWindow=!1,this.truncate={},this.className="",this.newWindow=t.newWindow||!1,this.truncate=t.truncate||{},this.className=t.className||""}return t.prototype.build=function(t){return new u({tagName:"a",attrs:this.createAttrs(t),innerHtml:this.processAnchorText(t.getAnchorText())})},t.prototype.createAttrs=function(t){var e={href:t.getAnchorHref()},u=this.createCssClass(t);return u&&(e.class=u),this.newWindow&&(e.target="_blank",e.rel="noopener noreferrer"),this.truncate&&this.truncate.length&&this.truncate.length<t.getAnchorText().length&&(e.title=t.getAnchorHref()),e},t.prototype.createCssClass=function(t){var e=this.className;if(e){for(var u=[e],n=t.getCssClassSuffixes(),r=0,i=n.length;r<i;r++)u.push(e+"-"+n[r]);return u.join(" ")}return""},t.prototype.processAnchorText=function(t){return t=this.doTruncate(t)},t.prototype.doTruncate=function(t){var e=this.truncate;if(!e||!e.length)return t;var u,n,r,i,a,s=e.length,o=e.location;return"smart"===o?function(t,e,a){var u,n;u=null==a?(a="&hellip;",n=3,8):(n=a.length,a.length);var r=function(t){var e="";return t.scheme&&t.host&&(e+=t.scheme+"://"),t.host&&(e+=t.host),t.path&&(e+="/"+t.path),t.query&&(e+="?"+t.query),t.fragment&&(e+="#"+t.fragment),e},i=function(t,e){var u=e/2,n=Math.ceil(u),r=-1*Math.floor(u),i="";return r<0&&(i=t.substr(r)),t.substr(0,n)+a+i};if(t.length<=e)return t;var s,o,c,h=e-n,l=(s={},(c=(o=t).match(/^([a-z]+):\/\//i))&&(s.scheme=c[1],o=o.substr(c[0].length)),(c=o.match(/^(.*?)(?=(\?|#|\/|$))/i))&&(s.host=c[1],o=o.substr(c[0].length)),(c=o.match(/^\/(.*?)(?=(\?|#|$))/i))&&(s.path=c[1],o=o.substr(c[0].length)),(c=o.match(/^\?(.*?)(?=(#|$))/i))&&(s.query=c[1],o=o.substr(c[0].length)),(c=o.match(/^#(.*?)$/i))&&(s.fragment=c[1]),s);if(l.query){var p=l.query.match(/^(.*?)(?=(\?|\#))(.*?)$/i);p&&(l.query=l.query.substr(0,p[1].length),t=r(l))}if(t.length<=e)return t;if(l.host&&(l.host=l.host.replace(/^www\./,""),t=r(l)),t.length<=e)return t;var g="";if(l.host&&(g+=l.host),g.length>=h)return l.host.length==e?(l.host.substr(0,e-n)+a).substr(0,h+u):i(g,h).substr(0,h+u);var f="";if(l.path&&(f+="/"+l.path),l.query&&(f+="?"+l.query),f){if(h<=(g+f).length)return(g+f).length==e?(g+f).substr(0,e):(g+i(f,h-g.length)).substr(0,h+u);g+=f}if(l.fragment){var m="#"+l.fragment;if(h<=(g+m).length)return(g+m).length==e?(g+m).substr(0,e):(g+i(m,h-g.length)).substr(0,h+u);g+=m}if(l.scheme&&l.host){var d=l.scheme+"://";if((g+d).length<h)return(d+g).substr(0,e)}if(g.length<=e)return g;var A="";return 0<h&&(A=g.substr(-1*Math.floor(h/2))),(g.substr(0,Math.ceil(h/2))+a+A).substr(0,h+u)}(t,s):"middle"===o?function(t,e,u){if(t.length<=e)return t;var n,r=e-(null==u?(u="&hellip;",n=8,3):(n=u.length,u.length)),i="";return 0<r&&(i=t.substr(-1*Math.floor(r/2))),(t.substr(0,Math.ceil(r/2))+u+i).substr(0,r+n)}(t,s):(r=s,i=u,(n=t).length>r&&(a=null==i?(i="&hellip;",3):i.length,n=n.substring(0,r-a)+i),n)},t}(),n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var u in e)e.hasOwnProperty(u)&&(t[u]=e[u])})(t,e)};
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */function i(t,e){function u(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(u.prototype=e.prototype,new u)}var t,a,o,c,h,l=function(){function t(t){this.offset=0,this.text="",this.offset=t.offset,this.text=t.text}return t.prototype.getOffset=function(){return this.offset},t.prototype.getText=function(){return this.text},t}(),p=function(u){function t(t){var e=u.call(this,t)||this;return e.comment="",e.comment=t.comment,e}return i(t,u),t.prototype.getType=function(){return"comment"},t.prototype.getComment=function(){return this.comment},t}(l),g=function(u){function t(t){var e=u.call(this,t)||this;return e.tagName="",e.closing=!1,e.tagName=t.tagName,e.closing=t.closing,e}return i(t,u),t.prototype.getType=function(){return"element"},t.prototype.getTagName=function(){return this.tagName},t.prototype.isClosing=function(){return this.closing},t}(l),f=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.getType=function(){return"entity"},e}(l),m=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.getType=function(){return"text"},e}(l),d=(t=/[0-9a-zA-Z][0-9a-zA-Z:]*/,a=/[^\s"'>\/=\x00-\x1F\x7F]+/,c="(?:\\s*?=\\s*?"+(o=/(?:"[^"]*?"|'[^']*?'|[^'"=<>`\s]+)/).source+")?",h=function(t){return"(?=("+a.source+"))\\"+t+c},new RegExp(["(?:","<(!DOCTYPE)","(?:","\\s+","(?:",h(2),"|",o.source+")",")*",">",")","|","(?:","<(/)?","(?:",/!--([\s\S]+?)--/.source,"|","(?:","("+t.source+")","\\s*/?",")","|","(?:","("+t.source+")","\\s+","(?:","(?:\\s+|\\b)",h(7),")*","\\s*/?",")",")",">",")"].join(""),"gi")),A=/(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi,x=function(){function t(){}return t.prototype.parse=function(t){for(var e,u,n=0,r=[];null!==(e=d.exec(t));){var i=e[0],a=e[4],s=e[1]||e[5]||e[6],o=!!e[3],c=e.index,h=t.substring(n,c);h&&(u=this.parseTextAndEntityNodes(n,h),r.push.apply(r,u)),a?r.push(this.createCommentNode(c,i,a)):r.push(this.createElementNode(c,i,s,o)),n=c+i.length}if(n<t.length){var l=t.substring(n);l&&(u=this.parseTextAndEntityNodes(n,l)).forEach(function(t){return r.push(t)})}return r},t.prototype.parseTextAndEntityNodes=function(t,e){for(var u=[],n=function(t,e){if(!e.global)throw new Error("`splitRegex` must have the 'g' flag set");for(var u,n=[],r=0;u=e.exec(t);)n.push(t.substring(r,u.index)),n.push(u[0]),r=u.index+u[0].length;return n.push(t.substring(r)),n}(e,A),r=0,i=n.length;r<i;r+=2){var a=n[r],s=n[r+1];a&&(u.push(this.createTextNode(t,a)),t+=a.length),s&&(u.push(this.createEntityNode(t,s)),t+=s.length)}return u},t.prototype.createCommentNode=function(t,e,u){return new p({offset:t,text:e,comment:u.trim()})},t.prototype.createElementNode=function(t,e,u,n){return new g({offset:t,text:e,tagName:u.toLowerCase(),closing:n})},t.prototype.createEntityNode=function(t,e){return new f({offset:t,text:e})},t.prototype.createTextNode=function(t,e){return new m({offset:t,text:e})},t}(),b=function(){function t(t){this.__jsduckDummyDocProp=null,this.matchedText="",this.offset=0,this.tagBuilder=t.tagBuilder,this.matchedText=t.matchedText,this.offset=t.offset}return t.prototype.getMatchedText=function(){return this.matchedText},t.prototype.setOffset=function(t){this.offset=t},t.prototype.getOffset=function(){return this.offset},t.prototype.getCssClassSuffixes=function(){return[this.getType()]},t.prototype.buildTag=function(){return this.tagBuilder.build(this)},t}(),y=function(u){function t(t){var e=u.call(this,t)||this;return e.email="",e.email=t.email,e}return i(t,u),t.prototype.getType=function(){return"email"},t.prototype.getEmail=function(){return this.email},t.prototype.getAnchorHref=function(){return"mailto:"+this.email},t.prototype.getAnchorText=function(){return this.email},t}(b),F=function(u){function t(t){var e=u.call(this,t)||this;return e.serviceName="",e.hashtag="",e.serviceName=t.serviceName,e.hashtag=t.hashtag,e}return i(t,u),t.prototype.getType=function(){return"hashtag"},t.prototype.getServiceName=function(){return this.serviceName},t.prototype.getHashtag=function(){return this.hashtag},t.prototype.getAnchorHref=function(){var t=this.serviceName,e=this.hashtag;switch(t){case"twitter":return"https://twitter.com/hashtag/"+e;case"facebook":return"https://www.facebook.com/hashtag/"+e;case"instagram":return"https://instagram.com/explore/tags/"+e;default:throw new Error("Unknown service name to point hashtag to: "+t)}},t.prototype.getAnchorText=function(){return"#"+this.hashtag},t}(b),B=function(u){function t(t){var e=u.call(this,t)||this;return e.serviceName="twitter",e.mention="",e.mention=t.mention,e.serviceName=t.serviceName,e}return i(t,u),t.prototype.getType=function(){return"mention"},t.prototype.getMention=function(){return this.mention},t.prototype.getServiceName=function(){return this.serviceName},t.prototype.getAnchorHref=function(){switch(this.serviceName){case"twitter":return"https://twitter.com/"+this.mention;case"instagram":return"https://instagram.com/"+this.mention;case"soundcloud":return"https://soundcloud.com/"+this.mention;default:throw new Error("Unknown service name to point mention to: "+this.serviceName)}},t.prototype.getAnchorText=function(){return"@"+this.mention},t.prototype.getCssClassSuffixes=function(){var t=u.prototype.getCssClassSuffixes.call(this),e=this.getServiceName();return e&&t.push(e),t},t}(b),v=function(u){function t(t){var e=u.call(this,t)||this;return e.number="",e.plusSign=!1,e.number=t.number,e.plusSign=t.plusSign,e}return i(t,u),t.prototype.getType=function(){return"phone"},t.prototype.getPhoneNumber=function(){return this.number},t.prototype.getNumber=function(){return this.getPhoneNumber()},t.prototype.getAnchorHref=function(){return"tel:"+(this.plusSign?"+":"")+this.number},t.prototype.getAnchorText=function(){return this.matchedText},t}(b),C=function(u){function t(t){var e=u.call(this,t)||this;return e.url="",e.urlMatchType="scheme",e.protocolUrlMatch=!1,e.protocolRelativeMatch=!1,e.stripPrefix={scheme:!0,www:!0},e.stripTrailingSlash=!0,e.decodePercentEncoding=!0,e.schemePrefixRegex=/^(https?:\/\/)?/i,e.wwwPrefixRegex=/^(https?:\/\/)?(www\.)?/i,e.protocolRelativeRegex=/^\/\//,e.protocolPrepended=!1,e.urlMatchType=t.urlMatchType,e.url=t.url,e.protocolUrlMatch=t.protocolUrlMatch,e.protocolRelativeMatch=t.protocolRelativeMatch,e.stripPrefix=t.stripPrefix,e.stripTrailingSlash=t.stripTrailingSlash,e.decodePercentEncoding=t.decodePercentEncoding,e}return i(t,u),t.prototype.getType=function(){return"url"},t.prototype.getUrlMatchType=function(){return this.urlMatchType},t.prototype.getUrl=function(){var t=this.url;return this.protocolRelativeMatch||this.protocolUrlMatch||this.protocolPrepended||(t=this.url="http://"+t,this.protocolPrepended=!0),t},t.prototype.getAnchorHref=function(){return this.getUrl().replace(/&amp;/g,"&")},t.prototype.getAnchorText=function(){var t=this.getMatchedText();return this.protocolRelativeMatch&&(t=this.stripProtocolRelativePrefix(t)),this.stripPrefix.scheme&&(t=this.stripSchemePrefix(t)),this.stripPrefix.www&&(t=this.stripWwwPrefix(t)),this.stripTrailingSlash&&(t=this.removeTrailingSlash(t)),this.decodePercentEncoding&&(t=this.removePercentEncoding(t)),t},t.prototype.stripSchemePrefix=function(t){return t.replace(this.schemePrefixRegex,"")},t.prototype.stripWwwPrefix=function(t){return t.replace(this.wwwPrefixRegex,"$1")},t.prototype.stripProtocolRelativePrefix=function(t){return t.replace(this.protocolRelativeRegex,"")},t.prototype.removeTrailingSlash=function(t){return"/"===t.charAt(t.length-1)&&(t=t.slice(0,-1)),t},t.prototype.removePercentEncoding=function(t){var e=t.replace(/%22/gi,"&quot;").replace(/%26/gi,"&amp;").replace(/%27/gi,"&#39;").replace(/%3C/gi,"&lt;").replace(/%3E/gi,"&gt;");try{return decodeURIComponent(e)}catch(t){return e}},t}(b),w=function(t){this.__jsduckDummyDocProp=null,this.tagBuilder=t.tagBuilder},E=/A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC/.source,D=E+/\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F/.source,k=/0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19/.source,T=D+k,M=D+k,P="(?:["+k+"]{1,3}\\.){3}["+k+"]{1,3}",j="["+M+"](?:["+M+"\\-]{0,61}["+M+"])?",N=function(t){return"(?=("+j+"))\\"+t},z=function(t){return"(?:"+N(t)+"(?:\\."+N(t+1)+"){0,126}|"+P+")"},R=/(?:xn--vermgensberatung-pwb|xn--vermgensberater-ctb|xn--clchc0ea0b2g2a9gcd|xn--w4r85el8fhu5dnra|northwesternmutual|travelersinsurance|vermögensberatung|xn--3oq18vl8pn36a|xn--5su34j936bgsg|xn--bck1b9a5dre4c|xn--mgbai9azgqp6j|xn--mgberp4a5d4ar|xn--xkc2dl3a5ee0h|vermögensberater|xn--fzys8d69uvgm|xn--mgba7c0bbn0a|xn--xkc2al3hye2a|americanexpress|kerryproperties|sandvikcoromant|xn--i1b6b1a6a2e|xn--kcrx77d1x4a|xn--lgbbat1ad8j|xn--mgba3a4f16a|xn--mgbaakc7dvf|xn--mgbc0a9azcg|xn--nqv7fs00ema|afamilycompany|americanfamily|bananarepublic|cancerresearch|cookingchannel|kerrylogistics|weatherchannel|xn--54b7fta0cc|xn--6qq986b3xl|xn--80aqecdr1a|xn--b4w605ferd|xn--fiq228c5hs|xn--h2breg3eve|xn--jlq61u9w7b|xn--mgba3a3ejt|xn--mgbaam7a8h|xn--mgbayh7gpa|xn--mgbb9fbpob|xn--mgbbh1a71e|xn--mgbca7dzdo|xn--mgbi4ecexp|xn--mgbx4cd0ab|xn--rvc1e0am3e|international|lifeinsurance|spreadbetting|travelchannel|wolterskluwer|xn--eckvdtc9d|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--h2brj9c8c|xn--tiq49xqyj|xn--yfro4i67o|xn--ygbi2ammx|construction|lplfinancial|scholarships|versicherung|xn--3e0b707e|xn--45br5cyl|xn--80adxhks|xn--80asehdb|xn--8y0a063a|xn--gckr3f0f|xn--mgb9awbf|xn--mgbab2bd|xn--mgbgu82a|xn--mgbpl2fh|xn--mgbt3dhd|xn--mk1bu44c|xn--ngbc5azd|xn--ngbe9e0a|xn--ogbpf8fl|xn--qcka1pmc|accountants|barclaycard|blackfriday|blockbuster|bridgestone|calvinklein|contractors|creditunion|engineering|enterprises|foodnetwork|investments|kerryhotels|lamborghini|motorcycles|olayangroup|photography|playstation|productions|progressive|redumbrella|rightathome|williamhill|xn--11b4c3d|xn--1ck2e1b|xn--1qqw23a|xn--2scrj9c|xn--3bst00m|xn--3ds443g|xn--3hcrj9c|xn--42c2d9a|xn--45brj9c|xn--55qw42g|xn--6frz82g|xn--80ao21a|xn--9krt00a|xn--cck2b3b|xn--czr694b|xn--d1acj3b|xn--efvy88h|xn--estv75g|xn--fct429k|xn--fjq720a|xn--flw351e|xn--g2xx48c|xn--gecrj9c|xn--gk3at1e|xn--h2brj9c|xn--hxt814e|xn--imr513n|xn--j6w193g|xn--jvr189m|xn--kprw13d|xn--kpry57d|xn--kpu716f|xn--mgbbh1a|xn--mgbtx2b|xn--mix891f|xn--nyqy26a|xn--otu796d|xn--pbt977c|xn--pgbs0dh|xn--q9jyb4c|xn--rhqv96g|xn--rovu88b|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--vuq861b|xn--w4rs40l|xn--xhq521b|xn--zfr164b|சிங்கப்பூர்|accountant|apartments|associates|basketball|bnpparibas|boehringer|capitalone|consulting|creditcard|cuisinella|eurovision|extraspace|foundation|healthcare|immobilien|industries|management|mitsubishi|nationwide|newholland|nextdirect|onyourside|properties|protection|prudential|realestate|republican|restaurant|schaeffler|swiftcover|tatamotors|technology|telefonica|university|vistaprint|vlaanderen|volkswagen|xn--30rr7y|xn--3pxu8k|xn--45q11c|xn--4gbrim|xn--55qx5d|xn--5tzm5g|xn--80aswg|xn--90a3ac|xn--9dbq2a|xn--9et52u|xn--c2br7g|xn--cg4bki|xn--czrs0t|xn--czru2d|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--io0a7i|xn--kput3i|xn--mxtq1m|xn--o3cw4h|xn--pssy2u|xn--unup4y|xn--wgbh1c|xn--wgbl6a|xn--y9a3aq|accenture|alfaromeo|allfinanz|amsterdam|analytics|aquarelle|barcelona|bloomberg|christmas|community|directory|education|equipment|fairwinds|financial|firestone|fresenius|frontdoor|fujixerox|furniture|goldpoint|hisamitsu|homedepot|homegoods|homesense|honeywell|institute|insurance|kuokgroup|ladbrokes|lancaster|landrover|lifestyle|marketing|marshalls|melbourne|microsoft|panasonic|passagens|pramerica|richardli|scjohnson|shangrila|solutions|statebank|statefarm|stockholm|travelers|vacations|xn--90ais|xn--c1avg|xn--d1alf|xn--e1a4c|xn--fhbei|xn--j1aef|xn--j1amh|xn--l1acc|xn--ngbrx|xn--nqv7f|xn--p1acf|xn--tckwe|xn--vhquv|yodobashi|abudhabi|airforce|allstate|attorney|barclays|barefoot|bargains|baseball|boutique|bradesco|broadway|brussels|budapest|builders|business|capetown|catering|catholic|chrysler|cipriani|cityeats|cleaning|clinique|clothing|commbank|computer|delivery|deloitte|democrat|diamonds|discount|discover|download|engineer|ericsson|esurance|etisalat|everbank|exchange|feedback|fidelity|firmdale|football|frontier|goodyear|grainger|graphics|guardian|hdfcbank|helsinki|holdings|hospital|infiniti|ipiranga|istanbul|jpmorgan|lighting|lundbeck|marriott|maserati|mckinsey|memorial|merckmsd|mortgage|movistar|observer|partners|pharmacy|pictures|plumbing|property|redstone|reliance|saarland|samsclub|security|services|shopping|showtime|softbank|software|stcgroup|supplies|symantec|training|uconnect|vanguard|ventures|verisign|woodside|xn--90ae|xn--node|xn--p1ai|xn--qxam|yokohama|السعودية|abogado|academy|agakhan|alibaba|android|athleta|auction|audible|auspost|avianca|banamex|bauhaus|bentley|bestbuy|booking|brother|bugatti|capital|caravan|careers|cartier|channel|charity|chintai|citadel|clubmed|college|cologne|comcast|company|compare|contact|cooking|corsica|country|coupons|courses|cricket|cruises|dentist|digital|domains|exposed|express|farmers|fashion|ferrari|ferrero|finance|fishing|fitness|flights|florist|flowers|forsale|frogans|fujitsu|gallery|genting|godaddy|grocery|guitars|hamburg|hangout|hitachi|holiday|hosting|hoteles|hotmail|hyundai|iselect|ismaili|jewelry|juniper|kitchen|komatsu|lacaixa|lancome|lanxess|lasalle|latrobe|leclerc|liaison|limited|lincoln|markets|metlife|monster|netbank|netflix|network|neustar|okinawa|oldnavy|organic|origins|philips|pioneer|politie|realtor|recipes|rentals|reviews|rexroth|samsung|sandvik|schmidt|schwarz|science|shiksha|shriram|singles|staples|starhub|storage|support|surgery|systems|temasek|theater|theatre|tickets|tiffany|toshiba|trading|walmart|wanggou|watches|weather|website|wedding|whoswho|windows|winners|xfinity|yamaxun|youtube|zuerich|католик|اتصالات|الجزائر|العليان|پاکستان|كاثوليك|موبايلي|இந்தியா|abarth|abbott|abbvie|active|africa|agency|airbus|airtel|alipay|alsace|alstom|anquan|aramco|author|bayern|beauty|berlin|bharti|blanco|bostik|boston|broker|camera|career|caseih|casino|center|chanel|chrome|church|circle|claims|clinic|coffee|comsec|condos|coupon|credit|cruise|dating|datsun|dealer|degree|dental|design|direct|doctor|dunlop|dupont|durban|emerck|energy|estate|events|expert|family|flickr|futbol|gallup|garden|george|giving|global|google|gratis|health|hermes|hiphop|hockey|hotels|hughes|imamat|insure|intuit|jaguar|joburg|juegos|kaufen|kinder|kindle|kosher|lancia|latino|lawyer|lefrak|living|locker|london|luxury|madrid|maison|makeup|market|mattel|mobile|mobily|monash|mormon|moscow|museum|mutual|nagoya|natura|nissan|nissay|norton|nowruz|office|olayan|online|oracle|orange|otsuka|pfizer|photos|physio|piaget|pictet|quebec|racing|realty|reisen|repair|report|review|rocher|rogers|ryukyu|safety|sakura|sanofi|school|schule|search|secure|select|shouji|soccer|social|stream|studio|supply|suzuki|swatch|sydney|taipei|taobao|target|tattoo|tennis|tienda|tjmaxx|tkmaxx|toyota|travel|unicom|viajes|viking|villas|virgin|vision|voting|voyage|vuelos|walter|warman|webcam|xihuan|yachts|yandex|zappos|москва|онлайн|ابوظبي|ارامكو|الاردن|المغرب|امارات|فلسطين|مليسيا|भारतम्|இலங்கை|ファッション|actor|adult|aetna|amfam|amica|apple|archi|audio|autos|azure|baidu|beats|bible|bingo|black|boats|bosch|build|canon|cards|chase|cheap|cisco|citic|click|cloud|coach|codes|crown|cymru|dabur|dance|deals|delta|dodge|drive|dubai|earth|edeka|email|epost|epson|faith|fedex|final|forex|forum|gallo|games|gifts|gives|glade|glass|globo|gmail|green|gripe|group|gucci|guide|homes|honda|horse|house|hyatt|ikano|intel|irish|iveco|jetzt|koeln|kyoto|lamer|lease|legal|lexus|lilly|linde|lipsy|lixil|loans|locus|lotte|lotto|lupin|macys|mango|media|miami|money|mopar|movie|nadex|nexus|nikon|ninja|nokia|nowtv|omega|osaka|paris|parts|party|phone|photo|pizza|place|poker|praxi|press|prime|promo|quest|radio|rehab|reise|ricoh|rocks|rodeo|rugby|salon|sener|seven|sharp|shell|shoes|skype|sling|smart|smile|solar|space|sport|stada|store|study|style|sucks|swiss|tatar|tires|tirol|tmall|today|tokyo|tools|toray|total|tours|trade|trust|tunes|tushu|ubank|vegas|video|vodka|volvo|wales|watch|weber|weibo|works|world|xerox|yahoo|zippo|ایران|بازار|بھارت|سودان|سورية|همراه|भारोत|संगठन|বাংলা|భారత్|ഭാരതം|嘉里大酒店|aarp|able|adac|aero|aigo|akdn|ally|amex|arab|army|arpa|arte|asda|asia|audi|auto|baby|band|bank|bbva|beer|best|bike|bing|blog|blue|bofa|bond|book|buzz|cafe|call|camp|care|cars|casa|case|cash|cbre|cern|chat|citi|city|club|cool|coop|cyou|data|date|dclk|deal|dell|desi|diet|dish|docs|doha|duck|duns|dvag|erni|fage|fail|fans|farm|fast|fiat|fido|film|fire|fish|flir|food|ford|free|fund|game|gbiz|gent|ggee|gift|gmbh|gold|golf|goog|guge|guru|hair|haus|hdfc|help|here|hgtv|host|hsbc|icbc|ieee|imdb|immo|info|itau|java|jeep|jobs|jprs|kddi|kiwi|kpmg|kred|land|lego|lgbt|lidl|life|like|limo|link|live|loan|loft|love|ltda|luxe|maif|meet|meme|menu|mini|mint|mobi|moda|moto|name|navy|news|next|nico|nike|ollo|open|page|pars|pccw|pics|ping|pink|play|plus|pohl|porn|post|prod|prof|qpon|raid|read|reit|rent|rest|rich|rmit|room|rsvp|ruhr|safe|sale|sarl|save|saxo|scor|scot|seat|seek|sexy|shaw|shia|shop|show|silk|sina|site|skin|sncf|sohu|song|sony|spot|star|surf|talk|taxi|team|tech|teva|tiaa|tips|town|toys|tube|vana|visa|viva|vivo|vote|voto|wang|weir|wien|wiki|wine|work|xbox|yoga|zara|zero|zone|дети|сайт|بارت|بيتك|ڀارت|تونس|شبكة|عراق|عمان|موقع|भारत|ভারত|ভাৰত|ਭਾਰਤ|ભારત|ଭାରତ|ಭಾರತ|ලංකා|グーグル|クラウド|ポイント|大众汽车|组织机构|電訊盈科|香格里拉|aaa|abb|abc|aco|ads|aeg|afl|aig|anz|aol|app|art|aws|axa|bar|bbc|bbt|bcg|bcn|bet|bid|bio|biz|bms|bmw|bnl|bom|boo|bot|box|buy|bzh|cab|cal|cam|car|cat|cba|cbn|cbs|ceb|ceo|cfa|cfd|com|crs|csc|dad|day|dds|dev|dhl|diy|dnp|dog|dot|dtv|dvr|eat|eco|edu|esq|eus|fan|fit|fly|foo|fox|frl|ftr|fun|fyi|gal|gap|gdn|gea|gle|gmo|gmx|goo|gop|got|gov|hbo|hiv|hkt|hot|how|ibm|ice|icu|ifm|inc|ing|ink|int|ist|itv|jcb|jcp|jio|jll|jmp|jnj|jot|joy|kfh|kia|kim|kpn|krd|lat|law|lds|llc|lol|lpl|ltd|man|map|mba|med|men|mil|mit|mlb|mls|mma|moe|moi|mom|mov|msd|mtn|mtr|nab|nba|nec|net|new|nfl|ngo|nhk|now|nra|nrw|ntt|nyc|obi|off|one|ong|onl|ooo|org|ott|ovh|pay|pet|phd|pid|pin|pnc|pro|pru|pub|pwc|qvc|red|ren|ril|rio|rip|run|rwe|sap|sas|sbi|sbs|sca|scb|ses|sew|sex|sfr|ski|sky|soy|srl|srt|stc|tab|tax|tci|tdk|tel|thd|tjx|top|trv|tui|tvs|ubs|uno|uol|ups|vet|vig|vin|vip|wed|win|wme|wow|wtc|wtf|xin|xxx|xyz|you|yun|zip|бел|ком|қаз|мкд|мон|орг|рус|срб|укр|հայ|קום|عرب|قطر|كوم|مصر|कॉम|नेट|คอม|ไทย|ストア|セール|みんな|中文网|天主教|我爱你|新加坡|淡马锡|诺基亚|飞利浦|ac|ad|ae|af|ag|ai|al|am|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw|ελ|бг|ею|рф|გე|닷넷|닷컴|삼성|한국|コム|世界|中信|中国|中國|企业|佛山|信息|健康|八卦|公司|公益|台湾|台灣|商城|商店|商标|嘉里|在线|大拿|娱乐|家電|工行|广东|微博|慈善|手机|手表|招聘|政务|政府|新闻|时尚|書籍|机构|游戏|澳門|点看|珠宝|移动|网址|网店|网站|网络|联通|谷歌|购物|通販|集团|食品|餐厅|香港)/,q=function(n){function t(){var t,e,u=null!==n&&n.apply(this,arguments)||this;return u.matcherRegex=(t=M+"!#$%&'*+\\-\\/=?^_`{|}~",e=new RegExp("(?:["+t+"](?:["+t+']|\\.(?!\\.|@))*|\\"['+(t+'\\s"(),:;<>@\\[\\]')+'.]+\\")@'),new RegExp([e.source,z(1),"\\.",R.source].join(""),"gi")),u}return i(t,n),t.prototype.parseMatches=function(t){for(var e,u=this.matcherRegex,n=this.tagBuilder,r=[];null!==(e=u.exec(t));){var i=e[0];r.push(new y({tagBuilder:n,matchedText:i,offset:e.index,email:i}))}return r},t}(w),S=function(){function t(){}return t.isValid=function(t,e){return!(e&&!this.isValidUriScheme(e)||this.urlMatchDoesNotHaveProtocolOrDot(t,e)||this.urlMatchDoesNotHaveAtLeastOneWordChar(t,e)&&!this.isValidIpAddress(t)||this.containsMultipleDots(t))},t.isValidIpAddress=function(t){var e=new RegExp(this.hasFullProtocolRegex.source+this.ipRegex.source);return null!==t.match(e)},t.containsMultipleDots=function(t){var e=t;return this.hasFullProtocolRegex.test(t)&&(e=t.split("://")[1]),-1<e.split("/")[0].indexOf("..")},t.isValidUriScheme=function(t){var e=t.match(this.uriSchemeRegex),u=e&&e[0].toLowerCase();return"javascript:"!==u&&"vbscript:"!==u},t.urlMatchDoesNotHaveProtocolOrDot=function(t,e){return!(!t||e&&this.hasFullProtocolRegex.test(e)||-1!==t.indexOf("."))},t.urlMatchDoesNotHaveAtLeastOneWordChar=function(t,e){return!(!t||!e)&&!this.hasWordCharAfterProtocolRegex.test(t)},t.hasFullProtocolRegex=/^[A-Za-z][-.+A-Za-z0-9]*:\/\//,t.uriSchemeRegex=/^[A-Za-z][-.+A-Za-z0-9]*:/,t.hasWordCharAfterProtocolRegex=new RegExp(":[^\\s]*?["+E+"]"),t.ipRegex=/[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?(:[0-9]*)?\/?$/,t}(),H=function(n){function t(t){var e,u=n.call(this,t)||this;return u.stripPrefix={scheme:!0,www:!0},u.stripTrailingSlash=!0,u.decodePercentEncoding=!0,u.matcherRegex=(e=new RegExp("[/?#](?:["+M+"\\-+&@#/%=~_()|'$*\\[\\]?!:,.;✓]*["+M+"\\-+&@#/%=~_()|'$*\\[\\]✓])?"),new RegExp(["(?:","(",/(?:[A-Za-z][-.+A-Za-z0-9]{0,63}:(?![A-Za-z][-.+A-Za-z0-9]{0,63}:\/\/)(?!\d+\/?)(?:\/\/)?)/.source,z(2),")","|","(","(//)?",/(?:www\.)/.source,z(6),")","|","(","(//)?",z(10)+"\\.",R.source,"(?![-"+T+"])",")",")","(?::[0-9]+)?","(?:"+e.source+")?"].join(""),"gi")),u.wordCharRegExp=new RegExp("["+M+"]"),u.openParensRe=/\(/g,u.closeParensRe=/\)/g,u.stripPrefix=t.stripPrefix,u.stripTrailingSlash=t.stripTrailingSlash,u.decodePercentEncoding=t.decodePercentEncoding,u}return i(t,n),t.prototype.parseMatches=function(t){for(var e,u=this.matcherRegex,n=this.stripPrefix,r=this.stripTrailingSlash,i=this.decodePercentEncoding,a=this.tagBuilder,s=[];null!==(e=u.exec(t));){var o=e[0],c=e[1],h=e[4],l=e[5],p=e[9],g=e.index,f=l||p,m=t.charAt(g-1);if(S.isValid(o,c)&&!(0<g&&"@"===m||0<g&&f&&this.wordCharRegExp.test(m))){if(/\?$/.test(o)&&(o=o.substr(0,o.length-1)),this.matchHasUnbalancedClosingParen(o))o=o.substr(0,o.length-1);else{var d=this.matchHasInvalidCharAfterTld(o,c);-1<d&&(o=o.substr(0,d))}var A=c?"scheme":h?"www":"tld",x=!!c;s.push(new C({tagBuilder:a,matchedText:o,offset:g,urlMatchType:A,url:o,protocolUrlMatch:x,protocolRelativeMatch:!!f,stripPrefix:n,stripTrailingSlash:r,decodePercentEncoding:i}))}}return s},t.prototype.matchHasUnbalancedClosingParen=function(t){if(")"===t.charAt(t.length-1)){var e=t.match(this.openParensRe),u=t.match(this.closeParensRe);if((e&&e.length||0)<(u&&u.length||0))return!0}return!1},t.prototype.matchHasInvalidCharAfterTld=function(t,e){if(!t)return-1;var u=0;e&&(u=t.indexOf(":"),t=t.slice(u));var n=new RegExp("^((.?//)?[-."+M+"]*[-"+M+"]\\.[-"+M+"]+)").exec(t);return null===n?-1:(u+=n[1].length,t=t.slice(n[1].length),/^[^-.A-Za-z0-9:\/?#]/.test(t)?u:-1)},t}(w),O=function(u){function t(t){var e=u.call(this,t)||this;return e.serviceName="twitter",e.matcherRegex=new RegExp("#[_"+M+"]{1,139}(?![_"+M+"])","g"),e.nonWordCharRegex=new RegExp("[^"+M+"]"),e.serviceName=t.serviceName,e}return i(t,u),t.prototype.parseMatches=function(t){for(var e,u=this.matcherRegex,n=this.nonWordCharRegex,r=this.serviceName,i=this.tagBuilder,a=[];null!==(e=u.exec(t));){var s=e.index,o=t.charAt(s-1);if(0===s||n.test(o)){var c=e[0],h=e[0].slice(1);a.push(new F({tagBuilder:i,matchedText:c,offset:s,serviceName:r,hashtag:h}))}}return a},t}(w),_=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.matcherRegex=/(?:(?:(?:(\+)?\d{1,3}[-\040.]?)?\(?\d{3}\)?[-\040.]?\d{3}[-\040.]?\d{4})|(?:(\+)(?:9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)[-\040.]?(?:\d[-\040.]?){6,12}\d+))([,;]+[0-9]+#?)*/g,t}return i(t,e),t.prototype.parseMatches=function(t){for(var e,u=this.matcherRegex,n=this.tagBuilder,r=[];null!==(e=u.exec(t));){var i=e[0],a=i.replace(/[^0-9,;#]/g,""),s=!(!e[1]&&!e[2]),o=0==e.index?"":t.substr(e.index-1,1),c=t.substr(e.index+i.length,1),h=!o.match(/\d/)&&!c.match(/\d/);this.testMatch(e[3])&&this.testMatch(i)&&h&&r.push(new v({tagBuilder:n,matchedText:i,offset:e.index,number:a,plusSign:s}))}return r},t.prototype.testMatch=function(t){return/\D/.test(t)},t}(w),U=function(u){function t(t){var e=u.call(this,t)||this;return e.serviceName="twitter",e.matcherRegexes={twitter:new RegExp("@[_"+M+"]{1,50}(?![_"+M+"])","g"),instagram:new RegExp("@[_."+M+"]{1,30}(?![_"+M+"])","g"),soundcloud:new RegExp("@[-_."+M+"]{1,50}(?![-_"+M+"])","g")},e.nonWordCharRegex=new RegExp("[^"+M+"]"),e.serviceName=t.serviceName,e}return i(t,u),t.prototype.parseMatches=function(t){var e,u=this.serviceName,n=this.matcherRegexes[this.serviceName],r=this.nonWordCharRegex,i=this.tagBuilder,a=[];if(!n)return a;for(;null!==(e=n.exec(t));){var s=e.index,o=t.charAt(s-1);if(0===s||r.test(o)){var c=e[0].replace(/\.+$/g,""),h=c.slice(1);a.push(new B({tagBuilder:i,matchedText:c,offset:s,serviceName:u,mention:h}))}}return a},t}(w);return function(){function n(t){void 0===t&&(t={}),this.version=n.version,this.urls={},this.email=!0,this.phone=!0,this.hashtag=!1,this.mention=!1,this.newWindow=!0,this.stripPrefix={scheme:!0,www:!0},this.stripTrailingSlash=!0,this.decodePercentEncoding=!0,this.truncate={length:0,location:"end"},this.className="",this.replaceFn=null,this.context=void 0,this.htmlParser=new x,this.matchers=null,this.tagBuilder=null,this.urls=this.normalizeUrlsCfg(t.urls),this.email="boolean"==typeof t.email?t.email:this.email,this.phone="boolean"==typeof t.phone?t.phone:this.phone,this.hashtag=t.hashtag||this.hashtag,this.mention=t.mention||this.mention,this.newWindow="boolean"==typeof t.newWindow?t.newWindow:this.newWindow,this.stripPrefix=this.normalizeStripPrefixCfg(t.stripPrefix),this.stripTrailingSlash="boolean"==typeof t.stripTrailingSlash?t.stripTrailingSlash:this.stripTrailingSlash,this.decodePercentEncoding="boolean"==typeof t.decodePercentEncoding?t.decodePercentEncoding:this.decodePercentEncoding;var e=this.mention;if(!1!==e&&"twitter"!==e&&"instagram"!==e&&"soundcloud"!==e)throw new Error("invalid `mention` cfg - see docs");var u=this.hashtag;if(!1!==u&&"twitter"!==u&&"facebook"!==u&&"instagram"!==u)throw new Error("invalid `hashtag` cfg - see docs");this.truncate=this.normalizeTruncateCfg(t.truncate),this.className=t.className||this.className,this.replaceFn=t.replaceFn||this.replaceFn,this.context=t.context||this}return n.link=function(t,e){return new n(e).link(t)},n.parse=function(t,e){return new n(e).parse(t)},n.prototype.normalizeUrlsCfg=function(t){return null==t&&(t=!0),"boolean"==typeof t?{schemeMatches:t,wwwMatches:t,tldMatches:t}:{schemeMatches:"boolean"!=typeof t.schemeMatches||t.schemeMatches,wwwMatches:"boolean"!=typeof t.wwwMatches||t.wwwMatches,tldMatches:"boolean"!=typeof t.tldMatches||t.tldMatches}},n.prototype.normalizeStripPrefixCfg=function(t){return null==t&&(t=!0),"boolean"==typeof t?{scheme:t,www:t}:{scheme:"boolean"!=typeof t.scheme||t.scheme,www:"boolean"!=typeof t.www||t.www}},n.prototype.normalizeTruncateCfg=function(t){return"number"==typeof t?{length:t,location:"end"}:function(t,e){for(var u in e)e.hasOwnProperty(u)&&void 0===t[u]&&(t[u]=e[u]);return t}(t||{},{length:Number.POSITIVE_INFINITY,location:"end"})},n.prototype.parse=function(t){for(var e=this.htmlParser.parse(t),u=["a","style","script"],n=0,r=[],i=0,a=e.length;i<a;i++){var s=e[i],o=s.getType();if("element"===o&&-1!==u.indexOf(s.getTagName()))s.isClosing()?n=Math.max(n-1,0):n++;else if("text"===o&&0===n){var c=this.parseText(s.getText(),s.getOffset());r.push.apply(r,c)}}return r=this.compactMatches(r),r=this.removeUnwantedMatches(r)},n.prototype.compactMatches=function(t){t.sort(function(t,e){return t.getOffset()-e.getOffset()});for(var e=0;e<t.length-1;e++){var u=t[e],n=u.getOffset(),r=u.getMatchedText().length,i=n+r;if(e+1<t.length){if(t[e+1].getOffset()===n){var a=t[e+1].getMatchedText().length>r?e:e+1;t.splice(a,1);continue}t[e+1].getOffset()<i&&t.splice(e+1,1)}}return t},n.prototype.removeUnwantedMatches=function(t){return this.hashtag||e(t,function(t){return"hashtag"===t.getType()}),this.email||e(t,function(t){return"email"===t.getType()}),this.phone||e(t,function(t){return"phone"===t.getType()}),this.mention||e(t,function(t){return"mention"===t.getType()}),this.urls.schemeMatches||e(t,function(t){return"url"===t.getType()&&"scheme"===t.getUrlMatchType()}),this.urls.wwwMatches||e(t,function(t){return"url"===t.getType()&&"www"===t.getUrlMatchType()}),this.urls.tldMatches||e(t,function(t){return"url"===t.getType()&&"tld"===t.getUrlMatchType()}),t},n.prototype.parseText=function(t,e){void 0===e&&(e=0),e=e||0;for(var u=this.getMatchers(),n=[],r=0,i=u.length;r<i;r++){for(var a=u[r].parseMatches(t),s=0,o=a.length;s<o;s++)a[s].setOffset(e+a[s].getOffset());n.push.apply(n,a)}return n},n.prototype.link=function(t){if(!t)return"";for(var e=this.parse(t),u=[],n=0,r=0,i=e.length;r<i;r++){var a=e[r];u.push(t.substring(n,a.getOffset())),u.push(this.createMatchReturnVal(a)),n=a.getOffset()+a.getMatchedText().length}return u.push(t.substring(n)),u.join("")},n.prototype.createMatchReturnVal=function(t){var e;return this.replaceFn&&(e=this.replaceFn.call(this.context,t)),"string"==typeof e?e:!1===e?t.getMatchedText():e instanceof u?e.toAnchorString():t.buildTag().toAnchorString()},n.prototype.getMatchers=function(){if(this.matchers)return this.matchers;var t=this.getTagBuilder(),e=[new O({tagBuilder:t,serviceName:this.hashtag}),new q({tagBuilder:t}),new _({tagBuilder:t}),new U({tagBuilder:t,serviceName:this.mention}),new H({tagBuilder:t,stripPrefix:this.stripPrefix,stripTrailingSlash:this.stripTrailingSlash,decodePercentEncoding:this.decodePercentEncoding})];return this.matchers=e},n.prototype.getTagBuilder=function(){var t=this.tagBuilder;return t||(t=this.tagBuilder=new r({newWindow:this.newWindow,truncate:this.truncate,className:this.className})),t},n.version="2.2.2",n.AnchorTagBuilder=r,n.HtmlTag=u,n.matcher={Email:q,Hashtag:O,Matcher:w,Mention:U,Phone:_,Url:H},n.match={Email:y,Hashtag:F,Match:b,Mention:B,Phone:v,Url:C},n}()});
//# sourceMappingURL=Autolinker.min.js.map

/*eslint-enable*/
