import * as React from 'react';
import * as PIXI from 'pixi.js'
export class App extends React.Component {
  el: HTMLDivElement;
  clientRect: DOMRect;
  pixi: PIXI.Application;
  renderer: PIXI.Renderer;
  requestID: number;
  componentDidMount = () => {
    this.clientRect = this.el.getBoundingClientRect()
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener('resize', this.handleWindowResize);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
  }
  handleWindowResize = () => {
    if (!this.pixi) return;
    this.clientRect = this.el.getBoundingClientRect()
    var {width, height} = this.clientRect
    //https://stackoverflow.com/questions/30554533/dynamically-resize-the-pixi-stage-and-its-contents-on-window-resize-and-window
    this.pixi.resize();
    //this.camera.aspect = width / height;
    //this.camera.updateProjectionMatrix();
  }
  sceneSetup = () => {
    var {width, height} = this.clientRect
    const pixi = new PIXI.Application({width, height, resizeTo: this.el})

    this.renderer = pixi.renderer;
    this.pixi = pixi;

    this.el.appendChild(this.pixi.view);

    let style = new PIXI.TextStyle({fontFamily : 'Consolas', fontSize: 12, fill : 0xffffff, align : 'center'})
    let textMetrics = PIXI.TextMetrics.measureText('a', style)
    var texture = PIXI.RenderTexture.create({ width: textMetrics.width, height: textMetrics.height });
    const textA = new PIXI.Text('a', style);
    pixi.renderer.render(textA,texture);
    // var r1 = new PIXI.Graphics();
    // r1.beginFill(0x00ffff);
    // r1.drawRect(0, 0, 100, 100);
    // r1.endFill();
    // pixi.renderer.render(r1,texture);
    var block = new PIXI.Sprite(texture);
    block.position.x = 100;
    block.position.y = 100;
    block.anchor.x = .5;
    block.anchor.y = .5;
    pixi.stage.addChild(block);
  };
  addCustomSceneObjects = () => {
  };

  startAnimationLoop = () => {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    //this.renderer.render( this.scene, this.camera );
    //this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  render() {
    return <div className={"appdiv"} ref={ref => (this.el = ref)} />
  }
}