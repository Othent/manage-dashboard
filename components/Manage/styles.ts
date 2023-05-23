import styled from 'styled-components';
import Button from '../Button';
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
  color: #333;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  gap: 1rem;
`;

export const GetDataButton = styled(Button)`
  width: 8rem;
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
    height: auto;
  }

  span {
    margin: 0;
    word-break: break-all;
    text-align: left;
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin-top: 4rem;

    span {
      width: 100%;
    }

    img {
      height: 150px;
      margin-bottom: 10px;
    }
  }
`;


export const DataContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  width: 90vw;
  max-width: 1200px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BigDataContainer1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  grid-column: span 2;
  grid-row: span 1;

  @media (max-width: 768px) {
    grid-column: span 1;
    grid-row: span 2;
  }
`;

export const PieChartCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgb(242, 242, 242);
  border: 1px solid rgb(211, 227, 252);
  padding: 0.5rem;
`;

export const PieChartCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PieChart = styled.div`
  width: 100%;
  height: 100%;
`;

export const PieChartTitle = styled.p`
  font-size: 0.7rem;
  text-align: center;
  width: 100%;
  padding: 10px;
`;




export const LineGraphContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  border-radius: 8px;
  background: rgb(242, 242, 242);
  border: 1px solid rgb(211, 227, 252);
  padding: 1rem;
  width: 100%;
  margin-bottom: 20px;
`;
export const LineGraph = styled.div`
  flex-basis: 48%;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-basis: 100%;
    margin-bottom: 2rem;
  }
`;
export const ChartHeader = styled.p`
  font-size: 0.8rem;
  text-align: center;
  padding: 10px;
`;





export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #2375EF rgb(242, 242, 242);
  height: 100%;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgb(242, 242, 242);
  }

  ::-webkit-scrollbar-thumb {
    background-color: #2375EF;
    border-radius: 3px;
  }


  @media (max-width: 768px) {
    overflow-x: scroll;
  }
`;


export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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

  th,
  td {
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

  .success-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: green;
  }

  .error-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: red;
  }



  @media (max-width: 768px) {
    font-size: 8px;
  }
`;