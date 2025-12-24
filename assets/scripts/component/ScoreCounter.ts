import { _decorator, Component } from 'cc';
import { Constant } from '../util/Constant';
import { MusicUtil } from '../util/MusicUtil';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;
@ccclass('ScoreCounter')
export class ScoreCounter {
    private static instance: ScoreCounter | null = null;
    private currentScore: number = 0;
    private bestScore: number = -1;

    public static getInstance(): ScoreCounter {
        if (!ScoreCounter.instance) {
            ScoreCounter.instance = new ScoreCounter();
            ScoreCounter.instance.init();
        }
        return ScoreCounter.instance;
    }

    private init() {
        this.bestScore = -1;
        this.loadBestScore();
    }

    private loadBestScore() {
        // 在Cocos Creator中，我们可以使用本地存储来保存分数
        const savedBestScore = localStorage.getItem(Constant.SCORE_FILE_PATH);
        if (savedBestScore !== null) {
            this.bestScore = parseInt(savedBestScore, 10);
        }
    }

    public saveScore() {
        this.bestScore = Math.max(this.bestScore, this.getCurrentScore());
        localStorage.setItem(Constant.SCORE_FILE_PATH, this.bestScore.toString());
    }

    public score(bird: Bird) {
        if (!bird.isDead()) {
            MusicUtil.playScore();
            this.currentScore += 1;
        }
    }

    public getBestScore(): number {
        return this.bestScore;
    }

    public getCurrentScore(): number {
        return this.currentScore;
    }

    public reset() {
        this.currentScore = 0;
    }
}
