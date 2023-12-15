const ModalConfirmacion = ({ mensaje, onConfirmar, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded">
        <p className="text-lg font-semibold mb-4">{mensaje}</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="text-blue-500 px-4 py-2 rounded mr-4 focus:outline-none"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
