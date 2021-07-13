const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check,validationResult } = require('express-validator');

const User = require('../../models/User'); //importing user model

// @route post route
// @description from this route user is registered 

router.post('/',[
    check('name','name is required')
    .not()
    .isEmpty(),
    check('email','please enter the valid email').isEmail(),
    check('password','please enter the strong password with 6 or more characters ').isLength({min : 6}),

], async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {name , email ,password} = req.body;

    try {
        //see if the user is exit 
        let user = await User.findOne( { email });
        if (user ){
           return res.status(400).json({ errors :[ { "message" : " user already exits"}]});
        }
        //get users gravatar
        const avatar = gravatar.url(email ,{
            s:'200',
            r :'pg',
            d: 'mm'
        })
        user = new User({
            name,
            email,
            avatar,
            password,
        }); 

        //encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password,salt);

        await user.save();
//jsonwebtoken
    res.send('user register');
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }
});

module.exports = router;