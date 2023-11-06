import {api} from './api';

export const listApi = api.injectEndpoints({
  endpoints: builder => ({
    getOrgList: builder.query({
      query: () => '/Login/Drop?ID1=&ID2=&ID3=&ID4=&ID5=&Name=Organization',
      transformResponse: response => {
        return JSON.parse(response);
      },
    }),
    getWardList: builder.query({
      query: orgId => `/Login/Drop?ID1=${orgId}&ID2=&ID3=&ID4=&ID5=&Name=Ward`,
      transformResponse: response => {
        return JSON.parse(response);
      },
    }),
    getStreetList: builder.query({
      query: wardId =>
        `/Login/Drop?ID1=${wardId}&ID2=&ID3=&ID4=&ID5=&Name=Street`,
      transformResponse: response => {
        return JSON.parse(response);
      },
    }),
    getTradeList: builder.query({
      query: id => {
        console.log(
          'trade list url',
          `/TDRegistration_Search/Drop?ID1=${id}&ID2=&ID3=&ID4=&ID5=&Name=Trade`,
        );
        return `/TDRegistration_Search/Drop?ID1=${id}&ID2=&ID3=&ID4=&ID5=&Name=Trade`;
      },
      transformResponse: (response, meta, args) => {
        console.log('trade list api', meta);
        return JSON.parse(response);
      },
    }),
    getSubTradeList: builder.query({
      query: id =>
        `/TDRegistration_Search/Drop?ID1=${id}&ID2=&ID3=&ID4=&ID5=&Name=SubTrade`,
      transformResponse: response => {
        return JSON.parse(response);
      },
    }),
    getServiceTypeList: builder.query({
      query: id => `/Login/Drop?ID1=${id}&ID2=&ID3=&ID4=&ID5=&Name=ServiceType`,
      transformResponse: response => {
        return JSON.parse(response);
      },
    }),

    getComplaintTypeList: builder.query({
      query: () => `/Compliant/GetCompliantType`,
      transformResponse: response => {
        return response;
      },
    }),

    getOrgDetailsById: builder.query({
      query: ({orgId}) => '/Login/Drop?ID1=&ID2=&ID3=&ID4=&ID5=&Name=Gateway',
      transformResponse: (response, meta, arg) => {
        console.log('arg', JSON.stringify(arg));
        let data = JSON.parse(response);
        let orgDetails = data.filter(x => x.OrganizationID === arg.orgId);

        return orgDetails;
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetOrgListQuery,
  useGetWardListQuery,
  useLazyGetWardListQuery,
  useLazyGetStreetListQuery,
  useLazyGetOrgDetailsByIdQuery,
  useLazyGetTradeListQuery,
  useLazyGetSubTradeListQuery,
  useLazyGetServiceTypeListQuery,
  useGetComplaintTypeListQuery,
} = listApi;

// {
//         console.log('orgId', orgId);
//         return {
//           url: '/Login/Drop?ID1=&ID2=&ID3=&ID4=&ID5=&Name=Ward',
//           params: orgId,
//         };
//       },
