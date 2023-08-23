import makeApiRequest from '../utils/utils';
import { ApiResponse, UserProps, userToken,PhotoUploadResult,PhotoFeedPost, FeedPost,FormData } from '../utils/Types';





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
      'Content-Type': contentType, // Include the specified content type header
    }
  );
  return response;
};


// export const submitPhototoServer = async (payload:PhotoFeedPost|FeedPost): Promise<PhotoFeedPost|FeedPost> => {
//   return makeApiRequest<PhotoFeedPost>('post', '/feed',payload);
// };

export const submitPosto = async (payload: FeedPost | PhotoFeedPost): Promise<ApiResponse | null> => {
  const response = await makeApiRequest<ApiResponse>('POST', '/feed', payload); // Adjust the endpoint
  return response;
};
