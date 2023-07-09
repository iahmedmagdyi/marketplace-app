import { Form, Input, Modal, message } from 'antd'
import React, { useRef } from 'react'
import { SetLoaders } from "../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { PlaceNewBid } from '../../apicalls/product';
import { AddNotification } from '../../apicalls/notifications';
const BidModel = ({ showBid, setShowBids, product, reloadData }) => {
  const formRef = useRef()
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.users)
  const onFinish = async (values) => {
    try {
      dispatch(SetLoaders(true))
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });

      dispatch(SetLoaders(false))

      //send notifications
      await AddNotification({
        title: "New bid placed",
        message: `new bid has been placed for product ${product.name} by ${user.name} for ${values.bidAmount}`,
        read: false,
        onClick: `/profile`,
        user: product.seller._id
      })
      
      reloadData();
      setShowBids(false)
      if (response.success) {
        message.success("Bid added successfully");
      }

    } catch (error) {
      message.error(error.message);
      dispatch(SetLoaders(false));
    }
  }
  const rules = [{

    required: true,
    message: "required",

  }]
  return (
    <Modal
      onCancel={() => setShowBids(false)}
      open={showBid}
      centered
      width={600}
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">
          New Bid
        </h1>

        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default BidModel
