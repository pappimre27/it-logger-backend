const express = require('express');
const bodyParser = require('body-parser').json();
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Log = require('../models/Log');

// @route       GET api/logs
// @desc        Get all logs
// @access      Public
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find({}).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/logs
// @desc        Add a log
// @access      Public
router.post(
  '/',
  [
    bodyParser,
    [
      check('message', 'Message is required')
        .not()
        .isEmpty(),
      check('tech', 'A technician is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, attention, tech } = req.body;

    try {
      const newLog = new Log({
        message,
        attention,
        tech
      });
      const log = await newLog.save();
      res.json(log);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/logs/:id
// @desc        Update a log
// @access      Public
router.put('/:id', bodyParser, async (req, res) => {
  const { message, attention, tech } = req.body;
  // Build log object

  const logFields = {};
  if (message) logFields.message = message;
  if (attention) logFields.attention = attention;
  if (tech) logFields.tech = tech;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );
    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/logs/:id
// @desc        Delete a log
// @access      Public
router.delete('/:id', bodyParser, async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Log removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
