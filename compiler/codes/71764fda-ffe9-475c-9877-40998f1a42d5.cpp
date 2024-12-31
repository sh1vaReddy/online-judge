#include<bits/stdc++.h>
using namespace std;
int main()
{
  int Q;
  cin>>Q;
  while(Q--)
  {
    int target,scan=0;
    cin>>target;
    while(target>1)
    {
      target=(target+1)/2;
      scan++;
    }
    cout<<scan<<endl;
  }
}