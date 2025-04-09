document.addEventListener('DOMContentLoaded', () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const trainerData = {
            name: params.get('name') || 'Unknown Trainer',
            region: params.get('region') || 'Unknown Region',
            starter: params.get('starter') || 'None Selected',
            starterImg: params.get('starterImg') || 'pokeball.jpg',
            gender: params.get('gender') || 'boy'
        };

        document.getElementById('card-name').textContent = trainerData.name;
        document.getElementById('card-region').textContent = trainerData.region;
        document.getElementById('card-starter').textContent = trainerData.starter;
        document.getElementById('trainer-pic').src = trainerData.gender === 'boy' ? '../assets/images/boy.png' : '../assets/images/girl.png';
        document.getElementById('starter-pic').src = trainerData.starterImg;

        document.getElementById('trainer-pic').onerror = () => {
            this.src = 'pokeball.jpg';
        };
        document.getElementById('starter-pic').onerror = () => {
            this.src = 'pokeball.jpg';
        };

        const regionMap = document.getElementById('region-map');
        const regionImages = {
            kanto: 'kanto_map.jpg',
            johto: 'johto_map.jpg',
            hoenn: 'hoenn_map.jpg'
        };
        regionMap.style.backgroundImage = `url('${regionImages[trainerData.region] || 'pokeball.jpg'}')`;

        const pokemonCries = {
            Bulbasaur: 'bulbasaur_cry.mp3',
            Charmander: 'charmander_cry.mp3',
            Squirtle: 'squirtle_cry.mp3',
            Chikorita: 'chikorita_cry.mp3',
            Cyndaquil: 'cyndaquil_cry.mp3',
            Totodile: 'totodile_cry.mp3',
            Treecko: 'treecko_cry.mp3',
            Torchic: 'torchic_cry.mp3',
            Mudkip: 'mudkip_cry.mp3'
        };

        const starterPic = document.getElementById('starter-pic');
        if (pokemonCries[trainerData.starter]) {
            const cryAudio = new Audio(pokemonCries[trainerData.starter]);
            starterPic.addEventListener('mouseenter', () => cryAudio.play());
            starterPic.addEventListener('mouseleave', () => {
                cryAudio.pause();
                cryAudio.currentTime = 0;
            });
        }

        document.getElementById('register-new').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    } catch (error) {
        console.error('Error loading info page:', error);
    }
});