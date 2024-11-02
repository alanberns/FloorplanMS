import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function Home() {
  const MySwal = withReactContent(Swal);
  
  function showAlert(){
    MySwal.fire({
        title: '¡Notificación!',
        text: 'Esta es una notificación de Sweet Alert 2',
        icon: 'success',
        confirmButtonText: 'Cerrar'
      });
  }

  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={() => {setCount(count + 1); showAlert();}}>Incrementar</button>
    </div>
  )
}
export default Home;