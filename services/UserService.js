import ApiService from './ApiService';

const ENDPOINTS = {
  COMMENTS: '/user/{userId}/comments',
  RATINGS: '/user/{userId}/ratings',
  LIKE_COMMENT: '/user/{userId}/comments/{commentId}/like',
  UNLIKE_COMMENT: '/user/{userId}/comments/{commentId}/unlike',
  COMMENT_DELETE: '/user/{userId}/comments/{commentId}'
};

class UserService extends ApiService {
  getComments = ({ user, offset, limit }) => {
    return this.apiClient.get(
      `${ENDPOINTS.COMMENTS.replace('{userId}', user.id)}?offset=${offset}&limit=${limit}`
    );
  };

  getRatings = ({ user, offset, limit }) => {
    return this.apiClient.get(
      `${ENDPOINTS.RATINGS.replace('{userId}', user.id)}?offset=${offset}&limit=${limit}`
    );
  };

  likeComment = ({ user, comment }) => {
    return this.apiClient.post(
      ENDPOINTS.LIKE_COMMENT.replace('{userId}', user.id).replace('{commentId}', comment.id)
    );
  };

  unlikeComment = ({ user, comment }) => {
    return this.apiClient.post(
      ENDPOINTS.UNLIKE_COMMENT.replace('{userId}', user.id).replace('{commentId}', comment.id)
    );
  };

  deleteComment = ({ user, comment }) => {
    return this.apiClient.delete(
      ENDPOINTS.COMMENT_DELETE.replace('{userId}', user.id).replace('{commentId}', comment.id)
    );
  };
}

export const userService = new UserService();
