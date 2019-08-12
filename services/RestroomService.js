import ApiService from './ApiService';

const ENDPOINTS = {
  RESTROOM: '/user/{userId}/restroom'
};

class RestroomService extends ApiService {
  createRestroom = ({ user, restroom }) => {
    return this.apiClient.post(ENDPOINTS.RESTROOM.replace('{userId}', user.id), {
      ...restroom
    });
  };
}

export const restroomService = new RestroomService();
