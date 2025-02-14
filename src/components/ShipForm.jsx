import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  CircularProgress,
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
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const [loading, setLoading] = useState(false); // State to track API call
  const [apiResponse, setApiResponse] = useState(""); // State to track API response

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

  const triggerPipeline = async (data) => {
    setLoading(true);
    setApiResponse(""); // Reset response message
    try {
      const response = await fetch("http://localhost:5000/trigger-pipeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setApiResponse("Pipeline triggered successfully!");
        setFormSubmitted(true);
      } else {
        const errorText = await response.text();
        setApiResponse(`Error triggering pipeline: ${errorText}`);
      }
    } catch (error) {
      setApiResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);

    const pipelineParams = {
      agent_name: formData.shipName,
      ship_arrival_time: formData.shipArrivalTime ? formData.shipArrivalTime.toISOString() : "", // Convert to ISO format
      embarkation_port: formData.embarkationPort,
      voyage_number: formData.voyageNumber,
      pier_connection: formData.pierConnection,
    };

    triggerPipeline(pipelineParams); // Trigger the backend API
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Grid>

          {apiResponse && (
            <Grid item xs={12}>
              <Typography color={apiResponse.includes("Error") ? "error" : "primary"}>
                {apiResponse}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default ShipForm;
