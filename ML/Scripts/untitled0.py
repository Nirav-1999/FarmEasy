#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Oct  5 23:48:13 2019

@author: nirav
"""
import pickle

with open("./data/model","rb") as f:
    model = pickle.load(f)