const {User} = require('../models');
const router = require('express').Router();

const userController = {

    find: async (req,res) => {
        let found = await User.find({
            username: req.params.username
        })
        console.log(found)
        if (found[0] !== undefined){
            console.log(found[0].username)
            res.status(200).json(found)
        } else {
            console.log("No users found")
            res.status(500).json({message: "No users found"})
        }
    },
    findAll: async (req,res) => {
        let found = await User.find()
        res.status(200).json(found)
    },
    create: async (req,res) => {

        let notADup = await User.find({
            username: req.body.username
        })
        console.log(notADup)
        if (notADup[0] === undefined){
        let newUser = new User(req.body);
        let savedUser = await newUser.save();
        (err) => {
        if (err){
            res.status(500).json(err)
        }} 
        res.status(200).json(savedUser)       
        } else {
            res.status(500).json({message: "Usernames must be unique! Please choose a different username."})
        }

    },
    update: async (req,res) => {
        let updatedUser = await User.findOneAndUpdate(
            {username: req.params.username},
            {
                $set:
                {
                    username: req.body.username,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name
                }
            }
        )
        let updateUserDone = updatedUser
        if (updateUserDone) {
            res.status(200).json(updateUserDone)
        } else {
            res.status(400).json({message: "Something went terribly wrong!"})
        }
    },
    delete: async (req,res) =>{
        let deletedUser = await User.findOneAndDelete({
            username: req.params.username
        })
        let deletedUserDone = deletedUser
        if (deletedUserDone){
            res.status(200).json(deletedUserDone)
        } else {
            res.status(500).json({message: "Something went terribly wrong!"})
        }
    }
}

router.get('/', userController.findAll);
router.get('/:username', userController.find);
router.post('/create', userController.create);
router.put('/update/:username', userController.update);
router.delete('/delete/:username', userController.delete);

module.exports = router;