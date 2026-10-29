// Starts the feedback tool (feedback-tool/) on a page of the book. project.ptx adds this script to every page of the
// teacher version (html.js.extra), and print-button.js adds it to the lesson plans'.
//
// Feedback goes to this repository's issues. Readers with a GitHub account can send it now. Anonymous feedback needs
// a copy of the web app in tools/apps-script/ of IDEMSInternational/IDEMS-case-studies: put its address in
// FEEDBACK_ENDPOINT and the GitHub account it posts as in FEEDBACK_BOT.
(function () {
  const REPOSITORY = "IDEMSInternational/CBC-Grade-10-Maths-with-Feedback";
  const FEEDBACK_ENDPOINT = "";
  const FEEDBACK_BOT = "";

  const me = document.currentScript, base = new URL(".", me.src).href; // the version's external/ folder
  // The book's site is the folder above external/. The lesson plans are published in its plans/ folder and say so
  // with data-root="..", so that their pages, which have the same names as the teacher version's, keep their own
  // feedback.
  const root = new URL(me.dataset.root ? `../${me.dataset.root.replace(/\/*$/, "/")}` : "../", base).href;

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = base + "feedback-tool/feedback.css";
  document.head.append(css);

  const tool = document.createElement("script");
  tool.src = base + "feedback-tool/tool.js";
  tool.onload = () => FeedbackTool.init({
    repository: REPOSITORY,
    root,
    site: base + "feedback-tool/plugins/pretext-site.js",
    ...(FEEDBACK_ENDPOINT ? { feedbackEndpoint: FEEDBACK_ENDPOINT, feedbackBot: FEEDBACK_BOT } : {}),
    showOpenFeedback: true,
    markers: "touch",
  });
  document.head.append(tool);
})();
