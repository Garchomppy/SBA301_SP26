import React, { useEffect } from 'react';
import { Container, Button, Form, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

export default function EditOrchid() {
    const { id } = useParams();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_URL;

    // 2. Cấu hình React Hook Form
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // 3. Lấy dữ liệu cũ của Orchid khi vừa vào trang
    useEffect(() => {
        const getOrchidDetail = async () => {
            try {
                const response = await axios.get(`${baseUrl}${id}`);
                const orchid = response.data;
                
                // Đổ dữ liệu cũ vào các ô Input
                setValue("orchidName", orchid.orchidName);
                setValue("image", orchid.image);
                setValue("isNatural", orchid.isNatural);
            } catch (error) {
                console.error("Error fetching orchid detail:", error);
                toast.error("Could not find this orchid!");
            }
        };
        getOrchidDetail();
    }, [id, baseUrl, setValue]);

    // 4. Hàm xử lý cập nhật (Lệnh PUT)
    const onUpdate = async (data) => {
        try {
            await axios.put(`${baseUrl}${id}`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success("Updated successfully!");
            // Sau khi sửa xong 2 giây thì tự chuyển về trang danh sách
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error(error.message);
            toast.error("Update failed!");
        }
    };

    return (
        <Container className="mt-5">
            <Toaster position="top-right" />
            <Card className="shadow">
                <Card.Header className="bg-warning text-dark text-center">
                    <h3>Edit Orchid ID: {id}</h3>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(onUpdate)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Orchid Name</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("orchidName", { required: true })}
                            />
                            {errors.orchidName && <small className="text-danger">Name is required</small>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("image", { required: true })}
                            />
                            {errors.image && <small className="text-danger">Image URL is required</small>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check 
                                type="switch"
                                label="Natural Orchid"
                                {...register("isNatural")}
                            />
                        </Form.Group>

                        <div className="d-flex gap-2">
                            <Button variant="primary" type="submit">
                                Update Changes
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/')}>
                                Back to List
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}