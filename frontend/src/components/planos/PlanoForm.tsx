import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import { planoSchema } from '../../validationSchema';

interface PlanoFormProps {
  initialData?: {
    nombre: string;
    especialidad: string;
    archivo?: File;
    etiquetas?: string[];
    nombreArchivo: string;
    proyectoId: string;
  };
  isEdit?: boolean;
  onSubmit: (data: any) => void;
}

const EspecialidadOptions = [
  { value: 'Arquitectura', label: 'Arquitectura' },
  { value: 'Estructura', label: 'Estructura' },
  { value: 'Instalaciones eléctricas', label: 'Instalaciones eléctricas' },
  { value: 'Instalación sanitaria', label: 'Instalación sanitaria' },
  { value: 'Otros', label: 'Otros' },
];

const PlanoForm: React.FC<PlanoFormProps> = ({ initialData, isEdit, onSubmit }) => {
  const [etiquetaInput, setEtiquetaInput] = useState('');
  const [etiquetas, setEtiquetas] = useState<string[]>(initialData?.etiquetas || []);
  const [file, setFile] = useState<File | null>(null);

  const handleAddEtiqueta = () => {
    if (etiquetaInput.trim()) {
      setEtiquetas([...etiquetas, etiquetaInput.trim()]);
      setEtiquetaInput(''); // Limpiar el campo de entrada después de añadir
    }
  };

  const handleRemoveEtiqueta = (index: number) => {
    const nuevasEtiquetas = etiquetas.filter((_, i) => i !== index);
    setEtiquetas(nuevasEtiquetas);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <Formik
      initialValues={{
        nombre: initialData?.nombre || '',
        especialidad: initialData?.especialidad || '',
        proyectoId: initialData?.proyectoId || '',
      }}
      validationSchema={planoSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (!isEdit && !file) {
          Swal.fire('Error', 'Debe seleccionar un archivo', 'error');
          setSubmitting(false);
          return;
        }

        const data = {
          nombre: values.nombre,
          especialidad: values.especialidad,
          proyectoId: values.proyectoId,
          etiquetas: etiquetas.length > 0 ? etiquetas : [], 
        };

        if (isEdit) {
          onSubmit(data);
        } else {
          const formData = new FormData();
          formData.append('nombre', values.nombre);
          formData.append('especialidad', values.especialidad);

          if (etiquetas.length > 0) {
            etiquetas.forEach((etiqueta, index) => { 
              formData.append(`etiquetas[${index}]`, etiqueta); 
            });
          } 
          if (file) {
            formData.append('archivo', file);
          }

          onSubmit(formData);
        }

        setSubmitting(false);
        Swal.close(); // Cierra el modal de SweetAlert después de enviar el formulario
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
            <Field as="select" name="especialidad" className="form-control">
              <option value="">Seleccione una opción</option>
              {EspecialidadOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <ErrorMessage name="especialidad" component="div" className="text-danger" />
          </div>
          {!isEdit && (
            <div className="form-group">
              <label htmlFor="archivo">Archivo</label>
              <input type="file" name="archivo" onChange={handleFileChange} className="form-control" accept="image/*,application/pdf" />
              <ErrorMessage name="archivo" component="div" className="text-danger" />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="etiquetas">Añadir Etiqueta</label>
            <div className="d-flex align-items-center mb-3">
              <input
                type="text"
                value={etiquetaInput}
                onChange={(e) => setEtiquetaInput(e.target.value)}
                className="form-control me-2"
                placeholder="Ingrese una etiqueta"
              />
              <Button type="button" variant="secondary" onClick={handleAddEtiqueta} className="ms-2">
                +
              </Button>
            </div>
            <div>
              <p>Etiquetas</p>
              {etiquetas.map((etiqueta, index) => (
                <span key={index} className="badge bg-secondary m-1">
                  {etiqueta}
                  <Button variant="btn btn-outline-light rounded-circle ms-2" size="sm" onClick={() => handleRemoveEtiqueta(index)}>
                    &times;
                  </Button>
                </span>
              ))}
            </div>
            <ErrorMessage name="etiquetas" component="div" className="text-danger" />
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

export default PlanoForm;
