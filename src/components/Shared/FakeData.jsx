import { faker } from '@faker-js/faker';

function createRandomeCarList(){
    return {
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        // Use a valid image URL (use a direct URL to an image file, like a JPG or PNG)
        image: "https://wallpapers.com/images/high/dramatic-monochrome-jaguar-car-8cc1k2jomojxacjo.webp",
        miles: 1000,
        gearType: 'Automatic',
        price: faker.finance.amount({ min: 4000, max: 20000 })
    };
}

const carList = faker.helpers.multiple(createRandomeCarList, { count: 7 });

export default {
    carList
}
