
import { Button, message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"
import Bids from "./BidsProduct";
import { SetLoaders } from '../../../redux/loadersSlice';
import ProductsForm from "./productForm"
import { DeleteProduct, GetProducts } from '../../../apicalls/product';



function Products() {
  const [showBids, setShowBids] =React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState(null)
  const { user } = useSelector(state => state.users)
  const [products, setProducts] = React.useState([]);
  const [showProductForm, setShowProductForm] = React.useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoaders(true));
      const response = await GetProducts({ seller: user._id })
      dispatch(SetLoaders(false));
      setProducts(response.data)

    } catch (error) {
      dispatch(SetLoaders(false));
      message.error(error.message);
    }
  };
  const deleteproduct = async (id) => {
    try {
      dispatch(SetLoaders(true))
      const response = await DeleteProduct(id)
      dispatch(SetLoaders(false))
      if (response.success) {
        message.success(response.message);
        dispatch(SetLoaders(false))
        getData()
      }
    } catch (error) {
      dispatch(SetLoaders(false));
      message.error(error.message);
    }
  }

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt=""
            className="w-20 h-20 object-cover rounded-md"
          />
        );
      },
    },

    {
      title: "Name",
      dataIndex: "name",

    },
    {
      title: "Price",
      dataIndex: "price",

    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "Age",
      dataIndex: "age",

    },
    {
      title: "Status",
      dataIndex: "status",

    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A")

    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            <i class="fa-solid fa-trash" onClick={() => {
              deleteproduct(record._id)
            }}></i>
            <i class="fa-solid fa-pen-to-square" onClick={() => {
              setSelectedProduct(record)
              setShowProductForm(true)
            }}></i>
            <span onClick={() => {
              setSelectedProduct(record)
              setShowBids(true)
            }} className=" cursor-pointer underline">show bids</span>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          type="default"
          onClick={() => {
            setSelectedProduct(null)
            setShowProductForm(true)
          }}
        >
          Add Product
        </Button>
      </div>

      <Table columns={columns} dataSource={products} />
      
      {showProductForm &&
        (<ProductsForm
          selectedProduct={selectedProduct}
          getData={getData}
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm} />)}
      {showBids && (<Bids
        showbBids={showBids}
        setShowBids={setShowBids}
        selectedProduct={selectedProduct} />)}
    </div>
  );
}


export default Products;

