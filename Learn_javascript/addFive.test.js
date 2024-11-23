const addFive = require('./addFive');

test('returns the number plus five', () =>{
    expect(addFive(10)).toBe(15);
})