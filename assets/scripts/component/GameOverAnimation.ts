import { _decorator, Component, SpriteFrame, Graphics, Color } from 'cc';
import { Constant } from '../util/Constant';
import { GameUtil } from '../util/GameUtil';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('GameOverAnimation')
export class GameOverAnimation extends Component {
    private scoreImg: SpriteFrame | null = null;
    private overImg: SpriteFrame | null = null;
    private againImg: SpriteFrame | null = null;
    private static readonly SCORE_LOCATE: number = 5;
    private flash: number = 0;

    constructor() {
        super();
    }

    async init() {
        this.overImg = await GameUtil.loadBufferedImage(Constant.OVER_IMG_PATH);
        this.scoreImg = await GameUtil.loadBufferedImage(Constant.SCORE_IMG_PATH);
        this.againImg = await GameUtil.loadBufferedImage(Constant.AGAIN_IMG_PATH);
    }

    async draw(g: Graphics, bird: Bird) {
        if (!this.overImg || !this.scoreImg || !this.againImg) {
            await this.init();
        }

        if (!this.overImg || !this.scoreImg || !this.againImg) return;

        let x = Math.floor((Constant.FRAME_WIDTH - this.overImg.width) / 2);
        let y = Math.floor(Constant.FRAME_HEIGHT / 4);
        g.drawImage(this.overImg, x, y);

        x = Math.floor((Constant.FRAME_WIDTH - this.scoreImg.width) / 2);
        y = Math.floor(Constant.FRAME_HEIGHT / 3);
        g.drawImage(this.scoreImg, x, y);

        g.fillColor = Color.WHITE;
        g.fontSize = Constant.SCORE_FONT.size;
        g.fontFamily = Constant.SCORE_FONT.family;

        x = Math.floor((Math.floor((Constant.FRAME_WIDTH - this.scoreImg.width / 2) / 2) + GameOverAnimation.SCORE_LOCATE));
        y += Math.floor(this.scoreImg.height / 2);
        
        const str = bird.getCurrentScore().toString();
        const strWidth = GameUtil.getStringWidth(Constant.SCORE_FONT, str);
        x -= Math.floor(strWidth / 2);
        g.fillText(str, x, y + GameUtil.getStringHeight(Constant.SCORE_FONT, str));

        if (bird.getBestScore() > 0) {
            const bestStr = bird.getBestScore().toString();
            const bestStrWidth = GameUtil.getStringWidth(Constant.SCORE_FONT, bestStr);
            x = Math.floor((Math.floor((Constant.FRAME_WIDTH + this.scoreImg.width / 2) / 2) - GameOverAnimation.SCORE_LOCATE));
            x -= Math.floor(bestStrWidth / 2);
            g.fillText(bestStr, x, y + GameUtil.getStringHeight(Constant.SCORE_FONT, str));
        }

        const COUNT = 30;
        this.flash++;
        if (this.flash > COUNT) {
            const againX = Math.floor((Constant.FRAME_WIDTH - this.againImg.width) / 2);
            const againY = Math.floor((Constant.FRAME_HEIGHT / 5) * 3);
            g.drawImage(this.againImg, againX, againY);
        }
        if (this.flash === COUNT * 2) {
            this.flash = 0;
        }
    }
}