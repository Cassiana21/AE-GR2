import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; 

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

export const getFavorites = async () => {
  try {
    const response = await axios.get(`${API_URL}/favorites`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error getting favorites:', error);
    return { success: false, message: error.message, data: [] };
  }
};

export const addFavorite = async (productId) => {
  try {
    const response = await axios.post(
      `${API_URL}/favorites/${productId}`,
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data; 
  } catch (error) {
    console.error('Error adding favorite:', error);
    return { success: false, message: error.message, data: {} };
  }
};

export const removeFavorite = async (productId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/favorites/${productId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return { success: false, message: error.message, data: {} };
  }
};
