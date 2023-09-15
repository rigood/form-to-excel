import styled from "styled-components";

interface ErrorMsgProps {
  text: string;
}

const ErrorMsg = ({ text }: ErrorMsgProps) => {
  return <Wrapper>{text}</Wrapper>;
};

export default ErrorMsg;

const Wrapper = styled.div`
  font-size: 14px;
  color: var(--primary);
`;
