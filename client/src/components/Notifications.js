import { Modal, message } from 'antd'
import React from 'react';
import moment from "moment";

import { useNavigate } from 'react-router-dom'
import { DeleteNotification } from '../apicalls/notifications';

const Notificationss = ({reloadNotifications, notifications = [], showNotifications, setshowNotifications }) => {
    const navigate = useNavigate()
    
    const deleteNotification = async (id) => {
        try {
            const response = await DeleteNotification(id)
            reloadNotifications()
            if (response.success) {
                message.success(response.message)
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    return (
        <Modal
            title="Notifications"
            open={showNotifications}
            onCancel={() => setshowNotifications(false)}
            footer={null}
            centered
            width={1000}
        >
            <div className="flex flex-col gap-2" >
                {notifications.map((notification) => {
                    return (
                        <div
                            className="flex flex-col border border-solid p-2 border-gray-300 rounded cursor-pointer"
                            key={notification._id}
                        >
                            <div className="flex justify-between items-center">
                                <div
                                    onClick={() => {
                                        navigate(notification.onClick);
                                        setshowNotifications(false);
                                    }}
                                >
                                    <h1 className="text-gray-700">{notification.title}</h1>
                                    <span className="text-gray-600">{notification.message}</span>
                                    <h1 className="text-gray-500 text-sm">
                                        {moment(notification.createdAt).fromNow()}
                                    </h1>
                                </div>
                                <div className='mr-2' >
                                    <i class="fa-solid fa-trash"
                                        onClick={() => deleteNotification(notification._id)}
                                    ></i>
                                </div>


                            </div>
                        </div>

                    )
                })}
            </div>
        </Modal>
    )
}

export default Notificationss
