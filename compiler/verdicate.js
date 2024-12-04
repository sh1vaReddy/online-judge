import axios from 'axios';

export const verdict = async (ProblemId, executeCode) => {
  if (!ProblemId) {
    return {
      success: false,
      message: "Problem ID not provided",
    };
  }

  try {
    const response = await axios.get(`http://localhost:3000/api/v1/testcases/problem/${ProblemId}`);
    const testcases = response.data;

    for (let i = 0; i < testcases.length; i++) {
      const { input, expected_output } = testcases[i];

      
      const actualOutput = await executeCode(input);

      
      if (actualOutput.trim() !== expected_output.trim()) {
        return {
          success: false,
          message: `Test case failed at index ${i + 1}`,
        };
      }
    }

    return {
      success: true,
      message: "All test cases passed!",
    };
  } catch (error) {
    console.error("Error while fetching test cases or executing code:", error);
    return {
      success: false,
      message: "An error occurred during the execution process",
    };
  }
};
