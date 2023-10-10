import { Form, Input, Modal, Pagination, Space, Table } from "antd";
import { Fragment, useState } from "react";
import {
  EditFilled,
  DeleteFilled,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import {
  useAddProtfolioMutation,
  useDeletePortfolioMutation,
  useGetPortfolioMutation,
  useGetPortfoliosQuery,
  useUpdatePortfolioMutation,
} from "../../../redux-tookit/services/PortfolioService";

const PortfolioPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);

  const { data, isFetching, refetch } = useGetPortfoliosQuery(page);

  const [getPortfolio] = useGetPortfolioMutation();
  const [addProtfolio] = useAddProtfolioMutation();
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const [deletePortfolio] = useDeletePortfolioMutation();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "url",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a rel="noreferrer" target="_blank" href={url}>
          {url}
        </a>
      ),
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "photo",
      dataIndex: "photo",
      key: "photo",
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Space size="middle">
          <button className="edit-btn" onClick={() => editPortfolio(row._id)}>
            <EditFilled />
          </button>
          <button
            className="delete-btn"
            onClick={ async() => {
              await deletePortfolio(row._id);
              refetch();
            }}
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
      if (selected === null) {
        await addProtfolio(values);
      } else {
        await updatePortfolio({ id: selected, body: values });
      }
      closeModal();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function editPortfolio(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getPortfolio(id);
      console.log(data);
      form.setFieldsValue(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Table
        scroll={{ x: 500 }}
        bordered
        pagination={false}
        loading={isFetching}
        title={() => (
          <div className="outlet">
            <h1>Portfolios ({data?.pagination.total})</h1>
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
        title={selected ? "Save Portfolio" : "Add portfolio"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          form={form}
          name="portfolio"
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
            label="portfolio Name"
            name="name"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Portfolio url"
            name="url"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input.TextArea />
          </Form.Item>
          {/* <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload Photo</Button>
          </Upload> */}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PortfolioPage;
