import {
  Space,
  Table,
  Input,
  Modal,
  Pagination,
  Form,
  Button,
  message,
  Upload,
  Image,
} from "antd";
import { Fragment, useState } from "react";
import {
  DeleteFilled,
  EditFilled,
  AppstoreAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useGetUserMutation,
} from "../../../redux-tookit/services/UsersService";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../../../constants";
import { request } from "../../../server";

const UsersPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const [photo, setPhoto] = useState(null);

  const { data, isFetching, refetch } = useGetUsersQuery(page);

  const [addUser] = useAddUserMutation();
  const [getUser] = useGetUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
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
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => {
        console.log(photo);
        return (
          <Image
            style={{ borderRadius: "50%" }}
            height={50}
            src={
              photo
                ? `${ENDPOINT}upload/${photo}.png`
                : "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
            }
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Space size="middle">
          <Button onClick={() => navigat(row._id)}>experiences</Button>
          <button onClick={() => editUser(row._id)} className="edit-btn">
            <EditFilled />
          </button>
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

  const uploadImage = async (e) => {
    try {
      let form = new FormData();
      form.append("file", e.file.originFileObj);
      console.log(form);
      let { data } = await request.post("upload", form);
      setPhoto(data);
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = () => {
    setSelected(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  console.log(photo);

  const handleOk = async () => {
      try {
        let values = await form.validateFields();
        let User = { ...values, photo};
        if (selected === null) {
          await addUser(User);
          console.log(User);
        } else {
          await updateUser({ id: selected, body: User });
        }
        closeModal();
        refetch();
      } catch (err) {
        console.log(err);
      }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    refetch();
  };

  async function editUser(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getUser(id);
      form.setFieldsValue(data);
    } catch (error) {
      message.error(error);
    }
  }
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
        title="Add portfolio"
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
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              placeholder="+998"
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
            <Input />
          </Form.Item>
          {selected ? null : (
            <div>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please Fill" }]}
              >
                <Input />
              </Form.Item>{" "}
            </div>
          )}

          <Upload
            onChange={uploadImage}
            listType="picture"
            maxCount={1}
            fileList={
              photo
                ? [
                    {
                      thumbUrl: `${ENDPOINT}upload/${photo._id}.${
                        photo.name.split(".")[1]
                      }`,
                      name: `${ENDPOINT}upload/${photo._id}.${
                        photo.name.split(".")[1]
                      }`,
                      url: `${ENDPOINT}upload/${photo._id}.${
                        photo.name.split(".")[1]
                      }`,
                    },
                  ]
                : []
            }
          >
            <Button icon={<UploadOutlined />}>Click to Upload Photo</Button>
          </Upload>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
