import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { IUser } from "../../interfaces";
import { useEffect } from "react";

interface UpdateUserFormProps {
  form: FormInstance<IUser>;
  userToUpdate?: IUser;
  onCancel: () => void;
  onFinish: (values: IUser) => void;
}

const roleOptions = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
  {
    value: "super_admin",
    label: "Super Admin",
  },
];

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  form,
  userToUpdate,
  onCancel,
  onFinish,
}) => {
  //   function handleFinish(values: IUser) {
  //     console.log({ ...userToUpdate, ...values });
  //   }

  useEffect(() => {
    if (userToUpdate) {
      console.log(userToUpdate);
      form.setFieldsValue(userToUpdate);
    }
  }, [form, userToUpdate]);

  return (
    <Form onFinish={onFinish} layout="vertical" form={form}>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input placeholder="Nhập tên user" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email không được để trống" }]}
          >
            <Input placeholder="Nhập email user" />
          </Form.Item>

          <Form.Item label="Vai trò" name="role">
            <Select
              allowClear
              options={roleOptions}
              defaultValue={roleOptions[1].value}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
        <Space>
          <Button onClick={onCancel}>Hủy</Button>

          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdateUserForm;
