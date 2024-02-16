import { api } from "~/trpc/server";
import StudentHeader from "../../_components/students/student-header";
import StudentTable from "../../_components/students/students-table";
import type { Student } from "~/app/lib/definitions";

export default async function Students() {
    const students: Student[] = await api.student.getAll.query();

    return (
        <div className="w-full">
            <StudentHeader />
            <StudentTable students={students} />
        </div>
    );
}
