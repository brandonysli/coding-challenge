import React, { useState } from "react";
import { useCoworkers } from "../contexts/CoworkersContext";

interface ModalProps {
	onClose: () => void;
}

const Modal = ({ onClose }: ModalProps) => {
	const { addCoworker } = useCoworkers();
	const [name, setName] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		addCoworker(name);
		setName("");
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-4 rounded-lg">
				<h2 className="text-lg font-bold text-black">Add Coworker</h2>
				<form onSubmit={handleSubmit} className="mt-2">
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="border p-2 rounded w-full"
						placeholder="Coworker's Name"
					/>
					<button
						type="submit"
						className="mt-3 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
					>
						Submit
					</button>
					<button
						type="button"
						onClick={onClose}
						className="mt-3 ml-2 bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-700"
					>
						Close
					</button>
				</form>
			</div>
		</div>
	);
};

export default Modal;
