const n=`<div id="workbench-container">
  <style>
    .banner {
      display: none !important;
    }

    #banner {
      display: none !important;
    }

    .loading-bar-container {
      position: fixed;
      left: 0; bottom: 0;
      width: 100vw; height: 5px;
      background: rgba(0,0,0,0.07);
      z-index: 9999;
      pointer-events: none;
      display: none; /* Hide by default */
    }
    .loading-bar {
      height: 100%;
      width: 0;
      background: #f9c859;
      transition: width 0.4s cubic-bezier(.46,.03,.52,.96); /* For finish */
      /* Let animation take over when active */
    }
    /* Show when active */
    .loading-bar.active {
      animation: loading-bar-progress 1.4s cubic-bezier(.24,.66,.57,1) forwards;
      /* duration should match your loading time ideally */
    }
    .loading-bar-container.active {
      display: block;
    }
    /* Fill the whole width immediately when finishing */
    .loading-bar.finish {
      width: 100%;
      animation: none !important;
      transition: width 0.4s cubic-bezier(.46,.03,.52,.96);
    }

    /* Keyframes for nonlinear animation, fast at first, slow at end */
    @keyframes loading-bar-progress {
      0%   { width: 0; }
      75%  { width: 90%; } /* Rapidly cover most */
      100% { width: 95%; }
    }
    /* (The 'finish' class covers the last 5%) */
  </style>
  <div id="titleBar"></div>
  <div id="banner" style="display:none;"></div>
  <div id="workbench-top">
    <div style="display: flex; flex: none; border: 1px solid var(--vscode-editorWidget-border)">
      <div id="activityBar"></div>
      <div id="sidebar" style="width: 220px"></div>
      <div id="auxiliaryBar-left" style="max-width: 300px"></div>
    </div>
    <div style="flex: 1; min-width: 0;flex-direction: row">
      <div class="loading-bar-container" id="barContainer">
        <div class="loading-bar" id="bar"></div>
      </div>

      <!-- <h1>Editor</h1>
      <button id="clearStorage">Clear user data</button>
      <button id="togglePanel">Toggle Panel</button>
      <button id="toggleAuxiliary">Toggle Secondary Panel</button>
      <button id="resetLayout">resetLayout</button> -->
      <div id="editors"></div>

      <!-- <button id="toggleHTMLFileSystemProvider">Toggle HTML filesystem provider</button>
    <button id="customEditorPanel">Open custom editor panel</button>
    <button id="resetLayout">Reset layout</button>
    <button id="toggleFullWorkbench">Switch to full workbench mode</button>
    <br /> -->

    </div>
    <div style="display: flex; flex: none; border: 1px solid var(--vscode-editorWidget-border);">
      <div id="sidebar-right" style="max-width: 500px"></div>
      <div id="activityBar-right"></div>
      <div id="auxiliaryBar" style="max-width: 300px"></div>
    </div>
  </div>

  <div id="panel"></div>

  <div id="statusBar"></div>
</div>
<!-- 
<h1>Settings<span id="settings-dirty">●</span></h1>
<button id="settingsui">Open settings UI</button>
<button id="resetsettings">Reset settings</button>
<div id="settings-editor" class="standalone-editor"></div>
<h1>Keybindings<span id="keybindings-dirty">●</span></h1>
<button id="keybindingsui">Open keybindings UI</button>
<button id="resetkeybindings">Reset keybindings</button>
<div id="keybindings-editor" class="standalone-editor"></div> -->`;export{n as default};
