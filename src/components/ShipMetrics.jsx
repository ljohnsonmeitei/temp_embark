import React from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';

const handleBackClick = () => {
    navigate('/');
  };

const MetricsStatus = ({ formData }) => {
  const formattedArrivalTime = formData.shipArrivalTime
    ? formData.shipArrivalTime.format('YYYY-MM-DD HH:mm') // You can adjust the format
    : 'Not provided';

  return (
    <Grid container spacing={3}>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Ship Arrival Time (Unofficial):</Typography>
            <Typography>{formattedArrivalTime}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Connect Ship-Shore Network Cable:</Typography>
            <Typography>Status: Success</Typography> {/* Adjust logic based on your checks */}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Ping Router in Terminal to Verify Gangway Connection:</Typography>
            <Typography>Status: Success</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Ping unisys.carnival.com from Unix Server:</Typography>
            <Typography>Status: Success</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Verify Embarkation Card Printer Setup:</Typography>
            <Typography>Status: Failure</Typography> {/* Adjust logic here */}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Verify Guest Logistics Agents and Supervisors Login:</Typography>
            <Typography>Status: Success</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Verify mBark Connectivity and Manifest Download:</Typography>
            <Typography>Status: Success</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Verify Ezboard Phones are Displaying Correct Voyage:</Typography>
            <Typography>Status: Success</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Pier Connection (Wired, Satellite, Fiber Kit):</Typography>
            <Typography>Status: {formData.pierConnection}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MetricsStatus;
