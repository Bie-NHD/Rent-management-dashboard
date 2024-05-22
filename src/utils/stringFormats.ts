/**
 * @param {string} arr
 * @returns {string}
 */
export const formatDate = (arr: string) => `${arr[2]}/${arr[1]}/${arr[0]}`;
/**
 * @param {string} arr
 * @returns {string}
 */
export const formatId = (arr: string) => `${arr.split("-")[0]}...`;

//
//  sanitize https://stackoverflow.com/a/74362432/20423795
//
export function sanitize(input: string) {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;

  return input.replace(reg, (match) => map[match]);
}

export function transformArrayDateToString(arrayDate: ArrayDate): string {
  return Array.call(arrayDate).join("-")
}

export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });

  return formatter.format(value);
};
