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
  const { agent_name, ship_arrival_time, embarkation_port, voyage_number, pier_connection } = req.body;

  const payload = {
    "resources": {
      "repositories": {
        "self": {
          "refName": "refs/heads/sasmita"
        }
      }
    },
    "templateParameters": {
      "agent_name": agent_name.toLowerCase(),
      "ship_arrival_time": ship_arrival_time,
      "embarkation_port": embarkation_port,
      "voyage_number": voyage_number,
      "pier_connection": pier_connection
    }
  };

  try {
    const response = await axios.post(
      `https://dev.azure.com/carnivalcruiselines/CCL Network Automation/_apis/pipelines/3790/runs?api-version=7.0`,
      payload,
      {
        headers: {
          Authorization: `Bearer LMFZFCCg2CHwc3IoYd1gxzYIA6xmBgploiOxaMYRlD1RDbYScZR3JQQJ99BAACAAAAA6KWxWAAASAZDOxk2V`, // Use PAT from environment variable
          "Content-Type": "application/json",
        },
      }
    );
    
    console.log(response.data);
    res.status(200).send("Pipeline triggered successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.response?.data || "Error triggering pipeline");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
