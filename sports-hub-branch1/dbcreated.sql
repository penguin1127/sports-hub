CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  userid VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  joined_teams TEXT, -- JSON이나 쉼표 구분 문자열로 여러 팀 표현
  is_ex_player VARCHAR(50), -- 예: '예', '아니오' 또는 'Y', 'N'
  activity_start_date DATE,
  activity_end_date DATE,
  region VARCHAR(100),
  preferred_position VARCHAR(50),
  is_captain BOOLEAN DEFAULT FALSE,
  phone_number VARCHAR(20),
  birth_date DATE
);

CREATE TABLE team (
  teamid INT PRIMARY KEY AUTO_INCREMENT,
  team_name VARCHAR(100) NOT NULL,
  captain_id INT,  -- 반드시 users.id와 타입 일치
  create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  region VARCHAR(100),
  rival_teams TEXT,
  FOREIGN KEY (captain_id) REFERENCES users(id) ON DELETE SET NULL
);


CREATE TABLE team_member (
  team_id INT,
  user_id int,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (team_id, user_id),
  FOREIGN KEY (team_id) REFERENCES team(teamid) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE recruit_post (
  post_id INT PRIMARY KEY AUTO_INCREMENT,
  team_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT,
  region VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES team(teamid) ON DELETE CASCADE
);

CREATE TABLE team_notice (
  notice_id INT PRIMARY KEY AUTO_INCREMENT,
  team_id INT NOT NULL,
  author_id int,
  title VARCHAR(100) NOT NULL,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES team(teamid) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

USE sporthub;
SHOW DATABASES;
RENAME TABLE user TO users;

DELETE FROM users WHERE email = 'test@example.comusers';
DELETE FROM users WHERE email = 'testuser@test.com';
SELECT * from users;
-- 먼저 users 테이블 확인
DESC users;

ALTER TABLE recruit_post
ADD COLUMN category VARCHAR(50),
ADD COLUMN target_type VARCHAR(50);

DESCRIBE recruit_post;

INSERT INTO recruit_post (
  title, content, region, created_at, image_url, match_date,
  writer_id, category, target_type
) VALUES
-- 게시글 1
('주말에 함께할 팀 찾습니다!', '경험 많은 FW입니다. 일요일 사망 경기 선호합니다.', '서울 강서구', '2025-04-17', '/images/user1.jpg', '2025-04-20', 1, 'mercenary', '개인'),

-- 게시글 2
('공격수 포지션으로 경기 구해요!', '빠른 발과 위치선정 강점. 토요일 오후 경기 참여 가능.', '서울 강동구', '2025-04-19', '/images/user2.jpg', '2025-04-23', 2, 'mercenary', '개인'),

-- 게시글 3
('주중 야간 경기 참여 원합니다', '수요일이나 목요일 저녁 경기 선호합니다. 수비수 가능.', '인천 남동구', '2025-04-20', '/images/user3.jpg', '2025-04-24', 3, 'mercenary', '개인'),

-- 게시글 4
('강서구 팀원 모집합니다', 'FW와 MF 포지션 각 1명 모집합니다. 일요 오전 경기.', '서울 강서구', '2025-04-21', '/images/team1.jpg', '2025-04-27', 1, 'mercenary', '팀'),

-- 게시글 5
('강서구 팀원 구인 중', 'MF 혹은 DF 모집. 수요일 훈련 필참 가능자.', '서울 강남구', '2025-04-22', '/images/team2.jpg', '2025-04-27', 1, 'mercenary', '팀');

INSERT INTO recruit_post (
  post_id,  title, content, region, created_at, image_url, match_date,
  writer_id, category, target_type
) VALUES
-- 게시글 1
(NULL, '주말에 함께할 팀 찾습니다!', '경험 많은 FW입니다. 일요일 사망 경기 선호합니다.', '서울 강서구', '2025-04-17', '/images/user1.jpg', '2025-04-20', 1, 'mercenary', '개인'),

-- 게시글 2
(NULL, '공격수 포지션으로 경기 구해요!', '빠른 발과 위치선정 강점. 토요일 오후 경기 참여 가능.', '서울 강동구', '2025-04-19', '/images/user2.jpg', '2025-04-23', 2, 'mercenary', '개인'),

-- 게시글 3
(NULL, '주중 야간 경기 참여 원합니다', '수요일이나 목요일 저녁 경기 선호합니다. 수비수 가능.', '인천 남동구', '2025-04-20', '/images/user3.jpg', '2025-04-24', 3, 'mercenary', '개인'),

-- 게시글 4
(NULL, '강서구 팀원 모집합니다', 'FW와 MF 포지션 각 1명 모집합니다. 일요 오전 경기.', '서울 강서구', '2025-04-21', '/images/team1.jpg', '2025-04-27', 1, 'mercenary', '팀'),

-- 게시글 5
(NULL, '강서구 팀원 구인 중', 'MF 혹은 DF 모집. 수요일 훈련 필참 가능자.', '서울 강남구', '2025-04-22', '/images/team2.jpg', '2025-04-27', 1, 'mercenary', '팀');

ALTER TABLE recruit_post MODIFY team_id INT NULL;

SELECT * from users;
SELECT * from recruit_post;

ALTER TABLE recruit_post
ADD COLUMN image_url VARCHAR(255),
ADD COLUMN match_date DATE,
ADD COLUMN writer_id INT;

SHOW DATABASES;

SELECT * from users;
SELECT * from recruit_post;
------------------------------------------------------------------------
-- users 테이블
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    userid VARCHAR(50),
    password VARCHAR(255),
    joined_teams TEXT,
    is_ex_player VARCHAR(50),
    activity_start_date DATE,
    activity_end_date DATE,
    region VARCHAR(100),
    preferred_position VARCHAR(50),
    is_captain BOOLEAN,
    phone_number VARCHAR(20),
    birth_date DATE,
    role VARCHAR(50)
);

-- team 테이블
CREATE TABLE team (
    teamid BIGINT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(100),
    captain_id BIGINT,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    region VARCHAR(100),
    rival_teams TEXT
);

-- recruit_post 테이블
CREATE TABLE recruit_post (
    post_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    team_id BIGINT,
    writer_id BIGINT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    region VARCHAR(255),
    created_at DATETIME(6),
    image_url VARCHAR(255),
    match_date DATE,
    category VARCHAR(255),
    target_type VARCHAR(255),
    CONSTRAINT fk_recruit_post_team FOREIGN KEY (team_id) REFERENCES team(teamid)
);

-- team_member 테이블
CREATE TABLE team_member (
    team_id BIGINT,
    user_id BIGINT,
    joined_at DATETIME,
    CONSTRAINT fk_team_member_team FOREIGN KEY (team_id) REFERENCES team(teamid)
);

-- team_notice 테이블
CREATE TABLE team_notice (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    team_id BIGINT,
    title VARCHAR(255),
    content TEXT,
    created_at DATETIME,
    CONSTRAINT fk_team_notice_team FOREIGN KEY (team_id) REFERENCES team(teamid)
);
-------------------------------------
INSERT INTO users (id, name, email, userid, password, joined_teams, is_ex_player, activity_start_date, activity_end_date, region, preferred_position, is_captain, phone_number, birth_date, role)
VALUES
(1, '홍길동', 'testuser1@test.com', 'testuser1', '$2a$10$ch1npgOQsEX9i0vZqldQwe1r017mPocxS...', NULL, '아니오', NULL, NULL, '서울 강서구', 'FW', false, NULL, NULL, 'USER'),
(2, '김철수', 'testuser2@test.com', 'testuser2', '$2a$10$abcdefghijklmnopqrstuvxyz1234...', NULL, '아니오', NULL, NULL, '서울 강동구', 'GK', false, NULL, NULL, 'USER'),
(3, '이영희', 'testuser3@test.com', 'testuser3', '$2a$10$mnopqrstuvwxyzabcdefghi5678...', NULL, '아니오', NULL, NULL, '인천 남동구', 'MF', false, NULL, NULL, 'USER'),
(4, '박민수', 'testuser4@test.com', 'testuser4', '$2a$10$uvwxyzabcdefghijklmno123456...', NULL, '아니오', NULL, NULL, '서울 강서구', 'DF', false, NULL, NULL, 'USER');

INSERT INTO recruit_post (post_id, team_id, title, content, region, created_at, image_url, match_date, writer_id, category, target_type)
VALUES
(1, NULL, '주말에 함께할 팀 찾습니다', '경험 많은 FW입니다. 일요일 사당 경기 선호합니다.', '서울 강서구', '2025-04-17 00:00:00', '/images/user1.jpg', '2025-04-20', 1, 'mercenary', '개인'),
(2, NULL, '공격수 포지션으로 경기 구해요!', '빠른 발과 위치선정 강점. 토요일 오후 경기 환영', '서울 강동구', '2025-04-19 00:00:00', '/images/user2.jpg', '2025-04-23', 2, 'mercenary', '개인'),
(3, NULL, '주중 야간 경기 찾여요', '수요일이나 목요일 저녁 경기 선호합니다. 수비도 가능.', '인천 남동구', '2025-04-20 00:00:00', '/images/user3.jpg', '2025-04-24', 3, 'mercenary', '개인'),
(4, NULL, '강서구 팀원 모집합니다', 'FW와 MF 포지션 각 1명 모집합니다. 일욜 오전 경기.', '서울 강서구', '2025-04-21 00:00:00', '/images/team1.jpg', '2025-04-27', 4, 'mercenary', '팀'),
(5, NULL, '강서구 팀원 구인 중', 'MF 혹은 DF 모집. 수요일 훈련 참가 가능자.', '서울 강남구', '2025-04-22 00:00:00', '/images/team2.jpg', '2025-04-27', 1, 'mercenary', '팀');
