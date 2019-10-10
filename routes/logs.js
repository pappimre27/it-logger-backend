const express = require('express');
const router = express.Router();

// @route       GET api/logs
// @desc        Get all logs
// @access      Public
router.get('/', (req, res) => {
  res.send('Get all logs');
});

// @route       POST api/logs
// @desc        Add a log
// @access      Public
router.post('/', (req, res) => {
  res.send('Add a log');
});

// @route       PUT api/logs/:id
// @desc        Update a log
// @access      Public
router.put('/:id', (req, res) => {
  res.send('Update a log');
});

// @route       DELETE api/logs/:id
// @desc        Delete a log
// @access      Public
router.delete('/:id', (req, res) => {
  res.send('Delete a log');
});

module.exports = router;
