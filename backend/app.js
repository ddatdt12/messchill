const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const connectDB = require('./database');
const authRoute = require('./routes/auth');
const conversationRoute = require('./routes/conversation');
const userRoute = require('./routes/user');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/AppError');
const mongoose = require('mongoose');

//Config
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/conversations', conversationRoute);

app.get('/', (req, res) => {
  res.send('Hello chat app');
});

app.all('*', (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server`,
    404,
  );
  next(error);
});

app.use(errorHandler);

//Socket
require('./socket')(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
