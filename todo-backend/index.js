const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//  tasks Router

const tasksRouter = require('./controllers');

app.use(tasksRouter);



app.listen(3001, () => console.log('Server running on port 3001'));
