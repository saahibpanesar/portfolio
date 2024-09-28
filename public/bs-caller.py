import numpy as np 
import bs_functional
from flask import Flask, request, jsonify 

import sys

app = Flask(__name__)

def main():
    if len(sys.argv) < 7:
        print("usage:python bs-caller.py spot strike rate days volatility multiplier")
        return
    spot = sys.argv[1]
    strike = sys.argv[2]
    rate = sys.argv[3]
    days = sys.argv[4]
    volatility = sys.argv[5]
    multiplier = sys.argv[6]
    
    days_ratio = int(days) / 365
    d1 = (np.log(float(spot)/float(strike))+(float(rate)+0.5*float(volatility)**2)*days_ratio)/(float(volatility)*np.sqrt(days_ratio))
    d2 = d1 - float(volatility)*np.sqrt(days_ratio)
    
    callPrice = bs_functional.call_price(float(spot), float(strike), float(rate), days_ratio, int(multiplier), d1, d2)
    
    putPrice = bs_functional.put_price(float(spot), float(strike), float(rate), days_ratio, int(multiplier), d1, d2)
    
    callDelta = bs_functional.call_delta(d1)
    
    putDelta = bs_functional.put_delta(d1)
    
    callGamma = bs_functional.call_gamma(float(spot),days_ratio,float(volatility), d1)
    
    putGamma = bs_functional.put_gamma(float(spot),days_ratio,float(volatility), d1)
    
    callVega = bs_functional.call_vega(float(spot),days_ratio,volatility,d1)
    
    putVega = bs_functional.put_vega(float(spot),days_ratio,float(volatility),d1)
    
    callTheta = bs_functional.call_theta(float(spot),float(strike),float(rate),days_ratio,float(volatility), d1, d2)
    
    putTheta = bs_functional.put_theta(float(strike),float(rate),days_ratio,float(volatility), d2)
    
    callRho = bs_functional.call_rho(float(strike),float(rate),days_ratio,d2)
    
    putRho = bs_functional.put_rho(float(strike),float(rate),days_ratio,d2)    
    
    return jsonify({
        'callPrice': callPrice,
        'putPrice': putPrice,
        'callDelta': callDelta,
        'putDelta': putDelta,
        'callGamma': callGamma,
        'putGamma': putGamma,
        'callVega': callVega,
        'putVega': putVega,
        'callTheta': callTheta,
        'putTheta': putTheta,
        'callRho': callRho,
        'putRho': putRho})
    

if __name__ == "__main__":
    app.run(debug=True)
    result = main()
    if result:
        for key, value in result.items():
            print(f"{key}: {value}")