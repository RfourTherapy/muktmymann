/* ============================================================
   MANNMUKT — data.js
   Edit this file to update the site's events and photo gallery.
   No coding knowledge needed: copy an entry, change the text,
   save, and re-upload this file.
   ============================================================ */

'use strict';

/* ------------------------------------------------------------
   UPCOMING EVENTS
   Add one block per event. Dates use YYYY-MM-DD.
   Events whose date has passed are hidden automatically.
   Leave the list empty [] to show the "new dates soon" message.

   Example (copy, paste between the brackets and edit):

   {
     title: 'Listening Circle: Let\'s Talk',
     date: '2026-12-10',
     time: '5:00 PM – 7:00 PM',
     venue: 'Bookmark Cafe, Kalyan (W)',
     type: 'Community event',
     description: 'A safe, judgement-free circle to share and be heard.',
     image: 'assets/img/meet-listening.jpg',
     registerLink: 'https://instagram.com/mann_mukt'
   },
   ------------------------------------------------------------ */
var UPCOMING_EVENTS = [
];

/* ------------------------------------------------------------
   PHOTO GALLERY (Media page)
   cat must be one of: community, campus, tedx, team
   ------------------------------------------------------------ */
var GALLERY = [
  { img: 'meet-lamp-lighting.jpg',   cat: 'community', label: 'Lamp lighting to open the awareness meet' },
  { img: 'meet-presentation.jpg',    cat: 'community', label: 'Mental health awareness talk' },
  { img: 'tedx-kaiseho-poster.jpg',  cat: 'tedx',      label: 'TEDxRambaug × MannMukt: #KaiseHo?' },
  { img: 'meet-sharing.jpg',         cat: 'community', label: 'Sharing in the open circle' },
  { img: '3years-campus.jpg',        cat: 'campus',    label: 'MannMukt completes 3 years' },
  { img: 'meet-audience.jpg',        cat: 'community', label: 'A full room at the awareness meet' },
  { img: 'tedx-speaker.jpg',         cat: 'tedx',      label: 'Speaking at #KaiseHo?, Bookmark Cafe' },
  { img: 'meet-diya-marigolds.jpg',  cat: 'community', label: 'Diya and marigolds' },
  { img: 'team-volunteers.jpg',      cat: 'team',      label: 'The MannMukt volunteer team' },
  { img: '3years-important.jpg',     cat: 'campus',    label: 'Mental health is as important as physical health' },
  { img: 'meet-speaker.jpg',         cat: 'community', label: 'Opening address' },
  { img: 'meet-letter-to-self.jpg',  cat: 'community', label: 'Writing a letter to oneself' },
  { img: 'tedx-group.jpg',           cat: 'tedx',      label: 'The #KaiseHo? community' },
  { img: 'meet-bookmarks.jpg',       cat: 'community', label: '"It\'s okay not to be okay" bookmarks' },
  { img: 'meet-listening.jpg',       cat: 'community', label: 'Listening, really listening' },
  { img: '3years-real.jpg',          cat: 'campus',    label: 'Mental health is as real as physical health' },
  { img: 'meet-conversation.jpg',    cat: 'community', label: 'Conversations that matter' },
  { img: 'tedx-felicitation.jpg',    cat: 'tedx',      label: 'Felicitation at #KaiseHo?' },
  { img: 'meet-applause.jpg',        cat: 'community', label: 'Applause for every story shared' },
  { img: 'meet-writing.jpg',         cat: 'community', label: 'Putting feelings into words' },
  { img: '3years-group.jpg',         cat: 'campus',    label: 'Campus awareness drive' },
  { img: 'meet-reflection.jpg',      cat: 'community', label: 'A moment of reflection' },
  { img: 'meet-hands.jpg',           cat: 'community', label: 'Speaking from experience' },
  { img: 'tedx-group-2.jpg',         cat: 'tedx',      label: 'Together at Bookmark Cafe' },
  { img: 'meet-letter-writing.jpg',  cat: 'community', label: 'Letters of hope' },
  { img: 'meet-attendee.jpg',        cat: 'community', label: 'Being heard' },
  { img: 'meet-notes.jpg',           cat: 'community', label: 'Reflective writing activity' }
];
