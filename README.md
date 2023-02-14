## Description

정재우 과제

## DB 셋팅

```bash
$ DB 스키마(접속정보는 src/env/.env.sample에 있습니다.)
create table user
(
email         tinytext     null,
id            bigint auto_increment
primary key,
password      varchar(100) null,
phone         varchar(100) null,
name          varchar(100) not null,
device_id     varchar(100) null,
access_token  text         null,
refresh_token text         null
);
```

## 실행 방법

```bash
$ npm install
# watch mode
$ npm run start:dev
```

## 사용 기술

```
1. 인증: 로그인 이후 jwt토큰 사용하였습니다.(accessToken, refreshToken)
2. eslint적용
3. cashManager
4. class-validator
5. mikro-orm
6. passport
7. swagger ( http://localhost:3000/doc )
8. nestjs
9. custom error
```

## 구현 스펙 및 범위

```
1. 비번 저장은 sha256으로 저장하게 하였습니다.
2. 인증은 email/password로 로그인하고나서 일반 api는 jwt토큰을 사용하도록 하였습니다.
3. refresh token api도 구현하였습니다.
4. sms 인증 api 2개는 sms 보내고 확인하는 기능입니다.
5. 비밀번호 변경 api도 sms인증 api(2개)로 진행후 cashManager에서 확인하고 변경가능하도록 구현하였습니다.
6. env 폴더 밑에 관련 설정 값들이 있고 과제라서 같이 커밋하였습니다.
```

## 참고사항

```
1. sms 인증 캐시때문에 회원가입과 비번 변경이 막힐텐데 인증했다고 해주는 테스트 api를 만들었습니다. 이 api 호출하면 해당 폰은 sms인증했다고 넘겨줍니다.
2. sms 인증은 api 구현만 해놓은 상태이고 인증 완료하면 cashManager에 값을 기록한다는 가정하에 회원가입 api가 호출되면 cashmanager에서 확인하고 진행됩니다.
(sms 인증 api가 2개가 있어서 클라가 호출해준다는 가정하에 있습니다.)
```