import { useEffect, useState, React } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CSVLink, CSVDownload } from "react-csv";

export default function ListUser() {
    const [users, setUsers] = useState([]);
    const [csvUsers, setCsvUsers] = useState([]);
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get(process.env.REACT_APP_API_ENDPOINT).then(function (response) {
            console.log(response.data);
            setUsers(response.data);

            dataForExcel(response.data);
        });
    }
    const deleteUser = (id) => {
        // alert(id)
        axios.post(process.env.REACT_APP_API_ENDPOINT + `users/delete.php`, {
            id: id
        })
            .then(function (response) {
                console.log(response.data);
                getUsers();
            });
    }

    const columns = [
        {
            name: '#',
            cell: (row, index) => index + 1
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Mobile',
            selector: row => row.mobile,
            sortable: true,
        },
        {
            name: 'Actions',
            sortable: false,
            cell: (row) => (
                <>
                    <Button variant="outlined" onClick={() => deleteUser(row.id)}>Delete</Button>
                    <Link to={`user/${row.id}/edit`} style={{ marginRight: "10px" }}>
                        <Button variant="outlined" >Edit</Button>
                    </Link>

                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const dataForExcel = (data) => {
        let values = [];
        values.push(['id', 'name', 'email', 'mobile', 'created_at']);
        for (let i = 0; i < data.length; i++) {
            values.push(Object.values(data[i]));
        }
        setCsvUsers(values);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));

        if (event.target.name === 'search') {
            console.log(event.target.value.length)
            // if (event.target.value.length >= 3) {

                let searchTerm = event.target.value;

                let filteredData = users.filter(item => {
                    // console.log('!isNaN', !isNaN(searchTerm))
                    // console.log('Number.isInteger(searchTerm)', typeof(searchTerm))
                    if(isNumber(searchTerm)) {
                        console.log('true no')
                        // results = contactlist.filter((item) => {
                            return item.mobile.includes(searchTerm);
                        // })
                        // console.log('item',  typeof(item.mobile))
                        // return item.mobile == 2121;

                    }  else {
                        console.log('flae no')
                    }
 
                    // if(/^[a-zA-Z]+$/.test(searchTerm)) {
                    //     return item.name.toLowerCase().includes(searchTerm.toLowerCase());
                    // }

                    // return false;
                    
                });

                console.log('filteredData', filteredData)
            // }
        }

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    }

    return (
        <div>

            <DataTable
                columns={columns}
                data={users}
                responsive={true}
                pagination={true}
                highlightOnHover={true}
            />

            <CSVLink data={csvUsers}><Button variant="outlined">Download</Button></CSVLink>


            <input type="text" name="search" onChange={handleChange} />


            {/* <h1>List Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) =>
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>
                                <Link to={`user/${user.id}/edit`} style={{ marginRight: "10px" }}>Edit</Link>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table> */}
        </div>
    )
}