const express = require('express');
const bodyParser = require('body-parser').json();
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Tech = require('../models/Tech');

// @route       GET api/techs
// @desc        Get all techs
// @access      Public
router.get('/', async (req, res) => {
  try {
    const techs = await Tech.find({});
    res.json(techs);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/techs
// @desc        Add a tech
// @access      Public
router.post(
  '/',
  [
    bodyParser,
    [
      check('firstname', 'Firstname is required')
        .not()
        .isEmpty(),
      check('lastname', 'Lastname is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname } = req.body;

    try {
      const newTech = new Tech({
        firstname,
        lastname
      });
      const tech = await newTech.save();
      res.json(tech);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

// // @route       DELETE api/techs/:id
// // @desc        Delete a tech
// // @access      Public
router.delete('/:id', bodyParser, async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: 'Tech not found' });

    await Tech.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Tech removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
