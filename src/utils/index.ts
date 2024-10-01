import { blue, green, grey, orange, red } from "@ant-design/colors";
import { SortOrder } from "antd/es/table/interface";
import dayjs from "dayjs";

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
