import { Button, Col, Form, FormInstance, Row, Select, Space } from "antd";
import { IRoute } from "../../../interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { airportService } from "../../../services";
import { routeService } from "../../../services/flight/route-service";
import Loading from "../../../common/components/Loading";
import toast from "react-hot-toast";

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
  useEffect(() => {
    if (routeToUpdate) {
      form.setFieldsValue({
        ...routeToUpdate,
      });
    }
  }, [routeToUpdate, form]);

  const queryClient = useQueryClient();
  const { data: airportsData, isLoading: isAirportsLoading } = useQuery({
    queryKey: ["airports"],
    queryFn: airportService.getAll,
  });

  const airportOptions = airportsData?.payload?.map((airport) => ({
    value: airport.airportId,
    label: (
      <div className="flex items-center justify-between">
        <div>{airport.airportName}</div>
        <div>{airport.airportCode}</div>
      </div>
    ),
  }));

  const { mutate: createRoute, isPending: isCreating } = useMutation({
    mutationFn: routeService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("routes");
        },
      });
    },
  });

  const { mutate: updateRoute, isPending: isUpdating } = useMutation({
    mutationFn: ({ routeId, updatedRoute }: UpdateRouteArgs) => {
      return routeService.update(routeId, updatedRoute);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("routes");
        },
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
        { routeId: routeToUpdate.routeId, updatedRoute: updatedRoute },
        {
          onSuccess: () => {
            toast.success("Cập nhật tuyến bay thành công");
            onCancel();
          },
          onError: () => {
            toast.error("Cập nhật tuyến bay thất bại");
          },
        },
      );
    } else {
      const newRoute = {
        ...values,
      };
      createRoute(newRoute, {
        onSuccess: () => {
          toast.success("Thêm mới tuyến bay thành công");
          onCancel();
        },
        onError: () => {
          toast.error("Thêm mới tuyến bay thất bại");
        },
      });
      console.log(newRoute);
    }
  }

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
              // disabled={viewOnly}
              allowClear
              placeholder="Chọn sân bay đi"
              options={airportOptions}
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
              // disabled={viewOnly}
              allowClear
              placeholder="Chọn sân bay đi"
              options={airportOptions}
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
