import { _decorator, Component, SpriteFrame, Graphics } from 'cc';
import { Constant } from '../util/Constant';
import { GameUtil } from '../util/GameUtil';
import { Cloud } from './Cloud';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('GameForeground')
export class GameForeground extends Component {
    private clouds: Cloud[] = [];
    private cloudImages: SpriteFrame[] = [];
    private time: number = 0;
    public static readonly CLOUD_INTERVAL: number = 100;

    constructor() {
        super();
        this.time = Date.now();
    }

    async init() {
        for (let i = 0; i < Constant.CLOUD_IMAGE_COUNT; i++) {
            const img = await GameUtil.loadBufferedImage(Constant.CLOUDS_IMG_PATH[i]);
            if (img) {
                this.cloudImages.push(img);
            }
        }
    }

    async draw(g: Graphics, bird: Bird) {
        if (this.cloudImages.length === 0) {
            await this.init();
        }
        this.cloudBornLogic();
        for (const cloud of this.clouds) {
            cloud.draw(g, bird);
        }
    }

    private cloudBornLogic() {
        if (Date.now() - this.time > GameForeground.CLOUD_INTERVAL) {
            this.time = Date.now();
            
            if (this.clouds.length < Constant.MAX_CLOUD_COUNT) {
                try {
                    if (GameUtil.isInProbability(Constant.CLOUD_BORN_PERCENT, 100)) {
                        const index = GameUtil.getRandomNumber(0, Constant.CLOUD_IMAGE_COUNT);
                        const x = Constant.FRAME_WIDTH;
                        const y = GameUtil.getRandomNumber(Constant.TOP_BAR_HEIGHT, Math.floor(Constant.FRAME_HEIGHT / 3));

                        if (this.cloudImages[index]) {
                            const cloud = new Cloud(this.cloudImages[index], x, y);
                            this.clouds.push(cloud);
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            }

            for (let i = 0; i < this.clouds.length; i++) {
                const tempCloud = this.clouds[i];
                if (tempCloud.isOutFrame()) {
                    this.clouds.splice(i, 1);
                    i--;
                }
            }
        }
    }
}