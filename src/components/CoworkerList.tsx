import { useCoworkers } from "../contexts/CoworkersContext";

interface CoworkerProp {
	name: string;
	totalPaid: number;
	drinksPurchased: number;
	totalCostOfDrinks: number;
}

const Coworker = ({
	name,
	totalPaid,
	drinksPurchased,
	totalCostOfDrinks,
}: CoworkerProp) => {
	return (
		<div className="flex justify-between items-center gap-16 p-4 border-b">
			<div className="font-bold text-xl">{name}</div>
			<div className="flex flex-col items-end">
				<span>Total Paid: ${totalPaid.toFixed(2)}</span>
				<span>Drinks Purchased: {drinksPurchased}</span>
				<span>
					Total Cost of Drinks: ${totalCostOfDrinks.toFixed(2)}
				</span>
			</div>
		</div>
	);
};

const CoworkerList = () => {
	const { coworkers } = useCoworkers() || {};
	return (
		<div className="w-full p-4">
			<h1 className="text-xl font-bold mb-4">Coffee Enjoyers!</h1>
			<div className="divide-y divide-gray-200">
				{coworkers.map((coworker, index) => (
					<Coworker key={index} {...coworker} />
				))}
			</div>
		</div>
	);
};

export default CoworkerList;
