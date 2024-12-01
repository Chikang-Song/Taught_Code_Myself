#Props와 children
이전에 컴포넌트로 속성을 전달하고 내부적으로 사용하는 방법을 배웠습니다. 그러나 컴포넌트에 자동으로 전달되는 특수한 속성인 props.children도 있습니다. 이번에는 props.children과 그 목적에 대해 알아보겠습니다.

props.children의 개념을 이해하기 위해 다음과 같은 실제 상황을 생각해봅시다:
당신에게 몇 개의 사과와 몇 개의 배가 있습니다. 이 사과를 어느 정도 거리를 옮겨야 한다고 가정해 보겠습니다. 당연히 가방을 사용할 것입니다.

이 가방은 "사과만을 위한 가방"도 아니고, "배만을 위한 가방"도 아닙니다. 그냥 가방일 뿐입니다. 이 가방이 사과만 넣는 가방으로 불려야 할 이유도 없고, 항상 배만 넣는 가방으로 불려야 할 이유도 없습니다.

어떤 의미에서 이 가방은 사과를 넣든 배를 넣든 상관하지 않습니다. 가방 자체는 아무 변화가 없습니다. 가방의 재질, 크기, 모양, 색상은 변하지 않습니다. 사과든 배든 문제없이 넣을 수 있기 때문입니다.

이제 다음 컴포넌트를 생각해 보세요:
```
function Apples(props) {
  return (
    <div className="promo-section">
        <div>
            <h2>These apples are: {props.color}</h2>
            </div>
            <div>
            <h3>There are {props.number} apples.</h3>
        </div>
    </div>
  )
}
export default Apples
```
거기에는 `Pears` 컴포넌트도 있습니다:
```
function Pears(props) {
  return (
    <h2>I don't like pears, but my friend, {props.friend}, does</h2>
  )
}
```
이제 질문은 다음과 같습니다:
사과나 배를 "운반"할 수 있는 Bag 컴포넌트를 만들고 싶다고 가정해 보겠습니다. 이를 어떻게 구현할 수 있을까요?

바로 여기서 **props.children**이 등장합니다.

Bag 컴포넌트를 다음과 같이 정의할 수 있습니다:
```
function Bag(props) {
    const bag = {
        padding: "20px",
        border: "1px solid gray",
        background: "#fff",
        margin: "20px 0"
    }
    return (
        <div style={bag}>
            {props.children}
        </div>
    )
}
export default Bag
```
이 Bag 컴포넌트에서의 역할은 다음과 같습니다:
특정 스타일을 가진 래핑(div)을 추가한 다음, 그 내부에 **props.children**을 콘텐츠로 제공합니다.

그렇다면, **props.children**이란 무엇일까요?

아주 간단한 예를 생각해 보세요:
```
<Example>
    Hello there
</Example>
```
**Hello there** 텍스트는 **Example** JSX 요소의 **child**(자식)입니다. 위의 **Example** JSX 요소는 **Example.js** 파일을 호출한 것으로, 현대 React에서는 보통 함수형 컴포넌트로 작성됩니다.  

이 **Hello there** 텍스트는 **Example** 컴포넌트를 렌더링할 때 **명명된 prop**으로 전달될 수 있습니다.  

다음은 이를 나타낸 예제입니다:  
```
<Example children="Hello there" />
```

이 작업을 수행하는 방법은 두 가지가 있습니다. 하지만 이는 단지 시작일 뿐입니다.  

만약 **Hello there** 텍스트를 **h3 HTML 요소**로 감싸고 싶다면 어떻게 해야 할까요?  

당연히 JSX에서는 이를 쉽게 구현할 수 있습니다:  
```
<Example children={<h3>Hello there</h3>} />
```

만약 `<h3>Hello there</h3>`가 **Hello**라는 이름의 별도 컴포넌트라면 어떻게 될까요?  

그 경우, 코드를 다음과 같이 업데이트해야 합니다:  
```
<Example children={<Hello />} />
```
**Hello** 컴포넌트에 자체 속성(prop)을 추가하여 더 동적(dynamic)으로 만들 수도 있습니다:  
```
<Example children={<Hello message="Hello there" />} />
```
그렇다면, 이 글의 시작에서 언급한 **Bag**, **Apples**, **Pears** 예제를 어떻게 구현할 수 있을까요?  

다음은 **Apples** 컴포넌트를 **Bag** 컴포넌트의 **`props.children`**으로 렌더링하는 방법입니다:  
```
<Bag children={<Apples color="yellow" number="5" />} />
```
그리고 다음은 **Bag** 컴포넌트를 렌더링하면서 **Pears** 컴포넌트를 감싸는 방법입니다:  
```
<Bag children={<Pears friend="Peter" />} />
```
위의 문법이 다소 낯설게 보일 수 있지만, 무엇이 일어나는지 이해하는 것이 중요합니다.  

본질적으로, 위의 문법은 아래 두 가지 예제와 동일합니다.  
```
<Bag>
    <Apples color="yellow" number="5" />
</Bag>

<Bag>
    <Pears friend="Peter" />
</Bag>
```
여러 단계로 중첩된 JSX 요소를 사용할 수도 있고, 하나의 JSX 요소에 여러 자식을 포함시킬 수도 있습니다. 예를 들어:
```
<Trunk>
    <Bag>
        <Apples color="yellow" number="5" />
        <Pears friend="Peter" />
    </Bag>
</Trunk>
```
위 구조에서 Trunk JSX 요소가 있으며, 그 내부에는 Bag JSX 요소가 하나 들어 있고, 그 안에 Apples와 Pears JSX 요소가 포함되어 있습니다.

이 글을 마치기 전에, 다음 JSX 요소를 다시 한 번 생각해 보세요:
```
<Bag>
    <Apples color="yellow" number="5" />
</Bag>
```
위 코드에서 **Apples**는 **Bag** 컴포넌트에 무엇일까요?  

위 코드에서 **Apples**는 **Bag** 컴포넌트의 **prop**입니다. 자세히 설명하자면, **Bag** 컴포넌트는 **Apples** 컴포넌트 또는 다른 어떤 컴포넌트도 감쌀 수 있습니다. 이는 **Bag** 컴포넌트 함수 선언에서 **`{props.children}`** 구문을 사용했기 때문입니다.  

즉, 현실 세계에서 장바구니에 다양한 식료품을 담는 것처럼, React에서도 **Bag** 컴포넌트를 사용해 다양한 컴포넌트를 감쌀 수 있습니다. 이를 **children** prop을 사용하여 구현할 수 있습니다.  

React를 다룰 때 이러한 개념을 이해하는 것이 매우 중요합니다.  

### 모듈화의 적정 수준  
이 글을 마치기 전에 알아야 할 또 다른 중요한 개념이 있습니다: **적절한 모듈화 수준을 찾는 것**입니다.  

이게 무슨 뜻일까요?  
예를 들어, 여러 개의 작은 가방이 있다고 상상해 보세요. 각 가방은 사과나 배 한 개만 담을 수 있습니다. 모든 "사과"를 각각 "가방"에 담아야 한다면, 이는 말이 되지 않습니다.  

컴포넌트를 사용해 레이아웃을 모듈화하는 작업도 이와 비슷하게 생각할 수 있습니다.  
전체 레이아웃을 하나의 컴포넌트로 만드는 것은 작업하기 어렵게 만들 것입니다. 반대로, 레이아웃의 모든 HTML 요소를 각각 별개의 컴포넌트로 만든다면, 작업하기 힘들기는 마찬가지입니다. 이런 경우 레이아웃은 매우 모듈화되겠지만, 유지보수가 어렵습니다.  

### 적절한 모듈화 방법  
중요한 건 **절제**입니다.  
레이아웃을 의미 있는 페이지 영역별로 나누고, 그 영역을 별개의 컴포넌트로 작성하는 것이 가장 적절한 모듈화 방법입니다.  

예를 들어, 사람들에게 웹사이트를 설명할 때 사용하는 용어를 생각해 보세요: **메뉴**, **푸터**, **장바구니** 등입니다. 이러한 의미 있는 영역을 기준으로 컴포넌트를 나누는 것이 바람직합니다.  

### 결론  
JSX 요소가 다른 JSX 요소를 감싸는 것을 볼 때, 이는 배경에서 모두 **`props.children`**을 사용하는 것이라는 점을 쉽게 이해할 수 있습니다.  
