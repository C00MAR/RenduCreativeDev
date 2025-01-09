import { ShapeDimensions, ShapeType } from './shape';

export interface LightPosition {
  x: number;
  y: number;
  intensity: number;
}

export default class LightManager {
  private ctx: CanvasRenderingContext2D;
  private lightPosition: LightPosition;
  private mouseMoveHandler?: (event: MouseEvent) => void;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.lightPosition = {
      x: 200,
      y: 100,
      intensity: 1
    };
  }

  public setLightPosition(position: LightPosition): void {
    this.lightPosition = position;
  }

  public trackLightSource(
    canvas: HTMLCanvasElement,
    onLightMove?: () => void
  ): void {
    this.mouseMoveHandler = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
  
      const maxY = canvas.height / 2;
      const constrainedY = Math.min(mouseY, maxY);
  
      this.lightPosition.x = mouseX;
      this.lightPosition.y = constrainedY;
  
      if (onLightMove) {
        onLightMove();
      }
    };
  
    canvas.addEventListener('mousemove', this.mouseMoveHandler);
  
    canvas.addEventListener('click', () => {
      if (this.mouseMoveHandler) {
        this.mouseMoveHandler(event as unknown as MouseEvent); 
        canvas.removeEventListener('mousemove', this.mouseMoveHandler);
      }
      if (onLightMove) {
        onLightMove();
      }
    });
  }

  public drawLightEffect(): void {
    const radius = 200;
    const lightGradient = this.ctx.createRadialGradient(
      this.lightPosition.x,
      this.lightPosition.y,
      0,
      this.lightPosition.x,
      this.lightPosition.y,
      radius
    );

    const intensity = this.lightPosition.intensity;
    lightGradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * intensity})`);
    lightGradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.3 * intensity})`);
    lightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.ctx.fillStyle = lightGradient;
    this.ctx.fillRect(0, 0, 400, 400);
  }

  private getShadowOffsets(
    shapeDimensions: ShapeDimensions,
    scale: number = 0.1
  ): { offsetX: number; offsetY: number } {
    const { centerX, centerY } = shapeDimensions;
    const dx = centerX - this.lightPosition.x;
    const dy = centerY - this.lightPosition.y;

    return {
      offsetX: dx * scale,
      offsetY: dy * scale
    };
  }

    private createShadowGradient(radius: number): CanvasGradient {
        const shadowGradient = this.ctx.createRadialGradient(
          0, 0, 0,
          0, 0, radius
        );
        shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
        shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        return shadowGradient;
      }

  public drawShadow(shapeDimensions: ShapeDimensions, shapeType: ShapeType): void {
    const { centerX, centerY, width } = shapeDimensions;
    const { offsetX, offsetY } = this.getShadowOffsets(shapeDimensions, 0.55);

    switch (shapeType) {

        case ShapeType.Cube: {
            const size = width * 0.7;
      
            const shadowCenterX = centerX + offsetX;
            const shadowCenterY = centerY + size / 2 + offsetY;
      
            const dx = centerX - this.lightPosition.x;
            const dy = centerY - this.lightPosition.y;
            const angle = Math.atan2(dy, dx);
      
            const topWidth = size * 0.7;
            const bottomWidth = size * 1.0;
            const shadowHeight = size * 0.9;
      
            this.ctx.save();
      
            this.ctx.translate(shadowCenterX, shadowCenterY);

            this.ctx.rotate(angle + Math.PI * 0.5);
      
            this.ctx.scale(1, 0.6);
      
            this.ctx.beginPath();
            this.ctx.moveTo(-topWidth / 2, 0);
            this.ctx.lineTo(topWidth / 2, 0);
            this.ctx.lineTo(bottomWidth / 2, shadowHeight);
            this.ctx.lineTo(-bottomWidth / 2, shadowHeight);
            this.ctx.closePath();
            const maxDim = Math.max(bottomWidth, shadowHeight);
            const shadowGradient = this.ctx.createRadialGradient(
              0, 0, 0,
              0, 0, maxDim
            );
            shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
            shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            this.ctx.fillStyle = shadowGradient;
            this.ctx.fill();
      
            this.ctx.restore();
      
            break;
          }
        
        case ShapeType.Cylinder: {
        const size = width * 0.8;
        const heightCyl = size * 1.2;
        const radiusX = size / 3;
        const radiusY = size / 8;

        this.ctx.save();
        this.ctx.translate(centerX + offsetX, centerY + heightCyl / 2 + offsetY);
        this.ctx.rotate(Math.PI / 18);
        this.ctx.scale(1, 0.5);

        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = this.createShadowGradient(radiusX * 2);
        this.ctx.fill();
        this.ctx.restore();
        break;
      }

        case ShapeType.Pyramid: {
            const { offsetX, offsetY } = this.getShadowOffsets(shapeDimensions, 0.50);
            const baseSize = width * 0.7;
            const height = baseSize * 0.8;
            const shadowX = centerX + offsetX;
            const shadowY = centerY + height / 2 + offsetY;
            
            const dx = centerX - this.lightPosition.x;
            const dy = centerY - this.lightPosition.y;
            const angle = Math.atan2(dy, dx);
        
            this.ctx.save();
            this.ctx.translate(shadowX, shadowY);
            this.ctx.scale(1, 0.25);
            this.ctx.rotate(angle + Math.PI * 0.5);
        
            // Triangle shadow for pyramid
            this.ctx.beginPath();
            this.ctx.moveTo(0, -baseSize/2);
            this.ctx.lineTo(baseSize, baseSize);
            this.ctx.lineTo(-baseSize, baseSize);
            this.ctx.closePath();
        
            const shadowGradient = this.ctx.createRadialGradient(
                0, baseSize/2, 0,
                0, baseSize/2, baseSize * 1.5
            );
            shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
            shadowGradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.1)');
            shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
            this.ctx.fillStyle = shadowGradient;
            this.ctx.fill();
            this.ctx.restore();
            break;
        }

        case ShapeType.Sphere: {
            const radius = width / 2;
            this.ctx.save();

            this.ctx.beginPath();
            this.ctx.ellipse(
            centerX + offsetX,
            centerY + radius + offsetY,
            radius * 0.8,
            radius * 0.2,
            0,
            0,
            Math.PI * 2
            );
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fill();

            this.ctx.restore();
            break;
        }
    }
  }
}
