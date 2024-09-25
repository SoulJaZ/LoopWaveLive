// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import "./styles/player.css"
import Logo from './images/main-logo-black-transparent.png'
import Nosotros from './images/logo.jpg'

// eslint-disable-next-line react/prop-types
const ReproductorMusica = ({ canciones = [] }) => {
    const [indiceCancionActual, setIndiceCancionActual] = useState(0);
    const [estaSonando, setEstaSonando] = useState(false);
    const audioRef = useRef(null);

    const playSong = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error('Error al reproducir la canción:', error);
            });
        }
        setEstaSonando(true);
    };

    const pauseSong = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setEstaSonando(true);
    };

    const nextSong = () => {
        setIndiceCancionActual((prev) => (prev + 1) % canciones.length);
    };

    const prevSong = () => {
        setIndiceCancionActual((prev) => (prev - 1 + canciones.length) % canciones.length);
    };

    useEffect(() => {
        if (audioRef.current && canciones.length > 0) {
            const currentSong = canciones[indiceCancionActual];
            console.log('Reproduciendo canción:', currentSong.url);

            if (currentSong && currentSong.url) {
                audioRef.current.src = currentSong.url;
                if (estaSonando) {
                    audioRef.current.play().catch((error) => {
                        console.error('Error al reproducir la canción:', error);
                    });
                } else {
                    audioRef.current.pause();
                }
            } else {
                console.error('No se ha proporcionado una URL válida para la canción.');
            }
        }
    }, [indiceCancionActual, estaSonando, canciones]);

    useEffect(() => {
        const handleEnded = () => {
            nextSong();
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('ended', handleEnded);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleEnded);
            }
        };
    }, [canciones.length]);

    return (
        <div className='app-container'>
            <header className='header'>
                <img src={Logo} alt="Radio Logo" className='logo' />
                <nav className='nav'>
                    <a href="#home">Home</a>
                    <a href="#playlist">Playlists</a>
                    <a href="#about">Sobre Nosotros</a>
                    <a href="#contact">Contacto</a>
                </nav>
            </header>
            <main className='main-content'>

                {/*SECCIÓN REPRODUCTOR*/}
                <section id="home" className='player-section'>
                    <div className='song-info'>
                        <img src={canciones[indiceCancionActual]?.albumCover} alt="Album cover" className='album-cover' />
                        <h2>{canciones[indiceCancionActual]?.title || 'Sin canción disponible'}</h2>
                        <p>{canciones[indiceCancionActual]?.artist || 'Artista desconocido'}</p>
                    </div>
                    <audio ref={audioRef} src={canciones[indiceCancionActual]?.audioUrl} controls={false}></audio>
                    <div className='controls'>
                        <button onClick={prevSong} className="control-btn">Prev</button>
                        <button onClick={playSong} className="control-btn">Play</button>
                        <button onClick={pauseSong} className="control-btn">Pause</button>
                        <button onClick={nextSong} className="control-btn">Next</button>
                    </div>
                </section>

                {/*SECCIÓN RECOMENDACIONES*/}
                <section id='playlist' className='recommendations'>
                    <h3>Recomendaciones</h3>
                    <div className='recommendations-grid'>
                        {canciones.slice(0, 5).map((cancion, index) => (
                            <div key={index} className='recommendations-card'>
                                <img src={cancion.albumCover} alt="Album Cover" className="recommendation-cover" />
                                <h4 className="recommendation-title">{cancion.title}</h4>
                                <p className="recommendation-artist">{cancion.artist}</p>
                                <a href={`#playlist-${index}`}>{cancion.title}</a>
                            </div>
                        ))}
                    </div>
                </section>

                {/*SECCIÓN ACERCA DE NOSOTROS*/}
                <section id="about" className="about">
                    <h3>Sobre Nosotros</h3>
                    <div className='about-content'>
                        <img src={Nosotros} alt="Sobre nosotros" className='about-image' />
                        <div className='about-text'>
                            <p>En LoopWave Live, creemos que la música tiene el poder de conectar, inspirar y acompañar en todos los momentos de la vida. Somos una radio online dedicada a ofrecerte una experiencia musical continua y sin interrupciones, donde las mejores canciones de rap, reggae y rock se mezclan para crear una atmósfera única.</p>
                            <p></p>
                        </div>
                    </div>

                </section>

                {/*SECCIÓN CONTACTENOS*/}
                <section id="contact" className="contact">
                    <h3>Contacto</h3>
                    <div className='contact-content'>
                        <form className='contact-form'>
                            <label htmlFor="name">Nombre: </label>
                            <input type="text" id='name' name='name' required />

                            <label htmlFor="email">Correo Electrónico:</label>
                            <input type="email" id="email" name="email" required />

                            <label htmlFor="message">Mensaje:</label>
                            <textarea id="message" name="message" rows="4" required></textarea>

                            <button type="submit" className="submit-btn">Enviar</button>
                        </form>
                    </div>
                    <div className="contact-info">
                        <p>Email: contacto@loopwavelive.com</p>
                        <p>Teléfono: +57 320 802 8044</p>
                    </div>

                </section>

                {/*SECCIÓN INTERACCIONES*/}
                <section className="interactivity">
                    <h3>Participa</h3>
                    <p>¡Únete a nuestro reto musical y comparte tu talento!</p>
                    <button className="control-btn">Participar</button>
                </section>

            </main>



            <footer className="footer">
                <p>&copy; 2024 LoopWave Live. Todos los derechos reservados.</p>
            </footer>
        </div>

    );
};

export default ReproductorMusica;
