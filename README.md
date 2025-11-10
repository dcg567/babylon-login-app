I created the project by running:  npx create-next-app babylon-login
After that I went to the Firebase console and created a new project "web app" for authentication. I copied the config details and added them to firebase.js in the app.
I then began to implement my login page. Users can register or sign in using their email and password. Once registering or signing up they will be redirected to the home page where they are greeted with their name.
I used onAthStateChanged to handle authentication state and redirect users accordingly.
I added error handling and form validation (passwords were appropriate length and feedback for login problems)
For future improvements, I’d implement more robust security measures, add additional features such as password reset,user mamagement, account deletion, password change etc, and enhance the styling by adding CSS to make the pages more aesthetically pleasing.
