/* eslint-disable import/prefer-default-export */
import { GET_REQUESTS } from './actionTypes';

export const saveListRequests = payload => ({
  type: GET_REQUESTS,
  payload
});
