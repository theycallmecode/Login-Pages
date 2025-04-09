// Form input animation

document.querySelectorAll('.input-box input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentNode.querySelector('label').classList.add('active');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentNode.querySelector('label').classList.remove('active');
        }
    });
    
    // Check if input have value on page load
    if (input.value !== '') {
        input.parentNode.querySelector('label').classList.add('active');
    }
});


// 3D tilt effect - login card & signup card

document.querySelectorAll('.container').forEach(container => {
    container.addEventListener('mousemove', (e) => {

        const rect = container.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;

        const y = e.clientY - rect.top - rect.height / 2;
        
        const tiltX = -(y / rect.height) * 8;

        const tiltY = (x / rect.width) * 8;
        
        container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});


// Enhanced Page Transition with Loading Screen

document.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('href');
        
        // Start fade out animation
        document.querySelector('.page-transition').style.animation = 'none';
        document.querySelector('.page-transition').style.opacity = '1';
        
        // Store the target page in session storage
        sessionStorage.setItem('targetPage', targetPage);
        
        // Redirect to loading page after fade out
        setTimeout(() => {
            window.location.href = 'loading.html';
        }, 500);
    });
});


// Check if we're on the loading page and need to redirect

if (window.location.pathname.includes('loading.html')) {
    const targetPage = sessionStorage.getItem('targetPage') || 'login.html';
    
    // Play JARVIS sound effect
    const jarvisSound = document.getElementById('jarvisSound');
    
    // Ensure sound plays after user interaction (browser autoplay policies)
    const playSound = () => {
        jarvisSound.volume = 0.7; // Set volume to 70%
        jarvisSound.play().catch(e => console.log("Audio play failed:", e));
    };
    
    // Try to play immediately (might work if coming from user click)
    playSound();
    
    // Fallback: if sound didn't play, try again after a short delay
    setTimeout(playSound, 300);
    
    // Wait for 2 seconds (loading animation time) then redirect
    setTimeout(() => {
        // Fade out the loading page
        document.body.style.animation = 'fadeOut 0.5s ease-out forwards';
        
        // Fade out the sound
        if (jarvisSound) {
            const fadeAudio = setInterval(() => {
                if (jarvisSound.volume > 0.1) {
                    jarvisSound.volume -= 0.1;
                } else {
                    jarvisSound.pause();
                    clearInterval(fadeAudio);
                }
            }, 50);
        }
        
        // Redirect to target page after fade out
        setTimeout(() => {
            window.location.href = targetPage;
        }, 500);
    }, 2000);
}