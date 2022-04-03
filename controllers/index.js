const router = require('express').Router()

const userRoutes = require('./Users');
const projectRoutes = require('./Projects');
const taskRoutes = require('./Tasks');

router.use('/users/', userRoutes);
router.use('/projects/', projectRoutes);
router.use('/tasks', taskRoutes);

module.exports = router