import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import { Space, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  COUPON_TYPE_TRANSLATION,
  ICoupons,
  Page,
  PERMISSIONS,
} from "../../../interfaces";
import { CouponType, Module } from "../../../interfaces/common/enums";
import {
  colorFilterIcon,
  colorSortDownIcon,
  colorSortUpIcon,
  formatTimestamp,
  getDefaultFilterValue,
  getDefaultSortOrder,
  getSortDirection,
  isInDateRange,
} from "../../../utils";
import Access from "../../auth/Access";
import DeleteCoupon from "./DeleteCoupon";
import UpdateCoupon from "./UpdateCoupon";
import ViewCoupon from "./ViewCoupon";

interface TableParams {
  pagination: TablePaginationConfig;
}

interface CouponTableProps {
  couponPage?: Page<ICoupons>;
  isLoading: boolean;
}

const CouponTable: React.FC<CouponTableProps> = ({ couponPage, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState<TableParams>(() => ({
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("pageSize")) || 10,
      showSizeChanger: true,
      showTotal: (total) => `Tổng ${total} số mã giảm giá`,
    },
  }));

  useEffect(() => {
    if (couponPage) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: couponPage.meta?.total || 0,
          showTotal: (total) => `Tổng ${total} số mã giảm giá`,
        },
      }));
    }
  }, [couponPage]);

  const handleTableChange: TableProps<ICoupons>["onChange"] = (
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

  const columns: TableProps<ICoupons>["columns"] = [
    {
      title: "Id",
      key: "couponId",
      dataIndex: "couponId",
      width: "5%",
    },
    {
      title: "Mã giảm giá",
      key: "couponCode",
      dataIndex: "couponCode",
      width: "20%",
    },
    {
      title: "Giá trị mã giảm",
      key: "currentValue",
      dataIndex: "discountValue",
      width: "15%",
      render: (currentValue: number, record: ICoupons) => {
        const isValid = isInDateRange(
          dayjs().tz().format("YYYY-MM-DD"),
          record.validFrom,
          record.validTo,
        );
        return isValid ? currentValue.toLocaleString() : "Mã giảm giá hết hạn ";
      },
    },
    {
      title: "Loại mã giảm giá",
      key: "couponType",
      dataIndex: "couponType",
      width: "15%",
      render: (couponType: ICoupons["couponType"]) => {
        let color = "";

        switch (couponType) {
          case CouponType.AMOUNT:
            color = "green";
            break;
          case CouponType.PERCENTAGE:
            color = "red";
            break;
        }

        return <Tag color={color}>{COUPON_TYPE_TRANSLATION[couponType]}</Tag>;
      },
      filters: Object.values(CouponType).map((couponType: CouponType) => ({
        text: COUPON_TYPE_TRANSLATION[couponType],
        value: couponType,
      })),
      defaultFilteredValue: getDefaultFilterValue(searchParams, "couponType"),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
    },
    {
      title: "Số lượng",
      key: "maxUsage",
      dataIndex: "maxUsage",
      width: "15%",
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
      render: (record: ICoupons) => (
        <Space>
          <ViewCoupon coupon={record} />
          <Access permission={PERMISSIONS[Module.COUPONS].UPDATE} hideChildren>
            <UpdateCoupon coupon={record} />
          </Access>
          <Access permission={PERMISSIONS[Module.COUPONS].DELETE} hideChildren>
            <DeleteCoupon couponId={record.couponId} />
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered={false}
      columns={columns}
      rowKey={(record: ICoupons) => record.couponId}
      pagination={tableParams.pagination}
      dataSource={couponPage?.content || []}
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

export default CouponTable;
