import { Photo } from '../components/PhotoCard'
import { api } from './api'


export const fetchPhotos = async (page: number, pageSize: number) => {
  const response = await api.get(`/photos`, {
    params: {
      _page:page,
      _pageSize:pageSize,
    },
  });
  const totalPhotos = parseInt(response?.headers['x-total-count'] || "0", 10); // Assuming API returns total count in headers
  return {
      photos: response.data,
      totalPhotos,
      currentPage: page,
  }
  
};

export const createPhoto = async (newPhoto: Photo) => {
  const response = await api.post('/photos', newPhoto);
  return response.data;  
};

export const updatePhoto = async (updatedPhoto: Photo) => {
  const response = await api.post(`/photos/${updatedPhoto.id}`, updatedPhoto);
  return response.data; 
};

export const deletePhoto = async (id: number) => {
  await api.delete(`/photos/${id}`);
  return id; 
};
