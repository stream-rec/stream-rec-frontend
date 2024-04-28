import {Control} from "react-hook-form";
import React from "react";

export interface FormFieldProps {
  controlPrefix?: string;
  control: Control<any>;
  name: string;
  description: string | React.ReactNode;
  allowNull?: boolean;
}