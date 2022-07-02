import { firestore } from "../index.js";
import { doc, getDoc } from "firebase/firestore";
export const setLand = async (land) => {
  try {
    console.log(land.id);
    await firestore
      .collection("lands")
      .doc(land.id + "")
      .set(Object.assign({}, land));
    console.log("land saved: ", land.id);
    return land.id;
  } catch (e) {
    console.log("land not saved: ", land.id, e);
  }
};

// 'http://127.0.0.1:5000/land/get?id=2'
export const getLandById = async (landId) => {
  try {
    const landRef = firestore.collection("lands").doc(landId);
    const doc = await landRef.get();
    return doc.data();
  } catch (e) {
    console.log(e.message);
  }
};

// 'http://127.0.0.1:5000/land/getAll'

export const getAll = async () => {
  try {
    const landRef = firestore.collection("lands");
    const snapshot = await landRef.get();
    const resArr = [];
    snapshot.forEach((doc) => {
      resArr.push(doc.data());
    });
    return resArr;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateLandById = async (item) => {
  try {
    const landRef = firestore.collection("lands").doc(`${item.id}`);
    const res = await landRef.update({
      price: item.price,
      innerData: item.innerData,
    });
    return res;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateLandByIdInCache = async (land) => {
  try {
    const map = JSON.parse(sessionStorage.getItem("map"));
    const id = land.id.padStart(4, "0");
    const [first, second] = [id.slice(0, 2), id.slice(2)];
    map[+first][+second] = land;
    sessionStorage.setItem("map", map);
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};
