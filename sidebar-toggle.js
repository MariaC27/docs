// Collapse button for Mintlify's sidebar on inner pages, matching the homepage rail's toggle.
// Mintlify loads every .js file in the repo on every page. Mintlify's own sidebar can't collapse,
// so this adds a panel button and slides the sidebar away when it's closed. Open, the button sits
// at the sidebar's right edge in the top bar; closed, it slides to the left of the name.
// The open/closed choice is shared with the homepage rail (sessionStorage 'rv-rail-open'):
// '0' means closed. Styles: style.css, "Sidebar: name and collapse button".
(function () {
  var KEY = 'rv-rail-open';
  var animTimer = null;
  var ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>';

  function isClosed() {
    try { return sessionStorage.getItem(KEY) === '0'; } catch (e) { return false; }
  }
  function apply() {
    var closed = isClosed();
    document.documentElement.classList.toggle('mc-rail-closed', closed);
    var b = document.getElementById('mc-rail-toggle');
    if (b) {
      b.setAttribute('aria-expanded', closed ? 'false' : 'true');
      b.setAttribute('aria-label', closed ? 'Expand navigation' : 'Collapse navigation');
    }
  }
  function inject() {
    if (document.getElementById('mc-rail-toggle')) return;
    if (document.querySelector('.rv')) return;   // the homepage has its own rail
    var logo = document.querySelector('#navbar a[href="/"]');
    if (!logo || !logo.parentElement) return;
    var b = document.createElement('button');
    b.id = 'mc-rail-toggle';
    b.type = 'button';
    b.className = 'mc-rail-toggle';
    b.innerHTML = ICON;
    b.addEventListener('click', function () {
      var root = document.documentElement;
      var nowClosed = !root.classList.contains('mc-rail-closed');
      try { sessionStorage.setItem(KEY, nowClosed ? '0' : '1'); } catch (e) { /* storage blocked */ }
      // Animate only this switch; page changes rebuild the header and should just appear in place
      root.classList.add('mc-rail-animating');
      clearTimeout(animTimer);
      animTimer = setTimeout(function () { root.classList.remove('mc-rail-animating'); }, 400);
      apply();
    });
    logo.parentElement.classList.add('mc-head');
    logo.parentElement.insertBefore(b, logo);
    place();
    apply();
  }
  // Where the button sits while the sidebar is open: its right edge 16px in from the sidebar's
  // right edge. offsetLeft/offsetWidth ignore the slide-away transform, so this holds when closed.
  function place() {
    var head = document.querySelector('.mc-head');
    var bar = document.getElementById('sidebar-content');
    if (!head || !bar) return;
    var left = bar.offsetLeft + bar.offsetWidth - 16 - 40 - head.getBoundingClientRect().left;
    head.style.setProperty('--mc-open-left', Math.max(0, Math.round(left)) + 'px');
  }
  window.addEventListener('resize', place);

  apply();
  inject();
  // Mintlify re-renders the header when navigating between pages; put the button back if it goes.
  var queued = false;
  new MutationObserver(function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; inject(); });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
