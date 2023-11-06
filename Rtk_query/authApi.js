import {api} from './api';

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    getAppName: builder.query({
      query: () => '/AppName/GetAppName',
      transformResponse: (response, meta) => {
        return JSON.parse(response)[0];
      },
    }),
    loginUser: builder.mutation({
      query: payload => {
        return {
          url: '/Login/CheckUser',
          method: 'post',
          body: payload,
        };
      },
      invalidatesTags: ['user'],
    }),
    registerUser: builder.mutation({
      query: payload => {
        console.log('inside register user', payload);
        return {
          url: '/NewUserRegister/CreateNewUser',
          method: 'post',
          body: payload,
        };
      },
      transformErrorResponse: response => {
        return response.data;
      },
    }),
    checkMobileNo: builder.query({
      query: num => `/NewUserRegister/ExistingNumberCheck?MobileNo=${num}`,
      transformErrorResponse: response => {
        return JSON.parse(response);
      },
      transformResponse: response => {
        return JSON.parse(response);
      },
    }),
    activateUser: builder.mutation({
      query: payload => {
        return {
          url: '/Login/SubmitActivationDetails',
          method: 'post',
          body: payload,
        };
      },
      transformResponse: response => {},
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAppNameQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyCheckMobileNoQuery,
  useActivateUserMutation,
} = authApi;
