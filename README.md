# Activity Tracker
----

Go to backend directory and create your virtual python environment by running

`python -m venv env`

Now in the backend directory run

`env\Scripts\activate`

to use the virtual environment. 

----

Once you've entered the venv mode, install the requirements by running 

`pip install -r requirements.txt`

and then run

`uvicorn main:app --reload`

to start the fastapi server.

----

Now go to frontend directory and run 

`npm install`

to install the dependencies of react project.

----

Lastly, in the frontend firectory, run 

`npm start`

to start the application.