/**
 * API Utility - Centralized API calls for FarmHub
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://farm-hub.onrender.com';

/**
 * Helper function to get auth headers
 */
const getAuthHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  // Add credentials for cookie-based auth
  return {
    headers,
    credentials: 'include',
  };
};

/**
 * Helper function to handle API responses
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const error = await response.json();
      // Handle validation errors from Spring Boot
      if (error.message) {
        errorMessage = error.message;
      } else if (error.errors && Array.isArray(error.errors)) {
        errorMessage = error.errors.map(e => e.defaultMessage || e.message).join(', ');
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
    } catch (e) {
      // If response is not JSON, try to get text
      try {
        const text = await response.text();
        if (text) errorMessage = text;
      } catch (e2) {
        // Keep default error message
      }
    }
    const error = new Error(errorMessage);
    error.status = response.status;
    error.response = response;
    throw error;
  }
  return response.json();
};

/**
 * AUTH API
 */
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      ...getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      ...getAuthHeaders(),
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

/**
 * PRODUCE API
 */
export const produceAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/produce`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/produce/${id}`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  create: async (produceData) => {
    const response = await fetch(`${API_BASE_URL}/api/produce`, {
      method: 'POST',
      ...getAuthHeaders(),
      body: JSON.stringify(produceData),
    });
    return handleResponse(response);
  },

  update: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/api/produce/${id}`, {
      method: 'PATCH',
      ...getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/produce/${id}`, {
      method: 'DELETE',
      ...getAuthHeaders(),
    });
    if (response.status === 204) return null;
    return handleResponse(response);
  },
};

/**
 * EQUIPMENT API
 */
export const equipmentAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/equipment`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getMyEquipment: async () => {
    const response = await fetch(`${API_BASE_URL}/api/equipment/my-equipment`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/equipment/${id}`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  create: async (equipmentData) => {
    const response = await fetch(`${API_BASE_URL}/api/equipment`, {
      method: 'POST',
      ...getAuthHeaders(),
      body: JSON.stringify(equipmentData),
    });
    return handleResponse(response);
  },

  update: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/api/equipment/${id}`, {
      method: 'PATCH',
      ...getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/equipment/${id}`, {
      method: 'DELETE',
      ...getAuthHeaders(),
    });
    if (response.status === 204) return null;
    return handleResponse(response);
  },
};

/**
 * BOOKINGS API
 */
export const bookingsAPI = {
  create: async (bookingData) => {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: 'POST',
      ...getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });
    return handleResponse(response);
  },

  getMyBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/api/bookings/my-bookings`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getMyEquipmentBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/api/bookings/my-equipment-bookings`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateStatus: async (id, statusData) => {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${id}/status`, {
      method: 'PATCH',
      ...getAuthHeaders(),
      body: JSON.stringify(statusData),
    });
    return handleResponse(response);
  },

  cancel: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
      method: 'DELETE',
      ...getAuthHeaders(),
    });
    if (response.status === 204) return null;
    return handleResponse(response);
  },
};

/**
 * ORDERS API
 */
export const ordersAPI = {
  create: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/api/order`, {
      method: 'POST',
      ...getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  getMyOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/api/order/my-orders`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/api/order/${orderId}`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateStatus: async (orderId, statusData) => {
    const response = await fetch(`${API_BASE_URL}/api/order/${orderId}/status`, {
      method: 'PATCH',
      ...getAuthHeaders(),
      body: JSON.stringify(statusData),
    });
    return handleResponse(response);
  },

  cancel: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/api/order/${orderId}`, {
      method: 'DELETE',
      ...getAuthHeaders(),
    });
    if (response.status === 204) return null;
    return handleResponse(response);
  },
};

/**
 * USERS API
 */
export const usersAPI = {
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  update: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'PATCH',
      ...getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'DELETE',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

/**
 * PLANT DISEASE API
 */
export const diseaseAPI = {
  detect: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/detect-disease`, {
      method: 'POST',
      credentials: 'include',
      body: formData, // FormData for file upload
    });
    return handleResponse(response);
  },
};

/**
 * AGROVET DETAILS API
 */
export const agrovetAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/agrovet-details`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/agrovet-details/${id}`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  },

  create: async (agrovetData) => {
    const response = await fetch(`${API_BASE_URL}/api/agrovet-details`, {
      method: 'POST',
      ...getAuthHeaders(),
      body: JSON.stringify(agrovetData),
    });
    return handleResponse(response);
  },

  update: async (id, agrovetData) => {
    const response = await fetch(`${API_BASE_URL}/api/agrovet-details/${id}`, {
      method: 'PUT',
      ...getAuthHeaders(),
      body: JSON.stringify(agrovetData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/agrovet-details/${id}`, {
      method: 'DELETE',
      ...getAuthHeaders(),
    });
    if (response.status === 204) return null;
    return handleResponse(response);
  },
};

