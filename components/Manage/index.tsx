import { useState, useEffect } from 'react';
import { Othent } from 'othent';
import axios from 'axios';
import * as Styled from './styles';
import { Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, BarController, PolarAreaController, ScatterController, DoughnutController } from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, ArcElement, BarController, PolarAreaController, ScatterController, DoughnutController);

const SDKDemo = () => {
  const [othent, setOthent] = useState(null);
  useEffect(() => {
    const initializeOthent = async () => {
      const othentInstance = await Othent({ API_ID: 'd7a29242f7fdede654171a0d3fd25163' });
      setOthent(othentInstance);
    };
    initializeOthent();
  }, []);

  const calculateTotals = (transactions) => {
    let uniqueUserIDs = new Set();
    transactions.forEach((transaction) => {
      uniqueUserIDs.add(transaction.userID);
    });
    const totalUsers = uniqueUserIDs.size;
    const totalTxns = transactions.length;
    return { totalUsers, totalTxns };
  };
  
  
  const calculateTodaysData = (transactions) => {
    console.log(transactions)
    const today = moment().format('YYYY-MM-DD');
    const transactionsByHour = {};
    let todaysUsers = new Set();
    let todaysTxns = 0;
    transactions.forEach((transaction) => {
      const transactionDate = moment.unix(transaction.date);
      const transactionHour = transactionDate.format('HH:mm');
      const transactionDay = transactionDate.format('YYYY-MM-DD');
      if (transactionDay === today) {
        if (transactionsByHour[transactionHour]) {
          transactionsByHour[transactionHour]++;
        } else {
          transactionsByHour[transactionHour] = 1;
        }
        todaysUsers.add(transaction.userID);
        todaysTxns++;
      }
    });
    console.log(todaysTxns)
    return { todaysUsers: todaysUsers.size, todaysTxns };
  };
  

  const [API_ID, setAPI_ID] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalTxns, setTotalTxns] = useState(null);
  const [todaysUsers, setTodaysUsers] = useState(null);
  const [todaysTxns, setTodaysTxns] = useState(null);
  const [pieChartDataWallets, setPieChartDataWallets] = useState(null);
  const [pieChartDataFunctions, setPieChartDataFunctions] = useState(null);
  const [pieChartDataTypes, setPieChartDataTypes] = useState(null);
  const [pieChartDataFunctionsToday, setPieChartDataFunctionsToday] = useState(null);
  const [lineChartDataTotal, setLineChartDataTotal] = useState(null);
  const [lineChartDataToday, setLineChartDataToday] = useState(null);
  const [todaysTransactions, setTodaysTransactions] = useState(null);

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
  
        const walletCounts = countWalletAddresses(transactions);
        const functionCounts = countFunctions(transactions);
        const typeCounts = countTransactionTypes(transactions);
        const functionCountsToday = countTransactionFunctionsToday(transactions);
        const pieChartDataWallets = formatDataForPieChart(walletCounts);
        const pieChartDataFunctions = formatDataForPieChart(functionCounts);
        const pieChartDataTypes = formatDataForPieChart(typeCounts);
        const pieChartDataFunctionsToday = formatDataForPieChart(functionCountsToday);
        setPieChartDataWallets(pieChartDataWallets);
        setPieChartDataFunctions(pieChartDataFunctions);
        setPieChartDataTypes(pieChartDataTypes);
        setPieChartDataFunctionsToday(pieChartDataFunctionsToday);
  
        const transactionsByDate = {};
        transactions.forEach((transaction) => {
          const date = moment.unix(transaction.date).format('YYYY-MM-DD');
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
              label: 'Number of transactions',
              data: Object.values(transactionsByDate),
              fill: false,
              borderColor: '#2375EF',
              tension: 0.1,
            },
          ],
        };
        setLineChartDataTotal(lineChartDataTotal);
  
        const today = moment().format('YYYY-MM-DD');
        const transactionsToday = transactionsByDate[today] || 0;
  
        const lineChartDataToday = {
          labels: ['Today'],
          datasets: [
            {
              label: 'Number of transactions',
              data: [transactionsToday],
              fill: false,
              borderColor: '#2375EF',
              tension: 0.1,
            },
          ],
        };
        setLineChartDataToday(lineChartDataToday);
  
        const transactionsByHour = calculateTodaysData(transactions);
  
        const todaysTransactions = {
          labels: Object.keys(transactionsByHour),
          datasets: [
            {
              label: 'Number of transactions',
              data: Object.values(transactionsByHour),
              fill: false,
              borderColor: '#2375EF',
              tension: 0.1,
            },
          ],
        };
        console.log(todaysTransactions)
        setTodaysTransactions(todaysTransactions);
  
        const { totalUsers, totalTxns } = calculateTotals(transactions);
        const { todaysUsers, todaysTxns } = calculateTodaysData(transactions);
        setTotalUsers(totalUsers);
        setTotalTxns(totalTxns);
        setTodaysUsers(todaysUsers);
        setTodaysTxns(todaysTxns);
      })
      .catch((error) => {
        console.error(error.response);
      });
  };
  

  function countWalletAddresses(transactions) {
    const walletCounts = {};
    for (const transaction of transactions) {
      const walletAddress = transaction.contractID;
      if (walletCounts[walletAddress]) {
        walletCounts[walletAddress]++;
      } else {
        walletCounts[walletAddress] = 1;
      }
    }
    return walletCounts;
  }

  function countFunctions(transactions) {
    const functionCounts = {};
    for (const transaction of transactions) {
      const functionName = transaction.txnFunction;
      if (functionCounts[functionName]) {
        functionCounts[functionName]++;
      } else {
        functionCounts[functionName] = 1;
      }
    }
    return functionCounts;
  }

  function countTransactionTypes(transactions) {
    const typeCounts = {};
    for (const transaction of transactions) {
      const transactionType = transaction.txnType;
      if (typeCounts[transactionType]) {
        typeCounts[transactionType]++;
      } else {
        typeCounts[transactionType] = 1;
      }
    }
    return typeCounts;
  }

  function countTransactionFunctionsToday(transactions) {
    const today = moment().startOf('day');
    const functionCountsToday = {};
    for (const transaction of transactions) {
      const transactionDate = moment.unix(transaction.date);
      if (transactionDate >= today) {
        const functionName = transaction.txnFunction;
        if (functionCountsToday[functionName]) {
          functionCountsToday[functionName]++;
        } else {
          functionCountsToday[functionName] = 1;
        }
      }
    }
    return functionCountsToday;
  }

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

        {transactions && userDetails && pieChartDataWallets && pieChartDataFunctions && pieChartDataTypes && pieChartDataFunctionsToday && lineChartDataTotal && lineChartDataToday && todaysTransactions && (
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
                <b>{todaysTxns}</b>
                <p>Todays Txns</p>
              </Styled.BigDataContainer1>

              <Styled.PieChartCardContainer>
                <Styled.PieChartCard>
                  <Styled.PieChartTitle>Most active wallet addresses</Styled.PieChartTitle>
                  <Styled.PieChart>
                    <Pie data={pieChartDataWallets} options={{ responsive: true, maintainAspectRatio: false }} />
                  </Styled.PieChart>
                </Styled.PieChartCard>
              </Styled.PieChartCardContainer>

              <Styled.PieChartCardContainer>
                <Styled.PieChartCard>
                  <Styled.PieChartTitle>Most popular functions</Styled.PieChartTitle>
                  <Styled.PieChart>
                    <Pie data={pieChartDataFunctions} options={{ responsive: true, maintainAspectRatio: false }} />
                  </Styled.PieChart>
                </Styled.PieChartCard>
              </Styled.PieChartCardContainer>

              <Styled.PieChartCardContainer>
                <Styled.PieChartCard>
                  <Styled.PieChartTitle>Most popular transaction type</Styled.PieChartTitle>
                  <Styled.PieChart>
                    <Pie data={pieChartDataTypes} options={{ responsive: true, maintainAspectRatio: false }} />
                  </Styled.PieChart>
                </Styled.PieChartCard>
              </Styled.PieChartCardContainer>

              <Styled.PieChartCardContainer>
                <Styled.PieChartCard>
                  <Styled.PieChartTitle>Most popular transaction function today</Styled.PieChartTitle>
                  {pieChartDataFunctionsToday.labels.length > 0 ? (
                    <Styled.PieChart>
                      <Pie data={pieChartDataFunctionsToday} options={{ responsive: true, maintainAspectRatio: false }} />
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
                <Line data={lineChartDataTotal} />
              </Styled.LineGraph>
              <Styled.LineGraph>
                <Styled.ChartHeader>Today's transactions</Styled.ChartHeader>
                <Line data={todaysTransactions} />
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
                    return (
                      <tr key={index} className="entry">
                        <td>{reversedIndex}</td>
                        <td>
                          <a className="blue-link" href={'https://sonar.warp.cc/#/app/contract/' + transaction.walletAddress} target="_blank" rel="noopener noreferrer">
                            {shortenString(transaction.walletAddress)}
                          </a>
                        </td>
                        <td>{transaction.userID}</td>
                        <td>
                          <a className="blue-link" href={(() => {
                            switch (transaction.type) {
                              case 'arweave-upload':
                                return `https://viewblock.io/arweave/tx/${transaction.ID}`;
                              case 'warp-transaction':
                                return `https://sonar.warp.cc/#/app/interaction/${transaction.ID}`;
                              case 'backup-account':
                                return `https://sonar.warp.cc/#/app/interaction/${transaction.ID}`;
                              default:
                                return '';
                            }
                          })()} target="_blank" rel="noopener noreferrer">
                            {shortenString(transaction.ID)}
                          </a>
                        </td>
                        <td>{transaction.txnFunction}</td>
                        <td>{transaction.type}</td>
                        <td>
                          {transaction.success ? (
                            <span className="success-icon">&#10004;</span>
                          ) : (
                            <span className="error-icon">&#10006;</span>
                          )}
                        </td>
                        <td>
                          {moment.unix(transaction.date).format('YYYY-MM-DD')}{' '}
                          {moment.unix(transaction.date).format('HH:mm')}
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
