import * as vscode from "vscode";
import * as path from "path";
import { BebarParser } from "bebar";
import { BebarDataListNode } from "./treenodes/BebarDataListNode";
import { BebarHelpersNode } from "./treenodes/BebarHelpersNode";
import { BebarNode } from "./treenodes/BebarNode";
import { BebarPartialsNode } from "./treenodes/BebarPartialsNode";
import { BebarTemplatesNode } from "./treenodes/bebarTemplatesNode";
import { BebarNextListNode } from "./treenodes/bebarNextListNode";
import { BebarOutputsNode } from "./treenodes/bebarOutputsNode";
import * as fs from "fs";

export class BebarNodeProvider implements vscode.TreeDataProvider<BebarNode> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    BebarNode | undefined | void
  > = new vscode.EventEmitter<BebarNode | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<
    BebarNode | undefined | void
  > = this._onDidChangeTreeData.event;

  bebarParser: BebarParser | undefined;

  constructor() {}

  createDirectory(uri: vscode.Uri): void | Thenable<void> {
    return;
  }

  readFile(uri: vscode.Uri): Uint8Array | Thenable<Uint8Array> {
    return new Uint8Array();
  }

  writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): void | Thenable<void> {
    return;
  }

  delete(
    uri: vscode.Uri,
    options: { recursive: boolean }
  ): void | Thenable<void> {
    return;
  }

  rename(
    oldUri: vscode.Uri,
    newUri: vscode.Uri,
    options: { overwrite: boolean }
  ): void | Thenable<void> {
    return;
  }

  public async load(file: vscode.Uri) {
    if (file) {
      const bebarParser = new BebarParser(
        file.fsPath,
        path.dirname(file.fsPath)
      );
      this.bebarParser = bebarParser;
    }
  }

  public async run(file: vscode.Uri) {
    await this.bebarParser?.WriteAll();
  }

  async refresh(): Promise<void> {
    await this.bebarParser?.Load();
    this._onDidChangeTreeData.fire();
    await this.bebarParser?.Build();
    this._onDidChangeTreeData.fire();
  }

  async refreshView(): Promise<void> {
    this._onDidChangeTreeData.fire();
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: BebarNode): vscode.TreeItem {
    return element;
  }

  public async getRoot(filter: string = ""): Promise<BebarNode[]> {
    if (!this.bebarParser || !this.bebarParser.bebar) {
      return [];
    }
    switch (filter) {
      case "data":
        return new BebarDataListNode(
          this.bebarParser.bebar.data,
          this.bebarParser.bebar
        ).getChildren();
      case "helpers":
        return new BebarHelpersNode(
          this.bebarParser.bebar.helpers,
          this.bebarParser.bebar
        ).getChildren();
      case "partials":
        return new BebarPartialsNode(
          this.bebarParser.bebar.partials,
          this.bebarParser.bebar
        ).getChildren();
      case "templates":
        return new BebarTemplatesNode(
          this.bebarParser.bebar.templates,
          this.bebarParser.bebar
        ).getChildren();
      case "nexts":
        return new BebarNextListNode(
          this.bebarParser.bebar.nextBebars,
          this.bebarParser.bebar
        ).getChildren();
      case "outputs":
        return new BebarOutputsNode(
          this.bebarParser.bebar.outputs,
          this.bebarParser.bebar
        ).getChildren();
      default:
        return [
          new BebarDataListNode(
            this.bebarParser.bebar.data,
            this.bebarParser.bebar
          ),
          new BebarHelpersNode(
            this.bebarParser.bebar.helpers,
            this.bebarParser.bebar
          ),
          new BebarPartialsNode(
            this.bebarParser.bebar.partials,
            this.bebarParser.bebar
          ),
          new BebarTemplatesNode(
            this.bebarParser.bebar.templates,
            this.bebarParser.bebar
          ),
          new BebarNextListNode(
            this.bebarParser.bebar.nextBebars,
            this.bebarParser.bebar
          ),
          new BebarOutputsNode(
            this.bebarParser.bebar.outputs,
            this.bebarParser.bebar
          ),
        ];
    }
  }

  async getChildren(element?: BebarNode): Promise<BebarNode[]> {
    if (!element) {
      if (this.bebarParser && this.bebarParser.bebar) {
        return Promise.resolve(await this.getRoot());
      } else {
        return Promise.resolve([]);
      }
    } else {
      const children = element.getChildren();
      return Promise.resolve(children);
    }
  }
}
