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
