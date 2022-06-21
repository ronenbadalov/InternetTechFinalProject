import Land from "../models/Land.js";
import {
  getAll,
  getLandById,
  setLand,
  updateLandById,
} from "../dbManager/LandManager.js";
import url from "url";
export const createNewLand = async (req, res) => {
  try {
    const land = new Land(
      req.body.id,
      req.body.type,
      req.body.isOcupied,
      req.body.disabled,
      req.body.price,
      req.body.forSale,
      req.body.innerData
    );
    const landId = await setLand(land);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send("cant create land");
  }
};

export const createAllMap = async (req, res) => {
  const numIterations = req.body.iterations;
  try {
    for (let i = 0; i < numIterations; i++) {
      const land = new Land(
        i,
        req.body.type,
        req.body.isOcupied,
        req.body.disabled,
        req.body.price,
        req.body.forSale,
        req.body.innerData
      );
      const landId = setLand(land);
    }
    res.status(200).send("Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("cant create map");
  }
};

export const getLand = async (req, res) => {
  try {
    const queryObject = url.parse(req.url, true).query;
    const land = await getLandById(queryObject.id);
    console.log(land);
    res.status(200).send(land);
  } catch (err) {
    console.log(err);
    res.status(500).send("cant get all map");
  }
};

export const getAllMap = async (req, res) => {
  try {
    const landArr = await getAll();
    res.status(200).send(landArr);
  } catch (err) {
    console.log(err);
    res.status(500).send("cant get all map");
  }
};

export const updateLand = async (req, res) => {
  try {
    console.log(req.body);
    const response = await updateLandById(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("cant get all map");
  }
};
