const express = require('express');
const router = express.Router();

// POST /api/verify - Verify postcode
router.post('/', async (req, res) => {
  try {
    const { postcode } = req.body;
    if (!postcode) {
      return res.json({ success: false, message: 'Postcode required. Use AB 16 A55 AK 04 format' });
    }
    const code = postcode.replace(/\s+/g, '').toUpperCase();
    
    const mockCodes = {
      'AB16A55AK04': { address: 'Highway Talk, 42 Warri Street, Umuahia North, Abia', type: 'Commercial Building', lga: 'Umuahia North', verified: true },
      'AB16A55AK02': { address: 'Highway Talk Plaza, Umuahia', type: 'Commercial', lga: 'Umuahia North', verified: true },
      'AB16A55AK23': { address: 'Warri Street, Umuahia', type: 'Residential', lga: 'Umuahia North', verified: true }
    };

    if (mockCodes[code]) {
      return res.json({ success: true, postcode: code, ...mockCodes[code], source: 'Machpadaco Mock - Real after KYB' });
    }

    if (code.length === 11) {
      return res.json({ success: true, postcode: code, address: 'Verified building (mock)', type: 'Building', lga: 'Umuahia', verified: true, source: 'Mock - AB16A55AK04 is real' });
    }

    res.json({ success: false, message: 'Invalid postcode format. Use AB 16 A55 AK 04 format' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:code', async (req, res) => {
  const code = req.params.code.replace(/\s+/g, '').toUpperCase();
  res.json({ success: true, postcode: code, address: 'Highway Talk, Umuahia', verified: true });
});

module.exports = router;