const express = require('express');
const router = express.Router();

// @route       GET api/techs
// @desc        Get all techs
// @access      Public
router.get('/', (req, res) => {
  res.send('Get all techs');
});

// @route       POST api/techs
// @desc        Add a tech
// @access      Public
router.post('/', (req, res) => {
  res.send('Add a tech');
});

// // @route       DELETE api/techs/:id
// // @desc        Delete a tech
// // @access      Public
router.delete('/:id', (req, res) => {
  res.send('Delete a tech');
});

module.exports = router;
