import urllib.request

url = 'https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-PY0221EN-Coursera/labs/v2/Departments.csv'
file_name = 'Departments.csv'

urllib.request.urlretrieve(url, file_name)