import tokenService from "../services/tokenService.js";
import userDetails from "../models/userModel.js";
import userModel from "../models/userModel.js";

class authController{
    async registerHandler(req, res) {
        let existingUser = await userDetails.findOne({email:req.body.email});
        if(existingUser)
        {
            return res.status(400).json({success:false, errors:"Existing User found with same email"})
        }
        const newUser = new userModel({
            fullName:req.body.fullName,
            gender:req.body.gender,
            contact:req.body.contact,
            email:req.body.email,
            password:req.body.password,
            city:req.body.city,
            country:req.body.country,
        })
        const ToSaveNewUser = await newUser.save();
        const token = tokenService.generateToken({email:req.body.email});
        console.log(token)
        res.json({success:true, token})
    }

    async loginHandler(req, res) {
        // console.log(req.body)
        let existingUser = await userDetails.findOne({email:req.body.email});
        // console.log(existingUser)
        if(existingUser)
        {
            const passCheck = req.body.password === existingUser.password
            if(passCheck)
            {
                const token = tokenService.generateToken({email:req.body.email});
                return res.json({success:true, token, user: existingUser})
            }
            else
            {
                return res.json({success:false, errors:"Wrong password"})
            }
        }
        else
        {
            return res.json({success:false, errors:"No existing User with this Email Id"})
        }
    }

}

export default new authController();
