import api from './api';
import {
  CREATE_USER,
  DELETE_USER,
  GET_ALL_USERS,
  UPDATE_USER,
} from './apiRoutes';

interface ICreateUser {
  user: {
    email: string;
    otp: string;
    active:boolean;
  };
}

export const createUser = async (data: ICreateUser) => {
  try {
    const response = await api.post(CREATE_USER, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get(GET_ALL_USERS);
    return response.data;
  } catch (err) {
    return err;
  }
};

interface IUpdateUser {
  user: {
    _id: string;
    email: string;
    otp: string;
    active:boolean;
  };
}

export const updateUser = async (data: IUpdateUser) => {
  try {
    const response = await api.put(UPDATE_USER, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

interface IDeleteUser {
  id: string;
}

export const deleteUser = async ({ id }: IDeleteUser) => {
  try {
    const response = await api.delete(DELETE_USER(id));
    return response.data;
  } catch (err) {
    return err;
  }
};