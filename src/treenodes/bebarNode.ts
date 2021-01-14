import * as vscode from "vscode";
import { Bebar } from "bebar";

export class BebarNode extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly context: any,
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);

    if (Array.isArray(context)) {
      this.tooltip = `${this.label} (${context.length})`;
      this.description = `(${context.length})`;
    } else {
      this.tooltip = `${this.label}`;
    }
  }

  getChildren(): BebarNode[] {
    return [];
  }
}
