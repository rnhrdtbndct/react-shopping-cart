import { React, useState, useEffect } from 'react';
import {ListItem, ListItemAvatar, ListItemText, Avatar, Typography, IconButton} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const CartItemCard = (props) => {
    const deleteItem = () => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        const newCartItems = storedCartItems.filter((cartItem) => cartItem.id !== props.id);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }

    return (
    <ListItem>
        <ListItemAvatar>
            <Avatar variant="rounded" src={props.image} sx={{marginRight:'10px', width: '98px', height: '98px'}} />
        </ListItemAvatar>
        <ListItemText>
            <Typography fontWeight="bold">
                Name: {props.name} <br/>
                Price: {props.price} <br/>
                Quantity: {props.quantity}x <br/>
                Subtotal: {props.subTotal} <br/>
            </Typography>
        </ListItemText>
        <IconButton size="medium">
            <DeleteOutlineOutlinedIcon style={{height: '32px', width: '32px', color: "red", justifyContent: "end"}} onClick={deleteItem}/>
        </IconButton>
    </ListItem>
  )
}

export default CartItemCard