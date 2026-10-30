
import { useState } from 'react'
import './App.css'

function App() {
  // Contact form states
  const [formStatus, setFormStatus] = useState('')
  const [isSending, setIsSending] = useState(false)

  // Project information
  const projects = [
    {
      title: 'PulseGuard',
      category: 'Cybersecurity · IoT',
      description:
        'A smart AED monitoring concept focused on device trust analytics, anomaly detection and emergency readiness.',
      tech: 'Python · Flask · Pandas',
    },
    {
      title: 'MemoryVault',
      category: 'Full Stack Development',
      description:
        'A digital time capsule platform for securely creating and sharing memories with time-based access conditions.',
      tech: 'Java · Spring Boot · MySQL',
    },
    {
      title: 'Archival Intel',
      category: 'AI · Document Intelligence',
      description:
        'An AI-powered system for understanding multilingual archival documents and extracting domain-specific information.',
      tech: 'Python · OCR · NLP',
    },
  ]

  // Skills
  const skills = [
    'Python',
    'Java',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'MySQL',
    'Git & GitHub',
    'Cybersecurity',
    'AI & Machine Learning',
  ]

  // Contact form submission
  async function handleContactSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const contactData = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    setIsSending(true)
    setFormStatus('Sending your message...')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.message || 'Unable to send your message.'
        )
      }

      setFormStatus(
        'Message sent successfully! Thank you for contacting me.'
      )

      form.reset()

    } catch (error) {
      console.error('Contact form error:', error)

      setFormStatus(
        error.message || 'Something went wrong. Please try again.'
      )

    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="portfolio">

      {/* Navigation */}
      <nav className="navbar">
        <a href="#home" className="logo">
          Ahani<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact" className="contact-btn">
            Let's Connect ↗
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">

        <div className="hero-content">

          <p className="eyebrow">
            WELCOME TO MY PORTFOLIO
          </p>

          <h1>
            Hi, I'm <span>Ahani H.C.</span>
          </h1>

          <h2>
            Engineering Student &
            <br />
            Technology Enthusiast.
          </h2>

          <p className="hero-description">
            Exploring the world of technology through software
            development, artificial intelligence and cybersecurity.
            Passionate about learning and building solutions
            that make a difference.
          </p>

          <div className="hero-socials">
            <span>Open to learning</span>
            <span>•</span>
            <span>Building new ideas</span>
          </div>

        </div>

        <div className="hero-visual">

          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="profile-card">

            <div className="profile-icon">
              AH
            </div>

            <h3>Curious Mind.</h3>
            <h3>Creative Builder.</h3>

            <p>
              Turning ideas into digital experiences.
            </p>

            <div className="profile-tag">
              LEARN · BUILD · GROW
            </div>

          </div>

        </div>

      </section>

      {/* About Section */}
      <section id="about" className="section">

        <p className="eyebrow">
          GET TO KNOW ME
        </p>

        <h2 className="section-title">
          About Me<span>.</span>
        </h2>

        <div className="about-content">

          <p>
            I'm an Information Science and Engineering student at
            JSS Academy of Technical Education, Bengaluru.
            I enjoy exploring how technology can solve real-world
            problems and create meaningful experiences.
          </p>

          <p>
            My interests include artificial intelligence,
            cybersecurity, data science and full stack web development.
            I enjoy working on projects, exploring new technologies
            and continuously improving my technical knowledge.
          </p>

          <p>
            I'm currently focused on strengthening my development
            skills and building practical projects that reflect
            my learning journey.
          </p>

        </div>

      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">

        <p className="eyebrow">
          WHAT I WORK WITH
        </p>

        <h2 className="section-title">
          My Skills<span>.</span>
        </h2>

        <p className="section-description">
          Technologies and areas I'm learning and exploring.
        </p>

        <div className="skills-grid">

          {skills.map((skill) => (
            <div className="skill-card" key={skill}>
              <span className="skill-dot"></span>
              {skill}
            </div>
          ))}

        </div>

      </section>

      {/* Projects Section */}
      <section id="projects" className="section">

        <p className="eyebrow">
          SOME THINGS I'VE WORKED ON
        </p>

        <h2 className="section-title">
          Featured Projects<span>.</span>
        </h2>

        <div className="projects-grid">

          {projects.map((project, index) => (
            <article
              className="project-card"
              key={project.title}
            >

              <div className="project-number">
                0{index + 1}
              </div>

              <p className="project-category">
                {project.category}
              </p>

              <h3>{project.title}</h3>

              <p className="project-description">
                {project.description}
              </p>

              <p className="project-tech">
                {project.tech}
              </p>

            </article>
          ))}

        </div>

      </section>

      {/* Education Section */}
      <section id="education" className="section">

        <p className="eyebrow">
          MY ACADEMIC JOURNEY
        </p>

        <h2 className="section-title">
          Education<span>.</span>
        </h2>

        <div className="education-card">

          <p className="project-category">
            ENGINEERING
          </p>

          <h3>
            JSS Academy of Technical Education, Bengaluru
          </h3>

          <p>
            Information Science and Engineering
          </p>

          <p className="education-note">
            Undergraduate Engineering Student · 5th Semester
          </p>

        </div>

      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">

        <p className="eyebrow">
          HAVE AN IDEA?
        </p>

        <h2 className="section-title">
          Let's Connect<span>.</span>
        </h2>

        <p className="section-description">
          Have an opportunity, project idea or just want to connect?
          Send me a message!
        </p>

        <form
          className="contact-form"
          onSubmit={handleContactSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            maxLength="100"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            maxLength="254"
            required
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            rows="5"
            maxLength="5000"
            required
          />

          <button
            type="submit"
            className="primary-btn"
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send Message ↗'}
          </button>

          <p
            role="status"
            aria-live="polite"
            className="form-status"
          >
            {formStatus}
          </p>

        </form>

        <div className="social-links">

          <a
            href="https://github.com/ahanihc"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>

          <a
            href="https://linkedin.com/in/ahani-h-c-458b9732b"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>

          <a href="mailto:ahanihc@gmail.com">
            Email ↗
          </a>

        </div>

      </section>

      {/* Footer */}
      <footer className="footer">

        <p>
          Designed & Built by Ahani H.C.
        </p>

        <p>
          Made with React.js & CSS
        </p>

        <p>
          © 2026 Ahani H.C.
        </p>

      </footer>

    </div>
  )
}

export default App
