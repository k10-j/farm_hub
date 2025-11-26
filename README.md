FarmHub

FarmHub is a comprehensive digital platform designed to empower farmers by bridging the gap between technology and agriculture. It combines an equipment rental system, a farmer-to-farmer marketplace, and AI-powered pest diagnosis to enhance productivity and market access.

Tech Stack

Backend

Language: Java 21

Framework: Spring Boot 3.3.5

Database: MySQL

Security: Spring Security with JWT (Stateless)

Build Tool: Maven

External APIs: Plant.id (for disease detection)

Frontend

Framework: React 19

Build Tool: Vite

Styling: Tailwind CSS

Routing: React Router DOM

Animations: Framer Motion, AOS

Icons: Lucide React

🛠️ Getting Started

Follow these instructions to set up the project locally.

1. Backend Setup (/farmhub)

Prerequisites

Java 21 SDK installed.

MySQL Database installed and running.

Maven (optional, as mvnw wrapper is included).

Configuration

Navigate to the backend directory:

cd farmhub


Create a .env file in the root of the farmhub folder (or update application.properties directly if you prefer not to use dotenv).

Add the following environment variables:

DB_URL=jdbc:mysql://localhost:3306/farmhub
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
JWT_SECRET_KEY=your_secure_random_secret_key_at_least_32_chars_long
JWT_EXPIRATION_MS=86400000
PLANTID_KEY=your_plant_id_api_key
PLANT_ID_URL=[https://api.plant.id/v2/health_assessment](https://api.plant.id/v2/health_assessment)


Running the Server

Build the project:

./mvnw clean install


Run the application:

./mvnw spring-boot:run


The backend will start on http://localhost:8080.

2. Frontend Setup (/farmhub-frontend)

Prerequisites

Node.js (v18 or higher recommended)

npm

Installation & Running

Navigate to the frontend directory:

cd farmhub-frontend


Install dependencies:

npm install


Configuration (Important):

The application currently points to a production URL (https://farm-hub.onrender.com) in files like SignInUp.jsx and pestDash.jsx.

For local development, search for this URL in your code and replace it with http://localhost:8080.

Recommendation: Create a .env file in farmhub-frontend/ with VITE_API_URL=http://localhost:8080 and use import.meta.env.VITE_API_URL in your fetch calls.

Start the development server:

npm run dev


Open your browser at http://localhost:5173.

📡 API Documentation

All endpoints are prefixed with /api.
Auth Required: Yes (Bearer Token via Cookie or Header), except for Auth endpoints.

1. Authentication

Register User

Endpoint: POST /api/auth/register

Payload:

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone_number": "+250788123456",
  "location": "Kigali"
}


Response (201 Created):

{
  "id": "uuid-string",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+250788123456"
}


Login

Endpoint: POST /api/auth/login

Payload:

{
  "email": "john@example.com",
  "password": "password123"
}


Response (200 OK):

Sets jwt HTTP-only cookie.

{
  "token": "jwt-token-string",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+250788123456"
  }
}


2. Marketplace (Produce)

Create Produce

Endpoint: POST /api/produce

Payload:

{
  "name": "Fresh Tomatoes",
  "cropType": "Vegetable",
  "description": "Organic tomatoes harvested today.",
  "unit": "kg",
  "quantity": 50.0,
  "pricePerUnit": 500.00,
  "imageUrl": "[https://example.com/image.jpg](https://example.com/image.jpg)",
  "harvestDate": "2023-10-27"
}


Response (201 Created): Returns the created Produce object with ID.

Get All Produce

Endpoint: GET /api/produce

Response: Array of produce objects.

Get Produce by ID

Endpoint: GET /api/produce/{id}

Update Produce

Endpoint: PATCH /api/produce/{id}

Payload:

{
  "name": "Updated Name",
  "quantity": 45.0
}


Delete Produce

Endpoint: DELETE /api/produce/{id}

3. Equipment Rental

List Equipment

Endpoint: POST /api/equipment

Payload:

{
  "name": "John Deere Tractor",
  "type": "Tractor",
  "hourlyRate": 15000.00,
  "dailyRate": 100000.00,
  "location": "Musanze",
  "availability": "AVAILABLE"
}


Get All Equipment

Endpoint: GET /api/equipment

Get My Equipment

Endpoint: GET /api/equipment/my-equipment

Update Equipment

Endpoint: PATCH /api/equipment/{id}

Payload: (Partial update allowed)

{
  "hourlyRate": 16000.00,
  "availability": "UNAVAILABLE"
}


4. Bookings (Equipment)

Create Booking

Endpoint: POST /api/bookings

Payload:

{
  "equipmentId": "uuid-of-equipment",
  "startDate": "2023-11-01T08:00:00",
  "endDate": "2023-11-01T12:00:00"
}


Response: Booking object with calculated totalPrice and status REQUESTED.

Get My Bookings (As Renter)

Endpoint: GET /api/bookings/my-bookings

Get Bookings for My Equipment (As Owner)

Endpoint: GET /api/bookings/my-equipment-bookings

Update Booking Status

Endpoint: PATCH /api/bookings/{id}/status

Payload:

{
  "status": "CONFIRMED" 
}


Options: APPROVED, REJECTED, CONFIRMED, COMPLETED, CANCELLED.

5. Orders (Marketplace)

Place Order

Endpoint: POST /api/order

Payload:

{
  "farmer_id": "uuid-of-farmer",
  "items": [
    {
      "produce_id": "uuid-of-produce",
      "quantity": 5
    }
  ]
}


Get My Orders

Endpoint: GET /api/order/my-orders

Update Order Status

Endpoint: PATCH /api/order/{id}/status

Payload:

{
  "status": "DELIVERED"
}


6. Pest Diagnosis

Detect Disease

Endpoint: POST /api/detect-disease

Content-Type: multipart/form-data

Payload:

image: (File) The image of the crop.

similarImages: true (boolean).

Response:

{
  "plantDetected": true,
  "healthy": false,
  "healthProbability": 0.15,
  "possibleDiseases": [
    {
      "name": "Leaf Spot",
      "probability": 0.85,
      "similarImages": ["url1", "url2"]
    }
  ]
}


7. Users

Get User Profile

Endpoint: GET /api/users/{id}

Update Profile

Endpoint: PATCH /api/users/{id}

Payload:

{
  "name": "New Name",
  "phone": "+250..."
}


🧪 Running Tests

To run the backend integration tests (using H2 in-memory database):

./mvnw test
