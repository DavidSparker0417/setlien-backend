import bodyParser from "body-parser";
import { executeCommand } from "./utility/system";

const express = require('express');
const dotenv = require('dotenv');
const prcs = require('child_process');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json())

app.post('/api/mint', async (req: any, res: any) => {
  const data:any = req.body
  console.log(`[DAVID] reqData = ${JSON.stringify(data)}`)
  const [result, wrapResult] = await executeCommand(`soroban lab token wrap --asset "${data.asset}" --rpc-url ${data.rpc} --network-passphrase "${data.passphrase}" --source-account plutus`)
  if (!result)
    res.status(400).send('failed to mint');
  res.status(200).send(wrapResult.trim());
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});