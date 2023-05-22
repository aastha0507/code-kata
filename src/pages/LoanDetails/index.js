import React, { useEffect, useState } from 'react';
import { Layout, Space, Spin } from 'antd';
import { footerStyle } from './styles.js';
import { Content } from 'antd/es/layout/layout.js';
import { contentStyle, headerStyle, headerText } from './styles.js';
import DetailsForm from '../../components/form.js';
import { applicationId } from '../../api/server.js';
import { useNavigate } from 'react-router-dom';
import { Route as RouteName } from '../../navigation/routes.js';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const { Header, Footer } = Layout;

const LoanDetails = () => {
  const [appToken, setAppToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    applicationId()
      .then((response) => response.json())
      .then((data) => {
        setAppToken(data.appId);
      });
  });

  const requestBalanceSheet = (form) => {
    const data = {
      tokenId: appToken,
      accountingProvider: form.accountingProvider,
      businessName: form.businessName,
      startYear: form.yearEstablished,
      loanAmount: form.loanAmount,
    };

    navigate(RouteName.viewDetails, { state: { data } });
  };

  return appToken ? (
    <Space
      direction='vertical'
      style={{ width: '100%', height: '100%' }}
      size={[0, 64]}
    >
      <Layout>
        <AppBar
          position='static'
          color='primary'
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant='h6' color='inherit'>
              Demyst business loan application system
            </Typography>
          </Toolbar>
        </AppBar>

        <Content style={contentStyle}>
          <DetailsForm onFinish={(form) => requestBalanceSheet(form)} />
        </Content>
      </Layout>
    </Space>
  ) : (
    <Space
      direction='vertical'
      style={{ width: '100%', height: '100%', justifyContent: 'center' }}
      size={[0, 64]}
    >
      <Spin tip='Loading' size='large'>
        <div className='content' />
      </Spin>
    </Space>
  );
};

export default LoanDetails;
