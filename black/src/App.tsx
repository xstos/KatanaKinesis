import * as React from 'react';

import {Black, CanvasDriver, Engine, GameObject, Graphics, Input, StageScaleMode, TextField} from "./Black";

class MyGame extends GameObject {
  private textField: TextField;
  constructor() {
    super();
    const rect = Black.engine.viewport.size
    // Set auto resizeable stage
    //Black.stage.scaleMode = StageScaleMode.COVER;
    //Black.stage.setSize(Black.stage.width, Black.stage.height);
  }

  onAdded() {

    this.textField = new TextField('A', 'Consolas', 0xFFFFFF, 32);
    this.textField.text = this.textField.width+""
    this.textField.align = 'center';
    //this.textField.x = this.stage.centerX;
    this.textField.x = 200;
    this.textField.y = this.stage.centerY;
    this.textField.alignPivot();
    this.textField.dropShadow =true;
    var w= this.textField.width;
    this.addChild(this.textField);
    Black.input.on('pointerMove', this.onDown, this);
    // circle

  }
  onDown() {
    let p = this.globalToLocal(Black.input.pointerPosition);

    this.textField.x = p.x
    this.textField.y = p.y
    this.textField.text = p.x.toString() + " " + p.y.toString()
    // const g = new Graphics()
    // g.beginPath();
    // g.lineStyle(10, 0xf0f0f0);
    // g.circle(p.x, p.y, 70);
    // g.stroke();
    //
    // this.add(g);
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
    return <div></div>;
  }
}
export function App() {
  const foo = <div/>
  if (Black.engine) {
    Black.engine.stop()
    Black.engine.destroy()
    document.getElementById("black").innerHTML=''
  }
  var engine = new Engine('black', MyGame, CanvasDriver, [Input]);
  engine.start();

  return (
      <React.Fragment>
        {foo}

      </React.Fragment>
  );
}