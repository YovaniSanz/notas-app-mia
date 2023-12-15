
const Nota = ({ id, titulo, contenido, estatus, onCompleada, onEditar, onEliminar }) => {

  return (
    <li className="bg-white p-4 mb-4 rounded shadow-md flex items-center justify-between">
      <div className="flex-none items-center ml-1 mr-4">
        <label className=" items-center cursor-pointer">
          <input
            type="checkbox"
            checked={estatus}
            onChange={onCompleada}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
           {/* <span className="ml-2 text-sm text-gray-700">{estatus ? 'Completada' : 'Pendiente'}</span> */}
        </label>
      </div>
      <div className="grow">
        <h3 className={`text-lg font-semibold ${estatus ? 'line-through text-gray-500' : 'text-black'}`}>{titulo}</h3>
        <p className="text-gray-600">{contenido}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={onEditar}
          className="text-blue-500 hover:underline focus:outline-none"
        >
          Editar
        </button>
        <button
          onClick={onEliminar}
          className="text-red-500 hover:underline focus:outline-none"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Nota;
