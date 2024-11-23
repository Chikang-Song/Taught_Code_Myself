// Spread Operator
let top3 = ['Colosseum', 'Trevi Fountain', 'Vatican City'];
function showItinerary(place1, place2, place3) {
    console.log(`Visit ${place1}, then ${place2}, and finish with a visit to ${place3}`);
}

showItinerary(...top3);  // 각 배열 요소가 함수에 개별 인수로 전달됩니다.


// 객체의 속성을 다른 객체로 복사
let numbers = [1, 2, 3];
let moreNumbers = [...numbers, 4, 5, 6];
console.log(moreNumbers);  // [1, 2, 3, 4, 5, 6]

// 여러 배열 요소 확장
let top7 = ['Colosseum', 'Trevi Fountain', 'Vatican City', 'Pantheon', 'Piazza Navona', 'Spanish Steps', 'Villa Borghese'];

function showExtendedItinerary(...places) {
    console.log(`Visit ${places.join(', ')}`);
}

showExtendedItinerary(...top7);
