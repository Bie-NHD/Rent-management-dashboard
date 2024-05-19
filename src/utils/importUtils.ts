import { StatusCode } from "../constants";

export function checkChangesFromImportResponse(response: ApiResponse<ImportResponse>) {
  const isSuccess = StatusCode.OK.includes(response.statusCode);
  let isChanged = false;

  for (let data of response.data) {
    if (data["Number of successful rows"] > 0) {
      isChanged = true;
      break;
    }
  }

  return { isSuccess, isChanged };
}
