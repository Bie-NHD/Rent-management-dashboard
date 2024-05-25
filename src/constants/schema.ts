import dayjs from "dayjs";
import { ObjectSchema, object, string, date, ref } from "yup";
import { REGEX_VALID_CITIZENID, REGEX_VALID_PHONE_NUMBER } from ".";
import { ChangePasswordProps } from "../types/props";

export const customerInputsSchema: ObjectSchema<
  Omit<CustomerUpdateDTO, "dob"> & {
    dob: Date;
  }
> = object({
  address: string().required().default(""),
  fullName: string().required().default(""),
  citizenId: string()
    .matches(REGEX_VALID_CITIZENID, ({ label }) => `${label} is not valid`)
    .length(12)
    .required()
    .default("")
    .label("Citizen Id"),
  dob: date()
    .required()
    .default(dayjs().subtract(1, "day").toDate())
    .max(dayjs().subtract(1, "day").toDate()),
  phoneNumber: string()
    .required()
    .default("")
    .label("Phone number")
    .length(10)
    // TODO: trim phoneNum inputs
    .matches(REGEX_VALID_PHONE_NUMBER, ({ label }) => `${label} is not valid`),
});

export const changePasswordSchema: ObjectSchema<ChangePasswordProps> = object().shape({
  currentPassword: string().required().default("").label("Current password"),
  newPassword: string()
    .label("New password")
    .ensure()
    .when("currentPassword", {
      is: (value: string) => value != "",
      then: (schema) =>
        schema
          .required()
          .test(
            "newPassword_check",
            "New password must be different from current password",
            function (value: string, context) {
              return context.parent["currentPassword"] != value;
            }
          ),
    }),
  repeatNewPassword: string()
    .label("Repeat password")
    .ensure()
    .when("newPassword", {
      is: (value: string) => value != "",
      then: (schema) =>
        schema.required().oneOf([ref("newPassword")], ({ label }) => `${label} doesn't match.`),
    }),
});

// TODO: update contract validation
// endDate must be after startDate, gap = min 1 month
export const createContractSchema: ObjectSchema<ContractInputs> = object({
  apartmentId: string().required().default(""),
  customerId: string().required().default(""),
  startDate: date().required().default(new Date()),
  endDate: date()
    .required()
    .default(new Date())
    .test(
      "isOneMonthAfter",
      ({ label }) => `${label} should be 1 month after`,
      (v, context) => {
        const oneMonthAfter = dayjs(context.parent.startDate).add(1, "month");
        return dayjs(v).isAfter(oneMonthAfter, "day") || dayjs(v).isSame(oneMonthAfter, "day");
      }
    ),
  // customer
});
