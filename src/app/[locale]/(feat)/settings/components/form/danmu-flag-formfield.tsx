import {Control} from "react-hook-form";
import React from "react";
import {FlagFormField} from "@/src/app/[locale]/(feat)/settings/components/form/flag-form-field";

type DanmuFlagFormfieldProps = {
  controlPrefix?: string;
  control: Control<any>;
  title?: string;
  description?: string | React.ReactNode;
}

export function DanmuFlagFormfield({controlPrefix, control, title, description}: DanmuFlagFormfieldProps) {

  return <FlagFormField control={control} fieldName={"danmu"} controlPrefix={controlPrefix} title={title}
                        description={description}
                        ariaLabel={"Danmu switch"}/>
}