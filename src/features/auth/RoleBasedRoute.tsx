import { PropsWithChildren } from "react";
import { useLoggedInUser } from "./hooks/useLoggedInUser";
import NotPermitted from "./NotPermitted";
import Loading from "../../common/Loading";

const RoleBasedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, isLoading } = useLoggedInUser();
  const isNormalUser = user?.role.roleName === "USER";
  if (isLoading) {
    return <Loading />;
  }
  if (isNormalUser) {
    localStorage.removeItem("access_token");
    return <NotPermitted />;
  }
  return <>{children}</>;
};

export default RoleBasedRoute;
