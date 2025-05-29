mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: sporthub
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `application_status` enum('ACCEPTED','CANCELED','PENDING','REJECTED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied_at` datetime(6) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `updated_at` datetime(6) NOT NULL,
  `applicant_id` bigint NOT NULL,
  `applicant_team_id` bigint DEFAULT NULL,
  `recruit_post_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgi56fay19nbaiamp5xyhd7ptc` (`applicant_id`),
  KEY `FKg1oox3vqqgd8g2y98nqpq146d` (`applicant_team_id`),
  KEY `FKetjvm4k3mbifugq6gi5feedqm` (`recruit_post_id`),
  CONSTRAINT `FKetjvm4k3mbifugq6gi5feedqm` FOREIGN KEY (`recruit_post_id`) REFERENCES `recruit_post` (`id`),
  CONSTRAINT `FKg1oox3vqqgd8g2y98nqpq146d` FOREIGN KEY (`applicant_team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `FKgi56fay19nbaiamp5xyhd7ptc` FOREIGN KEY (`applicant_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKkj6mywiq9sh8wq4hfwpkyyel8` FOREIGN KEY (`recruit_post_id`) REFERENCES `recruit_posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recruit_post`
--

DROP TABLE IF EXISTS `recruit_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recruit_post` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `age_group` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` bigint DEFAULT NULL,
  `category` enum('MATCH','MERCENARY','TEAM') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `from_participant` enum('INDIVIDUAL','TEAM') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `game_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `game_time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `match_rules` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `max_players` int DEFAULT NULL,
  `min_players` int DEFAULT NULL,
  `preferred_positions` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `required_personnel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('CANCELED','COMPLETED','RECRUITING') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_region` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `target_type` enum('TEAM','USER') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_participant` enum('INDIVIDUAL','TEAM') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recruit_post`
--

LOCK TABLES `recruit_post` WRITE;
/*!40000 ALTER TABLE `recruit_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `recruit_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recruit_posts`
--

DROP TABLE IF EXISTS `recruit_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recruit_posts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `age_group` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` enum('MATCH','MERCENARY','TEAM') COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `from_participant` enum('INDIVIDUAL','TEAM') COLLATE utf8mb4_unicode_ci NOT NULL,
  `game_date` date NOT NULL,
  `game_time` time(6) NOT NULL,
  `match_rules` text COLLATE utf8mb4_unicode_ci,
  `max_players` int DEFAULT NULL,
  `min_players` int DEFAULT NULL,
  `preferred_positions` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `required_personnel` int DEFAULT NULL,
  `status` enum('CANCELED','COMPLETED','RECRUITING') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_region` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `target_type` enum('TEAM','USER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `to_participant` enum('INDIVIDUAL','TEAM') COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `author_id` bigint NOT NULL,
  `posting_team_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKksgmhnqr9tpbm0mhb5fguo487` (`author_id`),
  KEY `FKju6e7bhp9w06mn4dkw7k2njum` (`posting_team_id`),
  CONSTRAINT `FKju6e7bhp9w06mn4dkw7k2njum` FOREIGN KEY (`posting_team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `FKksgmhnqr9tpbm0mhb5fguo487` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recruit_posts`
--

LOCK TABLES `recruit_posts` WRITE;
/*!40000 ALTER TABLE `recruit_posts` DISABLE KEYS */;
INSERT INTO `recruit_posts` VALUES (1,'20대','MERCENARY','우리 팀과 함께 뛸 용병 구합니다!','2025-05-22 20:48:00.000000','TEAM','2025-06-01','14:00:00.000000','친선경기',11,7,'FW','서울',1,'RECRUITING','강남','USER','https://via.placeholder.com/150','용병 모집 테스트 글 1','INDIVIDUAL','2025-05-22 20:48:00.000000',1,NULL),(2,'30대','MERCENARY','주말 경기 참여하실 분!','2025-05-22 20:48:00.000000','TEAM','2025-06-02','10:00:00.000000','리그전',11,7,'MF','경기',1,'RECRUITING','수원','USER','https://via.placeholder.com/150','용병 모집 테스트 글 2','INDIVIDUAL','2025-05-22 20:48:00.000000',1,NULL),(67,'20대 ~ 30대','MERCENARY','저희 팀에 주말 풋살 용병 한 분 모십니다. 실력 무관하게 즐겁게 차실 분 환영합니다.','2025-05-22 22:09:14.000000','TEAM','2025-06-01','14:00:00.000000','친선 경기, 부상 조심',NULL,NULL,'FW,MF','서울',1,'RECRUITING','강남구','USER','https://picsum.photos/seed/foot1/700/400','강남 풋살장 주말 용병 구합니다!','INDIVIDUAL','2025-05-22 22:09:14.000000',1,NULL),(68,'제한 없음','TEAM','저희 팀은 매주 화요일 저녁에 야탑동 풋살장에서 운동합니다. 꾸준히 나오실 팀원 모집해요!','2025-05-22 22:09:14.000000','TEAM','2025-06-03','20:00:00.000000','없음',NULL,NULL,'모든 포지션','경기',3,'RECRUITING','성남시 분당구','USER','https://picsum.photos/seed/foot2/700/400','성남시 야탑동 매주 화요일 팀원 모집','INDIVIDUAL','2025-05-22 22:09:14.000000',2,NULL),(69,'제한 없음','MATCH','저희 팀과 즐거운 경기 하실 상대팀을 구합니다. 실력 비슷한 팀이면 좋겠습니다.','2025-05-22 22:09:14.000000','TEAM','2025-06-08','10:00:00.000000','친선 경기',11,11,NULL,'경기',NULL,'RECRUITING','수원시 영통구','TEAM','https://picsum.photos/seed/foot3/700/400','수원시 망포동 일요일 경기 상대팀 구합니다!','TEAM','2025-05-22 22:09:14.000000',3,NULL),(70,'20대 ~ 40대','MERCENARY','갑자기 한 분이 불참하게 되어 급하게 용병 구합니다. 빨리 연락 주세요!','2025-05-22 22:09:14.000000','TEAM','2025-05-23','20:00:00.000000','없음',NULL,NULL,'MF','서울',1,'RECRUITING','강동구','USER',NULL,'서울 강동구 용병 급구! 오늘 저녁 8시 풋살','INDIVIDUAL','2025-05-22 22:09:14.000000',4,NULL),(71,'10대 ~ 30대','TEAM','여성 풋살 팀에서 새로운 멤버를 찾습니다. 초보자분들도 환영해요! 함께 즐겁게 운동해요.','2025-05-22 22:09:14.000000','TEAM','2025-06-10','19:00:00.000000','친목 위주',NULL,NULL,'모든 포지션','부산',5,'RECRUITING','해운대구','USER','https://picsum.photos/seed/foot4/700/400','부산 해운대구 여성 풋살 팀원 모집 (초보 환영!)','INDIVIDUAL','2025-05-22 22:09:14.000000',5,NULL),(72,'20대 ~ 50대','MATCH','대구 달서구에서 주말 오후에 친선 경기 하실 상대팀을 구합니다. 매너 있는 팀 환영합니다.','2025-05-22 22:09:14.000000','TEAM','2025-05-25','16:00:00.000000','11 vs 11, 승패 무관',11,11,NULL,'대구',NULL,'RECRUITING','달서구','TEAM','https://picsum.photos/seed/foot5/700/400','대구 달서구 주말 친선 경기 상대팀 모집','TEAM','2025-05-22 22:09:14.000000',6,NULL),(73,'30대 ~ 40대','MERCENARY','저희 팀 수비수가 필요합니다. 탄탄한 수비력으로 팀에 기여해주실 분 구해요!','2025-05-22 22:09:14.000000','TEAM','2025-06-02','19:30:00.000000','즐겁게!',NULL,NULL,'DF','인천',1,'RECRUITING','연수구','USER','https://picsum.photos/seed/foot6/700/400','인천 연수구 용병 모집 (수비수 우대)','INDIVIDUAL','2025-05-22 22:09:14.000000',7,NULL),(74,'20대 ~ 40대','TEAM','제주도 서귀포에서 함께 축구할 여성 팀원 모집합니다. 초보자 환영!','2025-05-22 22:09:14.000000','TEAM','2025-06-15','17:00:00.000000','친목 위주',NULL,NULL,'모든 포지션','제주',4,'RECRUITING','서귀포시','USER',NULL,'제주도 서귀포시 여성 축구팀원 모집','INDIVIDUAL','2025-05-22 22:09:14.000000',8,NULL),(75,'제한 없음','MATCH','광주 광산구 풋살장에서 주말 경기 하실 팀 구합니다. 5대5 풋살!','2025-05-22 22:09:14.000000','TEAM','2025-06-09','18:00:00.000000','5 vs 5 풋살, 매너 플레이',5,5,NULL,'광주',NULL,'RECRUITING','광산구','TEAM','https://picsum.photos/seed/foot7/700/400','광주 광산구 주말 경기 상대 찾아요! (풋살)','TEAM','2025-05-22 22:09:14.000000',9,NULL),(76,'20대 ~ 50대','MERCENARY','골키퍼 포지션이 필요합니다! 실력 좋으신 분 우대합니다.','2025-05-22 22:09:14.000000','TEAM','2025-06-05','21:00:00.000000','부상 조심',NULL,NULL,'GK','서울',1,'RECRUITING','송파구','USER','https://picsum.photos/seed/foot8/700/400','서울 송파구 송파구민회관 용병 (골키퍼 환영!)','INDIVIDUAL','2025-05-22 22:09:14.000000',10,NULL);
/*!40000 ALTER TABLE `recruit_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `home_ground` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `region` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `captain_id` bigint DEFAULT NULL,
  `sub_region` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnm5gsd12609rk1sdsmo5d9nn4` (`captain_id`),
  CONSTRAINT `FKnm5gsd12609rk1sdsmo5d9nn4` FOREIGN KEY (`captain_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_teams`
--

DROP TABLE IF EXISTS `user_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_teams` (
  `is_active` bit(1) NOT NULL,
  `joined_at` datetime(6) NOT NULL,
  `role_in_team` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `team_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`team_id`,`user_id`),
  KEY `FK5aymw95okwem1l7tmd2owesdh` (`user_id`),
  CONSTRAINT `FK2ndqpo9mm1g72f7hvb9daimrd` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `FK5aymw95okwem1l7tmd2owesdh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_teams`
--

LOCK TABLES `user_teams` WRITE;
/*!40000 ALTER TABLE `user_teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `activity_end_date` date DEFAULT NULL,
  `activity_start_date` date DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_ex_player` bit(1) DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferred_position` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `userid` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKjyjiwnaabof8kpd0gclhcj2lh` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,NULL,'2025-05-23 05:37:10.726638','test@example.com',_binary '\0','홍길동','$2a$10$bfwmpzN1RD2zB0muR6T2rO0VtETJGSKa/.YlN.v3RGNKAdL2JFy/6',NULL,NULL,NULL,'USER','2025-05-23 05:37:10.726638','testuser1'),(2,NULL,NULL,NULL,'2025-05-23 05:37:54.529000','test@example1.com',_binary '\0','홍길금','$2a$10$TEDqguxbBr93A6GpmgRZ8evBcAwMjk6yYia9gghVpBSWBWSDd7NYq',NULL,NULL,NULL,'USER','2025-05-23 06:55:47.243029','testuser2'),(3,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userA@example.com',NULL,'','hashed_pw_A',NULL,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userA_id'),(4,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userB@example.com',NULL,'','hashed_pw_B',NULL,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userB_id'),(5,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userC@example.com',NULL,'','hashed_pw_C',NULL,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userC_id'),(6,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userD@example.com',NULL,'','hashed_pw_D',NULL,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userD_id'),(7,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userE@example.com',NULL,'','hashed_pw_E',NULL,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userE_id'),(8,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userF@example.com',NULL,'','hashed_pw_F',NULL,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userF_id'),(9,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userG@example.com',NULL,'','hashed_pw_G',NULL,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userG_id'),(10,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userH@example.com',NULL,'','hashed_pw_H',NULL,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userH_id'),(11,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userI@example.com',NULL,'','hashed_pw_I',NULL,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userI_id'),(12,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userJ@example.com',NULL,'','hashed_pw_J',NULL,NULL,NULL,NULL,'2025-05-22 22:09:11.000000','userJ_id'),(13,NULL,NULL,NULL,'2025-05-30 01:37:58.414675','test@example12.com',_binary '','홍길은','$2a$10$ycHDfqcmsOkAc..3gee1y.uGRcRxhCnkHpyQk0QdLnzdLqaPUGZp2','111-2222-3333','미드필더(MF)','경기','USER','2025-05-30 01:37:58.414675','test1234');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-29 23:51:10
