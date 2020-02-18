# Countr Sprint Project

* #### What was the final state of your project after one week?
    * The final state of our project after one week was a complete web application with a working pug/js frontend and express backend with a mongodb atlas database.
* #### How was the project divided? Who did what?
  * Kevin
    * Set up MongoDB Atlas Database
    * Created front-end with Javascript, PUG, and CSS
    * Created backend routes using Express framework with Node js
    * Used BCrypt to hash+salt passwords prior to storing them in database
  * Shane
    * Set up link database
    * Set up log-in authentication
    * Created data base schema for storing share counter link and value 
  * Emir
    * Set up link generation
    * Set up sign-up div
    * Created on load script to display counter for share page
  * Hayden
     * Set up methods to populate counter table
     * Set up sharing html and styling
     * Counter removal
  * Tyler 
     * Share button event and function call
     * Set up methods in front-end and router to add/delete/increment/decrement counters
     * Counter creation

  
* #### What challenges did you face in working on this project that prevented progress?
  * Had issues setting up the Mongodb database at first
  * Also had issues since with pug we used css body hidden/block rather than different html pages.  So while we had all the routes needed by the backend we only used one html page which was dynamically updated with javascript.
  
* #### What would you do differently for the rest of your capstone work?
  * Planning ahead
  
  
  
  ### How to query counter
  * http://localhost:3000/Share/?id=5e4b4e64dcc6b4588185d744
  
  ### Authenticate to MongoDB database:
  * echo "MONGODB_URI="mongodb+srv://<Username>:<Password>@cluster0-i1h3w.mongodb.net/test?retryWrites=true&w=majority"" > .env
   * Do not include '<' '>'
  
