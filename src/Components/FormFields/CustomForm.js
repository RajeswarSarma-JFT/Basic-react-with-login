import React, { useEffect } from 'react';
import { Col, Form, Row } from 'reactstrap';
import FormFields from './FormFields';
import { initializeFormFields, getFormValues, resetFormValues } from 'Components/FormFields/Validation';

const CustomForm = ({ formFields, setFormFields, onSubmit }) => {
    useEffect(() => {
        initializeFormFields(formFields, setFormFields);
        return () => {
            resetFormValues(formFields, setFormFields, {});
        };
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const { isFormValid, values } = getFormValues(formFields, setFormFields);
        if (isFormValid) {
            onSubmit(values)
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            {formFields.map((field, index) => (
                <Row key={index}>
                    <Col className="pt-3">
                        <FormFields field={field} />
                    </Col>
                </Row>
            ))}

            <div className="d-flex justify-content-center py-2">
                <button className="btn btn-info mt-4" type="submit">
                    Submit
                </button>
            </div>
        </Form>
    );
};
export default CustomForm;
