import React from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Organizacion } from '../../types';
import * as Yup from 'yup'; // Importa Yup para las validaciones

// Definimos el esquema de validación utilizando Yup
const usuarioSchema = Yup.object().shape({
  nombre: Yup.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(100, 'El nombre debe tener menos de 100 caracteres').required('El nombre es obligatorio'),
  apellido: Yup.string().min(3, 'El apellido debe tener al menos 3 caracteres').max(100, 'El apellido debe tener menos de 100 caracteres').required('El apellido es obligatorio'),
  email: Yup.string().email('El email debe ser válido').required('El email es obligatorio')
});

interface UsuarioFormProps {
  initialData?: {
    nombre: string;
    apellido: string;
    email: string;
    isActive: boolean;
    organizacionId?: string;
  };
  onSubmit: (data: { nombre: string; apellido: string; email: string; isActive: boolean; organizacionId?: string }) => void;
  organizaciones: Organizacion[];
  isEditing: boolean; 
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({ initialData, onSubmit, organizaciones, isEditing }) => {
  return (
    <Formik
      initialValues={{
        nombre: initialData?.nombre || '',
        apellido: initialData?.apellido || '',
        email: initialData?.email || '',
        isActive: initialData?.isActive ?? true,
        organizacionId: initialData?.organizacionId || '', 
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
          {!isEditing && (
            <div className="form-group">
              <label htmlFor="organizacionId">Organización</label>
              <Field as="select" name="organizacionId" className="form-control">
                <option value="">Selecciona una organización</option>
                {organizaciones.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.nombre}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="organizacionId" component="div" className="text-danger" />
            </div>
          )}
          <Button type="submit" disabled={isSubmitting}>
            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UsuarioForm;
