import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetCurrentUser } from "../api";
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
    AdminUsers,
    AdminUser,
    AdminProducts,
    AdminProduct,
    Cart,
    Order,
    MyAccount,
} from ".";

toast.configure();

export const App = () => {
    const [user, setUser] = useState(GetCurrentUser());
    return (
        <>
            <Header />
            <ToastContainer autoClose={3000} position={"bottom-right"} />
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
            <div id="wrap">
                <div id="main">
                    <div className="App">
                        <Switch>
                            <Route exact path="/">
                                <h1>Welcome to the Student Store!</h1>
                                <FeaturedItems />
                            </Route>
                            <Route exact path="/products">
                                <Products user={user} />
                            </Route>
                            <Route exact path="/product/:productId">
                                <Product user={user} />
                            </Route>
                            <Route exact path="/admin/products">
                                <AdminProducts />
                            </Route>
                            <Route exact path="/admin/product/:productId">
                                <AdminProduct />
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
                            <Route exact path="/myaccount">
						        <MyAccount user={user} />
					        </Route>
                            <Route exact path="/cart">
                                <Cart />
                            </Route>
                            <Route exact path="/orders">
                                <Order />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
