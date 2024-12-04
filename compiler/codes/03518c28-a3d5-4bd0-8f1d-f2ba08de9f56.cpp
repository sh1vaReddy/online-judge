#include<bits/stdc++.h>
using namespace std;
int dfs(int node, vector<vector<int>>& graph, vector<bool>& visited, vector<int>& subtree)
{
    visited[node] = true;
    for (int nei : graph[node])
    {
        if (!visited[nei])
        {
            subtree[node] += dfs(nei, graph, visited, subtree);
        }
    }
    return subtree[node] + 1;
}
int main()
{
    int n;
    cin >> n;
    vector<vector<int>> graph(n + 1);
    for (int i = 2; i <= n; i++)
    {
       int boss;
       cin >> boss;
       graph[boss].push_back(i);
    }
    vector<int> subtree(n + 1, 0);
    vector<bool> visited(n + 1, false);
    int start = 1;
    dfs(start, graph, visited, subtree);
    for (int i = 1; i <= n; i++)
    {
        cout << subtree[i] << " ";
    }
    return 0;
}