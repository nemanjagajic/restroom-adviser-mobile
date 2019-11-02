import ApiService from './ApiService';
import axios from 'axios';

const ENDPOINTS = {
  RESTROOM: '/user/{userId}/restroom',
  RESTROOM_COMMENT: '/user/{userId}/restroom/{restroomId}/comments',
  RESTROOM_RATING: '/user/{userId}/restroom/{restroomId}/ratings',
  FEED_RESTROOMS:
    'user/{userId}/restroom/feedRestrooms?offset={offset}&limit={limit}&onlyMy={onlyMy}',
  GET_OSM_SUGGESTIONS: 'https://nominatim.openstreetmap.org/search?q={query}&format=geojson',
  RESTROOM_BOOKMARKS: '/user/{userId}/restroom/{restroomId}/bookmarks',
  BOOKMARK_RESTROOM: '/user/{userId}/restroom/{restroomId}/bookmark',
  UNBOOKMARK_RESTROOM: '/user/{userId}/restroom/{restroomId}/unbookmark',
  RESTROOM_VALIDATIONS: '/user/{userId}/restroom/{restroomId}/validations',
  VALIDATE_RESTROOM: '/user/{userId}/restroom/{restroomId}/validate',
  INVALIDATE_RESTROOM: '/user/{userId}/restroom/{restroomId}/invalidate'
};

class RestroomService extends ApiService {
  fetchAll = user => {
    return this.apiClient.get(ENDPOINTS.RESTROOM.replace('{userId}', user.id));
  };

  getFeedRestrooms = ({
    user,
    offset,
    limit,
    searchValue,
    minimalRating,
    onlyMy,
    onlyBookmarked = false
  }) => {
    let request = ENDPOINTS.FEED_RESTROOMS.replace('{userId}', user.id)
      .replace('{offset}', offset)
      .replace('{limit}', limit)
      .replace('{onlyMy}', onlyMy);

    if (searchValue) {
      request += `&searchValue=${searchValue}`;
    }

    if (minimalRating) {
      request += `&minimalRating=${minimalRating}`;
    }

    if (onlyBookmarked) {
      request += '&onlyBookmarked=true';
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
    formData.append('working_hours', restroom.working_hours);

    return this.apiClient.post(ENDPOINTS.RESTROOM.replace('{userId}', user.id), formData);
  };

  addComment = ({ user, restroom, content }) => {
    return this.apiClient.post(
      ENDPOINTS.RESTROOM_COMMENT.replace('{userId}', user.id).replace('{restroomId}', restroom.id),
      { content }
    );
  };

  getComments = ({ user, restroom, offset, limit }) => {
    return this.apiClient.get(
      ENDPOINTS.RESTROOM_COMMENT.replace('{userId}', user.id).replace('{restroomId}', restroom.id) +
        `?offset=${offset}&limit=${limit}`
    );
  };

  addRating = ({ user, restroom, rating }) => {
    return this.apiClient.post(
      ENDPOINTS.RESTROOM_RATING.replace('{userId}', user.id).replace('{restroomId}', restroom.id),
      { rating }
    );
  };

  getRatings = ({ user, restroom, includeRatings }) => {
    let request = ENDPOINTS.RESTROOM_RATING.replace('{userId}', user.id)
      .replace('{restroomId}', restroom.id)
      .replace('{includeRatings}', includeRatings);

    if (includeRatings) request += '?includeRatings=true';

    return this.apiClient.get(request);
  };

  getOSMSuggestions = ({ query }) => {
    return axios.get(ENDPOINTS.GET_OSM_SUGGESTIONS.replace('{query}', query));
  };

  addBookmark = ({ user, restroom }) => {
    return this.apiClient.post(
      ENDPOINTS.BOOKMARK_RESTROOM.replace('{userId}', user.id).replace('{restroomId}', restroom.id)
    );
  };

  removeBookmark = ({ user, restroom }) => {
    return this.apiClient.post(
      ENDPOINTS.UNBOOKMARK_RESTROOM.replace('{userId}', user.id).replace(
        '{restroomId}',
        restroom.id
      )
    );
  };

  getRestroomBookmarks = ({ user, restroom }) => {
    return this.apiClient.get(
      ENDPOINTS.RESTROOM_BOOKMARKS.replace('{userId}', user.id).replace('{restroomId}', restroom.id)
    );
  };

  getRestroomValidations = ({ user, restroom }) => {
    return this.apiClient.get(
      ENDPOINTS.RESTROOM_VALIDATIONS.replace('{userId}', user.id).replace(
        '{restroomId}',
        restroom.id
      )
    );
  };

  validateRestroom = ({ user, restroom }) => {
    return this.apiClient.post(
      ENDPOINTS.VALIDATE_RESTROOM.replace('{userId}', user.id).replace('{restroomId}', restroom.id)
    );
  };

  invalidateRestroom = ({ user, restroom }) => {
    return this.apiClient.post(
      ENDPOINTS.INVALIDATE_RESTROOM.replace('{userId}', user.id).replace(
        '{restroomId}',
        restroom.id
      )
    );
  };
}

export const restroomService = new RestroomService();
