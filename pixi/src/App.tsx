import * as React from 'react';
import * as PIXI from 'pixi.js'
//import {OutlineFilter} from '@pixi/filter-outline'
export class App extends React.Component {
  el: HTMLDivElement;
  clientRect: DOMRect;
  pixi: PIXI.Application;
  renderer: PIXI.Renderer;
  requestID: number;
  constructor(props) {
    super(props);
    this.jiggle = ()=>{}
  }
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

    let style = new PIXI.TextStyle({fontFamily : 'Consolas', fontSize: 32, fill : 0xffffff, align : 'center'})
    let textMetrics = PIXI.TextMetrics.measureText('a', style)
    var texture = PIXI.RenderTexture.create({ width: textMetrics.width, height: textMetrics.height });
    const textA = new PIXI.Text('a', style);
    pixi.renderer.render(textA,texture);
    // var r1 = new PIXI.Graphics();
    // r1.beginFill(0x00ffff);
    // r1.drawRect(0, 0, 100, 100);
    // r1.endFill();
    function makeLetter(x: number = 100, y: number = 100) {
      var block = new PIXI.Sprite(texture);
      block.scale.x = 0.5
      block.scale.y = 0.5
      block.position.x = x;
      block.position.y = y;
      block.anchor.x = 1;
      block.anchor.y = 1;
      return block;
    }

// pixi.renderer.render(r1,texture);
    makeLetter();

    //block.filters= [new OutlineFilter(2, 0x99ff99)];

    var sprites = new PIXI.ParticleContainer(20000, {
      position: true,
    });
    var nx = div(width, textMetrics.width/2)
    var ny = div(height, textMetrics.height/2)
    var derp = []
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        var l = makeLetter(i*textMetrics.width/2, j*textMetrics.height/2)
        derp.push(l)
        sprites.addChild(l)
      }
    }
    pixi.stage.addChild(sprites);
    this.jiggle = function () {
      for (const elm of derp) {
        const derpElement = elm.position
        derpElement.x = derpElement.x + (Math.random()-0.5) * 5;
        derpElement.y = derpElement.y+ (Math.random()-0.5)*5;
      }
      //this.renderer.render();
    }
  };
  addCustomSceneObjects = () => {
  };

  startAnimationLoop = () => {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    this.jiggle()
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };
  private jiggle: () => void;

  render() {
    return <div className={"appdiv"} ref={ref => (this.el = ref)} />
  }
}
function div(a, by) {
  return (a - a % by) / by;
}
function mod(a, by) {
  return a % by
}