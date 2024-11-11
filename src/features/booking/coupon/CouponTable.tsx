import {
  CaretDownFilled,
  CaretUpFilled,
  FilterFilled,
} from "@ant-design/icons";
import { Table, TablePaginationConfig, TableProps, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { COUPON_TYPE_TRANSLATION, ICoupons, Page } from "../../../interfaces";
import { CouponType } from "../../../interfaces/common/enums";
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
      width: "20%",
      render: () => {
        const currentValue = couponPage?.content.find((value) =>
          isInDateRange(
            dayjs().tz().format("YYYY-MM-DD"),
            value.validFrom,
            value.validTo,
          ),
        );
        return currentValue?.discountValue.toLocaleString();
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
    // {
    //   title: "Giá trị mã giảm",
    //   key: "currentValueAndType",
    //   dataIndex: "discountValue",
    //   width: "35%",
    //   render: (record) => {
    //     const currentValue = couponPage?.content.find((pricing) =>
    //       isInDateRange(
    //         dayjs().tz().format("YYYY-MM-DD"),
    //         pricing.validFrom,
    //         pricing.validTo,
    //       ),
    //     );

    //     let color = "";
    //     switch (record.couponType) {
    //       case CouponType.AMOUNT:
    //         color = "green";
    //         break;
    //       case CouponType.PERCENTAGE:
    //         color = "red";
    //         break;
    //     }

    //     return (
    //       <>
    //         <div>{currentValue?.discountValue.toLocaleString()}</div>
    //         <Tag color={color}>
    //           {COUPON_TYPE_TRANSLATION[record.couponType]}
    //         </Tag>
    //       </>
    //     );
    //   },
    //   filters: Object.values(CouponType).map((couponType: string) => ({
    //     text: COUPON_TYPE_TRANSLATION[couponType as CouponType],
    //     value: couponType,
    //   })),
    //   defaultFilteredValue: getDefaultFilterValue(searchParams, "couponType"),
    //   filterIcon: (filtered) => (
    //     <FilterFilled style={{ color: colorFilterIcon(filtered) }} />
    //   ),
    // },
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
    // {
    //   title: "Hành động",
    //   key: "action",
    //   render: (record: ICoupons) => (
    //     <Space>
    //       <ViewCoupon baggage={record} />
    //       <Access permission={PERMISSIONS[Module.CouponS].UPDATE} hideChildren>
    //         <UpdateCoupon Coupon={record} />
    //       </Access>
    //       <Access permission={PERMISSIONS[Module.CouponS].DELETE} hideChildren>
    //         <DeleteCoupon CouponId={record.CouponId} />
    //       </Access>
    //     </Space>
    //   ),
    // },
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
