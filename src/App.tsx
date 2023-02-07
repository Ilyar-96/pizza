import React, { Suspense } from "react";
import {
	Routes,
	Route,
} from "react-router-dom";

import MainLayout from './layouts/MainLayout';
import { ConfirmModal, Spinner } from "./components";
import Home from './pages/Home';

import './scss/app.scss';

const NotFound = React.lazy(() => import(
	/* webpackChunkName: "NotFound" */
	'./pages/NotFound'
));
const Cart = React.lazy(() => import(
	/* webpackChunkName: "Cart" */
	'./pages/Cart'
));
const FullPizza = React.lazy(() => import(
	/* webpackChunkName: "FullPizza" */
	'./pages/FullPizza'
));


function App() {
	return (
		<div className="wrapper">
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<MainLayout />} >
						<Route index element={<Home />} />
						<Route path="/pizza/:id" element={<FullPizza />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Suspense>

			<ConfirmModal />
		</div>
	);
};

export default App;
