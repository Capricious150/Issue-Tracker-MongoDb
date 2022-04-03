const {User} = require('../models');
const router = require('express').Router();
console.log(User)
const userController = {

    find: async (req,res) => {
        let found = await User.find({
            username: req.params.username
        })
        res.status(200).json(found)
    },
    findAll: async (req,res) => {
        let found = await User.find()
        res.status(200).json(found)
    },
    create: async (req,res) => {
        let newUser = new User(req.body);
        let savedUser = await newUser.save();
        (err) => {
        if (err){
            res.status(500).json(err)
        }} 
        res.status(200).json(savedUser)       
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
    }
}

router.get('/', userController.findAll);
router.get('/:username', userController.find);
router.post('/create', userController.create);
router.put('/update/:username', userController.update);

module.exports = router;