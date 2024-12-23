import React from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { organizacionSchema } from '../../validationSchema';

interface OrganizacionFormProps {
  initialData?: {
    nombre: string;
    direccion: string;
    contacto: string;
    letra: string; 
    numero: number;
  };
  onSubmit: (data: {
    nombre: string;
    direccion: string;
    contacto: string;
    letra: string;
    numero: number;
  }) => void;
}

const OrganizacionForm: React.FC<OrganizacionFormProps> = ({ initialData, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        nombre: initialData?.nombre || '',
        direccion: initialData?.direccion || '',
        contacto: initialData?.contacto || '',
        letra: initialData?.letra || '', 
        numero: initialData?.numero || 0, 
      }}
      validationSchema={organizacionSchema}
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
            <label htmlFor="direccion">Dirección</label>
            <Field type="text" name="direccion" className="form-control" />
            <ErrorMessage name="direccion" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="contacto">Contacto</label>
            <Field type="text" name="contacto" className="form-control" />
            <ErrorMessage name="contacto" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="letra">Letra</label>
            <Field type="text" name="letra" className="form-control" />
            <ErrorMessage name="letra" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="numero">Número</label>
            <Field type="number" name="numero" className="form-control" />
            <ErrorMessage name="numero" component="div" className="text-danger" />
          </div>
          <br />
          <Button type="submit" disabled={isSubmitting}>
            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default OrganizacionForm;
