// src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CoworkersProvider } from "./contexts/CoworkersContext";
import HomePage from "./pages/HomePage";
import AddOrderPage from "./pages/AddOrderPage";

export default function App() {
	return (
		<CoworkersProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/add-order" element={<AddOrderPage />} />
				</Routes>
			</BrowserRouter>
		</CoworkersProvider>
	);
}
