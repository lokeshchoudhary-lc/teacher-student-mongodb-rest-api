const express = require('express');

const cors = require('cors');

const createError = require('http-errors');

require('dotenv').config();

require('./db/index');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
  res.send('Hello World 😀');
});

const studentRoute = require('./routes/student.route');
const teacherRoute = require('./routes/teacher.route');

app.use('/student', studentRoute);
app.use('/teacher', teacherRoute);

app.use(async (_req, _res, next) => {
  const error = createError.NotFound();
  next(error);
});

app.use((err, _req, res) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => console.log(`Running Server On Port ${PORT} 🚀`));
