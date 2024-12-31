import axios from 'axios';

export const verdict = async (ProblemId, executeCode) => {
  if (!ProblemId) {
    return {
      success: false,
      message: "Problem ID not provided",
    };
  }

  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/testcases/problem/${ProblemId}`
    );

  
    
    const testcases = response.data.testcases || [];

    if (testcases.length === 0) {
      return {
        success: false,
        message: "No test cases found for the provided Problem ID",
      };
    }

    for (let i = 0; i < testcases.length; i++) {
      const { input, expected_output } = testcases[i];
      if (!input || !expected_output) {
        console.warn(`Test case at index ${i} has invalid input or expected output`);
        continue; // Skip invalid test case
      }

      const actualOutput = await executeCode(input);

      if (
        actualOutput.trim().replace(/\s+/g, " ") !==
        expected_output.trim().replace(/\s+/g, " ")
      ) {
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
