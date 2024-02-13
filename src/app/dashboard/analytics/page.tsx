import PopularGraph from "~/app/_components/popular-graph";
import { api } from "~/trpc/server";
import type { HeatMap } from "~/app/lib/definitions";
import TopTenTable from "~/app/_components/top-ten-table";

import { getServerAuthSession } from "~/server/auth";

type GraphData = [
    Date | string,
    number | string,
    number | string,
    number | string,
    number | string,
];

function generateGraph(): GraphData[] {
    function getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    // const dataForGraph: GraphData = [
    //     ["Time", "Year 1", "Year 2", "Year 3", "Year 4"],
    // ];

    const dataForGraph: GraphData[] = [];

    function randomDate(start: Date, end: Date) {
        return new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime()),
        );
    }

    const startDate: Date = randomDate(new Date(2023, 0, 1), new Date());
    startDate.setHours(9, 0, 0, 0);

    const endDate: Date = randomDate(new Date(2023, 0, 1), new Date());
    endDate.setHours(20, 30, 0, 0);
    const currentTime: Date = new Date(startDate);

    while (currentTime <= endDate) {
        const formatTime = new Date(currentTime);
        if (formatTime) {
            dataForGraph.push([
                formatTime,
                getRandomInt(200),
                getRandomInt(200),
                getRandomInt(200),
                getRandomInt(200),
            ]);
        }
        currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    return dataForGraph;
}

// const seedDate = api.analytics.seedData.mutate(generateGraph())

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

export default async function Home() {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    return (
        <>
            <PopularGraph data={await fixFormat()} />
            <TopTenTable />
        </>
    );
}
