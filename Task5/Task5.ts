// 1. Базовий клас (Завдання 5.41)
abstract class LightNode {
    abstract outerHTML(): string;
    abstract innerHTML(): string;
}

// 2. Текстовий вузол (Завдання 5.43, 5.44)
class LightTextNode extends LightNode {
    private text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }

    public outerHTML(): string { return this.text; }
    public innerHTML(): string { return this.text; }
}

// 3. Елемент розмітки (Завдання 5.42, 5.45, 5.46)
class LightElementNode extends LightNode {
    private children: LightNode[] = [];
    private tagName: string;
    private displayType: string;
    private isSingle: boolean;
    private cssClasses: string[];

    constructor(tagName: string, displayType: string, isSingle: boolean, cssClasses: string[] = []) {
        super();
        this.tagName = tagName;
        this.displayType = displayType;
        this.isSingle = isSingle;
        this.cssClasses = cssClasses;
    }

    // Додавання дочірніх елементів (Завдання 5.45)
    public addChild(node: LightNode): void {
        this.children.push(node);
    }

    public innerHTML(): string {
        return this.children.map(child => child.outerHTML()).join("");
    }

    public outerHTML(): string {
        const classes = this.cssClasses.length > 0 ? ` class="${this.cssClasses.join(" ")}"` : "";

        if (this.isSingle) {
            return `<${this.tagName}${classes}/>`; // Одиничний тег (Завдання 5.46)
        }

        return `<${this.tagName}${classes}>${this.innerHTML()}</${this.tagName}>`;
    }
}

// 4. Головний метод (Завдання 5.47, 5.49)
function main() {
    console.log("=== ЗАВДАННЯ 5: КОМПОНУВАЛЬНИК (LightHTML) ===\n");

    // Створюємо елемент сторінки - наприклад, список справ (Завдання 5.47)
    const section = new LightElementNode("section", "block", false, ["container"]);
    const h2 = new LightElementNode("h2", "block", false);
    h2.addChild(new LightTextNode("Мій список покупок"));

    const ul = new LightElementNode("ul", "block", false, ["list-group"]);

    const li1 = new LightElementNode("li", "block", false);
    li1.addChild(new LightTextNode("Хліб"));

    const li2 = new LightElementNode("li", "block", false);
    li2.addChild(new LightTextNode("Молоко"));

    ul.addChild(li1);
    ul.addChild(li2);
    section.addChild(h2);
    section.addChild(ul);

    console.log("Згенерований outerHTML:");
    console.log(section.outerHTML());
}

main();