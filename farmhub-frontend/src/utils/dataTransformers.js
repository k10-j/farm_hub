/**
 * Data Transformers - Transform frontend data to match backend DTOs
 */

/**
 * Transform produce form data to CreateProduceDto
 */
export const transformProduceData = (formData) => {
  return {
    name: formData.name?.trim() || '',
    cropType: formData.category || formData.cropType || 'Vegetables',
    description: formData.description || '',
    unit: formData.unit || 'kg',
    quantity: parseFloat(formData.stock || formData.quantity || 0),
    pricePerUnit: parseFloat(formData.price || formData.pricePerUnit || 0),
    imageUrl: formData.image || formData.imageUrl || '',
    ...(formData.harvestDate && { harvestDate: formData.harvestDate }),
  };
};

/**
 * Transform equipment form data to EquipmentRequestDto
 */
export const transformEquipmentData = (formData) => {
  return {
    name: formData.name?.trim() || '',
    type: formData.type || formData.equipmentType || '',
    hourlyRate: parseFloat(formData.hourlyRate || 0),
    dailyRate: parseFloat(formData.dailyRate || 0),
    location: formData.location || '',
    availability: formData.availability || 'AVAILABLE', // AVAILABLE, UNAVAILABLE, MAINTENANCE
  };
};

/**
 * Transform equipment update data to EquipmentPatchDto
 */
export const transformEquipmentUpdateData = (formData) => {
  const updateData = {};
  
  if (formData.name !== undefined) updateData.name = formData.name?.trim();
  if (formData.type !== undefined) updateData.type = formData.type || formData.equipmentType;
  if (formData.hourlyRate !== undefined) updateData.hourlyRate = parseFloat(formData.hourlyRate || 0);
  if (formData.dailyRate !== undefined) updateData.dailyRate = parseFloat(formData.dailyRate || 0);
  if (formData.location !== undefined) updateData.location = formData.location;
  if (formData.availability !== undefined) updateData.availability = formData.availability;
  
  return updateData;
};

/**
 * Transform booking form data to BookingRequestDto
 * @param {Object} bookingData - Frontend booking data
 * @returns {Object} BookingRequestDto format
 */
export const transformBookingData = (bookingData) => {
  // Combine date and time into LocalDateTime format
  // Backend expects: "2024-01-15T10:00:00"
  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return null;
    
    // If dateStr is already in ISO format, use it
    if (dateStr.includes('T')) {
      return dateStr;
    }
    
    // Combine date and time
    const date = new Date(dateStr);
    const [hours, minutes] = timeStr.split(':');
    date.setHours(parseInt(hours) || 0, parseInt(minutes) || 0, 0, 0);
    
    // Format as ISO string (backend expects LocalDateTime)
    return date.toISOString().slice(0, 19); // Remove milliseconds and timezone
  };

  return {
    equipmentId: bookingData.equipmentId || bookingData.equipment?.id,
    startDate: formatDateTime(
      bookingData.startDate || bookingData.selectedSlot?.date,
      bookingData.startTime || bookingData.selectedSlot?.startTime
    ),
    endDate: formatDateTime(
      bookingData.endDate || bookingData.selectedSlot?.date,
      bookingData.endTime || bookingData.selectedSlot?.endTime
    ),
  };
};

/**
 * Transform order form data to MakeOrderDto
 * @param {Object} orderData - Frontend order data
 * @returns {Object} MakeOrderDto format
 */
export const transformOrderData = (orderData) => {
  // Get current user ID
  const userStr = localStorage.getItem('user');
  const currentUser = userStr ? JSON.parse(userStr) : null;
  
  // Transform items to OrderItemDto format
  const items = [];
  
  // If single product order
  if (orderData.produceId || orderData.productId) {
    items.push({
      produce_id: orderData.produceId || orderData.productId,
      quantity: parseInt(orderData.quantity || 1),
    });
  }
  
  // If multiple items (array)
  if (Array.isArray(orderData.items)) {
    items.push(...orderData.items.map(item => ({
      produce_id: item.produceId || item.productId || item.id,
      quantity: parseInt(item.quantity || 1),
    })));
  }
  
  return {
    farmer_id: currentUser?.id || orderData.farmerId,
    items: items,
  };
};

/**
 * Transform user update data
 */
export const transformUserUpdateData = (formData) => {
  const updateData = {};
  
  if (formData.name !== undefined) updateData.name = formData.name?.trim();
  if (formData.email !== undefined) updateData.email = formData.email?.trim();
  if (formData.phone !== undefined) updateData.phone = formData.phone?.trim();
  if (formData.location !== undefined) updateData.location = formData.location?.trim();
  
  return updateData;
};

