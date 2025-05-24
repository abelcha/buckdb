import { IEditorOverrideServices } from '@codingame/monaco-vscode-api'
import getConfigurationServiceOverride from '@codingame/monaco-vscode-configuration-service-override'
import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override'
import getModelServiceOverride from '@codingame/monaco-vscode-model-service-override'
// import getNotificationServiceOverride from '@codingame/monaco-vscode-notifications-service-override'
import getAccessibilityServiceOverride from '@codingame/monaco-vscode-accessibility-service-override'
import getAiServiceOverride from '@codingame/monaco-vscode-ai-service-override'
import getAuthenticationServiceOverride from '@codingame/monaco-vscode-authentication-service-override'
import getChatServiceOverride from '@codingame/monaco-vscode-chat-service-override'
import getCommentsServiceOverride from '@codingame/monaco-vscode-comments-service-override'
import getDebugServiceOverride from '@codingame/monaco-vscode-debug-service-override'
import getDialogsServiceOverride from '@codingame/monaco-vscode-dialogs-service-override'
import getEditSessionsServiceOverride from '@codingame/monaco-vscode-edit-sessions-service-override'
import getEmmetServiceOverride from '@codingame/monaco-vscode-emmet-service-override'
import getEnvironmentServiceOverride from '@codingame/monaco-vscode-environment-service-override'
import getExplorerServiceOverride from '@codingame/monaco-vscode-explorer-service-override'
import getExtensionGalleryServiceOverride from '@codingame/monaco-vscode-extension-gallery-service-override'
import getExtensionServiceOverride from '@codingame/monaco-vscode-extensions-service-override'
import getInteractiveServiceOverride from '@codingame/monaco-vscode-interactive-service-override'
import getIssueServiceOverride from '@codingame/monaco-vscode-issue-service-override'
import getLanguageDetectionWorkerServiceOverride from '@codingame/monaco-vscode-language-detection-worker-service-override'
import getLanguagesServiceOverride from '@codingame/monaco-vscode-languages-service-override'
import getLifecycleServiceOverride from '@codingame/monaco-vscode-lifecycle-service-override'
import getLocalizationServiceOverride from '@codingame/monaco-vscode-localization-service-override'
import getLogServiceOverride from '@codingame/monaco-vscode-log-service-override'
import getMarkersServiceOverride from '@codingame/monaco-vscode-markers-service-override'
import getMcpServiceOverride from '@codingame/monaco-vscode-mcp-service-override'
import getMultiDiffEditorServiceOverride from '@codingame/monaco-vscode-multi-diff-editor-service-override'
import getNotebookServiceOverride from '@codingame/monaco-vscode-notebook-service-override'
import getOutlineServiceOverride from '@codingame/monaco-vscode-outline-service-override'
import getOutputServiceOverride from '@codingame/monaco-vscode-output-service-override'
import getPerformanceServiceOverride from '@codingame/monaco-vscode-performance-service-override'
import getPreferencesServiceOverride from '@codingame/monaco-vscode-preferences-service-override'
import getRelauncherServiceOverride from '@codingame/monaco-vscode-relauncher-service-override'
import getRemoteAgentServiceOverride from '@codingame/monaco-vscode-remote-agent-service-override'
import getScmServiceOverride from '@codingame/monaco-vscode-scm-service-override'
import getSearchServiceOverride from '@codingame/monaco-vscode-search-service-override'
import getSecretStorageServiceOverride from '@codingame/monaco-vscode-secret-storage-service-override'
import getShareServiceOverride from '@codingame/monaco-vscode-share-service-override'
import getSnippetServiceOverride from '@codingame/monaco-vscode-snippets-service-override'
import getSpeechServiceOverride from '@codingame/monaco-vscode-speech-service-override'
import getStorageServiceOverride from '@codingame/monaco-vscode-storage-service-override'
import getSurveyServiceOverride from '@codingame/monaco-vscode-survey-service-override'
import getTaskServiceOverride from '@codingame/monaco-vscode-task-service-override'
import getTelemetryServiceOverride from '@codingame/monaco-vscode-telemetry-service-override'
import getTerminalServiceOverride from '@codingame/monaco-vscode-terminal-service-override'
import getTestingServiceOverride from '@codingame/monaco-vscode-testing-service-override'
import getTextmateServiceOverride from '@codingame/monaco-vscode-textmate-service-override'
import getThemeServiceOverride from '@codingame/monaco-vscode-theme-service-override'
import getTimelineServiceOverride from '@codingame/monaco-vscode-timeline-service-override'
import getTreeSitterServiceOverride from '@codingame/monaco-vscode-treesitter-service-override'
import getUpdateServiceOverride from '@codingame/monaco-vscode-update-service-override'
import getUserDataProfileServiceOverride from '@codingame/monaco-vscode-user-data-profile-service-override'
import getUserDataSyncServiceOverride from '@codingame/monaco-vscode-user-data-sync-service-override'
import getBannerServiceOverride from '@codingame/monaco-vscode-view-banner-service-override'
import getStatusBarServiceOverride from '@codingame/monaco-vscode-view-status-bar-service-override'
import getTitleBarServiceOverride from '@codingame/monaco-vscode-view-title-bar-service-override'
import getWalkThroughServiceOverride from '@codingame/monaco-vscode-walkthrough-service-override'
import getWelcomeServiceOverride from '@codingame/monaco-vscode-welcome-service-override'
import getWorkingCopyServiceOverride from '@codingame/monaco-vscode-working-copy-service-override'
import getWorkspaceTrustOverride from '@codingame/monaco-vscode-workspace-trust-service-override'
import { TerminalBackend } from './features/terminal'
import { workerConfig } from './tools/extHostWorker'
import 'vscode/localExtensionHost'

export const commonServices: IEditorOverrideServices = {
    ...getAuthenticationServiceOverride(),
    ...getLogServiceOverride(),
    ...getExtensionServiceOverride(workerConfig),
    ...getExtensionGalleryServiceOverride({ webOnly: false }),
    ...getModelServiceOverride(),
    // ...getNotificationServiceOverride(),
    ...getDialogsServiceOverride(),
    ...getConfigurationServiceOverride(),
    ...getKeybindingsServiceOverride(),
    ...getTextmateServiceOverride(),
    ...getTreeSitterServiceOverride(),
    ...getThemeServiceOverride(),
    ...getLanguagesServiceOverride(),
    ...getDebugServiceOverride(),
    ...getPreferencesServiceOverride(),
    ...getOutlineServiceOverride(),
    ...getTimelineServiceOverride(),
    ...getBannerServiceOverride(),
    ...getStatusBarServiceOverride(),
    ...getTitleBarServiceOverride(),
    ...getSnippetServiceOverride(),
    ...getOutputServiceOverride(),
    ...getTerminalServiceOverride(new TerminalBackend()),
    ...getSearchServiceOverride(),
    ...getMarkersServiceOverride(),
    ...getAccessibilityServiceOverride(),
    ...getLanguageDetectionWorkerServiceOverride(),
    ...getStorageServiceOverride({
        fallbackOverride: {
            'workbench.activity.showAccounts': false,
        },
    }),
    ...getRemoteAgentServiceOverride({ scanRemoteExtensions: true }),
    ...getLifecycleServiceOverride(),
    ...getEnvironmentServiceOverride(),
    ...getWorkspaceTrustOverride(),
    ...getWorkingCopyServiceOverride(),
    ...getScmServiceOverride(),
    ...getTestingServiceOverride(),
    ...getChatServiceOverride(),
    ...getNotebookServiceOverride(),
    ...getWelcomeServiceOverride(),
    ...getWalkThroughServiceOverride(),
    ...getUserDataProfileServiceOverride(),
    ...getUserDataSyncServiceOverride(),
    ...getAiServiceOverride(),
    ...getTaskServiceOverride(),
    ...getCommentsServiceOverride(),
    ...getEditSessionsServiceOverride(),
    ...getEmmetServiceOverride(),
    ...getInteractiveServiceOverride(),
    ...getIssueServiceOverride(),
    ...getMultiDiffEditorServiceOverride(),
    ...getPerformanceServiceOverride(),
    ...getRelauncherServiceOverride(),
    ...getShareServiceOverride(),
    ...getSpeechServiceOverride(),
    ...getSurveyServiceOverride(),
    ...getUpdateServiceOverride(),
    ...getExplorerServiceOverride(),
    ...getLocalizationServiceOverride({
        async clearLocale() {
            const url = new URL(window.location.href)
            url.searchParams.delete('locale')
            window.history.pushState(null, '', url.toString())
        },
        async setLocale(id) {
            const url = new URL(window.location.href)
            url.searchParams.set('locale', id)
            window.history.pushState(null, '', url.toString())
        },
        availableLanguages: [
            {
                locale: 'en',
                languageName: 'English',
            },
        ],
    }),
    ...getSecretStorageServiceOverride(),
    ...getTelemetryServiceOverride(),
    ...getMcpServiceOverride(),
}
