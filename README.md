# FoodBlog
 MyWebApp - .NET Web API + React Project

Food Blog — это веб-приложение, которое позволяет администраторам создавать, редактировать и удалять рецепты, а пользователям — просматривать рецепты, добавлять их в избранное и писать комментарии. Проект разработан с использованием .NET Web API для бэкенда и React TypeScript для фронтенда.

## Главная страница
![Снимок экрана 2024-12-12 223621](https://github.com/user-attachments/assets/97806eb2-190e-4194-ab4f-4e0e2868fc64)

## Страница с рецептами
![Снимок экрана 2024-12-12 223631](https://github.com/user-attachments/assets/746e904b-b558-4110-8fdc-279cf6a190be)

## Endpoints
[Swagger UI.pdf](https://github.com/user-attachments/files/18116671/Swagger.UI.pdf)

## Функциональные возможности

### Для администраторов:
- Создание новых рецептов
- Редактирование существующих рецептов
- Удаление рецептов

### Для пользователей:
- Просмотр рецептов
- Добавление рецептов в избранное
- Написание комментариев к рецептам

## Технологии

### Backend:
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- JWT для аутентификации

### Frontend:
- React
- TypeScript
- Axios для HTTP-запросов

### База данных:
- SQLite

## Установка и запуск

### Backend:
1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/Bormitus/FoodBlog.git
   ```
2. Перейдите в директорию проекта:
   ```sh
   cd api
   ```
3. Установите необходимые пакеты:
   ```sh
   dotnet restore
   ```
4. Запустите приложение:
   ```sh
   dotnet run
   ```

### Frontend:
1. Перейдите в директорию проекта:
   ```sh
   cd frontend
   ```
2. Установите необходимые пакеты:
   ```sh
   npm install
   ```
3. Запустите приложение:
   ```sh
   npm start
   ```

