import React, { useState } from "react";
import { apartmentSchema } from "../../constants/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateApartment } from "../../hooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import RHFOutlinedTextField from "../../components/inputs/RHFTextField";
import PageHeader from "../../components/PageHeader";
import { Box, Button } from "@mui/material";

const CreateApartment = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/apartments";
  const client = useQueryClient();
  const { mutate } = useCreateApartment(client)({
    onSuccess(data) {
      if (data.statusCode == 200 || data.statusCode == 201) {
        toast.success(data.message);
        navigate(from);
      } else {
        console.log(data.statusCode, data.message);
        setErrors(data.message);
      }
    },
  });
  const navigate = useNavigate();
  const [_errors, setErrors] = useState("");
  const { handleSubmit, control } = useForm<Omit<Apartment, "id">>({
    defaultValues: apartmentSchema.getDefault(),
    resolver: yupResolver<Omit<Apartment, "id">>(apartmentSchema),
  });

  const onSubmitNew: SubmitHandler<Omit<Apartment, "id">> = async (
    data, //TFieldValues
    event
  ) => {
    event?.preventDefault();
    const processToast = toast.loading("Processing...");
    await mutate(data);
    toast.remove(processToast);
  };
  return (
    <>
      <PageHeader>New Customer</PageHeader>
      {!!_errors && <Box sx={{ border: "solid red 1px", color: "red" }}>{_errors}</Box>}
      <form onSubmit={handleSubmit(onSubmitNew)}>
        <RHFOutlinedTextField
          variant="outlined"
          name="address"
          label="Address"
          control={control}
          margin="dense"
        />
        <RHFOutlinedTextField
          variant="outlined"
          name="retailPrice"
          label="Retail Price"
          type="number"
          control={control}
          // TODO: Mask / Format currency
          inputProps={{ step: 1000, format: "###.###.###" }}
          margin="dense"
        />
        <RHFOutlinedTextField
          variant="outlined"
          name="numberOfRoom"
          label="Number of rooms"
          type="number"
          control={control}
          inputProps={{ min: 1 }}
          margin="dense"
        />

        <Box>
          <Button onClick={() => navigate(from)}>Go back</Button>
          <Button type="submit" variant="contained" disableElevation>
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateApartment;
