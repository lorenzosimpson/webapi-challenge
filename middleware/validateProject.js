const projectDb = require('../data/helpers/projectModel');

const validateProject = (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ error: 'Please provide a project name and description'})
    }
    else {
        next();
    }
}

module.exports = validateProject;