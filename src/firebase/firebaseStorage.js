import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { app } from './firebase'; // archivo de conexión Firebase

const storage = getStorage(app); // Inicializar Firebase Storage usando tu configuración

// Función para obtener la URL de descarga
export const obtenerURLCancion = async (nombreArchivo) => {
  const storageRef = ref(storage, nombreArchivo);
  try {
    const url = await getDownloadURL(storageRef);
    console.log("Url de la canción", url)
    return url;
  } catch (error) {
    console.error("Error al obtener la URL de descarga:", error);
    return null;
  }
};
