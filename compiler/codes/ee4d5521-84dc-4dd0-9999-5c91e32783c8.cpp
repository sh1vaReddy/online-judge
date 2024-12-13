#include<bits/stdc++.h>
using namespace std;
int main()
{
    int  N;
    cin>>N;
    vector<int>V(N+1);
    for(int i=1;i<=N;i++)
    {
        cin>>V[i];
    }

    vector<long long>Pref(N+1,0);
    for(int i=1;i<=N;i++)
    {
        Pref[i]=Pref[i-1]+V[i];

    }

      int Q;
      cin>>Q;
      for(int i=0;i<Q;i++)
      {
        int l,r;
        cin>>l>>r;
        cout<<Pref[r]-Pref[l-1]<<endl;
      }
    return 0;
}