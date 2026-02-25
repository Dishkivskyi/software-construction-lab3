// 1. Інтерфейс (Завдання 4.1)
interface ITextReader {
    readText(filePath: string): string[][] | null;
}

// 2. Реальний зчитувач (Завдання 4.1)
class SmartTextReader implements ITextReader {
    public readText(filePath: string): string[][] {
        console.log(`[SmartTextReader]: Відкриття та читання файлу: ${filePath}`);
        const content = "Рядок один\nРядок два\nКінець файлу";
        return content.split('\n').map(line => line.split(''));
    }
}

// 3. Проксі з логуванням (Завдання 4.2)
class SmartTextChecker implements ITextReader {
    private reader: SmartTextReader; // Оголошуємо явно

    constructor(reader: SmartTextReader) {
        this.reader = reader; // Призначаємо явно
    }

    public readText(filePath: string): string[][] | null {
        console.log(`[Checker]: Спроба відкрити файл: ${filePath}`);
        const result = this.reader.readText(filePath);

        if (result) {
            const totalLines = result.length;
            const totalChars = result.reduce((acc, line) => acc + line.length, 0);
            console.log(`[Checker]: Файл успішно прочитано.`);
            console.log(`[Stats]: Рядків: ${totalLines}, Символів: ${totalChars}`);
            console.log(`[Checker]: Закриття файлу: ${filePath}`);
        }
        return result;
    }
}

// 4. Проксі з обмеженням доступу (Завдання 4.3)
class SmartTextReaderLocker implements ITextReader {
    private reader: ITextReader;
    private pattern: RegExp;

    constructor(reader: ITextReader, pattern: RegExp) {
        this.reader = reader;
        this.pattern = pattern;
    }

    public readText(filePath: string): string[][] | null {
        if (this.pattern.test(filePath)) {
            console.log(`[Locker]: Access denied! Доступ до "${filePath}" обмежено.`); // Завдання 4.3.5
            return null;
        }
        return this.reader.readText(filePath);
    }
}

// 5. Головний метод (Завдання 4.4)
function main() {
    console.log("=== ЗАВДАННЯ 4: ПРОКСІ ===\n");

    const realReader = new SmartTextReader();
    const checkerProxy = new SmartTextChecker(realReader);

    const restrictedPattern = /.*\.conf$/;
    const lockerProxy = new SmartTextReaderLocker(checkerProxy, restrictedPattern);

    console.log("--- Спроба 1: Звичайний файл ---");
    lockerProxy.readText("my_story.txt");

    console.log("\n--- Спроба 2: Захищений файл ---");
    lockerProxy.readText("database.conf");
}

main();