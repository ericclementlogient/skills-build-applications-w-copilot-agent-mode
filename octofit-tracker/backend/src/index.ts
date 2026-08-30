import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' });
});

app.listen(port, () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;

  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});