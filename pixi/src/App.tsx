/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import * as PIXI from 'pixi.js'
import KeyboardEventHandler from 'react-keyboard-event-handler';

//import {OutlineFilter} from '@pixi/filter-outline'
export class App extends React.Component {
  el: HTMLDivElement;
  clientRect: DOMRect;
  pixi: PIXI.Application;
  renderer: PIXI.Renderer;
  requestID: number;
  keyboardCallback: (key) => void
  jiggle: () => void;
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
    const {width, height} = this.clientRect
    //https://stackoverflow.com/questions/30554533/dynamically-resize-the-pixi-stage-and-its-contents-on-window-resize-and-window
    this.pixi.resize();
    //this.camera.aspect = width / height;
    //this.camera.updateProjectionMatrix();
  }
  sceneSetup = () => {
    const {width, height} = this.clientRect
    const pixi = new PIXI.Application({width, height, resizeTo: this.el})

    this.renderer = pixi.renderer;
    this.pixi = pixi;

    this.el.appendChild(this.pixi.view);

    const style = new PIXI.TextStyle({fontFamily : 'Consolas', fontSize: 16, fill : 0xffffff, align : 'center'})
    const textMetrics = PIXI.TextMetrics.measureText('a', style)
    const letterAtlas = LetterAtlas()

    function LetterAtlas() {
      const textures = []
      return function (letter: string) {
        const index = letter.charCodeAt(0);
        let ret = textures[index]
        if (ret) return ret;
        ret = RenderText(letter)
        textures[index] = ret
        return ret
      }
    }

    function RenderText(text): PIXI.RenderTexture {
      const texture = PIXI.RenderTexture.create();
      const t = new PIXI.Text(text, style);
      pixi.renderer.render(t, texture);
      return texture;
    }

    function Rect(x,y,w,h) {
      const r1 = new PIXI.Graphics();
      r1.beginFill(0x00ffff);
      r1.drawRect(x, y, w, h);
      r1.endFill();
      //pixi.renderer.render(r1,texture);
    }

    function makeLetterSprite(letter) {
      const sprite = new PIXI.Sprite(letterAtlas(letter));
      //sprite.scale.x = 1
      //sprite.scale.y = 1
      //sprite.position.x = x;
      //sprite.position.y = y;
      sprite.anchor.x = 0;
      sprite.anchor.y = 0;
      return sprite;
    }

    //block.filters= [new OutlineFilter(2, 0x99ff99)];

    //var sprites = new PIXI.ParticleContainer(20000, { position: true, });
    const spriteContainer = new PIXI.Container();
    const nx = div(width, textMetrics.width)
    const ny = div(height, textMetrics.height)
    const spriteList = []

    function render() {
      for (let i = 0; i < spriteList.length; i++) {
        const item = spriteList[i]
        item.position.x = i*textMetrics.width
      }
    }

    pixi.stage.addChild(spriteContainer);
    this.jiggle = function () {
      for (const elm of spriteList) {
        const pos = elm.position
        pos.x = pos.x + (Math.random()-0.5) * 5;
        pos.y = pos.y + (Math.random()-0.5) * 5;
      }
      //this.renderer.render();
    }
    this.keyboardCallback = function (key) {
      console.log(key)
      const letter = makeLetterSprite(key)
      spriteList.push(letter)
      spriteContainer.addChild(letter)
      render()
    }
  };
  addCustomSceneObjects = () => {
  };

  startAnimationLoop = () => {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    //this.jiggle()

    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  render() {
    return <div className={"appdiv"} ref={ref => (this.el = ref)}>
      <KeyboardEventHandler
          handleKeys={['alphanumeric']}
          onKeyEvent={(key)=> this.keyboardCallback(key)}>
      </KeyboardEventHandler>
    </div>
  }
}
function div(a, by) {
  return (a - a % by) / by;
}
function mod(a, by) {
  return a % by
}