# Scripture Path

Bible reader, daily devotionals, audio chapters, prayer community, and church finder — free, no account required.

**Real Scripture Path Inc.** · https://realscripturepath.com

## Stack
- Expo React Native (SDK 52) + EAS cloud build → TestFlight → App Store
- Node/Express backend (Render) — API-key proxy, devotionals, search, contact form

## Project layout
- `App.js` — entry, stack navigation
- `src/screens/` — Home, Devotional, Reader, Search, Prayer, Church, Bookmarks, Contact, Settings
- `src/lib/` — theme, api client, bible catalog, on-device storage
- `src/components/` — shared header, buttons, cards
- `backend/` — Express server (`/api/bible`, `/api/devotional`, `/api/explain`, `/api/search`, `/api/churches`, `/api/prayer`, `/api/contact`, `/privacy`)

## Backend env vars
| Var | Purpose |
|---|---|
| `ESV_API_KEY` | Crossway ESV API (api.esv.org) |
| `NLT_API_KEY` | Tyndale NLT API |
| `API_BIBLE_KEY` | api.bible (NKJV) |
| `GOOGLE_PLACES_KEY` | Church finder |
| `RESEND_API_KEY` | Contact form + prayer forwarding (Resend) |
| `CONTACT_EMAIL` | Inbox for contact/prayers (default fabrod035@gmail.com) |

## Ship it (on a Mac)
```
git clone https://github.com/fabrod/scripture-path-app.git
cd scripture-path-app
npm install
npm install -g eas-cli && eas login
eas build --platform ios --profile production
eas submit --platform ios
```
