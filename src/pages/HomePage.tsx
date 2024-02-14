import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCoworkers } from "../contexts/CoworkersContext";

import Modal from "../components/Modal";
import DeleteModal from "../components/DeleteModal";
import CoworkerList from "../components/CoworkerList";

export default function HomePage() {
	const {
		coworkers,
		orders,
		determineNextPayer,
		handlePayment,
		resetCoworkers,
	} = useCoworkers() || {};
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	useEffect(() => {
		localStorage.setItem("coworkers", JSON.stringify(coworkers));
	}, [coworkers]);

	let navigate = useNavigate();
	const handleAddOrderClick = () => {
		navigate("/add-order");
	};
	const handlePayClick = () => {
		handlePayment();
	};

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const toggleDeleteModal = () => {
		setIsDeleteModalOpen(!isDeleteModalOpen);
	};

	const handleResetClick = () => {
		localStorage.clear();
		resetCoworkers();
		navigate("/");
	};

	return (
		<div className="min-h-screen w-full p-4">
			<div className="flex flex-row">
				<div className="flex flex-col space-y-4 mt-20 min-w-[200px]">
					<button
						onClick={toggleModal}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Add Coworker
					</button>
					{isModalOpen && <Modal onClose={toggleModal} />}
					<button
						onClick={toggleDeleteModal}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					>
						Delete Coworker
					</button>
					{isDeleteModalOpen && (
						<DeleteModal onClose={toggleDeleteModal} />
					)}
					<button
						onClick={handleAddOrderClick}
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					>
						Add Order
					</button>
					<button
						onClick={handlePayClick}
						className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
					>
						Pay for Order
					</button>
					<div className="text-center p-4 shadow rounded">
						<h2 className="text-lg font-bold">Next Payer:</h2>
						<p className="text-md">{determineNextPayer()}</p>
						<h2 className="text-lg font-bold">Amount:</h2>
						<p className="text-md">
							{orders && orders.length > 0
								? orders[0].cost.toFixed(2)
								: "0"}
						</p>
					</div>
					<button
						onClick={handleResetClick}
						className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
					>
						Reset
					</button>
				</div>

				<div className="flex-grow shadow rounded p-4">
					<CoworkerList />
				</div>
			</div>
		</div>
	);
}
