import { Bebar, Template } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";
import { BebarTemplateNode } from "./bebarTemplateNode";

export class BebarTemplatesNode extends BebarNode {
  constructor(
    public readonly context: Template[],
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super("Templates", context, bebar, collapsibleState);
  }
  iconPath = {
    light: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "light",
      "templates.svg"
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "dark",
      "templates.svg"
    ),
  };

  getChildren(): BebarNode[] {
    const result: BebarNode[] = [];
    (this.context as Template[]).map((tFile) =>
      result.push(new BebarTemplateNode(tFile, this.bebar))
    );
    return result;
  }
}
