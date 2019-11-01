const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    projectDb.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: 'Failed to get projects' }))
})

router.post('/', (req, res) => {
    const newProject = req.body;
    projectDb.insert(newProject)
    .then(addedProject => res.status(201).json(addedProject))
    .catch(err => res.status(500).json({ error: 'Failed to add project'}))
})

module.exports = router;