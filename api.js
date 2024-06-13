const displayContainer = document.getElementById('display-container');

const loadAllPhones = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=a`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    alwaysDisplayPhones(phones);
}

const alwaysDisplayPhones = (phones) => {
    displayContainer.textContent = '';
    phones.forEach(phone => {
        // console.log(phone);
        const card = document.createElement('div');
        card.classList = 'card bg-base-100 shadow-2xl ';
        card.innerHTML = `
        <figure class="p-4 border rounded-lg"><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Price: $1999</p>
            <p>There are many variations of passage of available, but the majority have suffered</p>
            
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
            </div>
        </div>    
        `
        displayContainer.appendChild(card);
    });
    toggleLoading(false);
};

const handleSearch2 = () => {
    toggleLoading(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadAllPhones(searchText);
}




const loadPhones = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    displayContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 6 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
        showAllContainer.classList.add('flex');
    } else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('phones before slice:', phones.length);

    if (!isShowAll) {
        phones = phones.slice(0, 6);
    }

    // console.log('isShowAll', isShowAll);
    // console.log('phones after slice:', phones.length);

    phones.forEach(phone => {
        // console.log(phone);
        const card = document.createElement('div');
        card.classList = 'card bg-base-100 shadow-2xl ';
        card.innerHTML = `
        <figure class="p-2 lg:p-4 border rounded-lg"><img class="text-sm" src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Price: $1999</p>
            <p>There are many variations of passage of available, but the majority have suffered</p>
            
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
            </div>
        </div>    
        `
        displayContainer.appendChild(card);
    });
    toggleLoading(false);
}



const handleShowDetails = async (id) => {
    console.log('clicked show details', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
    const phone = data.data;
    showPhoneDetails(phone,data);
}

const showPhoneDetails = (phone,data) => {
    console.log(phone);
    show_details_modal.showModal();
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
        <div class="flex justify-center items-center bg-gray-200 rounded-xl py-2 lg:py-4 ">
            <img class="rounded-xl" src="${phone.image}" alt="">
        </div>
        <h1 class="text-xl lg:text-3xl font-bold">${phone.name}</h1>
        <p class="py-2 text-sm ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
        
        <span class="font-bold text-md lg:text-lg">Specifications</span>
        <h1 class="text-sm"><span class="font-bold">Storage:</span> ${phone.mainFeatures.storage}</h1>
        <h1 class="text-sm"><span class="font-bold">Display Size:</span> ${phone.mainFeatures.displaySize}</h1>
        <h1 class="text-xs lg:text-sm"><span class="font-bold">ChipSet:</span> ${phone.mainFeatures.chipSet}</h1>
        <h1 class="text-xs lg:text-sm"><span class="font-bold">Memory:</span> ${phone.mainFeatures.memory}</h1>
        <h1 class="text-xs lg:text-sm"><span class="font-bold">Slug:</span> ${phone.slug}</h1>
        <h1 class="text-xs lg:text-sm"><span class="font-bold">Realese Date:</span> ${phone.releaseDate}</h1>
        <h1 class="text-xs lg:text-sm"><span class="font-bold">Brand:</span> ${phone.brand}</h1>
        <span class="font-bold text-sm lg:text-md">Main Features:</span>
        <ol class="list-disc pl-8">
            <li class="text-xs lg:text-sm"><span class="font-bold">Bluetooth:</span> (${data.data.others.Bluetooth})</li>
            <li class="text-xs lg:text-sm"><span class="font-bold">Sensor:</span> (${phone.mainFeatures.sensors})</li>
            <li class="text-xs lg:text-sm"><span class="font-bold">GPS:</span> (${phone.others.GPS})</li>
            <li class="text-xs lg:text-sm"><span class="font-bold">NFC:</span> (${phone.others.NFC})</li>
            <li class="text-xs lg:text-sm"><span class="font-bold">Radio:</span> (${phone.others.Radio})</li>
            <li class="text-xs lg:text-sm"><span class="font-bold">USB:</span> (${phone.others.USB})</li>
            <li class="text-xs lg:text-sm"><span class="font-bold">WLAN:</span> (${phone.others.WLAN})</li>
        </ol>
    `

}


const handleSearch = (isShowAll) => {
    toggleLoading(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, isShowAll);
}

const toggleLoading = (isLoading) => {
    const loadingSpinner = document.getElementById('loader-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}




