#include<bits/stdc++.h>
using namespace std;
int main()
{
    int n,m;
    cin>>n>>m;
    vector<vector<int>> A(n,vector<int>(m));
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<m;j++)
        {
            cin>>A[i][j];
        }
    }

    for(int i=0;i<n-1;i++)
    {
        for(int j=0;j<m-1;j++)
        {
            if(A[i][j]!=A[i+1][j+1])
            {
                cout<<0<<endl;
                return 0;
            }
        }
    }
    cout<<1<<endl;
    return 0;
}