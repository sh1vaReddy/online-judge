import  { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../constants/config"

const Monitringcontest = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchContests = async () => {
        try {
          const response = await axios.get(`${server}/api/v1/getallcontest`,{
            withCredentials:true
          });
          console.log(response.data);
          if (response.data.success) {
            setContests(response.data.contests);
          } else if(response.data.message){
            setError(response.data.message);
          }
        } catch (err) {
          setError("No Active Contest Are There");
        } finally {
          setLoading(false);
        }
      };
  
      fetchContests();
    }, []);
  
    if (loading) {
      return <div>Loading active contests...</div>;
    }
  
    if (error) {
      return <div className="error-message">{error}</div>;
    }
  
    return (
      <div className="active-contests">
        <h1>Active Contests</h1>
        {contests.length > 0 ? (
          <ul className="contest-list">
            {contests.map((contest) => (
              <li key={contest._id} className="contest-item">
                <h2>{contest.name}</h2>
                <p>{contest.description}</p>
                <p>Status: {contest.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No active contests available.</p>
        )}
      </div>
    );
}

export default Monitringcontest