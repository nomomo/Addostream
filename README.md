# Addostream
<!--Add new feature for dostream.com-->
* 두스트림에 새로운 기능을 추가하는 브라우저 확장 Userscript
* Chrome, Firefox 지원 (2019-03-10 v1.49 기준)
* Userscript 확장 기능 필요
  * Chrome - [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ko)
  * Firefox - [Tampermonkey](https://addons.mozilla.org/ko/firefox/addon/tampermonkey/)
* 문제 생길 시 채팅 관련 기능 끄고 새로고침 또는 재설치 하십시오.


* 버그 많음 버그리포트 바랍니다 (__) nomotg@gmail.com
* 버그 제보 시 아래의 내용을 함께 보내주시면 더 빨리 수정 가능합니다.
  - 구체적인 증상
  - 두드온 버전(1.xx.x)
  - 사용 중인 브라우저 이름(Chrome? Firefox?)
  - 사용 중인 UserScript 확장기능 이름(Tampermonkey? Violentmonkey?)
  - 가능한 경우 설정 창 캡쳐 이미지 or 설정 창에서 Backup & Restore 누른 후 나오는 텍스트(필수는 아님)


## Preview
![](https://raw.githubusercontent.com/nomomo/Addostream/master/images/addostream_full_option_preview.png)

## Config
![](https://raw.githubusercontent.com/nomomo/Addostream/master/images/ADD_CONFIG.png)

## Install
1. 자신의 브라우저에 맞는 유저스크립트 확장기능 설치 - 아래의 링크를 클릭하여 이동
   * Firefox - [Tampermonkey](https://addons.mozilla.org/ko/firefox/addon/tampermonkey/)
   * Chrome - [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ko)
  
2. 확장 기능 설치 이후 아래의 링크를 클릭하여 이동, 설치 버튼 누르기
   * [https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js](https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js)
   * 주의: 본 스크립트를 설치 및 사용하며 브라우저 과부하로 인한 응답 없음/뻗음 등 으로 인한 데이터 손실 등 문제 발생 시 개발자는 책임지지 않음(보고된 문제는 없음)

## FAQ
* Q: 설치한 후에 채팅창에서 닉네임을 눌러도 바뀌는게 없어요<br />A: 톱니바퀴 모양 버튼을 눌러 설정 창을 열고, 채팅 컨트롤에 체크한 후 저장한 뒤 새로고침 하세요

## History
* 2019-05-30 (v 1.50.0)
  *  (실험실) Black 테마 기능 추가
  *  실험실 기능이었던 채팅 내에서 Clip, Youtube 재생 기능을 기본값으로 적용
  *  빠른 좌표 기능 내 트위치 좌표에 스트리머 닉네임 표시
  *  자잘한 버그 수정
* 2019-05-28 (v 1.49.6)
  *  (실험실) 채팅창 좌측으로 이동 사용 시 팝업 플레이어가 우측에 뜨도록 변경
* 2019-05-22 (v 1.49.5)
  *  (실험실) 채팅-재생창 위치 반전 기능 추가
* 2019-05-02 (v 1.49.4)
  *  (실험실) 방송 모드 테마 추가(box, twitch, simple)
  *  (실험실) 방송 모드 변경 시 더 이상 새로고침이 필요 없음(라이브로 바뀜)
  *  채팅매니저 차단 시 시스템 메시지 출력
  *  채팅매니저 차단 시 채팅창에서 해당 유저의 모든 채팅 삭제
  *  채팅매니저 관리 창 변경 등
* 2019-04-19 (v 1.49.3)
  *  자잘한 버그 수정
  *  (실험실) 방송용 Chatbox 생성 기능(방송 모드) 추가. [사용법](https://raw.githubusercontent.com/nomomo/Addostream/master/images/addostream_broadcaster_setting.jpg)
* 2019-04-05 (v 1.49.2)
  *  편한 좌표 불러오기 시 기본 두스 좌표 사이트(coord.dostream.com)의 것을 가져오도록 변경
  *  (실험실) 좌표 사이트 선택, 채팅에서 스트리머 이름 자동 링크
* 2019-04-02 (v 1.49.1)
  *  (실험실) 도배 대응 기능 추가<br />[상세 설정 페이지](http://www.dostream.com/addostream/) 접속 후 고급 탭의 실험실 기능을 활성화 한 후 설정 가능<br />![](https://raw.githubusercontent.com/nomomo/Addostream/master/images/190402_dobae.png)
* 2019-03-10 (v 1.49.0)
  *  자동스크롤 변경 기능이 좀 더 잘 동작하도록 수정
  *  채팅 이미지 로드 시 가능한 경우 제목, 작성자, 시청 수 등의 정보를 불러오도록 수정
  *  채팅 이미지 로드 디자인 변경
  *  개발 중 기능 활성화 및 상세 기능 설정을 유저가 직접 설정할 수 있도록 오픈 (실험실)<br />![](https://raw.githubusercontent.com/nomomo/Addostream/master/images/190310_setting.jpg)
* 2019-02-24 (v 1.48.3)
  *  설정 창에서 드래그로 스트리머 ID 순서 변경 가능
  *  금지 단어 입력 시 입력한 대문자가 자동으로 소문자로 변경되어 저장되는 증상 수정 - 자주 올라오는 Imgur 이미지 차단할 때 쓰세요.
* 2019-02-17 (v 1.48.1)
  *  Gfycat 동영상 불러오는 기능 추가
* 2019-01-18 (v 1.48.0)
  *  메모 시 회원별 차단 기능 추가 (더 이상 차단 목록이 날아갔다고 짜증을 내지 않아도 된다)
  *  Imgur API 가 과부하 되어 응답하지 않는 경우 애드온이 멈추는 것을 방지
  *  자동 스크롤 개선 기능 임시 추가 (테스트 중)
* 2018-12-21 (v 1.47.2)
  *  두스트림 기본 리스트가 존재하지 않을 때 오프라인 고정 및 메인에 없는 스트리머 불러오기가 되지 않는 문제 수정
* 2018-12-18 (v 1.47.0)
  *  시청 기록 보기 기능 추가 (옵션에서 끌 수 있음, 기본값 켜짐)
  *  빠른 좌표 버튼을 옵션에서 끌 수 있도록 개선 (기본값 켜짐)
  *  Imgur 이미지 불러올 때 가끔 x, - 버튼 위치가 이상하게 되는 증상 임시 개선함
* 2018-09-27 (v 1.46.5)
  *  우하하 채팅창 호환 기능 추가
    * 우하하용 임시 강제단차 기능 추가 (강제단차 시 차단목록에 추가됨)
    * 금지단어 기반 차단 기능을 우하하에도 적용
    * Imgur 이미지 불러오기 등은 적용 안 됨
* 2018-09-26 (v 1.46.2)
  *  일부 기능 작동 안 되는 버그 임시 수정
  *  채팅창 자동스크롤 뜬금없이 멈추는 증상 해결하기 위한 기능 임시 추가
* 2018-09-17 (v 1.46.1)
  *  새창이 열렸을 때 기존창에서 API 와 채팅을 한 번에 새로고침하는 버튼 추가
  *  빠른 좌표 버튼 - 좌표 페이지를 두스트림 내부에서 불러옴
* 2018-09-06 (v 1.46.0)
  *  Imgur video 타입을 정상적으로 불러옴 + 자잘한 버그수정
* 2018-07-25 (v 1.45.0)
  *  바뀐 채팅창에 대한 기능 임시 적용
* 2017-12-23 (v 1.44.0)
  *  Imgur album 의 경우 이미지 여러개 가져오기
  *  업데이트 가능 여부 확인
  *  스트리머 이름 입력 시 더 편한 자동완성
  *  Greasemonkey 4.0 호환성 확보 등
* 2017-12-23 (v 1.43.2)
  *  DARK 테마 추가 (Test)
* 2017-12-16 (v 1.43.0)
  *  채팅 닉변 메시지 차단, 채팅 키워드 차단, API 갱신 시 메인 새로고침 등
* 2017-11-21 (v 1.42.0)
  *  ~~강제단차 기능 추가~~ → 현재 필요 없어짐
* 2017-11-14 (v 1.38)
  *  설정창 레이아웃 변경
  *  채팅창에 애드온 상태 알려줌
  *  설정 저장을 위해 쿠키 대신 확장기능의 저장공간을 이용하도록 변경
* 2017-09-30 (v 1.37)
  * 메인 접속 시마다 섬네일 이미지 갱신되도록 함 - 1분 간격으로 갱신, 기존에는 새로고침 하지 않으면 처음 접속 시 섬네일 그대로 유지됨
* 2017-09-29 (v 1.36)
  * 멀티트위치↔트위치 전환 버튼 추가
* 2017-09-16 (v 1.32)
  * 채팅 닉네임에 메모하기
* 2017-09-14 (v 1.31)
  * ~~채팅창에서 마우스 휠을 위로 할 시 자동 스크롤 멈춤 기능 추가(트위치 채팅창 기능과 유사)~~ 
     → 현재 채팅창 기본 기능이므로 작동 안 함
* 2017-09-05 (v 1.30)
  * Firefox 에서 CSS 로드 안 되는 버그 수정
* 2017-09-01 (v 1.29)
  * 유챗 스킨 관련 광고메시지 제거 기능 추가
* 2017-08-06 (v 1.27)
  * 재생 중 화면에서 메인 목록 보기(Quick list) 추가
* 2017-07-31 (v 1.26)
  * 채팅 내 두스 좌표는 현재창에서 열기
  * 채팅 입력창에 현재 내가 보고있는 좌표 복사하기
  * 채팅에 올라오는 imgur 이미지 미리보기
  * 섬네일 확대
  * 채팅 광고제거 등
* 2017-07-19 (v 1.25)
  * Userscript 버전 업 시 알림 기능 추가
* 2017-07-17 (v 1.22)
  * **두스 메인에서 @ 을 찾아서 클릭하면 놀라운 일이...???**
* 2017-07-09
  * 재생 화면에서 뒤로가기 시 안 되는 오류 수정
* 2017-07-08
  * 로고 클릭시 가끔 작동 안 하는 버그 수정, 응답성 높임
  * 체크박스 체크 시 멀티트위치 버튼이 빛남
* 2017-07-02
  * 메인 노출하고 싶지 않은 스트리머 숨기기 기능 추가
  * 기본적으로 메인에 안 보여주는 스트리머 개인이 추가
* 2017-06-11
  * 설정 버튼 및 기능 추가
  * 원하는 스트리머 스트리머 최상단 고정 기능 추가

## Future works (언제걸릴지 모름)
* 익명으로 Imgur 이미지 업로드 및 내가 업로드한 이미지 목록 보기
* 팔로워 정보 가져와서 자동으로 추가 (로그인 필요 X)
* 현재 보고있는 or 특정 Twitch 스트리머의 채팅을 두스 채팅에서 같이보기
  * 특정 닉네임 가진 사람 채팅만 보여주기
* 테마 기능 등 현재 동작 제대로 안 하는 기능들 복구
* 딥러닝으로 이미지 분류 및 차단
