/**
 * SOVIRA Luxury Jewellery — API Service Conduit
 * Communicates with the Node.js Express backend API (/api/v1)
 * Configurable via VITE_API_URL, with resilient fallbacks for demo mode.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('sovira_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const config = {
    ...options,
    headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const error = new Error(data.message || `Request failed with status ${res.status}`);
      error.status = res.status;
      error.configError = Boolean(data.configError);
      error.data = data;
      throw error;
    }
    return data;
  } catch (err) {
    // If backend is unreachable or request fails, rethrow with descriptive message
    throw err;
  }
}

// 1. Patron & Admin Authentication
export const authApi = {
  login: async (email, password) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      localStorage.setItem('sovira_token', data.token);
    }
    return data;
  },

  register: async (userData) => {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (data.token) {
      localStorage.setItem('sovira_token', data.token);
    }
    return data;
  },

  getMe: async () => {
    return request('/auth/me');
  },

  updateDetails: async (details) => {
    return request('/auth/updatedetails', {
      method: 'PUT',
      body: JSON.stringify(details)
    });
  },

  logout: () => {
    localStorage.removeItem('sovira_token');
  }
};

// 2. Masterpieces & Catalog
export const productApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    const qs = query.toString();
    return request(`/products${qs ? `?${qs}` : ''}`);
  },

  getById: async (id) => {
    return request(`/products/${id}`);
  },

  create: async (productData) => {
    return request('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },

  update: async (id, productData) => {
    return request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },

  delete: async (id) => {
    return request(`/products/${id}`, {
      method: 'DELETE'
    });
  }
};

// 3. Jewellery Typologies & Categories
export const categoryApi = {
  getAll: async () => {
    return request('/categories');
  },

  create: async (categoryData) => {
    return request('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    });
  },

  delete: async (id) => {
    return request(`/categories/${id}`, {
      method: 'DELETE'
    });
  }
};

// 4. Acquisition Folio / Cart
export const cartApi = {
  getCart: async () => {
    return request('/cart');
  },

  addItem: async (productId, quantity = 1) => {
    return request('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity })
    });
  },

  updateQuantity: async (productId, quantity) => {
    return request(`/cart/items/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    });
  },

  removeItem: async (productId) => {
    return request(`/cart/items/${productId}`, {
      method: 'DELETE'
    });
  },

  clearCart: async () => {
    return request('/cart', {
      method: 'DELETE'
    });
  }
};

// 5. Saved Vault Folio / Wishlist
export const wishlistApi = {
  getWishlist: async () => {
    return request('/wishlist');
  },

  addItem: async (productId) => {
    return request(`/wishlist/${productId}`, {
      method: 'POST'
    });
  },

  removeItem: async (productId) => {
    return request(`/wishlist/${productId}`, {
      method: 'DELETE'
    });
  }
};

// 6. Sovereign Orders & Payment
export const orderApi = {
  createOrder: async (orderPayload) => {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload)
    });
  },

  getMyOrders: async () => {
    return request('/orders/my-orders');
  },

  getOrderById: async (id) => {
    return request(`/orders/${id}`);
  },

  trackOrder: async (reference) => {
    return request(`/orders/track/${reference}`);
  },

  createRazorpayOrder: async ({ orderId, amountINR }) => {
    return request('/orders/razorpay/create-order', {
      method: 'POST',
      body: JSON.stringify({ orderId, amountINR })
    });
  },

  verifyRazorpayPayment: async ({ orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    return request('/orders/razorpay/verify-payment', {
      method: 'POST',
      body: JSON.stringify({
        orderId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      })
    });
  }
};

// 7. Master Admin Operations
export const adminApi = {
  getStats: async () => {
    return request('/admin/stats');
  },

  getOrders: async () => {
    return request('/admin/orders');
  },

  updateOrderStatus: async (orderId, { fulfillmentStatus, paymentStatus, courierTrackingNumber }) => {
    return request(`/admin/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ fulfillmentStatus, paymentStatus, courierTrackingNumber })
    });
  },

  getCustomers: async () => {
    return request('/admin/customers');
  },

  updateInventory: async (productId, count) => {
    return request(`/admin/products/${productId}/inventory`, {
      method: 'PUT',
      body: JSON.stringify({ count })
    });
  }
};

export default {
  auth: authApi,
  products: productApi,
  categories: categoryApi,
  cart: cartApi,
  wishlist: wishlistApi,
  orders: orderApi,
  admin: adminApi
};
