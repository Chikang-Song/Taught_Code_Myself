import sqlite3
import pandas as pd
import os

print(os.getcwd())
with sqlite3.connect('STAFF.db') as conn:
    table_name = 'INSTRUCTOR'
    attribute_list = ['ID','FNAME','LNAME','CITY','CCODE']
    
    # Reading the csv file
    file_path = r'D:\myRepo\Python_Project_for_Data_Engineering\_03_sql_Accessing_database_using_python\INSTRUCTOR.csv'
    df = pd.read_csv(file_path, names=attribute_list)
    
    # Loading the data to a table
    df.to_sql(table_name, conn, if_exists='replace', index=False)
    print('Table is ready')
    
    # read_databse
    query_statement = f"SELECT * FROM {table_name}"
    query_output = pd.read_sql(query_statement, conn)
    print(query_statement)
    print(query_output)
    print('*'*25)
    # Append data
    data_dict = {'ID' : [100],
                'FNAME' : ['John'],
                'LNAME' : ['Doe'],
                'CITY' : ['Paris'],
                'CCODE' : ['FR']}
    data_append = pd.DataFrame(data_dict)

    data_append.to_sql(table_name, conn, if_exists='append', index=False)
    print('Data appended sucessfully')
    # read_databse
    query_statement = f"SELECT * FROM {table_name}"
    query_output = pd.read_sql(query_statement, conn)
    print(query_statement)
    print(query_output)