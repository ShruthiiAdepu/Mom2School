const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/setup', auth, role(['rider']), upload.none(), (req, res) => {
  res.json({ message: 'Rider profile setup saved!' });
});

module.exports = router;
