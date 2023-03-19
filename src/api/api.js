import axios from "axios";

export const fetchImages = async (query, page) => {
  const URL = 'https://pixabay.com/api';
  const API_KEY = '33353171-e9933df598e4c8ee259954fe1';

  const response = await axios.get(`${URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
  return response.data;
};