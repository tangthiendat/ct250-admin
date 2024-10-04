import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  type FormInstance,
} from "antd";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../../../common/components/Loading";
import { IAirport } from "../../../interfaces";
import { airportService, countryService } from "../../../services";

interface UpdateAirportFormProps {
  form: FormInstance<IAirport>;
  airportToUpdate?: IAirport;
  onCancel: () => void;
  viewOnly?: boolean;
}

interface UpdateAirportArgs {
  airportId: number;
  updatedAirport: IAirport;
}

const UpdateAirportForm: React.FC<UpdateAirportFormProps> = ({
  form,
  airportToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (airportToUpdate) {
      form.setFieldsValue({
        ...airportToUpdate,
      });
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

  function handleFinish(values: IAirport) {
    if (airportToUpdate) {
      const updatedAirport = {
        ...airportToUpdate,
        ...values,
      };
      updateAirport(
        { airportId: airportToUpdate.airportId, updatedAirport },
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
      const newAirport = {
        ...values,
      };
      createAirport(newAirport, {
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
              placeholder="Vui lòng chọn quốc tịch"
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
      </Row>

      {!viewOnly && (
        <Form.Item className="text-right" wrapperCol={{ span: 24 }}>
          <Space>
            <Button onClick={onCancel}>Hủy</Button>
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
