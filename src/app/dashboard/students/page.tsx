import StudentHeader from "../../_components/students/student-header";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import StudentTable from "../../_components/students/students-table";
import type { Student } from "~/app/lib/definitions";

export default async function Students() {
    const session = await getServerAuthSession();

    const students: Student[] = await api.student.getAll.query();

    return (
        <div className="w-full p-6">
            <StudentHeader />
            <StudentTable students={students} />
        </div>
    );
}
