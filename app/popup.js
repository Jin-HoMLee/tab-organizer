// Utility to download a file
function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Format tabs as HTML
function tabsToHTML(tabs) {
  let html = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Exported Tabs</title></head><body>\n";
  html += "<h2>Exported Tabs</h2>\n<ul>\n";
  for (const tab of tabs) {
    html += `<li><a href="${tab.url}">${tab.title}</a></li>\n`;
  }
  html += "</ul>\n</body></html>\n";
  return html;
}

// Format tabs as Markdown
function tabsToMarkdown(tabs) {
  let md = "# Exported Tabs\n\n";
  for (const tab of tabs) {
    md += `- [${tab.title}](${tab.url})\n`;
  }
  return md;
}

// Export all tabs as HTML
document.getElementById('export-html-btn').onclick = async () => {
  document.getElementById('status').innerText = "Exporting...";
  const tabs = await chrome.tabs.query({currentWindow: true});
  const html = tabsToHTML(tabs);
  downloadFile("tabs-export.html", html, "text/html");
  document.getElementById('status').innerText = "HTML file downloaded!";
};

// Export all tabs as Markdown
document.getElementById('export-md-btn').onclick = async () => {
  document.getElementById('status').innerText = "Exporting...";
  const tabs = await chrome.tabs.query({currentWindow: true});
  const md = tabsToMarkdown(tabs);
  downloadFile("tabs-export.md", md, "text/markdown");
  document.getElementById('status').innerText = "Markdown file downloaded!";
};