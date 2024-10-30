import {
  Image,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { IMeal, IMealPricing, Module, Page } from "../../../interfaces";
import { PERMISSIONS } from "../../../interfaces/common/constants";
import {
  colorSortDownIcon,
  colorSortUpIcon,
  formatTimestamp,
  getDefaultSortOrder,
  getSortDirection,
} from "../../../utils";
import Access from "../../auth/Access";
import DeleteMeal from "./DeleteMeal";
import UpdateMeal from "./UpdateMeal";
import dayjs from "dayjs";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface MealTableProps {
  mealPage?: Page<IMeal>;
  isLoading: boolean;
}

const MealTable: React.FC<MealTableProps> = ({ mealPage, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} món ăn`,
    },
  }));

  useEffect(() => {
    if (mealPage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: mealPage.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} món ăn`,
        },
      }));
    }
  }, [mealPage]);

  const handleTableChange: TableProps<IMeal>["onChange"] = (
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

  const columns: TableProps<IMeal>["columns"] = [
    {
      title: "ID",
      key: "mealId",
      dataIndex: "mealId",
      width: "3%",
    },
    {
      title: "Ảnh món ăn",
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
      title: "Tên món ăn",
      key: "mealName",
      dataIndex: "mealName",
      width: "20%",
    },
    {
      title: "Giá hiện hành",
      key: "currentPrice",
      dataIndex: "mealPricing",
      width: "20%",
      render: (mealPricing: IMealPricing[]) => {
        const currentPrice = mealPricing.find((pricing) => pricing.isActive);
        return currentPrice?.price.toLocaleString();
      },
    },

    {
      key: "createdAt",
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: "15%",
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
      render: (record: IMeal) => (
        <Space>
          <Access permission={PERMISSIONS[Module.MEALS].UPDATE} hideChildren>
            <UpdateMeal meal={record} />
          </Access>
          <Access permission={PERMISSIONS[Module.MEALS].DELETE} hideChildren>
            <DeleteMeal mealId={record.mealId} />
          </Access>
        </Space>
      ),
    },
  ];

  const expandColumns: TableProps<IMealPricing>["columns"] = [
    {
      title: "ID",
      key: "mealPricingId",
      dataIndex: "mealPricingId",
      width: "10%",
    },
    {
      title: "Giá",
      key: "price",
      dataIndex: "price",
      width: "20%",
      render: (price: number) => price.toLocaleString(),
    },
    {
      title: "Ngày bắt đầu",
      key: "validFrom",
      dataIndex: "validFrom",
      width: "20%",
      render: (validFrom: string) => dayjs(validFrom).format("YYYY-MM-DD"),
    },
    {
      title: "Ngày kết thúc",
      key: "validTo",
      dataIndex: "validTo",
      width: "20%",
      render: (validTo: string) => dayjs(validTo).format("YYYY-MM-DD"),
    },
    {
      title: "Trạng thái",
      key: "isActive",
      dataIndex: "isActive",
      width: "20%",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
  ];

  return (
    <Table
      bordered={false}
      columns={columns}
      rowKey={(record: IMeal) => record.mealId}
      pagination={tableParams.pagination}
      dataSource={mealPage?.content || []}
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
      expandable={{
        columnWidth: "5%",
        expandedRowRender: (record: IMeal) => (
          <Table
            columns={expandColumns}
            dataSource={record.mealPricing}
            pagination={false}
            size="small"
          />
        ),
        expandIcon: ({ expanded, onExpand, record }) => (
          <Tooltip
            title={expanded ? "Đóng chi tiết giá" : "Hiển thị chi tiết giá"}
          >
            {expanded ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onExpand(record, e);
                }}
                type="button"
                className="ant-table-row-expand-icon ant-table-row-expand-icon-expanded"
                aria-label="Thu gọn dòng"
                aria-expanded="true"
              ></button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onExpand(record, e);
                }}
                type="button"
                className="ant-table-row-expand-icon ant-table-row-expand-icon-collapsed"
                aria-label="Mở rộng dòng"
                aria-expanded="false"
              ></button>
            )}
          </Tooltip>
        ),
      }}
    />
  );
};

export default MealTable;
