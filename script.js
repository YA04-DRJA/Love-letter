document.addEventListener('DOMContentLoaded', () => {
    const pagePath = window.location.pathname;

    // --- Password Gate Logic (for index.html) ---
    if (pagePath === '/' || pagePath.endsWith('index.html')) {
        const passwordInput = document.getElementById('passwordInput');
        const unlockButton = document.getElementById('unlockButton');
        const errorMessage = document.getElementById('errorMessage');

        // This is a simple front-end password. It can be seen in the code.
        // For a real secret, you'd use proper authentication.
        // We will make this editable in the admin panel later.
        const correctPassword = 'drja'; 

        unlockButton.addEventListener('click', () => {
            if (passwordInput.value === correctPassword) {
                // Store a token in session storage to remember the login
                sessionStorage.setItem('authenticated', 'true');
                window.location.href = 'home.html';
            } else {
                errorMessage.style.display = 'block';
                passwordInput.value = '';
            }
        });
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') unlockButton.click();
        });
    }

    // --- Authentication Check for other pages ---
    if (!pagePath.endsWith('index.html') && pagePath !== '/') {
        if (sessionStorage.getItem('authenticated') !== 'true') {
            window.location.href = 'index.html';
        }
    }
    
    // --- 27 Reasons Page Logic (for reasons.html) ---
    if (pagePath.endsWith('reasons.html')) {
        const reasonsGrid = document.getElementById('reasonsGrid');
        // In a real app, you'd fetch this from a server/CMS.
        // We will replace this with a fetch to a JSON file the CMS can edit.
        const reasons = [
            "1. The way your eyes crinkle when you genuinely smile.",
            "2. How you can make even a simple Tuesday feel special.",
            "3. Your ridiculously specific coffee order.",
            "4. The fact that you always know when I need a hug, without me saying a word.",
            "5. Your unwavering support for my wildest dreams.",
            "6. How you get completely lost in a good book.",
            "7. The sound of your laugh when you're trying not to be loud.",
            "8. Your kindness to strangers and service staff.",
            "9. You always steal the blankets, but I don't really mind.",
            "10. The way you hum when you're cooking.",
            "11. Your incredible strength and resilience when things get tough.",
            "12. How you care for your two little dogs like they're our children.",
            "13. Your passion for learning new things, whether it's painting or a new recipe.",
            "14. You make me want to be a better man.",
            "15. The little notes you sometimes leave for me to find.",
            "16. How you can be both the most elegant and the silliest person in the room.",
            "17. Your terrible-but-adorable dance moves.",
            "18. You always give the best, most thoughtful gifts.",
            "19. Your ability to see the good in everyone.",
            "20. The way you look when you're sleeping peacefully.",
            "21. You're not afraid to call me out when I'm wrong.",
            "22. The quiet comfort of just being in the same room with you.",
            "23. Your incredible, sometimes scary, intelligence.",
            "24. How you remember the small details about people.",
            "25. The way you talk about the things you're passionate about.",
            "26. You feel like home.",
            "27. Because every day with you is my new favorite day."
        ];

        reasons.forEach(reason => {
            const card = document.createElement('div');
            card.className = 'reason-card';
            const [number, text] = reason.split('. ');
            card.innerHTML = `<div class="number">${number}</div><p>${text}</p>`;
            reasonsGrid.appendChild(card);
        });
    }

    // --- December Wizard Logic (for december.html) ---
    if (pagePath.endsWith('december.html')) {
        const steps = Array.from(document.querySelectorAll('.wizard-step'));
        const form = document.querySelector('form');

        form.addEventListener('click', (e) => {
            if (e.target.matches('[data-next]')) {
                const currentStep = e.target.closest('.wizard-step');
                const nextStepId = e.target.dataset.next;
                const nextStep = document.getElementById(nextStepId);
                
                // Simple validation
                const inputs = currentStep.querySelectorAll('input[required], select[required]');
                let isValid = true;
                inputs.forEach(input => {
                    if (input.type === 'radio' && !form.querySelector(`input[name="${input.name}"]:checked`)) {
                        isValid = false;
                    }
                });

                if (isValid && nextStep) {
                    currentStep.classList.remove('active');
                    nextStep.classList.add('active');
                }
            }

            if (e.target.matches('[data-back]')) {
                const currentStep = e.target.closest('.wizard-step');
                const backStepId = e.target.dataset.back;
                const backStep = document.getElementById(backStepId);
                if (backStep) {
                    currentStep.classList.remove('active');
                    backStep.classList.add('active');
                }
            }
        });

        // Show 'other' text input when 'Other' is selected
        form.addEventListener('change', (e) => {
            if (e.target.tagName === 'SELECT' || e.target.type === 'radio') {
                const otherInput = e.target.closest('.step-card').querySelector(`input[name="${e.target.name}-other"], input[name="${e.target.name}Other"]`);
                if (otherInput) {
                    if (e.target.value.toLowerCase() === 'other') {
                        otherInput.style.display = 'block';
                        otherInput.required = true;
                    } else {
                        otherInput.style.display = 'none';
                        otherInput.required = false;
                    }
                }
            }
        });
    }
});