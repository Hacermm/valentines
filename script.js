// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    const step5 = document.getElementById('step5');

    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const clickMeBtn = document.getElementById('clickMeBtn');
    const nextBtn1 = document.getElementById('nextBtn1');
    const nextBtn2 = document.getElementById('nextBtn2');
    const foodItems = document.querySelectorAll('.food-item');

    let selectedFood = 'delicious food';

    // Create floating hearts in background
    function createFloatingHearts() {
        const container = document.getElementById('floatingHearts');
        const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '💞'];

        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            container.appendChild(heart);
        }
    }

    // Make the NO button run away from mouse
    function makeNoButtonRunAway() {
        let moveCount = 0;

        function escapeButton(e) {
            moveCount++;

            // Get the buttons container
            const buttonsContainer = noBtn.parentElement;
            const containerRect = buttonsContainer.getBoundingClientRect();
            const btnRect = noBtn.getBoundingClientRect();

            // Calculate movement range (stay within card)
            const rangeX = 150; // pixels to move left/right
            const rangeY = 100; // pixels to move up/down

            // Random position but limited
            let randomX = (Math.random() - 0.5) * rangeX * 2;
            let randomY = (Math.random() - 0.5) * rangeY;

            // Apply transform with rotation
            const rotation = (Math.random() - 0.5) * 20;
            noBtn.style.position = 'relative';
            noBtn.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rotation}deg)`;
            noBtn.style.transition = 'transform 0.15s ease-out';
            noBtn.style.zIndex = '100';

            // Make the button change text after many attempts (funny effect)
            if (moveCount > 5 && moveCount <= 10) {
                noBtn.textContent = 'No? 😢';
            } else if (moveCount > 10) {
                noBtn.textContent = 'Please? 🥺';
            }
        }

        // Event listeners
        noBtn.addEventListener('mouseenter', escapeButton);

        // Prevent clicking the No button
        noBtn.addEventListener('click', function (e) {
            e.preventDefault();
            escapeButton(e);
            return false;
        });
    }

    // Create confetti effect
    function createConfetti() {
        const colors = ['#ff6b9d', '#e91e63', '#ff4757', '#ffd700', '#ff9a9e', '#fecfef'];

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = confetti.style.width;
                document.body.appendChild(confetti);

                // Remove after animation
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }

    // Create hearts in final step
    function createFinalHearts() {
        const container = document.getElementById('finalHearts');
        const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓'];

        // Create 30 hearts that float up from bottom
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.className = 'final-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px'; // Start from bottom
            heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
            heart.style.animationDelay = Math.random() * 4 + 's';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            container.appendChild(heart);
        }
    }

    // Transition between steps
    function transitionTo(hideElement, showElement) {
        hideElement.style.opacity = '0';
        hideElement.style.transform = 'scale(0.8)';
        hideElement.style.transition = 'all 0.4s ease';

        setTimeout(() => {
            hideElement.classList.add('hidden');
            hideElement.style.opacity = '';
            hideElement.style.transform = '';
            showElement.classList.remove('hidden');
        }, 400);
    }

    // Event Listeners
    yesBtn.addEventListener('click', function () {
        console.log('Yes clicked!');
        createConfetti();
        setTimeout(() => {
            transitionTo(step1, step2);
        }, 500);
    });

    clickMeBtn.addEventListener('click', function () {
        console.log('Click Me clicked!');
        transitionTo(step2, step3);
    });

    nextBtn1.addEventListener('click', function () {
        console.log('Next 1 clicked!');
        transitionTo(step3, step4);
    });

    // Food item selection
    foodItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove selected class from all
            foodItems.forEach(f => f.classList.remove('selected'));
            // Add to clicked item
            this.classList.add('selected');
            // Store selected food
            selectedFood = this.getAttribute('data-food');
        });
    });

    nextBtn2.addEventListener('click', function () {
        console.log('Next 2 clicked!');
        // Update the selected food text
        document.getElementById('selectedFood').textContent = selectedFood.charAt(0).toUpperCase() + selectedFood.slice(1);

        transitionTo(step4, step5);

        // Create final hearts after transition
        setTimeout(() => {
            createFinalHearts();
            createConfetti();
        }, 500);
    });

    // Initialize
    createFloatingHearts();
    makeNoButtonRunAway();

    console.log('Valentine page initialized!');
    console.log('yesBtn:', yesBtn);
    console.log('noBtn:', noBtn);
});
