/* =====================================================
   ASHITOSH PATIL - PORTFOLIO  |  script.js
   Uses jQuery ($) + plain JavaScript.
   Everything runs after the page has loaded.
   ===================================================== */
$(document).ready(function () {

  /* ---------- 1. MOBILE MENU (hamburger) ---------- */
  $("#menuToggle").on("click", function () {
    $("#navLinks").toggleClass("open");
    // Switch the icon between bars and X
    $(this).find("i").toggleClass("fa-bars fa-xmark");
  });

  /* ---------- 2. ACTIVE NAV LINK ---------- */
  // Get the current file name from the URL, e.g. "about.html"
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  $("#navLinks a").each(function () {
    if ($(this).attr("href") === currentPage) {
      $(this).addClass("active");
    }
  });

  /* ---------- 3. DARK / LIGHT MODE ---------- */
  // Remember the choice using localStorage
  if (localStorage.getItem("theme") === "light") {
    $("body").addClass("light");
    $("#themeToggle i").removeClass("fa-moon").addClass("fa-sun");
  }
  $("#themeToggle").on("click", function () {
    $("body").toggleClass("light");
    var isLight = $("body").hasClass("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    $(this).find("i").toggleClass("fa-moon", !isLight).toggleClass("fa-sun", isLight);
  });

  /* ---------- 4. SMOOTH SCROLLING (for #links on the same page) ---------- */
  $('a[href^="#"]').on("click", function (e) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: target.offset().top - 70 }, 700);
    }
  });

  /* ---------- 5. TYPING ANIMATION (home page only) ---------- */

  if ($("#typing").length) {

    var words = [
      "Computer Science Student",
      "Python Programmer",
      "Java Programmer",
      "Web Development Learner"
    ];

    var wordIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function type() {

      var word = words[wordIndex];

      if (!deleting) {

        charIndex++;

        $("#typing").text(word.substring(0, charIndex));

        if (charIndex === word.length) {
          deleting = true;
          setTimeout(type, 1500);
          return;
        }

      } else {

        charIndex--;

        $("#typing").text(word.substring(0, charIndex));

        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      setTimeout(type, deleting ? 50 : 100);
    }

    type();
  }

  /* ---------- 6. SCROLL REVEAL ---------- */
  // Elements with class "reveal" fade in when they enter the screen
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });

  /* ---------- 7. BACK TO TOP BUTTON ---------- */
  $(window).on("scroll", function () {
    $("#backToTop").toggleClass("show", $(this).scrollTop() > 300);
  });
  $("#backToTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 700);
  });

  /* ---------- 8. PRINT BUTTONS (resume + biodata) ---------- */
  $(".print-btn").on("click", function () { window.print(); });

  /* ---------- 9. DOWNLOAD RESUME AS PDF ---------- */
  // Uses the html2pdf.js library (loaded in resume.html)
  $("#downloadPdf").on("click", function () {
    var element = document.getElementById("resumeContent");
    if (typeof html2pdf === "undefined") {
      alert("PDF library could not load. Check your internet connection, or use the Print button and choose 'Save as PDF'.");
      return;
    }
    html2pdf().set({
      margin: 10,
      filename: "Ashitosh_Patil_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    }).from(element).save();
  });

  /* ---------- 10. CERTIFICATE IMAGE PREVIEW (click to zoom) ---------- */
  $(".cert-card[data-img]").on("click", function () {
    $("#lightboxImg").attr("src", $(this).data("img"));
    $("#lightbox").addClass("open");
  });
  $("#lightbox").on("click", function () { $(this).removeClass("open"); });
  $(document).on("keydown", function (e) {            // Esc key closes it too
    if (e.key === "Escape") { $("#lightbox").removeClass("open"); }
  });

  // If a certificate image is missing, show an icon instead of a broken image
  $(".cert-img img").on("error", function () {
    $(this).hide().parent().prepend('<i class="fa-solid fa-award"></i>');
  });
  // Same for profile pictures
  $("img.profile-photo").on("error", function () {
    $(this).hide().parent().prepend('<i class="fa-solid fa-user placeholder"></i>');
  });
  // The image may have already failed before this script ran, so check again
  $("img.profile-photo, .cert-img img").each(function () {
    if (this.complete && this.naturalWidth === 0) { $(this).trigger("error"); }
  });

  /* ---------- 11. CONTACT FORM VALIDATION ---------- */
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();                               // stop page reload
    var valid = true;
    $(".error-msg").text("");
    $("input, textarea").removeClass("input-error");

    function showError(id, msg) {
      $("#" + id).addClass("input-error");
      $("#" + id + "Err").text(msg);
      valid = false;
    }

    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var subject = $("#subject").val().trim();
    var message = $("#message").val().trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // simple email check

    if (name.length < 3) showError("name", "Please enter your name (at least 3 characters).");
    if (!emailPattern.test(email)) showError("email", "Please enter a valid email address.");
    if (subject.length < 3) showError("subject", "Please enter a subject.");
    if (message.length < 10) showError("message", "Message must be at least 10 characters.");

    if (valid) {
      // No backend in this college project, so we just show a success message
      $("#formSuccess").fadeIn();
      this.reset();
      setTimeout(function () { $("#formSuccess").fadeOut(); }, 5000);
    }
  });

  /* ---------- 12. FOOTER YEAR ---------- */
  $("#year").text(new Date().getFullYear());
});
