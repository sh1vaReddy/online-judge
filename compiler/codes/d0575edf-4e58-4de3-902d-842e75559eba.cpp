#include <iostream>
#include <vector>
#include <queue>

using namespace std;

bool isBipartite(vector<vector<int>>& graph) {
    int n = graph.size();
    vector<int> color(n, -1); // -1 indicates uncolored, 0 and 1 are the two colors

    for (int i = 0; i < n; ++i) {
        if (color[i] == -1) { // Start BFS only for unvisited nodes
            queue<int> q;
            q.push(i);
            color[i] = 0; // Assign a color to the starting node

            while (!q.empty()) {
                int node = q.front();
                q.pop();

                for (int neighbor : graph[node]) {
                    if (color[neighbor] == -1) {
                        // Assign the opposite color to the neighbor
                        color[neighbor] = 1 - color[node];
                        q.push(neighbor);
                    } else if (color[neighbor] == color[node]) {
                        // If the neighbor has the same color, the graph is not bipartite
                        return false;
                    }
                }
            }
        }
    }
    return true; // All components are bipartite
}

int main() {
    // Example test case
    vector<vector<int>> graph1 = {
        {1, 3}, 
        {0, 2}, 
        {1, 3}, 
        {0, 2}
    };
    cout << "Graph 1 is " << (isBipartite(graph1) ? "Bipartite" : "Not Bipartite") << endl;

    vector<vector<int>> graph2 = {
        {1, 2, 3}, 
        {0, 2}, 
        {0, 1, 3}, 
        {0, 2}
    };
    cout << "Graph 2 is " << (isBipartite(graph2) ? "Bipartite" : "Not Bipartite") << endl;

    return 0;
}
