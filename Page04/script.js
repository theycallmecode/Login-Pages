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

