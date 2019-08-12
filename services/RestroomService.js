import ApiService from './ApiService';

const ENDPOINTS = {
  RESTROOM: '/user/{userId}/restroom'
};

class RestroomService extends ApiService {
  fetchAll = user => {
    return this.apiClient.get(ENDPOINTS.RESTROOM.replace('{userId}', user.id));
  };

  create = ({ user, restroom }) => {
    return this.apiClient.post(ENDPOINTS.RESTROOM.replace('{userId}', user.id), {
      ...restroom
    });
  };
}

export const restroomService = new RestroomService();
