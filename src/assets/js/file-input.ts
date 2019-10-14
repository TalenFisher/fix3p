import { CustomElement } from "./decorators";


@CustomElement("file-input")
export default class FileInput extends HTMLElement {
    private uploadBtn: HTMLElement;
    private input: HTMLInputElement;
    private displayLabel: HTMLElement;
    private deleteBtn: HTMLElement;

    public connectedCallback() {
        this.innerHTML = `
            <div class="upload-btn">
                <input type="file">
                <span>Upload Preset</span>
            </div>
            <div class="filename-viewer">
                <span class="text"></span>
                <span class="delete-btn fa fa-times"></span>
            </div>
        `;

        this.uploadBtn = this.querySelector(".upload-btn span");
        this.input = this.querySelector(".upload-btn input");
        this.displayLabel = this.querySelector(".filename-viewer .text");
        this.deleteBtn = this.querySelector(".filename-viewer .delete-btn");

        this.setupListeners();
    }

    private setupListeners() {
        this.uploadBtn.onclick = e => this.input.click();
        this.input.onchange = this.handleOnChange.bind(this);

        this.deleteBtn.onclick = e => {
            this.input.value = "";
            this.handleOnChange();
        }
    }

    private handleOnChange() {
        if(this.input.files.length == 0) {
            this.classList.remove("active");
        } else {
            this.classList.add("active");
            this.displayLabel.innerHTML = this.input.files[0].name;
        }
    }
}