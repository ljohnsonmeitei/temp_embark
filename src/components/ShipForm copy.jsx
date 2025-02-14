import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MetricsStatus from './ShipMetrics'; // Import MetricsStatus component

const ShipForm = () => {
  const [formData, setFormData] = useState({
    shipName: "",
    embarkationPort: "",
    voyageNumber: "",
    emailTo: "",
    shipArrivalTime: null,
    pierConnection: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false); // New state to track form submission

  const ships = [
    "Breeze", "Celebration", "Conquest", "Dream", "Elation", "Firenze", 
    "Freedom", "Glory", "Horizon", "Jubilee", "Legend", "Liberty", 
    "Luminosa", "Magic", "Mardi Gras", "Miracle", "Panorama", "Paradise", 
    "Pride", "Radiance", "Spirit", "Splendor", "Sunrise", "Sunshine", 
    "Venezia", "Vista", "Valor"
  ];

  const pier_connection = ["Wired", "Satellite", "Fiber Kit", "Wireless"];

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target ? event.target.value : event,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    setFormSubmitted(true); // Set form submission state to true
  };

  if (formSubmitted) {
    return <MetricsStatus formData={formData} />; // Show metrics status after form submission
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Ship Name"
              value={formData.shipName}
              onChange={handleChange("shipName")}
              required
            >
              {ships.map((ship) => (
                <MenuItem key={ship} value={ship}>
                  {ship}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Embarkation Port"
              value={formData.embarkationPort}
              onChange={handleChange("embarkationPort")}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Voyage Number"
              value={formData.voyageNumber}
              onChange={handleChange("voyageNumber")}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email To"
              type="email"
              value={formData.emailTo}
              onChange={handleChange("emailTo")}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DateTimePicker
              label="Ship Arrival Time"
              value={formData.shipArrivalTime}
              onChange={handleChange("shipArrivalTime")}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Pier Connection"
              value={formData.pierConnection}
              onChange={handleChange("pierConnection")}
              required
            >
            {pier_connection.map((pier) => (
                <MenuItem key={pier} value={pier}>
                  {pier}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default ShipForm;