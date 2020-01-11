import express from "express";
import bodyParser from "body-parser";
import { AirplaneModel } from "../model/airplane";
import { CompanyModel } from "../model/company";
import { addAirplane, getPlaneById, getAllPlanes } from "../controllers/airplanes";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//POST
//add airplane with id airplane like params
router.post("/:id", addAirplane);

//GET
//output -->all airplane of one company (id company )
router.get("/:id", getPlaneById);

// GET
// Description: all planes
router.get("/", getAllPlanes);

//PUT
//updating of values of specific airplane of  specific company
router.put("/:id/plane/:idAirplane", async (req, res) => {
  if (req.body.model && req.params.idAirplane) {
    try {
      const company = await CompanyModel.findOne({
        _id: req.params.id,
        airplanes: req.params.idAirplane
      });
      const airplane = await AirplaneModel.findByIdAndUpdate(
        req.params.idAirplane,
        { model: req.body.model },
        { new: true }
      );
      return res.json({ message: "Airplane edited", airplane });
    } catch (err) {
      return res.status(400).json({ message: "Id Airplane is not present" });
    }
  }
  return res.status(400).json({ message: "Invalid entry" });
});

//DELETE
//deleting of airplane of specific company with id
router.delete("/:id/plane/:idAirplane", async (req, res) => {
  try {
    const company = await CompanyModel.findOneAndUpdate(
      { _id: req.params.id, airplanes: req.params.idAirplane },
      { $pull: { airplanes: req.params.idAirplane } },
      { new: true }
    );
    const airplane = await AirplaneModel.findByIdAndDelete(
      req.params.idAirplane
    );
    return res.status(200).json({ message: "Airplane deleted", airplane });
  } catch (err) {
    return res.status(400).json({ message: "Id Airplane is not present" });
  }
});

export = router;
