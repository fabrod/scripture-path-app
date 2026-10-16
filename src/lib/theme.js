// Design tokens — replicated from realscripturepath.com
export const colors = {
  background: '#faf8f4',      // warm cream
  card: '#ffffff',             // white cards
  cardCream: '#fffdf8',        // cream card variant
  tintPink: '#fdeeee',         // pale pink tinted cards
  accent: '#b3402a',           // terracotta/rust primary
  accentDark: '#93331f',       // darker terracotta (pressed)
  text: '#2b2118',             // dark brown/charcoal body
  textLight: '#6b5d4f',       // muted brown-gray
  border: '#e8e0d4',           // subtle borders
  footer: '#2b2118',           // dark brown footer
  footerText: '#f5efe4',       // cream footer text
  white: '#ffffff',
};

export const fonts = {
  serif: 'Georgia',            // display headings (system serif)
  sans: 'System',              // body text
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
export const radius = { sm: 8, md: 12, lg: 16, pill: 999 };

export const shadow = {
  card: {
    shadowColor: '#2b2118',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
};
