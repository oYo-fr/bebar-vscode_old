import { Bebar, Helper, Partial } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";
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
  iconPath = {
    light: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "light",
      "fast-forward.svg"
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "dark",
      "fast-forward.svg"
    ),
  };

  getChildren(): BebarNode[] {
    const result: BebarNextNode[] = [];
    (this.context as Bebar[]).map((nFile) =>
      result.push(new BebarNextNode(nFile, nFile))
    );
    return result;
  }
}
