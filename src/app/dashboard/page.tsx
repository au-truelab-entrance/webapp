import NumberAnalytic from "../_components/number-analytic";

async function Dashboard() {
    return (
        <>
            <div className="flex-start flex gap-1 self-stretch text-xl">
                Here’s what happening with{" "}
                <span className="text-d-code font-bold">D* CODE</span>
            </div>
            <div className="flex-start flex gap-[20px] self-stretch">
                <NumberAnalytic />
            </div>
        </>
    );
}

// Export the Dashboard component
export default Dashboard;
