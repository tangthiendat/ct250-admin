import {
  Card,
  Col,
  Collapse,
  CollapseProps,
  FormInstance,
  Row,
  Switch,
} from "antd";
import { IPermission, IRole } from "../../../interfaces";
import { colorMethod, groupBy } from "../../../utils";
import { useEffect, useState } from "react";

interface RolePermissionsProps {
  form: FormInstance<IRole>;
}

const permissionData: IPermission[] = [
  {
    permissionId: 1,
    name: "Create a user",
    apiPath: "/api/v1/users",
    method: "POST",
    module: "USER",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 2,
    name: "Read a user",
    apiPath: "/api/v1/users",
    method: "GET",
    module: "USER",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 3,
    name: "Update a user",
    apiPath: "/api/v1/users/{id}",
    method: "PUT",
    module: "USER",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 4,
    name: "Delete a user",
    apiPath: "/api/v1/users/{id}",
    method: "DELETE",
    module: "USER",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 5,
    name: "Create a role",
    apiPath: "/api/v1/roles",
    method: "POST",
    module: "ROLE",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 6,
    name: "Read a role",
    apiPath: "/api/v1/roles",
    method: "GET",
    module: "ROLE",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 7,
    name: "Update a role",
    apiPath: "/api/v1/roles/{id}",
    method: "PUT",
    module: "ROLE",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 8,
    name: "Delete a role",
    apiPath: "/api/v1/roles/{id}",
    method: "DELETE",
    module: "ROLE",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 9,
    name: "Create a permission",
    apiPath: "/api/v1/permissions",
    method: "POST",
    module: "PERMISSION",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 10,
    name: "Read a permission",
    apiPath: "/api/v1/permissions",
    method: "GET",
    module: "PERMISSION",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 11,
    name: "Update a permission",
    apiPath: "/api/v1/permissions/{id}",
    method: "PUT",
    module: "PERMISSION",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
  {
    permissionId: 12,
    name: "Delete a permission",
    apiPath: "/api/v1/permissions/{id}",
    method: "DELETE",
    module: "PERMISSION",
    createdAt: "2021-09-01",
    updatedAt: "2021-09-01",
  },
];

const RolePermissions: React.FC<RolePermissionsProps> = ({ form }) => {
  const allRolePermissions = groupBy<IPermission, string>(
    permissionData,
    (permission) => permission.module,
  );

  const [selectedPermissions, setSelectedPermissions] = useState<
    Map<string, Set<number>>
  >(() => new Map<string, Set<number>>());

  //set form value when selectedPermissions change
  useEffect(() => {
    form.setFieldsValue({
      permissions: Array.from(selectedPermissions.values()).flatMap((ids) =>
        Array.from(ids).map((id) => ({ permissionId: id })),
      ),
    });
  }, [selectedPermissions, form]);

  function isModuleChecked(module: string): boolean {
    const selectedPermissionIds = selectedPermissions.get(module) || new Set();
    const allRolePermissionsLength =
      allRolePermissions.get(module)?.length || 0;
    return (
      selectedPermissionIds.size > 0 &&
      allRolePermissionsLength > 0 &&
      selectedPermissionIds.size === allRolePermissionsLength
    );
  }

  function handlePermissionCheck(
    checked: boolean,
    permission: IPermission,
  ): void {
    if (checked) {
      //add permission id to the module
      setSelectedPermissions((prev) => {
        const newSelectedPermissions = new Map(prev);
        const selectedPermissionIds = newSelectedPermissions.get(
          permission.module,
        );
        if (selectedPermissionIds) {
          selectedPermissionIds.add(permission.permissionId);
          newSelectedPermissions.set(permission.module, selectedPermissionIds);
        } else {
          newSelectedPermissions.set(
            permission.module,
            new Set([permission.permissionId]),
          );
        }
        return newSelectedPermissions;
      });
    } else {
      //remove permission id from the module
      setSelectedPermissions((prev) => {
        const newSelectedPermissions = new Map(prev);
        const selectedPermissionIds = newSelectedPermissions.get(
          permission.module,
        );
        if (selectedPermissionIds) {
          selectedPermissionIds.delete(permission.permissionId);
          newSelectedPermissions.set(permission.module, selectedPermissionIds);
        }
        return newSelectedPermissions;
      });
    }
  }

  function handleModuleCheck(checked: boolean, module: string): void {
    if (checked) {
      setSelectedPermissions((prev) => {
        const newSelectedPermissions = new Map(prev);
        newSelectedPermissions.set(
          module,
          new Set(
            allRolePermissions
              .get(module)
              ?.map((p: IPermission) => p.permissionId),
          ),
        );

        return newSelectedPermissions;
      });
    } else {
      setSelectedPermissions((prev) => {
        const newSelectedPermissions = new Map(prev);
        newSelectedPermissions.delete(module);
        return newSelectedPermissions;
      });
    }
  }

  const items: CollapseProps["items"] = Array.from(
    allRolePermissions.keys(),
  ).map((module: string) => ({
    key: module,
    label: <div>{module}</div>,
    forceRender: true,
    extra: (
      <Switch
        checked={isModuleChecked(module)}
        onClick={(_, event) => event.stopPropagation()}
        onChange={(checked) => handleModuleCheck(checked, module)}
      />
    ),
    children: (
      <Row gutter={[16, 16]}>
        {allRolePermissions
          .get(module)
          ?.map((permission: IPermission, index: number) => (
            <Col key={`${index}-child-${permission.module}`} span={12}>
              <Card size="small">
                <div className="flex flex-1">
                  <div className="flex flex-col items-center">
                    <Switch
                      checked={selectedPermissions
                        .get(module)
                        ?.has(permission.permissionId)}
                      className="mt-[3px]"
                      onChange={(checked) =>
                        handlePermissionCheck(checked, permission)
                      }
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="mb-[3px] pl-[10px]">
                      {permission?.name || ""}
                    </p>
                    <div className="flex flex-1">
                      <p
                        className="pl-[10px] font-bold"
                        style={{ color: colorMethod(permission?.method) }}
                      >
                        {permission?.method || ""}
                      </p>
                      <p className="flex-1 pl-[10px]">
                        {permission?.apiPath || ""}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
    ),
  }));

  return <Collapse items={items} />;
};

export default RolePermissions;
