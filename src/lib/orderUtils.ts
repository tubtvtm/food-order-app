// Utility function to save order to both localStorage and database
export const saveOrderToDatabase = async (orderData: any, user: any) => {
  try {
    // บันทึกลง localStorage (สำหรับ backward compatibility)
    const existingOrders = JSON.parse(localStorage.getItem('placedOrders') || '[]');
    const newOrder = {
      id: `ORDER_${Date.now()}`,
      ...orderData,
      createdAt: new Date().toISOString()
    };
    existingOrders.push(newOrder);
    localStorage.setItem('placedOrders', JSON.stringify(existingOrders));

    // บันทึกลง Database (ถ้ามี user login)
    if (user && user.id) {
      const dbOrderData = {
        ...newOrder,
        userId: user.id
      };
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbOrderData)
      });
      
      if (response.ok) {
        console.log('✅ Order saved to database and localStorage');
        return await response.json();
      } else {
        console.log('⚠️ Order saved to localStorage only (database failed)');
        return newOrder;
      }
    } else {
      console.log('⚠️ Order saved to localStorage only (no user login)');
      return newOrder;
    }
  } catch (error) {
    console.error('❌ Error saving order:', error);
    return null;
  }
};

// Utility function to get user orders from database
export const getUserOrders = async (userId: string) => {
  try {
    const response = await fetch(`/api/orders?userId=${userId}`);
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Failed to get user orders:', error);
    return [];
  }
};