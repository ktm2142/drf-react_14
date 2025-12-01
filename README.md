# 🛍️ DRF + React Store API

### API Base URL
`/api/v1/`

---

## 🔐 Authentication
- JWT via `rest_framework_simplejwt`
- Access token lifetime is 5 hours

**Endpoints:**
- `POST /api/v1/auth/token/obtain/`
- `POST /api/v1/auth/token/refresh/`
- `POST /api/v1/auth/registration/`
- `GET/PATCH /api/v1/auth/user_profile/` *(authenticated)*

**Examples:**
```bash
# Register
curl -X POST http://localhost:8000/api/v1/auth/registration/ -H "Content-Type: application/json" -d '{"username":"john","password":"pass1234","password_2":"pass1234"}'

# Obtain tokens
curl -X POST http://localhost:8000/api/v1/auth/token/obtain/ -H "Content-Type: application/json" -d '{"username":"john","password":"pass1234"}'

# Get profile
curl http://localhost:8000/api/v1/auth/user_profile/ -H "Authorization: Bearer <ACCESS_TOKEN>"

# Update profile
curl -X PATCH http://localhost:8000/api/v1/auth/user_profile/ -H "Authorization: Bearer <ACCESS_TOKEN>" -H "Content-Type: application/json" -d '{"first_name":"John","city":"Kyiv"}'
```

---

## 🏬 Shop

**Endpoints:**
- `GET /api/v1/shop/categories/`
- `GET /api/v1/shop/category/<id>/`
- `GET /api/v1/shop/product/<id>/`
- `GET /api/v1/shop/search_filter/?category=<id>&search=<text>`

**Examples:**
```bash
curl http://localhost:8000/api/v1/shop/categories/
curl http://localhost:8000/api/v1/shop/category/1/
curl http://localhost:8000/api/v1/shop/product/1/
curl "http://localhost:8000/api/v1/shop/search_filter/?category=1&search=phone"
```

---

## 📦 Orders (JWT required)

**Endpoints:**
- `GET /api/v1/order/retrieve/` — current user's draft order  
- `POST /api/v1/order/add_item/` — body: `{ "product_id": <id>, "quantity": <1..50> }`  
- `PATCH /api/v1/order/update_delete/<order_item_id>/` — update quantity  
- `DELETE /api/v1/order/update_delete/<order_item_id>/` — remove item  
- `PATCH /api/v1/order/submit/` — submit draft order  
- `DELETE /api/v1/order/delete/` — delete draft  
- `GET /api/v1/order/history/` — previous orders  

**Examples:**
```bash
# Add item
curl -X POST http://localhost:8000/api/v1/order/add_item/ -H "Authorization: Bearer <ACCESS_TOKEN>" -H "Content-Type: application/json" -d '{"product_id": 1, "quantity": 2}'

# Retrieve draft order
curl http://localhost:8000/api/v1/order/retrieve/ -H "Authorization: Bearer <ACCESS_TOKEN>"

# Submit order
curl -X PATCH http://localhost:8000/api/v1/order/submit/ -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 🧩 Data Models (simplified)
- **User:** username, first_name, last_name, phone_number, city, address  
- **Category:** name  
- **Product:** name, category, price, description  
- **Order:** user, status (draft|pending|completed), total, timestamps  
- **OrderItem:** order, product, quantity, total_price  

---

## ⚙️ Backend Setup

**Prerequisites:**
- Python 3.12+
- PostgreSQL 14+

**Installation:**
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Configure DB:**
Edit `store_project_14/config_app/settings.py`
```python
DATABASES = {
    'default': {
        'NAME': 'drf_react_14_db',
        'USER': 'postgres',
        'PASSWORD': '<your_password>',
        'HOST': '127.0.0.1',
        'PORT': 5432,
    }
}
```

**Migrate & Run:**
```bash
cd store_project_14
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**CORS allowed origins:**
- `http://localhost:5173`
- `http://localhost:5174`

---

## 🖥️ Frontend (optional)
```bash
cd store_project_14/frontend
npm install
npm run dev
```
Dev server: `http://localhost:5173`

---

## 🔒 Environment & Security
- `SECRET_KEY` and DB credentials are hardcoded for learning only.  
- In production: move secrets to `.env`, disable DEBUG.

---

## 🔎 Pagination & Filtering
- Default pagination size: **4**
- `/api/v1/shop/search_filter/?category=<id>&search=<text>`

---

## 📄 License
Learning project — no specific license.
