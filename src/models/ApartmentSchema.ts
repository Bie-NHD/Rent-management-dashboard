import { object, string, number, date, InferType, ObjectSchema } from "yup";
import IApartmentFormInputs from "./IApartment";
import TApartment from "./TApartment";

// TODO: add RegEx for sanitizign inputs

const ApartmentFormInputSchema: ObjectSchema<IApartmentFormInputs> = object({
  address: string()
    .label("Address")
    .required("Address is required")
    .default(""),
  numberOfRoom: number().label("Number of Rooms").min(1).required().default(1),
  retailPrice: number()
    .label("Retail Price")
    .min(100000)
    .required()
    .default(100000),
});

export default ApartmentFormInputSchema;
