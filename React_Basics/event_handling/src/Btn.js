// function Btn() {
//     const clickHander = () => {
//         console.log('Button clicked!')
//     };

//     return (
//         <button onClick={clickHander}>Click me</button>
//     )
// }

// export default Btn;


// function Btn() {
//     const mouseOverHander = () => {
//         console.log('Hover over me!')
//     };

//     return (
//         <button onMouseOver={mouseOverHander}>HoverOver me</button>
//     )
// }

// export default Btn;


//상태 관리와 이벤트 결합
import { useState } from 'react'

function InteractiveBtn() {
    const [hoverCount, setHoverCount] = useState(0);

    const handleMouseOver = () => {
        setHoverCount(hoverCount + 1);
        console.log('Hovered ${hoverCount + 1} times')
    }

    return (
        <div>
            <button onMouseOver={handleMouseOver}>
                HoverOver me
            </button>
            <p>Hovered {hoverCount} times</p>
        </div>
        
    )
}

export default InteractiveBtn;