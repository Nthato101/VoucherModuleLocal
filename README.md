Welcome to the Voucher Creator/Redeemer module. The module has two interfaces, voucher creation and voucher redeeming. I built this on a React Fronted and Django Backend using a MySQL database in production. I used react frontend due to it's javascript capabilities and how well suited it is to handling various data types as well as it's ability to interact with REST API's (axios tool) and API data. React is also great at creating very clean and immersive frontends without losing functionality and still delivering great UI/UX. I used python-django as my backend as Python and the Django framework come with various libraries including the django-rest-framework with which I used to send and receive data. React and Python_Django allow for scalibility which is why I also opted for them as project size may increase both frameworks are suited with tools to help with scaling up the module. 

React can also assist in taking the load off the backend by pre-validating user inputs as to decrease the wrong data being served to the backend which allows the back end to be more fluid and can help on production time in the inital stages . This will save on size and execution time. Well I hope you enjoy my voucher module.




To run the module via browser please note there is a preloaded database with different vouchers however I would encourage you to create your own and test limits of my module simply click on the link https://vouchermodulefrontend-production.up.railway.app/

To run locally simply download the code from this repo Github repo:

  The module is currently using sqllite as a test database please ensure you have this installed to run locally/alternatively you may change the database settings by going into Vouchermodule>Backend>voucher_maker>settings.py 
  you may change this segment of code :
                                        DATABASES = {
                                                      'default': {
                                                          'ENGINE': 'django.db.backends.sqlite3',
                                                          'NAME': BASE_DIR / 'db.sqlite3',
                                                      }
                                                  }

  You may need to add more fields 

                                            DATABASES = {
                                                        'default': {
                                                            'ENGINE': 'value',
                                                            'NAME': 'value',
                                                            'USER': 'value',
                                                            'PASSWORD': 'value',
                                                            'HOST': 'value',
                                                            'PORT': 'value',
                                                        }
                                                    }


replace 'value' with the appropriate credential.
Once the database is connected you open a terminal in the path VouvherModuleLocal/Backend/voucher_maker
                                              run these commands :
                                                                 pip install -r requirements.txt
                                                                 python manage.py makemigrations
                                                                 python manage.py migrate
                                                                 python manage.py runserver.

if you did everything correctly the backend server will be running with this message 
                                                                                  Watching for file changes with StatReloader
                                                                                  Performing system checks...
                                                                                  
                                                                                  System check identified no issues (0 silenced).
                                                                                  Starting development server at http://127.0.0.1:8000/
                                                                                  Quit the server with CTRL-BREAK.


To start the frontend server open a second terminal in the directory  VoucherModuleLocal/frontend:
                                                                      run this command :
                                                                                        npm start
A new webpage should open on the landing page.




To create a voucher :
            - click 'Voucher Admin'
            - click 'Create Voucher'
            - Fill in the form as instructed and submit 
                      -Requires you to create a 4 digit pin
                      -Select a future expiry date 
                      -Set how many times it may be redeemed before the expiry date
            'Voucher has been successfully created' message with other details will pop up

To Redeem a voucher :
              -click on 'Redeem a voucher'
              -Insert a 4 digit pin
                  -If a voucher is redeemable 'Voucher has been successfully' redeemed message will pop up.
                  -If a voucher does not exist 'Voucher does not exist message will pop up.
                  -If a voucher is expired 'Voucher has expired' message will pop up/
                  -If a voucher has run out of redemptions 'Voucher has been completely used' message will pop up.

Created Vouchers can be viewed on the voucher admin page each voucher has an ID, date created, and current status. All other CRUD methods were reserved for future use and can thus be implemeneted when scaling this prototype module. 
            
