import styled from "styled-components";

export const HomeStyles = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const BaseCountDownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
export const StartButtonStyles = styled(BaseCountDownButton)`
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme["gray-100"]};

  :not(:disabled):hover {
    background: ${(props) => props.theme["green-700"]};
  }
`;

export const StopButtonStyles = styled(BaseCountDownButton)`
  background: ${(props) => props.theme["red-500"]};
  color: ${(props) => props.theme["gray-100"]};

  :not(:disabled):hover {
    background: ${(props) => props.theme["red-700"]};
  }
`;
