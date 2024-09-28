#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Sep 15 10:26:02 2024
@author: saahibsinghpanesar
"""
import numpy as np 
import scipy.stats as stats

def call_price(spot,strike,rate,days_ratio,multiplier, d1, d2):
    a = spot*stats.norm.cdf(d1)
    b = np.exp(-rate*days_ratio)*strike*stats.norm.cdf(d2)
    return'{:,.0f}'.format(round(a-b,2)*multiplier)
    
def put_price(spot,strike,rate,days_ratio,multiplier, d1, d2):
    a = strike*np.exp(-rate*days_ratio)*stats.norm.cdf(-d2)
    b = spot*stats.norm.cdf(-d1)
    return'{:,.0f}'.format(round(a-b,2)*multiplier)

def call_delta(d1):
    return round(stats.norm.cdf(d1),2)

def put_delta(d1): 
    return round (stats.norm.cdf(d1) - 1,2)

def call_gamma(spot,days_ratio,volatility,d1):
    N_tag_d1 = (np.exp(-0.5*d1**2)) / (np.sqrt(2*np.pi))
    return round(N_tag_d1 / (spot * volatility * np.sqrt(days_ratio)),2)

def put_gamma(spot,days_ratio,volatility, d1):
    return round(call_gamma(spot,days_ratio,volatility, d1),2)

def call_vega(spot,days_ratio,volatility,d1): 
    return round(np.sqrt((days_ratio)/(2*np.pi))*(spot*np.exp(-0.5*(d1)**2)))

def put_vega(spot,days_ratio,volatility,d1):
    return round(call_vega(spot,days_ratio,volatility,d1,),2)

def call_theta(spot,strike,rate,days_ratio,volatility,d1, d2):
    first_term = -(strike * np.exp(-rate * days_ratio) * rate * stats.norm.cdf(d2))
    second_term = -(spot * volatility * np.exp(-0.5 * (d1) ** 2)) / np.sqrt(8 * np.pi * days_ratio)
    return round(first_term + second_term,2)
    
def put_theta(strike,rate,days_ratio,volatility,d2):
    first_term = -(strike * np.exp(-rate * days_ratio) * rate * stats.norm.cdf(d2))
    second_term = -(strike * np.exp(-rate * days_ratio)) * (volatility * np.exp(-0.5 * (d2) ** 2)) / np.sqrt(8 * np.pi * days_ratio)
    third_term = rate * strike * np.exp(-rate * days_ratio)
    return round(first_term + second_term + third_term,2)

def call_rho(strike,rate,days_ratio, d2):
    return round(strike*days_ratio*np.exp(-rate*days_ratio)*stats.norm.cdf(d2),2)

def put_rho(strike,rate,days_ratio,d2):
    return round(strike*days_ratio*np.exp(-rate*days_ratio)*stats.norm.cdf(-d2),2)