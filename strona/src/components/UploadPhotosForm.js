import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, CloseButton } from 'react-bootstrap';
import CustomProgressBar from "./CustomProgressBar";

function UploadPhotosForm({ formData, updateFormData, nextStep, prevStep }) {
    const [selectedFiles, setSelectedFiles] = useState(formData.photos || []);

    const handleFileChange = e => {
        const newFiles = Array.from(e.target.files);
        const newFileURLs = newFiles.map(file => URL.createObjectURL(file));
        setSelectedFiles(prevFiles => [...prevFiles, ...newFileURLs]);
    };

    const handleRemoveFile = index => {
        const newFileList = selectedFiles.filter((_, fileIndex) => fileIndex !== index);
        setSelectedFiles(newFileList);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(selectedFiles);
        updateFormData({ ...formData, photos: selectedFiles });
        nextStep();
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center text-center">
                <Col>
                    {/*<h1>New Property</h1>*/}
                    <CustomProgressBar currentStep={6} totalSteps={7} />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label><strong>Wybierz zdjęcia:</strong></Form.Label>
                            <Form.Control type="file" multiple onChange={handleFileChange} />
                        </Form.Group>

                        <Row>
                            {selectedFiles.length > 0 && selectedFiles.map((fileURL, index) => (
                                <Col xs={6} md={4} key={index} className="mb-3 position-relative">
                                    <img src={fileURL} alt={`Zdjęcie ${index + 1}`} className="img-fluid" />
                                    <CloseButton
                                        className="position-absolute top-0 end-0"
                                        onClick={() => handleRemoveFile(index)}
                                    />
                                </Col>
                            ))}
                        </Row>

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={prevStep}>Wstecz</Button>
                            <Button variant="primary" type="submit">Dalej</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UploadPhotosForm;