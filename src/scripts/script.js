"use strict";

let search = $('#search');
let region = $('#region');
let wrapper = $('.wrapper');
let sortRegionArr = [];
let BASE_URL = "https://restcountries.com/v2";

async function AllCountries() {
    wrapper.innerHTML = '<span class="loader ml-[50%] mt-[30px]"></span>'
    try{
        const response = await fetch(`${BASE_URL}/all`);

        const result = await response.json();
        renderCountries(result)
        searcCounries(result)
        sortRegion(result)
        
    } catch(err) {
        console.log(err);
        }
}
AllCountries();

function renderCountries(data) {
    if(data) {
        wrapper.innerHTML = "";
        data.forEach( el => {
            const card = createElement('div', 'card w-[267px] h--min-[336px] bg-white shadow-lg m-2', `
            <img src="${el.flag }" alt="">
            <div class="card__body p-6">
                <h3 class="text-xl font-bold">${el.name}</h3>
                <ul class="mt-2">
                    <li><strong>Population: </strong>${el.population}</li>
                    <li><strong>Region: </strong>${el.region}</li>
                    <li><strong>Capital: </strong>${el.capital}</li>
                </ul>
            </div>
            `)
            wrapper.append(card)
        })
    
    }

}

function searcCounries(data) {
    $('#search').addEventListener('keyup', e => {
        data.forEach(el => {
            wrapper.innerHTML = '';
            // let arrSearch = [];
            // arrSearch.push(el)
            // console.log(arrSearch);
            let filterArr = data.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
            renderCountries(filterArr)
        }
        );
        
})
}
function sortRegion(data) {
    data.forEach( el => {
        if( !sortRegionArr.includes(el.region) ) {
            sortRegionArr.push(el.region)
        }
    })

    sortRegionArr.forEach( el => {
        let option = createElement('option', 'option', el);
        $('#region').append(option);
    });
    $('#region').addEventListener('change', e => {
        wrapper.innerHTML = null;
        let sortRegionChange = data.filter(el => {
            return el.region == e.target.value
        });
        renderCountries(sortRegionChange)
    })
}