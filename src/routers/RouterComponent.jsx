import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter/ProtectedRouter";
import UnProtectedRouter from "./UnProtectedRouter/UnProtectedRouter";

// screens
import Login from "../screens/Login/Login";
import { lazy } from "react";
import Coupoun from "../screens/Coupoun/Coupoun";
import CouponTailor from "../screens/Coupoun/CouponTailor";
import BrandDetails from "../screens/Brands/BrandsDetails";
import BoutiqueDetails from "../screens/Boutiques/BoutiqueDetails";
import TailorDetails from "../screens/Tailors/TailorDetails";
import DriverDetails from "../screens/Drivers/DriverDetails";

const Dashboard = lazy(() => import("../screens/Dashboard/Dashboard"));
const Users = lazy(() => import("../screens/Users/Users"));
const Drivers = lazy(() => import("../screens/Drivers/Drivers"));

const MarketplaceCustomers = lazy(() =>
    import("../screens/Customers/MarketplaceCustomers")
);
const TailorCustomers = lazy(() =>
    import("../screens/Customers/TailorCustomers")
);
const MarkateplaceBanner = lazy(() =>
    import("../screens/Banner/MarkateplaceBanner/MarkateplaceBanner")
);
const EditMarkateplaceBanner = lazy(() =>
    import("../screens/Banner/MarkateplaceBanner/EditMarkateplaceBanner")
);
const AddMarkateplaceBanner = lazy(() =>
    import("../screens/Banner/MarkateplaceBanner/AddMarketplaceMedia")
);
const TailorBanner = lazy(() =>
    import("../screens/Banner/TailorBanner/TailorBanner")
);
const AddTailorBanner = lazy(() =>
    import("../screens/Banner/TailorBanner/AddTailorBanner")
);
const Categorys = lazy(() => import("../screens/Category/Category"));
const CategorysBanner = lazy(() =>
    import("../screens/Category/CategoryBanner/CategoryBanner")
);
const AddCategoryBanner = lazy(() =>
    import("../screens/Category/CategoryBanner/AddCategoryBanner")
);
const EditCategoryBanner = lazy(() =>
    import("../screens/Category/CategoryBanner/EditCategoryBanner")
);
const AddCategory = lazy(() => import("../screens/Category/AddCategory"));
const EditCategory = lazy(() => import("../screens/Category/EditCategory"));
const Brands = lazy(() => import("../screens/Brands/Brands"));
const Boutiques = lazy(() => import("../screens/Boutiques/Boutiques"));
const Tailors = lazy(() => import("../screens/Tailors/Tailors"));
const MarketplaceOrders = lazy(() =>
    import("../screens/Orders/MarketplaceOrders/MarketplaceOrders")
);
const SingleMarketPlaceOrders = lazy(() =>
    import("../screens/Orders/MarketplaceOrders/SingleMarketPlaceOrders")
);
const TailorOrders = lazy(() =>
    import("../screens/Orders/TailorOrders/TailorOrders")
);
const SingleTailorOrder = lazy(() =>
    import("../screens/Orders/TailorOrders/SingleTailorOrder")
);
const FooterText = lazy(() => import("../screens/FooterText/FooterText"));

const UserDetails = lazy(() => import("../screens/Users/UserDetails"));

const Price = lazy(() => import("../screens/Price/Price"));

const RouterComponent = () => {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRouter />}>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/users" element={<Users />}></Route>

                    <Route path="/brands" element={<Brands />}></Route>
                    <Route path="/boutiques" element={<Boutiques />}></Route>
                    <Route path="/tailors" element={<Tailors />}></Route>
                    <Route path="/drivers" element={<Drivers />}></Route>

                    <Route
                        path="/customer/marketplace"
                        element={<MarketplaceCustomers />}
                    ></Route>
                    <Route
                        path="/customer/tailor"
                        element={<TailorCustomers />}
                    ></Route>
                    <Route
                        path="/banner/marketplace"
                        element={<MarkateplaceBanner />}
                    ></Route>
                    <Route
                        path="/banner/marketplace/:id"
                        element={<EditMarkateplaceBanner />}
                    ></Route>
                    <Route
                        path="/banner/marketplace/add"
                        element={<AddMarkateplaceBanner />}
                    ></Route>
                    <Route
                        path="/banner/tailor"
                        element={<TailorBanner />}
                    ></Route>
                    <Route
                        path="/banner/tailor/add"
                        element={<AddTailorBanner />}
                    ></Route>
                    <Route path="/category" element={<Categorys />}></Route>
                    <Route
                        path="/category/add"
                        element={<AddCategory />}
                    ></Route>
                    <Route
                        path="/category/edit/:id"
                        element={<EditCategory />}
                    ></Route>
                    <Route
                        path="/category/thumbs"
                        element={<CategorysBanner />}
                    ></Route>
                    <Route
                        path="/category/thumbs/add"
                        element={<AddCategoryBanner />}
                    ></Route>
                    <Route
                        path="/category/thumbs/edit/:id"
                        element={<EditCategoryBanner />}
                    ></Route>
                    <Route
                        path="/orders/tailor"
                        element={<TailorOrders />}
                    ></Route>
                    <Route
                        path="/orders/tailor/:ordersId"
                        element={<SingleTailorOrder />}
                    ></Route>
                    <Route
                        path="/orders/marketplace"
                        element={<MarketplaceOrders />}
                    ></Route>
                    <Route
                        path="/orders/marketplace/:orderId"
                        element={<SingleMarketPlaceOrders />}
                    ></Route>
                    <Route path="/footer-text" element={<FooterText />}></Route>
                    <Route path="/cpn" element={<Coupoun />}></Route>
                    <Route path="/cpnt" element={<CouponTailor />}></Route>
                    <Route
                        path="/users/details/:id"
                        element={<UserDetails />}
                    />
                    <Route path="/prc" element={<Price />} />
                    <Route
                        path="/brands/details/:id"
                        element={<BrandDetails />}
                    />
                    <Route
                        path="/boutiques/details/:id"
                        element={<BoutiqueDetails />}
                    />
                    <Route
                        path="/tailors/details/:id"
                        element={<TailorDetails />}
                    />
                    <Route
                        path="/drivers/details/:id"
                        element={<DriverDetails />}
                    />
                </Route>
                <Route element={<UnProtectedRouter />}>
                    <Route path="/" element={<Login />}></Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default RouterComponent;
