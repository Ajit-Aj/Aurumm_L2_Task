const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {

    const { name, email, password, role = 'user' } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('[REGISTER] Error during registration:', err.message);
        res.status(500).json({ message: 'Something went wrong during registration' });
    }
});


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            'secretkey',
            { expiresIn: '1d' }
        );


        res.json({ token });
    } catch (err) {
        console.error('[LOGIN] Error during login:', err.message);
        res.status(500).json({ message: 'Login failed' });
    }
});



// router.post('/logout', auth, async (req, res) => {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.decode(token);
//     const expiresIn = decoded.exp - Math.floor(Date.now() / 1000); // seconds until expiry

//     try {
//         await redisClient.setEx(`blacklist:${token}`, expiresIn, 'true');
//         console.log('[LOGOUT] Token blacklisted successfully');
//         res.json({ message: 'Logged out successfully' });
//     } catch (err) {
//         console.error('[LOGOUT] Error blacklisting token:', err.message);
//         res.status(500).json({ message: 'Logout failed' });
//     }
// });



// Get user info        
router.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'secretkey');
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user,);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve user info' });
    }
});


module.exports = router;
