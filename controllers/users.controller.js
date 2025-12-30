
import User from "../model/User.js"

const getAllUsers = async (req, res)=> {
    const users = await User.find()
    if(!users) return res.status(204).json({"message": "No users found."});
    res.json(users)
}

const getSingleUser = async (req, res)=> {
    const {id} = req.params
    if(!id){
        return res.status(400).json({"message": "id parameter is required"})
    }
    const user = await User.findById(id)
    if(!user) return res.status(404).json({"message": "User not found"})
    return res.json(user)
}

export default {
    getAllUsers,
    getSingleUser
}