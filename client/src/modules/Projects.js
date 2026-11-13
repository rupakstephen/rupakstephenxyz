import Container from 'react-bootstrap/Container';

export default function Projects() {
  return (
    <Container style={{ textAlign: 'left', maxWidth: 800 }}>
      <br />
      <h1>Projects</h1>

      <section className="mt-4">
        <h2 className="h3">Keli: rank things without numbers</h2>
        <p className="text-muted">Next.js, TypeScript, PostgreSQL, Prisma, Vercel</p>
        <p>
          My partner asked for an app where they could rank things without giving each one a score,
          keeping everything relative. So I did a proper requirements-gathering session with my one
          client (my partner), then built it.
        </p>
        <p>
          <strong>How it works:</strong> a new item gets placed through a few "which was better?"
          questions, and it finds its spot in about 7 questions even in a list of 100. No stars, no scores.
        </p>
        <p>
          <strong>The hard part:</strong> nailing the overall architecture. It's the foundation, so I
          hesitated a lot before committing. I was torn between the MEAN stack I normally reach for and
          something newer, and between cloud hosting and running it on a local VM. Cloud hosting won.
        </p>
        <p>
          <strong>Why I'm proudest of it:</strong> someone I care about said "I need this," and I got
          to make it exist. It's login-only, so there's no public demo.
        </p>
      </section>

      <section className="mt-5">
        <h2 className="h3">Replacing three Raspberry Pis with one Proxmox box</h2>
        <p className="text-muted">Proxmox, Linux, Docker, PostgreSQL</p>
        <p>
          My first big "why is nothing working?!" moment was new hardware that wouldn't behave. I
          chased software issues for ages, got desperate, and finally cracked open the case. The hard
          drive wasn't seated properly in its housing. 🙃
        </p>
        <p>
          After that came the rest of the mess, which I worked through with Claude's help: isolated
          containers for a photo library, file sync, a media server and network-wide ad blocking; a
          storage problem that was slowing everything down (recovering 100+ GB); live apps migrated
          to newer databases with no data loss; and friendly names for six internal services.
        </p>
      </section>
      <br />
    </Container>
  );
}
