import Container from 'react-bootstrap/Container';

// TODO (owner): add email / LinkedIn here if you want them public. Phone is deliberately left off.
const CONTACT = [
  { label: 'Boston, MA' },
  { label: 'github.com/rupakstephen', href: 'https://github.com/rupakstephen' },
];

const SUMMARY =
  'Software engineer with 3 years at a federally funded research lab building full-stack applications, data pipelines, and simulation tooling for government sponsors, including a solo-built application deployed on Kubernetes to a sponsor system. Experienced working directly with sponsors on-site, from integration and test events to user support. Builds and runs full-stack web apps and self-hosted infrastructure outside of work.';

// TODO (owner): the 2022 pharmaceutical internship is left out until its bullets are written.
const JOBS = [
  {
    title: 'Assistant Staff (Software Engineer) — FFRDC',
    dates: 'Jul 2023 – Present',
    projects: [
      {
        name: 'Data Transformation Control Application',
        bullets: [
          "Designed and built, as the sole developer, a full-stack application (React, FastAPI, PostgreSQL) that controls which transformations a Kubernetes-based data processing system applies before publishing, replacing a manual transformation step. The app is deployed to a sponsor's system ahead of an upcoming test event.",
          "Created a staged review workflow in which authorized users select transformation blocks to enable or disable, review pending changes, and then apply them through the transformation service's API, with role-based access control through Keycloak.",
          'Integrated the test suite into a GitHub Actions CI pipeline and contributed to the Helm charts used for Kubernetes deployment.',
        ],
      },
      {
        name: 'Drone-Detection Radar Data Pipeline',
        bullets: [
          "Built a Python data pipeline with one other engineer after the project's senior engineer departed, automating the processing of drone-detection radar data and streaming it through Kafka to a downstream system and a visualization tool. Delivered it in time for a scheduled test event, replacing a manual, error-prone process.",
          'Supported the pipeline on-site at a live test event, diagnosing and fixing issues in real time to keep the system running and the event on track.',
        ],
      },
      {
        name: 'Radar Data Analysis Automation',
        bullets: [
          'Architected Apache NiFi flows that automated an end-to-end radar data analysis pipeline, orchestrating decoding, time-synchronized playback into a processing system, and recording of output for the analytics team. This replaced manual runs of separate Java programs that frequently timed out and lost hours of work.',
          "Integrated and debugged the pipeline's Docker-containerized components, and traveled on-site to help the data provider streamline how data was delivered to the team.",
        ],
      },
      {
        name: 'Agent-Based Simulation Platform',
        bullets: [
          'Built the formatting layer of a React and FastAPI tool that lets users generate their own simulation input files, standardizing data from many scenario types into one consistent format. This moved users from requesting inputs from the development team to creating them on their own, and reduced failed runs.',
          "Served as the primary support contact for simulation users, turning their feedback into improvements to the tool's interface and the simulation's behavior.",
          "Integrated the simulation and its input tool into a sponsor's enterprise data platform as a proof of concept, attending site visits to learn the platform and writing code within it to adapt the software.",
        ],
      },
      {
        name: 'Data Transfer Application',
        bullets: [
          'Re-architected a Python (FastAPI, Dash) application for transferring data between systems via QR codes, moving encoding and decoding into background jobs with frontend status polling. This eliminated request timeouts and supported payloads several times larger than before.',
        ],
      },
    ],
  },
];

const PROJECTS = [
  {
    name: 'Keli — Shared Ranking Journal App',
    tech: 'Next.js, TypeScript, PostgreSQL, Prisma',
    dates: '2026',
    bullets: [
      'Designed and built a private web app for two users to journal and rank meals, movies, games, and trips, with each item ranked only against similar ones.',
      'Created a ranking system that places each new item through a short series of "which was better?" questions, finding its spot in about 7 questions even in a list of 100 items, without showing a numeric score.',
      "Built a recipe box that imports recipes from website links by reading the structured data most recipe sites publish, falling back to manual entry when a site can't be read.",
      'Implemented secure login with hashed passwords and session protection on every page, and deployed the app to Vercel with automatic updates on every code push.',
    ],
  },
  {
    name: 'Self-Hosted Home Infrastructure',
    tech: 'Proxmox, Linux, Docker, PostgreSQL',
    bullets: [
      'Built a home server that replaced three Raspberry Pis, running a photo library, file sync, a media server, and network-wide ad blocking in separate, isolated environments on a single machine.',
      'Diagnosed and fixed a storage problem that was slowing down the entire server, recovering over 100 GB of wasted disk space and restoring normal performance.',
      'Moved two live applications with years of personal data to a new server and newer database versions with no data loss, working around a failed first attempt.',
      "Configured hardware-accelerated video streaming by giving an isolated container secure access to the server's graphics chip, tracking down the cause of a tricky permissions error along the way.",
      'Set up easy-to-remember web addresses for six internal services, so household devices reach each one by name instead of by IP address and port number.',
    ],
  },
];

const SKILLS = [
  ['Languages', 'Python, TypeScript, JavaScript, SQL, C++, Bash'],
  ['Web & Backend', 'React, Next.js, FastAPI, Node.js, Prisma, REST APIs'],
  ['Data & Databases', 'PostgreSQL, Kafka, Apache NiFi, MariaDB'],
  ['Infrastructure & DevOps', 'Docker, Kubernetes, Helm, GitHub Actions, Keycloak, Linux, Proxmox, nginx, Git'],
];

const EDUCATION = {
  school: 'School in Upstate NY',
  dates: 'May 2023',
  degree: 'B.S. Computer Science and B.S. Information Technology & Web Science (Dual Degree)',
  detail: "GPA: 3.62  |  Dean's List (4 semesters)",
};

const Section = ({ title, children }) => (
  <section className="mt-4">
    <h5 className="text-uppercase border-bottom pb-1">{title}</h5>
    {children}
  </section>
);

const Heading = ({ left, right }) => (
  <div className="d-flex justify-content-between flex-wrap">
    <strong>{left}</strong>
    <span className="text-muted">{right}</span>
  </div>
);

const Bullets = ({ items }) => (
  <ul>
    {items.map((b) => <li key={b}>{b}</li>)}
  </ul>
);

function Resume() {
  return (
    <Container style={{ textAlign: 'left', maxWidth: 900 }}>
      <br />
      <h1>Rupak Stephen</h1>
      <p className="text-muted">
        {CONTACT.map((c, i) => (
          <span key={c.label}>
            {i > 0 && '  |  '}
            {c.href ? <a href={c.href}>{c.label}</a> : c.label}
          </span>
        ))}
      </p>

      <Section title="Professional Summary"><p>{SUMMARY}</p></Section>

      <Section title="Work Experience">
        {JOBS.map((job) => (
          <div key={job.title}>
            <Heading left={job.title} right={job.dates} />
            {job.projects.map((p) => (
              <div key={p.name} className="mt-2">
                <em>{p.name}</em>
                <Bullets items={p.bullets} />
              </div>
            ))}
          </div>
        ))}
      </Section>

      <Section title="Projects">
        {PROJECTS.map((p) => (
          <div key={p.name} className="mb-2">
            <Heading left={<>{p.name} <span className="text-muted fw-normal">| {p.tech}</span></>} right={p.dates} />
            <Bullets items={p.bullets} />
          </div>
        ))}
      </Section>

      <Section title="Technical Skills">
        {SKILLS.map(([k, v]) => <p key={k} className="mb-1"><strong>{k}:</strong> {v}</p>)}
      </Section>

      <Section title="Education">
        <Heading left={EDUCATION.school} right={EDUCATION.dates} />
        <div>{EDUCATION.degree}</div>
        <div className="text-muted">{EDUCATION.detail}</div>
      </Section>
      <br />
    </Container>
  );
}

export default Resume;
