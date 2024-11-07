import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { TableProps } from "antd/lib";
import { FilterFilled } from "@ant-design/icons";
import { GoArrowLeft } from "react-icons/go";
import { feeService } from "../../../services";
import Loading from "../../../common/components/Loading";
import {
  IFeePricing,
  PASSENGER_TYPE_TRANSLATION,
  PassengerType,
  ROUTE_TYPE_TRANSLATION,
  RouteType,
} from "../../../interfaces";
import { colorFilterIcon } from "../../../utils";
import AddFeePricing from "./AddFeePricing";

const FeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: () => feeService.getById(Number(id!)),
    queryKey: ["fees", id],
  });

  if (isLoading) {
    return <Loading />;
  }

  const fee = data?.payload;

  const columns: TableProps<IFeePricing>["columns"] = [
    {
      title: "Loại hành khách",
      dataIndex: "passengerType",
      key: "passengerType",
      width: "15%",
      render: (passengerType: PassengerType) => {
        return PASSENGER_TYPE_TRANSLATION[passengerType];
      },
      filters: Object.keys(PASSENGER_TYPE_TRANSLATION).map((key) => ({
        text: PASSENGER_TYPE_TRANSLATION[key as PassengerType],
        value: key,
      })),
      onFilter: (value, record) => record.passengerType === value,
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      title: "Loại tuyến bay",
      dataIndex: "routeType",
      key: "routeType",
      width: "15%",
      render: (routeType: RouteType) => {
        let color = "";

        switch (routeType) {
          case RouteType.DOMESTIC:
            color = "green";
            break;
          case RouteType.INTERNATIONAL:
            color = "red";
            break;
        }

        return <Tag color={color}>{ROUTE_TYPE_TRANSLATION[routeType]}</Tag>;
      },
      filters: Object.keys(ROUTE_TYPE_TRANSLATION).map((key) => ({
        text: ROUTE_TYPE_TRANSLATION[key as RouteType],
        value: key,
      })),
      onFilter: (value, record) => record.routeType === value,
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      title: "Giá trị",
      dataIndex: "feeAmount",
      key: "feeAmount",
      width: "10%",
      render: (feeAmount: number) => feeAmount.toLocaleString(),
    },
    {
      title: "Đơn vị",
      dataIndex: "isPercentage",
      key: "isPercentage",
      width: "10%",
      render: (isPercentage: boolean) => {
        return isPercentage ? "%" : "VND";
      },
      filters: [
        { text: "%", value: true },
        { text: "VND", value: false },
      ],
      onFilter: (value, record) => record.isPercentage === value,
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "validFrom",
      key: "validFrom",
      width: "20%",
      render: (validFrom: string) => validFrom,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "validTo",
      key: "validTo",
      width: "20%",
      render: (validTo: string) => validTo,
    },
    {
      title: "Hành động",
      key: "action",
      width: "10%",
    },
  ];

  return (
    fee && (
      <div className="h-full">
        <Space align="start" size="small">
          <Tooltip title="Quay lại">
            <Button icon={<GoArrowLeft />} onClick={() => navigate(-1)} />
          </Tooltip>
          <div>
            <div className="mb-1 flex items-center gap-1 text-base font-bold">
              {fee.feeName}
            </div>
            <p className="text-gray-500">{fee.feeGroup.feeGroupName}</p>
          </div>
        </Space>
        <div className="card mt-3 px-6 py-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Chi tiết mức phí</h2>

            <AddFeePricing fee={fee} />
          </div>
          <Table
            rowKey={(record) => record.feePricingId}
            columns={columns}
            dataSource={fee.feePricing}
            pagination={{
              showTotal: (total) => `Tổng số ${total} chi tiết phí`,
              showSizeChanger: true,
            }}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-gray"
            }
            rowHoverable={false}
            size="small"
          />
        </div>
      </div>
    )
  );
};

export default FeeDetails;
