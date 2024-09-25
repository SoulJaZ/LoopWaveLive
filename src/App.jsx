// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import ReproductorMusica from './ReproductorMusica';
import { obtenerPlayList } from './firebase/firestoreFunctions'
import { obtenerURLCancion } from "./firebase/firebaseStorage";

const App = () => {
    const [canciones, setCanciones] = useState([]);

    /*
    useEffect(() => {
        const iniciarPlayList = async () => {
            try {
                await agregarPlayList([
                    { title: 'Song 1', url: './assets/music/13-01-24.mp3' },
                    { title: 'Song 2', url: './assets/music/exotic-sax-loop-lounge-mixed_120bpm.wav' }
                ]);
            } catch (error) {
                console.error("Error al agregar playlist", error);
            }
        };
        iniciarPlayList();
    }, []);
    */

    useEffect(() => {

        const buscarPlayLists = async () => {
            try {
                const playlists = await obtenerPlayList();
                const cancionresConUrl = await Promise.all(
                    playlists[0] ?.canciones.map(async (cancion) =>{
                        const url = await obtenerURLCancion(cancion.url);
                        return {...cancion, url};
                    }) || []
                );
                setCanciones(cancionresConUrl);
            } catch (error) {
                console.error("Error al obtener la playlist", error)
            }
        };
        buscarPlayLists();
    }, []);

    return (
        <div>
            {canciones.length > 0 ? (
                <ReproductorMusica canciones={canciones} />
            ) : (
                <div>Cargando playlist...</div>
            )}
        </div>
    )

};

export default App;