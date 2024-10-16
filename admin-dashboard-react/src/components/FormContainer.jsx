import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

// eslint-disable-next-line react/prop-types
function FormContainer({
  FormProps,
  defaultValues = {},
  validation,
  children,
  onSuccess = () => {},
}) {
  const methods = useForm({
    defaultValues,
    ...(validation ? { resolver: yupResolver(validation) } : {}),
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...methods}
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSuccess)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...FormProps}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default FormContainer;
