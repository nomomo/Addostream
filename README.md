# Addostream
두스트림에 새로운 기능을 추가하는 브라우저 확장 UserScript

## Features
- 메인 리스트에 원하는 스트리머 추가 및 삭제
- 채팅 이미지 링크 미리보기
- 빠른 좌표 사이트 탐색
- 어두운 테마

## Install
#### STEP 1. ScriptManager
자신의 브라우저에 맞는 유저스크립트 관리 확장기능 설치
- Firefox - [Tampermonkey](https://addons.mozilla.org/ko/firefox/addon/tampermonkey/)
- Chrome - [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ko)
- Opera - [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)
- Safari - [Tampermonkey](https://safari.tampermonkey.net/tampermonkey.safariextz)
- Edge - [Tampermonkey](https://www.microsoft.com/store/p/tampermonkey/9nblggh5162s)
  
#### STEP 2. UserScript
확장 기능 설치 이후 아래의 링크를 클릭하여 이동, 설치 버튼 누르기
- [Install](https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js) from https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js
> ##### 주의: 본 스크립트를 설치 및 사용하며 브라우저 과부하로 인한 응답 없음/뻗음 등 으로 인한 데이터 손실 등 문제 발생 시 개발자는 책임지지 않음(보고된 문제는 없음)

## How to Use
- 설치 후 두스트림 메인에 생기는 톱니바퀴 버튼을 눌러 기능을 설정합니다.
- 일부 기능은 새로고침 해야 적용됩니다.
- 상세 설정 페이지에서 세부 설정을 변경할 수 있습니다.<br />![](https://raw.githubusercontent.com/nomomo/Addostream/master/images/190310_setting.jpg)

## Future works
- 익명으로 Imgur 이미지 업로드 및 내가 업로드한 이미지 목록 보기
- 팔로워 정보 가져와서 자동으로 추가 (로그인 필요 X)
- 현재 보고있는 or 특정 Twitch 스트리머의 채팅을 두스 채팅에서 같이보기
  - 특정 닉네임 가진 사람 채팅만 보여주기
- 딥러닝으로 이미지 분류 및 차단
 > ##### Note : 언제걸릴지 모름

## Bug Report
버그 많음 버그리포트 바랍니다 (__) nomotg@gmail.com
버그 제보 시 아래의 내용을 함께 보내주시면 더 빨리 수정 가능합니다.
- 구체적인 증상
- 버전(1.xx.x)
- 사용 중인 브라우저 이름(Chrome? Firefox?)
- 사용 중인 UserScript 확장기능 이름(Tampermonkey? Violentmonkey?)
- 가능한 경우 설정 창 캡쳐 이미지 or 설정 창에서 Backup & Restore 누른 후 나오는 텍스트(필수는 아님)

## 알려진 문제
- 1.49 이전 버전에서 1.52 이상 버전으로 한 번에 업그레이드 하면 오류가 발생할 수 있습니다. 재설치를 권장합니다.

## Change log
### 1.52.3 (2019-09-21)
- 버그 수정<br />- (실험실) 트위치 플레이어 관련 기능 사용 시 player.twitch.tv 에서 스크립트가 작동하지 않는 문제 수정

### 1.52.2 (2019-09-21)
- (실험실) 유챗 채팅 마우스 툴팁 숨기기
- (실험실) 트위치 플레이어 관련 기능
- (실험실) 야간 모드
- 메인 리스트의 마지막 갱신(캐싱) 시간을 리스트 하단에 표시
- 버그 수정<br />- 채팅 매니저에서 기록을 연달아 수정 및 삭제 시 이상하게 동작하는 문제 수정

### 1.52.1 (2019-08-31)
- (실험실) 우하하 채팅 관련 실험실 기능 추가 (자동 싹쓸이 등)

### 1.52.0 (2019-08-29)
- 우하하 채팅에 대한 지원 확대 (채팅매니저, 메모, 이미지 미리보기, 도배 대응, 테마 등)<br />- 아직 일부 기능을 지원하지 않으며 불안정 함<br />- 우하하 채팅의 경우 닉네임이 아닌 고유ID 를 이용하여 차단 및 메모를 남김. 따라서 단순히 닉네임을 변경하는 경우 메모가 유지됨.<br />- 채팅 내 링크 클릭 시 더 이상 확인 메시지를 띄우지 않음
- Twitch API 코드 수정 (V3 → V5)
- 상세 설정에서 스트리머 추가 리스트를 수정하는 경우, 쿨타임에 상관 없이 바로 API를 호출하도록 수정
- 설정 기본값 변경 - 사용자가 자주 사용하는 채팅 관련 기능을 설치 직후 바로 사용할 수 있도록 기본값을 변경
- 내부 구조를 변경하여 버그가 많을 수 있습니다. 오류 발생 시 다음의 링크를 이용하여 구버전(1.51.0)을 재설치해주세요<br />[https://github.com/nomomo/Addostream/blob/dddcbda6098fe64110993bc77f485f2d171f6aa8/Addostream.user.js](https://github.com/nomomo/Addostream/blob/dddcbda6098fe64110993bc77f485f2d171f6aa8/Addostream.user.js)

### 1.51.0 (2019-08-09)
- 도배 관련 기능 수정<br />- 도배에 더욱 디테일하게 대응하기 위하여, [채팅 숨김을 위한 반복 입력 수]와 [유저 차단을 위한 반복 입력 수]를 분리<br />- [채팅 내용에 링크 포함 시에만 차단] 기능을 추가. 이를 통해 단순 도배는 숨기기만 하고 좌표 도배의 경우에만 차단하도록 할 수 있음.<br />- 도배로 자동 차단 시 기존 메모된 내용이 있는 경우 덮어쓰지 않고 기존 메모 내용에 덧붙임
- (실험실) 좌표 사이트에 직접 적용 기능 추가
- 이제 차단 로그에서 닉네임에 해당하는 메모가 존재할 경우 메모된 내용을 보여줌
- 버그 수정<br />- 기본 스킨에서 이미지 미리보기 시 View 수가 제대로 보이지 않는 문제 수정<br />- gfycat 미리보기 시 업로더 이름이 undefined 로 표시되는 문제 수정

### 1.50.7 (2019-08-07)
- 좌표 사이트가 응답하지 않는 경우 자동으로 대체 좌표 사이트를 임시 이용하도록 함

### 1.50.6 (2019-07-23)
- 사전에 저장된 스트리머 ID- 닉네임 리스트 수정/추가

### 1.50.5 (2019-06-21)
- (실험실) 테마 적용 후 게임 이름 표시가 제대로 되지 않는 증상 수정
- 메인 리스트 내 스트림의 제목이 존재하지 않을 때 레이아웃이 깨지는 문제 개선

### 1.50.4 (2019-06-09)
- (실험실) 테마에서 채팅 폰트 변경 후, 새 폰트 범위를 로드할 때마다 폰트가 깜박이는 증상 수정
- 설정창의 스트리머 이름 입력란에 자동 완성 태그를 마우스로 클릭해도 설정 창이 안 꺼지도록 수정
- 설정창에 스트리머 이름 입력 후 저장 버튼을 누르는 순간 설정창 크기가 변경되어 나가지는 문제 수정

### 1.50.3 (2019-05-31)
- 로고 잘리는 버그 수정

### 1.50.2 (2019-05-31)
- (실험실) 테마 기능에 폰트 적용 여부, 본인 채팅 강조 등 옵션 추가
- (실험실) 트윕 및 투네이션 도네이션 버튼 추가

### 1.50.1 (2019-05-30)
- (실험실) Black 테마 기능 추가
- 실험실 기능이었던 채팅 내에서 Clip, Youtube 재생 기능을 기본값으로 적용
- 빠른 좌표 기능 내 트위치 좌표에 스트리머 닉네임 표시
- 자잘한 버그 수정

### 1.49.6 (2019-05-28)
- (실험실) 채팅창 좌측으로 이동 사용 시 팝업 플레이어가 우측에 뜨도록 변경

### 1.49.5 (2019-05-22)
- (실험실) 채팅-재생창 위치 반전 기능 추가

### 1.49.4 (2019-05-02)
- (실험실) 방송 모드 테마 추가(box, twitch, simple)
- (실험실) 방송 모드 변경 시 더 이상 새로고침이 필요 없음(라이브로 바뀜)
- 채팅매니저 차단 시 시스템 메시지 출력
- 채팅매니저 차단 시 채팅창에서 해당 유저의 모든 채팅 삭제
- 채팅매니저 관리 창 변경 등

### 1.49.3 (2019-04-19)
- 자잘한 버그 수정
- (실험실) 방송용 Chatbox 생성 기능(방송 모드) 추가. [사용법](https://raw.githubusercontent.com/nomomo/Addostream/master/images/addostream_broadcaster_setting.jpg)

### 1.49.2 (2019-04-05)
- 편한 좌표 불러오기 시 기본 두스 좌표 사이트(coord.dostream.com)의 것을 가져오도록 변경
- (실험실) 좌표 사이트 선택, 채팅에서 스트리머 이름 자동 링크

### 1.49.1 (2019-04-02)
- (실험실) 도배 대응 기능 추가<br />상세 설정 페이지 접속 후 고급 탭의 실험실 기능을 활성화 한 후 설정 가능<br />![](https://raw.githubusercontent.com/nomomo/Addostream/master/images/190402_dobae.png)

### 1.49.0 (2019-03-10)
- 자동스크롤 변경 기능이 좀 더 잘 동작하도록 수정
- 채팅 이미지 로드 시 가능한 경우 제목, 작성자, 시청 수 등의 정보를 불러오도록 수정
- 채팅 이미지 로드 디자인 변경
- 개발 중 기능 활성화 및 상세 기능 설정을 유저가 직접 설정할 수 있도록 오픈 (실험실)

### 1.48.3 (2019-02-24)
- 설정 창에서 드래그로 스트리머 ID 순서 변경 가능
- 금지 단어 입력 시 입력한 대문자가 자동으로 소문자로 변경되어 저장되는 증상 수정- 자주 올라오는 Imgur 이미지 차단할 때 쓰세요.

### 1.48.1 (2019-02-17)
- Gfycat 동영상 불러오는 기능 추가

### 1.48.0 (2019-01-18)
- 메모 시 회원별 차단 기능 추가 (더 이상 차단 목록이 날아갔다고 짜증을 내지 않아도 된다)
- Imgur API 가 과부하 되어 응답하지 않는 경우 애드온이 멈추는 것을 방지
- 자동 스크롤 개선 기능 임시 추가 (테스트 중)

### 1.47.2 (2018-12-21)
- 두스트림 기본 리스트가 존재하지 않을 때 오프라인 고정 및 메인에 없는 스트리머 불러오기가 되지 않는 문제 수정

### 1.47.0 (2018-12-18)
- 시청 기록 보기 기능 추가 (옵션에서 끌 수 있음, 기본값 켜짐)
- 빠른 좌표 버튼을 옵션에서 끌 수 있도록 개선 (기본값 켜짐)
- Imgur 이미지 불러올 때 가끔 x,- 버튼 위치가 이상하게 되는 증상 임시 개선함

### 1.46.5 (2018-09-27)
- 우하하 채팅창 호환 기능 추가
  - 우하하용 임시 강제단차 기능 추가 (강제단차 시 차단목록에 추가됨)
  - 금지단어 기반 차단 기능을 우하하에도 적용
  - Imgur 이미지 불러오기 등은 적용 안 됨

### 1.46.2 (2018-09-26)
- 일부 기능 작동 안 되는 버그 임시 수정
- 채팅창 자동스크롤 뜬금없이 멈추는 증상 해결하기 위한 기능 임시 추가

### 1.46.1 (2018-09-17)
- 새창이 열렸을 때 기존창에서 API 와 채팅을 한 번에 새로고침하는 버튼 추가
- 빠른 좌표 버튼- 좌표 페이지를 두스트림 내부에서 불러옴

### 1.46.0 (2018-09-06)
- Imgur video 타입을 정상적으로 불러옴 + 자잘한 버그수정

### 1.45.0 (2018-07-25)
- 바뀐 채팅창에 대한 기능 임시 적용

### 1.44.0 (2017-12-23)
- Imgur album 의 경우 이미지 여러개 가져오기
- 업데이트 가능 여부 확인
- 스트리머 이름 입력 시 더 편한 자동완성
- Greasemonkey 4.0 호환성 확보 등

### 1.43.2 (2017-12-23)
- DARK 테마 추가 (Test)

### 1.43.0 (2017-12-16)
- 채팅 닉변 메시지 차단, 채팅 키워드 차단, API 갱신 시 메인 새로고침 등

### 1.42.0 (2017-11-21)
- ~~강제단차 기능 추가~~ → 현재 필요 없어짐

### 1.38 (2017-11-14)
- 설정창 레이아웃 변경
- 채팅창에 애드온 상태 알려줌
- 설정 저장을 위해 쿠키 대신 확장기능의 저장공간을 이용하도록 변경

### 1.37 (2017-09-30)
- 메인 접속 시마다 섬네일 이미지 갱신되도록 함- 1분 간격으로 갱신, 기존에는 새로고침 하지 않으면 처음 접속 시 섬네일 그대로 유지됨

### 1.36 (2017-09-29)
- 멀티트위치↔트위치 전환 버튼 추가

### 1.32 (2017-09-16)
- 채팅 닉네임에 메모하기

### 1.31 (2017-09-14)
- ~~채팅창에서 마우스 휠을 위로 할 시 자동 스크롤 멈춤 기능 추가(트위치 채팅창 기능과 유사)~~ 
     → 현재 채팅창 기본 기능이므로 작동 안 함

### 1.30 (2017-09-05)
- Firefox 에서 CSS 로드 안 되는 버그 수정

### 1.29 (2017-09-01)
- 유챗 스킨 관련 광고메시지 제거 기능 추가

### 1.27 (2017-08-06)
- 재생 중 화면에서 메인 목록 보기(Quick list) 추가

### 1.26 (2017-07-31)
- 채팅 내 두스 좌표는 현재창에서 열기
- 채팅 입력창에 현재 내가 보고있는 좌표 복사하기
- 채팅에 올라오는 imgur 이미지 미리보기
- 섬네일 확대
- 채팅 광고제거 등

### 1.25 (2017-07-19)
- Userscript 버전 업 시 알림 기능 추가

### 1.22 (2017-07-17)
- **두스 메인에서 @ 을 찾아서 클릭하면 놀라운 일이...???**

### 2017-07-09
- 재생 화면에서 뒤로가기 시 안 되는 오류 수정

### 2017-07-08
- 로고 클릭시 가끔 작동 안 하는 버그 수정, 응답성 높임
- 체크박스 체크 시 멀티트위치 버튼이 빛남

### 2017-07-02
- 메인 노출하고 싶지 않은 스트리머 숨기기 기능 추가
- 기본적으로 메인에 안 보여주는 스트리머 개인이 추가

### 2017-06-11
- 설정 버튼 및 기능 추가
- 원하는 스트리머 스트리머 최상단 고정 기능 추가
