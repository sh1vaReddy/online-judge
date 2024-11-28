const ProblemList = () => {
  // Generate 1000 mock problems with status
  const problems = Array.from({ length: 1000 }, (_, index) => ({
    number: index + 1,          // Problem number
    title: `Problem ${index + 1}`, // Problem title
    difficulty: index % 3 === 0 ? 'Easy' : index % 3 === 1 ? 'Medium' : 'Hard', // Difficulty
    status: index % 3 === 0 ? 'Solved' : index % 3 === 1 ? 'Unsolved' : 'In Progress', // Status
  }));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Problem List</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800 text-left">
            <th className="px-4 py-2">Problem Number</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Difficulty</th>
            <th className="px-4 py-2">Status</th> {/* New Status column */}
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.number} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{problem.number}</td>
              <td className="px-4 py-2">{problem.title}</td>
              <td className={`px-4 py-2 ${problem.difficulty === 'Easy' ? 'text-green-500' : problem.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                {problem.difficulty}
              </td>
              <td className={`px-4 py-2 ${problem.status === 'Solved' ? 'text-green-500' : problem.status === 'Unsolved' ? 'text-red-500' : 'text-yellow-500'}`}>
                {problem.status}
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemList;
