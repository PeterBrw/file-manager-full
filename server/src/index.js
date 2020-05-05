require('dotenv').config();

import { startExpress } from './express';

startExpress(process.env);