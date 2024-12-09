from flask import Flask, request, jsonify
from flask_cors import CORS  
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

API_KEY = '961714040c67b450f0df895f1d5fb599' 
@app.route('/ciudad')
def ciudad():
    nombre = request.args.get('nombre')

    if not nombre:
        return jsonify({'error': 'Falta el parámetro "nombre"'}), 400

    try:
        url = f'https://api.openweathermap.org/data/2.5/weather?q={nombre}&appid={API_KEY}&units=metric&lang=es'
        response = requests.get(url)
        response.raise_for_status()  

        data = response.json()

        datos_ciudad = {
            'lat': data['coord']['lat'],
            'lon': data['coord']['lon']
        }

        return jsonify(datos_ciudad)

    except requests.exceptions.RequestException as e:
        print(f'Error en la petición a la API: {e}')
        return jsonify({'error': 'Error al obtener datos de la ciudad'}), 500

@app.route('/clima')
def clima():
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    if not lat or not lon:
        return jsonify({'error': 'Faltan los parámetros "lat" y "lon"'}), 400

    try:
        url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric&lang=es'
        response = requests.get(url)
        response.raise_for_status()  
        data = response.json()

        datos_clima = {
            'ciudad': data.get('name', 'Ubicación desconocida'),
            'temperatura': data['main']['temp'],
            'sensacionTermica': data['main']['feels_like'],
            'descripcion': data['weather'][0]['description'],
            'icono': data['weather'][0]['icon'],
            'humedad': data['main']['humidity'],
            'viento': data['wind']['speed']
        }

        return jsonify(datos_clima)

    except requests.exceptions.RequestException as e:
        print(f'Error en la petición a la API: {e}')
        return jsonify({'error': 'Error al obtener datos del clima'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5003)