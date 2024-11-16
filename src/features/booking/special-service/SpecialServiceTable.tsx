import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import {
  Image,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ISpecialServices,
  Module,
  Page,
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
import DeleteSpecialService from "./DeleteSpecialService";
import UpdateSpecialService from "./UpdateSpcecialService";
import ViewSpecialService from "./ViewSpecialService";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface SpecialServiceTableProps {
  specialServicePage?: Page<ISpecialServices>;
  isLoading: boolean;
}

const SpecialServiceTable: React.FC<SpecialServiceTableProps> = ({
  specialServicePage,
  isLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} dịch vụ đặc biệt`,
    },
  }));

  useEffect(() => {
    if (specialServicePage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: specialServicePage.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} dịch vụ đặc biệt`,
        },
      }));
    }
  }, [specialServicePage]);

  const handleTableChange: TableProps<IAirplane>["onChange"] = (
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

  const columns: TableProps<ISpecialServices>["columns"] = [
    {
      title: "ID",
      key: "specialServiceId",
      dataIndex: "specialServiceId",
      width: "3%",
    },
    {
      title: "Ảnh dịch vụ",
      key: "imgUrl",
      dataIndex: "imgUrl",
      width: "10%",
      render: (imgUrl: string) => {
        return (
          <Image
            src={imgUrl}
            alt="meal"
            preview={Boolean(imgUrl)}
            fallback="image-placeholder.svg"
          />
        );
      },
    },
    {
      title: "Tên dịch vụ",
      key: "serviceName",
      dataIndex: "serviceName",
      width: "20%",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: "15%",
      render: (status: ISpecialServices["status"]) => {
        const color = status ? "green" : "red";
        const text = status ? "ACTIVE" : "INACTIVE";
        return <Tag color={color}>{text}</Tag>;
      },
      filters: Object.values([true, false]).map((status: boolean) => ({
        text: status ? "ACTIVE" : "INACTIVE",
        value: status,
      })),
      defaultFilteredValue: getDefaultFilterValue(searchParams, "status"),
      // .map((value) => value === "true"),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      key: "createdAt",
      title: "Ngày cập nhật",
      dataIndex: "createdAt",
      width: "15%",
      render: (updatedAt: string) =>
        updatedAt ? formatTimestamp(updatedAt) : "",
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
      width: "15%",
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
      width: "12%",
      render: (record: ISpecialServices) => (
        <Space>
          <ViewSpecialService specialService={record} />
          <Access
            permission={PERMISSIONS[Module.SPECIAL_SERVICES].UPDATE}
            hideChildren
          >
            <UpdateSpecialService specialService={record} />
          </Access>
          <Access
            permission={PERMISSIONS[Module.SPECIAL_SERVICES].DELETE}
            hideChildren
          >
            <DeleteSpecialService specialServiceId={record.specialServiceId} />
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered={false}
      columns={columns}
      rowKey={(record: ISpecialServices) => record.specialServiceId.toString()}
      pagination={tableParams.pagination}
      dataSource={specialServicePage?.content || []}
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

export default SpecialServiceTable;
