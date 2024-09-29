// Part 1: Black-Scholes Functions
function normCDF(x) {
const T =  
        1 / (1 + 0.2316419 * Math.abs(x)); 
    const D =  
        0.3989423 * Math.exp(-x * x / 2); 
    const cd =  
        D * T * (0.3193815 + T * (-0.3565638 + T * 
            (1.781478 + T * (-1.821256 + T * 1.330274)))); 
    if (x > 0) return 1 - cd; 
    return cd; 
}

function callPrice(spot, strike, rate, daysRatio, multiplier, d1, d2) {
    const a = spot * normCDF(d1);
    const b = Math.exp(-rate * daysRatio) * strike * normCDF(d2);
    return ((a - b) * multiplier).toFixed(2);
}

function putPrice(spot, strike, rate, daysRatio, multiplier, d1, d2) {
    const a = strike * Math.exp(-rate * daysRatio) * normCDF(-d2);
    const b = spot * normCDF(-d1);
    return ((a - b) * multiplier).toFixed(2);
}

function callDelta(d1) {
    return Math.round(normCDF(d1) * 100) / 100;
}

function putDelta(d1) {
    return Math.round((normCDF(d1) - 1) * 100) / 100;
}

function callGamma(spot, daysRatio, volatility, d1) {
    const N_tag_d1 = (Math.exp(-0.5 * Math.pow(d1, 2))) / (Math.sqrt(2 * Math.PI));
    return Math.round((N_tag_d1 / (spot * volatility * Math.sqrt(daysRatio))) * 100) / 100;
}

function putGamma(spot, daysRatio, volatility, d1) {
    return callGamma(spot, daysRatio, volatility, d1);
}

function callVega(spot, daysRatio, volatility, d1) {
    return Math.round(Math.sqrt(daysRatio / (2 * Math.PI)) * (spot * Math.exp(-0.5 * Math.pow(d1, 2))));
}

function putVega(spot, daysRatio, volatility, d1) {
    return callVega(spot, daysRatio, volatility, d1);
}

function callTheta(spot, strike, rate, daysRatio, volatility, d1, d2) {
    const firstTerm = -(strike * Math.exp(-rate * daysRatio) * rate * normCDF(d2));
    const secondTerm = -(spot * volatility * Math.exp(-0.5 * Math.pow(d1, 2))) / Math.sqrt(8 * Math.PI * daysRatio);
    return Math.round((firstTerm + secondTerm) * 100) / 100;
}

function putTheta(strike, rate, daysRatio, volatility, d2) {
    const firstTerm = -(strike * Math.exp(-rate * daysRatio) * rate * normCDF(d2));
    const secondTerm = -(strike * Math.exp(-rate * daysRatio)) * (volatility * Math.exp(-0.5 * Math.pow(d2, 2))) / Math.sqrt(8 * Math.PI * daysRatio);
    const thirdTerm = rate * strike * Math.exp(-rate * daysRatio);
    return Math.round((firstTerm + secondTerm + thirdTerm) * 100) / 100;
}

function callRho(strike, rate, daysRatio, d2) {
    return Math.round((strike * daysRatio * Math.exp(-rate * daysRatio) * normCDF(d2)) * 100) / 100;
}

function putRho(strike, rate, daysRatio, d2) {
    return Math.round((strike * daysRatio * Math.exp(-rate * daysRatio) * normCDF(-d2)) * 100) / 100;
}

module.exports = function calculate(spot, strike, rate, days, volatility, multiplier) {
    const daysRatio = parseInt(days) / 365;
    const d1 = (Math.log(parseFloat(spot) / parseFloat(strike)) + (parseFloat(rate) + 0.5 * Math.pow(parseFloat(volatility), 2)) * daysRatio) / (parseFloat(volatility) * Math.sqrt(daysRatio));
    const d2 = d1 - parseFloat(volatility) * Math.sqrt(daysRatio);

    const results = {
        callPrice: callPrice(parseFloat(spot), parseFloat(strike), parseFloat(rate), daysRatio, parseInt(multiplier), d1, d2),
        putPrice: putPrice(parseFloat(spot), parseFloat(strike), parseFloat(rate), daysRatio, parseInt(multiplier), d1, d2),
        callDelta: callDelta(d1),
        putDelta: putDelta(d1),
        callGamma: callGamma(parseFloat(spot), daysRatio, parseFloat(volatility), d1),
        putGamma: putGamma(parseFloat(spot), daysRatio, parseFloat(volatility), d1),
        callVega: callVega(parseFloat(spot), daysRatio, parseFloat(volatility), d1),
        putVega: putVega(parseFloat(spot), daysRatio, parseFloat(volatility), d1),
        callTheta: callTheta(parseFloat(spot), parseFloat(strike), parseFloat(rate), daysRatio, parseFloat(volatility), d1, d2),
        putTheta: putTheta(parseFloat(strike), parseFloat(rate), daysRatio, parseFloat(volatility), d2),
        callRho: callRho(parseFloat(strike), parseFloat(rate), daysRatio, d2),
        putRho: putRho(parseFloat(strike), parseFloat(rate), daysRatio, d2)
    };
    return (results);
}