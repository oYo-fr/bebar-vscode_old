import * as vscode from "vscode";
import { BebarFilteredNodeProvider } from "./bebarFilteredNodeProvider";
import { BebarNodeProvider } from "./bebarNodeProvider";
import { OutputProvider } from "./OutputProvider";

export class BebarExplorer {
  public dataProvider: BebarNodeProvider;
  private treeDataProvider: BebarNodeProvider;
  private outputsBebarFilteredNodeProvider: BebarFilteredNodeProvider;
  private dataBebarFilteredNodeProvider: BebarFilteredNodeProvider;
  private helpersBebarFilteredNodeProvider: BebarFilteredNodeProvider;
  private partialsBebarFilteredNodeProvider: BebarFilteredNodeProvider;
  private templatesBebarFilteredNodeProvider: BebarFilteredNodeProvider;
  private nextsBebarFilteredNodeProvider: BebarFilteredNodeProvider;

  constructor(context: vscode.ExtensionContext) {
    this.treeDataProvider = new BebarNodeProvider();
    this.dataProvider = this.treeDataProvider;

    this.outputsBebarFilteredNodeProvider = new BebarFilteredNodeProvider(
      this.treeDataProvider,
      "outputs"
    );
    context.subscriptions.push(
      vscode.window.createTreeView("bebarExplorer", {
        treeDataProvider: this.outputsBebarFilteredNodeProvider,
      })
    );
    // context.subscriptions.push(
    //   vscode.window.createTreeView("bebarExplorer-outputs", {
    //     treeDataProvider: this.outputsBebarFilteredNodeProvider,
    //   })
    // );

    this.dataBebarFilteredNodeProvider = new BebarFilteredNodeProvider(
      this.treeDataProvider,
      "data"
    );
    context.subscriptions.push(
      vscode.window.createTreeView("bebarExplorer-data", {
        treeDataProvider: this.dataBebarFilteredNodeProvider,
      })
    );

    this.helpersBebarFilteredNodeProvider = new BebarFilteredNodeProvider(
      this.treeDataProvider,
      "helpers"
    );
    context.subscriptions.push(
      vscode.window.createTreeView("bebarExplorer-helpers", {
        treeDataProvider: this.helpersBebarFilteredNodeProvider,
      })
    );

    this.partialsBebarFilteredNodeProvider = new BebarFilteredNodeProvider(
      this.treeDataProvider,
      "partials"
    );
    context.subscriptions.push(
      vscode.window.createTreeView("bebarExplorer-partials", {
        treeDataProvider: this.partialsBebarFilteredNodeProvider,
      })
    );

    this.templatesBebarFilteredNodeProvider = new BebarFilteredNodeProvider(
      this.treeDataProvider,
      "templates"
    );
    context.subscriptions.push(
      vscode.window.createTreeView("bebarExplorer-templates", {
        treeDataProvider: this.templatesBebarFilteredNodeProvider,
      })
    );

    this.nextsBebarFilteredNodeProvider = new BebarFilteredNodeProvider(
      this.treeDataProvider,
      "nexts"
    );
    context.subscriptions.push(
      vscode.window.createTreeView("bebarExplorer-next", {
        treeDataProvider: this.nextsBebarFilteredNodeProvider,
      })
    );

    OutputProvider.instance.init(this.treeDataProvider);
    context.subscriptions.push(
      vscode.workspace.registerTextDocumentContentProvider(
        "bebar",
        OutputProvider.instance
      )
    );
  }

  public async load(file: vscode.Uri) {
    try {
      await this.treeDataProvider.load(file);
      await this.treeDataProvider.bebarParser.Load();
      await this.treeDataProvider.bebarParser.Build();
    } catch (e) {
      vscode.window.showErrorMessage(e);
    }
  }
  async refresh() {
    await this.treeDataProvider.refreshView();
    await this.outputsBebarFilteredNodeProvider.refreshView();
    await this.dataBebarFilteredNodeProvider.refreshView();
    await this.helpersBebarFilteredNodeProvider.refreshView();
    await this.partialsBebarFilteredNodeProvider.refreshView();
    await this.templatesBebarFilteredNodeProvider.refreshView();
    await this.nextsBebarFilteredNodeProvider.refreshView();
  }
}
