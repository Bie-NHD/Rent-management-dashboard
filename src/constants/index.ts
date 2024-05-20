export * from "./AppRoutes";

export * from "./statusCodes";
// Nice modal ids
export const NM_APARTMENT = "apartment-dlg" as const;
export const NM_WARNING = "warning-dlg" as const;
export const NM_USER_EDIT = "edt-user-dlg" as const;
export const NM_USER_EDIT_ADMIN = "edt-user-dlg-admin" as const;
export const NM_CUSTOMER = "customer-dlg" as const;
export const NM_CONTRACT = "contract-dlg" as const;
export const NM_USER_CREATE = "create-user-dlg" as const;

// Query Keys
export const QK_APARTMENTS = "apartments" as const;
export const QK_CONTRACTS = "contracts" as const;
export const QK_CUSTOMERs = "customers" as const;
export const QK_USERS = "users" as const;
export const QK_ACCOUNT = "account" as const;
export const QK_ACCESS_TOKEN = "access_token" as const;

export const UserRoles = Object.freeze({
  STAFF: "STAFF",
  MANAGER: "MANAGER",
} as const);

export const REGEX_VALID_CITIZENID = new RegExp(/^[0-9]{12}$/g);
export const REGEX_VALID_PHONE_NUMBER = new RegExp(
  /0(3[2-9]|5[689]|7[06-9]|8[1-68-9]|9[0-46-9])[0-9]{7}/g
);
export const REGEX_VALID_USERNAME = new RegExp(/[A-Za-z][A-Za-z0-9_]{4,24}/);
