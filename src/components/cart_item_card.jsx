import { React, useState} from 'react'
import {ListItem, ListItemAvatar, ListItemText, Avatar, Typography, IconButton} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {ItemCard, cartItems} from './item_card';

const CartItemCard = (props) => {
    function deleteItem () {
        cartItems.splice(props.id, 1);
        console.log(cartItems);
    }

    return (
    <ListItem>
        <ListItemAvatar>
            <Avatar variant="rounded" src={props.image} sx={{marginRight:'10px', width: '64px', height: '64px'}} />
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