import Tip from '../../../DB/model/tipModel.js';

export const createTip = async (req, res) => {
  try {
    const newTip = await Tip.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tip: newTip
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

export const getAllTips = async (req, res) => {
  try {
    const tips = await Tip.find();
    res.status(200).json({
      status: 'success',
      results: tips.length,
      data: {
        tips
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};
