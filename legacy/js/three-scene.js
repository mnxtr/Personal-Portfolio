/**
 * Three.js 3D Scene Manager
 * Portfolio of Mohammad Mansib Newaz
 * 
 * Features:
 * - Hero background particle field with geometric shapes
 * - Avatar 3D rotating ring/torus
 * - Mouse parallax effects
 * - Mobile performance optimizations
 */

// Import Three.js from CDN (loaded via importmap in HTML)
import * as THREE from 'three';

// ============================================
// Configuration
// ============================================
const CONFIG = {
  // Performance settings
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  maxParticles: 800,
  mobileMaxParticles: 300,
  
  // Colors matching the design system
  colors: {
    primary: 0x6366F1,
    primaryLight: 0x818CF8,
    accent: 0x8B5CF6,
    accentLight: 0xA78BFA,
    secondary: 0xEC4899,
    darkBg: 0x0F172A,
  },
  
  // Animation settings
  particleSpeed: 0.0003,
  rotationSpeed: 0.001,
  mouseInfluence: 0.00008,
  parallaxIntensity: 0.02,
};

// ============================================
// Utility Functions
// ============================================
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// ============================================
// Hero Background Scene
// ============================================
class HeroScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.geometricShapes = [];
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.clock = new THREE.Clock();
    this.isDestroyed = false;
    
    this.init();
  }
  
  init() {
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: !CONFIG.isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, CONFIG.isMobile ? 1.5 : 2));
    this.renderer.setClearColor(0x000000, 0);
    
    this.container.appendChild(this.renderer.domElement);
    
    // Create scene elements
    this.createParticles();
    this.createGeometricShapes();
    
    // Events
    this.bindEvents();
    
    // Start animation
    this.animate();
  }
  
  createParticles() {
    const particleCount = CONFIG.isMobile ? CONFIG.mobileMaxParticles : CONFIG.maxParticles;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const colorPalette = [
      new THREE.Color(CONFIG.colors.primary),
      new THREE.Color(CONFIG.colors.accent),
      new THREE.Color(CONFIG.colors.secondary),
      new THREE.Color(CONFIG.colors.primaryLight),
      new THREE.Color(CONFIG.colors.accentLight),
    ];
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Spread particles in a sphere
      const radius = randomRange(15, 50);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 20;
      
      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Random sizes
      sizes[i] = randomRange(0.5, 2.5);
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Custom shader material for particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: this.renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Subtle floating animation
          pos.y += sin(time * 0.5 + position.x * 0.1) * 0.5;
          pos.x += cos(time * 0.3 + position.z * 0.1) * 0.3;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Circular particle with soft edge
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          alpha *= 0.6; // Overall opacity
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }
  
  createGeometricShapes() {
    const shapes = [];
    
    // Create floating geometric meshes
    const geometries = [
      new THREE.IcosahedronGeometry(2, 0),
      new THREE.OctahedronGeometry(1.5, 0),
      new THREE.TetrahedronGeometry(1.8, 0),
      new THREE.TorusGeometry(1.5, 0.4, 8, 24),
      new THREE.TorusKnotGeometry(1, 0.3, 64, 8, 2, 3),
    ];
    
    const colors = [CONFIG.colors.primary, CONFIG.colors.accent, CONFIG.colors.secondary];
    const shapeCount = CONFIG.isMobile ? 3 : 6;
    
    for (let i = 0; i < shapeCount; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      // Random position
      mesh.position.set(
        randomRange(-25, 25),
        randomRange(-15, 15),
        randomRange(-30, -5)
      );
      
      // Random rotation speed
      mesh.userData.rotationSpeed = {
        x: randomRange(0.001, 0.005),
        y: randomRange(0.001, 0.005),
        z: randomRange(0.0005, 0.002),
      };
      
      // Random float parameters
      mesh.userData.floatParams = {
        amplitude: randomRange(0.5, 1.5),
        speed: randomRange(0.3, 0.8),
        offset: Math.random() * Math.PI * 2,
      };
      mesh.userData.initialY = mesh.position.y;
      
      this.scene.add(mesh);
      shapes.push(mesh);
    }
    
    this.geometricShapes = shapes;
  }
  
  bindEvents() {
    // Mouse move for parallax
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    // Resize
    window.addEventListener('resize', () => this.onResize());
    
    // Visibility change - pause when tab not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.clock.stop();
      } else {
        this.clock.start();
      }
    });
  }
  
  onResize() {
    if (this.isDestroyed) return;
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  animate() {
    if (this.isDestroyed) return;
    
    requestAnimationFrame(() => this.animate());
    
    const elapsed = this.clock.getElapsedTime();
    
    // Smooth mouse following
    this.mouse.x = lerp(this.mouse.x, this.mouse.targetX, 0.05);
    this.mouse.y = lerp(this.mouse.y, this.mouse.targetY, 0.05);
    
    // Update particle shader time
    if (this.particles) {
      this.particles.material.uniforms.time.value = elapsed;
      
      // Rotate particles based on mouse
      this.particles.rotation.y = this.mouse.x * CONFIG.parallaxIntensity;
      this.particles.rotation.x = this.mouse.y * CONFIG.parallaxIntensity;
    }
    
    // Animate geometric shapes
    this.geometricShapes.forEach((shape) => {
      const { rotationSpeed, floatParams, initialY } = shape.userData;
      
      // Rotation
      shape.rotation.x += rotationSpeed.x;
      shape.rotation.y += rotationSpeed.y;
      shape.rotation.z += rotationSpeed.z;
      
      // Floating animation
      shape.position.y = initialY + Math.sin(elapsed * floatParams.speed + floatParams.offset) * floatParams.amplitude;
      
      // Mouse parallax on shapes
      shape.position.x += (this.mouse.x * 0.5 - shape.position.x * 0.01) * 0.02;
    });
    
    // Camera subtle movement
    this.camera.position.x = this.mouse.x * 2;
    this.camera.position.y = -this.mouse.y * 1.5;
    this.camera.lookAt(0, 0, 0);
    
    this.renderer.render(this.scene, this.camera);
  }
  
  destroy() {
    this.isDestroyed = true;
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// ============================================
// Avatar 3D Ring
// ============================================
class AvatarRing {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.rings = [];
    this.mouse = { x: 0, y: 0 };
    this.clock = new THREE.Clock();
    this.isDestroyed = false;
    
    this.init();
  }
  
  init() {
    const size = this.container.offsetWidth || 300;
    
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    this.camera.position.z = 5;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(size, size);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    
    this.container.appendChild(this.renderer.domElement);
    
    // Create rings
    this.createRings();
    
    // Events
    this.bindEvents();
    
    // Animate
    this.animate();
  }
  
  createRings() {
    const colors = [CONFIG.colors.primary, CONFIG.colors.accent, CONFIG.colors.secondary];
    
    // Create multiple orbital rings
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.TorusGeometry(1.8 + i * 0.3, 0.02, 16, 100);
      const material = new THREE.MeshBasicMaterial({
        color: colors[i],
        transparent: true,
        opacity: 0.6 - i * 0.15,
      });
      
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2 + (i * 0.3);
      ring.rotation.y = i * 0.5;
      
      ring.userData.rotationSpeed = {
        x: 0.003 + i * 0.001,
        y: 0.005 - i * 0.001,
        z: 0.002,
      };
      ring.userData.baseRotation = { x: ring.rotation.x, y: ring.rotation.y };
      
      this.scene.add(ring);
      this.rings.push(ring);
    }
    
    // Add small orbiting particles
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: CONFIG.colors.primaryLight,
      transparent: true,
      opacity: 0.8,
    });
    
    for (let i = 0; i < 6; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
      particle.userData.orbitRadius = 2 + Math.random() * 0.5;
      particle.userData.orbitSpeed = 0.5 + Math.random() * 0.5;
      particle.userData.orbitOffset = Math.random() * Math.PI * 2;
      particle.userData.orbitTilt = Math.random() * 0.5;
      
      this.scene.add(particle);
      this.rings.push(particle);
    }
  }
  
  bindEvents() {
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      this.mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.mouse.x = 0;
      this.mouse.y = 0;
    });
    
    window.addEventListener('resize', () => this.onResize());
  }
  
  onResize() {
    if (this.isDestroyed) return;
    const size = this.container.offsetWidth || 300;
    this.renderer.setSize(size, size);
  }
  
  animate() {
    if (this.isDestroyed) return;
    
    requestAnimationFrame(() => this.animate());
    
    const elapsed = this.clock.getElapsedTime();
    
    this.rings.forEach((item, index) => {
      if (item.userData.orbitRadius) {
        // Orbiting particles
        const { orbitRadius, orbitSpeed, orbitOffset, orbitTilt } = item.userData;
        const angle = elapsed * orbitSpeed + orbitOffset;
        item.position.x = Math.cos(angle) * orbitRadius;
        item.position.y = Math.sin(angle) * orbitRadius * Math.cos(orbitTilt);
        item.position.z = Math.sin(angle) * orbitRadius * Math.sin(orbitTilt);
      } else if (item.userData.rotationSpeed) {
        // Rings rotation
        const { rotationSpeed, baseRotation } = item.userData;
        item.rotation.x = baseRotation.x + elapsed * rotationSpeed.x + this.mouse.y * 0.3;
        item.rotation.y = baseRotation.y + elapsed * rotationSpeed.y + this.mouse.x * 0.3;
        item.rotation.z += rotationSpeed.z;
      }
    });
    
    // Camera subtle movement based on mouse
    this.camera.position.x = this.mouse.x * 0.5;
    this.camera.position.y = -this.mouse.y * 0.5;
    this.camera.lookAt(0, 0, 0);
    
    this.renderer.render(this.scene, this.camera);
  }
  
  destroy() {
    this.isDestroyed = true;
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// ============================================
// 3D Tilt Effect for Cards
// ============================================
class TiltCards {
  constructor(selector) {
    this.cards = document.querySelectorAll(selector);
    if (!this.cards.length) return;
    
    this.init();
  }
  
  init() {
    this.cards.forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.15s ease-out';
      
      card.addEventListener('mousemove', (e) => this.onMouseMove(e, card));
      card.addEventListener('mouseleave', (e) => this.onMouseLeave(e, card));
      card.addEventListener('mouseenter', (e) => this.onMouseEnter(e, card));
    });
  }
  
  onMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -8;
    const rotateY = (x - centerX) / centerX * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Move inner glow
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    card.style.setProperty('--glow-x', `${glowX}%`);
    card.style.setProperty('--glow-y', `${glowY}%`);
  }
  
  onMouseLeave(e, card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }
  
  onMouseEnter(e, card) {
    card.style.transition = 'transform 0.15s ease-out';
  }
}

// ============================================
// Skills 3D Visualization
// ============================================
class Skills3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.skillNodes = [];
    this.connections = [];
    this.mouse = { x: 0, y: 0 };
    this.clock = new THREE.Clock();
    this.isDestroyed = false;
    
    this.init();
  }
  
  init() {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight || 400;
    
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    this.camera.position.z = 15;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: !CONFIG.isMobile,
      alpha: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    
    this.container.appendChild(this.renderer.domElement);
    
    // Create skill nodes
    this.createSkillNodes();
    
    // Events
    this.bindEvents();
    
    // Animate
    this.animate();
  }
  
  createSkillNodes() {
    const skills = [
      { name: 'FastAPI', level: 0.95, color: CONFIG.colors.primary },
      { name: 'Python', level: 0.9, color: CONFIG.colors.accent },
      { name: 'Security', level: 0.85, color: CONFIG.colors.secondary },
      { name: 'Docker', level: 0.8, color: CONFIG.colors.primaryLight },
      { name: 'PostgreSQL', level: 0.85, color: CONFIG.colors.accentLight },
      { name: 'AWS', level: 0.75, color: CONFIG.colors.primary },
      { name: 'Linux', level: 0.85, color: CONFIG.colors.accent },
      { name: 'Git', level: 0.9, color: CONFIG.colors.secondary },
    ];
    
    // Create nodes in a circular 3D arrangement
    const radius = 6;
    skills.forEach((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4;
      
      const geometry = new THREE.SphereGeometry(0.3 + skill.level * 0.4, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.7,
      });
      
      const node = new THREE.Mesh(geometry, material);
      node.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius - 5
      );
      
      node.userData = {
        skill: skill.name,
        level: skill.level,
        basePos: node.position.clone(),
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.5 + Math.random() * 0.5,
      };
      
      this.scene.add(node);
      this.skillNodes.push(node);
      
      // Add glow sphere
      const glowGeometry = new THREE.SphereGeometry(0.5 + skill.level * 0.5, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.1,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      node.add(glow);
    });
    
    // Create connections between nearby nodes
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: CONFIG.colors.primary,
      transparent: true,
      opacity: 0.15,
    });
    
    for (let i = 0; i < this.skillNodes.length; i++) {
      for (let j = i + 1; j < this.skillNodes.length; j++) {
        const distance = this.skillNodes[i].position.distanceTo(this.skillNodes[j].position);
        if (distance < 8) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            this.skillNodes[i].position,
            this.skillNodes[j].position,
          ]);
          const line = new THREE.Line(geometry, connectionMaterial);
          line.userData = { nodeA: i, nodeB: j };
          this.scene.add(line);
          this.connections.push(line);
        }
      }
    }
  }
  
  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    window.addEventListener('resize', () => this.onResize());
  }
  
  onResize() {
    if (this.isDestroyed) return;
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight || 400;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  
  animate() {
    if (this.isDestroyed) return;
    
    requestAnimationFrame(() => this.animate());
    
    const elapsed = this.clock.getElapsedTime();
    
    // Animate nodes
    this.skillNodes.forEach((node) => {
      const { basePos, floatOffset, floatSpeed } = node.userData;
      node.position.y = basePos.y + Math.sin(elapsed * floatSpeed + floatOffset) * 0.3;
      node.rotation.y += 0.01;
    });
    
    // Update connection lines
    this.connections.forEach((line) => {
      const { nodeA, nodeB } = line.userData;
      const positions = line.geometry.attributes.position.array;
      positions[0] = this.skillNodes[nodeA].position.x;
      positions[1] = this.skillNodes[nodeA].position.y;
      positions[2] = this.skillNodes[nodeA].position.z;
      positions[3] = this.skillNodes[nodeB].position.x;
      positions[4] = this.skillNodes[nodeB].position.y;
      positions[5] = this.skillNodes[nodeB].position.z;
      line.geometry.attributes.position.needsUpdate = true;
    });
    
    // Rotate entire scene based on mouse
    this.scene.rotation.y = this.mouse.x * 0.3;
    this.scene.rotation.x = this.mouse.y * 0.1;
    
    this.renderer.render(this.scene, this.camera);
  }
  
  destroy() {
    this.isDestroyed = true;
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// ============================================
// Ambient 3D Orbs (replacement for CSS orbs)
// ============================================
class AmbientOrbs {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.orbs = [];
    this.mouse = { x: 0, y: 0 };
    this.clock = new THREE.Clock();
    this.isDestroyed = false;
    
    this.init();
  }
  
  init() {
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 50;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setClearColor(0x000000, 0);
    
    this.container.appendChild(this.renderer.domElement);
    
    // Create orbs
    this.createOrbs();
    
    // Events
    this.bindEvents();
    
    // Animate
    this.animate();
  }
  
  createOrbs() {
    const orbData = [
      { color: CONFIG.colors.primary, size: 25, pos: [-30, 20, -40], speed: 0.3 },
      { color: CONFIG.colors.accent, size: 20, pos: [35, -15, -35], speed: 0.4 },
      { color: CONFIG.colors.secondary, size: 15, pos: [10, 5, -30], speed: 0.35 },
    ];
    
    orbData.forEach((data) => {
      const geometry = new THREE.SphereGeometry(data.size, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.08,
      });
      
      const orb = new THREE.Mesh(geometry, material);
      orb.position.set(...data.pos);
      
      orb.userData = {
        basePos: orb.position.clone(),
        speed: data.speed,
        offset: Math.random() * Math.PI * 2,
      };
      
      this.scene.add(orb);
      this.orbs.push(orb);
    });
  }
  
  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    window.addEventListener('resize', () => this.onResize());
  }
  
  onResize() {
    if (this.isDestroyed) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  animate() {
    if (this.isDestroyed) return;
    
    requestAnimationFrame(() => this.animate());
    
    const elapsed = this.clock.getElapsedTime();
    
    this.orbs.forEach((orb) => {
      const { basePos, speed, offset } = orb.userData;
      
      // Floating animation
      orb.position.x = basePos.x + Math.sin(elapsed * speed + offset) * 5;
      orb.position.y = basePos.y + Math.cos(elapsed * speed * 0.7 + offset) * 3;
      
      // Mouse parallax
      orb.position.x += this.mouse.x * 3;
      orb.position.y += -this.mouse.y * 2;
      
      // Subtle scale pulse
      const scale = 1 + Math.sin(elapsed * speed * 2) * 0.05;
      orb.scale.set(scale, scale, scale);
    });
    
    this.renderer.render(this.scene, this.camera);
  }
  
  destroy() {
    this.isDestroyed = true;
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// ============================================
// Initialize on DOM Ready
// ============================================
function initThreeScenes() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('Reduced motion preferred - skipping 3D animations');
    return;
  }
  
  // Check for WebGL support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    console.log('WebGL not supported - skipping 3D animations');
    return;
  }
  
  // Initialize scenes based on what containers exist
  const heroContainer = document.getElementById('hero-canvas');
  const avatarContainer = document.getElementById('avatar-3d');
  const skillsContainer = document.getElementById('skills-3d');
  const ambientContainer = document.getElementById('ambient-3d');
  
  // Hero scene
  if (heroContainer) {
    new HeroScene('hero-canvas');
  }
  
  // Avatar ring
  if (avatarContainer) {
    new AvatarRing('avatar-3d');
  }
  
  // Skills 3D
  if (skillsContainer) {
    new Skills3D('skills-3d');
  }
  
  // Ambient orbs
  if (ambientContainer) {
    new AmbientOrbs('ambient-3d');
  }
  
  // Initialize tilt cards on project cards
  const projectCards = document.querySelectorAll('.project-card, .glass-card');
  if (projectCards.length && !CONFIG.isMobile) {
    new TiltCards('.project-card, .glass-card');
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThreeScenes);
} else {
  initThreeScenes();
}

// Export for manual initialization
export { HeroScene, AvatarRing, TiltCards, Skills3D, AmbientOrbs, initThreeScenes };
