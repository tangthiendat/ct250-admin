import { PlusOutlined } from "@ant-design/icons";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Upload,
  UploadFile,
  type FormInstance,
} from "antd";
import { UploadProps } from "antd/lib";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../common/components/Loading";
import { FileType, IAirport } from "../../../interfaces";
import { airportService, countryService } from "../../../services";
import { getBase64 } from "../../../utils";

interface UpdateAirportFormProps {
  form: FormInstance<IAirport>;
  airportToUpdate?: IAirport;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdateAirportArgs {
  airportId: number;
  updatedAirport: FormData;
}

interface UpdateAirportFormValues extends IAirport {
  cityImg?: File;
}

const UpdateAirportForm: React.FC<UpdateAirportFormProps> = ({
  form,
  airportToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (airportToUpdate) {
      form.setFieldsValue({
        ...airportToUpdate,
      });
      setPreviewImage(airportToUpdate.imgUrl ?? "");
      setFileList(
        airportToUpdate.imgUrl
          ? [
              {
                uid: "-1",
                name: airportToUpdate.airportCode,
                status: "done",
                url: airportToUpdate.imgUrl,
              },
            ]
          : [],
      );
    }
  }, [airportToUpdate, form]);

  const { data: countriesData, isLoading: isCountriesLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: countryService.getAll,
  });

  const countryOptions = countriesData?.payload?.map((country) => ({
    value: country.countryId,
    label: country.countryName,
  }));

  const { mutate: createAirport, isPending: isCreating } = useMutation({
    mutationFn: airportService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("airports");
        },
      });
    },
  });

  const { mutate: updateAirport, isPending: isUpdating } = useMutation({
    mutationFn: ({ airportId, updatedAirport }: UpdateAirportArgs) => {
      return airportService.update(airportId, updatedAirport);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("airports");
        },
      });
    },
  });

  async function handlePreview(file: UploadFile) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || file.preview || "");
    setPreviewOpen(true);
  }

  const handleUploadChange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  function handleFinish(values: UpdateAirportFormValues) {
    if (airportToUpdate) {
      const updatedAirport = {
        ...airportToUpdate,
        ...values,
      };
      const formData = new FormData();

      Object.keys(updatedAirport)
        .filter((key) => !["cityImg"].includes(key))
        .forEach((key) => {
          const value = updatedAirport[key];
          if (typeof value === "object" && key === "country") {
            formData.append("country.countryId", value?.countryId);
          } else {
            formData.append(key, value);
          }
        });

      if (fileList.length > 0) {
        formData.append("cityImg", fileList[0].originFileObj as File);
      }

      console.log(fileList);

      formData.forEach((value, key) => {
        console.log(key, value);
      });

      updateAirport(
        { airportId: airportToUpdate.airportId, updatedAirport: formData },
        {
          onSuccess: () => {
            toast.success("Cập nhật sân bay thành công");
            onCancel();
          },
          onError: () => {
            toast.error("Cập nhật sân bay thất bại");
          },
        },
      );
    } else {
      const formData = new FormData();
      const newAirport = {
        ...values,
        airportCode: values.airportCode.toUpperCase(),
        cityCode: values.cityCode.toUpperCase(),
      };
      Object.keys(newAirport)
        .filter((key) => ["cityImg", "createdAt"].includes(key))
        .forEach((key) => {
          const value = newAirport[key];
          if (typeof value === "object" && key === "country") {
            formData.append("country.countryId", value?.countryId);
          } else {
            formData.append(key, value);
          }
        });

      if (fileList.length > 0) {
        formData.append("cityImg", fileList[0].originFileObj as File);
      }

      createAirport(formData, {
        onSuccess: () => {
          toast.success("Thêm mới sân bay thành công");
          onCancel();
        },
        onError: () => {
          toast.error("Thêm mới sân bay thất bại");
        },
      });
    }
  }

  if (isCountriesLoading) {
    return <Loading />;
  }

  return (
    <Form
      onFinish={handleFinish}
      form={form}
      layout="vertical"
      initialValues={{ active: true }}
    >
      <Row>
        <Col span={15}>
          <Form.Item
            label="Tên sân bay"
            name="airportName"
            rules={[{ required: true, message: "Vui lòng nhập tên sân bay" }]}
          >
            <Input.TextArea readOnly={viewOnly} rows={2} />
          </Form.Item>
        </Col>
        <Col span={7} offset={2}>
          <Form.Item
            label="Mã sân bay"
            name="airportCode"
            rules={[{ required: true, message: "Vui lòng nhập mã sân bay" }]}
          >
            <Input readOnly={viewOnly} className="uppercase" />
          </Form.Item>
        </Col>

        <Col span={15}>
          <Form.Item
            label="Tên thành phố"
            name="cityName"
            rules={[{ required: true, message: "Vui lòng nhập tên thành phố" }]}
          >
            <Input readOnly={viewOnly} />
          </Form.Item>
        </Col>
        <Col span={7} offset={2}>
          <Form.Item
            label="Mã thành phố"
            name="cityCode"
            rules={[{ required: true, message: "Vui lòng nhập mã thành " }]}
          >
            <Input readOnly={viewOnly} className="uppercase" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className="flex-1"
            label="Quốc gia"
            name={["country", "countryId"]}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn quốc gia",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Vui lòng chọn quốc gia"
              options={countryOptions}
              optionFilterProp="label"
              filterOption={(input, option) =>
                option?.label.toLowerCase().includes(input.toLowerCase()) ??
                false
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="cityImg"
            label="Ảnh thành phố"
            valuePropName="fileList"
            rules={[
              {
                validator: (_, value) => {
                  if (fileList.length < 1 && !value) {
                    return Promise.reject(
                      new Error("Vui lòng chọn ảnh thành phố"),
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              maxCount={1}
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false} // Prevent automatic upload
              onPreview={handlePreview}
              onChange={handleUploadChange}
            >
              {fileList.length < 1 && (
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                </button>
              )}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
        </Col>
      </Row>

      {!viewOnly && (
        <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
          <Space>
            <Button onClick={onCancel} loading={isCreating || isUpdating}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreating || isUpdating}
            >
              {airportToUpdate ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateAirportForm;
