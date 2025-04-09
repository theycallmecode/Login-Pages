const starters = {
    kanto: [
        { name: "Bulbasaur", type: "green", img: "../assets/images/bulba.png" },
        { name: "Charmander", type: "red", img: "../assets/images/charmander.png" },
        { name: "Squirtle", type: "blue", img: "../assets/images/squirtle.png" }
    ],
    johto: [
        { name: "Chikorita", type: "green", img: "../assets/images/chiko.png" },
        { name: "Cyndaquil", type: "red", img: "../assets/images/cyndaquil.png" },
        { name: "Totodile", type: "blue", img: "../assets/images/toto.png" }
    ],
    hoenn: [
        { name: "Treecko", type: "green", img: "../assets/images/treecko.png" },
        { name: "Torchic", type: "red", img: "../assets/images/torchic.png" },
        { name: "Mudkip", type: "blue", img: "../assets/images/mudkip.png" }
    ]
};

let trainerData = {};

document.querySelectorAll('.card').forEach(card => {
    const front = card.querySelector('.card-front');
    front.addEventListener('click', () => {
        card.classList.toggle('expanded');
    });
    const back = card.querySelector('.card-back');
    back.addEventListener('click', (e) => e.stopPropagation());
});

document.getElementById('trainer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    trainerData = {
        name: document.getElementById('trainer-name').value,
        email: document.getElementById('trainer-email').value,
        password: document.getElementById('trainer-password').value,
        age: document.getElementById('trainer-age').value,
        gender: document.getElementById('trainer-gender').value
    };
    document.getElementById('card1').classList.remove('expanded');
    document.getElementById('card2').classList.add('expanded');
});

document.getElementById('region-select').addEventListener('change', (e) => {
    const region = e.target.value;
    trainerData.region = region;
    const starterContainer = document.getElementById('starter-options');
    starterContainer.innerHTML = '';
    starters[region].forEach(pokemon => {
        const option = document.createElement('div');
        option.classList.add('starter-option');
        option.innerHTML = `
            <div class="starter-pokeball glow-${pokemon.type}">
                <img src="${pokemon.img}" alt="${pokemon.name}">
            </div>
            <span>${pokemon.name}</span>
        `;
        option.addEventListener('click', () => selectStarter(pokemon));
        starterContainer.appendChild(option);
    });
    document.getElementById('card2').classList.remove('expanded');
    document.getElementById('card3').classList.add('expanded');
});

function selectStarter(pokemon) {
    trainerData.starter = pokemon.name;
    trainerData.starterImg = pokemon.img;
    const queryString = new URLSearchParams(trainerData).toString();
    window.location.href = `info.html?${queryString}`;
}

document.querySelectorAll('.go-back').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        card.classList.remove('expanded');
    });
}); 