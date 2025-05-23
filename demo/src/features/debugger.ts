import { ExtensionHostKind, registerExtension } from '@codingame/monaco-vscode-api/extensions'
import type * as vscode from 'vscode'

const { getApi, registerFileUrl } = registerExtension(
    {
        name: 'debugger',
        publisher: 'codingame',
        version: '1.0.0',
        engines: {
            vscode: '*',
        },
        // A browser field is mandatory for the extension to be flagged as `web`
        browser: 'extension.js',
        contributes: {
            debuggers: [
                {
                    type: 'javascript',
                    label: 'Test',
                    languages: ['javascript'],
                },
            ],
            breakpoints: [
                {
                    language: 'javascript',
                },
            ],
        },
    },
    ExtensionHostKind.LocalProcess,
)

registerFileUrl('./extension.js', 'data:text/javascript;base64,' + window.btoa('// nothing'))

void getApi().then(async (debuggerVscodeApi) => {
    class WebsocketDebugAdapter implements vscode.DebugAdapter {
        constructor(private websocket: WebSocket) {
            websocket.onmessage = (message) => {
                this._onDidSendMessage.fire(JSON.parse(message.data))
            }
        }

        _onDidSendMessage = new debuggerVscodeApi.EventEmitter<vscode.DebugProtocolMessage>()
        onDidSendMessage = this._onDidSendMessage.event

        handleMessage(message: vscode.DebugProtocolMessage): void {
            this.websocket.send(JSON.stringify(message))
        }

        dispose() {
            this.websocket.close()
        }
    }

    debuggerVscodeApi.debug.registerDebugConfigurationProvider('javascript', {
        resolveDebugConfiguration() {
            return {
                name: 'Test debugger',
                type: 'javascript',
                request: 'launch',
            }
        },
    })

    debuggerVscodeApi.debug.registerDebugAdapterDescriptorFactory('javascript', {
        async createDebugAdapterDescriptor() {
            const websocket = new WebSocket('ws://localhost:5555')

            await new Promise((resolve, reject) => {
                websocket.onopen = resolve
                websocket.onerror = () => reject(new Error('Unable to connect to debugger server. Run `npm run start:debugServer`'))
            })

            websocket.send(
                JSON.stringify({
                    main: '/workspace/demo.ts',
                    files: {
                        '/workspace/demo.ts': new TextDecoder().decode(
                            await debuggerVscodeApi.workspace.fs.readFile(
                                debuggerVscodeApi.Uri.file('/workspace/demo.ts'),
                            ),
                        ),
                    },
                }),
            )

            const adapter = new WebsocketDebugAdapter(websocket)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            adapter.onDidSendMessage((message: any) => {
                if (message.type === 'event' && message.event === 'output') {
                    console.log('OUTPUT', message.body.output)
                }
            })
            return new debuggerVscodeApi.DebugAdapterInlineImplementation(adapter)
        },
    })
})
