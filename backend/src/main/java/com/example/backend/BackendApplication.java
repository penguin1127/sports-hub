package com.example.backend;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

// BackendApplication.java
@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner init(UserRepository userRepository) {
		return args -> {
			User user = new User();
			user.setName("홍길동");
			user.setEmail("test@example.com");
			user.setUserid("hong123");
			user.setPassword("encodedPW");
			user.setJoinedTeams("FC강서,마포유나이티드");
			user.setIsExPlayer("아니오");
			user.setRegion("서울 강서구");
			user.setPreferredPosition("공격수");
			user.setIsCaptain(true);
			user.setPhoneNumber("010-1234-5678");
			user.setActivityStartDate(LocalDate.of(2024, 1, 1));
			user.setActivityEndDate(LocalDate.of(2024, 12, 31));
			user.setBirthDate(LocalDate.of(2000, 5, 5));

			userRepository.save(user);
		};
	}
}

