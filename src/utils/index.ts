import { blue, green, grey, orange, red } from "@ant-design/colors";
import { SortOrder } from "antd/es/table/interface";
import dayjs from "dayjs";
import { FileType, TicketClassName } from "../interfaces";

export function colorMethod(method: "GET" | "POST" | "PUT" | "DELETE") {
  switch (method) {
    case "POST":
      return green[6];
    case "PUT":
      return orange[6];
    case "GET":
      return blue[6];
    case "DELETE":
      return red[6];
    default:
      return grey[10];
  }
}

export function colorTicketClassName(ticketClassName: string) {
  switch (ticketClassName) {
    case TicketClassName.ECONOMY:
      return "#15803D";
    case TicketClassName.BUSINESS:
      return "#1E40AF";
  }
}

export function colorFilterIcon(filtered: boolean) {
  return filtered ? "#3b82f6" : "#fff";
}

export function colorSortUpIcon(sortOrder: SortOrder | undefined) {
  return sortOrder === "ascend" ? "#3b82f6" : "#fff";
}

export function colorSortDownIcon(sortOrder: SortOrder | undefined) {
  return sortOrder === "descend" ? "#3b82f6" : "#fff";
}

export function groupBy<T, K>(
  list: T[],
  keyGetter: (item: T) => K,
): Map<K, T[]> {
  const map = new Map<K, T[]>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function getDefaultSortOrder(
  searchParams: URLSearchParams,
  columnKey: string,
): SortOrder | undefined {
  const sortBy = searchParams.get("sortBy");
  const direction = searchParams.get("direction");

  if (sortBy === columnKey) {
    return direction === "asc"
      ? "ascend"
      : direction === "desc"
        ? "descend"
        : undefined;
  }
  return undefined;
}

export function getSortDirection(sortOrder: string): string | undefined {
  return sortOrder === "ascend"
    ? "asc"
    : sortOrder === "descend"
      ? "desc"
      : undefined;
}

export function getDefaultFilterValue(
  searchParams: URLSearchParams,
  key: string,
): string[] | undefined {
  const value = searchParams.get(key);
  return value ? value.split(",") : undefined;
}

export function formatTimestamp(timestamp: string) {
  return dayjs(timestamp).format("DD-MM-YYYY HH:mm:ss");
}

export async function getBase64(file: FileType): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function getFormattedDuration(durationInMinutes: number): string {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  return minutes === 0 ? `${hours} giờ` : `${hours} giờ ${minutes} phút`;
}
