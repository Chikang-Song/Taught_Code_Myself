# Object: create an automated system to generate the information so that the same can be executed in every financial quarter to prepare the report.

import os
import requests

# Resources
url = 'https://web.archive.org/web/20230908091635 /https://en.wikipedia.org/wiki/List_of_largest_banks'
exchange_rate_csv = r'exchange_rate.csv'

table_attrs = ['Name', 'MC_USD_Billion']  # for extract only
table_attrs_final = ['Name','MC_USD_Billion','MC_GBP_Billion','MC_EUR_Billion, MC_INR_Billion']
output_csv_path = r'Largest_banks_data.csv'
db_name = 'Banks.db'
table_name = 'Largest_banks'
log_file = 'code_log.txt'

# Preliminaries : install libraries
import requests
from bs4 import BeautifulSoup
import pandas as pd
import sqlite3
import numpy as np
from datetime import datetime

# Task 1: logging
def log_progress(message):
    time_format = '%Y-%m-%d %H:%M:%S'
    now = datetime.now()
    time_stamp = now.strftime(time_format)
    with open(log_file, 'a') as f:
        f.write(time_stamp + ':' + message + "\n")

# Task 2 : Extraction of data
def extract(url, table_attrs):
    # step1: send request
    response = requests.get(url)
    
    # step2: check response status
    if response.status_code != 200:
        log_progress(f"Failed to retrieve data. Status code: {response.status_code}")
        return pd.DataFrame(columns=table_attrs)
    
    # step3: Parse HTML
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # step4: Find the relevant table
    table = soup.find('tbody')
    
    # step5: Extract rows
    rows = table.find_all('tr')[1:]  # skip header
    data_list = []
    
    for row in rows:
        cols = row.find_all('td')
        name = cols[1].text.strip()
        marcap = float(cols[2].text.strip().replace(',',''))
        data_list.append({'Name':name, 'MC_USD_Billion':marcap})
        
    # step 6 : concat
    df = pd.DataFrame(data_list, columns = table_attrs)
    return df
    

# Task 3 : Transform dataframe
def transform(df, csv_path):
    # CSV file and convert the contents to a dictionary so that the contents of the first columns are the keys to the dictionary and the contents of the second column are the corresponding values.
    csv_df = pd.read_csv(csv_path)
    rates = {k:v for k, v in zip(csv_df['Currency'], csv_df['Rate'])}
    # rates = df.set_index('Currency').to_dict()['Rate'] 이게 더 빠름
    df['MC_GBP_Billion'] = df['MC_USD_Billion'].apply(lambda x: round(x * rates['GBP'], 2))
    df['MC_EUR_Billion'] = df['MC_USD_Billion'].apply(lambda x: round(x * rates['EUR'], 2))
    df['MC_INR_Billion'] = df['MC_USD_Billion'].apply(lambda x: round(x * rates['INR'], 2))
    # addigon columns
    return df

# Task 4 : Load to csv
def load_to_csv(df, output_csv_path):
    try:
        df.to_csv(output_csv_path)
        log_progress(f"Complete load the csv: {output_csv_path}")
    except Exception as e:
        log_progress(f"Invalid to load the csv: {e}")
        raise ValueError (f"Invalid to load the csv: {e}")
    

# Task 5 : Load to DB
#conn = sqlite3.connection('Banks.db')
def load_to_db(df, sql_connection, table_name):
    try:
        df.to_sql(table_name, sql_connection, if_exists='replace', index=False)
        log_progress(f"Datafarme was loaded to {table_name} in {db_name}")
    except Exception as e:
        log_progress(f"Failed load to database - {db_name}: {e}")
 
#conn.close()   

def run_query(query_statement, sql_connection):
    print(query_statement)
    output_query = pd.read_sql(query_statement, sql_connection)
    return output_query

def main():
    log_progress("Initiate project.")
    
    log_progress("Initiate  data Extract from url")
    data = extract(url, table_attrs)
    log_progress("Completed data Extract")

    log_progress("Initiate transform dataframe")
    df_t = transform(data, "exchange_rate.csv")
    log_progress("Completed transform dataframe")
    
    load_to_csv(df_t, output_csv_path)

    log_progress("Database initialize")
    conn = sqlite3.connect('Banks.db')
    load_to_db(df_t, conn, table_name)
    log_progress("Completed Database upload")

if __name__ == '__main__':
    main()
    