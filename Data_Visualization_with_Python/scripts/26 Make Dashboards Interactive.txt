[MUSIC] Welcome to Make Dashboards Interactive. After watching this video, you'll be
able to describe the Callback function, determine how to connect core and
HTML components using Callbacks. Let us understand how to connect Core and
html components using Callbacks. A callback function is a Python function
that is automatically called by Dash whenever an input
component's property changes. callback function is decorated
with @app.callback decorator. So what does this decorator tell Dash? Basically, whenever there's a change
in the input component value, the callback function wrapped by
the decorator is called followed by the update to the output component
children in the application layout. Let's look at the callback
function skeleton. First, create a function that will
perform operations to return the desired result for the output component. Decorate the callback function
with @APP.callback decorator. This takes two parameters. One output, this sets results returned from
the callback function to a component id. Two input, this set input is provided to
the callback function to a component id. From here, we connect input and
output to a desired property. We will see this in action with
an example using the airline data. Use the case here to extract the top
ten airline carriers in the provided input year. In terms of the number of flights based on
the input year, the output will change. First, we import the required
packages as seen before, we'll import pandas Dash core and
html components. The new entry here is Dash dependencies. From Dash dependencies,
we're importing input and output that we will use
in the callback function. We read the airline data
into the Pandas data frame. We load our data frame at
the start of the app and it can be read inside
the callback function. We will start designing the Dash
application layout by adding components. First, we'll provide the title
to the Dash app using the html heading component H1 and
style it using the style parameter. Next, we're adding an html division and
textInput core component in dash.Dash(). The inputs and outputs of the application are simply
the properties of a particular component. In this example,
our input is the value property of the component that has the id input-yr. By default, the value has 2010. We will update this value
in our callback function. Lastly, we will add a division
with a graph core component. The core component has bar plot as id, which we will update inside
the callback function. Note the component IDs. We will add a callback decorator
app.callback input to the callback will be the component with id input-yr and
property value. Output to the callback will be
the component id, bar-plot and property figure. Component_id and component_property
keywords are optional and provide clarity. Next, we will define
the callback function get_graph. The entered year will be the input. Using the year, we extract
the required information from data and the application layout graph updates. Lastly, we will run the application. This is the output of the code
our initial input year is 2010. As the year is updated,
the graph is getting updated in parallel. The second example is
a callback with two inputs. It's similar to one input callback
except for a few changes. We will add a division with one more text
input with the component id input-ab. Then add the new input with component id
input-ab to the decorator inside a list. Next we'll define callback
function get_graph. This takes the entered year and
the entered state as input parameters. Computation extracts the information and the application layout
updates with the graph. This is the output of the code. Our initial input year is 2010 and
the state is Al, which is Alabama. As the year and state update, you'll observe that the graph
gets updated in parallel. In this video, you learned that a callback
function is a python function that is automatically called by Dash whenever
an input component's property changes. The at app callback decorator decorates
the callback function in order to tell Dash to call it. Whenever there's a change in
the input component value. The callback function takes input and
output components as parameters and performs operations to return the desired
result for the output component. [MUSIC]