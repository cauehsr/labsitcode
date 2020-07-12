import BaseHttpService from './baseHttpService';

export default class PostService extends BaseHttpService {
  postImage = (image) =>
    this.post(
      'https://labsitcode.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender',
      image,
    );
}
