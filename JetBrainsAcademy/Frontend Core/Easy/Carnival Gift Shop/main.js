
const input = require('sync-input')

function show_list_gifts() {
    console.log("Here's the list of gifts:");

    console.log();

    for (let idx = 1; idx <= 10; idx++) {
        let gift = giftMap.get(idx);
        if (typeof gift !== 'undefined') {
            console.log(idx + '- ' + gift.name + ", Cost: " + gift.price + ' tickets');
        }
    }
}

function show_warning_valid_number() {
    console.log('Please enter a valid number!')
}

class Gift {
    constructor(name, price, id) {
        this.name = name;
        this.price = price;
        this.id = id;
    }
}

let giftMap = new Map();
let teddy = new Gift('Teddy Bear', 10, 1);
let ball = new Gift('Big Red Ball', 5, 2);
let bear = new Gift('Huge Bear', 50, 3);
let candy = new Gift('Candy', 8, 4);
let tiger = new Gift('Stuffed Tiger', 15, 5);
let dragon = new Gift('Stuffed Dragon', 30, 6);
let skateboard = new Gift('Skateboard', 100, 7);
let car = new Gift('Toy Car', 25, 8);
let basketball = new Gift('Basketball', 20, 9);
let mask = new Gift('Scary Mask', 75, 10);

let giftList = [teddy, ball, bear, candy, tiger, dragon,
    skateboard, car, basketball, mask]

giftList.forEach(gift => giftMap.set(gift.id, gift));

let totalTickets = 0;

console.log("WELCOME TO THE CARNIVAL GIFT SHOP!");
console.log("Hello friend! Thank you for visiting the carnival!");
show_list_gifts(giftMap)
console.log();

while (true) {
    console.log("What do you want to do?")
    console.log("1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop")

    let option = Number(input())

    if (option === 1) {
        if (giftMap.size > 0) {
            console.log('Enter the number of the gift you want to get:')
            let giftNumber = Number(input())
            if (isNaN(giftNumber)) {
                show_warning_valid_number()
            } else if (giftMap.has(giftNumber)) {
                let gift = giftMap.get(giftNumber)
                if (totalTickets >= gift.price) {
                    totalTickets -= gift.price
                    console.log('Here you go, one ' + gift.name + '!')
                    giftMap.delete(giftNumber)
                } else {
                    console.log("You don't have enough tickets to buy this gift.")
                }
                console.log('Total tickets: ' + totalTickets)
            } else {
                console.log('There is no gift with that number!')
            }
        } else if (giftMap.size === 0) {
            console.log("Wow! There are no gifts to buy.")
        }
    } else if (option === 2) {
        let tickets = undefined
        while (true) {
            console.log('Enter the ticket amount: ')
            tickets = Number(input())
            if (isNaN(tickets) || !Number.isInteger(tickets) || tickets < 0 || tickets > 1000) {
                console.log("Please enter a valid number between 0 and 1000.")
            } else {
                break
            }
        }

        totalTickets += tickets
        console.log('Total tickets: ' + totalTickets)
    } else if (option === 3) {
        console.log('Total tickets: ' + totalTickets)
    } else if (option === 4) {
        show_list_gifts()
    } else if (option === 5) {
        console.log('Have a nice day!')
        break;
    } else {
        show_warning_valid_number()
    }

    console.log();
}
