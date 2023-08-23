export interface Post {
    id?: number;
    author: string;
    at: string;
    name: string;
    category: string;
    impact: string;
    biography: string;
    project: string;
    imageUrl: string;
    createdAt: Date;
    isActive: boolean;
  }
  
  export function createPost(initializer?: Partial<Post>): Post {
    const defaultValues: Post = {
      author: '',
      at: '',
      name: '',
      category: '',
      impact: '',
      biography: '',
      project: '',
      imageUrl: '',
      createdAt: new Date(),
      isActive: false,
    };
  
    return {
      ...defaultValues,
      ...(initializer || {}),
      id: initializer?.id,
      createdAt: initializer?.createdAt ? new Date(initializer.createdAt) : defaultValues.createdAt,
    };
  }
  