import ApiService from './ApiService';

const ENDPOINTS = {
  COMMENTS: '/user/{userId}/comments'
};

class UserService extends ApiService {
  getComments = ({ user, offset, limit }) => {
    return this.apiClient.get(
      `${ENDPOINTS.COMMENTS.replace('{userId}', user.id)}?offset=${offset}&limit=${limit}`
    );
  };
}

export const userService = new UserService();
