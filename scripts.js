            document.addEventListener('DOMContentLoaded', function() {
                // --- 3D Hero Animation ---
                if (window.THREE) {
                    const container = document.getElementById('hero-3d-container');
                    if (container) {
                        const scene = new THREE.Scene();
                        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
                        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                        renderer.setSize(container.clientWidth, container.clientHeight);
                        container.appendChild(renderer.domElement);

                        const group = new THREE.Group();
                        scene.add(group);

                        const loader = new THREE.TextureLoader();
                        const icons = [
                            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
                            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
                            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
                            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
                            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
                            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
                            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
                           'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
                            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
                            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
                            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg'
                        ];

                        const radius = 2.5;
                        const iconMeshes = [];

                        icons.forEach((url, i) => {
                            loader.load(url, (texture) => {
                                const material = new THREE.MeshStandardMaterial({
                                    map: texture,
                                    transparent: true,
                                    roughness: 0.8,
                                    metalness: 0.1
                                });
                                const geometry = new THREE.PlaneGeometry(0.8, 0.8);
                                const mesh = new THREE.Mesh(geometry, material);
                                
                                const phi = Math.acos(-1 + (2 * i) / (icons.length -1));
                                const theta = Math.sqrt(icons.length * Math.PI) * phi;
                                
                                mesh.position.setFromSphericalCoords(radius, phi, theta);
                                mesh.lookAt(camera.position);

                                group.add(mesh);
                                iconMeshes.push(mesh);
                            });
                        });

                        // --- Lighting ---
                        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
                        scene.add(ambientLight);
                        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
                        directionalLight.position.set(5, 5, 10);
                        scene.add(directionalLight);
                        
                        camera.position.z = 6;

                        // --- Animation & Interaction ---
                        const raycaster = new THREE.Raycaster();
                        const mouse = new THREE.Vector2();
                        let intersected;

                        function onMouseMove(event) {
                            const rect = renderer.domElement.getBoundingClientRect();
                            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
                        }
                        
                        window.addEventListener('mousemove', onMouseMove);

                        function animate() {
                            requestAnimationFrame(animate);
                            
                            group.rotation.y += 0.002;
                            group.rotation.x += 0.001;

                            // Raycasting for hover effect
                            raycaster.setFromCamera(mouse, camera);
                            const intersects = raycaster.intersectObjects(iconMeshes);

                            iconMeshes.forEach(mesh => {
                                mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
                            });

                            if (intersects.length > 0) {
                                const firstIntersected = intersects[0].object;
                                firstIntersected.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
                            }

                            // Make icons always face the camera
                            iconMeshes.forEach(mesh => {
                                mesh.lookAt(camera.position);
                            });

                            renderer.render(scene, camera);
                        }
                        animate();

                        window.addEventListener('resize', () => {
                            camera.aspect = container.clientWidth / container.clientHeight;
                            camera.updateProjectionMatrix();
                            renderer.setSize(container.clientWidth, container.clientHeight);
                        });
                    }
                }

                // --- Project Data ---
                const projects = [
                    {
                        title: 'Driver Drowsiness Detection System',
                        image: 'https://i.postimg.cc/qvVHXMQG/driver.png',
                        description: 'A real-time monitoring system that detects driver drowsiness using face and eye tracking. It triggers sound alerts when drowsiness is detected and maintains a log of such events to enhance road safety.',
                        tags: ['OpenCV', 'Flask', 'dlib','HTML/CSS','SQLite'],
                        githubLink: 'https://github.com/parshv09/Driver-Drowsiness-Detection-with-real-time-monitoring-and-historical-tracking'
                    },
                    {
                        title: 'Food Waste Reducer',
                        image: 'https://i.postimg.cc/t43QrQMG/food.png',
                        description: 'A Django-based web application that helps users manage their kitchen inventory and reduce food waste by suggesting recipes based on available ingredients. It sends daily expiry alerts via email and allows users to save their favorite recipes in a dashboard.',
                        tags: ['Django','HTML/CSS', 'JavaScript', 'MySQL'],
                        githubLink: 'https://github.com/parshv09/FoodWasteReducer'
                    },
                    {
                        title: 'AI Powered Civic Policy Feedback System',
                        image: 'https://i.postimg.cc/mrS4rfYy/civik.png',
                        description: 'Civic engagement platform using React and Django that allows citizens to provide feedback on government policies with AI-powered sentiment analysis.',
                        tags: ['Django Rest Framework', 'ReactJS', 'PostgreSQL'],
                        githubLink: 'https://github.com/parshv09/voice4change'
                    }
                ];

                // --- Populate Projects ---
                const projectGrid = document.getElementById('project-grid');
                projects.forEach((project, index) => {
                    const card = document.createElement('div');
                    card.className = 'bg-slate-800 rounded-md overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-400/10';
                    card.innerHTML = `
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <i class="ri-folder-4-line text-4xl highlight-text"></i>
                                <div class="space-x-2">
                                    <a href="${project.githubLink}" target="_blank" class="text-slate-400 hover:text-cyan-300 transition-colors"><i class="ri-github-fill text-xl"></i></a>
                                </div>
                            </div>
                            <h3 class="text-xl font-bold text-gray-100 mb-2 group-hover:text-cyan-300 transition-colors">${project.title}</h3>
                            <p class="text-slate-400 text-sm mb-4">${project.description.substring(0, 100)}...</p>
                            <div class="flex flex-wrap gap-2 text-xs text-slate-400">
                                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                            </div>
                            <button class="view-details-btn text-sm highlight-text mt-4" data-index="${index}">View Details &rarr;</button>
                        </div>
                    `;
                    projectGrid.appendChild(card);
                });

                // --- Mobile Menu ---
                const mobileMenuButton = document.getElementById('mobile-menu-button');
                const closeMenuButton = document.getElementById('close-menu-button');
                const mobileMenu = document.getElementById('mobile-menu');
                const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
                
                function openMenu() { mobileMenu.classList.add('open'); }
                function closeMenu() { mobileMenu.classList.remove('open'); }

                mobileMenuButton.addEventListener('click', openMenu);
                closeMenuButton.addEventListener('click', closeMenu);
                mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));

                // --- Scroll Animations ---
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            if (entry.target.id === 'skills') {
                                animateSkillBars();
                            }
                        }
                    });
                }, { threshold: 0.1 });
                document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
                observer.observe(document.getElementById('skills'));

                function animateSkillBars() {
                    document.querySelectorAll('.skill-item').forEach(item => {
                        const percentage = item.getAttribute('data-percent');
                        const bar = item.querySelector('.skill-bar-inner');
                        bar.style.width = percentage + '%';
                    });
                }

               // --- Contact Form ---
                const contactForm = document.getElementById('contact-form');
                const formStatus = document.getElementById('form-status');

                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const formData = new FormData(contactForm);
                    formStatus.textContent = 'Sending...';
                    formStatus.style.color = 'var(--text-slate)';

                    fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    }).then(response => {
                        if (response.ok) {
                            formStatus.textContent = 'Message sent successfully!';
                            formStatus.style.color = 'var(--highlight)';
                            contactForm.reset();
                            setTimeout(() => {
                                formStatus.textContent = '';
                            }, 5000);
                        } else {
                            response.json().then(data => {
                                if (Object.hasOwn(data, 'errors')) {
                                    formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                                } else {
                                    formStatus.textContent = 'Oops! There was a problem submitting your form';
                                }
                                formStatus.style.color = '#f87171'; // Red color for error
                            })
                        }
                    }).catch(error => {
                        formStatus.textContent = 'Oops! There was a problem submitting your form';
                        formStatus.style.color = '#f87171'; // Red color for error
                    });
                });

                // --- Scroll to Top Button ---
                const scrollToTopBtn = document.getElementById('scroll-to-top');
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 300) {
                        scrollToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
                    } else {
                        scrollToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
                    }
                });
                scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
                
                // --- Project Modal ---
                const modal = document.getElementById('project-modal');
                const modalContent = document.getElementById('modal-content');
                const closeModalBtn = document.getElementById('close-modal-button');
                
                document.querySelectorAll('.view-details-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const project = projects[btn.dataset.index];
                        document.getElementById('modal-image').src = project.image;
                        document.getElementById('modal-title').textContent = project.title;
                        document.getElementById('modal-description').textContent = project.description;
                        
                        const tagsContainer = document.getElementById('modal-tags');
                        tagsContainer.innerHTML = project.tags.map(tag => `<span class="bg-slate-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">${tag}</span>`).join('');
                        
                        const linksContainer = document.getElementById('modal-links');
                        linksContainer.innerHTML = `
                            <a href="${project.githubLink}" target="_blank" class="px-4 py-2 border border-cyan-300 text-cyan-300 rounded-md hover:bg-cyan-300/10 transition-colors">View Code</a>
                        `;
                        
                        modal.classList.remove('opacity-0', 'invisible');
                        modalContent.classList.remove('scale-95');
                    });
                });

                function closeModal() {
                    modal.classList.add('opacity-0', 'invisible');
                    modalContent.classList.add('scale-95');
                }

                closeModalBtn.addEventListener('click', closeModal);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeModal();
                });
            });