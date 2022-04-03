const {Project} = require('../models');
const router = require('express').Router();

const projectController = {
    find: async (req,res) => {
        let found = await Project.find({
            title: req.params.title
        })
        console.log(found)
        if (found[0] !== undefined){
            console.log(found[0].title)
            res.status(200).json(found)
        } else {
            console.log("No projects found")
            res.status(500).json({message: "No projects found"})
        }
    },
    findAll: async (req,res) => {
        let found = await Project.find()
        res.status(200).json(found)
    },
    create: async (req,res) => {

        let notADup = await Project.find({
            title: req.body.title
        })
        console.log(notADup)
        if (notADup[0] === undefined){
        let newProject = new Project(req.body);
        let savedProject = await newProject.save();
        (err) => {
        if (err){
            res.status(500).json(err)
        }} 
        res.status(200).json(savedProject)       
        } else {
            res.status(500).json({message: "Titles must be unique! Please choose a different project title."})
        }

    },
    update: async (req,res) => {
        let updatedProject = await Project.findOneAndUpdate(
            {title: req.params.title},
            {
                $set:
                {
                    title: req.body.title,
                    proj_desc: req.body.desc,
                }
            }
        )
        let updateProjectDone = updatedProject
        if (updateProjectDone) {
            res.status(200).json(updateProjectDone)
        } else {
            res.status(400).json({message: "Something went terribly wrong!"})
        }
    },
    delete: async (req,res) =>{
        let deletedProject = await Project.findOneAndDelete({
            title: req.params.title
        })
        let deletedProjectDone = deletedProject
        if (deletedProjectDone){
            res.status(200).json(deletedProjectDone)
        } else {
            res.status(500).json({message: "Something went terribly wrong!"})
        }
    }
}

router.get('/', projectController.findAll);
router.get('/:title', projectController.find);
router.post('/create', projectController.create);
router.put('/update/:title', projectController.update);
router.delete('/delete/:title', projectController.delete);




module.exports = router;