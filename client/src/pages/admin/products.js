
import { message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, } from "react-redux";
import moment from "moment"
import { SetLoaders } from "../../redux/loadersSlice";
import { GetProducts, UpdateProductStatus } from "../../apicalls/product";





function Products() {


  const [products, setProducts] = React.useState([]);


  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoaders(true));
      const response = await GetProducts(null)


      dispatch(SetLoaders(false));
      setProducts(response.data)

    } catch (error) {
      dispatch(SetLoaders(false));
      message.error(error.message);
    }
  };
  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoaders(true));
      const response = await UpdateProductStatus(id, status);
      dispatch(SetLoaders(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoaders(false));
      message.error(error.message);
    }
  };

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
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name
      }
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
      render: (text, record) => {
        return record.status.toUpperCase()
      }

    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A")

    }, {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record
        return (
          <div className=" flex gap-5">
            {status === "pending" && (
              <span className="underline  cursor-pointer" onClick={() => onStatusUpdate(_id, "approved")}>
                Approved
              </span>
            )}
            {status === "pending" && (
              <span className="underline  cursor-pointer" onClick={() => onStatusUpdate(_id, "rejcted")}>
                Reject
              </span>
            )
            }
            {status === "approved" && (
              <span className="underline  cursor-pointer" onClick={() => onStatusUpdate(_id, "blocked")}>
                Block
              </span>
            )}
            {status === "blocked" && (
              <span className="underline  cursor-pointer" onClick={() => onStatusUpdate(_id, "approved")}>
                unblock
              </span>
            )}
          </div>
        )
      }
    }

  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>

      <Table columns={columns} dataSource={products} />



    </div>
  );
}

export default Products;
