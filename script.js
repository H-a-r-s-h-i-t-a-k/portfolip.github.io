const portfolioData = {
    name: "Harshita", // Changed placeholder
    title: "Full Stack Developer | App Developer | AI Engineer", // Changed placeholder
    bio: "I'm a passionate and detail-oriented Software Developer/Engineer with a strong foundation in computer science and hands-on experience building full-stack applications. I specialize in creating efficient, scalable, and user-focused solutions using modern technologies. From developing dynamic web apps to designing backend systems and working with databases, I enjoy tackling complex problems and transforming ideas into functional products.", // Changed placeholder
    profileImage: "harshita.png", // Optional: replace with your image URL, changed placeholder colors
    contact: {
        email: "dyashita1508@gmail.com", // Changed placeholder
        linkedin: "https://www.linkedin.com/in/dharshita/", // Replace with your LinkedIn URL
        github: "https://github.com/H-a-r-s-h-i-t-a-k/" // Replace with your GitHub URL
    },
    projects: [
        {
            title: "FoodieBookin", // Changed placeholder
            description: `FoodieBookin app is a comprehensive solution for individual entrepreneurs and startups in the food industry.
            Its key features include user authentication, browsing food listings, managing carts, and seamless payment processing.
            It integrates Razorpay for payments and Firebase Authentication for user management, ensuring a smooth user experience.`, // Changed placeholder
            imageUrl: "p1.png", // Optional: Replace with project image
            liveUrl: "#", // Link to live demo
            repoUrl: "#" // Link to GitHub repository
        },
        {
            title: "The To-Do App", // Changed placeholder
            description: "The To-Do App using Flutter helps users manage daily tasks efficiently. It allows adding, editing, deleting, and completing tasks with a simple interface. Built with Dart, it supports offline storage, reminders, and dark mode. This app improves productivity and runs smoothly on both Android and iOS devices.", // Changed placeholder
            imageUrl:"p2.png", // Optional: Replace with project image
            liveUrl: "#",
            repoUrl: "#"
        },
        {
            title: "Personal Expense Tracker App", // Changed placeholder
            description: "The Personal Expense Tracker App built using Flutter helps users monitor and manage their daily spending. It allows users to add, edit, and delete expenses, categorize them, and view spending summaries through charts. With a clean UI and local storage support, it runs smoothly on both Android and iOS platforms.", // Changed placeholder
            imageUrl: "p3.png", // Optional: Replace with project image
            liveUrl: "#",
            repoUrl: "#"
        }
    ]
};
        
        
        
        
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            const heroSection = document.getElementById('hero');
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1; // Smaller particles
                this.speedX = Math.random() * 1 - 0.5; // Slower movement
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5 + 0.2; // More subtle
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Boundary check (wrap around)
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                 if (this.x < -this.size || this.x > canvas.width + this.size || this.y < -this.size || this.y > canvas.height + this.size) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                 }
            }
            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // White particles
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            let numberOfParticles = Math.floor(canvas.width / 20); 
             if (numberOfParticles > 150) numberOfParticles = 150; 
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        // --- Scroll Animations ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
      
            });
        }, { threshold: 0.1 }); 


        const scrollToTopBtn = document.getElementById('scrollToTopBtn');

        function checkScroll() {
            if (window.pageYOffset > 300) { 
                if (!scrollToTopBtn.classList.contains('show')) {
                    scrollToTopBtn.classList.add('show');
                    scrollToTopBtn.style.display = 'flex';
                }
            } else {
                if (scrollToTopBtn.classList.contains('show')) {
                    scrollToTopBtn.classList.remove('show');

                     scrollToTopBtn.style.display = 'none';
                }
            }
        }

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });


        document.addEventListener('DOMContentLoaded', () => {
            const currentYear = new Date().getFullYear();

            document.getElementById('nav-brand').textContent = portfolioData.name.split(' ')[0]; 

            // --- Populate Hero Section ---
            const heroImage = document.getElementById('hero-image');
            if (portfolioData.profileImage) {
                heroImage.src = portfolioData.profileImage;
                heroImage.onerror = () => { // Fallback if image fails to load
                    heroImage.src = 'https://placehold.co/150x150/e0e7ff/4338ca?text=Me';
                    console.warn(`Failed to load profile image: ${portfolioData.profileImage}`);
                };
            }
            document.getElementById('hero-name').textContent = portfolioData.name;
            document.getElementById('hero-title').textContent = portfolioData.title;

            // --- Populate About Section ---
            document.getElementById('about-bio').textContent = portfolioData.bio;

            // --- Populate Projects Section ---
            const projectsGrid = document.getElementById('projects-grid');
            portfolioData.projects.forEach(project => {
                const card = document.createElement('div');
                // Added fade-in class for individual card animation
                card.className = 'project-card bg-white rounded-lg shadow-lg overflow-hidden fade-in';

                const img = document.createElement('img');
                img.src = project.imageUrl || 'https://placehold.co/600x400/cbd5e1/475569?text=Project';
                img.alt = `${project.title} Screenshot`;
                img.className = 'w-full h-52 object-cover'; // Increased height
                img.onerror = (e) => {
                    e.target.src = 'https://placehold.co/600x400/cbd5e1/475569?text=Image+Error';
                    console.warn(`Failed to load project image: ${project.imageUrl}`);
                };

                const contentDiv = document.createElement('div');
                contentDiv.className = 'p-6';

                const title = document.createElement('h3');
                title.className = 'text-2xl font-semibold mb-3 text-gray-900'; // Darker text
                title.textContent = project.title;

                const description = document.createElement('p');
                description.className = 'text-gray-600 mb-5 font-sans'; // Use Inter for description
                description.textContent = project.description;

                const linksDiv = document.createElement('div');
                linksDiv.className = 'flex space-x-4 items-center'; // Align items center

                // Live Demo Link
                if (project.liveUrl && project.liveUrl !== '#') {
                    const liveLink = document.createElement('a');
                    liveLink.href = project.liveUrl;
                    liveLink.target = '_blank';
                    liveLink.rel = 'noopener noreferrer';
                    liveLink.className = 'text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-300 flex items-center';
                    liveLink.innerHTML = '<i class="fas fa-external-link-alt fa-fw mr-1.5"></i>Live Demo'; // Added fa-fw
                    linksDiv.appendChild(liveLink);
                }

                // Repo Link
                if (project.repoUrl && project.repoUrl !== '#') {
                    const repoLink = document.createElement('a');
                    repoLink.href = project.repoUrl;
                    repoLink.target = '_blank';
                    repoLink.rel = 'noopener noreferrer';
                    repoLink.className = 'text-sm font-medium text-gray-700 hover:text-black transition duration-300 flex items-center';
                    repoLink.innerHTML = '<i class="fab fa-github fa-fw mr-1.5"></i>Code'; // Added fa-fw
                    linksDiv.appendChild(repoLink);
                }

                contentDiv.appendChild(title);
                contentDiv.appendChild(description);
                contentDiv.appendChild(linksDiv);
                card.appendChild(img);
                card.appendChild(contentDiv);
                projectsGrid.appendChild(card);
                 observer.observe(card); 
            });

            const emailLink = document.getElementById('contact-email');
            emailLink.href = `mailto:${portfolioData.contact.email}`;
            document.getElementById('contact-email-text').textContent = portfolioData.contact.email;

            const linkedinLink = document.getElementById('contact-linkedin');
            if (portfolioData.contact.linkedin) {
                linkedinLink.href = portfolioData.contact.linkedin;
            } else {
                linkedinLink.style.display = 'none';
            }

            const githubLink = document.getElementById('contact-github');
            if (portfolioData.contact.github) {
                githubLink.href = portfolioData.contact.github;
            } else {
                githubLink.style.display = 'none';
            }

            document.getElementById('footer-year').textContent = currentYear;
            document.getElementById('footer-name').textContent = portfolioData.name;


            resizeCanvas();
            initParticles();
            animateParticles();
            window.addEventListener('resize', () => {
                resizeCanvas();
                initParticles();
            });

            document.querySelectorAll('section > .container, #projects-grid > .project-card').forEach(el => {
                 observer.observe(el);
            });

             observer.observe(document.getElementById('about').querySelector('div'));
             observer.observe(document.getElementById('projects').querySelector('h2'));
             observer.observe(document.getElementById('contact').querySelector('div'));



            window.addEventListener('scroll', checkScroll);
            checkScroll(); 

        });