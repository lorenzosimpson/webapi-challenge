const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    projectDb.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: 'Failed to get projects' }))
})

module.exports = router;