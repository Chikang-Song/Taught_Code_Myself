//days of the week
var day = "Monday";
switch(day) {
    case "Monday":
        console.log("Read a book");
        break;
    case 'Tuesday':
        console.log("Write a article");
        break;
    case 'Wednesday':
        console.log("Execute a plan");
        break;
    case 'Thursday':
        console.log("Verify");
        break;
    case 'Saturday':
        console.log("Review");
        break;
    case 'Sunday':
        console.log("Schedule for next plan");
        break;
    default:
        //this block will run if no condition matches
        console.log("There is no such day");
        break;
}
