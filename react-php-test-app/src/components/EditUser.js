import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function ListUser() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);

    const [showAlert, setShowAlert] = useState(false)

    const buttonHandler = () => {
            setShowAlert(current => !current)
    }

    const { id } = useParams();
    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(process.env.REACT_APP_API_ENDPOINT + `users/read.php?user=${id}`)
            .then(function (response) {
                // console.log(response.data);
                setInputs(response.data[0]);
            });
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        mobile: Yup.number('Invalid Number')
            .required('Required')
            .positive()
            .integer(),
    });


    return (
        <div>
            <h1>Edit user</h1>
            <Formik
                enableReinitialize={true}
                initialValues={inputs}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // console.log(values);
                    axios.post(process.env.REACT_APP_API_ENDPOINT + 'users/update.php', values)
                        .then(function (response) {
                            // console.log(response.data);
                            buttonHandler();
                        });
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        Name
                        <Field name="name" label="Name" variant="standard"   />
                        <ErrorMessage name="name" />
                        <br/>
                        Email
                        <Field name="email" type="email" label="Email" variant="standard"   />
                        <ErrorMessage name="email" />
                        <br/>
                        Mobile
                        <Field name="mobile" label="Mobile" variant="standard"   />
                        <ErrorMessage name="mobile" />
                        <br/>
                        <Button variant="outlined" type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>

            {showAlert ? <Alert severity="success">Success! Data updated successfully</Alert> : null}
            

        </div>
    )
}