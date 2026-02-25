// 1. Базовий інтерфейс героя
interface Hero {
    getDescription(): string;
    getPower(): number;
}

// 2. Конкретні класи героїв (Завдання 2.1)
class Warrior implements Hero {
    getDescription = () => "Воїн";
    getPower = () => 100;
}

class Mage implements Hero {
    getDescription = () => "Маг";
    getPower = () => 80;
}

class Paladin implements Hero {
    getDescription = () => "Паладін";
    getPower = () => 90;
}

// 3. Базовий клас декоратора для інвентаря (Завдання 2.2)
abstract class InventoryDecorator implements Hero {
    constructor(protected hero: Hero) {}

    abstract getDescription(): string;
    abstract getPower(): number;
}

// 4. Конкретні декоратори (Предмети інвентаря)
class Armor extends InventoryDecorator {
    getDescription = () => this.hero.getDescription() + ", в обладунках";
    getPower = () => this.hero.getPower() + 20;
}

class Sword extends InventoryDecorator {
    getDescription = () => this.hero.getDescription() + ", з мечем";
    getPower = () => this.hero.getPower() + 15;
}

class Artifact extends InventoryDecorator {
    getDescription = () => this.hero.getDescription() + ", з магічним артефактом";
    getPower = () => this.hero.getPower() * 1.5; // Збільшує силу в 1.5 рази
}

// 5. Головний метод програми (Завдання 2.4)
function main() {
    console.log("=== ЗАВДАННЯ 2: ДЕКОРАТОР (RPG GAME) ===\n");

    // Створюємо базового воїна
    let warrior: Hero = new Warrior();
    console.log(`Початковий стан: ${warrior.getDescription()} (Сила: ${warrior.getPower()})`);

    // Надягаємо на нього купу всього (Завдання 2.3 - декілька екземплярів одночасно)
    warrior = new Armor(warrior);
    warrior = new Sword(warrior);
    warrior = new Artifact(warrior);

    console.log(`Фінальний стан: ${warrior.getDescription()}`);
    console.log(`Підсумкова сила: ${warrior.getPower()}\n`);

    // Приклад з магом
    let mage: Hero = new Mage();
    mage = new Artifact(mage);
    mage = new Artifact(mage); // Два артефакти!
    console.log(`Маг з двома артефактами: ${mage.getDescription()} (Сила: ${mage.getPower()})`);
}

main();