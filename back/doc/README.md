# 폴더 구조

- /app: 앱 초기화
- /modules:
  - game: 게임 도메인
    - .model: schema
    - .logic: 게임 규칙
    - .controller: HTTP endpoint 핸들러
    - .service: 카드 분배, 턴 처리 등
- /config : 환경변수 등 설정
- routes : api
- types : type
- utils : util 함수
- middleware: 에러 핸들링 등
