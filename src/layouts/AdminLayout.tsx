import React, { useEffect, useState } from "react";

import { Button, Layout, Menu, theme } from "antd";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FaUser, FaUserCircle, FaUserCog } from "react-icons/fa";
import { Outlet, useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const { Header, Sider } = Layout;

const items = [
  {
    label: (
      <NavLink className="" to="/">
        Dashboard
      </NavLink>
    ),
    key: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: <NavLink to="/user">User</NavLink>,
    key: "user",
    icon: <FaUser />,
  },
  {
    label: <NavLink to="/role">Role</NavLink>,
    key: "role",
    icon: <FaUserCog />,
  },
  {
    label: <NavLink to="/permissions">Permissions</NavLink>,
    key: "permissions",
    icon: <FaUserCog />,
  },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    location.pathname === "/"
      ? ["dashboard"]
      : location.pathname.slice(1).split("/"),
  );
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const checkScreenWidth = () => {
      const mdBreakpoint = 768;
      if (window.innerWidth < mdBreakpoint) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        className="shadow"
      >
        <div className="demo-logo-vertical flex flex-col items-center pb-6">
          <img src="/logo512.png" alt="Logo" className="w-36 p-3" />
          {!collapsed && <h1 className="font-bold">Admin</h1>}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          items={items}
          onClick={({ key }) => {
            setSelectedKeys([key]);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex items-center justify-between">
            <Button
              type="text"
              icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "20px",
              }}
            />
            <div className="mr-5 flex items-center gap-1">
              <p>Welcome name!</p>
              <Button
                type="text"
                icon={<FaUserCircle />}
                // onClick={}
                style={{
                  fontSize: "30px",
                }}
              />
            </div>
          </div>
        </Header>
        <Layout.Content>
          <div className="m-2">
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
