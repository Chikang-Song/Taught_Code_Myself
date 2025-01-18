import pandas as pd
from datetime import datetime
import xml.etree.ElementTree as ET
import glob

target_file = 'transformed_data.csv'
log_file_path = 'log_file.txt'

## Extract
def extract_from_csv(file_to_process):
    dataframe = pd.read_csv(file_to_process)
    return dataframe

def extract_from_json(file_to_process):
    dataframe = pd.read_json(file_to_process, lines=True)
    return dataframe

def extract_from_xml(file_to_process):
    dataframe = pd.DataFrame(columns = ['name','height','weight'])
    tree = ET.parse(file_to_process)
    root = tree.getroot()
    
    for person in root:
        name = person.find("name").text
        height = float(person.find("height").text)
        weight = float(person.find("weight").text)
        dataframe = pd.concat([dataframe, pd.DataFrame([{'name':name,'height':height,'weight':weight}])], ignore_index=True)
        
    return dataframe

def extract():
    extracted_data = pd.DataFrame(columns = ['name','height','weight'])
    
    for csv_file in glob.glob('*.csv'):
        extracted_data = pd.concat([extracted_data, extract_from_csv(csv_file)], ignore_index=True)
        
    for json_file in glob.glob('*.json'):
        extracted_data = pd.concat([extracted_data, extract_from_json(json_file)], ignore_index=True)
        
    for xml_file in glob.glob('*.xml'):
        extracted_data = pd.concat([extracted_data, extract_from_xml(xml_file)], ignore_index=True)
        
    return extracted_data

## Transformation
def transform(data):
    data['height'] = round(data['height'] * 0.0254 , 2)
    data['weight'] = round(data['weight'] * 0.45359237, 2)
    return data

# Load
def load_data(target_file, transformed_data):
    transformed_data.to_csv(target_file, index=False)
    
# Logging
def log_progress(message):
    timestamp_format = '%Y-%b-%d %H:%M:%S'
    now = datetime.now()
    timestamp = now.strftime(timestamp_format)
    
    with open(log_file_path, 'a') as f:
        f.write(timestamp + ',' + message + '\n')
        
        
## Execution
# Log the initialization of the ETL process 
log_progress("ETL Job Started") 
 
# Log the beginning of the Extraction process 
log_progress("Extract phase Started") 
extracted_data = extract() 
 
# Log the completion of the Extraction process 
log_progress("Extract phase Ended") 
 
# Log the beginning of the Transformation process 
log_progress("Transform phase Started") 
transformed_data = transform(extracted_data) 
print("Transformed Data") 
print(transformed_data) 
 
# Log the completion of the Transformation process 
log_progress("Transform phase Ended") 
 
# Log the beginning of the Loading process 
log_progress("Load phase Started") 
load_data(target_file,transformed_data) 
 
# Log the completion of the Loading process 
log_progress("Load phase Ended") 
 
# Log the completion of the ETL process 
log_progress("ETL Job Ended") 