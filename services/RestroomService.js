import ApiService from './ApiService';

const ENDPOINTS = {
  RESTROOM: '/user/{userId}/restroom',
  RESTROOM_COMMENT: '/user/{userId}/restroom/{restroomId}/comments'
};

class RestroomService extends ApiService {
  fetchAll = user => {
    return this.apiClient.get(ENDPOINTS.RESTROOM.replace('{userId}', user.id));
  };

  create = ({ user, restroom }) => {
    let formData = new FormData();

    if (restroom.images.length > 0) {
      restroom.images.forEach(image => {
        let uri = image.uri;
        let name = uri.split('/').pop();
        let type = 'image/jpg';
        formData.append('images[]', { uri, name, type });
      });
    }

    formData.append('name', restroom.name);
    formData.append('description', restroom.description);
    formData.append('latitude', restroom.latitude);
    formData.append('longitude', restroom.longitude);
    formData.append('location_text', restroom.location_text);

    return this.apiClient.post(ENDPOINTS.RESTROOM.replace('{userId}', user.id), formData);
  };

  addComment = ({ user, restroom, content }) => {
    return this.apiClient.post(
      ENDPOINTS.RESTROOM_COMMENT.replace('{userId}', user.id).replace('{restroomId}', restroom.id),
      { content }
    );
  };

  getComments = ({ user, restroom }) => {
    return this.apiClient.get(
      ENDPOINTS.RESTROOM_COMMENT.replace('{userId}', user.id).replace('{restroomId}', restroom.id)
    );
  };
}

export const restroomService = new RestroomService();
