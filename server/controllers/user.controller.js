const User = require('../models/user');
const { generateToken } = require('../middleware/auth');

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            const newUser = await User.create({
                userName: username,
                password: password,
                email: email
            })
             
            const token = generateToken(newUser);
            
            res.header('Authorization', `Bearer ${token}`);
            res.status(200).json({msg: 'Successfully register user!', token: token, user: newUser});

        } catch (error) {
            console.log('Error: ', error);
            res.status(500).json({error: "Internal Server Error"});
        }
    },

    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { userName: username} });

            if(!user) {
                res.json({msg: "Not registered"});
                return false;
            }

            const passwordMatch = await user.comparePassword(password);

            if(!passwordMatch) {
                res.json({msg: "Wrong credentials"});
                return false;
            }
            const token = generateToken(user);
            res.header('Authorization', `Bearer ${token}`)
            res.json({msg: "Successfully login!", token: token, userLoggedIn: user});

        } catch (error) {
            console.log('Error: ', error);
            throw error;
        }
    },
    
    getAllUser: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            console.log('Error: ', error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

}