import { Button, Form, Space, Upload, UploadProps } from "antd";
import { UploadFile } from "antd/lib";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flightScheduleService } from "../../../services";
import toast from "react-hot-toast";

interface UploadFlightFormProps {
  onCancel: () => void;
}

const REQUIRED_FILE_NAMES = [
  "flights.csv",
  "flight_pricing.csv",
  "seat_availability.csv",
];

interface UploadFlightFormValues {
  files: UploadFile[];
}

const UploadFlightForm: React.FC<UploadFlightFormProps> = ({ onCancel }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [isUploadButtonDisabled, setIsUploadButtonDisabled] =
    useState<boolean>(true);

  const { mutate: uploadFlight, isPending: isUploading } = useMutation({
    mutationFn: flightScheduleService.upload,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("flights");
        },
      });
    },
  });

  function handleFinish(values: UploadFlightFormValues) {
    const { files } = values;
    const formData = new FormData();
    files.forEach((file: UploadFile) => {
      formData.append("files", file.originFileObj as File);
    });
    uploadFlight(formData, {
      onSuccess: () => {
        toast.success("Tải lên thành công");
        form.resetFields();
        onCancel();
      },
      onError: () => {
        toast.error("Đã xảy ra lỗi khi tải lên");
      },
    });
  }

  const handleUploadChange: UploadProps["onChange"] = (info) => {
    const { fileList } = info;
    const uploadedFileNames = fileList.map((file: UploadFile) => file.name);

    if (fileList.length < REQUIRED_FILE_NAMES.length) {
      setIsUploadButtonDisabled(true);
    } else {
      setIsUploadButtonDisabled(
        !REQUIRED_FILE_NAMES.every((fileName) =>
          uploadedFileNames.includes(fileName),
        ),
      );
    }
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item
        name="files"
        wrapperCol={{ span: 24 }}
        valuePropName="fileList"
        rules={[
          {
            validator: (_, fileList: UploadFile[]) => {
              if (!fileList || fileList.length === 0) {
                return Promise.reject(new Error("Vui lòng tải lên file"));
              }

              const uploadedFileNames = fileList.map(
                (file: UploadFile) => file.name,
              );

              if (uploadedFileNames.length > 0) {
                if (uploadedFileNames.length === 1) {
                  if (!REQUIRED_FILE_NAMES.includes(uploadedFileNames[0])) {
                    return Promise.reject(
                      new Error(
                        `Chỉ hỗ trợ các file: ${REQUIRED_FILE_NAMES.join(", ")}`,
                      ),
                    );
                  }
                  return Promise.reject(
                    new Error(
                      `Vui lòng tải lên các file còn thiếu: ${REQUIRED_FILE_NAMES.filter((fileName) => !uploadedFileNames.includes(fileName)).join(", ")}`,
                    ),
                  );
                } else if (
                  uploadedFileNames.length === 2 &&
                  !REQUIRED_FILE_NAMES.every((fileName) =>
                    uploadedFileNames.includes(fileName),
                  )
                ) {
                  if (uploadedFileNames[0] === uploadedFileNames[1]) {
                    return Promise.reject(
                      new Error("Tên file không được trùng nhau"),
                    );
                  } else if (
                    !REQUIRED_FILE_NAMES.includes(uploadedFileNames[1])
                  ) {
                    return Promise.reject(
                      new Error(
                        `Chỉ hỗ trợ các file: ${REQUIRED_FILE_NAMES.join(", ")}`,
                      ),
                    );
                  }
                  return Promise.reject(
                    new Error(
                      `Vui lòng tải lên file còn thiếu: ${REQUIRED_FILE_NAMES.filter((fileName) => !uploadedFileNames.includes(fileName)).join(", ")}`,
                    ),
                  );
                } else if (
                  uploadedFileNames.length === REQUIRED_FILE_NAMES.length &&
                  !REQUIRED_FILE_NAMES.every((fileName) =>
                    uploadedFileNames.includes(fileName),
                  )
                ) {
                  if (
                    [uploadedFileNames[0], uploadedFileNames[1]].some(
                      (fileName) => fileName === uploadedFileNames[2],
                    )
                  ) {
                    return Promise.reject(
                      new Error("Tên file không được trùng nhau"),
                    );
                  }
                  return Promise.reject(
                    new Error(
                      `Chỉ hỗ trợ các file: ${REQUIRED_FILE_NAMES.join(", ")}`,
                    ),
                  );
                }
              }
              return Promise.resolve();
            },
          },
        ]}
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
      >
        <Upload.Dragger
          accept=".csv"
          multiple
          beforeUpload={() => false} // Prevent automatic upload
          maxCount={REQUIRED_FILE_NAMES.length}
          onChange={handleUploadChange}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Kéo hoặc nhấn vào để tải lên file CSV
          </p>
          <p className="ant-upload-hint">
            {`Hỗ trợ tải lên ${REQUIRED_FILE_NAMES.join(", ")}`}
          </p>
        </Upload.Dragger>
      </Form.Item>

      <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
        <Space>
          <Button onClick={onCancel} loading={isUploading}>
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isUploadButtonDisabled}
            loading={isUploading}
          >
            Tải lên
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UploadFlightForm;
