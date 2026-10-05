// The one place personal details live. Nothing here is invented: the contact
// details come from foayenix/cv-site or the GitHub API, and the prose makes no
// claim the catalogue does not back.
//
// The bio used to say everything here was finished end to end, which the
// catalogue itself contradicted: a prototype and an experiment are listed as
// such, and several builds deliberately have no login. Completion is now a
// per-build fact, carried by `status` in data/projects.ts, and this file says
// nothing about it.

export const SITE = {
  name: 'Felix Ayeni',
  role: 'AI Engineer · Full-stack Developer',
  location: 'United Kingdom',

  // What I do, before what I have made. One sentence, no adjectives.
  specialism:
    'I build inspectable AI systems, local-first applications and practical business software.',

  // The claim the rest of the site has to back up. Keep it literal.
  lede: 'I build software you can check. You can inspect the records, reproduce the results, and keep using the apps with the network off.',

  bio: [
    'I’m an AI engineer and full-stack developer. I work across web, iOS and Flutter, on agents, games and developer tooling.',
    'Every build in the catalogue carries its own status, so you can tell what is deployed from what is finished but unreleased, and both from a prototype or an experiment. Nothing here has been released to users, and no entry claims usage or measured outcomes it cannot show you.',
    'The same argument keeps showing up in the work. The training log has no streaks and no confetti, because a record you trust is worth more than one that flatters you. The backtester carries an explicit lookahead guard, so a strategy that peeked at tomorrow gets thrown out. The compliance engine leaves a regulation value blank until someone has verified it. The repository scanner keeps its explanation layer where it cannot reach the finding underneath. The evaluation set makes no model call until a practitioner has approved the cases. The gift list hides reservations from its owner in the database, one layer below the interface.',
  ],

  // The hiring route, said plainly rather than implied by a contact link.
  hiring: {
    headline: 'Open to employment and to client work.',
    roles: ['AI Engineer', 'Full-stack Engineer', 'Software Engineer'],
    body: 'I’m looking for a role building AI systems or full-stack products, and I take on client work alongside it. Tell me what you need built and roughly when, and I’ll reply within a day.',
  },

  email: 'foayenix@gmail.com',
  phone: '07365 017665',
  phoneHref: 'tel:+447365017665',
  github: 'https://github.com/foayenix',

  // Set these and the buttons appear; leave them empty and nothing renders.
  // No placeholder URL is ever put here: a dead CV link costs more than a
  // missing one.
  cv: '',
  linkedin: '',
}
