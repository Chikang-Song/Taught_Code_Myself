"""
이 모듈은 두 개의 숫자를 더하는 간단한 예제를 보여줍니다.
PyLint에서 경고로 지적된 모듈 및 함수 설명 부족 문제를 해결하기 위해 작성되었습니다.
"""

# 'add'라는 이름의 함수를 정의하며, 이 함수는 두 개의 숫자를 더하고 결과를 반환합니다.
def add(number1, number2):
    """
    두 숫자를 더하고 결과를 반환하는 함수입니다.

    매개변수:
    number1 (int, float): 더할 첫 번째 숫자
    number2 (int, float): 더할 두 번째 숫자

    반환값:
    int, float: 두 숫자의 합
    """
    return number1 + number2


# 상수 'NUM1'을 값 4로 초기화합니다.
NUM1 = 4

# 변수 'NUM2'를 값 5로 초기화합니다.
NUM2 = 5

# 'add' 함수를 호출하여 'NUM1'과 'NUM2'의 합을 계산하고, 결과를 'TOTAL'에 저장합니다.
TOTAL = add(NUM1, NUM2)

# 계산 결과를 출력합니다.
print("The sum of {} and {} is {}".format(NUM1, NUM2, TOTAL))
