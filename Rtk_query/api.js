import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import BASE_URL from '../env';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['user', 'properties'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const {
        authSlice: {userInfo},
      } = getState();

      console.log('states', userInfo);
      if (userInfo) {
        headers.set('Authorization', 'bearer ' + userInfo.token?.AccessToken);
      }
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: () => ({}),
});
