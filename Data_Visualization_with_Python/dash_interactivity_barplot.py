import pandas as pd
import plotly.graph_objects as go
import dash
from dash import dcc
from dash import html
from dash.dependencies import Input, Output

# Read the airline data into pandas dataframe
airline_data =  pd.read_csv('https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMDeveloperSkillsNetwork-DV0101EN-SkillsNetwork/Data%20Files/airline_data.csv', 
                            encoding = "ISO-8859-1",
                            dtype={'Div1Airport': str, 'Div1TailNum': str, 
                                   'Div2Airport': str, 'Div2TailNum': str})

# Create a dash application
app = dash.Dash(__name__)

app.layout = html.Div(children=[html.H1('Total number of flights to the destination state split by reporting airline',
                                        style={'textAlign': 'center', 'color': '#503D36', 'font-size': 50}),
                                html.Div(["Input Year: ", dcc.Input(id='input-year', value='2010',
                                        type='number', style={'height':'50px', 'font-size': 35}),],
                                        style={'font-size': 40}),
                                html.Br(),
                                html.Br(),
                                html.Div(dcc.Graph(id='bar-plot')),
                                ])        

# add callback decorator
@app.callback(Output(component_id='bar-plot', component_property='figure'),
              Input(component_id='input-year', component_property='value'))

# Add computation to callback function and return graph
def update_figure(selected_year):
    # Filter data
    filtered_df = airline_data[airline_data['Year'] == int(selected_year)]
    # Group the data by Month and compute average over arrival delay time.
    bar_data = filtered_df.groupby('DestState')['Flights'].sum().reset_index()
    # Create figure
    fig = go.Figure(data=go.Bar(x=bar_data['DestState'], y=bar_data['Flights']))
    fig.update_layout(title='Total number of flights to the destination state split by reporting airline',
                      xaxis_title='Destination State', yaxis_title='Flights',template='plotly_dark')
    return fig

# Run the app
if __name__ == '__main__':
    app.run_server()
# The code above creates a dashboard with a bar plot that shows the total number of flights to the destination state split by reporting airline. The user can input the year to see the data for that year.