import styled from 'styled-components';
import Button from '../Button'
import { FeaturesContainer } from '../common';


export const MainWrapper = styled(FeaturesContainer)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  background-size: 40% 85%, 110% 80%;
  background-repeat: no-repeat, no-repeat;
  background-position: -15% 160%, -380% 80%;
  background-image: url('/bkg-squares.svg'), url('bkg-circles.svg');
  margin-top: 0;
  overflow: auto; 
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 4.5em; 
  width: 90vw;
`;



export const IntroSection = styled.div`
  width: 100%;
  padding: 20px;
  text-align: center;
  color: #333;
  line-height: 1.5;
  margin-top: 20vh;

  h2 {
    font-size: 2em;
    margin-bottom: 1em;
  }

  p {
    font-size: 1.2em;
    margin-bottom: 2em;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
`;
export const GetDataButton = styled(Button)`
`;





export const UserHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  background: rgb(242, 242, 242);
  border: 1px solid rgb(211, 227, 252);
  margin-top: 20px;

  img {
    border-radius: 50%;
  }

  span {
    margin: 0;
    word-break: break-all;
  }


`;



export const DataContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  gap: 1rem;
`;





export const TopLeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 60%;
  gap: 1rem;
`;


export const BigDataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;
export const BigDataContainer1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25%;
  border-radius: 8px;
  background: rgb(242, 242, 242);
  border: 1px solid rgb(211, 227, 252);
  padding: 1rem;
  b {
    font-size: 1.7rem;
    color: #2375EF;
  }
  p {
    font-size: 0.7rem;
  }

`;



export const PieChartsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
`
export const PieChartCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgb(242, 242, 242);
  border: 1px solid rgb(211, 227, 252);
  width: 25%;
  padding: 0.5rem;
`;
export const PieChartCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const PieChart = styled.div`
  width: 100%;
  height: 100%;
`;

export const PieChartTitle = styled.p`
  font-size: 0.7rem;
  text-align: left;
  width: 100%;
`;


export const LineGraphContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 40%;
  border-radius: 8px;
  background: rgb(242, 242, 242);
  border: 1px solid rgb(211, 227, 252);
  padding: 1rem;
`;
export const ChartHeader = styled.p`
  font-size: 0.8rem;
  text-align: left;
  width: 100%;
`;







export const Table = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  margin-bottom: 50px;
  border-radius: 8px;
  background: rgb(242, 242, 242);
  border: 1px solid rgb(211, 227, 252);
  font-size: 10px;

  .entry:hover {
    background-color: #dddddd;
  }

  thead {
    background-color: #2375EF;
    color: white;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .blue-link {
    color: #2375EF;
    text-decoration: underline;
  }
`;
