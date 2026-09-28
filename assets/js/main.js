/**
 * Harry Taxi Services - Core Client Logic
 * Fast, Lightweight, Mobile-Optimized Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initEnquiryForm();
  initThankYouPage();
  initMapFacade();
  initAnalyticsTracking();
  initPrintButton();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const siteNav = document.querySelector('.site-nav');

  if (!toggleBtn || !siteNav) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    siteNav.classList.toggle('is-open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target) && !toggleBtn.contains(e.target) && siteNav.classList.contains('is-open')) {
      siteNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      siteNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
  });
}

/**
 * Date Enquiry Form Validation & WhatsApp Prefill
 */
function initEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');

  // Enforce minimum date of today
  const today = new Date().toISOString().split('T')[0];
  if (startDateInput) {
    startDateInput.min = today;
    startDateInput.addEventListener('change', () => {
      if (endDateInput) {
        endDateInput.min = startDateInput.value;
        if (endDateInput.value && endDateInput.value < startDateInput.value) {
          endDateInput.value = startDateInput.value;
        }
      }
    });
  }

  if (endDateInput) {
    endDateInput.min = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Honeypot Anti-Spam Check
    const honeypot = form.querySelector('input[name="bot_field"]');
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Bot detected via honeypot.');
      return false; // Silent ignore
    }

    // 2. Validate Dates
    const sDate = startDateInput ? startDateInput.value : '';
    const eDate = endDateInput ? endDateInput.value : '';

    if (sDate && sDate < today) {
      alert('Start date cannot be in the past.');
      startDateInput.focus();
      return;
    }

    if (sDate && eDate && eDate < sDate) {
      alert('End date must be the same as or after the start date.');
      endDateInput.focus();
      return;
    }

    // 3. Extract Values
    const name = form.querySelector('#client-name')?.value.trim() || '';
    const phone = form.querySelector('#client-phone')?.value.trim() || '';
    const email = form.querySelector('#client-email')?.value.trim() || '';
    const route = form.querySelector('#route-select')?.value || '';
    const vehicle = form.querySelector('#vehicle-select')?.value || '';
    const pickup = form.querySelector('#pickup-point')?.value.trim() || '';
    const passengers = form.querySelector('#passenger-count')?.value || '1';
    const luggage = form.querySelector('#luggage-count')?.value || '1';
    const notes = form.querySelector('#notes')?.value.trim() || '';

    if (!phone) {
      alert('Please provide a valid WhatsApp/Phone number so we can confirm vehicle availability.');
      form.querySelector('#client-phone')?.focus();
      return;
    }

    // 4. Save to SessionStorage for Thank-You Page
    const enquiryData = {
      name,
      phone,
      email,
      route,
      vehicle,
      startDate: sDate,
      endDate: eDate,
      pickup,
      passengers,
      luggage,
      notes,
      submittedAt: new Date().toLocaleString()
    };

    try {
      sessionStorage.setItem('latestEnquiry', JSON.stringify(enquiryData));
    } catch (err) {
      console.error('Storage error', err);
    }

    // 5. Fire GA4 Conversion Event
    if (typeof gtag === 'function') {
      gtag('event', 'form_submit', {
        event_category: 'enquiry',
        event_label: route || 'general_enquiry',
        vehicle_type: vehicle
      });
    }

    // 6. Build Prefilled WhatsApp Message
    const waText = 
      `*New Taxi Enquiry - Harry Taxi Services*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email || 'N/A'}\n` +
      `*Route/Circuit:* ${route}\n` +
      `*Vehicle:* ${vehicle}\n` +
      `*Dates:* ${sDate} to ${eDate}\n` +
      `*Pickup Point:* ${pickup}\n` +
      `*Passengers:* ${passengers} | *Luggage:* ${luggage} bags\n` +
      (notes ? `*Special Notes:* ${notes}\n` : '') +
      `\n_Please confirm vehicle availability and total fare quote._`;

    // Target WhatsApp Number (placeholder [WHATSAPP NUMBER])
    const waNumber = '919816000000'; // Replace with real owner WhatsApp number
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

    // Open WhatsApp in a new window/tab
    window.open(waUrl, '_blank');

    // Redirect to Thank-You Page
    window.location.href = '/thank-you/';
  });
}

/**
 * Thank You Page Loader
 */
function initThankYouPage() {
  const container = document.getElementById('enquiry-summary-container');
  if (!container) return;

  try {
    const raw = sessionStorage.getItem('latestEnquiry');
    if (!raw) return;

    const data = JSON.parse(raw);
    const summaryHtml = `
      <div class="callout-box" style="margin-top: 1.5rem; text-align: left;">
        <div class="callout-box-title">Submitted Details Summary</div>
        <ul style="list-style: none; padding: 0; margin: 0.5rem 0 0 0; font-size: 0.95rem;">
          <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
          <li><strong>Phone (WhatsApp):</strong> ${escapeHtml(data.phone)}</li>
          <li><strong>Route:</strong> ${escapeHtml(data.route)}</li>
          <li><strong>Vehicle:</strong> ${escapeHtml(data.vehicle)}</li>
          <li><strong>Travel Dates:</strong> ${escapeHtml(data.startDate)} to ${escapeHtml(data.endDate)}</li>
          <li><strong>Pickup Point:</strong> ${escapeHtml(data.pickup)}</li>
          <li><strong>Passengers:</strong> ${escapeHtml(data.passengers)} | <strong>Luggage:</strong> ${escapeHtml(data.luggage)} bags</li>
          ${data.notes ? `<li><strong>Notes:</strong> ${escapeHtml(data.notes)}</li>` : ''}
        </ul>
      </div>
    `;
    container.innerHTML = summaryHtml;
  } catch (e) {
    console.error('Error rendering enquiry summary', e);
  }
}

/**
 * Click-to-load Google Maps Facade
 * Guarantees zero initial iframe overhead & 100% Core Web Vitals score
 */
function initMapFacade() {
  const facadeBtn = document.getElementById('load-map-btn');
  const container = document.getElementById('map-container');

  if (!facadeBtn || !container) return;

  facadeBtn.addEventListener('click', () => {
    // Replace facade button with responsive iframe
    container.innerHTML = `
      <iframe 
        title="Harry Taxi Services Location Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109287.49887754162!2d77.1009!3d31.1048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390578e3e35d6e67%3A0x1f7e7ff6ff9f5460!2sShimla%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        width="100%" 
        height="380" 
        style="border:0; border-radius: var(--radius-lg);" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    `;
    container.style.padding = '0';
    container.style.minHeight = '380px';
  });
}

/**
 * Analytics Tracking for Conversions
 */
function initAnalyticsTracking() {
  // Track WhatsApp clicks
  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
          event_label: link.getAttribute('data-track-label') || link.innerText.trim() || 'WhatsApp CTA'
        });
      }
    });
  });

  // Track Call clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'call_click', {
          event_category: 'engagement',
          event_label: link.getAttribute('data-track-label') || link.href
        });
      }
    });
  });
}

/**
 * Print Button Trigger for Printable Itinerary
 */
function initPrintButton() {
  const printBtns = document.querySelectorAll('.print-itinerary-btn');
  printBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
