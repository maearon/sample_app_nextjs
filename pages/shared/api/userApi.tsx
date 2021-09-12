// import { ListParams, ListResponse, Student } from 'models';
import API from '.';
import { Micropost } from './micropostApi';

export interface ListParams {
  page?: number
  [key: string]: any
}

export interface ListResponse<User> {
  users: User[]
  total_count: number
}

export interface User {
  readonly id: number
  name: string
  gravatar_id: string
  size: number
}

export interface UserShow {
  readonly id: number
  name: string
  gravatar_id: string
  size: number
  following: number
  followers: number
  current_user_following_user: boolean
}

export interface ShowResponse {
  user: UserShow
  id_relationships?: number
  microposts: Micropost[]
  total_count: number
}

export interface UserEdit {
  name: string
  email: string
}

export interface EditResponse {
  user: UserEdit
  gravatar: string
  flash?: [message_type: string, message: string]
}

export interface UpdateParams {
  user: UpdateField
}

export interface UpdateField {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface UpdateResponse {
  flash_success?: [message_type: string, message: string]
  error?: string[]
}

export interface Response {
  flash?: [message_type: string, message: string]
}

const userApi = {
  index(params: ListParams): Promise<ListResponse<User>> {
    const url = '/users';
    return API.get(url, { params });
  },

  show(id: string, params: ListParams): Promise<ShowResponse> {
    const url = `/users/${id}`;
    return API.get(url, { params });
  },

  edit(id: string): Promise<EditResponse> {
    const url = `/users/${id}/edit`;
    return API.get(url);
  },

  update(id: string, params: UpdateParams): Promise<UpdateResponse> {
    const url = `/users/${id}`;
    return API.patch(url, { params });
  },

  destroy(id: number): Promise<Response> {
    const url = `/users/${id}`;
    return API.delete(url);
  },
};

export default userApi;
