import Container from 'react-bootstrap/Container';
import { EmailLink, LINKEDIN } from './Contact';

export default function About() {
  return (
    <Container style={{ textAlign: 'left', maxWidth: 800 }}>
      <br />
      <h1>Legos first, then computers</h1>
      <p>
        I've been building things since Legos, and I've loved computers since I was a kid playing
        games on them. Those two habits never really left. Now I get paid to build software, and I
        still treat everything like a Lego set.
      </p>

      <h2 className="h4 mt-4">What I'm into</h2>
      <ul>
        <li><strong>Volleyball</strong> (beach and grass especially). The best feeling is landing something I couldn't do last month. Seeing your own progress is addictive.</li>
        <li><strong>Games</strong> are my escape. They're how I hang out with friends and how I get lost in my own worlds for a bit.</li>
        <li><strong>Manga</strong> is where most of my free time goes. I love watching stories play out, good and bad, and they shape how I see the world.</li>
      </ul>

      <h2 className="h4 mt-4">Why I review things</h2>
      <p>
        A lot of us eat media without digesting it. Reviewing is my exercise in mindful consumption,
        and in non-technical writing, which is a muscle I wanted to build.
      </p>

      <h2 className="h4 mt-4">About this site</h2>
      <p>
        This site is my playground for deployment, hostnames, domains and the weird glue holding the
        web together. It's also built from scratch, which means I get to break it myself.
      </p>

      <p className="mt-4">
        Want to talk? <EmailLink /> or find me on <a href={LINKEDIN}>LinkedIn</a>.
      </p>
      <br />
    </Container>
  );
}
