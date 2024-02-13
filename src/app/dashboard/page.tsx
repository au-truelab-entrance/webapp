import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

async function GetAllStudent() {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const students = await api.student.getAll.query();

    return (
        <div>
            {students.map((each) => (
                <p key={each.studentID}>{each.studentID}</p>
            ))}
        </div>
    );
}

async function Dashboard() {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    return (
        <div>
            Dashboard
            {/* <CSVDashboard />
            <GetAllStudent /> */}
        </div>
    );
}

// Export the Dashboard component
export default Dashboard;
