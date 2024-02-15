// src/contexts/CoworkersContext.js

import { createContext, useState, useContext, useEffect } from "react";

interface Coworker {
	name: string;
	totalPaid: number;
	drinksPurchased: number;
	totalCostOfDrinks: number;
}

interface Order {
	cost: number;
}

interface Score {
	name: string;
	score: number;
}

interface CoworkersContextType {
	coworkers: Coworker[];
	orders: Order[];
	addExpense: (name: string, drinkCost: number) => void;
	addCoworker: (name: string) => void;
	addOrder: (cost: number) => void;
	determineNextPayer: () => string;
	handlePayment: () => void;
	resetCoworkers: () => void;
	deleteCoworker: (name: string) => void;
}

const defaultContextValue: CoworkersContextType = {
	coworkers: [],
	orders: [],
	addExpense: () => {},
	addCoworker: () => {},
	addOrder: () => {},
	determineNextPayer: () => "",
	handlePayment: () => {},
	resetCoworkers: () => {},
	deleteCoworker: () => {},
};

const CoworkersContext =
	createContext<CoworkersContextType>(defaultContextValue);

export const useCoworkers = () => useContext(CoworkersContext);

interface CoworkersProviderProps {
	children: React.ReactNode;
}

export const CoworkersProvider = ({ children }: CoworkersProviderProps) => {
	const [coworkers, setCoworkers] = useState(() => {
		const saved = localStorage.getItem("coworkers");
		const initialValue = saved ? JSON.parse(saved) : [];
		return initialValue;
	});

	const [orders, setOrders] = useState(() => {
		const saved = localStorage.getItem("orders");
		const initialValue = saved ? JSON.parse(saved) : [];
		return initialValue;
	});

	const addExpense = (name: string, drinkCost: number) => {
		setCoworkers((currentCoworkers: Coworker[]) => {
			return currentCoworkers.map((coworker: Coworker) =>
				coworker.name === name
					? {
							...coworker,
							totalPaid: coworker.totalPaid,
							drinksPurchased: coworker.drinksPurchased + 1,
							totalCostOfDrinks:
								coworker.totalCostOfDrinks + drinkCost,
					  }
					: coworker
			);
		});
	};

	const addPayment = (name: string, cost: number) => {
		setCoworkers((currentCoworkers: Coworker[]) => {
			return currentCoworkers.map((coworker: Coworker) =>
				coworker.name === name
					? {
							...coworker,
							totalPaid: coworker.totalPaid + cost,
							drinksPurchased: coworker.drinksPurchased,
							totalCostOfDrinks: coworker.totalCostOfDrinks,
					  }
					: coworker
			);
		});
	};

	const addCoworker = (name: string) => {
		const upperName = name.toUpperCase();
		const newCoworkers = [
			...coworkers,
			{
				name: upperName,
				totalPaid: 0,
				drinksPurchased: 0,
				totalCostOfDrinks: 0,
			},
		];
		setCoworkers(newCoworkers);
	};

	const addOrder = (cost: number) => {
		const newOrders = [...orders, { cost }];
		setOrders(newOrders);
	};

	const determineNextPayer = () => {
		// calculate score for each coworker
		const scores = coworkers!.map((coworker: Coworker) => {
			return {
				name: coworker.name,
				score: coworker.totalPaid - coworker.totalCostOfDrinks,
			};
		});

		// sort by score to find who should pay next (the most negative score pays)
		scores.sort((a: Score, b: Score) => a.score - b.score);
		if (scores[0] === undefined) {
			return "None";
		}
		return scores[0].name;
	};

	const handlePayment = () => {
		if (orders.length > 0) {
			const nextPayerName = determineNextPayer();
			const amount = orders[0].cost;
			// get first order
			const newOrders = orders.slice(1);
			setOrders(newOrders);
			// update details
			addPayment(nextPayerName, amount);
		}
	};

	const deleteCoworker = (name: string) => {
		const upperName = name.toUpperCase();
		setCoworkers((currentCoworkers: Coworker[]) =>
			currentCoworkers.filter((coworker) => coworker.name !== upperName)
		);
	};

	const resetCoworkers = () => {
		setCoworkers([]);
		setOrders([]);
	};

	// update localStorage when coworkers change
	useEffect(() => {
		localStorage.setItem("coworkers", JSON.stringify(coworkers));
	}, [coworkers]);

	return (
		<CoworkersContext.Provider
			value={{
				coworkers,
				orders,
				addExpense,
				addCoworker,
				addOrder,
				determineNextPayer,
				handlePayment,
				resetCoworkers,
				deleteCoworker,
			}}
		>
			{children}
		</CoworkersContext.Provider>
	);
};
