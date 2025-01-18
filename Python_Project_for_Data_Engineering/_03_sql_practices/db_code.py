import sqlite3
import pandas as pd

db_path = r'D:\myRepo\Python_Project_for_Data_Engineering\_03_sql_practices\STAFF.db'

with sqlite3.connect(db_path) as conn:
    table_name = 'Departments'
    attributes = ['DEPT_ID', 'DEP_NAME', 'MANAGER_ID', 'LOC_ID']
    
    # Read csv
    csv_path = r'D:\myRepo\Python_Project_for_Data_Engineering\_03_sql_practices\Departments.csv'
    df = pd.read_csv(csv_path, names = attributes)
    
    # Load to database
    df.to_sql(table_name, conn, if_exists='replace', index=False)
    print("Load Database completed.")
    # READ database
    print("Read Database")
    query = f"SELECT * FROM {table_name}"
    result = pd.read_sql(query, conn)
    print(result)
    
    # READ: only the departement names
    query = f"SELECT DEP_NAME from {table_name}"
    result = pd.read_sql(query, conn)
    print(result)
    
    # READ
    query = f"SELECT COUNT(*) as TOTAL_ENTRIES from {table_name}"
    result = pd.read_sql(query, conn)
    print(result)