import {collection, getDocs} from 'firebase/firestore';
import { db } from "./firebase";

/*
export const agregarPlayList = async ( canciones ) =>{
    try {
        await addDoc(collection(db, 'playlist'), {canciones});
        console.log("Playlist agregada correctamente.");
    } catch (e) {
        console.error("Error al añadir playlist.", e)
    }
};
*/

// Función para obtener la playlist desde Firestore
export const obtenerPlayList = async () =>{
    try {
        const querySnapshot = await getDocs(collection(db, 'playlist'));
        const playlists = querySnapshot.docs.map(doc => doc.data());
        return playlists;
    } catch (e) {
        console.error('Error al obtener playlist.', e);
    }
};