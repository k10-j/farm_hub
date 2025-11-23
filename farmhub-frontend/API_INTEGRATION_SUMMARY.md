# API Integration Summary

## How It Works

### 1. **API Configuration**
- **Environment Variable**: Created `.env.local` with `VITE_API_URL=https://farm-hub.onrender.com`
- **API Utility**: Created `src/utils/api.js` that centralizes all API calls
- **Authentication**: Uses cookie-based JWT authentication (credentials: 'include')

### 2. **Components Updated**

All components now fetch data from the real backend API instead of localStorage or mock data:

#### Dashboard Components:
- ✅ **Overview.jsx** - Fetches orders, bookings, equipment, and produce stats
- ✅ **MarketplaceBuy.jsx** - Fetches all produce from `/api/produce`
- ✅ **MarketplaceSell.jsx** - Fetches user's produce (filters all produce by user ID)
- ✅ **MarketplaceOrders.jsx** - Fetches user's orders from `/api/order/my-orders`
- ✅ **BookEquipement.jsx** - Fetches available equipment from `/api/equipment`
- ✅ **Myequipement.jsx** - Fetches user's equipment from `/api/equipment/my-equipment`
- ✅ **AllOrders.jsx** - Fetches all orders and bookings
- ✅ **ProfilePage.jsx** - Fetches user data from `/api/users/{id}`

#### Website Pages:
- ✅ **MarketPlace.jsx** - Fetches all produce from `/api/produce`
- ✅ **Equipement.jsx** - Fetches all equipment from `/api/equipment`

#### Already Working (Not Touched):
- ✅ **SignInUp.jsx** - Already uses `/api/auth/login` and `/api/auth/register`
- ✅ **PestDiagnosis.jsx** - Already uses `/api/detect-disease`

### 3. **API Endpoints Used**

#### Auth Endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

#### Produce Endpoints:
- `GET /api/produce` - Get all produce
- `GET /api/produce/{id}` - Get produce by ID
- `POST /api/produce` - Create produce
- `PATCH /api/produce/{id}` - Update produce
- `DELETE /api/produce/{id}` - Delete produce

#### Equipment Endpoints:
- `GET /api/equipment` - Get all equipment
- `GET /api/equipment/my-equipment` - Get user's equipment
- `GET /api/equipment/{id}` - Get equipment by ID
- `POST /api/equipment` - Create equipment
- `PATCH /api/equipment/{id}` - Update equipment
- `DELETE /api/equipment/{id}` - Delete equipment

#### Booking Endpoints:
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/my-equipment-bookings` - Get bookings for user's equipment
- `GET /api/bookings/{id}` - Get booking by ID
- `PATCH /api/bookings/{id}/status` - Update booking status
- `DELETE /api/bookings/{id}` - Cancel booking

#### Order Endpoints:
- `POST /api/order` - Create order
- `GET /api/order/my-orders` - Get user's orders
- `GET /api/order/{orderId}` - Get order by ID
- `PATCH /api/order/{orderId}/status` - Update order status
- `DELETE /api/order/{orderId}` - Cancel order

#### User Endpoints:
- `GET /api/users/{id}` - Get user by ID
- `PATCH /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

#### Disease Detection:
- `POST /api/detect-disease` - Detect plant disease (already working)

#### AgroVet Details:
- `GET /api/agrovet-details` - Get all agro vet details
- `GET /api/agrovet-details/{id}` - Get agro vet details by ID
- `POST /api/agrovet-details` - Create agro vet details
- `PUT /api/agrovet-details/{id}` - Update agro vet details
- `DELETE /api/agrovet-details/{id}` - Delete agro vet details

### 4. **Missing Endpoints (Noted)**

The following endpoints would be useful but are not currently in the backend:

1. **`GET /api/produce/my-produce`** - Get current user's produce
   - Currently: Frontend filters all produce by user ID (inefficient)
   - Recommendation: Add this endpoint to backend

2. **`GET /api/order/all`** or **`GET /api/order`** - Get all orders (for admin or seller view)
   - Currently: Only `/api/order/my-orders` exists
   - Recommendation: Add endpoint to get orders for seller's products

3. **`GET /api/users/me`** - Get current authenticated user
   - Currently: Frontend uses user ID from localStorage
   - Recommendation: Add endpoint that returns current user from JWT token

### 5. **How Authentication Works**

1. User logs in via `/api/auth/login`
2. Backend sets JWT cookie (HttpOnly, Secure, SameSite=None)
3. All subsequent API calls include `credentials: 'include'` to send cookies
4. Backend validates JWT from cookie automatically
5. User data is stored in localStorage for frontend reference







