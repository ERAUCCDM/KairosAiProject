document.addEventListener("DOMContentLoaded", function () {

  var placeholders = document.querySelectorAll(".video-placeholder");
  placeholders.forEach(function (el) {
    var id = el.getAttribute("data-video-id");
    if (id && id.indexOf("VIDEO_ID") !== 0) {
      var img = document.createElement("img");
      img.className = "thumb";
      img.src = "https://img.youtube.com/vi/" + id + "/hqdefault.jpg";
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      el.insertBefore(img, el.firstChild);
    }
    el.addEventListener("click", function () {
      if (!id || id.indexOf("VIDEO_ID") === 0) return;
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.setAttribute("title", "Embedded YouTube video");
      this.innerHTML = "";
      this.appendChild(iframe);
    });
  });

  var subsectionButtons = document.querySelectorAll(".subsection-nav button");
  var subsections = document.querySelectorAll(".lit-subsection");
  subsectionButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-target");
      subsectionButtons.forEach(function (b) { b.classList.remove("active"); });
      subsections.forEach(function (s) { s.classList.remove("active"); });
      btn.classList.add("active");
      var panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });

  var meetings = document.querySelectorAll(".meeting");
  meetings.forEach(function (m) {
    var toggle = m.querySelector(".meeting-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        m.classList.toggle("open");
      });
    }
  });

  var expandAll = document.getElementById("expand-all");
  var collapseAll = document.getElementById("collapse-all");
  if (expandAll) {
    expandAll.addEventListener("click", function () {
      meetings.forEach(function (m) { m.classList.add("open"); });
    });
  }
  if (collapseAll) {
    collapseAll.addEventListener("click", function () {
      meetings.forEach(function (m) { m.classList.remove("open"); });
    });
  }

  var backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", function () {
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  });
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var titleLink = document.querySelector(".title-link");
  if (titleLink) {
    titleLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".header-links a[href^='#']");
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    sections.forEach(function (section) { observer.observe(section); });
  }
});
