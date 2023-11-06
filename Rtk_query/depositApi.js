import {api} from './api';

export const depositApi = api.injectEndpoints({
  endpoints: builder => ({
    depositList: builder.query({
      query: ({
        orgId,
        wardId,
        streetNo,
        assessmentNo,
        oldAssessmentNo,
        url,
      }) => {
        console.log(
          'url in deposit list',
          `${url}${orgId}&WardID=${wardId}&StreetID=${streetNo}&AssNo=${assessmentNo}&OldAssNo=${oldAssessmentNo}&DoorNo=`,
        );
        return `${url}${orgId}&WardID=${wardId}&StreetID=${streetNo}&AssNo=${assessmentNo}&OldAssNo=${oldAssessmentNo}&DoorNo=`;
      },
      transformResponse: (response, meta, args) => {
        console.log('response in deposit api', response);
        console.log('meta data in deposit', meta);
        if (JSON.parse(response).length > 0) {
          return {
            assessment: JSON.parse(response)[0].TableDetails,
            dcb: JSON.parse(response)[1].TableDetails,
          };
        } else {
          return JSON.parse(response);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {useLazyDepositDetailsQuery, useLazyDepositListQuery} = depositApi;
