package com.farmhub.farmhub;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FarmhubApplication {

    public static void main(String[] args) {
        // --- UPDATE THIS BLOCK ---
        Dotenv dotenv = Dotenv.configure()
                              .directory("./") // Explicitly look in the current directory
                              .ignoreIfMissing() // Prevents crash if file is not found
                              .load();

        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        // -------------------------

        SpringApplication.run(FarmhubApplication.class, args);
    }
}