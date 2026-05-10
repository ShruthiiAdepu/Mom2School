const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/setup', auth, role(['parent']), (req, res) => {
  res.json({ message: 'Parent profile setup saved!' });
});

module.exports = router;
