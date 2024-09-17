import React, { useEffect, useRef, useState } from 'react';

const ReproductorMusica = ({ canciones }) => {
  const [indiceCancionActual, setIndiceCancionActual] = useState(0);
  const [estaSonando, setEstaSonando] = useState(false);
  const audioRef = useRef(null); // Referencia al elemento <audio>

  const playSong = () => {
    setEstaSonando(true); // Cambiar el estado a "reproduciendo"
  };

  const pauseSong = () => {
    setEstaSonando(false); // Cambiar el estado a "pausado"
  };

  const nextSong = () => {
    setIndiceCancionActual((prev) => (prev + 1) % canciones.length); // Siguiente canción
  };

  const prevSong = () => {
    setIndiceCancionActual((prev) => (prev - 1 + canciones.length) % canciones.length); // Canción anterior
  };

  // Reproduce o pausa la canción según el estado "estaSonando"
  useEffect(() => {
    if (estaSonando) {
      audioRef.current.play(); // Reproduce la canción
    } else {
      audioRef.current.pause(); // Pausa la canción
    }
  }, [indiceCancionActual, estaSonando]);

  return (
    <div>
      <h2>Sonando ahora: {canciones[indiceCancionActual].title}</h2>
      <audio ref={audioRef} src={canciones[indiceCancionActual].url}></audio>
      <div>
        <button onClick={playSong}>Play</button>
        <button onClick={pauseSong}>Pause</button>
        <button onClick={prevSong}>Previous</button>
        <button onClick={nextSong}>Next</button>
      </div>
    </div>
  );
};

const App = () => {
  const canciones = [
    { title: '13-01-24', url: '../src/assets/music/13-01-24.mp3' },
    { title: 'Song 2', url: '/song2.mp3' },
    // Puedes agregar más canciones
  ];

  return <ReproductorMusica canciones={canciones} />;
};

export default App;
