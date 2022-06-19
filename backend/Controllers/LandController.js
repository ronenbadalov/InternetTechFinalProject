import Land from "../models/Land.js"
import {setLand} from "../dbManager/LandManager.js";

export const createNewLand = async (req, res) => {
    try {
        const land = new Land(req.body.id, req.body.type, req.body.isOcupied, req.body.disabled, req.body.price, req.body.forSale, req.body.innerData);
        const landId = await setLand(land);
        res.status(200).send();
    } catch (err) {
        console.log(err)
        res.status(500).send("cant create land");
    }
}


export const createAllMap = async (req, res) => {
    const numIterations = req.body.iterations;
    try {
    for(let i=0; i< numIterations; i++) {
        const land = new Land(i, req.body.type, req.body.isOcupied, req.body.disabled, req.body.price, req.body.forSale, req.body.innerData);
        const landId = setLand(land);
    }
    res.status(200).send("Success");
    } catch (err) {
        console.log(err)
        res.status(500).send("cant create map");
    }
}