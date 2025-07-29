![image](https://github.com/user-attachments/assets/84c1f387-bca6-43aa-9bb5-d3ee454e42cc)

우리의 상황 

현재 개발중인 기능 및 추가중인 기능
각 사이트에 대해 DB연결, 마이페이지 상세 설정, 팀 상세페이지(사실상 얘네가 대부분)

개발하면 좋을 기능
디스코드처럼 팀장이 생성한 링크를 타고서 들어갈 시 자동으로 팀에 참가되는 방식
+뭔가

DB테이블 설명

✅ 1. user 테이블
설명: 사용자 계정 및 기본 정보 보관
| Column Name           | Type         | Description                   |
| --------------------- | ------------ | ----------------------------- |
| `id`                  | INT (PK)     | Primary key (auto-increment)  |
| `name`                | VARCHAR(50)  | User's real name              |
| `email`               | VARCHAR(100) | Email address                 |
| `userid`              | VARCHAR(50)  | Unique login ID               |
| `password`            | VARCHAR(255) | Encrypted password            |
| `joined_teams`        | TEXT         | Comma-separated team IDs      |
| `is_ex_player`        | VARCHAR(50)  | Former player status          |
| `activity_start_date` | DATE         | Activity start date           |
| `activity_end_date`   | DATE         | Activity end date             |
| `region`              | VARCHAR(100) | Primary activity region       |
| `preferred_position`  | VARCHAR(50)  | Preferred playing position    |
| `is_captain`          | BOOLEAN      | Whether user is a team leader |
| `phone_number`        | VARCHAR(20)  | Phone number                  |
| `birth_date`          | DATE         | Date of birth                 |

✅ 2. team 테이블
설명: 팀 기본 정보 저장
| Column Name   | Type               | Description                    |
| ------------- | ------------------ | ------------------------------ |
| `teamid`      | INT (PK)           | Team ID (auto-increment)       |
| `team_name`   | VARCHAR(100)       | Team name                      |
| `captain_id`  | INT (FK → user.id) | Team leader ID                 |
| `create_date` | DATE               | Date of creation               |
| `region`      | VARCHAR(100)       | Main activity region           |
| `rival_teams` | TEXT               | Comma-separated rival team IDs |

✅ 3. team_member 테이블
설명: 팀과 사용자 간 N:M 관계 정의
| Column Name | Type     | Description               |
| ----------- | -------- | ------------------------- |
| `team_id`   | INT (FK) | Associated team ID        |
| `user_id`   | INT (FK) | Associated user ID        |
| `joined_at` | DATE     | Date when joined the team |

✅ 4. recruit_post 테이블
설명: 용병 모집글 또는 팀원 모집글
| Column Name  | Type         | Description            |
| ------------ | ------------ | ---------------------- |
| `id`         | INT (PK)     | Post ID                |
| `team_id`    | INT (FK)     | Authoring team ID      |
| `title`      | VARCHAR(200) | Recruitment post title |
| `content`    | TEXT         | Body content           |
| `region`     | VARCHAR(100) | Region of activity     |
| `position`   | VARCHAR(50)  | Desired position       |
| `created_at` | DATETIME     | Creation timestamp     |
| `author_id`  | INT (FK)     | Author (user) ID       |

✅ 5. team_notice 테이블
설명: 팀 내부 공지사항
| Column Name  | Type     | Description        |
| ------------ | -------- | ------------------ |
| `id`         | INT (PK) | Notice ID          |
| `team_id`    | INT (FK) | Related team ID    |
| `author_id`  | INT (FK) | Author user ID     |
| `content`    | TEXT     | Notice content     |
| `created_at` | DATETIME | Creation timestamp |

## 📘 데이터베이스 테이블 관계 설명 (MySQL 기반)

### 🔗 테이블 구조 및 관계 개요

#### 1. `user` ↔ `team_member` (다대다 관계)
- **설명**: 하나의 유저는 여러 팀에 속할 수 있고, 하나의 팀에도 여러 유저가 포함될 수 있습니다.
- **연결**: 중간 테이블 `team_member`가 `user.id`와 `team.teamid`를 외래키로 연결합니다.

#### 2. `team` ↔ `user` (1:1 관계)
- **설명**: `team` 테이블의 `captain_id`는 팀을 생성한 유저(`user.id`)를 참조합니다.

#### 3. `recruit_post` ↔ `team`, `user` (N:1 관계)
- **설명**: 각 모집글은 하나의 팀이 작성하고, 하나의 유저가 작성자입니다.
- **연결**: `team_id` → `team.teamid`, `author_id` → `user.id`

#### 4. `team_notice` ↔ `team`, `user` (N:1 관계)
- **설명**: 팀 공지사항도 하나의 팀에 속하고, 작성자는 유저입니다.
- **연결**: `team_id` → `team.teamid`, `author_id` → `user.id`

---

### 📊 ER 관계 요약 (텍스트 기반)

```plaintext
[user] 1 --- * [team_member] * --- 1 [team]
   ↑                         ↑
   └──── captain_id          └──── teamid
       
[recruit_post] ── author_id ──→ [user]
               ── team_id ───→ [team]

[team_notice] ── author_id ──→ [user]
               ── team_id ───→ [team]






선수 등록시 프론트 화면에서 정보를 입력시 백에서 정보를 받아 데이터 베이스에 저장 후 다시 반송하여 프론트에 전달
선수 삭제시 데이터 베이스에서 삭제 후 반송 하여 프론트에 전달

1차 수정

![image](https://github.com/user-attachments/assets/b1f3c16a-bd5f-4f10-89b2-9933d8c49602)


