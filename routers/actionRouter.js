const express = require('express');
const actionDb = require('../data/helpers/actionModel');
const validateAction = require('../middleware/validateAction');

const router = express.Router();

router.get('/', (req, res) => {
    actionDb.get()
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({ error: "Failed to get actions" }))
})

router.post('/', validateAction, (req, res) => {
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

router.put('/:id', validateAction, (req, res) => {
    const id = req.params.id;
    const project_id = req.body.project_id;
    const toUpdate = req.body;
    actionDb.get(id)
    .then(action => {
        if (action) {
            if (action.project_id === project_id) {
                actionDb.update(id, toUpdate)
                .then(updated => {
                    if (updated) {
                        res.status(200).json({ message: `Successfully updated action ${id} on project ${project_id}`})
                    } else {
                        res.status(500).json({ error: "Failed to update action" })
                    }
                })
                .catch(err => console.log(err))
            } else {
                res.status(404).json({ error: 'Failed: Action does not belong to this project id'})
            }
        } else {
            res.status(404).json({ error: 'Action not found'})
        }   
    })
    .catch(err => res.status(500).json({ error: 'Failed to find action to update'}))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    actionDb.remove(id)
    .then(deleted => res.status(200).json({ message: `Deleted ${deleted} action`}))
    .catch(err => res.status(500).json({ error: 'Failed to delete action'}))
})

module.exports = router;