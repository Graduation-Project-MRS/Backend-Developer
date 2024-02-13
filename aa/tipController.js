const Tip = require('./tipModel');
const { asyncHandler } = require('../src/utils/errorHandling');


exports.createTip = asyncHandler(async (req, res) =>{
    const { title , description} = req.body;
    const tip = await Tip.create({title , description});
    res.status(201).json({ message: 'Tip submitted successfully' , tip});  
});


exports.getTips = asyncHandler(async(req , res) =>{
    const tips =await Tip.find();
    res.status(200).json(tips);
});