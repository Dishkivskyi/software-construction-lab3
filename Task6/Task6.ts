// 1. Спільний стан (Flyweight)
class ElementType {
    constructor(
        public readonly tagName: string,
        public readonly displayType: string,
        public readonly isSingle: boolean
    ) {}
}

// 2. Фабрика Легковаговиків
class FlyweightFactory {
    private static elementTypes: Map<string, ElementType> = new Map();

    public static getElementType(tagName: string, display: string, single: boolean): ElementType {
        const key = `${tagName}_${display}_${single}`;
        if (!this.elementTypes.has(key)) {
            this.elementTypes.set(key, new ElementType(tagName, display, single));
        }
        return this.elementTypes.get(key)!;
    }
}

// 3. Контекстний об'єкт
class LightElement {
    private readonly type: ElementType;
    private readonly content: string;

    constructor(tagName: string, display: string, single: boolean, content: string) {
        this.type = FlyweightFactory.getElementType(tagName, display, single);
        this.content = content;
    }

    public render(): string {
        // Використовуємо властивості типу, щоб не було варнінгів "Unused"
        const displayInfo = this.type.displayType === "block" ? " (block)" : " (inline)";
        return `<${this.type.tagName}>${this.content}</${this.type.tagName}>${displayInfo}`;
    }
}

function main() {
    console.log("=== ЗАВДАННЯ 6: ЛЕГКОВАГОВИК ===\n");

    const lines = [
        "ACT V",
        "Scene I. Mantua. A Street.",
        "  Enter Romeo.",
        "ESCALUS, Prince of Verona."
    ];

    const htmlElements: LightElement[] = lines.map((line, index) => {
        let tag = "p";
        if (index === 0) tag = "h1";
        else if (line.startsWith(" ")) tag = "blockquote";
        else if (line.length < 30) tag = "h2";

        return new LightElement(tag, "block", false, line.trim());
    });

    htmlElements.forEach(el => console.log(el.render()));
}

main();