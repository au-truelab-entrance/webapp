import CSVDashboard from "../../_components/csv-dashboard";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import StudentTable from "./students-table";
import type { Student } from "~/app/lib/definitions";

export default async function Students() {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const students: Student[] = await api.student.getAll.query();

    return (
        <div className="w-full p-6">
            <CSVDashboard />
            <StudentTable students={students} />
        </div>
    );
}
