import dayjs from "dayjs";
import { ObjectSchema, object, string, date } from "yup";
import { REGEX_VALID_CITIZENID, REGEX_VALID_PHONE_NUMBER } from ".";

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
    .matches(REGEX_VALID_PHONE_NUMBER, ({ label }) => `${label} is not valid`),
});
