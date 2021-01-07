import { Bebar, Helper, Partial } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";
import { BebarHelperNode } from "./BebarHelperNode";
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
  iconPath = {
    light: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "light",
      "partials.svg"
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "dark",
      "partials.svg"
    ),
  };

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
