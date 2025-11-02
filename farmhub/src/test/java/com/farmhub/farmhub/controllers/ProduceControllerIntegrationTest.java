package com.farmhub.farmhub.controllers;

import com.farmhub.farmhub.models.Produce;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.enums.Role;
import com.farmhub.farmhub.repositories.ProduceRepository;
import com.farmhub.farmhub.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
class ProduceControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProduceRepository produceRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User user1;
    private User user2;
    private Produce produceOfUser1;

    // This setup method is correct and does not need changes.
    @BeforeEach
    void setUp() {
        user1 = new User();
        user1.setEmail("user1@example.com");
        user1.setName("User One");
        user1.setPassword(passwordEncoder.encode("password"));
        user1.setPhone("1111111111");
        user1.setRole(Role.USER);
        userRepository.saveAndFlush(user1);

        user2 = new User();
        user2.setEmail("user2@example.com");
        user2.setName("User Two");
        user2.setPassword(passwordEncoder.encode("password"));
        user2.setPhone("2222222222");
        user2.setRole(Role.USER);
        userRepository.saveAndFlush(user2);

        produceOfUser1 = new Produce();
        produceOfUser1.setName("Test Carrots");
        produceOfUser1.setFarmer(user1);
        produceOfUser1.setQuantity(10.0);
        produceRepository.saveAndFlush(produceOfUser1);
    }

    @Test
    void whenDeleteOwnProduce_thenReturns204NoContent() throws Exception {
        mockMvc.perform(delete("/api/produce/" + produceOfUser1.getId())
                        .with(user(user1)))
                .andExpect(status().isNoContent());
    }

    @Test
    void whenDeleteOthersProduce_thenReturns403Forbidden() throws Exception {
        mockMvc.perform(delete("/api/produce/" + produceOfUser1.getId())
                        .with(user(user2)))
                .andExpect(status().isForbidden());
    }
}