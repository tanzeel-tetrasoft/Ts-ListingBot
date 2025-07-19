const express = require('express');
const router = express.Router();
const License = require('../models/License');

// POST /api/licenses — Create a license
router.post('/', async (req, res) => {
  try {
    const { key, issuedTo, expiryDate, packageType, deviceId } = req.body;
    if (!key || !issuedTo || !expiryDate || !packageType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const license = new License({
      key,
      issuedTo,
      expiryDate,
      packageType,
      deviceId
    });

    await license.save();
    res.status(201).json(license);
  } catch (error) {
    console.error('Create License Error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/licenses/verify — Verify license key
router.post('/', async (req, res) => {
  try {
    const { key, issuedTo, expiryDate, packageType, deviceId } = req.body;
    if (!key || !issuedTo || !expiryDate || !packageType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const license = new License({
      key,
      issuedTo,
      expiryDate,
      packageType,
      deviceId
    });

    await license.save();
    res.status(201).json(license);
  } catch (error) {
    // Handle duplicate key (MongoDB error code 11000)
    if (error.code === 11000) {
      return res.status(409).json({ error: 'This license key is already in use' });
    }

    console.error('Create License Error:', error.message, error.stack);
    res.status(500).json({ error: 'Server error.' });
  }
});


// GET /api/licenses — Fetch all licenses
router.get('/', async (req, res) => {
  try {
    const licenses = await License.find();
    res.json(licenses);
  } catch (error) {
    console.error('Fetch Licenses Error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
