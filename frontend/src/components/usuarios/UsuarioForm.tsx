import React from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Importa Yup para las validaciones

// Definimos el esquema de validación utilizando Yup
const usuarioSchema = Yup.object().shape({
  nombre: Yup.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(100, 'El nombre debe tener menos de 100 caracteres').required('El nombre es obligatorio'),
  apellido: Yup.string().min(3, 'El apellido debe tener al menos 3 caracteres').max(100, 'El apellido debe tener menos de 100 caracteres').required('El apellido es obligatorio'),
  email: Yup.string().email('El email debe ser válido').required('El email es obligatorio'),
});

interface UsuarioFormProps {
  initialData?: {
    nombre: string;
    apellido: string;
    email: string;
    isActive: boolean;
  };
  onSubmit: (data: { nombre: string; apellido: string; email: string, isActive: boolean }) => void;
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({ initialData, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        nombre: initialData?.nombre || '',
        apellido: initialData?.apellido || '',
        email: initialData?.email || '',
        isActive: initialData?.isActive ?? true, 
      }}
      validationSchema={usuarioSchema}
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
            <label htmlFor="apellido">Apellido</label>
            <Field type="text" name="apellido" className="form-control" />
            <ErrorMessage name="apellido" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UsuarioForm;
