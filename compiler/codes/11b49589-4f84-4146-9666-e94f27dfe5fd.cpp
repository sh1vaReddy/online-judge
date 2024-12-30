#include <iostream>
#include <unordered_map>
#include <algorithm>

int lengthOfLongestSubstring(std::string s) {
    int n = s.length();
    std::unordered_map<char, int> charMap;
    int left = 0, right = 0, maxLength = 0;

    while (right < n) {
        if (charMap.find(s[right]) != charMap.end()) {
            // If character already in map, move the left pointer
            left = std::max(charMap[s[right]] + 1, left);
        }
        charMap[s[right]] = right;  // Update the index of the current character
        maxLength = std::max(maxLength, right - left + 1);  // Update the max length
        right++;  // Expand the window
    }

    return maxLength;
}

int main() {
    std::string input ;
cin>> input // Example input
    int result = lengthOfLongestSubstring(input);
    std::cout << "Length of the longest substring without repeating characters: " << result << std::endl;
    return 0;
}
