import { useState, useEffect } from 'react';
import { FeatureTextSmall } from '../common';
import { DMSans700, SpaceGrotesk700, DMSans500 } from '../../utils/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import * as Styled from './styles';
import Button from '../Button'
import styled from 'styled-components';
import { Othent } from 'othent';


const SDKDemo = () => {

  const [output, setOutput] = useState('*** Output Response ***');


  const [othent, setOthent] = useState(null);
  useEffect(() => {
    const initializeOthent = async () => {
      const othentInstance = await Othent({ API_ID: '1f73e23e3437dd623f5530e90ac1d1b2' });
      setOthent(othentInstance);
    };
    initializeOthent();
  }, []);



  const handlePingClick = async () => {
    const ping = await othent.ping();
    const message = 'Ping button clicked: ' + JSON.stringify(ping);
    console.log(message);
    setOutput(message);
  };


  const handleAddCallbackURL = async () => {
    const addCallbackURL = await othent.addCallbackURL({ callbackURL: 'https://hello.com' });
    const message = 'Add callback URL button clicked: ' + JSON.stringify(addCallbackURL);
    console.log(message);
    setOutput(message);
  };


  const handleGetAPIKeys = async () => {
    const API_keys = await othent.getAPIKeys()
    const message = 'Get API keys button clicked: ' + JSON.stringify(API_keys);
    console.log(message);
    setOutput(message);
  };


  const handleLogInClick = async () => {
    const logIn = await othent.logIn()
    const message = 'Log In button clicked: ' + JSON.stringify(logIn);
    console.log(message);
    setOutput(message);
  };

  const handleLogOutClick = async () => {
    const logOut = await othent.logOut()
    const message = 'Log Out button clicked: ' + JSON.stringify(logOut);
    console.log(message);
    setOutput(message);
  };

  const handleUserDetailsClick = async () => {
    const userDetails = await othent.userDetails()
    const message = 'User Details button clicked: ' + JSON.stringify(userDetails);
    console.log(message);
    setOutput(message);
  };

  const handleReadContractClick = async () => {
    const readContract = await othent.readContract()
    const message = 'Read Contract button clicked: ' + JSON.stringify(readContract);
    console.log(message);
    setOutput(message);
  };


  const handleSignTransactionWarp = async () => {
    try {
      const response = await othent.signTransactionWarp({
        othentFunction: 'sendTransaction', 
        data: {
          toContractId: '2W9NoIJM1SuaFUaSOJsui_5lD_NvCHTjez5HKe2SjYU', 
          toContractFunction: 'createPost', 
          txnData: { post: 'Othent TEST TEST' } 
        }, 
        tags: [ 
          {name: 'Test', value: 'Tag'} 
        ]
      });
      const message = 'Sign transaction Warp button clicked: ' + JSON.stringify(response)
      setOutput(JSON.stringify(message));
      console.log(message)
    } catch (error) {
      setOutput(JSON.stringify(error));
    }
  };




  const handleSendTransactionWarp = async () => {
    try {
      const signedTransaction = await othent.signTransactionWarp({
        othentFunction: 'sendTransaction', 
        data: {
          toContractId: '2W9NoIJM1SuaFUaSOJsui_5lD_NvCHTjez5HKe2SjYU', 
          toContractFunction: 'createPost', 
          txnData: { post: 'Othent TEST TEST' } 
        }, 
        tags: [ 
          {name: 'Test', value: 'Tag'} 
        ]
      });

      const response = await othent.sendTransactionWarp(signedTransaction);
      const message = 'Send transaction Warp button clicked: ' + JSON.stringify(response)
      console.log(message)
      setOutput(JSON.stringify(message));
    } catch (error) {
      setOutput(JSON.stringify(error));
    }
  };




  const handleSignTransactionArweave = async (file) => {
    try {
      const response = await othent.signTransactionArweave({
        othentFunction: 'uploadData', 
        data: file,
        tags: [
          {name: 'Content-Type', value: file.type},
        ]
      });
      const message = 'Sign transaction Arweave button clicked: ' + JSON.stringify(response)
      setOutput(JSON.stringify(message));
      console.log(message)
    } catch (error) {
      setOutput(JSON.stringify(error));
    }
  };
  const handleFileUploadSignArweave = async (event) => {
    const file = event.target.files[0];
    await handleSignTransactionArweave(file);
  };
  



  const handleSendTransactionArweave = async (file) => {
    try {
      const signedTransaction = await othent.signTransactionArweave({
        othentFunction: 'uploadData', 
        data: file,
        tags: [ 
          {name: 'Content-Type', value: file.type} 
        ]
      });

      const response = await othent.sendTransactionArweave(signedTransaction);
      const message = 'Send transaction Arweave button clicked: ' + JSON.stringify(response)
      console.log(response)
      setOutput(message);
    } catch (error) {
      setOutput(JSON.stringify(error));
    }
  };
  const handleFileUploadSendArweave = async (event) => {
    const file = event.target.files[0];
    await handleSendTransactionArweave(file);
  };



  const handleSignTransactionBundlr = async (file) => {
    try {
      const response = await othent.signTransactionBundlr({
        othentFunction: 'uploadData', 
        data: file,
        tags: [
          {name: 'Content-Type', value: file.type},
        ]
      });
      const message = 'Sign transaction Bundlr button clicked: ' + JSON.stringify(response)
      setOutput(JSON.stringify(message));
      console.log(message)
    } catch (error) {
      setOutput(JSON.stringify(error));
    }
  };
  const handleFileUploadSignBundlr = async (event) => {
    const file = event.target.files[0];
    await handleSignTransactionBundlr(file);
  };
  



  const handleSendTransactionBundlr = async (file) => {
    try {
      const signedTransaction = await othent.signTransactionBundlr({
        othentFunction: 'uploadData', 
        data: file,
        tags: [ 
          {name: 'Content-Type', value: file.type} 
        ]
      });

      const response = await othent.sendTransactionBundlr(signedTransaction);
      const message = 'Send transaction Bundlr button clicked: ' + JSON.stringify(response)
      console.log(response)
      setOutput(message);
    } catch (error) {
      setOutput(JSON.stringify(error));
    }
  };
  const handleFileUploadSendBundlr = async (event) => {
    const file = event.target.files[0];
    await handleSendTransactionBundlr(file);
  };




  const handleInitializeJWKClick = async () => {
    const JWK_public_key = `-----BEGIN PUBLIC KEY-----
    MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAiSGYBVYjH2jHL2ZfI3ym
    VWq+bqkPJUP3Zh8NzYrppU77RI+W/Gucg0ZMFHelgeY4xw2axhXWGJqLLFcp1Mr7
    xAZ3wIGLfiwvJNejFOwtJFcPbPoRKkTVLP0wWAZmbeKhnu1wFhfHrn2CYZEsVn2Z
    6BBUnXSo9CIG/Db55tfdcTM6gu6i9z/D3BUOhAeBeSKwqsc+G5KFG/r43I2tvVDp
    zWK8iUqTatRix0tvX1Mf1SLlovtEVBlNglmanTZdosZQyIxCS600ylCAaogWwYmh
    15PMz4Fw/pnkXpvTIGquOfVUoILxh7vbESsNknNKcrcD7uzrPyk7mBZeTDkjS+8a
    vsTIDvibQGHznX/knAP2qiIHxjOmzp4jNRt7DphiIuXJZx5tm6kR7xOUcSiIxH4r
    0tiwWMiP95K1k7d9D8171CEn7YZmNJGYr4a+I8XML5vCq99SowksSoydi+UUN+hU
    NuiMLZKxi2EA/cI/DzX8WqzkLMHix6m8TQDRhUZ7otXiOXhloFWXV2KPiQD9Wiio
    CcGUsGzUlRXxcpite5a3zLG8PoEaLSjZcFZrEd2CvMs44aCmb4JQyP54VE76ojo+
    Opy/0Yb8RMNKoX0QvUeD7NOK+hXBwIDBgm+QrDjgHQ6+RXs72cMiHjl2aib/YRwb
    wW68pg9G6C+iSM9MMwlbBv0CAwEAAQ==
    -----END PUBLIC KEY-----`
    const initializeJWK = await othent.initializeJWK({JWK_public_key: JWK_public_key})
    const message = 'Backup Keyfile button clicked: ' + JSON.stringify(initializeJWK);
    console.log(message);
    setOutput(message);
  };



  const handleJWKBackupTxnClick = async () => {
    const JWK_signed_JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDExMzM3ODIxNjg3NjIxNjM0NjAxNiIsImNvbnRyYWN0X2lkIjoicXYtSjJIVm04ZWV6M0VOaVN3S2FWdVZSajFkYlhRMDZOQkI1NkdJNnRhbyIsInRhZ3MiOlt7Im5hbWUiOiJUZXN0IiwidmFsdWUiOiJKV0tKV0tKV0sifV0sImNvbnRyYWN0X2lucHV0Ijp7ImRhdGEiOnsidG9Db250cmFjdEZ1bmN0aW9uIjoiY3JlYXRlUG9zdCIsInRvQ29udHJhY3RJZCI6IjJXOU5vSUpNMVN1YUZVYVNPSnN1aV81bERfTnZDSFRqZXo1SEtlMlNqWVUiLCJ0eG5EYXRhIjp7ImJsb2dfcG9zdF8xIjoiQkFISEhISEhISEhIISJ9fSwib3RoZW50RnVuY3Rpb24iOiJKV0tCYWNrdXBUeG4ifSwiaWF0IjoxNjgyMDM0NjU3LCJleHAiOjIwNDIwMzQ2NTcsImlzcyI6Imh0dHBzOi8vT3RoZW50LmlvIn0.KdEbgqKLOg2mQf8txKfra1RXV24apWsxx9beSnseKDs-mGWE6XIiWT3SeI2BGLNlQcfMqVyAOnGUVt4tbV-wDLF8IeVUKQpYvSnQRSjI9-0OvlC4lDF33EAH7qWg5n4Oof7belNr1-jHdS448G5Yn4u8VWtUizYKDrIMz7z-6wce8J3thf85BO7GqS0m2Gl-YwMPlxw7TvFBGufp0SnMKEq1ISayJevMKnubTM13jdF3Slsv9pZ5hZ1mA_aofIkbH3pvxtBdv3VSf_QNALasloCNmduHrXNv4QdX0sIp1N6VGDEi5cqsrWHUUe4Vuep1BaQx3vK3NTg_qYJU6cgHlPF4NnBNQEWcFupb5NL6uXIcrutY29ClaYfbm1tN_NmSZjyMcgPGOVtLcJy_nY9GRKy_0bo_WFrpgfvcWJtQ3dnC6iD_hg87BDLWgCzkA_0yL-Tkt2JDVfumzHDsReYbixyV-H1c-UCm8XC0UpGRV0Fv0lNP0fmkzXqH8USxaQ0Dylj5QoK_CbRNq9eXNT6uaBs_XAwuGm8hoOVIXLqnN0pbHUnRZopNAb5q8qvdGXI20dbOZfIcwiELM8Vx_z8KSv4jmLF6i8b4HbF9bnAyZRvDPB36PAM6hYP7KPb3Rl46pOxxdXk5Q4xquKRLNQW1U8G9WvpkUiJ4PyZHe2hz8B0'
    const JWKBackupTxn = await othent.JWKBackupTxn({JWK_signed_JWT})
    const message = 'JWK backup transaction button clicked: ' + JSON.stringify(JWKBackupTxn);
    console.log(message);
    setOutput(message);
  };




  const handleReadCustomContract = async () => {
    const contract_id = '2W9NoIJM1SuaFUaSOJsui_5lD_NvCHTjez5HKe2SjYU'
    const readCustomContract = await othent.readCustomContract({contract_id})
    const message = 'Read custom contract button clicked: ' + JSON.stringify(readCustomContract);
    console.log(message);
    setOutput(message);
  };


  


  return (
    <Styled.MainWrapper>

      <Styled.Container >

        <Styled.DemoOutput>{output}</Styled.DemoOutput>


        <Styled.DemoContainer>

          <Styled.DemoButton onClick={handlePingClick}>Ping</Styled.DemoButton>
          <Styled.DemoButton onClick={handleAddCallbackURL}>Add callback URL</Styled.DemoButton>
          <Styled.DemoButton onClick={handleGetAPIKeys}>API Keys</Styled.DemoButton>
          <Styled.DemoButton onClick={handleLogInClick}>Log In</Styled.DemoButton>
          <Styled.DemoButton onClick={handleLogOutClick}>Log Out</Styled.DemoButton>
          <Styled.DemoButton onClick={handleUserDetailsClick}>User Details</Styled.DemoButton>

          <Styled.DemoButton onClick={handleReadContractClick}>Read Contract</Styled.DemoButton>
          <Styled.DemoButton onClick={handleSignTransactionWarp}>Sign Transaction Warp</Styled.DemoButton>
          <Styled.DemoButton onClick={handleSendTransactionWarp}>Send Transaction Warp</Styled.DemoButton>
          <Styled.DemoButton onClick={handleReadCustomContract}>Read Custom Contract</Styled.DemoButton>

          <label className="upload-button" htmlFor="file-input-sign-a">
            <span>Sign Arweave Data</span>
          </label>
          <Styled.DemoInput id="file-input-sign-a" type="file" onChange={handleFileUploadSignArweave} />

          <label className="upload-button" htmlFor="file-input-upload-a">
            <span>Upload Arweave Data</span>
          </label>
          <Styled.DemoInput id="file-input-upload-a" type="file" onChange={handleFileUploadSendArweave} />

          <label className="upload-button" htmlFor="file-input-sign-b">
            <span>Sign Bundlr Data</span>
          </label>
          <Styled.DemoInput id="file-input-sign-b" type="file" onChange={handleFileUploadSignBundlr} />

          <label className="upload-button" htmlFor="file-input-upload-b">
            <span>Upload Bundlr Data</span>
          </label>
          <Styled.DemoInput id="file-input-upload-b" type="file" onChange={handleFileUploadSendBundlr} />


          <Styled.DemoButton onClick={handleInitializeJWKClick}>Initialize JWK (WILL COMPROMISE WALLET)</Styled.DemoButton>
          <Styled.DemoButton onClick={handleJWKBackupTxnClick}>JWK Backup Txn  (WILL COMPROMISE WALLET)</Styled.DemoButton>

        </Styled.DemoContainer>




      </Styled.Container>
    </Styled.MainWrapper>
  );
};

export default SDKDemo;
