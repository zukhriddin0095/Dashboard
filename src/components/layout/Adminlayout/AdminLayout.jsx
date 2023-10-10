import { Fragment, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CodepenCircleOutlined,
  GithubOutlined,
  LogoutOutlined,
  LinkedinOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;

import "./admin.scss";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TOKEN } from "../../../constants";
import { useDispatch } from "react-redux";
import { controlAuthenticated } from "../../../redux-tookit/slices/AuthSlice";
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove(TOKEN)
     dispatch(controlAuthenticated(false))
     navigate("/")
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Fragment>
      <Layout>
        <Sider
          collapsedWidth={50}
          breakpoint="lg"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={[
              {
                key: "/dashboard",
                icon: <UserOutlined />,
                label: <Link to="/dashboard">dashboard</Link>,
              },
              {
                key: "/skills",
                icon: <CodepenCircleOutlined />,
                label: <Link to="/skills">Skills</Link>,
              },
              {
                key: "/experiences",
                icon: <GithubOutlined />,
                label: <Link to="/experiences">Experiences</Link>,
              },
              {
                key: "/portfolio",
                icon: <LinkedinOutlined />,
                label: <Link to="/portfolio">Portfoilo</Link>,
              },
              {
                key: "/users",
                icon: <UserSwitchOutlined />,
                label: <Link to="/users">Users</Link>,
              },
              {
                label: (
                  <button onClick={logout} className="logout">
                    <LogoutOutlined /> Logout
                  </button>
                ),
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default AdminLayout;
