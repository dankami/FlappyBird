import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MyCanvas')
export class MyCanvas extends Component {
    start() {
        console.log('MyCanvas');
    }

    update(deltaTime: number) {
        
    }
}


