import {ADD_DEBUG} from "../libs/nomo-utils.js";

// API로 접근해서 스트리머 이름을 가져올 수도 있으나,
// API CALL 을 줄이기 위해 원래부터 두스 MAIN에 있던 스트리머 이름을 적어둡니다.
// 본 리스트에 등재하는 기준은 트게더 핫클립, 두스트림 좌표 입니다.
// 스트리머 ID, 정식명(display name), 별명, 한글자 별명 순서
var streamerArray = [
    ["hanryang1125", "풍월량", "풍온", "김영태", "영태", "풍형", "풍월주인한량", "우리풍", "큰풍", "풍"],
    ["ddahyoni", "따효니", "효니", "백상현", "상현", "따"],
    ["kss7749", "쉐리", "쉐옹", "쉐노인", "쉐린마", "쉐"],
    ["looksam", "룩삼", "룩우스", "김진효", "진효", "룩"],
    ["yapyap30", "얍얍", "야부야부", "김성태", "성태", "얍"],
    ["saddummy", "서새봄냥", "서새봄", "새봄추", "스새봄", "새봄", "봄"],
    ["109ace", "철면수심", "철수형", "철쑤", "쑤심", "진배"],
    ["rhdgurwns", "공혁준", "공선생", "르건즈", "혁준이", "혁주니", "혁준", "건즈", "공"],
    ["gmdkdsla", "흐앙님", "흐앙"],
    ["jungtaejune", "똘똘똘이", "똘3", "똘삼", "정태준", "똘"],
    ["mascahs", "마스카", "이임혁"],
    ["steelohs", "스틸로", "조강현"],
    ["kimdoe", "김도", "이택기", "리택기", "킴도"],
    ["togom", "토곰", "토마토곰"],
    ["htk_", "흐트크"],
    ["ogn_lol", "OGN 롤챔스"],
    ["kanetv8", "케인", "케조씨"],
    ["yumyumyu77", "소풍왔니", "소풍이", "소풍", "작은풍", "원유리"],
    ["tjskdutls", "서나랑", "스나랑"],
    ["sung0", "쥬팬더"],
    ["game2eye", "홍방장", "홍"],
    ["cocopopp671", "초승달", "승따리", "승딸이", "승딸", "승달", "조순달", "초"],
    ["dingception", "딩셉션"],
    ["redtea", "홍차"],
    ["zzamtiger0310", "짬타수아", "짬타", "짬"],
    ["rldnddl789", "아빠킹"],
    ["eulcs1", "EU LCS"],
    ["kkoma", "Kkoma"],
    ["1983kej", "단군", "김의중", "의중", "으중이"],
    ["lol_peanut", "Peanut"],
    ["faker", "Faker", "faker", "페이커", "이상혁", "상혁", "페온", "우리혁", "페"],
    ["nrmtzv", "으음"],
    ["nicegametv", "나겜"],
    ["teaminven", "인벤"],
    ["capta1n_pony", "포니"],
    ["huni", "Huni"],
    ["sktt1_wolf", "Wolf"],
    ["bang", "Bang"],
    ["wpghd321", "류제홍"],
    ["jmjdoc", "칸데르니아", "칸조씨", "칸데", "두방이", "두방", "두스의 방패", "두스의방패", "[]방"],
    ["yungi131", "윤기"],
    ["mediamuse", "미디어뮤즈", "미뮤"],
    ["veritaskk", "Veritas", "베리타스", "싸세", "김경민"],
    ["themarinekr", "김정민"],
    ["tvindra", "인드라"],
    ["tranth", "자동"],
    ["seine1026", "세인님"],
    ["sonycast_", "소니쇼", "소니쿤"],
    ["dou3796", "뱅붕"],
    ["rudbeckia7", "연두는말안드뤄", "연두"],
    ["trisha", "트리샤"],
    ["naseongkim", "김나성", "나성"],
    ["dlxowns45", "태준이", "이태준"],
    ["handongsuk", "한동숙", "동수칸", "동숙", "한성욱"],
    ["alenenwooptv", "웁_게임방송"],
    ["mr_coat", "노래하는코트"],
    ["ajehr", "머독"],
    ["lol_crown", "Crown"],
    ["rooftopcat99", "옥냥이"],
    ["myzet1990", "개구멍"],
    ["yoonroot", "윤루트"],
    ["sn400ja", "액시스마이콜", "마이콜"],
    ["tape22222", "테이프2"],
    ["miracle0o0", "미라클티비"],
    ["bighead033", "빅헤드"],
    ["wkgml", "견자희"],
    ["queenhuz", "후즈"],
    ["kiyulking", "김기열"],
    ["asdn6388", "나락호프"],
    ["lol_cuvee", "Cuvee"],
    ["VSL", "VSL"],
    ["drlee_kor", "이민우33세"],
    ["CoreJJ", "CoreJJ"],
    ["lol_ambition", "앰비션", "엠비션", "강찬밥", "강찬용"],
    ["Axenix", "아제닉스"],
    ["maknoonlol", "막눈"],
    ["zilioner", "침착맨", "이말년", "이병건", "침"],
    ["timeofcreate", "홍랑"],
    ["twitchshow", "트위치쇼"],
    ["kangqui", "강퀴", "강승현", "퀴저씨", "퀴조씨", "퀴어빠", "퀴"],
    ["team_spiritzero", "Team Spiritzero"],
    ["zizionmy", "젼마이"],
    ["lol_blank", "Blank"],
    ["ogn_ow", "OGN 오버워치"],
    ["juankorea", "주안코리아"],
    ["woowakgood", "우왁굳"],
    ["www0606", "푸딩"],
    ["runner0608", "러너"],
    ["flowervin", "꽃빈"],
    ["h920103", "이초홍", "초홍"],
    ["hj0514", "백설양", "진희재"],
    ["pbstream77", "피비스트림"],
    ["beyou0728", "피유", "끠유", "소통퀸", "노채리"],
    ["serayang", "세라양", "양새아", "쉐굴"],
    ["mister903", "갱생레바", "레바"],
    ["what9honggildong", "왓구홍길동"],
    ["chicken_angel", "통닭천사"],
    ["godbokihs", "갓보기"],
    ["yuriseo", "서유리"],
    ["kimminyoung", "아옳이", "김민영"],
    ["gabrielcro", "가브리엘", "가비"],
    ["starcraft_kr", "스타크래프트 KR"],
    ["yeziss", "신예지"],
    ["ch1ckenkun", "치킨쿤", "차보해", "보해"],
    ["lds7131", "더헬"],
    ["nodolly", "노돌리"],
    ["haku861024", "정직원"],
    ["nanajam777", "우정잉", "정잉", "잉"],
    ["leehunnyeo", "루다님", "별루다", "루다"],
    ["streamer2u", "이유님"],
    ["hatsalsal", "햇살살"],
    ["pommel0303", "폼멜"],
    ["hosu0904", "호수"],
    ["surrenderhs", "서렌더", "티나", "김정수"],
    ["eukkzzang", "윾짱"],
    ["gageu", "가그"],
    ["ange_i", "요뿌니"],
    ["menpa1030", "멘파"],
    ["dua3362", "서넹", "서빙"],
    ["dda_ju", "다주", "주다영"],
    ["taesangyun", "태상"],
    ["oreo4679", "리치1"],
    ["dmdtkadl69", "응삼이"],
    ["sigwon", "시권"],
    ["rngudwnswkd", "푸린"],
    ["jungjil", "정질"],
    ["ses836", "인간젤리"],
    ["DrAquinas", "DrAquinas"],
    ["tree2512", "말퓨"],
    ["frog135", "게구리"],
    ["leechunhyang", "이춘향"],
    ["cherrypach", "꽃핀"],
    ["lovelyyeon", "연두부"],
    ["yd0821", "양띵", "양명"],
    ["2chamcham2", "탬탬버린", "탬탬"],
    ["jinu6734", "김진우"],
    ["ddolking555", "똘킹"],
    ["erenjjing", "에렌디라"],
    ["suk_tv", "석티비"],
    ["h0720", "군림보"],
    ["rellacast", "렐라", "앗앗"],
    ["silphtv", "실프"],
    ["playhearthstonekr", "playhearthstonekr"],
    ["mirage720", "미라지"],
    ["1am_shin", "신기해"],
    ["maruemon1019", "마루에몽"],
    ["ulsanbigwhale", "울산큰고래"],
    ["areuming", "알밍"],
    ["esther950", "에쓰더"],
    ["pacific8815", "쌍베", "전상빈", "쌍"],
    ["dogswellfish", "개복어"],
    ["yeonchobom", "연초봄"],
    ["ssambahong", "홍진영"],
    ["Twipkr", "트윕KR"],
    ["reniehour", "레니아워"],
    ["caroline9071", "숑아"],
    ["ssambahong", "쌈바홍", "홍진영"],
    ["funzinnu", "Funzinnu", "펀즈", "펀가놈", "펀가"],
    ["loveseti", "미모"],
    ["kimgaeune", "김총무님"],
    ["1uming", "루밍이", "루밍"],
    ["invenk01", "김영일", "K01", "김01"],
    ["sal_gu", "살인마협회장", "살협", "살구"],
    ["flurry1989", "플러리", "로맨틱겨울", "로겨", "로7ㅕ", "조현수", "겨러리"],
    ["holsbro", "홀스형", "홀스"],
    ["hn950421", "고말숙", "말숙"],
    ["jaeheeng2", "햄재희", "재희"],
    ["hwkang2", "캡틴잭", "캡잭", "캡짹", "잭선장", "강형우", "잭"],
    ["yunlovejoy", "도여사"],
    ["yatoring", "야토링"],
    ["lolluk4", "루ㅋ4"],
    ["rkdthdus930", "강소연", "타노스", "탑분쇄기", "수장님"],
    ["seogui", "서긔"],
    ["pikra10", "재슥짱"],
    ["playoverwatch_kr", "오버워치 이스포츠"],
    ["maxim_korea_official", "남자매거진맥심", "맥심", "맥심코리아"],
    ["hanururu", "하느르"],
    ["obm1025", "오킹"],
    ["acro_land", "아크로"],
    ["choerakjo", "최락조"],
    ["megthomatho", "맥또마또"],
    ["s1032204", "삐부"],
    ["rkdwl12", "강지"],
    ["jaewon4915", "김재원"],
    ["zennyrtlove", "신재은"],
    ["2sjshsk", "유누"],
    ["queenmico", "미코"],
    ["lsd818", "득털"],
    ["wlswnwlswn", "진주몬"],
    ["apzks1236", "학살"],
    ["sunbaking", "선바"],
    ["rockid1818", "모모88"],
    ["moogrr1211", "무굴"],
    ["twitchkr", "TwitchKR"],
    ["tlfjaos", "시러맨"],
    ["dawnhs", "DawN", "장현재", "던"],
    ["mata", "마타타마", "마타"],
    ["lol_khan", "Khan", "칸"],
    ["buzzbean11", "대도서관", "머도서관", "대도", "머도"],
    ["mhj1682", "카트문호준", "문호준"],
    ["remguri", "렘쨩"],
    ["heavyrainism", "호무새"],
    ["lck_korea", "LCK Korea", "롤챔스", "롤챔"],
    ["lol_madlife", "매드라이프", "매라", "매멘", "매맨", "메라", "홍민기"],
    ["lol_helios", "헬리오스"],
    ["pparkshy", "샤이"],
    ["pubgkorea", "PUBGKorea"],
    ["riotgames", "Riot Games"],
    ["lisalove", "리즈리사"],
    ["mbcmlt", "엠비씨마리텔"],
    ["mbcmlt1", "엠비씨마리텔1"],
    ["mbcmlt2", "엠비씨마리텔2"],
    ["mbcmlt3", "엠비씨마리텔3"],
    ["mbcmlt4", "엠비씨마리텔4"],
    ["mbcmlt5", "엠비씨마리텔5"],
    ["mbcmlt6", "엠비씨마리텔6"],
    ["mbcmlt7", "엠비씨마리텔7"],
    ["mbcmlt8", "엠비씨마리텔8"],
    ["mbcmlt9", "엠비씨마리텔9"],
    ["insec13", "인섹"],
    ["realkidcozyboy", "키드밀리"],
    ["sbsmobile24", "스브스"],
    ["baeguson", "배성재", "배거슨"],
    ["ok_ja", "박옥자누나", "박옥자", "옥자", "김나영"],
    ["boxer_lim", "임요환", "임"],
    ["kimukihun", "기무기훈"],
    ["sasin_god", "사신갓", "사신"],
    ["dardarae", "달다래오", "차짬좌"],
    ["taezzang", "태은짱", "태은쨩", "이태은", "태은"],
    ["jammi95", "잼미님", "잼미"],
    ["coppag2", "꿀혜"],
    ["overwatchleague_kr", "오버워치리그"],
    ["fastloves", "홍진호", "콩", "홍"],
    ["jinsooo0", "진수0", "진수도사", "진수", "도사님"],
    ["wltn4765", "지수소녀"],
    ["gamesdonequick", "GamesDoneQuick", "겜던퀵"],
    ["dragon3652", "스피드소닉"],
    ["parkjand", "박잔디"],
    ["jinnytty", "윰찌니"],
    ["danpaeng2", "단팽이"],
    ["inas1220", "야생의딸기"],
    ["limlim72", "진자림"],
    ["bongsoon0115", "봉순"],
    ["eodyd188", "밴쯔", "벤쯔"],
    ["duedrop", "권이슬", "이슬이", "이스리", "권자봉"],
    ["so_urf", "소우릎"],
    ["lo10002", "혜요"],
    ["GhostGC", "고스트", "수광", "수팡"],
    ["mari0712", "마리"],
    ["defconntv", "데프콘", "트프콘", "대준이", "유대준"],
    ["b14ckt41e", "검은동화", "검동"],
    ["ninja", "닌자"],
    ["shroud", "슈라우드"],
    ["xkwhd", "피닉스박", "박종우!", "박종우"],
    ["bsll7777", "금다정", "야망좌"],
    ["tmxk319", "괴물쥐", "장지환"],
    ["jasper0414", "재스퍼", "제스퍼"],
    ["cbrace", "중괄호"],
    ["maruko_zzang", "마루코"],
    ["charming_jo", "조매력", "차밍조", "챠밍조"],
    ["leeyl1118", "영림이", "영림"],
    ["soming1907", "소밍"],
    ["kimpoong_official", "김풍"],
    ["ma_mwa", "마뫄"],
    ["kerokero_", "케로"],
    ["yurani", "이유란", "유란"],
    ["kitekorea", "고래까와"],
    ["itopicy", "용봉탕", "봉탕"],
    ["matarzzz", "행수"],
    ["yeji429", "예지"],
    ["t1_teddy", "테디이", "테디"],
    ["clid", "클리드"],
    ["seulsiho", "슬시호", "슬쇼"],
    ["yeokka", "여까"],
    ["kimdduddi", "김뚜띠", "뚜띠"],
    ["collet11", "코렛트"],
    ["sabin1", "사빈"],
    ["robok2016", "로복님", "로복"],
    ["salakill2", "너겟"],
    ["mununyu", "무뉴뉴", "잼뉴뉴"],
    ["micka1120", "믹카", "믹키몬드"],
    ["dosroda", "두스로다"],
    ["vzeros88", "규현"],
    ["inecr7024", "삼식"],
    ["tekken", "TEKKEN"],
    ["yuhwanp", "빢유환"],
    ["kumikomii", "고차비"],
    ["uzuhama", "우주하마"],
    ["dkwl025", "양아지"],
    ["rainblue37", "김블루"],
    ["lucia94", "루시아"],
    ["d2kyun", "김느"],
    ["t1_haru", "SKTT1 Haru", "하루"],
    ["box930205", "와나나"],
    ["nineunni", "니네언니"],
    ["djhenney", "djhenney", "표은지"],
    ["pjs9073", "쫀득이"],
    ["nanayango3o", "나나양"],
    ["hejin0_0", "헤징"],
    ["reapered", "Reapered", "레퍼드", "래퍼드"],
    ["loven4862", "솔빈"],
    ["bonnysurang", "김반희"],
    ["genius_mad", "지니어스매드"],
    ["riotgames_korea", "RiotGames Korea", "라이엇코리아", "라코"],
    ["nokduro", "녹두로"],
    ["magenta62", "마젠타"],
    // ["edoongs2", "에디린"],
    ["yattaa_", "얏따"],
    ["nnabi", "연나비님", "연나비"],
    ["akvl1229", "김은별컴퍼니", "김은별"],
    ["discoverwcg", "discoverWCG", "WCG", "wcg"],
    ["atk", "ATK", "알버트킴", "알굴"],
    ["rhea90", "춘샘"],
    ["roadofthestrength", "힘의길", "힘길"],
    ["zoodasa", "주다사"],
    ["crazzyccat", "크캣66", "크캣"],
    ["ogn", "OGN", "온게임넷", "온겜"],
    ["lpl", "LPL"],
    ["honeylatte", "꿀라떼"],
    ["eff2ct", "이펙트"],
    ["ogn_e", "오지네"],
    ["heesu216", "희수"],
    ["sikkazama", "식빵월드", "식빵아재", "식빵 아재", "식빵"],
    ["nunu836836", "익산누누"],
    ["aram4519", "과로사"],
    ["firebather", "흑운장티비", "흑운장", "이성은"],
    ["rafraf2016", "라프입니다", "라프"],
    ["moonwol0614", "문월님", "문월"],
    ["sooflower", "수련수련", "수련"],
    ["afreeca_tv", "아프리카TV"],
    ["nobugi", "노부기"],
    ["portialyn", "포셔"],
    ["724sof", "소프소프", "소프"],
    ["battledogtv", "BattledogTV", "배틀독"],
    ["ranran2_", "란란"],
    ["abc16789", "요룰레히"],
    ["surinoelcats", "수리노을"],
    ["sorimcaster", "정소림", "소림좌", "소림"],
    ["cdprojektred", "CD PROJEKT RED"],
    ["akaros83", "AKaros83", "아카로스", "장지수", "겐지수"],
    ["sis_ram", "람언니"],
    ["heeduji", "히더지"],
    ["newthingtv", "뉴띵"],
    ["broodling2", "김초짜", "초짜"],
    ["aoakwmf", "조나스트롱", "이진세", "진세"],
    ["dq12345", "알티갓"],
    ["playbattlegrounds", "playBATTLEGROUNDS"],
    ["pony_lol", "포니"],
    ["heehee1004", "배린희"],
    ["dakong_", "다콩"],
    ["juyoung1114", "갓샤인"],
    ["dalto_ov","달토"],
    ["doublelift", "Doublelift", "더블리프트", "덮립", "덮맆", "피터 펭", "피터펭"],
    ["wadid", "Wadid", "와디드"],
    ["hanna3691", "불누나"],
    ["yuwol", "유월쨩", "유월짱", "유월"],
    ["damicoss", "김다미"],
    ["a34016042", "씨맥", "cvmax", "CVmax"],
    ["donaldtrump", "DonaldTrump", "도날드 트럼프", "트럼프"],
    ["thdlqslek", "쏘입니다"],
    ["heydaystudios", "HeydayStudios"],
    ["trackingthepros", "TrackingThePros"],
    ["garimto", "가림토김동수", "가림토", "김동수"],
    ["tvcrank", "크랭크"],
    ["tomboaaa", "톰보아", "김보아"]
];

var streamerArray_name = [],
    streamerArray_display_name = [],
    streamerArray_AutoComplete = [];
    
for(var i=0; i<streamerArray.length; i++){
    streamerArray_name[i] = streamerArray[i][0];
    streamerArray_display_name[i] = streamerArray[i][1];
    streamerArray_AutoComplete[i] = streamerArray[i][1]+" ("+streamerArray[i][0]+")";
}

var ADD_streamer_nick = function(id){
    var temp_id = id.toLowerCase();
    if(streamerArray_name !== [] || streamerArray_display_name !== []){
        var id_index = $.inArray(temp_id, streamerArray_name);
        if (id_index !== -1){
            return streamerArray_display_name[id_index];
        } else {
            return id;
        }
    } else {
        ADD_DEBUG("ADD_streamer_nick 함수에서 id 리턴중 null");
    }
};

export {streamerArray, ADD_streamer_nick, streamerArray_name, streamerArray_display_name, streamerArray_AutoComplete};