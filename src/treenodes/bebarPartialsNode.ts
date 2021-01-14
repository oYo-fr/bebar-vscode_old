import { Bebar, Helper, Partial } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import { BebarPartialNode } from "./BebarPartialNode";

export class BebarPartialsNode extends BebarNode {
  constructor(
    public readonly context: Partial[],
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super("Partials", context, bebar, collapsibleState);
  }

  getChildren(): BebarNode[] {
    let result: BebarNode[] = [];
    this.context.map((pFile) =>
      pFile.registeredPartials.map((p) =>
        result.push(new BebarPartialNode(p, pFile, this.bebar))
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
    return result;
  }
}
