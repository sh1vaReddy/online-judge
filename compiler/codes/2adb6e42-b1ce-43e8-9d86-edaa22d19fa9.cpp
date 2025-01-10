#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    char C;
    cin >> C;

    if (C >= 'A' && C <= 'Z') {
        cout << "upper" << '\n';
    } else if (C >= 'a' && C <= 'z') {
        cout << "lower" << '\n';
    } else {
        cout << "error" << '\n';
    }

    return 0;
}
