import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/user'
import { Avatar, Badge, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoaders } from '../redux/loadersSlice'
import { SetUsers } from '../redux/userSlice'
import Notificationss from './Notifications'
import { GetAllNotifications, ReadAllNotifications } from '../apicalls/notifications'

const ProtectedPage = ({ children }) => {
    const [notifications = [], setNotification] = React.useState([])
    const [showNotifications, setShowNotifications] = React.useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.users)
    const valiedateToken = async () => {
        try {
            dispatch(SetLoaders(true))
            const respone = await GetCurrentUser()
            dispatch(SetLoaders(false))
            if (respone.success) {
                dispatch(SetUsers(respone.data))
                console.log(respone.data);
            } else {
                message.error(respone.message)
                navigate("/login")
            }
        } catch (error) {
            dispatch(SetLoaders(false))
            message.error(error.message)
            navigate("/login")

        }

    }
    const getNotificstions = async()=>{
        try {
            dispatch(SetLoaders(true))
            const response = await GetAllNotifications()
            setNotification(response.data)
            dispatch(SetLoaders(false))
            if(response.success){
                message.success(response.message)
            }else{
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    const readNotification = async ()=>{
         try {
            const response = await ReadAllNotifications()
            getNotificstions()
         } catch (error) {
             message.error(error.message);
         }
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            valiedateToken();
            getNotificstions();
        } else {
            navigate("/login")
        }
       
    }, [])
    return (
        user &&
        (<div>
            {/* header */}
            <div className='bg-primary flex justify-between items-center p-6'>
                <h1 className=' text-2xl text-white cursor-pointer' onClick={() => navigate("/")}> MarketPlace</h1>
                <div className=' px-5 bg-white py-2 flex items-center gap-1 rounded '>

                    <span className=' underline cursor-pointer uppercase mr-3' onClick={() => {
                        if (user.role === "user") {
                            navigate("/profile")
                        } else {
                            navigate("/admin")
                        }
                    }} >{user.name}</span>
                    <Badge count={notifications?.filter((item) => !item.read).length}
                        onClick={() => {
                            readNotification()
                            setShowNotifications(true)
                        }}
                    >
                        <Avatar shape="circle" icon={<i class="fa-sharp fa-solid fa-bell"></i>} />

                    </Badge>
                    {
                        <Notificationss
                        notifications={notifications}
                        showNotifications={showNotifications}
                        setshowNotifications={setShowNotifications}
                        reloadNotifications={getNotificstions}
                    />}

                    <div className="ml-10">
                        <i class="fa-solid fa-arrow-right-from-bracket" onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/login")
                        }}></i>
                    </div>
                </div>
            </div>




            {/* body */}
            <div className='p-5'>{children}</div>
        </div>)
    )
}

export default ProtectedPage;
