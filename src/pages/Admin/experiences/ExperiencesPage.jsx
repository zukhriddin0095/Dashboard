import { Table, message } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../../server";

const ExperiencesPage = () => {
  const { IdEx } = useParams();
  const [data, setData] = useState([])

  useEffect(() => {
    getExperences();
  }, []);

  async function getExperences() {
    try {
      const { data } = await request.get(`experiences?user=${IdEx}`);
      setData(data)
    } catch (error) {
      message.error(error);
    }
  }

  const columns = [
    {
      title: "Work Name",
      dataIndex: "workName",
      key: "workName",
    },

    {
      title: "Compony Name",
      dataIndex: "companyName",
      key: "companyName",
      // render: (url) => (
      //   <a rel="noreferrer" target="_blank" href={url}>
      //     {url}
      //   </a>
      // ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
  ];
  return (
    <Fragment>
      <Table
        // loading={isFetching}
        scroll={{ x: 500 }}
        bordered
        pagination={false}
        title={() => (
          <div className="outlet">
            <h1>Exprences</h1>
          </div>
        )}
        columns={columns}
        dataSource={data?.data}
      />
    </Fragment>
  );
};

export default ExperiencesPage;
