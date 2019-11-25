import express              from "express"
import bodyParser           from "body-parser";
import { AirplaneModel }    from "../model/airplane";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get( "/",async(req,res) => {
    //all airplanes of one company
    try {
        const allAirplane = await AirplaneModel.find();
        return res.status(200).json(allAirplane);
    } catch (error) {
        return res.status(404).json({message : "there's an error"});
        
    }
});

router.post("/",async(req,res) => {
    const controlModel = AirplaneModel.findOne(req.body.model);
    try {
        if(!controlModel) {
            let airplane = new AirplaneModel ({
                model : String(req.body.model),
                numSeats : Number(req.body.numSeats),
            });
            await airplane.save();
            //salva l'aereo nella compagnia (scelta da te)
            return res.status(200).json({message : "Airplane added"});
        }
    } catch (error) {
        return res.status(400).json({message:"Airplane already exists"});
    }
});

// TODO: router.put("/:model",(req,res) => {});

router.delete("/:model",async(req,res) => {
    const controlModel = AirplaneModel.findOne(req.params.model);
    try {
        if(!controlModel){
            return res.status(404).json({message : "Airplane not found"});
        }
        else{
            const airplaneModel = await AirplaneModel.findOneAndRemove({model : req.params.model});
            const eliminateID = Object(airplaneModel)["_id"];
            AirplaneModel.remove({_id: eliminateID});
            return res.status(200).json({message : "Company eliminated :",airplaneModel});
        }
        
    } catch (error) {
        return res.status(400).json({message : "There's an error"})
    }
});

export = router;