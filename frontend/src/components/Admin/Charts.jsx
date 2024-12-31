import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../constants/config';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/submissions`, {
          withCredentials: true,
        });

        const submissions = Array.isArray(response.data)
          ? response.data
          : response.data.submissions;


        if (!Array.isArray(submissions)) {
          throw new Error('Submissions is not an array');
        }

        const statusCount = {
          Accepted: 0,
          'Not Accepted': 0,
          Pending: 0,
          'Syntax Error': 0,
        };

        submissions.forEach((submission) => {
          if (submission.status in statusCount) {
            statusCount[submission.status]++;
          }
        });

        setChartData({
          labels: Object.keys(statusCount),
          datasets: [
            {
              label: 'Submission Status',
              data: Object.values(statusCount),
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)', 
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 206, 86, 0.6)', 
                'rgba(153, 102, 255, 0.6)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)', 
                'rgba(255, 99, 132, 1)', 
                'rgba(255, 206, 86, 1)', 
                'rgba(153, 102, 255, 1)', 
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching submissions:', error.message);
      }
    };

    fetchSubmission();
  }, []);

  return (
    <div style={{ width: '38%', margin: 'auto' }}>
      {chartData ? <Pie data={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default Charts;
