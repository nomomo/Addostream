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

## Bug Report
버그 많음 버그리포트 바랍니다 (__) nomotg@gmail.com
버그 제보 시 아래의 내용을 함께 보내주시면 더 빨리 수정 가능합니다.
- 구체적인 증상
- 버전(1.xx.x)
- 사용 중인 브라우저 이름(Chrome? Firefox?)
- 사용 중인 UserScript 확장기능 이름(Tampermonkey? Violentmonkey?)
- 가능한 경우 설정 창 캡쳐 이미지 or 설정 창에서 Backup & Restore 누른 후 나오는 텍스트(필수는 아님)

## Change log
### 1.59.4 (2024-10-09)
- 채팅창에서 imgur 이미지 미리보기 기능이 제대로 동작하지 않는 문제 수정

### 1.59.3 (2024-08-14)
- 채팅창에서 스트리머 링크 변환 시 별명이 풀네임보다 먼저 변환되는 문제 수정

### 1.59.2 (2024-08-14)
- 채팅창에서 이미지 확대 기능이 간헐적으로 동작하지 않는 문제 수정

### 1.59.1 (2024-08-13)
- 스트리머 ID-닉네임 리스트 갱신

### 1.59.0 (2024-08-10)
- "스트리머 닉네임을 강조하여 표시" 기능이 개선되었어요. (아프리카 지원, 치지직 리스트 추가)
- "치지직 스트리머가 메인 리스트에 라이브인 경우에만 치지직 링크로 변환" 기능을 제거했어요.
- "🧪 단어의 시작일 때만 변환" 기능을 현재 지원하지 않아요.
- 문제 발생 시 개발자에게 제보해주세요!!

### 1.58.2 (2024-07-31)
- 초기 접속 시 보이는 이전 채팅에 대해 스크립트가 동작하지 않는 문제 수정

### 1.58.1 (2024-07-31)
- Chrome 브라우저에서 스크립트가 동작하지 않는 문제를 고쳤어요. 문제가 계속 발생하는 경우 제보해주세요!

### 1.58.0 (2024-01-13)
- 버전 업데이트

### 1.57.13b (2024-01-06)
- CHZZK 관련 동작 개선
  - CHZZK 메인 페이지에서 스크롤 할 수 있습니다.
  - <-> 버튼을 눌러 채팅을 On-Off 할 수 있습니다.
- 상세 설정창 리뉴얼(관련 라이브러리 업데이트)
- 버그 수정 및 안정성 개선
- 두스트림에서 치지직 로그인을 유지하려면 다음의 링크를 참고하세요.
  - [https://github.com/nomomo/Chzzk_Scripts/tree/main/CHZZK_sign_in_iframe](https://github.com/nomomo/Chzzk_Scripts/tree/main/CHZZK_sign_in_iframe)

### 1.57.13 (2024-01-01)
- "치지직 스트리머가 메인 리스트에 라이브인 경우에만 치지직 링크로 변환" 기능이 제대로 동작하지 않는 버그를 고쳤어요.

### 1.57.11-12 (2023-12-23)
- 치즈나이프 확장 프로그램과 충돌하여 치지직 플레이어가 자동으로 PIP 모드가 되는 버그 수정

### 1.57.10 (2023-12-23)
- 치지직 플레이어 주변 레이아웃을 자동으로 숨기는 기능이 더욱 잘 동작하도록 개선

### 1.57.9 (2023-12-22)
- "스트리머 숨기기" 기능에 치치직 스트리머를 지원
  - 차단할 스트리머 ID에 "1c231568d0b13dfafasdfsdf" 와 같은 형태로 입력
- "특정 플랫폼 숨기기"에 아프리카 및 치지직 추가
- 채팅에서 "스트리머 닉네임을 링크로 변환" 옵션에서 일부 치지직 스트리머를 지원
- "치지직 스트리머가 메인 리스트에 라이브인 경우에만 치지직 링크로 변환" 기능 추가(기본값 꺼짐)
  - 본 옵션이 꺼진 경우, 스크립트가 치지직 스트리머 이름을 감지하면 무조건 치지직 링크로 변환합니다.
  - 본 옵션이 켜진 경우, 치지직 스트리머가 메인 리스트에 존재하는 경우에만 치지직 링크로 변환합니다.
- 치지직 플레이어의 현재 품질 표시
- 치지직 플레이어로 재생하는 경우 자동으로 넓은 화면 모드로 변경하여 플레이어 상단 레이아웃이 표시되도록 함

### 1.57.8 (2023-12-20)
- 치지직 플레이어 주변 레이아웃을 숨기고 플레이어만 표시하는 기능을 추가했어요(기본값 켜짐). 알 수 없는 문제가 발생하면 이 기능을 끄세요.
- 히스토리에 치지직 닉네임을 표시하도록 했어요.

### 1.57.7 (2023-12-20)
- 메인 리스트의 CHZZK 스트리머 이름을 표시(Beta)

### 1.57.6 (2023-10-01)
- M3U8 링크 감지 시 & M3U8 Player 로 재생 시 대상 URL 을 Potplayer 로 재생할 수 있도록 하는 버튼을 표시합니다.
- 버튼 표시를 원하지 않는 경우 상세 설정에서 "Potplayer 로 재생 버튼을 추가" 옵션을 끄세요.

### 1.57.5 (2023-07-27)
- 사전에 저장된 스트리머 ID-닉네임 리스트 추가(피파온라인4 스트리머 파이트클럽)
- 이제 채팅창에서 "칸나"는 "아이리_칸나"를 가리킵니다.

### 1.57.3-4 (2023-06-01)
- 사전에 저장된 스트리머 ID-닉네임 리스트 추가(발낳대 관련)
- 두스에서만 뜨는 보라색 화면 숨기기 기능 삭제

### 1.57.2 (2023-02-05)
- M3U8 재생 시 "항상 최고 화질로 재생" 기능 추가(기본값 켜짐)
  - 기본값을 항상 최고 화질로 재생하도록 설정했습니다. 더 이상 인터넷 연결 상태 등에 따라 비디오 품질을 자동으로 조절하지 않습니다.
  - 버퍼링이 심하게 발생하는 경우, 상세 설정에서 M3U8 플레이어의 "항상 최고 화질로 재생" 옵션을 끄세요.

### 1.57.1 (2023-02-04)
- 특정 외부 사이트 좌표에 대하여 가능한 경우 라이브 일정을 표시

### 1.57.0 (2023-02-02)
- 특정 외부 사이트에 대해 간편한 M3U8 재생을 지원

### 1.56.2 (2022-10-06)
- 버그 수정<br />- M3U8 재생 후 다른 스트림으로 이동했을 때 백그라운드에서 M3U8 재생이 중지되지 않는 문제 수정

### 1.56.1 (2022-10-06)
- 버그 수정<br />- M3U8 재생 중 문제 수정

### 1.56.0 (2022-10-06)
- M3U8 PLAYER 재생 방식 변경
  - 기존에는 M3U8 파일을 제공하는 서버에서 요청을 거부하거나(CORS issue) M3U8 주소가 "http://" 로 시작하는 경우 브라우저 권한 문제로 재생이 불가능 했습니다. 이번 버전에서는 대부분의 M3U8 을 재생할 수 있으며, 이를 위해 추가 권한을 요구할 수 있습니다. M3U8 재생 시 연결 허용 관련 팝업이 뜨는 경우 "도메인 항상 허용" 또는 "모든 도메인 항상 허용" 버튼을 클릭 후 새로고침 하세요. 본 기능은 실험 중으로 현재 재생 중 알 수 없는 오류가 발생하는 경우가 있습니다.
  - 스크립트에 추가 권한을 부여하는 것을 원하지 않는 경우 [상세 설정] - [M3U8 PLAYER 타입] - [Legacy] 옵션을 선택하여 이전처럼 동작하도록 할 수 있습니다.
  - 이제 M3U8 재생 중 오류 발생 시, 가능한 경우 채팅창에 오류 메시지를 출력합니다.
- 비활성 탭에서 좌측채팅이 적용되지 않는 문제 임시 개선

### 1.55.3 (2022-05-22)
- 버그 수정<br />- M3U8 PLAYER 버튼을 눌렀을 때, 주소 끝에 } 가 붙는 문제 수정

### 1.55.2 (2022-05-20)
- 사전에 저장된 스트리머 ID- 닉네임 리스트 수정/추가 (자낳대 관련)

### 1.55.1 (2022-04-09)
- Tampermonkey 를 4.17 버전으로 업데이트 시 발생하는 문제에 대응하여 임시 수정 (Tampermonkey 버그임)

### 1.55.0 (2022-02-13)
- Twitch API 를 Kraken v5 에서 Helix 로 변경
<br />- Twitch 정책 변경으로 인하여, 2022년 3월부터 Dostream+ 의 메인에 스트리머 추가 기능과 채팅에서 트위치 클립 섬네일 미리보기 기능을 사용하려면 Twitch 계정과 Dostream+ 을 연동해야 합니다. 해당 기능을 사용하려면 [https://www.dostream.com/addostream/twitch/auth/](https://www.dostream.com/addostream/twitch/auth/) 를 참고하여 Twitch 계정과 Dostream+ 을 연동하세요.
- 버그 수정<br />- 간이 설정 창에서 저장 시 특정 상황에서 오류가 발생하는 문제 수정<br />- 두스트림 메인 첫 접속 시 간헐적으로 메인 리스트가 제대로 표시되지 않는 문제 개선

### 1.54.10 (2022-02-11)
- 스트리머 닉네임 링크를 강조하여 표시 옵션 추가 (채팅에서 스트리머 닉네임이 강조되는 것이 거슬리면 이 옵션을 끄세요.)
- 채팅에서 Youtube 섬네일을 조금 더 깔끔하게 표시

### 1.54.9 (2022-01-04)
- 사전에 저장된 스트리머 ID- 닉네임 리스트 수정/추가

### 1.54.8 (2021-12-27)
- (실험실) 별칭 입력으로 스트림 바로가기
- 버그 수정<br />- 스트리머 닉네임을 링크로 변환 시 정렬 개선<br />- 비활성화 된 탭을 활성화 시 로딩 표시가 여러번 나타나는 문제 수정

### 1.54.7 (2021-12-16)
- (실험실) 스트리머 닉네임을 링크로 변환 - 단어의 시작일 때만 변환 기능 추가
- (실험실) 스트리머 닉네임을 링크로 변환 - 한 글자 별칭도 링크로 변환 기능 추가(풍, 페, 홍, 쉐, 따, 룩, 삼, 얍, 봄, 똘...)
- 이제부터 "던"의 경우 위 기능 사용 여부와 상관 없이 무조건 스트리머 링크로 변환

### 1.54.6 (2021-12-14)
- 사전에 저장된 스트리머 ID- 닉네임 리스트 수정/추가 (자낳대 관련)

### 1.54.5 (2021-05-22)
- 버그 수정<br />- 트위치 클립 주소에 하이픈(-)이 들어가 있으면 클립 주소를 인식하지 못하는 문제 수정

### 1.54.4 (2021-05-17)
- 사전에 저장된 스트리머 ID- 닉네임 리스트 수정/추가 (자낳대 관련)

### 1.54.3 (2021-01-03)
- 사전에 저장된 스트리머 ID- 닉네임 리스트 수정/추가

### 1.54.2 (2020-12-20)
- (실험실) 두스(외부사이트)에서만 뜨는 보라색 화면 숨기기 테스트 기능 추가<br />첫 재생 시작 시(프리롤)의 경우 이 기능이 적용되는 것 같은데, 재생 중간(미드롤)의 경우에는 기능이 제대로 적용되는지 확인되지 않음.
- 블랙/다크 테마에서 채팅 매니저 관리 창이 제대로 보이지 않는 문제 수정

### 1.54.1 (2020-12-05)
- Dostream m3u8 player 링크를 다시 m3u8 좌표로 변환하는 문제 수정
- http & https mixed contents 문제 수정

### 1.54.0 (2020-11-30)
- 테마 기능 수정
- m3u8 재생 기능 추가 (테스트 중, 채팅창 및 빠른 좌표에 올라온 m3u8 링크 끝의 [M3U8 PLAYER] 링크를 눌러 재생 가능)

### 1.53.10 (2020-10-31)
- ~~(실험실) 광고 차단 테스트 기능 3차 수정~~
- ~~새로운 방법이 생성되고 막히고를 반복하는 중입니다. 광고 차단 테스트 기능 대신 다음 링크의 방법을 따라하는 것을 권장합니다. [https://www.reddit.com/r/Twitch/comments/jjepg8/fix_for_ublock_origin_on_twitch_i_updated_the/](https://www.reddit.com/r/Twitch/comments/jjepg8/fix_for_ublock_origin_on_twitch_i_updated_the/)~~

### 1.53.7 (2020-09-12)
- 사전에 저장된 스트리머 ID- 닉네임 리스트 수정/추가

### 1.53.6 (2020-07-13)
- 유챗 관련 기능이 제대로 동작하지 않는 문제 수정

### 1.53.5 (2020-06-22)
- 사전에 저장된 스트리머 ID- 닉네임 리스트 수정/추가

### 1.53.4 (2020-06-21)
- 채팅창 내에서 트위치 클립 재생 불가한 문제 수정

### 1.53.2, 1.53.3 (2020-06-11)
- (실험실) 채팅 입력 시 입력란 클릭 개선 기능 추가
- 채팅 또는 빠른 좌표 내 두스 링크 클릭 시 페이지 전환 없이 바로 이동되지 않는 문제 수정
- Mixed Content 보안 관련 문제 일부 수정 (메인 안 나오는 문제 등)

### 1.53.1 (2020-05-10)
- (실험실) 채팅에서 변환 가능한 외부 트위치, 아프리카 링크를 좌표로 변환 시 숫자 0을 감지하지 못하는 문제 수정

### 1.53.0 (2020-05-05)
- (실험실) 채팅에서 변환 가능한 외부 트위치, 아프리카 링크를 감지한 경우 두스 좌표를 덧붙임 (문제 발생 시 상세 설정 - 채팅 고급에서 "가능한 경우 외부 트위치, 아프리카 링크를 두스 좌표로 변환"을 끄십시오. 현재 UChat 에서만 동작)

### 1.52.15 (2020-05-02)
- 사전에 저장된 스트리머 ID- 닉네임 리스트 수정/추가

### 1.52.14 (2020-03-11)
- 사전에 저장된 스트리머 ID- 닉네임 리스트 수정/추가

### 1.52.13 (2020-02-22)
- 사전에 저장된 스트리머 ID- 닉네임 리스트 수정/추가

### 1.52.12 (2020-02-02)
- 빠른 설정에 좌측 채팅 메뉴 추가
- 우하하 채팅에 좌표 보내기 버튼 기능 적용
- 우하하 채팅 차단 로그에 기록 당시의 닉네임을 함께 남김

### 1.52.11 (2020-01-25)
- 우하하 채팅창에서 닉네임 색상화 기능 적용 시, 닉네임이 아닌 고유 ID 를 기반으로 색을 부여하여 중복 닉을 구분할 수 있도록 함

### 1.52.10 (2020-01-20)
- (실험중) Uchat 이 하얀 화면으로 표시될 때 강제 접속을 시도할 수 있는 버튼을 표시(특정 경우에만 제대로 동작)
- 버그 수정<br />- Uchat 서버 상황이 안 좋을 때 버전 확인 메시지가 여러번 노출되는 문제 해결

### 1.52.9 (2020-01-07)
- 채팅창 내에서 Youtube 재생 시, url 의 시작 시간을 인식하여 해당 시간부터 재생 예) https://youtu.be/LqWkKoc338k?t=264
- 버그 수정<br />- 상세 설정 페이지에서 채팅 로그 보기 기능이 작동하지 않는 문제 수정<br />- DEBUG 모드가 아니어도 콘솔창에 DEBUG 메시지가 찍히는 문제 수정

### 1.52.8 (2019-12-09)
- 스트리머 키워드 추가

### 1.52.7 (2019-12-01)
- (실험실) Youtube, Twitch Clip 재생 시 채팅창 상단에 동영상을 고정하는 기능 추가
- (실험실) Twip, Toonation 후원 버튼 기능 삭제

### 1.52.6 (2019-10-24)
- 버그 수정<br />- 리스트 제목이 오른쪽 정렬 되는 문제 임시 수정

### 1.52.5 (2019-10-23)
- 방송 모드에 닉네임 및 채팅 색상 변경 기능 추가
- 방송 모드 시 기본 폰트 색상을 #fafafa, 폰트를 Noto Sans 로 변경
- 방송 모드 시 일반 채팅 설정의 닉네임 색상화 설정은 무시됨 (방송 모드의 닉네임 색상화 설정만 적용됨)
- (실험실) 단독 재생의 경우 페이지 전환 없이 채팅 표시
- 버그 수정<br />- 방송 모드 시 특정 테마에서 내 채팅이 제대로 표시되지 않는 문제 수정

### 1.52.4 (2019-09-22)
- 버그 수정<br />- (실험실) 야간 모드를 켜지 않았는데도 메시지가 출력되는 문제 수정

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

## License

MIT

## Happy??

<a href="https://www.buymeacoffee.com/nomomo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="60"></a>　<a href="https://toon.at/donate/636947867320352181" target="_blank"><img src="https://raw.githubusercontent.com/nomomo/Addostream/master/assets/toonation_b11.gif" height="60" alt="Donate with Toonation" /></a>