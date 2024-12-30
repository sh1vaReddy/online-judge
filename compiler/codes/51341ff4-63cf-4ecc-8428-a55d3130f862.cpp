#include <bits/stdc++.h>
using namespace std;

int minjumps(int source,int target,vector<vector<int>>&graph)
{
  int n=graph.size();
  vector<bool>visited(n+1,false);
  queue<pair<int,int>>q;
   q.push({source,0});
   visited[source]=true;
   while(!q.empty())
   {
    auto [current, jumps] = q.front();
      q.pop(); 
      
      if(current==target)
      {
        return jumps;
      }
      
      for(int neighbor : graph[current])
      {
        if(!visited[neighbor])
        {
          visited[neighbor]=true;
          q.push({neighbor,jumps+1});
        }
      }
   }
   return 0;
}

int main() {
  int n,m;
  cin>>n>>m;
  vector<vector<int>>graph(n+1);
  for(int i=0;i<m;i++)
  {
    int u,v;
    cin>>u>>v;
    graph[u].push_back(v);
    graph[v].push_back(u);
  }
  
  int source,target;
  cin>>source>>target;
  int ans=minjumps(source,target,graph);
  cout<<ans<<endl;
  return 0;

}