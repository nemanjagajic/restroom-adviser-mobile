import ApiService from './ApiService';

const ENDPOINTS = {
  RESTROOM: '/user/{userId}/restroom',
  RESTROOM_COMMENT: '/user/{userId}/restroom/{restroomId}/comments',
  RESTROOM_RATING: '/user/{userId}/restroom/{restroomId}/ratings',
  FEED_RESTROOMS: 'user/{userId}/restroom/feedRestrooms?offset={offset}&limit={limit}'
};

class RestroomService extends ApiService {
  fetchAll = user => {
    return this.apiClient.get(ENDPOINTS.RESTROOM.replace('{userId}', user.id));
  };

  getFeedRestrooms = ({ user, offset, limit, searchValue }) => {
    let request = ENDPOINTS.FEED_RESTROOMS.replace('{userId}', user.id)
      .replace('{offset}', offset)
      .replace('{limit}', limit);

    if (searchValue) {
      request += `&searchValue=${searchValue}`;
    }

    return this.apiClient.get(request);
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

  addRating = ({ user, restroom, rating }) => {
    return this.apiClient.post(
      ENDPOINTS.RESTROOM_RATING.replace('{userId}', user.id).replace('{restroomId}', restroom.id),
      { rating }
    );
  };

  getRatings = ({ user, restroom }) => {
    return this.apiClient.get(
      ENDPOINTS.RESTROOM_RATING.replace('{userId}', user.id).replace('{restroomId}', restroom.id)
    );
  };
}

export const restroomService = new RestroomService();
