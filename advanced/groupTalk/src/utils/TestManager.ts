export default class TestManager {
  static testContainer;
  static init() {
    this.testContainer = document.createElement('div');
    this.testContainer.setAttribute('id', 'websdk-test-container');
    this.testContainer.setAttribute(
      'style',
      `
        position: absolute;
        z-index: 999;
        top: 60px;
        left: 10px;
        background-color: #fff;
        padding: 24px;
        width: 400px;
        display: flex;
        flex-wrap: wrap;
      `,
    );

    document.body.appendChild(this.testContainer);
  }
  static createButton(text: string, onclick: (event: Event) => void, id?: string) {
    const button = document.createElement('button');
    button.innerText = text;
    button.onclick = onclick;
    button.setAttribute('style', 'margin: 12px;');

    if (id) {
      button.setAttribute('id', id);
    }
    this.testContainer.appendChild(button);
  }
}
