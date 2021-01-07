// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { BebarExplorer } from "./bebarExplorer";
import { OutputProvider } from "./OutputProvider";
import { Logger } from "./Logger";
var util = require("util");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let bebarExplorer = new BebarExplorer(context);
  console.log = function (d) {
    Logger.log(util.format(d));
  };

  vscode.commands.registerCommand("bebar.open", async () => {
    try {
      const dialogResult = await vscode.window.showOpenDialog({
        canSelectFiles: true,
      });
      if (dialogResult) {
        await bebarExplorer.load(dialogResult[0]);
        await bebarExplorer.refresh();
        vscode.commands.executeCommand("vscode.open", dialogResult[0], {
          viewColumn: 1,
        });
      }
    } catch (e) {
      vscode.window.showErrorMessage(e);
    }
  });

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(async (event) => {
      if (
        event.contentChanges.length > 0 &&
        bebarExplorer.dataProvider.bebarParser.bebar &&
        !event.document.fileName.startsWith("extension-output-")
      ) {
        try {
          const refreshHandled = await bebarExplorer.dataProvider.bebarParser.HandleRefresh(
            event.document.fileName,
            event.document.getText()
          );
          if (refreshHandled) {
            Logger.log("Event handled -> Refreshing");

            //await bebarExplorer.dataProvider.bebarParser.bebarParser.Build();
            await bebarExplorer.dataProvider.refreshView();
            await OutputProvider.instance.refresh();
            Logger.log("Event handled -> Refresh done");
          }
        } catch (e) {
          Logger.log("An error occured while refreshing templates" + e);
        }
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
