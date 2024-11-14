import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/', // URL base para todas las solicitudes
  timeout: 10000, // Tiempo máximo de espera
  headers: { 'Content-Type': 'application/json' },
});

// ORGANIZACIONES

// Obtener todas las organizaciones
export const getOrganizaciones = async () => {
  try{
      const response = await api.get('/organizacion');
      return response.data;
  } catch(error) {
      console.error('Error al obtener organizaciones:', error);
      throw error;
  }
}

// Obtener una organizacion
export const getOrganizacion = async (id: string) => {
  try{
      const response = await api.get(`/organizacion/${id}`);
      return response.data;
  } catch(error) {
      console.error('Error al obtener la organizacion:', error);
      throw error;
  }
}

// Crear una nueva organización
export const createOrganizacion = async (data: { nombre: string; direccion: string; contacto: string }) => {
  try {
    const response = await api.post('/organizacion', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear organización:', error);
    throw error;
  }
};

// Actualizar una organización existente
export const updateOrganizacion = async (id: string, data: { nombre: string; direccion: string; contacto: string }) => {
  try {
    const response = await api.put(`/organizacion/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar organización:', error);
    throw error;
  }
};

// Eliminar una organización
export const deleteOrganizacion = async (id: string) => {
  try {
    const response = await api.delete(`/organizacion/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar organización:', error);
    throw error;
  }
};


// PROYECTOS

// Obtener todos los proyectos
export const getProyectos = async () => {
  try{
      const response = await api.get('/proyecto');
      return response.data;
  } catch(error) {
      console.error('Error al obtener proyectos:', error);
      throw error;
  }
}

// Obtener un proyecto
export const getProyecto = async (id: string) => {
  try{
      const response = await api.get(`/proyecto/${id}`);
      return response.data;
  } catch(error) {
      console.error('Error al obtener el proyecto:', error);
      throw error;
  }
}

// Crear un nuevo proyecto
export const createProyecto = async (data: { nombre: string; ubicacion: string, destino: string, obra: string, escala: string }) => {
  try {
    const response = await api.post('/proyecto', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    throw error;
  }
};

// Actualizar un proyecto existente
export const updateProyecto = async (id: string, data: { nombre: string; ubicacion: string, destino: string, obra: string, escala: string }) => {
  try {
    const response = await api.put(`/proyecto/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    throw error;
  }
};

// Eliminar un proyecto
export const deleteProyecto = async (id: string) => {
  try {
    const response = await api.delete(`/proyecto/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    throw error;
  }
};

// Exporta el cliente de Axios para usos adicionales si es necesario
export default api;
