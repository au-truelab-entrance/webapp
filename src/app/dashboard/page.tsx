import CSVDashboard from "../_components/csv-dashboard";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

async function GetAllStudent() {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const students = await api.student.getAll.query();
    console.log(students);

    return (
        <div>
            {students.map((each) => (
                <p key={each.studentID}>{each.studentID}</p>
            ))}
        </div>
    );
}

async function Dashboard() {
    return (
        <div>
            <h1>Hello</h1>
            <CSVDashboard />
            <GetAllStudent />
        </div>
    );
}

// Export the Dashboard component
export default Dashboard;
