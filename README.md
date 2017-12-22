# Addostream
<!--Add new feature for dostream.com-->
* 두스트림에 새로운 기능을 추가하는 브라우저 확장 Userscript
* Firefox , · Chrome 지원 (2017-11-15 v1.39 기준)
* Userscript 확장 기능 필요
  * Firefox 57.0(Quantum) ↑ - [Violentmonkey](https://addons.mozilla.org/ko/firefox/addon/violentmonkey/)
  * Firefox 56.0 ↓ - [Greasemonkey](https://addons.mozilla.org/ko/firefox/addon/greasemonkey/) - (Firefox 57.0, Greasemonkey 4.0 이상 지원은 추후 예정)
  * Chrome - [Tampermonkey](http://tampermonkey.net/)
* 버그 많음 버그리포트 바랍니다 (__) nomotg@gmail.com

## Preview
<p align="center">
<img src="https://raw.githubusercontent.com/nomomo/Addostream/master/images/170702_preview.jpg" width="500px" />
</p>

* 원하는 스트리머 최상단 고정 (핀 표시)
* 원래 메인에 없는 Twitch 스트리머 추가 가능 (★표시)
* 메인 노출하고 싶지 않은 스트리머 숨기기
* 체크박스 체크 후 멀티트위치 버튼 누르면 멀티트위치 실행됨
<br />

## Key features

* ▼ [1.43 update!] Dark 테마 추가 (Test 중, 현재 Chrome 에서만 작동)
<p align="center">
<img src="https://raw.githubusercontent.com/nomomo/Addostream/master/images/171223_DARK_DOS.jpg" />
</p>

<br />


* ▼ [1.36 update!] 멀티트위치↔트위치 전환 버튼 추가
<p align="center">
<img src="https://raw.githubusercontent.com/nomomo/Addostream/master/images/170929_change_twitch.jpg" />
</p>

<br />


* ▼ [1.31 update!] 채팅창에서 마우스 휠을 위로 할 시 자동 스크롤 멈춤 기능 추가 (트위치 채팅창의 기능과 유사)
<p align="center">
<img src="https://raw.githubusercontent.com/nomomo/Addostream/master/images/170914_chat_scroll_auto_stop.jpg" />
</p>

<br />

* ▼ [1.27 update!] 재생 중 화면에서 메인 목록 보기 가능 (버튼을 클릭할 때마다 메인과 동일한 내용으로 갱신 됨)
<p align="center">
<img src="https://raw.githubusercontent.com/nomomo/Addostream/master/images/170806_Quick_list.png" width="500px" />
</p>

<br />

* ▼ [1.26 update!]채팅에 올라온 Imgur 이미지 링크를 감지하여 바로보여줌 (Album, Gallery, Image 타입 및 Imgur 이미지 주소 대상)
<p align="center">
<img src="https://raw.githubusercontent.com/nomomo/Addostream/master/images/170731_chat_image_preview.jpg" />
</p>

<br />

## Config
<p align="center">
<img src="https://raw.githubusercontent.com/nomomo/Addostream/master/images/ADD_CONFIG.png" width="503px" />
</p>

* 메인에 없는 스트리머 갱신 간격은 최소 1분 간격

## Install
* Firefox - [Greasemonkey](https://addons.mozilla.org/ko/firefox/addon/greasemonkey/), Chrome - [Tampermonkey](http://tampermonkey.net/) 확장 기능 설치
* 확장 기능 설치 이후 아래의 링크로 이동<br />
https://github.com/nomomo/Addostream/blob/master/Addostream.user.js
* 이후 다음의 이미지를 참고하여 설치<br /><br /><img src="https://raw.githubusercontent.com/nomomo/Addostream/master/images/Install.jpg" width="500px" />
* 주의: 본 스크립트를 설치 및 사용하며 브라우저 과부하로 인한 응답 없음/뻗음 등 으로 인한 데이터 손실 등 문제 발생 시 개발자는 책임지지 않음(보고된 문제는 없음)

## History
* 2017-06-11
  * 설정 버튼 및 기능 추가
  * 원하는 스트리머 스트리머 최상단 고정 기능 추가
* 2017-07-02
  * 메인 노출하고 싶지 않은 스트리머 숨기기 기능 추가
  * 기본적으로 메인에 안 보여주는 스트리머 개인이 추가
* 2017-07-08
  * 로고 클릭시 가끔 작동 안 하는 버그 수정, 응답성 높임
  * 체크박스 체크 시 멀티트위치 버튼이 빛남
* 2017-07-09
  * 재생 화면에서 뒤로가기 시 안 되는 오류 수정
* 2017-07-17 (v 1.22)
  * 두스 메인에서 @ 을 찾아서 클릭하면 놀라운 일이...???
* 2017-07-19 (v 1.25)
  * Userscript 버전 업 시 알림 기능 추가
* 2017-07-31 (v 1.26)
  * 개발 중 기능 활성화 on-off
    * 채팅 내 두스 좌표는 현재창에서 열기
    * 채팅 입력창에 현재 내가 보고있는 좌표 복사하기
    * 채팅에 올라오는 imgur 이미지 미리보기
    * 섬네일 확대
    * 채팅 광고제거 등
* 2017-08-06 (v 1.27)
  * 재생 중 화면에서 메인 목록 보기(Quick list) 추가
* 2017-09-01 (v 1.29)
  * 유챗 스킨 관련 광고메시지 제거 기능 추가
* 2017-09-05 (v 1.30)
  * Firefox 에서 CSS 로드 안 되는 버그 수정
* 2017-09-14 (v 1.31)
  * 채팅창에서 마우스 휠을 위로 할 시 자동 스크롤 멈춤 기능 추가(트위치 채팅창 기능과 유사)
* 2017-09-16 (v 1.32)
  * 채팅 닉네임에 메모하기
* 2017-09-19 (v 1.33)
  * 거슬리는 아프리카, 검색창 등을 숨긴다.
* 2017-09-29 (v 1.36)
  * 멀티트위치↔트위치 전환 버튼 추가
* 2017-09-30 (v 1.37)
  * 메인 접속 시마다 섬네일 이미지 갱신되도록 함 (1분 간격으로 갱신, 기존에는 새로고침 하지 않으면 처음 접속 시 섬네일 그대로 유지됨)
* 2017-11-14 (v 1.38)
  * 설정창 레이아웃 변경. 채팅창에 애드온 상태 알려줌. 설정 저장을 위해 쿠키 대신 확장기능의 저장공간을 이용하도록 변경 (쿠키의 저장 용량 한계 때문에)
* 2017-11-21 (v 1.42.0)
  *  강제단차 기능 추가
* 2017-12-16 (v 1.43.0)
  *  채팅 닉변 메시지 차단, 채팅 키워드 차단, API 갱신 시 메인 새로고침 등
* 2017-12-23 (v 1.43.2)
  *  DARK 테마 추가 (Test)

## Future works (언제걸릴지 모름)
* Twitch Clip 섬네일 미리보기
* Imgur image album 의 경우 이미지 더 가져오기
* 익명으로 Imgur 이미지 업로드 및 내가 업로드한 이미지 목록 보기
* 팔로워 정보 가져와서 자동으로 추가 (로그인 필요 X)
* Greasemonkey 4.0 호환(GM dot function)
* 현재 보고있는 or 특정 Twitch 스트리머의 채팅을 두스 채팅에서 같이보기
  * 특정 닉네임 가진 사람 채팅만 보여주기
* 업데이트 안 한 상태에서도 유저스크립트 업데이트 가능 여부 확인
