import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./style.css";
import {
    Header,
    NavBar,
    Products,
    Product,
    Login,
    Register,
    FeaturedItems,
    Footer,
    AdminOrders,
    AdminOrder,
    AdminUsers,
    AdminUser
} from ".";
import {GetCurrentUser} from "../api"


// export const [products, setProducts] = useState([]);

// useEffect(() => {
// 	setProducts().then((products) => {
// 		setProducts(products);
// 	})
// },[])

export const App = () => {
    const [user, setUser] = useState(GetCurrentUser());
    return (
        <>
            <header>
                <Header />
            </header>
            <nav>
                <NavBar user={user} setUser={setUser} />
                <Route exact path="/login">
                    {" "}
                    <Login setUser={setUser} />
                </Route>
                <Route exact path="/register">
                    {" "}
                    <Register setUser={setUser} />
                </Route>
            </nav>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <h1>Welcome to the Student Store!</h1>
                        <FeaturedItems />
                    </Route>
                    <Route exact path="/products">
                        <Products />
                    </Route>
                    <Route exact path="/product/:productId">
                        <Product />
                    </Route>
                    <Route exact path="/admin/orders">
                        <AdminOrders />
                    </Route>
                    <Route exact path="/admin/users">
                        <AdminUsers />
                    </Route>
                    <Route exact path="/admin/user/:userId">
                        <AdminUser />
                    </Route>
                    <Route exact path="/admin/order/:orderId">
                        <AdminOrder />
                    </Route>
                </Switch>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
