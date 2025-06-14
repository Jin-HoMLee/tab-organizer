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

// Group tabs by tabGroup
async function groupTabs(tabs) {
  const groupMap = {};
  const ungrouped = [];
  const groupIds = new Set();

  // Collect all group ids
  tabs.forEach(tab => {
    if (tab.groupId !== undefined && tab.groupId !== -1) {
      groupIds.add(tab.groupId);
    }
  });

  // Get group info for all group ids
  const groupInfo = {};
  await Promise.all(
    Array.from(groupIds).map(async groupId => {
      try {
        const info = await chrome.tabGroups.get(groupId);
        groupInfo[groupId] = info;
      } catch(e) {
        // ignore errors
      }
    })
  );

  // Assign tabs to groups
  tabs.forEach(tab => {
    if (tab.groupId !== undefined && tab.groupId !== -1 && groupInfo[tab.groupId]) {
      const groupTitle = groupInfo[tab.groupId].title || "Unnamed Group";
      if (!groupMap[groupTitle]) groupMap[groupTitle] = [];
      groupMap[groupTitle].push(tab);
    } else {
      ungrouped.push(tab);
    }
  });

  return { groupMap, ungrouped };
}

// Format grouped tabs as HTML
async function tabsToHTML(tabs) {
  const {groupMap, ungrouped} = await groupTabs(tabs);

  let html = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Exported Tabs</title></head><body>\n";
  html += "<h2>Exported Tabs</h2>\n";
  // Tab groups
  for (const groupTitle of Object.keys(groupMap)) {
    html += `<h3>${groupTitle}</h3>\n<ul>\n`;
    for (const tab of groupMap[groupTitle]) {
      html += `<li><a href="${tab.url}">${tab.title}</a></li>\n`;
    }
    html += "</ul>\n";
  }
  // Ungrouped
  if (ungrouped.length) {
    html += `<h3>Ungrouped</h3>\n<ul>\n`;
    for (const tab of ungrouped) {
      html += `<li><a href="${tab.url}">${tab.title}</a></li>\n`;
    }
    html += "</ul>\n";
  }
  html += "</body></html>\n";
  return html;
}

// Format grouped tabs as Markdown
async function tabsToMarkdown(tabs) {
  const {groupMap, ungrouped} = await groupTabs(tabs);

  let md = "# Exported Tabs\n\n";
  // Tab groups
  for (const groupTitle of Object.keys(groupMap)) {
    md += `## ${groupTitle}\n`;
    for (const tab of groupMap[groupTitle]) {
      md += `- [${tab.title}](${tab.url})\n`;
    }
    md += "\n";
  }
  // Ungrouped
  if (ungrouped.length) {
    md += `## Ungrouped\n`;
    for (const tab of ungrouped) {
      md += `- [${tab.title}](${tab.url})\n`;
    }
    md += "\n";
  }
  return md;
}

// Export all tabs as HTML
document.getElementById('export-html-btn').onclick = async () => {
  document.getElementById('status').innerText = "Exporting...";
  const tabs = await chrome.tabs.query({currentWindow: true});
  const html = await tabsToHTML(tabs);
  downloadFile("tabs-export.html", html, "text/html");
  document.getElementById('status').innerText = "HTML file downloaded!";
};

// Export all tabs as Markdown
document.getElementById('export-md-btn').onclick = async () => {
  document.getElementById('status').innerText = "Exporting...";
  const tabs = await chrome.tabs.query({currentWindow: true});
  const md = await tabsToMarkdown(tabs);
  downloadFile("tabs-export.md", md, "text/markdown");
  document.getElementById('status').innerText = "Markdown file downloaded!";
};