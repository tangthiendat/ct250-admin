import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Switch,
  type FormInstance,
} from "antd";
import { useEffect } from "react";
import { IRole } from "../../../interfaces";
import RolePermissions from "./RolePermissions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { permissionsService } from "../../../services";
import Loading from "../../../common/Loading";
import { roleService } from "../../../services/role-service";
import toast from "react-hot-toast";

interface UpdateRoleFormProps {
  form: FormInstance<IRole>;
  roleToUpdate?: IRole;
  onCancel: () => void;
}

interface UpdateRoleArgs {
  roleId: number;
  updatedRole: IRole;
}

const UpdateRoleForm: React.FC<UpdateRoleFormProps> = ({
  form,
  roleToUpdate,
  onCancel,
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["permissions"],
    queryFn: permissionsService.getAllPermissions,
  });

  const { mutate: createRole, isPending: isCreating } = useMutation({
    mutationFn: roleService.create,
    onSuccess: () => {
      toast.success("Thêm vai trò thành công");
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("roles");
        },
      });
    },
    onError: () => {
      toast.error("Thêm vai trò thất bại");
    },
  });

  const { mutate: updateRole, isPending: isUpdating } = useMutation({
    mutationFn: ({ roleId, updatedRole }: UpdateRoleArgs) =>
      roleService.update(roleId, updatedRole),
    onSuccess: () => {
      toast.success("Cập nhật vai trò thành công");
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("roles");
        },
      });
    },
    onError: () => {
      toast.error("Cập nhật vai trò thất bại");
    },
  });

  useEffect(() => {
    if (roleToUpdate) {
      form.setFieldsValue({
        ...roleToUpdate,
        permissions: roleToUpdate.permissions.map((permission) => ({
          permissionId: permission.permissionId,
        })),
      });
    }
  }, [roleToUpdate, form]);

  function handleFinish(values: IRole) {
    if (roleToUpdate) {
      const updatedRole = {
        ...roleToUpdate,
        ...form.getFieldsValue(true),
      };
      console.log(updatedRole);
      updateRole(
        { roleId: roleToUpdate.roleId, updatedRole },
        {
          onSuccess: () => {
            onCancel();
          },
        },
      );
    } else {
      const newRole = {
        ...values,
        roleName: values.roleName.toUpperCase(),
      };
      createRole(newRole, {
        onSuccess: () => {
          onCancel();
        },
      });
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Form
      onFinish={handleFinish}
      form={form}
      layout="vertical"
      initialValues={{ permissions: [], active: true }}
    >
      <Row>
        <Col span={16}>
          <Form.Item
            label="Tên vai trò"
            name="roleName"
            wrapperCol={{ span: 22 }}
            rules={[{ required: true, message: "Vui lòng nhập tên vai trò" }]}
          >
            <Input className="uppercase" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Trạng thái" name="active" valuePropName="checked">
            <Switch checkedChildren="ACTIVE" unCheckedChildren="INACTIVE" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Card className="mb-5" title="Quyền hạn của vai trò" size="small">
            <RolePermissions
              form={form}
              roleToUpdate={roleToUpdate}
              permissions={data?.payload || []}
            />
          </Card>
        </Col>
      </Row>

      <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
        <Space>
          <Button onClick={onCancel}>Hủy</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {roleToUpdate ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdateRoleForm;
