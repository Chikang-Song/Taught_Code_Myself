---
tags:
  - 상법개정
---
```
As you are a financial expert, investment analyst and hedge fund manager, please advise.

  

순현금 상태(순현금 = 현금 및 현금성 자산 - 총차입금 (총부채 중 금융부채 부분))를 계산하는 데 필요한 계정을 찾고 있어. 다음 계정명 중 '총차입금 (총부채 중 금융부채 부분)'에 해당하는 계정명은 어떤 것이 있지?
```

[[🧑‍💼상법개정 - 투자체크리스트]]

## 순현금 계산을 위한 '총차입금' 계정 식별 (Chain of Thought 프롬프트)
🎯`myDart > fss_report.py` 의 `calculate_total_borrowings()` 내 계정 pool을 AI로 적용하여 식별 제공하는 것을 적용할때 API에 넣어줄 Prompt 예시. 단, 미세조정 필요... 주어질 계정 코드는 dataframe의 계정명 목록이 될 것임.

```
## 순현금 계산을 위한 '총차입금' 계정 식별 (Chain of Thought 프롬프트) **# 목표:** 주어진 계정 목록에서 순현금 상태 계산 시 '총차입금 (총부채 중 금융부채 부분)'에 해당하는 계정명을 식별하십시오. 순현금은 '현금 및 현금성 자산 - 총차입금'으로 정의됩니다. 여기서 '총차입금'은 '총부채 중 금융부채 부분'을 의미합니다. **# 단계별 사고 과정:** 다음 단계에 따라 각 계정이 '총차입금'에 해당하는지 여부를 판단하십시오. 1. **부채 여부 확인:** 먼저, 주어진 계정명이 재무상태표의 '부채' 계정에 해당하는지 확인하십시오. 자산, 자본, 수익, 비용 계정은 제외합니다. 2. **금융 부채 여부 판단:** '부채' 계정으로 판단된 경우, 해당 부채가 '금융 부채'에 해당하는지 판단하십시오. '금융 부채'는 기업의 자금 조달 활동과 직접적으로 관련된 부채를 의미합니다. 영업활동, 계약, 세금, 충당부채 등과 관련된 부채는 '금융 부채'에서 제외합니다. 다음 기준을 고려하여 판단하십시오: * **차입금:** 은행, 금융기관 등으로부터 차입한 자금 (단기차입금, 장기차입금 등) * **사채:** 회사가 발행하여 자금을 조달하는 채무 증권 (사채, 전환사채 등) * **리스 부채 (금융리스):** 금융리스 형태로 자산을 사용함에 따라 발생하는 부채 * **기타 금융 부채:** 위의 범주에 준하는 금융 성격의 부채 (예: 어음 할인, 팩토링 관련 부채, 특정 파생상품 부채 등) 3. **유동/비유동 구분 (참고):** '금융 부채'로 판단된 경우, 유동 부채 (1년 이내 만기) 또는 비유동 부채 (1년 초과 만기)로 구분하여 기록하십시오. (순현금 계산 시 유동/비유동 구분은 필수는 아니지만, 재무 분석의 정확성을 높이기 위해 고려) 4. **제외 계정 명확화:** 다음 유형의 부채는 '총차입금'에서 제외합니다. * **매입채무, 미지급금:** 영업활동 관련 채무 * **선수금, 계약부채:** 고객과의 계약 관련 채무 * **당기법인세부채, 이연법인세부채:** 세금 관련 부채 * **확정급여부채, 퇴직급여채무, 충당부채:** 종업원 급여, 미래 예상 지출 관련 부채 * **파생상품부채 (운영 목적):** 위험 회피 목적이 아닌 운영 목적으로 사용되는 파생상품 관련 부채 (파생상품의 성격에 따라 금융 부채 포함 여부 판단 필요) * **기타 일반적인 영업 부채:** 상기 유형에 준하는 영업 관련 부채 **# 출력 형식:** 각 계정명에 대해 다음 정보를 포함하여 결과를 제시하십시오. * **계정명:** [계정 이름] * **총차입금 포함 여부:** (O / X) * **판단 근거:** (단계별 사고 과정에 따른 판단 근거 상세 설명. 단순히 '금융 부채'라고만 적지 말고, 왜 금융 부채에 해당하거나 해당하지 않는다고 판단했는지 구체적으로 설명하십시오.) * **유동/비유동 구분:** (유동 / 비유동 / 해당 없음) - 금융 부채에 해당하는 경우만 기재 **# 제공된 계정 목록:** ['계약부채', '기타유동부채', '단기금융부채', '당기법인세부채', '부채및자본총계', '부채와자본총계', '비유동리스부채', '비유동부채', '비유동이연법인세부채', '비유동충당부채', '소유주분배예정부채집단', '유동리스부채', '유동부채', '유동충당부채', '이연법인세부채', '장기계약부채', '장기금융부채', '총부채', '충당부채', '파생상품부채', '확정계약부채', '확정급여부채', '기타비유동금융부채의 감소', '기타유동금융부채의 감소', '단기금융부채의 감소', '단기금융부채의 상환', '단기금융부채의 증가', '리스부채의 감소', '리스부채의 상환', '유동리스부채의 감소', '장기금융부채의 감소', '장기금융부채의 상환', '장기금융부채의 증가'] **# 추가 지시사항:** * 각 계정에 대해 위에서 제시된 단계별 사고 과정을 명확하게 제시하십시오. 단순히 최종 결론만 제시하지 마십시오. * 만약 특정 계정에 대해 판단이 모호하거나 정보가 부족하여 판단하기 어려운 경우, "판단 유보" 라고 명시하고, 판단 유보 사유를 간략하게 설명하십시오. * 최대한 상세하고 정확하게 답변하십시오. 금융 전문가, 투자 분석가, 헤지 펀드 매니저 수준의 전문적인 지식을 활용하여 답변해주시면 더욱 좋습니다.
```