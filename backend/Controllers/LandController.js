import Land from "../models/Land.js";
import {
  getAll,
  getLandById,
  setLand,
  updateLandById,
  updateLandByIdInCache,
} from "../dbManager/LandManager.js";
import url from "url";
export const createNewLand = async (req, res) => {
  try {
    const land = new Land(
      req.body.id,
      req.body.type,
      req.body.owner,
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
        req.body.owner,
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

// export const getAllAndReplaceMap = async (req, res) => {
//   try {
//     const landArr = await getAllAndReplace();
//     res.status(200).send(landArr);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("cant get all map");
//   }
// };

export const updateLand = async (req, res) => {
  try {
    const response = await updateLandById(req.params.id, req.body);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("error updating land");
  }
};

export const updateLandInCache = async (req, res) => {
  try {
    const response = await updateLandByIdInCache(req.params.id, req.body);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("error updating land");
  }
};
// const paintR = [3601, 3701, 3801, 3901, 4001, 4101, 4201, 4301, 4402, 4403, 4404, 4305, 4206, 4107,4007,3907,3807,3707,3607, 3602,3603,3604,3605,3606,3608,3609,3610,3611,3612,3708, 3809,3910,4011,4112];
// const paintB = [5701, 5801, 5901, 6001, 6101, 6201, 6301, 6401, 6502, 6503, 6504, 6505, 6406, 6306, 6206,6106,6006,5906,5806,5706,5707,5708,5709, 5710, 5711, 5712, 5807, 5907, 6007, 6107, 6207, 6307, 6407,6508, 6509, 6510, 6511, 6412, 6312, 6212, 6112, 6012, 5912, 5812];

// paintR.forEach(async num => {
// await fetch('http://localhost:5000/land/updateLand', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify (
//           {
//             id: num,
//             price: 0,
//             disabled: true,
//             forSale: false,
//             type: "park_land"
//           }
//         )
//     }).then(response => console.log(response.json()));
// });
