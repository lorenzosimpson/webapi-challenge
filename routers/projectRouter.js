const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const validateProject = require('../middleware/validateProject')

const router = express.Router();

router.get('/', (req, res) => {
    projectDb.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: 'Failed to get projects' }))
})

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    projectDb.getProjectActions(id)
    .then(projectActions => res.status(200).json(projectActions))
    .catch(err => res.status(500).json({ message: `Failed to get actions for project ${id}`}))
})

router.post('/', validateProject, (req, res) => {
    const newProject = req.body;
    projectDb.insert(newProject)
    .then(addedProject => res.status(201).json(addedProject))
    .catch(err => res.status(500).json({ error: 'Failed to add project'}))
})

router.put('/:id', validateProject, (req, res) => {
    const id = req.params.id;
    const toUpdate = req.body;
    projectDb.get(id)
    .then(project => {
        if (project) {
            projectDb.update(id, toUpdate)
            .then(updated => res.status(200).json({message: 'Project updated successfully'}))
            .catch(err => res.status(500).json({ error: 'Failed to update project' }))
        } 
        else {
            res.status(404).json({ error: `No project with id ${id} exists`})
        }
    })
    .catch(err => res.status(500).json({ error: 'Failed to find project to update' }))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    projectDb.remove(id)
    .then(deleted => res.status(200).json({ message: `Deleted ${deleted} project`}))
    .catch(err => res.status(500).json({ error: 'Failed to delete project'}))
})

module.exports = router;