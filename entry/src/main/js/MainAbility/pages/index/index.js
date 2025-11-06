export default {
    data: {
        score: 0,
        taps: 0,
        isGameOver: false,
        startTime: 0,
        dotX: 227,
        dotY: 227,
    },

    onShow() {
        const canvas = this.$refs.canvas1;
        const ctx = canvas.getContext('2d');
        this.draw(ctx);
    },

    draw(ctx) {
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, 454, 454);

        if (this.isGameOver) {
            this.drawGameOver(ctx);
        } else {
            this.drawScore(ctx);
            this.drawDot(ctx);
        }
    },

    drawScore(ctx) {
        ctx.fillStyle = '#fff';
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Score: ${this.score}`, 227, 50);

        ctx.font = '20px sans-serif';
        ctx.fillText(`Taps: ${this.taps}/5`, 227, 80);
    },
    drawDot(ctx) {
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.lineWidth = 32;
        ctx.arc(this.dotX, this.dotY, 16, 0, Math.PI * 2);
        ctx.stroke();
    },
    drawGameOver(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, 454, 454);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', 227, 180);

        ctx.font = '24px sans-serif';
        ctx.fillText(`Final Score: ${this.score}`, 227, 230);

        const btnX = 127;
        const btnY = 270;
        const btnW = 200;
        const btnH = 50;

        ctx.fillStyle = '#ff5252';
        ctx.fillRect(btnX, btnY, btnW, btnH);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('RESTART', 227, btnY + 15);
    },

    handleClick(e) {
        const { globalX, globalY } = e;
        const canvas = this.$refs.canvas1;
        const ctx = canvas.getContext('2d');

        if (this.isGameOver) {
            if (globalX >= 127 && globalX <= 327 && globalY >= 270 && globalY <= 320) {
                this.restart();
            }
            return;
        }

        if (this.taps === 0) {
            this.startTime = Date.now();
        }

        const distance = Math.sqrt(
            Math.pow(globalX - this.dotX, 2) + Math.pow(globalY - this.dotY, 2)
        );

        if (distance <= 25) {
            this.taps++;

            const reactionTime = Date.now() - this.startTime;
            const points = Math.max(100, Math.floor(5000 - reactionTime));
            this.score += points;

            if (this.taps >= 5) {
                this.isGameOver = true;
            } else {
                this.moveDot();
                this.startTime = Date.now();
            }

            this.draw(ctx);
        }
    },

    moveDot() {
        const margin = 50;
        this.dotX = margin + Math.random() * (454 - 2 * margin);
        this.dotY = 100 + Math.random() * (354 - margin);
    },

    restart() {
        this.score = 0;
        this.taps = 0;
        this.isGameOver = false;
        this.startTime = 0;
        this.dotX = 227;
        this.dotY = 227;

        const canvas = this.$refs.canvas1;
        const ctx = canvas.getContext('2d');
        this.draw(ctx);
    }
};