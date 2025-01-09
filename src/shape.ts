export enum ShapeType {
    Sphere = 'sphere',
    Cube = 'cube',
    Cylinder = 'cylinder',
    Pyramid = 'pyramid',
    Torus = 'torus'
}

export interface ShapeDimensions {
    centerX: number;
    centerY: number;
    radius: number;
    width: number;
    height: number;
}

interface GradientColors {
    light: string;
    medium: string;
    dark: string;
}

export default class Shape {
    private ctx: CanvasRenderingContext2D;
    private type: ShapeType;
    private dimensions: ShapeDimensions;

    constructor(ctx: CanvasRenderingContext2D, type: ShapeType) {
        this.ctx = ctx;
        this.type = type;
        this.dimensions = {
            centerX: 200,
            centerY: 200,
            radius: 80,
            width: 160,
            height: 160
        };
    }

    public getDimensions(): ShapeDimensions {
        return this.dimensions;
    }

    private drawSphere(gradient: GradientColors): void {
        const { centerX, centerY, radius } = this.dimensions;
        
        const sphereGradient = this.ctx.createRadialGradient(
            centerX - radius/3,
            centerY - radius/3,
            radius/10,
            centerX,
            centerY,
            radius
        );

        sphereGradient.addColorStop(0, gradient.light);
        sphereGradient.addColorStop(0.8, gradient.medium);
        sphereGradient.addColorStop(1, gradient.dark);

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = sphereGradient;
        this.ctx.fill();
    }

    private drawCube(gradient: GradientColors): void {
        const { centerX, centerY, width } = this.dimensions;
        const size = width * 0.7;
        const offset = size * 0.3;
    
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - size/2, centerY - size/2);
        this.ctx.lineTo(centerX + size/2, centerY - size/2);
        this.ctx.lineTo(centerX + size/2, centerY + size/2);
        this.ctx.lineTo(centerX - size/2, centerY + size/2);
        this.ctx.closePath();
    
        const frontGradient = this.ctx.createLinearGradient(
            centerX - size/2,
            centerY - size/2,
            centerX + size/2,
            centerY + size/2
        );
        frontGradient.addColorStop(0, gradient.light);
        frontGradient.addColorStop(0.5, gradient.medium);
        frontGradient.addColorStop(1, gradient.medium);
        this.ctx.fillStyle = frontGradient;
        this.ctx.fill();
    
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - size/2, centerY - size/2);
        this.ctx.lineTo(centerX - size/2 + offset, centerY - size/2 - offset);
        this.ctx.lineTo(centerX + size/2 + offset, centerY - size/2 - offset);
        this.ctx.lineTo(centerX + size/2, centerY - size/2);
        this.ctx.closePath();
    
        const topGradient = this.ctx.createLinearGradient(
            centerX,
            centerY - size/2 - offset,
            centerX,
            centerY - size/2
        );
        topGradient.addColorStop(0, gradient.light);
        topGradient.addColorStop(1, gradient.medium);
        this.ctx.fillStyle = topGradient;
        this.ctx.fill();
    
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + size/2, centerY - size/2);
        this.ctx.lineTo(centerX + size/2 + offset, centerY - size/2 - offset);
        this.ctx.lineTo(centerX + size/2 + offset, centerY + size/2 - offset);
        this.ctx.lineTo(centerX + size/2, centerY + size/2);
        this.ctx.closePath();
    
        const sideGradient = this.ctx.createLinearGradient(
            centerX + size/2,
            centerY,
            centerX + size/2 + offset,
            centerY
        );
        sideGradient.addColorStop(0, gradient.medium);
        sideGradient.addColorStop(1, gradient.dark);
        this.ctx.fillStyle = sideGradient;
        this.ctx.fill();
    
        this.ctx.strokeStyle = gradient.dark;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    private drawPyramid(gradient: GradientColors): void {
        const { centerX, centerY, width } = this.dimensions;
        const size = width * 1.1;
        const height = size * 0.9;
        
        this.ctx.beginPath();
        
        this.ctx.moveTo(centerX - size/2.5, centerY + size/3);
        this.ctx.lineTo(centerX - size*0.000001, centerY - height/2);
        this.ctx.lineTo(centerX + size/2.5, centerY + size/3);
        this.ctx.closePath();
    
        const frontGradient = this.ctx.createLinearGradient(
            centerX - size/2.5,
            centerY,
            centerX + size/2.5,
            centerY
        );
        frontGradient.addColorStop(0, gradient.light);
        frontGradient.addColorStop(1, gradient.medium);
        this.ctx.fillStyle = frontGradient;
        this.ctx.fill();
    
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - size*0.000001, centerY - height/2);
        this.ctx.lineTo(centerX + size/2.5, centerY + size/3);
        this.ctx.lineTo(centerX + size/2.2, centerY + size/4);
        this.ctx.closePath();
    
        const rightGradient = this.ctx.createLinearGradient(
            centerX + size/2.5,
            centerY,
            centerX + size/2.2,
            centerY
        );
        rightGradient.addColorStop(0, gradient.medium);
        rightGradient.addColorStop(1, gradient.dark);
        this.ctx.fillStyle = rightGradient;
        this.ctx.fill();
    
        this.ctx.strokeStyle = gradient.dark;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
    }

    private drawCylinder(gradient: GradientColors): void {
        const { centerX, centerY, width } = this.dimensions;
        const size = width * 0.8;  
        const height = size * 1.2;  
        const radiusX = size / 3;  
        const radiusY = size / 8;   
    
        this.ctx.beginPath();
        this.ctx.ellipse(
            centerX,
            centerY + height/2,
            radiusX,
            radiusY,
            0,
            0,
            Math.PI * 2
        );
        const baseGradient = this.ctx.createLinearGradient(
            centerX - radiusX,
            centerY,
            centerX + radiusX,
            centerY
        );
        baseGradient.addColorStop(0, gradient.medium);
        baseGradient.addColorStop(0.4, gradient.light);
        baseGradient.addColorStop(0.8, gradient.medium);
        baseGradient.addColorStop(1, gradient.dark);
        this.ctx.fillStyle = baseGradient;
        this.ctx.fill();
    
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - radiusX, centerY - height/2);
        this.ctx.lineTo(centerX - radiusX, centerY + height/2);
        this.ctx.ellipse(
            centerX,
            centerY + height/2,
            radiusX,
            radiusY,
            0,
            Math.PI,
            Math.PI * 2
        );
        this.ctx.lineTo(centerX + radiusX, centerY - height/2);
        this.ctx.closePath();
    
        const sideGradient = this.ctx.createLinearGradient(
            centerX - radiusX,
            centerY,
            centerX + radiusX,
            centerY
        );
        sideGradient.addColorStop(0, gradient.medium);
        sideGradient.addColorStop(0.4, gradient.light);
        sideGradient.addColorStop(0.8, gradient.medium);
        sideGradient.addColorStop(1, gradient.dark);
        this.ctx.fillStyle = sideGradient;
        this.ctx.fill();
    
        this.ctx.beginPath();
        this.ctx.ellipse(
            centerX,
            centerY - height/2,
            radiusX,
            radiusY,
            0,
            0,
            Math.PI * 2
        );
    
        const topGradient = this.ctx.createLinearGradient(
            centerX - radiusX,
            centerY - height/2,
            centerX + radiusX,
            centerY - height/2
        );
        topGradient.addColorStop(0, gradient.light);
        topGradient.addColorStop(0.5, gradient.medium);
        topGradient.addColorStop(1, gradient.light);
        this.ctx.fillStyle = topGradient;
        this.ctx.fill();
    
        this.ctx.strokeStyle = gradient.dark;
        this.ctx.lineWidth = 1;
        
        this.ctx.beginPath();
        this.ctx.ellipse(
            centerX,
            centerY - height/2,
            radiusX,
            radiusY,
            0,
            0,
            Math.PI * 2
        );
        this.ctx.stroke();
    
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - radiusX, centerY - height/2);
        this.ctx.lineTo(centerX - radiusX, centerY + height/2);
        this.ctx.moveTo(centerX + radiusX, centerY - height/2);
        this.ctx.lineTo(centerX + radiusX, centerY + height/2);
        this.ctx.stroke();
    
        this.ctx.beginPath();
        this.ctx.ellipse(
            centerX,
            centerY + height/2,
            radiusX,
            radiusY,
            0,
            0,
            Math.PI
        );
        this.ctx.stroke();
    }

    private drawTorus(gradient: GradientColors): void {
        const { centerX, centerY, width } = this.dimensions;
        
        const ringRadius = width * 0.4; 
        const tubeRadius = width * 0.15; 
    
        const torusGradient = this.ctx.createRadialGradient(
            centerX,
            centerY,
            ringRadius - tubeRadius * 0.5,
            centerX,
            centerY,
            ringRadius
        );
    
        torusGradient.addColorStop(0,   gradient.light);
        torusGradient.addColorStop(0.5, gradient.medium);
        torusGradient.addColorStop(1,   gradient.dark);
    
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = torusGradient;
        this.ctx.fill();
    
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, ringRadius - tubeRadius, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.restore();
    }
    

    public draw(gradient: GradientColors): void {
        switch (this.type) {
            case ShapeType.Sphere:
                this.drawSphere(gradient);
                break;
            case ShapeType.Cube:
                this.drawCube(gradient);
                break;
            case ShapeType.Cylinder:
                this.drawCylinder(gradient);
                break;
            case ShapeType.Pyramid:
                this.drawPyramid(gradient);
                break;
            case ShapeType.Torus:
                this.drawTorus(gradient);
                break;
        }
    }
    

    public setType(type: ShapeType): void {
        this.type = type;
    }

    public getType(): ShapeType {
        return this.type;
    }
}