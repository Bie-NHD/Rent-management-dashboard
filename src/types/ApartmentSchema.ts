import { object, string, number, ObjectSchema } from "yup";

// TODO: add RegEx for sanitizign inputs
/**
 * Yup-powered validation schema
 */
const ApartmentSchema: ObjectSchema<Omit<Apartment, "id">> = object({
  address: string()
    .label("Address")
    .required("Address is required")
    .default(""),
  numberOfRoom: number().label("Number of Rooms").required().min(1).default(1),
  retailPrice: number()
    .label("Retail Price")
    .required()
    .min(100000)
    .default(100000),
});

export default ApartmentSchema;
