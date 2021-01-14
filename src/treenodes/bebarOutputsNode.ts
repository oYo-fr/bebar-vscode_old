import { Bebar, Output } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";
import { BebarOutputNode } from "./BebarOutputNode";

export class BebarOutputsNode extends BebarNode {
  constructor(
    public readonly context: Output[],
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super("Outputs", context, bebar, collapsibleState);
  }

  getChildren(): BebarNode[] {
    const result: BebarNode[] = [];
    this.context.map((o) => result.push(new BebarOutputNode(o, this.bebar)));
    return result;
  }
}
