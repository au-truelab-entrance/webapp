import PopularGraph from "~/app/_components/popular-graph";
import { api } from "~/trpc/server";

type GraphData = [
    Date | string,
    number | string,
    number | string,
    number | string,
    number | string,
][];

function generateGraph(): GraphData {
    function getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    // const dataForGraph: GraphData = [
    //     ["Time", "Year 1", "Year 2", "Year 3", "Year 4"],
    // ];
    const dataForGraph: GraphData = [];
    const startDate: Date = new Date();
    startDate.setHours(9, 0, 0, 0);

    const endDate: Date = new Date();
    endDate.setHours(20, 30, 0, 0);
    const currentTime: Date = new Date(startDate);

    while (currentTime <= endDate) {
        const formatTime = new Date(currentTime)
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


export default function Home() {
    // console.log({...generateGraph()})

    return (
        <>
            <PopularGraph />
        </>
    )
}
