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
} from ".";

// export const [products, setProducts] = useState([]);

// useEffect(() => {
// 	setProducts().then((products) => {
// 		setProducts(products);
// 	})
// },[])

export const App = () => {
    const [user, setUser] = useState("");
    return (
        <>
            <header>
                <Header />
            </header>
            <nav>
                <NavBar currentUser />
                <Route path="/login">
                    {" "}
                    <Login setUser={setUser} />
                </Route>
                <Route path="/register">
                    {" "}
                    <Register setUser={setUser} />
                </Route>
            </nav>
            <div className="App">
                <Switch>
                    <Route path="/">
                        <h1>Welcome to the Student Store!</h1>
                        <FeaturedItems />
                    </Route>
                    <Route path="/products">
                        <Products />
                    </Route>
                    <Route path="/product/:productId">
                        <Product />
                    </Route>
                </Switch>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
