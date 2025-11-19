import apiOption from '@api/config.js';
import requests from '@common/requests.js';

const commonApi = {
    apiRequest: (data) => requests.get(`${apiOption.api}/api`, data)
};

export default commonApi;