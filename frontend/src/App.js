import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ClienteLista from './components/ClienteLista';
import ClienteFormulario from './components/ClienteFormulario';

const App = () => {
  const [clientToEdit, setClientToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showClients, setShowClients] = useState(false);

  const handleEdit = (client) => {
    setClientToEdit(client);
  };

  const handleSave = () => {
    setClientToEdit(null);
    setRefresh(!refresh);
  };

  const handleShowClients = () => {
    setShowClients(true);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          {/* Form Section */}
          <div className="col-md-6">
            <ClienteFormulario setClientToEdit={setClientToEdit} onSave={handleSave} handleShowClients = {handleShowClients} clientToEdit = {clientToEdit} showClients = {showClients} />
          </div>

          {/* Client List Section */}
          <div className="col-md-6">
            <div className="d-flex justify-content-between mb-3">

              
            </div>
            {showClients && (
              <div
                className="card shadow"
                style={{ maxHeight: '400px', overflowY: 'auto' }}
              >
                <div className="card-body">
                  <ClienteLista onEdit={handleEdit} refresh={refresh} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;