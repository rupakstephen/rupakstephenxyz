import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

export const LINKEDIN = 'https://www.linkedin.com/in/rupak-stephen/';

// Address is assembled in the browser so it never appears as plain text in the HTML.
// ponytail: stops dumb scrapers only; swap for a contact form if spam shows up.
const email = () => ['rupak.stephen', 'gmail.com'].join('@');

export function EmailLink({ button, children }) {
  const [href, setHref] = useState('#');
  useEffect(() => setHref('mailto:' + email()), []);
  return button
    ? <Button href={href} variant="primary">{children || 'Email me'}</Button>
    : <a href={href}>{children || 'Email me'}</a>;
}
