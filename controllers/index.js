const router = require('express').Router()

const userRoutes = require('./Users')
const projectRoutes = require('./Projects')

router.use('/users/', userRoutes);
router.use('/projects/', projectRoutes);

module.exports = router