import express from 'express';  // Import express
import axios from 'axios';      // Import axios
import bodyParser from 'body-parser'; // Import body-parser
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();               // Load .env file

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.json());

const ADO_ORG = process.env.ADO_ORG; // Organization Name
const ADO_PROJECT = process.env.ADO_PROJECT; // Project Name
const PIPELINE_ID = process.env.PIPELINE_ID; // Pipeline ID
const PAT_TOKEN = process.env.PAT_TOKEN; // Personal Access Token

// Trigger Pipeline Endpoint
app.post("/trigger-pipeline", async (req, res) => {
  const { param1, param2 } = req.body;

  const payload = {
    "resources": {
      "repositories": {
        "self": {
          "refName": "refs/heads/sasmita"
        }
      }
    },
    "templateParameters": {
      "agent_name": "freedom",
      "ship_arrival_time": "09:00 AM",
      "embarkation_port": "Sample",
      "voyage_number": "sample",
      "pier_connection": "sample_pier"
    }
  };

  try {
    const response = await axios.post(
      `https://dev.azure.com/${ADO_ORG}/${ADO_PROJECT}/_apis/pipelines/3790/runs?api-version=7.0`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${Buffer.from(`:${PAT_TOKEN}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response)
    res.status(200).send("Pipeline triggered successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.response?.data || "Error triggering pipeline");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
