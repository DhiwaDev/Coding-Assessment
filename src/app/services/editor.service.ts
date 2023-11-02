import { Injectable } from '@angular/core';
import * as ace from 'ace-builds';

@Injectable({
  providedIn: 'root',
})
export class AceEditorService {
  getEditorContent() {
    throw new Error('Method not implemented.');
  }
  private editor: any;

  constructor() {}

  public async createEditor(elementId: string): Promise<void> {
    await this.loadAceEditor();

    this.editor = ace.edit(elementId);
    this.editor.session.setMode('ace/mode/java');
    this.editor.setTheme('ace/theme/twilight');

    this.editor.setOptions({
      tabSize: 2,
      useSoftTabs: false,
      navigateWithinSoftTabs: false,
      useWorker: false,
      behavioursEnabled: false,
    });

    this.editor.setFontSize('16px');
  }

  public getEditor(): any {
    return this.editor;
  }

  public getEditorValue(): string {
    return this.editor.getValue();
  }

  public setEditorValue(value: string): void {
    this.editor.setValue(value);
  }

  private loadAceEditor(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src =
        'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js';
      scriptElement.type = 'text/javascript';
      scriptElement.charset = 'utf-8';
      scriptElement.onload = () => resolve();
      scriptElement.onerror = () => reject();

      document.head.appendChild(scriptElement);
    });
  }
}
