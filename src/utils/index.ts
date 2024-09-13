import { grey, green, blue, red, orange } from "@ant-design/colors";

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
