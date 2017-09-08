# Addostream
<!--Add new feature for dostream.com-->
* 두스트림에 새로운 기능을 추가하는 브라우저 확장 Userscript
* Firefox · Chrome 지원 (2017-07-31 기준)
* Userscript 확장 기능 필요
  * Firefox - [Greasemonkey](https://addons.mozilla.org/ko/firefox/addon/greasemonkey/)
  * Chrome - [Tampermonkey](http://tampermonkey.net/)
* 설정 등은 브라우저 Cookie 에 저장 · 개인정보 등은 절대 수집하지 않음
* 버전 업 하면서 문제 발생 시 브라우저 쿠키 (혹은 두스트림 쿠키) 초기화 하면 해결
* 버그 많음 버그리포트 바랍니다 (__) nomotg@gmail.com

## Preview
<p align="center">
<img src="https://github.com/nomomo/Addostream/blob/master/images/170702_preview.jpg" width="500px" />
</p>

* 원하는 스트리머 최상단 고정 (핀 표시)
* 원래 메인에 없는 Twitch 스트리머 추가 가능 (★표시)
* 메인 노출하고 싶지 않은 스트리머 숨기기
* 체크박스 체크 후 멀티트위치 버튼 누르면 멀티트위치 실행됨
<br />

<p align="center">
<img src="https://github.com/nomomo/Addostream/blob/master/images/170806_Quick_list.png" width="500px" />
</p>

* 재생 중 화면에서 메인 목록 보기 가능 (버튼을 클릭할 때마다 메인과 동일한 내용으로 갱신 됨)
<br />


<p align="center">
<img src="https://github.com/nomomo/Addostream/blob/master/images/170731_chat_image_preview.jpg" />
</p>

* 채팅에 올라온 Imgur 이미지 링크를 감지하여 바로보여줌 (Album, Gallery, Image 타입 및 Imgur 이미지 주소 대상)
<br />


## Config
<p align="center">
<img src="https://github.com/nomomo/Addostream/blob/master/images/170731_config.jpg" width="498px" />
</p>

* 메인에 없는 스트리머 갱신 간격은 최소 1분 간격

## Install
* Firefox - [Greasemonkey](https://addons.mozilla.org/ko/firefox/addon/greasemonkey/), Chrome - [Tampermonkey](http://tampermonkey.net/) 확장 기능 설치
* 확장 기능 설치 이후 아래의 링크로 이동<br />
https://github.com/nomomo/Addostream/blob/master/Addostream.user.js
* 이후 다음의 이미지를 참고하여 설치<br /><br /><img src="https://github.com/nomomo/Addostream/blob/master/images/Install.jpg" width="500px" />
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
  
## Future works (언제걸릴지 모름)
* 보기 싫은 스트리머 일일히 타이핑하는 대신 체크 후 버튼 클릭으로 숨기기 가능하게 변경
* 트위치, 카카오, 유투브 ON/OFF 여부 기억하기
* 채팅 닉네임에 메모하기
* 채팅 내용 키워드 필터링하여 해당 키워드 포함된 채팅 안 보이게 하기
* 메인 화면에 있을 때 일정 간격으로 자동 새로고침 하기
