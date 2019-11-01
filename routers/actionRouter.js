const express = require('express');
const actionDb = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    actionDb.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => res.status(500).json({ error: "Failed to get actions" }))
})

router.post('/', (req, res) => {
    const newAction = req.body;
    actionDb.insert(newAction)
    .then(actionAdded => {
        res.status(201).json(actionAdded)
    })
    .catch(err => res.status(500).json({ error: 'Failed to add new action' }))
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const toUpdate = req.body;
    actionDb.update(id, toUpdate)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(err => res.status(500).json({ error: "Failed to update action" }))
})

module.exports = router;