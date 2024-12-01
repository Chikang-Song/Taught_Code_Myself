function Header(props) {
    // 1. props 전체 객체 확인
    console.log("전체 props:", props);
  
    // 2. 특정 prop 값 확인
    console.log("name prop:", props.name);
    console.log("color prop:", props.color);
  
    // 3. 렌더링 시점 확인
    console.log("Header 컴포넌트가 렌더링됩니다.");
  
    return <h1>Hello there indded, {props.name} {props.color}</h1>;
  }

  export default Header;
  