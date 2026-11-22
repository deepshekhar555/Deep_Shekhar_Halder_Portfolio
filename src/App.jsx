import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ArrowUpRight, Mail, Menu, X, MapPin, ExternalLink, Download, Search, Moon, Sun, ChevronDown } from 'lucide-react'
import './App.css'

const projects = [
  { title: 'SuryaDrishti', category: 'AI / Science', year: '2026', description: 'Solar flare forecasting using Aditya-L1 observations, extended with physics-informed MHD constraints.', tags: ['Python', 'PyTorch', 'MHD', 'Time Series'], metric: '93.2% recall', repo: 'https://github.com/deepshekhar555/PS15_SolarFlare' },
  { title: 'AI-RTITMS', category: 'Systems', year: '2026', description: 'Real-time intelligent traffic management with YOLO, ByteTrack, MQTT and embedded actuation.', tags: ['YOLO26', 'OpenCV', 'MQTT', 'Raspberry Pi'], metric: 'Full-stack', repo: 'https://github.com/deepshekhar555/ai-traffic-management-system' },
  { title: 'BioTwin Omni', category: 'AI / Health', year: '2026', description: 'Multi-agent patient digital twin combining EHR data, wearable vitals and cardiovascular simulation.', tags: ['Agentic AI', 'Python', 'Digital Twin'], metric: 'Clinical consensus', repo: 'https://github.com/deepshekhar555/HappiestHealth-DigitalTwin-2026' },
  { title: 'Boundary HRMS', category: 'Full Stack', year: '2026', description: 'Right-to-disconnect compliance platform with approvals, attendance, logs and queued out-of-hours actions.', tags: ['Node.js', 'Express', 'SQLite', 'Java'], metric: 'Team of 3', repo: 'https://github.com/deepshekhar555/Right-to-disconnect-automated-boundary-Boundary-HRMS-' },
  { title: 'Telco Churn', category: 'ML / Data', year: '2026', description: 'Customer segmentation and churn modelling across 7,043 customers and 21 features.', tags: ['Python', 'EDA', 'KMeans', 'Gradient Boosting'], metric: '0.843 AUC', repo: 'https://github.com/deepshekhar555' },
  { title: 'FloatChat', category: 'AI / Data', year: '2026', description: 'Natural-language-to-SQL ocean platform over a synthetic ARGO dataset with transparent REST queries.', tags: ['FastAPI', 'React', 'SQLite', 'SQL'], metric: '150+ floats', repo: 'https://github.com/deepshekhar555/FloatChatAI' },
  { title: 'Dayflow', category: 'Full Stack', year: '2026', description: 'AI-assisted HR management platform for employees, attendance, leave and role-based approvals.', tags: ['React', 'Node.js', 'PostgreSQL', 'Prisma'], metric: 'Odoo x NMIT', repo: 'https://github.com/deepshekhar555/dayflow' },
  { title: 'AirRoute Delhi', category: 'Systems', year: '2026', description: 'AQI safety dashboard linking PM2.5 and PM10 data to outdoor risk and exposure guidance.', tags: ['React', 'AQI', 'AWS', 'Data'], metric: 'AWS Hacks', repo: 'https://github.com/deepshekhar555/airroute-practice' },
  { title: 'Gait Twin', category: 'AI / Health', year: '2026', description: 'Browser-side gait and fall-risk digital twin using pose estimation and simulated embedded sensor streams.', tags: ['MediaPipe', 'React', 'Python', 'ESP32'], metric: 'Risk index 0–100', repo: 'https://github.com/deepshekhar555/Gait_Twin' },
  { title: 'Shield AI', category: 'ML / Data', year: '2026', description: 'Credit-card fraud detection system with classification models, REST API and mobile-first interface.', tags: ['XGBoost', 'FastAPI', 'SQLite', 'Razorpay'], metric: 'Fraud ML', repo: 'https://github.com/deepshekhar555/shield-ai' },
  { title: 'RefinAI', category: 'AI / Science', year: '2026', description: 'Illustrative refinery energy and asset-health dashboard using public CCPP and C-MAPSS benchmarks, PCA outliers and conformal uncertainty.', tags: ['Python', 'Three.js', 'Chart.js', 'XGBoost'], metric: 'MAE 2.262 MW', repo: 'https://github.com/deepshekhar555/HP-Power-Lab-RefinAI' },
  { title: 'NalaWatch', category: 'AI / Data', year: '2026', description: 'Urban flood-preparedness simulator with rainfall scenarios, ward-level indicators, timeline exercises and downloadable briefs.', tags: ['React', 'Vite', 'JavaScript', 'Firebase'], metric: 'Illustrative model', repo: 'https://github.com/deepshekhar555' },
  { title: 'Email Job Scheduler', category: 'Full Stack', year: '2026', description: 'SDE assignment service for scheduled email delivery with Redis, BullMQ, Docker and MySQL.', tags: ['Express', 'BullMQ', 'Redis', 'Docker'], metric: '48-hour build', repo: 'https://github.com/deepshekhar555' },
  { title: 'DeployGuard AI', category: 'Systems', year: '2026', description: 'Self-hosted CI/CD platform with isolated builds, health checks, promotion and rollback.', tags: ['FastAPI', 'Docker', 'React', 'ML'], metric: 'Team project', repo: 'https://github.com/alwaysalearner1234/DeployGuardAI' },
  { title: 'EcoSense', category: 'AI / Science', year: '2026', description: 'Occupancy-aware building energy concept for 15–60 minute HVAC and lighting pre-conditioning.', tags: ['ML Forecasting', 'React', 'IoT'], metric: 'Yuva Yodha', repo: 'https://github.com/alwaysalearner1234' },
  { title: 'DriftGuard', category: 'ML / Data', year: '2026', description: 'Production ML drift monitoring that ranks covariate and concept drift against a training baseline.', tags: ['Drift Detection', 'Python', 'ML'], metric: 'SYNAPSE 1.0', repo: 'https://github.com/alwaysalearner1234' },
  { title: 'GlobeTrotter', category: 'Full Stack', year: '2026', description: 'Multi-city travel planning platform with JWT authentication and Docker Compose deployment.', tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'], metric: 'Team project', repo: 'https://github.com/alwaysalearner1234/globe_trotter' },
  { title: 'MaatriSakhi', category: 'AI / Health', year: '2026', description: 'Preconception-care pre-consultation assistant grounded in FOGSI guidelines.', tags: ['React', 'Node.js', 'JWT', 'PostgreSQL'], metric: 'Team project', repo: 'https://github.com/alwaysalearner1234/MaatriSakhi' },
  { title: 'TyrePulse AI', category: 'ML / Data', year: '2026', description: 'Motorsport concept for tyre-wear and remaining-life estimation from race telemetry.', tags: ['FastAPI', 'XGBoost', 'React', 'PostgreSQL'], metric: 'Concept', repo: 'https://github.com/alwaysalearner1234/TyrePulseAI' },
  { title: 'Water Quality Monitor', category: 'Embedded', year: '2026', description: 'Arduino monitoring system for pH, turbidity and temperature with LCD and web dashboard.', tags: ['Arduino', 'Sensors', 'LCD', 'IoT'], metric: 'Embedded', repo: 'https://github.com/deepshekhar555/Water-Quality-Prediction-Aquaculture-IoT-ML' },
  { title: 'JARVIS Assistant', category: 'AI / Data', year: '2026', description: 'Python voice and task assistant using Groq API services.', tags: ['Python', 'Groq API', 'Automation'], metric: 'AI Assistant', repo: 'https://github.com/deepshekhar555/jarvis-v3' },
  { title: 'Multipurpose Robot Car', category: 'Embedded', year: '2026', description: 'Arduino Uno robot with line following, obstacle avoidance and Bluetooth control.', tags: ['Arduino Uno', 'Sensors', 'Bluetooth'], metric: 'Robotics', repo: 'https://github.com/deepshekhar555' },
  { title: 'Cloud Computing Labs', category: 'Systems', year: '2026', description: 'Virtualized networking labs covering TCP chat, SDN topologies and Ryu/Open vSwitch.', tags: ['VirtualBox', 'Mininet', 'SDN', 'Ryu'], metric: 'Cloud Lab', repo: 'https://github.com/deepshekhar555/Cloud-Computing-Labs-2026' },
]

const experiences = [
  { period: 'Oct 2026 — Jan 2027', role: 'Data Analyst Intern', company: 'Qveto Technologies', detail: 'Remote work on SaaS revenue, subscription analytics, sales and business performance dashboards.' },
  { period: 'Sep 2026 — Mar 2027', role: 'Cloud Computing Intern', company: 'AWS Student Builder Group, IIT Jodhpur', detail: 'Cloud computing track with three projects and a final architecture and code review.' },
  { period: 'Sep — Nov 2026', role: 'Web Development Intern', company: 'The Developers Arena', detail: 'Remote, two-month unpaid internship.' },
  { period: 'May — Aug 2026', role: 'Summer Research Intern', company: 'IEEE SMC, KGEC', detail: 'ALAS-SCLF polar decoder research under Dr. Dwaipayan Ghosh.' },
  { period: 'Jun — Jul 2026', role: 'Data Science Intern', company: 'Saiket Systems', detail: 'Remote internship; churn analysis with EDA, segmentation and Gradient Boosting.' },
  { period: 'Jun — Aug 2026', role: 'AI Fundamentals & MERN Summership', company: 'IIT Ropar · NPTEL', detail: 'AI Fundamentals and MERN Stack work under Prof. Sudarshan Iyengar.' },
  { period: 'Nov 15 — 18, 2026', role: 'Data Science & ML Intern', company: 'CareerSwami', detail: 'Virtual internship completion certificate.' },
  { period: '2026', role: 'Core Java, DSA & SQL Programme', company: 'Qspider, Adamas University', detail: 'Completed 240 hours of intensive technical training.' },
]

const achievements = [
  ['SuryaDrishti', 'India AI Impact Festival 2026', 'Jury Round shortlist, top 15 all-India'],
  ['Orvix Hackathon', 'Final rank 4', 'Team Hackoalgs, score 80'],
  ['ISRO BAH 2026', 'SuryaDrishti', 'PS-15 team project and participation'],
  ['VibeForge 1.0', 'Rank 2 nationally', 'Campus Ambassador recognition'],
  ['Google Student Ambassador', 'Build Night Champion', 'Fund My Crazy and PulseGrid AI'],
  ['Google Student Ambassador', 'Top Lyria Artist', 'Music Night, 29 Jun 2026'],
  ['Indian Space Month', '50 / 50', 'ISRO / MyGov quiz challenge'],
  ['Bharat Builds Tour', 'Team Leader', 'NexusAI: First Commit and Environmental Hacks'],
  ['Hack Devengers 2.0', 'Project submission', 'Certificate of Appreciation, 19 Sep 2026'],
  ['Technostrophe 26', 'Participation', 'IIT Dharwad E-Summit, Oct 2026'],
  ['IBM Qiskit Fall Fest', 'Participation', 'IBM quantum computing programme, Oct 2026'],
  ['ML Empowerment 3.0', 'Participation', 'Build challenge certificate, Nov 2026'],
  ['Circuitronix 2025', 'Fourth place', 'Circuitronix hackathon achievement'],
  ['Decode SIH 2026', 'Project entry', 'AI traffic digital twin submission'],
  ['Hack Synthesis 3.0', 'Team entry', 'Cyberbots team submission'],
  ['Yuva Yodha', 'Project submission', 'SuryaGrid for grid reliability'],
  ['SYNAPSE 1.0', 'Project submitted', 'Synaptix team · PS-04 / SensorMesh entries'],
  ['atomQUEST 2026', 'Team entry', 'Track 2 · BioTwin Labs'],
  ['Odoo x Adamas', 'Team of 3', 'Boundary HRMS · Right-to-Disconnect'],
  ['Odoo x NMIT', 'Hackathon entry', 'Dayflow · AI-powered HR management'],
]

function HeroScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch {
      canvas.style.display = 'none'
      return undefined
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.z = 6

    const geometry = new THREE.IcosahedronGeometry(1.45, 1)
    const material = new THREE.MeshPhysicalMaterial({ color: 0xb9d65c, wireframe: true, transparent: true, opacity: 0.52, roughness: 0.35 })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.58, 2), new THREE.MeshBasicMaterial({ color: 0x69aaa0, wireframe: true, transparent: true, opacity: 0.5 }))
    scene.add(core)

    const pointsGeometry = new THREE.BufferGeometry()
    const positions = []
    for (let i = 0; i < 180; i += 1) {
      positions.push((Math.random() - 0.5) * 7, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 4)
    }
    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const particles = new THREE.Points(pointsGeometry, new THREE.PointsMaterial({ color: 0xe1eadf, size: 0.018, transparent: true, opacity: 0.7 }))
    scene.add(particles)

    let frameId = 0
    let pointerX = 0
    let pointerY = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height, false)
      camera.aspect = rect.width / rect.height
      camera.updateProjectionMatrix()
    }

    const move = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.8
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.8
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animate = () => {
      if (!reduceMotion) mesh.rotation.y += 0.0028
      if (!reduceMotion) mesh.rotation.x += 0.0012
      if (!reduceMotion) core.rotation.x -= 0.004
      if (!reduceMotion) core.rotation.z += 0.003
      if (!reduceMotion) particles.rotation.y -= 0.0008
      mesh.position.x += (pointerX - mesh.position.x) * 0.035
      mesh.position.y += (-pointerY - mesh.position.y) * 0.035
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', move)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', move)
      geometry.dispose()
      material.dispose()
      core.geometry.dispose()
      core.material.dispose()
      pointsGeometry.dispose()
      particles.material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-webgl" aria-label="Interactive 3D wireframe model" />
}

function AnimatedNumber({ value, suffix = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const target = Number(value)
    const duration = 900
    const started = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * target)
      if (progress < 1) requestAnimationFrame(tick)
    }

    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return <>{value.includes('.') ? count.toFixed(2) : count.toFixed(0)}{suffix}</>
}

function App() {
  const [filter, setFilter] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scene, setScene] = useState({ x: 0, y: 0 })
  const [query, setQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'))
  const modalRef = useRef(null)
  const [timelineYear, setTimelineYear] = useState('All')
  const [githubStats, setGithubStats] = useState({ repos: '--', followers: '--' })
  const [loading, setLoading] = useState(true)
  const [contactSent, setContactSent] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [roleIndex, setRoleIndex] = useState(0)
  const roles = ['AI / ML Engineer', 'Computer Vision Developer', 'Backend Engineer', 'Embedded Systems Builder']
  const categories = ['All', 'AI / Science', 'AI / Data', 'Systems', 'AI / Health', 'Full Stack', 'ML / Data', 'Embedded']
  const filtered = projects.filter((project) => {
    const categoryMatches = filter === 'All' || project.category === filter
    const searchMatches = `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())
    return categoryMatches && searchMatches
  })

  const closeMenu = () => setMenuOpen(false)
  const timelineItems = timelineYear === 'All' ? experiences : experiences.filter((item) => item.period.includes(timelineYear))

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`)
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    }, { threshold: 0.12 })

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 })

    document.querySelectorAll('main section').forEach((section) => {
      section.classList.add('reveal-section')
      revealObserver.observe(section)
      sectionObserver.observe(section)
    })

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length)
    }, 2600)
    return () => window.clearInterval(interval)
  }, [roles.length])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900)

    const controller = new AbortController()
    fetch('https://api.github.com/users/deepshekhar555', { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('GitHub unavailable')))
      .then((profile) => setGithubStats({ repos: String(profile.public_repos ?? '--'), followers: String(profile.followers ?? '--') }))
      .catch(() => {
        if (!controller.signal.aborted) setGithubStats({ repos: 'Unavailable', followers: 'Unavailable' })
      })

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeMenuOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', closeMenuOnEscape)
    return () => window.removeEventListener('keydown', closeMenuOnEscape)
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!selectedProject) return undefined
    const previouslyFocused = document.activeElement
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
      if (event.key === 'Tab' && modalRef.current) {
        const focusable = [...modalRef.current.querySelectorAll('button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])')]
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', closeOnEscape)
    requestAnimationFrame(() => modalRef.current?.querySelector('button')?.focus())
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', closeOnEscape)
      previouslyFocused?.focus()
    }
  }, [selectedProject])

  return (
    <div className="site-shell">
      {loading && <div className="page-loader" role="status" aria-live="polite" aria-label="Loading portfolio"><div className="loader-mark">DS</div><span>Loading portfolio</span></div>}
      <div className="scroll-progress" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">DS</span>
          <span>Deep Shekhar Halder</span>
        </a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="primary-navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav id="primary-navigation" className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
          <a className={activeSection === 'projects' ? 'active' : ''} href="#projects" onClick={closeMenu}>Work</a>
          <a className={activeSection === 'experience' ? 'active' : ''} href="#experience" onClick={closeMenu}>Experience</a>
          <a className={activeSection === 'certifications' ? 'active' : ''} href="#certifications" onClick={closeMenu}>Credentials</a>
          <a className={activeSection === 'contact' ? 'active' : ''} href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <button className="theme-button" type="button" onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme">{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button>
        <a className="nav-email" href="mailto:deephalder209@gmail.com"><Mail size={16} /> Email</a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> B.Tech CSE · <span className="role-cycle">{roles[roleIndex]}</span> · Kolkata, India</p>
            <h1>Building intelligent systems<br /><em>from pixels to production.</em></h1>
            <p className="hero-text">I am Deep Shekhar Halder, a final-year B.Tech Computer Science and Engineering student at Adamas University with an 8.34 CGPA through six semesters. I work at the intersection of applied AI, computer vision, machine learning, robotics, IoT, embedded systems, cloud computing and backend engineering. My experience spans research-grade Python simulation, YOLO and ByteTrack vision pipelines, agentic and generative AI systems, REST and SQL/NoSQL APIs, Java and Spring Boot, Node.js and Express, React, Docker, AWS and edge-device integration with Arduino, ESP32 and Raspberry Pi. I turn complex research ideas into practical, measurable and user-focused systems through clean engineering, data-driven validation and open-source documentation.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#projects">Explore my work <ArrowUpRight size={18} /></a>
              <a className="text-button" href="https://github.com/deepshekhar555" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="text-button" href="/Deep-Shekhar-Halder-CV.pdf" download><Download size={17} /> Download CV</a>
            </div>
          </div>

          <HeroScene />
          <aside className="hero-panel hero-3d" aria-label="Interactive profile summary" onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setScene({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 8, y: ((event.clientY - rect.top) / rect.height - 0.5) * -8 }) }} onPointerLeave={() => setScene({ x: 0, y: 0 })} style={{ transform: `perspective(900px) rotateX(${scene.y}deg) rotateY(${scene.x}deg)` }}>
            <div className="panel-header">
              <span>PROFILE / 2026</span>
              <span className="live-label"><span /> LIVE</span>
            </div>
            <div className="profile-grid">
              <div><strong><AnimatedNumber value="8.34" /></strong><span>CGPA</span></div>
              <div><strong>{githubStats.repos}</strong><span>GitHub repos</span></div>
              <div><strong><AnimatedNumber value="2027" /></strong><span>Graduating</span></div>
            </div>
            <div className="signal-map">
              <div className="signal-row"><span>AI / ML</span><div><i style={{ width: '92%' }} /></div></div>
              <div className="signal-row"><span>Computer vision</span><div><i style={{ width: '86%' }} /></div></div>
              <div className="signal-row"><span>Backend</span><div><i style={{ width: '72%' }} /></div></div>
              <div className="signal-row"><span>Embedded</span><div><i style={{ width: '68%' }} /></div></div>
            </div>
            <div className="panel-location"><MapPin size={15} /> Adamas University · Kolkata</div>
          </aside>
        </section>

        <section className="section" id="projects">
          <div className="section-heading">
            <div><p className="kicker">01 / Selected work</p><h2>Projects <span className="project-count">{filtered.length}</span></h2></div>
            <div className="project-tools">
              <label className="project-search"><Search size={15} /><span className="sr-only">Search projects</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" /></label>
            </div>
            <div className="filters" aria-label="Project filters">
              {categories.map((category) => <button key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} type="button" aria-pressed={filter === category}>{category}</button>)}
            </div>
          </div>
          {filtered.length === 0 && <div className="empty-projects">No projects match “{query}”. Try another search or category.</div>}
          <div className="project-grid">
            {filtered.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-visual">
                  <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                  <div className="orbital"><i /><i /><i /></div>
                  <span className="project-category">{project.category}</span>
                </div>
                <div className="project-body">
                  <div className="project-meta"><span>{project.year}</span><span>{project.metric}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <button className="project-detail-button" type="button" onClick={() => setSelectedProject(project)} aria-label={`View details for ${project.title}`} aria-haspopup="dialog">Details ↗</button>
                  <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`View ${project.title} repository`}><ExternalLink size={17} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section" id="experience">
          <div className="experience-column">
            <p className="kicker">02 / Experience</p>
            <h2>Research & work</h2>
            <div className="timeline-tools">{['All', '2026', '2027'].map((year) => <button key={year} className={timelineYear === year ? 'active' : ''} type="button" onClick={() => setTimelineYear(year)} aria-pressed={timelineYear === year}>{year}</button>)}</div>
            <div className="timeline">
              {timelineItems.map((item) => (
                <article className="timeline-item" key={`${item.company}-${item.role}`}>
                  <time>{item.period}</time>
                  <div><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.detail}</p></div>
                </article>
              ))}
            </div>
          </div>
          <aside className="education-column">
            <p className="kicker">Education</p>
            <div className="education-card">
              <span className="education-year">2023 — 2027</span>
              <h3>B.Tech, Computer Science & Engineering</h3>
              <p>Adamas University · Kolkata</p>
              <div className="school-list"><span><b>Higher Secondary · 2021</b>77.6% · WBCHSE</span><span><b>Secondary · 2019</b>70.14% · WBBSE</span><span><b>School</b>Krishnapur Adarsha Vidyamandir</span></div>
              <div className="grade-line"><span>Current CGPA</span><strong>8.34</strong></div>
              <div className="sgpa-list"><span>I · 8.50</span><span>II · 7.58</span><span>III · 9.00</span><span>IV · 8.23</span><span>V · 8.26</span><span>VI · 8.48</span></div>
            </div>
          </aside>
        </section>

        <section className="section achievements-section">
          <div className="section-heading"><div><p className="kicker">03 / Recognition</p><h2>Selected achievements</h2></div></div>
          <div className="achievement-table">
            {achievements.map(([name, result, detail], index) => (
              <article key={`${name}-${result}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><h3>{name}</h3><strong>{result}</strong><p>{detail}</p></article>
            ))}
          </div>
        </section>

        <section className="section credential-section" id="certifications">
          <div className="credential-copy"><p className="kicker">04 / Credentials</p><h2>Learning, continuously.</h2><p>Verified NPTEL, Oracle, HarvardX, AWS and focused training across AI, DSA, cloud and data.</p><div className="evidence-links"><a className="evidence-link" href="/All-Certificates-and-Results.pdf" target="_blank" rel="noreferrer">Certificates & results <ArrowUpRight size={16} /></a><a className="evidence-link" href="/Offer-Letters.pdf" target="_blank" rel="noreferrer">Offer letters <ArrowUpRight size={16} /></a><a className="evidence-link" href="/achnet-certificates-1.xlsx" download>Achievement workbook 1 <Download size={15} /></a><a className="evidence-link" href="/achnet-certificates-2.xlsx" download>Achievement workbook 2 <Download size={15} /></a></div></div>
          <div className="credential-list">
            <article><span>95%</span><div><h3>NPTEL Elite</h3><p>Joy of Computing Using Python · Top 5%</p></div></article>
            <article><span>73%</span><div><h3>NPTEL Elite</h3><p>Data Structures and Algorithms Using Java</p></div></article>
            <article><span>66%</span><div><h3>NPTEL Elite</h3><p>Cloud Computing · IIT Kharagpur</p></div></article>
            <article><span>62%</span><div><h3>NPTEL Elite</h3><p>Machine Learning for Engineering and Science</p></div></article>
            <article><span>100%</span><div><h3>Oracle</h3><p>Certified Foundations Associate · Agentic AI</p></div></article>
            <article><span>Gold</span><div><h3>FutureSkills Prime</h3><p>Gen AI Tools · 100 / 100</p></div></article>
            <article><span>2026</span><div><h3>HarvardX</h3><p>CS50's Introduction to AI with Python</p></div></article>
            <article><span>2026</span><div><h3>AWS Student Builder</h3><p>Outstanding achievement · Git to Production</p></div></article>
            <article><span>2026</span><div><h3>Decoding Data Science</h3><p>DDS Builder Codex · Certificate of Commitment</p></div></article>
            <article><span>2026</span><div><h3>Crio.Do</h3><p>REST API Micro-experience · GenAI Explorer</p></div></article>
            <article><span>2025</span><div><h3>NoviTech R&D</h3><p>30 Days MasterClass in Data Analytics</p></div></article>
            <article><span>2024</span><div><h3>Blanc Technologies</h3><p>Intern Development Course 2.0 · Best Award</p></div></article>
            <article><span>2025</span><div><h3>Google</h3><p>Workspace Bring AI to Work · Cloud Skills Boost</p></div></article>
            <article><span>2025</span><div><h3>Intel / Skill India</h3><p>AI for Entrepreneurship</p></div></article>
          </div>
        </section>

        <section className="section skills-section">
          <p className="kicker">05 / Technical stack</p>
          <div className="skills-grid">
            {[['Programming languages', 'C · C++ · Java · Python · JavaScript · TypeScript · SQL · HTML · CSS'], ['Databases & Data', 'DBMS · SQL · MySQL · PostgreSQL · MongoDB · SQLite · Pandas · Scikit-learn'], ['Web & Backend', 'HTML · CSS · React · Node.js · Express · Spring Boot · FastAPI · REST APIs · Tailwind CSS'], ['AI & Vision', 'PyTorch · TensorFlow · YOLO · ByteTrack · OpenCV · LangChain · Gemini · Groq · OpenAI Agents SDK'], ['Embedded & Cloud', 'Arduino · ESP32 · Raspberry Pi · MQTT · Docker · AWS · VirtualBox · Mininet · Render'], ['Core foundations', 'DSA · OOP · DBMS · OS · Computer Networks · Software Engineering · Git/GitHub'], ['Tools & Platforms', 'VS Code · Postman · Docker Compose · GitHub Actions · Firebase · Vite · XGBoost · MediaPipe'], ['Languages spoken', 'Bengali · English · Hindi']].map(([name, skills]) => <article key={name}><h3>{name}</h3><p>{skills}</p></article>)}
          </div>
        </section>

        <section className="section faq-section">
          <div className="faq-heading"><p className="kicker">About working together</p><h2>Availability & answers</h2></div>
          <div className="faq-list">
            <details><summary>What roles am I open to? <ChevronDown size={16} /></summary><p>I am open to AI/ML, computer vision, backend, full-stack, robotics, embedded systems and cloud internships or entry-level engineering roles.</p></details>
            <details><summary>Can I work across the complete product stack? <ChevronDown size={16} /></summary><p>Yes. I can contribute across data, model, API, frontend, database, Docker deployment and embedded integration, depending on the project.</p></details>
            <details><summary>Where can evidence be verified? <ChevronDown size={16} /></summary><p>Repositories are linked throughout the project section. The portfolio also provides downloadable CV and certificate/result evidence PDFs.</p></details>
            <details><summary>Are clinical or digital-twin projects validated for production? <ChevronDown size={16} /></summary><p>Research prototypes such as BioTwin Omni are exploratory and are not presented as clinically validated medical products.</p></details>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <p className="kicker">06 / Get in touch</p>
          <h2>Let’s build something<br /><em>worth shipping.</em></h2>
          <div className="contact-links">
            <a href="mailto:deephalder209@gmail.com"><Mail size={18} /> deephalder209@gmail.com</a>
            <a href="https://www.linkedin.com/in/deep-shekhar-halder-a23b25294" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/deepshekhar555" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://leetcode.com/u/Deepshekhar063" target="_blank" rel="noreferrer">LeetCode ↗</a>
            <a href="https://x.com/DeepH063" target="_blank" rel="noreferrer">X ↗</a>
          </div>
          <form className="contact-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); window.location.href = `mailto:deephalder209@gmail.com?subject=${encodeURIComponent(`Portfolio inquiry from ${data.get('name')}`)}&body=${encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('email')}`)}`; setContactSent(true) }}>
            <label><span>Name</span><input name="name" required minLength="2" placeholder="Your name" /></label>
            <label><span>Email</span><input name="email" required type="email" placeholder="you@example.com" /></label>
            <label className="contact-message"><span>Message</span><textarea name="message" required minLength="10" placeholder="Tell me about the role or project" /></label>
            <button type="submit">Send inquiry <ArrowUpRight size={17} /></button>
            {contactSent && <p className="form-status" role="status">Opening your email app…</p>}
          </form>
        </section>
      </main>

      {selectedProject && <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" ref={modalRef} onMouseDown={(event) => event.target === event.currentTarget && setSelectedProject(null)}>
        <div className="project-modal-panel">
          <button className="modal-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={18} /></button>
          <p className="kicker">Project / {selectedProject.category}</p>
          <h2 id="project-modal-title">{selectedProject.title}</h2>
          <p>{selectedProject.description}</p>
          <div className="modal-meta"><span>{selectedProject.year}</span><span>{selectedProject.metric}</span></div>
          <div className="tag-row">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <a className="primary-button" href={selectedProject.repo} target="_blank" rel="noreferrer">Open repository <ExternalLink size={17} /></a>
        </div>
      </div>}

      <footer><span>© 2026 Deep Shekhar Halder</span><span>Kolkata, India · 22.5726° N</span><a href="#top">Back to top ↑</a></footer>
    </div>
  )
}

export default App
