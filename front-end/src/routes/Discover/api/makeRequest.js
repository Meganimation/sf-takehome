import axios from 'axios';
import qs from 'querystring';
import config from '../../../config';

const { api } = config;

export default async function makeRequest(path, resourceType) {
  const { data: { access_token: token } } = await axios.post(
    api.authUrl,
    qs.encode({
      grant_type: 'client_credentials'
    }),
    {
      headers: {
        Authorization: 'Basic ' + btoa(`${api.clientId}:${api.clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  const res = await axios.get(
    `${api.baseUrl}/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return res.data[resourceType].items;
}

export const PATH = {categories: 'browse/categories', new: 'browse/new-releases', featured: 'browse/featured-playlists'}
export const RESOURCE = {categories: 'categories', albums: 'albums', playlists: 'playlists'}