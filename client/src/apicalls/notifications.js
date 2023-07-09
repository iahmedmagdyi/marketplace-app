import { axiosinstance } from "./axiosinstance";
//add notification
export const AddNotification = async (data) => {
  try {
    const response = await axiosinstance.post(
      "http://localhost:5000/api/notifications/notify",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
//`get notifications by userid

export const GetAllNotifications = async () => {
  try {
    const response = await axiosinstance.get(
      "http://localhost:5000/api/notifications/get-all-notifications"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
//  delelet notifications

export const DeleteNotification = async (id) => {
  try {
    const response = await axiosinstance.delete(
      `http://localhost:5000/api/notifications/delete-notification/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
//read all notification
export const ReadAllNotifications = async () => {
  try {
    const response = await axiosinstance.put(
      "http://localhost:5000/api/notifications/read-all-notifications"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
