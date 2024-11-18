import React from 'react';
import {Select as OriginalSelect, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/new-york/ui/select";
import {FormControl} from "@/src/components/new-york/ui/form";

interface SelectProps {
  onValueChange: (value: any) => void;
  defaultValue: any;
  placeholder: string;
  options: React.ReactNode;
  allowNone?: boolean;
}

const Select: React.FC<SelectProps> = ({onValueChange, defaultValue, placeholder, options, allowNone}) => {
  const handleChange = (value: string) => {
    if (value === "empty") {
      onValueChange(null);
    } else {
      onValueChange(value);
    }
  };

  return (
      <OriginalSelect onValueChange={handleChange} defaultValue={defaultValue ?? ""}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder}/>
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {allowNone && <SelectItem key="null" value="empty">{placeholder}</SelectItem>}
          {
            options
          }
        </SelectContent>
      </OriginalSelect>
  );
};

export default Select;