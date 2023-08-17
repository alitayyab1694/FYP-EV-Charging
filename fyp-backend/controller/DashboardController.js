import Chargebox from "../models/Chargebox.js";

export const getDashboarData = async (req, res, next) => {
  try {
     const { companyId } = req.query;
    let query = {};
    if (companyId) {
      query = { company:companyId };
    }
    const chargeboxes = await Chargebox.count(query);
    res.status(200).json({ chargeboxes });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
