const express = require('express');

const app = express(); // init

app.get('/', (req, res) =>
  res.send({ msg: 'Welcome to the it logger api...' })
);

// Routes
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
