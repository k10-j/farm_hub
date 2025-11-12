# FarmHub

The main objective of this project is to develop a backend System that combines pest and disease diagnosis, rent/buy equipment, and farmer marketplace functionalities, which further enhances farm productivity, reducing post-harvest losses, and improving market access for smallholder farmers.

## Table of Contents

*   [Features](#features)
*   [Prerequisites](#prerequisites)
*   [Technologies Used](#technologies-used)
*   [Project Structure](#project-structure)
*   [Environment Variables](#environment-variables)
*   [How to Run](#how-to-run)
*   [API Documentation](#api-documentation)
*   [API Endpoints](#api-endpoints)
*   [Error Handling](#error-handling)
*   [CORS Configuration](#cors-configuration)
*   [Testing](#testing)
*   [Database Schema](#database-schema)
*   [Contributing](#contributing)
*   [License](#license)

## Features

*   **User Authentication:** Secure user registration and login.
*   **Pest and Disease Diagnosis:** Functionality for diagnosing crop pests and diseases.
*   **Equipment Rental/Purchase:** A marketplace for renting or buying farm equipment.
*   **Farmer's Marketplace:** A platform for farmers to sell their produce.
*   **Order Management:** System for managing orders.
*   **Booking Management:** System for managing equipment bookings.

## Prerequisites

Before you begin, ensure you have the following installed:
*   **Java 21**
*   **Maven**
*   **MySQL**

## Technologies Used

*   **Java 21**
*   **Spring Boot 3.3.5**
*   **Spring Web:** For building REST APIs.
*   **Spring Data JPA:** For data persistence.
*   **Spring Security:** For authentication and authorization.
*   **MySQL:** As the relational database.
*   **Maven:** For dependency management.
*   **Lombok:** To reduce boilerplate code.
*   **dotenv-java:** For managing environment variables.
*   **jjwt:** For creating and verifying JSON Web Tokens.

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

## Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```
DB_URL=jdbc:mysql://localhost:3306/farmhub
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
JWT_SECRET_KEY=your-jwt-secret
JWT_EXPIRATION_MS=86400000
```

| Variable            | Description                               | Default     |
| ------------------- | ----------------------------------------- | ----------- |
| `DB_URL`            | The connection URL for the MySQL database. |             |
| `DB_USERNAME`       | The username for the MySQL database.      |             |
| `DB_PASSWORD`       | The password for the MySQL database.      |             |
| `JWT_SECRET_KEY`    | The secret key for signing JWT tokens.    |             |
| `JWT_EXPIRATION_MS` | The expiration time for JWT tokens in milliseconds. | `86400000` (24 hours) |


## How to Run

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Create a `.env` file** in the root of the project and add the environment variables as described in the [Environment Variables](#environment-variables) section.
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

## API Documentation

The API is documented using Swagger. Once the application is running, you can access the Swagger UI at `http://localhost:8080/swagger-ui.html`.

## API Endpoints

### Authentication

*   `POST /api/auth/**`: Public endpoints for user registration and login.

### Other Endpoints

All other endpoints under `/api/` require authentication.

## Error Handling

The application uses a `GlobalExceptionHandler` to provide consistent error responses. The following are the most common error types:

| Status Code | Error Type                | Description                                                                        |
| ----------- | ------------------------- | ---------------------------------------------------------------------------------- |
| 400         | `Validation Failed`       | The request body is invalid. The response will contain a list of validation errors. |
| 401         | `Unauthorized`            | Invalid credentials or missing JWT token.                                          |
| 403         | `Forbidden`               | The user is not authorized to perform the requested action.                        |
| 404         | `Not Found`               | The requested resource was not found.                                              |
| 409         | `Conflict`                | The request could not be completed due to a conflict with the current state of the resource. |
| 500         | `Internal Server Error`   | An unexpected error occurred on the server.                                        |

## CORS Configuration

CORS (Cross-Origin Resource Sharing) is configured to allow requests from the following origins:

*   `http://localhost:5173`
*   `http://localhost:5174`

## Testing

To run the integration tests, use the following command:

```bash
./mvnw test
```

## Database Schema

The database schema is automatically generated by Hibernate based on the JPA entities in the `com.farmhub.farmhub.models` package.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.
