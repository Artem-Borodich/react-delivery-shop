const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Настройка формата логов
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// Создание логгера
const logger = createLogger({
  level: 'info', // Уровень логирования: можно настроить на debug, error и т.д.
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Добавляем временную метку
    logFormat // Применяем наш формат логов
  ),
  transports: [
    new transports.Console(), // Логи выводятся в консоль
    new transports.File({ filename: 'logs/server.log' }) // Логи сохраняются в файл
  ]
});

module.exports = logger;
