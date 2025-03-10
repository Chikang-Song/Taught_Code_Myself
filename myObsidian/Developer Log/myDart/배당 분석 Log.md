---
Date: 2025-03-03
---
```table-of-contents
title: 
style: nestedList # TOC style (nestedList|nestedOrderedList|inlineFirstLevel)
minLevel: 0 # Include headings from the specified level
maxLevel: 0 # Include headings up to the specified level
includeLinks: true # Make headings clickable
hideWhenEmpty: false # Hide TOC if no headings are found
debugInConsole: false # Print debug info in Obsidian console
```
# 배당 데이터 가져오기
사용환경: Jupyter Notebook
코드 스니펫
```python
import myDart
divd_df_raw = myDart.extract_divd(corp_code)  # 데이터베이스의 자료 추출
divd_df = myDart.preprocess_divd(divd_df_raw) # 전처리

divd_df.info()
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 266 entries, 0 to 265
Data columns (total 10 columns):
 #   Column        Non-Null Count  Dtype         
---  ------        --------------  -----         
 0   접수번호_배당       266 non-null    object        
 1   법인구분          266 non-null    object        
 2   고유번호          266 non-null    object        
 3   회사명           266 non-null    object        
 4   구분            266 non-null    object        
 5   value         266 non-null    float64       
 6   date          266 non-null    datetime64[ns]
 7   주식_종류         266 non-null    object        
 8   연결_별도         57 non-null     object        
 9   publish_date  266 non-null    datetime64[ns]
dtypes: datetime64[ns](2), float64(1), object(7)
memory usage: 20.9+ KB
```


# 당기순이익

⚠ 배당 자료의 당기순이익과 재무제표의 당기순이익은 맞지 않는다!
이유는 배당 자료의 경우 지배주주_당기순이익이기 때문이다.

투자자입장에서 배당 및 자사주 매입 여력을 분석하는 **핵심 목표**는 **_'내가 투자한 회사가 나에게 얼마나 많이 가치를 환원해 줄 수 있는가?_** 를 판단하는 일이다.

따라서 배당 및 자사주 매입 여력 분석에는 **'연결 지배주주지분 당기순이익'** 이다.

따라서, 연결 기준으로 필터링을 한다.

---
# Issue
당기순이익 내용 중 일부 연결 및 개별이 누락되어 있음.
```SQL
select * from stock_divd where corp_code = '00126380' and se == '당기순이익' and fs_div == '연결';
```
데이터베이스에서 삼성전자 corp_code 00126380 에 대해서 확인 함.
먼저 데이터베이스에서 관련 데이터가 있는지 확인 후
```SQLite
select * from stock_divd where corp_code = '00126380';
```
해당 행을 삭제
```SQLite
DELETE from stock_divd where corp_code = '00126380';
```
삭제 후 해당 corp_code 에 해서 ETL 수행
실행 디렉터리 : `(.venv) D:\myPackages`
```python
from myDart.Profiles import dart_div as dd
corp_code = '00126380'
divd = dd.get_dividend(corp_code, start_year=2016)
divd_df = dd.clean_divd_df(divd)  # 최종 df
db_path = r"D:\주식분석\12. DB\KoreaStockDB_Profiles.db"
dd.save_stock_divd(db_path, divd_df)  # save DB
```
문제의 원인은 fs_div가 기존 데이터베이스 생성 시 PRIMARY KEY로 등록이 안되어있고
`save_stock_divd()`에서 query문에 ON CONFLICT에 포함되어 있지 않았기 때문일 가능성이 큼.
따라서 기존 DB Table을 Drop하고 새롭게 정의
```python
db_path = r"D:\주식분석\12. DB\KoreaStockDB_Profiles.db"
dd.initialize_divd_database(db_path)
```
이렇게 설정 후 저장시 정상 확인 됨.