import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./style.css";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { getProduct, updateItem, deleteItem} from "../api";

export const AdminProduct = () => {
    const {productId} = useParams();
    const history = useHistory();
    const [form, setForm] = useState({ name: "", description:"", price: "", imageURL: "", inStock:"", category:"" });
    
    useEffect(() => {
        const callback = async () => {
            const prod = await getProduct(productId)
            setForm({ name: prod.name, description:prod.description, price: prod.price, imageURL: prod.imageURL, inStock:prod.inStock, category:prod.category  })
        }
        callback();
    }, [productId])
    
    
    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateItem( {
                id: productId,
                name: form.name,
                description: form.description,
                price: form.price,
                imageURL: form.imageURL,
                inStock: form.inStock,
                category: form.category
            });
            toast(`${form.name} has been updated.`, { type: "success" });
            history.push("/admin/products")
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteItem( {
                id: productId,
            });
            toast(`${form.name} has been removed.`, { type: "success" });
            history.push("/admin/products")
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h3>Update Product information</h3>
            <h4>Only change fields that need to be updated for the item.</h4>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleInput}
                />
                <br />
                <label>Description: </label>
                <input
                    name="description"
                    value={form.description}
                    onChange={handleInput}
                />
                <br />
                <label>Category </label>
                <input
                    name="category"
                    value={form.category}
                    onChange={handleInput}
                />
                <br />
                <label>Price: </label>
                <input
                    name="price"
                    value={form.price}
                    onChange={handleInput}
                    type="number"
                />
                <br />
                <label>Image Link: </label>
                <input
                    name="imageURL"
                    value={form.imageURL}
                    onChange={handleInput}
                    type="url"
                />
                <br />
                <label>Qty Available: </label>
                <input
                    name="inStock"
                    value={form.inStock}
                    onChange={handleInput}
                    type="number"
                />
                <button type="submit" className="reg-button">Update Item</button>
                <button type="button" className="reg-button" onClick={handleDelete} >Delete Item</button>
            </form>
        </div>
    );
};
