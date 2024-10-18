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
} from "antd";
import { UploadProps } from "antd/lib";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../common/components/Loading";
import { FileType, IAirport, ICountry } from "../../../interfaces";
import { airportService, countryService } from "../../../services";
import { getBase64 } from "../../../utils";

interface UpdateAirportFormProps {
  airportToUpdate?: IAirport;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdateAirportArgs {
  airportId: number;
  updatedAirport: FormData;
}

interface UpdateAirportFormValues extends IAirport {
  cityImg?: UploadFile[];
}

const UpdateAirportForm: React.FC<UpdateAirportFormProps> = ({
  airportToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const [form] = Form.useForm<UpdateAirportFormValues>();
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

      Object.keys(updatedAirport).forEach((key: string) => {
        const value = updatedAirport[
          key as keyof UpdateAirportFormValues
        ] as UpdateAirportFormValues[keyof UpdateAirportFormValues];

        if (typeof value === "object") {
          if (key === "country") {
            formData.append(
              "country.countryId",
              (value as ICountry).countryId.toString(),
            );
          }
        } else {
          formData.append(key, value as string);
        }
      });
      if (fileList.length > 0) {
        formData.append("cityImg", fileList[0].originFileObj as File);
      }

      updateAirport(
        { airportId: airportToUpdate.airportId, updatedAirport: formData },
        {
          onSuccess: () => {
            toast.success("Cập nhật sân bay thành công");
            onCancel();
            form.resetFields();
            setFileList([]);
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
        .filter((key: string) => !["createdAt"].includes(key))
        .forEach((key: string) => {
          const value = newAirport[
            key as keyof UpdateAirportFormValues
          ] as UpdateAirportFormValues[keyof UpdateAirportFormValues];
          if (typeof value === "object") {
            if (key === "country") {
              formData.append(
                "country.countryId",
                (value as ICountry).countryId.toString(),
              );
            }
            if (key === "cityImg") {
              formData.append(
                "cityImg",
                (value as UploadFile[])[0].originFileObj as File,
              );
            }
          } else {
            formData.append(key, value as string);
          }
        });

      createAirport(formData, {
        onSuccess: () => {
          toast.success("Thêm mới sân bay thành công");
          onCancel();
          form.resetFields();
          setFileList([]);
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
                validator: () => {
                  if (fileList && fileList.length < 1) {
                    return Promise.reject(new Error("Vui lòng tải ảnh lên"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              maxCount={1}
              disabled={viewOnly}
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false} // Prevent automatic upload
              onPreview={handlePreview}
              onChange={handleUploadChange}
              showUploadList={{
                showRemoveIcon: !viewOnly,
              }}
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
