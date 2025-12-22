// ScoreCounter.ts
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreCounter')
export class ScoreCounter extends Component {
    @property({ type: Label })
    public scoreLabel: Label = null!;

    @property({ type: Label })
    public highScoreLabel: Label = null!;

    private currentScore: number = 0;
    private highScore: number = 0;

    start() {
        this.loadHighScore();
    }

    addScore() {
        this.currentScore++;
        this.updateDisplay();

        // 更新最高分
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
            this.saveHighScore();
        }
    }

    resetScore() {
        this.currentScore = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.scoreLabel) {
            this.scoreLabel.string = this.currentScore.toString();
        }

        if (this.highScoreLabel) {
            this.highScoreLabel.string = this.highScore.toString();
        }
    }

    loadHighScore() {
        // 从本地存储加载最高分
        const savedHighScore = localStorage.getItem('flappybird_high_score');
        if (savedHighScore) {
            this.highScore = parseInt(savedHighScore);
        }
    }

    saveHighScore() {
        // 保存最高分到本地存储
        localStorage.setItem('flappybird_high_score', this.highScore.toString());
    }
}
