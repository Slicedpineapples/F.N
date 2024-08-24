from flask import Flask, request, jsonify
from flask_cors import CORS
from service import serviceINPUT, serviceUPDATE, serviceDELETE, serviceOUTPUT
from portfolio import portfolioINPUT, portfolioUPDATE, portfolioDELETE, portfolioOUTPUT
from about import aboutINPUT, aboutUPDATE, aboutDELETE, aboutOUTPUT
from login import login, signUp
from profile import profileINPUT, profileUPDATE, profileDELETE, profileOUTPUT
from seeder import seed


app = Flask(__name__)
CORS(app)
#Seed the database
print('API is running')
#seed()

@app.route('/service', methods=['POST'])
def service():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    operation = data.get('operation')
    if not operation:
        return jsonify({'error': 'Operation not specified'}), 400

    if operation == 'INPUT':
        required_fields = ['service_Image', 'service_Title', 'service_Description']
        if all(field in data for field in required_fields):
            result = serviceINPUT(data['service_Image'], data['service_Title'], data['service_Description'])
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    elif operation == 'UPDATE':
        required_fields = ['service_ID', 'service_Title', 'service_Description']
        if all(field in data for field in required_fields):
            serviceUPDATE(data['service_ID'], data['service_Title'], data['service_Description'])
            return jsonify({'status': 'Service updated successfully'}), 200
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    elif operation == 'DELETE':
        if 'service_ID' in data:
            serviceDELETE(data['service_ID'])
            return jsonify({'status': 'Service deleted successfully'}), 200
        else:
            return jsonify({'error': 'Service ID not provided'}), 400

    elif operation == 'OUTPUT':
        result = serviceOUTPUT()
        return jsonify(result), 200

    return jsonify({'error': 'Invalid operation'}), 400

@app.route('/portfolio', methods=['POST'])
def portfolio():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    operation = data.get('operation')
    if not operation:
        return jsonify({'error': 'Operation not specified'}), 400

    if operation == 'INPUT':
        required_fields = ['portfolio_Image', 'portfolio_Title', 'portfolio_Long_Description', 'Client', 'Client_URL', 'Category']
        if all(field in data for field in required_fields):
            result = portfolioINPUT(data['portfolio_Image'], data['portfolio_Title'], data['portfolio_Long_Description'], data['Client'], data['Client_URL'], data['Category'])
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    elif operation == 'UPDATE':
        required_fields = ['portfolio_ID', 'portfolio_Title', 'portfolio_Long_Description', 'Client', 'Client_URL', 'Category']
        if all(field in data for field in required_fields):
            portfolioUPDATE(data['portfolio_ID'], data['portfolio_Title'], data['portfolio_Long_Description'], data['Client'], data['Client_URL'], data['Category'])
            return jsonify({'status': 'Portfolio updated successfully'}), 200
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    elif operation == 'DELETE':
        if 'portfolio_ID' in data:
            portfolioDELETE(data['portfolio_ID'])
            return jsonify({'status': 'Portfolio deleted successfully'}), 200
        else:
            return jsonify({'error': 'Portfolio ID not provided'}), 400

    elif operation == 'OUTPUT':
        result = portfolioOUTPUT()
        return jsonify(result), 200

    return jsonify({'error': 'Invalid operation'}), 400

@app.route('/about', methods=['POST'])
def about():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    operation = data.get('operation')
    if not operation:
        return jsonify({'error': 'Operation not specified'}), 400

    if operation == 'INPUT':
        required_fields = ['about_Year', 'about_Title', 'about_Description', 'about_Image']
        if all(field in data for field in required_fields):
            result = aboutINPUT(data['about_Year'], data['about_Title'], data['about_Description'], data['about_Image'])
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    elif operation == 'UPDATE':
        required_fields = ['about_ID', 'about_Year', 'about_Title', 'about_Description', 'about_Image']
        if all(field in data for field in required_fields):
            aboutUPDATE(data['about_ID'], data['about_Year'], data['about_Title'], data['about_Description'], data['about_Image'])
            return jsonify({'status': 'About section updated successfully'}), 200
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    elif operation == 'DELETE':
        if 'about_ID' in data:
            aboutDELETE(data['about_ID'])
            return jsonify({'status': 'About section deleted successfully'}), 200
        else:
            return jsonify({'error': 'About ID not provided'}), 400

    elif operation == 'OUTPUT':
        result = aboutOUTPUT()
        return jsonify(result), 200

    return jsonify({'error': 'Invalid operation'}), 400

@app.route('/login', methods=['POST'])
def loginApi():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    operation = data.get('operation')
    if not operation:
        return jsonify({'error': 'Operation not specified'}), 400

    if operation == 'SIGNUP':
        required_fields = ['username', 'password']
        if all(field in data for field in required_fields):
            result = signUp(data['username'], data['password'])
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    elif operation == 'LOGIN':
        required_fields = ['username', 'password']
        if all(field in data for field in required_fields):
            result = login(data['username'], data['password'])
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    return jsonify({'error': 'Invalid operation'}), 400

    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    required_fields = ['username', 'password']
    if all(field in data for field in required_fields):
        result = signUp(data['username'], data['password'])
        return jsonify(result), 200
    else:
        return jsonify({'error': 'Missing required fields'}), 400

@app.route('/profile', methods=['POST'])
def profile():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    operation = data.get('operation')
    if not operation:
        return jsonify({'error': 'Operation not specified'}), 400

    if operation == 'INPUT':
        required_fields = ['profile_Intro1', 'profile_Intro2', 'profile_Continua']
        if all(field in data for field in required_fields):
            result = profileINPUT(data['profile_Intro1'], data['profile_Intro2'], data['profile_Continua'])
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    elif operation == 'UPDATE':
        required_fields = ['profile_ID', 'profile_Intro1', 'profile_Intro2', 'profile_Continua']
        if all(field in data for field in required_fields):
            profileUPDATE(data['profile_ID'], data['profile_Intro1'], data['profile_Intro2'], data['profile_Continua'])
            return jsonify({'status': 'Profile updated successfully'}), 200
        else:
            return jsonify({'error': 'Missing required fields'}), 400

    elif operation == 'DELETE':
        if 'profile_ID' in data:
            # print(data['profile_ID'])
            profileDELETE(data['profile_ID'])
            return jsonify({'status': 'Profile deleted successfully'}), 200
        else:
            return jsonify({'error': 'Profile ID not provided'}), 400

    elif operation == 'OUTPUT':
        result = profileOUTPUT()
        return jsonify(result), 200

    return jsonify({'error': 'Invalid operation'}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
