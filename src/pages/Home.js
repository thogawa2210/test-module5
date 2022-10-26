import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import axios from "axios";
import {Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function Home() {
    const [list, setList] = useState([])
    const navigate = useNavigate();

    useEffect(()=> {
        axios.get('http://localhost:3001/products')
            .then(res => {
                    setList(res.data)
                }
            )
            .catch(err => console.error(err))
    },[])

    const handleDetail = (id) => {
        navigate(`/products/${id}`)
    }

    const handleAdd = () => {
        navigate('/add')
    }

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure to delete?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/products/${id}`)
                Swal.fire('Delete Success!', '', 'success')
                window.location.reload();
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <h2>Danh sách sản phẩm</h2>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" onClick={handleAdd}>Thêm sản phẩm</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="center">Tên sản phẩm</StyledTableCell>
                            <StyledTableCell align="center">Giá(đ)</StyledTableCell>
                            <StyledTableCell align="center">Tồn kho</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((item) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row">
                                    {item.id}
                                </StyledTableCell>
                                <StyledTableCell align="center" onClick={()=>handleDetail(item.id)}>{item.name}</StyledTableCell>
                                <StyledTableCell align="center">{item.price}</StyledTableCell>
                                <StyledTableCell align="center">{item.stock}</StyledTableCell>
                                <StyledTableCell align="center"><Button variant="contained" onClick={()=> handleEdit(item.id)}>Cập nhật</Button></StyledTableCell>
                                <StyledTableCell align="center"><Button variant="contained" color="error" onClick={()=>handleDelete(item.id)}>Xóa</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}

export default Home;