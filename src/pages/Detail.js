import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

function Detail(){
    const navigate = useNavigate();
    const [product, setProduct] = useState({})
    const {id} = useParams()

    const handleClick = () => {
        navigate('/')
    }

    useEffect(()=> {
        axios.get(`http://localhost:3001/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err))
    },[])

    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <h2>Chi tiết sản phẩm</h2>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={handleClick}>Danh sách</Button>
                </Grid>
            </Grid>
            <div>
                Tên sản phẩm: {product.name}
                <br/>
                Giá(đ): {product.price}
                <br/>
                Tồn kho: {product.stock}
                <hr/>
                Mô tả:
                <br/>
                {product.description}
            </div>
        </>
    )
}

export default Detail;