import { axiosinstance } from "./axiosinstance";
export const RigesterUser = async (payload) => {
  try {
    const response = await axiosinstance.post(
      "http://localhost:5000/api/users/register",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//login
export const LoginUser = async (payload) => {
  try {
    const response = await axiosinstance.post(
      "http://localhost:5000/api/users/login",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get currrent user
export const GetCurrentUser = async (payload) => {
  try {
    const response = await axiosinstance.get(
      "http://localhost:5000/api/users/get-current-user",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//get all users

export const GetAllUsers = async () => {
  try {
    const response = await axiosinstance.get(
      "http://localhost:5000/api/users/get-users"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
///update user status
export const updateUserStatus = async (id, status) => {
  try {
    const response = axiosinstance.put(
      `http://localhost:5000/api/users/update-user-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
