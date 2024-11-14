import * as Yup from 'yup';

export const organizacionSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre es muy corto')
    .max(100, 'El nombre es muy largo')
    .required('El nombre es obligatorio'),
  direccion: Yup.string()
    .min(3, 'La dirección es muy corta')
    .max(100, 'La dirección es muy larga')
    .required('La dirección es obligatoria'),
  contacto: Yup.string()
    .min(3, 'El contacto es muy corto')
    .max(100, 'El contacto es muy largo')
    .required('El contacto es obligatorio'),
});

export const proyectoSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre es muy corto')
    .max(100, 'El nombre es muy largo')
    .required('El nombre es obligatorio'),
  ubicacion: Yup.string()
    .min(3, 'La ubicación es muy corta')
    .max(100, 'La ubicación es muy larga')
    .required('La ubicación es obligatoria'),
  destino: Yup.string()
    .required('El destino es obligatorio'),
  obra: Yup.string()
    .required('La obra es obligatoria'),
  escala: Yup.string()
    .required('La escala es obligatoria')
    .max(10, 'La escala es muy larga'),
});
