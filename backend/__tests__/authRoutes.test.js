// __tests__/ordersRoutes.test.js
const request = require('supertest');
const express = require('express');
const ordersRoute = require('../routes/orders'); // Путь к вашим маршрутам
const User = require('../database/schemas/User');
const Order = require('../database/schemas/Order');
const Restaurant = require('../database/schemas/Restaurant');

// Мокаем модели
jest.mock('../database/schemas/User');
jest.mock('../database/schemas/Order');
jest.mock('../database/schemas/Restaurant');

const app = express();
app.use(express.json());
app.use(ordersRoute); // Подключаем маршруты

// Мокаем User.findById
User.findById = jest.fn();
Restaurant.findById = jest.fn();
Order.prototype.save = jest.fn();

// Тест для создания заказа
describe('POST /orders/makeOrder', () => {
  it('should return 400 if userId or items are missing', async () => {
    const response = await request(app)
      .post('/orders/makeOrder')
      .send({ items: [] }); // Пустые данные

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('userId and items required');
  });
});

// Тест для получения конкретного заказа
describe('GET /orders/order/:orderId', () => {
  it('should return 500 if orderId is missing', async () => {
    const response = await request(app).get('/orders/order/');

    expect(response.status).toBe(500);  // Ошибка сервера, так как отсутствует orderId
    expect(response.body.message).toBe('Server error');
  });
});
