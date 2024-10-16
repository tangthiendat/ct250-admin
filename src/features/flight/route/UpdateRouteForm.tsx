import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Form, Row, Select, SelectProps, Space } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../common/components/Loading";
import { IAirport, IRoute } from "../../../interfaces";
import { airportService, routeService } from "../../../services";
import { groupBy } from "../../../utils";
import AirportOption from "../airport/AirportOption";

interface UpdateRouteFormProps {
  routeToUpdate?: IRoute;
  onCancel: () => void;
}

interface UpdateRouteArgs {
  routeId: number;
  updatedRoute: IRoute;
}

const UpdateRouteForm: React.FC<UpdateRouteFormProps> = ({
  routeToUpdate,
  onCancel,
}) => {
  const [form] = Form.useForm<IRoute>();
  const queryClient = useQueryClient();
  const { data: airportsData, isLoading: isAirportsLoading } = useQuery({
    queryKey: ["airports"],
    queryFn: airportService.getAll,
  });
  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<
    number | undefined
  >(routeToUpdate?.departureAirport.airportId);
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<
    number | undefined
  >(routeToUpdate?.arrivalAirport.airportId);

  const airportsByCountry: Map<string, IAirport[]> = groupBy(
    airportsData?.payload || [],
    (airport) => airport.country.countryName,
  );

  const airportOptions = Array.from(airportsByCountry.entries()).map(
    ([countryName, airports]) => ({
      label: <span className="text-sm">{countryName}</span>,
      options: airports.map((airport) => ({
        value: airport.airportId,
        label: <AirportOption airport={airport} />,
        searchLabel: `${airport.airportName} (${airport.airportCode})`,
      })),
    }),
  );

  const filteredDepartureOptions = airportOptions.map((group) => ({
    ...group,
    options: group.options.filter(
      (airport) => airport.value !== selectedArrivalAirport,
    ),
  }));

  const filteredArrivalOptions = airportOptions.map((group) => ({
    ...group,
    options: group.options.filter(
      (airport) => airport.value !== selectedDepartureAirport,
    ),
  }));

  useEffect(() => {
    if (routeToUpdate) {
      form.setFieldsValue({
        ...routeToUpdate,
      });
    }
  }, [routeToUpdate, form]);

  const { mutate: createRoute, isPending: isCreating } = useMutation({
    mutationFn: routeService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("routes"),
      });
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
          onSuccess: () => {
            toast.success("Cập nhật tuyến bay thành công");
            onCancel();
            form.resetFields();
          },
          onError: () => {
            toast.error("Cập nhật tuyến bay thất bại");
          },
        },
      );
    } else {
      const newRoute = { ...values };
      createRoute(newRoute, {
        onSuccess: () => {
          toast.success("Thêm mới tuyến bay thành công");
          onCancel();
          form.resetFields();
        },
        onError: () => {
          toast.error("Thêm mới tuyến bay thất bại");
        },
      });
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
              onChange={(value) => setSelectedDepartureAirport(value)}
              labelRender={labelRender}
              filterOption={(input, option) => {
                if (option && option.options) {
                  return false; //ignore group label
                }
                const airport = option?.label.props.airport as IAirport;
                return (
                  airport.airportName
                    .toLowerCase()
                    .includes(input.toLowerCase()) ||
                  airport.airportCode
                    .toLowerCase()
                    .includes(input.toLowerCase()) ||
                  airport.cityName.toLowerCase().includes(input.toLowerCase())
                );
              }}
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
            ]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Chọn sân bay đến"
              options={filteredArrivalOptions}
              onChange={(value) => setSelectedArrivalAirport(value)}
              labelRender={labelRender}
              filterOption={(input, option) => {
                if (option && option.options) {
                  return false; //ignore group label
                }
                const airport = option?.label.props.airport as IAirport;
                return (
                  airport.airportName
                    .toLowerCase()
                    .includes(input.toLowerCase()) ||
                  airport.airportCode
                    .toLowerCase()
                    .includes(input.toLowerCase()) ||
                  airport.cityName.toLowerCase().includes(input.toLowerCase())
                );
              }}
            />
          </Form.Item>
        </Col>
      </Row>

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
            {routeToUpdate ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdateRouteForm;
