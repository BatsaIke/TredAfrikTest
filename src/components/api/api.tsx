

import makeApiRequest from '../utils/utils';
import { ApiResponse, UserProps, userToken,PhotoUploadResult,PhotoFeedPost, FeedPost } from '../utils/Types';



//here api calls are displayed

export const loginUser = async (userData: UserProps): Promise<userToken> => {
  return makeApiRequest<userToken>('post', '/user/login', userData);
}

export const fetchFeed = async (): Promise<ApiResponse> => {
  return makeApiRequest<ApiResponse>('get', '/feed');
};

export const submitPhototo = async (
  payload: PhotoFeedPost,
  contentType: string
): Promise<PhotoUploadResult | null> => {
  const response = await makeApiRequest<PhotoUploadResult>(
    'post',
    '/file',
    payload,
    {
      'Content-Type': contentType, 
    }
  );
  return response;
};




export const submitPosto = async (payload: FeedPost | PhotoFeedPost): Promise<ApiResponse | null> => {
  const response = await makeApiRequest<ApiResponse>('POST', '/feed', payload); 
  return response;
};
