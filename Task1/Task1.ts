// 1. Клас Logger (Консольний вивід)
class Logger {
    public log(message: string): void {
        console.log(`\x1b[32m%s\x1b[0m`, `[LOG]: ${message}`); // Зелений
    }

    public error(message: string): void {
        console.log(`\x1b[31m%s\x1b[0m`, `[ERROR]: ${message}`); // Червоний
    }

    public warn(message: string): void {
        console.log(`\x1b[33m%s\x1b[0m`, `[WARN]: ${message}`); // Оранжевий
    }
}

// 2. Клас FileWriter (Цільовий клас для адаптації)
class FileWriter {
    public write(text: string): void {
        console.log(`FileWriter: Writing to file... "${text}"`);
    }

    public writeLine(text: string): void {
        console.log(`FileWriter: Writing line to file... "${text}"`);
    }
}

// 3. Адаптер (FileLoggerAdapter)
class FileLoggerAdapter extends Logger {
    constructor(private fileWriter: FileWriter) {
        super();
    }

    public log(message: string): void {
        this.fileWriter.writeLine(`LOG: ${message}`);
    }

    public error(message: string): void {
        this.fileWriter.writeLine(`ERROR: ${message}`);
    }

    public warn(message: string): void {
        this.fileWriter.writeLine(`WARN: ${message}`);
    }
}

// 4. Головний метод [cite: 13, 14]
function main() {
    console.log("=== ЗАВДАННЯ 1: АДАПТЕР ===\n");

    const consoleLogger = new Logger();
    consoleLogger.log("Це звичайне повідомлення");
    consoleLogger.warn("Це попередження");
    consoleLogger.error("Це помилка");

    console.log("\nВикористання адаптера для файлів:");
    const fileWriter = new FileWriter();
    const fileLogger = new FileLoggerAdapter(fileWriter);

    fileLogger.log("Повідомлення зафіксовано в адаптері");
    fileLogger.error("Критична помилка в адаптері");
}

main();