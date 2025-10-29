# FarmHub

The main objective of this project is to develop a backend System that combines pest and disease diagnosis, rent/buy equipment, and farmer marketplace functionalities, which further enhances farm productivity, reducing post-harvest losses, and improving market access for smallholder farmers.

## Features

*   **User Authentication:** Secure user registration and login.
*   **Pest and Disease Diagnosis:** Functionality for diagnosing crop pests and diseases.
*   **Equipment Rental/Purchase:** A marketplace for renting or buying farm equipment.
*   **Farmer's Marketplace:** A platform for farmers to sell their produce.
*   **Order Management:** System for managing orders.
*   **Booking Management:** System for managing equipment bookings.

## Technologies Used

*   **Java 21**
*   **Spring Boot 3.5.7**
*   **Spring Web:** For building REST APIs.
*   **Spring Data JPA:** For data persistence.
*   **Spring Security:** For authentication and authorization.
*   **MySQL:** As the relational database.
*   **Maven:** For dependency management.
*   **Lombok:** To reduce boilerplate code.
*   **dotenv-java:** For managing environment variables.

## Project Structure

The project follows a standard Spring Boot application structure:

```
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── farmhub
│   │   │           └── farmhub
│   │   │               ├── config       # Security configuration
│   │   │               ├── controllers  # API endpoints
│   │   │               ├── dto          # Data Transfer Objects
│   │   │               ├── enums        # Application enums
│   │   │               ├── models       # JPA Entities
│   │   │               ├── repositories # Data access layer
│   │   │               └── services     # Business logic
│   │   └── resources
│   │       ├── application.properties  # Application configuration
│   └── test
└── pom.xml
```

## How to Run

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Create a `.env` file** in the root of the project and add the following environment variables:
    ```
    DB_URL=jdbc:mysql://localhost:3306/farmhub
    DB_USERNAME=your-db-username
    DB_PASSWORD=your-db-password
    ```
3.  **Create the database:** Make sure you have a MySQL database named `farmhub`.
4.  **Build the project:**
    ```bash
    ./mvnw clean install
    ```
5.  **Run the application:**
    ```bash
    ./mvnw spring-boot:run
    ```
The application will be available at `http://localhost:8080`.

## API Endpoints

### User Registration

You can register a new user by sending a POST request to `/api/auth/register`.

**Example using cURL:**

```bash
curl -X POST https://farm-hub.onrender.com/api/auth/register -H "Content-Type: application/json" -d '{
    "full_name": "Test User",
    "email": "testuser@example.com",
    "password": "password123",
    "phone_number": "1234567890",
    "location": "Nairobi"
}'
```

**Responses:**

*   **Success:** If the registration is successful, you will receive a success message.
*   **Email Already Exists:** If the email is already registered, you will receive the following response:
    ```json
    {"message":"Email Already Exists"}
    ```
