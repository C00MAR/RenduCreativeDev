import colorPalettes from "./colorPalettes"

class SphereRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number = 400;
    private height: number = 400;
    private palette: colorPalettes;
    private select: HTMLSelectElement;

    constructor(canvasId: string, selectId: string, paletteKey: keyof typeof colorPalettes = 'purple') {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.select = document.getElementById(selectId) as HTMLSelectElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.palette = colorPalettes[paletteKey];
        
        this.init();
        this.setupEventListeners();
        this.draw();
    }

    private init(): void {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    private setupEventListeners(): void {
        this.select.addEventListener('change', (e: Event) => {
            const select = e.target as HTMLSelectElement;
            this.changePalette(select.value as keyof typeof colorPalettes);
        });
    }

    private drawBackground(): void {
        this.ctx.fillStyle = this.palette.upperBackground;
        this.ctx.fillRect(0, 0, this.width, this.height / 2);
        
        this.ctx.fillStyle = this.palette.lowerBackground;
        this.ctx.fillRect(0, this.height / 2, this.width, this.height / 2);

        const lightGradient = this.ctx.createRadialGradient(
            0, 0,
            0,
            150, 100,
            200
        );
        lightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        lightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
        lightGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');

        this.ctx.fillStyle = lightGradient;
        this.ctx.fillRect(0, 0, this.width, this.height / 2);
    }

    private drawSphere(): void {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = 80;

        const gradient = this.ctx.createRadialGradient(
            centerX - radius/3,
            centerY - radius/3,
            radius/10,
            centerX,
            centerY,
            radius
        );

        gradient.addColorStop(0, this.palette.sphereGradient.light);
        gradient.addColorStop(0.8, this.palette.sphereGradient.medium);
        gradient.addColorStop(1, this.palette.sphereGradient.dark);

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }

    private drawShadow(): void {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = 80;

        this.ctx.beginPath();
        this.ctx.ellipse(
            centerX + 20,
            centerY + radius + 20,
            radius * 0.8,
            radius * 0.15,
            0,
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = this.palette.shadowColor;
        this.ctx.fill();
    }

    public changePalette(paletteKey: keyof typeof colorPalettes): void {
        this.palette = colorPalettes[paletteKey];
        this.draw();
    }

    private draw(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawBackground();
        this.drawShadow();
        this.drawSphere();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const renderer = new SphereRenderer('sphereCanvas', 'paletteSelect');
});