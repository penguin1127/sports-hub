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
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(100),
    captain_id BIGINT,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    region VARCHAR(100),
    rival_teams TEXT,
    
	constraint fk_team_users FOREIGN KEY (captain_id) REFERENCES users(id)
    
);
-- recruit_post 테이블
CREATE TABLE recruit_post (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
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
    CONSTRAINT fk_recruit_post_team FOREIGN KEY (team_id) REFERENCES team(id),
    constraint fk_recruit_post_users foreign key (writer_id) references users(id)
);

-- team_member 테이블
CREATE TABLE team_member (
    team_id BIGINT,
    user_id BIGINT,
    joined_at DATETIME,
	is_active boolean default true, #탈퇴 상태인지 아닌지 체크함(가입된 상태면 true, 탈퇴한 상태면 false)
    CONSTRAINT fk_team_member_team FOREIGN KEY (team_id) REFERENCES team(id),
    constraint fk_team_member_users foreign key(user_id) references users(id)
);

-- team_notice 테이블
CREATE TABLE team_notice (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    team_id BIGINT,
    title VARCHAR(255),
    content TEXT,
    created_at DATETIME,
    CONSTRAINT fk_team_notice_team FOREIGN KEY (team_id) REFERENCES team(id)
);

create table recruit_application( #신청 대기 테이블
	id bigint auto_increment primary key,
    user_id bigint NOT NULL, # 신청한 유저의 ID
    post_id bigint NOT NULL, # 신청한 모집 공고의 ID
    description text, # 신청한 유저의 자기소개
    status VARCHAR(20) NOT NULL, # 신청 상태(보류, 거절, 수락)
	application_date DATETIME default CURRENT_TIMESTAMP, #신청 시각, CURRENT_TIMESTAMP: 현재 날짜와 시간을 넣어줌.
    
	CONSTRAINT recruit_application_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	constraint recruit_application_recruit_post FOREIGN KEY (post_id) REFERENCES recruit_post(id) ON DELETE CASCADE
);

drop table notification;
create table notification( #기본 개인 알림 테이블
	id bigint auto_increment primary key,
    reciver_id bigint not null, # 알림을 받는 사용자의 ID
    type varchar(80), # 메시지의 종류
    message text, 
    is_read boolean default false, # 읽었는지 안읽었는지 확인 가능
    created_at datetime default CURRENT_TIMESTAMP, # CURRENT_TIMESTAMP: 현재 날짜와 시간을 넣어줌.
    
    constraint notification_users Foreign key (reciver_id) References users(id) ON DELETE CASCADE
);
-------------------------------------
