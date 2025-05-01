import * as monaco from 'monaco-editor'
import { StandaloneServices } from '@codingame/monaco-vscode-api'
import themeData from '../theme/duckdb-vscode-theme.json'

/**
 * DuckDB website color palette from CSS variables
 */

// Define custom editor options with proper types
export const customEditorOptions = {
  // Use JetBrains Mono as specified in DuckDB CSS
  fontFamily: '"JetBrainsMono-Regular", "Lucida Console", monospace',
  fontSize: 14,
  lineHeight: 22,
  cursorBlinking: 'smooth' as 'smooth',
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  renderLineHighlight: 'all' as 'all',
  renderWhitespace: 'selection' as 'selection',
  wordWrap: 'on' as 'on'
};

// Function to register the custom DuckDB theme
export function registerCustomTheme(): void {
  try {
    monaco.editor.defineTheme('duckdbTheme', {
      base: 'vs-dark', // can be 'vs', 'vs-dark', 'hc-black'
      inherit: true, // inherit default rules
      rules: themeData.tokenColors.map((tokenColor) => ({
        token: Array.isArray(tokenColor.scope)
          ? tokenColor.scope.join(' ')
          : tokenColor.scope,
        foreground: tokenColor.settings.foreground?.replace('#', ''),
        fontStyle: tokenColor.settings.fontStyle
      })),
      colors: themeData.colors
    })

    // Set default options for all editors
    monaco.editor.EditorOptions.fontFamily.defaultValue =
      customEditorOptions.fontFamily
    monaco.editor.EditorOptions.fontSize.defaultValue = customEditorOptions.fontSize
    monaco.editor.EditorOptions.lineHeight.defaultValue =
      customEditorOptions.lineHeight

    console.log('DuckDB theme and editor options registered')
  } catch (error) {
    console.error('Error registering DuckDB theme:', error)
  }
}

// Function to apply the DuckDB theme to all editors
export function applyCustomTheme(): void {
  try {
    // Get all editor instances
    const editors = monaco.editor.getEditors();
    
    // Apply our custom options to each editor
    for (const editor of editors) {
      editor.updateOptions({
        fontFamily: customEditorOptions.fontFamily,
        fontSize: customEditorOptions.fontSize,
        lineHeight: customEditorOptions.lineHeight,
        cursorBlinking: customEditorOptions.cursorBlinking,
        minimap: customEditorOptions.minimap,
        scrollBeyondLastLine: customEditorOptions.scrollBeyondLastLine,
        renderLineHighlight: customEditorOptions.renderLineHighlight,
        renderWhitespace: customEditorOptions.renderWhitespace,
        wordWrap: customEditorOptions.wordWrap
      });
    }
    
    console.log('DuckDB theme applied to editors');
  } catch (error) {
    console.error('Error applying DuckDB theme:', error);
  }
}
// Initialize and register the custom DuckDB theme
export function initCustomThemeRegister(): void {
  registerCustomTheme();
}
