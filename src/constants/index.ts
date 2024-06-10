export * from "./AppRoutes";

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
export const QK_STAT_APARMENT = "QK_STAT_APARMENT" as const;
export const QK_STAT_CUSTOMER = "QK_STAT_CUSTOMER" as const;
export const QK_STAT_USER = "QK_STAT_USER" as const;

export const UserRoles = Object.freeze({
  STAFF: "STAFF",
  MANAGER: "MANAGER",
} as const);

// REGEX
export const REGEX_VALID_CITIZENID = new RegExp(/^[0-9]{12}$/g);
export const REGEX_VALID_PHONE_NUMBER = new RegExp(
  /0(3[2-9]|5[689]|7[06-9]|8[1-68-9]|9[0-46-9])[0-9]{7}/g
);
export const REGEX_VALID_USERNAME = new RegExp(/[A-Za-z][A-Za-z0-9_]{4,24}/);

// STATUS CODES
export const StatusCode = Object.freeze({
  OK: [200, 201],
  Error: 400,
});
export const REGEX_VALID_ADDRESS = new RegExp(/^[a-zA-Z0-9,/]+$/g);
