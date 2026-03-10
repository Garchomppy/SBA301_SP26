import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import { carService, countryService } from "../services/apiService";
import { jwtDecode } from "jwt-decode";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    carName: "",
    unitsInStock: 5,
    unitPrice: 0,
    country: { countryId: "" },
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const roles = decoded.role || [];
        setIsAdmin(roles.includes("ROLE_1"));
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
    fetchCars();
    fetchCountries();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await carService.getAll();
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await countryService.getAll();
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditingCar(null);
    setFormData({
      carName: "",
      unitsInStock: 5,
      unitPrice: 0,
      country: { countryId: "" },
    });
  };

  const handleShow = (car = null) => {
    if (car) {
      setEditingCar(car);
      setFormData({
        carName: car.carName,
        unitsInStock: car.unitsInStock,
        unitPrice: car.unitPrice,
        country: { countryId: car.country?.countryId },
      });
    }
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.carName.length < 11) {
      alert(
        "Car Designation must be at least 11 characters long! (Current: " +
          formData.carName.length +
          ")",
      );
      return;
    }
    try {
      if (editingCar) {
        await carService.update(editingCar.carId, formData);
        alert("Car updated successfully!");
      } else {
        await carService.create(formData);
        alert("Car created successfully!");
      }
      fetchCars();
      handleClose();
    } catch (error) {
      alert(
        "Operation failed: " + (error.response?.data?.message || error.message),
      );
    }
  };

  const handleDelete = async (targetId) => {
    setCarIdToDelete(targetId);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    if (!carIdToDelete) return;
    try {
      console.log("EXECUTE API: removeCar", carIdToDelete);
      await carService.removeCar(carIdToDelete);
      alert("Vehicle successfully removed.");
      setShowDelete(false);
      fetchCars();
    } catch (error) {
      console.error("API ERROR:", error);
      alert(
        "Delete failed: " + (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="fw-bold mb-0">
            Vehicle <span className="text-primary">Inventory</span>
          </h2>
          <p className="text-secondary small mt-1">
            Manage and track your car fleet
          </p>
        </Col>
        <Col className="text-end">
          {isAdmin && (
            <Button
              variant="primary"
              onClick={() => handleShow()}
              className="shadow-sm"
            >
              <span className="me-2">+</span> Register New Car
            </Button>
          )}
        </Col>
      </Row>

      {/* Summary Stats */}
      <Row className="mb-5 g-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3 glass-panel">
            <div className="small text-secondary fw-bold text-uppercase mb-1">
              Total Fleet
            </div>
            <div className="h3 fw-bold mb-0 text-primary">{cars.length}</div>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3 glass-panel">
            <div className="small text-secondary fw-bold text-uppercase mb-1">
              In Stock
            </div>
            <div className="h3 fw-bold mb-0 text-success">
              {cars.reduce((acc, c) => acc + c.unitsInStock, 0)}
            </div>
          </Card>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table hover className="align-middle">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Car Details</th>
              <th>In Stock</th>
              <th>Unit Price</th>
              <th>Origin</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.carId}>
                <td className="fw-bold text-secondary">
                  #{car.carId.toString().padStart(4, "0")}
                </td>
                <td>
                  <div className="fw-bold">{car.carName}</div>
                  <div className="text-secondary small">
                    Added {new Date(car.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <Badge
                    bg={car.unitsInStock < 10 ? "warning" : "info"}
                    className="px-3 py-2 rounded-pill"
                  >
                    {car.unitsInStock} units
                  </Badge>
                </td>
                <td className="fw-bold text-dark">
                  ${car.unitPrice.toLocaleString()}
                </td>
                <td>
                  <span className="d-flex align-items-center gap-2">
                    <span className="opacity-75">📍</span>{" "}
                    {car.country?.countryName}
                  </span>
                </td>
                <td className="text-end">
                  {isAdmin ? (
                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="light"
                        size="sm"
                        className="bg-white shadow-sm"
                        onClick={() => handleShow(car)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("CLICK: Remove button", car.carId);
                          handleDelete(car.carId);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Badge bg="secondary" className="opacity-50">
                      View Only
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-4">
            {editingCar ? "Update Vehicle Record" : "Register Vehicle"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row className="g-4">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="small fw-bold">
                    Car Designation
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Complete model name (min. 11 chars)"
                    value={formData.carName}
                    className="bg-light border-0 py-2"
                    onChange={(e) =>
                      setFormData({ ...formData, carName: e.target.value })
                    }
                    minLength={11}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">
                    Inventory Count
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.unitsInStock || ""}
                    className="bg-light border-0 py-2"
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData({
                        ...formData,
                        unitsInStock: val === "" ? "" : parseInt(val),
                      });
                    }}
                    min="5"
                    max="20"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">
                    Asking Price (USD)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={formData.unitPrice || ""}
                    className="bg-light border-0 py-2"
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData({
                        ...formData,
                        unitPrice: val === "" ? "" : parseFloat(val),
                      });
                    }}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="small fw-bold">
                    Country of Origin
                  </Form.Label>
                  <Form.Select
                    value={formData.country.countryId}
                    className="bg-light border-0 py-2"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        country: { countryId: parseInt(e.target.value) },
                      })
                    }
                    required
                  >
                    <option value="">Select manufacturing country</option>
                    {countries.map((c) => (
                      <option key={c.countryId} value={c.countryId}>
                        {c.countryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-5 text-end gap-3 d-flex justify-content-end">
              <Button
                variant="light"
                onClick={handleClose}
                className="px-4 fw-bold"
              >
                Discard
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="px-5 fw-bold shadow-sm"
              >
                {editingCar ? "Save Unit" : "Deploy vehicle"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div className="display-4 text-danger mb-3">⚠️</div>
          <h5 className="mb-3">Are you sure?</h5>
          <p className="text-secondary">
            You are about to permanently remove vehicle{" "}
            <strong>#{carIdToDelete}</strong>. This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center pb-4">
          <Button
            variant="light"
            onClick={() => setShowDelete(false)}
            className="px-4 fw-bold"
          >
            Keep Record
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete}
            className="px-5 fw-bold shadow-sm"
          >
            Yes, Remove It
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CarManagement;
