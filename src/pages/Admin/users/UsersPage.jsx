import {
  Space,
  Table,
  Input,
  Modal,
  Pagination,
  Form,
  DatePicker,
  Select,
  Button,
} from "antd";
import { Fragment, useState } from "react";
import { DeleteFilled, AppstoreAddOutlined } from "@ant-design/icons";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../redux-tookit/services/UsersService";
import { Option } from "antd/es/mentions";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);

  const { data, isFetching, refetch } = useGetUsersQuery(page);

  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const navigat = (e) => {
    navigate(`/experiences/${e}`);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },

    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      // render: (url) => (
      //   <a rel="noreferrer" target="_blank" href={url}>
      //     {url}
      //   </a>
      // ),
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Space size="middle">
          <Button onClick={() => navigat(row._id)}>experiences</Button>
          <button
            onClick={async () => {
              await deleteUser(row._id);
              refetch();
            }}
            className="delete-btn"
          >
            <DeleteFilled />
          </button>
        </Space>
      ),
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      values.photo = "645d162ebb5def00143c21da";
      await addUser(values);
      closeModal();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 100,
        }}
      >
        <Option value="+998">+998</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Fragment>
      <Table
        loading={isFetching}
        scroll={{ x: 500 }}
        bordered
        pagination={false}
        title={() => (
          <div className="outlet">
            <h1>Users ({data?.pagination.total})</h1>
            <button onClick={openModal}>
              <AppstoreAddOutlined />
            </button>
          </div>
        )}
        columns={columns}
        dataSource={data?.data}
      />
      <Pagination
        total={data?.pagination.total}
        current={page}
        onChange={(page) => setPage(page)}
      />
      <Modal
        title= "Add portfolio"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          form={form}
          name="Users"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User Name"
            name="username"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>

          {/* <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload Photo</Button>
          </Upload> */}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
