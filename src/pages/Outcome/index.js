import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Space, Spin, Result, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { getDecision } from '../../api/server';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack, Grid, Card, CardContent } from '@mui/material';

const Outcome = () => {
  const { state } = useLocation();
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    if (outcome === null) {
      getDecision(state.mapDecisionData)
        .then((response) => response.json())
        .then((data) => {
          console.log('okayy', data);
          setOutcome(data);
        });
    }
  });
  return outcome ? (
    <Space
      direction='vertical'
      style={{ width: '100%', height: '100%', justifyContent: 'center' }}
    >
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
      <Grid mt={5} mr={10} ml={20}>
        <Card>
          {' '}
          <CardContent>
            <Stack>
              <Result
                status='success'

                // title=' Your loan application has been {outcome.outcome}'
                // subTitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
              />
              <Typography variant='h5'>
                Your loan application has been {outcome.outcome}
              </Typography>
            </Stack>
            <Stack mt={4}>
              <Typography variant='h3' color='inherit'>
                Approved amount is {outcome.approvedAmount}
              </Typography>
            </Stack>
            <Stack mt={4}>
              <Typography variant='h3' color='inherit'>
                Approved term {outcome.approvedTerm}
              </Typography>
            </Stack>
            <Stack mt={4} mb={4}>
              <Typography variant='h3' color='inherit'>
                Interest rate {outcome.approvedInterestRate}
              </Typography>
            </Stack>
            <Button type='primary' key='console'>
              Go Back
            </Button>
            <Button key='buy'>Buy Again</Button>
          </CardContent>
        </Card>
      </Grid>
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

export default Outcome;
