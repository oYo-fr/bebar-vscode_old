import * as vscode from "vscode";
import { BebarNode } from "./treenodes/BebarNode";
import { BebarNodeProvider } from "./bebarNodeProvider";

export class BebarFilteredNodeProvider
  implements vscode.TreeDataProvider<BebarNode> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    BebarNode | undefined | void
  > = new vscode.EventEmitter<BebarNode | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<
    BebarNode | undefined | void
  > = this._onDidChangeTreeData.event;

  constructor(
    private bebarNodeProvider: BebarNodeProvider,
    public filter: string
  ) {}

  async refreshView(): Promise<void> {
    this._onDidChangeTreeData.fire();
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: BebarNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return this.bebarNodeProvider.getTreeItem(element);
  }

  getChildren(element?: BebarNode): Thenable<BebarNode[]> {
    if (!element) {
      return this.bebarNodeProvider.getRoot(this.filter);
    } else {
      return this.bebarNodeProvider.getChildren(element);
    }
  }
}
