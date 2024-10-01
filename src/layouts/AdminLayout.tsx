import React, { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FaKey, FaUserCircle, FaUserCog, FaUsers } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { MdDashboard, MdFlight } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Loading from "../common/components/Loading";
import { PERMISSIONS } from "../common/constants";
import { useAvatarUrl } from "../features/auth/hooks/useAvatarUrl";
import { useLoggedInUser } from "../features/auth/hooks/useLoggedInUser";
import { authService } from "../services";
import { Module } from "../common/enums";

const { Header, Sider } = Layout;

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    location.pathname === "/"
      ? ["dashboard"]
      : location.pathname.slice(1).split("/"),
  );
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const { user, isLoading } = useLoggedInUser();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const avatarUrl = useAvatarUrl(user ?? null);

  const { mutate: logout } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      window.localStorage.removeItem("access_token");
      queryClient.removeQueries();
      navigate("/login");
    },
  });

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <span onClick={() => logout()} className="px-1">
          Đăng xuất
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (user?.role.permissions) {
      const permissions = user.role.permissions;

      const viewUsers = permissions.find(
        (item) =>
          item.apiPath === PERMISSIONS[Module.USERS].GET_PAGINATION.apiPath &&
          item.method === PERMISSIONS[Module.USERS].GET_PAGINATION.method,
      );
      const viewRoles = permissions.find(
        (item) =>
          item.apiPath === PERMISSIONS[Module.ROLES].GET_PAGINATION.apiPath &&
          item.method === PERMISSIONS[Module.ROLES].GET_PAGINATION.method,
      );

      const viewPermissions = permissions.find(
        (item) =>
          item.apiPath ===
            PERMISSIONS[Module.PERMISSIONS].GET_PAGINATION.apiPath &&
          item.method === PERMISSIONS[Module.PERMISSIONS].GET_PAGINATION.method,
      );

      const viewAirports = permissions.find(
        (item) =>
          item.apiPath ===
            PERMISSIONS[Module.AIRPORTS].GET_PAGINATION.apiPath &&
          item.method === PERMISSIONS[Module.AIRPORTS].GET_PAGINATION.method,
      );
      const viewAirplanes = permissions.find(
        (item) =>
          item.apiPath ===
            PERMISSIONS[Module.AIRPLANES].GET_PAGINATION.apiPath &&
          item.method === PERMISSIONS[Module.AIRPLANES].GET_PAGINATION.method,
      );

      const menuItems = [
        {
          label: (
            <NavLink className="" to="/">
              Trang chủ
            </NavLink>
          ),
          key: "dashboard",
          icon: <MdDashboard />,
        },
        ...(viewUsers
          ? [
              {
                label: <NavLink to="/users">Người dùng</NavLink>,
                key: "users",
                icon: <FaUsers />,
              },
            ]
          : []),
        ...(viewRoles
          ? [
              {
                label: <NavLink to="/roles">Vai trò</NavLink>,
                key: "roles",
                icon: <FaUserCog />,
              },
            ]
          : []),
        ...(viewPermissions
          ? [
              {
                label: <NavLink to="/permissions">Quyền hạn</NavLink>,
                key: "permissions",
                icon: <FaKey />,
              },
            ]
          : []),
        ...(viewAirports
          ? [
              {
                label: <NavLink to="/airports">Sân bay</NavLink>,
                key: "airports",
                icon: <FaLocationArrow />,
              },
            ]
          : []),
        ...(viewAirplanes
          ? [
              {
                label: <NavLink to="/airplanes">Máy bay</NavLink>,
                key: "airplanes",
                icon: <MdFlight size={18} />,
              },
            ]
          : []),
      ];

      setMenuItems(menuItems);
    }
  }, [user]);

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

  if (isLoading) {
    return <Loading />;
  }

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
          items={menuItems}
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
            <div className="relative mr-5 flex items-center gap-2">
              <Button
                type="text"
                icon={
                  avatarUrl ? (
                    <Avatar src={avatarUrl} className="m-2" />
                  ) : (
                    <FaUserCircle />
                  )
                }
                // onClick={}
                style={{
                  fontSize: "30px",
                }}
              />
              <Dropdown
                menu={{ items }}
                placement="bottom"
                overlayStyle={{
                  position: "absolute",
                  top: "50px",
                }}
              >
                <p className="cursor-pointer">
                  {user ? `${user.lastName} ${user.firstName}` : ""}
                </p>
              </Dropdown>
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
