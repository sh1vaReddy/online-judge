import axios from "axios";
import { server } from "../../constants/config";
import { useEffect, useState } from "react";

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [recentContestId, setRecentContestId] = useState("");
    

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`${server}/api/v1/GetallLeaderBoard`,{withCredentials:true});
                const data = response.data.data;
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const latestContest = sortedData[0];

                setRecentContestId(latestContest?.contestId || "");
                setLeaderboardData(data.filter(entry => entry.contestId === latestContest?.contestId));
            } catch (error) {
                console.log(error);
            }
        };
        fetchLeaderboard();
    }, []);
  



    return (
        <div>
            <h1>Leaderboard</h1>
            <table className=" h-full min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-800 text-left">
                        <th className="px-4 py-2 dark:text-gray-100">Rank</th>
                        <th className="px-4 py-2 dark:text-gray-100">User Name</th>
                        <th className="px-4 py-2 dark:text-gray-100">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((entry, index) => (
                        <tr key={entry._id} className="">
                            <td className="px-4 py-2 dark:text-gray-100">{entry.rankings[index]?.rank}</td>
                            <td className="px-4 py-2 dark:text-gray-100">{entry.rankings[index]?.Username}</td>
                            <td className="px-4 py-2 dark:text-gray-100">{entry.rankings[index]?.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
