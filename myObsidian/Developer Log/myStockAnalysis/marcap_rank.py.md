---
Date: 2025-03-01
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
---

# 작업 내용
`NAVER` 주식의 시가총액 페이지에서 모든 투자지표 속성값을 추출하여 데이터베이스에 저장하는 코드이다.
기존의 코드를 내 패키지 `myPackages`로 마이그레이션을 실시하고,
데이터베이스 Load를 기존 mariaDB가 아닌 SQLite DB로 변경하는 것이 이번작업의 내용이다.


# 개발 과정
1. **기존 DB 이관**
	1. MariaDB 접속해 추출할 Table을 선택하고, `데이터베이스를 SQL로 내보내기`를 수행한다.
	2.  새로운 SQLite DB를 생성한다
	3. 기존 mariaDB의 데이터를 추출하여 SQLite DB로 이관한다
		1. 텍스트 편집기를 이용해 해당 SQL파일을 Open한후 CREATE TABLE 구문을 찾는다.
		2. SQLite 문법에 맞게 적절히 수정한다.
			1. 텍스트 편집기에서 찾은 CREATE TABLE 구문 전체를 복사해 `Gemini`의 도움을 받아 변환과정을 거쳤다.
			2. INSERT 구문의 경우 데이터가 너무 커서 직접 SQL파일을 수정(` 를 "로 바꾼다)하여 SQLite DB Browser에서 sql 파일을 `import` 하였다. 
* `myPackages > myStockAnalysis > ETL` 안에 `marcap_rank.py`로 생성한다
* 생성된 패키지로 코드를 이관한다.
* 이관 된 코드 중 Web 에서 자료를 Extract 및 Transfer 가 잘되는지 검증한다

* 자료가 DB로 잘 Load 되는지 확인한다.

## 문제 설명

⚠ DataFrame 을 SQLite database로 업데이트 시 에러 발생
```
>>> ms.naver_main()
Parsing tickers: 100%|█████████████████████████████████████████████████████████| 47/47 [00:05<00:00,  8.96it/s] 
Parsing pages: 100%|███████████████████████████████████████████████████████████| 36/36 [00:27<00:00,  1.29it/s] 
Parsing tickers: 100%|█████████████████████████████████████████████████████████| 36/36 [00:04<00:00,  8.63it/s] 
D:\myPackages\myStockAnalysis\ETL\marcap_rank.py:138: UserWarning: pandas only supports SQLAlchemy connectable (engine/connection) or database string URI or sqlite3 DBAPI2 connection. Other DBAPI2 objects are not tested. Please consider using SQLAlchemy.
  kospi_df.to_sql('daily_kospi_rank', con=con, if_exists='append', index=False)
기타 오류 발생: 'Connection' object has no attribute 'cursor'
```
이 에러의 원인을 찾을 수 없어 SQLAlchemy 없이 python 내장 모듈인 `sqlite3`를 이용함.
```python
import sqlite3 

db_path = 데이터베이스경로
conn = sqlite3.connect(db_path)

# 데이터프레임을 데이터베이스에 추가
df.to_sql('db_table_name', con=conn, if_exists='append', index=False)
```

# 느낀 점
* 아직 _SQLAlchemy_ 는 나에겐 생소하다.
* ETL 스크립트를 주기적으로 실행하여 업데이트하는 기능 구현을 고려해야한다.

# 참고자료
#myPackages #myStockAnalysis #ETL
`marcap_rank.py`

