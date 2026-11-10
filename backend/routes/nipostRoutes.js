const express = require('express');
const router = express.Router();
const nipostService = require('../services/nipostService');
router.post('/lookup', async (req, res) => {
  const { code } = req.body;
  const result = await nipostService.lookupPostcode(code);
  res.json(result);
});
router.post('/validate', (req, res) => {
  const { code } = req.body;
  res.json({ isValid: nipostService.validatePostcode(code) });
});
module.exports = router;