import { _decorator, Component, SpriteFrame, Graphics } from 'cc';
import { Constant } from '../util/Constant';
import { GameUtil } from '../util/GameUtil';
const { ccclass, property } = _decorator;

@ccclass('WelcomeAnimation')
export class WelcomeAnimation extends Component {
    private titleImg: SpriteFrame | null = null;
    private noticeImg: SpriteFrame | null = null;
    private flashCount: number = 0;

    constructor() {
        super();
    }

    async init() {
        this.titleImg = await GameUtil.loadBufferedImage(Constant.TITLE_IMG_PATH);
        this.noticeImg = await GameUtil.loadBufferedImage(Constant.NOTICE_IMG_PATH);
    }

    async draw(g: Graphics) {
        if (!this.titleImg || !this.noticeImg) {
            await this.init();
        }

        if (!this.titleImg || !this.noticeImg) return;

        const x = Math.floor((Constant.FRAME_WIDTH - this.titleImg.width) / 2);
        const y = Math.floor(Constant.FRAME_HEIGHT / 3);
        g.drawImage(this.titleImg, x, y);

        const CYCLE = 30;
        this.flashCount++;
        if (this.flashCount > CYCLE) {
            const noticeX = Math.floor((Constant.FRAME_WIDTH - this.noticeImg.width) / 2);
            const noticeY = Math.floor((Constant.FRAME_HEIGHT / 5) * 3);
            g.drawImage(this.noticeImg, noticeX, noticeY);
        }
        if (this.flashCount === CYCLE * 2) {
            this.flashCount = 0;
        }
    }
}