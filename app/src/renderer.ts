import {Black, CanvasDriver, Engine, GameObject, StageScaleMode, TextField} from "./Black";

class MyGame extends GameObject {
    private textField: TextField;
    constructor() {
        super();

        // Set auto resizeable stage
        Black.stage.scaleMode = StageScaleMode.LETTERBOX;
        // Black.stage.setSize(500, 500);
    }

    onAdded() {
        this.textField = new TextField('Arial is your best friend!', 'Arial', 0xf6a200, 40);
        this.textField.align = 'center';
        // @ts-ignore
        this.textField.x = this.stage.centerX;
        // @ts-ignore
        this.textField.y = this.stage.centerY;
        this.textField.alignPivot();
        // @ts-ignore
        this.addChild(this.textField);
    }
}
const engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();