import { createInstance, EditorInput, IDialogService, IEditorGroup, IInstantiationService } from '@codingame/monaco-vscode-api'
import { IEditorSerializer, registerCustomView, RegisteredEditorPriority, registerEditor, registerEditorPane, registerEditorSerializer, SimpleEditorInput, SimpleEditorPane, ViewContainerLocation } from '@codingame/monaco-vscode-views-service-override'
import { themeBalham } from 'ag-grid-community'
import { colorSchemeDark } from 'ag-grid-community'
import * as monaco from 'monaco-editor'
const theme = themeBalham.withPart(colorSchemeDark)
import { ClientSideRowModelModule, ColDef, createGrid, GridOptions, ModuleRegistry, NumberFilterModule, TextFilterModule, TooltipModule, ValidationModule } from 'ag-grid-community'
import { highlightErrorMessage } from './errorHighlighter'
// Register required modules
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ValidationModule,
    TextFilterModule,
    NumberFilterModule,
    TooltipModule,
])

// Define a custom header component
class CustomHeader {
    eGui: HTMLElement
    params: any

    init(params: any) {
        this.params = params
        this.eGui = document.createElement('div')
        this.eGui.innerHTML = `
      <div>${params.displayName}</div>
      <div style="font-size: 0.8em; color: #888;">${params.columnType || ''}</div>
    `
    }

    getGui() {
        return this.eGui
    }

    destroy() {}
}

// Add sample data for testing
if (typeof window !== 'undefined' && !window.globalData) {
    window.globalData = [
        { id: 1, name: 'John', age: 25, city: 'New York', country: 'USA' },
        { id: 2, name: 'Jane', age: 30, city: 'London', country: 'UK' },
        { id: 3, name: 'Bob', age: 35, city: 'Paris', country: 'France' },
        { id: 4, name: 'Alice', age: 28, city: 'Berlin', country: 'Germany' },
        { id: 5, name: 'Charlie', age: 42, city: 'Tokyo', country: 'Japan' },
        { id: 6, name: 'Diana', age: 33, city: 'Sydney', country: 'Australia' },
        { id: 7, name: 'Eva', age: 27, city: 'Toronto', country: 'Canada' },
        { id: 8, name: 'Frank', age: 39, city: 'Madrid', country: 'Spain' },
        { id: 9, name: 'Grace', age: 31, city: 'Rome', country: 'Italy' },
        { id: 10, name: 'Henry', age: 45, city: 'Amsterdam', country: 'Netherlands' },
    ]
}

// Extend the Window interface to include globalData
declare global {
    interface Window {
        globalData?: Record<string, any>[]
        globalError?: Error
    }
}

const SubHeader = ({ columnType }) => (
    `<div class="ag-cell-label-container" role="presentation">
                  <span data-ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
                  <span data-ref="eFilterButton" class="ag-header-icon ag-header-cell-filter-button"></span>
                  <div data-ref="eLabel" class="ag-header-cell-label" role="presentation">
                    <span data-ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>
                    <span data-ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>
                    <span data-ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>
                    <span data-ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>
                    <div>
                      <span data-ref="eText" class="ag-header-cell-text" role="columnheader"></span>
                      <span data-ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
                      <div style="font-size: 0.8em; color: #888; margin-top: 2px">${columnType}</div>
                    </div>
                  </div>
                </div>`
)
registerCustomView({
    id: 'custom-view',
    name: 'Custom View',
    order: 0,
    renderBody: function(container: HTMLElement): monaco.IDisposable {
        container.style.display = 'block'
        container.style.height = '100%'
        container.style.overflow = '' // Remove overflow:auto to let AG Grid handle scrolling
        container.innerHTML = '' // Clear existing content
        // Create a div for the AG Grid with proper sizing
        container.innerHTML = `
      <div id="ag-grid-container"style="height: 100%; width: 100%;"></div>
    `
        const gridDiv = container.querySelector('#ag-grid-container') as HTMLElement

        let gridApi: any = null

        // Function to create and update the grid
        const setupGrid = () => {
            let globalData = window.globalData ?? [] // Default to empty array if undefined
            if (typeof globalData[0] !== 'object') {
                globalData = globalData.map((item) => [item])
            }
            const schema = (globalData as any).schema // Assuming schema is attached to globalData

            // Generate column definitions
            const columnDefs: ColDef[] = []
            if (globalData.length > 0) {
                const firstRow = globalData[0]
                const isArrayData = Array.isArray(firstRow)
                const numCols = isArrayData ? firstRow.length : Object.keys(firstRow).length
                const keys = isArrayData ? null : Object.keys(firstRow)

                for (let i = 0; i < numCols; i++) {
                    const key = keys ? keys[i] : String(i) // Use object key or index as string for field
                    const schemaEntry = schema?.[i] // Get schema entry by index
                    const headerName = schemaEntry?.column_name ?? (keys ? key : `Column ${i + 1}`) // Use schema name or fallback
                    const columnType = schemaEntry?.column_type ?? '_' // Use schema type or fallback
                    
                    // Check if column contains numeric data
                    const sampleValue = isArrayData ? globalData[0]?.[i] : globalData[0]?.[key]
                    const isNumeric = Number.isFinite(sampleValue)

                    const colDef: ColDef = {
                        field: key, // Use key (string) for field access
                        headerName: headerName, // Display schema column name or fallback
                        headerComponentParams: {
                            // Pass column type to the custom header template
                            template: SubHeader({ columnType }),
                        },
                        valueGetter: (params) => {
                            // Access data by key (for objects) or index (for arrays)
                            const value = isArrayData ? params.data[i] : params.data[key]
                            // Basic stringification for non-primitive types (optional, adjust as needed)
                            return (typeof value === 'object' && value !== null) ? JSON.stringify(value) : value
                        },
                        cellRenderer: (params) => {
                            const value = params.value;
                            if (typeof value === 'string' && value.startsWith('http')) {
                                return `<a href="${value}" target="_blank" style="color: #007bff; text-decoration: underline;">${value}</a>`;
                            }
                            return value;
                        },
                        headerTooltip: columnType, // Show type as tooltip
                        sortable: true,
                        filter: true,
                    }
                    
                    // For numeric columns, use smaller fixed width instead of flex
                    if (isNumeric) {
                        colDef.width = 80
                        colDef.minWidth = 60
                        colDef.flex = 0  // Disable flex for numeric columns to use fixed width
                    }
                    
                    columnDefs.push(colDef)
                }
            }

            // Add row number column
            columnDefs.unshift({
                headerName: 'Row',
                headerComponentParams: {
                    // Pass column type to the custom header template
                    template: SubHeader({ columnType: '/ ' + ((globalData?.length ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')) }),
                },
                valueGetter: (params) => {
                    return params.node?.rowIndex !== undefined ? params.node.rowIndex + 1 : ''
                },
                width: 70,
                flex: 0,  // Disable flex for fixed width
                pinned: 'left',
            })

            // const hr = !globalData?.schema ? [] : [Object.fromEntries(globalData?.schema.map(e => [e.column_name, e.column_type]))]
            // console.log({ hr })
            // Grid options with more explicit configuration
            // Grid options with more explicit configuration

            // Compute highlighted error HTML for overlay
            const errorText = window.globalError?.stack || window.globalError?.message || 'No data available'
            const highlightedErrorHtml = `
                <div class="highlight" style="
                    padding: 20px;
                    color: #888;
                    font-size: 1.2em;
                    text-align: left;
                ">
                    <div style="
                        margin: 0;
                        white-space: pre-wrap;
                        word-break: break-word;
                    ">${highlightErrorMessage(errorText)}</div>
                </div>
            `

            const gridOptions: GridOptions = {
                theme,
                columnDefs,
                rowData: globalData,
                defaultColDef: {
                    flex: 1,
                    minWidth: 100,
                    resizable: true,
                    sortable: true,
                },
                enableCellTextSelection: true,
                suppressScrollOnNewData: true,
                animateRows: true,
                headerHeight: 38, // accommodate multi-line headers
                overlayNoRowsTemplate: highlightedErrorHtml,
            };
            // Create new grid or destroy and recreate if it exists
            if (gridApi) {
                gridApi.destroy()
            }

            // Create the grid using the createGrid function
            gridApi = createGrid(gridDiv, gridOptions)
        }

        // Initial setup
        try {
            setupGrid()
        } catch (error) {
            console.error('INIIAL setting up grid:', error)
            // window.globalError = error as Error
            // setupGrid()
        }

        // Use IntersectionObserver to refresh when the panel becomes visible
        let observer: IntersectionObserver | null = null
        if ('IntersectionObserver' in window) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            try {
                                setupGrid()
                            } catch (error) {
                                console.error('Error setting up grid:', error)
                                // window.globalError = error as Error
                                // setupGrid()
                            }
                        }
                    })
                },
                {
                    root: null,
                    threshold: 0.01,
                },
            )
            observer.observe(container)
        } else {
            console.warn('IntersectionObserver not supported, table might not update automatically on visibility change.')
            container.addEventListener('focus', setupGrid, true)
        }

        // Return a disposable to clean up
        return {
            dispose() {
                if (observer != null) {
                    observer.disconnect()
                }
                container.removeEventListener('focus', setupGrid, true)
                if (gridApi) {
                    gridApi.destroy()
                }
            },
        }
    },
    location: ViewContainerLocation.Panel,
    icon: new URL('../Visual_Studio_Code_1.35_icon.svg', import.meta.url).toString(),
    actions: [
        {
            id: 'custom-action',
            title: 'Custom action',
            render(element) {
                const button = document.createElement('button')
                button.innerText = 'Ugly button'
                button.style.height = '30px'
                button.onclick = () => {
                    alert('What did you expect?')
                }
                element.append(button)
            },
        },
        {
            id: 'custom-action2',
            title: 'Custom action2',
            icon: 'dialogInfo',
            async run(accessor) {
                void accessor.get(IDialogService).info('This is a custom view action button')
            },
        },
    ],
})

class CustomEditorPane extends SimpleEditorPane {
    static readonly ID = 'workbench.editors.customEditor'

    constructor(group: IEditorGroup) {
        super(CustomEditorPane.ID, group)
    }

    initialize(): HTMLElement {
        const container = document.createElement('div')
        container.style.display = 'flex'
        container.style.alignItems = 'center'
        container.style.justifyContent = 'center'
        container.innerHTML = 'This is a custom editor pane<br />You can render anything you want here'
        return container
    }

    async renderInput(input: EditorInput): Promise<monaco.IDisposable> {
        if (input.resource != null) {
            this.container.innerHTML = 'Opened file: ' + input.resource.path
        } else {
            this.container.innerHTML = 'This is a custom editor pane<br />You can render anything you want here'
        }

        return {
            dispose() {},
        }
    }
}
// Remove IEditorCloseHandler implementation as confirmation is handled globally
class CustomEditorInput extends SimpleEditorInput {
    constructor(
        resource: monaco.Uri | undefined,
        // Keep dialog service if needed elsewhere, otherwise it could be removed
        // @ts-ignore
        @IDialogService private dialogService: IDialogService,
    ) {
        super(resource)

        // No longer needed as we don't implement IEditorCloseHandler
        // this.closeHandler = this

        this.setName('Custom editor pane input')
    }

    // Removed confirm() and showConfirm() as they are part of IEditorCloseHandler

    get typeId(): string {
        return CustomEditorPane.ID
    }
}

registerEditorPane('custom-editor-pane', 'Custom editor pane', CustomEditorPane, [
    CustomEditorInput,
])

registerEditor(
    '*.customeditor',
    {
        id: CustomEditorPane.ID,
        label: 'Custom editor pane input',
        priority: RegisteredEditorPriority.default,
    },
    {
        singlePerResource: true,
    },
    {
        async createEditorInput(editorInput) {
            return {
                editor: await createInstance(CustomEditorInput, editorInput.resource),
            }
        },
    },
)

interface ISerializedCustomEditorInput {
    resourceJSON?: monaco.UriComponents
}
registerEditorSerializer(
    CustomEditorPane.ID,
    class implements IEditorSerializer {
        canSerialize(): boolean {
            return true
        }

        serialize(editor: CustomEditorInput): string | undefined {
            const serializedFileEditorInput: ISerializedCustomEditorInput = {
                resourceJSON: editor.resource?.toJSON(),
            }

            return JSON.stringify(serializedFileEditorInput)
        }

        deserialize(
            instantiationService: IInstantiationService,
            serializedEditor: string,
        ): EditorInput | undefined {
            const serializedFileEditorInput: ISerializedCustomEditorInput = JSON.parse(serializedEditor)
            // @ts-ignore
            return instantiationService.createInstance(
                CustomEditorInput,
                monaco.Uri.revive(serializedFileEditorInput.resourceJSON),
            )
        }
    },
)

export { CustomEditorInput }
