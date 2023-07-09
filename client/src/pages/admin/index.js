import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import Products from './products'
import Users from './users'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Admin = () => {
   const navigate = useNavigate();
   const {user} = useSelector(state=> state.users)
  useEffect(()=>{
     if(user.role !== "admin"){
      navigate("/")
     }
  },[])
  return (
    <div>
       <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Products" key="1">
            <Products/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="users" key="2">
            <Users/>
        </Tabs.TabPane>
     
      </Tabs>
    </div>
  )
}

export default Admin
