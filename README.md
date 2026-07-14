# ⚔️ Платформер — Приключение героя

2D браузерная игра в жанре платформер. Проходи уровни, собирай золотые монеты, избегай врагов и попади в Зал Славы!

## 🎮 Геймплей

Игрок управляет отважным героем, который путешествует по опасным уровням. Цель — добраться до финиша, не потеряв все жизни.

### Управление

| Клавиши | Действие |
|---------|----------|
| ← → или A D | Движение влево/вправо |
| ↑ или W или Пробел | Прыжок |

### Механики

- 3 жизни на каждом уровне
- Два типа врагов: скелет (ходит по земле) и демон (летает в воздухе)
- Сбор золотых монет для увеличения счёта
- Финиш — флаг в конце уровня
- Падение за экран — мгновенное поражение
- Временная неуязвимость после получения урона

### Рейтинг

- В зачёт идёт лучший результат с каждого уровня
- При равных очках побеждает тот, кто прошёл больше уровней

## 🛠️ Технологии

**Бэкенд:** Python, Django, Django REST Framework, PostgreSQL, Simple JWT

**Фронтенд:** Vue 3, Quasar Framework, Pinia, Axios, HTML5 Canvas

## 🚀 Запуск проекта

1. Клонируй репозиторий:
```
git clone https://github.com/JopkaMuravya/Leto_2026.git
cd Leto_2026
```

2. Перейди в папку бэкенда, создай виртуальное окружение и установи зависимости:
```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

3. Создай базу данных PostgreSQL с именем `platformer_db`.

4. Создай файл `config/secret.py`:

```python
SECRET_KEY = 'ваш-секретный-ключ'
DEBUG = True
DB_NAME = 'platformer_db'
DB_USER = 'postgres'
DB_PASSWORD = 'ваш-пароль'
DB_HOST = 'localhost'
DB_PORT = '5432'
```
5. Примени миграции и создай суперпользователя:
```
python manage.py migrate
python manage.py createsuperuser
```
6. Запусти сервер:
```
python manage.py runserver
```

Бэкенд: http://localhost:8000
Админка: http://localhost:8000/admin/

7. Открой второй терминал, перейди в папку фронтенда, установи зависимости и запусти:
```
cd frontend
npm install
npm run dev
```
Фронтенд: http://localhost:9000

8. Зайди в админку и добавь уровни. Пример JSON-конфигурации:

```json
{
  "width": 1600,
  "playerStart": { "x": 80, "y": 450 },
  "platforms": [
    { "x": 0, "y": 550, "width": 400, "height": 50 },
    { "x": 500, "y": 480, "width": 150, "height": 20 },
    { "x": 1250, "y": 470, "width": 350, "height": 50 }
  ],
  "enemies": [
    { "type": "walker", "x": 150, "y": 520, "range": 100, "speed": 1.5 }
  ],
  "coins": [
    { "x": 540, "y": 430, "value": 10 },
    { "x": 570, "y": 430, "value": 10 }
  ],
  "finish": { "x": 1400, "y": 420, "width": 50, "height": 50 }
}
```

## 📝 API

| Метод | URL | Назначение |
|-------|-----|------------|
| POST | /api/auth/register/ | Регистрация |
| POST | /api/auth/login/ | Вход |
| POST | /api/auth/refresh/ | Обновить токен |
| GET | /api/users/me/ | Данные пользователя |
| GET | /api/levels/ | Список уровней |
| GET | /api/levels/{id}/ | Конфигурация уровня |
| GET | /api/results/ | История |
| POST | /api/results/ | Сохранить результат |
| GET | /api/results/leaderboard/ | Рейтинг |
