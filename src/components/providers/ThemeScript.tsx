import Script from "next/script";

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme =
      stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return (
    // beforeInteractive is valid here: this renders inside the App Router
    // root layout, which is the documented place for it.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="theme-script" strategy="beforeInteractive">
      {themeScript}
    </Script>
  );
}
