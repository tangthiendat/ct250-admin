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
import { IPermission } from "../../../interfaces";
import { useEffect } from "react";
import { ALL_METHODS, ALL_MODULES } from "../../../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { permissionsService } from "../../../services";
import { NotificationInstance } from "antd/lib/notification/interface";

interface UpdatePermissionFormProps {
  form: FormInstance<IPermission>;
  permissionToUpdate?: IPermission;
  onCancel: () => void;
  notificationApi: NotificationInstance;
}

const methodOptions = ALL_METHODS.map((method: string) => ({
  value: method,
  label: method,
}));

const moduleOptions = ALL_MODULES.map((module: string) => ({
  value: module,
  label: module,
}));

const UpdatePermissionForm: React.FC<UpdatePermissionFormProps> = ({
  form,
  permissionToUpdate,
  notificationApi,
  onCancel,
}) => {
  const queryClient = useQueryClient();

  const { mutate: createPermission, isPending: isCreating } = useMutation({
    mutationFn: permissionsService.create,
    onSuccess: () => {
      notificationApi.success({
        message: "Thêm quyền hạn thành công",
      });
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "permissions";
        },
      });
    },
    onError: () => {
      notificationApi.error({
        message: "Thêm quyền hạn thất bại",
      });
    },
  });

  const { mutate: updatePermission, isPending: isUpdating } = useMutation({
    mutationFn: permissionsService.update,
    onSuccess: () => {
      notificationApi.success({
        message: "Cập nhật quyền hạn thành công",
      });
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "permissions";
        },
      });
    },
    onError: () => {
      notificationApi.error({
        message: "Cập nhật quyền hạn thất bại",
      });
    },
  });

  function handleFinish(values: IPermission) {
    if (permissionToUpdate) {
      console.log({ ...permissionToUpdate, ...values });
      updatePermission(
        { ...permissionToUpdate, ...values },
        {
          onSuccess: () => {
            onCancel();
          },
        },
      );
    } else {
      createPermission(values, {
        onSuccess: () => {
          onCancel();
        },
      });
    }
  }

  useEffect(() => {
    if (permissionToUpdate) {
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
              {
                required: true,
                message: "Tên quyền hạn không được để trống",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đường dẫn API"
            name="apiPath"
            rules={[
              {
                required: true,
                message: "Đường dẫn API không được để trống",
              },
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
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {permissionToUpdate ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdatePermissionForm;
