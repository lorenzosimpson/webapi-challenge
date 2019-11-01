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

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const toUpdate = req.body;
    projectDb.update(id, toUpdate)
    .then(updated => res.status(200).json(updated))
    .catch(err => res.status(500).json({ error: 'Failed to update project' }))

})

module.exports = router;