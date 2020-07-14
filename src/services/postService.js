import BaseHttpService from './baseHttpService';

export default class PostService extends BaseHttpService {
  sendEmail = (payload) =>
    this.post(
      'https://oj9ygyghtd.execute-api.us-east-1.amazonaws.com/dev/send-email',
      payload,
    );
}
