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

// export const getAllAndReplace = async () => {
//   try {
//     const landRef = firestore.collection("lands");
//     const snapshot = await landRef.get();
//     const resArr = [];
//     snapshot.forEach((document) => {
//       let doc = document.data();
//       let newObject = {
//         disabled: doc.disabled,
//         forSale: doc.forSale,
//         id: doc.id,
//         innerData: doc.innerData,
//         owner: "",
//         price: doc.price,
//         type: doc.type
//       }
//       resArr.push(newObject);
//     });
//     console.log(resArr);
//     for(const land of resArr) {
//       updateLandById(land);
//     }
//     return resArr;
//   } catch (e) {
//     console.log(e.message);
//   }
// };

export const updateLandById = async (id, data) => {
  try {
    const landRef = firestore.collection("lands").doc(id);
    const res = await landRef.update({
      ...data,
    });
    // console.log(landRef);
    // console.log(data);
    // console.log(res);
    return res;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateLandByIdInCache = async (id, data) => {
  try {
    console.log(id, data);
    const map = JSON.parse(sessionStorage.getItem("map"));
    // const id = land.id.padStart(4, "0");
    const [first, second] = [
      id.padStart(4, "0").slice(0, 2),
      id.padStart(4, "0").slice(2),
    ];
    map[+first][+second] = { ...data };
    sessionStorage.setItem("map", map);
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};
