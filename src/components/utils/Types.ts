// types.ts or interfaces.ts

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctOption: string;
  }
  
  export interface ApiResponse {
    data: feedGratitude[];
  }
  
  export interface feedGratitude {
    id: number;
    module_name: string;
    resource_name: string;
    type_id: string;
    like_type_id: string;
    user: {
      id: number;
      module_name: string;
      resource_name: string;
      full_name: string;
      user_name: string;
    };
    data?: any;
    privacy_detail: string
  }
  
  
  
 export interface UserProps {
    name?: string;
    username: string;
    password: string;
   
  }
  
  export interface userToken { 
    access_token:string}
  
    export interface PhotoUploadResult {
      original_name: string,
      item_type: string,
      user_id: number,
      user_type: string,
      width: number,
      height: number,
      temp_file: number,
      url: string
  }
  
  export interface FormData {
      post_type: string,
      tagged_friends: (number | null)[],
      category: string;
      name: string;
      biography: string;
      impact: string;
      notify_nominee: string;
      add_project: string;
      project: string;
      user_status: string;
      privacy: number;
  }

  export interface PhotoFeedPost {
    post_type: string,
    "privacy": number,
    photo_files: [
        {
            "id": number,
            "type": string,
            "status": string,
            "text": string,
            "tagged_friends": number[]
        }
    ],
    "photo_description": string
   
    
}

export interface FeedPost {
  user_status: string,
  privacy: number,
  post_type: string,

}

export  function formatBiography(description: string): string {
  return description.substring(0, 60) + '...';
}

export interface ProjectTextAreaPros {
  addProject: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}