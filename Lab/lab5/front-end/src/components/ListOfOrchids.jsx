import  { useEffect, useState } from 'react';
import { Table, Container, Button, Form, Modal, Image, Badge } from 'react-bootstrap';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

export default function ListOfOrchids() {
    const baseUrl = import.meta.env.VITE_API_URL; 
    const [api, setAPI] = useState([]);
    const [show, setShow] = useState(false);
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(baseUrl);
            const sortedData = response.data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
            setAPI(sortedData);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error("Failed to load orchids!");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}`);
            fetchData(); 
            toast.success("Orchid deleted successfully!");
        } catch (error) {
            console.log(error.message);
            toast.error("Orchid deleted failed!");
        }
    };

    const onSubmit = async (data) => {
        try {
            await axios.post(baseUrl, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            setShow(false);
            fetchData();
            reset();
            toast.success("Orchid added successfully!");
        } catch (error) {
            console.log(error.message);
            toast.error("Orchid added fail!");
        }
    };

    return (
        <Container>
             <Button onClick={handleShow} variant="primary">
                                <i className="bi bi-node-plus"></i> Add new orchid
                            </Button>
            <Toaster position="top-right" />
            <Table striped bordered hover my-5>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Orchid name</th>
                        <th>Catogory</th>
                        <th>Original</th>
                        <th>
                           
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {api.map((a) => (
                        <tr key={a.orchidID}>
                            <td>
                                <Image src={a.image} width={40} rounded />
                            </td>
                            <td>{a.orchidName}</td>
                            <td>
                                {a.isNatural ? (
                                    <Badge bg="success">Natural</Badge>
                                ) : (
                                    <Badge bg="warning">Industry</Badge>
                                )}
                            </td>
                            <td>
                                <Link to={`/edit/${a.orchidID   }`} className="text-warning me-3">
                                    <i className="bi bi-pencil-square"></i> Edit
                                </Link>
                                <span 
                                    className="text-danger" 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this orchid?")) 
                                            handleDelete(a.orchidID);
                                    }}
                                >
                                    <i className="bi bi-trash3"></i> Delete
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal Thêm mới */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>New Orchid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                {...register("orchidName", { required: true })}
                            />
                            {errors.orchidName && <p className="text-warning">Name is required</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("image", { 
                                    required: true,
                                    pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
                                })}
                            />
                            {errors.image && <p className="text-warning">Valid image URL is required</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Check 
                                type="switch" 
                                id="custom-switch" 
                                label="Natural" 
                                {...register("isNatural")}
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" type="submit">Save Changes</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}