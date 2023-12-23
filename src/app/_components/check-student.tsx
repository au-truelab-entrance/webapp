import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";


export default async function CheckStudentID() {

    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const isValid = await api.student.check.query();

    return (
        <>
        {isValid? "valid student": "not valid student"}
        </>
    )
}