import { Bebar, Helper } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import { BebarHelperNode } from "./BebarHelperNode";

export class BebarHelpersNode extends BebarNode {
  constructor(
    public readonly context: Helper[],
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super("Helpers", context, bebar, collapsibleState);
  }

  getChildren(): BebarNode[] {
    let result: BebarNode[] = [];
    this.context.map((hFile) =>
      hFile.registeredHelpers.map((h) =>
        result.push(new BebarHelperNode(h, hFile, this.bebar))
      )
    );
    result = result.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });

    this.tooltip = `${this.label} (${result.length})`;
    this.description = `(${result.length})`;
    return result;
  }
}
