// Rest Operator

const top7 = ['Colosseum', 'Roman Forum', 'Vatican', 'Trevi Fountain', 'Pantheon', 'Piazza Venezia', 'Palatine Hill'];

const [first, second, third, ...secondVisit] = top7;

console.log(...secondVisit)

function showPlaces(...places) {
    console.log(`Visit ${places.join(', ')}`);
}


showPlaces(top7);