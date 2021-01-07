import { Bebar, Datafile } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";
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

  iconPath = {
    light: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "light",
      "data.svg"
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "dark",
      "data.svg"
    ),
  };

  getChildren(): BebarNode[] {
    const result: BebarNode[] = [];
    (this.context as Datafile[]).map((dFile) =>
      result.push(new BebarDataNode(dFile, this.bebar))
    );
    return result;
  }
}
