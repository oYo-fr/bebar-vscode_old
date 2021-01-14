import { Bebar, Datafile } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import { BebarDataNode } from "./BebarDataNode";

export class BebarDataListNode extends BebarNode {
  constructor(
    public readonly context: Datafile[],
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super("Data", context, bebar, collapsibleState);

    this.description = `(${context.length})`;
  }

  getChildren(): BebarNode[] {
    const result: BebarNode[] = [];
    (this.context as Datafile[]).map((dFile) =>
      result.push(new BebarDataNode(dFile, this.bebar))
    );
    return result;
  }
}
