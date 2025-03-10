---
Date: 2025-03-02
---
#myDart #main

`myDart` 패키지의 `main()` 함수를 사용하여 재무데이터를 추출 시 계정을 추가하고 싶다면,

1. **`calculate_key_indicators()`** 함수 내에 `find_account_value()`에 계정명을 인자값으로 부여하고 이를 변수에 할당한다.
2. 만약 이 계정값으로 필요한 계산이 있다면 추가한다.
3. `fs_data` 딕셔너리에 해당 변수를 할당한다.