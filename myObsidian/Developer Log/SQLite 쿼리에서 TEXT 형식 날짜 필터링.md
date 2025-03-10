## `strftime()` 및 조건 연산자 활용
## 이 내용을 통해 알 수 있는 것

- SQLite의 `strftime()` 함수를 사용하여 TEXT 형식으로 저장된 날짜/시간 열에서 특정 부분을 추출하는 방법 (`%Y`를 사용하여 연도 추출)
- SQLite 조건 연산자(`>=`)를 사용하여 날짜/시간 데이터를 필터링하는 방법
- Python에서 SQLite 쿼리를 동적으로 생성하고 매개변수를 사용하는 방법
- SQLite에서 날짜 데이터를 TEXT 형식('YYYY-MM-DD')으로 저장하고 처리하는 방식

## 코드 스니펫

Python

```
query = """SELECT * FROM stock_divd WHERE corp_code=?"""
params = [corp_code]

if start_year:
    query += " AND strftime('%Y', stlm_dt) >= ?"
    params.append(start_year)
```

## 적용 예시

다음은 데이터베이스에서 특정 기업의 배당 정보를 연도별로 필터링하는 예시입니다. 여기서는 `stlm_dt` 열이 'YYYY-MM-DD' 형식의 TEXT로 저장되어 있다고 가정합니다.

Python

```
import sqlite3

def get_dividends(corp_code, start_year=None):
    conn = sqlite3.connect('stock.db')  # 데이터베이스 연결
    cursor = conn.cursor()

    query = """SELECT * FROM stock_divd WHERE corp_code=?"""
    params = [corp_code]

    if start_year:
        query += " AND strftime('%Y', stlm_dt) >= ?"
        params.append(start_year)

    cursor.execute(query, params)
    results = cursor.fetchall()

    conn.close()
    return results

# 예시: '005930' (삼성전자)의 2020년 이후 배당 정보 조회
dividends = get_dividends('005930', '2020')
for row in dividends:
    print(row)
```

## 어떤 때 유용한가

- **기간별 데이터 분석:** 'YYYY-MM-DD' 형식의 TEXT로 저장된 날짜 데이터를 특정 기간 동안의 데이터만 추출하여 분석해야 할 때 유용합니다. (예: 특정 연도 이후의 매출 데이터 분석)
- **보고서 생성:** 특정 기간에 해당하는 데이터만 포함하는 보고서를 생성해야 할 때 유용합니다.
- **데이터 필터링:** 'YYYY-MM-DD' 형식의 TEXT로 저장된 날짜 열을 기준으로 데이터를 필터링하여 필요한 데이터만 조회해야 할 때 유용합니다.
- **SQLite에서 날짜 데이터를 TEXT로 저장하는 경우:** SQLite는 동적 형식 시스템을 사용하므로 날짜 데이터를 다양한 형식으로 저장할 수 있습니다. 특히 'YYYY-MM-DD' 형식의 TEXT 저장은 날짜 데이터를 문자열 비교를 통해 쉽게 필터링하고 정렬할 수 있도록 합니다.