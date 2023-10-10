import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import {
  addSkill,
  controlModal,
  deleteSkill,
  editSkill,
  getSkill,
  getSkills,
  putSkill,
  showModal,
} from "../../../redux-tookit/slices/SkillSlice";
import { Form, Input, Modal, Pagination, Space, Table } from "antd";
import {
  EditFilled,
  DeleteFilled,
  AppstoreAddOutlined,
} from "@ant-design/icons";

import "./skills.scss";
const SkillsPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { skills, isModalOpen, selected, total, loading, btnLoading } =
    useSelector((state) => state.skill);

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "percent",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Space size="middle">
          <button
            className="edit-btn"
            onClick={async () => {
              await dispatch(editSkill(row._id));
              await dispatch(getSkills());
              let { payload } = await dispatch(getSkill(row._id));
              form.setFieldsValue(payload);
            }}
          >
            <EditFilled />
          </button>
          <button
            className="delete-btn"
            onClick={async () => {
              await dispatch(deleteSkill(row._id));
              await dispatch(getSkills());
            }}
          >
            <DeleteFilled />
          </button>
        </Space>
      ),
    },
  ];

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      if (selected === null) {
        await dispatch(addSkill(values));
      } else {
        await dispatch(putSkill({ id: selected, values }));
      }
      handleCancel();
      await dispatch(getSkills());
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    dispatch(controlModal());
  };

  return (
    <Fragment>
      <Table
        scroll={{ x: 500 }}
        loading={loading}
        bordered
        title={() => (
          <div className="outlet">
            <h1>Skills {total}</h1>
            <button onClick={() => dispatch(showModal(form))}>
              <AppstoreAddOutlined />
            </button>
          </div>
        )}
        columns={columns}
        dataSource={skills}
      />
      <Pagination />
      <Modal
        confirmLoading={btnLoading}
        title={selected ? "save skill" : "Add Skills"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="Skills"
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
            label="Skills Name"
            name="name"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Percent"
            name="percent"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SkillsPage;
