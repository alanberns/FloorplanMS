import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { proyectoSchema } from '../../validationSchema';

const ObraOptions = [ 
    { value: 'A CONSTRUIR', label: 'A CONSTRUIR' },
     { value: 'A AMPLIAR', label: 'A AMPLIAR' }, 
     { value: 'A REFACCIONAR', label: 'A REFACCIONAR' }, 
     { value: 'A DEMOLER', label: 'A DEMOLER' }, 
     { value: 'A DEMOLER Y CONSTRUIR', label: 'A DEMOLER Y CONSTRUIR' }, 
     { value: 'A DOCUMENTAR', label: 'A DOCUMENTAR' } 
]; 
const DestinoOptions = [ 
    { value: 'Vivienda unifamiliar', label: 'Vivienda unifamiliar' }, 
    { value: 'Vivienda multifamiliar', label: 'Vivienda multifamiliar' }, 
    { value: 'Vivienda Unifamiliar Agrupada', label: 'Vivienda Unifamiliar Agrupada' }, 
    { value: 'Oficina', label: 'Oficina' }, 
    { value: 'Local comercial', label: 'Local comercial' }, 
    { value: 'Industria', label: 'Industria' } 
];

interface ProyectoFormProps {
  initialData?: {
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
  };
  onSubmit: (data: { nombre: string; ubicacion: string, destino: string, obra: string, escala: string }) => void;
}

const ProyectoForm: React.FC<ProyectoFormProps> = ({ initialData, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        nombre: initialData?.nombre || '',
        ubicacion: initialData?.ubicacion || '',
        destino: initialData?.destino || '',
        obra: initialData?.obra || '',
        escala: initialData?.escala || '',
      }}
      validationSchema={proyectoSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <Field type="text" name="nombre" className="form-control" />
            <ErrorMessage name="nombre" component="div" className="text-danger" />
          </div>
          <div className="form-group"> 
            <label htmlFor="obra">Obra</label> 
            <Field as="select" name="obra" className="form-control"> 
              <option value="">Selecciona una opción</option> 
              {ObraOptions.map((option) => ( <option key={option.value} value={option.value}> {option.label} </option> ))} 
            </Field> 
            <ErrorMessage name="obra" component="div" className="text-danger" /> 
          </div> 
          <div className="form-group"> 
            <label htmlFor="destino">Destino</label> 
            <Field as="select" name="destino" className="form-control"> 
              <option value="">Selecciona una opción</option> 
              {DestinoOptions.map((option) => ( <option key={option.value} value={option.value}> {option.label} </option> ))}
            </Field> 
            <ErrorMessage name="destino" component="div" className="text-danger" /> 
          </div>
          <div className="form-group">
            <label htmlFor="ubicacion">Ubicación</label>
            <Field type="text" name="ubicacion" className="form-control" />
            <ErrorMessage name="ubicacion" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="escala">Escala</label>
            <Field type="text" name="escala" className="form-control" />
            <ErrorMessage name="escala" component="div" className="text-danger" />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProyectoForm;