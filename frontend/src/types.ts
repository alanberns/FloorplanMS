export interface Organizacion {
    _id: string;
    nombre: string;
    direccion: string;
    contacto: string;
  }

export interface Proyecto {
  _id: string;
  nombre: string;
  expediente: string;
  ubicacion: string;
  destino: string;
  obra: string;
  escala: string;
  otrasExigencias?: string;
  antecedentes?: string;
  propietario?: string;
  proyectistas?: string;
  direccionTecnica?: string;
  aprobado: boolean;
  organizacionId: string;
}
  