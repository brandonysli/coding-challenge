import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCoworkers } from "../contexts/CoworkersContext";
import Cleave from "cleave.js/react";

interface ExpenseInput {
	name: string;
	expense: number;
}

const AddOrderPage = () => {
	const { coworkers, addExpense, addOrder } = useCoworkers();
	const [expenses, setExpenses] = useState<ExpenseInput[]>(
		coworkers.map((c) => ({ name: c.name, expense: 0 }))
	);
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		expenses.forEach(({ name, expense }: ExpenseInput) => {
			if (expense > 0) {
				addExpense(name, expense);
			}
		});
		// add the total cost of order
		addOrder(expenses.reduce((acc, curr) => acc + curr.expense, 0));
		// reset expenses
		navigate("/");
	};

	const handleCleaveChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const updatedExpenses = [...expenses];
		const newValue = parseFloat(event.target.value) || 0;
		updatedExpenses[index].expense = newValue;
		setExpenses(updatedExpenses);
	};

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Add Order</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				{expenses.map((expense, index) => (
					<div
						key={expense.name}
						className="flex justify-between items-center"
					>
						<label className="mr-4">{expense.name}</label>
						<Cleave
							options={{
								numeral: true,
								numeralDecimalScale: 2,
							}}
							onChange={(e) => handleCleaveChange(e, index)}
							value={expense.expense}
							className="input-class-name"
						/>
					</div>
				))}
				<button
					type="submit"
					className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Submit Orders
				</button>
				<button
					type="button"
					onClick={() => navigate("/")}
					className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default AddOrderPage;
