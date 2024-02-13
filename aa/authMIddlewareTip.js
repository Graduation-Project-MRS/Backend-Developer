exports.checkAdmin = (req, res, next) => {
    // Check if user is admin (implement your own logic)
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};
