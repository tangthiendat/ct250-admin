import { grey, green, blue, red, orange } from "@ant-design/colors";
// import { GetProp, TableProps } from "antd";
import { SorterResult, SortOrder } from "antd/es/table/interface";

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

export function createSortParams<T>(
  sorter: SorterResult<T> | SorterResult<T>[],
) {
  const sortRecord: { field: string; order: string }[] = [];
  if (Array.isArray(sorter)) {
    sorter.forEach(({ field, order }) => {
      sortRecord.push({
        field: field as string,
        order: order === "ascend" ? "asc" : order === "descend" ? "desc" : "",
      });
    });
  } else {
    if (sorter.field) {
      sortRecord.push({
        field: sorter.field as string,
        order:
          sorter.order === "ascend"
            ? "asc"
            : sorter.order === "descend"
              ? "desc"
              : "",
      });
    }
  }
  return sortRecord
    .map((sort) => (sort.order ? `${sort.field},${sort.order}` : ""))
    .filter((sort) => Boolean(sort))
    .join(";");
}

export function getDefaultSortOrder(
  searchParams: URLSearchParams,
  columnKey: string,
): SortOrder | undefined {
  const sortParams = searchParams.get("sort");
  if (!sortParams) return undefined;
  const sortRecord = sortParams.split(";");
  if (sortRecord.length === 0) return undefined;
  else if (sortRecord.length === 1) {
    const [field, order] = sortRecord[0].split(",");
    return field === columnKey
      ? order === "asc"
        ? "ascend"
        : "descend"
      : undefined;
  } else {
    const sort = sortRecord.find((sort) => sort.split(",")[0] === columnKey);
    return sort
      ? sort.split(",")[1] === "asc"
        ? "ascend"
        : "descend"
      : undefined;
  }
}

export function getDefaultFilterValue(
  searchParams: URLSearchParams,
  key: string,
): string[] | undefined {
  const value = searchParams.get(key);
  return value ? value.split(",") : undefined;
}
