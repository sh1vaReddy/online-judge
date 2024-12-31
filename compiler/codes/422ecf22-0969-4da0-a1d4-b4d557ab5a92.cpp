#include <bits/stdc++.h>
using namespace std;
void sorted(vector<int>&v)
{
    int n=v.size();
    

    for(int i=0;i<n;i++)
    {
        v[i]=v[i]*v[i];
    }

    sort(v.begin(),v.end());

    for(auto it:v)
    {
        cout<<it<<" ";
    }
}

int main() {
int N;
cin>>N;
std::vector<int> v(N);
for(int i=0;i<N;i++)
{
  cin>>v[i];
}
sorted(v);
return 0;

}