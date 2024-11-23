//Exercise 1
//for loop
console.log("Execrcise 1\n")
for (let i=1; i<11; i++){
    if (i == 1) {
        console.log("Gold medal.");
    } else if (i == 2) {
        console.log("Silver medal.")
    } else if (i == 3) {
        console.log("Bronze medal.")
    } else {
        console.log(i)
    }
}

//Exercise 2
console.log('\n\nExcercise 2')
for(let i=1; i < 11; i++) {
    switch (i) {
        case 1:
            console.log("Gold medal.");
            break;
        case 2:
            console.log("Silver medal.");
            break;
        case 3:
            console.log("Bronze medal.");
            break;
        default:
            console.log(i)
    }
}