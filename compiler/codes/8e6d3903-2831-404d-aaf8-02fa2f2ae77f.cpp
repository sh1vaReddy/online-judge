#include<bits/stdc++.h>
using  namespace std;
int dfs(int node,vector<vector<int>>&garphn,vector<bool>&visited,vector<int>&subtree)
{
    visited[node]=true;
    for(int nei:garphn[node])
    {
        if(!visited[nei])
        {
            subtree[node]+=dfs(nei,garphn,visited,subtree);
        }

    }
    return subtree[node]+1;
}
int main()
{
    int n;
    cin>>n;
    vector<vector<int>>garphn(n+1);
    for(int i=2;i<=n;i++)
    {
       int boos;
       cin>>boos;
       garphn[boos].push_back(i);
    }
    vector<int>subtree(n+1,0);
    vector<bool>visited(n+1,false);
    int start=1;
    dfs(start,garphn,visited,subtree);
    for(int i=1;i<=n;i++)
    {
        cout<<subtree[i]<<" ";
    }
    r
}