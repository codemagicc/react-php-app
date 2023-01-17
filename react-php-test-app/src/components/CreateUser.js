import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function ListUser() {
    const [showAlert, setShowAlert] = useState(false);
    const buttonHandler = () => {
        setShowAlert(current => !current)
    }
    // const [inputs, setInputs] = useState([]);
    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({ ...values, [name]: value }));
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.post(process.env.REACT_APP_API_ENDPOINT, inputs).then(function (response) {
    //         console.log(response.data);
    //     });
    // }

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        contact: Yup.number('Invalid Number')
            .required('Required')
            .positive()
            .integer(),
    });

    return (
        <div>


            <Container fixed>
                <h1>Create Account</h1>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        contact: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        // console.log(values);
                        axios.post(process.env.REACT_APP_API_ENDPOINT + 'users/create.php', values)
                            .then(function (response) {
                                // console.log(response.data);
                                buttonHandler();
                            });
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            Name
                            <Field name="name" label="Name" variant="standard" fullWidth />
                            <ErrorMessage name="name" />
                            <br />
                            Email
                            <Field name="email" type="email" variant="standard" fullWidth />
                            <ErrorMessage name="email" />
                            <br />
                            Mobile
                            <Field name="contact" variant="standard" fullWidth />
                            <ErrorMessage name="contact" />
                            <br />
                            <Button variant="outlined" type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
                {showAlert ? <Alert severity="success">Success! Data Saved successfully</Alert> : null}
            </Container>

        </div >
    )
}