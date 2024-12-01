function Bag(props) {
    const bag = {
        padding: "20px",
        border: "1px solid gray",
        background: "#ffffff",
        margin: "20px 0"
    }
    return (
        <div style={bag}>
            <h1>오늘의 과일 목록...</h1>
            {props.children}
        </div>
    )
}
export default Bag