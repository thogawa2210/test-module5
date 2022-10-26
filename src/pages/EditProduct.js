import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";


function EditProduct() {
    const navigate = useNavigate();
    const [form, setForm] = useState({})
    const { id } = useParams()

    useEffect(()=> {
        axios.get(`http://localhost:3001/products/${id}`)
            .then(res => setForm(res.data))
            .catch(err => console.error(err))
    },[])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleApi = (res) => {
        if(res.status === 200){
            Swal.fire(
                'Update Product Success',
                'Bạn đã cập nhật thành công',
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
        axios.put(`http://localhost:3001/products/${id}`, form)
            .then(res => handleApi(res))
            .catch(err => console.log(err))
    }

    return(
        <>
            <h1>Cập nhật sản phẩm</h1>
            <TextField fullWidth label="Tên sản phẩm"  margin="normal" name='name' onChange={handleChange} value={form.name}/>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField fullWidth label="Giá"  margin="normal" name='price' onChange={handleChange} value={form.price}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Tồn kho" margin="normal" name='stock' onChange={handleChange} value={form.stock}/>
                </Grid>
            </Grid>
            <TextField fullWidth label="Mô tả sản phẩm" margin="normal" multiline rows={3} name='description' onChange={handleChange} value={form.description}/>
            <Button variant="contained" onClick={handleSubmit}>Cập nhật</Button>
            <Button variant="outlined" onClick={()=>navigate('/')}>Hủy</Button>
        </>
    )
}

export default EditProduct;
