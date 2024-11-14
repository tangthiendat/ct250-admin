import { FilterOutlined } from "@ant-design/icons";
import type { DatePickerProps } from "antd";
import {
  Button,
  Col,
  DatePicker,
  Modal,
  Row,
  Select,
  Space,
  message,
} from "antd";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
dayjs.extend(isoWeek);
dayjs.extend(quarterOfYear);

const { Option } = Select;

type PickerType = "date" | "week" | "month" | "quarter" | "year";

const PickerWithType = ({
  type,
  onChange,
  value,
}: {
  type: PickerType;
  onChange: DatePickerProps["onChange"];
  value: string | null;
}) => {
  return (
    // <DatePicker
    //   picker={type}
    //   onChange={onChange}
    //   style={{ width: "100%" }}
    //   value={
    //     value
    //       ? dayjs(
    //           value,
    //           type === "quarter"
    //             ? "YYYY-[Q]Q"
    //             : type === "week"
    //               ? dayjs(value).isoWeekYear() + "-" + dayjs(value).isoWeek()
    //               : undefined,
    //         )
    //       : null
    //   }
    // />

    <DatePicker
      picker={type}
      onChange={onChange}
      style={{ width: "100%" }}
      value={
        value
          ? dayjs(value, type === "quarter" ? "YYYY-[Q]Q" : undefined)
          : null
      }
    />
  );
};

interface SearchDateProps {
  onDateChange: (startDate: string | null, type: string | null) => void;
}

const SearchDate: React.FC<SearchDateProps> = ({ onDateChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState<PickerType>("date");
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (!selectedDate) {
      message.error("Vui lòng chọn thời gian.");
      return;
    }
    if (selectedDate && type) {
      searchParams.set("startDate", selectedDate);
      searchParams.set("type", type);
      setSearchParams(searchParams);
      onDateChange(selectedDate, type);
    }
    setOpen(false);
  };

  const handleClear = () => {
    searchParams.delete("startDate");
    searchParams.delete("type");
    setSearchParams(searchParams);
    setSelectedDate(null);
    onDateChange(null, null);
    setOpen(false);
  };

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      let formattedDate;
      switch (type) {
        // case "week":
        //   formattedDate = date.format("YYYY-[W]WW");
        //   break;
        case "month":
          formattedDate = date.format("YYYY-MM");
          break;
        case "quarter":
          formattedDate = date.format("YYYY-[Q]Q");
          break;
        case "year":
          formattedDate = date.format("YYYY");
          break;
        default:
          formattedDate = Array.isArray(dateString)
            ? dateString.join(",")
            : dateString;
      }
      setSelectedDate(formattedDate);
    }
  };

  const handleTypeChange = (value: PickerType) => {
    setType(value);
    setSelectedDate(null);
  };

  const modalContent = (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Select
            value={type}
            onChange={handleTypeChange}
            style={{ width: "100%" }}
          >
            <Option value="date">Ngày</Option>
            <Option value="month">Tháng</Option>
            <Option value="quarter">Qúy</Option>
            <Option value="year">Năm</Option>
          </Select>
        </Col>
        <Col span={16}>
          <PickerWithType
            type={type}
            onChange={handleDateChange}
            value={selectedDate}
          />
        </Col>
      </Row>
    </div>
  );

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button type="primary" onClick={showModal} icon={<FilterOutlined />}>
          {searchParams.get("startDate") || "Lọc thời gian giao dịch"}
        </Button>
        <Modal
          title="Chọn thời gian"
          open={open}
          onOk={handleOk}
          onCancel={handleClear}
          centered
          okText="Xác nhận"
          cancelText="Bỏ lọc"
        >
          {modalContent}
        </Modal>
      </Space>
    </div>
  );
};

export default SearchDate;
