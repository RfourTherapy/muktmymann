# MannMukt website

A static website (plain HTML, CSS and JavaScript). No build step or server code is needed: upload the whole folder to any web host (Netlify, Vercel, GitHub Pages, Hostinger, GoDaddy and so on) and point www.mannmukt.com at it.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `about.html` | About, mission, values, founder, timeline |
| `media.html` | Video and filterable photo gallery |
| `upcoming-events.html` | Upcoming events (from `assets/js/data.js`) |
| `past-events.html` | #KaiseHo? with TEDxRambaug, 3-year campus campaign, Awareness Meet |
| `partner.html` | Programmes for schools, colleges and corporates, with an enquiry form |

## Common updates

- **Add an upcoming event:** open `assets/js/data.js`, copy the example block into `UPCOMING_EVENTS`, edit it and save. Past dates hide themselves automatically. The Home page shows the next two.
- **Add photos to the gallery:** put the photo in `assets/img/` and add a line to `GALLERY` in `assets/js/data.js`.
- **Change the contact email:** search for `infomannmukt@gmail.com` in the `.html` files.

## Notes

- The enquiry form opens the visitor's email app with the details filled in. To receive submissions without email (for example in a Google Sheet), connect a form service such as Formspree or Netlify Forms.
- Photos were resized for the web; the originals are untouched in the `mannmukt media` folder.
