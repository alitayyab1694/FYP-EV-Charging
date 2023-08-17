import Chargebox from "../models/Chargebox.js";
import HttpError from "../util/http-error.js";

export const getChargeboxes = async (req, res, next) => {
  try {
     const { companyId } = req.query;
    let query = {};
    if (companyId) {
      query = { company:companyId };
    }
    const chargeboxes = await Chargebox.find(query);
    console.log("🚀 ~ file: ChargeboxController.js:13 ~ getChargeboxes ~ chargeboxes:", chargeboxes)
    res.status(200).json(chargeboxes);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const getChargeboxByCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const chargebox = await Chargebox.find({company:id});
    if (!chargebox) {
      const err = new HttpError("chargebox not found", 404);
      next(err);
    }
    res.status(200).json(chargebox);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const getChargebox = async (req, res, next) => {
  try {
    const { id } = req.params
    const chargebox = await Chargebox.findById(id)
    if (!chargebox) {
      const err = new HttpError('chargebox not found', 404)
      next(err)
    }
    res.status(200).json(chargebox)
  } catch (error) {
    console.log('error', error)
    next(error)
  }
}

export const addChargebox = async (req, res, next) => {
  try {
    const newChargebox = req.body;
    newChargebox.misc.chargingType = newChargebox.misc.chargingType.value
     const lastRecord = await Chargebox.findOne({}, {}, { sort: { id: -1 } });
        const lastNumber = lastRecord ? parseInt(lastRecord.id.split('-')[1]) : 0;
        newChargebox.id = `CH-${lastNumber + 1}`;
    const chargebox = new Chargebox(newChargebox);
    const createdChargebox = await chargebox.save();
    res.status(200).json(createdChargebox);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const updateChargebox = async (req, res, next) => {
  try {
    const { id } = req.params;
    const chargebox = await Chargebox.findById({ _id: id });
    if (!chargebox) {
      const error = new HttpError("Chargbox not found", 404);
      return next(error);
    }
    const oldChargebox = req.body;

    const updatedChargebox = await Chargebox.findOneAndUpdate(
      { _id: id },
      oldChargebox
    );
    res.status(200).json(updatedChargebox);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const deleteVendor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const chargeboxExists = await Chargebox.findById(id);
    if (!chargeboxExists) {
      const err = new HttpError("Chargebox not found", 404);
      return next(err);
    }
    const chargebox = await Chargebox.deleteOne({ _id: id });
    res.status(200).json(chargebox);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
