import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { organizacionSchema } from '../../validationSchema';

interface OrganizacionFormProps {
  initialData?: {
    nombre: string;
    direccion: string;
    contacto: string;
  };
  onSubmit: (data: { nombre: string; direccion: string; contacto: string }) => void;
}

const OrganizacionForm: React.FC<OrganizacionFormProps> = ({ initialData, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        nombre: initialData?.nombre || '',
        direccion: initialData?.direccion || '',
        contacto: initialData?.contacto || ''
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
          <Button type="submit" disabled={isSubmitting}>
            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default OrganizacionForm;