import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { getDirecciones, updateDireccion } from '../services/api';

const DireccionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [direccion, setDireccion] = useState({
    calle: '',
    numero: '',
    colonia: '',
    ciudad: '',
    estado: '',
    codigo_postal: ''
  });

  useEffect(() => {
    getDirecciones().then((data) => {
      const found = data.find((item) => item.id === parseInt(id));
      if (found) {
        setDireccion(found);
      } else {
        alert('Dirección no encontrada');
        navigate('/');
      }
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDireccion(id, direccion)
      .then(() => {
        alert('Dirección actualizada correctamente');
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container className="mt-5">
      <h2>Editar Dirección</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Calle</Form.Label>
          <Form.Control
            type="text"
            name="calle"
            value={direccion.calle}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Número</Form.Label>
          <Form.Control
            type="text"
            name="numero"
            value={direccion.numero}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Colonia</Form.Label>
          <Form.Control
            type="text"
            name="colonia"
            value={direccion.colonia}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            name="ciudad"
            value={direccion.ciudad}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            type="text"
            name="estado"
            value={direccion.estado}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Código Postal</Form.Label>
          <Form.Control
            type="text"
            name="codigo_postal"
            value={direccion.codigo_postal}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate('/')}
        >
          Cancelar
        </Button>
      </Form>
    </Container>
  );
};

export default DireccionEdit;
