import Shape, { ShapeType } from './shape';
import ColorManager from './color';
import LightManager from './light';

export default class CanvasManager {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number = 400;
    private height: number = 400;
    private shape: Shape;
    private colorManager: ColorManager;
    private lightManager: LightManager;
    private shapeSelect: HTMLSelectElement;
    private paletteSelect: HTMLSelectElement;

    constructor(canvasId: string, shapeSelectId: string, paletteSelectId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.shapeSelect = document.getElementById(shapeSelectId) as HTMLSelectElement;
        this.paletteSelect = document.getElementById(paletteSelectId) as HTMLSelectElement;
        
        this.ctx = this.canvas.getContext('2d')!;
        
        this.colorManager = new ColorManager();
        this.lightManager = new LightManager(this.ctx);
        this.shape = new Shape(this.ctx, ShapeType.Cube);
        
        this.lightManager.trackLightSource(this.canvas, () => {
            this.draw();
        });
        
        this.init();
        this.setupEventListeners();
        this.draw();
    }

    private init(): void {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    private setupEventListeners(): void {
        this.shapeSelect.addEventListener('change', (e: Event) => {
            const select = e.target as HTMLSelectElement;
            this.shape.setType(select.value as ShapeType);
            this.draw();
        });
    
        this.paletteSelect.addEventListener('change', (e: Event) => {
            const select = e.target as HTMLSelectElement;
            this.colorManager.changePalette(select.value);
            this.draw();
        });
    }

    private draw(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.colorManager.drawBackground(this.ctx, this.width, this.height);
        
        this.lightManager.drawLightEffect();
        
        this.lightManager.drawShadow(this.shape.getDimensions(), this.shape.getType());
        
        this.shape.draw(this.colorManager.getCurrentPalette().sphereGradient);
    }

    public setShape(type: ShapeType): void {
        this.shape = new Shape(this.ctx, type);
        this.draw();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvasManager = new CanvasManager('sphereCanvas', 'shapeSelect', 'paletteSelect');
});