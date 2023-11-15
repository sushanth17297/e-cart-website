import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TransitionsModal from "./Modal";
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function RecipeReviewCard({ item, handleClick, key, setProductList, productList, handlePdp }) {
    const { title, description, price, thumbnail, rating } = item;
    const [isEditing, setEditing] = useState(false);
    const [isModalOpened, setModalOpened] = useState(false);
    const [value, setValue] = useState(rating);
    console.log(`isModalOpened`, isModalOpened);
    const [updatedValue, setUpdatedValue] = useState({
        title: "",
        description: "",
        price: "",
        rating: "",
    });
    const handleEdit = (e, item) => {
        setEditing(!isEditing);
        setUpdatedValue({
            ...updatedValue,
            title: item.title,
            description: item.description,
            price: item.price,
            rating: item.rating,
        });
    };
    console.log(`updated Value from menu`, updatedValue);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleDelete = (e, item) => {
        const newProductList = productList.filter((p) => p.id !== item.id);
        setProductList(newProductList);
        toast.warn(`Deleted successfully!`);
    };

    return (
        <Card sx={{ maxWidth: 330, marginRight: 'auto', marginTop: 5 }}>
            <Link to={`productDetails`} onClick={(e) => handlePdp(e, item)} style={{ textDecoration: "none" }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={thumbnail}
                    alt="Paella dish"
                />
                <CardHeader
                    title={title}
                    subheader={
                            <Box
                                sx={{
                                    "& > legend": { mt: 2 },
                                }}
                            >{isEditing ?
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                        setUpdatedValue({
                                            ...updatedValue,
                                            rating: newValue,
                                        })
                                    }}
                                /> :
                                <Rating name="half-rating-read" value={value} precision={0.5} readOnly />
                                }
                            </Box>
                }
                />


            </Link>
            <CardContent>
                <Typography variant="body2" color="text.primary" sx={{ fontSize: 17, marginBottom: 1 }}>
                    {price + ' ' + '$'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }} >
                <LoadingButton variant="outlined" sx={{ marginTop: "auto", color: "red", borderColor: "red", outlineColor: "red" }} fullWidth className="add-to-cart" onClick={(e) => handleClick(e, item)}>
                    ADD TO CART
                </LoadingButton>
            </CardActions>
            <div className='operations'>
                <button className="edit_btn" onClick={(e) => {
                        handleEdit(e, item);
                        setModalOpened(true);
                    }}>
                    <EditIcon sx={{ fontSize: 30 }} />
                </button>
                {isModalOpened && (
                        <TransitionsModal
                            item={item}
                            isModalOpened={isModalOpened}
                            setModalOpened={setModalOpened}
                            updatedValue={updatedValue}
                            setUpdatedValue={setUpdatedValue}
                            productList={productList}
                            setProductList={setProductList}
                            setAnchorEl={setAnchorEl}
                        />
                    )}
                <button className='delete_btn' onClick={(e) => { handleDelete(e, item)}}>
                    <DeleteForeverIcon sx={{ fontSize: 30 }} />
                </button>
            </div>
        </Card>
    );
}
