import { Tabs } from 'antd'

import React from 'react'
import Products from './products'
import UserBids from './userBids'

const Profile = () => {

  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Products" key="1">
            <Products/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Bids" key="2">
            <UserBids/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
            <h1>General</h1>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Profile
