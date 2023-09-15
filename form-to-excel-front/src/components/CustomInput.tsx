import React from "react";
import styled from "styled-components";
import ErrorMsg from "./ErrorMsg";

type detailedHTMLProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface CustomInputProps extends detailedHTMLProps {
  label: string;
  hasError: boolean;
  errorMsg?: string;
}

type CustomInputPropsType = Omit<CustomInputProps, "ref">;

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputPropsType>(
  ({ id, label, placeholder, required, hasError, errorMsg, ...props }, ref) => {
    return (
      <Wrapper>
        <LabelBox>
          <Label htmlFor={id}>{label}</Label>
          {required && <span>*</span>}
        </LabelBox>
        <InputBox>
          <Input id={id} placeholder={placeholder} ref={ref} {...props} />
          {hasError && <ErrorMsg text={errorMsg!} />}
        </InputBox>
      </Wrapper>
    );
  }
);

export default CustomInput;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
`;

const LabelBox = styled.div`
  display: flex;

  span {
    color: red;
    margin-left: 3px;
  }
`;

const Label = styled.label`
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 8px;
  outline: 1px solid var(--lightgray);
  font-size: 1.6rem;

  &:focus-visible {
    border: none;
    outline: 1px solid var(--primary);
  }
`;
