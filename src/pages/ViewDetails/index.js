import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
// import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBalanceSheet } from '../../api/server';
import { Route as RouteName } from '../../navigation/routes.js';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const columns = [
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: 'Month',
    dataIndex: 'month',
    key: 'month',
  },
  {
    title: 'Profile Or Loss',
    dataIndex: 'profitOrLoss',
    key: 'profitOrLoss',
  },
  {
    title: 'Assets Value',
    key: 'assetsValue',
    dataIndex: 'assetsValue',
  },
];

export default function ViewDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0) {
      getBalanceSheet(state.data)
        .then((response) => response.json())
        .then((data) => {
          setData(data.sheet);
        });
    }
  }, []);
  return (
    <div>
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
      <Stack mt={4}>
        <Typography variant='h3' color='inherit'>
          Review Application
        </Typography>
      </Stack>
      <Stack mt={8} ml={40} mr={20}>
        <TableContainer>
          <Table
            sx={{ maxWidth: 700 }}
            aria-label='simple table'
            columns={columns}
            dataSource={data}
          >
            {' '}
            {/* <TableBody>
                <TableRow
                  columns={columns}
                  dataSource={data}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                ></TableRow>
              </TableBody> */}
          </Table>
        </TableContainer>{' '}
      </Stack>
      <Grid mt={5}>
        <Button
          variant='contained'
          onClick={() => {
            const mapDecisionData = {
              ...state.data,
              sheet: data,
            };
            navigate(RouteName.outcome, { state: { mapDecisionData } });
          }}
        >
          Submit Application
        </Button>{' '}
      </Grid>
      {/* <div>
        <Table columns={columns} dataSource={data} />
      </div> */}
    </div>
  );
}
