import {ADD_DEBUG} from "libs/nomo-utils.js";

const hlsdebug = 0;
const hlsdebug_console = 0;
var ADD_XMLHttpRequest;

function HLS_DEBUG(/**/){
    if(hlsdebug_console){
        var args = arguments,
            args_length = args.length,
            args_copy = args;
        for (var i=args_length;i>0;i--){
            args[i] = args_copy[i-1];
        }
        args[0] = "+[new_xhr]  ";
        args.length = args_length + 1;
        console.log.apply(console, args);
    }
}    

class new_xhr {
    constructor(){
        this.method;
        this.url;
        this.headers = {
            // "accept": "*/*",
            // "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
            // "if-modified-since": "Tue, 04 Oct 2022 21:26:21 GMT",
            // "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
            // "sec-ch-ua-mobile": "?0",
            // "sec-ch-ua-platform": "\"Windows\"",
            // "sec-fetch-dest": "empty",
            // "sec-fetch-mode": "cors",
            // "sec-fetch-site": "none"
        };
        this.async;
        this.user;
        this.password;

        this.details = {};

        this.response;
        this.responseText;
        this.responseType;
        this.responseURL;
        this.responseXML;
        this.responseHeaders;
        this.status;
        this.statusText;
        this.timeout;
        this.upload;
        this.withCredentials;

        // method
        this.abort;
        this.getAllResponseHeaders = function(){
            HLS_DEBUG("getAllResponseHeaders", this.responseHeaders);
            return this.responseHeaders;
        };
        this.getResponseHeader = function(headerName){
            HLS_DEBUG("getResponseHeader", headerName);
            var obj = {};
            var responseHeadersAry = this.responseHeaders.split("\r\n");
            for(var i=0;i<responseHeadersAry.length;i++){
                var temp = this.responseHeaders.split(": ");
                if(temp[0].toLowerCase() === headerName.toLowerCase()){
                    return temp[1];
                }
            }
            return undefined;
        };
        this.open = function(method, url, async, user, password){
            this.method = method;
            this.url = url;
            this.async = async;
            this.user = user;
            this.password = password;
        };
        this.overrideMimeType;
        this.send = function(body){
            var that = this;
            HLS_DEBUG("send. that", that, body);

            HLS_DEBUG("XMLHttpRequest by new_xhr");

            this.details.method = this.method;
            this.details.url = this.url;
            this.details.headers = this.headers;

            if(body !== undefined){
                this.details.data = body;
            }
            //this.details.cookie
            //this.details.binary
            //this.details.nocache
            //this.details.revalidate
            if(this.timeout !== undefined){
                this.details.timeout = this.timeout;
            }
            else{
                this.details.timeout = 2000;
            }
            if(this.responseType !== undefined){
                this.details.responseType = this.responseType;
            }
            if(this.responseType !== undefined){
                this.details.responseType = this.responseType;
            }
            if(this.overrideMimeType !== undefined){
                this.details.overrideMimeType = this.overrideMimeType;
            }
            if(this.anonymous !== undefined){
                this.details.anonymous = this.anonymous;
            }
            //fetch
            if(this.user !== undefined){
                this.details.user = this.user;
            }
            if(this.password !== undefined){
                this.details.password = this.password;
            }
            if(this.onabort !== undefined){
                this.details.onabort = this.onabort;
            }
            if(this.onerror !== undefined){
                this.details.onerror = this.onerror;
            }
            if(this.onloadstart !== undefined){
                this.details.onloadstart = this.onloadstart;
            }
            if(this.onprogress !== undefined){
                this.details.onprogress = this.onprogress;
            }
            this.details.onreadystatechange = function(e){
                HLS_DEBUG("onreadystatechange", e);
                that.readyState = e.readyState;
                that.responseHeaders = e.responseHeaders;
                that.status = e.status;
                that.statusText = e.statusText;
                that.response = e.response;
                that.responseText = e.responseText;
                that.responseXML = e.responseXML;
                
                if(that.onreadystatechange !== undefined){
                    that.onreadystatechange.apply(this, arguments);
                }
                if(that.readystatechange !== undefined){
                    that.readystatechange.apply(this, arguments);
                }
            };

            if(this.ontimeout !== undefined){
                this.details.ontimeout = this.ontimeout;
            }

            this.details.onload = function(response){
                try{
                    HLS_DEBUG("onload", response);
                    that.status = response.status;
                    that.statusText = response.statusText;
                    that.response = response.response;
                    if("arraybuffer" !== response.responseType){
                        that.responseText = response.responseText;
                    }
                    that.responseXML = response.responseXML;

                    if(that.onload !== undefined){
                        that.onload.apply(this, arguments);
                    }
                    if(that.load !== undefined){
                        that.load.apply(this, arguments);
                    }
                }
                catch(e){
                    HLS_DEBUG("error from onload", e);
                }
            };

            HLS_DEBUG("GM_xmlhttpRequest", this.details);
            var returnobj = GM_xmlhttpRequest(this.details);
            this.abort = function(){
                HLS_DEBUG("abort");
                returnobj.abort();
            };
        };
        this.setRequestHeader = function(header, value){
            HLS_DEBUG("setRequestHeader", header, value);
            this.headers[header] = value;
        };
    }
}

export function loadhls(){

    //var test = new new_xhr;
    //console.log("test.response", test.response);
    //unsafeWindow.XMLHttpRequest = new_xhr;

    ADD_DEBUG("ADD_config.m3u8_type = ", ADD_config.m3u8_type);
    if(ADD_config.m3u8_type === "legacy"){
        ADD_XMLHttpRequest = XMLHttpRequest;
    }
    else{
        //unsafeWindow.XMLHttpRequest = new_xhr;
        ADD_XMLHttpRequest = new_xhr;
    }

    // hls.js
    // https://github.com/video-dev/hls.js/
    // Apache 2.0 License
    // only changed XMLHttpRequest to GM_xmlhttpRequest
    "undefined" != typeof window && function (t, e) {
        t.newHls = e();
    }(window, (function () {
        return function (t) {
            var e = {};
    
            function i(r) {
                if (e[r]) return e[r].exports;
                var n = e[r] = {
                    i: r,
                    l: !1,
                    exports: {}
                };
                return t[r].call(n.exports, n, n.exports, i), n.l = !0, n.exports
            }
            return i.m = t, i.c = e, i.d = function (t, e, r) {
                i.o(t, e) || Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: r
                })
            }, i.r = function (t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(t, "__esModule", {
                    value: !0
                })
            }, i.t = function (t, e) {
                if (1 & e && (t = i(t)), 8 & e) return t;
                if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                var r = Object.create(null);
                if (i.r(r), Object.defineProperty(r, "default", {
                        enumerable: !0,
                        value: t
                    }), 2 & e && "string" != typeof t)
                    for (var n in t) i.d(r, n, function (e) {
                        return t[e]
                    }.bind(null, n));
                return r
            }, i.n = function (t) {
                var e = t && t.__esModule ? function () {
                    return t.default
                } : function () {
                    return t
                };
                return i.d(e, "a", e), e
            }, i.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }, i.p = "/dist/", i(i.s = 20)
        }([function (t, e, i) {
            "use strict";
            var r;
            i.d(e, "a", (function () {
                    return r
                })),
                function (t) {
                    t.MEDIA_ATTACHING = "hlsMediaAttaching", t.MEDIA_ATTACHED = "hlsMediaAttached", t.MEDIA_DETACHING = "hlsMediaDetaching", t.MEDIA_DETACHED = "hlsMediaDetached", t.BUFFER_RESET = "hlsBufferReset", t.BUFFER_CODECS = "hlsBufferCodecs", t.BUFFER_CREATED = "hlsBufferCreated", t.BUFFER_APPENDING = "hlsBufferAppending", t.BUFFER_APPENDED = "hlsBufferAppended", t.BUFFER_EOS = "hlsBufferEos", t.BUFFER_FLUSHING = "hlsBufferFlushing", t.BUFFER_FLUSHED = "hlsBufferFlushed", t.MANIFEST_LOADING = "hlsManifestLoading", t.MANIFEST_LOADED = "hlsManifestLoaded", t.MANIFEST_PARSED = "hlsManifestParsed", t.LEVEL_SWITCHING = "hlsLevelSwitching", t.LEVEL_SWITCHED = "hlsLevelSwitched", t.LEVEL_LOADING = "hlsLevelLoading", t.LEVEL_LOADED = "hlsLevelLoaded", t.LEVEL_UPDATED = "hlsLevelUpdated", t.LEVEL_PTS_UPDATED = "hlsLevelPtsUpdated", t.LEVELS_UPDATED = "hlsLevelsUpdated", t.AUDIO_TRACKS_UPDATED = "hlsAudioTracksUpdated", t.AUDIO_TRACK_SWITCHING = "hlsAudioTrackSwitching", t.AUDIO_TRACK_SWITCHED = "hlsAudioTrackSwitched", t.AUDIO_TRACK_LOADING = "hlsAudioTrackLoading", t.AUDIO_TRACK_LOADED = "hlsAudioTrackLoaded", t.SUBTITLE_TRACKS_UPDATED = "hlsSubtitleTracksUpdated", t.SUBTITLE_TRACKS_CLEARED = "hlsSubtitleTracksCleared", t.SUBTITLE_TRACK_SWITCH = "hlsSubtitleTrackSwitch", t.SUBTITLE_TRACK_LOADING = "hlsSubtitleTrackLoading", t.SUBTITLE_TRACK_LOADED = "hlsSubtitleTrackLoaded", t.SUBTITLE_FRAG_PROCESSED = "hlsSubtitleFragProcessed", t.CUES_PARSED = "hlsCuesParsed", t.NON_NATIVE_TEXT_TRACKS_FOUND = "hlsNonNativeTextTracksFound", t.INIT_PTS_FOUND = "hlsInitPtsFound", t.FRAG_LOADING = "hlsFragLoading", t.FRAG_LOAD_EMERGENCY_ABORTED = "hlsFragLoadEmergencyAborted", t.FRAG_LOADED = "hlsFragLoaded", t.FRAG_DECRYPTED = "hlsFragDecrypted", t.FRAG_PARSING_INIT_SEGMENT = "hlsFragParsingInitSegment", t.FRAG_PARSING_USERDATA = "hlsFragParsingUserdata", t.FRAG_PARSING_METADATA = "hlsFragParsingMetadata", t.FRAG_PARSED = "hlsFragParsed", t.FRAG_BUFFERED = "hlsFragBuffered", t.FRAG_CHANGED = "hlsFragChanged", t.FPS_DROP = "hlsFpsDrop", t.FPS_DROP_LEVEL_CAPPING = "hlsFpsDropLevelCapping", t.ERROR = "hlsError", t.DESTROYING = "hlsDestroying", t.KEY_LOADING = "hlsKeyLoading", t.KEY_LOADED = "hlsKeyLoaded", t.LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached", t.BACK_BUFFER_REACHED = "hlsBackBufferReached"
                }(r || (r = {}))
        }, function (t, e, i) {
            "use strict";
            i.d(e, "a", (function () {
                return o
            })), i.d(e, "b", (function () {
                return l
            }));
            var r = function () {},
                n = {
                    trace: r,
                    debug: r,
                    log: r,
                    warn: r,
                    info: r,
                    error: r
                },
                a = n;
    
            function s(t) {
                var e = self.console[t];
                return e ? e.bind(self.console, "[" + t + "] >") : r
            }
    
            function o(t) {
                if (self.console && !0 === t || "object" == typeof t) {
                    ! function (t) {
                        for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) i[r - 1] = arguments[r];
                        i.forEach((function (e) {
                            a[e] = t[e] ? t[e].bind(t) : s(e)
                        }))
                    }(t, "debug", "log", "info", "warn", "error");
                    try {
                        a.log()
                    } catch (t) {
                        a = n
                    }
                } else a = n
            }
            var l = n
        }, function (t, e, i) {
            "use strict";
            var r, n;
            i.d(e, "b", (function () {
                    return r
                })), i.d(e, "a", (function () {
                    return n
                })),
                function (t) {
                    t.NETWORK_ERROR = "networkError", t.MEDIA_ERROR = "mediaError", t.KEY_SYSTEM_ERROR = "keySystemError", t.MUX_ERROR = "muxError", t.OTHER_ERROR = "otherError"
                }(r || (r = {})),
                function (t) {
                    t.KEY_SYSTEM_NO_KEYS = "keySystemNoKeys", t.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess", t.KEY_SYSTEM_NO_SESSION = "keySystemNoSession", t.KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed", t.KEY_SYSTEM_NO_INIT_DATA = "keySystemNoInitData", t.MANIFEST_LOAD_ERROR = "manifestLoadError", t.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut", t.MANIFEST_PARSING_ERROR = "manifestParsingError", t.MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError", t.LEVEL_EMPTY_ERROR = "levelEmptyError", t.LEVEL_LOAD_ERROR = "levelLoadError", t.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut", t.LEVEL_SWITCH_ERROR = "levelSwitchError", t.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError", t.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut", t.SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError", t.SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut", t.FRAG_LOAD_ERROR = "fragLoadError", t.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut", t.FRAG_DECRYPT_ERROR = "fragDecryptError", t.FRAG_PARSING_ERROR = "fragParsingError", t.REMUX_ALLOC_ERROR = "remuxAllocError", t.KEY_LOAD_ERROR = "keyLoadError", t.KEY_LOAD_TIMEOUT = "keyLoadTimeOut", t.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError", t.BUFFER_INCOMPATIBLE_CODECS_ERROR = "bufferIncompatibleCodecsError", t.BUFFER_APPEND_ERROR = "bufferAppendError", t.BUFFER_APPENDING_ERROR = "bufferAppendingError", t.BUFFER_STALLED_ERROR = "bufferStalledError", t.BUFFER_FULL_ERROR = "bufferFullError", t.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole", t.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall", t.INTERNAL_EXCEPTION = "internalException", t.INTERNAL_ABORTED = "aborted", t.UNKNOWN = "unknown"
                }(n || (n = {}))
        }, function (t, e, i) {
            "use strict";
            i.d(e, "a", (function () {
                return r
            }));
            var r = Number.isFinite || function (t) {
                return "number" == typeof t && isFinite(t)
            };
            Number.MAX_SAFE_INTEGER
        }, function (t, e, i) {
            "use strict";
            var r, n;
            i.d(e, "a", (function () {
                    return r
                })), i.d(e, "b", (function () {
                    return n
                })),
                function (t) {
                    t.MANIFEST = "manifest", t.LEVEL = "level", t.AUDIO_TRACK = "audioTrack", t.SUBTITLE_TRACK = "subtitleTrack"
                }(r || (r = {})),
                function (t) {
                    t.MAIN = "main", t.AUDIO = "audio", t.SUBTITLE = "subtitle"
                }(n || (n = {}))
        }, function (t, e, i) {
            "use strict";
            i.d(e, "a", (function () {
                return l
            })), i.d(e, "c", (function () {
                return g
            })), i.d(e, "k", (function () {
                return v
            })), i.d(e, "h", (function () {
                return p
            })), i.d(e, "e", (function () {
                return m
            })), i.d(e, "d", (function () {
                return y
            })), i.d(e, "f", (function () {
                return b
            })), i.d(e, "l", (function () {
                return E
            })), i.d(e, "b", (function () {
                return S
            })), i.d(e, "j", (function () {
                return L
            })), i.d(e, "i", (function () {
                return D
            })), i.d(e, "g", (function () {
                return R
            }));
            var r = i(9),
                n = i(6),
                a = i(7),
                s = Math.pow(2, 32) - 1,
                o = [].push,
                l = {
                    video: 1,
                    audio: 2,
                    id3: 3,
                    text: 4
                };
    
            function u(t) {
                return String.fromCharCode.apply(null, t)
            }
    
            function h(t, e) {
                var i = t[e] << 8 | t[e + 1];
                return i < 0 ? 65536 + i : i
            }
    
            function d(t, e) {
                var i = c(t, e);
                return i < 0 ? 4294967296 + i : i
            }
    
            function c(t, e) {
                return t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3]
            }
    
            function f(t, e, i) {
                t[e] = i >> 24, t[e + 1] = i >> 16 & 255, t[e + 2] = i >> 8 & 255, t[e + 3] = 255 & i
            }
    
            function g(t, e) {
                var i = [];
                if (!e.length) return i;
                for (var r = t.byteLength, n = 0; n < r;) {
                    var a = d(t, n),
                        s = a > 1 ? n + a : r;
                    if (u(t.subarray(n + 4, n + 8)) === e[0])
                        if (1 === e.length) i.push(t.subarray(n + 8, s));
                        else {
                            var l = g(t.subarray(n + 8, s), e.slice(1));
                            l.length && o.apply(i, l)
                        } n = s
                }
                return i
            }
    
            function v(t) {
                var e = [],
                    i = t[0],
                    r = 8,
                    n = d(t, r);
                r += 4;
                r += 0 === i ? 8 : 16, r += 2;
                var a = t.length + 0,
                    s = h(t, r);
                r += 2;
                for (var o = 0; o < s; o++) {
                    var l = r,
                        u = d(t, l);
                    l += 4;
                    var c = 2147483647 & u;
                    if (1 === (2147483648 & u) >>> 31) return console.warn("SIDX has hierarchical references (not supported)"), null;
                    var f = d(t, l);
                    l += 4, e.push({
                        referenceSize: c,
                        subsegmentDuration: f,
                        info: {
                            duration: f / n,
                            start: a,
                            end: a + c - 1
                        }
                    }), a += c, r = l += 4
                }
                return {
                    earliestPresentationTime: 0,
                    timescale: n,
                    version: i,
                    referencesCount: s,
                    references: e
                }
            }
    
            function p(t) {
                for (var e = [], i = g(t, ["moov", "trak"]), r = 0; r < i.length; r++) {
                    var a = i[r],
                        s = g(a, ["tkhd"])[0];
                    if (s) {
                        var o = s[0],
                            l = 0 === o ? 12 : 20,
                            h = d(s, l),
                            c = g(a, ["mdia", "mdhd"])[0];
                        if (c) {
                            var f = d(c, l = 0 === (o = c[0]) ? 12 : 20),
                                v = g(a, ["mdia", "hdlr"])[0];
                            if (v) {
                                var p = u(v.subarray(8, 12)),
                                    m = {
                                        soun: n.a.AUDIO,
                                        vide: n.a.VIDEO
                                    } [p];
                                if (m) {
                                    var y = g(a, ["mdia", "minf", "stbl", "stsd"])[0],
                                        T = void 0;
                                    y && (T = u(y.subarray(12, 16))), e[h] = {
                                        timescale: f,
                                        type: m
                                    }, e[m] = {
                                        timescale: f,
                                        id: h,
                                        codec: T
                                    }
                                }
                            }
                        }
                    }
                }
                return g(t, ["moov", "mvex", "trex"]).forEach((function (t) {
                    var i = d(t, 4),
                        r = e[i];
                    r && (r.default = {
                        duration: d(t, 12),
                        flags: d(t, 20)
                    })
                })), e
            }
    
            function m(t, e) {
                return g(e, ["moof", "traf"]).reduce((function (e, i) {
                    var r = g(i, ["tfdt"])[0],
                        n = r[0],
                        a = g(i, ["tfhd"]).reduce((function (e, i) {
                            var a = d(i, 4),
                                s = t[a];
                            if (s) {
                                var o = d(r, 4);
                                1 === n && (o *= Math.pow(2, 32), o += d(r, 8));
                                var l = o / (s.timescale || 9e4);
                                if (isFinite(l) && (null === e || l < e)) return l
                            }
                            return e
                        }), null);
                    return null !== a && isFinite(a) && (null === e || a < e) ? a : e
                }), null) || 0
            }
    
            function y(t, e) {
                for (var i = 0, r = 0, a = 0, s = g(t, ["moof", "traf"]), o = 0; o < s.length; o++) {
                    var l = s[o],
                        u = g(l, ["tfhd"])[0],
                        h = e[d(u, 4)];
                    if (h) {
                        var c = h.default,
                            f = d(u, 0) | (null == c ? void 0 : c.flags),
                            p = null == c ? void 0 : c.duration;
                        8 & f && (p = d(u, 2 & f ? 12 : 8));
                        for (var m = h.timescale || 9e4, y = g(l, ["trun"]), b = 0; b < y.length; b++) {
                            if (!(i = T(y[b])) && p) i = p * d(y[b], 4);
                            h.type === n.a.VIDEO ? r += i / m : h.type === n.a.AUDIO && (a += i / m)
                        }
                    }
                }
                if (0 === r && 0 === a) {
                    for (var E = 0, S = g(t, ["sidx"]), L = 0; L < S.length; L++) {
                        var A = v(S[L]);
                        null != A && A.references && (E += A.references.reduce((function (t, e) {
                            return t + e.info.duration || 0
                        }), 0))
                    }
                    return E
                }
                return r || a
            }
    
            function T(t) {
                var e = d(t, 0),
                    i = 8;
                1 & e && (i += 4), 4 & e && (i += 4);
                for (var r = 0, n = d(t, 4), a = 0; a < n; a++) {
                    if (256 & e) r += d(t, i), i += 4;
                    512 & e && (i += 4), 1024 & e && (i += 4), 2048 & e && (i += 4)
                }
                return r
            }
    
            function b(t, e, i) {
                g(e, ["moof", "traf"]).forEach((function (e) {
                    g(e, ["tfhd"]).forEach((function (r) {
                        var n = d(r, 4),
                            a = t[n];
                        if (a) {
                            var o = a.timescale || 9e4;
                            g(e, ["tfdt"]).forEach((function (t) {
                                var e = t[0],
                                    r = d(t, 4);
                                if (0 === e) r -= i * o, f(t, 4, r = Math.max(r, 0));
                                else {
                                    r *= Math.pow(2, 32), r += d(t, 8), r -= i * o, r = Math.max(r, 0);
                                    var n = Math.floor(r / (s + 1)),
                                        a = Math.floor(r % (s + 1));
                                    f(t, 4, n), f(t, 8, a)
                                }
                            }))
                        }
                    }))
                }))
            }
    
            function E(t) {
                var e = {
                        valid: null,
                        remainder: null
                    },
                    i = g(t, ["moof"]);
                if (!i) return e;
                if (i.length < 2) return e.remainder = t, e;
                var n = i[i.length - 1];
                return e.valid = Object(r.a)(t, 0, n.byteOffset - 8), e.remainder = Object(r.a)(t, n.byteOffset - 8), e
            }
    
            function S(t, e) {
                var i = new Uint8Array(t.length + e.length);
                return i.set(t), i.set(e, t.length), i
            }
    
            function L(t, e) {
                var i = [],
                    r = e.samples,
                    a = e.timescale,
                    s = e.id,
                    o = !1;
                return g(r, ["moof"]).map((function (l) {
                    var u = l.byteOffset - 8;
                    g(l, ["traf"]).map((function (l) {
                        var h = g(l, ["tfdt"]).map((function (t) {
                            var e = t[0],
                                i = d(t, 4);
                            return 1 === e && (i *= Math.pow(2, 32), i += d(t, 8)), i / a
                        }))[0];
                        return void 0 !== h && (t = h), g(l, ["tfhd"]).map((function (h) {
                            var f = d(h, 4),
                                v = 16777215 & d(h, 0),
                                p = 0,
                                m = 0 != (16 & v),
                                y = 0,
                                T = 0 != (32 & v),
                                b = 8;
                            f === s && (0 != (1 & v) && (b += 8), 0 != (2 & v) && (b += 4), 0 != (8 & v) && (p = d(h, b), b += 4), m && (y = d(h, b), b += 4), T && (b += 4), "video" === e.type && (o = function (t) {
                                if (!t) return !1;
                                var e = t.indexOf("."),
                                    i = e < 0 ? t : t.substring(0, e);
                                return "hvc1" === i || "hev1" === i || "dvh1" === i || "dvhe" === i
                            }(e.codec)), g(l, ["trun"]).map((function (s) {
                                var l = s[0],
                                    h = 16777215 & d(s, 0),
                                    f = 0 != (1 & h),
                                    g = 0,
                                    v = 0 != (4 & h),
                                    m = 0 != (256 & h),
                                    T = 0,
                                    b = 0 != (512 & h),
                                    E = 0,
                                    S = 0 != (1024 & h),
                                    L = 0 != (2048 & h),
                                    R = 0,
                                    k = d(s, 4),
                                    _ = 8;
                                f && (g = d(s, _), _ += 4), v && (_ += 4);
                                for (var I = g + u, O = 0; O < k; O++) {
                                    if (m ? (T = d(s, _), _ += 4) : T = p, b ? (E = d(s, _), _ += 4) : E = y, S && (_ += 4), L && (R = 0 === l ? d(s, _) : c(s, _), _ += 4), e.type === n.a.VIDEO)
                                        for (var C = 0; C < E;) {
                                            var w = d(r, I),
                                                x = 31 & r[I += 4];
                                            if (A(o, x)) D(r.subarray(I, I + w), t + R / a, i);
                                            I += w, C += w + 4
                                        }
                                    t += T / a
                                }
                            })))
                        }))
                    }))
                })), i
            }
    
            function A(t, e) {
                return t ? 39 === e || 40 === e : 6 === e
            }
    
            function D(t, e, i) {
                var r = function (t) {
                        var e = t.byteLength,
                            i = [],
                            r = 1;
                        for (; r < e - 2;) 0 === t[r] && 0 === t[r + 1] && 3 === t[r + 2] ? (i.push(r + 2), r += 2) : r++;
                        if (0 === i.length) return t;
                        var n = e - i.length,
                            a = new Uint8Array(n),
                            s = 0;
                        for (r = 0; r < n; s++, r++) s === i[0] && (s++, i.shift()), a[r] = t[s];
                        return a
                    }(t),
                    n = 0;
                n++;
                for (var s = 0, o = 0, l = !1, u = 0; n < r.length;) {
                    s = 0;
                    do {
                        if (n >= r.length) break;
                        s += u = r[n++]
                    } while (255 === u);
                    o = 0;
                    do {
                        if (n >= r.length) break;
                        o += u = r[n++]
                    } while (255 === u);
                    var c = r.length - n;
                    if (!l && 4 === s && n < r.length) {
                        if (l = !0, 181 === r[n++]) {
                            var f = h(r, n);
                            if (n += 2, 49 === f) {
                                var g = d(r, n);
                                if (n += 4, 1195456820 === g) {
                                    var v = r[n++];
                                    if (3 === v) {
                                        var p = r[n++],
                                            m = 64 & p,
                                            y = m ? 2 + 3 * (31 & p) : 0,
                                            T = new Uint8Array(y);
                                        if (m) {
                                            T[0] = p;
                                            for (var b = 1; b < y; b++) T[b] = r[n++]
                                        }
                                        i.push({
                                            type: v,
                                            payloadType: s,
                                            pts: e,
                                            bytes: T
                                        })
                                    }
                                }
                            }
                        }
                    } else if (5 === s && o < c) {
                        if (l = !0, o > 16) {
                            for (var E = [], S = 0; S < 16; S++) {
                                var L = r[n++].toString(16);
                                E.push(1 == L.length ? "0" + L : L), 3 !== S && 5 !== S && 7 !== S && 9 !== S || E.push("-")
                            }
                            for (var A = o - 16, D = new Uint8Array(A), R = 0; R < A; R++) D[R] = r[n++];
                            i.push({
                                payloadType: s,
                                pts: e,
                                uuid: E.join(""),
                                userData: Object(a.f)(D),
                                userDataBytes: D
                            })
                        }
                    } else if (o < c) n += o;
                    else if (o > c) break
                }
            }
    
            function R(t) {
                var e = t[0],
                    i = "",
                    r = "",
                    n = 0,
                    a = 0,
                    s = 0,
                    o = 0,
                    l = 0,
                    h = 0;
                if (0 === e) {
                    for (;
                        "\0" !== u(t.subarray(h, h + 1));) i += u(t.subarray(h, h + 1)), h += 1;
                    for (i += u(t.subarray(h, h + 1)), h += 1;
                        "\0" !== u(t.subarray(h, h + 1));) r += u(t.subarray(h, h + 1)), h += 1;
                    r += u(t.subarray(h, h + 1)), h += 1, n = d(t, 12), a = d(t, 16), o = d(t, 20), l = d(t, 24), h = 28
                } else if (1 === e) {
                    n = d(t, h += 4);
                    var c = d(t, h += 4),
                        f = d(t, h += 4);
                    for (h += 4, s = Math.pow(2, 32) * c + f, Number.isSafeInteger(s) || (s = Number.MAX_SAFE_INTEGER, console.warn("Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box")), o = d(t, h), l = d(t, h += 4), h += 4;
                        "\0" !== u(t.subarray(h, h + 1));) i += u(t.subarray(h, h + 1)), h += 1;
                    for (i += u(t.subarray(h, h + 1)), h += 1;
                        "\0" !== u(t.subarray(h, h + 1));) r += u(t.subarray(h, h + 1)), h += 1;
                    r += u(t.subarray(h, h + 1)), h += 1
                }
                return {
                    schemeIdUri: i,
                    value: r,
                    timeScale: n,
                    presentationTime: s,
                    presentationTimeDelta: a,
                    eventDuration: o,
                    id: l,
                    payload: t.subarray(h, t.byteLength)
                }
            }
        }, function (t, e, i) {
            "use strict";
            i.d(e, "a", (function () {
                return r
            })), i.d(e, "b", (function () {
                return g
            })), i.d(e, "c", (function () {
                return v
            }));
            var r, n = i(3),
                a = i(12),
                s = i(1),
                o = i(17),
                l = i(14);
    
            function u(t, e) {
                t.prototype = Object.create(e.prototype), t.prototype.constructor = t, h(t, e)
            }
    
            function h(t, e) {
                return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
    
            function d(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
    
            function c(t, e, i) {
                return e && d(t.prototype, e), i && d(t, i), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), t
            }! function (t) {
                t.AUDIO = "audio", t.VIDEO = "video", t.AUDIOVIDEO = "audiovideo"
            }(r || (r = {}));
            var f = function () {
                    function t(t) {
                        var e;
                        this._byteRange = null, this._url = null, this.baseurl = void 0, this.relurl = void 0, this.elementaryStreams = ((e = {})[r.AUDIO] = null, e[r.VIDEO] = null, e[r.AUDIOVIDEO] = null, e), this.baseurl = t
                    }
                    return t.prototype.setByteRange = function (t, e) {
                        var i = t.split("@", 2),
                            r = [];
                        1 === i.length ? r[0] = e ? e.byteRangeEndOffset : 0 : r[0] = parseInt(i[1]), r[1] = parseInt(i[0]) + r[0], this._byteRange = r
                    }, c(t, [{
                        key: "byteRange",
                        get: function () {
                            return this._byteRange ? this._byteRange : []
                        }
                    }, {
                        key: "byteRangeStartOffset",
                        get: function () {
                            return this.byteRange[0]
                        }
                    }, {
                        key: "byteRangeEndOffset",
                        get: function () {
                            return this.byteRange[1]
                        }
                    }, {
                        key: "url",
                        get: function () {
                            return !this._url && this.baseurl && this.relurl && (this._url = Object(a.buildAbsoluteURL)(this.baseurl, this.relurl, {
                                alwaysNormalize: !0
                            })), this._url || ""
                        },
                        set: function (t) {
                            this._url = t
                        }
                    }]), t
                }(),
                g = function (t) {
                    function e(e, i) {
                        var r;
                        return (r = t.call(this, i) || this)._decryptdata = null, r.rawProgramDateTime = null, r.programDateTime = null, r.tagList = [], r.duration = 0, r.sn = 0, r.levelkey = void 0, r.type = void 0, r.loader = null, r.level = -1, r.cc = 0, r.startPTS = void 0, r.endPTS = void 0, r.appendedPTS = void 0, r.startDTS = void 0, r.endDTS = void 0, r.start = 0, r.deltaPTS = void 0, r.maxStartPTS = void 0, r.minEndPTS = void 0, r.stats = new l.a, r.urlId = 0, r.data = void 0, r.bitrateTest = !1, r.title = null, r.initSegment = null, r.type = e, r
                    }
                    u(e, t);
                    var i = e.prototype;
                    return i.createInitializationVector = function (t) {
                        for (var e = new Uint8Array(16), i = 12; i < 16; i++) e[i] = t >> 8 * (15 - i) & 255;
                        return e
                    }, i.setDecryptDataFromLevelKey = function (t, e) {
                        var i = t;
                        return "AES-128" === (null == t ? void 0 : t.method) && t.uri && !t.iv && ((i = o.a.fromURI(t.uri)).method = t.method, i.iv = this.createInitializationVector(e), i.keyFormat = "identity"), i
                    }, i.setElementaryStreamInfo = function (t, e, i, r, n, a) {
                        void 0 === a && (a = !1);
                        var s = this.elementaryStreams,
                            o = s[t];
                        o ? (o.startPTS = Math.min(o.startPTS, e), o.endPTS = Math.max(o.endPTS, i), o.startDTS = Math.min(o.startDTS, r), o.endDTS = Math.max(o.endDTS, n)) : s[t] = {
                            startPTS: e,
                            endPTS: i,
                            startDTS: r,
                            endDTS: n,
                            partial: a
                        }
                    }, i.clearElementaryStreamInfo = function () {
                        var t = this.elementaryStreams;
                        t[r.AUDIO] = null, t[r.VIDEO] = null, t[r.AUDIOVIDEO] = null
                    }, c(e, [{
                        key: "decryptdata",
                        get: function () {
                            if (!this.levelkey && !this._decryptdata) return null;
                            if (!this._decryptdata && this.levelkey) {
                                var t = this.sn;
                                "number" != typeof t && (this.levelkey && "AES-128" === this.levelkey.method && !this.levelkey.iv && s.b.warn('missing IV for initialization segment with method="' + this.levelkey.method + '" - compliance issue'), t = 0), this._decryptdata = this.setDecryptDataFromLevelKey(this.levelkey, t)
                            }
                            return this._decryptdata
                        }
                    }, {
                        key: "end",
                        get: function () {
                            return this.start + this.duration
                        }
                    }, {
                        key: "endProgramDateTime",
                        get: function () {
                            if (null === this.programDateTime) return null;
                            if (!Object(n.a)(this.programDateTime)) return null;
                            var t = Object(n.a)(this.duration) ? this.duration : 0;
                            return this.programDateTime + 1e3 * t
                        }
                    }, {
                        key: "encrypted",
                        get: function () {
                            var t;
                            return !(null === (t = this.decryptdata) || void 0 === t || !t.keyFormat || !this.decryptdata.uri)
                        }
                    }]), e
                }(f),
                v = function (t) {
                    function e(e, i, r, n, a) {
                        var s;
                        (s = t.call(this, r) || this).fragOffset = 0, s.duration = 0, s.gap = !1, s.independent = !1, s.relurl = void 0, s.fragment = void 0, s.index = void 0, s.stats = new l.a, s.duration = e.decimalFloatingPoint("DURATION"), s.gap = e.bool("GAP"), s.independent = e.bool("INDEPENDENT"), s.relurl = e.enumeratedString("URI"), s.fragment = i, s.index = n;
                        var o = e.enumeratedString("BYTERANGE");
                        return o && s.setByteRange(o, a), a && (s.fragOffset = a.fragOffset + a.duration), s
                    }
                    return u(e, t), c(e, [{
                        key: "start",
                        get: function () {
                            return this.fragment.start + this.fragOffset
                        }
                    }, {
                        key: "end",
                        get: function () {
                            return this.start + this.duration
                        }
                    }, {
                        key: "loaded",
                        get: function () {
                            var t = this.elementaryStreams;
                            return !!(t.audio || t.video || t.audiovideo)
                        }
                    }]), e
                }(f)
        }, function (t, e, i) {
            "use strict";
            i.d(e, "b", (function () {
                return s
            })), i.d(e, "a", (function () {
                return l
            })), i.d(e, "d", (function () {
                return u
            })), i.d(e, "e", (function () {
                return h
            })), i.d(e, "c", (function () {
                return c
            })), i.d(e, "f", (function () {
                return y
            }));
            var r, n = function (t, e) {
                    return e + 10 <= t.length && 73 === t[e] && 68 === t[e + 1] && 51 === t[e + 2] && t[e + 3] < 255 && t[e + 4] < 255 && t[e + 6] < 128 && t[e + 7] < 128 && t[e + 8] < 128 && t[e + 9] < 128
                },
                a = function (t, e) {
                    return e + 10 <= t.length && 51 === t[e] && 68 === t[e + 1] && 73 === t[e + 2] && t[e + 3] < 255 && t[e + 4] < 255 && t[e + 6] < 128 && t[e + 7] < 128 && t[e + 8] < 128 && t[e + 9] < 128
                },
                s = function (t, e) {
                    for (var i = e, r = 0; n(t, e);) {
                        r += 10, r += o(t, e + 6), a(t, e + 10) && (r += 10), e += r
                    }
                    if (r > 0) return t.subarray(i, i + r)
                },
                o = function (t, e) {
                    var i = 0;
                    return i = (127 & t[e]) << 21, i |= (127 & t[e + 1]) << 14, i |= (127 & t[e + 2]) << 7, i |= 127 & t[e + 3]
                },
                l = function (t, e) {
                    return n(t, e) && o(t, e + 6) + 10 <= t.length - e
                },
                u = function (t) {
                    for (var e = c(t), i = 0; i < e.length; i++) {
                        var r = e[i];
                        if (h(r)) return m(r)
                    }
                },
                h = function (t) {
                    return t && "PRIV" === t.key && "com.apple.streaming.transportStreamTimestamp" === t.info
                },
                d = function (t) {
                    var e = String.fromCharCode(t[0], t[1], t[2], t[3]),
                        i = o(t, 4);
                    return {
                        type: e,
                        size: i,
                        data: t.subarray(10, 10 + i)
                    }
                },
                c = function (t) {
                    for (var e = 0, i = []; n(t, e);) {
                        for (var r = o(t, e + 6), s = (e += 10) + r; e + 8 < s;) {
                            var l = d(t.subarray(e)),
                                u = f(l);
                            u && i.push(u), e += l.size + 10
                        }
                        a(t, e) && (e += 10)
                    }
                    return i
                },
                f = function (t) {
                    return "PRIV" === t.type ? g(t) : "W" === t.type[0] ? p(t) : v(t)
                },
                g = function (t) {
                    if (!(t.size < 2)) {
                        var e = y(t.data, !0),
                            i = new Uint8Array(t.data.subarray(e.length + 1));
                        return {
                            key: t.type,
                            info: e,
                            data: i.buffer
                        }
                    }
                },
                v = function (t) {
                    if (!(t.size < 2)) {
                        if ("TXXX" === t.type) {
                            var e = 1,
                                i = y(t.data.subarray(e), !0);
                            e += i.length + 1;
                            var r = y(t.data.subarray(e));
                            return {
                                key: t.type,
                                info: i,
                                data: r
                            }
                        }
                        var n = y(t.data.subarray(1));
                        return {
                            key: t.type,
                            data: n
                        }
                    }
                },
                p = function (t) {
                    if ("WXXX" === t.type) {
                        if (t.size < 2) return;
                        var e = 1,
                            i = y(t.data.subarray(e), !0);
                        e += i.length + 1;
                        var r = y(t.data.subarray(e));
                        return {
                            key: t.type,
                            info: i,
                            data: r
                        }
                    }
                    var n = y(t.data);
                    return {
                        key: t.type,
                        data: n
                    }
                },
                m = function (t) {
                    if (8 === t.data.byteLength) {
                        var e = new Uint8Array(t.data),
                            i = 1 & e[3],
                            r = (e[4] << 23) + (e[5] << 15) + (e[6] << 7) + e[7];
                        return r /= 45, i && (r += 47721858.84), Math.round(r)
                    }
                },
                y = function (t, e) {
                    void 0 === e && (e = !1);
                    var i = T();
                    if (i) {
                        var r = i.decode(t);
                        if (e) {
                            var n = r.indexOf("\0");
                            return -1 !== n ? r.substring(0, n) : r
                        }
                        return r.replace(/\0/g, "")
                    }
                    for (var a, s, o, l = t.length, u = "", h = 0; h < l;) {
                        if (0 === (a = t[h++]) && e) return u;
                        if (0 !== a && 3 !== a) switch (a >> 4) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                                u += String.fromCharCode(a);
                                break;
                            case 12:
                            case 13:
                                s = t[h++], u += String.fromCharCode((31 & a) << 6 | 63 & s);
                                break;
                            case 14:
                                s = t[h++], o = t[h++], u += String.fromCharCode((15 & a) << 12 | (63 & s) << 6 | (63 & o) << 0)
                        }
                    }
                    return u
                };
    
            function T() {
                return r || void 0 === self.TextDecoder || (r = new self.TextDecoder("utf-8")), r
            }
        }, function (t, e, i) {
            "use strict";
            var r;
            i.d(e, "a", (function () {
                    return r
                })),
                function (t) {
                    t.audioId3 = "org.id3", t.dateRange = "com.apple.quicktime.HLS", t.emsg = "https://aomedia.org/emsg/ID3"
                }(r || (r = {}))
        }, function (t, e, i) {
            "use strict";
    
            function r(t, e, i) {
                return Uint8Array.prototype.slice ? t.slice(e, i) : new Uint8Array(Array.prototype.slice.call(t, e, i))
            }
            i.d(e, "a", (function () {
                return r
            }))
        }, function (t, e, i) {
            "use strict";
            i.d(e, "c", (function () {
                return it
            })), i.d(e, "d", (function () {
                return nt
            })), i.d(e, "a", (function () {
                return at
            })), i.d(e, "b", (function () {
                return st
            }));
            var r = i(0),
                n = i(2),
                a = i(16),
                s = i(3),
                o = i(7),
                l = i(8);
    
            function u(t, e) {
                return void 0 === t && (t = ""), void 0 === e && (e = 9e4), {
                    type: t,
                    id: -1,
                    pid: -1,
                    inputTimeScale: e,
                    sequenceNumber: -1,
                    samples: [],
                    dropped: 0
                }
            }
            var h = i(5),
                d = i(9),
                c = function () {
                    function t() {
                        this._audioTrack = void 0, this._id3Track = void 0, this.frameIndex = 0, this.cachedData = null, this.basePTS = null, this.initPTS = null
                    }
                    var e = t.prototype;
                    return e.resetInitSegment = function (t, e, i, r) {
                        this._id3Track = {
                            type: "id3",
                            id: 3,
                            pid: -1,
                            inputTimeScale: 9e4,
                            sequenceNumber: 0,
                            samples: [],
                            dropped: 0
                        }
                    }, e.resetTimeStamp = function (t) {
                        this.initPTS = t, this.resetContiguity()
                    }, e.resetContiguity = function () {
                        this.basePTS = null, this.frameIndex = 0
                    }, e.canParse = function (t, e) {
                        return !1
                    }, e.appendFrame = function (t, e, i) {}, e.demux = function (t, e) {
                        this.cachedData && (t = Object(h.b)(this.cachedData, t), this.cachedData = null);
                        var i, r, n = o.b(t, 0),
                            a = n ? n.length : 0,
                            c = this._audioTrack,
                            g = this._id3Track,
                            v = n ? o.d(n) : void 0,
                            p = t.length;
                        for ((null === this.basePTS || 0 === this.frameIndex && Object(s.a)(v)) && (this.basePTS = f(v, e, this.initPTS)), n && n.length > 0 && g.samples.push({
                                pts: this.basePTS,
                                dts: this.basePTS,
                                data: n,
                                type: l.a.audioId3
                            }), r = this.basePTS; a < p;) {
                            if (this.canParse(t, a)) {
                                var m = this.appendFrame(c, t, a);
                                m ? (this.frameIndex++, r = m.sample.pts, i = a += m.length) : a = p
                            } else o.a(t, a) ? (n = o.b(t, a), g.samples.push({
                                pts: r,
                                dts: r,
                                data: n,
                                type: l.a.audioId3
                            }), i = a += n.length) : a++;
                            if (a === p && i !== p) {
                                var y = Object(d.a)(t, i);
                                this.cachedData ? this.cachedData = Object(h.b)(this.cachedData, y) : this.cachedData = y
                            }
                        }
                        return {
                            audioTrack: c,
                            videoTrack: u(),
                            id3Track: g,
                            textTrack: u()
                        }
                    }, e.demuxSampleAes = function (t, e, i) {
                        return Promise.reject(new Error("[" + this + "] This demuxer does not support Sample-AES decryption"))
                    }, e.flush = function (t) {
                        var e = this.cachedData;
                        return e && (this.cachedData = null, this.demux(e, 0)), {
                            audioTrack: this._audioTrack,
                            videoTrack: u(),
                            id3Track: this._id3Track,
                            textTrack: u()
                        }
                    }, e.destroy = function () {}, t
                }(),
                f = function (t, e, i) {
                    return Object(s.a)(t) ? 90 * t : 9e4 * e + (i || 0)
                },
                g = c,
                v = i(1);
    
            function p(t, e) {
                return 255 === t[e] && 240 == (246 & t[e + 1])
            }
    
            function m(t, e) {
                return 1 & t[e + 1] ? 7 : 9
            }
    
            function y(t, e) {
                return (3 & t[e + 3]) << 11 | t[e + 4] << 3 | (224 & t[e + 5]) >>> 5
            }
    
            function T(t, e) {
                return e + 1 < t.length && p(t, e)
            }
    
            function b(t, e) {
                if (T(t, e)) {
                    var i = m(t, e);
                    if (e + i >= t.length) return !1;
                    var r = y(t, e);
                    if (r <= i) return !1;
                    var n = e + r;
                    return n === t.length || T(t, n)
                }
                return !1
            }
    
            function E(t, e, i, a, s) {
                if (!t.samplerate) {
                    var o = function (t, e, i, a) {
                        var s, o, l, u, h = navigator.userAgent.toLowerCase(),
                            d = a,
                            c = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
                        s = 1 + ((192 & e[i + 2]) >>> 6);
                        var f = (60 & e[i + 2]) >>> 2;
                        if (!(f > c.length - 1)) return l = (1 & e[i + 2]) << 2, l |= (192 & e[i + 3]) >>> 6, v.b.log("manifest codec:" + a + ", ADTS type:" + s + ", samplingIndex:" + f), /firefox/i.test(h) ? f >= 6 ? (s = 5, u = new Array(4), o = f - 3) : (s = 2, u = new Array(2), o = f) : -1 !== h.indexOf("android") ? (s = 2, u = new Array(2), o = f) : (s = 5, u = new Array(4), a && (-1 !== a.indexOf("mp4a.40.29") || -1 !== a.indexOf("mp4a.40.5")) || !a && f >= 6 ? o = f - 3 : ((a && -1 !== a.indexOf("mp4a.40.2") && (f >= 6 && 1 === l || /vivaldi/i.test(h)) || !a && 1 === l) && (s = 2, u = new Array(2)), o = f)), u[0] = s << 3, u[0] |= (14 & f) >> 1, u[1] |= (1 & f) << 7, u[1] |= l << 3, 5 === s && (u[1] |= (14 & o) >> 1, u[2] = (1 & o) << 7, u[2] |= 8, u[3] = 0), {
                            config: u,
                            samplerate: c[f],
                            channelCount: l,
                            codec: "mp4a.40." + s,
                            manifestCodec: d
                        };
                        t.trigger(r.a.ERROR, {
                            type: n.b.MEDIA_ERROR,
                            details: n.a.FRAG_PARSING_ERROR,
                            fatal: !0,
                            reason: "invalid ADTS sampling index:" + f
                        })
                    }(e, i, a, s);
                    if (!o) return;
                    t.config = o.config, t.samplerate = o.samplerate, t.channelCount = o.channelCount, t.codec = o.codec, t.manifestCodec = o.manifestCodec, v.b.log("parsed codec:" + t.codec + ", rate:" + o.samplerate + ", channels:" + o.channelCount)
                }
            }
    
            function S(t) {
                return 9216e4 / t
            }
    
            function L(t, e, i, r, n) {
                var a, s = r + n * S(t.samplerate),
                    o = function (t, e) {
                        var i = m(t, e);
                        if (e + i <= t.length) {
                            var r = y(t, e) - i;
                            if (r > 0) return {
                                headerLength: i,
                                frameLength: r
                            }
                        }
                    }(e, i);
                if (o) {
                    var l = o.frameLength,
                        u = o.headerLength,
                        h = u + l,
                        d = Math.max(0, i + h - e.length);
                    d ? (a = new Uint8Array(h - u)).set(e.subarray(i + u, e.length), 0) : a = e.subarray(i + u, i + h);
                    var c = {
                        unit: a,
                        pts: s
                    };
                    return d || t.samples.push(c), {
                        sample: c,
                        length: h,
                        missing: d
                    }
                }
                var f = e.length - i;
                return (a = new Uint8Array(f)).set(e.subarray(i, e.length), 0), {
                    sample: {
                        unit: a,
                        pts: s
                    },
                    length: f,
                    missing: -1
                }
            }
    
            function A(t, e) {
                return (A = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var D = function (t) {
                    var e, i;
    
                    function r(e, i) {
                        var r;
                        return (r = t.call(this) || this).observer = void 0, r.config = void 0, r.observer = e, r.config = i, r
                    }
                    i = t, (e = r).prototype = Object.create(i.prototype), e.prototype.constructor = e, A(e, i);
                    var n = r.prototype;
                    return n.resetInitSegment = function (e, i, r, n) {
                        t.prototype.resetInitSegment.call(this, e, i, r, n), this._audioTrack = {
                            container: "audio/adts",
                            type: "audio",
                            id: 2,
                            pid: -1,
                            sequenceNumber: 0,
                            segmentCodec: "aac",
                            samples: [],
                            manifestCodec: i,
                            duration: n,
                            inputTimeScale: 9e4,
                            dropped: 0
                        }
                    }, r.probe = function (t) {
                        if (!t) return !1;
                        for (var e = (o.b(t, 0) || []).length, i = t.length; e < i; e++)
                            if (b(t, e)) return v.b.log("ADTS sync word found !"), !0;
                        return !1
                    }, n.canParse = function (t, e) {
                        return function (t, e) {
                            return function (t, e) {
                                return e + 5 < t.length
                            }(t, e) && p(t, e) && y(t, e) <= t.length - e
                        }(t, e)
                    }, n.appendFrame = function (t, e, i) {
                        E(t, this.observer, e, i, t.manifestCodec);
                        var r = L(t, e, i, this.basePTS, this.frameIndex);
                        if (r && 0 === r.missing) return r
                    }, r
                }(g),
                R = /\/emsg[-/]ID3/i,
                k = function () {
                    function t(t, e) {
                        this.remainderData = null, this.timeOffset = 0, this.config = void 0, this.videoTrack = void 0, this.audioTrack = void 0, this.id3Track = void 0, this.txtTrack = void 0, this.config = e
                    }
                    var e = t.prototype;
                    return e.resetTimeStamp = function () {}, e.resetInitSegment = function (t, e, i, r) {
                        var n = Object(h.h)(t),
                            a = this.videoTrack = u("video", 1),
                            s = this.audioTrack = u("audio", 1),
                            o = this.txtTrack = u("text", 1);
                        if (this.id3Track = u("id3", 1), this.timeOffset = 0, n.video) {
                            var l = n.video,
                                d = l.id,
                                c = l.timescale,
                                f = l.codec;
                            a.id = d, a.timescale = o.timescale = c, a.codec = f
                        }
                        if (n.audio) {
                            var g = n.audio,
                                v = g.id,
                                p = g.timescale,
                                m = g.codec;
                            s.id = v, s.timescale = p, s.codec = m
                        }
                        o.id = h.a.text, a.sampleDuration = 0, a.duration = s.duration = r
                    }, e.resetContiguity = function () {}, t.probe = function (t) {
                        return t = t.length > 16384 ? t.subarray(0, 16384) : t, Object(h.c)(t, ["moof"]).length > 0
                    }, e.demux = function (t, e) {
                        this.timeOffset = e;
                        var i = t,
                            r = this.videoTrack,
                            n = this.txtTrack;
                        if (this.config.progressive) {
                            this.remainderData && (i = Object(h.b)(this.remainderData, t));
                            var a = Object(h.l)(i);
                            this.remainderData = a.remainder, r.samples = a.valid || new Uint8Array
                        } else r.samples = i;
                        var s = this.extractID3Track(r, e);
                        return n.samples = Object(h.j)(e, r), {
                            videoTrack: r,
                            audioTrack: this.audioTrack,
                            id3Track: s,
                            textTrack: this.txtTrack
                        }
                    }, e.flush = function () {
                        var t = this.timeOffset,
                            e = this.videoTrack,
                            i = this.txtTrack;
                        e.samples = this.remainderData || new Uint8Array, this.remainderData = null;
                        var r = this.extractID3Track(e, this.timeOffset);
                        return i.samples = Object(h.j)(t, e), {
                            videoTrack: e,
                            audioTrack: u(),
                            id3Track: r,
                            textTrack: u()
                        }
                    }, e.extractID3Track = function (t, e) {
                        var i = this.id3Track;
                        if (t.samples.length) {
                            var r = Object(h.c)(t.samples, ["emsg"]);
                            r && r.forEach((function (t) {
                                var r = Object(h.g)(t);
                                if (R.test(r.schemeIdUri)) {
                                    var n = Object(s.a)(r.presentationTime) ? r.presentationTime / r.timeScale : e + r.presentationTimeDelta / r.timeScale,
                                        a = r.payload;
                                    i.samples.push({
                                        data: a,
                                        len: a.byteLength,
                                        dts: n,
                                        pts: n,
                                        type: l.a.emsg
                                    })
                                }
                            }))
                        }
                        return i
                    }, e.demuxSampleAes = function (t, e, i) {
                        return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption"))
                    }, e.destroy = function () {}, t
                }(),
                _ = null,
                I = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
                O = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3],
                C = [
                    [0, 72, 144, 12],
                    [0, 0, 0, 0],
                    [0, 72, 144, 12],
                    [0, 144, 144, 12]
                ],
                w = [0, 1, 1, 4];
    
            function x(t, e, i, r, n) {
                if (!(i + 24 > e.length)) {
                    var a = P(e, i);
                    if (a && i + a.frameLength <= e.length) {
                        var s = r + n * (9e4 * a.samplesPerFrame / a.sampleRate),
                            o = {
                                unit: e.subarray(i, i + a.frameLength),
                                pts: s,
                                dts: s
                            };
                        return t.config = [], t.channelCount = a.channelCount, t.samplerate = a.sampleRate, t.samples.push(o), {
                            sample: o,
                            length: a.frameLength,
                            missing: 0
                        }
                    }
                }
            }
    
            function P(t, e) {
                var i = t[e + 1] >> 3 & 3,
                    r = t[e + 1] >> 1 & 3,
                    n = t[e + 2] >> 4 & 15,
                    a = t[e + 2] >> 2 & 3;
                if (1 !== i && 0 !== n && 15 !== n && 3 !== a) {
                    var s = t[e + 2] >> 1 & 1,
                        o = t[e + 3] >> 6,
                        l = 1e3 * I[14 * (3 === i ? 3 - r : 3 === r ? 3 : 4) + n - 1],
                        u = O[3 * (3 === i ? 0 : 2 === i ? 1 : 2) + a],
                        h = 3 === o ? 1 : 2,
                        d = C[i][r],
                        c = w[r],
                        f = 8 * d * c,
                        g = Math.floor(d * l / u + s) * c;
                    if (null === _) {
                        var v = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                        _ = v ? parseInt(v[1]) : 0
                    }
                    return !!_ && _ <= 87 && 2 === r && l >= 224e3 && 0 === o && (t[e + 3] = 128 | t[e + 3]), {
                        sampleRate: u,
                        channelCount: h,
                        frameLength: g,
                        samplesPerFrame: f
                    }
                }
            }
    
            function F(t, e) {
                return 255 === t[e] && 224 == (224 & t[e + 1]) && 0 != (6 & t[e + 1])
            }
    
            function M(t, e) {
                return e + 1 < t.length && F(t, e)
            }
    
            function N(t, e) {
                if (e + 1 < t.length && F(t, e)) {
                    var i = P(t, e),
                        r = 4;
                    null != i && i.frameLength && (r = i.frameLength);
                    var n = e + r;
                    return n === t.length || M(t, n)
                }
                return !1
            }
            var U = function () {
                    function t(t) {
                        this.data = void 0, this.bytesAvailable = void 0, this.word = void 0, this.bitsAvailable = void 0, this.data = t, this.bytesAvailable = t.byteLength, this.word = 0, this.bitsAvailable = 0
                    }
                    var e = t.prototype;
                    return e.loadWord = function () {
                        var t = this.data,
                            e = this.bytesAvailable,
                            i = t.byteLength - e,
                            r = new Uint8Array(4),
                            n = Math.min(4, e);
                        if (0 === n) throw new Error("no bytes available");
                        r.set(t.subarray(i, i + n)), this.word = new DataView(r.buffer).getUint32(0), this.bitsAvailable = 8 * n, this.bytesAvailable -= n
                    }, e.skipBits = function (t) {
                        var e;
                        this.bitsAvailable > t ? (this.word <<= t, this.bitsAvailable -= t) : (t -= this.bitsAvailable, t -= (e = t >> 3) >> 3, this.bytesAvailable -= e, this.loadWord(), this.word <<= t, this.bitsAvailable -= t)
                    }, e.readBits = function (t) {
                        var e = Math.min(this.bitsAvailable, t),
                            i = this.word >>> 32 - e;
                        return t > 32 && v.b.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= e, this.bitsAvailable > 0 ? this.word <<= e : this.bytesAvailable > 0 && this.loadWord(), (e = t - e) > 0 && this.bitsAvailable ? i << e | this.readBits(e) : i
                    }, e.skipLZ = function () {
                        var t;
                        for (t = 0; t < this.bitsAvailable; ++t)
                            if (0 != (this.word & 2147483648 >>> t)) return this.word <<= t, this.bitsAvailable -= t, t;
                        return this.loadWord(), t + this.skipLZ()
                    }, e.skipUEG = function () {
                        this.skipBits(1 + this.skipLZ())
                    }, e.skipEG = function () {
                        this.skipBits(1 + this.skipLZ())
                    }, e.readUEG = function () {
                        var t = this.skipLZ();
                        return this.readBits(t + 1) - 1
                    }, e.readEG = function () {
                        var t = this.readUEG();
                        return 1 & t ? 1 + t >>> 1 : -1 * (t >>> 1)
                    }, e.readBoolean = function () {
                        return 1 === this.readBits(1)
                    }, e.readUByte = function () {
                        return this.readBits(8)
                    }, e.readUShort = function () {
                        return this.readBits(16)
                    }, e.readUInt = function () {
                        return this.readBits(32)
                    }, e.skipScalingList = function (t) {
                        for (var e = 8, i = 8, r = 0; r < t; r++) 0 !== i && (i = (e + this.readEG() + 256) % 256), e = 0 === i ? e : i
                    }, e.readSPS = function () {
                        var t, e, i, r = 0,
                            n = 0,
                            a = 0,
                            s = 0,
                            o = this.readUByte.bind(this),
                            l = this.readBits.bind(this),
                            u = this.readUEG.bind(this),
                            h = this.readBoolean.bind(this),
                            d = this.skipBits.bind(this),
                            c = this.skipEG.bind(this),
                            f = this.skipUEG.bind(this),
                            g = this.skipScalingList.bind(this);
                        o();
                        var v = o();
                        if (l(5), d(3), o(), f(), 100 === v || 110 === v || 122 === v || 244 === v || 44 === v || 83 === v || 86 === v || 118 === v || 128 === v) {
                            var p = u();
                            if (3 === p && d(1), f(), f(), d(1), h())
                                for (e = 3 !== p ? 8 : 12, i = 0; i < e; i++) h() && g(i < 6 ? 16 : 64)
                        }
                        f();
                        var m = u();
                        if (0 === m) u();
                        else if (1 === m)
                            for (d(1), c(), c(), t = u(), i = 0; i < t; i++) c();
                        f(), d(1);
                        var y = u(),
                            T = u(),
                            b = l(1);
                        0 === b && d(1), d(1), h() && (r = u(), n = u(), a = u(), s = u());
                        var E = [1, 1];
                        if (h() && h()) switch (o()) {
                            case 1:
                                E = [1, 1];
                                break;
                            case 2:
                                E = [12, 11];
                                break;
                            case 3:
                                E = [10, 11];
                                break;
                            case 4:
                                E = [16, 11];
                                break;
                            case 5:
                                E = [40, 33];
                                break;
                            case 6:
                                E = [24, 11];
                                break;
                            case 7:
                                E = [20, 11];
                                break;
                            case 8:
                                E = [32, 11];
                                break;
                            case 9:
                                E = [80, 33];
                                break;
                            case 10:
                                E = [18, 11];
                                break;
                            case 11:
                                E = [15, 11];
                                break;
                            case 12:
                                E = [64, 33];
                                break;
                            case 13:
                                E = [160, 99];
                                break;
                            case 14:
                                E = [4, 3];
                                break;
                            case 15:
                                E = [3, 2];
                                break;
                            case 16:
                                E = [2, 1];
                                break;
                            case 255:
                                E = [o() << 8 | o(), o() << 8 | o()]
                        }
                        return {
                            width: Math.ceil(16 * (y + 1) - 2 * r - 2 * n),
                            height: (2 - b) * (T + 1) * 16 - (b ? 2 : 4) * (a + s),
                            pixelRatio: E
                        }
                    }, e.readSliceType = function () {
                        return this.readUByte(), this.readUEG(), this.readUEG()
                    }, t
                }(),
                B = function () {
                    function t(t, e, i) {
                        this.keyData = void 0, this.decrypter = void 0, this.keyData = i, this.decrypter = new a.a(t, e, {
                            removePKCS7Padding: !1
                        })
                    }
                    var e = t.prototype;
                    return e.decryptBuffer = function (t, e) {
                        this.decrypter.decrypt(t, this.keyData.key.buffer, this.keyData.iv.buffer, e)
                    }, e.decryptAacSample = function (t, e, i, r) {
                        var n = t[e].unit;
                        if (!(n.length <= 16)) {
                            var a = n.subarray(16, n.length - n.length % 16),
                                s = a.buffer.slice(a.byteOffset, a.byteOffset + a.length),
                                o = this;
                            this.decryptBuffer(s, (function (a) {
                                var s = new Uint8Array(a);
                                n.set(s, 16), r || o.decryptAacSamples(t, e + 1, i)
                            }))
                        }
                    }, e.decryptAacSamples = function (t, e, i) {
                        for (;; e++) {
                            if (e >= t.length) return void i();
                            if (!(t[e].unit.length < 32)) {
                                var r = this.decrypter.isSync();
                                if (this.decryptAacSample(t, e, i, r), !r) return
                            }
                        }
                    }, e.getAvcEncryptedData = function (t) {
                        for (var e = 16 * Math.floor((t.length - 48) / 160) + 16, i = new Int8Array(e), r = 0, n = 32; n < t.length - 16; n += 160, r += 16) i.set(t.subarray(n, n + 16), r);
                        return i
                    }, e.getAvcDecryptedUnit = function (t, e) {
                        for (var i = new Uint8Array(e), r = 0, n = 32; n < t.length - 16; n += 160, r += 16) t.set(i.subarray(r, r + 16), n);
                        return t
                    }, e.decryptAvcSample = function (t, e, i, r, n, a) {
                        var s = Y(n.data),
                            o = this.getAvcEncryptedData(s),
                            l = this;
                        this.decryptBuffer(o.buffer, (function (o) {
                            n.data = l.getAvcDecryptedUnit(s, o), a || l.decryptAvcSamples(t, e, i + 1, r)
                        }))
                    }, e.decryptAvcSamples = function (t, e, i, r) {
                        if (t instanceof Uint8Array) throw new Error("Cannot decrypt samples of type Uint8Array");
                        for (;; e++, i = 0) {
                            if (e >= t.length) return void r();
                            for (var n = t[e].units; !(i >= n.length); i++) {
                                var a = n[i];
                                if (!(a.data.length <= 48 || 1 !== a.type && 5 !== a.type)) {
                                    var s = this.decrypter.isSync();
                                    if (this.decryptAvcSample(t, e, i, r, a, s), !s) return
                                }
                            }
                        }
                    }, t
                }();
    
            function G() {
                return (G = Object.assign ? Object.assign.bind() : function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
                    }
                    return t
                }).apply(this, arguments)
            }
    
            function j(t, e, i, r) {
                return {
                    key: t,
                    frame: !1,
                    pts: e,
                    dts: i,
                    units: [],
                    debug: r,
                    length: 0
                }
            }
    
            function K(t, e) {
                return (31 & t[e + 10]) << 8 | t[e + 11]
            }
    
            function H(t, e, i, r) {
                var n = {
                        audio: -1,
                        avc: -1,
                        id3: -1,
                        segmentCodec: "aac"
                    },
                    a = e + 3 + ((15 & t[e + 1]) << 8 | t[e + 2]) - 4;
                for (e += 12 + ((15 & t[e + 10]) << 8 | t[e + 11]); e < a;) {
                    var s = (31 & t[e + 1]) << 8 | t[e + 2];
                    switch (t[e]) {
                        case 207:
                            if (!r) {
                                v.b.log("ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream");
                                break
                            }
                            case 15:
                                -1 === n.audio && (n.audio = s);
                                break;
                            case 21:
                                -1 === n.id3 && (n.id3 = s);
                                break;
                            case 219:
                                if (!r) {
                                    v.b.log("H.264 with AES-128-CBC slice encryption found in unencrypted stream");
                                    break
                                }
                                case 27:
                                    -1 === n.avc && (n.avc = s);
                                    break;
                                case 3:
                                case 4:
                                    !0 !== i.mpeg && !0 !== i.mp3 ? v.b.log("MPEG audio found, not supported in this browser") : -1 === n.audio && (n.audio = s, n.segmentCodec = "mp3");
                                    break;
                                case 36:
                                    v.b.warn("Unsupported HEVC stream type found")
                    }
                    e += 5 + ((15 & t[e + 3]) << 8 | t[e + 4])
                }
                return n
            }
    
            function V(t) {
                var e, i, r, n, a, s = 0,
                    o = t.data;
                if (!t || 0 === t.size) return null;
                for (; o[0].length < 19 && o.length > 1;) {
                    var l = new Uint8Array(o[0].length + o[1].length);
                    l.set(o[0]), l.set(o[1], o[0].length), o[0] = l, o.splice(1, 1)
                }
                if (1 === ((e = o[0])[0] << 16) + (e[1] << 8) + e[2]) {
                    if ((i = (e[4] << 8) + e[5]) && i > t.size - 6) return null;
                    var u = e[7];
                    192 & u && (n = 536870912 * (14 & e[9]) + 4194304 * (255 & e[10]) + 16384 * (254 & e[11]) + 128 * (255 & e[12]) + (254 & e[13]) / 2, 64 & u ? n - (a = 536870912 * (14 & e[14]) + 4194304 * (255 & e[15]) + 16384 * (254 & e[16]) + 128 * (255 & e[17]) + (254 & e[18]) / 2) > 54e5 && (v.b.warn(Math.round((n - a) / 9e4) + "s delta between PTS and DTS, align them"), n = a) : a = n);
                    var h = (r = e[8]) + 9;
                    if (t.size <= h) return null;
                    t.size -= h;
                    for (var d = new Uint8Array(t.size), c = 0, f = o.length; c < f; c++) {
                        var g = (e = o[c]).byteLength;
                        if (h) {
                            if (h > g) {
                                h -= g;
                                continue
                            }
                            e = e.subarray(h), g -= h, h = 0
                        }
                        d.set(e, s), s += g
                    }
                    return i && (i -= r + 3), {
                        data: d,
                        pts: n,
                        dts: a,
                        len: i
                    }
                }
                return null
            }
    
            function W(t, e) {
                if (t.units.length && t.frame) {
                    if (void 0 === t.pts) {
                        var i = e.samples,
                            r = i.length;
                        if (!r) return void e.dropped++;
                        var n = i[r - 1];
                        t.pts = n.pts, t.dts = n.dts
                    }
                    e.samples.push(t)
                }
                t.debug.length && v.b.log(t.pts + "/" + t.dts + ":" + t.debug)
            }
    
            function Y(t) {
                for (var e = t.byteLength, i = [], r = 1; r < e - 2;) 0 === t[r] && 0 === t[r + 1] && 3 === t[r + 2] ? (i.push(r + 2), r += 2) : r++;
                if (0 === i.length) return t;
                var n = e - i.length,
                    a = new Uint8Array(n),
                    s = 0;
                for (r = 0; r < n; s++, r++) s === i[0] && (s++, i.shift()), a[r] = t[s];
                return a
            }
            var q = function () {
                function t(t, e, i) {
                    this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.sampleAes = null, this.pmtParsed = !1, this.audioCodec = void 0, this.videoCodec = void 0, this._duration = 0, this._pmtId = -1, this._avcTrack = void 0, this._audioTrack = void 0, this._id3Track = void 0, this._txtTrack = void 0, this.aacOverFlow = null, this.avcSample = null, this.remainderData = null, this.observer = t, this.config = e, this.typeSupported = i
                }
                t.probe = function (t) {
                    return 71 === t[0] && 71 === t[188]
                }, t.createTrack = function (t, e) {
                    return {
                        container: "video" === t || "audio" === t ? "video/mp2t" : void 0,
                        type: t,
                        id: h.a[t],
                        pid: -1,
                        inputTimeScale: 9e4,
                        sequenceNumber: 0,
                        samples: [],
                        dropped: 0,
                        duration: "audio" === t ? e : void 0
                    }
                };
                var e = t.prototype;
                return e.resetInitSegment = function (e, i, r, n) {
                    this.pmtParsed = !1, this._pmtId = -1, this._avcTrack = t.createTrack("video"), this._audioTrack = t.createTrack("audio", n), this._id3Track = t.createTrack("id3"), this._txtTrack = t.createTrack("text"), this._audioTrack.segmentCodec = "aac", this.aacOverFlow = null, this.avcSample = null, this.remainderData = null, this.audioCodec = i, this.videoCodec = r, this._duration = n
                }, e.resetTimeStamp = function () {}, e.resetContiguity = function () {
                    var t = this._audioTrack,
                        e = this._avcTrack,
                        i = this._id3Track;
                    t && (t.pesData = null), e && (e.pesData = null), i && (i.pesData = null), this.aacOverFlow = null
                }, e.demux = function (t, e, i, a) {
                    var s;
                    void 0 === i && (i = !1), void 0 === a && (a = !1), i || (this.sampleAes = null);
                    var o = this._avcTrack,
                        l = this._audioTrack,
                        u = this._id3Track,
                        d = this._txtTrack,
                        c = o.pid,
                        f = o.pesData,
                        g = l.pid,
                        p = u.pid,
                        m = l.pesData,
                        y = u.pesData,
                        T = null,
                        b = this.pmtParsed,
                        E = this._pmtId,
                        S = t.length;
                    if (this.remainderData && (S = (t = Object(h.b)(this.remainderData, t)).length, this.remainderData = null), S < 188 && !a) return this.remainderData = t, {
                        audioTrack: l,
                        videoTrack: o,
                        id3Track: u,
                        textTrack: d
                    };
                    (S -= S % 188) < t.byteLength && !a && (this.remainderData = new Uint8Array(t.buffer, S, t.buffer.byteLength - S));
                    for (var L = 0, A = 0; A < S; A += 188)
                        if (71 === t[A]) {
                            var D = !!(64 & t[A + 1]),
                                R = ((31 & t[A + 1]) << 8) + t[A + 2],
                                k = void 0;
                            if ((48 & t[A + 3]) >> 4 > 1) {
                                if ((k = A + 5 + t[A + 4]) === A + 188) continue
                            } else k = A + 4;
                            switch (R) {
                                case c:
                                    D && (f && (s = V(f)) && this.parseAVCPES(o, d, s, !1), f = {
                                        data: [],
                                        size: 0
                                    }), f && (f.data.push(t.subarray(k, A + 188)), f.size += A + 188 - k);
                                    break;
                                case g:
                                    if (D) {
                                        if (m && (s = V(m))) switch (l.segmentCodec) {
                                            case "aac":
                                                this.parseAACPES(l, s);
                                                break;
                                            case "mp3":
                                                this.parseMPEGPES(l, s)
                                        }
                                        m = {
                                            data: [],
                                            size: 0
                                        }
                                    }
                                    m && (m.data.push(t.subarray(k, A + 188)), m.size += A + 188 - k);
                                    break;
                                case p:
                                    D && (y && (s = V(y)) && this.parseID3PES(u, s), y = {
                                        data: [],
                                        size: 0
                                    }), y && (y.data.push(t.subarray(k, A + 188)), y.size += A + 188 - k);
                                    break;
                                case 0:
                                    D && (k += t[k] + 1), E = this._pmtId = K(t, k);
                                    break;
                                case E:
                                    D && (k += t[k] + 1);
                                    var _ = H(t, k, this.typeSupported, i);
                                    (c = _.avc) > 0 && (o.pid = c), (g = _.audio) > 0 && (l.pid = g, l.segmentCodec = _.segmentCodec), (p = _.id3) > 0 && (u.pid = p), null === T || b || (v.b.log("unknown PID '" + T + "' in TS found"), T = null), b = this.pmtParsed = !0;
                                    break;
                                case 17:
                                case 8191:
                                    break;
                                default:
                                    T = R
                            }
                        } else L++;
                    L > 0 && this.observer.emit(r.a.ERROR, r.a.ERROR, {
                        type: n.b.MEDIA_ERROR,
                        details: n.a.FRAG_PARSING_ERROR,
                        fatal: !1,
                        reason: "Found " + L + " TS packet/s that do not start with 0x47"
                    }), o.pesData = f, l.pesData = m, u.pesData = y;
                    var I = {
                        audioTrack: l,
                        videoTrack: o,
                        id3Track: u,
                        textTrack: d
                    };
                    return a && this.extractRemainingSamples(I), I
                }, e.flush = function () {
                    var t, e = this.remainderData;
                    return this.remainderData = null, t = e ? this.demux(e, -1, !1, !0) : {
                        videoTrack: this._avcTrack,
                        audioTrack: this._audioTrack,
                        id3Track: this._id3Track,
                        textTrack: this._txtTrack
                    }, this.extractRemainingSamples(t), this.sampleAes ? this.decrypt(t, this.sampleAes) : t
                }, e.extractRemainingSamples = function (t) {
                    var e, i = t.audioTrack,
                        r = t.videoTrack,
                        n = t.id3Track,
                        a = t.textTrack,
                        s = r.pesData,
                        o = i.pesData,
                        l = n.pesData;
                    if (s && (e = V(s)) ? (this.parseAVCPES(r, a, e, !0), r.pesData = null) : r.pesData = s, o && (e = V(o))) {
                        switch (i.segmentCodec) {
                            case "aac":
                                this.parseAACPES(i, e);
                                break;
                            case "mp3":
                                this.parseMPEGPES(i, e)
                        }
                        i.pesData = null
                    } else null != o && o.size && v.b.log("last AAC PES packet truncated,might overlap between fragments"), i.pesData = o;
                    l && (e = V(l)) ? (this.parseID3PES(n, e), n.pesData = null) : n.pesData = l
                }, e.demuxSampleAes = function (t, e, i) {
                    var r = this.demux(t, i, !0, !this.config.progressive),
                        n = this.sampleAes = new B(this.observer, this.config, e);
                    return this.decrypt(r, n)
                }, e.decrypt = function (t, e) {
                    return new Promise((function (i) {
                        var r = t.audioTrack,
                            n = t.videoTrack;
                        r.samples && "aac" === r.segmentCodec ? e.decryptAacSamples(r.samples, 0, (function () {
                            n.samples ? e.decryptAvcSamples(n.samples, 0, 0, (function () {
                                i(t)
                            })) : i(t)
                        })) : n.samples && e.decryptAvcSamples(n.samples, 0, 0, (function () {
                            i(t)
                        }))
                    }))
                }, e.destroy = function () {
                    this._duration = 0
                }, e.parseAVCPES = function (t, e, i, r) {
                    var n, a = this,
                        s = this.parseAVCNALu(t, i.data),
                        o = this.avcSample,
                        l = !1;
                    i.data = null, o && s.length && !t.audFound && (W(o, t), o = this.avcSample = j(!1, i.pts, i.dts, "")), s.forEach((function (r) {
                        switch (r.type) {
                            case 1:
                                n = !0, o || (o = a.avcSample = j(!0, i.pts, i.dts, "")), o.frame = !0;
                                var s = r.data;
                                if (l && s.length > 4) {
                                    var u = new U(s).readSliceType();
                                    2 !== u && 4 !== u && 7 !== u && 9 !== u || (o.key = !0)
                                }
                                break;
                            case 5:
                                n = !0, o || (o = a.avcSample = j(!0, i.pts, i.dts, "")), o.key = !0, o.frame = !0;
                                break;
                            case 6:
                                n = !0, Object(h.i)(Y(r.data), i.pts, e.samples);
                                break;
                            case 7:
                                if (n = !0, l = !0, !t.sps) {
                                    var d = new U(r.data).readSPS();
                                    t.width = d.width, t.height = d.height, t.pixelRatio = d.pixelRatio, t.sps = [r.data], t.duration = a._duration;
                                    for (var c = r.data.subarray(1, 4), f = "avc1.", g = 0; g < 3; g++) {
                                        var v = c[g].toString(16);
                                        v.length < 2 && (v = "0" + v), f += v
                                    }
                                    t.codec = f
                                }
                                break;
                            case 8:
                                n = !0, t.pps || (t.pps = [r.data]);
                                break;
                            case 9:
                                n = !1, t.audFound = !0, o && W(o, t), o = a.avcSample = j(!1, i.pts, i.dts, "");
                                break;
                            case 12:
                                n = !0;
                                break;
                            default:
                                n = !1, o && (o.debug += "unknown NAL " + r.type + " ")
                        }
                        o && n && o.units.push(r)
                    })), r && o && (W(o, t), this.avcSample = null)
                }, e.getLastNalUnit = function (t) {
                    var e, i, r = this.avcSample;
                    if (r && 0 !== r.units.length || (r = t[t.length - 1]), null !== (e = r) && void 0 !== e && e.units) {
                        var n = r.units;
                        i = n[n.length - 1]
                    }
                    return i
                }, e.parseAVCNALu = function (t, e) {
                    var i, r, n = e.byteLength,
                        a = t.naluState || 0,
                        s = a,
                        o = [],
                        l = 0,
                        u = -1,
                        h = 0;
                    for (-1 === a && (u = 0, h = 31 & e[0], a = 0, l = 1); l < n;)
                        if (i = e[l++], a)
                            if (1 !== a)
                                if (i)
                                    if (1 === i) {
                                        if (u >= 0) {
                                            var d = {
                                                data: e.subarray(u, l - a - 1),
                                                type: h
                                            };
                                            o.push(d)
                                        } else {
                                            var c = this.getLastNalUnit(t.samples);
                                            if (c && (s && l <= 4 - s && c.state && (c.data = c.data.subarray(0, c.data.byteLength - s)), (r = l - a - 1) > 0)) {
                                                var f = new Uint8Array(c.data.byteLength + r);
                                                f.set(c.data, 0), f.set(e.subarray(0, r), c.data.byteLength), c.data = f, c.state = 0
                                            }
                                        }
                                        l < n ? (u = l, h = 31 & e[l], a = 0) : a = -1
                                    } else a = 0;
                    else a = 3;
                    else a = i ? 0 : 2;
                    else a = i ? 0 : 1;
                    if (u >= 0 && a >= 0) {
                        var g = {
                            data: e.subarray(u, n),
                            type: h,
                            state: a
                        };
                        o.push(g)
                    }
                    if (0 === o.length) {
                        var v = this.getLastNalUnit(t.samples);
                        if (v) {
                            var p = new Uint8Array(v.data.byteLength + e.byteLength);
                            p.set(v.data, 0), p.set(e, v.data.byteLength), v.data = p
                        }
                    }
                    return t.naluState = a, o
                }, e.parseAACPES = function (t, e) {
                    var i, a, s, o, l, u = 0,
                        h = this.aacOverFlow,
                        d = e.data;
                    if (h) {
                        this.aacOverFlow = null;
                        var c = h.missing,
                            f = h.sample.unit.byteLength;
                        if (-1 === c) {
                            var g = new Uint8Array(f + d.byteLength);
                            g.set(h.sample.unit, 0), g.set(d, f), d = g
                        } else {
                            var p = f - c;
                            h.sample.unit.set(d.subarray(0, c), p), t.samples.push(h.sample), u = h.missing
                        }
                    }
                    for (i = u, a = d.length; i < a - 1 && !T(d, i); i++);
                    if (i !== u && (i < a - 1 ? (s = "AAC PES did not start with ADTS header,offset:" + i, o = !1) : (s = "no ADTS header found in AAC PES", o = !0), v.b.warn("parsing error:" + s), this.observer.emit(r.a.ERROR, r.a.ERROR, {
                            type: n.b.MEDIA_ERROR,
                            details: n.a.FRAG_PARSING_ERROR,
                            fatal: o,
                            reason: s
                        }), o)) return;
                    if (E(t, this.observer, d, i, this.audioCodec), void 0 !== e.pts) l = e.pts;
                    else {
                        if (!h) return void v.b.warn("[tsdemuxer]: AAC PES unknown PTS");
                        var m = S(t.samplerate);
                        l = h.sample.pts + m
                    }
                    for (var y, b = 0; i < a;) {
                        if (i += (y = L(t, d, i, l, b)).length, y.missing) {
                            this.aacOverFlow = y;
                            break
                        }
                        for (b++; i < a - 1 && !T(d, i); i++);
                    }
                }, e.parseMPEGPES = function (t, e) {
                    var i = e.data,
                        r = i.length,
                        n = 0,
                        a = 0,
                        s = e.pts;
                    if (void 0 !== s)
                        for (; a < r;)
                            if (M(i, a)) {
                                var o = x(t, i, a, s, n);
                                if (!o) break;
                                a += o.length, n++
                            } else a++;
                    else v.b.warn("[tsdemuxer]: MPEG PES unknown PTS")
                }, e.parseID3PES = function (t, e) {
                    if (void 0 !== e.pts) {
                        var i = G({}, e, {
                            type: this._avcTrack ? l.a.emsg : l.a.audioId3
                        });
                        t.samples.push(i)
                    } else v.b.warn("[tsdemuxer]: ID3 PES unknown PTS")
                }, t
            }();
    
            function z(t, e) {
                return (z = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var X = function (t) {
                    var e, i;
    
                    function r() {
                        return t.apply(this, arguments) || this
                    }
                    i = t, (e = r).prototype = Object.create(i.prototype), e.prototype.constructor = e, z(e, i);
                    var n = r.prototype;
                    return n.resetInitSegment = function (e, i, r, n) {
                        t.prototype.resetInitSegment.call(this, e, i, r, n), this._audioTrack = {
                            container: "audio/mpeg",
                            type: "audio",
                            id: 2,
                            pid: -1,
                            sequenceNumber: 0,
                            segmentCodec: "mp3",
                            samples: [],
                            manifestCodec: i,
                            duration: n,
                            inputTimeScale: 9e4,
                            dropped: 0
                        }
                    }, r.probe = function (t) {
                        if (!t) return !1;
                        for (var e = (o.b(t, 0) || []).length, i = t.length; e < i; e++)
                            if (N(t, e)) return v.b.log("MPEG Audio sync word found !"), !0;
                        return !1
                    }, n.canParse = function (t, e) {
                        return function (t, e) {
                            return F(t, e) && 4 <= t.length - e
                        }(t, e)
                    }, n.appendFrame = function (t, e, i) {
                        if (null !== this.basePTS) return x(t, e, i, this.basePTS, this.frameIndex)
                    }, r
                }(g),
                Q = i(13),
                $ = i(6);
    
            function J(t, e) {
                var i = null == t ? void 0 : t.codec;
                return i && i.length > 4 ? i : "hvc1" === i || "hev1" === i ? "hvc1.1.c.L120.90" : "av01" === i ? "av01.0.04M.08" : "avc1" === i || e === $.a.VIDEO ? "avc1.42e01e" : "mp4a.40.5"
            }
            var Z, tt = function () {
                function t() {
                    this.emitInitSegment = !1, this.audioCodec = void 0, this.videoCodec = void 0, this.initData = void 0, this.initPTS = void 0, this.initTracks = void 0, this.lastEndTime = null
                }
                var e = t.prototype;
                return e.destroy = function () {}, e.resetTimeStamp = function (t) {
                    this.initPTS = t, this.lastEndTime = null
                }, e.resetNextTimestamp = function () {
                    this.lastEndTime = null
                }, e.resetInitSegment = function (t, e, i) {
                    this.audioCodec = e, this.videoCodec = i, this.generateInitSegment(t), this.emitInitSegment = !0
                }, e.generateInitSegment = function (t) {
                    var e = this.audioCodec,
                        i = this.videoCodec;
                    if (!t || !t.byteLength) return this.initTracks = void 0, void(this.initData = void 0);
                    var r = this.initData = Object(h.h)(t);
                    e || (e = J(r.audio, $.a.AUDIO)), i || (i = J(r.video, $.a.VIDEO));
                    var n = {};
                    r.audio && r.video ? n.audiovideo = {
                        container: "video/mp4",
                        codec: e + "," + i,
                        initSegment: t,
                        id: "main"
                    } : r.audio ? n.audio = {
                        container: "audio/mp4",
                        codec: e,
                        initSegment: t,
                        id: "audio"
                    } : r.video ? n.video = {
                        container: "video/mp4",
                        codec: i,
                        initSegment: t,
                        id: "main"
                    } : v.b.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."), this.initTracks = n
                }, e.remux = function (t, e, i, r, n) {
                    var a, o = this.initPTS,
                        l = this.lastEndTime,
                        u = {
                            audio: void 0,
                            video: void 0,
                            text: r,
                            id3: i,
                            initSegment: void 0
                        };
                    Object(s.a)(l) || (l = this.lastEndTime = n || 0);
                    var d = e.samples;
                    if (!d || !d.length) return u;
                    var c = {
                            initPTS: void 0,
                            timescale: 1
                        },
                        f = this.initData;
                    if (f && f.length || (this.generateInitSegment(d), f = this.initData), !f || !f.length) return v.b.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."), u;
                    this.emitInitSegment && (c.tracks = this.initTracks, this.emitInitSegment = !1);
                    var g = Object(h.e)(f, d);
                    Object(s.a)(o) || (this.initPTS = c.initPTS = o = g - n);
                    var p = Object(h.d)(d, f),
                        m = t ? g - o : l,
                        y = m + p;
                    Object(h.f)(f, d, o), p > 0 ? this.lastEndTime = y : (v.b.warn("Duration parsed from mp4 should be greater than zero"), this.resetNextTimestamp());
                    var T = !!f.audio,
                        b = !!f.video,
                        E = "";
                    T && (E += "audio"), b && (E += "video");
                    var S = {
                        data1: d,
                        startPTS: m,
                        startDTS: m,
                        endPTS: y,
                        endDTS: y,
                        type: E,
                        hasAudio: T,
                        hasVideo: b,
                        nb: 1,
                        dropped: 0
                    };
                    u.audio = "audio" === S.type ? S : void 0, u.video = "audio" !== S.type ? S : void 0, u.initSegment = c;
                    var L = null != (a = this.initPTS) ? a : 0;
                    return u.id3 = Object(Q.b)(i, n, L, L), r.samples.length && (u.text = Object(Q.c)(r, n, L)), u
                }, t
            }();
            try {
                Z = self.performance.now.bind(self.performance)
            } catch (t) {
                v.b.debug("Unable to use Performance API on this environment"), Z = self.Date.now
            }
            var et = [{
                    demux: q,
                    remux: Q.a
                }, {
                    demux: k,
                    remux: tt
                }, {
                    demux: D,
                    remux: Q.a
                }, {
                    demux: X,
                    remux: Q.a
                }],
                it = function () {
                    function t(t, e, i, r, n) {
                        this.observer = void 0, this.typeSupported = void 0, this.config = void 0, this.vendor = void 0, this.id = void 0, this.demuxer = void 0, this.remuxer = void 0, this.decrypter = void 0, this.probe = void 0, this.decryptionPromise = null, this.transmuxConfig = void 0, this.currentTransmuxState = void 0, this.observer = t, this.typeSupported = e, this.config = i, this.vendor = r, this.id = n
                    }
                    var e = t.prototype;
                    return e.configure = function (t) {
                        this.transmuxConfig = t, this.decrypter && this.decrypter.reset()
                    }, e.push = function (t, e, i, r) {
                        var n = this,
                            a = i.transmuxing;
                        a.executeStart = Z();
                        var s = new Uint8Array(t),
                            o = this.config,
                            l = this.currentTransmuxState,
                            u = this.transmuxConfig;
                        r && (this.currentTransmuxState = r);
                        var h = r || l,
                            d = h.contiguous,
                            c = h.discontinuity,
                            f = h.trackSwitch,
                            g = h.accurateTimeOffset,
                            v = h.timeOffset,
                            p = h.initSegmentChange,
                            m = u.audioCodec,
                            y = u.videoCodec,
                            T = u.defaultInitPts,
                            b = u.duration,
                            E = u.initSegmentData;
                        (c || f || p) && this.resetInitSegment(E, m, y, b), (c || p) && this.resetInitialTimestamp(T), d || this.resetContiguity();
                        var S = function (t, e) {
                            var i = null;
                            t.byteLength > 0 && null != e && null != e.key && null !== e.iv && null != e.method && (i = e);
                            return i
                        }(s, e);
                        if (S && "AES-128" === S.method) {
                            var L = this.getDecrypter();
                            if (!o.enableSoftwareAES) return this.decryptionPromise = L.webCryptoDecrypt(s, S.key.buffer, S.iv.buffer).then((function (t) {
                                var e = n.push(t, null, i);
                                return n.decryptionPromise = null, e
                            })), this.decryptionPromise;
                            var A = L.softwareDecrypt(s, S.key.buffer, S.iv.buffer);
                            if (!A) return a.executeEnd = Z(), rt(i);
                            s = new Uint8Array(A)
                        }
                        this.needsProbing(s, c, f) && this.configureTransmuxer(s, u);
                        var D = this.transmux(s, S, v, g, i),
                            R = this.currentTransmuxState;
                        return R.contiguous = !0, R.discontinuity = !1, R.trackSwitch = !1, a.executeEnd = Z(), D
                    }, e.flush = function (t) {
                        var e = this,
                            i = t.transmuxing;
                        i.executeStart = Z();
                        var a = this.decrypter,
                            s = this.currentTransmuxState,
                            o = this.decryptionPromise;
                        if (o) return o.then((function () {
                            return e.flush(t)
                        }));
                        var l = [],
                            u = s.timeOffset;
                        if (a) {
                            var h = a.flush();
                            h && l.push(this.push(h, null, t))
                        }
                        var d = this.demuxer,
                            c = this.remuxer;
                        if (!d || !c) return this.observer.emit(r.a.ERROR, r.a.ERROR, {
                            type: n.b.MEDIA_ERROR,
                            details: n.a.FRAG_PARSING_ERROR,
                            fatal: !0,
                            reason: "no demux matching with content found"
                        }), i.executeEnd = Z(), [rt(t)];
                        var f = d.flush(u);
                        return nt(f) ? f.then((function (i) {
                            return e.flushRemux(l, i, t), l
                        })) : (this.flushRemux(l, f, t), l)
                    }, e.flushRemux = function (t, e, i) {
                        var r = e.audioTrack,
                            n = e.videoTrack,
                            a = e.id3Track,
                            s = e.textTrack,
                            o = this.currentTransmuxState,
                            l = o.accurateTimeOffset,
                            u = o.timeOffset;
                        v.b.log("[transmuxer.ts]: Flushed fragment " + i.sn + (i.part > -1 ? " p: " + i.part : "") + " of level " + i.level);
                        var h = this.remuxer.remux(r, n, a, s, u, l, !0, this.id);
                        t.push({
                            remuxResult: h,
                            chunkMeta: i
                        }), i.transmuxing.executeEnd = Z()
                    }, e.resetInitialTimestamp = function (t) {
                        var e = this.demuxer,
                            i = this.remuxer;
                        e && i && (e.resetTimeStamp(t), i.resetTimeStamp(t))
                    }, e.resetContiguity = function () {
                        var t = this.demuxer,
                            e = this.remuxer;
                        t && e && (t.resetContiguity(), e.resetNextTimestamp())
                    }, e.resetInitSegment = function (t, e, i, r) {
                        var n = this.demuxer,
                            a = this.remuxer;
                        n && a && (n.resetInitSegment(t, e, i, r), a.resetInitSegment(t, e, i))
                    }, e.destroy = function () {
                        this.demuxer && (this.demuxer.destroy(), this.demuxer = void 0), this.remuxer && (this.remuxer.destroy(), this.remuxer = void 0)
                    }, e.transmux = function (t, e, i, r, n) {
                        return e && "SAMPLE-AES" === e.method ? this.transmuxSampleAes(t, e, i, r, n) : this.transmuxUnencrypted(t, i, r, n)
                    }, e.transmuxUnencrypted = function (t, e, i, r) {
                        var n = this.demuxer.demux(t, e, !1, !this.config.progressive),
                            a = n.audioTrack,
                            s = n.videoTrack,
                            o = n.id3Track,
                            l = n.textTrack;
                        return {
                            remuxResult: this.remuxer.remux(a, s, o, l, e, i, !1, this.id),
                            chunkMeta: r
                        }
                    }, e.transmuxSampleAes = function (t, e, i, r, n) {
                        var a = this;
                        return this.demuxer.demuxSampleAes(t, e, i).then((function (t) {
                            return {
                                remuxResult: a.remuxer.remux(t.audioTrack, t.videoTrack, t.id3Track, t.textTrack, i, r, !1, a.id),
                                chunkMeta: n
                            }
                        }))
                    }, e.configureTransmuxer = function (t, e) {
                        for (var i, r = this.config, n = this.observer, a = this.typeSupported, s = this.vendor, o = e.audioCodec, l = e.defaultInitPts, u = e.duration, h = e.initSegmentData, d = e.videoCodec, c = 0, f = et.length; c < f; c++)
                            if (et[c].demux.probe(t)) {
                                i = et[c];
                                break
                            } i || (v.b.warn("Failed to find demuxer by probing frag, treating as mp4 passthrough"), i = {
                            demux: k,
                            remux: tt
                        });
                        var g = this.demuxer,
                            p = this.remuxer,
                            m = i.remux,
                            y = i.demux;
                        p && p instanceof m || (this.remuxer = new m(n, r, a, s)), g && g instanceof y || (this.demuxer = new y(n, r, a), this.probe = y.probe), this.resetInitSegment(h, o, d, u), this.resetInitialTimestamp(l)
                    }, e.needsProbing = function (t, e, i) {
                        return !this.demuxer || !this.remuxer || e || i
                    }, e.getDecrypter = function () {
                        var t = this.decrypter;
                        return t || (t = this.decrypter = new a.a(this.observer, this.config)), t
                    }, t
                }();
            var rt = function (t) {
                return {
                    remuxResult: {},
                    chunkMeta: t
                }
            };
    
            function nt(t) {
                return "then" in t && t.then instanceof Function
            }
            var at = function (t, e, i, r, n) {
                    this.audioCodec = void 0, this.videoCodec = void 0, this.initSegmentData = void 0, this.duration = void 0, this.defaultInitPts = void 0, this.audioCodec = t, this.videoCodec = e, this.initSegmentData = i, this.duration = r, this.defaultInitPts = n
                },
                st = function (t, e, i, r, n, a) {
                    this.discontinuity = void 0, this.contiguous = void 0, this.accurateTimeOffset = void 0, this.trackSwitch = void 0, this.timeOffset = void 0, this.initSegmentChange = void 0, this.discontinuity = t, this.contiguous = e, this.accurateTimeOffset = i, this.trackSwitch = r, this.timeOffset = n, this.initSegmentChange = a
                }
        }, function (t, e, i) {
            "use strict";
            i.d(e, "c", (function () {
                return n
            })), i.d(e, "b", (function () {
                return a
            })), i.d(e, "a", (function () {
                return s
            }));
    
            function r(t, e, i, r) {
                void 0 === i && (i = 1), void 0 === r && (r = !1);
                var n = t * e * i;
                return r ? Math.round(n) : n
            }
    
            function n(t, e, i, n) {
                return void 0 === i && (i = 1), void 0 === n && (n = !1), r(t, e, 1 / i, n)
            }
    
            function a(t, e) {
                return void 0 === e && (e = !1), r(t, 1e3, 1 / 9e4, e)
            }
    
            function s(t, e) {
                return void 0 === e && (e = 1), r(t, 9e4, 1 / e)
            }
        }, function (t, e, i) {
            var r, n, a, s, o;
            r = /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/, n = /^(?=([^\/?#]*))\1([^]*)$/, a = /(?:\/|^)\.(?=\/)/g, s = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g, o = {
                buildAbsoluteURL: function (t, e, i) {
                    if (i = i || {}, t = t.trim(), !(e = e.trim())) {
                        if (!i.alwaysNormalize) return t;
                        var r = o.parseURL(t);
                        if (!r) throw new Error("Error trying to parse base URL.");
                        return r.path = o.normalizePath(r.path), o.buildURLFromParts(r)
                    }
                    var a = o.parseURL(e);
                    if (!a) throw new Error("Error trying to parse relative URL.");
                    if (a.scheme) return i.alwaysNormalize ? (a.path = o.normalizePath(a.path), o.buildURLFromParts(a)) : e;
                    var s = o.parseURL(t);
                    if (!s) throw new Error("Error trying to parse base URL.");
                    if (!s.netLoc && s.path && "/" !== s.path[0]) {
                        var l = n.exec(s.path);
                        s.netLoc = l[1], s.path = l[2]
                    }
                    s.netLoc && !s.path && (s.path = "/");
                    var u = {
                        scheme: s.scheme,
                        netLoc: a.netLoc,
                        path: null,
                        params: a.params,
                        query: a.query,
                        fragment: a.fragment
                    };
                    if (!a.netLoc && (u.netLoc = s.netLoc, "/" !== a.path[0]))
                        if (a.path) {
                            var h = s.path,
                                d = h.substring(0, h.lastIndexOf("/") + 1) + a.path;
                            u.path = o.normalizePath(d)
                        } else u.path = s.path, a.params || (u.params = s.params, a.query || (u.query = s.query));
                    return null === u.path && (u.path = i.alwaysNormalize ? o.normalizePath(a.path) : a.path), o.buildURLFromParts(u)
                },
                parseURL: function (t) {
                    var e = r.exec(t);
                    return e ? {
                        scheme: e[1] || "",
                        netLoc: e[2] || "",
                        path: e[3] || "",
                        params: e[4] || "",
                        query: e[5] || "",
                        fragment: e[6] || ""
                    } : null
                },
                normalizePath: function (t) {
                    for (t = t.split("").reverse().join("").replace(a, ""); t.length !== (t = t.replace(s, "")).length;);
                    return t.split("").reverse().join("")
                },
                buildURLFromParts: function (t) {
                    return t.scheme + t.netLoc + t.path + t.params + t.query + t.fragment
                }
            }, t.exports = o
        }, function (t, e, i) {
            "use strict";
            i.d(e, "a", (function () {
                return p
            })), i.d(e, "d", (function () {
                return m
            })), i.d(e, "b", (function () {
                return y
            })), i.d(e, "c", (function () {
                return T
            }));
            var r = i(3),
                n = function () {
                    function t() {}
                    return t.getSilentFrame = function (t, e) {
                        switch (t) {
                            case "mp4a.40.2":
                                if (1 === e) return new Uint8Array([0, 200, 0, 128, 35, 128]);
                                if (2 === e) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                                if (3 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                                if (4 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                                if (5 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                                if (6 === e) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
                                break;
                            default:
                                if (1 === e) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                                if (2 === e) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                                if (3 === e) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
                        }
                    }, t
                }(),
                a = Math.pow(2, 32) - 1,
                s = function () {
                    function t() {}
                    return t.init = function () {
                        var e;
                        for (e in t.types = {
                                avc1: [],
                                avcC: [],
                                btrt: [],
                                dinf: [],
                                dref: [],
                                esds: [],
                                ftyp: [],
                                hdlr: [],
                                mdat: [],
                                mdhd: [],
                                mdia: [],
                                mfhd: [],
                                minf: [],
                                moof: [],
                                moov: [],
                                mp4a: [],
                                ".mp3": [],
                                mvex: [],
                                mvhd: [],
                                pasp: [],
                                sdtp: [],
                                stbl: [],
                                stco: [],
                                stsc: [],
                                stsd: [],
                                stsz: [],
                                stts: [],
                                tfdt: [],
                                tfhd: [],
                                traf: [],
                                trak: [],
                                trun: [],
                                trex: [],
                                tkhd: [],
                                vmhd: [],
                                smhd: []
                            }, t.types) t.types.hasOwnProperty(e) && (t.types[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
                        var i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
                            r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
                        t.HDLR_TYPES = {
                            video: i,
                            audio: r
                        };
                        var n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
                            a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
                        t.STTS = t.STSC = t.STCO = a, t.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), t.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]), t.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), t.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
                        var s = new Uint8Array([105, 115, 111, 109]),
                            o = new Uint8Array([97, 118, 99, 49]),
                            l = new Uint8Array([0, 0, 0, 1]);
                        t.FTYP = t.box(t.types.ftyp, s, l, s, o), t.DINF = t.box(t.types.dinf, t.box(t.types.dref, n))
                    }, t.box = function (t) {
                        for (var e = 8, i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++) r[n - 1] = arguments[n];
                        for (var a = r.length, s = a; a--;) e += r[a].byteLength;
                        var o = new Uint8Array(e);
                        for (o[0] = e >> 24 & 255, o[1] = e >> 16 & 255, o[2] = e >> 8 & 255, o[3] = 255 & e, o.set(t, 4), a = 0, e = 8; a < s; a++) o.set(r[a], e), e += r[a].byteLength;
                        return o
                    }, t.hdlr = function (e) {
                        return t.box(t.types.hdlr, t.HDLR_TYPES[e])
                    }, t.mdat = function (e) {
                        return t.box(t.types.mdat, e)
                    }, t.mdhd = function (e, i) {
                        i *= e;
                        var r = Math.floor(i / (a + 1)),
                            n = Math.floor(i % (a + 1));
                        return t.box(t.types.mdhd, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, 85, 196, 0, 0]))
                    }, t.mdia = function (e) {
                        return t.box(t.types.mdia, t.mdhd(e.timescale, e.duration), t.hdlr(e.type), t.minf(e))
                    }, t.mfhd = function (e) {
                        return t.box(t.types.mfhd, new Uint8Array([0, 0, 0, 0, e >> 24, e >> 16 & 255, e >> 8 & 255, 255 & e]))
                    }, t.minf = function (e) {
                        return "audio" === e.type ? t.box(t.types.minf, t.box(t.types.smhd, t.SMHD), t.DINF, t.stbl(e)) : t.box(t.types.minf, t.box(t.types.vmhd, t.VMHD), t.DINF, t.stbl(e))
                    }, t.moof = function (e, i, r) {
                        return t.box(t.types.moof, t.mfhd(e), t.traf(r, i))
                    }, t.moov = function (e) {
                        for (var i = e.length, r = []; i--;) r[i] = t.trak(e[i]);
                        return t.box.apply(null, [t.types.moov, t.mvhd(e[0].timescale, e[0].duration)].concat(r).concat(t.mvex(e)))
                    }, t.mvex = function (e) {
                        for (var i = e.length, r = []; i--;) r[i] = t.trex(e[i]);
                        return t.box.apply(null, [t.types.mvex].concat(r))
                    }, t.mvhd = function (e, i) {
                        i *= e;
                        var r = Math.floor(i / (a + 1)),
                            n = Math.floor(i % (a + 1)),
                            s = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
                        return t.box(t.types.mvhd, s)
                    }, t.sdtp = function (e) {
                        var i, r, n = e.samples || [],
                            a = new Uint8Array(4 + n.length);
                        for (i = 0; i < n.length; i++) r = n[i].flags, a[i + 4] = r.dependsOn << 4 | r.isDependedOn << 2 | r.hasRedundancy;
                        return t.box(t.types.sdtp, a)
                    }, t.stbl = function (e) {
                        return t.box(t.types.stbl, t.stsd(e), t.box(t.types.stts, t.STTS), t.box(t.types.stsc, t.STSC), t.box(t.types.stsz, t.STSZ), t.box(t.types.stco, t.STCO))
                    }, t.avc1 = function (e) {
                        var i, r, n, a = [],
                            s = [];
                        for (i = 0; i < e.sps.length; i++) n = (r = e.sps[i]).byteLength, a.push(n >>> 8 & 255), a.push(255 & n), a = a.concat(Array.prototype.slice.call(r));
                        for (i = 0; i < e.pps.length; i++) n = (r = e.pps[i]).byteLength, s.push(n >>> 8 & 255), s.push(255 & n), s = s.concat(Array.prototype.slice.call(r));
                        var o = t.box(t.types.avcC, new Uint8Array([1, a[3], a[4], a[5], 255, 224 | e.sps.length].concat(a).concat([e.pps.length]).concat(s))),
                            l = e.width,
                            u = e.height,
                            h = e.pixelRatio[0],
                            d = e.pixelRatio[1];
                        return t.box(t.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l >> 8 & 255, 255 & l, u >> 8 & 255, 255 & u, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), o, t.box(t.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])), t.box(t.types.pasp, new Uint8Array([h >> 24, h >> 16 & 255, h >> 8 & 255, 255 & h, d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d])))
                    }, t.esds = function (t) {
                        var e = t.config.length;
                        return new Uint8Array([0, 0, 0, 0, 3, 23 + e, 0, 1, 0, 4, 15 + e, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([e]).concat(t.config).concat([6, 1, 2]))
                    }, t.mp4a = function (e) {
                        var i = e.samplerate;
                        return t.box(t.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, i >> 8 & 255, 255 & i, 0, 0]), t.box(t.types.esds, t.esds(e)))
                    }, t.mp3 = function (e) {
                        var i = e.samplerate;
                        return t.box(t.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, i >> 8 & 255, 255 & i, 0, 0]))
                    }, t.stsd = function (e) {
                        return "audio" === e.type ? "mp3" === e.segmentCodec && "mp3" === e.codec ? t.box(t.types.stsd, t.STSD, t.mp3(e)) : t.box(t.types.stsd, t.STSD, t.mp4a(e)) : t.box(t.types.stsd, t.STSD, t.avc1(e))
                    }, t.tkhd = function (e) {
                        var i = e.id,
                            r = e.duration * e.timescale,
                            n = e.width,
                            s = e.height,
                            o = Math.floor(r / (a + 1)),
                            l = Math.floor(r % (a + 1));
                        return t.box(t.types.tkhd, new Uint8Array([1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i, 0, 0, 0, 0, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o, l >> 24, l >> 16 & 255, l >> 8 & 255, 255 & l, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, n >> 8 & 255, 255 & n, 0, 0, s >> 8 & 255, 255 & s, 0, 0]))
                    }, t.traf = function (e, i) {
                        var r = t.sdtp(e),
                            n = e.id,
                            s = Math.floor(i / (a + 1)),
                            o = Math.floor(i % (a + 1));
                        return t.box(t.types.traf, t.box(t.types.tfhd, new Uint8Array([0, 0, 0, 0, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n])), t.box(t.types.tfdt, new Uint8Array([1, 0, 0, 0, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o])), t.trun(e, r.length + 16 + 20 + 8 + 16 + 8 + 8), r)
                    }, t.trak = function (e) {
                        return e.duration = e.duration || 4294967295, t.box(t.types.trak, t.tkhd(e), t.mdia(e))
                    }, t.trex = function (e) {
                        var i = e.id;
                        return t.box(t.types.trex, new Uint8Array([0, 0, 0, 0, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]))
                    }, t.trun = function (e, i) {
                        var r, n, a, s, o, l, u = e.samples || [],
                            h = u.length,
                            d = 12 + 16 * h,
                            c = new Uint8Array(d);
                        for (i += 8 + d, c.set(["video" === e.type ? 1 : 0, 0, 15, 1, h >>> 24 & 255, h >>> 16 & 255, h >>> 8 & 255, 255 & h, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i], 0), r = 0; r < h; r++) a = (n = u[r]).duration, s = n.size, o = n.flags, l = n.cts, c.set([a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, 255 & a, s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, 255 & s, o.isLeading << 2 | o.dependsOn, o.isDependedOn << 6 | o.hasRedundancy << 4 | o.paddingValue << 1 | o.isNonSync, 61440 & o.degradPrio, 15 & o.degradPrio, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l], 12 + 16 * r);
                        return t.box(t.types.trun, c)
                    }, t.initSegment = function (e) {
                        t.types || t.init();
                        var i = t.moov(e),
                            r = new Uint8Array(t.FTYP.byteLength + i.byteLength);
                        return r.set(t.FTYP), r.set(i, t.FTYP.byteLength), r
                    }, t
                }();
            s.types = void 0, s.HDLR_TYPES = void 0, s.STTS = void 0, s.STSC = void 0, s.STCO = void 0, s.STSZ = void 0, s.VMHD = void 0, s.SMHD = void 0, s.STSD = void 0, s.FTYP = void 0, s.DINF = void 0;
            var o = s,
                l = i(0),
                u = i(2),
                h = i(1),
                d = i(4),
                c = i(11);
    
            function f() {
                return (f = Object.assign ? Object.assign.bind() : function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
                    }
                    return t
                }).apply(this, arguments)
            }
            var g = null,
                v = null,
                p = function () {
                    function t(t, e, i, r) {
                        if (void 0 === r && (r = ""), this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.ISGenerated = !1, this._initPTS = void 0, this._initDTS = void 0, this.nextAvcDts = null, this.nextAudioPts = null, this.videoSampleDuration = null, this.isAudioContiguous = !1, this.isVideoContiguous = !1, this.observer = t, this.config = e, this.typeSupported = i, this.ISGenerated = !1, null === g) {
                            var n = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                            g = n ? parseInt(n[1]) : 0
                        }
                        if (null === v) {
                            var a = navigator.userAgent.match(/Safari\/(\d+)/i);
                            v = a ? parseInt(a[1]) : 0
                        }
                    }
                    var e = t.prototype;
                    return e.destroy = function () {}, e.resetTimeStamp = function (t) {
                        h.b.log("[mp4-remuxer]: initPTS & initDTS reset"), this._initPTS = this._initDTS = t
                    }, e.resetNextTimestamp = function () {
                        h.b.log("[mp4-remuxer]: reset next timestamp"), this.isVideoContiguous = !1, this.isAudioContiguous = !1
                    }, e.resetInitSegment = function () {
                        h.b.log("[mp4-remuxer]: ISGenerated flag reset"), this.ISGenerated = !1
                    }, e.getVideoStartPts = function (t) {
                        var e = !1,
                            i = t.reduce((function (t, i) {
                                var r = i.pts - t;
                                return r < -4294967296 ? (e = !0, m(t, i.pts)) : r > 0 ? t : i.pts
                            }), t[0].pts);
                        return e && h.b.debug("PTS rollover detected"), i
                    }, e.remux = function (t, e, i, r, n, a, s, o) {
                        var l, u, c, f, g, v, p = n,
                            b = n,
                            E = t.pid > -1,
                            S = e.pid > -1,
                            L = e.samples.length,
                            A = t.samples.length > 0,
                            D = s && L > 0 || L > 1;
                        if ((!E || A) && (!S || D) || this.ISGenerated || s) {
                            this.ISGenerated || (c = this.generateIS(t, e, n));
                            var R, k = this.isVideoContiguous,
                                _ = -1;
                            if (D && (_ = function (t) {
                                    for (var e = 0; e < t.length; e++)
                                        if (t[e].key) return e;
                                    return -1
                                }(e.samples), !k && this.config.forceKeyFrameOnDiscontinuity))
                                if (v = !0, _ > 0) {
                                    h.b.warn("[mp4-remuxer]: Dropped " + _ + " out of " + L + " video samples due to a missing keyframe");
                                    var I = this.getVideoStartPts(e.samples);
                                    e.samples = e.samples.slice(_), e.dropped += _, R = b += (e.samples[0].pts - I) / e.inputTimeScale
                                } else -1 === _ && (h.b.warn("[mp4-remuxer]: No keyframe found out of " + L + " video samples"), v = !1);
                            if (this.ISGenerated) {
                                if (A && D) {
                                    var O = this.getVideoStartPts(e.samples),
                                        C = (m(t.samples[0].pts, O) - O) / e.inputTimeScale;
                                    p += Math.max(0, C), b += Math.max(0, -C)
                                }
                                if (A) {
                                    if (t.samplerate || (h.b.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"), c = this.generateIS(t, e, n)), u = this.remuxAudio(t, p, this.isAudioContiguous, a, S || D || o === d.b.AUDIO ? b : void 0), D) {
                                        var w = u ? u.endPTS - u.startPTS : 0;
                                        e.inputTimeScale || (h.b.warn("[mp4-remuxer]: regenerate InitSegment as video detected"), c = this.generateIS(t, e, n)), l = this.remuxVideo(e, b, k, w)
                                    }
                                } else D && (l = this.remuxVideo(e, b, k, 0));
                                l && (l.firstKeyFrame = _, l.independent = -1 !== _, l.firstKeyFramePTS = R)
                            }
                        }
                        return this.ISGenerated && (i.samples.length && (g = y(i, n, this._initPTS, this._initDTS)), r.samples.length && (f = T(r, n, this._initPTS))), {
                            audio: u,
                            video: l,
                            initSegment: c,
                            independent: v,
                            text: f,
                            id3: g
                        }
                    }, e.generateIS = function (t, e, i) {
                        var n, a, s, l = t.samples,
                            u = e.samples,
                            h = this.typeSupported,
                            d = {},
                            c = !Object(r.a)(this._initPTS),
                            f = "audio/mp4";
                        if (c && (n = a = 1 / 0), t.config && l.length) {
                            switch (t.timescale = t.samplerate, t.segmentCodec) {
                                case "mp3":
                                    h.mpeg ? (f = "audio/mpeg", t.codec = "") : h.mp3 && (t.codec = "mp3")
                            }
                            d.audio = {
                                id: "audio",
                                container: f,
                                codec: t.codec,
                                initSegment: "mp3" === t.segmentCodec && h.mpeg ? new Uint8Array(0) : o.initSegment([t]),
                                metadata: {
                                    channelCount: t.channelCount
                                }
                            }, c && (s = t.inputTimeScale, n = a = l[0].pts - Math.round(s * i))
                        }
                        if (e.sps && e.pps && u.length && (e.timescale = e.inputTimeScale, d.video = {
                                id: "main",
                                container: "video/mp4",
                                codec: e.codec,
                                initSegment: o.initSegment([e]),
                                metadata: {
                                    width: e.width,
                                    height: e.height
                                }
                            }, c)) {
                            s = e.inputTimeScale;
                            var g = this.getVideoStartPts(u),
                                v = Math.round(s * i);
                            a = Math.min(a, m(u[0].dts, g) - v), n = Math.min(n, g - v)
                        }
                        if (Object.keys(d).length) return this.ISGenerated = !0, c && (this._initPTS = n, this._initDTS = a), {
                            tracks: d,
                            initPTS: n,
                            timescale: s
                        }
                    }, e.remuxVideo = function (t, e, i, r) {
                        var n, a, s = t.inputTimeScale,
                            d = t.samples,
                            p = [],
                            y = d.length,
                            T = this._initPTS,
                            E = this.nextAvcDts,
                            S = 8,
                            L = this.videoSampleDuration,
                            A = Number.POSITIVE_INFINITY,
                            D = Number.NEGATIVE_INFINITY,
                            R = !1;
                        i && null !== E || (E = e * s - (d[0].pts - m(d[0].dts, d[0].pts)));
                        for (var k = 0; k < y; k++) {
                            var _ = d[k];
                            _.pts = m(_.pts - T, E), _.dts = m(_.dts - T, E), _.dts < d[k > 0 ? k - 1 : k].dts && (R = !0)
                        }
                        R && d.sort((function (t, e) {
                            var i = t.dts - e.dts,
                                r = t.pts - e.pts;
                            return i || r
                        })), n = d[0].dts;
                        var I = (a = d[d.length - 1].dts) - n,
                            O = I ? Math.round(I / (y - 1)) : L || t.inputTimeScale / 30;
                        if (i) {
                            var C = n - E,
                                w = C > O;
                            if (w || C < -1) {
                                w ? h.b.warn("AVC: " + Object(c.b)(C, !0) + " ms (" + C + "dts) hole between fragments detected, filling it") : h.b.warn("AVC: " + Object(c.b)(-C, !0) + " ms (" + C + "dts) overlapping between fragments detected"), n = E;
                                var x = d[0].pts - C;
                                d[0].dts = n, d[0].pts = x, h.b.log("Video: First PTS/DTS adjusted: " + Object(c.b)(x, !0) + "/" + Object(c.b)(n, !0) + ", delta: " + Object(c.b)(C, !0) + " ms")
                            }
                        }
                        n = Math.max(0, n);
                        for (var P = 0, F = 0, M = 0; M < y; M++) {
                            for (var N = d[M], U = N.units, B = U.length, G = 0, j = 0; j < B; j++) G += U[j].data.length;
                            F += G, P += B, N.length = G, N.dts = Math.max(N.dts, n), A = Math.min(N.pts, A), D = Math.max(N.pts, D)
                        }
                        a = d[y - 1].dts;
                        var K, H = F + 4 * P + 8;
                        try {
                            K = new Uint8Array(H)
                        } catch (t) {
                            return void this.observer.emit(l.a.ERROR, l.a.ERROR, {
                                type: u.b.MUX_ERROR,
                                details: u.a.REMUX_ALLOC_ERROR,
                                fatal: !1,
                                bytes: H,
                                reason: "fail allocating video mdat " + H
                            })
                        }
                        var V = new DataView(K.buffer);
                        V.setUint32(0, H), K.set(o.types.mdat, 4);
                        for (var W = !1, Y = Number.POSITIVE_INFINITY, q = Number.POSITIVE_INFINITY, z = Number.NEGATIVE_INFINITY, X = Number.NEGATIVE_INFINITY, Q = 0; Q < y; Q++) {
                            for (var $ = d[Q], J = $.units, Z = 0, tt = 0, et = J.length; tt < et; tt++) {
                                var it = J[tt],
                                    rt = it.data,
                                    nt = it.data.byteLength;
                                V.setUint32(S, nt), S += 4, K.set(rt, S), S += nt, Z += 4 + nt
                            }
                            var at = void 0;
                            if (Q < y - 1) L = d[Q + 1].dts - $.dts, at = d[Q + 1].pts - $.pts;
                            else {
                                var st = this.config,
                                    ot = Q > 0 ? $.dts - d[Q - 1].dts : O;
                                if (at = Q > 0 ? $.pts - d[Q - 1].pts : O, st.stretchShortVideoTrack && null !== this.nextAudioPts) {
                                    var lt = Math.floor(st.maxBufferHole * s),
                                        ut = (r ? A + r * s : this.nextAudioPts) - $.pts;
                                    ut > lt ? ((L = ut - ot) < 0 ? L = ot : W = !0, h.b.log("[mp4-remuxer]: It is approximately " + ut / 90 + " ms to the next segment; using duration " + L / 90 + " ms for the last video frame.")) : L = ot
                                } else L = ot
                            }
                            var ht = Math.round($.pts - $.dts);
                            Y = Math.min(Y, L), z = Math.max(z, L), q = Math.min(q, at), X = Math.max(X, at), p.push(new b($.key, L, Z, ht))
                        }
                        if (p.length)
                            if (g) {
                                if (g < 70) {
                                    var dt = p[0].flags;
                                    dt.dependsOn = 2, dt.isNonSync = 0
                                }
                            } else if (v && X - q < z - Y && O / z < .025 && 0 === p[0].cts) {
                            h.b.warn("Found irregular gaps in sample duration. Using PTS instead of DTS to determine MP4 sample duration.");
                            for (var ct = n, ft = 0, gt = p.length; ft < gt; ft++) {
                                var vt = ct + p[ft].duration,
                                    pt = ct + p[ft].cts;
                                if (ft < gt - 1) {
                                    var mt = vt + p[ft + 1].cts;
                                    p[ft].duration = mt - pt
                                } else p[ft].duration = ft ? p[ft - 1].duration : O;
                                p[ft].cts = 0, ct = vt
                            }
                        }
                        L = W || !L ? O : L, this.nextAvcDts = E = a + L, this.videoSampleDuration = L, this.isVideoContiguous = !0;
                        var yt = {
                            data1: o.moof(t.sequenceNumber++, n, f({}, t, {
                                samples: p
                            })),
                            data2: K,
                            startPTS: A / s,
                            endPTS: (D + L) / s,
                            startDTS: n / s,
                            endDTS: E / s,
                            type: "video",
                            hasAudio: !1,
                            hasVideo: !0,
                            nb: p.length,
                            dropped: t.dropped
                        };
                        return t.samples = [], t.dropped = 0, yt
                    }, e.remuxAudio = function (t, e, i, r, a) {
                        var s = t.inputTimeScale,
                            d = s / (t.samplerate ? t.samplerate : s),
                            c = "aac" === t.segmentCodec ? 1024 : 1152,
                            g = c * d,
                            v = this._initPTS,
                            p = "mp3" === t.segmentCodec && this.typeSupported.mpeg,
                            y = [],
                            T = void 0 !== a,
                            E = t.samples,
                            S = p ? 0 : 8,
                            L = this.nextAudioPts || -1,
                            A = e * s;
                        if (this.isAudioContiguous = i = i || E.length && L > 0 && (r && Math.abs(A - L) < 9e3 || Math.abs(m(E[0].pts - v, A) - L) < 20 * g), E.forEach((function (t) {
                                t.pts = m(t.pts - v, A)
                            })), !i || L < 0) {
                            if (!(E = E.filter((function (t) {
                                    return t.pts >= 0
                                }))).length) return;
                            L = 0 === a ? 0 : r && !T ? Math.max(0, A) : E[0].pts
                        }
                        if ("aac" === t.segmentCodec)
                            for (var D = this.config.maxAudioFramesDrift, R = 0, k = L; R < E.length; R++) {
                                var _ = E[R],
                                    I = _.pts,
                                    O = I - k,
                                    C = Math.abs(1e3 * O / s);
                                if (O <= -D * g && T) 0 === R && (h.b.warn("Audio frame @ " + (I / s).toFixed(3) + "s overlaps nextAudioPts by " + Math.round(1e3 * O / s) + " ms."), this.nextAudioPts = L = k = I);
                                else if (O >= D * g && C < 1e4 && T) {
                                    var w = Math.round(O / g);
                                    (k = I - w * g) < 0 && (w--, k += g), 0 === R && (this.nextAudioPts = L = k), h.b.warn("[mp4-remuxer]: Injecting " + w + " audio frame @ " + (k / s).toFixed(3) + "s due to " + Math.round(1e3 * O / s) + " ms gap.");
                                    for (var x = 0; x < w; x++) {
                                        var P = Math.max(k, 0),
                                            F = n.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
                                        F || (h.b.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."), F = _.unit.subarray()), E.splice(R, 0, {
                                            unit: F,
                                            pts: P
                                        }), k += g, R++
                                    }
                                }
                                _.pts = k, k += g
                            }
                        for (var M, N = null, U = null, B = 0, G = E.length; G--;) B += E[G].unit.byteLength;
                        for (var j = 0, K = E.length; j < K; j++) {
                            var H = E[j],
                                V = H.unit,
                                W = H.pts;
                            if (null !== U) {
                                y[j - 1].duration = Math.round((W - U) / d)
                            } else {
                                if (i && "aac" === t.segmentCodec && (W = L), N = W, !(B > 0)) return;
                                B += S;
                                try {
                                    M = new Uint8Array(B)
                                } catch (t) {
                                    return void this.observer.emit(l.a.ERROR, l.a.ERROR, {
                                        type: u.b.MUX_ERROR,
                                        details: u.a.REMUX_ALLOC_ERROR,
                                        fatal: !1,
                                        bytes: B,
                                        reason: "fail allocating audio mdat " + B
                                    })
                                }
                                p || (new DataView(M.buffer).setUint32(0, B), M.set(o.types.mdat, 4))
                            }
                            M.set(V, S);
                            var Y = V.byteLength;
                            S += Y, y.push(new b(!0, c, Y, 0)), U = W
                        }
                        var q = y.length;
                        if (q) {
                            var z = y[y.length - 1];
                            this.nextAudioPts = L = U + d * z.duration;
                            var X = p ? new Uint8Array(0) : o.moof(t.sequenceNumber++, N / d, f({}, t, {
                                samples: y
                            }));
                            t.samples = [];
                            var Q = N / s,
                                $ = L / s,
                                J = {
                                    data1: X,
                                    data2: M,
                                    startPTS: Q,
                                    endPTS: $,
                                    startDTS: Q,
                                    endDTS: $,
                                    type: "audio",
                                    hasAudio: !0,
                                    hasVideo: !1,
                                    nb: q
                                };
                            return this.isAudioContiguous = !0, J
                        }
                    }, e.remuxEmptyAudio = function (t, e, i, r) {
                        var a = t.inputTimeScale,
                            s = a / (t.samplerate ? t.samplerate : a),
                            o = this.nextAudioPts,
                            l = (null !== o ? o : r.startDTS * a) + this._initDTS,
                            u = r.endDTS * a + this._initDTS,
                            d = 1024 * s,
                            c = Math.ceil((u - l) / d),
                            f = n.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
                        if (h.b.warn("[mp4-remuxer]: remux empty Audio"), f) {
                            for (var g = [], v = 0; v < c; v++) {
                                var p = l + v * d;
                                g.push({
                                    unit: f,
                                    pts: p,
                                    dts: p
                                })
                            }
                            return t.samples = g, this.remuxAudio(t, e, i, !1)
                        }
                        h.b.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec")
                    }, t
                }();
    
            function m(t, e) {
                var i;
                if (null === e) return t;
                for (i = e < t ? -8589934592 : 8589934592; Math.abs(t - e) > 4294967296;) t += i;
                return t
            }
    
            function y(t, e, i, r) {
                var n = t.samples.length;
                if (n) {
                    for (var a = t.inputTimeScale, s = 0; s < n; s++) {
                        var o = t.samples[s];
                        o.pts = m(o.pts - i, e * a) / a, o.dts = m(o.dts - r, e * a) / a
                    }
                    var l = t.samples;
                    return t.samples = [], {
                        samples: l
                    }
                }
            }
    
            function T(t, e, i) {
                var r = t.samples.length;
                if (r) {
                    for (var n = t.inputTimeScale, a = 0; a < r; a++) {
                        var s = t.samples[a];
                        s.pts = m(s.pts - i, e * n) / n
                    }
                    t.samples.sort((function (t, e) {
                        return t.pts - e.pts
                    }));
                    var o = t.samples;
                    return t.samples = [], {
                        samples: o
                    }
                }
            }
            var b = function (t, e, i, r) {
                    this.size = void 0, this.duration = void 0, this.cts = void 0, this.flags = void 0, this.duration = e, this.size = i, this.cts = r, this.flags = new E(t)
                },
                E = function (t) {
                    this.isLeading = 0, this.isDependedOn = 0, this.hasRedundancy = 0, this.degradPrio = 0, this.dependsOn = 1, this.isNonSync = 1, this.dependsOn = t ? 2 : 1, this.isNonSync = t ? 0 : 1
                }
        }, function (t, e, i) {
            "use strict";
            i.d(e, "a", (function () {
                return r
            }));
            var r = function () {
                this.aborted = !1, this.loaded = 0, this.retry = 0, this.total = 0, this.chunkCount = 0, this.bwEstimate = 0, this.loading = {
                    start: 0,
                    first: 0,
                    end: 0
                }, this.parsing = {
                    start: 0,
                    end: 0
                }, this.buffering = {
                    start: 0,
                    first: 0,
                    end: 0
                }
            }
        }, function (t, e, i) {
            "use strict";
            var r = Object.prototype.hasOwnProperty,
                n = "~";
    
            function a() {}
    
            function s(t, e, i) {
                this.fn = t, this.context = e, this.once = i || !1
            }
    
            function o(t, e, i, r, a) {
                if ("function" != typeof i) throw new TypeError("The listener must be a function");
                var o = new s(i, r || t, a),
                    l = n ? n + e : e;
                return t._events[l] ? t._events[l].fn ? t._events[l] = [t._events[l], o] : t._events[l].push(o) : (t._events[l] = o, t._eventsCount++), t
            }
    
            function l(t, e) {
                0 == --t._eventsCount ? t._events = new a : delete t._events[e]
            }
    
            function u() {
                this._events = new a, this._eventsCount = 0
            }
            Object.create && (a.prototype = Object.create(null), (new a).__proto__ || (n = !1)), u.prototype.eventNames = function () {
                var t, e, i = [];
                if (0 === this._eventsCount) return i;
                for (e in t = this._events) r.call(t, e) && i.push(n ? e.slice(1) : e);
                return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(t)) : i
            }, u.prototype.listeners = function (t) {
                var e = n ? n + t : t,
                    i = this._events[e];
                if (!i) return [];
                if (i.fn) return [i.fn];
                for (var r = 0, a = i.length, s = new Array(a); r < a; r++) s[r] = i[r].fn;
                return s
            }, u.prototype.listenerCount = function (t) {
                var e = n ? n + t : t,
                    i = this._events[e];
                return i ? i.fn ? 1 : i.length : 0
            }, u.prototype.emit = function (t, e, i, r, a, s) {
                var o = n ? n + t : t;
                if (!this._events[o]) return !1;
                var l, u, h = this._events[o],
                    d = arguments.length;
                if (h.fn) {
                    switch (h.once && this.removeListener(t, h.fn, void 0, !0), d) {
                        case 1:
                            return h.fn.call(h.context), !0;
                        case 2:
                            return h.fn.call(h.context, e), !0;
                        case 3:
                            return h.fn.call(h.context, e, i), !0;
                        case 4:
                            return h.fn.call(h.context, e, i, r), !0;
                        case 5:
                            return h.fn.call(h.context, e, i, r, a), !0;
                        case 6:
                            return h.fn.call(h.context, e, i, r, a, s), !0
                    }
                    for (u = 1, l = new Array(d - 1); u < d; u++) l[u - 1] = arguments[u];
                    h.fn.apply(h.context, l)
                } else {
                    var c, f = h.length;
                    for (u = 0; u < f; u++) switch (h[u].once && this.removeListener(t, h[u].fn, void 0, !0), d) {
                        case 1:
                            h[u].fn.call(h[u].context);
                            break;
                        case 2:
                            h[u].fn.call(h[u].context, e);
                            break;
                        case 3:
                            h[u].fn.call(h[u].context, e, i);
                            break;
                        case 4:
                            h[u].fn.call(h[u].context, e, i, r);
                            break;
                        default:
                            if (!l)
                                for (c = 1, l = new Array(d - 1); c < d; c++) l[c - 1] = arguments[c];
                            h[u].fn.apply(h[u].context, l)
                    }
                }
                return !0
            }, u.prototype.on = function (t, e, i) {
                return o(this, t, e, i, !1)
            }, u.prototype.once = function (t, e, i) {
                return o(this, t, e, i, !0)
            }, u.prototype.removeListener = function (t, e, i, r) {
                var a = n ? n + t : t;
                if (!this._events[a]) return this;
                if (!e) return l(this, a), this;
                var s = this._events[a];
                if (s.fn) s.fn !== e || r && !s.once || i && s.context !== i || l(this, a);
                else {
                    for (var o = 0, u = [], h = s.length; o < h; o++)(s[o].fn !== e || r && !s[o].once || i && s[o].context !== i) && u.push(s[o]);
                    u.length ? this._events[a] = 1 === u.length ? u[0] : u : l(this, a)
                }
                return this
            }, u.prototype.removeAllListeners = function (t) {
                var e;
                return t ? (e = n ? n + t : t, this._events[e] && l(this, e)) : (this._events = new a, this._eventsCount = 0), this
            }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = n, u.EventEmitter = u, t.exports = u
        }, function (t, e, i) {
            "use strict";
            i.d(e, "a", (function () {
                return u
            }));
            var r = function () {
                    function t(t, e) {
                        this.subtle = void 0, this.aesIV = void 0, this.subtle = t, this.aesIV = e
                    }
                    return t.prototype.decrypt = function (t, e) {
                        return this.subtle.decrypt({
                            name: "AES-CBC",
                            iv: this.aesIV
                        }, e, t)
                    }, t
                }(),
                n = function () {
                    function t(t, e) {
                        this.subtle = void 0, this.key = void 0, this.subtle = t, this.key = e
                    }
                    return t.prototype.expandKey = function () {
                        return this.subtle.importKey("raw", this.key, {
                            name: "AES-CBC"
                        }, !1, ["encrypt", "decrypt"])
                    }, t
                }(),
                a = i(9);
            var s = function () {
                    function t() {
                        this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.sBox = new Uint32Array(256), this.invSBox = new Uint32Array(256), this.key = new Uint32Array(0), this.ksRows = 0, this.keySize = 0, this.keySchedule = void 0, this.invKeySchedule = void 0, this.initTable()
                    }
                    var e = t.prototype;
                    return e.uint8ArrayToUint32Array_ = function (t) {
                        for (var e = new DataView(t), i = new Uint32Array(4), r = 0; r < 4; r++) i[r] = e.getUint32(4 * r);
                        return i
                    }, e.initTable = function () {
                        var t = this.sBox,
                            e = this.invSBox,
                            i = this.subMix,
                            r = i[0],
                            n = i[1],
                            a = i[2],
                            s = i[3],
                            o = this.invSubMix,
                            l = o[0],
                            u = o[1],
                            h = o[2],
                            d = o[3],
                            c = new Uint32Array(256),
                            f = 0,
                            g = 0,
                            v = 0;
                        for (v = 0; v < 256; v++) c[v] = v < 128 ? v << 1 : v << 1 ^ 283;
                        for (v = 0; v < 256; v++) {
                            var p = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4;
                            p = p >>> 8 ^ 255 & p ^ 99, t[f] = p, e[p] = f;
                            var m = c[f],
                                y = c[m],
                                T = c[y],
                                b = 257 * c[p] ^ 16843008 * p;
                            r[f] = b << 24 | b >>> 8, n[f] = b << 16 | b >>> 16, a[f] = b << 8 | b >>> 24, s[f] = b, b = 16843009 * T ^ 65537 * y ^ 257 * m ^ 16843008 * f, l[p] = b << 24 | b >>> 8, u[p] = b << 16 | b >>> 16, h[p] = b << 8 | b >>> 24, d[p] = b, f ? (f = m ^ c[c[c[T ^ m]]], g ^= c[c[g]]) : f = g = 1
                        }
                    }, e.expandKey = function (t) {
                        for (var e = this.uint8ArrayToUint32Array_(t), i = !0, r = 0; r < e.length && i;) i = e[r] === this.key[r], r++;
                        if (!i) {
                            this.key = e;
                            var n = this.keySize = e.length;
                            if (4 !== n && 6 !== n && 8 !== n) throw new Error("Invalid aes key size=" + n);
                            var a, s, o, l, u = this.ksRows = 4 * (n + 6 + 1),
                                h = this.keySchedule = new Uint32Array(u),
                                d = this.invKeySchedule = new Uint32Array(u),
                                c = this.sBox,
                                f = this.rcon,
                                g = this.invSubMix,
                                v = g[0],
                                p = g[1],
                                m = g[2],
                                y = g[3];
                            for (a = 0; a < u; a++) a < n ? o = h[a] = e[a] : (l = o, a % n == 0 ? (l = c[(l = l << 8 | l >>> 24) >>> 24] << 24 | c[l >>> 16 & 255] << 16 | c[l >>> 8 & 255] << 8 | c[255 & l], l ^= f[a / n | 0] << 24) : n > 6 && a % n == 4 && (l = c[l >>> 24] << 24 | c[l >>> 16 & 255] << 16 | c[l >>> 8 & 255] << 8 | c[255 & l]), h[a] = o = (h[a - n] ^ l) >>> 0);
                            for (s = 0; s < u; s++) a = u - s, l = 3 & s ? h[a] : h[a - 4], d[s] = s < 4 || a <= 4 ? l : v[c[l >>> 24]] ^ p[c[l >>> 16 & 255]] ^ m[c[l >>> 8 & 255]] ^ y[c[255 & l]], d[s] = d[s] >>> 0
                        }
                    }, e.networkToHostOrderSwap = function (t) {
                        return t << 24 | (65280 & t) << 8 | (16711680 & t) >> 8 | t >>> 24
                    }, e.decrypt = function (t, e, i) {
                        for (var r, n, a, s, o, l, u, h, d, c, f, g, v, p, m = this.keySize + 6, y = this.invKeySchedule, T = this.invSBox, b = this.invSubMix, E = b[0], S = b[1], L = b[2], A = b[3], D = this.uint8ArrayToUint32Array_(i), R = D[0], k = D[1], _ = D[2], I = D[3], O = new Int32Array(t), C = new Int32Array(O.length), w = this.networkToHostOrderSwap; e < O.length;) {
                            for (d = w(O[e]), c = w(O[e + 1]), f = w(O[e + 2]), g = w(O[e + 3]), o = d ^ y[0], l = g ^ y[1], u = f ^ y[2], h = c ^ y[3], v = 4, p = 1; p < m; p++) r = E[o >>> 24] ^ S[l >> 16 & 255] ^ L[u >> 8 & 255] ^ A[255 & h] ^ y[v], n = E[l >>> 24] ^ S[u >> 16 & 255] ^ L[h >> 8 & 255] ^ A[255 & o] ^ y[v + 1], a = E[u >>> 24] ^ S[h >> 16 & 255] ^ L[o >> 8 & 255] ^ A[255 & l] ^ y[v + 2], s = E[h >>> 24] ^ S[o >> 16 & 255] ^ L[l >> 8 & 255] ^ A[255 & u] ^ y[v + 3], o = r, l = n, u = a, h = s, v += 4;
                            r = T[o >>> 24] << 24 ^ T[l >> 16 & 255] << 16 ^ T[u >> 8 & 255] << 8 ^ T[255 & h] ^ y[v], n = T[l >>> 24] << 24 ^ T[u >> 16 & 255] << 16 ^ T[h >> 8 & 255] << 8 ^ T[255 & o] ^ y[v + 1], a = T[u >>> 24] << 24 ^ T[h >> 16 & 255] << 16 ^ T[o >> 8 & 255] << 8 ^ T[255 & l] ^ y[v + 2], s = T[h >>> 24] << 24 ^ T[o >> 16 & 255] << 16 ^ T[l >> 8 & 255] << 8 ^ T[255 & u] ^ y[v + 3], C[e] = w(r ^ R), C[e + 1] = w(s ^ k), C[e + 2] = w(a ^ _), C[e + 3] = w(n ^ I), R = d, k = c, _ = f, I = g, e += 4
                        }
                        return C.buffer
                    }, t
                }(),
                o = i(1),
                l = i(5),
                u = function () {
                    function t(t, e, i) {
                        var r = (void 0 === i ? {} : i).removePKCS7Padding,
                            n = void 0 === r || r;
                        if (this.logEnabled = !0, this.observer = void 0, this.config = void 0, this.removePKCS7Padding = void 0, this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null, this.observer = t, this.config = e, this.removePKCS7Padding = n, n) try {
                            var a = self.crypto;
                            a && (this.subtle = a.subtle || a.webkitSubtle)
                        } catch (t) {}
                        null === this.subtle && (this.config.enableSoftwareAES = !0)
                    }
                    var e = t.prototype;
                    return e.destroy = function () {
                        this.observer = null
                    }, e.isSync = function () {
                        return this.config.enableSoftwareAES
                    }, e.flush = function () {
                        var t = this.currentResult;
                        if (t) {
                            var e, i, r, n = new Uint8Array(t);
                            return this.reset(), this.removePKCS7Padding ? (i = (e = n).byteLength, (r = i && new DataView(e.buffer).getUint8(i - 1)) ? Object(a.a)(e, 0, i - r) : e) : n
                        }
                        this.reset()
                    }, e.reset = function () {
                        this.currentResult = null, this.currentIV = null, this.remainderData = null, this.softwareDecrypter && (this.softwareDecrypter = null)
                    }, e.decrypt = function (t, e, i, r) {
                        if (this.config.enableSoftwareAES) {
                            this.softwareDecrypt(new Uint8Array(t), e, i);
                            var n = this.flush();
                            n && r(n.buffer)
                        } else this.webCryptoDecrypt(new Uint8Array(t), e, i).then(r)
                    }, e.softwareDecrypt = function (t, e, i) {
                        var r = this.currentIV,
                            n = this.currentResult,
                            o = this.remainderData;
                        this.logOnce("JS AES decrypt"), o && (t = Object(l.b)(o, t), this.remainderData = null);
                        var u = this.getValidChunk(t);
                        if (!u.length) return null;
                        r && (i = r);
                        var h = this.softwareDecrypter;
                        h || (h = this.softwareDecrypter = new s), h.expandKey(e);
                        var d = n;
                        return this.currentResult = h.decrypt(u.buffer, 0, i), this.currentIV = Object(a.a)(u, -16).buffer, d || null
                    }, e.webCryptoDecrypt = function (t, e, i) {
                        var a = this,
                            s = this.subtle;
                        return this.key === e && this.fastAesKey || (this.key = e, this.fastAesKey = new n(s, e)), this.fastAesKey.expandKey().then((function (e) {
                            return s ? new r(s, i).decrypt(t.buffer, e) : Promise.reject(new Error("web crypto not initialized"))
                        })).catch((function (r) {
                            return a.onWebCryptoError(r, t, e, i)
                        }))
                    }, e.onWebCryptoError = function (t, e, i, r) {
                        return o.b.warn("[decrypter.ts]: WebCrypto Error, disable WebCrypto API:", t), this.config.enableSoftwareAES = !0, this.logEnabled = !0, this.softwareDecrypt(e, i, r)
                    }, e.getValidChunk = function (t) {
                        var e = t,
                            i = t.length - t.length % 16;
                        return i !== t.length && (e = Object(a.a)(t, 0, i), this.remainderData = Object(a.a)(t, i)), e
                    }, e.logOnce = function (t) {
                        this.logEnabled && (o.b.log("[decrypter.ts]: " + t), this.logEnabled = !1)
                    }, t
                }()
        }, function (t, e, i) {
            "use strict";
            i.d(e, "a", (function () {
                return a
            }));
            var r = i(12);
    
            function n(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            var a = function () {
                function t(t, e) {
                    this._uri = null, this.method = null, this.keyFormat = null, this.keyFormatVersions = null, this.keyID = null, this.key = null, this.iv = null, this._uri = e ? Object(r.buildAbsoluteURL)(t, e, {
                        alwaysNormalize: !0
                    }) : t
                }
                var e, i, a;
                return t.fromURL = function (e, i) {
                    return new t(e, i)
                }, t.fromURI = function (e) {
                    return new t(e)
                }, e = t, (i = [{
                    key: "uri",
                    get: function () {
                        return this._uri
                    }
                }]) && n(e.prototype, i), a && n(e, a), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t
            }()
        }, function (t, e, i) {
            function r(t) {
                var e = {};
    
                function i(r) {
                    if (e[r]) return e[r].exports;
                    var n = e[r] = {
                        i: r,
                        l: !1,
                        exports: {}
                    };
                    return t[r].call(n.exports, n, n.exports, i), n.l = !0, n.exports
                }
                i.m = t, i.c = e, i.i = function (t) {
                    return t
                }, i.d = function (t, e, r) {
                    i.o(t, e) || Object.defineProperty(t, e, {
                        configurable: !1,
                        enumerable: !0,
                        get: r
                    })
                }, i.r = function (t) {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    })
                }, i.n = function (t) {
                    var e = t && t.__esModule ? function () {
                        return t.default
                    } : function () {
                        return t
                    };
                    return i.d(e, "a", e), e
                }, i.o = function (t, e) {
                    return Object.prototype.hasOwnProperty.call(t, e)
                }, i.p = "/", i.oe = function (t) {
                    throw console.error(t), t
                };
                var r = i(i.s = ENTRY_MODULE);
                return r.default || r
            }
    
            function n(t) {
                return (t + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
            }
    
            function a(t, e, r) {
                var a = {};
                a[r] = [];
                var s = e.toString(),
                    o = s.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
                if (!o) return a;
                for (var l, u = o[1], h = new RegExp("(\\\\n|\\W)" + n(u) + "\\(\\s*(/\\*.*?\\*/)?\\s*.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)", "g"); l = h.exec(s);) "dll-reference" !== l[3] && a[r].push(l[3]);
                for (h = new RegExp("\\(" + n(u) + '\\("(dll-reference\\s([\\.|\\-|\\+|\\w|/|@]+))"\\)\\)\\(\\s*(/\\*.*?\\*/)?\\s*.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)', "g"); l = h.exec(s);) t[l[2]] || (a[r].push(l[1]), t[l[2]] = i(l[1]).m), a[l[2]] = a[l[2]] || [], a[l[2]].push(l[4]);
                for (var d, c = Object.keys(a), f = 0; f < c.length; f++)
                    for (var g = 0; g < a[c[f]].length; g++) d = a[c[f]][g], isNaN(1 * d) || (a[c[f]][g] = 1 * a[c[f]][g]);
                return a
            }
    
            function s(t) {
                return Object.keys(t).reduce((function (e, i) {
                    return e || t[i].length > 0
                }), !1)
            }
            t.exports = function (t, e) {
                e = e || {};
                var n = {
                        main: i.m
                    },
                    o = e.all ? {
                        main: Object.keys(n.main)
                    } : function (t, e) {
                        for (var i = {
                                main: [e]
                            }, r = {
                                main: []
                            }, n = {
                                main: {}
                            }; s(i);)
                            for (var o = Object.keys(i), l = 0; l < o.length; l++) {
                                var u = o[l],
                                    h = i[u].pop();
                                if (n[u] = n[u] || {}, !n[u][h] && t[u][h]) {
                                    n[u][h] = !0, r[u] = r[u] || [], r[u].push(h);
                                    for (var d = a(t, t[u][h], u), c = Object.keys(d), f = 0; f < c.length; f++) i[c[f]] = i[c[f]] || [], i[c[f]] = i[c[f]].concat(d[c[f]])
                                }
                            }
                        return r
                    }(n, t),
                    l = "";
                Object.keys(o).filter((function (t) {
                    return "main" !== t
                })).forEach((function (t) {
                    for (var e = 0; o[t][e];) e++;
                    o[t].push(e), n[t][e] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", l = l + "var " + t + " = (" + r.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + o[t].map((function (e) {
                        return JSON.stringify(e) + ": " + n[t][e].toString()
                    })).join(",") + "});\n"
                })), l = l + "new ((" + r.toString().replace("ENTRY_MODULE", JSON.stringify(t)) + ")({" + o.main.map((function (t) {
                    return JSON.stringify(t) + ": " + n.main[t].toString()
                })).join(",") + "}))(self);";
                var u = new window.Blob([l], {
                    type: "text/javascript"
                });
                if (e.bare) return u;
                var h = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(u),
                    d = new window.Worker(h);
                return d.objectURL = h, d
            }
        }, function (t, e, i) {
            "use strict";
            i.r(e), i.d(e, "default", (function () {
                return o
            }));
            var r = i(10),
                n = i(0),
                a = i(1),
                s = i(15);
    
            function o(t) {
                var e = new s.EventEmitter,
                    i = function (e, i) {
                        t.postMessage({
                            event: e,
                            data: i
                        })
                    };
                e.on(n.a.FRAG_DECRYPTED, i), e.on(n.a.ERROR, i);
                t.addEventListener("message", (function (n) {
                    var s = n.data;
                    switch (s.cmd) {
                        case "init":
                            var o = JSON.parse(s.config);
                            t.transmuxer = new r.c(e, s.typeSupported, o, s.vendor, s.id), Object(a.a)(o.debug),
                                function () {
                                    var t = function (t) {
                                        a.b[t] = function (e) {
                                            i("workerLog", {
                                                logType: t,
                                                message: e
                                            })
                                        }
                                    };
                                    for (var e in a.b) t(e)
                                }(), i("init", null);
                            break;
                        case "configure":
                            t.transmuxer.configure(s.config);
                            break;
                        case "demux":
                            var u = t.transmuxer.push(s.data, s.decryptdata, s.chunkMeta, s.state);
                            Object(r.d)(u) ? u.then((function (e) {
                                l(t, e)
                            })) : l(t, u);
                            break;
                        case "flush":
                            var d = s.chunkMeta,
                                c = t.transmuxer.flush(d);
                            Object(r.d)(c) ? c.then((function (e) {
                                h(t, e, d)
                            })) : h(t, c, d)
                    }
                }))
            }
    
            function l(t, e) {
                if (!((i = e.remuxResult).audio || i.video || i.text || i.id3 || i.initSegment)) return !1;
                var i, r = [],
                    n = e.remuxResult,
                    a = n.audio,
                    s = n.video;
                return a && u(r, a), s && u(r, s), t.postMessage({
                    event: "transmuxComplete",
                    data: e
                }, r), !0
            }
    
            function u(t, e) {
                e.data1 && t.push(e.data1.buffer), e.data2 && t.push(e.data2.buffer)
            }
    
            function h(t, e, i) {
                e.reduce((function (e, i) {
                    return l(t, i) || e
                }), !1) || t.postMessage({
                    event: "transmuxComplete",
                    data: e[0]
                }), t.postMessage({
                    event: "flush",
                    data: i
                })
            }
        }, function (t, e, i) {
            "use strict";
            i.r(e), i.d(e, "default", (function () {
                return cr
            }));
            var r, n = i(12),
                a = i(3),
                s = i(0),
                o = i(2),
                l = i(1),
                u = i(5),
                h = /^(\d+)x(\d+)$/,
                d = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,
                c = function () {
                    function t(e) {
                        for (var i in "string" == typeof e && (e = t.parseAttrList(e)), e) e.hasOwnProperty(i) && (this[i] = e[i])
                    }
                    var e = t.prototype;
                    return e.decimalInteger = function (t) {
                        var e = parseInt(this[t], 10);
                        return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e
                    }, e.hexadecimalInteger = function (t) {
                        if (this[t]) {
                            var e = (this[t] || "0x").slice(2);
                            e = (1 & e.length ? "0" : "") + e;
                            for (var i = new Uint8Array(e.length / 2), r = 0; r < e.length / 2; r++) i[r] = parseInt(e.slice(2 * r, 2 * r + 2), 16);
                            return i
                        }
                        return null
                    }, e.hexadecimalIntegerAsNumber = function (t) {
                        var e = parseInt(this[t], 16);
                        return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e
                    }, e.decimalFloatingPoint = function (t) {
                        return parseFloat(this[t])
                    }, e.optionalFloat = function (t, e) {
                        var i = this[t];
                        return i ? parseFloat(i) : e
                    }, e.enumeratedString = function (t) {
                        return this[t]
                    }, e.bool = function (t) {
                        return "YES" === this[t]
                    }, e.decimalResolution = function (t) {
                        var e = h.exec(this[t]);
                        if (null !== e) return {
                            width: parseInt(e[1], 10),
                            height: parseInt(e[2], 10)
                        }
                    }, t.parseAttrList = function (t) {
                        var e, i = {};
                        for (d.lastIndex = 0; null !== (e = d.exec(t));) {
                            var r = e[2];
                            0 === r.indexOf('"') && r.lastIndexOf('"') === r.length - 1 && (r = r.slice(1, -1)), i[e[1]] = r
                        }
                        return i
                    }, t
                }();
    
            function f() {
                return (f = Object.assign ? Object.assign.bind() : function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
                    }
                    return t
                }).apply(this, arguments)
            }
    
            function g(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }! function (t) {
                t.ID = "ID", t.CLASS = "CLASS", t.START_DATE = "START-DATE", t.DURATION = "DURATION", t.END_DATE = "END-DATE", t.END_ON_NEXT = "END-ON-NEXT", t.PLANNED_DURATION = "PLANNED-DURATION", t.SCTE35_OUT = "SCTE35-OUT", t.SCTE35_IN = "SCTE35-IN"
            }(r || (r = {}));
            var v = function () {
                    function t(t, e) {
                        if (this.attr = void 0, this._startDate = void 0, this._endDate = void 0, this._badValueForSameId = void 0, e) {
                            var i = e.attr;
                            for (var n in i)
                                if (Object.prototype.hasOwnProperty.call(t, n) && t[n] !== i[n]) {
                                    l.b.warn('DATERANGE tag attribute: "' + n + '" does not match for tags with ID: "' + t.ID + '"'), this._badValueForSameId = n;
                                    break
                                } t = f(new c({}), i, t)
                        }
                        if (this.attr = t, this._startDate = new Date(t[r.START_DATE]), r.END_DATE in this.attr) {
                            var s = new Date(this.attr[r.END_DATE]);
                            Object(a.a)(s.getTime()) && (this._endDate = s)
                        }
                    }
                    var e, i, n;
                    return e = t, (i = [{
                        key: "id",
                        get: function () {
                            return this.attr.ID
                        }
                    }, {
                        key: "class",
                        get: function () {
                            return this.attr.CLASS
                        }
                    }, {
                        key: "startDate",
                        get: function () {
                            return this._startDate
                        }
                    }, {
                        key: "endDate",
                        get: function () {
                            if (this._endDate) return this._endDate;
                            var t = this.duration;
                            return null !== t ? new Date(this._startDate.getTime() + 1e3 * t) : null
                        }
                    }, {
                        key: "duration",
                        get: function () {
                            if (r.DURATION in this.attr) {
                                var t = this.attr.decimalFloatingPoint(r.DURATION);
                                if (Object(a.a)(t)) return t
                            } else if (this._endDate) return (this._endDate.getTime() - this._startDate.getTime()) / 1e3;
                            return null
                        }
                    }, {
                        key: "plannedDuration",
                        get: function () {
                            return r.PLANNED_DURATION in this.attr ? this.attr.decimalFloatingPoint(r.PLANNED_DURATION) : null
                        }
                    }, {
                        key: "endOnNext",
                        get: function () {
                            return this.attr.bool(r.END_ON_NEXT)
                        }
                    }, {
                        key: "isValid",
                        get: function () {
                            return !!this.id && !this._badValueForSameId && Object(a.a)(this.startDate.getTime()) && (null === this.duration || this.duration >= 0) && (!this.endOnNext || !!this.class)
                        }
                    }]) && g(e.prototype, i), n && g(e, n), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), t
                }(),
                p = i(6);
    
            function m(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            var y = function () {
                    function t(t) {
                        this.PTSKnown = !1, this.alignedSliding = !1, this.averagetargetduration = void 0, this.endCC = 0, this.endSN = 0, this.fragments = void 0, this.fragmentHint = void 0, this.partList = null, this.dateRanges = void 0, this.live = !0, this.ageHeader = 0, this.advancedDateTime = void 0, this.updated = !0, this.advanced = !0, this.availabilityDelay = void 0, this.misses = 0, this.needSidxRanges = !1, this.startCC = 0, this.startSN = 0, this.startTimeOffset = null, this.targetduration = 0, this.totalduration = 0, this.type = null, this.url = void 0, this.m3u8 = "", this.version = null, this.canBlockReload = !1, this.canSkipUntil = 0, this.canSkipDateRanges = !1, this.skippedSegments = 0, this.recentlyRemovedDateranges = void 0, this.partHoldBack = 0, this.holdBack = 0, this.partTarget = 0, this.preloadHint = void 0, this.renditionReports = void 0, this.tuneInGoal = 0, this.deltaUpdateFailed = void 0, this.driftStartTime = 0, this.driftEndTime = 0, this.driftStart = 0, this.driftEnd = 0, this.fragments = [], this.dateRanges = {}, this.url = t
                    }
                    var e, i, r;
                    return t.prototype.reloaded = function (t) {
                        if (!t) return this.advanced = !0, void(this.updated = !0);
                        var e = this.lastPartSn - t.lastPartSn,
                            i = this.lastPartIndex - t.lastPartIndex;
                        this.updated = this.endSN !== t.endSN || !!i || !!e, this.advanced = this.endSN > t.endSN || e > 0 || 0 === e && i > 0, this.updated || this.advanced ? this.misses = Math.floor(.6 * t.misses) : this.misses = t.misses + 1, this.availabilityDelay = t.availabilityDelay
                    }, e = t, (i = [{
                        key: "hasProgramDateTime",
                        get: function () {
                            return !!this.fragments.length && Object(a.a)(this.fragments[this.fragments.length - 1].programDateTime)
                        }
                    }, {
                        key: "levelTargetDuration",
                        get: function () {
                            return this.averagetargetduration || this.targetduration || 10
                        }
                    }, {
                        key: "drift",
                        get: function () {
                            var t = this.driftEndTime - this.driftStartTime;
                            return t > 0 ? 1e3 * (this.driftEnd - this.driftStart) / t : 1
                        }
                    }, {
                        key: "edge",
                        get: function () {
                            return this.partEnd || this.fragmentEnd
                        }
                    }, {
                        key: "partEnd",
                        get: function () {
                            var t;
                            return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].end : this.fragmentEnd
                        }
                    }, {
                        key: "fragmentEnd",
                        get: function () {
                            var t;
                            return null !== (t = this.fragments) && void 0 !== t && t.length ? this.fragments[this.fragments.length - 1].end : 0
                        }
                    }, {
                        key: "age",
                        get: function () {
                            return this.advancedDateTime ? Math.max(Date.now() - this.advancedDateTime, 0) / 1e3 : 0
                        }
                    }, {
                        key: "lastPartIndex",
                        get: function () {
                            var t;
                            return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].index : -1
                        }
                    }, {
                        key: "lastPartSn",
                        get: function () {
                            var t;
                            return null !== (t = this.partList) && void 0 !== t && t.length ? this.partList[this.partList.length - 1].fragment.sn : this.endSN
                        }
                    }]) && m(e.prototype, i), r && m(e, r), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), t
                }(),
                T = i(17),
                b = {
                    audio: {
                        a3ds: !0,
                        "ac-3": !0,
                        "ac-4": !0,
                        alac: !0,
                        alaw: !0,
                        dra1: !0,
                        "dts+": !0,
                        "dts-": !0,
                        dtsc: !0,
                        dtse: !0,
                        dtsh: !0,
                        "ec-3": !0,
                        enca: !0,
                        g719: !0,
                        g726: !0,
                        m4ae: !0,
                        mha1: !0,
                        mha2: !0,
                        mhm1: !0,
                        mhm2: !0,
                        mlpa: !0,
                        mp4a: !0,
                        "raw ": !0,
                        Opus: !0,
                        samr: !0,
                        sawb: !0,
                        sawp: !0,
                        sevc: !0,
                        sqcp: !0,
                        ssmv: !0,
                        twos: !0,
                        ulaw: !0
                    },
                    video: {
                        avc1: !0,
                        avc2: !0,
                        avc3: !0,
                        avc4: !0,
                        avcp: !0,
                        av01: !0,
                        drac: !0,
                        dva1: !0,
                        dvav: !0,
                        dvh1: !0,
                        dvhe: !0,
                        encv: !0,
                        hev1: !0,
                        hvc1: !0,
                        mjp2: !0,
                        mp4v: !0,
                        mvc1: !0,
                        mvc2: !0,
                        mvc3: !0,
                        mvc4: !0,
                        resv: !0,
                        rv60: !0,
                        s263: !0,
                        svc1: !0,
                        svc2: !0,
                        "vc-1": !0,
                        vp08: !0,
                        vp09: !0
                    },
                    text: {
                        stpp: !0,
                        wvtt: !0
                    }
                };
    
            function E(t, e) {
                return MediaSource.isTypeSupported((e || "video") + '/mp4;codecs="' + t + '"')
            }
            var S = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-SESSION-DATA:([^\r\n]*)[\r\n]+/g,
                L = /#EXT-X-MEDIA:(.*)/g,
                A = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, /(?!#) *(\S[\S ]*)/.source, /#EXT-X-BYTERANGE:*(.+)/.source, /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, /#.*/.source].join("|"), "g"),
                D = new RegExp([/#(EXTM3U)/.source, /#EXT-X-(DATERANGE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source, /#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source, /#EXT-X-(DISCONTINUITY|ENDLIST|GAP)/.source, /(#)([^:]*):(.*)/.source, /(#)(.*)(?:.*)\r?\n?/.source].join("|")),
                R = /\.(mp4|m4s|m4v|m4a)$/i;
            var k = function () {
                function t() {}
                return t.findGroup = function (t, e) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        if (r.id === e) return r
                    }
                }, t.convertAVC1ToAVCOTI = function (t) {
                    var e = t.split(".");
                    if (e.length > 2) {
                        var i = e.shift() + ".";
                        return i += parseInt(e.shift()).toString(16), i += ("000" + parseInt(e.shift()).toString(16)).slice(-4)
                    }
                    return t
                }, t.resolve = function (t, e) {
                    return n.buildAbsoluteURL(e, t, {
                        alwaysNormalize: !0
                    })
                }, t.parseMasterPlaylist = function (e, i) {
                    var r, n = [],
                        a = [],
                        s = {},
                        o = !1;
                    for (S.lastIndex = 0; null != (r = S.exec(e));)
                        if (r[1]) {
                            var l, u = new c(r[1]),
                                h = {
                                    attrs: u,
                                    bitrate: u.decimalInteger("AVERAGE-BANDWIDTH") || u.decimalInteger("BANDWIDTH"),
                                    name: u.NAME,
                                    url: t.resolve(r[2], i)
                                },
                                d = u.decimalResolution("RESOLUTION");
                            d && (h.width = d.width, h.height = d.height), _((u.CODECS || "").split(/[ ,]+/).filter((function (t) {
                                return t
                            })), h), h.videoCodec && -1 !== h.videoCodec.indexOf("avc1") && (h.videoCodec = t.convertAVC1ToAVCOTI(h.videoCodec)), null !== (l = h.unknownCodecs) && void 0 !== l && l.length || a.push(h), n.push(h)
                        } else if (r[3]) {
                        var f = new c(r[3]);
                        f["DATA-ID"] && (o = !0, s[f["DATA-ID"]] = f)
                    }
                    return {
                        levels: a.length > 0 && a.length < n.length ? a : n,
                        sessionData: o ? s : null
                    }
                }, t.parseMasterPlaylistMedia = function (e, i, r, n) {
                    var a;
                    void 0 === n && (n = []);
                    var s = [],
                        o = 0;
                    for (L.lastIndex = 0; null !== (a = L.exec(e));) {
                        var l = new c(a[1]);
                        if (l.TYPE === r) {
                            var u = {
                                attrs: l,
                                bitrate: 0,
                                id: o++,
                                groupId: l["GROUP-ID"],
                                instreamId: l["INSTREAM-ID"],
                                name: l.NAME || l.LANGUAGE || "",
                                type: r,
                                default: l.bool("DEFAULT"),
                                autoselect: l.bool("AUTOSELECT"),
                                forced: l.bool("FORCED"),
                                lang: l.LANGUAGE,
                                url: l.URI ? t.resolve(l.URI, i) : ""
                            };
                            if (n.length) {
                                var h = t.findGroup(n, u.groupId) || n[0];
                                I(u, h, "audioCodec"), I(u, h, "textCodec")
                            }
                            s.push(u)
                        }
                    }
                    return s
                }, t.parseLevelPlaylist = function (t, e, i, r, s) {
                    var o, u, h, d = new y(e),
                        f = d.fragments,
                        g = null,
                        m = 0,
                        b = 0,
                        E = 0,
                        S = 0,
                        L = null,
                        k = new p.b(r, e),
                        _ = -1,
                        I = !1;
                    for (A.lastIndex = 0, d.m3u8 = t; null !== (o = A.exec(t));) {
                        I && (I = !1, (k = new p.b(r, e)).start = E, k.sn = m, k.cc = S, k.level = i, g && (k.initSegment = g, k.rawProgramDateTime = g.rawProgramDateTime, g.rawProgramDateTime = null));
                        var w = o[1];
                        if (w) {
                            k.duration = parseFloat(w);
                            var x = (" " + o[2]).slice(1);
                            k.title = x || null, k.tagList.push(x ? ["INF", w, x] : ["INF", w])
                        } else if (o[3]) Object(a.a)(k.duration) && (k.start = E, h && (k.levelkey = h), k.sn = m, k.level = i, k.cc = S, k.urlId = s, f.push(k), k.relurl = (" " + o[3]).slice(1), O(k, L), L = k, E += k.duration, m++, b = 0, I = !0);
                        else if (o[4]) {
                            var P = (" " + o[4]).slice(1);
                            L ? k.setByteRange(P, L) : k.setByteRange(P)
                        } else if (o[5]) k.rawProgramDateTime = (" " + o[5]).slice(1), k.tagList.push(["PROGRAM-DATE-TIME", k.rawProgramDateTime]), -1 === _ && (_ = f.length);
                        else {
                            if (!(o = o[0].match(D))) {
                                l.b.warn("No matches on slow regex match for level playlist!");
                                continue
                            }
                            for (u = 1; u < o.length && void 0 === o[u]; u++);
                            var F = (" " + o[u]).slice(1),
                                M = (" " + o[u + 1]).slice(1),
                                N = o[u + 2] ? (" " + o[u + 2]).slice(1) : "";
                            switch (F) {
                                case "PLAYLIST-TYPE":
                                    d.type = M.toUpperCase();
                                    break;
                                case "MEDIA-SEQUENCE":
                                    m = d.startSN = parseInt(M);
                                    break;
                                case "SKIP":
                                    var U = new c(M),
                                        B = U.decimalInteger("SKIPPED-SEGMENTS");
                                    if (Object(a.a)(B)) {
                                        d.skippedSegments = B;
                                        for (var G = B; G--;) f.unshift(null);
                                        m += B
                                    }
                                    var j = U.enumeratedString("RECENTLY-REMOVED-DATERANGES");
                                    j && (d.recentlyRemovedDateranges = j.split("\t"));
                                    break;
                                case "TARGETDURATION":
                                    d.targetduration = parseFloat(M);
                                    break;
                                case "VERSION":
                                    d.version = parseInt(M);
                                    break;
                                case "EXTM3U":
                                    break;
                                case "ENDLIST":
                                    d.live = !1;
                                    break;
                                case "#":
                                    (M || N) && k.tagList.push(N ? [M, N] : [M]);
                                    break;
                                case "DISCONTINUITY":
                                    S++, k.tagList.push(["DIS"]);
                                    break;
                                case "GAP":
                                    k.tagList.push([F]);
                                    break;
                                case "BITRATE":
                                    k.tagList.push([F, M]);
                                    break;
                                case "DATERANGE":
                                    var K = new c(M),
                                        H = new v(K, d.dateRanges[K.ID]);
                                    H.isValid || d.skippedSegments ? d.dateRanges[H.id] = H : l.b.warn('Ignoring invalid DATERANGE tag: "' + M + '"'), k.tagList.push(["EXT-X-DATERANGE", M]);
                                    break;
                                case "DISCONTINUITY-SEQUENCE":
                                    S = parseInt(M);
                                    break;
                                case "KEY":
                                    var V, W = new c(M),
                                        Y = W.enumeratedString("METHOD"),
                                        q = W.URI,
                                        z = W.hexadecimalInteger("IV"),
                                        X = W.enumeratedString("KEYFORMATVERSIONS"),
                                        Q = W.enumeratedString("KEYID"),
                                        $ = null != (V = W.enumeratedString("KEYFORMAT")) ? V : "identity";
                                    if (["com.apple.streamingkeydelivery", "com.microsoft.playready", "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed", "com.widevine"].indexOf($) > -1) {
                                        l.b.warn("Keyformat " + $ + " is not supported from the manifest");
                                        continue
                                    }
                                    if ("identity" !== $) continue;
                                    Y && (h = T.a.fromURL(e, q), q && ["AES-128", "SAMPLE-AES", "SAMPLE-AES-CENC"].indexOf(Y) >= 0 && (h.method = Y, h.keyFormat = $, Q && (h.keyID = Q), X && (h.keyFormatVersions = X), h.iv = z));
                                    break;
                                case "START":
                                    var J = new c(M).decimalFloatingPoint("TIME-OFFSET");
                                    Object(a.a)(J) && (d.startTimeOffset = J);
                                    break;
                                case "MAP":
                                    var Z = new c(M);
                                    if (k.duration) {
                                        var tt = new p.b(r, e);
                                        C(tt, Z, i, h), g = tt, k.initSegment = g, g.rawProgramDateTime && !k.rawProgramDateTime && (k.rawProgramDateTime = g.rawProgramDateTime)
                                    } else C(k, Z, i, h), g = k, I = !0;
                                    break;
                                case "SERVER-CONTROL":
                                    var et = new c(M);
                                    d.canBlockReload = et.bool("CAN-BLOCK-RELOAD"), d.canSkipUntil = et.optionalFloat("CAN-SKIP-UNTIL", 0), d.canSkipDateRanges = d.canSkipUntil > 0 && et.bool("CAN-SKIP-DATERANGES"), d.partHoldBack = et.optionalFloat("PART-HOLD-BACK", 0), d.holdBack = et.optionalFloat("HOLD-BACK", 0);
                                    break;
                                case "PART-INF":
                                    var it = new c(M);
                                    d.partTarget = it.decimalFloatingPoint("PART-TARGET");
                                    break;
                                case "PART":
                                    var rt = d.partList;
                                    rt || (rt = d.partList = []);
                                    var nt = b > 0 ? rt[rt.length - 1] : void 0,
                                        at = b++,
                                        st = new p.c(new c(M), k, e, at, nt);
                                    rt.push(st), k.duration += st.duration;
                                    break;
                                case "PRELOAD-HINT":
                                    var ot = new c(M);
                                    d.preloadHint = ot;
                                    break;
                                case "RENDITION-REPORT":
                                    var lt = new c(M);
                                    d.renditionReports = d.renditionReports || [], d.renditionReports.push(lt);
                                    break;
                                default:
                                    l.b.warn("line parsed but not handled: " + o)
                            }
                        }
                    }
                    L && !L.relurl ? (f.pop(), E -= L.duration, d.partList && (d.fragmentHint = L)) : d.partList && (O(k, L), k.cc = S, d.fragmentHint = k);
                    var ut = f.length,
                        ht = f[0],
                        dt = f[ut - 1];
                    if ((E += d.skippedSegments * d.targetduration) > 0 && ut && dt) {
                        d.averagetargetduration = E / ut;
                        var ct = dt.sn;
                        d.endSN = "initSegment" !== ct ? ct : 0, ht && (d.startCC = ht.cc, ht.initSegment || d.fragments.every((function (t) {
                            return t.relurl && (e = t.relurl, R.test(null != (i = null === (r = n.parseURL(e)) || void 0 === r ? void 0 : r.path) ? i : ""));
                            var e, i, r
                        })) && (l.b.warn("MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX"), (k = new p.b(r, e)).relurl = dt.relurl, k.level = i, k.sn = "initSegment", ht.initSegment = k, d.needSidxRanges = !0))
                    } else d.endSN = 0, d.startCC = 0;
                    return d.fragmentHint && (E += d.fragmentHint.duration), d.totalduration = E, d.endCC = S, _ > 0 && function (t, e) {
                        for (var i = t[e], r = e; r--;) {
                            var n = t[r];
                            if (!n) return;
                            n.programDateTime = i.programDateTime - 1e3 * n.duration, i = n
                        }
                    }(f, _), d
                }, t
            }();
    
            function _(t, e) {
                ["video", "audio", "text"].forEach((function (i) {
                    var r = t.filter((function (t) {
                        return function (t, e) {
                            var i = b[e];
                            return !!i && !0 === i[t.slice(0, 4)]
                        }(t, i)
                    }));
                    if (r.length) {
                        var n = r.filter((function (t) {
                            return 0 === t.lastIndexOf("avc1", 0) || 0 === t.lastIndexOf("mp4a", 0)
                        }));
                        e[i + "Codec"] = n.length > 0 ? n[0] : r[0], t = t.filter((function (t) {
                            return -1 === r.indexOf(t)
                        }))
                    }
                })), e.unknownCodecs = t
            }
    
            function I(t, e, i) {
                var r = e[i];
                r && (t[i] = r)
            }
    
            function O(t, e) {
                t.rawProgramDateTime ? t.programDateTime = Date.parse(t.rawProgramDateTime) : null != e && e.programDateTime && (t.programDateTime = e.endProgramDateTime), Object(a.a)(t.programDateTime) || (t.programDateTime = null, t.rawProgramDateTime = null)
            }
    
            function C(t, e, i, r) {
                t.relurl = e.URI, e.BYTERANGE && t.setByteRange(e.BYTERANGE), t.level = i, t.sn = "initSegment", r && (t.levelkey = r), t.initSegment = null
            }
            var w = i(4);
    
            function x(t, e) {
                var i = t.url;
                return void 0 !== i && 0 !== i.indexOf("data:") || (i = e.url), i
            }
            var P = function () {
                    function t(t) {
                        this.hls = void 0, this.loaders = Object.create(null), this.hls = t, this.registerListeners()
                    }
                    var e = t.prototype;
                    return e.startLoad = function (t) {}, e.stopLoad = function () {
                        this.destroyInternalLoaders()
                    }, e.registerListeners = function () {
                        var t = this.hls;
                        t.on(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.a.LEVEL_LOADING, this.onLevelLoading, this), t.on(s.a.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), t.on(s.a.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this)
                    }, e.unregisterListeners = function () {
                        var t = this.hls;
                        t.off(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.a.LEVEL_LOADING, this.onLevelLoading, this), t.off(s.a.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), t.off(s.a.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this)
                    }, e.createInternalLoader = function (t) {
                        var e = this.hls.config,
                            i = e.pLoader,
                            r = e.loader,
                            n = new(i || r)(e);
                        return t.loader = n, this.loaders[t.type] = n, n
                    }, e.getInternalLoader = function (t) {
                        return this.loaders[t.type]
                    }, e.resetInternalLoader = function (t) {
                        this.loaders[t] && delete this.loaders[t]
                    }, e.destroyInternalLoaders = function () {
                        for (var t in this.loaders) {
                            var e = this.loaders[t];
                            e && e.destroy(), this.resetInternalLoader(t)
                        }
                    }, e.destroy = function () {
                        this.unregisterListeners(), this.destroyInternalLoaders()
                    }, e.onManifestLoading = function (t, e) {
                        var i = e.url;
                        this.load({
                            id: null,
                            groupId: null,
                            level: 0,
                            responseType: "text",
                            type: w.a.MANIFEST,
                            url: i,
                            deliveryDirectives: null
                        })
                    }, e.onLevelLoading = function (t, e) {
                        var i = e.id,
                            r = e.level,
                            n = e.url,
                            a = e.deliveryDirectives;
                        this.load({
                            id: i,
                            groupId: null,
                            level: r,
                            responseType: "text",
                            type: w.a.LEVEL,
                            url: n,
                            deliveryDirectives: a
                        })
                    }, e.onAudioTrackLoading = function (t, e) {
                        var i = e.id,
                            r = e.groupId,
                            n = e.url,
                            a = e.deliveryDirectives;
                        this.load({
                            id: i,
                            groupId: r,
                            level: null,
                            responseType: "text",
                            type: w.a.AUDIO_TRACK,
                            url: n,
                            deliveryDirectives: a
                        })
                    }, e.onSubtitleTrackLoading = function (t, e) {
                        var i = e.id,
                            r = e.groupId,
                            n = e.url,
                            a = e.deliveryDirectives;
                        this.load({
                            id: i,
                            groupId: r,
                            level: null,
                            responseType: "text",
                            type: w.a.SUBTITLE_TRACK,
                            url: n,
                            deliveryDirectives: a
                        })
                    }, e.load = function (t) {
                        var e, i, r, n, a, s, o = this.hls.config,
                            u = this.getInternalLoader(t);
                        if (u) {
                            var h = u.context;
                            if (h && h.url === t.url) return void l.b.trace("[playlist-loader]: playlist request ongoing");
                            l.b.log("[playlist-loader]: aborting previous loader for type: " + t.type), u.abort()
                        }
                        switch (t.type) {
                            case w.a.MANIFEST:
                                i = o.manifestLoadingMaxRetry, r = o.manifestLoadingTimeOut, n = o.manifestLoadingRetryDelay, a = o.manifestLoadingMaxRetryTimeout;
                                break;
                            case w.a.LEVEL:
                            case w.a.AUDIO_TRACK:
                            case w.a.SUBTITLE_TRACK:
                                i = 0, r = o.levelLoadingTimeOut;
                                break;
                            default:
                                i = o.levelLoadingMaxRetry, r = o.levelLoadingTimeOut, n = o.levelLoadingRetryDelay, a = o.levelLoadingMaxRetryTimeout
                        }
                        if ((u = this.createInternalLoader(t), null !== (e = t.deliveryDirectives) && void 0 !== e && e.part) && (t.type === w.a.LEVEL && null !== t.level ? s = this.hls.levels[t.level].details : t.type === w.a.AUDIO_TRACK && null !== t.id ? s = this.hls.audioTracks[t.id].details : t.type === w.a.SUBTITLE_TRACK && null !== t.id && (s = this.hls.subtitleTracks[t.id].details), s)) {
                            var d = s.partTarget,
                                c = s.targetduration;
                            d && c && (r = Math.min(1e3 * Math.max(3 * d, .8 * c), r))
                        }
                        var f = {
                                timeout: r,
                                maxRetry: i,
                                retryDelay: n,
                                maxRetryDelay: a,
                                highWaterMark: 0
                            },
                            g = {
                                onSuccess: this.loadsuccess.bind(this),
                                onError: this.loaderror.bind(this),
                                onTimeout: this.loadtimeout.bind(this)
                            };
                        u.load(t, f, g)
                    }, e.loadsuccess = function (t, e, i, r) {
                        if (void 0 === r && (r = null), i.isSidxRequest) return this.handleSidxRequest(t, i), void this.handlePlaylistLoaded(t, e, i, r);
                        this.resetInternalLoader(i.type);
                        var n = t.data;
                        0 === n.indexOf("#EXTM3U") ? (e.parsing.start = performance.now(), n.indexOf("#EXTINF:") > 0 || n.indexOf("#EXT-X-TARGETDURATION:") > 0 ? this.handleTrackOrLevelPlaylist(t, e, i, r) : this.handleMasterPlaylist(t, e, i, r)) : this.handleManifestParsingError(t, i, "no EXTM3U delimiter", r)
                    }, e.loaderror = function (t, e, i) {
                        void 0 === i && (i = null), this.handleNetworkError(e, i, !1, t)
                    }, e.loadtimeout = function (t, e, i) {
                        void 0 === i && (i = null), this.handleNetworkError(e, i, !0)
                    }, e.handleMasterPlaylist = function (t, e, i, r) {
                        var n = this.hls,
                            a = t.data,
                            o = x(t, i),
                            u = k.parseMasterPlaylist(a, o),
                            h = u.levels,
                            d = u.sessionData;
                        if (h.length) {
                            var f = h.map((function (t) {
                                    return {
                                        id: t.attrs.AUDIO,
                                        audioCodec: t.audioCodec
                                    }
                                })),
                                g = h.map((function (t) {
                                    return {
                                        id: t.attrs.SUBTITLES,
                                        textCodec: t.textCodec
                                    }
                                })),
                                v = k.parseMasterPlaylistMedia(a, o, "AUDIO", f),
                                p = k.parseMasterPlaylistMedia(a, o, "SUBTITLES", g),
                                m = k.parseMasterPlaylistMedia(a, o, "CLOSED-CAPTIONS");
                            if (v.length) v.some((function (t) {
                                return !t.url
                            })) || !h[0].audioCodec || h[0].attrs.AUDIO || (l.b.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"), v.unshift({
                                type: "main",
                                name: "main",
                                default: !1,
                                autoselect: !1,
                                forced: !1,
                                id: -1,
                                attrs: new c({}),
                                bitrate: 0,
                                url: ""
                            }));
                            n.trigger(s.a.MANIFEST_LOADED, {
                                levels: h,
                                audioTracks: v,
                                subtitles: p,
                                captions: m,
                                url: o,
                                stats: e,
                                networkDetails: r,
                                sessionData: d
                            })
                        } else this.handleManifestParsingError(t, i, "no level found in manifest", r)
                    }, e.handleTrackOrLevelPlaylist = function (t, e, i, r) {
                        var n = this.hls,
                            l = i.id,
                            u = i.level,
                            h = i.type,
                            d = x(t, i),
                            f = Object(a.a)(l) ? l : 0,
                            g = Object(a.a)(u) ? u : f,
                            v = function (t) {
                                switch (t.type) {
                                    case w.a.AUDIO_TRACK:
                                        return w.b.AUDIO;
                                    case w.a.SUBTITLE_TRACK:
                                        return w.b.SUBTITLE;
                                    default:
                                        return w.b.MAIN
                                }
                            }(i),
                            p = k.parseLevelPlaylist(t.data, d, g, v, f);
                        if (p.fragments.length) {
                            if (h === w.a.MANIFEST) {
                                var m = {
                                    attrs: new c({}),
                                    bitrate: 0,
                                    details: p,
                                    name: "",
                                    url: d
                                };
                                n.trigger(s.a.MANIFEST_LOADED, {
                                    levels: [m],
                                    audioTracks: [],
                                    url: d,
                                    stats: e,
                                    networkDetails: r,
                                    sessionData: null
                                })
                            }
                            if (e.parsing.end = performance.now(), p.needSidxRanges) {
                                var y, T = null === (y = p.fragments[0].initSegment) || void 0 === y ? void 0 : y.url;
                                this.load({
                                    url: T,
                                    isSidxRequest: !0,
                                    type: h,
                                    level: u,
                                    levelDetails: p,
                                    id: l,
                                    groupId: null,
                                    rangeStart: 0,
                                    rangeEnd: 2048,
                                    responseType: "arraybuffer",
                                    deliveryDirectives: null
                                })
                            } else i.levelDetails = p, this.handlePlaylistLoaded(t, e, i, r)
                        } else n.trigger(s.a.ERROR, {
                            type: o.b.NETWORK_ERROR,
                            details: o.a.LEVEL_EMPTY_ERROR,
                            fatal: !1,
                            url: d,
                            reason: "no fragments found in level",
                            level: "number" == typeof i.level ? i.level : void 0
                        })
                    }, e.handleSidxRequest = function (t, e) {
                        var i = new Uint8Array(t.data),
                            r = Object(u.c)(i, ["sidx"])[0];
                        if (r) {
                            var n = Object(u.k)(r);
                            if (n) {
                                var a = n.references,
                                    s = e.levelDetails;
                                a.forEach((function (t, e) {
                                    var r = t.info,
                                        n = s.fragments[e];
                                    if (0 === n.byteRange.length && n.setByteRange(String(1 + r.end - r.start) + "@" + String(r.start)), n.initSegment) {
                                        var a = Object(u.c)(i, ["moov"])[0],
                                            o = a ? a.length : null;
                                        n.initSegment.setByteRange(String(o) + "@0")
                                    }
                                }))
                            }
                        }
                    }, e.handleManifestParsingError = function (t, e, i, r) {
                        this.hls.trigger(s.a.ERROR, {
                            type: o.b.NETWORK_ERROR,
                            details: o.a.MANIFEST_PARSING_ERROR,
                            fatal: e.type === w.a.MANIFEST,
                            url: t.url,
                            reason: i,
                            response: t,
                            context: e,
                            networkDetails: r
                        })
                    }, e.handleNetworkError = function (t, e, i, r) {
                        void 0 === i && (i = !1), l.b.warn("[playlist-loader]: A network " + (i ? "timeout" : "error") + " occurred while loading " + t.type + " level: " + t.level + " id: " + t.id + ' group-id: "' + t.groupId + '"');
                        var n = o.a.UNKNOWN,
                            a = !1,
                            u = this.getInternalLoader(t);
                        switch (t.type) {
                            case w.a.MANIFEST:
                                n = i ? o.a.MANIFEST_LOAD_TIMEOUT : o.a.MANIFEST_LOAD_ERROR, a = !0;
                                break;
                            case w.a.LEVEL:
                                n = i ? o.a.LEVEL_LOAD_TIMEOUT : o.a.LEVEL_LOAD_ERROR, a = !1;
                                break;
                            case w.a.AUDIO_TRACK:
                                n = i ? o.a.AUDIO_TRACK_LOAD_TIMEOUT : o.a.AUDIO_TRACK_LOAD_ERROR, a = !1;
                                break;
                            case w.a.SUBTITLE_TRACK:
                                n = i ? o.a.SUBTITLE_TRACK_LOAD_TIMEOUT : o.a.SUBTITLE_LOAD_ERROR, a = !1
                        }
                        u && this.resetInternalLoader(t.type);
                        var h = {
                            type: o.b.NETWORK_ERROR,
                            details: n,
                            fatal: a,
                            url: t.url,
                            loader: u,
                            context: t,
                            networkDetails: e
                        };
                        r && (h.response = r), this.hls.trigger(s.a.ERROR, h)
                    }, e.handlePlaylistLoaded = function (t, e, i, r) {
                        var n = i.type,
                            a = i.level,
                            o = i.id,
                            l = i.groupId,
                            u = i.loader,
                            h = i.levelDetails,
                            d = i.deliveryDirectives;
                        if (null != h && h.targetduration) {
                            if (u) switch (h.live && (u.getCacheAge && (h.ageHeader = u.getCacheAge() || 0), u.getCacheAge && !isNaN(h.ageHeader) || (h.ageHeader = 0)), n) {
                                case w.a.MANIFEST:
                                case w.a.LEVEL:
                                    this.hls.trigger(s.a.LEVEL_LOADED, {
                                        details: h,
                                        level: a || 0,
                                        id: o || 0,
                                        stats: e,
                                        networkDetails: r,
                                        deliveryDirectives: d
                                    });
                                    break;
                                case w.a.AUDIO_TRACK:
                                    this.hls.trigger(s.a.AUDIO_TRACK_LOADED, {
                                        details: h,
                                        id: o || 0,
                                        groupId: l || "",
                                        stats: e,
                                        networkDetails: r,
                                        deliveryDirectives: d
                                    });
                                    break;
                                case w.a.SUBTITLE_TRACK:
                                    this.hls.trigger(s.a.SUBTITLE_TRACK_LOADED, {
                                        details: h,
                                        id: o || 0,
                                        groupId: l || "",
                                        stats: e,
                                        networkDetails: r,
                                        deliveryDirectives: d
                                    })
                            }
                        } else this.handleManifestParsingError(t, i, "invalid target duration", r)
                    }, t
                }(),
                F = function () {
                    function t(t) {
                        this.hls = void 0, this.loaders = {}, this.decryptkey = null, this.decrypturl = null, this.hls = t, this.registerListeners()
                    }
                    var e = t.prototype;
                    return e.startLoad = function (t) {}, e.stopLoad = function () {
                        this.destroyInternalLoaders()
                    }, e.registerListeners = function () {
                        this.hls.on(s.a.KEY_LOADING, this.onKeyLoading, this)
                    }, e.unregisterListeners = function () {
                        this.hls.off(s.a.KEY_LOADING, this.onKeyLoading)
                    }, e.destroyInternalLoaders = function () {
                        for (var t in this.loaders) {
                            var e = this.loaders[t];
                            e && e.destroy()
                        }
                        this.loaders = {}
                    }, e.destroy = function () {
                        this.unregisterListeners(), this.destroyInternalLoaders()
                    }, e.onKeyLoading = function (t, e) {
                        var i = e.frag,
                            r = i.type,
                            n = this.loaders[r];
                        if (i.decryptdata) {
                            var a = i.decryptdata.uri;
                            if (a !== this.decrypturl || null === this.decryptkey) {
                                var o = this.hls.config;
                                if (n && (l.b.warn("abort previous key loader for type:" + r), n.abort()), !a) return void l.b.warn("key uri is falsy");
                                var u = o.loader,
                                    h = i.loader = this.loaders[r] = new u(o);
                                this.decrypturl = a, this.decryptkey = null;
                                var d = {
                                        url: a,
                                        frag: i,
                                        responseType: "arraybuffer"
                                    },
                                    c = {
                                        timeout: o.fragLoadingTimeOut,
                                        maxRetry: 0,
                                        retryDelay: o.fragLoadingRetryDelay,
                                        maxRetryDelay: o.fragLoadingMaxRetryTimeout,
                                        highWaterMark: 0
                                    },
                                    f = {
                                        onSuccess: this.loadsuccess.bind(this),
                                        onError: this.loaderror.bind(this),
                                        onTimeout: this.loadtimeout.bind(this)
                                    };
                                h.load(d, c, f)
                            } else this.decryptkey && (i.decryptdata.key = this.decryptkey, this.hls.trigger(s.a.KEY_LOADED, {
                                frag: i
                            }))
                        } else l.b.warn("Missing decryption data on fragment in onKeyLoading")
                    }, e.loadsuccess = function (t, e, i) {
                        var r = i.frag;
                        r.decryptdata ? (this.decryptkey = r.decryptdata.key = new Uint8Array(t.data), r.loader = null, delete this.loaders[r.type], this.hls.trigger(s.a.KEY_LOADED, {
                            frag: r
                        })) : l.b.error("after key load, decryptdata unset")
                    }, e.loaderror = function (t, e) {
                        var i = e.frag,
                            r = i.loader;
                        r && r.abort(), delete this.loaders[i.type], this.hls.trigger(s.a.ERROR, {
                            type: o.b.NETWORK_ERROR,
                            details: o.a.KEY_LOAD_ERROR,
                            fatal: !1,
                            frag: i,
                            response: t
                        })
                    }, e.loadtimeout = function (t, e) {
                        var i = e.frag,
                            r = i.loader;
                        r && r.abort(), delete this.loaders[i.type], this.hls.trigger(s.a.ERROR, {
                            type: o.b.NETWORK_ERROR,
                            details: o.a.KEY_LOAD_TIMEOUT,
                            fatal: !1,
                            frag: i
                        })
                    }, t
                }();
    
            function M(t, e) {
                var i;
                try {
                    i = new Event("addtrack")
                } catch (t) {
                    (i = document.createEvent("Event")).initEvent("addtrack", !1, !1)
                }
                i.track = t, e.dispatchEvent(i)
            }
    
            function N(t, e) {
                var i = t.mode;
                if ("disabled" === i && (t.mode = "hidden"), t.cues && !t.cues.getCueById(e.id)) try {
                    if (t.addCue(e), !t.cues.getCueById(e.id)) throw new Error("addCue is failed for: " + e)
                } catch (i) {
                    l.b.debug("[texttrack-utils]: " + i);
                    var r = new self.TextTrackCue(e.startTime, e.endTime, e.text);
                    r.id = e.id, t.addCue(r)
                }
                "disabled" === i && (t.mode = i)
            }
    
            function U(t) {
                var e = t.mode;
                if ("disabled" === e && (t.mode = "hidden"), t.cues)
                    for (var i = t.cues.length; i--;) t.removeCue(t.cues[i]);
                "disabled" === e && (t.mode = e)
            }
    
            function B(t, e, i, r) {
                var n = t.mode;
                if ("disabled" === n && (t.mode = "hidden"), t.cues && t.cues.length > 0)
                    for (var a = function (t, e, i) {
                            var r = [],
                                n = function (t, e) {
                                    if (e < t[0].startTime) return 0;
                                    var i = t.length - 1;
                                    if (e > t[i].endTime) return -1;
                                    var r = 0,
                                        n = i;
                                    for (; r <= n;) {
                                        var a = Math.floor((n + r) / 2);
                                        if (e < t[a].startTime) n = a - 1;
                                        else {
                                            if (!(e > t[a].startTime && r < i)) return a;
                                            r = a + 1
                                        }
                                    }
                                    return t[r].startTime - e < e - t[n].startTime ? r : n
                                }(t, e);
                            if (n > -1)
                                for (var a = n, s = t.length; a < s; a++) {
                                    var o = t[a];
                                    if (o.startTime >= e && o.endTime <= i) r.push(o);
                                    else if (o.startTime > i) return r
                                }
                            return r
                        }(t.cues, e, i), s = 0; s < a.length; s++) r && !r(a[s]) || t.removeCue(a[s]);
                "disabled" === n && (t.mode = n)
            }
            var G = i(7),
                j = i(8);
    
            function K() {
                return self.WebKitDataCue || self.VTTCue || self.TextTrackCue
            }
    
            function H(t, e) {
                return t.getTime() / 1e3 - e
            }
            var V = function () {
                function t(t) {
                    this.hls = void 0, this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = t, this._registerListeners()
                }
                var e = t.prototype;
                return e.destroy = function () {
                    this._unregisterListeners(), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = null
                }, e._registerListeners = function () {
                    var t = this.hls;
                    t.on(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.a.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), t.on(s.a.BUFFER_FLUSHING, this.onBufferFlushing, this), t.on(s.a.LEVEL_UPDATED, this.onLevelUpdated, this)
                }, e._unregisterListeners = function () {
                    var t = this.hls;
                    t.off(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.a.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), t.off(s.a.BUFFER_FLUSHING, this.onBufferFlushing, this), t.off(s.a.LEVEL_UPDATED, this.onLevelUpdated, this)
                }, e.onMediaAttached = function (t, e) {
                    this.media = e.media
                }, e.onMediaDetaching = function () {
                    this.id3Track && (U(this.id3Track), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {})
                }, e.onManifestLoading = function () {
                    this.dateRangeCuesAppended = {}
                }, e.createTrack = function (t) {
                    var e = this.getID3Track(t.textTracks);
                    return e.mode = "hidden", e
                }, e.getID3Track = function (t) {
                    if (this.media) {
                        for (var e = 0; e < t.length; e++) {
                            var i = t[e];
                            if ("metadata" === i.kind && "id3" === i.label) return M(i, this.media), i
                        }
                        return this.media.addTextTrack("metadata", "id3")
                    }
                }, e.onFragParsingMetadata = function (t, e) {
                    if (this.media) {
                        var i = this.hls.config,
                            r = i.enableEmsgMetadataCues,
                            n = i.enableID3MetadataCues;
                        if (r || n) {
                            var a = e.frag,
                                s = e.samples,
                                o = e.details;
                            this.id3Track || (this.id3Track = this.createTrack(this.media));
                            for (var l = o.edge || a.end, u = K(), h = !1, d = {}, c = 0; c < s.length; c++) {
                                var f = s[c].type;
                                if ((f !== j.a.emsg || r) && n) {
                                    var g = G.c(s[c].data);
                                    if (g) {
                                        var v = s[c].pts,
                                            p = l;
                                        p - v <= 0 && (p = v + .25);
                                        for (var m = 0; m < g.length; m++) {
                                            var y = g[m];
                                            if (!G.e(y)) {
                                                var T = new u(v, p, "");
                                                T.value = y, f && (T.type = f), this.id3Track.addCue(T), d[y.key] = null, h = !0
                                            }
                                        }
                                    }
                                }
                            }
                            h && this.updateId3CueEnds(d)
                        }
                    }
                }, e.updateId3CueEnds = function (t) {
                    var e, i = null === (e = this.id3Track) || void 0 === e ? void 0 : e.cues;
                    if (i)
                        for (var r = i.length; r--;) {
                            var n, a = i[r],
                                s = null === (n = a.value) || void 0 === n ? void 0 : n.key;
                            if (s && s in t) {
                                var o = t[s];
                                o && a.endTime !== o && (a.endTime = o), t[s] = a.startTime
                            }
                        }
                }, e.onBufferFlushing = function (t, e) {
                    var i = e.startOffset,
                        r = e.endOffset,
                        n = e.type,
                        a = this.id3Track,
                        s = this.hls;
                    if (s) {
                        var o = s.config,
                            l = o.enableEmsgMetadataCues,
                            u = o.enableID3MetadataCues;
                        if (a && (l || u)) B(a, i, r, "audio" === n ? function (t) {
                            return t.type === j.a.audioId3 && u
                        } : "video" === n ? function (t) {
                            return t.type === j.a.emsg && l
                        } : function (t) {
                            return t.type === j.a.audioId3 && u || t.type === j.a.emsg && l
                        })
                    }
                }, e.onLevelUpdated = function (t, e) {
                    var i = this,
                        n = e.details;
                    if (this.media && n.hasProgramDateTime && this.hls.config.enableDateRangeMetadataCues) {
                        var s = this.dateRangeCuesAppended,
                            o = this.id3Track,
                            l = n.dateRanges,
                            u = Object.keys(l);
                        if (o)
                            for (var h = Object.keys(s).filter((function (t) {
                                    return !u.includes(t)
                                })), d = function (t) {
                                    var e = h[t];
                                    Object.keys(s[e].cues).forEach((function (t) {
                                        o.removeCue(s[e].cues[t])
                                    })), delete s[e]
                                }, c = h.length; c--;) d(c);
                        var f = n.fragments[n.fragments.length - 1];
                        if (0 !== u.length && Object(a.a)(null == f ? void 0 : f.programDateTime)) {
                            this.id3Track || (this.id3Track = this.createTrack(this.media));
                            for (var g = f.programDateTime / 1e3 - f.start, v = n.edge || f.end, p = K(), m = function (t) {
                                    var e = u[t],
                                        n = l[e],
                                        a = s[e],
                                        o = (null == a ? void 0 : a.cues) || {},
                                        h = (null == a ? void 0 : a.durationKnown) || !1,
                                        d = H(n.startDate, g),
                                        c = v,
                                        f = n.endDate;
                                    if (f) c = H(f, g), h = !0;
                                    else if (n.endOnNext && !h) {
                                        var m = u.reduce((function (t, e) {
                                            var i = l[e];
                                            return i.class === n.class && i.id !== e && i.startDate > n.startDate && t.push(i), t
                                        }), []).sort((function (t, e) {
                                            return t.startDate.getTime() - e.startDate.getTime()
                                        }))[0];
                                        m && (c = H(m.startDate, g), h = !0)
                                    }
                                    for (var y, T = Object.keys(n.attr), b = 0; b < T.length; b++) {
                                        var E = T[b];
                                        if (E !== r.ID && E !== r.CLASS && E !== r.START_DATE && E !== r.DURATION && E !== r.END_DATE && E !== r.END_ON_NEXT) {
                                            var S = o[E];
                                            if (S) h && !a.durationKnown && (S.endTime = c);
                                            else {
                                                var L = n.attr[E];
                                                S = new p(d, c, ""), E !== r.SCTE35_OUT && E !== r.SCTE35_IN || (y = L, L = Uint8Array.from(y.replace(/^0x/, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")).buffer), S.value = {
                                                    key: E,
                                                    data: L
                                                }, S.type = j.a.dateRange, i.id3Track.addCue(S), o[E] = S
                                            }
                                        }
                                    }
                                    s[e] = {
                                        cues: o,
                                        dateRange: n,
                                        durationKnown: h
                                    }
                                }, y = 0; y < u.length; y++) m(y)
                        }
                    }
                }, t
            }();
    
            function W(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            var Y, q = function () {
                function t(t) {
                    var e = this;
                    this.hls = void 0, this.config = void 0, this.media = null, this.levelDetails = null, this.currentTime = 0, this.stallCount = 0, this._latency = null, this.timeupdateHandler = function () {
                        return e.timeupdate()
                    }, this.hls = t, this.config = t.config, this.registerListeners()
                }
                var e, i, r, n = t.prototype;
                return n.destroy = function () {
                    this.unregisterListeners(), this.onMediaDetaching(), this.levelDetails = null, this.hls = this.timeupdateHandler = null
                }, n.registerListeners = function () {
                    this.hls.on(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), this.hls.on(s.a.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.on(s.a.LEVEL_UPDATED, this.onLevelUpdated, this), this.hls.on(s.a.ERROR, this.onError, this)
                }, n.unregisterListeners = function () {
                    this.hls.off(s.a.MEDIA_ATTACHED, this.onMediaAttached), this.hls.off(s.a.MEDIA_DETACHING, this.onMediaDetaching), this.hls.off(s.a.MANIFEST_LOADING, this.onManifestLoading), this.hls.off(s.a.LEVEL_UPDATED, this.onLevelUpdated), this.hls.off(s.a.ERROR, this.onError)
                }, n.onMediaAttached = function (t, e) {
                    this.media = e.media, this.media.addEventListener("timeupdate", this.timeupdateHandler)
                }, n.onMediaDetaching = function () {
                    this.media && (this.media.removeEventListener("timeupdate", this.timeupdateHandler), this.media = null)
                }, n.onManifestLoading = function () {
                    this.levelDetails = null, this._latency = null, this.stallCount = 0
                }, n.onLevelUpdated = function (t, e) {
                    var i = e.details;
                    this.levelDetails = i, i.advanced && this.timeupdate(), !i.live && this.media && this.media.removeEventListener("timeupdate", this.timeupdateHandler)
                }, n.onError = function (t, e) {
                    e.details === o.a.BUFFER_STALLED_ERROR && (this.stallCount++, l.b.warn("[playback-rate-controller]: Stall detected, adjusting target latency"))
                }, n.timeupdate = function () {
                    var t = this.media,
                        e = this.levelDetails;
                    if (t && e) {
                        this.currentTime = t.currentTime;
                        var i = this.computeLatency();
                        if (null !== i) {
                            this._latency = i;
                            var r = this.config,
                                n = r.lowLatencyMode,
                                a = r.maxLiveSyncPlaybackRate;
                            if (n && 1 !== a) {
                                var s = this.targetLatency;
                                if (null !== s) {
                                    var o = i - s,
                                        l = o < Math.min(this.maxLatency, s + e.targetduration);
                                    if (e.live && l && o > .05 && this.forwardBufferLength > 1) {
                                        var u = Math.min(2, Math.max(1, a)),
                                            h = Math.round(2 / (1 + Math.exp(-.75 * o - this.edgeStalled)) * 20) / 20;
                                        t.playbackRate = Math.min(u, Math.max(1, h))
                                    } else 1 !== t.playbackRate && 0 !== t.playbackRate && (t.playbackRate = 1)
                                }
                            }
                        }
                    }
                }, n.estimateLiveEdge = function () {
                    var t = this.levelDetails;
                    return null === t ? null : t.edge + t.age
                }, n.computeLatency = function () {
                    var t = this.estimateLiveEdge();
                    return null === t ? null : t - this.currentTime
                }, e = t, (i = [{
                    key: "latency",
                    get: function () {
                        return this._latency || 0
                    }
                }, {
                    key: "maxLatency",
                    get: function () {
                        var t = this.config,
                            e = this.levelDetails;
                        return void 0 !== t.liveMaxLatencyDuration ? t.liveMaxLatencyDuration : e ? t.liveMaxLatencyDurationCount * e.targetduration : 0
                    }
                }, {
                    key: "targetLatency",
                    get: function () {
                        var t = this.levelDetails;
                        if (null === t) return null;
                        var e = t.holdBack,
                            i = t.partHoldBack,
                            r = t.targetduration,
                            n = this.config,
                            a = n.liveSyncDuration,
                            s = n.liveSyncDurationCount,
                            o = n.lowLatencyMode,
                            l = this.hls.userConfig,
                            u = o && i || e;
                        (l.liveSyncDuration || l.liveSyncDurationCount || 0 === u) && (u = void 0 !== a ? a : s * r);
                        var h = r;
                        return u + Math.min(1 * this.stallCount, h)
                    }
                }, {
                    key: "liveSyncPosition",
                    get: function () {
                        var t = this.estimateLiveEdge(),
                            e = this.targetLatency,
                            i = this.levelDetails;
                        if (null === t || null === e || null === i) return null;
                        var r = i.edge,
                            n = t - e - this.edgeStalled,
                            a = r - i.totalduration,
                            s = r - (this.config.lowLatencyMode && i.partTarget || i.targetduration);
                        return Math.min(Math.max(a, n), s)
                    }
                }, {
                    key: "drift",
                    get: function () {
                        var t = this.levelDetails;
                        return null === t ? 1 : t.drift
                    }
                }, {
                    key: "edgeStalled",
                    get: function () {
                        var t = this.levelDetails;
                        if (null === t) return 0;
                        var e = 3 * (this.config.lowLatencyMode && t.partTarget || t.targetduration);
                        return Math.max(t.age - e, 0)
                    }
                }, {
                    key: "forwardBufferLength",
                    get: function () {
                        var t = this.media,
                            e = this.levelDetails;
                        if (!t || !e) return 0;
                        var i = t.buffered.length;
                        return (i ? t.buffered.end(i - 1) : e.edge) - this.currentTime
                    }
                }]) && W(e.prototype, i), r && W(e, r), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t
            }();
    
            function z(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }! function (t) {
                t.No = "", t.Yes = "YES", t.v2 = "v2"
            }(Y || (Y = {}));
            var X = function () {
                    function t(t, e, i) {
                        this.msn = void 0, this.part = void 0, this.skip = void 0, this.msn = t, this.part = e, this.skip = i
                    }
                    return t.prototype.addDirectives = function (t) {
                        var e = new self.URL(t);
                        return void 0 !== this.msn && e.searchParams.set("_HLS_msn", this.msn.toString()), void 0 !== this.part && e.searchParams.set("_HLS_part", this.part.toString()), this.skip && e.searchParams.set("_HLS_skip", this.skip), e.toString()
                    }, t
                }(),
                Q = function () {
                    function t(t) {
                        this.attrs = void 0, this.audioCodec = void 0, this.bitrate = void 0, this.codecSet = void 0, this.height = void 0, this.id = void 0, this.name = void 0, this.videoCodec = void 0, this.width = void 0, this.unknownCodecs = void 0, this.audioGroupIds = void 0, this.details = void 0, this.fragmentError = 0, this.loadError = 0, this.loaded = void 0, this.realBitrate = 0, this.textGroupIds = void 0, this.url = void 0, this._urlId = 0, this.url = [t.url], this.attrs = t.attrs, this.bitrate = t.bitrate, t.details && (this.details = t.details), this.id = t.id || 0, this.name = t.name, this.width = t.width || 0, this.height = t.height || 0, this.audioCodec = t.audioCodec, this.videoCodec = t.videoCodec, this.unknownCodecs = t.unknownCodecs, this.codecSet = [t.videoCodec, t.audioCodec].filter((function (t) {
                            return t
                        })).join(",").replace(/\.[^.,]+/g, "")
                    }
                    var e, i, r;
                    return e = t, (i = [{
                        key: "maxBitrate",
                        get: function () {
                            return Math.max(this.realBitrate, this.bitrate)
                        }
                    }, {
                        key: "uri",
                        get: function () {
                            return this.url[this._urlId] || ""
                        }
                    }, {
                        key: "urlId",
                        get: function () {
                            return this._urlId
                        },
                        set: function (t) {
                            var e = t % this.url.length;
                            this._urlId !== e && (this.details = void 0, this._urlId = e)
                        }
                    }]) && z(e.prototype, i), r && z(e, r), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), t
                }();
    
            function $() {
                return ($ = Object.assign ? Object.assign.bind() : function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
                    }
                    return t
                }).apply(this, arguments)
            }
    
            function J(t, e, i) {
                switch (e) {
                    case "audio":
                        t.audioGroupIds || (t.audioGroupIds = []), t.audioGroupIds.push(i);
                        break;
                    case "text":
                        t.textGroupIds || (t.textGroupIds = []), t.textGroupIds.push(i)
                }
            }
    
            function Z(t) {
                var e = {};
                t.forEach((function (t) {
                    var i = t.groupId || "";
                    t.id = e[i] = e[i] || 0, e[i]++
                }))
            }
    
            function tt(t, e) {
                var i = e.startPTS;
                if (Object(a.a)(i)) {
                    var r, n = 0;
                    e.sn > t.sn ? (n = i - t.start, r = t) : (n = t.start - i, r = e), r.duration !== n && (r.duration = n)
                } else if (e.sn > t.sn) {
                    t.cc === e.cc && t.minEndPTS ? e.start = t.start + (t.minEndPTS - t.start) : e.start = t.start + t.duration
                } else e.start = Math.max(t.start - e.duration, 0)
            }
    
            function et(t, e, i, r, n, s) {
                r - i <= 0 && (l.b.warn("Fragment should have a positive duration", e), r = i + e.duration, s = n + e.duration);
                var o = i,
                    u = r,
                    h = e.startPTS,
                    d = e.endPTS;
                if (Object(a.a)(h)) {
                    var c = Math.abs(h - i);
                    Object(a.a)(e.deltaPTS) ? e.deltaPTS = Math.max(c, e.deltaPTS) : e.deltaPTS = c, o = Math.max(i, h), i = Math.min(i, h), n = Math.min(n, e.startDTS), u = Math.min(r, d), r = Math.max(r, d), s = Math.max(s, e.endDTS)
                }
                e.duration = r - i;
                var f = i - e.start;
                e.appendedPTS = r, e.start = e.startPTS = i, e.maxStartPTS = o, e.startDTS = n, e.endPTS = r, e.minEndPTS = u, e.endDTS = s;
                var g, v = e.sn;
                if (!t || v < t.startSN || v > t.endSN) return 0;
                var p = v - t.startSN,
                    m = t.fragments;
                for (m[p] = e, g = p; g > 0; g--) tt(m[g], m[g - 1]);
                for (g = p; g < m.length - 1; g++) tt(m[g], m[g + 1]);
                return t.fragmentHint && tt(m[m.length - 1], t.fragmentHint), t.PTSKnown = t.alignedSliding = !0, f
            }
    
            function it(t, e) {
                for (var i = null, r = t.fragments, n = r.length - 1; n >= 0; n--) {
                    var s = r[n].initSegment;
                    if (s) {
                        i = s;
                        break
                    }
                }
                t.fragmentHint && delete t.fragmentHint.endPTS;
                var o, u = 0;
                (function (t, e, i) {
                    for (var r = e.skippedSegments, n = Math.max(t.startSN, e.startSN) - e.startSN, a = (t.fragmentHint ? 1 : 0) + (r ? e.endSN : Math.min(t.endSN, e.endSN)) - e.startSN, s = e.startSN - t.startSN, o = e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments, l = t.fragmentHint ? t.fragments.concat(t.fragmentHint) : t.fragments, u = n; u <= a; u++) {
                        var h = l[s + u],
                            d = o[u];
                        r && !d && u < r && (d = e.fragments[u] = h), h && d && i(h, d)
                    }
                }(t, e, (function (t, r) {
                    t.relurl && (u = t.cc - r.cc), Object(a.a)(t.startPTS) && Object(a.a)(t.endPTS) && (r.start = r.startPTS = t.startPTS, r.startDTS = t.startDTS, r.appendedPTS = t.appendedPTS, r.maxStartPTS = t.maxStartPTS, r.endPTS = t.endPTS, r.endDTS = t.endDTS, r.minEndPTS = t.minEndPTS, r.duration = t.endPTS - t.startPTS, r.duration && (o = r), e.PTSKnown = e.alignedSliding = !0), r.elementaryStreams = t.elementaryStreams, r.loader = t.loader, r.stats = t.stats, r.urlId = t.urlId, t.initSegment && (r.initSegment = t.initSegment, i = t.initSegment)
                })), i) && (e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments).forEach((function (t) {
                    var e;
                    t.initSegment && t.initSegment.relurl !== (null === (e = i) || void 0 === e ? void 0 : e.relurl) || (t.initSegment = i)
                }));
                if (e.skippedSegments)
                    if (e.deltaUpdateFailed = e.fragments.some((function (t) {
                            return !t
                        })), e.deltaUpdateFailed) {
                        l.b.warn("[level-helper] Previous playlist missing segments skipped in delta playlist");
                        for (var h = e.skippedSegments; h--;) e.fragments.shift();
                        e.startSN = e.fragments[0].sn, e.startCC = e.fragments[0].cc
                    } else e.canSkipDateRanges && (e.dateRanges = function (t, e, i) {
                        var r = $({}, t);
                        i && i.forEach((function (t) {
                            delete r[t]
                        }));
                        return Object.keys(e).forEach((function (t) {
                            var i = new v(e[t].attr, r[t]);
                            i.isValid ? r[t] = i : l.b.warn('Ignoring invalid Playlist Delta Update DATERANGE tag: "' + JSON.stringify(e[t].attr) + '"')
                        })), r
                    }(t.dateRanges, e.dateRanges, e.recentlyRemovedDateranges));
                var d = e.fragments;
                if (u) {
                    l.b.warn("discontinuity sliding from playlist, take drift into account");
                    for (var c = 0; c < d.length; c++) d[c].cc += u
                }
                e.skippedSegments && (e.startCC = e.fragments[0].cc),
                    function (t, e, i) {
                        if (t && e)
                            for (var r = 0, n = 0, a = t.length; n <= a; n++) {
                                var s = t[n],
                                    o = e[n + r];
                                s && o && s.index === o.index && s.fragment.sn === o.fragment.sn ? i(s, o) : r--
                            }
                    }(t.partList, e.partList, (function (t, e) {
                        e.elementaryStreams = t.elementaryStreams, e.stats = t.stats
                    })), o ? et(e, o, o.startPTS, o.endPTS, o.startDTS, o.endDTS) : rt(t, e), d.length && (e.totalduration = e.edge - d[0].start), e.driftStartTime = t.driftStartTime, e.driftStart = t.driftStart;
                var f = e.advancedDateTime;
                if (e.advanced && f) {
                    var g = e.edge;
                    e.driftStart || (e.driftStartTime = f, e.driftStart = g), e.driftEndTime = f, e.driftEnd = g
                } else e.driftEndTime = t.driftEndTime, e.driftEnd = t.driftEnd, e.advancedDateTime = t.advancedDateTime
            }
    
            function rt(t, e) {
                var i = e.startSN + e.skippedSegments - t.startSN,
                    r = t.fragments;
                i < 0 || i >= r.length || nt(e, r[i].start)
            }
    
            function nt(t, e) {
                if (e) {
                    for (var i = t.fragments, r = t.skippedSegments; r < i.length; r++) i[r].start += e;
                    t.fragmentHint && (t.fragmentHint.start += e)
                }
            }
            var at = function () {
                function t(t, e) {
                    this.hls = void 0, this.timer = -1, this.canLoad = !1, this.retryCount = 0, this.log = void 0, this.warn = void 0, this.log = l.b.log.bind(l.b, e + ":"), this.warn = l.b.warn.bind(l.b, e + ":"), this.hls = t
                }
                var e = t.prototype;
                return e.destroy = function () {
                    this.clearTimer(), this.hls = this.log = this.warn = null
                }, e.onError = function (t, e) {
                    e.fatal && e.type === o.b.NETWORK_ERROR && this.clearTimer()
                }, e.clearTimer = function () {
                    clearTimeout(this.timer), this.timer = -1
                }, e.startLoad = function () {
                    this.canLoad = !0, this.retryCount = 0, this.loadPlaylist()
                }, e.stopLoad = function () {
                    this.canLoad = !1, this.clearTimer()
                }, e.switchParams = function (t, e) {
                    var i = null == e ? void 0 : e.renditionReports;
                    if (i)
                        for (var r = 0; r < i.length; r++) {
                            var n = i[r],
                                s = "" + n.URI;
                            if (s === t.slice(-s.length)) {
                                var o = parseInt(n["LAST-MSN"]),
                                    l = parseInt(n["LAST-PART"]);
                                if (e && this.hls.config.lowLatencyMode) {
                                    var u = Math.min(e.age - e.partTarget, e.targetduration);
                                    void 0 !== l && u > e.partTarget && (l += 1)
                                }
                                if (Object(a.a)(o)) return new X(o, Object(a.a)(l) ? l : void 0, Y.No)
                            }
                        }
                }, e.loadPlaylist = function (t) {}, e.shouldLoadTrack = function (t) {
                    return this.canLoad && t && !!t.url && (!t.details || t.details.live)
                }, e.playlistLoaded = function (t, e, i) {
                    var r = this,
                        n = e.details,
                        a = e.stats,
                        s = a.loading.end ? Math.max(0, self.performance.now() - a.loading.end) : 0;
                    if (n.advancedDateTime = Date.now() - s, n.live || null != i && i.live) {
                        if (n.reloaded(i), i && this.log("live playlist " + t + " " + (n.advanced ? "REFRESHED " + n.lastPartSn + "-" + n.lastPartIndex : "MISSED")), i && n.fragments.length > 0 && it(i, n), !this.canLoad || !n.live) return;
                        var o, l = void 0,
                            u = void 0;
                        if (n.canBlockReload && n.endSN && n.advanced) {
                            var h = this.hls.config.lowLatencyMode,
                                d = n.lastPartSn,
                                c = n.endSN,
                                f = n.lastPartIndex,
                                g = d === c; - 1 !== f ? (l = g ? c + 1 : d, u = g ? h ? 0 : f : f + 1) : l = c + 1;
                            var v = n.age,
                                p = v + n.ageHeader,
                                m = Math.min(p - n.partTarget, 1.5 * n.targetduration);
                            if (m > 0) {
                                if (i && m > i.tuneInGoal) this.warn("CDN Tune-in goal increased from: " + i.tuneInGoal + " to: " + m + " with playlist age: " + n.age), m = 0;
                                else {
                                    var y = Math.floor(m / n.targetduration);
                                    if (l += y, void 0 !== u) u += Math.round(m % n.targetduration / n.partTarget);
                                    this.log("CDN Tune-in age: " + n.ageHeader + "s last advanced " + v.toFixed(2) + "s goal: " + m + " skip sn " + y + " to part " + u)
                                }
                                n.tuneInGoal = m
                            }
                            if (o = this.getDeliveryDirectives(n, e.deliveryDirectives, l, u), h || !g) return void this.loadPlaylist(o)
                        } else o = this.getDeliveryDirectives(n, e.deliveryDirectives, l, u);
                        var T = function (t, e) {
                            var i, r = 1e3 * t.levelTargetDuration,
                                n = r / 2,
                                a = t.age,
                                s = a > 0 && a < 3 * r,
                                o = e.loading.end - e.loading.start,
                                l = t.availabilityDelay;
                            if (!1 === t.updated)
                                if (s) {
                                    var u = 333 * t.misses;
                                    i = Math.max(Math.min(n, 2 * o), u), t.availabilityDelay = (t.availabilityDelay || 0) + i
                                } else i = n;
                            else s ? (l = Math.min(l || r / 2, a), t.availabilityDelay = l, i = l + r - a) : i = r - o;
                            return Math.round(i)
                        }(n, a);
                        void 0 !== l && n.canBlockReload && (T -= n.partTarget || 1), this.log("reload live playlist " + t + " in " + Math.round(T) + " ms"), this.timer = self.setTimeout((function () {
                            return r.loadPlaylist(o)
                        }), T)
                    } else this.clearTimer()
                }, e.getDeliveryDirectives = function (t, e, i, r) {
                    var n = function (t, e) {
                        var i = t.canSkipUntil,
                            r = t.canSkipDateRanges,
                            n = t.endSN;
                        return i && (void 0 !== e ? e - n : 0) < i ? r ? Y.v2 : Y.Yes : Y.No
                    }(t, i);
                    return null != e && e.skip && t.deltaUpdateFailed && (i = e.msn, r = e.part, n = Y.No), new X(i, r, n)
                }, e.retryLoadingOrFail = function (t) {
                    var e, i = this,
                        r = this.hls.config,
                        n = this.retryCount < r.levelLoadingMaxRetry;
                    if (n)
                        if (this.retryCount++, t.details.indexOf("LoadTimeOut") > -1 && null !== (e = t.context) && void 0 !== e && e.deliveryDirectives) this.warn("retry playlist loading #" + this.retryCount + ' after "' + t.details + '"'), this.loadPlaylist();
                        else {
                            var a = Math.min(Math.pow(2, this.retryCount) * r.levelLoadingRetryDelay, r.levelLoadingMaxRetryTimeout);
                            this.timer = self.setTimeout((function () {
                                return i.loadPlaylist()
                            }), a), this.warn("retry playlist loading #" + this.retryCount + " in " + a + ' ms after "' + t.details + '"')
                        }
                    else this.warn('cannot recover from error "' + t.details + '"'), this.clearTimer(), t.fatal = !0;
                    return n
                }, t
            }();
    
            function st() {
                return (st = Object.assign ? Object.assign.bind() : function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
                    }
                    return t
                }).apply(this, arguments)
            }
    
            function ot(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
    
            function lt(t, e) {
                return (lt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var ut, ht = /chrome|firefox/.test(navigator.userAgent.toLowerCase()),
                dt = function (t) {
                    var e, i;
    
                    function r(e) {
                        var i;
                        return (i = t.call(this, e, "[level-controller]") || this)._levels = [], i._firstLevel = -1, i._startLevel = void 0, i.currentLevelIndex = -1, i.manualLevelIndex = -1, i.onParsedComplete = void 0, i._registerListeners(), i
                    }
                    i = t, (e = r).prototype = Object.create(i.prototype), e.prototype.constructor = e, lt(e, i);
                    var n, a, l, u = r.prototype;
                    return u._registerListeners = function () {
                        var t = this.hls;
                        t.on(s.a.MANIFEST_LOADED, this.onManifestLoaded, this), t.on(s.a.LEVEL_LOADED, this.onLevelLoaded, this), t.on(s.a.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.on(s.a.FRAG_LOADED, this.onFragLoaded, this), t.on(s.a.ERROR, this.onError, this)
                    }, u._unregisterListeners = function () {
                        var t = this.hls;
                        t.off(s.a.MANIFEST_LOADED, this.onManifestLoaded, this), t.off(s.a.LEVEL_LOADED, this.onLevelLoaded, this), t.off(s.a.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.off(s.a.FRAG_LOADED, this.onFragLoaded, this), t.off(s.a.ERROR, this.onError, this)
                    }, u.destroy = function () {
                        this._unregisterListeners(), this.manualLevelIndex = -1, this._levels.length = 0, t.prototype.destroy.call(this)
                    }, u.startLoad = function () {
                        this._levels.forEach((function (t) {
                            t.loadError = 0
                        })), t.prototype.startLoad.call(this)
                    }, u.onManifestLoaded = function (t, e) {
                        var i, r, n = [],
                            a = [],
                            l = [],
                            u = {},
                            h = !1,
                            d = !1,
                            c = !1;
                        if (e.levels.forEach((function (t) {
                                var e = t.attrs;
                                h = h || !(!t.width || !t.height), d = d || !!t.videoCodec, c = c || !!t.audioCodec, ht && t.audioCodec && -1 !== t.audioCodec.indexOf("mp4a.40.34") && (t.audioCodec = void 0);
                                var i = t.bitrate + "-" + t.attrs.RESOLUTION + "-" + t.attrs.CODECS;
                                (r = u[i]) ? r.url.push(t.url): (r = new Q(t), u[i] = r, n.push(r)), e && (e.AUDIO && J(r, "audio", e.AUDIO), e.SUBTITLES && J(r, "text", e.SUBTITLES))
                            })), (h || d) && c && (n = n.filter((function (t) {
                                var e = t.videoCodec,
                                    i = t.width,
                                    r = t.height;
                                return !!e || !(!i || !r)
                            }))), n = n.filter((function (t) {
                                var e = t.audioCodec,
                                    i = t.videoCodec;
                                return (!e || E(e, "audio")) && (!i || E(i, "video"))
                            })), e.audioTracks && Z(a = e.audioTracks.filter((function (t) {
                                return !t.audioCodec || E(t.audioCodec, "audio")
                            }))), e.subtitles && Z(l = e.subtitles), n.length > 0) {
                            i = n[0].bitrate, n.sort((function (t, e) {
                                return t.bitrate - e.bitrate
                            })), this._levels = n;
                            for (var f = 0; f < n.length; f++)
                                if (n[f].bitrate === i) {
                                    this._firstLevel = f, this.log("manifest loaded, " + n.length + " level(s) found, first bitrate: " + i);
                                    break
                                } var g = c && !d,
                                v = {
                                    levels: n,
                                    audioTracks: a,
                                    subtitleTracks: l,
                                    firstLevel: this._firstLevel,
                                    stats: e.stats,
                                    audio: c,
                                    video: d,
                                    altAudio: !g && a.some((function (t) {
                                        return !!t.url
                                    }))
                                };
                            this.hls.trigger(s.a.MANIFEST_PARSED, v), (this.hls.config.autoStartLoad || this.hls.forceStartLoad) && this.hls.startLoad(this.hls.config.startPosition)
                        } else this.hls.trigger(s.a.ERROR, {
                            type: o.b.MEDIA_ERROR,
                            details: o.a.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                            fatal: !0,
                            url: e.url,
                            reason: "no level with compatible codecs found in manifest"
                        })
                    }, u.onError = function (e, i) {
                        var r;
                        if (t.prototype.onError.call(this, e, i), !i.fatal) {
                            var n = i.context,
                                a = this._levels[this.currentLevelIndex];
                            if (n && (n.type === w.a.AUDIO_TRACK && a.audioGroupIds && n.groupId === a.audioGroupIds[a.urlId] || n.type === w.a.SUBTITLE_TRACK && a.textGroupIds && n.groupId === a.textGroupIds[a.urlId])) this.redundantFailover(this.currentLevelIndex);
                            else {
                                var s, l = !1,
                                    u = !0;
                                switch (i.details) {
                                    case o.a.FRAG_LOAD_ERROR:
                                    case o.a.FRAG_LOAD_TIMEOUT:
                                    case o.a.KEY_LOAD_ERROR:
                                    case o.a.KEY_LOAD_TIMEOUT:
                                        if (i.frag) {
                                            var h = i.frag.type === w.b.MAIN ? i.frag.level : this.currentLevelIndex,
                                                d = this._levels[h];
                                            d ? (d.fragmentError++, d.fragmentError > this.hls.config.fragLoadingMaxRetry && (s = h)) : s = h
                                        }
                                        break;
                                    case o.a.LEVEL_LOAD_ERROR:
                                    case o.a.LEVEL_LOAD_TIMEOUT:
                                        n && (n.deliveryDirectives && (u = !1), s = n.level), l = !0;
                                        break;
                                    case o.a.REMUX_ALLOC_ERROR:
                                        s = null != (r = i.level) ? r : this.currentLevelIndex, l = !0
                                }
                                void 0 !== s && this.recoverLevel(i, s, l, u)
                            }
                        }
                    }, u.recoverLevel = function (t, e, i, r) {
                        var n = t.details,
                            a = this._levels[e];
                        if (a.loadError++, i) {
                            if (!this.retryLoadingOrFail(t)) return void(this.currentLevelIndex = -1);
                            t.levelRetry = !0
                        }
                        if (r) {
                            var s = a.url.length;
                            if (s > 1 && a.loadError < s) t.levelRetry = !0, this.redundantFailover(e);
                            else if (-1 === this.manualLevelIndex) {
                                for (var o = -1, l = this._levels, u = l.length; u--;) {
                                    var h = (u + this.currentLevelIndex) % l.length;
                                    if (h !== this.currentLevelIndex && 0 === l[h].loadError) {
                                        o = h;
                                        break
                                    }
                                }
                                o > -1 && this.currentLevelIndex !== o && (this.warn(n + ": switch to " + o), t.levelRetry = !0, this.hls.nextAutoLevel = o)
                            }
                        }
                    }, u.redundantFailover = function (t) {
                        var e = this._levels[t],
                            i = e.url.length;
                        if (i > 1) {
                            var r = (e.urlId + 1) % i;
                            this.warn("Switching to redundant URL-id " + r), this._levels.forEach((function (t) {
                                t.urlId = r
                            })), this.level = t
                        }
                    }, u.onFragLoaded = function (t, e) {
                        var i = e.frag;
                        if (void 0 !== i && i.type === w.b.MAIN) {
                            var r = this._levels[i.level];
                            void 0 !== r && (r.fragmentError = 0, r.loadError = 0)
                        }
                    }, u.onLevelLoaded = function (t, e) {
                        var i, r, n = e.level,
                            a = e.details,
                            s = this._levels[n];
                        if (!s) return this.warn("Invalid level index " + n), void(null !== (r = e.deliveryDirectives) && void 0 !== r && r.skip && (a.deltaUpdateFailed = !0));
                        n === this.currentLevelIndex ? (0 === s.fragmentError && (s.loadError = 0, this.retryCount = 0), this.playlistLoaded(n, e, s.details)) : null !== (i = e.deliveryDirectives) && void 0 !== i && i.skip && (a.deltaUpdateFailed = !0)
                    }, u.onAudioTrackSwitched = function (t, e) {
                        var i = this.hls.levels[this.currentLevelIndex];
                        if (i && i.audioGroupIds) {
                            for (var r = -1, n = this.hls.audioTracks[e.id].groupId, a = 0; a < i.audioGroupIds.length; a++)
                                if (i.audioGroupIds[a] === n) {
                                    r = a;
                                    break
                                } r !== i.urlId && (i.urlId = r, this.startLoad())
                        }
                    }, u.loadPlaylist = function (t) {
                        var e = this.currentLevelIndex,
                            i = this._levels[e];
                        if (this.canLoad && i && i.url.length > 0) {
                            var r = i.urlId,
                                n = i.url[r];
                            if (t) try {
                                n = t.addDirectives(n)
                            } catch (t) {
                                this.warn("Could not construct new URL with HLS Delivery Directives: " + t)
                            }
                            this.log("Attempt loading level index " + e + (t ? " at sn " + t.msn + " part " + t.part : "") + " with URL-id " + r + " " + n), this.clearTimer(), this.hls.trigger(s.a.LEVEL_LOADING, {
                                url: n,
                                level: e,
                                id: r,
                                deliveryDirectives: t || null
                            })
                        }
                    }, u.removeLevel = function (t, e) {
                        var i = function (t, i) {
                                return i !== e
                            },
                            r = this._levels.filter((function (r, n) {
                                return n !== t || r.url.length > 1 && void 0 !== e && (r.url = r.url.filter(i), r.audioGroupIds && (r.audioGroupIds = r.audioGroupIds.filter(i)), r.textGroupIds && (r.textGroupIds = r.textGroupIds.filter(i)), r.urlId = 0, !0)
                            })).map((function (t, e) {
                                var i = t.details;
                                return null != i && i.fragments && i.fragments.forEach((function (t) {
                                    t.level = e
                                })), t
                            }));
                        this._levels = r, this.hls.trigger(s.a.LEVELS_UPDATED, {
                            levels: r
                        })
                    }, n = r, (a = [{
                        key: "levels",
                        get: function () {
                            return 0 === this._levels.length ? null : this._levels
                        }
                    }, {
                        key: "level",
                        get: function () {
                            return this.currentLevelIndex
                        },
                        set: function (t) {
                            var e, i = this._levels;
                            if (0 !== i.length && (this.currentLevelIndex !== t || null === (e = i[t]) || void 0 === e || !e.details)) {
                                if (t < 0 || t >= i.length) {
                                    var r = t < 0;
                                    if (this.hls.trigger(s.a.ERROR, {
                                            type: o.b.OTHER_ERROR,
                                            details: o.a.LEVEL_SWITCH_ERROR,
                                            level: t,
                                            fatal: r,
                                            reason: "invalid level idx"
                                        }), r) return;
                                    t = Math.min(t, i.length - 1)
                                }
                                this.clearTimer();
                                var n = this.currentLevelIndex,
                                    a = i[n],
                                    l = i[t];
                                this.log("switching to level " + t + " from " + n), this.currentLevelIndex = t;
                                var u = st({}, l, {
                                    level: t,
                                    maxBitrate: l.maxBitrate,
                                    uri: l.uri,
                                    urlId: l.urlId
                                });
                                delete u._urlId, this.hls.trigger(s.a.LEVEL_SWITCHING, u);
                                var h = l.details;
                                if (!h || h.live) {
                                    var d = this.switchParams(l.uri, null == a ? void 0 : a.details);
                                    this.loadPlaylist(d)
                                }
                            }
                        }
                    }, {
                        key: "manualLevel",
                        get: function () {
                            return this.manualLevelIndex
                        },
                        set: function (t) {
                            this.manualLevelIndex = t, void 0 === this._startLevel && (this._startLevel = t), -1 !== t && (this.level = t)
                        }
                    }, {
                        key: "firstLevel",
                        get: function () {
                            return this._firstLevel
                        },
                        set: function (t) {
                            this._firstLevel = t
                        }
                    }, {
                        key: "startLevel",
                        get: function () {
                            if (void 0 === this._startLevel) {
                                var t = this.hls.config.startLevel;
                                return void 0 !== t ? t : this._firstLevel
                            }
                            return this._startLevel
                        },
                        set: function (t) {
                            this._startLevel = t
                        }
                    }, {
                        key: "nextLoadLevel",
                        get: function () {
                            return -1 !== this.manualLevelIndex ? this.manualLevelIndex : this.hls.nextAutoLevel
                        },
                        set: function (t) {
                            this.level = t, -1 === this.manualLevelIndex && (this.hls.nextAutoLevel = t)
                        }
                    }]) && ot(n.prototype, a), l && ot(n, l), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), r
                }(at);
            ! function (t) {
                t.NOT_LOADED = "NOT_LOADED", t.APPENDING = "APPENDING", t.PARTIAL = "PARTIAL", t.OK = "OK"
            }(ut || (ut = {}));
            var ct = function () {
                function t(t) {
                    this.activeFragment = null, this.activeParts = null, this.fragments = Object.create(null), this.timeRanges = Object.create(null), this.bufferPadding = .2, this.hls = void 0, this.hls = t, this._registerListeners()
                }
                var e = t.prototype;
                return e._registerListeners = function () {
                    var t = this.hls;
                    t.on(s.a.BUFFER_APPENDED, this.onBufferAppended, this), t.on(s.a.FRAG_BUFFERED, this.onFragBuffered, this), t.on(s.a.FRAG_LOADED, this.onFragLoaded, this)
                }, e._unregisterListeners = function () {
                    var t = this.hls;
                    t.off(s.a.BUFFER_APPENDED, this.onBufferAppended, this), t.off(s.a.FRAG_BUFFERED, this.onFragBuffered, this), t.off(s.a.FRAG_LOADED, this.onFragLoaded, this)
                }, e.destroy = function () {
                    this._unregisterListeners(), this.fragments = this.timeRanges = null
                }, e.getAppendedFrag = function (t, e) {
                    if (e === w.b.MAIN) {
                        var i = this.activeFragment,
                            r = this.activeParts;
                        if (!i) return null;
                        if (r)
                            for (var n = r.length; n--;) {
                                var a = r[n],
                                    s = a ? a.end : i.appendedPTS;
                                if (a.start <= t && void 0 !== s && t <= s) return n > 9 && (this.activeParts = r.slice(n - 9)), a
                            } else if (i.start <= t && void 0 !== i.appendedPTS && t <= i.appendedPTS) return i
                    }
                    return this.getBufferedFrag(t, e)
                }, e.getBufferedFrag = function (t, e) {
                    for (var i = this.fragments, r = Object.keys(i), n = r.length; n--;) {
                        var a = i[r[n]];
                        if ((null == a ? void 0 : a.body.type) === e && a.buffered) {
                            var s = a.body;
                            if (s.start <= t && t <= s.end) return s
                        }
                    }
                    return null
                }, e.detectEvictedFragments = function (t, e, i) {
                    var r = this;
                    Object.keys(this.fragments).forEach((function (n) {
                        var a = r.fragments[n];
                        if (a)
                            if (a.buffered) {
                                var s = a.range[t];
                                s && s.time.some((function (t) {
                                    var i = !r.isTimeBuffered(t.startPTS, t.endPTS, e);
                                    return i && r.removeFragment(a.body), i
                                }))
                            } else a.body.type === i && r.removeFragment(a.body)
                    }))
                }, e.detectPartialFragments = function (t) {
                    var e = this,
                        i = this.timeRanges,
                        r = t.frag,
                        n = t.part;
                    if (i && "initSegment" !== r.sn) {
                        var a = gt(r),
                            s = this.fragments[a];
                        s && (Object.keys(i).forEach((function (t) {
                            var a = r.elementaryStreams[t];
                            if (a) {
                                var o = i[t],
                                    l = null !== n || !0 === a.partial;
                                s.range[t] = e.getBufferedTimes(r, n, l, o)
                            }
                        })), s.loaded = null, Object.keys(s.range).length ? s.buffered = !0 : this.removeFragment(s.body))
                    }
                }, e.fragBuffered = function (t) {
                    var e = gt(t),
                        i = this.fragments[e];
                    i && (i.loaded = null, i.buffered = !0)
                }, e.getBufferedTimes = function (t, e, i, r) {
                    for (var n = {
                            time: [],
                            partial: i
                        }, a = e ? e.start : t.start, s = e ? e.end : t.end, o = t.minEndPTS || s, l = t.maxStartPTS || a, u = 0; u < r.length; u++) {
                        var h = r.start(u) - this.bufferPadding,
                            d = r.end(u) + this.bufferPadding;
                        if (l >= h && o <= d) {
                            n.time.push({
                                startPTS: Math.max(a, r.start(u)),
                                endPTS: Math.min(s, r.end(u))
                            });
                            break
                        }
                        if (a < d && s > h) n.partial = !0, n.time.push({
                            startPTS: Math.max(a, r.start(u)),
                            endPTS: Math.min(s, r.end(u))
                        });
                        else if (s <= h) break
                    }
                    return n
                }, e.getPartialFragment = function (t) {
                    var e, i, r, n = null,
                        a = 0,
                        s = this.bufferPadding,
                        o = this.fragments;
                    return Object.keys(o).forEach((function (l) {
                        var u = o[l];
                        u && ft(u) && (i = u.body.start - s, r = u.body.end + s, t >= i && t <= r && (e = Math.min(t - i, r - t), a <= e && (n = u.body, a = e)))
                    })), n
                }, e.getState = function (t) {
                    var e = gt(t),
                        i = this.fragments[e];
                    return i ? i.buffered ? ft(i) ? ut.PARTIAL : ut.OK : ut.APPENDING : ut.NOT_LOADED
                }, e.isTimeBuffered = function (t, e, i) {
                    for (var r, n, a = 0; a < i.length; a++) {
                        if (r = i.start(a) - this.bufferPadding, n = i.end(a) + this.bufferPadding, t >= r && e <= n) return !0;
                        if (e <= r) return !1
                    }
                    return !1
                }, e.onFragLoaded = function (t, e) {
                    var i = e.frag,
                        r = e.part;
                    if ("initSegment" !== i.sn && !i.bitrateTest && !r) {
                        var n = gt(i);
                        this.fragments[n] = {
                            body: i,
                            loaded: e,
                            buffered: !1,
                            range: Object.create(null)
                        }
                    }
                }, e.onBufferAppended = function (t, e) {
                    var i = this,
                        r = e.frag,
                        n = e.part,
                        a = e.timeRanges;
                    if (r.type === w.b.MAIN)
                        if (this.activeFragment = r, n) {
                            var s = this.activeParts;
                            s || (this.activeParts = s = []), s.push(n)
                        } else this.activeParts = null;
                    this.timeRanges = a, Object.keys(a).forEach((function (t) {
                        var e = a[t];
                        if (i.detectEvictedFragments(t, e), !n)
                            for (var s = 0; s < e.length; s++) r.appendedPTS = Math.max(e.end(s), r.appendedPTS || 0)
                    }))
                }, e.onFragBuffered = function (t, e) {
                    this.detectPartialFragments(e)
                }, e.hasFragment = function (t) {
                    var e = gt(t);
                    return !!this.fragments[e]
                }, e.removeFragmentsInRange = function (t, e, i) {
                    var r = this;
                    Object.keys(this.fragments).forEach((function (n) {
                        var a = r.fragments[n];
                        if (a && a.buffered) {
                            var s = a.body;
                            s.type === i && s.start < e && s.end > t && r.removeFragment(s)
                        }
                    }))
                }, e.removeFragment = function (t) {
                    var e = gt(t);
                    t.stats.loaded = 0, t.clearElementaryStreamInfo(), delete this.fragments[e]
                }, e.removeAllFragments = function () {
                    this.fragments = Object.create(null), this.activeFragment = null, this.activeParts = null
                }, t
            }();
    
            function ft(t) {
                var e, i;
                return t.buffered && ((null === (e = t.range.video) || void 0 === e ? void 0 : e.partial) || (null === (i = t.range.audio) || void 0 === i ? void 0 : i.partial))
            }
    
            function gt(t) {
                return t.type + "_" + t.level + "_" + t.urlId + "_" + t.sn
            }
            var vt = function () {
                    function t() {
                        this._boundTick = void 0, this._tickTimer = null, this._tickInterval = null, this._tickCallCount = 0, this._boundTick = this.tick.bind(this)
                    }
                    var e = t.prototype;
                    return e.destroy = function () {
                        this.onHandlerDestroying(), this.onHandlerDestroyed()
                    }, e.onHandlerDestroying = function () {
                        this.clearNextTick(), this.clearInterval()
                    }, e.onHandlerDestroyed = function () {}, e.hasInterval = function () {
                        return !!this._tickInterval
                    }, e.hasNextTick = function () {
                        return !!this._tickTimer
                    }, e.setInterval = function (t) {
                        return !this._tickInterval && (this._tickInterval = self.setInterval(this._boundTick, t), !0)
                    }, e.clearInterval = function () {
                        return !!this._tickInterval && (self.clearInterval(this._tickInterval), this._tickInterval = null, !0)
                    }, e.clearNextTick = function () {
                        return !!this._tickTimer && (self.clearTimeout(this._tickTimer), this._tickTimer = null, !0)
                    }, e.tick = function () {
                        this._tickCallCount++, 1 === this._tickCallCount && (this.doTick(), this._tickCallCount > 1 && this.tickImmediate(), this._tickCallCount = 0)
                    }, e.tickImmediate = function () {
                        this.clearNextTick(), this._tickTimer = self.setTimeout(this._boundTick, 0)
                    }, e.doTick = function () {}, t
                }(),
                pt = {
                    length: 0,
                    start: function () {
                        return 0
                    },
                    end: function () {
                        return 0
                    }
                },
                mt = function () {
                    function t() {}
                    return t.isBuffered = function (e, i) {
                        try {
                            if (e)
                                for (var r = t.getBuffered(e), n = 0; n < r.length; n++)
                                    if (i >= r.start(n) && i <= r.end(n)) return !0
                        } catch (t) {}
                        return !1
                    }, t.bufferInfo = function (e, i, r) {
                        try {
                            if (e) {
                                var n, a = t.getBuffered(e),
                                    s = [];
                                for (n = 0; n < a.length; n++) s.push({
                                    start: a.start(n),
                                    end: a.end(n)
                                });
                                return this.bufferedInfo(s, i, r)
                            }
                        } catch (t) {}
                        return {
                            len: 0,
                            start: i,
                            end: i,
                            nextStart: void 0
                        }
                    }, t.bufferedInfo = function (t, e, i) {
                        e = Math.max(0, e), t.sort((function (t, e) {
                            var i = t.start - e.start;
                            return i || e.end - t.end
                        }));
                        var r = [];
                        if (i)
                            for (var n = 0; n < t.length; n++) {
                                var a = r.length;
                                if (a) {
                                    var s = r[a - 1].end;
                                    t[n].start - s < i ? t[n].end > s && (r[a - 1].end = t[n].end) : r.push(t[n])
                                } else r.push(t[n])
                            } else r = t;
                        for (var o, l = 0, u = e, h = e, d = 0; d < r.length; d++) {
                            var c = r[d].start,
                                f = r[d].end;
                            if (e + i >= c && e < f) u = c, l = (h = f) - e;
                            else if (e + i < c) {
                                o = c;
                                break
                            }
                        }
                        return {
                            len: l,
                            start: u || 0,
                            end: h || 0,
                            nextStart: o
                        }
                    }, t.getBuffered = function (t) {
                        try {
                            return t.buffered
                        } catch (t) {
                            return l.b.log("failed to get media.buffered", t), pt
                        }
                    }, t
                }(),
                yt = function (t, e, i, r, n, a) {
                    void 0 === r && (r = 0), void 0 === n && (n = -1), void 0 === a && (a = !1), this.level = void 0, this.sn = void 0, this.part = void 0, this.id = void 0, this.size = void 0, this.partial = void 0, this.transmuxing = {
                        start: 0,
                        executeStart: 0,
                        executeEnd: 0,
                        end: 0
                    }, this.buffering = {
                        audio: {
                            start: 0,
                            executeStart: 0,
                            executeEnd: 0,
                            end: 0
                        },
                        video: {
                            start: 0,
                            executeStart: 0,
                            executeEnd: 0,
                            end: 0
                        },
                        audiovideo: {
                            start: 0,
                            executeStart: 0,
                            executeEnd: 0,
                            end: 0
                        }
                    }, this.level = t, this.sn = e, this.id = i, this.size = r, this.part = n, this.partial = a
                };
    
            function Tt(t, e) {
                if (t) {
                    var i = t.start + e;
                    t.start = t.startPTS = i, t.endPTS = i + t.duration
                }
            }
    
            function bt(t, e) {
                for (var i = e.fragments, r = 0, n = i.length; r < n; r++) Tt(i[r], t);
                e.fragmentHint && Tt(e.fragmentHint, t), e.alignedSliding = !0
            }
    
            function Et(t, e, i) {
                e && (! function (t, e, i) {
                    if (function (t, e, i) {
                            return !(!e.details || !(i.endCC > i.startCC || t && t.cc < i.startCC))
                        }(t, i, e)) {
                        var r = function (t, e) {
                            var i = t.fragments,
                                r = e.fragments;
                            if (r.length && i.length) {
                                var n = function (t, e) {
                                    for (var i = null, r = 0, n = t.length; r < n; r++) {
                                        var a = t[r];
                                        if (a && a.cc === e) {
                                            i = a;
                                            break
                                        }
                                    }
                                    return i
                                }(i, r[0].cc);
                                if (n && (!n || n.startPTS)) return n;
                                l.b.log("No frag in previous level to align on")
                            } else l.b.log("No fragments to align")
                        }(i.details, e);
                        r && Object(a.a)(r.start) && (l.b.log("Adjusting PTS using last level due to CC increase within current level " + e.url), bt(r.start, e))
                    }
                }(t, i, e), !i.alignedSliding && e.details && function (t, e) {
                    if (!e.fragments.length || !t.hasProgramDateTime || !e.hasProgramDateTime) return;
                    var i = e.fragments[0].programDateTime,
                        r = t.fragments[0].programDateTime,
                        n = (r - i) / 1e3 + e.fragments[0].start;
                    n && Object(a.a)(n) && (l.b.log("Adjusting PTS using programDateTime delta " + (r - i) + "ms, sliding:" + n.toFixed(3) + " " + t.url + " "), bt(n, t))
                }(i, e.details), i.alignedSliding || !e.details || i.skippedSegments || rt(e.details, i))
            }
    
            function St(t, e) {
                var i = t.programDateTime;
                if (i) {
                    var r = (i - e) / 1e3;
                    t.start = t.startPTS = r, t.endPTS = r + t.duration
                }
            }
    
            function Lt(t, e) {
                if (e.fragments.length && t.hasProgramDateTime && e.hasProgramDateTime) {
                    var i = e.fragments[0].programDateTime - 1e3 * e.fragments[0].start;
                    t.fragments.forEach((function (t) {
                        St(t, i)
                    })), t.fragmentHint && St(t.fragmentHint, i), t.alignedSliding = !0
                }
            }
            var At = {
                search: function (t, e) {
                    for (var i = 0, r = t.length - 1, n = null, a = null; i <= r;) {
                        var s = e(a = t[n = (i + r) / 2 | 0]);
                        if (s > 0) i = n + 1;
                        else {
                            if (!(s < 0)) return a;
                            r = n - 1
                        }
                    }
                    return null
                }
            };
    
            function Dt(t, e, i, r) {
                void 0 === i && (i = 0), void 0 === r && (r = 0);
                var n = null;
                if (t ? n = e[t.sn - e[0].sn + 1] || null : 0 === i && 0 === e[0].start && (n = e[0]), n && 0 === Rt(i, r, n)) return n;
                var a = At.search(e, Rt.bind(null, i, r));
                return a || n
            }
    
            function Rt(t, e, i) {
                void 0 === t && (t = 0), void 0 === e && (e = 0);
                var r = Math.min(e, i.duration + (i.deltaPTS ? i.deltaPTS : 0));
                return i.start + i.duration - r <= t ? 1 : i.start - r > t && i.start ? -1 : 0
            }
    
            function kt(t, e, i) {
                var r = 1e3 * Math.min(e, i.duration + (i.deltaPTS ? i.deltaPTS : 0));
                return (i.endProgramDateTime || 0) - r > t
            }
    
            function _t(t) {
                var e = "function" == typeof Map ? new Map : void 0;
                return (_t = function (t) {
                    if (null === t || (i = t, -1 === Function.toString.call(i).indexOf("[native code]"))) return t;
                    var i;
                    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== e) {
                        if (e.has(t)) return e.get(t);
                        e.set(t, r)
                    }
    
                    function r() {
                        return It(t, arguments, wt(this).constructor)
                    }
                    return r.prototype = Object.create(t.prototype, {
                        constructor: {
                            value: r,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), Ct(r, t)
                })(t)
            }
    
            function It(t, e, i) {
                return (It = Ot() ? Reflect.construct.bind() : function (t, e, i) {
                    var r = [null];
                    r.push.apply(r, e);
                    var n = new(Function.bind.apply(t, r));
                    return i && Ct(n, i.prototype), n
                }).apply(null, arguments)
            }
    
            function Ot() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }
    
            function Ct(t, e) {
                return (Ct = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
    
            function wt(t) {
                return (wt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }
            var xt = Math.pow(2, 17),
                Pt = function () {
                    function t(t) {
                        this.config = void 0, this.loader = null, this.partLoadTimeout = -1, this.config = t
                    }
                    var e = t.prototype;
                    return e.destroy = function () {
                        this.loader && (this.loader.destroy(), this.loader = null)
                    }, e.abort = function () {
                        this.loader && this.loader.abort()
                    }, e.load = function (t, e) {
                        var i = this,
                            r = t.url;
                        if (!r) return Promise.reject(new Mt({
                            type: o.b.NETWORK_ERROR,
                            details: o.a.FRAG_LOAD_ERROR,
                            fatal: !1,
                            frag: t,
                            networkDetails: null
                        }, "Fragment does not have a " + (r ? "part list" : "url")));
                        this.abort();
                        var n = this.config,
                            a = n.fLoader,
                            s = n.loader;
                        return new Promise((function (r, l) {
                            i.loader && i.loader.destroy();
                            var u = i.loader = t.loader = a ? new a(n) : new s(n),
                                h = Ft(t),
                                d = {
                                    timeout: n.fragLoadingTimeOut,
                                    maxRetry: 0,
                                    retryDelay: 0,
                                    maxRetryDelay: n.fragLoadingMaxRetryTimeout,
                                    highWaterMark: "initSegment" === t.sn ? 1 / 0 : xt
                                };
                            t.stats = u.stats, u.load(h, d, {
                                onSuccess: function (e, n, a, s) {
                                    i.resetLoader(t, u), r({
                                        frag: t,
                                        part: null,
                                        payload: e.data,
                                        networkDetails: s
                                    })
                                },
                                onError: function (e, r, n) {
                                    i.resetLoader(t, u), l(new Mt({
                                        type: o.b.NETWORK_ERROR,
                                        details: o.a.FRAG_LOAD_ERROR,
                                        fatal: !1,
                                        frag: t,
                                        response: e,
                                        networkDetails: n
                                    }))
                                },
                                onAbort: function (e, r, n) {
                                    i.resetLoader(t, u), l(new Mt({
                                        type: o.b.NETWORK_ERROR,
                                        details: o.a.INTERNAL_ABORTED,
                                        fatal: !1,
                                        frag: t,
                                        networkDetails: n
                                    }))
                                },
                                onTimeout: function (e, r, n) {
                                    i.resetLoader(t, u), l(new Mt({
                                        type: o.b.NETWORK_ERROR,
                                        details: o.a.FRAG_LOAD_TIMEOUT,
                                        fatal: !1,
                                        frag: t,
                                        networkDetails: n
                                    }))
                                },
                                onProgress: function (i, r, n, a) {
                                    e && e({
                                        frag: t,
                                        part: null,
                                        payload: n,
                                        networkDetails: a
                                    })
                                }
                            })
                        }))
                    }, e.loadPart = function (t, e, i) {
                        var r = this;
                        this.abort();
                        var n = this.config,
                            a = n.fLoader,
                            s = n.loader;
                        return new Promise((function (l, u) {
                            r.loader && r.loader.destroy();
                            var h = r.loader = t.loader = a ? new a(n) : new s(n),
                                d = Ft(t, e),
                                c = {
                                    timeout: n.fragLoadingTimeOut,
                                    maxRetry: 0,
                                    retryDelay: 0,
                                    maxRetryDelay: n.fragLoadingMaxRetryTimeout,
                                    highWaterMark: xt
                                };
                            e.stats = h.stats, h.load(d, c, {
                                onSuccess: function (n, a, s, o) {
                                    r.resetLoader(t, h), r.updateStatsFromPart(t, e);
                                    var u = {
                                        frag: t,
                                        part: e,
                                        payload: n.data,
                                        networkDetails: o
                                    };
                                    i(u), l(u)
                                },
                                onError: function (i, n, a) {
                                    r.resetLoader(t, h), u(new Mt({
                                        type: o.b.NETWORK_ERROR,
                                        details: o.a.FRAG_LOAD_ERROR,
                                        fatal: !1,
                                        frag: t,
                                        part: e,
                                        response: i,
                                        networkDetails: a
                                    }))
                                },
                                onAbort: function (i, n, a) {
                                    t.stats.aborted = e.stats.aborted, r.resetLoader(t, h), u(new Mt({
                                        type: o.b.NETWORK_ERROR,
                                        details: o.a.INTERNAL_ABORTED,
                                        fatal: !1,
                                        frag: t,
                                        part: e,
                                        networkDetails: a
                                    }))
                                },
                                onTimeout: function (i, n, a) {
                                    r.resetLoader(t, h), u(new Mt({
                                        type: o.b.NETWORK_ERROR,
                                        details: o.a.FRAG_LOAD_TIMEOUT,
                                        fatal: !1,
                                        frag: t,
                                        part: e,
                                        networkDetails: a
                                    }))
                                }
                            })
                        }))
                    }, e.updateStatsFromPart = function (t, e) {
                        var i = t.stats,
                            r = e.stats,
                            n = r.total;
                        if (i.loaded += r.loaded, n) {
                            var a = Math.round(t.duration / e.duration),
                                s = Math.min(Math.round(i.loaded / n), a),
                                o = (a - s) * Math.round(i.loaded / s);
                            i.total = i.loaded + o
                        } else i.total = Math.max(i.loaded, i.total);
                        var l = i.loading,
                            u = r.loading;
                        l.start ? l.first += u.first - u.start : (l.start = u.start, l.first = u.first), l.end = u.end
                    }, e.resetLoader = function (t, e) {
                        t.loader = null, this.loader === e && (self.clearTimeout(this.partLoadTimeout), this.loader = null), e.destroy()
                    }, t
                }();
    
            function Ft(t, e) {
                void 0 === e && (e = null);
                var i = e || t,
                    r = {
                        frag: t,
                        part: e,
                        responseType: "arraybuffer",
                        url: i.url,
                        headers: {},
                        rangeStart: 0,
                        rangeEnd: 0
                    },
                    n = i.byteRangeStartOffset,
                    s = i.byteRangeEndOffset;
                return Object(a.a)(n) && Object(a.a)(s) && (r.rangeStart = n, r.rangeEnd = s), r
            }
            var Mt = function (t) {
                    var e, i;
    
                    function r(e) {
                        for (var i, r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) n[a - 1] = arguments[a];
                        return (i = t.call.apply(t, [this].concat(n)) || this).data = void 0, i.data = e, i
                    }
                    return i = t, (e = r).prototype = Object.create(i.prototype), e.prototype.constructor = e, Ct(e, i), r
                }(_t(Error)),
                Nt = i(16),
                Ut = {
                    toString: function (t) {
                        for (var e = "", i = t.length, r = 0; r < i; r++) e += "[" + t.start(r).toFixed(3) + "," + t.end(r).toFixed(3) + "]";
                        return e
                    }
                };
    
            function Bt(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
    
            function Gt(t) {
                if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }
    
            function jt(t, e) {
                return (jt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var Kt = "STOPPED",
                Ht = "IDLE",
                Vt = "KEY_LOADING",
                Wt = "FRAG_LOADING",
                Yt = "FRAG_LOADING_WAITING_RETRY",
                qt = "WAITING_TRACK",
                zt = "PARSING",
                Xt = "PARSED",
                Qt = "ENDED",
                $t = "ERROR",
                Jt = "WAITING_INIT_PTS",
                Zt = "WAITING_LEVEL",
                te = function (t) {
                    var e, i;
    
                    function r(e, i, r) {
                        var n;
                        return (n = t.call(this) || this).hls = void 0, n.fragPrevious = null, n.fragCurrent = null, n.fragmentTracker = void 0, n.transmuxer = null, n._state = Kt, n.media = null, n.mediaBuffer = null, n.config = void 0, n.bitrateTest = !1, n.lastCurrentTime = 0, n.nextLoadPosition = 0, n.startPosition = 0, n.loadedmetadata = !1, n.fragLoadError = 0, n.retryDate = 0, n.levels = null, n.fragmentLoader = void 0, n.levelLastLoaded = null, n.startFragRequested = !1, n.decrypter = void 0, n.initPTS = [], n.onvseeking = null, n.onvended = null, n.logPrefix = "", n.log = void 0, n.warn = void 0, n.logPrefix = r, n.log = l.b.log.bind(l.b, r + ":"), n.warn = l.b.warn.bind(l.b, r + ":"), n.hls = e, n.fragmentLoader = new Pt(e.config), n.fragmentTracker = i, n.config = e.config, n.decrypter = new Nt.a(e, e.config), e.on(s.a.KEY_LOADED, n.onKeyLoaded, Gt(n)), e.on(s.a.LEVEL_SWITCHING, n.onLevelSwitching, Gt(n)), n
                    }
                    i = t, (e = r).prototype = Object.create(i.prototype), e.prototype.constructor = e, jt(e, i);
                    var n, h, d, c = r.prototype;
                    return c.doTick = function () {
                        this.onTickEnd()
                    }, c.onTickEnd = function () {}, c.startLoad = function (t) {}, c.stopLoad = function () {
                        this.fragmentLoader.abort();
                        var t = this.fragCurrent;
                        t && this.fragmentTracker.removeFragment(t), this.resetTransmuxer(), this.fragCurrent = null, this.fragPrevious = null, this.clearInterval(), this.clearNextTick(), this.state = Kt
                    }, c._streamEnded = function (t, e) {
                        var i = this.fragCurrent,
                            r = this.fragmentTracker;
                        if (!e.live && i && this.media && i.sn >= e.endSN && !t.nextStart) {
                            var n = e.partList;
                            if (null != n && n.length) {
                                var a = n[n.length - 1];
                                return mt.isBuffered(this.media, a.start + a.duration / 2)
                            }
                            var s = r.getState(i);
                            return s === ut.PARTIAL || s === ut.OK
                        }
                        return !1
                    }, c.onMediaAttached = function (t, e) {
                        var i = this.media = this.mediaBuffer = e.media;
                        this.onvseeking = this.onMediaSeeking.bind(this), this.onvended = this.onMediaEnded.bind(this), i.addEventListener("seeking", this.onvseeking), i.addEventListener("ended", this.onvended);
                        var r = this.config;
                        this.levels && r.autoStartLoad && this.state === Kt && this.startLoad(r.startPosition)
                    }, c.onMediaDetaching = function () {
                        var t = this.media;
                        null != t && t.ended && (this.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0), t && this.onvseeking && this.onvended && (t.removeEventListener("seeking", this.onvseeking), t.removeEventListener("ended", this.onvended), this.onvseeking = this.onvended = null), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.fragmentTracker.removeAllFragments(), this.stopLoad()
                    }, c.onMediaSeeking = function () {
                        var t = this.config,
                            e = this.fragCurrent,
                            i = this.media,
                            r = this.mediaBuffer,
                            n = this.state,
                            s = i ? i.currentTime : 0,
                            o = mt.bufferInfo(r || i, s, t.maxBufferHole);
                        if (this.log("media seeking to " + (Object(a.a)(s) ? s.toFixed(3) : s) + ", state: " + n), n === Qt) this.resetLoadingState();
                        else if (e && !o.len) {
                            var l = t.maxFragLookUpTolerance,
                                u = e.start - l,
                                h = s > e.start + e.duration + l;
                            (s < u || h) && (h && e.loader && (this.log("seeking outside of buffer while fragment load in progress, cancel fragment load"), e.loader.abort()), this.resetLoadingState())
                        }
                        i && (this.lastCurrentTime = s), this.loadedmetadata || o.len || (this.nextLoadPosition = this.startPosition = s), this.tickImmediate()
                    }, c.onMediaEnded = function () {
                        this.startPosition = this.lastCurrentTime = 0
                    }, c.onKeyLoaded = function (t, e) {
                        if (this.state === Vt && e.frag === this.fragCurrent && this.levels) {
                            this.state = Ht;
                            var i = this.levels[e.frag.level].details;
                            i && this.loadFragment(e.frag, i, e.frag.start)
                        }
                    }, c.onLevelSwitching = function (t, e) {
                        this.fragLoadError = 0
                    }, c.onHandlerDestroying = function () {
                        this.stopLoad(), t.prototype.onHandlerDestroying.call(this)
                    }, c.onHandlerDestroyed = function () {
                        this.state = Kt, this.hls.off(s.a.KEY_LOADED, this.onKeyLoaded, this), this.hls.off(s.a.LEVEL_SWITCHING, this.onLevelSwitching, this), this.fragmentLoader && this.fragmentLoader.destroy(), this.decrypter && this.decrypter.destroy(), this.hls = this.log = this.warn = this.decrypter = this.fragmentLoader = this.fragmentTracker = null, t.prototype.onHandlerDestroyed.call(this)
                    }, c.loadKey = function (t, e) {
                        this.log("Loading key for " + t.sn + " of [" + e.startSN + "-" + e.endSN + "], " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + " " + t.level), this.state = Vt, this.fragCurrent = t, this.hls.trigger(s.a.KEY_LOADING, {
                            frag: t
                        })
                    }, c.loadFragment = function (t, e, i) {
                        this._loadFragForPlayback(t, e, i)
                    }, c._loadFragForPlayback = function (t, e, i) {
                        var r = this;
                        this._doFragLoad(t, e, i, (function (e) {
                            if (r.fragContextChanged(t)) return r.warn("Fragment " + t.sn + (e.part ? " p: " + e.part.index : "") + " of level " + t.level + " was dropped during download."), void r.fragmentTracker.removeFragment(t);
                            t.stats.chunkCount++, r._handleFragmentLoadProgress(e)
                        })).then((function (e) {
                            if (e) {
                                r.fragLoadError = 0;
                                var i = r.state;
                                r.fragContextChanged(t) ? (i === Wt || !r.fragCurrent && i === zt) && (r.fragmentTracker.removeFragment(t), r.state = Ht) : ("payload" in e && (r.log("Loaded fragment " + t.sn + " of level " + t.level), r.hls.trigger(s.a.FRAG_LOADED, e)), r._handleFragmentLoadComplete(e))
                            }
                        })).catch((function (e) {
                            r.state !== Kt && r.state !== $t && (r.warn(e), r.resetFragmentLoading(t))
                        }))
                    }, c.flushMainBuffer = function (t, e, i) {
                        if (void 0 === i && (i = null), t - e) {
                            var r = {
                                startOffset: t,
                                endOffset: e,
                                type: i
                            };
                            this.fragLoadError = 0, this.hls.trigger(s.a.BUFFER_FLUSHING, r)
                        }
                    }, c._loadInitSegment = function (t) {
                        var e = this;
                        this._doFragLoad(t).then((function (i) {
                            if (!i || e.fragContextChanged(t) || !e.levels) throw new Error("init load aborted");
                            return i
                        })).then((function (i) {
                            var r = e.hls,
                                n = i.payload,
                                a = t.decryptdata;
                            if (n && n.byteLength > 0 && a && a.key && a.iv && "AES-128" === a.method) {
                                var o = self.performance.now();
                                return e.decrypter.webCryptoDecrypt(new Uint8Array(n), a.key.buffer, a.iv.buffer).then((function (e) {
                                    var n = self.performance.now();
                                    return r.trigger(s.a.FRAG_DECRYPTED, {
                                        frag: t,
                                        payload: e,
                                        stats: {
                                            tstart: o,
                                            tdecrypt: n
                                        }
                                    }), i.payload = e, i
                                }))
                            }
                            return i
                        })).then((function (i) {
                            var r = e.fragCurrent,
                                n = e.hls,
                                a = e.levels;
                            if (!a) throw new Error("init load aborted, missing levels");
                            a[t.level].details;
                            var o = t.stats;
                            e.state = Ht, e.fragLoadError = 0, t.data = new Uint8Array(i.payload), o.parsing.start = o.buffering.start = self.performance.now(), o.parsing.end = o.buffering.end = self.performance.now(), i.frag === r && n.trigger(s.a.FRAG_BUFFERED, {
                                stats: o,
                                frag: r,
                                part: null,
                                id: t.type
                            }), e.tick()
                        })).catch((function (i) {
                            e.state !== Kt && e.state !== $t && (e.warn(i), e.resetFragmentLoading(t))
                        }))
                    }, c.fragContextChanged = function (t) {
                        var e = this.fragCurrent;
                        return !t || !e || t.level !== e.level || t.sn !== e.sn || t.urlId !== e.urlId
                    }, c.fragBufferedComplete = function (t, e) {
                        var i = this.mediaBuffer ? this.mediaBuffer : this.media;
                        this.log("Buffered " + t.type + " sn: " + t.sn + (e ? " part: " + e.index : "") + " of " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + " " + t.level + " " + (i ? Ut.toString(mt.getBuffered(i)) : "(detached)")), this.state = Ht, i && (!this.loadedmetadata && i.buffered.length && this.fragCurrent === this.fragPrevious && (this.loadedmetadata = !0, this.seekToStartPos()), this.tick())
                    }, c.seekToStartPos = function () {}, c._handleFragmentLoadComplete = function (t) {
                        var e = this.transmuxer;
                        if (e) {
                            var i = t.frag,
                                r = t.part,
                                n = t.partsLoaded,
                                a = !n || 0 === n.length || n.some((function (t) {
                                    return !t
                                })),
                                s = new yt(i.level, i.sn, i.stats.chunkCount + 1, 0, r ? r.index : -1, !a);
                            e.flush(s)
                        }
                    }, c._handleFragmentLoadProgress = function (t) {}, c._doFragLoad = function (t, e, i, r) {
                        var n = this;
                        if (void 0 === i && (i = null), !this.levels) throw new Error("frag load aborted, missing levels");
                        if (i = Math.max(t.start, i || 0), this.config.lowLatencyMode && e) {
                            var o = e.partList;
                            if (o && r) {
                                i > t.end && e.fragmentHint && (t = e.fragmentHint);
                                var l = this.getNextPart(o, t, i);
                                if (l > -1) {
                                    var u = o[l];
                                    return this.log("Loading part sn: " + t.sn + " p: " + u.index + " cc: " + t.cc + " of playlist [" + e.startSN + "-" + e.endSN + "] parts [0-" + l + "-" + (o.length - 1) + "] " + ("[stream-controller]" === this.logPrefix ? "level" : "track") + ": " + t.level + ", target: " + parseFloat(i.toFixed(3))), this.nextLoadPosition = u.start + u.duration, this.state = Wt, this.hls.trigger(s.a.FRAG_LOADING, {
                                        frag: t,
                                        part: o[l],
                                        targetBufferTime: i
                                    }), this.doFragPartsLoad(t, o, l, r).catch((function (t) {
                                        return n.handleFragLoadError(t)
                                    }))
                                }
                                if (!t.url || this.loadedEndOfParts(o, i)) return Promise.resolve(null)
                            }
                        }
                        return this.log("Loading fragment " + t.sn + " cc: " + t.cc + " " + (e ? "of [" + e.startSN + "-" + e.endSN + "] " : "") + ("[stream-controller]" === this.logPrefix ? "level" : "track") + ": " + t.level + ", target: " + parseFloat(i.toFixed(3))), Object(a.a)(t.sn) && !this.bitrateTest && (this.nextLoadPosition = t.start + t.duration), this.state = Wt, this.hls.trigger(s.a.FRAG_LOADING, {
                            frag: t,
                            targetBufferTime: i
                        }), this.fragmentLoader.load(t, r).catch((function (t) {
                            return n.handleFragLoadError(t)
                        }))
                    }, c.doFragPartsLoad = function (t, e, i, r) {
                        var n = this;
                        return new Promise((function (a, o) {
                            var l = [];
                            ! function i(u) {
                                var h = e[u];
                                n.fragmentLoader.loadPart(t, h, r).then((function (r) {
                                    l[h.index] = r;
                                    var o = r.part;
                                    n.hls.trigger(s.a.FRAG_LOADED, r);
                                    var d = e[u + 1];
                                    if (!d || d.fragment !== t) return a({
                                        frag: t,
                                        part: o,
                                        partsLoaded: l
                                    });
                                    i(u + 1)
                                })).catch(o)
                            }(i)
                        }))
                    }, c.handleFragLoadError = function (t) {
                        var e = t.data;
                        return e && e.details === o.a.INTERNAL_ABORTED ? this.handleFragLoadAborted(e.frag, e.part) : this.hls.trigger(s.a.ERROR, e), null
                    }, c._handleTransmuxerFlush = function (t) {
                        var e = this.getCurrentContext(t);
                        if (e && this.state === zt) {
                            var i = e.frag,
                                r = e.part,
                                n = e.level,
                                a = self.performance.now();
                            i.stats.parsing.end = a, r && (r.stats.parsing.end = a), this.updateLevelTiming(i, r, n, t.partial)
                        } else this.fragCurrent || (this.state = Ht)
                    }, c.getCurrentContext = function (t) {
                        var e = this.levels,
                            i = t.level,
                            r = t.sn,
                            n = t.part;
                        if (!e || !e[i]) return this.warn("Levels object was unset while buffering fragment " + r + " of level " + i + ". The current chunk will not be buffered."), null;
                        var a = e[i],
                            s = n > -1 ? function (t, e, i) {
                                if (!t || !t.details) return null;
                                var r = t.details.partList;
                                if (r)
                                    for (var n = r.length; n--;) {
                                        var a = r[n];
                                        if (a.index === i && a.fragment.sn === e) return a
                                    }
                                return null
                            }(a, r, n) : null,
                            o = s ? s.fragment : function (t, e, i) {
                                if (!t || !t.details) return null;
                                var r = t.details,
                                    n = r.fragments[e - r.startSN];
                                return n || ((n = r.fragmentHint) && n.sn === e ? n : e < r.startSN && i && i.sn === e ? i : null)
                            }(a, r, this.fragCurrent);
                        return o ? {
                            frag: o,
                            part: s,
                            level: a
                        } : null
                    }, c.bufferFragmentData = function (t, e, i, r) {
                        if (t && this.state === zt) {
                            var n = t.data1,
                                a = t.data2,
                                o = n;
                            if (n && a && (o = Object(u.b)(n, a)), o && o.length) {
                                var l = {
                                    type: t.type,
                                    frag: e,
                                    part: i,
                                    chunkMeta: r,
                                    parent: e.type,
                                    data: o
                                };
                                this.hls.trigger(s.a.BUFFER_APPENDING, l), t.dropped && t.independent && !i && this.flushBufferGap(e)
                            }
                        }
                    }, c.flushBufferGap = function (t) {
                        var e = this.media;
                        if (e)
                            if (mt.isBuffered(e, e.currentTime)) {
                                var i = e.currentTime,
                                    r = mt.bufferInfo(e, i, 0),
                                    n = t.duration,
                                    a = Math.min(2 * this.config.maxFragLookUpTolerance, .25 * n),
                                    s = Math.max(Math.min(t.start - a, r.end - a), i + a);
                                t.start - s > a && this.flushMainBuffer(s, t.start)
                            } else this.flushMainBuffer(0, t.start)
                    }, c.getFwdBufferInfo = function (t, e) {
                        var i = this.config,
                            r = this.getLoadPosition();
                        if (!Object(a.a)(r)) return null;
                        var n = mt.bufferInfo(t, r, i.maxBufferHole);
                        if (0 === n.len && void 0 !== n.nextStart) {
                            var s = this.fragmentTracker.getBufferedFrag(r, e);
                            if (s && n.nextStart < s.end) return mt.bufferInfo(t, r, Math.max(n.nextStart, i.maxBufferHole))
                        }
                        return n
                    }, c.getMaxBufferLength = function (t) {
                        var e, i = this.config;
                        return e = t ? Math.max(8 * i.maxBufferSize / t, i.maxBufferLength) : i.maxBufferLength, Math.min(e, i.maxMaxBufferLength)
                    }, c.reduceMaxBufferLength = function (t) {
                        var e = this.config,
                            i = t || e.maxBufferLength;
                        return e.maxMaxBufferLength >= i && (e.maxMaxBufferLength /= 2, this.warn("Reduce max buffer length to " + e.maxMaxBufferLength + "s"), !0)
                    }, c.getNextFragment = function (t, e) {
                        var i = e.fragments,
                            r = i.length;
                        if (!r) return null;
                        var n, a = this.config,
                            s = i[0].start;
                        if (e.live) {
                            var o = a.initialLiveManifestSize;
                            if (r < o) return this.warn("Not enough fragments to start playback (have: " + r + ", need: " + o + ")"), null;
                            e.PTSKnown || this.startFragRequested || -1 !== this.startPosition || (n = this.getInitialLiveFragment(e, i), this.startPosition = n ? this.hls.liveSyncPosition || n.start : t)
                        } else t <= s && (n = i[0]);
                        if (!n) {
                            var l = a.lowLatencyMode ? e.partEnd : e.fragmentEnd;
                            n = this.getFragmentAtPosition(t, l, e)
                        }
                        return this.mapToInitFragWhenRequired(n)
                    }, c.mapToInitFragWhenRequired = function (t) {
                        return null == t || !t.initSegment || null != t && t.initSegment.data || this.bitrateTest ? t : t.initSegment
                    }, c.getNextPart = function (t, e, i) {
                        for (var r = -1, n = !1, a = !0, s = 0, o = t.length; s < o; s++) {
                            var l = t[s];
                            if (a = a && !l.independent, r > -1 && i < l.start) break;
                            var u = l.loaded;
                            !u && (n || l.independent || a) && l.fragment === e && (r = s), n = u
                        }
                        return r
                    }, c.loadedEndOfParts = function (t, e) {
                        var i = t[t.length - 1];
                        return i && e > i.start && i.loaded
                    }, c.getInitialLiveFragment = function (t, e) {
                        var i = this.fragPrevious,
                            r = null;
                        if (i) {
                            if (t.hasProgramDateTime && (this.log("Live playlist, switching playlist, load frag with same PDT: " + i.programDateTime), r = function (t, e, i) {
                                    if (null === e || !Array.isArray(t) || !t.length || !Object(a.a)(e)) return null;
                                    if (e < (t[0].programDateTime || 0)) return null;
                                    if (e >= (t[t.length - 1].endProgramDateTime || 0)) return null;
                                    i = i || 0;
                                    for (var r = 0; r < t.length; ++r) {
                                        var n = t[r];
                                        if (kt(e, i, n)) return n
                                    }
                                    return null
                                }(e, i.endProgramDateTime, this.config.maxFragLookUpTolerance)), !r) {
                                var n = i.sn + 1;
                                if (n >= t.startSN && n <= t.endSN) {
                                    var s = e[n - t.startSN];
                                    i.cc === s.cc && (r = s, this.log("Live playlist, switching playlist, load frag with next SN: " + r.sn))
                                }
                                r || (r = function (t, e) {
                                    return At.search(t, (function (t) {
                                        return t.cc < e ? 1 : t.cc > e ? -1 : 0
                                    }))
                                }(e, i.cc)) && this.log("Live playlist, switching playlist, load frag with same CC: " + r.sn)
                            }
                        } else {
                            var o = this.hls.liveSyncPosition;
                            null !== o && (r = this.getFragmentAtPosition(o, this.bitrateTest ? t.fragmentEnd : t.edge, t))
                        }
                        return r
                    }, c.getFragmentAtPosition = function (t, e, i) {
                        var r, n = this.config,
                            a = this.fragPrevious,
                            s = i.fragments,
                            o = i.endSN,
                            l = i.fragmentHint,
                            u = n.maxFragLookUpTolerance,
                            h = !!(n.lowLatencyMode && i.partList && l);
                        (h && l && !this.bitrateTest && (s = s.concat(l), o = l.sn), t < e) ? r = Dt(a, s, t, t > e - u ? 0 : u): r = s[s.length - 1];
                        if (r) {
                            var d = r.sn - i.startSN;
                            if (a && r.sn === a.sn && !h)
                                if (a && r.level === a.level) {
                                    var c = s[d + 1];
                                    r.sn < o && this.fragmentTracker.getState(c) !== ut.OK ? (this.log("SN " + r.sn + " just loaded, load next one: " + c.sn), r = c) : r = null
                                }
                        }
                        return r
                    }, c.synchronizeToLiveEdge = function (t) {
                        var e = this.config,
                            i = this.media;
                        if (i) {
                            var r = this.hls.liveSyncPosition,
                                n = i.currentTime,
                                a = t.fragments[0].start,
                                s = t.edge,
                                o = n >= a - e.maxFragLookUpTolerance && n <= s;
                            if (null !== r && i.duration > r && (n < r || !o)) {
                                var l = void 0 !== e.liveMaxLatencyDuration ? e.liveMaxLatencyDuration : e.liveMaxLatencyDurationCount * t.targetduration;
                                (!o && i.readyState < 4 || n < s - l) && (this.loadedmetadata || (this.nextLoadPosition = r), i.readyState && (this.warn("Playback: " + n.toFixed(3) + " is located too far from the end of live sliding playlist: " + s + ", reset currentTime to : " + r.toFixed(3)), i.currentTime = r))
                            }
                        }
                    }, c.alignPlaylists = function (t, e) {
                        var i = this.levels,
                            r = this.levelLastLoaded,
                            n = this.fragPrevious,
                            s = null !== r ? i[r] : null,
                            o = t.fragments.length;
                        if (!o) return this.warn("No fragments in live playlist"), 0;
                        var l = t.fragments[0].start,
                            u = !e,
                            h = t.alignedSliding && Object(a.a)(l);
                        if (u || !h && !l) {
                            Et(n, s, t);
                            var d = t.fragments[0].start;
                            return this.log("Live playlist sliding: " + d.toFixed(2) + " start-sn: " + (e ? e.startSN : "na") + "->" + t.startSN + " prev-sn: " + (n ? n.sn : "na") + " fragments: " + o), d
                        }
                        return l
                    }, c.waitForCdnTuneIn = function (t) {
                        return t.live && t.canBlockReload && t.partTarget && t.tuneInGoal > Math.max(t.partHoldBack, 3 * t.partTarget)
                    }, c.setStartPosition = function (t, e) {
                        var i = this.startPosition;
                        if (i < e && (i = -1), -1 === i || -1 === this.lastCurrentTime) {
                            var r = t.startTimeOffset;
                            Object(a.a)(r) ? (i = e + r, r < 0 && (i += t.totalduration), i = Math.min(Math.max(e, i), e + t.totalduration), this.log("Start time offset " + r + " found in playlist, adjust startPosition to " + i), this.startPosition = i) : t.live ? i = this.hls.liveSyncPosition || e : this.startPosition = i = 0, this.lastCurrentTime = i
                        }
                        this.nextLoadPosition = i
                    }, c.getLoadPosition = function () {
                        var t = this.media,
                            e = 0;
                        return this.loadedmetadata && t ? e = t.currentTime : this.nextLoadPosition && (e = this.nextLoadPosition), e
                    }, c.handleFragLoadAborted = function (t, e) {
                        this.transmuxer && "initSegment" !== t.sn && t.stats.aborted && (this.warn("Fragment " + t.sn + (e ? " part" + e.index : "") + " of level " + t.level + " was aborted"), this.resetFragmentLoading(t))
                    }, c.resetFragmentLoading = function (t) {
                        this.fragCurrent && (this.fragContextChanged(t) || this.state === Yt) || (this.state = Ht)
                    }, c.onFragmentOrKeyLoadError = function (t, e) {
                        if (!e.fatal) {
                            var i = e.frag;
                            if (i && i.type === t) {
                                this.fragCurrent;
                                var r = this.config;
                                if (this.fragLoadError + 1 <= r.fragLoadingMaxRetry) {
                                    this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition);
                                    var n = Math.min(Math.pow(2, this.fragLoadError) * r.fragLoadingRetryDelay, r.fragLoadingMaxRetryTimeout);
                                    this.warn("Fragment " + i.sn + " of " + t + " " + i.level + " failed to load, retrying in " + n + "ms"), this.retryDate = self.performance.now() + n, this.fragLoadError++, this.state = Yt
                                } else e.levelRetry ? (t === w.b.AUDIO && (this.fragCurrent = null), this.fragLoadError = 0, this.state = Ht) : (l.b.error(e.details + " reaches max retry, redispatch as fatal ..."), e.fatal = !0, this.hls.stopLoad(), this.state = $t)
                            }
                        }
                    }, c.afterBufferFlushed = function (t, e, i) {
                        if (t) {
                            var r = mt.getBuffered(t);
                            this.fragmentTracker.detectEvictedFragments(e, r, i), this.state === Qt && this.resetLoadingState()
                        }
                    }, c.resetLoadingState = function () {
                        this.fragCurrent = null, this.fragPrevious = null, this.state = Ht
                    }, c.resetStartWhenNotLoaded = function (t) {
                        if (!this.loadedmetadata) {
                            this.startFragRequested = !1;
                            var e = this.levels ? this.levels[t].details : null;
                            null != e && e.live ? (this.startPosition = -1, this.setStartPosition(e, 0), this.resetLoadingState()) : this.nextLoadPosition = this.startPosition
                        }
                    }, c.updateLevelTiming = function (t, e, i, r) {
                        var n = this,
                            a = i.details;
                        Object.keys(t.elementaryStreams).reduce((function (e, o) {
                            var l = t.elementaryStreams[o];
                            if (l) {
                                var u = l.endPTS - l.startPTS;
                                if (u <= 0) return n.warn("Could not parse fragment " + t.sn + " " + o + " duration reliably (" + u + ")"), e || !1;
                                var h = r ? 0 : et(a, t, l.startPTS, l.endPTS, l.startDTS, l.endDTS);
                                return n.hls.trigger(s.a.LEVEL_PTS_UPDATED, {
                                    details: a,
                                    level: i,
                                    drift: h,
                                    type: o,
                                    frag: t,
                                    start: l.startPTS,
                                    end: l.endPTS
                                }), !0
                            }
                            return e
                        }), !1) || (this.warn("Found no media in fragment " + t.sn + " of level " + i.id + " resetting transmuxer to fallback to playlist timing"), this.resetTransmuxer()), this.state = Xt, this.hls.trigger(s.a.FRAG_PARSED, {
                            frag: t,
                            part: e
                        })
                    }, c.resetTransmuxer = function () {
                        this.transmuxer && (this.transmuxer.destroy(), this.transmuxer = null)
                    }, n = r, (h = [{
                        key: "state",
                        get: function () {
                            return this._state
                        },
                        set: function (t) {
                            var e = this._state;
                            e !== t && (this._state = t, this.log(e + "->" + t))
                        }
                    }]) && Bt(n.prototype, h), d && Bt(n, d), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), r
                }(vt);
    
            function ee() {
                return self.MediaSource || self.WebKitMediaSource
            }
    
            function ie() {
                return self.SourceBuffer || self.WebKitSourceBuffer
            }
            var re = i(18),
                ne = i(10),
                ae = i(15),
                se = ee() || {
                    isTypeSupported: function () {
                        return !1
                    }
                },
                oe = function () {
                    function t(t, e, i, r) {
                        var n = this;
                        this.hls = void 0, this.id = void 0, this.observer = void 0, this.frag = null, this.part = null, this.worker = void 0, this.onwmsg = void 0, this.transmuxer = null, this.onTransmuxComplete = void 0, this.onFlush = void 0, this.hls = t, this.id = e, this.onTransmuxComplete = i, this.onFlush = r;
                        var a = t.config,
                            u = function (e, i) {
                                (i = i || {}).frag = n.frag, i.id = n.id, t.trigger(e, i)
                            };
                        this.observer = new ae.EventEmitter, this.observer.on(s.a.FRAG_DECRYPTED, u), this.observer.on(s.a.ERROR, u);
                        var h = {
                                mp4: se.isTypeSupported("video/mp4"),
                                mpeg: se.isTypeSupported("audio/mpeg"),
                                mp3: se.isTypeSupported('audio/mp4; codecs="mp3"')
                            },
                            d = navigator.vendor;
                        if (a.enableWorker && "undefined" != typeof Worker) {
                            var c;
                            l.b.log("demuxing in webworker");
                            try {
                                c = this.worker = re(19), this.onwmsg = this.onWorkerMessage.bind(this), c.addEventListener("message", this.onwmsg), c.onerror = function (e) {
                                    t.trigger(s.a.ERROR, {
                                        type: o.b.OTHER_ERROR,
                                        details: o.a.INTERNAL_EXCEPTION,
                                        fatal: !0,
                                        event: "demuxerWorker",
                                        error: new Error(e.message + "  (" + e.filename + ":" + e.lineno + ")")
                                    })
                                }, c.postMessage({
                                    cmd: "init",
                                    typeSupported: h,
                                    vendor: d,
                                    id: e,
                                    config: JSON.stringify(a)
                                })
                            } catch (t) {
                                l.b.warn("Error in worker:", t), l.b.error("Error while initializing DemuxerWorker, fallback to inline"), c && self.URL.revokeObjectURL(c.objectURL), this.transmuxer = new ne.c(this.observer, h, a, d, e), this.worker = null
                            }
                        } else this.transmuxer = new ne.c(this.observer, h, a, d, e)
                    }
                    var e = t.prototype;
                    return e.destroy = function () {
                        var t = this.worker;
                        if (t) t.removeEventListener("message", this.onwmsg), t.terminate(), this.worker = null, this.onwmsg = void 0;
                        else {
                            var e = this.transmuxer;
                            e && (e.destroy(), this.transmuxer = null)
                        }
                        var i = this.observer;
                        i && i.removeAllListeners(), this.frag = null, this.observer = null, this.hls = null
                    }, e.push = function (t, e, i, r, n, a, s, o, u, h) {
                        var d, c, f = this;
                        u.transmuxing.start = self.performance.now();
                        var g = this.transmuxer,
                            v = this.worker,
                            p = a ? a.start : n.start,
                            m = n.decryptdata,
                            y = this.frag,
                            T = !(y && n.cc === y.cc),
                            b = !(y && u.level === y.level),
                            E = y ? u.sn - y.sn : -1,
                            S = this.part ? u.part - this.part.index : -1,
                            L = 0 === E && u.id > 1 && u.id === (null == y ? void 0 : y.stats.chunkCount),
                            A = !b && (1 === E || 0 === E && (1 === S || L && S <= 0)),
                            D = self.performance.now();
                        (b || E || 0 === n.stats.parsing.start) && (n.stats.parsing.start = D), !a || !S && A || (a.stats.parsing.start = D);
                        var R = !(y && (null === (d = n.initSegment) || void 0 === d ? void 0 : d.url) === (null === (c = y.initSegment) || void 0 === c ? void 0 : c.url)),
                            k = new ne.b(T, A, o, b, p, R);
                        if (!A || T || R) {
                            l.b.log("[transmuxer-interface, " + n.type + "]: Starting new transmux session for sn: " + u.sn + " p: " + u.part + " level: " + u.level + " id: " + u.id + "\n        discontinuity: " + T + "\n        trackSwitch: " + b + "\n        contiguous: " + A + "\n        accurateTimeOffset: " + o + "\n        timeOffset: " + p + "\n        initSegmentChange: " + R);
                            var _ = new ne.a(i, r, e, s, h);
                            this.configureTransmuxer(_)
                        }
                        if (this.frag = n, this.part = a, v) v.postMessage({
                            cmd: "demux",
                            data: t,
                            decryptdata: m,
                            chunkMeta: u,
                            state: k
                        }, t instanceof ArrayBuffer ? [t] : []);
                        else if (g) {
                            var I = g.push(t, m, u, k);
                            Object(ne.d)(I) ? I.then((function (t) {
                                f.handleTransmuxComplete(t)
                            })) : this.handleTransmuxComplete(I)
                        }
                    }, e.flush = function (t) {
                        var e = this;
                        t.transmuxing.start = self.performance.now();
                        var i = this.transmuxer,
                            r = this.worker;
                        if (r) r.postMessage({
                            cmd: "flush",
                            chunkMeta: t
                        });
                        else if (i) {
                            var n = i.flush(t);
                            Object(ne.d)(n) ? n.then((function (i) {
                                e.handleFlushResult(i, t)
                            })) : this.handleFlushResult(n, t)
                        }
                    }, e.handleFlushResult = function (t, e) {
                        var i = this;
                        t.forEach((function (t) {
                            i.handleTransmuxComplete(t)
                        })), this.onFlush(e)
                    }, e.onWorkerMessage = function (t) {
                        var e = t.data,
                            i = this.hls;
                        switch (e.event) {
                            case "init":
                                self.URL.revokeObjectURL(this.worker.objectURL);
                                break;
                            case "transmuxComplete":
                                this.handleTransmuxComplete(e.data);
                                break;
                            case "flush":
                                this.onFlush(e.data);
                                break;
                            case "workerLog":
                                l.b[e.data.logType] && l.b[e.data.logType](e.data.message);
                                break;
                            default:
                                e.data = e.data || {}, e.data.frag = this.frag, e.data.id = this.id, i.trigger(e.event, e.data)
                        }
                    }, e.configureTransmuxer = function (t) {
                        var e = this.worker,
                            i = this.transmuxer;
                        e ? e.postMessage({
                            cmd: "configure",
                            config: t
                        }) : i && i.configure(t)
                    }, e.handleTransmuxComplete = function (t) {
                        t.chunkMeta.transmuxing.end = self.performance.now(), this.onTransmuxComplete(t)
                    }, t
                }(),
                le = function () {
                    function t(t, e, i, r) {
                        this.config = void 0, this.media = null, this.fragmentTracker = void 0, this.hls = void 0, this.nudgeRetry = 0, this.stallReported = !1, this.stalled = null, this.moved = !1, this.seeking = !1, this.config = t, this.media = e, this.fragmentTracker = i, this.hls = r
                    }
                    var e = t.prototype;
                    return e.destroy = function () {
                        this.media = null, this.hls = this.fragmentTracker = null
                    }, e.poll = function (t, e) {
                        var i = this.config,
                            r = this.media,
                            n = this.stalled;
                        if (null !== r) {
                            var a = r.currentTime,
                                s = r.seeking,
                                o = this.seeking && !s,
                                u = !this.seeking && s;
                            if (this.seeking = s, a === t) {
                                if ((u || o) && (this.stalled = null), !(r.paused && !s || r.ended || 0 === r.playbackRate) && mt.getBuffered(r).length) {
                                    var h = mt.bufferInfo(r, a, 0),
                                        d = h.len > 0,
                                        c = h.nextStart || 0;
                                    if (d || c) {
                                        if (s) {
                                            var f = h.len > 2,
                                                g = !c || e && e.start <= a || c - a > 2 && !this.fragmentTracker.getPartialFragment(a);
                                            if (f || g) return;
                                            this.moved = !1
                                        }
                                        if (!this.moved && null !== this.stalled) {
                                            var v, p = Math.max(c, h.start || 0) - a,
                                                m = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null,
                                                y = (null == m || null === (v = m.details) || void 0 === v ? void 0 : v.live) ? 2 * m.details.targetduration : 2;
                                            if (p > 0 && p <= y) return void this._trySkipBufferHole(null)
                                        }
                                        var T = self.performance.now();
                                        if (null !== n) {
                                            var b = T - n;
                                            if (s || !(b >= 250) || (this._reportStall(h), this.media)) {
                                                var E = mt.bufferInfo(r, a, i.maxBufferHole);
                                                this._tryFixBufferStall(E, b)
                                            }
                                        } else this.stalled = T
                                    }
                                }
                            } else if (this.moved = !0, null !== n) {
                                if (this.stallReported) {
                                    var S = self.performance.now() - n;
                                    l.b.warn("playback not stuck anymore @" + a + ", after " + Math.round(S) + "ms"), this.stallReported = !1
                                }
                                this.stalled = null, this.nudgeRetry = 0
                            }
                        }
                    }, e._tryFixBufferStall = function (t, e) {
                        var i = this.config,
                            r = this.fragmentTracker,
                            n = this.media;
                        if (null !== n) {
                            var a = n.currentTime,
                                s = r.getPartialFragment(a);
                            if (s)
                                if (this._trySkipBufferHole(s) || !this.media) return;
                            t.len > i.maxBufferHole && e > 1e3 * i.highBufferWatchdogPeriod && (l.b.warn("Trying to nudge playhead over buffer-hole"), this.stalled = null, this._tryNudgeBuffer())
                        }
                    }, e._reportStall = function (t) {
                        var e = this.hls,
                            i = this.media;
                        !this.stallReported && i && (this.stallReported = !0, l.b.warn("Playback stalling at @" + i.currentTime + " due to low buffer (" + JSON.stringify(t) + ")"), e.trigger(s.a.ERROR, {
                            type: o.b.MEDIA_ERROR,
                            details: o.a.BUFFER_STALLED_ERROR,
                            fatal: !1,
                            buffer: t.len
                        }))
                    }, e._trySkipBufferHole = function (t) {
                        var e = this.config,
                            i = this.hls,
                            r = this.media;
                        if (null === r) return 0;
                        for (var n = r.currentTime, a = 0, u = mt.getBuffered(r), h = 0; h < u.length; h++) {
                            var d = u.start(h);
                            if (n + e.maxBufferHole >= a && n < d) {
                                var c = Math.max(d + .05, r.currentTime + .1);
                                return l.b.warn("skipping hole, adjusting currentTime from " + n + " to " + c), this.moved = !0, this.stalled = null, r.currentTime = c, t && i.trigger(s.a.ERROR, {
                                    type: o.b.MEDIA_ERROR,
                                    details: o.a.BUFFER_SEEK_OVER_HOLE,
                                    fatal: !1,
                                    reason: "fragment loaded with buffer holes, seeking from " + n + " to " + c,
                                    frag: t
                                }), c
                            }
                            a = u.end(h)
                        }
                        return 0
                    }, e._tryNudgeBuffer = function () {
                        var t = this.config,
                            e = this.hls,
                            i = this.media,
                            r = this.nudgeRetry;
                        if (null !== i) {
                            var n = i.currentTime;
                            if (this.nudgeRetry++, r < t.nudgeMaxRetry) {
                                var a = n + (r + 1) * t.nudgeOffset;
                                l.b.warn("Nudging 'currentTime' from " + n + " to " + a), i.currentTime = a, e.trigger(s.a.ERROR, {
                                    type: o.b.MEDIA_ERROR,
                                    details: o.a.BUFFER_NUDGE_ON_STALL,
                                    fatal: !1
                                })
                            } else l.b.error("Playhead still not moving while enough data buffered @" + n + " after " + t.nudgeMaxRetry + " nudges"), e.trigger(s.a.ERROR, {
                                type: o.b.MEDIA_ERROR,
                                details: o.a.BUFFER_STALLED_ERROR,
                                fatal: !0
                            })
                        }
                    }, t
                }();
    
            function ue(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
    
            function he(t, e) {
                return (he = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var de = function (t) {
                    var e, i;
    
                    function r(e, i) {
                        var r;
                        return (r = t.call(this, e, i, "[stream-controller]") || this).audioCodecSwap = !1, r.gapController = null, r.level = -1, r._forceStartLoad = !1, r.altAudio = !1, r.audioOnly = !1, r.fragPlaying = null, r.onvplaying = null, r.onvseeked = null, r.fragLastKbps = 0, r.couldBacktrack = !1, r.backtrackFragment = null, r.audioCodecSwitch = !1, r.videoBuffer = null, r._registerListeners(), r
                    }
                    i = t, (e = r).prototype = Object.create(i.prototype), e.prototype.constructor = e, he(e, i);
                    var n, l, u, h = r.prototype;
                    return h._registerListeners = function () {
                        var t = this.hls;
                        t.on(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.a.MANIFEST_PARSED, this.onManifestParsed, this), t.on(s.a.LEVEL_LOADING, this.onLevelLoading, this), t.on(s.a.LEVEL_LOADED, this.onLevelLoaded, this), t.on(s.a.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.on(s.a.ERROR, this.onError, this), t.on(s.a.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.on(s.a.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.on(s.a.BUFFER_CREATED, this.onBufferCreated, this), t.on(s.a.BUFFER_FLUSHED, this.onBufferFlushed, this), t.on(s.a.LEVELS_UPDATED, this.onLevelsUpdated, this), t.on(s.a.FRAG_BUFFERED, this.onFragBuffered, this)
                    }, h._unregisterListeners = function () {
                        var t = this.hls;
                        t.off(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.a.MANIFEST_PARSED, this.onManifestParsed, this), t.off(s.a.LEVEL_LOADED, this.onLevelLoaded, this), t.off(s.a.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.off(s.a.ERROR, this.onError, this), t.off(s.a.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.off(s.a.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.off(s.a.BUFFER_CREATED, this.onBufferCreated, this), t.off(s.a.BUFFER_FLUSHED, this.onBufferFlushed, this), t.off(s.a.LEVELS_UPDATED, this.onLevelsUpdated, this), t.off(s.a.FRAG_BUFFERED, this.onFragBuffered, this)
                    }, h.onHandlerDestroying = function () {
                        this._unregisterListeners(), this.onMediaDetaching()
                    }, h.startLoad = function (t) {
                        if (this.levels) {
                            var e = this.lastCurrentTime,
                                i = this.hls;
                            if (this.stopLoad(), this.setInterval(100), this.level = -1, this.fragLoadError = 0, !this.startFragRequested) {
                                var r = i.startLevel; - 1 === r && (i.config.testBandwidth && this.levels.length > 1 ? (r = 0, this.bitrateTest = !0) : r = i.nextAutoLevel), this.level = i.nextLoadLevel = r, this.loadedmetadata = !1
                            }
                            e > 0 && -1 === t && (this.log("Override startPosition with lastCurrentTime @" + e.toFixed(3)), t = e), this.state = Ht, this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick()
                        } else this._forceStartLoad = !0, this.state = Kt
                    }, h.stopLoad = function () {
                        this._forceStartLoad = !1, t.prototype.stopLoad.call(this)
                    }, h.doTick = function () {
                        switch (this.state) {
                            case Ht:
                                this.doTickIdle();
                                break;
                            case Zt:
                                var t, e = this.levels,
                                    i = this.level,
                                    r = null == e || null === (t = e[i]) || void 0 === t ? void 0 : t.details;
                                if (r && (!r.live || this.levelLastLoaded === this.level)) {
                                    if (this.waitForCdnTuneIn(r)) break;
                                    this.state = Ht;
                                    break
                                }
                                break;
                            case Yt:
                                var n, a = self.performance.now(),
                                    s = this.retryDate;
                                (!s || a >= s || null !== (n = this.media) && void 0 !== n && n.seeking) && (this.log("retryDate reached, switch back to IDLE state"), this.resetStartWhenNotLoaded(this.level), this.state = Ht)
                        }
                        this.onTickEnd()
                    }, h.onTickEnd = function () {
                        t.prototype.onTickEnd.call(this), this.checkBuffer(), this.checkFragmentChanged()
                    }, h.doTickIdle = function () {
                        var t, e, i = this.hls,
                            r = this.levelLastLoaded,
                            n = this.levels,
                            a = this.media,
                            o = i.config,
                            l = i.nextLoadLevel;
                        if (null !== r && (a || !this.startFragRequested && o.startFragPrefetch) && (!this.altAudio || !this.audioOnly) && n && n[l]) {
                            var u = n[l];
                            this.level = i.nextLoadLevel = l;
                            var h = u.details;
                            if (!h || this.state === Zt || h.live && this.levelLastLoaded !== l) this.state = Zt;
                            else {
                                var d = this.getMainFwdBufferInfo();
                                if (null !== d)
                                    if (!(d.len >= this.getMaxBufferLength(u.maxBitrate))) {
                                        if (this._streamEnded(d, h)) {
                                            var c = {};
                                            return this.altAudio && (c.type = "video"), this.hls.trigger(s.a.BUFFER_EOS, c), void(this.state = Qt)
                                        }
                                        this.backtrackFragment && this.backtrackFragment.start > d.end && (this.backtrackFragment = null);
                                        var f = this.backtrackFragment ? this.backtrackFragment.start : d.end,
                                            g = this.getNextFragment(f, h);
                                        if (this.couldBacktrack && !this.fragPrevious && g && "initSegment" !== g.sn && this.fragmentTracker.getState(g) !== ut.OK) {
                                            var v, m = (null != (v = this.backtrackFragment) ? v : g).sn - h.startSN,
                                                y = h.fragments[m - 1];
                                            y && g.cc === y.cc && (g = y, this.fragmentTracker.removeFragment(y))
                                        } else this.backtrackFragment && d.len && (this.backtrackFragment = null);
                                        if (g && this.fragmentTracker.getState(g) === ut.OK && this.nextLoadPosition > f) {
                                            var T = this.audioOnly && !this.altAudio ? p.a.AUDIO : p.a.VIDEO;
                                            a && this.afterBufferFlushed(a, T, w.b.MAIN), g = this.getNextFragment(this.nextLoadPosition, h)
                                        }
                                        g && (!g.initSegment || g.initSegment.data || this.bitrateTest || (g = g.initSegment), "identity" !== (null === (t = g.decryptdata) || void 0 === t ? void 0 : t.keyFormat) || null !== (e = g.decryptdata) && void 0 !== e && e.key ? this.loadFragment(g, h, f) : this.loadKey(g, h))
                                    }
                            }
                        }
                    }, h.loadFragment = function (e, i, r) {
                        var n, a = this.fragmentTracker.getState(e);
                        this.fragCurrent = e, a === ut.NOT_LOADED ? "initSegment" === e.sn ? this._loadInitSegment(e) : this.bitrateTest ? (this.log("Fragment " + e.sn + " of level " + e.level + " is being downloaded to test bitrate and will not be buffered"), this._loadBitrateTestFrag(e)) : (this.startFragRequested = !0, t.prototype.loadFragment.call(this, e, i, r)) : a === ut.APPENDING ? this.reduceMaxBufferLength(e.duration) && this.fragmentTracker.removeFragment(e) : 0 === (null === (n = this.media) || void 0 === n ? void 0 : n.buffered.length) && this.fragmentTracker.removeAllFragments()
                    }, h.getAppendedFrag = function (t) {
                        var e = this.fragmentTracker.getAppendedFrag(t, w.b.MAIN);
                        return e && "fragment" in e ? e.fragment : e
                    }, h.getBufferedFrag = function (t) {
                        return this.fragmentTracker.getBufferedFrag(t, w.b.MAIN)
                    }, h.followingBufferedFrag = function (t) {
                        return t ? this.getBufferedFrag(t.end + .5) : null
                    }, h.immediateLevelSwitch = function () {
                        this.abortCurrentFrag(), this.flushMainBuffer(0, Number.POSITIVE_INFINITY)
                    }, h.nextLevelSwitch = function () {
                        var t = this.levels,
                            e = this.media;
                        if (null != e && e.readyState) {
                            var i, r = this.getAppendedFrag(e.currentTime);
                            if (r && r.start > 1 && this.flushMainBuffer(0, r.start - 1), !e.paused && t) {
                                var n = t[this.hls.nextLoadLevel],
                                    a = this.fragLastKbps;
                                i = a && this.fragCurrent ? this.fragCurrent.duration * n.maxBitrate / (1e3 * a) + 1 : 0
                            } else i = 0;
                            var s = this.getBufferedFrag(e.currentTime + i);
                            if (s) {
                                var o = this.followingBufferedFrag(s);
                                if (o) {
                                    this.abortCurrentFrag();
                                    var l = o.maxStartPTS ? o.maxStartPTS : o.start,
                                        u = o.duration,
                                        h = Math.max(s.end, l + Math.min(Math.max(u - this.config.maxFragLookUpTolerance, .5 * u), .75 * u));
                                    this.flushMainBuffer(h, Number.POSITIVE_INFINITY)
                                }
                            }
                        }
                    }, h.abortCurrentFrag = function () {
                        var t = this.fragCurrent;
                        switch (this.fragCurrent = null, this.backtrackFragment = null, null != t && t.loader && t.loader.abort(), this.state) {
                            case Vt:
                            case Wt:
                            case Yt:
                            case zt:
                            case Xt:
                                this.state = Ht
                        }
                        this.nextLoadPosition = this.getLoadPosition()
                    }, h.flushMainBuffer = function (e, i) {
                        t.prototype.flushMainBuffer.call(this, e, i, this.altAudio ? "video" : null)
                    }, h.onMediaAttached = function (e, i) {
                        t.prototype.onMediaAttached.call(this, e, i);
                        var r = i.media;
                        this.onvplaying = this.onMediaPlaying.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), r.addEventListener("playing", this.onvplaying), r.addEventListener("seeked", this.onvseeked), this.gapController = new le(this.config, r, this.fragmentTracker, this.hls)
                    }, h.onMediaDetaching = function () {
                        var e = this.media;
                        e && this.onvplaying && this.onvseeked && (e.removeEventListener("playing", this.onvplaying), e.removeEventListener("seeked", this.onvseeked), this.onvplaying = this.onvseeked = null, this.videoBuffer = null), this.fragPlaying = null, this.gapController && (this.gapController.destroy(), this.gapController = null), t.prototype.onMediaDetaching.call(this)
                    }, h.onMediaPlaying = function () {
                        this.tick()
                    }, h.onMediaSeeked = function () {
                        var t = this.media,
                            e = t ? t.currentTime : null;
                        Object(a.a)(e) && this.log("Media seeked to " + e.toFixed(3)), this.tick()
                    }, h.onManifestLoading = function () {
                        this.log("Trigger BUFFER_RESET"), this.hls.trigger(s.a.BUFFER_RESET, void 0), this.fragmentTracker.removeAllFragments(), this.couldBacktrack = !1, this.startPosition = this.lastCurrentTime = 0, this.fragPlaying = null, this.backtrackFragment = null
                    }, h.onManifestParsed = function (t, e) {
                        var i, r, n, a = !1,
                            s = !1;
                        e.levels.forEach((function (t) {
                            (i = t.audioCodec) && (-1 !== i.indexOf("mp4a.40.2") && (a = !0), -1 !== i.indexOf("mp4a.40.5") && (s = !0))
                        })), this.audioCodecSwitch = a && s && !("function" == typeof (null == (n = ie()) || null === (r = n.prototype) || void 0 === r ? void 0 : r.changeType)), this.audioCodecSwitch && this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = e.levels, this.startFragRequested = !1
                    }, h.onLevelLoading = function (t, e) {
                        var i = this.levels;
                        if (i && this.state === Ht) {
                            var r = i[e.level];
                            (!r.details || r.details.live && this.levelLastLoaded !== e.level || this.waitForCdnTuneIn(r.details)) && (this.state = Zt)
                        }
                    }, h.onLevelLoaded = function (t, e) {
                        var i, r = this.levels,
                            n = e.level,
                            a = e.details,
                            o = a.totalduration;
                        if (r) {
                            this.log("Level " + n + " loaded [" + a.startSN + "," + a.endSN + "], cc [" + a.startCC + ", " + a.endCC + "] duration:" + o);
                            var l = this.fragCurrent;
                            !l || this.state !== Wt && this.state !== Yt || l.level !== e.level && l.loader && (this.state = Ht, this.backtrackFragment = null, l.loader.abort());
                            var u = r[n],
                                h = 0;
                            if (a.live || null !== (i = u.details) && void 0 !== i && i.live) {
                                if (a.fragments[0] || (a.deltaUpdateFailed = !0), a.deltaUpdateFailed) return;
                                h = this.alignPlaylists(a, u.details)
                            }
                            if (u.details = a, this.levelLastLoaded = n, this.hls.trigger(s.a.LEVEL_UPDATED, {
                                    details: a,
                                    level: n
                                }), this.state === Zt) {
                                if (this.waitForCdnTuneIn(a)) return;
                                this.state = Ht
                            }
                            this.startFragRequested ? a.live && this.synchronizeToLiveEdge(a) : this.setStartPosition(a, h), this.tick()
                        } else this.warn("Levels were reset while loading level " + n)
                    }, h._handleFragmentLoadProgress = function (t) {
                        var e, i = t.frag,
                            r = t.part,
                            n = t.payload,
                            a = this.levels;
                        if (a) {
                            var s = a[i.level],
                                o = s.details;
                            if (o) {
                                var l = s.videoCodec,
                                    u = o.PTSKnown || !o.live,
                                    h = null === (e = i.initSegment) || void 0 === e ? void 0 : e.data,
                                    d = this._getAudioCodec(s),
                                    c = this.transmuxer = this.transmuxer || new oe(this.hls, w.b.MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)),
                                    f = r ? r.index : -1,
                                    g = -1 !== f,
                                    v = new yt(i.level, i.sn, i.stats.chunkCount, n.byteLength, f, g),
                                    p = this.initPTS[i.cc];
                                c.push(n, h, d, l, i, r, o.totalduration, u, v, p)
                            } else this.warn("Dropping fragment " + i.sn + " of level " + i.level + " after level details were reset")
                        } else this.warn("Levels were reset while fragment load was in progress. Fragment " + i.sn + " of level " + i.level + " will not be buffered")
                    }, h.onAudioTrackSwitching = function (t, e) {
                        var i = this.altAudio,
                            r = !!e.url,
                            n = e.id;
                        if (!r) {
                            if (this.mediaBuffer !== this.media) {
                                this.log("Switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
                                var a = this.fragCurrent;
                                null != a && a.loader && (this.log("Switching to main audio track, cancel main fragment load"), a.loader.abort()), this.resetTransmuxer(), this.resetLoadingState()
                            } else this.audioOnly && this.resetTransmuxer();
                            var o = this.hls;
                            i && o.trigger(s.a.BUFFER_FLUSHING, {
                                startOffset: 0,
                                endOffset: Number.POSITIVE_INFINITY,
                                type: "audio"
                            }), o.trigger(s.a.AUDIO_TRACK_SWITCHED, {
                                id: n
                            })
                        }
                    }, h.onAudioTrackSwitched = function (t, e) {
                        var i = e.id,
                            r = !!this.hls.audioTracks[i].url;
                        if (r) {
                            var n = this.videoBuffer;
                            n && this.mediaBuffer !== n && (this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = n)
                        }
                        this.altAudio = r, this.tick()
                    }, h.onBufferCreated = function (t, e) {
                        var i, r, n = e.tracks,
                            a = !1;
                        for (var s in n) {
                            var o = n[s];
                            if ("main" === o.id) {
                                if (r = s, i = o, "video" === s) {
                                    var l = n[s];
                                    l && (this.videoBuffer = l.buffer)
                                }
                            } else a = !0
                        }
                        a && i ? (this.log("Alternate track found, use " + r + ".buffered to schedule main fragment loading"), this.mediaBuffer = i.buffer) : this.mediaBuffer = this.media
                    }, h.onFragBuffered = function (t, e) {
                        var i = e.frag,
                            r = e.part;
                        if (!i || i.type === w.b.MAIN) {
                            if (this.fragContextChanged(i)) return this.warn("Fragment " + i.sn + (r ? " p: " + r.index : "") + " of level " + i.level + " finished buffering, but was aborted. state: " + this.state), void(this.state === Xt && (this.state = Ht));
                            var n = r ? r.stats : i.stats;
                            this.fragLastKbps = Math.round(8 * n.total / (n.buffering.end - n.loading.first)), "initSegment" !== i.sn && (this.fragPrevious = i), this.fragBufferedComplete(i, r)
                        }
                    }, h.onError = function (t, e) {
                        switch (e.details) {
                            case o.a.FRAG_LOAD_ERROR:
                            case o.a.FRAG_LOAD_TIMEOUT:
                            case o.a.KEY_LOAD_ERROR:
                            case o.a.KEY_LOAD_TIMEOUT:
                                this.onFragmentOrKeyLoadError(w.b.MAIN, e);
                                break;
                            case o.a.LEVEL_LOAD_ERROR:
                            case o.a.LEVEL_LOAD_TIMEOUT:
                                this.state !== $t && (e.fatal ? (this.warn("" + e.details), this.state = $t) : e.levelRetry || this.state !== Zt || (this.state = Ht));
                                break;
                            case o.a.BUFFER_FULL_ERROR:
                                if ("main" === e.parent && (this.state === zt || this.state === Xt)) {
                                    var i = !0,
                                        r = this.getFwdBufferInfo(this.media, w.b.MAIN);
                                    r && r.len > .5 && (i = !this.reduceMaxBufferLength(r.len)), i && (this.warn("buffer full error also media.currentTime is not buffered, flush main"), this.immediateLevelSwitch()), this.resetLoadingState()
                                }
                        }
                    }, h.checkBuffer = function () {
                        var t = this.media,
                            e = this.gapController;
                        if (t && e && t.readyState) {
                            if (this.loadedmetadata || !mt.getBuffered(t).length) {
                                var i = this.state !== Ht ? this.fragCurrent : null;
                                e.poll(this.lastCurrentTime, i)
                            }
                            this.lastCurrentTime = t.currentTime
                        }
                    }, h.onFragLoadEmergencyAborted = function () {
                        this.state = Ht, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.tickImmediate()
                    }, h.onBufferFlushed = function (t, e) {
                        var i = e.type;
                        if (i !== p.a.AUDIO || this.audioOnly && !this.altAudio) {
                            var r = (i === p.a.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
                            this.afterBufferFlushed(r, i, w.b.MAIN)
                        }
                    }, h.onLevelsUpdated = function (t, e) {
                        this.levels = e.levels
                    }, h.swapAudioCodec = function () {
                        this.audioCodecSwap = !this.audioCodecSwap
                    }, h.seekToStartPos = function () {
                        var t = this.media;
                        if (t) {
                            var e = t.currentTime,
                                i = this.startPosition;
                            if (i >= 0 && e < i) {
                                if (t.seeking) return void this.log("could not seek to " + i + ", already seeking at " + e);
                                var r = mt.getBuffered(t),
                                    n = (r.length ? r.start(0) : 0) - i;
                                n > 0 && (n < this.config.maxBufferHole || n < this.config.maxFragLookUpTolerance) && (this.log("adjusting start position by " + n + " to match buffer start"), i += n, this.startPosition = i), this.log("seek to target start position " + i + " from current time " + e), t.currentTime = i
                            }
                        }
                    }, h._getAudioCodec = function (t) {
                        var e = this.config.defaultAudioCodec || t.audioCodec;
                        return this.audioCodecSwap && e && (this.log("Swapping audio codec"), e = -1 !== e.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5"), e
                    }, h._loadBitrateTestFrag = function (t) {
                        var e = this;
                        t.bitrateTest = !0, this._doFragLoad(t).then((function (i) {
                            var r = e.hls;
                            if (i && !r.nextLoadLevel && !e.fragContextChanged(t)) {
                                e.fragLoadError = 0, e.state = Ht, e.startFragRequested = !1, e.bitrateTest = !1;
                                var n = t.stats;
                                n.parsing.start = n.parsing.end = n.buffering.start = n.buffering.end = self.performance.now(), r.trigger(s.a.FRAG_LOADED, i), t.bitrateTest = !1
                            }
                        }))
                    }, h._handleTransmuxComplete = function (t) {
                        var e, i = "main",
                            r = this.hls,
                            n = t.remuxResult,
                            o = t.chunkMeta,
                            l = this.getCurrentContext(o);
                        if (!l) return this.warn("The loading context changed while buffering fragment " + o.sn + " of level " + o.level + ". This chunk will not be buffered."), void this.resetStartWhenNotLoaded(o.level);
                        var u = l.frag,
                            h = l.part,
                            d = l.level,
                            c = n.video,
                            f = n.text,
                            g = n.id3,
                            v = n.initSegment,
                            m = d.details,
                            y = this.altAudio ? void 0 : n.audio;
                        if (!this.fragContextChanged(u)) {
                            if (this.state = zt, v) {
                                v.tracks && (this._bufferInitSegment(d, v.tracks, u, o), r.trigger(s.a.FRAG_PARSING_INIT_SEGMENT, {
                                    frag: u,
                                    id: i,
                                    tracks: v.tracks
                                }));
                                var T = v.initPTS,
                                    b = v.timescale;
                                Object(a.a)(T) && (this.initPTS[u.cc] = T, r.trigger(s.a.INIT_PTS_FOUND, {
                                    frag: u,
                                    id: i,
                                    initPTS: T,
                                    timescale: b
                                }))
                            }
                            if (c && !1 !== n.independent) {
                                if (m) {
                                    var E = c.startPTS,
                                        S = c.endPTS,
                                        L = c.startDTS,
                                        A = c.endDTS;
                                    if (h) h.elementaryStreams[c.type] = {
                                        startPTS: E,
                                        endPTS: S,
                                        startDTS: L,
                                        endDTS: A
                                    };
                                    else if (c.firstKeyFrame && c.independent && (this.couldBacktrack = !0), c.dropped && c.independent) {
                                        var D = this.getMainFwdBufferInfo();
                                        if ((D ? D.end : this.getLoadPosition()) + this.config.maxBufferHole < (c.firstKeyFramePTS ? c.firstKeyFramePTS : E) - this.config.maxBufferHole) return void this.backtrack(u);
                                        u.setElementaryStreamInfo(c.type, u.start, S, u.start, A, !0)
                                    }
                                    u.setElementaryStreamInfo(c.type, E, S, L, A), this.backtrackFragment && (this.backtrackFragment = u), this.bufferFragmentData(c, u, h, o)
                                }
                            } else if (!1 === n.independent) return void this.backtrack(u);
                            if (y) {
                                var R = y.startPTS,
                                    k = y.endPTS,
                                    _ = y.startDTS,
                                    I = y.endDTS;
                                h && (h.elementaryStreams[p.a.AUDIO] = {
                                    startPTS: R,
                                    endPTS: k,
                                    startDTS: _,
                                    endDTS: I
                                }), u.setElementaryStreamInfo(p.a.AUDIO, R, k, _, I), this.bufferFragmentData(y, u, h, o)
                            }
                            if (m && null != g && null !== (e = g.samples) && void 0 !== e && e.length) {
                                var O = {
                                    id: i,
                                    frag: u,
                                    details: m,
                                    samples: g.samples
                                };
                                r.trigger(s.a.FRAG_PARSING_METADATA, O)
                            }
                            if (m && f) {
                                var C = {
                                    id: i,
                                    frag: u,
                                    details: m,
                                    samples: f.samples
                                };
                                r.trigger(s.a.FRAG_PARSING_USERDATA, C)
                            }
                        }
                    }, h._bufferInitSegment = function (t, e, i, r) {
                        var n = this;
                        if (this.state === zt) {
                            this.audioOnly = !!e.audio && !e.video, this.altAudio && !this.audioOnly && delete e.audio;
                            var a = e.audio,
                                o = e.video,
                                l = e.audiovideo;
                            if (a) {
                                var u = t.audioCodec,
                                    h = navigator.userAgent.toLowerCase();
                                this.audioCodecSwitch && (u && (u = -1 !== u.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5"), 1 !== a.metadata.channelCount && -1 === h.indexOf("firefox") && (u = "mp4a.40.5")), -1 !== h.indexOf("android") && "audio/mpeg" !== a.container && (u = "mp4a.40.2", this.log("Android: force audio codec to " + u)), t.audioCodec && t.audioCodec !== u && this.log('Swapping manifest audio codec "' + t.audioCodec + '" for "' + u + '"'), a.levelCodec = u, a.id = "main", this.log("Init audio buffer, container:" + a.container + ", codecs[selected/level/parsed]=[" + (u || "") + "/" + (t.audioCodec || "") + "/" + a.codec + "]")
                            }
                            o && (o.levelCodec = t.videoCodec, o.id = "main", this.log("Init video buffer, container:" + o.container + ", codecs[level/parsed]=[" + (t.videoCodec || "") + "/" + o.codec + "]")), l && this.log("Init audiovideo buffer, container:" + l.container + ", codecs[level/parsed]=[" + (t.attrs.CODECS || "") + "/" + l.codec + "]"), this.hls.trigger(s.a.BUFFER_CODECS, e), Object.keys(e).forEach((function (t) {
                                var a = e[t].initSegment;
                                null != a && a.byteLength && n.hls.trigger(s.a.BUFFER_APPENDING, {
                                    type: t,
                                    data: a,
                                    frag: i,
                                    part: null,
                                    chunkMeta: r,
                                    parent: i.type
                                })
                            })), this.tick()
                        }
                    }, h.getMainFwdBufferInfo = function () {
                        return this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : this.media, w.b.MAIN)
                    }, h.backtrack = function (t) {
                        this.couldBacktrack = !0, this.backtrackFragment = t, this.resetTransmuxer(), this.flushBufferGap(t), this.fragmentTracker.removeFragment(t), this.fragPrevious = null, this.nextLoadPosition = t.start, this.state = Ht
                    }, h.checkFragmentChanged = function () {
                        var t = this.media,
                            e = null;
                        if (t && t.readyState > 1 && !1 === t.seeking) {
                            var i = t.currentTime;
                            if (mt.isBuffered(t, i) ? e = this.getAppendedFrag(i) : mt.isBuffered(t, i + .1) && (e = this.getAppendedFrag(i + .1)), e) {
                                this.backtrackFragment = null;
                                var r = this.fragPlaying,
                                    n = e.level;
                                r && e.sn === r.sn && r.level === n && e.urlId === r.urlId || (this.hls.trigger(s.a.FRAG_CHANGED, {
                                    frag: e
                                }), r && r.level === n || this.hls.trigger(s.a.LEVEL_SWITCHED, {
                                    level: n
                                }), this.fragPlaying = e)
                            }
                        }
                    }, n = r, (l = [{
                        key: "nextLevel",
                        get: function () {
                            var t = this.nextBufferedFrag;
                            return t ? t.level : -1
                        }
                    }, {
                        key: "currentFrag",
                        get: function () {
                            var t = this.media;
                            return t ? this.fragPlaying || this.getAppendedFrag(t.currentTime) : null
                        }
                    }, {
                        key: "currentProgramDateTime",
                        get: function () {
                            var t = this.media;
                            if (t) {
                                var e = t.currentTime,
                                    i = this.currentFrag;
                                if (i && Object(a.a)(e) && Object(a.a)(i.programDateTime)) {
                                    var r = i.programDateTime + 1e3 * (e - i.start);
                                    return new Date(r)
                                }
                            }
                            return null
                        }
                    }, {
                        key: "currentLevel",
                        get: function () {
                            var t = this.currentFrag;
                            return t ? t.level : -1
                        }
                    }, {
                        key: "nextBufferedFrag",
                        get: function () {
                            var t = this.currentFrag;
                            return t ? this.followingBufferedFrag(t) : null
                        }
                    }, {
                        key: "forceStartLoad",
                        get: function () {
                            return this._forceStartLoad
                        }
                    }]) && ue(n.prototype, l), u && ue(n, u), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), r
                }(te),
                ce = function () {
                    function t(t, e, i) {
                        void 0 === e && (e = 0), void 0 === i && (i = 0), this.halfLife = void 0, this.alpha_ = void 0, this.estimate_ = void 0, this.totalWeight_ = void 0, this.halfLife = t, this.alpha_ = t ? Math.exp(Math.log(.5) / t) : 0, this.estimate_ = e, this.totalWeight_ = i
                    }
                    var e = t.prototype;
                    return e.sample = function (t, e) {
                        var i = Math.pow(this.alpha_, t);
                        this.estimate_ = e * (1 - i) + i * this.estimate_, this.totalWeight_ += t
                    }, e.getTotalWeight = function () {
                        return this.totalWeight_
                    }, e.getEstimate = function () {
                        if (this.alpha_) {
                            var t = 1 - Math.pow(this.alpha_, this.totalWeight_);
                            if (t) return this.estimate_ / t
                        }
                        return this.estimate_
                    }, t
                }(),
                fe = function () {
                    function t(t, e, i) {
                        this.defaultEstimate_ = void 0, this.minWeight_ = void 0, this.minDelayMs_ = void 0, this.slow_ = void 0, this.fast_ = void 0, this.defaultEstimate_ = i, this.minWeight_ = .001, this.minDelayMs_ = 50, this.slow_ = new ce(t), this.fast_ = new ce(e)
                    }
                    var e = t.prototype;
                    return e.update = function (t, e) {
                        var i = this.slow_,
                            r = this.fast_;
                        this.slow_.halfLife !== t && (this.slow_ = new ce(t, i.getEstimate(), i.getTotalWeight())), this.fast_.halfLife !== e && (this.fast_ = new ce(e, r.getEstimate(), r.getTotalWeight()))
                    }, e.sample = function (t, e) {
                        var i = (t = Math.max(t, this.minDelayMs_)) / 1e3,
                            r = 8 * e / i;
                        this.fast_.sample(i, r), this.slow_.sample(i, r)
                    }, e.canEstimate = function () {
                        var t = this.fast_;
                        return t && t.getTotalWeight() >= this.minWeight_
                    }, e.getEstimate = function () {
                        return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_
                    }, e.destroy = function () {}, t
                }();
    
            function ge(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            var ve = function () {
                    function t(t) {
                        this.hls = void 0, this.lastLoadedFragLevel = 0, this._nextAutoLevel = -1, this.timer = void 0, this.onCheck = this._abandonRulesCheck.bind(this), this.fragCurrent = null, this.partCurrent = null, this.bitrateTestDelay = 0, this.bwEstimator = void 0, this.hls = t;
                        var e = t.config;
                        this.bwEstimator = new fe(e.abrEwmaSlowVoD, e.abrEwmaFastVoD, e.abrEwmaDefaultEstimate), this.registerListeners()
                    }
                    var e, i, r, n = t.prototype;
                    return n.registerListeners = function () {
                        var t = this.hls;
                        t.on(s.a.FRAG_LOADING, this.onFragLoading, this), t.on(s.a.FRAG_LOADED, this.onFragLoaded, this), t.on(s.a.FRAG_BUFFERED, this.onFragBuffered, this), t.on(s.a.LEVEL_LOADED, this.onLevelLoaded, this), t.on(s.a.ERROR, this.onError, this)
                    }, n.unregisterListeners = function () {
                        var t = this.hls;
                        t.off(s.a.FRAG_LOADING, this.onFragLoading, this), t.off(s.a.FRAG_LOADED, this.onFragLoaded, this), t.off(s.a.FRAG_BUFFERED, this.onFragBuffered, this), t.off(s.a.LEVEL_LOADED, this.onLevelLoaded, this), t.off(s.a.ERROR, this.onError, this)
                    }, n.destroy = function () {
                        this.unregisterListeners(), this.clearTimer(), this.hls = this.onCheck = null, this.fragCurrent = this.partCurrent = null
                    }, n.onFragLoading = function (t, e) {
                        var i, r = e.frag;
                        r.type === w.b.MAIN && (this.timer || (this.fragCurrent = r, this.partCurrent = null != (i = e.part) ? i : null, this.timer = self.setInterval(this.onCheck, 100)))
                    }, n.onLevelLoaded = function (t, e) {
                        var i = this.hls.config;
                        e.details.live ? this.bwEstimator.update(i.abrEwmaSlowLive, i.abrEwmaFastLive) : this.bwEstimator.update(i.abrEwmaSlowVoD, i.abrEwmaFastVoD)
                    }, n._abandonRulesCheck = function () {
                        var t = this.fragCurrent,
                            e = this.partCurrent,
                            i = this.hls,
                            r = i.autoLevelEnabled,
                            n = (i.config, i.media);
                        if (t && n) {
                            var o = e ? e.stats : t.stats,
                                u = e ? e.duration : t.duration;
                            if (o.aborted || o.loaded && o.loaded === o.total || 0 === t.level) return this.clearTimer(), void(this._nextAutoLevel = -1);
                            if (r && !n.paused && n.playbackRate && n.readyState) {
                                var h = i.mainForwardBufferInfo;
                                if (null !== h) {
                                    var d = performance.now() - o.loading.start,
                                        c = Math.abs(n.playbackRate);
                                    if (!(d <= 500 * u / c)) {
                                        var f = o.loaded && o.loading.first,
                                            g = this.bwEstimator.getEstimate(),
                                            v = i.levels,
                                            p = i.minAutoLevel,
                                            m = v[t.level],
                                            y = o.total || Math.max(o.loaded, Math.round(u * m.maxBitrate / 8)),
                                            T = f ? 1e3 * o.loaded / d : 0,
                                            b = T ? (y - o.loaded) / T : 8 * y / g,
                                            E = h.len / c;
                                        if (!(b <= E)) {
                                            var S, L = Number.POSITIVE_INFINITY;
                                            for (S = t.level - 1; S > p; S--) {
                                                var A = v[S].maxBitrate;
                                                if ((L = T ? u * A / (6.4 * T) : u * A / g) < E) break
                                            }
                                            L >= b || (l.b.warn("Fragment " + t.sn + (e ? " part " + e.index : "") + " of level " + t.level + " is loading too slowly and will cause an underbuffer; aborting and switching to level " + S + "\n      Current BW estimate: " + (Object(a.a)(g) ? (g / 1024).toFixed(3) : "Unknown") + " Kb/s\n      Estimated load time for current fragment: " + b.toFixed(3) + " s\n      Estimated load time for the next fragment: " + L.toFixed(3) + " s\n      Time to underbuffer: " + E.toFixed(3) + " s"), i.nextLoadLevel = S, f && this.bwEstimator.sample(d, o.loaded), this.clearTimer(), t.loader && (this.fragCurrent = this.partCurrent = null, t.loader.abort()), i.trigger(s.a.FRAG_LOAD_EMERGENCY_ABORTED, {
                                                frag: t,
                                                part: e,
                                                stats: o
                                            }))
                                        }
                                    }
                                }
                            }
                        }
                    }, n.onFragLoaded = function (t, e) {
                        var i = e.frag,
                            r = e.part;
                        if (i.type === w.b.MAIN && Object(a.a)(i.sn)) {
                            var n = r ? r.stats : i.stats,
                                o = r ? r.duration : i.duration;
                            if (this.clearTimer(), this.lastLoadedFragLevel = i.level, this._nextAutoLevel = -1, this.hls.config.abrMaxWithRealBitrate) {
                                var l = this.hls.levels[i.level],
                                    u = (l.loaded ? l.loaded.bytes : 0) + n.loaded,
                                    h = (l.loaded ? l.loaded.duration : 0) + o;
                                l.loaded = {
                                    bytes: u,
                                    duration: h
                                }, l.realBitrate = Math.round(8 * u / h)
                            }
                            if (i.bitrateTest) {
                                var d = {
                                    stats: n,
                                    frag: i,
                                    part: r,
                                    id: i.type
                                };
                                this.onFragBuffered(s.a.FRAG_BUFFERED, d)
                            }
                        }
                    }, n.onFragBuffered = function (t, e) {
                        var i = e.frag,
                            r = e.part,
                            n = r ? r.stats : i.stats;
                        if (!n.aborted && i.type === w.b.MAIN && "initSegment" !== i.sn) {
                            var a = n.parsing.end - n.loading.start;
                            this.bwEstimator.sample(a, n.loaded), n.bwEstimate = this.bwEstimator.getEstimate(), i.bitrateTest ? this.bitrateTestDelay = a / 1e3 : this.bitrateTestDelay = 0
                        }
                    }, n.onError = function (t, e) {
                        switch (e.details) {
                            case o.a.FRAG_LOAD_ERROR:
                            case o.a.FRAG_LOAD_TIMEOUT:
                                this.clearTimer()
                        }
                    }, n.clearTimer = function () {
                        self.clearInterval(this.timer), this.timer = void 0
                    }, n.getNextABRAutoLevel = function () {
                        var t = this.fragCurrent,
                            e = this.partCurrent,
                            i = this.hls,
                            r = i.maxAutoLevel,
                            n = i.config,
                            a = i.minAutoLevel,
                            s = i.media,
                            o = e ? e.duration : t ? t.duration : 0,
                            u = (s && s.currentTime, s && 0 !== s.playbackRate ? Math.abs(s.playbackRate) : 1),
                            h = this.bwEstimator ? this.bwEstimator.getEstimate() : n.abrEwmaDefaultEstimate,
                            d = i.mainForwardBufferInfo,
                            c = (d ? d.len : 0) / u,
                            f = this.findBestLevel(h, a, r, c, n.abrBandWidthFactor, n.abrBandWidthUpFactor);
                        if (f >= 0) return f;
                        l.b.trace((c ? "rebuffering expected" : "buffer is empty") + ", finding optimal quality level");
                        var g = o ? Math.min(o, n.maxStarvationDelay) : n.maxStarvationDelay,
                            v = n.abrBandWidthFactor,
                            p = n.abrBandWidthUpFactor;
                        if (!c) {
                            var m = this.bitrateTestDelay;
                            if (m) g = (o ? Math.min(o, n.maxLoadingDelay) : n.maxLoadingDelay) - m, l.b.trace("bitrate test took " + Math.round(1e3 * m) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * g) + " ms"), v = p = 1
                        }
                        return f = this.findBestLevel(h, a, r, c + g, v, p), Math.max(f, 0)
                    }, n.findBestLevel = function (t, e, i, r, n, s) {
                        for (var o, u = this.fragCurrent, h = this.partCurrent, d = this.lastLoadedFragLevel, c = this.hls.levels, f = c[d], g = !(null == f || null === (o = f.details) || void 0 === o || !o.live), v = null == f ? void 0 : f.codecSet, p = h ? h.duration : u ? u.duration : 0, m = i; m >= e; m--) {
                            var y = c[m];
                            if (y && (!v || y.codecSet === v)) {
                                var T = y.details,
                                    b = (h ? null == T ? void 0 : T.partTarget : null == T ? void 0 : T.averagetargetduration) || p,
                                    E = void 0;
                                E = m <= d ? n * t : s * t;
                                var S = c[m].maxBitrate,
                                    L = S * b / E;
                                if (l.b.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + m + "/" + Math.round(E) + "/" + S + "/" + b + "/" + r + "/" + L), E > S && (0 === L || !Object(a.a)(L) || g && !this.bitrateTestDelay || L < r)) return m
                            }
                        }
                        return -1
                    }, e = t, (i = [{
                        key: "nextAutoLevel",
                        get: function () {
                            var t = this._nextAutoLevel,
                                e = this.bwEstimator;
                            if (-1 !== t && !e.canEstimate()) return t;
                            var i = this.getNextABRAutoLevel();
                            return -1 !== t && this.hls.levels[i].loadError ? t : (-1 !== t && (i = Math.min(t, i)), i)
                        },
                        set: function (t) {
                            this._nextAutoLevel = t
                        }
                    }]) && ge(e.prototype, i), r && ge(e, r), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), t
                }(),
                pe = function () {
                    function t() {
                        this.chunks = [], this.dataLength = 0
                    }
                    var e = t.prototype;
                    return e.push = function (t) {
                        this.chunks.push(t), this.dataLength += t.length
                    }, e.flush = function () {
                        var t, e = this.chunks,
                            i = this.dataLength;
                        return e.length ? (t = 1 === e.length ? e[0] : function (t, e) {
                            for (var i = new Uint8Array(e), r = 0, n = 0; n < t.length; n++) {
                                var a = t[n];
                                i.set(a, r), r += a.length
                            }
                            return i
                        }(e, i), this.reset(), t) : new Uint8Array(0)
                    }, e.reset = function () {
                        this.chunks.length = 0, this.dataLength = 0
                    }, t
                }();
    
            function me() {
                return (me = Object.assign ? Object.assign.bind() : function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
                    }
                    return t
                }).apply(this, arguments)
            }
    
            function ye(t, e) {
                return (ye = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var Te = function (t) {
                var e, i;
    
                function r(e, i) {
                    var r;
                    return (r = t.call(this, e, i, "[audio-stream-controller]") || this).videoBuffer = null, r.videoTrackCC = -1, r.waitingVideoCC = -1, r.audioSwitch = !1, r.trackId = -1, r.waitingData = null, r.mainDetails = null, r.bufferFlushed = !1, r.cachedTrackLoadedData = null, r._registerListeners(), r
                }
                i = t, (e = r).prototype = Object.create(i.prototype), e.prototype.constructor = e, ye(e, i);
                var n = r.prototype;
                return n.onHandlerDestroying = function () {
                    this._unregisterListeners(), this.mainDetails = null
                }, n._registerListeners = function () {
                    var t = this.hls;
                    t.on(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.a.LEVEL_LOADED, this.onLevelLoaded, this), t.on(s.a.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), t.on(s.a.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.on(s.a.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.on(s.a.ERROR, this.onError, this), t.on(s.a.BUFFER_RESET, this.onBufferReset, this), t.on(s.a.BUFFER_CREATED, this.onBufferCreated, this), t.on(s.a.BUFFER_FLUSHED, this.onBufferFlushed, this), t.on(s.a.INIT_PTS_FOUND, this.onInitPtsFound, this), t.on(s.a.FRAG_BUFFERED, this.onFragBuffered, this)
                }, n._unregisterListeners = function () {
                    var t = this.hls;
                    t.off(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.a.LEVEL_LOADED, this.onLevelLoaded, this), t.off(s.a.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), t.off(s.a.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.off(s.a.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.off(s.a.ERROR, this.onError, this), t.off(s.a.BUFFER_RESET, this.onBufferReset, this), t.off(s.a.BUFFER_CREATED, this.onBufferCreated, this), t.off(s.a.BUFFER_FLUSHED, this.onBufferFlushed, this), t.off(s.a.INIT_PTS_FOUND, this.onInitPtsFound, this), t.off(s.a.FRAG_BUFFERED, this.onFragBuffered, this)
                }, n.onInitPtsFound = function (t, e) {
                    var i = e.frag,
                        r = e.id,
                        n = e.initPTS;
                    if ("main" === r) {
                        var a = i.cc;
                        this.initPTS[i.cc] = n, this.log("InitPTS for cc: " + a + " found from main: " + n), this.videoTrackCC = a, this.state === Jt && this.tick()
                    }
                }, n.startLoad = function (t) {
                    if (!this.levels) return this.startPosition = t, void(this.state = Kt);
                    var e = this.lastCurrentTime;
                    this.stopLoad(), this.setInterval(100), this.fragLoadError = 0, e > 0 && -1 === t ? (this.log("Override startPosition with lastCurrentTime @" + e.toFixed(3)), t = e, this.state = Ht) : (this.loadedmetadata = !1, this.state = qt), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick()
                }, n.doTick = function () {
                    switch (this.state) {
                        case Ht:
                            this.doTickIdle();
                            break;
                        case qt:
                            var e, i = this.levels,
                                r = this.trackId,
                                n = null == i || null === (e = i[r]) || void 0 === e ? void 0 : e.details;
                            if (n) {
                                if (this.waitForCdnTuneIn(n)) break;
                                this.state = Jt
                            }
                            break;
                        case Yt:
                            var a, s = performance.now(),
                                o = this.retryDate;
                            (!o || s >= o || null !== (a = this.media) && void 0 !== a && a.seeking) && (this.log("RetryDate reached, switch back to IDLE state"), this.resetStartWhenNotLoaded(this.trackId), this.state = Ht);
                            break;
                        case Jt:
                            var l = this.waitingData;
                            if (l) {
                                var u = l.frag,
                                    h = l.part,
                                    d = l.cache,
                                    c = l.complete;
                                if (void 0 !== this.initPTS[u.cc]) {
                                    this.waitingData = null, this.waitingVideoCC = -1, this.state = Wt;
                                    var f = {
                                        frag: u,
                                        part: h,
                                        payload: d.flush(),
                                        networkDetails: null
                                    };
                                    this._handleFragmentLoadProgress(f), c && t.prototype._handleFragmentLoadComplete.call(this, f)
                                } else if (this.videoTrackCC !== this.waitingVideoCC) this.log("Waiting fragment cc (" + u.cc + ") cancelled because video is at cc " + this.videoTrackCC), this.clearWaitingFragment();
                                else {
                                    var g = this.getLoadPosition(),
                                        v = mt.bufferInfo(this.mediaBuffer, g, this.config.maxBufferHole);
                                    Rt(v.end, this.config.maxFragLookUpTolerance, u) < 0 && (this.log("Waiting fragment cc (" + u.cc + ") @ " + u.start + " cancelled because another fragment at " + v.end + " is needed"), this.clearWaitingFragment())
                                }
                            } else this.state = Ht
                    }
                    this.onTickEnd()
                }, n.clearWaitingFragment = function () {
                    var t = this.waitingData;
                    t && (this.fragmentTracker.removeFragment(t.frag), this.waitingData = null, this.waitingVideoCC = -1, this.state = Ht)
                }, n.resetLoadingState = function () {
                    this.clearWaitingFragment(), t.prototype.resetLoadingState.call(this)
                }, n.onTickEnd = function () {
                    var t = this.media;
                    if (t && t.readyState) {
                        var e = (this.mediaBuffer ? this.mediaBuffer : t).buffered;
                        !this.loadedmetadata && e.length && (this.loadedmetadata = !0), this.lastCurrentTime = t.currentTime
                    }
                }, n.doTickIdle = function () {
                    var t, e, i = this.hls,
                        r = this.levels,
                        n = this.media,
                        a = this.trackId,
                        o = i.config;
                    if (r && r[a] && (n || !this.startFragRequested && o.startFragPrefetch)) {
                        var l = r[a].details;
                        if (!l || l.live && this.levelLastLoaded !== a || this.waitForCdnTuneIn(l)) this.state = qt;
                        else {
                            var u = this.mediaBuffer ? this.mediaBuffer : this.media;
                            this.bufferFlushed && u && (this.bufferFlushed = !1, this.afterBufferFlushed(u, p.a.AUDIO, w.b.AUDIO));
                            var h = this.getFwdBufferInfo(u, w.b.AUDIO);
                            if (null !== h) {
                                var d = this.getFwdBufferInfo(this.videoBuffer ? this.videoBuffer : this.media, w.b.MAIN),
                                    c = h.len,
                                    f = this.getMaxBufferLength(null == d ? void 0 : d.len),
                                    g = this.audioSwitch;
                                if (!(c >= f) || g) {
                                    if (!g && this._streamEnded(h, l)) return i.trigger(s.a.BUFFER_EOS, {
                                        type: "audio"
                                    }), void(this.state = Qt);
                                    var v = l.fragments[0].start,
                                        m = h.end;
                                    if (g && n) {
                                        var y = this.getLoadPosition();
                                        m = y, l.PTSKnown && y < v && (h.end > v || h.nextStart) && (this.log("Alt audio track ahead of main track, seek to start of alt audio track"), n.currentTime = v + .05)
                                    }
                                    if (!(d && m > d.end + l.targetduration) && (d && d.len || !h.len)) {
                                        var T = this.getNextFragment(m, l);
                                        T ? "identity" !== (null === (t = T.decryptdata) || void 0 === t ? void 0 : t.keyFormat) || null !== (e = T.decryptdata) && void 0 !== e && e.key ? this.loadFragment(T, l, m) : this.loadKey(T, l) : this.bufferFlushed = !0
                                    }
                                }
                            }
                        }
                    }
                }, n.getMaxBufferLength = function (e) {
                    var i = t.prototype.getMaxBufferLength.call(this);
                    return e ? Math.max(i, e) : i
                }, n.onMediaDetaching = function () {
                    this.videoBuffer = null, t.prototype.onMediaDetaching.call(this)
                }, n.onAudioTracksUpdated = function (t, e) {
                    var i = e.audioTracks;
                    this.resetTransmuxer(), this.levels = i.map((function (t) {
                        return new Q(t)
                    }))
                }, n.onAudioTrackSwitching = function (t, e) {
                    var i = !!e.url;
                    this.trackId = e.id;
                    var r = this.fragCurrent;
                    null != r && r.loader && r.loader.abort(), this.fragCurrent = null, this.clearWaitingFragment(), i ? this.setInterval(100) : this.resetTransmuxer(), i ? (this.audioSwitch = !0, this.state = Ht) : this.state = Kt, this.tick()
                }, n.onManifestLoading = function () {
                    this.mainDetails = null, this.fragmentTracker.removeAllFragments(), this.startPosition = this.lastCurrentTime = 0, this.bufferFlushed = !1
                }, n.onLevelLoaded = function (t, e) {
                    this.mainDetails = e.details, null !== this.cachedTrackLoadedData && (this.hls.trigger(s.a.AUDIO_TRACK_LOADED, this.cachedTrackLoadedData), this.cachedTrackLoadedData = null)
                }, n.onAudioTrackLoaded = function (t, e) {
                    var i;
                    if (null != this.mainDetails) {
                        var r = this.levels,
                            n = e.details,
                            a = e.id;
                        if (r) {
                            this.log("Track " + a + " loaded [" + n.startSN + "," + n.endSN + "],duration:" + n.totalduration);
                            var s = r[a],
                                o = 0;
                            if (n.live || null !== (i = s.details) && void 0 !== i && i.live) {
                                var l = this.mainDetails;
                                if (n.fragments[0] || (n.deltaUpdateFailed = !0), n.deltaUpdateFailed || !l) return;
                                !s.details && n.hasProgramDateTime && l.hasProgramDateTime ? (Lt(n, l), o = n.fragments[0].start) : o = this.alignPlaylists(n, s.details)
                            }
                            s.details = n, this.levelLastLoaded = a, this.startFragRequested || !this.mainDetails && n.live || this.setStartPosition(s.details, o), this.state !== qt || this.waitForCdnTuneIn(n) || (this.state = Ht), this.tick()
                        } else this.warn("Audio tracks were reset while loading level " + a)
                    } else this.cachedTrackLoadedData = e
                }, n._handleFragmentLoadProgress = function (t) {
                    var e, i = t.frag,
                        r = t.part,
                        n = t.payload,
                        a = this.config,
                        s = this.trackId,
                        o = this.levels;
                    if (o) {
                        var l = o[s],
                            u = l.details,
                            h = a.defaultAudioCodec || l.audioCodec || "mp4a.40.2",
                            d = this.transmuxer;
                        d || (d = this.transmuxer = new oe(this.hls, w.b.AUDIO, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)));
                        var c = this.initPTS[i.cc],
                            f = null === (e = i.initSegment) || void 0 === e ? void 0 : e.data;
                        if (void 0 !== c) {
                            var g = r ? r.index : -1,
                                v = -1 !== g,
                                p = new yt(i.level, i.sn, i.stats.chunkCount, n.byteLength, g, v);
                            d.push(n, f, h, "", i, r, u.totalduration, !1, p, c)
                        } else {
                            this.log("Unknown video PTS for cc " + i.cc + ", waiting for video PTS before demuxing audio frag " + i.sn + " of [" + u.startSN + " ," + u.endSN + "],track " + s), (this.waitingData = this.waitingData || {
                                frag: i,
                                part: r,
                                cache: new pe,
                                complete: !1
                            }).cache.push(new Uint8Array(n)), this.waitingVideoCC = this.videoTrackCC, this.state = Jt
                        }
                    } else this.warn("Audio tracks were reset while fragment load was in progress. Fragment " + i.sn + " of level " + i.level + " will not be buffered")
                }, n._handleFragmentLoadComplete = function (e) {
                    this.waitingData ? this.waitingData.complete = !0 : t.prototype._handleFragmentLoadComplete.call(this, e)
                }, n.onBufferReset = function () {
                    this.mediaBuffer = this.videoBuffer = null, this.loadedmetadata = !1
                }, n.onBufferCreated = function (t, e) {
                    var i = e.tracks.audio;
                    i && (this.mediaBuffer = i.buffer || null), e.tracks.video && (this.videoBuffer = e.tracks.video.buffer || null)
                }, n.onFragBuffered = function (t, e) {
                    var i = e.frag,
                        r = e.part;
                    i.type === w.b.AUDIO && (this.fragContextChanged(i) ? this.warn("Fragment " + i.sn + (r ? " p: " + r.index : "") + " of level " + i.level + " finished buffering, but was aborted. state: " + this.state + ", audioSwitch: " + this.audioSwitch) : ("initSegment" !== i.sn && (this.fragPrevious = i, this.audioSwitch && (this.audioSwitch = !1, this.hls.trigger(s.a.AUDIO_TRACK_SWITCHED, {
                        id: this.trackId
                    }))), this.fragBufferedComplete(i, r)))
                }, n.onError = function (e, i) {
                    switch (i.details) {
                        case o.a.FRAG_LOAD_ERROR:
                        case o.a.FRAG_LOAD_TIMEOUT:
                        case o.a.KEY_LOAD_ERROR:
                        case o.a.KEY_LOAD_TIMEOUT:
                            this.onFragmentOrKeyLoadError(w.b.AUDIO, i);
                            break;
                        case o.a.AUDIO_TRACK_LOAD_ERROR:
                        case o.a.AUDIO_TRACK_LOAD_TIMEOUT:
                            this.state !== $t && this.state !== Kt && (this.state = i.fatal ? $t : Ht, this.warn(i.details + " while loading frag, switching to " + this.state + " state"));
                            break;
                        case o.a.BUFFER_FULL_ERROR:
                            if ("audio" === i.parent && (this.state === zt || this.state === Xt)) {
                                var r = !0,
                                    n = this.getFwdBufferInfo(this.mediaBuffer, w.b.AUDIO);
                                n && n.len > .5 && (r = !this.reduceMaxBufferLength(n.len)), r && (this.warn("Buffer full error also media.currentTime is not buffered, flush audio buffer"), this.fragCurrent = null, t.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.resetLoadingState()
                            }
                    }
                }, n.onBufferFlushed = function (t, e) {
                    e.type === p.a.AUDIO && (this.bufferFlushed = !0)
                }, n._handleTransmuxComplete = function (t) {
                    var e, i = "audio",
                        r = this.hls,
                        n = t.remuxResult,
                        a = t.chunkMeta,
                        o = this.getCurrentContext(a);
                    if (!o) return this.warn("The loading context changed while buffering fragment " + a.sn + " of level " + a.level + ". This chunk will not be buffered."), void this.resetStartWhenNotLoaded(a.level);
                    var l = o.frag,
                        u = o.part,
                        h = o.level.details,
                        d = n.audio,
                        c = n.text,
                        f = n.id3,
                        g = n.initSegment;
                    if (!this.fragContextChanged(l) && h) {
                        if (this.state = zt, this.audioSwitch && d && this.completeAudioSwitch(), null != g && g.tracks && (this._bufferInitSegment(g.tracks, l, a), r.trigger(s.a.FRAG_PARSING_INIT_SEGMENT, {
                                frag: l,
                                id: i,
                                tracks: g.tracks
                            })), d) {
                            var v = d.startPTS,
                                m = d.endPTS,
                                y = d.startDTS,
                                T = d.endDTS;
                            u && (u.elementaryStreams[p.a.AUDIO] = {
                                startPTS: v,
                                endPTS: m,
                                startDTS: y,
                                endDTS: T
                            }), l.setElementaryStreamInfo(p.a.AUDIO, v, m, y, T), this.bufferFragmentData(d, l, u, a)
                        }
                        if (null != f && null !== (e = f.samples) && void 0 !== e && e.length) {
                            var b = me({
                                id: i,
                                frag: l,
                                details: h
                            }, f);
                            r.trigger(s.a.FRAG_PARSING_METADATA, b)
                        }
                        if (c) {
                            var E = me({
                                id: i,
                                frag: l,
                                details: h
                            }, c);
                            r.trigger(s.a.FRAG_PARSING_USERDATA, E)
                        }
                    }
                }, n._bufferInitSegment = function (t, e, i) {
                    if (this.state === zt) {
                        t.video && delete t.video;
                        var r = t.audio;
                        if (r) {
                            r.levelCodec = r.codec, r.id = "audio", this.log("Init audio buffer, container:" + r.container + ", codecs[parsed]=[" + r.codec + "]"), this.hls.trigger(s.a.BUFFER_CODECS, t);
                            var n = r.initSegment;
                            if (null != n && n.byteLength) {
                                var a = {
                                    type: "audio",
                                    frag: e,
                                    part: null,
                                    chunkMeta: i,
                                    parent: e.type,
                                    data: n
                                };
                                this.hls.trigger(s.a.BUFFER_APPENDING, a)
                            }
                            this.tick()
                        }
                    }
                }, n.loadFragment = function (e, i, r) {
                    var n = this.fragmentTracker.getState(e);
                    this.fragCurrent = e, (this.audioSwitch || n === ut.NOT_LOADED || n === ut.PARTIAL) && ("initSegment" === e.sn ? this._loadInitSegment(e) : i.live && !Object(a.a)(this.initPTS[e.cc]) ? (this.log("Waiting for video PTS in continuity counter " + e.cc + " of live stream before loading audio fragment " + e.sn + " of level " + this.trackId), this.state = Jt) : (this.startFragRequested = !0, t.prototype.loadFragment.call(this, e, i, r)))
                }, n.completeAudioSwitch = function () {
                    var e = this.hls,
                        i = this.media,
                        r = this.trackId;
                    i && (this.log("Switching audio track : flushing all audio"), t.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.audioSwitch = !1, e.trigger(s.a.AUDIO_TRACK_SWITCHED, {
                        id: r
                    })
                }, r
            }(te);
    
            function be(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
    
            function Ee(t, e) {
                return (Ee = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var Se = function (t) {
                var e, i;
    
                function r(e) {
                    var i;
                    return (i = t.call(this, e, "[audio-track-controller]") || this).tracks = [], i.groupId = null, i.tracksInGroup = [], i.trackId = -1, i.trackName = "", i.selectDefaultTrack = !0, i.registerListeners(), i
                }
                i = t, (e = r).prototype = Object.create(i.prototype), e.prototype.constructor = e, Ee(e, i);
                var n, a, l, u = r.prototype;
                return u.registerListeners = function () {
                    var t = this.hls;
                    t.on(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.a.MANIFEST_PARSED, this.onManifestParsed, this), t.on(s.a.LEVEL_LOADING, this.onLevelLoading, this), t.on(s.a.LEVEL_SWITCHING, this.onLevelSwitching, this), t.on(s.a.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.on(s.a.ERROR, this.onError, this)
                }, u.unregisterListeners = function () {
                    var t = this.hls;
                    t.off(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.a.MANIFEST_PARSED, this.onManifestParsed, this), t.off(s.a.LEVEL_LOADING, this.onLevelLoading, this), t.off(s.a.LEVEL_SWITCHING, this.onLevelSwitching, this), t.off(s.a.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.off(s.a.ERROR, this.onError, this)
                }, u.destroy = function () {
                    this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, t.prototype.destroy.call(this)
                }, u.onManifestLoading = function () {
                    this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.trackName = "", this.selectDefaultTrack = !0
                }, u.onManifestParsed = function (t, e) {
                    this.tracks = e.audioTracks || []
                }, u.onAudioTrackLoaded = function (t, e) {
                    var i = e.id,
                        r = e.details,
                        n = this.tracksInGroup[i];
                    if (n) {
                        var a = n.details;
                        n.details = e.details, this.log("audioTrack " + i + " loaded [" + r.startSN + "-" + r.endSN + "]"), i === this.trackId && (this.retryCount = 0, this.playlistLoaded(i, e, a))
                    } else this.warn("Invalid audio track id " + i)
                }, u.onLevelLoading = function (t, e) {
                    this.switchLevel(e.level)
                }, u.onLevelSwitching = function (t, e) {
                    this.switchLevel(e.level)
                }, u.switchLevel = function (t) {
                    var e = this.hls.levels[t];
                    if (null != e && e.audioGroupIds) {
                        var i = e.audioGroupIds[e.urlId];
                        if (this.groupId !== i) {
                            this.groupId = i;
                            var r = this.tracks.filter((function (t) {
                                return !i || t.groupId === i
                            }));
                            this.selectDefaultTrack && !r.some((function (t) {
                                return t.default
                            })) && (this.selectDefaultTrack = !1), this.tracksInGroup = r;
                            var n = {
                                audioTracks: r
                            };
                            this.log("Updating audio tracks, " + r.length + ' track(s) found in "' + i + '" group-id'), this.hls.trigger(s.a.AUDIO_TRACKS_UPDATED, n), this.selectInitialTrack()
                        }
                    }
                }, u.onError = function (e, i) {
                    t.prototype.onError.call(this, e, i), !i.fatal && i.context && i.context.type === w.a.AUDIO_TRACK && i.context.id === this.trackId && i.context.groupId === this.groupId && this.retryLoadingOrFail(i)
                }, u.setAudioTrack = function (t) {
                    var e = this.tracksInGroup;
                    if (t < 0 || t >= e.length) this.warn("Invalid id passed to audio-track controller");
                    else {
                        this.clearTimer();
                        var i = e[this.trackId];
                        this.log("Now switching to audio-track index " + t);
                        var r = e[t],
                            n = r.id,
                            a = r.groupId,
                            o = void 0 === a ? "" : a,
                            l = r.name,
                            u = r.type,
                            h = r.url;
                        if (this.trackId = t, this.trackName = l, this.selectDefaultTrack = !1, this.hls.trigger(s.a.AUDIO_TRACK_SWITCHING, {
                                id: n,
                                groupId: o,
                                name: l,
                                type: u,
                                url: h
                            }), !r.details || r.details.live) {
                            var d = this.switchParams(r.url, null == i ? void 0 : i.details);
                            this.loadPlaylist(d)
                        }
                    }
                }, u.selectInitialTrack = function () {
                    this.tracksInGroup;
                    var t = this.trackName,
                        e = this.findTrackId(t) || this.findTrackId(); - 1 !== e ? this.setAudioTrack(e) : (this.warn("No track found for running audio group-ID: " + this.groupId), this.hls.trigger(s.a.ERROR, {
                        type: o.b.MEDIA_ERROR,
                        details: o.a.AUDIO_TRACK_LOAD_ERROR,
                        fatal: !0
                    }))
                }, u.findTrackId = function (t) {
                    for (var e = this.tracksInGroup, i = 0; i < e.length; i++) {
                        var r = e[i];
                        if ((!this.selectDefaultTrack || r.default) && (!t || t === r.name)) return r.id
                    }
                    return -1
                }, u.loadPlaylist = function (t) {
                    var e = this.tracksInGroup[this.trackId];
                    if (this.shouldLoadTrack(e)) {
                        var i = e.id,
                            r = e.groupId,
                            n = e.url;
                        if (t) try {
                            n = t.addDirectives(n)
                        } catch (t) {
                            this.warn("Could not construct new URL with HLS Delivery Directives: " + t)
                        }
                        this.log("loading audio-track playlist for id: " + i), this.clearTimer(), this.hls.trigger(s.a.AUDIO_TRACK_LOADING, {
                            url: n,
                            id: i,
                            groupId: r,
                            deliveryDirectives: t || null
                        })
                    }
                }, n = r, (a = [{
                    key: "audioTracks",
                    get: function () {
                        return this.tracksInGroup
                    }
                }, {
                    key: "audioTrack",
                    get: function () {
                        return this.trackId
                    },
                    set: function (t) {
                        this.selectDefaultTrack = !1, this.setAudioTrack(t)
                    }
                }]) && be(n.prototype, a), l && be(n, l), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), r
            }(at);
    
            function Le(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
    
            function Ae(t, e) {
                return (Ae = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var De = function (t) {
                    var e, i;
    
                    function r(e, i) {
                        var r;
                        return (r = t.call(this, e, i, "[subtitle-stream-controller]") || this).levels = [], r.currentTrackId = -1, r.tracksBuffered = [], r.mainDetails = null, r._registerListeners(), r
                    }
                    i = t, (e = r).prototype = Object.create(i.prototype), e.prototype.constructor = e, Ae(e, i);
                    var n, a, o, l = r.prototype;
                    return l.onHandlerDestroying = function () {
                        this._unregisterListeners(), this.mainDetails = null
                    }, l._registerListeners = function () {
                        var t = this.hls;
                        t.on(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.a.LEVEL_LOADED, this.onLevelLoaded, this), t.on(s.a.ERROR, this.onError, this), t.on(s.a.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.on(s.a.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), t.on(s.a.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.on(s.a.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), t.on(s.a.BUFFER_FLUSHING, this.onBufferFlushing, this)
                    }, l._unregisterListeners = function () {
                        var t = this.hls;
                        t.off(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.a.LEVEL_LOADED, this.onLevelLoaded, this), t.off(s.a.ERROR, this.onError, this), t.off(s.a.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.off(s.a.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), t.off(s.a.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.off(s.a.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), t.off(s.a.BUFFER_FLUSHING, this.onBufferFlushing, this)
                    }, l.startLoad = function () {
                        this.stopLoad(), this.state = Ht, this.setInterval(500), this.tick()
                    }, l.onManifestLoading = function () {
                        this.mainDetails = null, this.fragmentTracker.removeAllFragments()
                    }, l.onLevelLoaded = function (t, e) {
                        this.mainDetails = e.details
                    }, l.onSubtitleFragProcessed = function (t, e) {
                        var i = e.frag,
                            r = e.success;
                        if (this.fragPrevious = i, this.state = Ht, r) {
                            var n = this.tracksBuffered[this.currentTrackId];
                            if (n) {
                                for (var a, s = i.start, o = 0; o < n.length; o++)
                                    if (s >= n[o].start && s <= n[o].end) {
                                        a = n[o];
                                        break
                                    } var l = i.start + i.duration;
                                a ? a.end = l : (a = {
                                    start: s,
                                    end: l
                                }, n.push(a)), this.fragmentTracker.fragBuffered(i)
                            }
                        }
                    }, l.onBufferFlushing = function (t, e) {
                        var i = e.startOffset,
                            r = e.endOffset;
                        if (0 === i && r !== Number.POSITIVE_INFINITY) {
                            var n = this.currentTrackId,
                                a = this.levels;
                            if (!a.length || !a[n] || !a[n].details) return;
                            var s = r - a[n].details.targetduration;
                            if (s <= 0) return;
                            e.endOffsetSubtitles = Math.max(0, s), this.tracksBuffered.forEach((function (t) {
                                for (var e = 0; e < t.length;)
                                    if (t[e].end <= s) t.shift();
                                    else {
                                        if (!(t[e].start < s)) break;
                                        t[e].start = s, e++
                                    }
                            })), this.fragmentTracker.removeFragmentsInRange(i, s, w.b.SUBTITLE)
                        }
                    }, l.onError = function (t, e) {
                        var i, r = e.frag;
                        r && r.type === w.b.SUBTITLE && (null !== (i = this.fragCurrent) && void 0 !== i && i.loader && this.fragCurrent.loader.abort(), this.state = Ht)
                    }, l.onSubtitleTracksUpdated = function (t, e) {
                        var i = this,
                            r = e.subtitleTracks;
                        this.tracksBuffered = [], this.levels = r.map((function (t) {
                            return new Q(t)
                        })), this.fragmentTracker.removeAllFragments(), this.fragPrevious = null, this.levels.forEach((function (t) {
                            i.tracksBuffered[t.id] = []
                        })), this.mediaBuffer = null
                    }, l.onSubtitleTrackSwitch = function (t, e) {
                        if (this.currentTrackId = e.id, this.levels.length && -1 !== this.currentTrackId) {
                            var i = this.levels[this.currentTrackId];
                            null != i && i.details ? this.mediaBuffer = this.mediaBufferTimeRanges : this.mediaBuffer = null, i && this.setInterval(500)
                        } else this.clearInterval()
                    }, l.onSubtitleTrackLoaded = function (t, e) {
                        var i, r = e.details,
                            n = e.id,
                            a = this.currentTrackId,
                            s = this.levels;
                        if (s.length) {
                            var o = s[a];
                            if (!(n >= s.length || n !== a) && o) {
                                if (this.mediaBuffer = this.mediaBufferTimeRanges, r.live || null !== (i = o.details) && void 0 !== i && i.live) {
                                    var l = this.mainDetails;
                                    if (r.deltaUpdateFailed || !l) return;
                                    var u = l.fragments[0];
                                    if (o.details) 0 === this.alignPlaylists(r, o.details) && u && nt(r, u.start);
                                    else r.hasProgramDateTime && l.hasProgramDateTime ? Lt(r, l) : u && nt(r, u.start)
                                }
                                if (o.details = r, this.levelLastLoaded = n, this.tick(), r.live && !this.fragCurrent && this.media && this.state === Ht) Dt(null, r.fragments, this.media.currentTime, 0) || (this.warn("Subtitle playlist not aligned with playback"), o.details = void 0)
                            }
                        }
                    }, l._handleFragmentLoadComplete = function (t) {
                        var e = t.frag,
                            i = t.payload,
                            r = e.decryptdata,
                            n = this.hls;
                        if (!this.fragContextChanged(e) && i && i.byteLength > 0 && r && r.key && r.iv && "AES-128" === r.method) {
                            var a = performance.now();
                            this.decrypter.webCryptoDecrypt(new Uint8Array(i), r.key.buffer, r.iv.buffer).then((function (t) {
                                var i = performance.now();
                                n.trigger(s.a.FRAG_DECRYPTED, {
                                    frag: e,
                                    payload: t,
                                    stats: {
                                        tstart: a,
                                        tdecrypt: i
                                    }
                                })
                            }))
                        }
                    }, l.doTick = function () {
                        if (this.media) {
                            if (this.state === Ht) {
                                var t = this.currentTrackId,
                                    e = this.levels;
                                if (!e.length || !e[t] || !e[t].details) return;
                                var i = e[t].details,
                                    r = i.targetduration,
                                    n = this.config,
                                    a = this.media,
                                    s = mt.bufferedInfo(this.tracksBuffered[this.currentTrackId] || [], a.currentTime - r, n.maxBufferHole),
                                    o = s.end;
                                if (s.len > this.getMaxBufferLength() + r) return;
                                var l, u = i.fragments,
                                    h = u.length,
                                    d = i.edge,
                                    c = this.fragPrevious;
                                if (o < d) {
                                    var f = n.maxFragLookUpTolerance;
                                    !(l = Dt(c, u, Math.max(u[0].start, o), f)) && c && c.start < u[0].start && (l = u[0])
                                } else l = u[h - 1];
                                if (!(l = this.mapToInitFragWhenRequired(l))) return;
                                if (this.fragmentTracker.getState(l) !== ut.NOT_LOADED) return;
                                l.encrypted ? this.loadKey(l, i) : this.loadFragment(l, i, o)
                            }
                        } else this.state = Ht
                    }, l.loadFragment = function (e, i, r) {
                        this.fragCurrent = e, "initSegment" === e.sn ? this._loadInitSegment(e) : t.prototype.loadFragment.call(this, e, i, r)
                    }, n = r, (a = [{
                        key: "mediaBufferTimeRanges",
                        get: function () {
                            return new Re(this.tracksBuffered[this.currentTrackId] || [])
                        }
                    }]) && Le(n.prototype, a), o && Le(n, o), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), r
                }(te),
                Re = function (t) {
                    this.buffered = void 0;
                    var e = function (e, i, r) {
                        if ((i >>>= 0) > r - 1) throw new DOMException("Failed to execute '" + e + "' on 'TimeRanges': The index provided (" + i + ") is greater than the maximum bound (" + r + ")");
                        return t[i][e]
                    };
                    this.buffered = {
                        get length() {
                            return t.length
                        },
                        end: function (i) {
                            return e("end", i, t.length)
                        },
                        start: function (i) {
                            return e("start", i, t.length)
                        }
                    }
                };
    
            function ke(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
    
            function _e(t, e) {
                return (_e = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
    
            function Ie(t) {
                for (var e = [], i = 0; i < t.length; i++) {
                    var r = t[i];
                    "subtitles" === r.kind && r.label && e.push(t[i])
                }
                return e
            }
            var Oe, Ce = function (t) {
                    var e, i;
    
                    function r(e) {
                        var i;
                        return (i = t.call(this, e, "[subtitle-track-controller]") || this).media = null, i.tracks = [], i.groupId = null, i.tracksInGroup = [], i.trackId = -1, i.selectDefaultTrack = !0, i.queuedDefaultTrack = -1, i.trackChangeListener = function () {
                            return i.onTextTracksChanged()
                        }, i.asyncPollTrackChange = function () {
                            return i.pollTrackChange(0)
                        }, i.useTextTrackPolling = !1, i.subtitlePollingInterval = -1, i._subtitleDisplay = !0, i.registerListeners(), i
                    }
                    i = t, (e = r).prototype = Object.create(i.prototype), e.prototype.constructor = e, _e(e, i);
                    var n, a, o, l = r.prototype;
                    return l.destroy = function () {
                        this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.trackChangeListener = this.asyncPollTrackChange = null, t.prototype.destroy.call(this)
                    }, l.registerListeners = function () {
                        var t = this.hls;
                        t.on(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.a.MANIFEST_PARSED, this.onManifestParsed, this), t.on(s.a.LEVEL_LOADING, this.onLevelLoading, this), t.on(s.a.LEVEL_SWITCHING, this.onLevelSwitching, this), t.on(s.a.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.on(s.a.ERROR, this.onError, this)
                    }, l.unregisterListeners = function () {
                        var t = this.hls;
                        t.off(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.a.MANIFEST_PARSED, this.onManifestParsed, this), t.off(s.a.LEVEL_LOADING, this.onLevelLoading, this), t.off(s.a.LEVEL_SWITCHING, this.onLevelSwitching, this), t.off(s.a.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), t.off(s.a.ERROR, this.onError, this)
                    }, l.onMediaAttached = function (t, e) {
                        this.media = e.media, this.media && (this.queuedDefaultTrack > -1 && (this.subtitleTrack = this.queuedDefaultTrack, this.queuedDefaultTrack = -1), this.useTextTrackPolling = !(this.media.textTracks && "onchange" in this.media.textTracks), this.useTextTrackPolling ? this.pollTrackChange(500) : this.media.textTracks.addEventListener("change", this.asyncPollTrackChange))
                    }, l.pollTrackChange = function (t) {
                        self.clearInterval(this.subtitlePollingInterval), this.subtitlePollingInterval = self.setInterval(this.trackChangeListener, t)
                    }, l.onMediaDetaching = function () {
                        this.media && (self.clearInterval(this.subtitlePollingInterval), this.useTextTrackPolling || this.media.textTracks.removeEventListener("change", this.asyncPollTrackChange), this.trackId > -1 && (this.queuedDefaultTrack = this.trackId), Ie(this.media.textTracks).forEach((function (t) {
                            U(t)
                        })), this.subtitleTrack = -1, this.media = null)
                    }, l.onManifestLoading = function () {
                        this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.selectDefaultTrack = !0
                    }, l.onManifestParsed = function (t, e) {
                        this.tracks = e.subtitleTracks
                    }, l.onSubtitleTrackLoaded = function (t, e) {
                        var i = e.id,
                            r = e.details,
                            n = this.trackId,
                            a = this.tracksInGroup[n];
                        if (a) {
                            var s = a.details;
                            a.details = e.details, this.log("subtitle track " + i + " loaded [" + r.startSN + "-" + r.endSN + "]"), i === this.trackId && (this.retryCount = 0, this.playlistLoaded(i, e, s))
                        } else this.warn("Invalid subtitle track id " + i)
                    }, l.onLevelLoading = function (t, e) {
                        this.switchLevel(e.level)
                    }, l.onLevelSwitching = function (t, e) {
                        this.switchLevel(e.level)
                    }, l.switchLevel = function (t) {
                        var e = this.hls.levels[t];
                        if (null != e && e.textGroupIds) {
                            var i = e.textGroupIds[e.urlId];
                            if (this.groupId !== i) {
                                var r = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0,
                                    n = this.tracks.filter((function (t) {
                                        return !i || t.groupId === i
                                    }));
                                this.tracksInGroup = n;
                                var a = this.findTrackId(null == r ? void 0 : r.name) || this.findTrackId();
                                this.groupId = i;
                                var o = {
                                    subtitleTracks: n
                                };
                                this.log("Updating subtitle tracks, " + n.length + ' track(s) found in "' + i + '" group-id'), this.hls.trigger(s.a.SUBTITLE_TRACKS_UPDATED, o), -1 !== a && this.setSubtitleTrack(a, r)
                            }
                        }
                    }, l.findTrackId = function (t) {
                        for (var e = this.tracksInGroup, i = 0; i < e.length; i++) {
                            var r = e[i];
                            if ((!this.selectDefaultTrack || r.default) && (!t || t === r.name)) return r.id
                        }
                        return -1
                    }, l.onError = function (e, i) {
                        t.prototype.onError.call(this, e, i), !i.fatal && i.context && i.context.type === w.a.SUBTITLE_TRACK && i.context.id === this.trackId && i.context.groupId === this.groupId && this.retryLoadingOrFail(i)
                    }, l.loadPlaylist = function (t) {
                        var e = this.tracksInGroup[this.trackId];
                        if (this.shouldLoadTrack(e)) {
                            var i = e.id,
                                r = e.groupId,
                                n = e.url;
                            if (t) try {
                                n = t.addDirectives(n)
                            } catch (t) {
                                this.warn("Could not construct new URL with HLS Delivery Directives: " + t)
                            }
                            this.log("Loading subtitle playlist for id " + i), this.hls.trigger(s.a.SUBTITLE_TRACK_LOADING, {
                                url: n,
                                id: i,
                                groupId: r,
                                deliveryDirectives: t || null
                            })
                        }
                    }, l.toggleTrackModes = function (t) {
                        var e = this,
                            i = this.media,
                            r = this.trackId;
                        if (i) {
                            var n = Ie(i.textTracks),
                                a = n.filter((function (t) {
                                    return t.groupId === e.groupId
                                }));
                            if (-1 === t)[].slice.call(n).forEach((function (t) {
                                t.mode = "disabled"
                            }));
                            else {
                                var s = a[r];
                                s && (s.mode = "disabled")
                            }
                            var o = a[t];
                            o && (o.mode = this.subtitleDisplay ? "showing" : "hidden")
                        }
                    }, l.setSubtitleTrack = function (t, e) {
                        var i, r = this.tracksInGroup;
                        if (this.media) {
                            if (this.trackId !== t && this.toggleTrackModes(t), !(this.trackId === t && (-1 === t || null !== (i = r[t]) && void 0 !== i && i.details) || t < -1 || t >= r.length)) {
                                this.clearTimer();
                                var n = r[t];
                                if (this.log("Switching to subtitle track " + t), this.trackId = t, n) {
                                    var a = n.id,
                                        o = n.groupId,
                                        l = void 0 === o ? "" : o,
                                        u = n.name,
                                        h = n.type,
                                        d = n.url;
                                    this.hls.trigger(s.a.SUBTITLE_TRACK_SWITCH, {
                                        id: a,
                                        groupId: l,
                                        name: u,
                                        type: h,
                                        url: d
                                    });
                                    var c = this.switchParams(n.url, null == e ? void 0 : e.details);
                                    this.loadPlaylist(c)
                                } else this.hls.trigger(s.a.SUBTITLE_TRACK_SWITCH, {
                                    id: t
                                })
                            }
                        } else this.queuedDefaultTrack = t
                    }, l.onTextTracksChanged = function () {
                        if (this.useTextTrackPolling || self.clearInterval(this.subtitlePollingInterval), this.media && this.hls.config.renderTextTracksNatively) {
                            for (var t = -1, e = Ie(this.media.textTracks), i = 0; i < e.length; i++)
                                if ("hidden" === e[i].mode) t = i;
                                else if ("showing" === e[i].mode) {
                                t = i;
                                break
                            }
                            this.subtitleTrack !== t && (this.subtitleTrack = t)
                        }
                    }, n = r, (a = [{
                        key: "subtitleDisplay",
                        get: function () {
                            return this._subtitleDisplay
                        },
                        set: function (t) {
                            this._subtitleDisplay = t, this.trackId > -1 && this.toggleTrackModes(this.trackId)
                        }
                    }, {
                        key: "subtitleTracks",
                        get: function () {
                            return this.tracksInGroup
                        }
                    }, {
                        key: "subtitleTrack",
                        get: function () {
                            return this.trackId
                        },
                        set: function (t) {
                            this.selectDefaultTrack = !1;
                            var e = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0;
                            this.setSubtitleTrack(t, e)
                        }
                    }]) && ke(n.prototype, a), o && ke(n, o), Object.defineProperty(n, "prototype", {
                        writable: !1
                    }), r
                }(at),
                we = function () {
                    function t(t) {
                        this.buffers = void 0, this.queues = {
                            video: [],
                            audio: [],
                            audiovideo: []
                        }, this.buffers = t
                    }
                    var e = t.prototype;
                    return e.append = function (t, e) {
                        var i = this.queues[e];
                        i.push(t), 1 === i.length && this.buffers[e] && this.executeNext(e)
                    }, e.insertAbort = function (t, e) {
                        this.queues[e].unshift(t), this.executeNext(e)
                    }, e.appendBlocker = function (t) {
                        var e, i = new Promise((function (t) {
                                e = t
                            })),
                            r = {
                                execute: e,
                                onStart: function () {},
                                onComplete: function () {},
                                onError: function () {}
                            };
                        return this.append(r, t), i
                    }, e.executeNext = function (t) {
                        var e = this.buffers,
                            i = this.queues,
                            r = e[t],
                            n = i[t];
                        if (n.length) {
                            var a = n[0];
                            try {
                                a.execute()
                            } catch (e) {
                                l.b.warn("[buffer-operation-queue]: Unhandled exception executing the current operation"), a.onError(e), r && r.updating || (n.shift(), this.executeNext(t))
                            }
                        }
                    }, e.shiftAndExecuteNext = function (t) {
                        this.queues[t].shift(), this.executeNext(t)
                    }, e.current = function (t) {
                        return this.queues[t][0]
                    }, t
                }(),
                xe = ee(),
                Pe = /([ha]vc.)(?:\.[^.,]+)+/,
                Fe = function () {
                    function t(t) {
                        var e = this;
                        this.details = null, this._objectUrl = null, this.operationQueue = void 0, this.listeners = void 0, this.hls = void 0, this.bufferCodecEventsExpected = 0, this._bufferCodecEventsTotal = 0, this.media = null, this.mediaSource = null, this.appendError = 0, this.tracks = {}, this.pendingTracks = {}, this.sourceBuffer = void 0, this._onMediaSourceOpen = function () {
                            var t = e.hls,
                                i = e.media,
                                r = e.mediaSource;
                            l.b.log("[buffer-controller]: Media source opened"), i && (e.updateMediaElementDuration(), t.trigger(s.a.MEDIA_ATTACHED, {
                                media: i
                            })), r && r.removeEventListener("sourceopen", e._onMediaSourceOpen), e.checkPendingTracks()
                        }, this._onMediaSourceClose = function () {
                            l.b.log("[buffer-controller]: Media source closed")
                        }, this._onMediaSourceEnded = function () {
                            l.b.log("[buffer-controller]: Media source ended")
                        }, this.hls = t, this._initSourceBuffer(), this.registerListeners()
                    }
                    var e = t.prototype;
                    return e.hasSourceTypes = function () {
                        return this.getSourceBufferTypes().length > 0 || Object.keys(this.pendingTracks).length > 0
                    }, e.destroy = function () {
                        this.unregisterListeners(), this.details = null
                    }, e.registerListeners = function () {
                        var t = this.hls;
                        t.on(s.a.MEDIA_ATTACHING, this.onMediaAttaching, this), t.on(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.a.MANIFEST_PARSED, this.onManifestParsed, this), t.on(s.a.BUFFER_RESET, this.onBufferReset, this), t.on(s.a.BUFFER_APPENDING, this.onBufferAppending, this), t.on(s.a.BUFFER_CODECS, this.onBufferCodecs, this), t.on(s.a.BUFFER_EOS, this.onBufferEos, this), t.on(s.a.BUFFER_FLUSHING, this.onBufferFlushing, this), t.on(s.a.LEVEL_UPDATED, this.onLevelUpdated, this), t.on(s.a.FRAG_PARSED, this.onFragParsed, this), t.on(s.a.FRAG_CHANGED, this.onFragChanged, this)
                    }, e.unregisterListeners = function () {
                        var t = this.hls;
                        t.off(s.a.MEDIA_ATTACHING, this.onMediaAttaching, this), t.off(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.a.MANIFEST_PARSED, this.onManifestParsed, this), t.off(s.a.BUFFER_RESET, this.onBufferReset, this), t.off(s.a.BUFFER_APPENDING, this.onBufferAppending, this), t.off(s.a.BUFFER_CODECS, this.onBufferCodecs, this), t.off(s.a.BUFFER_EOS, this.onBufferEos, this), t.off(s.a.BUFFER_FLUSHING, this.onBufferFlushing, this), t.off(s.a.LEVEL_UPDATED, this.onLevelUpdated, this), t.off(s.a.FRAG_PARSED, this.onFragParsed, this), t.off(s.a.FRAG_CHANGED, this.onFragChanged, this)
                    }, e._initSourceBuffer = function () {
                        this.sourceBuffer = {}, this.operationQueue = new we(this.sourceBuffer), this.listeners = {
                            audio: [],
                            video: [],
                            audiovideo: []
                        }
                    }, e.onManifestParsed = function (t, e) {
                        var i = 2;
                        (e.audio && !e.video || !e.altAudio) && (i = 1), this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = i, this.details = null, l.b.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected")
                    }, e.onMediaAttaching = function (t, e) {
                        var i = this.media = e.media;
                        if (i && xe) {
                            var r = this.mediaSource = new xe;
                            r.addEventListener("sourceopen", this._onMediaSourceOpen), r.addEventListener("sourceended", this._onMediaSourceEnded), r.addEventListener("sourceclose", this._onMediaSourceClose), i.src = self.URL.createObjectURL(r), this._objectUrl = i.src
                        }
                    }, e.onMediaDetaching = function () {
                        var t = this.media,
                            e = this.mediaSource,
                            i = this._objectUrl;
                        if (e) {
                            if (l.b.log("[buffer-controller]: media source detaching"), "open" === e.readyState) try {
                                e.endOfStream()
                            } catch (t) {
                                l.b.warn("[buffer-controller]: onMediaDetaching: " + t.message + " while calling endOfStream")
                            }
                            this.onBufferReset(), e.removeEventListener("sourceopen", this._onMediaSourceOpen), e.removeEventListener("sourceended", this._onMediaSourceEnded), e.removeEventListener("sourceclose", this._onMediaSourceClose), t && (i && self.URL.revokeObjectURL(i), t.src === i ? (t.removeAttribute("src"), t.load()) : l.b.warn("[buffer-controller]: media.src was changed by a third party - skip cleanup")), this.mediaSource = null, this.media = null, this._objectUrl = null, this.bufferCodecEventsExpected = this._bufferCodecEventsTotal, this.pendingTracks = {}, this.tracks = {}
                        }
                        this.hls.trigger(s.a.MEDIA_DETACHED, void 0)
                    }, e.onBufferReset = function () {
                        var t = this;
                        this.getSourceBufferTypes().forEach((function (e) {
                            var i = t.sourceBuffer[e];
                            try {
                                i && (t.removeBufferListeners(e), t.mediaSource && t.mediaSource.removeSourceBuffer(i), t.sourceBuffer[e] = void 0)
                            } catch (t) {
                                l.b.warn("[buffer-controller]: Failed to reset the " + e + " buffer", t)
                            }
                        })), this._initSourceBuffer()
                    }, e.onBufferCodecs = function (t, e) {
                        var i = this,
                            r = this.getSourceBufferTypes().length;
                        Object.keys(e).forEach((function (t) {
                            if (r) {
                                var n = i.tracks[t];
                                if (n && "function" == typeof n.buffer.changeType) {
                                    var a = e[t],
                                        s = a.id,
                                        o = a.codec,
                                        u = a.levelCodec,
                                        h = a.container,
                                        d = a.metadata,
                                        c = (n.levelCodec || n.codec).replace(Pe, "$1"),
                                        f = (u || o).replace(Pe, "$1");
                                    if (c !== f) {
                                        var g = h + ";codecs=" + (u || o);
                                        i.appendChangeType(t, g), l.b.log("[buffer-controller]: switching codec " + c + " to " + f), i.tracks[t] = {
                                            buffer: n.buffer,
                                            codec: o,
                                            container: h,
                                            levelCodec: u,
                                            metadata: d,
                                            id: s
                                        }
                                    }
                                }
                            } else i.pendingTracks[t] = e[t]
                        })), r || (this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0), this.mediaSource && "open" === this.mediaSource.readyState && this.checkPendingTracks())
                    }, e.appendChangeType = function (t, e) {
                        var i = this,
                            r = this.operationQueue,
                            n = {
                                execute: function () {
                                    var n = i.sourceBuffer[t];
                                    n && (l.b.log("[buffer-controller]: changing " + t + " sourceBuffer type to " + e), n.changeType(e)), r.shiftAndExecuteNext(t)
                                },
                                onStart: function () {},
                                onComplete: function () {},
                                onError: function (e) {
                                    l.b.warn("[buffer-controller]: Failed to change " + t + " SourceBuffer type", e)
                                }
                            };
                        r.append(n, t)
                    }, e.onBufferAppending = function (t, e) {
                        var i = this,
                            r = this.hls,
                            n = this.operationQueue,
                            a = this.tracks,
                            u = e.data,
                            h = e.type,
                            d = e.frag,
                            c = e.part,
                            f = e.chunkMeta,
                            g = f.buffering[h],
                            v = self.performance.now();
                        g.start = v;
                        var p = d.stats.buffering,
                            m = c ? c.stats.buffering : null;
                        0 === p.start && (p.start = v), m && 0 === m.start && (m.start = v);
                        var y = a.audio,
                            T = "audio" === h && 1 === f.id && "audio/mpeg" === (null == y ? void 0 : y.container),
                            b = {
                                execute: function () {
                                    if (g.executeStart = self.performance.now(), T) {
                                        var t = i.sourceBuffer[h];
                                        if (t) {
                                            var e = d.start - t.timestampOffset;
                                            Math.abs(e) >= .1 && (l.b.log("[buffer-controller]: Updating audio SourceBuffer timestampOffset to " + d.start + " (delta: " + e + ") sn: " + d.sn + ")"), t.timestampOffset = d.start)
                                        }
                                    }
                                    i.appendExecutor(u, h)
                                },
                                onStart: function () {},
                                onComplete: function () {
                                    var t = self.performance.now();
                                    g.executeEnd = g.end = t, 0 === p.first && (p.first = t), m && 0 === m.first && (m.first = t);
                                    var e = i.sourceBuffer,
                                        r = {};
                                    for (var n in e) r[n] = mt.getBuffered(e[n]);
                                    i.appendError = 0, i.hls.trigger(s.a.BUFFER_APPENDED, {
                                        type: h,
                                        frag: d,
                                        part: c,
                                        chunkMeta: f,
                                        parent: d.type,
                                        timeRanges: r
                                    })
                                },
                                onError: function (t) {
                                    l.b.error("[buffer-controller]: Error encountered while trying to append to the " + h + " SourceBuffer", t);
                                    var e = {
                                        type: o.b.MEDIA_ERROR,
                                        parent: d.type,
                                        details: o.a.BUFFER_APPEND_ERROR,
                                        err: t,
                                        fatal: !1
                                    };
                                    t.code === DOMException.QUOTA_EXCEEDED_ERR ? e.details = o.a.BUFFER_FULL_ERROR : (i.appendError++, e.details = o.a.BUFFER_APPEND_ERROR, i.appendError > r.config.appendErrorMaxRetry && (l.b.error("[buffer-controller]: Failed " + r.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"), e.fatal = !0, r.stopLoad())), r.trigger(s.a.ERROR, e)
                                }
                            };
                        n.append(b, h)
                    }, e.onBufferFlushing = function (t, e) {
                        var i = this,
                            r = this.operationQueue,
                            n = function (t) {
                                return {
                                    execute: i.removeExecutor.bind(i, t, e.startOffset, e.endOffset),
                                    onStart: function () {},
                                    onComplete: function () {
                                        i.hls.trigger(s.a.BUFFER_FLUSHED, {
                                            type: t
                                        })
                                    },
                                    onError: function (e) {
                                        l.b.warn("[buffer-controller]: Failed to remove from " + t + " SourceBuffer", e)
                                    }
                                }
                            };
                        e.type ? r.append(n(e.type), e.type) : this.getSourceBufferTypes().forEach((function (t) {
                            r.append(n(t), t)
                        }))
                    }, e.onFragParsed = function (t, e) {
                        var i = this,
                            r = e.frag,
                            n = e.part,
                            a = [],
                            o = n ? n.elementaryStreams : r.elementaryStreams;
                        o[p.a.AUDIOVIDEO] ? a.push("audiovideo") : (o[p.a.AUDIO] && a.push("audio"), o[p.a.VIDEO] && a.push("video"));
                        0 === a.length && l.b.warn("Fragments must have at least one ElementaryStreamType set. type: " + r.type + " level: " + r.level + " sn: " + r.sn), this.blockBuffers((function () {
                            var t = self.performance.now();
                            r.stats.buffering.end = t, n && (n.stats.buffering.end = t);
                            var e = n ? n.stats : r.stats;
                            i.hls.trigger(s.a.FRAG_BUFFERED, {
                                frag: r,
                                part: n,
                                stats: e,
                                id: r.type
                            })
                        }), a)
                    }, e.onFragChanged = function (t, e) {
                        this.flushBackBuffer()
                    }, e.onBufferEos = function (t, e) {
                        var i = this;
                        this.getSourceBufferTypes().reduce((function (t, r) {
                            var n = i.sourceBuffer[r];
                            return e.type && e.type !== r || n && !n.ended && (n.ended = !0, l.b.log("[buffer-controller]: " + r + " sourceBuffer now EOS")), t && !(n && !n.ended)
                        }), !0) && this.blockBuffers((function () {
                            var t = i.mediaSource;
                            t && "open" === t.readyState && t.endOfStream()
                        }))
                    }, e.onLevelUpdated = function (t, e) {
                        var i = e.details;
                        i.fragments.length && (this.details = i, this.getSourceBufferTypes().length ? this.blockBuffers(this.updateMediaElementDuration.bind(this)) : this.updateMediaElementDuration())
                    }, e.flushBackBuffer = function () {
                        var t = this.hls,
                            e = this.details,
                            i = this.media,
                            r = this.sourceBuffer;
                        if (i && null !== e) {
                            var n = this.getSourceBufferTypes();
                            if (n.length) {
                                var o = e.live && null !== t.config.liveBackBufferLength ? t.config.liveBackBufferLength : t.config.backBufferLength;
                                if (Object(a.a)(o) && !(o < 0)) {
                                    var l = i.currentTime,
                                        u = e.levelTargetDuration,
                                        h = Math.max(o, u),
                                        d = Math.floor(l / u) * u - h;
                                    n.forEach((function (i) {
                                        var n = r[i];
                                        if (n) {
                                            var a = mt.getBuffered(n);
                                            a.length > 0 && d > a.start(0) && (t.trigger(s.a.BACK_BUFFER_REACHED, {
                                                bufferEnd: d
                                            }), e.live && t.trigger(s.a.LIVE_BACK_BUFFER_REACHED, {
                                                bufferEnd: d
                                            }), t.trigger(s.a.BUFFER_FLUSHING, {
                                                startOffset: 0,
                                                endOffset: d,
                                                type: i
                                            }))
                                        }
                                    }))
                                }
                            }
                        }
                    }, e.updateMediaElementDuration = function () {
                        if (this.details && this.media && this.mediaSource && "open" === this.mediaSource.readyState) {
                            var t = this.details,
                                e = this.hls,
                                i = this.media,
                                r = this.mediaSource,
                                n = t.fragments[0].start + t.totalduration,
                                s = i.duration,
                                o = Object(a.a)(r.duration) ? r.duration : 0;
                            t.live && e.config.liveDurationInfinity ? (l.b.log("[buffer-controller]: Media Source duration is set to Infinity"), r.duration = 1 / 0, this.updateSeekableRange(t)) : (n > o && n > s || !Object(a.a)(s)) && (l.b.log("[buffer-controller]: Updating Media Source duration to " + n.toFixed(3)), r.duration = n)
                        }
                    }, e.updateSeekableRange = function (t) {
                        var e = this.mediaSource,
                            i = t.fragments;
                        if (i.length && t.live && null != e && e.setLiveSeekableRange) {
                            var r = Math.max(0, i[0].start),
                                n = Math.max(r, r + t.totalduration);
                            e.setLiveSeekableRange(r, n)
                        }
                    }, e.checkPendingTracks = function () {
                        var t = this.bufferCodecEventsExpected,
                            e = this.operationQueue,
                            i = this.pendingTracks,
                            r = Object.keys(i).length;
                        if (r && !t || 2 === r) {
                            this.createSourceBuffers(i), this.pendingTracks = {};
                            var n = this.getSourceBufferTypes();
                            if (0 === n.length) return void this.hls.trigger(s.a.ERROR, {
                                type: o.b.MEDIA_ERROR,
                                details: o.a.BUFFER_INCOMPATIBLE_CODECS_ERROR,
                                fatal: !0,
                                reason: "could not create source buffer for media codec(s)"
                            });
                            n.forEach((function (t) {
                                e.executeNext(t)
                            }))
                        }
                    }, e.createSourceBuffers = function (t) {
                        var e = this.sourceBuffer,
                            i = this.mediaSource;
                        if (!i) throw Error("createSourceBuffers called when mediaSource was null");
                        var r = 0;
                        for (var n in t)
                            if (!e[n]) {
                                var a = t[n];
                                if (!a) throw Error("source buffer exists for track " + n + ", however track does not");
                                var u = a.levelCodec || a.codec,
                                    h = a.container + ";codecs=" + u;
                                l.b.log("[buffer-controller]: creating sourceBuffer(" + h + ")");
                                try {
                                    var d = e[n] = i.addSourceBuffer(h),
                                        c = n;
                                    this.addBufferListener(c, "updatestart", this._onSBUpdateStart), this.addBufferListener(c, "updateend", this._onSBUpdateEnd), this.addBufferListener(c, "error", this._onSBUpdateError), this.tracks[n] = {
                                        buffer: d,
                                        codec: u,
                                        container: a.container,
                                        levelCodec: a.levelCodec,
                                        metadata: a.metadata,
                                        id: a.id
                                    }, r++
                                } catch (t) {
                                    l.b.error("[buffer-controller]: error while trying to add sourceBuffer: " + t.message), this.hls.trigger(s.a.ERROR, {
                                        type: o.b.MEDIA_ERROR,
                                        details: o.a.BUFFER_ADD_CODEC_ERROR,
                                        fatal: !1,
                                        error: t,
                                        mimeType: h
                                    })
                                }
                            } r && this.hls.trigger(s.a.BUFFER_CREATED, {
                            tracks: this.tracks
                        })
                    }, e._onSBUpdateStart = function (t) {
                        this.operationQueue.current(t).onStart()
                    }, e._onSBUpdateEnd = function (t) {
                        var e = this.operationQueue;
                        e.current(t).onComplete(), e.shiftAndExecuteNext(t)
                    }, e._onSBUpdateError = function (t, e) {
                        l.b.error("[buffer-controller]: " + t + " SourceBuffer error", e), this.hls.trigger(s.a.ERROR, {
                            type: o.b.MEDIA_ERROR,
                            details: o.a.BUFFER_APPENDING_ERROR,
                            fatal: !1
                        });
                        var i = this.operationQueue.current(t);
                        i && i.onError(e)
                    }, e.removeExecutor = function (t, e, i) {
                        var r = this.media,
                            n = this.mediaSource,
                            s = this.operationQueue,
                            o = this.sourceBuffer[t];
                        if (!r || !n || !o) return l.b.warn("[buffer-controller]: Attempting to remove from the " + t + " SourceBuffer, but it does not exist"), void s.shiftAndExecuteNext(t);
                        var u = Object(a.a)(r.duration) ? r.duration : 1 / 0,
                            h = Object(a.a)(n.duration) ? n.duration : 1 / 0,
                            d = Math.max(0, e),
                            c = Math.min(i, u, h);
                        c > d ? (l.b.log("[buffer-controller]: Removing [" + d + "," + c + "] from the " + t + " SourceBuffer"), o.remove(d, c)) : s.shiftAndExecuteNext(t)
                    }, e.appendExecutor = function (t, e) {
                        var i = this.operationQueue,
                            r = this.sourceBuffer[e];
                        if (!r) return l.b.warn("[buffer-controller]: Attempting to append to the " + e + " SourceBuffer, but it does not exist"), void i.shiftAndExecuteNext(e);
                        r.ended = !1, r.appendBuffer(t)
                    }, e.blockBuffers = function (t, e) {
                        var i = this;
                        if (void 0 === e && (e = this.getSourceBufferTypes()), !e.length) return l.b.log("[buffer-controller]: Blocking operation requested, but no SourceBuffers exist"), void Promise.resolve().then(t);
                        var r = this.operationQueue,
                            n = e.map((function (t) {
                                return r.appendBlocker(t)
                            }));
                        Promise.all(n).then((function () {
                            t(), e.forEach((function (t) {
                                var e = i.sourceBuffer[t];
                                e && e.updating || r.shiftAndExecuteNext(t)
                            }))
                        }))
                    }, e.getSourceBufferTypes = function () {
                        return Object.keys(this.sourceBuffer)
                    }, e.addBufferListener = function (t, e, i) {
                        var r = this.sourceBuffer[t];
                        if (r) {
                            var n = i.bind(this, t);
                            this.listeners[t].push({
                                event: e,
                                listener: n
                            }), r.addEventListener(e, n)
                        }
                    }, e.removeBufferListeners = function (t) {
                        var e = this.sourceBuffer[t];
                        e && this.listeners[t].forEach((function (t) {
                            e.removeEventListener(t.event, t.listener)
                        }))
                    }, t
                }(),
                Me = {
                    42: 225,
                    92: 233,
                    94: 237,
                    95: 243,
                    96: 250,
                    123: 231,
                    124: 247,
                    125: 209,
                    126: 241,
                    127: 9608,
                    128: 174,
                    129: 176,
                    130: 189,
                    131: 191,
                    132: 8482,
                    133: 162,
                    134: 163,
                    135: 9834,
                    136: 224,
                    137: 32,
                    138: 232,
                    139: 226,
                    140: 234,
                    141: 238,
                    142: 244,
                    143: 251,
                    144: 193,
                    145: 201,
                    146: 211,
                    147: 218,
                    148: 220,
                    149: 252,
                    150: 8216,
                    151: 161,
                    152: 42,
                    153: 8217,
                    154: 9473,
                    155: 169,
                    156: 8480,
                    157: 8226,
                    158: 8220,
                    159: 8221,
                    160: 192,
                    161: 194,
                    162: 199,
                    163: 200,
                    164: 202,
                    165: 203,
                    166: 235,
                    167: 206,
                    168: 207,
                    169: 239,
                    170: 212,
                    171: 217,
                    172: 249,
                    173: 219,
                    174: 171,
                    175: 187,
                    176: 195,
                    177: 227,
                    178: 205,
                    179: 204,
                    180: 236,
                    181: 210,
                    182: 242,
                    183: 213,
                    184: 245,
                    185: 123,
                    186: 125,
                    187: 92,
                    188: 94,
                    189: 95,
                    190: 124,
                    191: 8764,
                    192: 196,
                    193: 228,
                    194: 214,
                    195: 246,
                    196: 223,
                    197: 165,
                    198: 164,
                    199: 9475,
                    200: 197,
                    201: 229,
                    202: 216,
                    203: 248,
                    204: 9487,
                    205: 9491,
                    206: 9495,
                    207: 9499
                },
                Ne = function (t) {
                    var e = t;
                    return Me.hasOwnProperty(t) && (e = Me[t]), String.fromCharCode(e)
                },
                Ue = {
                    17: 1,
                    18: 3,
                    21: 5,
                    22: 7,
                    23: 9,
                    16: 11,
                    19: 12,
                    20: 14
                },
                Be = {
                    17: 2,
                    18: 4,
                    21: 6,
                    22: 8,
                    23: 10,
                    19: 13,
                    20: 15
                },
                Ge = {
                    25: 1,
                    26: 3,
                    29: 5,
                    30: 7,
                    31: 9,
                    24: 11,
                    27: 12,
                    28: 14
                },
                je = {
                    25: 2,
                    26: 4,
                    29: 6,
                    30: 8,
                    31: 10,
                    27: 13,
                    28: 15
                },
                Ke = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"];
            ! function (t) {
                t[t.ERROR = 0] = "ERROR", t[t.TEXT = 1] = "TEXT", t[t.WARNING = 2] = "WARNING", t[t.INFO = 2] = "INFO", t[t.DEBUG = 3] = "DEBUG", t[t.DATA = 3] = "DATA"
            }(Oe || (Oe = {}));
            var He = function () {
                    function t() {
                        this.time = null, this.verboseLevel = Oe.ERROR
                    }
                    return t.prototype.log = function (t, e) {
                        this.verboseLevel >= t && l.b.log(this.time + " [" + t + "] " + e)
                    }, t
                }(),
                Ve = function (t) {
                    for (var e = [], i = 0; i < t.length; i++) e.push(t[i].toString(16));
                    return e
                },
                We = function () {
                    function t(t, e, i, r, n) {
                        this.foreground = void 0, this.underline = void 0, this.italics = void 0, this.background = void 0, this.flash = void 0, this.foreground = t || "white", this.underline = e || !1, this.italics = i || !1, this.background = r || "black", this.flash = n || !1
                    }
                    var e = t.prototype;
                    return e.reset = function () {
                        this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1
                    }, e.setStyles = function (t) {
                        for (var e = ["foreground", "underline", "italics", "background", "flash"], i = 0; i < e.length; i++) {
                            var r = e[i];
                            t.hasOwnProperty(r) && (this[r] = t[r])
                        }
                    }, e.isDefault = function () {
                        return "white" === this.foreground && !this.underline && !this.italics && "black" === this.background && !this.flash
                    }, e.equals = function (t) {
                        return this.foreground === t.foreground && this.underline === t.underline && this.italics === t.italics && this.background === t.background && this.flash === t.flash
                    }, e.copy = function (t) {
                        this.foreground = t.foreground, this.underline = t.underline, this.italics = t.italics, this.background = t.background, this.flash = t.flash
                    }, e.toString = function () {
                        return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash
                    }, t
                }(),
                Ye = function () {
                    function t(t, e, i, r, n, a) {
                        this.uchar = void 0, this.penState = void 0, this.uchar = t || " ", this.penState = new We(e, i, r, n, a)
                    }
                    var e = t.prototype;
                    return e.reset = function () {
                        this.uchar = " ", this.penState.reset()
                    }, e.setChar = function (t, e) {
                        this.uchar = t, this.penState.copy(e)
                    }, e.setPenState = function (t) {
                        this.penState.copy(t)
                    }, e.equals = function (t) {
                        return this.uchar === t.uchar && this.penState.equals(t.penState)
                    }, e.copy = function (t) {
                        this.uchar = t.uchar, this.penState.copy(t.penState)
                    }, e.isEmpty = function () {
                        return " " === this.uchar && this.penState.isDefault()
                    }, t
                }(),
                qe = function () {
                    function t(t) {
                        this.chars = void 0, this.pos = void 0, this.currPenState = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chars = [];
                        for (var e = 0; e < 100; e++) this.chars.push(new Ye);
                        this.logger = t, this.pos = 0, this.currPenState = new We
                    }
                    var e = t.prototype;
                    return e.equals = function (t) {
                        for (var e = !0, i = 0; i < 100; i++)
                            if (!this.chars[i].equals(t.chars[i])) {
                                e = !1;
                                break
                            } return e
                    }, e.copy = function (t) {
                        for (var e = 0; e < 100; e++) this.chars[e].copy(t.chars[e])
                    }, e.isEmpty = function () {
                        for (var t = !0, e = 0; e < 100; e++)
                            if (!this.chars[e].isEmpty()) {
                                t = !1;
                                break
                            } return t
                    }, e.setCursor = function (t) {
                        this.pos !== t && (this.pos = t), this.pos < 0 ? (this.logger.log(Oe.DEBUG, "Negative cursor position " + this.pos), this.pos = 0) : this.pos > 100 && (this.logger.log(Oe.DEBUG, "Too large cursor position " + this.pos), this.pos = 100)
                    }, e.moveCursor = function (t) {
                        var e = this.pos + t;
                        if (t > 1)
                            for (var i = this.pos + 1; i < e + 1; i++) this.chars[i].setPenState(this.currPenState);
                        this.setCursor(e)
                    }, e.backSpace = function () {
                        this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState)
                    }, e.insertChar = function (t) {
                        t >= 144 && this.backSpace();
                        var e = Ne(t);
                        this.pos >= 100 ? this.logger.log(Oe.ERROR, "Cannot insert " + t.toString(16) + " (" + e + ") at position " + this.pos + ". Skipping it!") : (this.chars[this.pos].setChar(e, this.currPenState), this.moveCursor(1))
                    }, e.clearFromPos = function (t) {
                        var e;
                        for (e = t; e < 100; e++) this.chars[e].reset()
                    }, e.clear = function () {
                        this.clearFromPos(0), this.pos = 0, this.currPenState.reset()
                    }, e.clearToEndOfRow = function () {
                        this.clearFromPos(this.pos)
                    }, e.getTextString = function () {
                        for (var t = [], e = !0, i = 0; i < 100; i++) {
                            var r = this.chars[i].uchar;
                            " " !== r && (e = !1), t.push(r)
                        }
                        return e ? "" : t.join("")
                    }, e.setPenStyles = function (t) {
                        this.currPenState.setStyles(t), this.chars[this.pos].setPenState(this.currPenState)
                    }, t
                }(),
                ze = function () {
                    function t(t) {
                        this.rows = void 0, this.currRow = void 0, this.nrRollUpRows = void 0, this.lastOutputScreen = void 0, this.logger = void 0, this.rows = [];
                        for (var e = 0; e < 15; e++) this.rows.push(new qe(t));
                        this.logger = t, this.currRow = 14, this.nrRollUpRows = null, this.lastOutputScreen = null, this.reset()
                    }
                    var e = t.prototype;
                    return e.reset = function () {
                        for (var t = 0; t < 15; t++) this.rows[t].clear();
                        this.currRow = 14
                    }, e.equals = function (t) {
                        for (var e = !0, i = 0; i < 15; i++)
                            if (!this.rows[i].equals(t.rows[i])) {
                                e = !1;
                                break
                            } return e
                    }, e.copy = function (t) {
                        for (var e = 0; e < 15; e++) this.rows[e].copy(t.rows[e])
                    }, e.isEmpty = function () {
                        for (var t = !0, e = 0; e < 15; e++)
                            if (!this.rows[e].isEmpty()) {
                                t = !1;
                                break
                            } return t
                    }, e.backSpace = function () {
                        this.rows[this.currRow].backSpace()
                    }, e.clearToEndOfRow = function () {
                        this.rows[this.currRow].clearToEndOfRow()
                    }, e.insertChar = function (t) {
                        this.rows[this.currRow].insertChar(t)
                    }, e.setPen = function (t) {
                        this.rows[this.currRow].setPenStyles(t)
                    }, e.moveCursor = function (t) {
                        this.rows[this.currRow].moveCursor(t)
                    }, e.setCursor = function (t) {
                        this.logger.log(Oe.INFO, "setCursor: " + t), this.rows[this.currRow].setCursor(t)
                    }, e.setPAC = function (t) {
                        this.logger.log(Oe.INFO, "pacData = " + JSON.stringify(t));
                        var e = t.row - 1;
                        if (this.nrRollUpRows && e < this.nrRollUpRows - 1 && (e = this.nrRollUpRows - 1), this.nrRollUpRows && this.currRow !== e) {
                            for (var i = 0; i < 15; i++) this.rows[i].clear();
                            var r = this.currRow + 1 - this.nrRollUpRows,
                                n = this.lastOutputScreen;
                            if (n) {
                                var a = n.rows[r].cueStartTime,
                                    s = this.logger.time;
                                if (a && null !== s && a < s)
                                    for (var o = 0; o < this.nrRollUpRows; o++) this.rows[e - this.nrRollUpRows + o + 1].copy(n.rows[r + o])
                            }
                        }
                        this.currRow = e;
                        var l = this.rows[this.currRow];
                        if (null !== t.indent) {
                            var u = t.indent,
                                h = Math.max(u - 1, 0);
                            l.setCursor(t.indent), t.color = l.chars[h].penState.foreground
                        }
                        var d = {
                            foreground: t.color,
                            underline: t.underline,
                            italics: t.italics,
                            background: "black",
                            flash: !1
                        };
                        this.setPen(d)
                    }, e.setBkgData = function (t) {
                        this.logger.log(Oe.INFO, "bkgData = " + JSON.stringify(t)), this.backSpace(), this.setPen(t), this.insertChar(32)
                    }, e.setRollUpRows = function (t) {
                        this.nrRollUpRows = t
                    }, e.rollUp = function () {
                        if (null !== this.nrRollUpRows) {
                            this.logger.log(Oe.TEXT, this.getDisplayText());
                            var t = this.currRow + 1 - this.nrRollUpRows,
                                e = this.rows.splice(t, 1)[0];
                            e.clear(), this.rows.splice(this.currRow, 0, e), this.logger.log(Oe.INFO, "Rolling up")
                        } else this.logger.log(Oe.DEBUG, "roll_up but nrRollUpRows not set yet")
                    }, e.getDisplayText = function (t) {
                        t = t || !1;
                        for (var e = [], i = "", r = -1, n = 0; n < 15; n++) {
                            var a = this.rows[n].getTextString();
                            a && (r = n + 1, t ? e.push("Row " + r + ": '" + a + "'") : e.push(a.trim()))
                        }
                        return e.length > 0 && (i = t ? "[" + e.join(" | ") + "]" : e.join("\n")), i
                    }, e.getTextAndFormat = function () {
                        return this.rows
                    }, t
                }(),
                Xe = function () {
                    function t(t, e, i) {
                        this.chNr = void 0, this.outputFilter = void 0, this.mode = void 0, this.verbose = void 0, this.displayedMemory = void 0, this.nonDisplayedMemory = void 0, this.lastOutputScreen = void 0, this.currRollUpRow = void 0, this.writeScreen = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chNr = t, this.outputFilter = e, this.mode = null, this.verbose = 0, this.displayedMemory = new ze(i), this.nonDisplayedMemory = new ze(i), this.lastOutputScreen = new ze(i), this.currRollUpRow = this.displayedMemory.rows[14], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.logger = i
                    }
                    var e = t.prototype;
                    return e.reset = function () {
                        this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.outputFilter.reset(), this.currRollUpRow = this.displayedMemory.rows[14], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null
                    }, e.getHandler = function () {
                        return this.outputFilter
                    }, e.setHandler = function (t) {
                        this.outputFilter = t
                    }, e.setPAC = function (t) {
                        this.writeScreen.setPAC(t)
                    }, e.setBkgData = function (t) {
                        this.writeScreen.setBkgData(t)
                    }, e.setMode = function (t) {
                        t !== this.mode && (this.mode = t, this.logger.log(Oe.INFO, "MODE=" + t), "MODE_POP-ON" === this.mode ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), "MODE_ROLL-UP" !== this.mode && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = t)
                    }, e.insertChars = function (t) {
                        for (var e = 0; e < t.length; e++) this.writeScreen.insertChar(t[e]);
                        var i = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
                        this.logger.log(Oe.INFO, i + ": " + this.writeScreen.getDisplayText(!0)), "MODE_PAINT-ON" !== this.mode && "MODE_ROLL-UP" !== this.mode || (this.logger.log(Oe.TEXT, "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)), this.outputDataUpdate())
                    }, e.ccRCL = function () {
                        this.logger.log(Oe.INFO, "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON")
                    }, e.ccBS = function () {
                        this.logger.log(Oe.INFO, "BS - BackSpace"), "MODE_TEXT" !== this.mode && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate())
                    }, e.ccAOF = function () {}, e.ccAON = function () {}, e.ccDER = function () {
                        this.logger.log(Oe.INFO, "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate()
                    }, e.ccRU = function (t) {
                        this.logger.log(Oe.INFO, "RU(" + t + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(t)
                    }, e.ccFON = function () {
                        this.logger.log(Oe.INFO, "FON - Flash On"), this.writeScreen.setPen({
                            flash: !0
                        })
                    }, e.ccRDC = function () {
                        this.logger.log(Oe.INFO, "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON")
                    }, e.ccTR = function () {
                        this.logger.log(Oe.INFO, "TR"), this.setMode("MODE_TEXT")
                    }, e.ccRTD = function () {
                        this.logger.log(Oe.INFO, "RTD"), this.setMode("MODE_TEXT")
                    }, e.ccEDM = function () {
                        this.logger.log(Oe.INFO, "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate(!0)
                    }, e.ccCR = function () {
                        this.logger.log(Oe.INFO, "CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate(!0)
                    }, e.ccENM = function () {
                        this.logger.log(Oe.INFO, "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset()
                    }, e.ccEOC = function () {
                        if (this.logger.log(Oe.INFO, "EOC - End Of Caption"), "MODE_POP-ON" === this.mode) {
                            var t = this.displayedMemory;
                            this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = t, this.writeScreen = this.nonDisplayedMemory, this.logger.log(Oe.TEXT, "DISP: " + this.displayedMemory.getDisplayText())
                        }
                        this.outputDataUpdate(!0)
                    }, e.ccTO = function (t) {
                        this.logger.log(Oe.INFO, "TO(" + t + ") - Tab Offset"), this.writeScreen.moveCursor(t)
                    }, e.ccMIDROW = function (t) {
                        var e = {
                            flash: !1
                        };
                        if (e.underline = t % 2 == 1, e.italics = t >= 46, e.italics) e.foreground = "white";
                        else {
                            var i = Math.floor(t / 2) - 16;
                            e.foreground = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"][i]
                        }
                        this.logger.log(Oe.INFO, "MIDROW: " + JSON.stringify(e)), this.writeScreen.setPen(e)
                    }, e.outputDataUpdate = function (t) {
                        void 0 === t && (t = !1);
                        var e = this.logger.time;
                        null !== e && this.outputFilter && (null !== this.cueStartTime || this.displayedMemory.isEmpty() ? this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue(this.cueStartTime, e, this.lastOutputScreen), t && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue(), this.cueStartTime = this.displayedMemory.isEmpty() ? null : e) : this.cueStartTime = e, this.lastOutputScreen.copy(this.displayedMemory))
                    }, e.cueSplitAtTime = function (t) {
                        this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, t, this.displayedMemory), this.cueStartTime = t))
                    }, t
                }();
    
            function Qe(t, e, i) {
                i.a = t, i.b = e
            }
    
            function $e(t, e, i) {
                return i.a === t && i.b === e
            }
            var Je = function () {
                    function t(t, e, i) {
                        this.channels = void 0, this.currentChannel = 0, this.cmdHistory = void 0, this.logger = void 0;
                        var r = new He;
                        this.channels = [null, new Xe(t, e, r), new Xe(t + 1, i, r)], this.cmdHistory = {
                            a: null,
                            b: null
                        }, this.logger = r
                    }
                    var e = t.prototype;
                    return e.getHandler = function (t) {
                        return this.channels[t].getHandler()
                    }, e.setHandler = function (t, e) {
                        this.channels[t].setHandler(e)
                    }, e.addData = function (t, e) {
                        var i, r, n, a = !1;
                        this.logger.time = t;
                        for (var s = 0; s < e.length; s += 2)
                            if (r = 127 & e[s], n = 127 & e[s + 1], 0 !== r || 0 !== n) {
                                if (this.logger.log(Oe.DATA, "[" + Ve([e[s], e[s + 1]]) + "] -> (" + Ve([r, n]) + ")"), (i = this.parseCmd(r, n)) || (i = this.parseMidrow(r, n)), i || (i = this.parsePAC(r, n)), i || (i = this.parseBackgroundAttributes(r, n)), !i && (a = this.parseChars(r, n))) {
                                    var o = this.currentChannel;
                                    if (o && o > 0) this.channels[o].insertChars(a);
                                    else this.logger.log(Oe.WARNING, "No channel found yet. TEXT-MODE?")
                                }
                                i || a || this.logger.log(Oe.WARNING, "Couldn't parse cleaned data " + Ve([r, n]) + " orig: " + Ve([e[s], e[s + 1]]))
                            }
                    }, e.parseCmd = function (t, e) {
                        var i = this.cmdHistory;
                        if (!((20 === t || 28 === t || 21 === t || 29 === t) && e >= 32 && e <= 47) && !((23 === t || 31 === t) && e >= 33 && e <= 35)) return !1;
                        if ($e(t, e, i)) return Qe(null, null, i), this.logger.log(Oe.DEBUG, "Repeated command (" + Ve([t, e]) + ") is dropped"), !0;
                        var r = 20 === t || 21 === t || 23 === t ? 1 : 2,
                            n = this.channels[r];
                        return 20 === t || 21 === t || 28 === t || 29 === t ? 32 === e ? n.ccRCL() : 33 === e ? n.ccBS() : 34 === e ? n.ccAOF() : 35 === e ? n.ccAON() : 36 === e ? n.ccDER() : 37 === e ? n.ccRU(2) : 38 === e ? n.ccRU(3) : 39 === e ? n.ccRU(4) : 40 === e ? n.ccFON() : 41 === e ? n.ccRDC() : 42 === e ? n.ccTR() : 43 === e ? n.ccRTD() : 44 === e ? n.ccEDM() : 45 === e ? n.ccCR() : 46 === e ? n.ccENM() : 47 === e && n.ccEOC() : n.ccTO(e - 32), Qe(t, e, i), this.currentChannel = r, !0
                    }, e.parseMidrow = function (t, e) {
                        var i = 0;
                        if ((17 === t || 25 === t) && e >= 32 && e <= 47) {
                            if ((i = 17 === t ? 1 : 2) !== this.currentChannel) return this.logger.log(Oe.ERROR, "Mismatch channel in midrow parsing"), !1;
                            var r = this.channels[i];
                            return !!r && (r.ccMIDROW(e), this.logger.log(Oe.DEBUG, "MIDROW (" + Ve([t, e]) + ")"), !0)
                        }
                        return !1
                    }, e.parsePAC = function (t, e) {
                        var i, r = this.cmdHistory;
                        if (!((t >= 17 && t <= 23 || t >= 25 && t <= 31) && e >= 64 && e <= 127) && !((16 === t || 24 === t) && e >= 64 && e <= 95)) return !1;
                        if ($e(t, e, r)) return Qe(null, null, r), !0;
                        var n = t <= 23 ? 1 : 2;
                        i = e >= 64 && e <= 95 ? 1 === n ? Ue[t] : Ge[t] : 1 === n ? Be[t] : je[t];
                        var a = this.channels[n];
                        return !!a && (a.setPAC(this.interpretPAC(i, e)), Qe(t, e, r), this.currentChannel = n, !0)
                    }, e.interpretPAC = function (t, e) {
                        var i, r = {
                            color: null,
                            italics: !1,
                            indent: null,
                            underline: !1,
                            row: t
                        };
                        return i = e > 95 ? e - 96 : e - 64, r.underline = 1 == (1 & i), i <= 13 ? r.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(i / 2)] : i <= 15 ? (r.italics = !0, r.color = "white") : r.indent = 4 * Math.floor((i - 16) / 2), r
                    }, e.parseChars = function (t, e) {
                        var i, r, n = null,
                            a = null;
                        (t >= 25 ? (i = 2, a = t - 8) : (i = 1, a = t), a >= 17 && a <= 19) ? (r = 17 === a ? e + 80 : 18 === a ? e + 112 : e + 144, this.logger.log(Oe.INFO, "Special char '" + Ne(r) + "' in channel " + i), n = [r]) : t >= 32 && t <= 127 && (n = 0 === e ? [t] : [t, e]);
                        if (n) {
                            var s = Ve(n);
                            this.logger.log(Oe.DEBUG, "Char codes =  " + s.join(",")), Qe(t, e, this.cmdHistory)
                        }
                        return n
                    }, e.parseBackgroundAttributes = function (t, e) {
                        var i;
                        if (!((16 === t || 24 === t) && e >= 32 && e <= 47) && !((23 === t || 31 === t) && e >= 45 && e <= 47)) return !1;
                        var r = {};
                        16 === t || 24 === t ? (i = Math.floor((e - 32) / 2), r.background = Ke[i], e % 2 == 1 && (r.background = r.background + "_semi")) : 45 === e ? r.background = "transparent" : (r.foreground = "black", 47 === e && (r.underline = !0));
                        var n = t <= 23 ? 1 : 2;
                        return this.channels[n].setBkgData(r), Qe(t, e, this.cmdHistory), !0
                    }, e.reset = function () {
                        for (var t = 0; t < Object.keys(this.channels).length; t++) {
                            var e = this.channels[t];
                            e && e.reset()
                        }
                        this.cmdHistory = {
                            a: null,
                            b: null
                        }
                    }, e.cueSplitAtTime = function (t) {
                        for (var e = 0; e < this.channels.length; e++) {
                            var i = this.channels[e];
                            i && i.cueSplitAtTime(t)
                        }
                    }, t
                }(),
                Ze = function () {
                    function t(t, e) {
                        this.timelineController = void 0, this.cueRanges = [], this.trackName = void 0, this.startTime = null, this.endTime = null, this.screen = null, this.timelineController = t, this.trackName = e
                    }
                    var e = t.prototype;
                    return e.dispatchCue = function () {
                        null !== this.startTime && (this.timelineController.addCues(this.trackName, this.startTime, this.endTime, this.screen, this.cueRanges), this.startTime = null)
                    }, e.newCue = function (t, e, i) {
                        (null === this.startTime || this.startTime > t) && (this.startTime = t), this.endTime = e, this.screen = i, this.timelineController.createCaptionsTrack(this.trackName)
                    }, e.reset = function () {
                        this.cueRanges = [], this.startTime = null
                    }, t
                }(),
                ti = function () {
                    if ("undefined" != typeof self && self.VTTCue) return self.VTTCue;
                    var t = ["", "lr", "rl"],
                        e = ["start", "middle", "end", "left", "right"];
    
                    function i(t, e) {
                        if ("string" != typeof e) return !1;
                        if (!Array.isArray(t)) return !1;
                        var i = e.toLowerCase();
                        return !!~t.indexOf(i) && i
                    }
    
                    function r(t) {
                        return i(e, t)
                    }
    
                    function n(t) {
                        for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) i[r - 1] = arguments[r];
                        for (var n = 1; n < arguments.length; n++) {
                            var a = arguments[n];
                            for (var s in a) t[s] = a[s]
                        }
                        return t
                    }
    
                    function a(e, a, s) {
                        var o = this,
                            l = {
                                enumerable: !0
                            };
                        o.hasBeenReset = !1;
                        var u = "",
                            h = !1,
                            d = e,
                            c = a,
                            f = s,
                            g = null,
                            v = "",
                            p = !0,
                            m = "auto",
                            y = "start",
                            T = 50,
                            b = "middle",
                            E = 50,
                            S = "middle";
                        Object.defineProperty(o, "id", n({}, l, {
                            get: function () {
                                return u
                            },
                            set: function (t) {
                                u = "" + t
                            }
                        })), Object.defineProperty(o, "pauseOnExit", n({}, l, {
                            get: function () {
                                return h
                            },
                            set: function (t) {
                                h = !!t
                            }
                        })), Object.defineProperty(o, "startTime", n({}, l, {
                            get: function () {
                                return d
                            },
                            set: function (t) {
                                if ("number" != typeof t) throw new TypeError("Start time must be set to a number.");
                                d = t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "endTime", n({}, l, {
                            get: function () {
                                return c
                            },
                            set: function (t) {
                                if ("number" != typeof t) throw new TypeError("End time must be set to a number.");
                                c = t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "text", n({}, l, {
                            get: function () {
                                return f
                            },
                            set: function (t) {
                                f = "" + t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "region", n({}, l, {
                            get: function () {
                                return g
                            },
                            set: function (t) {
                                g = t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "vertical", n({}, l, {
                            get: function () {
                                return v
                            },
                            set: function (e) {
                                var r = function (e) {
                                    return i(t, e)
                                }(e);
                                if (!1 === r) throw new SyntaxError("An invalid or illegal string was specified.");
                                v = r, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "snapToLines", n({}, l, {
                            get: function () {
                                return p
                            },
                            set: function (t) {
                                p = !!t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "line", n({}, l, {
                            get: function () {
                                return m
                            },
                            set: function (t) {
                                if ("number" != typeof t && "auto" !== t) throw new SyntaxError("An invalid number or illegal string was specified.");
                                m = t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "lineAlign", n({}, l, {
                            get: function () {
                                return y
                            },
                            set: function (t) {
                                var e = r(t);
                                if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                y = e, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "position", n({}, l, {
                            get: function () {
                                return T
                            },
                            set: function (t) {
                                if (t < 0 || t > 100) throw new Error("Position must be between 0 and 100.");
                                T = t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "positionAlign", n({}, l, {
                            get: function () {
                                return b
                            },
                            set: function (t) {
                                var e = r(t);
                                if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                b = e, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "size", n({}, l, {
                            get: function () {
                                return E
                            },
                            set: function (t) {
                                if (t < 0 || t > 100) throw new Error("Size must be between 0 and 100.");
                                E = t, this.hasBeenReset = !0
                            }
                        })), Object.defineProperty(o, "align", n({}, l, {
                            get: function () {
                                return S
                            },
                            set: function (t) {
                                var e = r(t);
                                if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                                S = e, this.hasBeenReset = !0
                            }
                        })), o.displayState = void 0
                    }
                    return a.prototype.getCueAsHTML = function () {
                        return self.WebVTT.convertCueToDOMTree(self, this.text)
                    }, a
                }(),
                ei = function () {
                    function t() {}
                    return t.prototype.decode = function (t, e) {
                        if (!t) return "";
                        if ("string" != typeof t) throw new Error("Error - expected string data.");
                        return decodeURIComponent(encodeURIComponent(t))
                    }, t
                }();
    
            function ii(t) {
                function e(t, e, i, r) {
                    return 3600 * (0 | t) + 60 * (0 | e) + (0 | i) + parseFloat(r || 0)
                }
                var i = t.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/);
                return i ? parseFloat(i[2]) > 59 ? e(i[2], i[3], 0, i[4]) : e(i[1], i[2], i[3], i[4]) : null
            }
            var ri = function () {
                function t() {
                    this.values = Object.create(null)
                }
                var e = t.prototype;
                return e.set = function (t, e) {
                    this.get(t) || "" === e || (this.values[t] = e)
                }, e.get = function (t, e, i) {
                    return i ? this.has(t) ? this.values[t] : e[i] : this.has(t) ? this.values[t] : e
                }, e.has = function (t) {
                    return t in this.values
                }, e.alt = function (t, e, i) {
                    for (var r = 0; r < i.length; ++r)
                        if (e === i[r]) {
                            this.set(t, e);
                            break
                        }
                }, e.integer = function (t, e) {
                    /^-?\d+$/.test(e) && this.set(t, parseInt(e, 10))
                }, e.percent = function (t, e) {
                    if (/^([\d]{1,3})(\.[\d]*)?%$/.test(e)) {
                        var i = parseFloat(e);
                        if (i >= 0 && i <= 100) return this.set(t, i), !0
                    }
                    return !1
                }, t
            }();
    
            function ni(t, e, i, r) {
                var n = r ? t.split(r) : [t];
                for (var a in n)
                    if ("string" == typeof n[a]) {
                        var s = n[a].split(i);
                        if (2 === s.length) e(s[0], s[1])
                    }
            }
            var ai = new ti(0, 0, ""),
                si = "middle" === ai.align ? "middle" : "center";
    
            function oi(t, e, i) {
                var r = t;
    
                function n() {
                    var e = ii(t);
                    if (null === e) throw new Error("Malformed timestamp: " + r);
                    return t = t.replace(/^[^\sa-zA-Z-]+/, ""), e
                }
    
                function a() {
                    t = t.replace(/^\s+/, "")
                }
                if (a(), e.startTime = n(), a(), "--\x3e" !== t.slice(0, 3)) throw new Error("Malformed time stamp (time stamps must be separated by '--\x3e'): " + r);
                t = t.slice(3), a(), e.endTime = n(), a(),
                    function (t, e) {
                        var r = new ri;
                        ni(t, (function (t, e) {
                            var n;
                            switch (t) {
                                case "region":
                                    for (var a = i.length - 1; a >= 0; a--)
                                        if (i[a].id === e) {
                                            r.set(t, i[a].region);
                                            break
                                        } break;
                                case "vertical":
                                    r.alt(t, e, ["rl", "lr"]);
                                    break;
                                case "line":
                                    n = e.split(","), r.integer(t, n[0]), r.percent(t, n[0]) && r.set("snapToLines", !1), r.alt(t, n[0], ["auto"]), 2 === n.length && r.alt("lineAlign", n[1], ["start", si, "end"]);
                                    break;
                                case "position":
                                    n = e.split(","), r.percent(t, n[0]), 2 === n.length && r.alt("positionAlign", n[1], ["start", si, "end", "line-left", "line-right", "auto"]);
                                    break;
                                case "size":
                                    r.percent(t, e);
                                    break;
                                case "align":
                                    r.alt(t, e, ["start", si, "end", "left", "right"])
                            }
                        }), /:/, /\s/), e.region = r.get("region", null), e.vertical = r.get("vertical", "");
                        var n = r.get("line", "auto");
                        "auto" === n && -1 === ai.line && (n = -1), e.line = n, e.lineAlign = r.get("lineAlign", "start"), e.snapToLines = r.get("snapToLines", !0), e.size = r.get("size", 100), e.align = r.get("align", si);
                        var a = r.get("position", "auto");
                        "auto" === a && 50 === ai.position && (a = "start" === e.align || "left" === e.align ? 0 : "end" === e.align || "right" === e.align ? 100 : 50), e.position = a
                    }(t, e)
            }
    
            function li(t) {
                return t.replace(/<br(?: \/)?>/gi, "\n")
            }
            var ui = function () {
                    function t() {
                        this.state = "INITIAL", this.buffer = "", this.decoder = new ei, this.regionList = [], this.cue = null, this.oncue = void 0, this.onparsingerror = void 0, this.onflush = void 0
                    }
                    var e = t.prototype;
                    return e.parse = function (t) {
                        var e = this;
    
                        function i() {
                            var t = e.buffer,
                                i = 0;
                            for (t = li(t); i < t.length && "\r" !== t[i] && "\n" !== t[i];) ++i;
                            var r = t.slice(0, i);
                            return "\r" === t[i] && ++i, "\n" === t[i] && ++i, e.buffer = t.slice(i), r
                        }
                        t && (e.buffer += e.decoder.decode(t, {
                            stream: !0
                        }));
                        try {
                            var r = "";
                            if ("INITIAL" === e.state) {
                                if (!/\r\n|\n/.test(e.buffer)) return this;
                                var n = (r = i()).match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
                                if (!n || !n[0]) throw new Error("Malformed WebVTT signature.");
                                e.state = "HEADER"
                            }
                            for (var a = !1; e.buffer;) {
                                if (!/\r\n|\n/.test(e.buffer)) return this;
                                switch (a ? a = !1 : r = i(), e.state) {
                                    case "HEADER":
                                        /:/.test(r) ? ni(r, (function (t, e) {}), /:/) : r || (e.state = "ID");
                                        continue;
                                    case "NOTE":
                                        r || (e.state = "ID");
                                        continue;
                                    case "ID":
                                        if (/^NOTE($|[ \t])/.test(r)) {
                                            e.state = "NOTE";
                                            break
                                        }
                                        if (!r) continue;
                                        if (e.cue = new ti(0, 0, ""), e.state = "CUE", -1 === r.indexOf("--\x3e")) {
                                            e.cue.id = r;
                                            continue
                                        }
                                        case "CUE":
                                            if (!e.cue) {
                                                e.state = "BADCUE";
                                                continue
                                            }
                                            try {
                                                oi(r, e.cue, e.regionList)
                                            } catch (t) {
                                                e.cue = null, e.state = "BADCUE";
                                                continue
                                            }
                                            e.state = "CUETEXT";
                                            continue;
                                        case "CUETEXT":
                                            var s = -1 !== r.indexOf("--\x3e");
                                            if (!r || s && (a = !0)) {
                                                e.oncue && e.cue && e.oncue(e.cue), e.cue = null, e.state = "ID";
                                                continue
                                            }
                                            if (null === e.cue) continue;
                                            e.cue.text && (e.cue.text += "\n"), e.cue.text += r;
                                            continue;
                                        case "BADCUE":
                                            r || (e.state = "ID")
                                }
                            }
                        } catch (t) {
                            "CUETEXT" === e.state && e.cue && e.oncue && e.oncue(e.cue), e.cue = null, e.state = "INITIAL" === e.state ? "BADWEBVTT" : "BADCUE"
                        }
                        return this
                    }, e.flush = function () {
                        try {
                            if ((this.cue || "HEADER" === this.state) && (this.buffer += "\n\n", this.parse()), "INITIAL" === this.state || "BADWEBVTT" === this.state) throw new Error("Malformed WebVTT signature.")
                        } catch (t) {
                            this.onparsingerror && this.onparsingerror(t)
                        }
                        return this.onflush && this.onflush(), this
                    }, t
                }(),
                hi = i(11),
                di = i(13),
                ci = /\r\n|\n\r|\n|\r/g,
                fi = function (t, e, i) {
                    return void 0 === i && (i = 0), t.slice(i, i + e.length) === e
                },
                gi = function (t) {
                    for (var e = 5381, i = t.length; i;) e = 33 * e ^ t.charCodeAt(--i);
                    return (e >>> 0).toString()
                };
    
            function vi(t, e, i) {
                return gi(t.toString()) + gi(e.toString()) + gi(i)
            }
    
            function pi(t, e, i, r, n, s, o, l) {
                var u, h = new ui,
                    d = Object(G.f)(new Uint8Array(t)).trim().replace(ci, "\n").split("\n"),
                    c = [],
                    f = Object(hi.a)(e, i),
                    g = "00:00.000",
                    v = 0,
                    p = 0,
                    m = !0;
                h.oncue = function (t) {
                    var e = r[n],
                        i = r.ccOffset,
                        a = (v - f) / 9e4;
                    null != e && e.new && (void 0 !== p ? i = r.ccOffset = e.start : function (t, e, i) {
                        var r = t[e],
                            n = t[r.prevCC];
                        if (!n || !n.new && r.new) return t.ccOffset = t.presentationOffset = r.start, void(r.new = !1);
                        for (; null !== (a = n) && void 0 !== a && a.new;) {
                            var a;
                            t.ccOffset += r.start - n.start, r.new = !1, n = t[(r = n).prevCC]
                        }
                        t.presentationOffset = i
                    }(r, n, a)), a && (i = a - r.presentationOffset);
                    var o = t.endTime - t.startTime,
                        l = Object(di.d)(9e4 * (t.startTime + i - p), 9e4 * s) / 9e4;
                    t.startTime = Math.max(l, 0), t.endTime = Math.max(l + o, 0);
                    var u = t.text.trim();
                    t.text = decodeURIComponent(encodeURIComponent(u)), t.id || (t.id = vi(t.startTime, t.endTime, u)), t.endTime > 0 && c.push(t)
                }, h.onparsingerror = function (t) {
                    u = t
                }, h.onflush = function () {
                    u ? l(u) : o(c)
                }, d.forEach((function (t) {
                    if (m) {
                        if (fi(t, "X-TIMESTAMP-MAP=")) {
                            m = !1, t.slice(16).split(",").forEach((function (t) {
                                fi(t, "LOCAL:") ? g = t.slice(6) : fi(t, "MPEGTS:") && (v = parseInt(t.slice(7)))
                            }));
                            try {
                                p = function (t) {
                                    var e = parseInt(t.slice(-3)),
                                        i = parseInt(t.slice(-6, -4)),
                                        r = parseInt(t.slice(-9, -7)),
                                        n = t.length > 9 ? parseInt(t.substring(0, t.indexOf(":"))) : 0;
                                    if (!(Object(a.a)(e) && Object(a.a)(i) && Object(a.a)(r) && Object(a.a)(n))) throw Error("Malformed X-TIMESTAMP-MAP: Local:" + t);
                                    return e += 1e3 * i, e += 6e4 * r, e += 36e5 * n
                                }(g) / 1e3
                            } catch (t) {
                                u = t
                            }
                            return
                        }
                        "" === t && (m = !1)
                    }
                    h.parse(t + "\n")
                })), h.flush()
            }
    
            function mi() {
                return (mi = Object.assign ? Object.assign.bind() : function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
                    }
                    return t
                }).apply(this, arguments)
            }
            var yi = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/,
                Ti = /^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/,
                bi = {
                    left: "start",
                    center: "center",
                    right: "end",
                    start: "start",
                    end: "end"
                };
    
            function Ei(t, e, i, r, n) {
                var a = Object(u.c)(new Uint8Array(t), ["mdat"]);
                if (0 !== a.length) {
                    var s = a.map((function (t) {
                            return Object(G.f)(t)
                        })),
                        o = Object(hi.c)(e, 1, i);
                    try {
                        s.forEach((function (t) {
                            return r(function (t, e) {
                                var i = (new DOMParser).parseFromString(t, "text/xml").getElementsByTagName("tt")[0];
                                if (!i) throw new Error("Invalid ttml");
                                var r = {
                                        frameRate: 30,
                                        subFrameRate: 1,
                                        frameRateMultiplier: 0,
                                        tickRate: 0
                                    },
                                    n = Object.keys(r).reduce((function (t, e) {
                                        return t[e] = i.getAttribute("ttp:" + e) || r[e], t
                                    }), {}),
                                    a = "preserve" !== i.getAttribute("xml:space"),
                                    s = Li(Si(i, "styling", "style")),
                                    o = Li(Si(i, "layout", "region")),
                                    l = Si(i, "body", "[begin]");
                                return [].map.call(l, (function (t) {
                                    var i = function t(e, i) {
                                        return [].slice.call(e.childNodes).reduce((function (e, r, n) {
                                            var a;
                                            return "br" === r.nodeName && n ? e + "\n" : null !== (a = r.childNodes) && void 0 !== a && a.length ? t(r, i) : i ? e + r.textContent.trim().replace(/\s+/g, " ") : e + r.textContent
                                        }), "")
                                    }(t, a);
                                    if (!i || !t.hasAttribute("begin")) return null;
                                    var r = Ri(t.getAttribute("begin"), n),
                                        l = Ri(t.getAttribute("dur"), n),
                                        u = Ri(t.getAttribute("end"), n);
                                    if (null === r) throw Di(t);
                                    if (null === u) {
                                        if (null === l) throw Di(t);
                                        u = r + l
                                    }
                                    var h = new ti(r - e, u - e, i);
                                    h.id = vi(h.startTime, h.endTime, h.text);
                                    var d = o[t.getAttribute("region")],
                                        c = s[t.getAttribute("style")];
                                    h.position = 10, h.size = 80;
                                    var f = function (t, e, i) {
                                            var r = "http://www.w3.org/ns/ttml#styling",
                                                n = null,
                                                a = null != t && t.hasAttribute("style") ? t.getAttribute("style") : null;
                                            a && i.hasOwnProperty(a) && (n = i[a]);
                                            return ["displayAlign", "textAlign", "color", "backgroundColor", "fontSize", "fontFamily"].reduce((function (i, a) {
                                                var s = Ai(e, r, a) || Ai(t, r, a) || Ai(n, r, a);
                                                return s && (i[a] = s), i
                                            }), {})
                                        }(d, c, s),
                                        g = f.textAlign;
                                    if (g) {
                                        var v = bi[g];
                                        v && (h.lineAlign = v), h.align = g
                                    }
                                    return mi(h, f), h
                                })).filter((function (t) {
                                    return null !== t
                                }))
                            }(t, o))
                        }))
                    } catch (t) {
                        n(t)
                    }
                } else n(new Error("Could not parse IMSC1 mdat"))
            }
    
            function Si(t, e, i) {
                var r = t.getElementsByTagName(e)[0];
                return r ? [].slice.call(r.querySelectorAll(i)) : []
            }
    
            function Li(t) {
                return t.reduce((function (t, e) {
                    var i = e.getAttribute("xml:id");
                    return i && (t[i] = e), t
                }), {})
            }
    
            function Ai(t, e, i) {
                return t && t.hasAttributeNS(e, i) ? t.getAttributeNS(e, i) : null
            }
    
            function Di(t) {
                return new Error("Could not parse ttml timestamp " + t)
            }
    
            function Ri(t, e) {
                if (!t) return null;
                var i = ii(t);
                return null === i && (yi.test(t) ? i = function (t, e) {
                    var i = yi.exec(t),
                        r = (0 | i[4]) + (0 | i[5]) / e.subFrameRate;
                    return 3600 * (0 | i[1]) + 60 * (0 | i[2]) + (0 | i[3]) + r / e.frameRate
                }(t, e) : Ti.test(t) && (i = function (t, e) {
                    var i = Ti.exec(t),
                        r = Number(i[1]);
                    switch (i[2]) {
                        case "h":
                            return 3600 * r;
                        case "m":
                            return 60 * r;
                        case "ms":
                            return 1e3 * r;
                        case "f":
                            return r / e.frameRate;
                        case "t":
                            return r / e.tickRate
                    }
                    return r
                }(t, e))), i
            }
            var ki = function () {
                function t(t) {
                    if (this.hls = void 0, this.media = null, this.config = void 0, this.enabled = !0, this.Cues = void 0, this.textTracks = [], this.tracks = [], this.initPTS = [], this.timescale = [], this.unparsedVttFrags = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.cea608Parser1 = void 0, this.cea608Parser2 = void 0, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = {
                            ccOffset: 0,
                            presentationOffset: 0,
                            0: {
                                start: 0,
                                prevCC: -1,
                                new: !0
                            }
                        }, this.captionsProperties = void 0, this.hls = t, this.config = t.config, this.Cues = t.config.cueHandler, this.captionsProperties = {
                            textTrack1: {
                                label: this.config.captionsTextTrack1Label,
                                languageCode: this.config.captionsTextTrack1LanguageCode
                            },
                            textTrack2: {
                                label: this.config.captionsTextTrack2Label,
                                languageCode: this.config.captionsTextTrack2LanguageCode
                            },
                            textTrack3: {
                                label: this.config.captionsTextTrack3Label,
                                languageCode: this.config.captionsTextTrack3LanguageCode
                            },
                            textTrack4: {
                                label: this.config.captionsTextTrack4Label,
                                languageCode: this.config.captionsTextTrack4LanguageCode
                            }
                        }, this.config.enableCEA708Captions) {
                        var e = new Ze(this, "textTrack1"),
                            i = new Ze(this, "textTrack2"),
                            r = new Ze(this, "textTrack3"),
                            n = new Ze(this, "textTrack4");
                        this.cea608Parser1 = new Je(1, e, i), this.cea608Parser2 = new Je(3, r, n)
                    }
                    t.on(s.a.MEDIA_ATTACHING, this.onMediaAttaching, this), t.on(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.on(s.a.MANIFEST_LOADED, this.onManifestLoaded, this), t.on(s.a.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.on(s.a.FRAG_LOADING, this.onFragLoading, this), t.on(s.a.FRAG_LOADED, this.onFragLoaded, this), t.on(s.a.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), t.on(s.a.FRAG_DECRYPTED, this.onFragDecrypted, this), t.on(s.a.INIT_PTS_FOUND, this.onInitPtsFound, this), t.on(s.a.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), t.on(s.a.BUFFER_FLUSHING, this.onBufferFlushing, this)
                }
                var e = t.prototype;
                return e.destroy = function () {
                    var t = this.hls;
                    t.off(s.a.MEDIA_ATTACHING, this.onMediaAttaching, this), t.off(s.a.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(s.a.MANIFEST_LOADING, this.onManifestLoading, this), t.off(s.a.MANIFEST_LOADED, this.onManifestLoaded, this), t.off(s.a.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), t.off(s.a.FRAG_LOADING, this.onFragLoading, this), t.off(s.a.FRAG_LOADED, this.onFragLoaded, this), t.off(s.a.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), t.off(s.a.FRAG_DECRYPTED, this.onFragDecrypted, this), t.off(s.a.INIT_PTS_FOUND, this.onInitPtsFound, this), t.off(s.a.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), t.off(s.a.BUFFER_FLUSHING, this.onBufferFlushing, this), this.hls = this.config = this.cea608Parser1 = this.cea608Parser2 = null
                }, e.addCues = function (t, e, i, r, n) {
                    for (var a, o, l, u, h = !1, d = n.length; d--;) {
                        var c = n[d],
                            f = (a = c[0], o = c[1], l = e, u = i, Math.min(o, u) - Math.max(a, l));
                        if (f >= 0 && (c[0] = Math.min(c[0], e), c[1] = Math.max(c[1], i), h = !0, f / (i - e) > .5)) return
                    }
                    if (h || n.push([e, i]), this.config.renderTextTracksNatively) {
                        var g = this.captionsTracks[t];
                        this.Cues.newCue(g, e, i, r)
                    } else {
                        var v = this.Cues.newCue(null, e, i, r);
                        this.hls.trigger(s.a.CUES_PARSED, {
                            type: "captions",
                            cues: v,
                            track: t
                        })
                    }
                }, e.onInitPtsFound = function (t, e) {
                    var i = this,
                        r = e.frag,
                        n = e.id,
                        a = e.initPTS,
                        o = e.timescale,
                        l = this.unparsedVttFrags;
                    "main" === n && (this.initPTS[r.cc] = a, this.timescale[r.cc] = o), l.length && (this.unparsedVttFrags = [], l.forEach((function (t) {
                        i.onFragLoaded(s.a.FRAG_LOADED, t)
                    })))
                }, e.getExistingTrack = function (t) {
                    var e = this.media;
                    if (e)
                        for (var i = 0; i < e.textTracks.length; i++) {
                            var r = e.textTracks[i];
                            if (r[t]) return r
                        }
                    return null
                }, e.createCaptionsTrack = function (t) {
                    this.config.renderTextTracksNatively ? this.createNativeTrack(t) : this.createNonNativeTrack(t)
                }, e.createNativeTrack = function (t) {
                    if (!this.captionsTracks[t]) {
                        var e = this.captionsProperties,
                            i = this.captionsTracks,
                            r = this.media,
                            n = e[t],
                            a = n.label,
                            s = n.languageCode,
                            o = this.getExistingTrack(t);
                        if (o) i[t] = o, U(i[t]), M(i[t], r);
                        else {
                            var l = this.createTextTrack("captions", a, s);
                            l && (l[t] = !0, i[t] = l)
                        }
                    }
                }, e.createNonNativeTrack = function (t) {
                    if (!this.nonNativeCaptionsTracks[t]) {
                        var e = this.captionsProperties[t];
                        if (e) {
                            var i = {
                                _id: t,
                                label: e.label,
                                kind: "captions",
                                default: !!e.media && !!e.media.default,
                                closedCaptions: e.media
                            };
                            this.nonNativeCaptionsTracks[t] = i, this.hls.trigger(s.a.NON_NATIVE_TEXT_TRACKS_FOUND, {
                                tracks: [i]
                            })
                        }
                    }
                }, e.createTextTrack = function (t, e, i) {
                    var r = this.media;
                    if (r) return r.addTextTrack(t, e, i)
                }, e.onMediaAttaching = function (t, e) {
                    this.media = e.media, this._cleanTracks()
                }, e.onMediaDetaching = function () {
                    var t = this.captionsTracks;
                    Object.keys(t).forEach((function (e) {
                        U(t[e]), delete t[e]
                    })), this.nonNativeCaptionsTracks = {}
                }, e.onManifestLoading = function () {
                    this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = {
                        ccOffset: 0,
                        presentationOffset: 0,
                        0: {
                            start: 0,
                            prevCC: -1,
                            new: !0
                        }
                    }, this._cleanTracks(), this.tracks = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.textTracks = [], this.unparsedVttFrags = this.unparsedVttFrags || [], this.initPTS = [], this.timescale = [], this.cea608Parser1 && this.cea608Parser2 && (this.cea608Parser1.reset(), this.cea608Parser2.reset())
                }, e._cleanTracks = function () {
                    var t = this.media;
                    if (t) {
                        var e = t.textTracks;
                        if (e)
                            for (var i = 0; i < e.length; i++) U(e[i])
                    }
                }, e.onSubtitleTracksUpdated = function (t, e) {
                    var i = this;
                    this.textTracks = [];
                    var r = e.subtitleTracks || [],
                        n = r.some((function (t) {
                            return "stpp.ttml.im1t" === t.textCodec
                        }));
                    if (this.config.enableWebVTT || n && this.config.enableIMSC1) {
                        var a = this.tracks && r && this.tracks.length === r.length;
                        if (this.tracks = r || [], this.config.renderTextTracksNatively) {
                            var o = this.media ? this.media.textTracks : [];
                            this.tracks.forEach((function (t, e) {
                                var r;
                                if (e < o.length) {
                                    for (var n = null, a = 0; a < o.length; a++)
                                        if (_i(o[a], t)) {
                                            n = o[a];
                                            break
                                        } n && (r = n)
                                }
                                if (r) U(r);
                                else {
                                    var s = i._captionsOrSubtitlesFromCharacteristics(t);
                                    (r = i.createTextTrack(s, t.name, t.lang)) && (r.mode = "disabled")
                                }
                                r && (r.groupId = t.groupId, i.textTracks.push(r))
                            }))
                        } else if (!a && this.tracks && this.tracks.length) {
                            var l = this.tracks.map((function (t) {
                                return {
                                    label: t.name,
                                    kind: t.type.toLowerCase(),
                                    default: t.default,
                                    subtitleTrack: t
                                }
                            }));
                            this.hls.trigger(s.a.NON_NATIVE_TEXT_TRACKS_FOUND, {
                                tracks: l
                            })
                        }
                    }
                }, e._captionsOrSubtitlesFromCharacteristics = function (t) {
                    var e;
                    if (null !== (e = t.attrs) && void 0 !== e && e.CHARACTERISTICS) {
                        var i = /transcribes-spoken-dialog/gi.test(t.attrs.CHARACTERISTICS),
                            r = /describes-music-and-sound/gi.test(t.attrs.CHARACTERISTICS);
                        if (i && r) return "captions"
                    }
                    return "subtitles"
                }, e.onManifestLoaded = function (t, e) {
                    var i = this;
                    this.config.enableCEA708Captions && e.captions && e.captions.forEach((function (t) {
                        var e = /(?:CC|SERVICE)([1-4])/.exec(t.instreamId);
                        if (e) {
                            var r = "textTrack" + e[1],
                                n = i.captionsProperties[r];
                            n && (n.label = t.name, t.lang && (n.languageCode = t.lang), n.media = t)
                        }
                    }))
                }, e.closedCaptionsForLevel = function (t) {
                    var e = this.hls.levels[t.level];
                    return null == e ? void 0 : e.attrs["CLOSED-CAPTIONS"]
                }, e.onFragLoading = function (t, e) {
                    var i = this.cea608Parser1,
                        r = this.cea608Parser2,
                        n = this.lastSn,
                        a = this.lastPartIndex;
                    if (this.enabled && i && r && e.frag.type === w.b.MAIN) {
                        var s, o, l = e.frag.sn,
                            u = null != (s = null == e || null === (o = e.part) || void 0 === o ? void 0 : o.index) ? s : -1;
                        l === n + 1 || l === n && u === a + 1 || (i.reset(), r.reset()), this.lastSn = l, this.lastPartIndex = u
                    }
                }, e.onFragLoaded = function (t, e) {
                    var i = e.frag,
                        r = e.payload,
                        n = this.initPTS,
                        o = this.unparsedVttFrags;
                    if (i.type === w.b.SUBTITLE)
                        if (r.byteLength) {
                            if (!Object(a.a)(n[i.cc])) return o.push(e), void(n.length && this.hls.trigger(s.a.SUBTITLE_FRAG_PROCESSED, {
                                success: !1,
                                frag: i,
                                error: new Error("Missing initial subtitle PTS")
                            }));
                            var l = i.decryptdata,
                                u = "stats" in e;
                            if (null == l || null == l.key || "AES-128" !== l.method || u) {
                                var h = this.tracks[i.level],
                                    d = this.vttCCs;
                                d[i.cc] || (d[i.cc] = {
                                    start: i.start,
                                    prevCC: this.prevCC,
                                    new: !0
                                }, this.prevCC = i.cc), h && "stpp.ttml.im1t" === h.textCodec ? this._parseIMSC1(i, r) : this._parseVTTs(i, r, d)
                            }
                        } else this.hls.trigger(s.a.SUBTITLE_FRAG_PROCESSED, {
                            success: !1,
                            frag: i,
                            error: new Error("Empty subtitle payload")
                        })
                }, e._parseIMSC1 = function (t, e) {
                    var i = this,
                        r = this.hls;
                    Ei(e, this.initPTS[t.cc], this.timescale[t.cc], (function (e) {
                        i._appendCues(e, t.level), r.trigger(s.a.SUBTITLE_FRAG_PROCESSED, {
                            success: !0,
                            frag: t
                        })
                    }), (function (e) {
                        l.b.log("Failed to parse IMSC1: " + e), r.trigger(s.a.SUBTITLE_FRAG_PROCESSED, {
                            success: !1,
                            frag: t,
                            error: e
                        })
                    }))
                }, e._parseVTTs = function (t, e, i) {
                    var r, n = this,
                        a = this.hls;
                    pi(null !== (r = t.initSegment) && void 0 !== r && r.data ? Object(u.b)(t.initSegment.data, new Uint8Array(e)) : e, this.initPTS[t.cc], this.timescale[t.cc], i, t.cc, t.start, (function (e) {
                        n._appendCues(e, t.level), a.trigger(s.a.SUBTITLE_FRAG_PROCESSED, {
                            success: !0,
                            frag: t
                        })
                    }), (function (i) {
                        n._fallbackToIMSC1(t, e), l.b.log("Failed to parse VTT cue: " + i), a.trigger(s.a.SUBTITLE_FRAG_PROCESSED, {
                            success: !1,
                            frag: t,
                            error: i
                        })
                    }))
                }, e._fallbackToIMSC1 = function (t, e) {
                    var i = this,
                        r = this.tracks[t.level];
                    r.textCodec || Ei(e, this.initPTS[t.cc], this.timescale[t.cc], (function () {
                        r.textCodec = "stpp.ttml.im1t", i._parseIMSC1(t, e)
                    }), (function () {
                        r.textCodec = "wvtt"
                    }))
                }, e._appendCues = function (t, e) {
                    var i = this.hls;
                    if (this.config.renderTextTracksNatively) {
                        var r = this.textTracks[e];
                        if (!r || "disabled" === r.mode) return;
                        t.forEach((function (t) {
                            return N(r, t)
                        }))
                    } else {
                        var n = this.tracks[e];
                        if (!n) return;
                        var a = n.default ? "default" : "subtitles" + e;
                        i.trigger(s.a.CUES_PARSED, {
                            type: "subtitles",
                            cues: t,
                            track: a
                        })
                    }
                }, e.onFragDecrypted = function (t, e) {
                    var i = e.frag;
                    if (i.type === w.b.SUBTITLE) {
                        if (!Object(a.a)(this.initPTS[i.cc])) return void this.unparsedVttFrags.push(e);
                        this.onFragLoaded(s.a.FRAG_LOADED, e)
                    }
                }, e.onSubtitleTracksCleared = function () {
                    this.tracks = [], this.captionsTracks = {}
                }, e.onFragParsingUserdata = function (t, e) {
                    var i = this.cea608Parser1,
                        r = this.cea608Parser2;
                    if (this.enabled && i && r) {
                        var n = e.frag,
                            a = e.samples;
                        if (n.type !== w.b.MAIN || "NONE" !== this.closedCaptionsForLevel(n))
                            for (var s = 0; s < a.length; s++) {
                                var o = a[s].bytes;
                                if (o) {
                                    var l = this.extractCea608Data(o);
                                    i.addData(a[s].pts, l[0]), r.addData(a[s].pts, l[1])
                                }
                            }
                    }
                }, e.onBufferFlushing = function (t, e) {
                    var i = e.startOffset,
                        r = e.endOffset,
                        n = e.endOffsetSubtitles,
                        a = e.type,
                        s = this.media;
                    if (s && !(s.currentTime < r)) {
                        if (!a || "video" === a) {
                            var o = this.captionsTracks;
                            Object.keys(o).forEach((function (t) {
                                return B(o[t], i, r)
                            }))
                        }
                        if (this.config.renderTextTracksNatively && 0 === i && void 0 !== n) {
                            var l = this.textTracks;
                            Object.keys(l).forEach((function (t) {
                                return B(l[t], i, n)
                            }))
                        }
                    }
                }, e.extractCea608Data = function (t) {
                    for (var e = [
                            [],
                            []
                        ], i = 31 & t[0], r = 2, n = 0; n < i; n++) {
                        var a = t[r++],
                            s = 127 & t[r++],
                            o = 127 & t[r++];
                        if (0 !== s || 0 !== o)
                            if (0 != (4 & a)) {
                                var l = 3 & a;
                                0 !== l && 1 !== l || (e[l].push(s), e[l].push(o))
                            }
                    }
                    return e
                }, t
            }();
    
            function _i(t, e) {
                return t && t.label === e.name && !(t.textTrack1 || t.textTrack2)
            }
    
            function Ii(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            var Oi, Ci = function () {
                    function t(t) {
                        this.autoLevelCapping = void 0, this.firstLevel = void 0, this.media = void 0, this.restrictedLevels = void 0, this.timer = void 0, this.hls = void 0, this.streamController = void 0, this.clientRect = void 0, this.hls = t, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.firstLevel = -1, this.media = null, this.restrictedLevels = [], this.timer = void 0, this.clientRect = null, this.registerListeners()
                    }
                    var e, i, r, n = t.prototype;
                    return n.setStreamController = function (t) {
                        this.streamController = t
                    }, n.destroy = function () {
                        this.unregisterListener(), this.hls.config.capLevelToPlayerSize && this.stopCapping(), this.media = null, this.clientRect = null, this.hls = this.streamController = null
                    }, n.registerListeners = function () {
                        var t = this.hls;
                        t.on(s.a.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), t.on(s.a.MEDIA_ATTACHING, this.onMediaAttaching, this), t.on(s.a.MANIFEST_PARSED, this.onManifestParsed, this), t.on(s.a.BUFFER_CODECS, this.onBufferCodecs, this), t.on(s.a.MEDIA_DETACHING, this.onMediaDetaching, this)
                    }, n.unregisterListener = function () {
                        var t = this.hls;
                        t.off(s.a.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), t.off(s.a.MEDIA_ATTACHING, this.onMediaAttaching, this), t.off(s.a.MANIFEST_PARSED, this.onManifestParsed, this), t.off(s.a.BUFFER_CODECS, this.onBufferCodecs, this), t.off(s.a.MEDIA_DETACHING, this.onMediaDetaching, this)
                    }, n.onFpsDropLevelCapping = function (e, i) {
                        t.isLevelAllowed(i.droppedLevel, this.restrictedLevels) && this.restrictedLevels.push(i.droppedLevel)
                    }, n.onMediaAttaching = function (t, e) {
                        this.media = e.media instanceof HTMLVideoElement ? e.media : null
                    }, n.onManifestParsed = function (t, e) {
                        var i = this.hls;
                        this.restrictedLevels = [], this.firstLevel = e.firstLevel, i.config.capLevelToPlayerSize && e.video && this.startCapping()
                    }, n.onBufferCodecs = function (t, e) {
                        this.hls.config.capLevelToPlayerSize && e.video && this.startCapping()
                    }, n.onMediaDetaching = function () {
                        this.stopCapping()
                    }, n.detectPlayerSize = function () {
                        if (this.media && this.mediaHeight > 0 && this.mediaWidth > 0) {
                            var t = this.hls.levels;
                            if (t.length) {
                                var e = this.hls;
                                e.autoLevelCapping = this.getMaxLevel(t.length - 1), e.autoLevelCapping > this.autoLevelCapping && this.streamController && this.streamController.nextLevelSwitch(), this.autoLevelCapping = e.autoLevelCapping
                            }
                        }
                    }, n.getMaxLevel = function (e) {
                        var i = this,
                            r = this.hls.levels;
                        if (!r.length) return -1;
                        var n = r.filter((function (r, n) {
                            return t.isLevelAllowed(n, i.restrictedLevels) && n <= e
                        }));
                        return this.clientRect = null, t.getMaxLevelByMediaSize(n, this.mediaWidth, this.mediaHeight)
                    }, n.startCapping = function () {
                        this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY, this.hls.firstLevel = this.getMaxLevel(this.firstLevel), self.clearInterval(this.timer), this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize())
                    }, n.stopCapping = function () {
                        this.restrictedLevels = [], this.firstLevel = -1, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (self.clearInterval(this.timer), this.timer = void 0)
                    }, n.getDimensions = function () {
                        if (this.clientRect) return this.clientRect;
                        var t = this.media,
                            e = {
                                width: 0,
                                height: 0
                            };
                        if (t) {
                            var i = t.getBoundingClientRect();
                            e.width = i.width, e.height = i.height, e.width || e.height || (e.width = i.right - i.left || t.width || 0, e.height = i.bottom - i.top || t.height || 0)
                        }
                        return this.clientRect = e, e
                    }, t.isLevelAllowed = function (t, e) {
                        return void 0 === e && (e = []), -1 === e.indexOf(t)
                    }, t.getMaxLevelByMediaSize = function (t, e, i) {
                        if (!t || !t.length) return -1;
                        for (var r, n, a = t.length - 1, s = 0; s < t.length; s += 1) {
                            var o = t[s];
                            if ((o.width >= e || o.height >= i) && (r = o, !(n = t[s + 1]) || r.width !== n.width || r.height !== n.height)) {
                                a = s;
                                break
                            }
                        }
                        return a
                    }, e = t, (i = [{
                        key: "mediaWidth",
                        get: function () {
                            return this.getDimensions().width * this.contentScaleFactor
                        }
                    }, {
                        key: "mediaHeight",
                        get: function () {
                            return this.getDimensions().height * this.contentScaleFactor
                        }
                    }, {
                        key: "contentScaleFactor",
                        get: function () {
                            var t = 1;
                            if (!this.hls.config.ignoreDevicePixelRatio) try {
                                t = self.devicePixelRatio
                            } catch (t) {}
                            return t
                        }
                    }]) && Ii(e.prototype, i), r && Ii(e, r), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), t
                }(),
                wi = function () {
                    function t(t) {
                        this.hls = void 0, this.isVideoPlaybackQualityAvailable = !1, this.timer = void 0, this.media = null, this.lastTime = void 0, this.lastDroppedFrames = 0, this.lastDecodedFrames = 0, this.streamController = void 0, this.hls = t, this.registerListeners()
                    }
                    var e = t.prototype;
                    return e.setStreamController = function (t) {
                        this.streamController = t
                    }, e.registerListeners = function () {
                        this.hls.on(s.a.MEDIA_ATTACHING, this.onMediaAttaching, this)
                    }, e.unregisterListeners = function () {
                        this.hls.off(s.a.MEDIA_ATTACHING, this.onMediaAttaching)
                    }, e.destroy = function () {
                        this.timer && clearInterval(this.timer), this.unregisterListeners(), this.isVideoPlaybackQualityAvailable = !1, this.media = null
                    }, e.onMediaAttaching = function (t, e) {
                        var i = this.hls.config;
                        if (i.capLevelOnFPSDrop) {
                            var r = e.media instanceof self.HTMLVideoElement ? e.media : null;
                            this.media = r, r && "function" == typeof r.getVideoPlaybackQuality && (this.isVideoPlaybackQualityAvailable = !0), self.clearInterval(this.timer), this.timer = self.setInterval(this.checkFPSInterval.bind(this), i.fpsDroppedMonitoringPeriod)
                        }
                    }, e.checkFPS = function (t, e, i) {
                        var r = performance.now();
                        if (e) {
                            if (this.lastTime) {
                                var n = r - this.lastTime,
                                    a = i - this.lastDroppedFrames,
                                    o = e - this.lastDecodedFrames,
                                    u = 1e3 * a / n,
                                    h = this.hls;
                                if (h.trigger(s.a.FPS_DROP, {
                                        currentDropped: a,
                                        currentDecoded: o,
                                        totalDroppedFrames: i
                                    }), u > 0 && a > h.config.fpsDroppedMonitoringThreshold * o) {
                                    var d = h.currentLevel;
                                    l.b.warn("drop FPS ratio greater than max allowed value for currentLevel: " + d), d > 0 && (-1 === h.autoLevelCapping || h.autoLevelCapping >= d) && (d -= 1, h.trigger(s.a.FPS_DROP_LEVEL_CAPPING, {
                                        level: d,
                                        droppedLevel: h.currentLevel
                                    }), h.autoLevelCapping = d, this.streamController.nextLevelSwitch())
                                }
                            }
                            this.lastTime = r, this.lastDroppedFrames = i, this.lastDecodedFrames = e
                        }
                    }, e.checkFPSInterval = function () {
                        var t = this.media;
                        if (t)
                            if (this.isVideoPlaybackQualityAvailable) {
                                var e = t.getVideoPlaybackQuality();
                                this.checkFPS(t, e.totalVideoFrames, e.droppedVideoFrames)
                            } else this.checkFPS(t, t.webkitDecodedFrameCount, t.webkitDroppedFrameCount)
                    }, t
                }();
            ! function (t) {
                t.WIDEVINE = "com.widevine.alpha", t.PLAYREADY = "com.microsoft.playready"
            }(Oi || (Oi = {}));
            var xi = "undefined" != typeof self && self.navigator && self.navigator.requestMediaKeySystemAccess ? self.navigator.requestMediaKeySystemAccess.bind(self.navigator) : null;
    
            function Pi(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            var Fi, Mi, Ni, Ui = function () {
                function t(t) {
                    this.hls = void 0, this._widevineLicenseUrl = void 0, this._licenseXhrSetup = void 0, this._licenseResponseCallback = void 0, this._emeEnabled = void 0, this._requestMediaKeySystemAccess = void 0, this._drmSystemOptions = void 0, this._config = void 0, this._mediaKeysList = [], this._media = null, this._hasSetMediaKeys = !1, this._requestLicenseFailureCount = 0, this.mediaKeysPromise = null, this._onMediaEncrypted = this.onMediaEncrypted.bind(this), this.hls = t, this._config = t.config, this._widevineLicenseUrl = this._config.widevineLicenseUrl, this._licenseXhrSetup = this._config.licenseXhrSetup, this._licenseResponseCallback = this._config.licenseResponseCallback, this._emeEnabled = this._config.emeEnabled, this._requestMediaKeySystemAccess = this._config.requestMediaKeySystemAccessFunc, this._drmSystemOptions = this._config.drmSystemOptions, this._registerListeners()
                }
                var e, i, r, n = t.prototype;
                return n.destroy = function () {
                    this._unregisterListeners(), this.hls = this._onMediaEncrypted = null, this._requestMediaKeySystemAccess = null
                }, n._registerListeners = function () {
                    this.hls.on(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(s.a.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.on(s.a.MANIFEST_PARSED, this.onManifestParsed, this)
                }, n._unregisterListeners = function () {
                    this.hls.off(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.off(s.a.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.off(s.a.MANIFEST_PARSED, this.onManifestParsed, this)
                }, n.getLicenseServerUrl = function (t) {
                    switch (t) {
                        case Oi.WIDEVINE:
                            if (!this._widevineLicenseUrl) break;
                            return this._widevineLicenseUrl
                    }
                    throw new Error('no license server URL configured for key-system "' + t + '"')
                }, n._attemptKeySystemAccess = function (t, e, i) {
                    var r = this,
                        n = function (t, e, i, r) {
                            switch (t) {
                                case Oi.WIDEVINE:
                                    return function (t, e, i) {
                                        var r = {
                                            audioCapabilities: [],
                                            videoCapabilities: []
                                        };
                                        return t.forEach((function (t) {
                                            r.audioCapabilities.push({
                                                contentType: 'audio/mp4; codecs="' + t + '"',
                                                robustness: i.audioRobustness || ""
                                            })
                                        })), e.forEach((function (t) {
                                            r.videoCapabilities.push({
                                                contentType: 'video/mp4; codecs="' + t + '"',
                                                robustness: i.videoRobustness || ""
                                            })
                                        })), [r]
                                    }(e, i, r);
                                default:
                                    throw new Error("Unknown key-system: " + t)
                            }
                        }(t, e, i, this._drmSystemOptions);
                    l.b.log("Requesting encrypted media key-system access");
                    var a = this.requestMediaKeySystemAccess(t, n);
                    this.mediaKeysPromise = a.then((function (e) {
                        return r._onMediaKeySystemAccessObtained(t, e)
                    })), a.catch((function (e) {
                        l.b.error('Failed to obtain key-system "' + t + '" access:', e)
                    }))
                }, n._onMediaKeySystemAccessObtained = function (t, e) {
                    var i = this;
                    l.b.log('Access for key-system "' + t + '" obtained');
                    var r = {
                        mediaKeysSessionInitialized: !1,
                        mediaKeySystemAccess: e,
                        mediaKeySystemDomain: t
                    };
                    this._mediaKeysList.push(r);
                    var n = Promise.resolve().then((function () {
                        return e.createMediaKeys()
                    })).then((function (e) {
                        return r.mediaKeys = e, l.b.log('Media-keys created for key-system "' + t + '"'), i._onMediaKeysCreated(), e
                    }));
                    return n.catch((function (t) {
                        l.b.error("Failed to create media-keys:", t)
                    })), n
                }, n._onMediaKeysCreated = function () {
                    var t = this;
                    this._mediaKeysList.forEach((function (e) {
                        e.mediaKeysSession || (e.mediaKeysSession = e.mediaKeys.createSession(), t._onNewMediaKeySession(e.mediaKeysSession))
                    }))
                }, n._onNewMediaKeySession = function (t) {
                    var e = this;
                    l.b.log("New key-system session " + t.sessionId), t.addEventListener("message", (function (i) {
                        e._onKeySessionMessage(t, i.message)
                    }), !1)
                }, n._onKeySessionMessage = function (t, e) {
                    l.b.log("Got EME message event, creating license request"), this._requestLicense(e, (function (e) {
                        l.b.log("Received license data (length: " + (e ? e.byteLength : e) + "), updating key-session"), t.update(e).catch((function (t) {
                            l.b.warn("Updating key-session failed: " + t)
                        }))
                    }))
                }, n.onMediaEncrypted = function (t) {
                    var e = this;
                    if (l.b.log('Media is encrypted using "' + t.initDataType + '" init data type'), !this.mediaKeysPromise) return l.b.error("Fatal: Media is encrypted but no CDM access or no keys have been requested"), void this.hls.trigger(s.a.ERROR, {
                        type: o.b.KEY_SYSTEM_ERROR,
                        details: o.a.KEY_SYSTEM_NO_KEYS,
                        fatal: !0
                    });
                    var i = function (i) {
                        e._media && (e._attemptSetMediaKeys(i), e._generateRequestWithPreferredKeySession(t.initDataType, t.initData))
                    };
                    this.mediaKeysPromise.then(i).catch(i)
                }, n._attemptSetMediaKeys = function (t) {
                    if (!this._media) throw new Error("Attempted to set mediaKeys without first attaching a media element");
                    if (!this._hasSetMediaKeys) {
                        var e = this._mediaKeysList[0];
                        if (!e || !e.mediaKeys) return l.b.error("Fatal: Media is encrypted but no CDM access or no keys have been obtained yet"), void this.hls.trigger(s.a.ERROR, {
                            type: o.b.KEY_SYSTEM_ERROR,
                            details: o.a.KEY_SYSTEM_NO_KEYS,
                            fatal: !0
                        });
                        l.b.log("Setting keys for encrypted media"), this._media.setMediaKeys(e.mediaKeys), this._hasSetMediaKeys = !0
                    }
                }, n._generateRequestWithPreferredKeySession = function (t, e) {
                    var i = this,
                        r = this._mediaKeysList[0];
                    if (!r) return l.b.error("Fatal: Media is encrypted but not any key-system access has been obtained yet"), void this.hls.trigger(s.a.ERROR, {
                        type: o.b.KEY_SYSTEM_ERROR,
                        details: o.a.KEY_SYSTEM_NO_ACCESS,
                        fatal: !0
                    });
                    if (r.mediaKeysSessionInitialized) l.b.warn("Key-Session already initialized but requested again");
                    else {
                        var n = r.mediaKeysSession;
                        if (!n) return l.b.error("Fatal: Media is encrypted but no key-session existing"), void this.hls.trigger(s.a.ERROR, {
                            type: o.b.KEY_SYSTEM_ERROR,
                            details: o.a.KEY_SYSTEM_NO_SESSION,
                            fatal: !0
                        });
                        if (!e) return l.b.warn("Fatal: initData required for generating a key session is null"), void this.hls.trigger(s.a.ERROR, {
                            type: o.b.KEY_SYSTEM_ERROR,
                            details: o.a.KEY_SYSTEM_NO_INIT_DATA,
                            fatal: !0
                        });
                        l.b.log('Generating key-session request for "' + t + '" init data type'), r.mediaKeysSessionInitialized = !0, n.generateRequest(t, e).then((function () {
                            l.b.debug("Key-session generation succeeded")
                        })).catch((function (t) {
                            l.b.error("Error generating key-session request:", t), i.hls.trigger(s.a.ERROR, {
                                type: o.b.KEY_SYSTEM_ERROR,
                                details: o.a.KEY_SYSTEM_NO_SESSION,
                                fatal: !1
                            })
                        }))
                    }
                }, n._createLicenseXhr = function (t, e, i) {
                    //var r = new XMLHttpRequest;
                    var r = new ADD_XMLHttpRequest;
                    r.responseType = "arraybuffer", r.onreadystatechange = this._onLicenseRequestReadyStageChange.bind(this, r, t, e, i);
                    var n = this._licenseXhrSetup;
                    if (n) try {
                        n.call(this.hls, r, t), n = void 0
                    } catch (t) {
                        l.b.error(t)
                    }
                    try {
                        r.readyState || r.open("POST", t, !0), n && n.call(this.hls, r, t)
                    } catch (t) {
                        throw new Error("issue setting up KeySystem license XHR " + t)
                    }
                    return r
                }, n._onLicenseRequestReadyStageChange = function (t, e, i, r) {
                    switch (t.readyState) {
                        case 4:
                            if (200 === t.status) {
                                this._requestLicenseFailureCount = 0, l.b.log("License request succeeded");
                                var n = t.response,
                                    a = this._licenseResponseCallback;
                                if (a) try {
                                    n = a.call(this.hls, t, e)
                                } catch (t) {
                                    l.b.error(t)
                                }
                                r(n)
                            } else {
                                if (l.b.error("License Request XHR failed (" + e + "). Status: " + t.status + " (" + t.statusText + ")"), this._requestLicenseFailureCount++, this._requestLicenseFailureCount > 3) return void this.hls.trigger(s.a.ERROR, {
                                    type: o.b.KEY_SYSTEM_ERROR,
                                    details: o.a.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                                    fatal: !0
                                });
                                var u = 3 - this._requestLicenseFailureCount + 1;
                                l.b.warn("Retrying license request, " + u + " attempts left"), this._requestLicense(i, r)
                            }
                    }
                }, n._generateLicenseRequestChallenge = function (t, e) {
                    switch (t.mediaKeySystemDomain) {
                        case Oi.WIDEVINE:
                            return e
                    }
                    throw new Error("unsupported key-system: " + t.mediaKeySystemDomain)
                }, n._requestLicense = function (t, e) {
                    l.b.log("Requesting content license for key-system");
                    var i = this._mediaKeysList[0];
                    if (!i) return l.b.error("Fatal error: Media is encrypted but no key-system access has been obtained yet"), void this.hls.trigger(s.a.ERROR, {
                        type: o.b.KEY_SYSTEM_ERROR,
                        details: o.a.KEY_SYSTEM_NO_ACCESS,
                        fatal: !0
                    });
                    try {
                        var r = this.getLicenseServerUrl(i.mediaKeySystemDomain),
                            n = this._createLicenseXhr(r, t, e);
                        l.b.log("Sending license request to URL: " + r);
                        var a = this._generateLicenseRequestChallenge(i, t);
                        n.send(a)
                    } catch (t) {
                        l.b.error("Failure requesting DRM license: " + t), this.hls.trigger(s.a.ERROR, {
                            type: o.b.KEY_SYSTEM_ERROR,
                            details: o.a.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                            fatal: !0
                        })
                    }
                }, n.onMediaAttached = function (t, e) {
                    if (this._emeEnabled) {
                        var i = e.media;
                        this._media = i, i.addEventListener("encrypted", this._onMediaEncrypted)
                    }
                }, n.onMediaDetached = function () {
                    var t = this._media,
                        e = this._mediaKeysList;
                    t && (t.removeEventListener("encrypted", this._onMediaEncrypted), this._media = null, this._mediaKeysList = [], Promise.all(e.map((function (t) {
                        if (t.mediaKeysSession) return t.mediaKeysSession.close().catch((function () {}))
                    }))).then((function () {
                        return t.setMediaKeys(null)
                    })).catch((function () {})))
                }, n.onManifestParsed = function (t, e) {
                    if (this._emeEnabled) {
                        var i = e.levels.map((function (t) {
                                return t.audioCodec
                            })).filter((function (t) {
                                return !!t
                            })),
                            r = e.levels.map((function (t) {
                                return t.videoCodec
                            })).filter((function (t) {
                                return !!t
                            }));
                        this._attemptKeySystemAccess(Oi.WIDEVINE, i, r)
                    }
                }, e = t, (i = [{
                    key: "requestMediaKeySystemAccess",
                    get: function () {
                        if (!this._requestMediaKeySystemAccess) throw new Error("No requestMediaKeySystemAccess function configured");
                        return this._requestMediaKeySystemAccess
                    }
                }]) && Pi(e.prototype, i), r && Pi(e, r), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t
            }();
    
            function Bi(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
    
            function Gi(t, e, i) {
                return e && Bi(t.prototype, e), i && Bi(t, i), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), t
            }
    
            function ji(t, e) {
                var i = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (i) return (i = i.call(t)).next.bind(i);
                if (Array.isArray(t) || (i = function (t, e) {
                        if (!t) return;
                        if ("string" == typeof t) return Ki(t, e);
                        var i = Object.prototype.toString.call(t).slice(8, -1);
                        "Object" === i && t.constructor && (i = t.constructor.name);
                        if ("Map" === i || "Set" === i) return Array.from(t);
                        if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return Ki(t, e)
                    }(t)) || e && t && "number" == typeof t.length) {
                    i && (t = i);
                    var r = 0;
                    return function () {
                        return r >= t.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: t[r++]
                        }
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
    
            function Ki(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var i = 0, r = new Array(e); i < e; i++) r[i] = t[i];
                return r
            }
    
            function Hi() {
                return (Hi = Object.assign ? Object.assign.bind() : function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
                    }
                    return t
                }).apply(this, arguments)
            }! function (t) {
                t.MANIFEST = "m", t.AUDIO = "a", t.VIDEO = "v", t.MUXED = "av", t.INIT = "i", t.CAPTION = "c", t.TIMED_TEXT = "tt", t.KEY = "k", t.OTHER = "o"
            }(Fi || (Fi = {})),
            function (t) {
                t.DASH = "d", t.HLS = "h", t.SMOOTH = "s", t.OTHER = "o"
            }(Mi || (Mi = {})),
            function (t) {
                t.VOD = "v", t.LIVE = "l"
            }(Ni || (Ni = {}));
            var Vi = function () {
                    function t(e) {
                        var i = this;
                        this.hls = void 0, this.config = void 0, this.media = void 0, this.sid = void 0, this.cid = void 0, this.useHeaders = !1, this.initialized = !1, this.starved = !1, this.buffering = !0, this.audioBuffer = void 0, this.videoBuffer = void 0, this.onWaiting = function () {
                            i.initialized && (i.starved = !0), i.buffering = !0
                        }, this.onPlaying = function () {
                            i.initialized || (i.initialized = !0), i.buffering = !1
                        }, this.applyPlaylistData = function (t) {
                            try {
                                i.apply(t, {
                                    ot: Fi.MANIFEST,
                                    su: !i.initialized
                                })
                            } catch (t) {
                                l.b.warn("Could not generate manifest CMCD data.", t)
                            }
                        }, this.applyFragmentData = function (t) {
                            try {
                                var e = t.frag,
                                    r = i.hls.levels[e.level],
                                    n = i.getObjectType(e),
                                    a = {
                                        d: 1e3 * e.duration,
                                        ot: n
                                    };
                                n !== Fi.VIDEO && n !== Fi.AUDIO && n != Fi.MUXED || (a.br = r.bitrate / 1e3, a.tb = i.getTopBandwidth(n) / 1e3, a.bl = i.getBufferLength(n)), i.apply(t, a)
                            } catch (t) {
                                l.b.warn("Could not generate segment CMCD data.", t)
                            }
                        }, this.hls = e;
                        var r = this.config = e.config,
                            n = r.cmcd;
                        null != n && (r.pLoader = this.createPlaylistLoader(), r.fLoader = this.createFragmentLoader(), this.sid = n.sessionId || t.uuid(), this.cid = n.contentId, this.useHeaders = !0 === n.useHeaders, this.registerListeners())
                    }
                    var e = t.prototype;
                    return e.registerListeners = function () {
                        var t = this.hls;
                        t.on(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(s.a.MEDIA_DETACHED, this.onMediaDetached, this), t.on(s.a.BUFFER_CREATED, this.onBufferCreated, this)
                    }, e.unregisterListeners = function () {
                        var t = this.hls;
                        t.off(s.a.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(s.a.MEDIA_DETACHED, this.onMediaDetached, this), t.off(s.a.BUFFER_CREATED, this.onBufferCreated, this), this.onMediaDetached()
                    }, e.destroy = function () {
                        this.unregisterListeners(), this.hls = this.config = this.audioBuffer = this.videoBuffer = null
                    }, e.onMediaAttached = function (t, e) {
                        this.media = e.media, this.media.addEventListener("waiting", this.onWaiting), this.media.addEventListener("playing", this.onPlaying)
                    }, e.onMediaDetached = function () {
                        this.media && (this.media.removeEventListener("waiting", this.onWaiting), this.media.removeEventListener("playing", this.onPlaying), this.media = null)
                    }, e.onBufferCreated = function (t, e) {
                        var i, r;
                        this.audioBuffer = null === (i = e.tracks.audio) || void 0 === i ? void 0 : i.buffer, this.videoBuffer = null === (r = e.tracks.video) || void 0 === r ? void 0 : r.buffer
                    }, e.createData = function () {
                        var t;
                        return {
                            v: 1,
                            sf: Mi.HLS,
                            sid: this.sid,
                            cid: this.cid,
                            pr: null === (t = this.media) || void 0 === t ? void 0 : t.playbackRate,
                            mtp: this.hls.bandwidthEstimate / 1e3
                        }
                    }, e.apply = function (e, i) {
                        void 0 === i && (i = {}), Hi(i, this.createData());
                        var r = i.ot === Fi.INIT || i.ot === Fi.VIDEO || i.ot === Fi.MUXED;
                        if (this.starved && r && (i.bs = !0, i.su = !0, this.starved = !1), null == i.su && (i.su = this.buffering), this.useHeaders) {
                            var n = t.toHeaders(i);
                            if (!Object.keys(n).length) return;
                            e.headers || (e.headers = {}), Hi(e.headers, n)
                        } else {
                            var a = t.toQuery(i);
                            if (!a) return;
                            e.url = t.appendQueryToUri(e.url, a)
                        }
                    }, e.getObjectType = function (t) {
                        var e = t.type;
                        return "subtitle" === e ? Fi.TIMED_TEXT : "initSegment" === t.sn ? Fi.INIT : "audio" === e ? Fi.AUDIO : "main" === e ? this.hls.audioTracks.length ? Fi.VIDEO : Fi.MUXED : void 0
                    }, e.getTopBandwidth = function (t) {
                        var e, i = 0,
                            r = this.hls;
                        if (t === Fi.AUDIO) e = r.audioTracks;
                        else {
                            var n = r.maxAutoLevel,
                                a = n > -1 ? n + 1 : r.levels.length;
                            e = r.levels.slice(0, a)
                        }
                        for (var s, o = ji(e); !(s = o()).done;) {
                            var l = s.value;
                            l.bitrate > i && (i = l.bitrate)
                        }
                        return i > 0 ? i : NaN
                    }, e.getBufferLength = function (t) {
                        var e = this.hls.media,
                            i = t === Fi.AUDIO ? this.audioBuffer : this.videoBuffer;
                        return i && e ? 1e3 * mt.bufferInfo(i, e.currentTime, this.config.maxBufferHole).len : NaN
                    }, e.createPlaylistLoader = function () {
                        var t = this.config.pLoader,
                            e = this.applyPlaylistData,
                            i = t || this.config.loader;
                        return function () {
                            function t(t) {
                                this.loader = void 0, this.loader = new i(t)
                            }
                            var r = t.prototype;
                            return r.destroy = function () {
                                this.loader.destroy()
                            }, r.abort = function () {
                                this.loader.abort()
                            }, r.load = function (t, i, r) {
                                e(t), this.loader.load(t, i, r)
                            }, Gi(t, [{
                                key: "stats",
                                get: function () {
                                    return this.loader.stats
                                }
                            }, {
                                key: "context",
                                get: function () {
                                    return this.loader.context
                                }
                            }]), t
                        }()
                    }, e.createFragmentLoader = function () {
                        var t = this.config.fLoader,
                            e = this.applyFragmentData,
                            i = t || this.config.loader;
                        return function () {
                            function t(t) {
                                this.loader = void 0, this.loader = new i(t)
                            }
                            var r = t.prototype;
                            return r.destroy = function () {
                                this.loader.destroy()
                            }, r.abort = function () {
                                this.loader.abort()
                            }, r.load = function (t, i, r) {
                                e(t), this.loader.load(t, i, r)
                            }, Gi(t, [{
                                key: "stats",
                                get: function () {
                                    return this.loader.stats
                                }
                            }, {
                                key: "context",
                                get: function () {
                                    return this.loader.context
                                }
                            }]), t
                        }()
                    }, t.uuid = function () {
                        var t = URL.createObjectURL(new Blob),
                            e = t.toString();
                        return URL.revokeObjectURL(t), e.slice(e.lastIndexOf("/") + 1)
                    }, t.serialize = function (t) {
                        for (var e, i = [], r = function (t) {
                                return !Number.isNaN(t) && null != t && "" !== t && !1 !== t
                            }, n = function (t) {
                                return Math.round(t)
                            }, a = function (t) {
                                return 100 * n(t / 100)
                            }, s = {
                                br: n,
                                d: n,
                                bl: a,
                                dl: a,
                                mtp: a,
                                nor: function (t) {
                                    return encodeURIComponent(t)
                                },
                                rtp: a,
                                tb: n
                            }, o = ji(Object.keys(t || {}).sort()); !(e = o()).done;) {
                            var l = e.value,
                                u = t[l];
                            if (r(u) && !("v" === l && 1 === u || "pr" == l && 1 === u)) {
                                var h = s[l];
                                h && (u = h(u));
                                var d = typeof u,
                                    c = void 0;
                                c = "ot" === l || "sf" === l || "st" === l ? l + "=" + u : "boolean" === d ? l : "number" === d ? l + "=" + u : l + "=" + JSON.stringify(u), i.push(c)
                            }
                        }
                        return i.join(",")
                    }, t.toHeaders = function (e) {
                        for (var i = {}, r = ["Object", "Request", "Session", "Status"], n = [{}, {}, {}, {}], a = {
                                br: 0,
                                d: 0,
                                ot: 0,
                                tb: 0,
                                bl: 1,
                                dl: 1,
                                mtp: 1,
                                nor: 1,
                                nrr: 1,
                                su: 1,
                                cid: 2,
                                pr: 2,
                                sf: 2,
                                sid: 2,
                                st: 2,
                                v: 2,
                                bs: 3,
                                rtp: 3
                            }, s = 0, o = Object.keys(e); s < o.length; s++) {
                            var l = o[s];
                            n[null != a[l] ? a[l] : 1][l] = e[l]
                        }
                        for (var u = 0; u < n.length; u++) {
                            var h = t.serialize(n[u]);
                            h && (i["CMCD-" + r[u]] = h)
                        }
                        return i
                    }, t.toQuery = function (e) {
                        return "CMCD=" + encodeURIComponent(t.serialize(e))
                    }, t.appendQueryToUri = function (t, e) {
                        if (!e) return t;
                        var i = t.includes("?") ? "&" : "?";
                        return "" + t + i + e
                    }, t
                }(),
                Wi = i(14),
                Yi = /^age:\s*[\d.]+\s*$/m,
                qi = function () {
                    function t(t) {
                        this.xhrSetup = void 0, this.requestTimeout = void 0, this.retryTimeout = void 0, this.retryDelay = void 0, this.config = null, this.callbacks = null, this.context = void 0, this.loader = null, this.stats = void 0, this.xhrSetup = t ? t.xhrSetup : null, this.stats = new Wi.a, this.retryDelay = 0
                    }
                    var e = t.prototype;
                    return e.destroy = function () {
                        this.callbacks = null, this.abortInternal(), this.loader = null, this.config = null
                    }, e.abortInternal = function () {
                        var t = this.loader;
                        self.clearTimeout(this.requestTimeout), self.clearTimeout(this.retryTimeout), t && (t.onreadystatechange = null, t.onprogress = null, 4 !== t.readyState && (this.stats.aborted = !0, t.abort()))
                    }, e.abort = function () {
                        var t;
                        this.abortInternal(), null !== (t = this.callbacks) && void 0 !== t && t.onAbort && this.callbacks.onAbort(this.stats, this.context, this.loader)
                    }, e.load = function (t, e, i) {
                        if (this.stats.loading.start) throw new Error("Loader can only be used once.");
                        this.stats.loading.start = self.performance.now(), this.context = t, this.config = e, this.callbacks = i, this.retryDelay = e.retryDelay, this.loadInternal()
                    }, e.loadInternal = function () {
                        var t = this.config,
                            e = this.context;
                        if (t) {
                            //var i = this.loader = new self.XMLHttpRequest,
                            var i = this.loader = new ADD_XMLHttpRequest,
                                r = this.stats;
                            r.loading.first = 0, r.loaded = 0;
                            var n = this.xhrSetup;
                            try {
                                if (n) try {
                                    n(i, e.url)
                                } catch (t) {
                                    i.open("GET", e.url, !0), n(i, e.url)
                                }
                                i.readyState || i.open("GET", e.url, !0);
                                var a = this.context.headers;
                                if (a)
                                    for (var s in a) i.setRequestHeader(s, a[s])
                            } catch (t) {
                                return void this.callbacks.onError({
                                    code: i.status,
                                    text: t.message
                                }, e, i)
                            }
                            e.rangeEnd && i.setRequestHeader("Range", "bytes=" + e.rangeStart + "-" + (e.rangeEnd - 1)), i.onreadystatechange = this.readystatechange.bind(this), i.onprogress = this.loadprogress.bind(this), i.responseType = e.responseType, self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), t.timeout), i.send()
                        }
                    }, e.readystatechange = function () {
                        var t = this.context,
                            e = this.loader,
                            i = this.stats;
                        if (t && e) {
                            var r = e.readyState,
                                n = this.config;
                            if (!i.aborted && r >= 2)
                                if (self.clearTimeout(this.requestTimeout), 0 === i.loading.first && (i.loading.first = Math.max(self.performance.now(), i.loading.start)), 4 === r) {
                                    e.onreadystatechange = null, e.onprogress = null;
                                    var a = e.status;
                                    if (a >= 200 && a < 300) {
                                        var s, o;
                                        if (i.loading.end = Math.max(self.performance.now(), i.loading.first), o = "arraybuffer" === t.responseType ? (s = e.response).byteLength : (s = e.responseText).length, i.loaded = i.total = o, !this.callbacks) return;
                                        var u = this.callbacks.onProgress;
                                        if (u && u(i, t, s, e), !this.callbacks) return;
                                        var h = {
                                            url: e.responseURL,
                                            data: s
                                        };
                                        this.callbacks.onSuccess(h, i, t, e)
                                    } else i.retry >= n.maxRetry || a >= 400 && a < 499 ? (l.b.error(a + " while loading " + t.url), this.callbacks.onError({
                                        code: a,
                                        text: e.statusText
                                    }, t, e)) : (l.b.warn(a + " while loading " + t.url + ", retrying in " + this.retryDelay + "..."), this.abortInternal(), this.loader = null, self.clearTimeout(this.retryTimeout), this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay), this.retryDelay = Math.min(2 * this.retryDelay, n.maxRetryDelay), i.retry++)
                                } else self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), n.timeout)
                        }
                    }, e.loadtimeout = function () {
                        l.b.warn("timeout while loading " + this.context.url);
                        var t = this.callbacks;
                        t && (this.abortInternal(), t.onTimeout(this.stats, this.context, this.loader))
                    }, e.loadprogress = function (t) {
                        var e = this.stats;
                        e.loaded = t.loaded, t.lengthComputable && (e.total = t.total)
                    }, e.getCacheAge = function () {
                        var t = null;
                        if (this.loader && Yi.test(this.loader.getAllResponseHeaders())) {
                            var e = this.loader.getResponseHeader("age");
                            t = e ? parseFloat(e) : null
                        }
                        return t
                    }, t
                }();
    
            function zi(t) {
                var e = "function" == typeof Map ? new Map : void 0;
                return (zi = function (t) {
                    if (null === t || (i = t, -1 === Function.toString.call(i).indexOf("[native code]"))) return t;
                    var i;
                    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== e) {
                        if (e.has(t)) return e.get(t);
                        e.set(t, r)
                    }
    
                    function r() {
                        return Xi(t, arguments, Ji(this).constructor)
                    }
                    return r.prototype = Object.create(t.prototype, {
                        constructor: {
                            value: r,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), $i(r, t)
                })(t)
            }
    
            function Xi(t, e, i) {
                return (Xi = Qi() ? Reflect.construct.bind() : function (t, e, i) {
                    var r = [null];
                    r.push.apply(r, e);
                    var n = new(Function.bind.apply(t, r));
                    return i && $i(n, i.prototype), n
                }).apply(null, arguments)
            }
    
            function Qi() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }
    
            function $i(t, e) {
                return ($i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
    
            function Ji(t) {
                return (Ji = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }
    
            function Zi() {
                return (Zi = Object.assign ? Object.assign.bind() : function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
                    }
                    return t
                }).apply(this, arguments)
            }
            var tr = function () {
                function t(t) {
                    this.fetchSetup = void 0, this.requestTimeout = void 0, this.request = void 0, this.response = void 0, this.controller = void 0, this.context = void 0, this.config = null, this.callbacks = null, this.stats = void 0, this.loader = null, this.fetchSetup = t.fetchSetup || er, this.controller = new self.AbortController, this.stats = new Wi.a
                }
                var e = t.prototype;
                return e.destroy = function () {
                    this.loader = this.callbacks = null, this.abortInternal()
                }, e.abortInternal = function () {
                    var t = this.response;
                    t && t.ok || (this.stats.aborted = !0, this.controller.abort())
                }, e.abort = function () {
                    var t;
                    this.abortInternal(), null !== (t = this.callbacks) && void 0 !== t && t.onAbort && this.callbacks.onAbort(this.stats, this.context, this.response)
                }, e.load = function (t, e, i) {
                    var r = this,
                        n = this.stats;
                    if (n.loading.start) throw new Error("Loader can only be used once.");
                    n.loading.start = self.performance.now();
                    var s = function (t, e) {
                            var i = {
                                method: "GET",
                                mode: "cors",
                                credentials: "same-origin",
                                signal: e,
                                headers: new self.Headers(Zi({}, t.headers))
                            };
                            t.rangeEnd && i.headers.set("Range", "bytes=" + t.rangeStart + "-" + String(t.rangeEnd - 1));
                            return i
                        }(t, this.controller.signal),
                        o = i.onProgress,
                        l = "arraybuffer" === t.responseType,
                        u = l ? "byteLength" : "length";
                    this.context = t, this.config = e, this.callbacks = i, this.request = this.fetchSetup(t, s), self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout((function () {
                        r.abortInternal(), i.onTimeout(n, t, r.response)
                    }), e.timeout), self.fetch(this.request).then((function (i) {
                        if (r.response = r.loader = i, !i.ok) {
                            var s = i.status,
                                u = i.statusText;
                            throw new ir(u || "fetch, bad network response", s, i)
                        }
                        return n.loading.first = Math.max(self.performance.now(), n.loading.start), n.total = parseInt(i.headers.get("Content-Length") || "0"), o && Object(a.a)(e.highWaterMark) ? r.loadProgressively(i, n, t, e.highWaterMark, o) : l ? i.arrayBuffer() : i.text()
                    })).then((function (s) {
                        var l = r.response;
                        self.clearTimeout(r.requestTimeout), n.loading.end = Math.max(self.performance.now(), n.loading.first), n.loaded = n.total = s[u];
                        var h = {
                            url: l.url,
                            data: s
                        };
                        o && !Object(a.a)(e.highWaterMark) && o(n, t, s, l), i.onSuccess(h, n, t, l)
                    })).catch((function (e) {
                        if (self.clearTimeout(r.requestTimeout), !n.aborted) {
                            var a = e && e.code || 0,
                                s = e ? e.message : null;
                            i.onError({
                                code: a,
                                text: s
                            }, t, e ? e.details : null)
                        }
                    }))
                }, e.getCacheAge = function () {
                    var t = null;
                    if (this.response) {
                        var e = this.response.headers.get("age");
                        t = e ? parseFloat(e) : null
                    }
                    return t
                }, e.loadProgressively = function (t, e, i, r, n) {
                    void 0 === r && (r = 0);
                    var a = new pe,
                        s = t.body.getReader();
                    return function o() {
                        return s.read().then((function (s) {
                            if (s.done) return a.dataLength && n(e, i, a.flush(), t), Promise.resolve(new ArrayBuffer(0));
                            var l = s.value,
                                u = l.length;
                            return e.loaded += u, u < r || a.dataLength ? (a.push(l), a.dataLength >= r && n(e, i, a.flush(), t)) : n(e, i, l, t), o()
                        })).catch((function () {
                            return Promise.reject()
                        }))
                    }()
                }, t
            }();
    
            function er(t, e) {
                return new self.Request(t.url, e)
            }
            var ir = function (t) {
                    var e, i;
    
                    function r(e, i, r) {
                        var n;
                        return (n = t.call(this, e) || this).code = void 0, n.details = void 0, n.code = i, n.details = r, n
                    }
                    return i = t, (e = r).prototype = Object.create(i.prototype), e.prototype.constructor = e, $i(e, i), r
                }(zi(Error)),
                rr = tr,
                nr = /\s/;
    
            function ar() {
                return (ar = Object.assign ? Object.assign.bind() : function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
                    }
                    return t
                }).apply(this, arguments)
            }
    
            function sr(t, e) {
                var i = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e && (r = r.filter((function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), i.push.apply(i, r)
                }
                return i
            }
    
            function or(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? sr(Object(i), !0).forEach((function (e) {
                        lr(t, e, i[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : sr(Object(i)).forEach((function (e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
                    }))
                }
                return t
            }
    
            function lr(t, e, i) {
                return e in t ? Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = i, t
            }
            var ur = or(or({
                autoStartLoad: !0,
                startPosition: -1,
                defaultAudioCodec: void 0,
                debug: hlsdebug,
                capLevelOnFPSDrop: !1,
                capLevelToPlayerSize: !1,
                ignoreDevicePixelRatio: !1,
                initialLiveManifestSize: 1,
                maxBufferLength: 30,
                backBufferLength: 1 / 0,
                maxBufferSize: 6e7,
                maxBufferHole: .1,
                highBufferWatchdogPeriod: 2,
                nudgeOffset: .1,
                nudgeMaxRetry: 3,
                maxFragLookUpTolerance: .25,
                liveSyncDurationCount: 3,
                liveMaxLatencyDurationCount: 1 / 0,
                liveSyncDuration: void 0,
                liveMaxLatencyDuration: void 0,
                maxLiveSyncPlaybackRate: 1,
                liveDurationInfinity: !1,
                liveBackBufferLength: null,
                maxMaxBufferLength: 600,
                enableWorker: !0,
                enableSoftwareAES: !0,
                manifestLoadingTimeOut: 1e4,
                manifestLoadingMaxRetry: 1,
                manifestLoadingRetryDelay: 1e3,
                manifestLoadingMaxRetryTimeout: 64e3,
                startLevel: void 0,
                levelLoadingTimeOut: 1e4,
                levelLoadingMaxRetry: 4,
                levelLoadingRetryDelay: 1e3,
                levelLoadingMaxRetryTimeout: 64e3,
                fragLoadingTimeOut: 2e4,
                fragLoadingMaxRetry: 6,
                fragLoadingRetryDelay: 1e3,
                fragLoadingMaxRetryTimeout: 64e3,
                startFragPrefetch: !1,
                fpsDroppedMonitoringPeriod: 5e3,
                fpsDroppedMonitoringThreshold: .2,
                appendErrorMaxRetry: 3,
                loader: qi,
                fLoader: void 0,
                pLoader: void 0,
                xhrSetup: void 0,
                licenseXhrSetup: void 0,
                licenseResponseCallback: void 0,
                abrController: ve,
                bufferController: Fe,
                capLevelController: Ci,
                fpsController: wi,
                stretchShortVideoTrack: !1,
                maxAudioFramesDrift: 1,
                forceKeyFrameOnDiscontinuity: !0,
                abrEwmaFastLive: 3,
                abrEwmaSlowLive: 9,
                abrEwmaFastVoD: 3,
                abrEwmaSlowVoD: 9,
                abrEwmaDefaultEstimate: 5e5,
                abrBandWidthFactor: .95,
                abrBandWidthUpFactor: .7,
                abrMaxWithRealBitrate: !1,
                maxStarvationDelay: 4,
                maxLoadingDelay: 4,
                minAutoBitrate: 0,
                emeEnabled: !1,
                widevineLicenseUrl: void 0,
                drmSystemOptions: {},
                requestMediaKeySystemAccessFunc: xi,
                testBandwidth: !0,
                progressive: !1,
                lowLatencyMode: !0,
                cmcd: void 0,
                enableDateRangeMetadataCues: !0,
                enableEmsgMetadataCues: !0,
                enableID3MetadataCues: !0
            }, {
                cueHandler: {
                    newCue: function (t, e, i, r) {
                        for (var n, a, s, o, l, u = [], h = self.VTTCue || self.TextTrackCue, d = 0; d < r.rows.length; d++)
                            if (s = !0, o = 0, l = "", !(n = r.rows[d]).isEmpty()) {
                                for (var c = 0; c < n.chars.length; c++) nr.test(n.chars[c].uchar) && s ? o++ : (l += n.chars[c].uchar, s = !1);
                                n.cueStartTime = e, e === i && (i += 1e-4), o >= 16 ? o-- : o++;
                                var f = li(l.trim()),
                                    g = vi(e, i, f);
                                t && t.cues && t.cues.getCueById(g) || ((a = new h(e, i, f)).id = g, a.line = d + 1, a.align = "left", a.position = 10 + Math.min(80, 10 * Math.floor(8 * o / 32)), u.push(a))
                            } return t && u.length && (u.sort((function (t, e) {
                            return "auto" === t.line || "auto" === e.line ? 0 : t.line > 8 && e.line > 8 ? e.line - t.line : t.line - e.line
                        })), u.forEach((function (e) {
                            return N(t, e)
                        }))), u
                    }
                },
                enableWebVTT: !0,
                enableIMSC1: !0,
                enableCEA708Captions: !0,
                captionsTextTrack1Label: "English",
                captionsTextTrack1LanguageCode: "en",
                captionsTextTrack2Label: "Spanish",
                captionsTextTrack2LanguageCode: "es",
                captionsTextTrack3Label: "Unknown CC",
                captionsTextTrack3LanguageCode: "",
                captionsTextTrack4Label: "Unknown CC",
                captionsTextTrack4LanguageCode: "",
                renderTextTracksNatively: !0
            }), {}, {
                subtitleStreamController: De,
                subtitleTrackController: Ce,
                timelineController: ki,
                audioStreamController: Te,
                audioTrackController: Se,
                emeController: Ui,
                cmcdController: Vi
            });
    
            function hr(t) {
                var e = t.loader;
                e !== rr && e !== qi ? (l.b.log("[config]: Custom loader detected, cannot enable progressive streaming"), t.progressive = !1) : function () {
                    if (self.fetch && self.AbortController && self.ReadableStream && self.Request) try {
                        return new self.ReadableStream({}), !0
                    } catch (t) {}
                    return !1
                }() && (t.loader = rr, t.progressive = !0, t.enableSoftwareAES = !0, l.b.log("[config]: Progressive streaming enabled, using FetchLoader"))
            }
    
            function dr(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            var cr = function () {
                function t(e) {
                    void 0 === e && (e = {}), this.config = void 0, this.userConfig = void 0, this.coreComponents = void 0, this.networkControllers = void 0, this._emitter = new ae.EventEmitter, this._autoLevelCapping = void 0, this.abrController = void 0, this.bufferController = void 0, this.capLevelController = void 0, this.latencyController = void 0, this.levelController = void 0, this.streamController = void 0, this.audioTrackController = void 0, this.subtitleTrackController = void 0, this.emeController = void 0, this.cmcdController = void 0, this._media = null, this.url = null;
                    var i = this.config = function (t, e) {
                        if ((e.liveSyncDurationCount || e.liveMaxLatencyDurationCount) && (e.liveSyncDuration || e.liveMaxLatencyDuration)) throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
                        if (void 0 !== e.liveMaxLatencyDurationCount && (void 0 === e.liveSyncDurationCount || e.liveMaxLatencyDurationCount <= e.liveSyncDurationCount)) throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"');
                        if (void 0 !== e.liveMaxLatencyDuration && (void 0 === e.liveSyncDuration || e.liveMaxLatencyDuration <= e.liveSyncDuration)) throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"');
                        return ar({}, t, e)
                    }(t.DefaultConfig, e);
                    this.userConfig = e, Object(l.a)(i.debug), this._autoLevelCapping = -1, i.progressive && hr(i);
                    var r = i.abrController,
                        n = i.bufferController,
                        a = i.capLevelController,
                        s = i.fpsController,
                        o = this.abrController = new r(this),
                        u = this.bufferController = new n(this),
                        h = this.capLevelController = new a(this),
                        d = new s(this),
                        c = new P(this),
                        f = new F(this),
                        g = new V(this),
                        v = this.levelController = new dt(this),
                        p = new ct(this),
                        m = this.streamController = new de(this, p);
                    h.setStreamController(m), d.setStreamController(m);
                    var y = [c, f, v, m];
                    this.networkControllers = y;
                    var T = [o, u, h, d, g, p];
                    this.audioTrackController = this.createController(i.audioTrackController, null, y), this.createController(i.audioStreamController, p, y), this.subtitleTrackController = this.createController(i.subtitleTrackController, null, y), this.createController(i.subtitleStreamController, p, y), this.createController(i.timelineController, null, T), this.emeController = this.createController(i.emeController, null, T), this.cmcdController = this.createController(i.cmcdController, null, T), this.latencyController = this.createController(q, null, T), this.coreComponents = T
                }
                t.isSupported = function () {
                    return function () {
                        var t = ee();
                        if (!t) return !1;
                        var e = ie(),
                            i = t && "function" == typeof t.isTypeSupported && t.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),
                            r = !e || e.prototype && "function" == typeof e.prototype.appendBuffer && "function" == typeof e.prototype.remove;
                        return !!i && !!r
                    }()
                };
                var e, i, r, a = t.prototype;
                return a.createController = function (t, e, i) {
                    if (t) {
                        var r = e ? new t(this, e) : new t(this);
                        return i && i.push(r), r
                    }
                    return null
                }, a.on = function (t, e, i) {
                    void 0 === i && (i = this), this._emitter.on(t, e, i)
                }, a.once = function (t, e, i) {
                    void 0 === i && (i = this), this._emitter.once(t, e, i)
                }, a.removeAllListeners = function (t) {
                    this._emitter.removeAllListeners(t)
                }, a.off = function (t, e, i, r) {
                    void 0 === i && (i = this), this._emitter.off(t, e, i, r)
                }, a.listeners = function (t) {
                    return this._emitter.listeners(t)
                }, a.emit = function (t, e, i) {
                    return this._emitter.emit(t, e, i)
                }, a.trigger = function (t, e) {
                    if (this.config.debug) return this.emit(t, t, e);
                    try {
                        return this.emit(t, t, e)
                    } catch (e) {
                        l.b.error("An internal error happened while handling event " + t + '. Error message: "' + e.message + '". Here is a stacktrace:', e), this.trigger(s.a.ERROR, {
                            type: o.b.OTHER_ERROR,
                            details: o.a.INTERNAL_EXCEPTION,
                            fatal: !1,
                            event: t,
                            error: e
                        })
                    }
                    return !1
                }, a.listenerCount = function (t) {
                    return this._emitter.listenerCount(t)
                }, a.destroy = function () {
                    l.b.log("destroy"), this.trigger(s.a.DESTROYING, void 0), this.detachMedia(), this.removeAllListeners(), this._autoLevelCapping = -1, this.url = null, this.networkControllers.forEach((function (t) {
                        return t.destroy()
                    })), this.networkControllers.length = 0, this.coreComponents.forEach((function (t) {
                        return t.destroy()
                    })), this.coreComponents.length = 0
                }, a.attachMedia = function (t) {
                    l.b.log("attachMedia"), this._media = t, this.trigger(s.a.MEDIA_ATTACHING, {
                        media: t
                    })
                }, a.detachMedia = function () {
                    l.b.log("detachMedia"), this.trigger(s.a.MEDIA_DETACHING, void 0), this._media = null
                }, a.loadSource = function (t) {
                    this.stopLoad();
                    var e = this.media,
                        i = this.url,
                        r = this.url = n.buildAbsoluteURL(self.location.href, t, {
                            alwaysNormalize: !0
                        });
                    l.b.log("loadSource:" + r), e && i && i !== r && this.bufferController.hasSourceTypes() && (this.detachMedia(), this.attachMedia(e)), this.trigger(s.a.MANIFEST_LOADING, {
                        url: t
                    })
                }, a.startLoad = function (t) {
                    void 0 === t && (t = -1), l.b.log("startLoad(" + t + ")"), this.networkControllers.forEach((function (e) {
                        e.startLoad(t)
                    }))
                }, a.stopLoad = function () {
                    l.b.log("stopLoad"), this.networkControllers.forEach((function (t) {
                        t.stopLoad()
                    }))
                }, a.swapAudioCodec = function () {
                    l.b.log("swapAudioCodec"), this.streamController.swapAudioCodec()
                }, a.recoverMediaError = function () {
                    l.b.log("recoverMediaError");
                    var t = this._media;
                    this.detachMedia(), t && this.attachMedia(t)
                }, a.removeLevel = function (t, e) {
                    void 0 === e && (e = 0), this.levelController.removeLevel(t, e)
                }, e = t, r = [{
                    key: "version",
                    get: function () {
                        return "1.2.4"
                    }
                }, {
                    key: "Events",
                    get: function () {
                        return s.a
                    }
                }, {
                    key: "ErrorTypes",
                    get: function () {
                        return o.b
                    }
                }, {
                    key: "ErrorDetails",
                    get: function () {
                        return o.a
                    }
                }, {
                    key: "DefaultConfig",
                    get: function () {
                        return t.defaultConfig ? t.defaultConfig : ur
                    },
                    set: function (e) {
                        t.defaultConfig = e
                    }
                }], (i = [{
                    key: "levels",
                    get: function () {
                        var t = this.levelController.levels;
                        return t || []
                    }
                }, {
                    key: "currentLevel",
                    get: function () {
                        return this.streamController.currentLevel
                    },
                    set: function (t) {
                        l.b.log("set currentLevel:" + t), this.loadLevel = t, this.abrController.clearTimer(), this.streamController.immediateLevelSwitch()
                    }
                }, {
                    key: "nextLevel",
                    get: function () {
                        return this.streamController.nextLevel
                    },
                    set: function (t) {
                        l.b.log("set nextLevel:" + t), this.levelController.manualLevel = t, this.streamController.nextLevelSwitch()
                    }
                }, {
                    key: "loadLevel",
                    get: function () {
                        return this.levelController.level
                    },
                    set: function (t) {
                        l.b.log("set loadLevel:" + t), this.levelController.manualLevel = t
                    }
                }, {
                    key: "nextLoadLevel",
                    get: function () {
                        return this.levelController.nextLoadLevel
                    },
                    set: function (t) {
                        this.levelController.nextLoadLevel = t
                    }
                }, {
                    key: "firstLevel",
                    get: function () {
                        return Math.max(this.levelController.firstLevel, this.minAutoLevel)
                    },
                    set: function (t) {
                        l.b.log("set firstLevel:" + t), this.levelController.firstLevel = t
                    }
                }, {
                    key: "startLevel",
                    get: function () {
                        return this.levelController.startLevel
                    },
                    set: function (t) {
                        l.b.log("set startLevel:" + t), -1 !== t && (t = Math.max(t, this.minAutoLevel)), this.levelController.startLevel = t
                    }
                }, {
                    key: "capLevelToPlayerSize",
                    get: function () {
                        return this.config.capLevelToPlayerSize
                    },
                    set: function (t) {
                        var e = !!t;
                        e !== this.config.capLevelToPlayerSize && (e ? this.capLevelController.startCapping() : (this.capLevelController.stopCapping(), this.autoLevelCapping = -1, this.streamController.nextLevelSwitch()), this.config.capLevelToPlayerSize = e)
                    }
                }, {
                    key: "autoLevelCapping",
                    get: function () {
                        return this._autoLevelCapping
                    },
                    set: function (t) {
                        this._autoLevelCapping !== t && (l.b.log("set autoLevelCapping:" + t), this._autoLevelCapping = t)
                    }
                }, {
                    key: "bandwidthEstimate",
                    get: function () {
                        var t = this.abrController.bwEstimator;
                        return t ? t.getEstimate() : NaN
                    }
                }, {
                    key: "autoLevelEnabled",
                    get: function () {
                        return -1 === this.levelController.manualLevel
                    }
                }, {
                    key: "manualLevel",
                    get: function () {
                        return this.levelController.manualLevel
                    }
                }, {
                    key: "minAutoLevel",
                    get: function () {
                        var t = this.levels,
                            e = this.config.minAutoBitrate;
                        if (!t) return 0;
                        for (var i = t.length, r = 0; r < i; r++)
                            if (t[r].maxBitrate >= e) return r;
                        return 0
                    }
                }, {
                    key: "maxAutoLevel",
                    get: function () {
                        var t = this.levels,
                            e = this.autoLevelCapping;
                        return -1 === e && t && t.length ? t.length - 1 : e
                    }
                }, {
                    key: "nextAutoLevel",
                    get: function () {
                        return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel)
                    },
                    set: function (t) {
                        this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, t)
                    }
                }, {
                    key: "playingDate",
                    get: function () {
                        return this.streamController.currentProgramDateTime
                    }
                }, {
                    key: "mainForwardBufferInfo",
                    get: function () {
                        return this.streamController.getMainFwdBufferInfo()
                    }
                }, {
                    key: "audioTracks",
                    get: function () {
                        var t = this.audioTrackController;
                        return t ? t.audioTracks : []
                    }
                }, {
                    key: "audioTrack",
                    get: function () {
                        var t = this.audioTrackController;
                        return t ? t.audioTrack : -1
                    },
                    set: function (t) {
                        var e = this.audioTrackController;
                        e && (e.audioTrack = t)
                    }
                }, {
                    key: "subtitleTracks",
                    get: function () {
                        var t = this.subtitleTrackController;
                        return t ? t.subtitleTracks : []
                    }
                }, {
                    key: "subtitleTrack",
                    get: function () {
                        var t = this.subtitleTrackController;
                        return t ? t.subtitleTrack : -1
                    },
                    set: function (t) {
                        var e = this.subtitleTrackController;
                        e && (e.subtitleTrack = t)
                    }
                }, {
                    key: "media",
                    get: function () {
                        return this._media
                    }
                }, {
                    key: "subtitleDisplay",
                    get: function () {
                        var t = this.subtitleTrackController;
                        return !!t && t.subtitleDisplay
                    },
                    set: function (t) {
                        var e = this.subtitleTrackController;
                        e && (e.subtitleDisplay = t)
                    }
                }, {
                    key: "lowLatencyMode",
                    get: function () {
                        return this.config.lowLatencyMode
                    },
                    set: function (t) {
                        this.config.lowLatencyMode = t
                    }
                }, {
                    key: "liveSyncPosition",
                    get: function () {
                        return this.latencyController.liveSyncPosition
                    }
                }, {
                    key: "latency",
                    get: function () {
                        return this.latencyController.latency
                    }
                }, {
                    key: "maxLatency",
                    get: function () {
                        return this.latencyController.maxLatency
                    }
                }, {
                    key: "targetLatency",
                    get: function () {
                        return this.latencyController.targetLatency
                    }
                }, {
                    key: "drift",
                    get: function () {
                        return this.latencyController.drift
                    }
                }, {
                    key: "forceStartLoad",
                    get: function () {
                        return this.streamController.forceStartLoad
                    }
                }]) && dr(e.prototype, i), r && dr(e, r), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t
            }();
            cr.defaultConfig = void 0
        }]).default
    }));
    //# sourceMappingURL=hls.min.js.map
}