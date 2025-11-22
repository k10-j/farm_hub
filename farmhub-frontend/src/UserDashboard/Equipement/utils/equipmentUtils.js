// Utility functions for equipment management

export const initializeEquipmentData = () => {
  // Check if equipment data already exists
  if (!localStorage.getItem('equipment')) {
    // Initialize with sample data from EquipementData.js
    const sampleEquipment = [
      {
        id: 'ee41866a-8a41-4bbb-91d8-920d724b146d',
        name: 'John Deere 8R Tractor',
        type: 'Tractor',
        hourlyRate: 75.5,
        dailyRate: 600.0,
        location: 'Main Farm, Eldoret',
        availability: 'AVAILABLE',
        image: 'https://source.unsplash.com/400x250/?tractor,farm',
        description: 'High-performance tractor suitable for various farming operations.',
        owner: {
          id: '0646f2a3-c87b-4bf2-8b8e-20b343dcaad2',
          name: 'Test User',
          email: 'testuser5@example.com',
          phone: '1234567890'
        },
        availableSlots: [
          {
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
            startTime: '08:00',
            endTime: '12:00',
            booked: false
          },
          {
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            startTime: '13:00',
            endTime: '17:00',
            booked: false
          },
          {
            date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
            startTime: '08:00',
            endTime: '17:00',
            booked: false
          }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: '631f39f5-0346-4f06-8066-2d926ddc6900',
        name: 'Irrigation Helper 8R Tractor',
        type: 'Tractor Bus',
        hourlyRate: 75.5,
        dailyRate: 600.0,
        location: 'Main Farm, Eldoret',
        availability: 'AVAILABLE',
        image: 'https://source.unsplash.com/400x250/?tractor,farm',
        description: 'Specialized tractor for irrigation systems.',
        owner: {
          id: '0646f2a3-c87b-4bf2-8b8e-20b343dcaad2',
          name: 'Test User',
          email: 'testuser5@example.com',
          phone: '1234567890'
        },
        availableSlots: [
          {
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            startTime: '09:00',
            endTime: '15:00',
            booked: false
          }
        ],
        createdAt: new Date().toISOString()
      }
    ];

    localStorage.setItem('equipment', JSON.stringify(sampleEquipment));
  }

  // Initialize orders if not exists
  if (!localStorage.getItem('equipmentOrders')) {
    localStorage.setItem('equipmentOrders', JSON.stringify([]));
  }
};

export const getAvailableEquipment = () => {
  const equipment = JSON.parse(localStorage.getItem('equipment') || '[]');
  return equipment.filter(
    (eq) =>
      eq.availability === 'AVAILABLE' &&
      eq.availableSlots?.some((slot) => !slot.booked)
  );
};

export const getUserEquipment = (_userId) => {
  const equipment = JSON.parse(localStorage.getItem('equipment') || '[]');
  // In production, filter by userId
  return equipment;
};

export const getUserOrders = (_userId) => {
  const orders = JSON.parse(localStorage.getItem('equipmentOrders') || '[]');
  // In production, filter by userId (equipment owner)
  return orders;
};

