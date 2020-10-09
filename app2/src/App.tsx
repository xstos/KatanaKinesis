import * as React from 'react';

import {Black, CanvasDriver, Engine, GameObject, Graphics, Input, StageScaleMode, TextField} from "./Black";

class MyGame extends GameObject {
  private textField: TextField;
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);
  }

  onAdded() {
    this.textField = new TextField('Arial is your best b!', 'Arial', 0xf6a200, 40);
    this.textField.align = 'center';
    //this.textField.x = this.stage.centerX;
    this.textField.x = 200;
    this.textField.y = this.stage.centerY;
    this.textField.alignPivot();
    this.addChild(this.textField);
    Black.input.on('pointerDown', this.onDown, this);
    // circle

  }
  onDown() {
    let p = this.globalToLocal(Black.input.pointerPosition);
    const g = new Graphics()
    g.beginPath();
    g.lineStyle(10, 0xf0f0f0);
    g.circle(p.x, p.y, 70);
    g.stroke();
    this.add(g);
  }
}

class BlackComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    if (Black.engine) {
      Black.engine.stop()
      Black.engine.destroy()
      document.getElementById("black").innerHTML=''
    }
    var engine = new Engine('black', MyGame, CanvasDriver, [Input]);
    engine.start();
  }
  render() {
    return <div>{"test"}</div>;
  }
}
export function App() {
  return (
      <React.Fragment>
        <div id={"black"} />
        <BlackComponent />
      </React.Fragment>
  );
}