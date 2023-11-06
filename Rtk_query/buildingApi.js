import {api} from './api';

export const buildingApi = api.injectEndpoints({
  endpoints: builder => ({
    buildingDetails: builder.query({
      query: ({assessmentNo, orgId, serviceId}) => {
        console.log(
          'plan details url',
          `/BPMDemandSearch/SearchDemandNO?DemandNo=${assessmentNo}&ServiceID=${serviceId}&OrgID=${orgId}&SRNO&WardID`,
        );

        return `/BPMDemandSearch/SearchDemandNO?DemandNo=${assessmentNo}&ServiceID=${serviceId}&OrgID=${orgId}&SRNO&WardID`;
      },
      transformResponse: (response, meta, arg) => {
        console.log('response in building plan tax', response);
        console.log('meta', JSON.stringify(meta));
        console.log('arg', arg);
        if (!response.length > 0) {
          return JSON.parse(response);
        } else {
          let details = JSON.parse(response);
          console.log('inside response.length non tax', details);
          return details;
        }
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log('error response in buidingplan  details', response);
        console.log('error meta', meta);
        // console.log('error arg', arg);
        return response.error;
      },
    }),

    buildingDcb: builder.query({
      query: ({assessmentNo, orgId}) => {
        console.log('connection no and type', assessmentNo);

        return `/BPMPayment/DemandNotice_Change?DemandNo=${assessmentNo}&OrgID=${orgId}`;
      },
      transformResponse: (response, meta, arg) => {
        console.log('meta', JSON.stringify(meta));
        console.log('arg', arg);
        if (!response.length > 0) {
          return JSON.parse(response);
        } else {
          let details = JSON.parse(response).GridDetails[0].TableDetails;
          console.log('inside response.length building tax', details);
          return details;
        }
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log('error response in professional tax details', response);
        console.log('error meta', meta);
        // console.log('error arg', arg);
        return response.error;
      },
    }),
  }),
  overrideExisting: true,
});

export const {useLazyBuildingDetailsQuery, useLazyBuildingDcbQuery} =
  buildingApi;
