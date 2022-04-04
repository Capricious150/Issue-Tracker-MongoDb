const {Task, Project} = require('../models');
const router = require('express').Router();

const taskController = {
    findByProject: async (req,res) => {
        let found = await Task.find({
            project: req.params.title,
            resolved: false
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
            owner: req.params.username,
            resolved: false
        })
        console.log(found)
        if (found[0] !== undefined){
            res.status(200).json(found)
        } else {
            console.log("No projects found")
            res.status(500).json({message: "No projects found"})
        }
    },
    findAll: async (req,res) => {
        let projectList = await Project.find().lean()
        let resolvedPage = false;
        let renderedTasks = await Task.find({
            resolved: false
        }).lean()
        console.log(renderedTasks);
        res.status(200).render('usertasks', {
            renderedTasks,
            resolvedPage,
            projectList
        });
    },
    findAllResolved: async (req,res) => {
        let resolvedPage = true;
        let renderedTasks = await Task.find({
            resolved: true
        }).lean()
        console.log(renderedTasks);
        res.status(200).render('usertasks', {
            renderedTasks,
            resolvedPage,
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
    resolve: (req,res) => {
        Task.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                resolved: true,
                resolved_on: new Date()
            },
            (err, result) => {
                if (err) {
                    res.status(500).json({message: "Something went terribly wrong!"})
                } else {
                    res.status(200).json(result)
                }
            })
    },
    delete: async (req,res) => {
        res.status(500).json({message: "This route is still pending"})
    },
}

router.get('/', taskController.findAll);
router.get('/resolved', taskController.findAllResolved);
router.get('/project/:title', taskController.findByProject);
router.get('/owner/:username', taskController.findByOwner);
router.post('/create', taskController.create);
router.put('/update/:param', taskController.update);
router.put('/resolve/:id', taskController.resolve);
router.delete('/delete/:param', taskController.delete);


module.exports = router;