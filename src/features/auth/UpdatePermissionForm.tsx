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
import { IPermission } from "../../interfaces";
import { useEffect } from "react";

interface UpdatePermissionFormProps {
  form: FormInstance<IPermission>;
  permissionToUpdate?: IPermission;
  onCancel: () => void;
}

const methodOptions = [
  {
    value: "GET",
    label: "GET",
  },
  {
    value: "POST",
    label: "POST",
  },
  {
    value: "PUT",
    label: "PUT",
  },
  {
    value: "DELETE",
    label: "DELETE",
  },
];

const moduleOptions = [
  {
    value: "FLIGHT",
    label: "FLIGHT",
  },
  {
    value: "BOOKING",
    label: "BOOKING",
  },
];

const UpdatePermissionForm: React.FC<UpdatePermissionFormProps> = ({
  form,
  permissionToUpdate,
  onCancel,
}) => {
  function handleFinish(values: IPermission) {
    console.log({ ...permissionToUpdate, ...values });
  }

  useEffect(() => {
    if (permissionToUpdate) {
      console.log(permissionToUpdate);
      form.setFieldsValue(permissionToUpdate);
    }
  }, [form, permissionToUpdate]);

  return (
    <Form onFinish={handleFinish} layout="vertical" form={form}>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Tên quyền hạn"
            name="name"
            rules={[
              { required: true, message: "Tên quyền hạn không được để trống" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đường dẫn API"
            name="apiPath"
            rules={[
              { required: true, message: "Đường dẫn API không được để trống" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phương thức"
            name="method"
            rules={[
              { required: true, message: "Phương thức không được để trống" },
            ]}
          >
            <Select allowClear options={methodOptions} />
          </Form.Item>
          <Form.Item
            label="Module"
            name="module"
            rules={[{ required: true, message: "Module không được để trống" }]}
          >
            <Select allowClear options={moduleOptions} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
        <Space>
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdatePermissionForm;
