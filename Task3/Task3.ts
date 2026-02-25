// 1. Інтерфейс реалізації (Renderer)
interface Renderer {
    renderShape(shapeName: string): void;
}

// 2. Конкретні реалізації (Завдання 3.3)
class VectorRenderer implements Renderer {
    renderShape(shapeName: string): void {
        console.log(`Drawing ${shapeName} as vectors (lines and curves).`);
    }
}

class RasterRenderer implements Renderer {
    renderShape(shapeName: string): void {
        console.log(`Drawing ${shapeName} as pixels (raster graphics).`);
    }
}

// 3. Абстракція (Base Shape) (Завдання 3.1)
abstract class Shape {
    // Міст: посилання на об'єкт реалізації
    constructor(protected renderer: Renderer, protected name: string) {}

    abstract draw(): void;
}

// 4. Уточнені абстракції (Завдання 3.2)
class Circle extends Shape {
    constructor(renderer: Renderer) {
        super(renderer, "Circle");
    }
    draw(): void {
        this.renderer.renderShape(this.name);
    }
}

class Square extends Shape {
    constructor(renderer: Renderer) {
        super(renderer, "Square");
    }
    draw(): void {
        this.renderer.renderShape(this.name);
    }
}

class Triangle extends Shape {
    constructor(renderer: Renderer) {
        super(renderer, "Triangle");
    }
    draw(): void {
        this.renderer.renderShape(this.name);
    }
}

// 5. Головний метод (Завдання 3.4)
function main() {
    console.log("=== ЗАВДАННЯ 3: МІСТ (GRAPHIC EDITOR) ===\n");

    const vector = new VectorRenderer();
    const raster = new RasterRenderer();

    // Малюємо фігури як вектори
    const vectorCircle = new Circle(vector);
    const vectorTriangle = new Triangle(vector);

    // Малюємо фігури як растр
    const rasterSquare = new Square(raster);
    const rasterTriangle = new Triangle(raster);

    console.log("--- Vector Output ---");
    vectorCircle.draw();
    vectorTriangle.draw();

    console.log("\n--- Raster Output ---");
    rasterSquare.draw();
    rasterTriangle.draw();
}

main();