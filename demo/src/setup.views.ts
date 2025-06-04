import { getService, initialize as initializeMonacoService, IStorageService, IWorkbenchLayoutService } from '@codingame/monaco-vscode-api'
import getQuickAccessServiceOverride from '@codingame/monaco-vscode-quickaccess-service-override'
import { BrowserStorageService } from '@codingame/monaco-vscode-storage-service-override'
import * as Buck from '@buckdb/buckdb.remote'

Object.assign(window, Buck)
// Buck.duckdb.db.
import { registerExtension } from '@codingame/monaco-vscode-api/extensions'
import { setUnexpectedErrorHandler } from '@codingame/monaco-vscode-api/monaco'
import { ExtensionHostKind } from '@codingame/monaco-vscode-extensions-service-override'
import getViewsServiceOverride, { attachPart, getSideBarPosition, isEditorPartVisible, isPartVisibile, onDidChangeSideBarPosition, onPartVisibilityChange, Parts, Position } from '@codingame/monaco-vscode-views-service-override'
import { openNewCodeEditor } from './features/editor'
import './features/customView.views'
import { commonServices } from './common-services'
import { constructOptions, envOptions, remoteAuthority, userDataProvider } from './setup.common'

const container = document.createElement('div')
container.id = 'app'
container.innerHTML = (await import('./inner.html?raw')).default
document.body?.append(container)
await initializeMonacoService(
    {
        ...commonServices,
        ...getViewsServiceOverride(openNewCodeEditor, undefined),
        ...getQuickAccessServiceOverride({
            isKeybindingConfigurationVisible: isEditorPartVisible,
            shouldUseGlobalPicker: (_editor, isStandalone) => !isStandalone && isEditorPartVisible(),
        }),
    },
    document.body,
    constructOptions,
    envOptions,
)

setUnexpectedErrorHandler((e) => {
    console.info('Unexpected error', e)
})

for (
    const config of [
        { part: Parts.TITLEBAR_PART, element: '#titleBar', visible: false },
        { part: Parts.BANNER_PART, element: '#banner', visible: false },
        {
            visible: location.search.includes('sidebar'),
            part: Parts.SIDEBAR_PART,
            get element() {
                return getSideBarPosition() === Position.LEFT ? '#sidebar' : '#sidebar-right'
            },
            onDidElementChange: onDidChangeSideBarPosition,
        },
        {
            visible: false,
            part: Parts.ACTIVITYBAR_PART,
            get element() {
                return getSideBarPosition() === Position.LEFT ? '#activityBar' : '#activityBar-right'
            },
            onDidElementChange: onDidChangeSideBarPosition,
        },
        { part: Parts.PANEL_PART, element: '#panel', visible: false },
        { part: Parts.EDITOR_PART, element: '#editors' },
        {
            part: Parts.AUXILIARYBAR_PART,
            get element() {
                return getSideBarPosition() === Position.LEFT ? '#auxiliaryBar' : '#auxiliaryBar-left'
            },
            onDidElementChange: onDidChangeSideBarPosition,
            visible: false,
        },
    ]
) {
    attachPart(config.part, document.querySelector<HTMLDivElement>(config.element)!)
    if (config.visible === false || !isPartVisibile(config.part)) {
        document.querySelector<HTMLDivElement>(config.element)!.style.display = 'none'
    }
    onPartVisibilityChange(config.part, (visible) => {
        document.querySelector<HTMLDivElement>(config.element)!.style.display = visible ? 'block' : 'none'
    })
}
const layoutService = await getService(IWorkbenchLayoutService)
// layoutService.setPartHidden(TRUE, Parts.)
// document.querySelector('#togglePanel')?.addEventListener('click', async () => {
//   layoutService.setPartHidden(layoutService.isVisible(Parts.PANEL_PART, window), Parts.PANEL_PART)
// })

// document.querySelector('#toggleAuxiliary')?.addEventListener('click', async () => {
//   // const resp = await Buck.from('duckdb_settings()').select().execute()
//   layoutService.setPartHidden(true, Parts.SIDEBAR_PART)
layoutService.setPartHidden(true, Parts.BANNER_PART)
//   layoutService.setPartHidden(true, Parts.ACTIVITYBAR_PART)
// })

export async function clearStorage(): Promise<void> {
    await userDataProvider.reset()
    // @ts-ignore
    await ((await getService(IStorageService)) as BrowserStorageService).clear()
}

await registerExtension(
    { name: 'demo', publisher: 'codingame', version: '1.0.0', engines: { vscode: '*' } },
    ExtensionHostKind.LocalProcess,
).setAsDefaultApi()

export { remoteAuthority }
