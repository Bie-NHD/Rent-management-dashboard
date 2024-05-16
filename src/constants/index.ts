export * from "./AppRoutes";

export * from "./statusCodes";
// Nice modal ids
export const NM_APARTMENT = "apartment-dlg" as const;
export const NM_WARNING = "warning-dlg" as const;
export const NM_USER_EDIT = "edt-user-dlg" as const;
export const NM_USER_EDIT_ADMIN = "edt-user-dlg-admin" as const;
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
