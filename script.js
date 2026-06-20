document.addEventListener('DOMContentLoaded', () => {
    const forgiveBtn = document.getElementById('forgiveBtn');
    const noForgiveBtn = document.getElementById('noForgiveBtn');
    const apologySection = document.getElementById('apologySection');
    const successSection = document.getElementById('successSection');
    
    forgiveBtn.addEventListener('click', function() {
        // Add a micro-animation effect
        this.classList.add('pulse');
        
        // Change text dynamically
        this.innerText = 'Apology Accepted 💖';
        this.style.background = 'var(--accent)';
        this.style.color = '#fff';
        this.style.borderColor = 'var(--accent)';
        
        // Hide the other button
        noForgiveBtn.style.display = 'none';
        
        // Switch section with smooth animation
        setTimeout(() => {
            apologySection.classList.add('fade-out');
            
            setTimeout(() => {
                apologySection.style.display = 'none';
                successSection.style.display = 'block';
                successSection.classList.add('fade-in');
                spawnBalloons(15);
            }, 500); // Wait for fade-out to complete
        }, 1000);
    });

    noForgiveBtn.addEventListener('click', function() {
        if (this.innerText === 'Please? 🥺') {
            // Attempt to close the window
            window.close();
            // Fallback for browsers that prevent scripts from closing tabs they didn't open
            document.body.innerHTML = '<div style="display:flex; justify-content:center; align-items:center; height:100vh; color:white; font-family:\'Nunito\', sans-serif; font-size:2rem;">Goodbye... 💔</div>';
            return;
        }

        this.innerText = 'Please? 🥺';
        
        // Playful shake animation
        this.style.transition = 'transform 0.1s ease';
        this.style.transform = 'translateX(-10px)';
        setTimeout(() => this.style.transform = 'translateX(10px)', 100);
        setTimeout(() => this.style.transform = 'translateX(-10px)', 200);
        setTimeout(() => this.style.transform = 'translateX(0)', 300);
        
        // Reset transition after shake
        setTimeout(() => this.style.transition = 'all 0.3s ease', 400);
    });

    const nextPageBtn = document.getElementById('nextPageBtn');
    const finalSection = document.getElementById('finalSection');

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            // Add a micro-animation effect
            this.classList.add('pulse');
            
            // Switch section with smooth animation
            setTimeout(() => {
                successSection.classList.add('fade-out');
                
                setTimeout(() => {
                    successSection.style.display = 'none';
                    finalSection.style.display = 'block';
                    finalSection.classList.add('fade-in');
                    spawnBalloons(20);
                }, 500); // Wait for fade-out to complete
            }, 300);
        });
    }

    function spawnBalloons(count) {
        const container = document.getElementById('balloonContainer');
        if (!container) return;

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const balloon = document.createElement('div');
                balloon.classList.add('balloon');
                
                const colors = ['rgba(255, 226, 226, 0.9)', 'rgba(255, 179, 198, 0.9)', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 143, 171, 0.9)'];
                balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                balloon.style.left = Math.random() * 90 + 'vw';
                const duration = Math.random() * 4 + 5; 
                balloon.style.animationDuration = duration + 's';
                
                const emoji = document.createElement('span');
                emoji.classList.add('emoji');
                emoji.innerText = '💮'; // White flower/rose
                balloon.appendChild(emoji);
                
                const popBalloon = function() {
                    if (!balloon.classList.contains('popped')) {
                        balloon.classList.add('popped');
                        setTimeout(() => balloon.remove(), 2500);
                    }
                };
                
                balloon.addEventListener('click', popBalloon);

                container.appendChild(balloon);

                // Automatically pop when it reaches roughly half the screen height
                // floatUp goes to -120vh. Half screen is ~50vh, which is ~40% of the duration.
                const popTime = duration * 1000 * (0.35 + Math.random() * 0.15);
                setTimeout(popBalloon, popTime);

            }, Math.random() * 3000); // Stagger spawn times over 3 seconds
        }
    }
});
