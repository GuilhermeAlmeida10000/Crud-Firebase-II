import React, { useEffect, useState } from 'react';
import { getClients, deleteClient } from '../services/api';

const ClienteLista = ({ onEdit, refresh }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, [refresh]); // Re-fetch clients when `refresh` changes

  const fetchClients = async () => {
    const response = await getClients();
    setClients(response.data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este cliente?');
    if (!confirmDelete) return;
  
    try {
      await deleteClient(id); // Call the API to delete the client
      fetchClients(); // Refresh the client list
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      alert('Erro ao deletar cliente. Tente novamente.');
    }
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <h4 className="card-title text-center">Lista de Clientes</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((client) => (
              <tr key={client.id}>
                <td>{client.nome}</td>
                <td>{client.idade}</td>
                <td>{client.email}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onEdit(client)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(client.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClienteLista;