import React, { useState, useEffect } from 'react';
import ModalNota from './ModalNota';
import ModalConfirmacion from './ModalConfirmacion';
import Nota from './Nota';

const ListaNotas = ({filtro}) => {
  const [notas, setNotas] = useState(JSON.parse(localStorage.getItem('notas')) || []);
  const [notaEditar, setNotaEditar] = useState(null);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);

  const [notaAEliminar, setNotaAEliminar] = useState(null);

  useEffect(() => {
    localStorage.setItem('notas', JSON.stringify(notas));
  }, [notas]);

  const notasFiltradas = notas.filter((nota) => {
    if (filtro === 'pendientes') {
      return !nota.estatus; // Filtrar notas pendientes
    } else if (filtro === 'completadas') {
      return nota.estatus; // Filtrar notas completadas
    }
    return true; // Mostrar todas las notas por defecto
  });

  const crearNota = (nuevaNota) => {
    setNotas([...notas, { ...nuevaNota, id: Date.now(), estatus: false }]);
    cerrarModalAgregar();
  };

  const abrirModalAgregar = () => {
    setMostrarModalAgregar(true);
    setNotaEditar(null);
  };

  const cerrarModalAgregar = () => {
    setMostrarModalAgregar(false);
  };

  const editarNota = (id, notaEditada) => {
    const nuevasNotas = notas.map((nota) => (nota.id === id ? { ...nota, ...notaEditada } : nota));
    setNotas(nuevasNotas);
    cerrarModalEditar();
  };

  const abrirModalEditar = (nota) => {
    setNotaEditar(nota);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false);
    setNotaEditar(null);
  };

  const eliminarNota = () => {
    const nuevasNotas = notas.filter((nota) => nota.id !== notaAEliminar.id);
    setNotas(nuevasNotas);
    cerrarModalConfirmacion();
  };

  const abrirModalConfirmacion = (nota) => {
    console.log(nota);
    setNotaAEliminar(nota);
    setMostrarModalConfirmacion(true);
  };

  const cerrarModalConfirmacion = () => {
    setMostrarModalConfirmacion(false);
  };

  const estadoNota = (id) => {
    const nuevasNotas = notas.map((nota) =>
      nota.id === id ? { ...nota, estatus: !nota.estatus } : nota
    );
    setNotas(nuevasNotas);
  };

  return (
    <div >
      <div>
        <ul>
        {notasFiltradas.map((nota) => (
            <Nota
              key={nota.id}
              {...nota}
              onCompleada={() => estadoNota(nota.id)}
              onEditar={() => abrirModalEditar(nota)}
              onEliminar={() => abrirModalConfirmacion(nota)}
              
            />
          ))}
        </ul>
      </div>

      <button
        onClick={() => abrirModalAgregar()}
        className=" fixed-button bg-blue-500 text-white p-4 rounded-full absolute bottom-8 right-8 shadow-lg hover:bg-blue-600 focus:outline-none transform transition-transform duration-300 hover:scale-105"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
      </button>

      {mostrarModalAgregar && (
        <ModalNota onGuardarNota={crearNota} onClose={cerrarModalAgregar} />
      )}
      {mostrarModalEditar && notaEditar && (
        <ModalNota
          onGuardarNota={(notaEditada) => editarNota(notaEditar.id, notaEditada)}
          onClose={cerrarModalEditar}
          notaEditar={notaEditar}
        />
      )}

      {mostrarModalConfirmacion && (
        <ModalConfirmacion
          mensaje="¿Está seguro de que desea eliminar esta nota?"
          onConfirmar={eliminarNota}
          onCancel={cerrarModalConfirmacion}
        />
      )}
    </div>
  );
};

export default ListaNotas;
