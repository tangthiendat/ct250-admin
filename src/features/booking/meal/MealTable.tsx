import { Image, Space, Table, TablePaginationConfig, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { IMeal, Module, Page } from "../../../interfaces";
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
      width: "5%",
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
      width: "15%",
    },
    {
      title: "Giá món ăn",
      key: "price",
      dataIndex: "price",
      width: "10%",
      render: (price: number) => price.toLocaleString(),
    },

    {
      key: "createdAt",
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: "10%",
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
      width: "10%",
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
      width: "10%",
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
    />
  );
};

export default MealTable;
