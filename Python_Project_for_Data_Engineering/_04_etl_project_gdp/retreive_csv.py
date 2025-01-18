import urllib.request

exchange_rate_csv = 'https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-PY0221EN-Coursera/labs/v2/exchange_rate.csv'

def get_exchange_rate_csv():
    urllib.request.urlretrieve(exchange_rate_csv, 'exchange_rate.csv')
    
get_exchange_rate_csv()