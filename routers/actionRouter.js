const express = require('express');
const actionDb = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    actionDb.get()
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({ error: "Failed to get actions" }))
})

router.post('/', (req, res) => {
    const newAction = req.body;
    const projectId = req.body.project_id;
    actionDb.get(projectId)
    .then(actionFound => {
        if (actionFound) {
            actionDb.insert(newAction)
            .then(actionAdded => {
                res.status(201).json(actionAdded)
            })
        } else {
            res.status(400).json({ error: 'Can\'t add action to a project that doesn\'t exist' })
        }
    })
    
    .catch(err => res.status(500).json({ error: 'Failed to add new action' }))
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const toUpdate = req.body;
    actionDb.update(id, toUpdate)
    .then(updated => res.status(200).json(updated))
    .catch(err => res.status(500).json({ error: "Failed to update action" }))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    actionDb.remove(id)
    .then(deleted => res.status(200).json({ message: `Deleted ${deleted} action`}))
    .catch(err => res.status(500).json({ error: 'Failed to delete action'}))
})

module.exports = router;