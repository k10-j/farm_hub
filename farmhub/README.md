# FarmHub

The main objective of this project is to develop a backend System that combines pest and disease diagnosis, rent/buy equipment, and farmer marketplace functionalities, which further enhances farm productivity, reducing post-harvest losses, and improving market access for smallholder farmers.

## Table of Contents

*   [Features](#features)
*   [Prerequisites](#prerequisites)
*   [Technologies Used](#technologies-used)
*   [Project Structure](#project-structure)
*   [How to Run](#how-to-run)
*   [API Endpoints](#api-endpoints)
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
    JWT_SECRET=your-jwt-secret
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

The API is documented using Swagger. Once the application is running, you can access the Swagger UI at `http://localhost:8080/swagger-ui.html`.

### Authentication

#### Register

*   `POST /api/auth/register`: Register a new user.

**Request Body:**

```json
{
    "full_name": "Test User",
    "email": "testuser@example.com",
    "password": "password123",
    "phone_number": "1234567890",
    "location": "Nairobi"
}
```

**Success Response (201 Created):**

```json
{
    "id": "3e476a91-0fdf-40b3-becf-7683a5aaa54d",
    "name": "Test User",
    "email": "testuser5@example.com",
    "phone": "1234567890"
}
```

**Error Responses:**

*   **400 Bad Request (Missing Fields):**

```json
{
    "message": [
        {
            "password": "Password is required.",
            "phone_number": "Phone number is required."
        }
    ]
}
```

*   **409 Conflict (Email already exists):**

```json
{
    "message": [
        {
            "message": "An account with this email already exists."
        }
    ]
}
```

#### Login

*   `POST /api/auth/login`: Login a user and get a JWT token.

**Request Body:**

```json
{
    "email": "testuser@example.com",
    "password": "password13"
}
```

**Success Response (200 OK):**

*   **Body:**

```json
{
    "id": "65ea53b5-c5fa-4de0-ba45-e6c6dc5482b9",
    "name": "Test User",
    "email": "testuser@example.com",
    "phone": "1234567890"
}
```

*   **Cookie:**
    *   `jwt`: HTTP-only cookie containing the JWT token.

**Error Response (401 Unauthorized):**

```json
{
    "message": [
        {
            "message": "Invalid email or password."
        }
    ]
}
```

### User Management

#### Get User

*   `GET /api/users/{id}`: Get user by ID.

**Success Response (200 OK):**

```json
{
    "id": "65ea53b5-c5fa-4de0-ba45-e6c6dc5482b9",
    "name": "Test User",
    "email": "testuser@example.com",
    "phone": "1234567890"
}
```

**Error Response (404 Not Found):**

#### Update User

*   `PUT /api/users/{id}`: Update user by ID.

**Request Body:**

```json
{
    "name": "Updated User Name"
}
```

**Success Response (204 No Content):**

#### Delete User

*   `DELETE /api/users/{id}`: Delete user by ID.

**Success Response (204 No Content):**

### Produce Management

#### Create Produce

*   `POST /api/produce`: Create a new produce listing.

**Request Body:**

```json
{
    "name": "Tomatoes",
    "cropType": "Fruit",
    "description": "Fresh, red tomatoes",
    "unit": "kg",
    "quantity": 100.0,
    "pricePerUnit": 2.50,
    "imageUrl": "http://example.com/tomato.jpg",
    "harvestDate": "2025-10-31T10:00:00Z"
}
```

**Success Response (201 Created):**

#### Get All Produce

*   `GET /api/produce`: Get a list of all produce.

**Success Response (200 OK):**

#### Get Produce by ID

*   `GET /api/produce/{id}`: Get a single produce listing by ID.

**Success Response (200 OK):**

#### Update Produce

*   `PATCH /api/produce/{id}`: Partially update a produce listing.

**Request Body:**

```json
{
    "quantity": 50.0,
    "pricePerUnit": 2.75
}
```

**Success Response (200 OK):**

#### Delete Produce

*   `DELETE /api/produce/{id}`: Delete a produce listing.

**Success Response (204 No Content):**

## Database Schema

The database schema is automatically generated by Hibernate based on the JPA entities in the `com.farmhub.farmhub.models` package.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.

## Changelog

### 2025-11-01

*   Implemented `UserService` to handle `getData`, `updateData`, and `deleteData` operations.
*   Created `UserController` to expose user management operations via a REST API.
*   Added endpoints for getting, updating, and deleting users.
*   Implemented `ProduceService` and `ProduceControllers` to manage produce listings.
*   Added CRUD endpoints for produce.