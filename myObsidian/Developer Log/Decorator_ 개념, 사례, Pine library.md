```table-of-contents
title: 
style: nestedList # TOC style (nestedList|nestedOrderedList|inlineFirstLevel)
minLevel: 0 # Include headings from the specified level
maxLevel: 0 # Include headings up to the specified level
includeLinks: true # Make headings clickable
hideWhenEmpty: false # Hide TOC if no headings are found
debugInConsole: false # Print debug info in Obsidian console
```
## Pint 라이브러리를 사용한 환율 계산 코드 예시 (최종 정리)

앞서 설명드린 내용을 모두 반영하여, Pint 라이브러리를 사용한 환율 계산 코드 예시를 최종적으로 정리해 드리겠습니다. 이 예시는 더욱 명확하고 실용적으로 구성되었으며, 금융 분야에서의 단위 관리 중요성을 잘 보여줍니다.

Python

```python
from pint import UnitRegistry
from functools import wraps

# 1. Pint UnitRegistry 생성
units = UnitRegistry()
Q_ = units.Quantity  # Quantity 클래스 단축 이름

# 2. 사용자 정의 통화 단위 등록 (USD, KRW)
units.define('USD = [currency_USD]') # USD 단위를 currency_USD 차원에 등록
units.define('KRW = [currency_KRW]') # KRW 단위를 currency_KRW 차원에 등록

# 3. 통화 단위 정의 (Pint Unit 객체로 생성)
USD = units.USD # units.USD 로 USD 단위 객체 접근
KRW = units.KRW # units.KRW 로 KRW 단위 객체 접근

# 4. 환율 정의 (USD -> KRW 환율, Pint Quantity 객체)
exchange_rate_usd_to_krw = Q_(1300, KRW/USD) # 1 USD 당 1300 KRW

# 5. 단위 검증 데코레이터 정의 (USD 통화 단위 입력 검증)
def ensure_currency_unit(expected_unit):
    """입력 금액이 특정 통화 단위인지 검증하는 데코레이터"""
    def decorator_ensure_currency_unit(func):
        @wraps(func) # wraps 데코레이터로 func metadata (이름, 독스트링 등) 보존
        def wrapper_ensure_currency_unit(amount, *args, **kwargs):
            if not isinstance(amount, Q_): # 입력 금액이 Pint Quantity 객체인지 확인
                raise ValueError("입력 금액은 Pint Quantity 객체여야 합니다.")
            if amount.units != expected_unit: # 입력 금액 단위가 예상 단위와 일치하는지 확인 (엄격 비교)
                raise ValueError(f"입력 금액 단위 오류: 예상 단위는 '{expected_unit}' 입니다. 입력된 단위: '{amount.units}'")
            return func(amount, *args, **kwargs) # 원래 함수 호출 (단위 검증 통과)
        return wrapper_ensure_currency_unit
    return decorator_ensure_currency_unit

# 6. 데코레이터 적용 환율 계산 함수 정의 (@ensure_currency_unit(USD) 데코레이터 적용)
@ensure_currency_unit(USD) # 이 함수는 USD 단위의 금액만 입력으로 받도록 강제됨
def calculate_exchange_amount_decorated(amount, exchange_rate):
    """USD 금액을 입력받아 환율을 적용, KRW 금액을 반환하는 함수 (단위 인식)"""
    return amount * exchange_rate # Pint Quantity 객체 간 연산 (단위 자동 관리)

# 7. 예시 사용: 100 USD 를 KRW 로 환산 (데코레이터 적용 함수 사용)
usd_amount_decorated = Q_(100, USD) # 100 USD Pint Quantity 객체 생성
krw_amount_decorated = calculate_exchange_amount_decorated(usd_amount_decorated, exchange_rate_usd_to_krw) # 환율 계산 함수 호출

# 8. 결과 출력 (다양한 형태로 출력)
print(f"{usd_amount_decorated} 는 {krw_amount_decorated} 입니다. (데코레이터 적용)") # 기본 출력 (값과 단위 함께 표시)
print(f"{usd_amount_decorated} 는 {krw_amount_decorated.to(KRW)} 입니다. (KRW 단위로 변환 후 표시)") # KRW 단위로 명시적 변환 후 출력
print(f"계산된 KRW 금액 (값만): {krw_amount_decorated.magnitude:.2f} KRW") # 값만 출력 (소수점 2자리까지 표시)

# 9. 단위 오류 예시 (USD 대신 KRW 단위 입력 시 오류 발생 - 데코레이터가 오류 검출)
# krw_amount_wrong_unit = Q_(100000, KRW) # 100,000 KRW Pint Quantity 객체 생성
# calculate_exchange_amount_decorated(krw_amount_wrong_unit, exchange_rate_usd_to_krw) # <--- 여기서 ValueError 발생! (USD 단위가 아니므로 데코레이터가 오류 발생시킴)
```

**코드 설명:**

1. **Pint UnitRegistry 생성:** `units = UnitRegistry()` 로 Pint 라이브러리의 단위 레지스트리 객체를 생성합니다. 이 레지스트리는 다양한 단위를 관리하고 변환하는 역할을 합니다. `Q_ = units.Quantity` 로 `Quantity` 클래스를 단축 이름으로 지정하여 코드 가독성을 높였습니다.
    
2. **사용자 정의 통화 단위 등록:** `units.define('USD = [currency_USD]')` 와 `units.define('KRW = [currency_KRW]')` 를 사용하여 "USD" 와 "KRW" 라는 사용자 정의 통화 단위를 Pint 레지스트리에 등록합니다. `[currency_USD]` 와 `[currency_KRW]` 는 각 단위가 속하는 차원을 지정합니다. 이렇게 사용자 정의 단위를 등록하면 Pint가 해당 단위를 인식하고 단위 연산 및 변환을 지원할 수 있게 됩니다.
    
3. **통화 단위 정의 (Pint Unit 객체):** `USD = units.USD` 와 `KRW = units.KRW` 를 사용하여 등록된 "USD" 와 "KRW" 단위를 Pint Unit 객체로 생성하고, 각각 `USD` 와 `KRW` 변수에 할당합니다. 이제 코드에서 `USD` 와 `KRW` 를 Pint 단위로 사용할 수 있습니다.
    
4. **환율 정의:** `exchange_rate_usd_to_krw = Q_(1300, KRW/USD)` 로 USD-KRW 환율을 Pint `Quantity` 객체로 정의합니다. `Q_(1300, KRW/USD)` 는 값 `1300` 과 단위 `KRW/USD` 를 결합하여 환율을 Pint가 이해할 수 있는 형태로 표현합니다.
    
5. **단위 검증 데코레이터 정의 (`ensure_currency_unit`):** `ensure_currency_unit` 데코레이터는 함수에 입력되는 금액의 단위가 예상 단위(여기서는 USD)와 일치하는지 검증하는 역할을 합니다.
    
    - `expected_unit` 인자를 통해 예상 단위를 설정합니다.
    - `wrapper_ensure_currency_unit` 내부에서 입력 `amount` 가 Pint `Quantity` 객체인지, 그리고 단위가 `expected_unit` 과 정확히 일치하는지 검사합니다.
    - 단위 검증에 실패하면 `ValueError` 예외를 발생시켜 오류를 알립니다.
    - `@wraps(func)` 데코레이터는 데코레이터 적용 후에도 원래 함수의 메타데이터 (이름, 독스트링 등)를 유지하기 위해 사용됩니다.
6. **데코레이터 적용 환율 계산 함수 (`calculate_exchange_amount_decorated`):** `@ensure_currency_unit(USD)` 데코레이터를 `calculate_exchange_amount_decorated` 함수에 적용합니다. 이제 이 함수는 첫 번째 인자 (`amount`) 로 반드시 USD 단위의 Pint `Quantity` 객체만을 허용하며, 다른 단위의 입력이 들어오면 데코레이터에 의해 오류가 발생합니다. 함수 내부에서는 입력 금액과 환율을 곱하는 기본적인 환율 계산 로직만 구현되어 있으며, Pint가 자동으로 단위 연산 및 관리를 처리합니다.
    
7. **예시 사용:** `usd_amount_decorated = Q_(100, USD)` 로 100 USD를 Pint `Quantity` 객체로 생성하고, `calculate_exchange_amount_decorated` 함수에 입력하여 환율 계산을 수행합니다.
    
8. **결과 출력:** 계산 결과를 다양한 형태로 출력합니다.
    
    - 기본 출력은 Pint `Quantity` 객체 자체를 출력하여 값과 단위를 함께 보여줍니다.
    - `.to(KRW)` 메서드를 사용하여 결과값을 KRW 단위로 명시적으로 변환하여 출력할 수 있습니다. (이미 KRW 단위이므로 변환은 실질적으로 일어나지 않음)
    - `.magnitude` 속성을 사용하여 값 부분만 추출하고, f-string 포맷팅으로 단위와 함께 출력할 수도 있습니다.
9. **단위 오류 예시:** `krw_amount_wrong_unit = Q_(100000, KRW)` 로 100,000 KRW를 Pint `Quantity` 객체로 생성하고, `calculate_exchange_amount_decorated` 함수에 입력하려고 시도합니다. 이 경우 데코레이터가 입력 단위가 USD 가 아님을 감지하고 `ValueError` 를 발생시켜 오류를 사전에 차단합니다. (해당 코드는 주석 처리되어 있으며, 주석 해제 후 실행하면 오류를 확인할 수 있습니다.)
    

**결론:**

이 최종 코드는 Pint 라이브러리를 사용하여 환율 계산을 안전하고 명확하게 처리하는 방법을 보여줍니다. 단위 검증 데코레이터를 통해 입력 데이터의 단위를 강제하고, Pint의 자동 단위 관리 기능을 활용하여 코드의 안정성과 가독성을 높였습니다. 이 예시를 바탕으로 금융, 과학, 공학 등 다양한 분야에서 단위 관리가 필요한 파이썬 어플리케이션 개발에 Pint 라이브러리와 데코레이터를 효과적으로 활용할 수 있습니다.

## 파이썬 데코레이터 기본 개념 및 실제 사례 (Real Python Primer 참조)

요청하신 웹사이트 [Primer on Python Decorators – Real Python](https://realpython.com/primer-on-python-decorators/) 를 검색하여 파이썬 데코레이터에 대한 기본 개념과 실제 사례를 정리했습니다.

**파이썬 데코레이터란 무엇인가?**

파이썬 데코레이터는 함수나 클래스의 기능을 "꾸며주는" 강력한 기능입니다. 좀 더 구체적으로 말하면, 데코레이터는 **다른 함수를 감싸서(wrap)** 원래 함수의 코드를 수정하지 않고 **추가적인 기능**을 제공할 수 있게 해줍니다. 마치 선물 포장처럼, 원래 선물(함수)을 겉포장(데코레이터)으로 감싸서 선물을 더 특별하게 만들어주는 것과 비슷하다고 생각할 수 있습니다.

**데코레이터의 기본 개념:**

1. **함수를 인자로 받는 함수:** 데코레이터는 기본적으로 **함수를 인자로 받아서 함수를 반환하는 함수**입니다. 이 "데코레이터 함수"는 원래 함수를 감싸는 역할을 합니다.
    
2. **`@` 문법:** 파이썬에서 데코레이터를 사용할 때는 함수 정의 위에 `@데코레이터_이름` 형태로 표기합니다. 이 `@` 문법은 파이썬이 데코레이터를 적용하는 특별한 방법입니다.
    
3. **클로저(Closure) 활용:** 데코레이터는 주로 클로저 개념을 활용합니다. 클로저는 함수가 정의될 때의 환경(변수 등)을 기억하는 함수입니다. 데코레이터는 이 클로저를 통해 원래 함수를 감싸고 추가 기능을 구현합니다.
    

**데코레이터 작동 방식 (간단한 예시):**

Python

```
def my_decorator(func):
    def wrapper():
        print("함수 실행 전에 실행될 코드")
        func() # 원래 함수 실행
        print("함수 실행 후에 실행될 코드")
    return wrapper

@my_decorator
def say_hello():
    print("안녕하세요!")

say_hello()
```

**실행 결과:**

```
함수 실행 전에 실행될 코드
안녕하세요!
함수 실행 후에 실행될 코드
```

위 예시에서 `my_decorator`는 데코레이터 함수입니다. `@my_decorator` 는 `say_hello` 함수에 `my_decorator`를 적용하라는 의미입니다. `say_hello` 함수를 호출하면, `my_decorator`의 `wrapper` 함수가 실행되어, 원래 `say_hello` 함수 실행 전후에 추가적인 코드가 실행되는 것을 볼 수 있습니다.

**Real Python 문서에서 제시하는 실제 사례:**

Real Python 문서에서는 데코레이터의 다양한 실제 사용 사례를 설명하고 있습니다. 주요 사례들을 정리하면 다음과 같습니다.

1. **시간 측정 데코레이터 (`@timer`):** 함수 실행 시간을 측정하는 데코레이터입니다. 함수 실행 시작과 끝 시간을 기록하고, 실행 시간을 출력하여 성능 분석에 유용하게 사용될 수 있습니다.
    
    Python
    
    ```
    import time
    
    def timer(func):
        """함수 실행 시간을 측정하는 데코레이터"""
        def wrapper_timer(*args, **kwargs):
            start_time = time.time()    # 함수 시작 시간
            value = func(*args, **kwargs)
            end_time = time.time()      # 함수 종료 시간
            run_time = end_time - start_time
            print(f"함수 '{func.__name__}' 실행 시간: {run_time:.4f} 초")
            return value
        return wrapper_timer
    
    @timer
    def long_process(duration):
        """오랜 시간이 걸리는 작업을 시뮬레이션하는 함수"""
        time.sleep(duration)
    
    long_process(2) # 2초 동안 실행
    ```
    
    **실행 결과 (예시):**
    
    ```
    함수 'long_process' 실행 시간: 2.0015 초
    ```
    
    `@timer` 데코레이터를 `long_process` 함수에 적용함으로써, `long_process` 함수 실행 시간을 자동으로 측정하고 출력할 수 있게 되었습니다.
    
2. **디버깅 데코레이터 (`@debug`):** 함수 인자와 반환 값을 출력하여 디버깅을 돕는 데코레이터입니다. 함수 호출 시 어떤 인자가 전달되었는지, 어떤 값이 반환되는지 쉽게 확인할 수 있어 코드 분석 및 오류 해결에 유용합니다.
    
    Python
    
    ```
    def debug(func):
        """함수 인자와 반환 값을 출력하는 데코레이터"""
        def wrapper_debug(*args, **kwargs):
            args_repr = [repr(a) for a in args]                      # 인자 표현
            kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]  # 키워드 인자 표현
            signature = ", ".join(args_repr + kwargs_repr)         # 함수 서명 생성
            print(f"함수 '{func.__name__}' 호출됨, 인자: ({signature})")
            value = func(*args, **kwargs)
            print(f"함수 '{func.__name__}' 반환 값: {repr(value)}")
            return value
        return wrapper_debug
    
    @debug
    def greet(name, greeting="Hello"):
        return f"{greeting}, {name}!"
    
    greet("World")
    greet("Python", greeting="Hi")
    ```
    
    **실행 결과:**
    
    ```
    함수 'greet' 호출됨, 인자: ('World',)
    함수 'greet' 반환 값: 'Hello, World!'
    함수 'greet' 호출됨, 인자: ('Python', 'greeting'='Hi')
    함수 'greet' 반환 값: 'Hi, Python!'
    ```
    
    `@debug` 데코레이터를 사용하면 함수 호출 시 인자와 반환 값을 쉽게 추적하여 디버깅 효율을 높일 수 있습니다.
    
3. **재시도 데코레이터 (`@retry`):** 함수 실행이 실패했을 때 자동으로 재시도하는 데코레이터입니다. 네트워크 요청, 외부 API 호출 등 불안정할 수 있는 작업에 유용하며, 일시적인 오류를 극복하고 안정성을 높일 수 있습니다. (Real Python 문서에서는 `retry` 데코레이터 예시를 직접 제공하지는 않지만, 데코레이터의 응용 가능성을 설명하며 언급합니다.)
    
    Python
    
    ```
    import time
    
    def retry(max_retries=3, delay=1):
        """함수 실행 실패 시 재시도하는 데코레이터"""
        def decorator_retry(func):
            def wrapper_retry(*args, **kwargs):
                for attempt in range(max_retries + 1):
                    try:
                        return func(*args, **kwargs)  # 함수 실행 시도
                    except Exception as e:
                        print(f"시도 {attempt+1}/{max_retries+1} 실패: {e}")
                        if attempt < max_retries:
                            time.sleep(delay)  # 재시도 전 대기
                        else:
                            raise  # 최대 재시도 횟수 초과 시 예외 발생
            return wrapper_retry
        return decorator_retry
    
    @retry(max_retries=2)
    def unstable_function():
        """불안정한 함수 (랜덤하게 예외 발생)"""
        import random
        if random.random() < 0.5:
            raise Exception("일시적인 오류 발생!")
        return "성공!"
    
    try:
        result = unstable_function()
        print(f"함수 실행 결과: {result}")
    except Exception as e:
        print(f"최종 실패: {e}")
    ```
    
    `@retry` 데코레이터를 `unstable_function`에 적용하면, 함수 실행 중 오류가 발생해도 최대 2번까지 재시도를 하게 됩니다. 이를 통해 프로그램의 안정성을 높일 수 있습니다.
    
4. **등록 데코레이터 (`@register`):** 함수를 특정 그룹에 등록하거나 관리하는 데코레이터입니다. 플러그인 시스템, 이벤트 핸들러 관리 등에서 유용하게 사용될 수 있습니다. (Real Python 문서에서는 `register` 데코레이터 예시를 직접 제공하지는 않지만, 데코레이터의 응용 가능성을 설명하며 언급합니다.)
    
    Python
    
    ```
    registry = [] # 함수 등록 리스트
    
    def register(func):
        """함수를 등록하는 데코레이터"""
        registry.append(func) # 함수를 리스트에 추가
        return func # 원래 함수 반환 (데코레이터는 원래 함수를 반환해야 함)
    
    @register
    def process_data_a():
        print("데이터 A 처리")
    
    @register
    def process_data_b():
        print("데이터 B 처리")
    
    def run_all_processors():
        print("등록된 프로세서 실행:")
        for func in registry:
            func()
    
    run_all_processors()
    
    print("등록된 함수 목록:", [func.__name__ for func in registry]) # 등록된 함수 이름 확인
    ```
    
    `@register` 데코레이터를 사용하면 `process_data_a`와 `process_data_b` 함수를 `registry` 리스트에 등록하고, 나중에 `run_all_processors` 함수를 통해 등록된 함수들을 일괄적으로 실행할 수 있습니다.
    

**데코레이터의 장점:**

- **코드 재사용성 증가:** 공통 기능을 데코레이터로 만들어 여러 함수에 쉽게 적용 가능합니다.
- **코드 가독성 향상:** 데코레이터를 사용하면 핵심 기능과 부가 기능을 분리하여 코드를 더 명확하게 작성할 수 있습니다.
- **관심사 분리 (Separation of Concerns):** 로깅, 시간 측정, 인증 등 부가적인 기능들을 데코레이터로 분리하여 핵심 비즈니스 로직에 집중할 수 있습니다.
- **유연성 및 확장성 증대:** 데코레이터를 통해 함수의 동작 방식을 쉽게 변경하거나 확장할 수 있습니다.

**결론:**

파이썬 데코레이터는 코드를 더욱 효율적이고 가독성 좋게 만들어주는 강력한 도구입니다. Real Python 문서에서 제시된 다양한 예시들을 통해 데코레이터의 기본 개념과 실제 활용 방법을 이해하는 데 도움이 되셨기를 바랍니다. 데코레이터를 잘 활용하면 코드의 재사용성을 높이고, 유지보수를 용이하게 하며, 프로그램의 유연성을 향상시킬 수 있습니다.