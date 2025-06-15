package com.example.backend.enums;

// 알림 종류
public enum NotificationType {
    APPLICATION_SUBMITTED,	//신청이 접수됨
    APPLICATION_APPROVED,	//신청이 수락됨
    APPLICATION_REJECTED,	//신청이 거절됨
    COMMENT_RECEIVED,	//댓글이 달림
    LIKE_RECEIVED,  //좋아요를 받음
    TEAM_INVITE,	//팀 초대 수신
    MATCH_INVITE,	//경기 초대 수신
    MATCH_CONFIRMED,	//경기 확정됨
    ADMIN_NOTICE // 운영 공지
}
