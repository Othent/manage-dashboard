import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Othent } from 'othent';
import axios from 'axios';
import * as Styled from './styles';
import { Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, BarController, PolarAreaController, ScatterController, DoughnutController } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, ArcElement, BarController, PolarAreaController, ScatterController, DoughnutController);


const SDKDemo = () => {
  
  

  const [othent, setOthent] = useState(null);
  useEffect(() => {
    const initializeOthent = async () => {
      const othentInstance = await Othent({ API_ID: '1f73e23e3437dd623f5530e90ac1d1b2' });
      setOthent(othentInstance);
    };
    initializeOthent();
  }, []);


  const [API_ID, setAPI_ID] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const getTransactions = async () => {
    setClientData(null); 
    const details = await othent.logIn();
    setUserDetails(details);
    const { API_ID } = await othent.getAPIKeys();
    setAPI_ID(API_ID)
    axios.post('http://server.othent.io/query-client-id', { clientID: API_ID })
      .then((response) => {
        setClientData(response.data.document);
        setPieChartData(preparePieChartData(response.data.document.users));
        setLineChartData(prepareLineChartData(response.data.document.users[0].transactions));
        console.log(response.data.document.users)
      })
      .catch((error) => {
        console.error(error.response);
      });
  };


  const [pieChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const preparePieChartData = (transactions) => {
    const txnTypes = transactions.reduce((types, transaction) => {
      const { txnType } = transaction;
      if (types[txnType]) {
        types[txnType]++;
      } else {
        types[txnType] = 1;
      }
      return types;
    }, {});
  
    const labels = Object.keys(txnTypes);
    const data = Object.values(txnTypes);
  
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            '#ff6384', // Color for the first type
            '#36a2eb', // Color for the second type
            // Add more colors for additional types
          ],
        },
      ],
    };
  };
  
  const prepareLineChartData = (transactions) => {
    const labels = transactions.map((transaction) =>
      new Date(transaction.date * 1000).toLocaleDateString()
    );
    const data = transactions.map((transaction) => transaction.txnID);
  
    return {
      labels,
      datasets: [
        {
          label: 'Transaction ID',
          data,
          fill: false,
          borderColor: '#8884d8', // Color for the line
        },
      ],
    };
  };
  




  return (
    <Styled.MainWrapper>
      <Styled.Container >
        {clientData && userDetails && 
          <Styled.UserHeader>
            <img src={userDetails.picture} alt="User Profile" />
            <span>
              <b>Name:</b>
              <p>{userDetails.name}</p>
            </span>
            <span>
              <b>Email:</b>
              <p>{userDetails.email}</p>
            </span>
            <span>
              <b>Othent ID:</b>
              <p>{userDetails.sub}</p>
            </span>
            <span>
              <b>Wallet Address:</b>
              <p>{userDetails.contract_id}</p>
            </span>
            <span>
              <b>API ID:</b>
              <p>{API_ID}</p>
            </span>
          </Styled.UserHeader>
        }

        {pieChartData && lineChartData && (
          <>
            <Styled.PieChartContainer>
              <Styled.ChartHeader>Total Transactions</Styled.ChartHeader>
              {pieChartData && <Pie data={pieChartData} />}
            </Styled.PieChartContainer>
            
            <Styled.LineGraphContainer>
              <Styled.ChartHeader>Total Transactions</Styled.ChartHeader>
              {lineChartData && <Line data={lineChartData} />}
            </Styled.LineGraphContainer>
            </>
        )}
        

        {!clientData && <Styled.GetDataButton onClick={() => getTransactions()}>
          Get Data
        </Styled.GetDataButton>}

        {clientData && userDetails && 
          <Styled.Table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Transaction ID</th>
                <th>Transaction Function</th>
                <th>Transaction Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {clientData.users.map((user) => {
                return user.transactions.map((transaction) => (
                  <tr key={transaction.txnID}>
                    <td>{user.userID}</td>
                    <td><a className='blue-link' href={transaction.txnLink} target='_blank'>{transaction.txnID}</a></td>
                    <td>{transaction.txnFunction}</td>
                    <td>{transaction.txnType}</td>
                    <td>{new Date(transaction.date * 1000).toLocaleDateString()}</td>
                  </tr>
                ));
              })}
            </tbody>
          </Styled.Table>
        }
      </Styled.Container>
    </Styled.MainWrapper>
  );
};

export default SDKDemo;
