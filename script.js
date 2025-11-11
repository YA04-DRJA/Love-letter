document.addEventListener('DOMContentLoaded', function() {
    // --- Config ---
    const siteConfig = {
        password: 'drja',
        reasons: [ "Because of the way your smile can make any day feel like the best day of my life.", "Because you love your two little dogs with your whole heart.", "Because you see the world through the eyes of an artist.", "Because you have the strength to handle us being apart, which inspires me every day.", "Because you make even a simple Tuesday night feel special.", "Because you are the most thoughtful gift-giver.", "Because I love the sound of your laugh more than any song.", "Because you create beauty wherever you go, whether with a paintbrush or just your presence.", "Because you feel like home to me, no matter how many miles are between us.", "Because of the way you care for people when they need it most.", "Because you are ambitious and passionate about your future.", "Because you have the courage to be vulnerable and honest.", "Because every conversation with you, Because of your incredible kindness to strangers.", "Because you make me want to be the best version of myself.", "Because I love watching you get lost in your coloring and painting.", "Because you have a gentle heart and a fierce spirit.", "Because you make the holidays, especially Christmas, feel magical.", "Because you are not only my wife but my best friend.", "Because you are unapologetically you.", "Because you trust me with your heart.", "Because you have a unique way of looking at the world that fascinates me.", "Because you make me feel more loved than I ever thought possible.", "Because you are the person I want to share every success and every failure with.", "Because you have an incredible sense of style.", "Because you are the calm in my storm.", "Because you are the family I choose, every single day.", "Because my life truly began the day I met you." ]
    };

    // --- Password Page Logic ---
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const password = document.getElementById('password').value;
            if (password === siteConfig.password) { window.location.href = 'home.html'; } 
            else { alert('Incorrect password. The hint is on the card I gave you!'); }
        });
    }

    // --- Reasons Page Logic ---
    const reasonsGrid = document.getElementById('reasons-grid');
    if (reasonsGrid) {
        siteConfig.reasons.forEach((reason, index) => {
            const reasonBox = document.createElement('div');
            reasonBox.className = 'reason-box';
            const reasonBoxInner = document.createElement('div');
            reasonBoxInner.className = 'reason-box-inner';
            const reasonBoxFront = document.createElement('div');
            reasonBoxFront.className = 'reason-box-front';
            reasonBoxFront.innerHTML = `<div class="reason-number">${index + 1}</div><div>♥</div>`;
            const reasonBoxBack = document.createElement('div');
            reasonBoxBack.className = 'reason-box-back';
            reasonBoxBack.innerHTML = `<p>${reason}</p>`;
            reasonBoxInner.appendChild(reasonBoxFront);
            reasonBoxInner.appendChild(reasonBoxBack);
            reasonBox.appendChild(reasonBoxInner);
            reasonBox.addEventListener('click', () => { reasonBox.classList.toggle('is-flipped'); });
            reasonsGrid.appendChild(reasonBox);
        });
    }

    // --- December Page Wizard Logic ---
    const wizard = document.getElementById('december-wizard');
    if (wizard) {
        const steps = wizard.querySelectorAll('.wizard-step');
        let currentStep = 0;

        const goToStep = (stepIndex) => {
            if (steps[currentStep] && steps[stepIndex]) {
                steps[currentStep].classList.remove('active-step');
                steps[stepIndex].classList.add('active-step');
                currentStep = stepIndex;
            }
        };

        wizard.addEventListener('click', function(e) {
            if (e.target.matches('[data-next-step]')) {
                const nextStepIndex = parseInt(e.target.getAttribute('data-next-step'));
                goToStep(nextStepIndex);
            }
            if (e.target.matches('[data-prev-step]')) {
                const prevStepIndex = parseInt(e.target.getAttribute('data-prev-step'));
                goToStep(prevStepIndex);
            }
        });
    }
});