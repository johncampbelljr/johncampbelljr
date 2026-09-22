export const site = {
  name: 'John T. Campbell Jr.',
  description:
    'Engineering leader exploring how we build and secure software in an agentic-first SDLC.',
  github: 'https://github.com/johncampbelljr',
  linkedin: 'https://www.linkedin.com/in/johncampbelljr/',
};
export const url = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
