import pandas as pd
import xml.etree.ElementTree as ET
import glob
from datetime import datetime

# Extract
def extract_from_csv(csv_file):
    return pd.read_csv(csv_file)

def extract_from_json(json_file):
    return pd.read_json(json_file, lines=True)

def extract_from_xml(xml_file):
    df = pd.DataFrame(columns = ['car_model','year_of_manufacture','price','fuel'])
    tree = ET.parse(xml_file)
    root = tree.getroot()
    for car in root:
        model = car.find("car_model").text
        year = int(car.find("year_of_manufacture").text)
        price = float(car.find("price").text)
        fuel = car.find("fuel").text
        df = pd.concat([df, pd.DataFrame([{'car_model':model,
                                           'year_of_manufacture':year,
                                           'price':price,
                                           'fuel':fuel
                                           }])], ignore_index=True)
    return df
    
def extract():
    extracted_data = pd.DataFrame(columns = ['car_model','year_of_manufacture','price','fuel'])
    
    for csv in glob.glob('*.csv'):
        extracted_data = pd.concat([extracted_data, extract_from_csv(csv)], ignore_index=True)
        
    for json in glob.glob('*.json'):
        extracted_data = pd.concat([extracted_data, extract_from_json(json)], ignore_index=True)
        
    for xml in glob.glob('*.xml'):
        extracted_data = pd.concat([extracted_data, extract_from_xml(xml)], ignore_index=True)
        
    return extracted_data
   
# Transform
def transform_price(data):
    data['price'] = round(data['price'], 2)
    return data

# Load
def load_data(extracted_data):
    extracted_data.to_csv("etl_results.csv", index=False)

# Log
def log_process(message):
    timestamp_format = '%Y-%b-%d %H:%M:%S'
    now = datetime.now()
    timestamp = now.strftime(timestamp_format)
    with open("log_file.txt", 'a') as f:
        f.write(timestamp + "," + message + "\n")
        
# Execute
if __name__ == '__main__':
    log_process("Start - ETL process.")
    
    log_process("Initiate data extraction.")
    data = extract()
    log_process("Completed - data Extract.")
    
    log_process("Initiate - Transformation")
    transformed_data = transform_price(data)
    log_process("Completed - data Transformed.")
    
    log_process("Initiate - Load")
    load_data(transformed_data)
    log_process("Completed - Load")
    
    log_process("Completed - ETL process")
    
    