import { useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import axios from "axios";
import CustomInput from "../components/CustomInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faRotateLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

interface SupplierFormFields {
  companyName: string;
  representative: string;
  businessNumber: number;
  address: string;
  phone: number;
  fax: string;
}

function Transaction() {
  const [loading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupplierFormFields>();

  const onSubmit = (formData: SupplierFormFields) => {
    exportToExcelFile(formData);
  };

  const exportToExcelFile = async (data: SupplierFormFields) => {
    setIsLoading(true);

    const result = await axios({
      method: "POST",
      url: "http://localhost:4000/api/excel",
      data: data,
    });

    if (result.data.ok) {
      downloadExcelFile(result.data.fileName);
    }
  };

  const downloadExcelFile = async (fileName: string) => {
    const res = await axios({
      method: "GET",
      url: `http://localhost:4000/api/excel/${fileName}`,
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: res.headers["content-type"] })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.xlsx`);
    document.body.appendChild(link);
    link.click();

    setIsLoading(false);
  };

  return (
    <Wrapper>
      <Group>
        <GroupTitle>공급자 정보</GroupTitle>
        <GroupForm onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="상호"
            type="text"
            required={true}
            id="companyName"
            placeholder="상호"
            {...register("companyName", {
              required: "상호를 입력해주세요.",
              maxLength: {
                value: 30,
                message: "최대 30자까지 입력해주세요.",
              },
            })}
            hasError={Boolean(errors.companyName)}
            errorMsg={errors.companyName?.message}
          />
          <CustomInput
            label="대표자"
            type="text"
            required={true}
            id="representative"
            placeholder="대표자"
            {...register("representative", {
              required: "대표자 성명을 입력해주세요.",
              maxLength: {
                value: 30,
                message: "최대 30자까지 입력해주세요.",
              },
            })}
            hasError={Boolean(errors.representative)}
            errorMsg={errors.representative?.message}
          />
          <CustomInput
            label="사업자번호"
            type="text"
            required={true}
            id="businessNumber"
            placeholder="사업자번호"
            {...register("businessNumber", {
              required: "사업자번호를 입력해주세요.",
            })}
            hasError={Boolean(errors.businessNumber)}
            errorMsg={errors.businessNumber?.message}
          />
          <CustomInput
            label="소재지"
            type="text"
            required={true}
            id="address"
            placeholder="사업장 소재지"
            {...register("address", {
              required: "사업장 소재지를 입력해주세요.",
            })}
            hasError={Boolean(errors.address)}
            errorMsg={errors.address?.message}
          />
          <CustomInput
            label="전화번호"
            type="text"
            required={true}
            id="phone"
            placeholder="전화번호"
            {...register("phone", {
              required: "사업장 전화번호를 입력해주세요.",
            })}
            hasError={Boolean(errors.phone)}
            errorMsg={errors.phone?.message}
          />
          <CustomInput
            label="팩스번호"
            type="tel"
            id="fax"
            placeholder="팩스번호"
            {...register("fax")}
            hasError={Boolean(errors.fax)}
            errorMsg={errors.fax?.message}
          />
          <Buttons>
            <Button type="button" onClick={() => reset()}>
              <FontAwesomeIcon icon={faRotateLeft} />
              <span>초기화</span>
            </Button>
            <Button type="submit">
              <FontAwesomeIcon
                icon={loading ? faSpinner : faFileExcel}
                spin={loading ? true : false}
              />
              <span>{loading ? "처리중" : "엑셀 다운로드"}</span>
            </Button>
          </Buttons>
        </GroupForm>
      </Group>
    </Wrapper>
  );
}

export default Transaction;

const Wrapper = styled.div`
  width: 100%;
  max-width: 768px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Group = styled.section`
  max-width: 1024px;
`;

const GroupTitle = styled.h2`
  font-family: "Pretendard-ExtraBold";
  font-size: 2.8rem;
  margin-bottom: 30px;
`;

const GroupForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  padding: 10px;

  ${({ type }) =>
    type === "button" &&
    css`
      background-color: var(--primary);
    `};

  ${({ type }) =>
    type === "submit" &&
    css`
      background-color: var(--excel);
    `};

  color: white;
  border-radius: 8px;

  &:focus-visible {
    outline: 3px solid var(--black);
  }
`;
