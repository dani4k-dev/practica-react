import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import DireccionForm from './components/DireccionForm';
import DireccionList from './components/DireccionesList';

function App() {
  const [reload, setReload] = useState(false);

  const handleDireccionAgregada = () => {
    setReload(!reload);
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">CRUD de Direcciones</h1>
      <DireccionForm onDireccionAgregada={handleDireccionAgregada} />
      <DireccionList reload={reload} />
    </Container>
  );
}

export default App;
