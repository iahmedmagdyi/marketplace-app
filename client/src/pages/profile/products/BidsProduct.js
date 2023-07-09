import { Modal, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import Divider from '../../../components/Divider';
import moment from 'moment';
import { useDispatch } from "react-redux";

import { GetAllBids } from '../../../apicalls/product';
import { SetLoaders } from '../../../redux/loadersSlice';







 function Bids ({showbBids , setShowBids , selectedProduct})  {

  const dispatch = useDispatch();
  const [bidsData , setBidsData]=useState();
  const getData= async ()=>{
    try {
      dispatch(SetLoaders(true))
      const respone = await GetAllBids({product : selectedProduct._id})
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
    if(selectedProduct){
      getData()
    }
  },[])
  return (
    <Modal
      title=""
      open={showbBids}
      onCancel={() => setShowBids(false)}
      centered
      width={1500}
      footer={null}
    >
      <div className="flex gap-3 flex-col">
        <h1 className=" text-primary">Bids</h1>
        <Divider />
        <h1 className="text-xl text-gray-500">
          Product Name: {selectedProduct.name}
        </h1>

        <Table columns={columns} dataSource={bidsData} />
      </div>
    </Modal>
  )
}

export default Bids;
