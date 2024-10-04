import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  FormInstance,
  Row,
  Select,
  SelectProps,
  Space,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../common/components/Loading";
import { IAirport, IRoute } from "../../../interfaces";
import { airportService, routeService } from "../../../services";
import AirportOption from "../airport/AirportOption";

interface UpdateRouteFormProps {
  form: FormInstance<IRoute>;
  routeToUpdate?: IRoute;
  onCancel: () => void;
}

interface UpdateRouteArgs {
  routeId: number;
  updatedRoute: IRoute;
}

const UpdateRouteForm: React.FC<UpdateRouteFormProps> = ({
  form,
  routeToUpdate,
  onCancel,
}) => {
  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<
    number | undefined
  >(undefined);
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<
    number | undefined
  >(undefined);

  const queryClient = useQueryClient();
  const { data: airportsData, isLoading: isAirportsLoading } = useQuery({
    queryKey: ["airports"],
    queryFn: airportService.getAll,
  });

  const airportOptions = useMemo(
    () =>
      airportsData?.payload?.map((airport) => ({
        value: airport.airportId,
        label: <AirportOption airport={airport} />,
        searchLabel: `${airport.airportName} (${airport.airportCode})`,
      })) || [],
    [airportsData],
  );

  const filteredDepartureOptions = useMemo(
    () =>
      airportOptions.filter(
        (airport) => airport.value !== selectedArrivalAirport,
      ),
    [airportOptions, selectedArrivalAirport],
  );

  const filteredArrivalOptions = useMemo(
    () =>
      airportOptions.filter(
        (airport) => airport.value !== selectedDepartureAirport,
      ),
    [airportOptions, selectedDepartureAirport],
  );

  useEffect(() => {
    if (routeToUpdate) {
      form.setFieldsValue({
        ...routeToUpdate,
      });
      setSelectedDepartureAirport(routeToUpdate.departureAirport.airportId);
      setSelectedArrivalAirport(routeToUpdate.arrivalAirport.airportId);
    }
  }, [routeToUpdate, form]);

  const { mutate: createRoute, isPending: isCreating } = useMutation({
    mutationFn: routeService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("routes"),
      });
      toast.success("Thêm mới tuyến bay thành công");
      onCancel();
    },
    onError: () => {
      toast.error("Thêm mới tuyến bay thất bại");
    },
  });

  const { mutate: updateRoute, isPending: isUpdating } = useMutation({
    mutationFn: ({ routeId, updatedRoute }: UpdateRouteArgs) => {
      return routeService.update(routeId, updatedRoute);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("routes"),
      });
      toast.success("Cập nhật tuyến bay thành công");
      onCancel();
    },
    onError: () => {
      toast.error("Cập nhật tuyến bay thất bại");
    },
  });

  function handleFinish(values: IRoute) {
    if (routeToUpdate) {
      const updatedRoute = {
        ...routeToUpdate,
        ...values,
      };
      updateRoute(
        { routeId: routeToUpdate.routeId, updatedRoute },
        {
          onError: () => {
            toast.error("Cập nhật tuyến bay thất bại");
          },
        },
      );
    } else {
      const newRoute = { ...values };
      createRoute(newRoute);
    }
  }

  const labelRender: SelectProps["labelRender"] = (props) => {
    const { label } = props;
    if (label) {
      const selectedAirport = (label as React.JSX.Element).props
        .airport as IAirport;
      return `${selectedAirport?.airportName} (${selectedAirport?.airportCode})`;
    }
    return null;
  };

  if (isAirportsLoading) {
    return <Loading />;
  }

  return (
    <Form onFinish={handleFinish} form={form} layout="vertical">
      <Row>
        <Col span={24}>
          <Form.Item
            label="Sân bay đi"
            name={["departureAirport", "airportId"]}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn sân bay đi",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Chọn sân bay đi"
              options={filteredDepartureOptions}
              labelRender={labelRender}
              onChange={setSelectedDepartureAirport}
              optionFilterProp="searchLabel"
              filterOption={(input, option) =>
                option?.searchLabel
                  .toLowerCase()
                  .includes(input.toLowerCase()) ?? false
              }
              filterSort={(optionA, optionB) =>
                optionA?.searchLabel
                  .toLowerCase()
                  .localeCompare(optionB?.searchLabel.toLowerCase())
              }
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Sân bay đến"
            name={["arrivalAirport", "airportId"]}
            dependencies={["departureAirport"]}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn sân bay đến",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value &&
                    getFieldValue(["departureAirport", "airportId"]) === value
                  ) {
                    return Promise.reject(
                      new Error("Sân bay đến không được trùng với sân bay đi"),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Chọn sân bay đến"
              options={filteredArrivalOptions}
              labelRender={labelRender}
              onChange={setSelectedArrivalAirport}
              optionFilterProp="searchLabel"
              filterOption={(input, option) =>
                option?.searchLabel
                  .toLowerCase()
                  .includes(input.toLowerCase()) ?? false
              }
              filterSort={(optionA, optionB) =>
                optionA?.searchLabel
                  .toLowerCase()
                  .localeCompare(optionB?.searchLabel.toLowerCase())
              }
            />
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
            {routeToUpdate ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdateRouteForm;
