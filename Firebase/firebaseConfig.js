import {initializeApp} from 'firebase/app';
import {collection, getDocs, getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA4dOhJ7Ctn-8QGlmwjoXD3O7Dnije1peA",
    authDomain: "restrudantguide.firebaseapp.com",
    projectId: "restrudantguide",
    storageBucket: "restrudantguide.appspot.com",
    messagingSenderId: "1078403102423",
    appId: "1:1078403102423:web:158eea1b5dff0edf712292",
    measurementId: "G-PRF5M4PTL3"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

//region *** getCoffeeShopData() --> get all the coffeShop data from db  ***
export const getCoffeeShopData = async () => {
    try {
        const coffeeShopSnapShot = await getDocs(collection(db, "coffeeShop"));
        return coffeeShopSnapShot.docs.map(
            (doc) => (
                {
                    id: doc.id, // id will be used for as key
                    ...doc.data() // doc.data will contain all other info
                }))

    } catch (e) {
        console.log(e.message);
    }

}
//endregion