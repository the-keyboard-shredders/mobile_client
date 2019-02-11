# mobile_client
<ul>
<li><b>App.js</b> - serves as the main entry point/component for the app and encapsulates all other components. </li>
<li><b>AppNavigator.js</b> - Serves as the navigational centerpiece of the app. It allows navigation to Home, Article and Login views.</li>
  
  <li><b>Login.js</b>-Initial login page. Allows user to use google ID in order to login to mobile app and synchronize with database. Upon sign-in will redirect user to Home view.</li>
    <li><b>Home.js</b>-User's primary view. Displays a list of titles which will display full articles onPress. LoadArticles function will refresh the user's AsyncStorage and display an updated list of articles. This article is activated by swiping down the page.</li>
       <li><b>Article.js</b>-This is the full article view that a user can access by clicking on titles from Home.js. Link to original webpage is also contained on top. Page bottom contains a delete function that is activated onPress which deletes articles by id.</li>
          <li><b>/store/asyncStorageActions.js</b> - File contains all functions related to local storage. 
  
- grabFromCloudToStorage() fetches all articles connected to given userID from the database and then places data into local Async Storage for offline viewing. 
- getAllData() grabs all articles saved in local storage. 
- persistGoogleId() saves user's google ID in persisted local storage. 
- isSignedIn() grabs current google ID stored in local storage</li>

