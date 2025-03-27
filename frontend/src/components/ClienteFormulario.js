import React, { useState, useEffect } from "react";
import { createClient, updateClient } from "../services/api";

const ClienteFormulario = ({ setClientToEdit, onSave, handleShowClients, clientToEdit, showClients }) => {
  const [formData, setFormData] = useState({ nome: "", idade: "", email: "" });

  useEffect(() => {
    if (clientToEdit) {
      setFormData(clientToEdit); // Populate form with client data when editing
    } else {
      setFormData({ nome: "", idade: "", email: "" }); // Reset form for creation
    }
  }, [clientToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (clientToEdit) {
      await updateClient(clientToEdit.id, formData); // Update client
    } else {
      await createClient(formData); // Create new client
    }
    onSave();
  };

  const handleCreateMode = () => {
    setFormData({ nome: "", idade: "", email: "" }); // Reset form
    onSave(); // Switch to creation mode
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <h4 className="card-title text-center">
          {clientToEdit ? "Editar Cliente" : "Adicionar Cliente"}
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Idade</label>
            <input
              type="number"
              className="form-control"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              {clientToEdit ? "Salvar Alterações" : "Criar"}
            </button>
            {clientToEdit && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCreateMode}
              >
                Criar
              </button>
            )}
            <div className="btn-group">
              <button
                className="btn btn-primary"
                onClick={handleShowClients}
                disabled={showClients}
              >
                Listar Clientes
              </button>
              {clientToEdit && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setClientToEdit(null)}
                >
                  Criar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteFormulario;
