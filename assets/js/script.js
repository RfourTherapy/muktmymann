/* ============================================================
   MANNMUKT — script.js
   Nav, mobile menu, scroll reveal, gallery + filter, lightbox,
   upcoming events, partner tabs, enquiry form
   ============================================================ */

'use strict';

var ICONS = {
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'
};

function escapeHtml(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

/* ============================================================
   NAV — shadow on scroll
   ============================================================ */
function initNav() {
  var nav = document.getElementById('nav');
  if (!nav) return;

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
}

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
function initHamburger() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  function setOpen(isOpen) {
    navLinks.classList.toggle('is-open', isOpen);
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', function () {
    setOpen(!navLinks.classList.contains('is-open'));
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) setOpen(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1080 && navLinks.classList.contains('is-open')) setOpen(false);
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  var elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(function (el) { observer.observe(el); });
}

/* ============================================================
   LIGHTBOX — any [data-lightbox] button with data-src
   ============================================================ */
var Lightbox = (function () {
  var box, img, caption, items = [], index = 0, lastFocus = null;

  function build() {
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photo viewer');
    box.innerHTML =
      '<button class="lightbox-btn lightbox-close" aria-label="Close">&times;</button>' +
      '<button class="lightbox-btn lightbox-prev" aria-label="Previous photo">&#8249;</button>' +
      '<img alt="" />' +
      '<button class="lightbox-btn lightbox-next" aria-label="Next photo">&#8250;</button>' +
      '<p class="lightbox-caption"></p>';
    document.body.appendChild(box);
    img = box.querySelector('img');
    caption = box.querySelector('.lightbox-caption');

    box.querySelector('.lightbox-close').addEventListener('click', close);
    box.querySelector('.lightbox-prev').addEventListener('click', function () { step(-1); });
    box.querySelector('.lightbox-next').addEventListener('click', function () { step(1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });

    var startX = null;
    box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      startX = null;
    });
  }

  function show() {
    var item = items[index];
    img.src = item.getAttribute('data-src');
    img.alt = item.getAttribute('data-caption') || '';
    caption.textContent = (item.getAttribute('data-caption') || '') + '  ·  ' + (index + 1) + ' / ' + items.length;
  }

  function step(dir) {
    index = (index + dir + items.length) % items.length;
    show();
  }

  function open(trigger) {
    if (!box) build();
    var group = trigger.getAttribute('data-lightbox');
    items = Array.prototype.filter.call(
      document.querySelectorAll('[data-lightbox="' + group + '"]'),
      function (el) { return !el.classList.contains('is-hidden'); }
    );
    index = Math.max(0, items.indexOf(trigger));
    lastFocus = trigger;
    show();
    box.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    box.querySelector('.lightbox-close').focus();
  }

  function close() {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-lightbox]');
    if (trigger) { e.preventDefault(); open(trigger); }
  });

  return { open: open };
})();

/* ============================================================
   GALLERY — build and filter (Media page)
   ============================================================ */
function buildGallery() {
  var gallery = document.getElementById('gallery');
  if (!gallery || typeof GALLERY === 'undefined') return;

  GALLERY.forEach(function (photo) {
    var item = document.createElement('button');
    item.type = 'button';
    item.className = 'gallery-item';
    item.setAttribute('data-cat', photo.cat);
    item.setAttribute('data-lightbox', 'gallery');
    item.setAttribute('data-src', 'assets/img/' + photo.img);
    item.setAttribute('data-caption', photo.label);
    item.setAttribute('aria-label', 'View photo: ' + photo.label);
    item.innerHTML =
      '<img src="assets/img/' + escapeHtml(photo.img) + '" alt="' + escapeHtml(photo.label) + '" loading="lazy" decoding="async" />' +
      '<span class="gallery-item-overlay" aria-hidden="true">' + escapeHtml(photo.label) + '</span>';
    gallery.appendChild(item);
  });

  var buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        item.classList.toggle('is-hidden', filter !== 'all' && item.getAttribute('data-cat') !== filter);
      });
    });
  });
}

/* ============================================================
   UPCOMING EVENTS
   ============================================================ */
function formatDate(iso) {
  var d = new Date(iso + 'T00:00:00');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
}

function buildUpcoming() {
  var list = document.getElementById('upcoming-list');
  if (!list || typeof UPCOMING_EVENTS === 'undefined') return;

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var events = UPCOMING_EVENTS
    .filter(function (ev) { return !ev.date || new Date(ev.date + 'T00:00:00') >= today; })
    .sort(function (a, b) { return (a.date || '').localeCompare(b.date || ''); });

  var limit = parseInt(list.getAttribute('data-limit'), 10);
  if (limit) events = events.slice(0, limit);

  if (!events.length) return; // keep the "coming soon" empty state already in the HTML

  list.innerHTML = events.map(function (ev) {
    var img = ev.image || 'assets/img/meet-diya-marigolds.jpg';
    var meta = '';
    if (ev.date) meta += '<span>' + ICONS.calendar + escapeHtml(formatDate(ev.date)) + '</span>';
    if (ev.time) meta += '<span>' + ICONS.clock + escapeHtml(ev.time) + '</span>';
    if (ev.venue) meta += '<span>' + ICONS.pin + escapeHtml(ev.venue) + '</span>';
    var link = ev.registerLink
      ? '<div class="btn-row"><a class="btn btn--primary" href="' + escapeHtml(ev.registerLink) + '" target="_blank" rel="noopener">Register / RSVP</a></div>'
      : '';
    return '<article class="event-card reveal is-visible">' +
      '<div class="event-card-media"><img src="' + escapeHtml(img) + '" alt="" loading="lazy" /></div>' +
      '<div class="event-card-body">' +
        (ev.type ? '<span class="event-tag">' + escapeHtml(ev.type) + '</span>' : '') +
        '<h3>' + escapeHtml(ev.title) + '</h3>' +
        '<div class="event-meta">' + meta + '</div>' +
        (ev.description ? '<p>' + escapeHtml(ev.description) + '</p>' : '') +
        link +
      '</div></article>';
  }).join('');
}

/* ============================================================
   TABS (Partner page)
   ============================================================ */
function initTabs() {
  var tabs = document.querySelectorAll('[role="tab"]');
  if (!tabs.length) return;

  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab); });
    tab.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      next.focus();
      select(next);
    });
  });

  // Allow deep links like partner.html#schools
  var hash = window.location.hash.replace('#', '');
  var fromHash = document.getElementById('tab-' + hash);
  if (fromHash) select(fromHash);
}

/* ============================================================
   ENQUIRY FORM — opens the visitor's email app with details filled in
   ============================================================ */
function initEnquiryForm() {
  var form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var data = new FormData(form);
    var subject = 'Programme enquiry: ' + data.get('organisation') + ' (' + data.get('type') + ')';
    var body = [
      'Name: ' + data.get('name'),
      'Organisation: ' + data.get('organisation'),
      'Type: ' + data.get('type'),
      'Email: ' + data.get('email'),
      'Phone: ' + (data.get('phone') || '-'),
      'Approx. group size: ' + (data.get('size') || '-'),
      '',
      data.get('message') || ''
    ].join('\n');
    window.location.href = 'mailto:' + form.getAttribute('data-to') +
      '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  initNav();
  initHamburger();
  buildGallery();
  buildUpcoming();
  initTabs();
  initEnquiryForm();
  initScrollReveal();
});
