// User authentication utility for localStorage management
export const AuthUtils = {
  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (userData) {
        return JSON.parse(userData);
      } else if (token) {
        // If only token exists, return minimal user object
        return {
          email: null,
          name: null,
          role: 'USER'
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  // Set user data in localStorage
  setUser: (userData, token = null) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      if (token) {
        localStorage.setItem('token', token);
      }
      return true;
    } catch (error) {
      console.error('Error setting user data:', error);
      return false;
    }
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return localStorage.getItem('token') !== null || localStorage.getItem('user') !== null;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userCart'); // Clear cart on logout
  },

  // Get user display name
  getUserDisplayName: (user = null) => {
    const currentUser = user || AuthUtils.getCurrentUser();
    // Prioritize registered name, then email, avoid generic 'User'
    return currentUser?.name || currentUser?.firstName || currentUser?.username || currentUser?.email || 'Guest';
  }
};

export default AuthUtils;