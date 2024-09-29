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
import Loading from "../../../common/Loading";
import { IAirport } from "../../../interfaces";
import { countryService } from "../../../services";
import { airportService } from "../../../services/airport-service";

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
    queryFn: countryService.getAllCountries,
  });

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

  const countryOptions = countriesData?.payload?.map((country) => ({
    value: country.countryId,
    label: country.countryName,
  }));

  function handleFinish(values: IAirport) {
    if (airportToUpdate) {
      const updatedAirport = {
        ...airportToUpdate,
        ...values,
        // Name: values.firstName.toUpperCase(),
      };
      updateAirport(
        { airportId: airportToUpdate.airportId, updatedAirport },
        {
          onSuccess: () => {
            toast.success("Cập nhật người dùng thành công");
            onCancel();
          },
          onError: () => {
            toast.error("Cập nhật người dùng thất bại");
          },
        },
      );
    } else {
      const newAirport = {
        ...values,
        // firstName: values.firstName.toUpperCase(),
        // lastName: values.lastName.toUpperCase(),
      };
      createAirport(newAirport, {
        onSuccess: () => {
          toast.success("Thêm mới người dùng thành công");
          onCancel();
        },
        onError: () => {
          toast.error("Thêm mới người dùng thất bại");
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
              disabled={viewOnly}
              placeholder="Chọn quốc gia"
              options={countryOptions}
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
