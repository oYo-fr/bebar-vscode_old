import { Bebar } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import { BebarNextNode } from "./bebarNextNode";

export class BebarNextListNode extends BebarNode {
  constructor(
    public readonly context: Bebar[],
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super("Next", context, bebar, collapsibleState);
  }

  getChildren(): BebarNode[] {
    const result: BebarNextNode[] = [];
    (this.context as Bebar[]).map((nFile) =>
      result.push(new BebarNextNode(nFile, nFile))
    );
    return result;
  }
}
