import React from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { planoSchema } from '../../validationSchema';

interface PlanoFormProps {
    initialData?: {
      nombre: string;
      especialidad: string;
      archivo: string;
      etiquetas?: string[];
      proyectoId: string;
    };
    onSubmit: (data: { nombre: string; especialidad: string; archivo: string; etiquetas?: string[]; proyectoId: string }) => void;
  }

  const PlanoForm: React.FC<PlanoFormProps> = ({ initialData, onSubmit }) => {
    return (
      <Formik
        initialValues={{
          nombre: initialData?.nombre || '',
          especialidad: initialData?.especialidad || '',
          archivo: initialData?.archivo || '',
          etiquetas: initialData?.etiquetas || [],
          proyectoId: initialData?.proyectoId || ''

        }}
        validationSchema={planoSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
          //Swal.close(); // Cierra el modal de SweetAlert después de enviar el formulario
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
              <label htmlFor="especialidad">Especialidad</label>
              <Field type="text" name="especialidad" className="form-control" />
              <ErrorMessage name="especialidad" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="archivo">Archivo</label>
              <Field type="text" name="archivo" className="form-control" />
              <ErrorMessage name="archivo" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="etiquetas">Etiquetas</label>
              <Field type="text" name="etiquetas" className="form-control" placeholder="Separadas por comas" />
              <ErrorMessage name="etiquetas" component="div" className="text-danger" />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Guardar
            </Button>
          </Form>
        )}
      </Formik>
    );
  };
  
  export default PlanoForm;
  