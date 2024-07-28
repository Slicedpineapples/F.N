from flask import Flask, request, jsonify
from flask_cors import CORS
from service import serviceINPUT, serviceUPDATE, serviceDELETE, serviceOUTPUT
from portfolio import portfolioINPUT, portfolioUPDATE, portfolioDELETE, portfolioOUTPUT

app = Flask(__name__)
CORS(app)

@app.route('/service', methods=['POST'])
def service():
    data = request.get_json()
    if data['operation'] == 'INPUT': # The api with the opration will look like http://localhost:5001/service/INPUT
        serviceINPUT(data['service_Image'], data['service_Title'], data['service_Description'])
    elif data['operation'] == 'UPDATE':
        serviceUPDATE(data['service_ID'], data['service_Title'], data['service_Description'])
    elif data['operation'] == 'DELETE':
        serviceDELETE(data['service_ID'])
    elif data['operation'] == 'OUTPUT':
        return jsonify(serviceOUTPUT())
    return 'Operation successful'

@app.route('/portfolio', methods=['POST'])
def portfolio():
    data = request.get_json()
    if data['operation'] == 'INPUT':
        portfolioINPUT(data['portfolio_Image'], data['portfolio_Title'], data['portfolio_Long_Description'], data['Client'], data['Client_URL'], data['Category'])
    elif data['operation'] == 'UPDATE':
        portfolioUPDATE(data['portfolio_ID'], data['portfolio_Title'], data['portfolio_Long_Description'], data['Client'], data['Client_URL'], data['Category'])
    elif data['operation'] == 'DELETE':
        portfolioDELETE(data['portfolio_ID'])
    elif data['operation'] == 'OUTPUT':
        return jsonify(portfolioOUTPUT())
    return 'Operation successful'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)