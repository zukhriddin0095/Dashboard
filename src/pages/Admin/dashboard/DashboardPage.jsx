import { Fragment } from "react";
import { useGetPortfoliosQuery } from "../../../redux-tookit/services/PortfolioService";
import { useGetUsersQuery } from "../../../redux-tookit/services/UsersService";

import "./dashboard.scss";
const DashboardPage = () => {
  const { data } = useGetPortfoliosQuery();

  const User = useGetUsersQuery();
  console.log(User.data);

  return (
    <Fragment>
      <div className="total">
        <h3>Portfolios Total: ({data?.pagination?.total})</h3>
        <h3>Skills Total: ({})</h3>
        <h3>Users Total: ({User?.data?.pagination?.total})</h3>
      </div>
    </Fragment>
  );
};

export default DashboardPage;
