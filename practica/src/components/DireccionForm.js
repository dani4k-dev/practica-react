import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { createDireccion, updateDireccion } from '../services/api';

function DireccionForm({ direccionActual, onSave }) {
  const [formData, setFormData] = useState({
    colonia: '',
    calle: '',
    numero: '',
    ciudad: '',
    estado: '',
    codigo_postal: ''
  });

  const estadosMexicanos = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
    'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato',
    'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos',
    'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
    'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas',
    'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ];

  useEffect(() => {
    setFormData(direccionActual || {
      colonia: '',
      calle: '',
      numero: '',
      ciudad: '',
      estado: '',
      codigo_postal: ''
    });
  }, [direccionActual]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setFormData({
      colonia: '',
      calle: '',
      numero: '',
      ciudad: '',
      estado: '',
      codigo_postal: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (direccionActual) {
        await updateDireccion(direccionActual.id, formData);
      } else {
        await createDireccion(formData);
      }
      limpiarFormulario(); 
      window.location.reload();
      if (onSave) onSave(); 
    } catch (error) {
      console.error('Error al guardar dirección:', error);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{direccionActual ? 'Editar Dirección' : 'Nueva Dirección'}</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Colonia *</Form.Label>
                <Form.Control
                  type="text"
                  name="colonia"
                  value={formData.colonia}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Calle *</Form.Label>
                <Form.Control
                  type="text"
                  name="calle"
                  value={formData.calle}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Número</Form.Label>
                <Form.Control
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un estado</option>
                  {estadosMexicanos.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                  type="text"
                  name="codigo_postal"
                  value={formData.codigo_postal}
                  onChange={handleChange}
                  maxLength="5"
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary" className="w-100">
            {direccionActual ? 'Actualizar Dirección' : 'Guardar Dirección'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default DireccionForm;
