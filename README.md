# HeartHealth
HeartHealth is a mobile app for iOS and android devices made with React Native, JavaScript, and Google Firebase for the backend. Use the app to view data in real time and communicate with other users. Users can register as either a doctor or a patient and can view and manage data pertaining to the heart rate, electrocardiogram, activity movement/status, and thoracic impedance. Data is retrieved from and stored to Google's real time database and firestore database.

### Video Walkthrough

#### Doctor's view

![](https://i.imgur.com/WdSayNR.gif)



#### Patient's view

![](https://i.imgur.com/Vs6yPd3.gif)


### Run HeartHealth:

	1) Copy all files

	2) Create a firebase account https://firebase.google.com/ and create a web app. Then, enable email and password authentication. As well as create a real time database and firestore database.
	
	3) Install nodeJS 
	https://nodejs.org/en/download/

	4) Install expo https://reactnative.dev/docs/environment-setup
  
	5) Download Visual Studio Code (or use any IDE you like. It needs to be able to run javascript)
	 https://code.visualstudio.com/download

	6) In the terminal of your IDE go to the directory of where the files are downloaded and run this in your terminal to install the packages
	npm install
	
	7) Go to files App.js, firebase.js, and firebaseToo.js and add your configs to the firebaseConfig vairable. You can find your conigurations under project settings in firebase.
	
	8) In your terminal run this to start the project
	npm start

To view the app use an andriod or apple emulator or download the expo go app on your phone and make sure you're connected to the same wifi on your computer and phone. If there's an error when viewing the app on your phone, try going to your wifi settings on your computer and change the network to private. 


### View the app with sample data
1) Download the json file in Applications Images & Sample Data.
2) Import the file in your firebase real time database.
3) Create a doctor account in the application.
4) Create a patient account with the id Test_Asher or Test_Sheikh and use the newly created doctor account id as the doctor id.
5) Search for the patient using their id if you're logged in as a doctor or click on the stats button if you're logged in as a patient.
