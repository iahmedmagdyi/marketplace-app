import {  Table, message } from 'antd'
import React, { useEffect, useState } from 'react'

import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { SetLoaders } from '../../../redux/loadersSlice';
import { GetAllBids } from '../../../apicalls/product';


 function UserBids ({ selectedProduct})  {
  const {user} = useSelector(state => state.users )
  const dispatch = useDispatch();
  const [bidsData , setBidsData]=useState();
  const getData= async ()=>{
    try {
      dispatch(SetLoaders(true))
      const respone = await GetAllBids({buyer : user._id})
      setBidsData(respone.data)
    } catch (error) {
      dispatch(SetLoaders(false));
      message.error(error.message);
    }
  }

  const columns = [
    {
      title: "Bid Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm a");
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.buyer.name;
      },
    },
  
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Date",
      dataIndex: "createAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm a");
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone: {record.mobile}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];
  useEffect(()=>{
    
      getData()
    
  },[])
  return (

      <div className="flex gap-3 flex-col">
       
     
       
        <Table columns={columns} dataSource={bidsData} />
      </div>
   
  )
}

export default UserBids;
