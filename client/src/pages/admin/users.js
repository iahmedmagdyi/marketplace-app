
import { message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, } from "react-redux";
import moment from "moment"
import { SetLoaders } from "../../redux/loadersSlice";

import { GetAllUsers, updateUserStatus } from "../../apicalls/user";





function Users() {


    const [users, setUsers] = React.useState([]);


    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoaders(true));
            const response = await GetAllUsers(null)


            dispatch(SetLoaders(false));
            setUsers(response.data)

        } catch (error) {
            dispatch(SetLoaders(false));
            message.error(error.message);
        }
    };
    const onStatusUpdate = async (id, status) => {
        try {
          dispatch(SetLoaders(true));
         await updateUserStatus(id, status);
          dispatch(SetLoaders(false));
          getData()
       
        } catch (error) {
          dispatch(SetLoaders(false));
          message.error(error.message);
        }
      };

    const columns = [

        {
            title: "Name",
            dataIndex: "name",

        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Role",
            dataIndex: "role",
            render: (text, record) => record.role.toUpperCase()


        },
        {
            title: "Created At ",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A")

        }, 



        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => record.status.toUpperCase()


        },
 
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                const { status, _id } = record
                return (
                    <div className=" flex gap-5">
                        {status === "active" && (
                            <span className="underline  cursor-pointer" onClick={() => onStatusUpdate(_id, "blocked")}>
                                Block
                            </span>
                        )}
                        {status === "blocked" && (
                            <span className="underline  cursor-pointer" onClick={() => onStatusUpdate(_id, "active")}>
                                unblock
                            </span>
                        )
                        }
                      
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

            <Table columns={columns} dataSource={users} />



        </div>
    );
}

export default Users;
