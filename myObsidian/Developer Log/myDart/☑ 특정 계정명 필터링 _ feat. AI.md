기업마다 계정명이 전차만별이다. 모든 경우에 대해서 사전 리스트를 만들어 대응하기가 너무 번거롭다.

다음과 같은 방법으로 적용하면 그 수고를 덜 수 있다.

1. 관련 키워드 사전 정의
2. 키워드로 관련 계정 찾기고 분류하기  `classify_**()`
3. 분류된 컬럼면을 가져오기 `calculation_**()`


**예시**
다음은 CAPEX를 계산하기 위해 관련된 계정명을 찾는 코드이다.

우선, 사전 정의 리스트를 생성한다.
```
# FCF 계산 관련 함수
## CAPEX (Capital Expenditures) 관련 계정 분류 함수

  
### 유형자산 취득 관련 키워드 (최소 핵심 용어만 포함)
tangible_assets_keywords = ['유형']

### 무형자산 취득 관련 키워드 (최소 핵심 용어만 포함)
intangible_assets_keywords = ['무형']

### 리스부채 상환 관련 키워드 (최소 핵심 용어만 포함)
lease_repayment_keywords = ['리스']

### **공통 계정 관련 키워드 (추가)**
lease_common_account_keywords = ['상환', '지급', '감소']
assets_common_account_keywords = ['취득','매입','구입','투자','증가']

```
유형자산, 무형자산, 리스부채 관련 계정명을 찾기위해 총 4개의 키워드 리스트를 생성한다.
앞 세개의 키워드는 필수키워드로 계정명에 꼭 있어야할 것들을 정의한다.
마지막 키워드는 공통 키워드로 앞 필수키워드와 조합하여 반드시 있어야 할 것을 정의했다.

다음 `classify_capex()` 함수는 인수로 들어오는 컬럼면이 조건에 맞는지를 판별하고 결과를 반환한다.
```
def classify_capex(account):

    reason = ''

    ##1. 리스부채 상환 관련 계정 분류

    if any(term in account for term in lease_repayment_keywords) and any(term in account for term in lease_common_account_keywords):

        reason += f"1단계: 리스부채 상환 관련 키워드 ('{' ,'.join(lease_repayment_keywords)}') 및 공통 계정 키워드 ('{' ,'.join(lease_common_account_keywords)}') 모두 포함;"

        return account, 'O', '리스부채상환 (Lease Repayment)', reason.strip('; ') # 리스부채상환으로 분류되면 바로 반환

  

    ##2. 유형자산 취득 관련 계정 분류
    if any(term in account for term in tangible_assets_keywords) and any(term in account for term in assets_common_account_keywords):

        reason += f"2단계: 유형자산 취득 관련 키워드 ('{' ,'.join(tangible_assets_keywords)}') 및 공통 계정 키워드 ('{' ,'.join(assets_common_account_keywords)}') 모두포함; "

        return account, 'O','유형자산취득 (Tangible CAPEX)', reason.strip('; ') # 유형자산 취득으로 분류되면 바로 반환

    ##3. 무형자산 취득 관련 계정 분류
    if any(term in account for term in intangible_assets_keywords) and any(term in account for term in assets_common_account_keywords):

        reason += f"3단계: 무형자산 취득 관련 키워드 ('{' ,'.join(intangible_assets_keywords)}') 및 공통 계정 키워드 ('{' ,'.join(assets_common_account_keywords)}') 모두 포함; "

        return account, 'O','무형자산취득 (Intangible CAPEX)', reason.strip('; ') # 무형자산 취득으로 분류되면 바로 반환

    return account, 'X', '해당 없음', 'CAPEX 관련 계정 아님' # 분류되지 않은 경우
```

마지막 `calculate_capex()` 함수는 관련 계정을 찾아 총 합(axis=1)을 계산하고 그 결과 데이터프레임을 반환한다.
```
def calculate_capex(df: pd.DataFrame) -> pd.DataFrame:

    """CAPEX (유형자산 및 무형자산 취득) 계산 함수

    CAPEX 관련 계정을 찾아 CAPEX 합계를 계산합니다.

    """

    capex_columns = [] # CAPEX로 분류된 컬럼명을 저장할 리스트

    data = {}

    for column in df.columns:

        classification_result = classify_capex(column) # classify_capex 함수를 이용하여 CAPEX 분류

        account_name, is_capex, reason, term_classification = classification_result  # 결과 unpacking

  

        if is_capex == 'O': # CAPEX로 분류된 경우

            capex_columns.append(column) # CAPEX로 분류된 컬럼명 저장

    if not capex_columns: # CAPEX로 분류된 컬럼이 없는 경우

        print(f"Warning: 재무제표에서 CAPEX 관련 계정을 찾을 수 없습니다. 계정 분류 기준을 확인하거나, 수동으로 계정명을 지정하세요.")

        return pd.DataFrame({'CAPEX': pd.Series([0] * len(df))}) # 빈 데이터프레임 또는 0으로 채워진 결과 반환

    for account in capex_columns: # CAPEX 컬럼 리스트 순회

        account_value = find_account_value(df, account)  # 계정 값 추출

        if account_value is None:

            data[account] = pd.Series([0] * len(df)) # NaN 대신 0으로 채우기

        else:

            data[account] = account_value # 딕셔너리에 저장

    capex_df = pd.DataFrame(data)

    capex_df['CAPEX'] = capex_df.sum(axis=1) # CAPEX 합계 계산

    return capex_df
```

---
위 경우와는 받대로 common keyword를 포함하지 않도록 하는 조건도 유용하다.
아래는 **금융부채** 관련 계정을 가져오는 코드이다.
여기서 common keyword가 포함된 것을 제거하면 중복계상된 것을 없앨 수 있다.

```
# 총차입금 (총부채 중 금융부채 부분)을 계산

## 현금흐름표 계정 관련 키워드 (추가)

cash_flow_keywords = ['상환', '증가', '감소', '차입', '발행', '처분', '취득', '현금흐름', '유출', '유입', '조정', '변동']

  

## 총합계 계정 관련 키워드 (추가)

total_sum_keywords = ['총계', '합계', '총자산', '총부채', '전체', '합산', '계', '자본과부채총계', '부채와자본총계', '부채및자본총계'] # '총계', '합계', '총', '전체', '합산', '계' 와 함께 관련 계정명 추가

  

## 총차입금에 해당하는 금융 부채 키워드 (확장)

financial_debt_keywords = ['차입금', '사채', '리스부채', '유동성금융부채', '파생상품부채', '금융부채']

  

## 영업 활동 관련 부채 키워드 (확장)

operating_debt_keywords = ['매입채무', '미지급금', '선수금', '계약부채', '당기법인세부채', '이연법인세부채',

                           '확정급여부채', '퇴직급여채무', '충당부채', '배출부채', '예수금', '미지급비용',

                           '미지급법인세', '선수수익', '미지급배당금'] # 추가적인 영업 관련 부채 키워드
```

`classify_debt()` 함수
```
def classify_debt(account):

    is_debt = False

    is_financial_debt = False

    term_classification = '유동/비유동 구분 불확실' # 초기값 변경

    reason = ''

    ## ❌❌❌ 총합계 계정 제외 (최상단에 추가된 부분) ❌❌❌

    if any(term in account for term in total_sum_keywords):

        return account, 'X', f"총합계 계정 관련 키워드 ('{' ,'.join(total_sum_keywords)}') 포함", '해당 없음'

    # 1. 부채 여부 확인

    if '부채' in account or '차입금' in account or '사채' in account or '채무' in account: # '채무' 키워드 추가 (ex: 매입채무)

        is_debt = True

        reason += "1단계: 부채 관련 키워드 ('부채', '차입금', '사채', '채무') 포함; "

    else:

        return account, 'X', '1단계: 부채 관련 계정 아님', '해당 없음' # 판단 근거 명확화

  

    ## ❌❌❌ 현금흐름표 계정 제외 (추가된 부분) ❌❌❌

    if any(term in account for term in cash_flow_keywords):

        return account, 'X', f"현금흐름표 계정 관련 키워드 ('{' ,'.join(cash_flow_keywords)}') 포함", '해당 없음'

    # 2. 금융 부채 여부 판단

    if any(term in account for term in financial_debt_keywords):

        is_financial_debt = True

        reason += f"2단계: 금융 부채 관련 키워드 ('{' ,'.join(financial_debt_keywords)}') 중 포함; " # 판단 근거 상세화

    elif any(term in account for term in operating_debt_keywords):

        excluded_keywords = [term for term in operating_debt_keywords if term in account] # 제외 키워드 명시

        return account, 'X', f"2단계: 영업, 세금, 충당부채 등 금융 부채 제외 ('{' ,'.join(excluded_keywords)}') 포함", '해당 없음' # 판단 근거 상세화

    elif is_debt: # '기타부채' 와 같이 금융/영업 분류가 모호한 경우, 보수적으로 금융부채로 분류

        is_financial_debt = True

        reason += "2단계: 금융 부채 여부 불확실 ('기타 부채' 로 보아 금융 부채로 분류); " # 판단 근거 명확화 (불확실성 및 보수적 분류 명시)

  
  

    # 3. 유동/비유동 구분

    if '유동' in account:

        term_classification = '유동'

        reason += "3단계: 유동 부채; "

    elif '비유동' in account or '장기' in account:

        term_classification = '비유동'

        reason += "3단계: 비유동 부채; "

    # else: 유동/비유동 구분 불확실 (초기값 유지)

  

    return account, 'O' if is_financial_debt else 'X', reason.strip('; '), term_classification
```
`calculation_total_borrowings()` 계산함수
```
def calculate_total_borrowings(df: pd.DataFrame) -> pd.DataFrame:

    """총차입금 (총부채 중 금융부채 부분)을 계산합니다."""

    financial_liability_columns = [] # 금융 부채로 분류된 컬럼명을 저장할 리스트

    data = {}

    for column in df.columns:

        classification_result = classify_debt(column) # classify_debt 함수를 이용하여 부채 분류

        account_name, is_financial_debt, reason, term_classification = classification_result  # 결과 unpacking

  

        if is_financial_debt == 'O': # 금융 부채로 분류된 경우

            financial_liability_columns.append(column) # 금융 부채로 분류된 컬럼명 저장

    if not financial_liability_columns: # 금융 부채로 분류된 컬럼이 없는 경우

        print(f"Warning: 재무제표에서 총차입금 (금융계정)관련 계정을 찾을 수 없습니다. 계정 분류 기준을 확인하거나, 수동으로 계정명을 지정하세요.")

        return pd.DataFrame({'total_current_liability': pd.Series([0] * len(df))}) # 빈 데이터프레임 또는 0으로 채워진 결과 반환

    for account in financial_liability_columns: # 금융 부채 컬럼 리스트 순회

        account_value = find_account_value(df, account)  # 계정 값 추출

        if account_value is None:

            data[account] = pd.Series([0] * len(df)) # NaN 대신 0으로 채우기

        else:

            data[account] = account_value # 딕셔너리에 저장

    current_liabilities_df = pd.DataFrame(data)

    current_liabilities_df['total_financial_liability'] = current_liabilities_df.sum(axis=1) # 금융 부채 합계 계산

    return current_liabilities_df
```


