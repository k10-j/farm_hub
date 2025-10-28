package com.farmhub.farmhub.repositories;

import com.farmhub.farmhub.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository // Tells Spring this is a repository bean
public interface UserRepository extends JpaRepository<User, UUID> {
    // That's it!

    // We can add custom queries later. For example, to find a user by their email:
    Optional<User> findByEmail(String email);
}