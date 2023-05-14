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
  padding: 20px; 
  margin-top: 4.5em; 
`;

export const UserHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  background: yellow;
  border-radius: 10px;

  img {
    border-radius: 50%;
  }

  p {
    margin: 0;
    word-break: break-all;
    width: 150px;
  }


`;


export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 50px;

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


export const GetDataButton = styled(Button)`
  margin-top: 4em; 
`;



export const DataContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  background: white;
  border-radius: 10px;
`;
export const ChartHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const LineGraphContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 200px;
`;
export const PieChartContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 150px;
`;
export const AnalyticsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 200px;
`;

