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
                //this.tagInput.autocomplete({source:streamerArray_AutoComplete}).bind('autocompleteopen.tagit', function(event, ui){
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
/*eslint-enable*/