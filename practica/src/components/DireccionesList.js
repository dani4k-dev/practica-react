import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Modal } from 'react-bootstrap';
import { getDirecciones, deleteDireccion } from '../services/api';
import DireccionForm from './DireccionForm';

function DireccionesList() {
  const [direcciones, setDirecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [editDireccion, setEditDireccion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    cargarDirecciones();
  }, []);

  const cargarDirecciones = async () => {
    try {
      setLoading(true);
      const data = await getDirecciones();
      setDirecciones(data);
    } catch (error) {
      setMensaje('Error al cargar direcciones');
    } finally {
      setLoading(false);
    }
  };

  const guardarDireccion = () => {
    setMensaje('Dirección actualizada correctamente');
    setShowModal(false);
    cargarDirecciones();
    setTimeout(() => setMensaje(null), 3000);
  };

  const eliminarDireccion = async (id) => {
    if (window.confirm('¿Eliminar esta dirección?')) {
      try {
        await deleteDireccion(id);
        setMensaje('Dirección eliminada correctamente');
        cargarDirecciones();
        setTimeout(() => setMensaje(null), 3000);
      } catch {
        setMensaje('Error al eliminar la dirección');
      }
    }
  };

  if (loading) return <p className="text-center mt-4">Cargando direcciones...</p>;

  return (
    <Container className="mt-4">
      <h2>Mis Direcciones ({direcciones.length})</h2>

      {mensaje && <Alert variant="info">{mensaje}</Alert>}

      {direcciones.length === 0 ? (
        <p>No hay direcciones registradas</p>
      ) : (
        <Row>
          {direcciones.map((d) => (
            <Col md={6} lg={4} key={d.id} className="mb-3">
              <Card>
                <Card.Body>
                  <p><strong>{d.calle}</strong> #{d.numero}</p>
                  <p>{d.colonia}</p>
                  <p>{d.ciudad}, {d.estado}</p>
                  <p>C.P. {d.codigo_postal}</p>

                  <Button
                    size="sm"
                    onClick={() => { setEditDireccion(d); setShowModal(true); }}
                  >
                    Editar
                  </Button>{' '}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => eliminarDireccion(d.id)}
                  >
                    Eliminar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        show={showModal}
        onHide={() => { setShowModal(false); setEditDireccion(null); }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Dirección</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DireccionForm
            direccionActual={editDireccion}
            onSave={guardarDireccion}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default DireccionesList;
