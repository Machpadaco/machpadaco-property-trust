const Property = require('../models/Property');
const nipostService = require('../services/nipostService');
exports.verifyPostcode = async (req, res) => {
  const { code } = req.body;
  const result = await nipostService.lookupPostcode(code);
  res.json(result);
};
exports.registerProperty = async (req, res) => {
  try {
    const { postcode, ownerName } = req.body;
    const nipostResult = await nipostService.lookupPostcode(postcode);
    res.json({ success: true, mock: true, nipost: nipostResult, owner: ownerName });
  } catch(err){ res.status(500).json({ error: err.message }); }
};
exports.getAllProperties = async (req, res) => {
  res.json([{ postcode: "AB16A55AK04", owner: "Engr. Ejike", location: "Umuahia North" }]);
};