// src/services/crmApi.ts

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getToken = () => localStorage.getItem('catering_token');
export const setToken = (t: string) => localStorage.setItem('catering_token', t);
export const removeToken = () => localStorage.removeItem('catering_token');

async function apiFetch(endpoint: string, options: RequestInit = {}, isPublic = false) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...options.headers as any };
  if (!isPublic) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  
  if (res.status === 401 && !endpoint.includes('/auth/login')) {
    removeToken();
    // Use window redirect only if we are in a browser context
    if (typeof window !== 'undefined') {
      window.location.href = '/admin';
    }
    return;
  }
  
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'API error');
  }
  return data;
}

async function apiUpload(endpoint: string, formData: FormData, isPublic = false) {
  const headers: Record<string, string> = {};
  if (!isPublic) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, { method: 'POST', headers, body: formData });
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Upload error');
  }
  return data;
}

export const authAPI = {
  login: async (email: string, password: string) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }, true);
    if (data?.data?.token) {
      setToken(data.data.token);
    }
    return data;
  },
  logout: () => removeToken(),
  changePassword: (current_password: string, new_password: string) =>
    apiFetch('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password, new_password })
    }),
};

export const companyAPI = {
  get: () => apiFetch('/company-settings'),
  update: (data: any) => apiFetch('/company-settings', { method: 'PUT', body: JSON.stringify(data) }),
  uploadLogo: (file: File) => {
    const fd = new FormData();
    fd.append('logo', file);
    return apiUpload('/company-settings/logo', fd);
  },
  deleteLogo: () => apiFetch('/company-settings/logo', { method: 'DELETE' }),
};

export const clientsAPI = {
  getAll: () => apiFetch('/clients'),
  getById: (id: number | string) => apiFetch(`/clients/${id}`),
  create: (data: any) => apiFetch('/clients', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number | string, data: any) => apiFetch(`/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number | string) => apiFetch(`/clients/${id}`, { method: 'DELETE' }),
};

export const menuAPI = {
  getAll: (category?: string) => apiFetch(`/menu-items${category ? `?category=${category}` : ''}`),
  create: (data: any) => apiFetch('/menu-items', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number | string, data: any) => apiFetch(`/menu-items/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number | string) => apiFetch(`/menu-items/${id}`, { method: 'DELETE' }),
};

export const ordersAPI = {
  getAll: () => apiFetch('/orders'),
  getById: (id: number | string) => apiFetch(`/orders/${id}`),
  create: (data: any) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number | string, data: any) => apiFetch(`/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number | string) => apiFetch(`/orders/${id}`, { method: 'DELETE' }),
};

export const invoicesAPI = {
  getAll: () => apiFetch('/invoices'),
  getById: (id: number | string) => apiFetch(`/invoices/${id}`),
  create: (data: any) => apiFetch('/invoices', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number | string, data: any) => apiFetch(`/invoices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number | string) => apiFetch(`/invoices/${id}`, { method: 'DELETE' }),
  generateShareLink: (id: number | string) => apiFetch(`/invoices/${id}/generate-link`, { method: 'POST' }),
  addPayment: (id: number | string, data: any) => apiFetch(`/invoices/${id}/payment`, { method: 'POST', body: JSON.stringify(data) }),
};

export const quotationsAPI = {
  getAll: () => apiFetch('/quotations'),
  getById: (id: number | string) => apiFetch(`/quotations/${id}`),
  create: (data: any) => apiFetch('/quotations', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number | string, data: any) => apiFetch(`/quotations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number | string) => apiFetch(`/quotations/${id}`, { method: 'DELETE' }),
  generateShareLink: (id: number | string) => apiFetch(`/quotations/${id}/generate-link`, { method: 'POST' }),
};

export const dashboardAPI = {
  getStats: () => apiFetch('/dashboard'),
};

export const menuPackagesAPI = {
  getAll: () => apiFetch('/menu-packages'),
  create: (data: any) => apiFetch('/menu-packages', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number | string, data: any) => apiFetch(`/menu-packages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number | string) => apiFetch(`/menu-packages/${id}`, { method: 'DELETE' }),
};

export const menuTypesAPI = {
  getAll: () => apiFetch('/menu-types'),
  create: (data: any) => apiFetch('/menu-types', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number | string, data: any) => apiFetch(`/menu-types/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number | string) => apiFetch(`/menu-types/${id}`, { method: 'DELETE' }),
};

export const menuCategoriesAPI = {
  getAll: () => apiFetch('/menu-categories'),
  create: (data: any) => apiFetch('/menu-categories', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number | string, data: any) => apiFetch(`/menu-categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number | string) => apiFetch(`/menu-categories/${id}`, { method: 'DELETE' }),
};

export const eventCategoriesAPI = {
  getAll: () => apiFetch('/event-categories'),
  create: (data: any) => apiFetch('/event-categories', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number | string, data: any) => apiFetch(`/event-categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number | string) => apiFetch(`/event-categories/${id}`, { method: 'DELETE' }),
};

export const eventStallItemsAPI = {
  getAll: () => apiFetch('/event-stall-items'),
  create: (data: any) => apiFetch('/event-stall-items', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number | string, data: any) => apiFetch(`/event-stall-items/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number | string) => apiFetch(`/event-stall-items/${id}`, { method: 'DELETE' }),
};

// Public — no auth required (website visitors can submit bookings)
export const enquiriesAPI = {
  create: (data: any) => apiFetch('/enquiries', { method: 'POST', body: JSON.stringify(data) }, true),
};

// Media image uploads — admin only
export const mediaAPI = {
  upload: (key: string, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    fd.append('key', key);
    return apiUpload('/media/upload', fd);
  },
  list: () => apiFetch('/media/list'),
  delete: (key: string) => apiFetch(`/media/${encodeURIComponent(key)}`, { method: 'DELETE' }),
};

