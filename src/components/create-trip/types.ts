import { SingleValue } from "react-select";

// types.ts
export type PlaceOption = {
    label: string;
    value: string;
  };
  
  export type LocationInputProps = {
    value: SingleValue<PlaceOption>;
    onChange: (value: SingleValue<PlaceOption>) => void;
    className?: string;
  };