import React, { memo } from 'react';
import { FormField } from "@/src/components/new-york/ui/form";

type FormFieldWrapperProps = {
  control: any;
  name: string;
  render: (props: any) => React.ReactElement;
};

/**
 * A memoized wrapper around FormField to prevent unnecessary rerenders
 */
const FormFieldWrapper = memo(({ control, name, render }: FormFieldWrapperProps) => {
  return <FormField control={control} name={name} render={render} />;
});

FormFieldWrapper.displayName = 'FormFieldWrapper';

export default FormFieldWrapper;
