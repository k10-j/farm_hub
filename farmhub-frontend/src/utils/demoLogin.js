// Demo login utility for testing user dashboard
import AuthUtils from './authUtils';

export const DemoLogin = {
  // Demo user data
  demoUsers: [
    {
      id: 'user_001',
      name: 'John Farmer',
      firstName: 'John',
      lastName: 'Farmer',
      email: 'john.farmer@farmhub.com',
      phone: '+250 788 123 456',
      role: 'FARMER',
      joinDate: '2024-01-15T10:30:00Z',
      location: 'Kigali, Rwanda'
    },
    {
      id: 'user_002', 
      name: 'Mary Agriculture',
      firstName: 'Mary',
      lastName: 'Agriculture',
      email: 'mary.agri@farmhub.com',
      phone: '+250 788 654 321',
      role: 'FARMER',
      joinDate: '2024-02-20T14:15:00Z',
      location: 'Musanze, Rwanda'
    }
  ],

  // Login with demo user
  loginDemo: (userIndex = 0) => {
    const user = DemoLogin.demoUsers[userIndex] || DemoLogin.demoUsers[0];
    const token = 'demo_token_' + Date.now();
    
    AuthUtils.setUser(user, token);
    return { user, token };
  },

  // Quick login function for console testing
  quickLogin: () => {
    console.log('Demo login executed');
    return DemoLogin.loginDemo(0);
  }
};

// Make it available globally for console testing
if (typeof window !== 'undefined') {
  window.demoLogin = DemoLogin.quickLogin;
}

export default DemoLogin;