const actionDb = require('../data/helpers/actionModel');

const validateAction = (req, res, next) => {
    if (!req.body.project_id) {
        res.status(400).json({ error: 'Please include project_id'})
    } else if (!req.body.description) {
        res.status(400).json({ error: 'Please include description'})
    } else if (!req.body.notes) {
        res.status(400).json({ error: 'Please include notes'})
    } else {
        next();
    }
}

module.exports = validateAction;
