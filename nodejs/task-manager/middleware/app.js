const express = require('express');
const taskRoutes = require('../routes/taskRoutes')

const app = express();

app.use(express.json());
app.use('/api/v1/tasks', taskRoutes);

app.all('/{*splat}', (req, res, next) => {
  res.status(404).json({
    message: 'You entered a wrong url'
  });
});


app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
})


module.exports = app;