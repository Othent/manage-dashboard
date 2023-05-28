import { useState, useEffect } from 'react';
import { Othent } from 'othent';
import axios from 'axios';
import * as Styled from './styles';
import { Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, BarController, PolarAreaController, ScatterController, DoughnutController, Tooltip  } from 'chart.js';
import { Line } from 'react-chartjs-2';
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, ArcElement, BarController, PolarAreaController, ScatterController, DoughnutController, Tooltip );

const SDKDemo = () => {
  const [othent, setOthent] = useState(null);
  useEffect(() => {
    const initializeOthent = async () => {
      const othentInstance = await Othent({ API_ID: 'd7a29242f7fdede654171a0d3fd25163' });
      setOthent(othentInstance);
    };
    initializeOthent();
  }, []);


  
  
  const calculateData = (transactions) => {

    // total data
    let totalUsers = new Set(); 
    const totalTxns = transactions.length;
  
    // todays data
    const today = new Date();
    let todaysTxns = [];
    let todaysUsers = new Set(); 
    let todaysTxnNumber = 0;
  
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      // total
      totalUsers.add(transaction.userID);
      // today
      if (
        today.getDate() === transactionDate.getDate() &&
        today.getMonth() === transactionDate.getMonth() &&
        today.getFullYear() === transactionDate.getFullYear()
      ) {
        todaysTxns.push(transaction);
        todaysUsers.add(transaction.userID);
        todaysTxnNumber++;
      } 
    });
  
    return { 
      totalTxns,
      totalUsers: totalUsers.size, 
      todaysUsers: todaysUsers.size,
      todaysTxns,
      todaysTxnNumber
    };
  };
  





  // pie chart data
  function pieChartData(transactions) {
    const walletCounts = [];
    const functionCounts = {};
    const typeCounts = {};
    let successCounts = 0;
    let failedCounts = 0;

    for (const transaction of transactions) {

      if (walletCounts.some(item => item.walletAddress === transaction.walletAddress)) {
        const existingWallet = walletCounts.find(item => item.walletAddress === transaction.walletAddress);
        existingWallet.count += 1;
      } else {
        walletCounts.push({
          walletAddress: transaction.walletAddress,
          count: 1
        });
      }

      const functionName = transaction.txnFunction;
      if (functionCounts[functionName]) {
        functionCounts[functionName]++;
      } else {
        functionCounts[functionName] = 1;
      }

      const transactionType = transaction.type;
      if (typeCounts[transactionType]) {
        typeCounts[transactionType]++;
      } else {
        typeCounts[transactionType] = 1;
      }

      const transactionSuccess = transaction.success;
      if (transactionSuccess === true) {
        successCounts++
      } else {
        failedCounts++
      }
    }

    return { walletCounts, functionCounts, typeCounts, successCounts: { successCounts, failedCounts } };
  }
  
  



  // universal
  const [API_ID, setAPI_ID] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  
  // pie chart data
  const [pieChartDataWallets, setPieChartDataWallets] = useState(null);
  const [pieChartDataFunctions, setPieChartDataFunctions] = useState(null);
  const [pieChartDataTypes, setPieChartDataTypes] = useState(null);
  const [pieChartDataSuccess, setPieChartDataSuccess] = useState(null);

  // line chart data
  const [lineChartDataTotal, setLineChartDataTotal] = useState(null);
  const [lineChartDataToday, setLineChartDataToday] = useState(null);

  // total users data
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalTxns, setTotalTxns] = useState(null);

  // todays users data
  const [todaysUsers, setTodaysUsers] = useState(null);
  const [todaysTxnNumber, setTodaysTxnNumber] = useState(null);





  const getTransactions = async () => {
    setTransactions(null); 
    const details = await othent.logIn();
    setUserDetails(details);
    const { API_ID } = await othent.getAPIID();
    setAPI_ID(API_ID);
    axios.post('https://server.othent.io/query-client-id', { clientID: API_ID })
      .then((response) => {
        const transactions = response.data.document.transactions;
        setTransactions(transactions);


        // data
        const { totalUsers, totalTxns, todaysUsers, todaysTxns, todaysTxnNumber } = calculateData(transactions);
        // total
        setTotalUsers(totalUsers);
        setTotalTxns(totalTxns);
        // todays
        setTodaysUsers(todaysUsers);
        setTodaysTxnNumber(todaysTxnNumber)
  


        // pie chart data
        const  { walletCounts, functionCounts, typeCounts, successCounts } = pieChartData(transactions);

        const colors = ['#2375EF', '#4F91F2'];

        
        const pieChartDataWallets = {
          labels: Object.values(walletCounts).map(item => shortenString(item.walletAddress)),
          datasets: [{
            data: Object.values(walletCounts).map(item => item.count),
            backgroundColor: Object.keys(walletCounts).map((item, index) => colors[index % colors.length]),
          }],
        };
        setPieChartDataWallets(pieChartDataWallets);


        const pieChartDataFunctions = formatDataForPieChart(functionCounts);
        setPieChartDataFunctions(pieChartDataFunctions);

        const pieChartDataTypes = formatDataForPieChart(typeCounts);
        setPieChartDataTypes(pieChartDataTypes);

        const pieChartDataSuccess = formatDataForPieChart(successCounts);
        setPieChartDataSuccess(pieChartDataSuccess);

  


        // total line chart data, txn number per day
        const transactionsByDate = {};
        transactions.forEach((transaction) => {
          const date = new Date(transaction.date).toLocaleString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })
          if (transactionsByDate[date]) {
            transactionsByDate[date]++;
          } else {
            transactionsByDate[date] = 1;
          }
        });
        const lineChartDataTotal = {
          labels: Object.keys(transactionsByDate),
          datasets: [
            {
              label: 'Number of transactions per day',
              data: Object.values(transactionsByDate),
              fill: false,
              borderColor: '#2375EF',
              tension: 0.1,
            },
          ],
        };
        setLineChartDataTotal(lineChartDataTotal);

        


        // todays line chart data, txn time per day
        let todaysTransactionsByTime = {};
        todaysTxns.forEach((transaction) => {
          const time = new Date(transaction.date).toLocaleTimeString(undefined, { hour: 'numeric', hour12: true });
          if (todaysTransactionsByTime[time]) {
            todaysTransactionsByTime[time]++;
          } else {
            todaysTransactionsByTime[time] = 1;
          }
        });
        const lineChartDataToday = {
          labels: Object.keys(todaysTransactionsByTime),
          datasets: [
            {
              label: 'Number of transactions per hour',
              data: Object.values(todaysTransactionsByTime),
              fill: false,
              borderColor: '#2375EF',
              tension: 0.1,
            },
          ],
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1
            },
          }
        };
        setLineChartDataToday(lineChartDataToday);
      


      })
      .catch((error) => {
        console.error(error.response);
      });
  };
  

  



  function formatDataForPieChart(data) {
    const colors = ['#2375EF', '#4F91F2'];
    const formattedData = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
      }],
    };

    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const item = keys[i];
      const colorIndex = i % colors.length;

      formattedData.labels.push(item);
      formattedData.datasets[0].data.push(data[item]);
      formattedData.datasets[0].backgroundColor.push(colors[colorIndex]);
    }

    return formattedData;
  }

  const shortenString = (str) => {
    const maxLength = Math.floor(str.length * 0.5);
    const startLength = Math.ceil(maxLength / 2);
    const endLength = Math.floor(maxLength / 2);
    return `${str.slice(0, startLength)}...${str.slice(-endLength)}`;
  };

  return (
    <Styled.MainWrapper>
      <Styled.Container>
        {!transactions && (
          <Styled.IntroSection>
            <Styled.GetDataButton onClick={() => getTransactions()}>
              Log In
            </Styled.GetDataButton>
            <Styled.GetDataButton onClick={() => getTransactions()}>
              Sign Up
            </Styled.GetDataButton>
          </Styled.IntroSection>
        )}

        {transactions && userDetails && pieChartDataWallets && pieChartDataFunctions && pieChartDataTypes && pieChartDataSuccess && lineChartDataTotal && lineChartDataToday && (
          <>
            <Styled.UserHeader>
              <img src={userDetails.picture} referrerPolicy="no-referrer" alt="user profile" />
              <span>
                <b>Name:</b>
                <p>{userDetails.name}</p>
                <br></br>
                <b>Email:</b>
                <p>{userDetails.email}</p>
              </span>
              <span>
                <b>Othent ID:</b>
                <p>{userDetails.sub}</p>
                <br></br>
                <b>Wallet Address:</b>
                <p>{userDetails.contract_id}</p>
              </span>
              <span>
                <b>API ID:</b>
                <p>{API_ID}</p>
              </span>
            </Styled.UserHeader>

            <Styled.DataContainer>
              <Styled.BigDataContainer1>
                <b>{totalUsers}</b>
                <p>Total Users</p>
              </Styled.BigDataContainer1>

              <Styled.BigDataContainer1>
                <b>{totalTxns}</b>
                <p>Total Txns</p>
              </Styled.BigDataContainer1>

              <Styled.BigDataContainer1>
                <b>{todaysUsers}</b>
                <p>Todays Users</p>
              </Styled.BigDataContainer1>

              <Styled.BigDataContainer1>
                <b>{todaysTxnNumber}</b>
                <p>Todays Txns</p>
              </Styled.BigDataContainer1>

              <Styled.PieChartCardContainer>
                <Styled.PieChartCard>
                  <Styled.PieChartTitle>Most active wallet addresses</Styled.PieChartTitle>
                  {pieChartDataWallets.labels.length > 0 ? (
                    <Styled.PieChart>
                      <Pie data={pieChartDataWallets} options={{ responsive: true, maintainAspectRatio: false }} />
                    </Styled.PieChart>
                  ) : (
                    <div>No data available for the pie chart.</div>
                  )}
                </Styled.PieChartCard>
              </Styled.PieChartCardContainer>

              <Styled.PieChartCardContainer>
                <Styled.PieChartCard>
                  <Styled.PieChartTitle>Most popular functions</Styled.PieChartTitle>
                  {pieChartDataFunctions.labels.length > 0 ? (
                    <Styled.PieChart>
                      <Pie data={pieChartDataFunctions} options={{ responsive: true, maintainAspectRatio: false }} />
                    </Styled.PieChart>
                  ) : (
                    <div>No data available for the pie chart.</div>
                  )}
                </Styled.PieChartCard>
              </Styled.PieChartCardContainer>

              <Styled.PieChartCardContainer>
                <Styled.PieChartCard>
                  <Styled.PieChartTitle>Most popular transaction type</Styled.PieChartTitle>
                  {pieChartDataTypes.labels.length > 0 ? (
                    <Styled.PieChart>
                      <Pie data={pieChartDataTypes} options={{ responsive: true, maintainAspectRatio: false }} />
                    </Styled.PieChart>
                  ) : (
                    <div>No data available for the pie chart.</div>
                  )}
                </Styled.PieChartCard>
              </Styled.PieChartCardContainer>

              <Styled.PieChartCardContainer>
                <Styled.PieChartCard>
                  <Styled.PieChartTitle>Total transaction success</Styled.PieChartTitle>
                  {pieChartDataSuccess.datasets[0].data[0] !== 0 || pieChartDataSuccess.datasets[0].data[1] !== 0 ? (
                    <Styled.PieChart>
                      <Pie data={pieChartDataSuccess} options={{ responsive: true, maintainAspectRatio: false }} />
                    </Styled.PieChart>
                  ) : (
                    <div>No data available for the pie chart.</div>
                  )}
                </Styled.PieChartCard>
              </Styled.PieChartCardContainer>
            </Styled.DataContainer>

            <Styled.LineGraphContainer>
              <Styled.LineGraph>
                <Styled.ChartHeader>Total transactions</Styled.ChartHeader>
                {lineChartDataTotal.datasets[0].data.length !== 0 ? (
                  <Line 
                    data={lineChartDataTotal} 
                    options={{ scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }} 
                  />
                ) : (
                  <div style={{ textAlign: 'center' }}>No data available for the line graph.</div>
                )}
              </Styled.LineGraph>
              <Styled.LineGraph>
                <Styled.ChartHeader>Today's transactions</Styled.ChartHeader>
                {lineChartDataToday.datasets[0].data.length !== 0 ? (
                  <Line 
                    data={lineChartDataToday} 
                    options={{ scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }} 
                  />
                ) : (
                  <div style={{ textAlign: 'center' }}>No data available for the line graph.</div>
                )}
              </Styled.LineGraph>
            </Styled.LineGraphContainer>

            <Styled.TableContainer>
              <Styled.Table>
                <thead>
                  <tr>
                    <th>Txn No.</th>
                    <th>Wallet Address</th>
                    <th>User ID</th>
                    <th>Transaction ID</th>
                    <th>Transaction Function</th>
                    <th>Transaction Type</th>
                    <th>Success</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => {
                    const reversedIndex = transactions.length - index;
                    const reversedTransaction = transactions[transactions.length - 1 - index];
                    return (
                      <tr key={reversedIndex} className="entry">
                        <td>{reversedIndex}</td>
                        <td>
                          <a className="blue-link" href={'https://sonar.warp.cc/#/app/contract/' + reversedTransaction.walletAddress} target="_blank" rel="noopener noreferrer">
                            {shortenString(reversedTransaction.walletAddress)}
                          </a>
                        </td>
                        <td>{reversedTransaction.userID}</td>
                        <td>
                          <a className="blue-link" href={(() => {
                            switch (reversedTransaction.type) {
                              case 'arweave-upload':
                                return `https://viewblock.io/arweave/tx/${reversedTransaction.ID}`;
                              case 'warp-transaction':
                              case 'backup-account':
                                return `https://sonar.warp.cc/#/app/interaction/${reversedTransaction.ID}`;
                              default:
                                return '';
                            }
                          })()} target="_blank" rel="noopener noreferrer">
                            {shortenString(reversedTransaction.ID)}
                          </a>
                        </td>
                        <td>{reversedTransaction.txnFunction}</td>
                        <td>{reversedTransaction.type}</td>
                        <td>
                          {reversedTransaction.success ? (
                            <span className="success-icon">&#10004;</span>
                          ) : (
                            <span className="error-icon">&#10006;</span>
                          )}
                        </td>
                        <td>
                          {new Date(reversedTransaction.date).toLocaleString(undefined, { timeZoneName: 'short' })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Styled.Table>
            </Styled.TableContainer>
          </>
        )}
      </Styled.Container>
    </Styled.MainWrapper>
  );
};

export default SDKDemo;
