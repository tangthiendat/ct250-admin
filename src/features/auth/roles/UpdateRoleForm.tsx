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
import { IRole } from "../../../interfaces";
import RolePermissions from "./RolePermissions";
import { useEffect } from "react";

interface UpdateRoleFormProps {
  form: FormInstance<IRole>;
  roleToUpdate?: IRole;
  onCancel: () => void;
}

const UpdateRoleForm: React.FC<UpdateRoleFormProps> = ({
  form,
  roleToUpdate,
  onCancel,
}) => {
  function handleFinish(values: IRole) {
    console.log({ ...roleToUpdate, ...form.getFieldsValue(true), ...values });
  }

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
            name="name"
            wrapperCol={{ span: 22 }}
            rules={[{ required: true, message: "Vui lòng nhập tên vai trò" }]}
          >
            <Input />
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
            <RolePermissions form={form} roleToUpdate={roleToUpdate} />
          </Card>
        </Col>
      </Row>

      <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
        <Space>
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            {roleToUpdate ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdateRoleForm;
