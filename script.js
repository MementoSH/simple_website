import data from "./cars.json" with { type: "json" };

const displayCars = (cars) => {
    const catalog = document.querySelector(".catalog");
    let carsList = document.getElementsByClassName("car-card");
    while (carsList[0]) {
        carsList[0].parentNode.removeChild(carsList[0]);
    }
    cars.forEach((car) => {
        const carCardDiv = document.createElement("div");
        const carDetailsDiv = document.createElement("div");
        const img = document.createElement("img");
        const button = document.createElement("a");
        const ul = document.createElement("ul");
        const brandAndModel = document.createElement("li");
        const bamH1 = document.createElement("h1");
        const pricePerMonthUSD = document.createElement("li");
        const powerHP = document.createElement("li");
        const fuelType = document.createElement("li");
        const seats = document.createElement("li");

        bamH1.textContent += car.Brand + " " + car.Model;
        pricePerMonthUSD.textContent += "$/mo: " + car.PricePerMonthUSD;
        powerHP.textContent += car.PowerHP + " HP";
        fuelType.textContent += "Fuel Type: " + car.FuelType;
        seats.textContent += "Seats: " + car.Seats;
        button.textContent += "Book Now";

        img.setAttribute("src", car.imgURL ? car.imgURL : "");
        carCardDiv.setAttribute("class", "car-card");
        carDetailsDiv.setAttribute("class", "car-details");
        ul.setAttribute("class", "car-attributes");
        button.setAttribute("class", "btn fill");

        brandAndModel.appendChild(bamH1);
        ul.appendChild(img);
        ul.appendChild(brandAndModel);
        ul.appendChild(pricePerMonthUSD);
        ul.appendChild(powerHP);
        ul.appendChild(fuelType);
        ul.appendChild(seats);
        carDetailsDiv.appendChild(ul);
        carDetailsDiv.appendChild(button);
        carCardDiv.appendChild(carDetailsDiv);
        catalog.appendChild(carCardDiv);
    });
};

displayCars(data);

document.querySelector("#sort-by").addEventListener("click", () => {
    const sortBy = document.getElementById("sort-by").value;
    const sortType = document.querySelector(".sort-type");
    const brand = document.querySelector(".brand-sort");
    const fuelType = document.querySelector(".fuel-type-sort");
    const from = document.querySelector(".from");
    const to = document.querySelector(".to");

    if (sortBy === "brand") {
        from.style.display = "none";
        to.style.display = "none";
        brand.style.display = "inline-block";
        fuelType.style.display = "none";
        sortType.style.display = "inline-block";
    } else if (sortBy === "price" || sortBy === "power") {
        from.style.display = "inline-block";
        to.style.display = "inline-block";
        brand.style.display = "none";
        fuelType.style.display = "none";
        sortType.style.display = "inline-block";
    } else if (sortBy === "fuel-type") {
        from.style.display = "none";
        to.style.display = "none";
        brand.style.display = "none";
        fuelType.style.display = "inline-block";
        sortType.style.display = "none";
    }
});

document.querySelector(".sort-button").addEventListener("click", () => {
    const sortBy = document.getElementById("sort-by").value;
    const sortType = document.querySelector(".sort-type").value;
    let sortedCars;

    if (sortBy === "price") {
        const from = +document.querySelector(".from").value;
        let to = +document.querySelector(".to").value;
        to = to == 0 ? 999999 : to;
        console.log(from, to);
        sortedCars = data.filter(
            (car) => car.PricePerMonthUSD >= from && car.PricePerMonthUSD <= to
        );
        if (sortType === "asc") {
            sortedCars = sortedCars.sort(
                (a, b) => a.PricePerMonthUSD - b.PricePerMonthUSD
            );
        } else {
            sortedCars = sortedCars.sort(
                (a, b) => b.PricePerMonthUSD - a.PricePerMonthUSD
            );
        }
    } else if (sortBy === "power") {
        const from = +document.querySelector(".from").value;
        let to = +document.querySelector(".to").value;
        to = to == 0 ? 999999 : to;
        sortedCars = data.filter(
            (car) => from <= car.PowerHP && car.PowerHP <= to
        );
        if (sortType === "asc") {
            sortedCars = sortedCars.sort(
                (a, b) => a.PricePerMonthUSD - b.PricePerMonthUSD
            );
        } else {
            sortedCars = sortedCars.sort(
                (a, b) => b.PricePerMonthUSD - a.PricePerMonthUSD
            );
        }
    } else if (sortBy === "brand") {
        const brand = document.querySelector(".brand-sort").value;
        if (brand === "all") {
            sortedCars = data;
            if (sortType === "asc") {
                sortedCars = sortedCars.sort((a, b) =>
                    a.Brand.localeCompare(b.Brand)
                );
            } else {
                sortedCars = sortedCars.sort((a, b) =>
                    b.Brand.localeCompare(a.Brand)
                );
            }
        } else {
            sortedCars = data.filter(
                (car) => car.Brand.toLocaleLowerCase() === brand
            );
        }
    } else if (sortBy === "fuel-type") {
        const fuelType = document.querySelector(".fuel-type-sort").value;
        if (fuelType === "all") {
            sortedCars = data;
        } else {
            sortedCars = data.filter(
                (car) => car.FuelType.toLocaleLowerCase() === fuelType
            );
        }
    }
    displayCars(sortedCars);
});

document.addEventListener("mousemove", function (event) {
    if (window.innerWidth < 1024) {
        return;
    }
    const parallaxImage = document.querySelector(".parallax-image");
    const parallaxEffect = 30;

    const movementX = (event.clientX / window.innerWidth) * parallaxEffect;
    const movementY = (event.clientY / window.innerHeight) * parallaxEffect;

    parallaxImage.style.transform = `translate(${movementX}px, ${movementY}px)`;
});
