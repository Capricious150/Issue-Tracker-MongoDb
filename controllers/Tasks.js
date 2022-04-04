const {Task} = require('../models');
const router = require('express').Router();

const taskController = {
    findByProject: async (req,res) => {
        let found = await Task.find({
            project: req.params.title
        })
        console.log(found)
        if (found[0] !== undefined){
            res.status(200).json(found)
        } else {
            console.log("No projects found")
            res.status(500).json({message: "No projects found"})
        }
    },
    findByOwner: async (req,res) => {
        let found = await Task.find({
            owner: req.params.username
        })
        console.log(found)
        if (found[0] !== undefined){
            res.status(200).json(found)
        } else {
            console.log("No projects found")
            res.status(500).json({message: "No projects found"})
        }
    },
    findUnassigned: async (req,res) => {
        let renderedTasks = await Task.find().lean()
        console.log(renderedTasks);
        res.status(200).render('usertasks', {
            renderedTasks
        });
    },
    create: async (req,res) => {
        let newTask = new Task(req.body);
        let savedTask = await newTask.save();
        (err) => {
            if (err){
                res.status(500).json(err)
            }} 
            res.status(200).json(savedTask)           
    },
    update: async (req,res) => {
        res.status(500).json({message: "This route is still pending"})
    },
    delete: async (req,res) => {
        res.status(500).json({message: "This route is still pending"})
    },
}

router.get('/', taskController.findUnassigned);
router.get('/project/:title', taskController.findByProject);
router.get('/owner/:username', taskController.findByOwner);
router.post('/create', taskController.create);
router.put('/update/:param', taskController.update);
router.delete('/delete/:param', taskController.delete);


module.exports = router;