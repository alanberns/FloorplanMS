import * as Yup from 'yup';

const textoRegEx = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s, .-@:]*$/;
const escalaRegex = /^1:[1-9]\d*$/;
const validChars = "a-zA-ZáéíóúÁÉÍÓÚñÑ0-9, .-@:";

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
  letra: Yup.string()
    .required('La letra es obligatoria'),
  numero: Yup.number()
    .required('El número es obligatorio'),
});

export const proyectoSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre es muy corto')
    .max(100, 'El nombre es muy largo')
    .matches(textoRegEx, 'Caracteres válidos: '+ validChars),
  ubicacion: Yup.string()
    .min(3, 'La ubicación es muy corta')
    .max(255, 'La ubicación es muy larga')
    .matches(textoRegEx, 'Caracteres válidos: '+ validChars)
    .required('La ubicación es obligatoria'),
  destino: Yup.string()
    .oneOf(['Vivienda unifamiliar', 'Vivienda multifamiliar', 'Vivienda Unifamiliar Agrupada', 'Oficina', 'Local comercial', 'Industria'], 'Destino no válido')
    .required('El destino es obligatorio'),
  obra: Yup.string()
    .oneOf(['A CONSTRUIR', 'A AMPLIAR', 'A REFACCIONAR', 'A DEMOLER', 'A DEMOLER Y CONSTRUIR', 'A DOCUMENTAR'], 'Obra no válida')
    .required('La obra es obligatoria'),
  escala: Yup.string()
    .matches(escalaRegex, 'Formato válido: 1:xxxxx')
    .required('La escala es obligatoria')
    .max(10, 'La escala es muy larga'),
  otrasExigencias: Yup.string()
    .max(255, 'Las otras exigencias son muy largas')
    .matches(textoRegEx, 'Caracteres válidos: '+ validChars),
  antecedentes: Yup.string()
    .max(100, 'Los antecedentes son muy largos')
    .matches(textoRegEx, 'Caracteres válidos: '+ validChars),
  propietario: Yup.string()
    .max(255, 'El propietario es muy largo')
    .matches(textoRegEx, 'Caracteres válidos: '+ validChars),
  proyectistas: Yup.string()
    .max(155, 'Los proyectistas son muy largos')
    .matches(textoRegEx, 'Caracteres válidos: '+ validChars),
  direccionTecnica: Yup.string()
    .max(155, 'La dirección técnica es muy larga')
    .matches(textoRegEx, 'Caracteres válidos: '+ validChars)
});

export const planoSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre es muy corto')
    .max(100, 'El nombre es muy largo')
    .required('El nombre es obligatorio'),
  especialidad: Yup.string()
    .required('La especialidad es obligatoria'),
  etiquetas: Yup.array()
    .of(Yup.string()),
});
