import { FormControl, Input } from "native-base";
import React from "react";
import { Controller } from "react-hook-form";

interface props {
  name: string;
  label: string;
  control: any;
  type?: string;
  formControlStyle?: object;
  inputStyle?: object;
}
export const CustomInput: React.FC<props> = ({
  name,
  label,
  type = "text",
  control,
  formControlStyle,
  inputStyle,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl style={formControlStyle}>
              {/* <FormControl.Label>
          <Text color="blueGray.500" fontFamily={"montserrat"}>
            {label}
          </Text>
        </FormControl.Label> */}
              <Input
                value={value}
                onChangeText={onChange}
                py={5}
                roundedRight={0}
                autoCapitalize="none"
                placeholder={label}
                textAlign={"right"}
                fontSize={"lg"}
                backgroundColor="#FFFCF7"
                fontFamily={"montserrat"}
                borderWidth={1}
                borderColor="gray.200"
                rounded={"lg"}
                type={type}
              />
            </FormControl>
          );
        }}
      />
    </>
  );
};
