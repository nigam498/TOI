window.runHTML = function(htmlString, opts = {}) {
  // opts.container (DOM element) use કરવા માટે; default body
  const container = opts.container || document.body;
  const wrapper = document.createElement('div');

  // Optional id/class to help cleanup later
  if (opts.id) wrapper.id = opts.id;
  if (opts.className) wrapper.className = opts.className;

  // Set HTML (this will create nodes but NOT execute <script> contents)
  wrapper.innerHTML = htmlString;

  // Move scripts out and re-create them so browsers execute them
  const scripts = wrapper.querySelectorAll('script');
  scripts.forEach(oldScript => {
    const newScript = document.createElement('script');

    // Copy attributes (type, src, async, defer, etc.)
    for (let i = 0; i < oldScript.attributes.length; i++) {
      const attr = oldScript.attributes[i];
      newScript.setAttribute(attr.name, attr.value);
    }

    if (oldScript.src) {
      // External script — set src (browser will fetch & run)
      newScript.src = oldScript.src;
    } else {
      // Inline script — copy text content
      newScript.textContent = oldScript.textContent;
    }

    // Replace old script with the new one (to trigger execution)
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });

  // Append wrapper to container (now DOM nodes + executed scripts)
  container.appendChild(wrapper);

  // Return wrapper for convenience (so caller can remove later)
  return wrapper;
};
