const User = require('../models/user.js');

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId) {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            return res.status(200).json({ success: true, user });
        }
        const users = await User.findAll();
        return res.status(200).json({ success: true, users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        if (!username || !email) {
            return res.status(400).json({ success: false, message: 'Username and email are required' });
        }
        const user = await User.create({
            username,
            email
        });
        return res.status(201).json({ success: true, message: 'User created successfully', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error creating user' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email } = req.body;
        
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        if (username) user.username = username;
        if (email) user.email = email;
        
        await user.save();
        return res.status(200).json({ success: true, message: 'User updated successfully', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error updating user' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        await User.destroy({ where: { id: userId } });
        return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error deleting user' });
    }
};