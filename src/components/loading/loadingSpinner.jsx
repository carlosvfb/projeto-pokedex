import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => {
    return (
        <SpinnerContainer>
            <PokeBall />
        </SpinnerContainer>
    );
};

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const PokeBall = styled.div`
    width: 100px;
    height: 100px;
    background: radial-gradient(circle at 50% 50%, ${({ theme }) => theme.toggleBorder} 50%, ${({ theme }) => theme.text} 51%, ${({ theme }) => theme.text} 52%, ${({ theme }) => theme.toggleBorder} 53%);
    border-radius: 50%;
    position: relative;
    animation: ${spin} 1s linear infinite;

    &::before {
        content: '';
        position: absolute;
        top: 45%;
        left: 10%;
        width: 80%;
        height: 10%;
        background: ${({ theme }) => theme.text};
        z-index: 1;
    }

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        background: ${({ theme }) => theme.text};
        border: 5px solid black;
        border-radius: 50%;
        z-index: 2;
    }
`;

export default LoadingSpinner;
