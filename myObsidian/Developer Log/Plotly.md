## Plotly 완전 정복: 실전 데이터 시각화 가이드

```table-of-contents
title: 
style: nestedList # TOC style (nestedList|nestedOrderedList|inlineFirstLevel)
minLevel: 0 # Include headings from the specified level
maxLevel: 0 # Include headings up to the specified level
includeLinks: true # Make headings clickable
hideWhenEmpty: false # Hide TOC if no headings are found
debugInConsole: false # Print debug info in Obsidian console
```

Plotly는 Python에서 대화형 시각화를 위한 강력한 도구입니다. 이 블로그에서는 **캔들 차트**, **서브플롯**, **다중 Y축**, **범위 슬라이더** 등 자주 사용되는 기능들을 중심으로 Plotly 활용법을 상세히 다룹니다.

### 1. 캔들 차트

금융 데이터 시각화에 유용한 캔들 차트를 Plotly로 쉽게 그릴 수 있습니다.

```python
import plotly.graph_objects as go

fig = go.Figure(data=[go.Candlestick(x=df['date'], open=df['open'], high=df['high'], low=df['low'], close=df['close'])])
fig.show()
```

### 2. 서브플롯

여러 그래프를 하나의 figure에 나눠 그릴 수 있습니다.
`shared_xaxes`는 x축을 서브플롯이 공유하도록 합니다.
`vertical_spacing`은 각 서브플롯 간 간격을 조절합니다.

```python
from plotly.subplots import make_subplots

fig = make_subplots(rows=2, cols=1, shared_xaxes=True, verical_spacing=0.05)

fig.add_trace(go.Candlestick(...), row=1, col=1)
fig.add_trace(go.Bar(...), row=2, col=1)

fig.show()
```

### 3. 다중 Y축

하나의 subplot에 여러 개의 Y축을 추가하여 다양한 스케일의 데이터를 함께 표시할 수 있습니다.

```python
fig.add_trace(go.Bar(..., yaxis='y2'), row=1, col=1)

fig.update_layout(yaxis2=dict(overlaying='y', side='right'))
```

### 4. 축 제목 및 레이아웃

각 subplot의 축 제목을 설정하고 전체적인 레이아웃을 조정할 수 있습니다.
* `template`은 차트의 형식을 바꿉니다.
* `margin`은 차트의 마진입니다. matplotlib에서 `tight_layout`같은 역할을 합니다.
```python
fig.update_layout(title="My Graph", height=600, template='plotly_dark', margin=dict(l=0,r=0,t=50,b=0))

fig.update_xaxes(title_text="Date", row=2, col=1)
fig.update_yaxes(title_text="Price", row=1, col=1)
fig.update_yaxes(title_text="Volume", row=2, col=1)
```

### 5. 범위 슬라이더

날짜 범위 선택을 위한 슬라이더를 추가하여 사용자가 원하는 구간만 확대해서 볼 수 있습니다. `False`로 하면 반대로 범위 슬라이드를 OFF 합니다.

```python
fig.update_layout(xaxis_rangeslider_visible=True)
```

### 6. 팁

- `shared_xaxes=True` 옵션을 사용하면 여러 subplot의 X축을 공유할 수 있습니다.
- `secondary_y=True` 옵션을 사용하면 두 번째 Y축을 생성할 수 있습니다.
- `row`와 `col` 매개변수를 사용하여 subplot의 위치를 지정할 수 있습니다.

### 7. 추가 정보

- Plotly 공식 문서: [https://plotly.com/python/](https://plotly.com/python/)
- Plotly 갤러리: [https://plotly.com/python/](https://plotly.com/python/)
