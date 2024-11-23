// try-catch block
/* If `typeof` a param is not equal to
`number`, throw `ReferenceError` and
pass message `the first argument is
not a number`.
*/
function addTwoNums(a,b) {
    try {
        typeof_a = typeof a;
        typeof_b = typeof b;
        if (typeof_a != "number") {
            throw new ReferenceError(`the first argument '--${a}--' is not a number`);
        } else if (typeof_b != "number") {
            throw new ReferenceError(`the second argument '--${b}--' is not a number`);
        } else {
            console.log(a+b);
        }
    } catch(err) {
        console.log("Error!", err)
    }
}
addTwoNums(5, "5");
console.log("It still works");

