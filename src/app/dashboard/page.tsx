import { api } from "~/trpc/server";
import type { HeatMap } from "~/app/lib/definitions";
import type { Student } from "~/app/lib/definitions";

import PopularGraph from "../_components/popular-graph";
import NumberAnalytic from "../_components/number-analytic";
import StudentHeader from "../_components/students/student-header";
import StudentTable from "../_components/students/students-table";

const fixFormat = async () => {
    const validDataFormat: HeatMap[] = [["Time", "Data"]];
    const data = await api.analytics.getData.query();
    data.map((each) => {
        validDataFormat.push([
            new Date(each.createdAt),
            each.year1 + each.year2 + each.year3 + each.year4,
        ]);
    });

    return validDataFormat;
};

async function Dashboard() {
    const students: Student[] = await api.student.getAll.query();

    return (
        <>
            <div className="flex-start flex gap-1 self-stretch pb-3 pt-3 text-xl">
                Here’s what happening with{" "}
                <span className="text-d-code font-bold">D* CODE</span>
            </div>
            <div className="flex-start flex gap-[20px] self-stretch">
                <NumberAnalytic />
            </div>
            <div>
                <StudentHeader />
                <StudentTable students={students} />
            </div>
            <div className="pt-3">
                <PopularGraph data={await fixFormat()} />
            </div>
        </>
    );
}

// Export the Dashboard component
export default Dashboard;
