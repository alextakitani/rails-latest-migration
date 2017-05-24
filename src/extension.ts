'use strict';
import { ExtensionContext, commands, window, workspace, Uri } from 'vscode';

const PATTERN = 'db/migrate/*.rb'

function onError(err: any) {
  window.showErrorMessage(err.toString())
}

function onFilesFound(files: Uri[]) {
  const paths = files.map(file => file.fsPath).sort()

  if (paths.length > 0) {
    const latest = paths[paths.length - 1]
    workspace.openTextDocument(latest).then(window.showTextDocument, onError)
  } else {
    window.showInformationMessage('No migrations found!')
  }
}

export function activate(context: ExtensionContext) {
    const latestMigration = commands.registerCommand('extension.railsLatestMigration', () => {
      workspace.findFiles(PATTERN, null).then(onFilesFound, onError)
    })

    context.subscriptions.push(latestMigration)
}

export function deactivate() {
}
