import { firestore } from "../index.js";




export const setLand = async (land) => {
    try {
        console.log(land.id);
        await firestore.collection('lands').doc(land.id+"").set(Object.assign({}, land));
        console.log('land saved: ', land.id);
        return land.id;
    } catch (e) {
        console.log('land not saved: ', land.id, e);
    }
}