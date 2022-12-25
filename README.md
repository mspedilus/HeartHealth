# HeartHealth
Mobile app for iOS and android devices made with React Native, JavaScript, and Google Firebase for the backend. Use the app to view data in real time and communicate with other users.

### Video Walkthrough


Doctor users

![](https://i.imgur.com/GdlKX7g.gif)


Patient users

![](https://i.imgur.com/LjFGRAQ.gif)


#Run HeartHealth:

	1) Copy all files

	2) Create a firebase account https://firebase.google.com/ and create a web app. Save your configurations because you'll need it later. In firebase, enable email and password authentication. And create a real time database and firestore database.
	
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

Download the expo go app on your phone and make sure you're connected to the same wifi on your computer and phone. 
If there's an error when you're trying to view the app on your phone go to your wifi settings on your computer and change the network to private. 


#View the app with sample data
1) Download the json file in Applications Images & Sample Data
2) Import the file in your firebase real time database
3) Create a doctor account in the application
4) Create a patient account with the id Test_Asher or Test_Sheikh and use the newly created doctor account id as the doctor id
5) Search for the patient using their id if you're logged in as a doctor or click on the stats button if you're logged in as a patient
You should see graphs similar to the graphs in Applications Images & Sample Data