import React, { useState, useEffect } from 'react';

const ModalAgregarNota = ({ onGuardarNota, onClose, notaEditar }) => {
  const [nuevaNota, setNuevaNota] = useState({ titulo: '', contenido: '' });
  const [errorTitulo, setErrorTitulo] = useState('');
  const [errorContenido, setErrorContenido] = useState('');

  useEffect(() => {
    if (notaEditar) {
      setNuevaNota({ ...notaEditar });
    }
  }, [notaEditar]);

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!nuevaNota.titulo.trim()) {
      setErrorTitulo('Por favor, ingrese un título.');
      return;
    } else {
      setErrorTitulo('');
    }

    if (!nuevaNota.contenido.trim()) {
      setErrorContenido('Por favor, ingrese contenido.');
      return;
    } else {
      setErrorContenido('');
    }

    if (nuevaNota.titulo && nuevaNota.contenido) {
      if (notaEditar) {
        
        onGuardarNota(nuevaNota);
      } else {
        // Si estamos agregando, llamamos a onAgregarNota con la nueva nota
        onGuardarNota({ ...nuevaNota, id: Date.now() }); // Asignamos un nuevo ID al agregar una nueva nota
      }
      setNuevaNota({ titulo: '', contenido: '' });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded w-1/2">
        <h2 className="text-2xl font-bold mb-4">{notaEditar ? 'Editar Nota' : 'Agregar Nota'}</h2>
        <form onSubmit={manejarEnvio}>
          <label className="block mb-4">
            Título:
            <input
              type="text"
              value={nuevaNota.titulo}
              onChange={(e) => {
                setNuevaNota({ ...nuevaNota, titulo: e.target.value });
                setErrorTitulo('');
              }}
              className="border border-gray-300 p-2 w-full"
            />
            {errorTitulo && <span className="text-red-500">{errorTitulo}</span>}
          </label>
          
          <label className="block mb-4">
            Contenido:
            <textarea
              value={nuevaNota.contenido}
              onChange={(e) => {
                setNuevaNota({ ...nuevaNota, contenido: e.target.value });
                setErrorContenido('');
              }}
              className="border border-gray-300 p-2 w-full"
            />
            {errorContenido && <span className="text-red-500">{errorContenido}</span>}
          
          </label>
          <div className="flex justify-between mt-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {notaEditar ? 'Guardar Edición' : 'Agregar Nota'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-blue-500 px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAgregarNota;
