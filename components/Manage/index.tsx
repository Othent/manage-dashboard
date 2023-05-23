import { useState, useEffect } from 'react';
import styled from 'styled-components';
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
      const othentInstance = await Othent({ API_ID: '1f73e23e3437dd623f5530e90ac1d1b2' });
      setOthent(othentInstance);
    };
    initializeOthent();
  }, []);




  const calculateTotals = (transactions) => {
    let uniqueUserIDs = new Set();
    let totalTxns = 0;
    transactions.forEach((transaction) => {
      if (!uniqueUserIDs.has(transaction.userID)) {
        uniqueUserIDs.add(transaction.userID);
        totalTxns++;
      }
    });
    const totalUsers = uniqueUserIDs.size;
    return { totalUsers, totalTxns };
  };
  
  const calculateTodaysData = (transactions) => {
    const today = new Date().setHours(0, 0, 0, 0);
    let uniqueUserIDs = new Set();
    let todaysTxns = 0;
    transactions.forEach((transaction) => {
      const transactionDate = transaction.date * 1000;
      if (transactionDate >= today) {
        if (!uniqueUserIDs.has(transaction.userID)) {
          uniqueUserIDs.add(transaction.userID);
          todaysTxns++;
        }
      }
    });
    const todaysUsers = uniqueUserIDs.size;
    return { todaysUsers, todaysTxns };
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
  const [lineChartData, setLineChartData] = useState(null);

  const getTransactions = async () => {
    setTransactions(null); 
    const details = await othent.logIn();
    setUserDetails(details);
    const { API_ID } = await othent.getAPIID();
    setAPI_ID(API_ID)
    axios.post('https://server.othent.io/query-client-id', { clientID: API_ID })
      .then((response) => {
        setTransactions(response.data.document.transactions);

        console.log(response.data.document)


        const transactions = response.data.document.transactions;

        const walletCounts = countWalletAddresses(transactions);
        const functionCounts = countFunctions(transactions);
        const typeCounts = countTransactionTypes(transactions);
        const functionCountsToday = countTransactionFunctionsToday(transactions);
        const pieChartDataWallets = formatDataForPieChart(walletCounts);
        const pieChartDataFunctions = formatDataForPieChart(functionCounts);
        const pieChartDataTypes = formatDataForPieChart(typeCounts);
        const pieChartDataFunctionsToday = formatDataForPieChart(functionCountsToday);
        setPieChartDataWallets(pieChartDataWallets)
        setPieChartDataFunctions(pieChartDataFunctions)
        setPieChartDataTypes(pieChartDataTypes)
        setPieChartDataFunctionsToday(pieChartDataFunctionsToday)
      


        const transactionsByDate = {};
        transactions.forEach(transaction => {
          const date = moment.unix(transaction.date).format('YYYY-MM-DD');
          if (transactionsByDate[date]) {
            transactionsByDate[date]++;
          } else {
            transactionsByDate[date] = 1;
          }
        });


        const lineChartData = {
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
        setLineChartData(lineChartData)





        const { totalUsers, totalTxns } = calculateTotals(transactions);
        const { todaysUsers, todaysTxns } = calculateTodaysData(transactions);
        setTotalUsers(totalUsers)
        setTotalTxns(totalTxns)
        setTodaysUsers(todaysUsers)
        setTodaysTxns(todaysTxns)



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
    const today = new Date().getTime();
    const functionCountsToday = {};
    for (const transaction of transactions) {
      const transactionDate = transaction.date * 1000;
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

  



  return (
    <Styled.MainWrapper>

      <Styled.Container >
        
        {!transactions && (
          <>
            <Styled.IntroSection>
              <h2>Manage your Othent account</h2>
              <p>
                Get a comprehensive view of transactions made within our network.
                Here, you will be able to see an overview of transaction types, their trends over time, and a 
                detailed table of all transactions. In order to protect user data, you need to login to view the
                details.
              </p>
              <div>
                <Styled.GetDataButton onClick={() => getTransactions()}>
                  Your App
                </Styled.GetDataButton>
                <Styled.GetDataButton onClick={() => getTransactions()}>
                  Your Account
                </Styled.GetDataButton>
              </div>
            </Styled.IntroSection>
          </>
        )}


        {transactions && userDetails && pieChartDataWallets && pieChartDataFunctions 
        && pieChartDataTypes && pieChartDataFunctionsToday && 

        <>
          <Styled.UserHeader>
            <img src={userDetails.picture} referrerPolicy='no-referrer' alt="user profile" />
            <span>
              <b>Name:</b>
              <p>{userDetails.name}</p>
              <b>Email:</b>
              <p>{userDetails.email}</p>
            </span>
            <span>
              <b>Othent ID:</b>
              <p>{userDetails.sub}</p>
              <b>Wallet Address:</b>
              <p>{userDetails.contract_id}</p>
            </span>
            <span>
              <b>API ID:</b>
              <p>{API_ID}</p>
            </span>
          </Styled.UserHeader>




          <Styled.DataContainer>
            
            <Styled.TopLeftContainer>


              <Styled.BigDataContainer>

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

              </Styled.BigDataContainer>


              <Styled.PieChartsContainer>

                <Styled.PieChartCardContainer>
                  <Styled.PieChartCard>
                    <Styled.PieChartTitle>Most active wallet addreses</Styled.PieChartTitle>
                    <Styled.PieChart>
                      <Pie 
                        data={pieChartDataWallets}
                        options={{ responsive: true, maintainAspectRatio: false }}
                      />
                    </Styled.PieChart>
                  </Styled.PieChartCard>
                </Styled.PieChartCardContainer>

                <Styled.PieChartCardContainer>
                  <Styled.PieChartCard>
                    <Styled.PieChartTitle>Most popular functions</Styled.PieChartTitle>
                    <Styled.PieChart>
                      <Pie 
                        data={pieChartDataFunctions}
                        options={{ responsive: true, maintainAspectRatio: false }}
                      />
                    </Styled.PieChart>
                  </Styled.PieChartCard>
                </Styled.PieChartCardContainer>

                <Styled.PieChartCardContainer>
                  <Styled.PieChartCard>
                    <Styled.PieChartTitle>Most popular transaction type</Styled.PieChartTitle>
                    <Styled.PieChart>
                      <Pie 
                        data={pieChartDataTypes}
                        options={{ responsive: true, maintainAspectRatio: false }}
                      />
                    </Styled.PieChart>
                  </Styled.PieChartCard>
                </Styled.PieChartCardContainer>

                <Styled.PieChartCardContainer>
                  <Styled.PieChartCard>
                    <Styled.PieChartTitle>Most popular transaction function today</Styled.PieChartTitle>
                    {pieChartDataFunctionsToday.labels.length > 0 ? (
                      <Styled.PieChart>
                        <Pie 
                          data={pieChartDataFunctionsToday}
                          options={{ responsive: true, maintainAspectRatio: false }}
                        />
                      </Styled.PieChart>
                    ) : (
                      <div>No data available for the pie chart.</div>
                    )}
                  </Styled.PieChartCard>
                </Styled.PieChartCardContainer>
                
              </Styled.PieChartsContainer>


            </Styled.TopLeftContainer>

              





            <Styled.LineGraphContainer>
              <Styled.ChartHeader>Number of transactions per day</Styled.ChartHeader>
              <Line data={lineChartData} />
            </Styled.LineGraphContainer>


            


          </Styled.DataContainer>

        

          <Styled.Table>
            <thead>
              <tr>
                <th>Txn Number</th>
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
                  <tr key={index} className='entry'>
                    <td>{reversedIndex}</td>
                    <td>{transaction.walletAddress}</td>
                    <td>{transaction.userID}</td>
                    <td>
                      <a
                        className="blue-link"
                        href={
                          (() => {
                            switch (transaction.type) {
                              case 'arweave':
                                return `https://viewblock.io/transaction/${transaction.ID}`;
                              case 'warp':
                                return `https://sonar.warp.cc/contract/#/${transaction.ID}`;
                              case 'bundlr':
                                return `https://viewblock.io/transaction/${transaction.ID}`;
                              default:
                                return '';
                            }
                          })()
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {transaction.ID}
                      </a>
                    </td>
                    <td>{transaction.txnFunction}</td>
                    <td>{transaction.type}</td>
                    <td>{JSON.stringify(transaction.success)}</td>
                    <td>{new Date(transaction.date * 1000).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </Styled.Table>

        </> 


        }
      </Styled.Container>
    </Styled.MainWrapper>
  );
};

export default SDKDemo;
