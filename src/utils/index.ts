import { grey, green, blue, red, orange } from "@ant-design/colors";
import { GetProp, TableProps } from "antd";
import { SorterResult, SortOrder } from "antd/es/table/interface";
import { sfAnd, sfIn, sfLike } from "spring-filter-query-builder";

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

export function createFilterParams(
  filters: Parameters<GetProp<TableProps, "onChange">>[1],
) {
  const filterRecords = Object.entries(filters)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length >= 2) return sfIn(key, value as string[]);
        if (value.length === 1) return sfLike(key, `${value[0]}`);
      }
      return value ? sfLike(key, `${value}`) : "";
    })
    .filter((filter) => Boolean(filter)); //loai bo chuoi rong
  return sfAnd(filterRecords).toString();
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

// export function parseSortParams<T>(
//   sortParams: string,
// ): SorterResult<T>[] | SorterResult<T> {
//   const sortRecord = sortParams.split(";");
//   const sorter: SorterResult<T>[] = [];
//   if (sortRecord.length === 0) return sorter;
//   else if (sortRecord.length === 1) {
//     const [field, order] = sortRecord[0].split(",");
//     return {
//       field,
//       columnKey: field,
//       order: order === "asc" ? "ascend" : order === "desc" ? "descend" : null,
//     };
//   } else {
//     sortRecord.forEach((sort) => {
//       const [field, order] = sort.split(",");
//       sorter.push({
//         field,
//         columnKey: field,
//         order: order === "asc" ? "ascend" : order === "desc" ? "descend" : null,
//       });
//     });
//     return sorter;
//   }
// }

// export function getDefaultSortOrder<T>(
//   sorter: SorterResult<T> | SorterResult<T>[],
//   columnKey: string,
// ): SortOrder | undefined {
//   if (Array.isArray(sorter)) {
//     const sort = sorter.find((sort) => sort.field === columnKey);
//     return sort ? sort.order : undefined;
//   } else {
//     return sorter.field === columnKey ? sorter.order : undefined;
//   }
// }

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
