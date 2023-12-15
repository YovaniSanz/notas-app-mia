// App.js

import React, { useState } from 'react';
import ListaNotas from './components/ListaNotas';

const App = () => {
  const [filtro, setFiltro] = useState('todas');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Aplicación de Notas</h1>

      <div className="flex mb-4 bg-gray-100 rounded-md overflow-hidden">
        <button
          className={`flex-1 px-4 py-2 border-r border-gray-300 focus:outline-none ${
            filtro === 'todas' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFiltro('todas')}
        >
          Todas las Notas
        </button>
        <button
          className={`flex-1 px-4 py-2 border-r border-gray-300 focus:outline-none ${
            filtro === 'pendientes' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFiltro('pendientes')}
        >
          Notas Pendientes
        </button>
        <button
          className={`flex-1 px-4 py-2 focus:outline-none ${
            filtro === 'completadas' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFiltro('completadas')}
        >
          Notas Completadas
        </button>
      </div>

      <ListaNotas filtro={filtro}/>

    </div>
  );
};

export default App;
