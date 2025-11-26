FarmHub
FarmHub is a comprehensive digital platform designed to empower farmers by bridging the gap between technology and agriculture. It combines an equipment rental system, a farmer-to-farmer marketplace, and AI-powered pest diagnosis to enhance productivity and market access.

Tech Stack
Backend
Language: Java 21
Framework: Spring Boot 3.3.5
Database: MySQL
Security: Spring Security with JWT (Stateless)
Build Tool: Maven
External APIs: Plant.id

Frontend
Framework: React 19
Build Tool: Vite
Styling: Tailwind CSS
Routing: React Router DOM
Animations: Framer Motion, AOS
Icons: Lucide React

Getting Started
1. Backend Setup (/farmhub)
Prerequisites
Java 21 SDK
MySQL installed and running
Maven (optional, mvnw included)

Configuration
Create a .env file in the backend root:

DB_URL=jdbc:mysql://localhost:3306/farmhub
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
JWT_SECRET_KEY=your_secure_random_secret_key_at_least_32_chars_long
JWT_EXPIRATION_MS=86400000
PLANTID_KEY=your_plant_id_api_key
PLANT_ID_URL=https://api.plant.id/v2/health_assessment

Ensure the database exists:

CREATE DATABASE farmhub;

Running the Server
Build:
./mvnw clean install

Run:
./mvnw spring-boot:run

Backend runs at:
http://localhost:8080

2. Frontend Setup (/farmhub-frontend)
Prerequisites
Node.js v18+
npm

Install dependencies:
npm install

Frontend Configuration
The frontend currently points to the production API URL:
https://farm-hub.onrender.com

For local development replace with:
http://localhost:8080

Recommended: create .env:
VITE_API_URL=http://localhost:8080

Use:
import.meta.env.VITE_API_URL

Start dev server:
npm run dev

Frontend runs at:
http://localhost:5173

API Documentation
All endpoints are prefixed with /api.
Authentication is required except for /api/auth/**.

1. Authentication
Register User
POST /api/auth/register
Payload:
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone_number": "+250788123456",
  "location": "Kigali"
}

Login
POST /api/auth/login
Payload:
{
  "email": "john@example.com",
  "password": "password123"
}

Response sets an HttpOnly JWT cookie.

2. Marketplace (Produce)
Create Produce
POST /api/produce
Payload:
{
  "name": "Fresh Tomatoes",
  "cropType": "Vegetable",
  "description": "Organic tomatoes harvested today.",
  "unit": "kg",
  "quantity": 50.0,
  "pricePerUnit": 500.00,
  "imageUrl": "https://example.com/image.jpg",
  "harvestDate": "2023-10-27"
}

Get All Produce
GET /api/produce

Get Produce by ID
GET /api/produce/{id}

Update Produce
PATCH /api/produce/{id}

Delete Produce
DELETE /api/produce/{id}

3. Equipment Rental
Create Equipment
POST /api/equipment
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
GET /api/equipment

Get My Equipment
GET /api/equipment/my-equipment

Update Equipment
PATCH /api/equipment/{id}

4. Bookings
Create Booking
POST /api/bookings
Payload:
{
  "equipmentId": "uuid-of-equipment",
  "startDate": "2023-11-01T08:00:00",
  "endDate": "2023-11-01T12:00:00"
}

Get My Bookings
GET /api/bookings/my-bookings

Get Bookings for My Equipment
GET /api/bookings/my-equipment-bookings

Update Booking Status
PATCH /api/bookings/{id}/status
Payload:
{
  "status": "CONFIRMED"
}

5. Orders
Place Order
POST /api/order
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
GET /api/order/my-orders

Update Order Status
PATCH /api/order/{id}/status
Payload:
{
  "status": "DELIVERED"
}

6. Pest Diagnosis
Detect Disease
POST /api/detect-disease
Content-Type: multipart/form-data
Payload:
image: File
similarImages: boolean
Response includes plant detection, disease probabilities, and similar images.

7. Users
Get User Profile
GET /api/users/{id}

Update Profile
PATCH /api/users/{id}
Payload:
{
  "name": "New Name",
  "phone": "+250..."
}

Running Tests
./mvnw test
