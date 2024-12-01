import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import { Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Gender,
  GENDER_TRANSLATION,
  IPassenger,
  Module,
  Page,
  PASSENGER_TYPE_TRANSLATION,
  PassengerType,
  PERMISSIONS,
} from "../../../interfaces";
import {
  colorFilterIcon,
  colorSortDownIcon,
  colorSortUpIcon,
  formatTimestamp,
  getDefaultFilterValue,
  getDefaultSortOrder,
  getSortDirection,
} from "../../../utils";
import Access from "../../auth/Access";
import DeletePassenger from "./DeletePassenger";
import UpdatePassenger from "./UpdatePassenger";
import ViewPassenger from "./ViewPassenger";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface PassengerTableProps {
  passengerPage?: Page<IPassenger>;
  isLoading: boolean;
}

const PassengerTable: React.FC<PassengerTableProps> = ({
  passengerPage,
  isLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} vé`,
    },
  }));

  useEffect(() => {
    if (passengerPage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: passengerPage.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} khách hàng`,
        },
      }));
    }
  }, [passengerPage]);

  const handleTableChange: TableProps<IPassenger>["onChange"] = (
    pagination,
    filters,
    sorter,
  ) => {
    setTableParams((prev) => ({
      ...prev,
      pagination,
      sorter,
      filters,
    }));
    searchParams.set("page", String(pagination.current));
    searchParams.set("pageSize", String(pagination.pageSize));

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          searchParams.set(key, value.join(","));
        } else {
          if (value) {
            searchParams.set(key, `${value}`);
          } else {
            searchParams.delete(key);
          }
        }
      });
    }

    let sortBy;
    let direction;

    if (sorter) {
      if (Array.isArray(sorter)) {
        sortBy = sorter[0].field as string;
        direction = getSortDirection(sorter[0].order as string);
      } else {
        sortBy = sorter.field as string;
        direction = getSortDirection(sorter.order as string);
      }
    }

    if (sortBy && direction) {
      searchParams.set("sortBy", sortBy);
      searchParams.set("direction", direction);
    } else {
      searchParams.delete("direction");
      searchParams.delete("sortBy");
    }

    setSearchParams(searchParams);
  };

  const columns: TableProps<IPassenger>["columns"] = [
    {
      title: "Họ tên khách hàng",
      key: "fullName",
      dataIndex: ["firstName", "lastName"],
      width: "6%",
      render: (text, record: IPassenger) =>
        record ? `${record.lastName} ${record.firstName}` : "",
    },
    {
      title: "Nhóm khách hàng",
      key: "passengerGroup",
      dataIndex: "passengerGroup",
      width: "5%",
    },
    {
      title: "Loại khách hàng",
      key: "passengerType",
      dataIndex: "passengerType",
      width: "3%",
      render: (passengerType: IPassenger["passengerType"]) => {
        let color = "";
        switch (passengerType) {
          case PassengerType.ADULT:
            color = "green";
            break;
          case PassengerType.CHILD:
            color = "blue";
            break;
          case PassengerType.INFANT:
            color = "orange";
            break;
        }
        return (
          <Tag color={color}>
            {PASSENGER_TYPE_TRANSLATION[passengerType as PassengerType]}
          </Tag>
        );
      },
      filters: Object.values(PassengerType).map(
        (passengerType: PassengerType) => ({
          text: PASSENGER_TYPE_TRANSLATION[passengerType],
          value: passengerType,
        }),
      ),
      defaultFilteredValue: getDefaultFilterValue(
        searchParams,
        "passengerType",
      ),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      title: "Giới tính",
      key: "gender",
      dataIndex: "gender",
      width: "3%",
      render: (gender: IPassenger["gender"]) => {
        let color = "";

        switch (gender) {
          case Gender.MALE:
            color = "blue";
            break;
          case Gender.FEMALE:
            color = "pink";
            break;
          case Gender.OTHER:
            color = "purple";
            break;
        }

        return <Tag color={color}>{GENDER_TRANSLATION[gender as Gender]}</Tag>;
      },
      filters: Object.values(Gender).map((gender: Gender) => ({
        text: GENDER_TRANSLATION[gender],
        value: gender,
      })),
      defaultFilteredValue: getDefaultFilterValue(searchParams, "status"),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      key: "createdAt",
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: "5%",
      render: (createdAt: string) =>
        createdAt ? formatTimestamp(createdAt) : "",
      sorter: true,
      defaultSortOrder: getDefaultSortOrder(searchParams, "createdAt"),
      sortIcon: ({ sortOrder }) => (
        <div className="flex flex-col text-[10px]">
          <CaretUpFilled style={{ color: colorSortUpIcon(sortOrder) }} />
          <CaretDownFilled style={{ color: colorSortDownIcon(sortOrder) }} />
        </div>
      ),
    },
    {
      key: "updatedAt",
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      width: "5%",
      render: (updatedAt: string) =>
        updatedAt ? formatTimestamp(updatedAt) : "",
      sorter: true,
      defaultSortOrder: getDefaultSortOrder(searchParams, "updatedAt"),
      sortIcon: ({ sortOrder }) => (
        <div className="flex flex-col text-[10px]">
          <CaretUpFilled style={{ color: colorSortUpIcon(sortOrder) }} />
          <CaretDownFilled style={{ color: colorSortDownIcon(sortOrder) }} />
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: "2%",
      render: (record: IPassenger) => (
        <Space>
          <ViewPassenger passenger={record} />
          <Access
            permission={PERMISSIONS[Module.PASSENGERS].UPDATE}
            hideChildren
          >
            <UpdatePassenger passenger={record} />
          </Access>
          <Access
            permission={PERMISSIONS[Module.PASSENGERS].DELETE}
            hideChildren
          >
            <DeletePassenger passengerId={record.passengerId} />
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered={false}
      columns={columns}
      rowKey={(record: IPassenger) => record.passengerId}
      pagination={tableParams.pagination}
      dataSource={passengerPage?.content || []}
      rowClassName={(_, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-gray"
      }
      rowHoverable={false}
      loading={{
        spinning: isLoading,
        tip: "Đang tải dữ liệu...",
      }}
      onChange={handleTableChange}
      size="small"
    />
  );
};

export default PassengerTable;
