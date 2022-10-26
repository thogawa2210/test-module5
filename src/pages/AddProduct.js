import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";


function AddProduct() {
    const navigate = useNavigate();
    const [form, setForm] = useState({})

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleApi = (res) => {
        if(res.status === 200){
            Swal.fire(
                'Create Product Success',
                'Bạn đã thêm mới thành công',
                'success'
            ).then(navigate('/'))
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        }
    }

    const handleSubmit = () => {
        axios.post('http://localhost:3001/products', form)
            .then(res => handleApi(res))
            .catch(err => console.log(err))
    }

    return(
        <>
            <h1>Thêm mới sản phẩm</h1>
            <TextField fullWidth label="Tên sản phẩm"  margin="normal" name='name' onChange={handleChange}/>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField fullWidth label="Giá"  margin="normal" name='price' onChange={handleChange}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Tồn kho" margin="normal" name='stock' onChange={handleChange}/>
                </Grid>
            </Grid>
            <TextField fullWidth label="Mô tả sản phẩm" margin="normal" multiline rows={3} name='description' onChange={handleChange}/>
            <Button variant="contained" onClick={handleSubmit}>Thêm mới</Button>
            <Button variant="outlined" onClick={()=>navigate('/')}>Hủy</Button>
        </>
    )
}

export default AddProduct;
