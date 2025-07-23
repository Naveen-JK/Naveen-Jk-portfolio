// --- animateSkills function for animated progress bars ---
            function animateSkills() {
                // Animate technical skills (existing)
                document.querySelectorAll('#skills-section .skill-3d').forEach(skill => {
                    const bar = skill.querySelector('.progress-bar-3d');
                    const percent = parseInt(bar.getAttribute('data-percent'), 10);
                    const percentText = skill.querySelector('.skill-percent');
                    let current = 0;
                    bar.style.width = '0%';
                    percentText.textContent = '0%';
                    bar.classList.remove('animated'); // reset animation
                    setTimeout(() => {
                        bar.classList.add('animated');
                        const interval = setInterval(() => {
                            if (current < percent) {
                                current++;
                                bar.style.width = current + '%';
                                percentText.textContent = current + '%';
                            } else {
                                clearInterval(interval);
                            }
                        }, 12); // speed of animation
                    }, 200);
                });

                // Animate professional skills (circular)
                document.querySelectorAll('.circle-skill').forEach(circleSkill => {
                    const percent = parseInt(circleSkill.getAttribute('data-percent'), 10);
                    const circle = circleSkill.querySelector('.circle-bar');
                    const percentText = circleSkill.querySelector('.circle-percent');
                    const radius = 42;
                    const circumference = 2 * Math.PI * radius;
                    circle.style.strokeDasharray = circumference;
                    circle.style.strokeDashoffset = circumference;
                    let current = 0;
                    percentText.textContent = '0%';
                    function animateCircle() {
                        if (current <= percent) {
                            const offset = circumference - (current / 100) * circumference;
                            circle.style.strokeDashoffset = offset;
                            percentText.textContent = current + '%';
                            current++;
                            requestAnimationFrame(animateCircle);
                        } else {
                            percentText.textContent = percent + '%';
                        }
                    }
                    animateCircle();
                });
            }

            // Project slider logic
            function startProjectSlider() {
                const slides = document.querySelectorAll('.project-slide');
                let current = 0;
                slides.forEach((slide, i) => slide.classList.toggle('active', i === 0));
                setInterval(() => {
                    slides[current].classList.remove('active', 'slide-in');
                    slides[current].classList.add('slide-out');
                    current = (current + 1) % slides.length;
                    slides[current].classList.remove('slide-out');
                    slides[current].classList.add('active', 'slide-in');
                    // Remove slide-in from previous after animation
                    setTimeout(() => {
                        slides.forEach((slide, i) => {
                            if (i !== current) slide.classList.remove('slide-in');
                        });
                    }, 600);
                }, 2500);
            }

            document.addEventListener('DOMContentLoaded', function() {
                // 3D Navbar Active State (Desktop)
                document.querySelectorAll('.custom-navbar ul li button').forEach(btn => {
                    btn.addEventListener('click', function() {
                        document.querySelectorAll('.custom-navbar ul li').forEach(li => li.classList.remove('active'));
                        this.parentElement.classList.add('active');
                        showSection(this.dataset.section);
                        window.scrollTo({ top: 0, behavior: 'smooth' }); // Always scroll to top on nav click
                    });
                });

                // 3D Card Mouse Move Effect
                document.querySelectorAll('.portfolio-card').forEach(card => {
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = ((y - centerY) / centerY) * 10;
                        const rotateY = ((x - centerX) / centerX) * 10;
                        card.style.transform = `rotateY(${rotateY}deg) rotateX(${-rotateX}deg) scale(1.05)`;
                    });
                    card.addEventListener('mouseleave', () => {
                        card.style.transform = '';
                    });
                });

                // Mobile Navbar Active State & Auto Close
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        document.querySelectorAll('.navbar-nav .nav-link').forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                        showSection(this.dataset.section);
                        // Close the navbar collapse on click (for Bootstrap 5)
                        var navbarCollapse = document.getElementById('mobileNavbar');
                        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                            var collapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                            collapse.hide();
                        }
                        window.scrollTo({ top: 0, behavior: 'smooth' }); // Always scroll to top on nav click
                    });
                });

                // Function to trigger the blink effect
                function triggerHomeImageBlink(duration) {
                    var container = document.querySelector('.home-img-3d');
                    var img = container ? container.querySelector('img') : null;
                    if (container && img) {
                        img.style.visibility = 'hidden'; // Always hide image before blink
                        container.classList.add('blinking');
                        setTimeout(function() {
                            container.classList.remove('blinking');
                            img.style.visibility = 'visible'; // Show image after blink
                        }, duration);
                    }
                }

                // Section show/hide logic with 3D animation
                function showSection(section) {
                    // Hide all sections
                    document.getElementById('home-section').style.display = 'none';
                    document.getElementById('about-section').style.display = 'none';
                    document.getElementById('services-section').style.display = 'none';
                    document.getElementById('skills-section').style.display = 'none';
                    document.getElementById('project-section').style.display = 'none';
                    document.getElementById('contact-section').style.display = 'none';

                    // Remove 3D animation classes
                    document.getElementById('home-section').classList.remove('show-home-animate');
                    document.getElementById('about-section').classList.remove('show-section-animate');
                    document.getElementById('services-section').classList.remove('show-section-animate');
                    document.getElementById('skills-section').classList.remove('show-section-animate');
                    document.getElementById('project-section').classList.remove('show-section-animate');
                    document.getElementById('contact-section').classList.remove('show-section-animate');

                    // Show the selected section with animation
                    if (section === 'home') {
                        let home = document.getElementById('home-section');
                        home.style.display = 'flex';
                        setTimeout(() => { home.classList.add('show-home-animate'); }, 10);
                        triggerHomeImageBlink(2000);
                    } else if (section === 'about') {
                        let about = document.getElementById('about-section');
                        about.style.display = 'flex';
                        setTimeout(() => { about.classList.add('show-section-animate'); }, 10);
                    } else if (section === 'services') {
                        let services = document.getElementById('services-section');
                        services.style.display = 'flex';
                        setTimeout(() => { services.classList.add('show-section-animate'); }, 10);
                    } else if (section === 'skills') {
                        let skills = document.getElementById('skills-section');
                        skills.style.display = 'flex';
                        setTimeout(() => { 
                            skills.classList.add('show-section-animate'); 
                            animateSkills(); 
                        }, 10);
                    } else if (section === 'project') {
                        let project = document.getElementById('project-section');
                        project.style.display = 'block';
                        setTimeout(() => { project.classList.add('show-section-animate'); }, 10);
                        startProjectSlider();
                    } else if (section === 'contact') {
                        let contact = document.getElementById('contact-section');
                        contact.style.display = 'block';
                        setTimeout(() => { contact.classList.add('show-section-animate'); }, 10);
                    }
                }

                // On load, show only home section
                showSection('home');
            });