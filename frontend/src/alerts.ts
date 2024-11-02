import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function showErrorAlert(text: string){
  MySwal.fire({
    title: 'Error!',
    text: text,
    icon: 'error',
    confirmButtonText: 'Cerrar'
  });
}

export function showSuccessAlert(text: string){
  MySwal.fire({
    title: 'Exito!',
    text: text,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  });
}