// Object-Oriented Programming (OOP)

function calculation(a,b) {
    return a * b
}

var purchase1 = {
    shoes:100,
    tax:1.2,
    totalPrice: function(){
        var result = calculation(this.shoes, this.tax);
        console.log(result);
        return result
    }
};

purchase1.totalPrice();

var purchase2 = {
    shoes:50,
    tax:1.2,
    totalPrice:function(){
        var result = calculation(this.shoes, this.tax);
        console.log(result);
        return result;
    }
};

purchase2.totalPrice();