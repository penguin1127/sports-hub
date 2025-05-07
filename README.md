✅ 1. user 테이블
설명: 사용자 계정 및 기본 정보 보관

컬럼명	타입	설명
id	INT (PK)	자동 증가 기본키
name	VARCHAR(50)	사용자 이름
email	VARCHAR(100)	이메일 주소
userid	VARCHAR(50)	로그인용 아이디
password	VARCHAR(255)	암호화된 비밀번호
joined_teams	TEXT	소속된 팀 ID 목록
is_ex_player	VARCHAR(50)	선수 출신 여부
activity_start_date	DATE	활동 시작일
activity_end_date	DATE	활동 종료일
region	VARCHAR(100)	활동 지역
preferred_position	VARCHAR(50)	선호 포지션
is_captain	BOOLEAN	팀장 여부
phone_number	VARCHAR(20)	연락처
birth_date	DATE	생년월일

✅ 2. team 테이블
설명: 팀 기본 정보 저장

컬럼명	타입	설명
teamid	INT (PK)	팀 고유번호
team_name	VARCHAR(100)	팀 이름
captain_id	INT (FK → user.id)	팀장 유저 ID
create_date	DATE	팀 생성일
region	VARCHAR(100)	주요 활동 지역
rival_teams	TEXT	라이벌 팀 ID 목록

✅ 3. team_member 테이블
설명: 팀과 사용자 간 N:M 관계 정의

컬럼명	타입	설명
team_id	INT (FK)	소속 팀 ID
user_id	INT (FK)	소속 사용자 ID
joined_at	DATE	해당 유저가 팀에 가입한 날짜
(PK: team_id, user_id)		

✅ 4. recruit_post 테이블
설명: 용병 모집글 또는 팀원 모집글

컬럼명	타입	설명
id	INT (PK)	모집글 ID
team_id	INT (FK)	작성한 팀 ID
title	VARCHAR(200)	모집글 제목
content	TEXT	본문 내용
region	VARCHAR(100)	활동 지역
position	VARCHAR(50)	모집 포지션
created_at	DATETIME	작성일
author_id	INT (FK)	작성자 유저 ID

✅ 5. team_notice 테이블
설명: 팀 내부 공지사항

컬럼명	타입	설명
id	INT (PK)	공지 ID
team_id	INT (FK)	소속 팀 ID
author_id	INT (FK)	작성자 ID
content	TEXT	공지 내용
created_at	DATETIME	작성일

✅ 보조 사항
모든 FK는 외래키 제약 조건(FOREIGN KEY)으로 연결

recruit_post와 team_notice는 team_id로 팀과 연결됨

user는 id로 모든 테이블의 author_id, captain_id 등과 연결됨
