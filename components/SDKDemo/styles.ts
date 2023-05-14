import styled from 'styled-components';
import Button from '../Button'
import Input from "../Input"
import { FeatureHeaderText, FeaturesContainer } from '../common';

interface Props {
  clicked: boolean;
}

interface MenuProps {
  active: string;
}

interface ButtonProps {
  bkg?: boolean;
}

export const MainWrapper = styled(FeaturesContainer)`
  height: 105vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: 40% 85%, 110% 80%;
  background-repeat: no-repeat, no-repeat;
  background-position: -15% 160%, -380% 80%;
  background-image: url('/bkg-squares.svg'), url('bkg-circles.svg');
  margin-top: 0;
`;

export const HeaderText = styled(FeatureHeaderText)`
  margin-bottom: 2rem;
  padding: 0.5rem 2.5rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  @media (min-width: 1024px) {
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (min-width: 1100px) {
      width: 70%;
      margin: auto;
    }
`;

const button_theme = "35, 117, 239";
const button_active = "28, 94, 191";

export const DemoContainer = styled.div`
  margin: 0;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #d3e3fc;
  background: #f2f2f2;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  justify-items: center;

  @media (min-width: 550px) {
    width: 75%;
    margin-top: 1rem;
  }

  @media (min-width: 1024px) {
    width: 75%;
  }


  .upload-button {
    cursor: pointer;
    padding: 1rem;
    border-radius: 8px;
    border: 2px solid rgba(${button_theme}, 0);
    font-size: 12px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-style: normal;
    color: rgb(255, 255, 255);
    background: rgb(${button_theme});
    transition: all .23s ease-in-out;

    &:hover {
      background: rgba(${button_theme}, 0.8);
    }

    &:active {
      background: rgba(${button_active}, 1);
      border-color: rgba(${button_active}, 1);
    }
  }

`;



export const DemoOutput = styled.div`
  margin: 0;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #d3e3fc;
  background: #f2f2f2;
  font-size: 12px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
  @media (min-width: 550px) {
    width: 65%;
    margin-top: 1rem;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
`



export const DemoButton = styled(Button)`
  padding: 1rem;
  font-size: 12px;
`;


export const DemoInput = styled(Input)`
  display: none;
`

