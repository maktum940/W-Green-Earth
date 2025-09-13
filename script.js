//-------------- categories
const categoryContainer = document.getElementById("categories");
const loadCategory = () => {
    const url = "https://openapi.programming-hero.com/api/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => {

            // console.log(data.categories);
            data.categories.forEach(category => {
                const bt = document.createElement("button");
                bt.innerHTML = `
                <button id="categories-${category.id}" class="rounded-[4px] hover:bg-[#CFF0DC] p-[8px] w-[250px] text-start">${category.category_name}</button>
                `
                // console.log(category.category_name);
                categoryContainer.appendChild(bt);

                const btn = document.getElementById(`categories-${category.id}`);
                btn.addEventListener("click", () => {
                    loadCardsWithCategoryId(category.id);
                });
            });
        })
}


//-------------- cards
const cardContainer = document.getElementById("cardContainer");

//-------------- category card
const loadCardsWithCategoryId = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then(res => res.json())
        .then(data => cardDisplay(data.plants))
}
//-------------- all card
const loadTreeCards = () => {
    const url = 'https://openapi.programming-hero.com/api/plants'
    fetch(url)
        .then(res => res.json())
        .then(data => {
            cardDisplay(data.plants)
        })
}
//-------------- default view
loadCategory();
loadTreeCards();
const allTree = document.getElementById("allTree");
allTree.addEventListener("click", loadTreeCards);
//-------------- modal
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

const openModal = (plant) => {
    modalContent.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${plant.name}</h2>
        <img class="w-full h-64 object-cover rounded mb-4" src="${plant.image}"" />
        <p class="mb-2"><strong>Category:</strong> ${plant.category}</p>
        <p class="mb-2"><strong>Price:</strong> ৳${plant.price}</p>
        <p><strong>Description:</strong> ${plant.description}</p>
    `;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}
const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}
modalClose.addEventListener("click", closeModal);


//-------------- functions

const cardDisplay = plants => {
    plants.forEach(plant => {
        cardContainer.innerHTML = "";
        // console.log(plant.name);
        plants.forEach(plant => {
            const card = document.createElement("div");
            card.classList.add("rounded-[8px]", "bg-white", "h-fit", "p-[16px]");
            card.innerHTML = `
                            <img class="w-full h-50 object-cover mb-[12px] rounded-[8px]" src="${plant.image}" alt="">
                            <div class="">
                                <h1>${plant.name}</h1>
                                <p class="text-gray-500 text-sm my-[8px]">${plant.description}</p>
                                <div class="flex justify-between">
                                    <p class="bg-[#DCFCE7] text-[#15803D] px-[12px] py-[4px] rounded-[400px]">${plant.category}</p>
                                    <p>৳<span>${plant.price}</span></p>
                                </div>
                                <div
                                    class="text-lg text-center bg-[#15803D] text-white px-[20px] py-[12px] rounded-[999px] mt-[12px]">
                                    <button>Add to Cart</button>
                                </div>
                            </div>
                    `
            const treeName = card.querySelector("h1");
            treeName.addEventListener("click", () => openModal(plant));
            cardContainer.appendChild(card);
        });
    });
}