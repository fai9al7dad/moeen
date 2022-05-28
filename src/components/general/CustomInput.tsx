import { FormControl, Input, Text } from "native-base";
import React from "react";
import { Controller } from "react-hook-form";

interface props {
  name: string;
  label?: string;
  control: any;
  type?: string;
  formControlStyle?: object;
  inputStyle?: object;
  topLabel?: string;
  rules?: object;
  isRequired?: boolean;
  hideRoundedRight?: boolean;
}
export const CustomInput: React.FC<props> = ({
  name,
  label,
  type = "text",
  control,
  formControlStyle,
  isRequired = true,
  rules,
  topLabel,
  hideRoundedRight = false,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules ? rules : { required: isRequired }}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl style={formControlStyle}>
              {topLabel ? (
                <FormControl.Label>
                  <Text color="gray.400" fontFamily={"montserrat"}>
                    {topLabel}
                  </Text>
                </FormControl.Label>
              ) : null}
              <Input
                value={value}
                onChangeText={onChange}
                py={5}
                autoCapitalize="none"
                placeholder={label}
                textAlign={"right"}
                fontSize={"lg"}
                backgroundColor="#FFFCF7"
                fontFamily={"montserrat"}
                borderWidth={1}
                borderColor="gray.200"
                roundedRight={hideRoundedRight ? 0 : "lg"}
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
