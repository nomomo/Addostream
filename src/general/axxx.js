
// reference: https://github.com/streamlink/streamlink/blob/45e515eb5a57ea047685aa1088777cce313db09c/src/streamlink/plugins/afreeca.py

const CHANNEL_API_URL = "http://live.afreecatv.com/afreeca/player_live_api.php";

async function _get_channel_info(broadcast, username){
    let data = {
        "bid": username,
        "bno": broadcast,
        "from_api": "0",
        "mode": "landing",
        "player_type": "html5",
        "pwd": "",
        "stream_type": "common",
        "type": "live",
    };
    //let res = self.session.http.post(CHANNEL_API_URL, data=data)
    let res = await GM_xmlhttpRequest ({
        method:     "POST",
        url:        CHANNEL_API_URL,
        data:       data,
        headers:    {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    console.log("_get_channel_info res", res);
}

function _get_hls_key(self, broadcast, username, quality){
    let data = {
        "bid": username,
        "bno": broadcast,
        "from_api": "0",
        "mode": "landing",
        "player_type": "html5",
        "pwd": "",
        "quality": quality,
        "stream_type": "common",
        "type": "aid",
    }
    res = self.session.http.post(CHANNEL_API_URL, data=data)
    return self.session.http.json(res, schema=self._schema_channel)
}

// https://livestream-manager.afreecatv.com/broad_stream_assign.html?return_type=gcp_cdn&use_cors=true&cors_origin_url=play.afreecatv.com&broad_key=245655817-common-master-hls&time=83.0183545437313
let broad_stream_assign = `https://livestream-manager.afreecatv.com/broad_stream_assign.html?return_type=gcp_cdn&use_cors=true&cors_origin_url=play.afreecatv.com&broad_key=${bid}-common-master-hls&time=${1e4 * Math.random()}`;