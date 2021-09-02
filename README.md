[Link to App](https://cs-insiders.herokuapp.com/)
# CS_Insiders

* Created and Designed by Rishi Selvakumaran

# Summary:

CS-Insiders is a blog website designed and created by Rishi as part of a summer project in learning and applying a full stack web development from scratch.
The website is simple and while it doesn't have any fancy animations or visually appealing elements added to it, it still serves its purpose in displaying a successful MVC implementaion, Restful routing, integration with a NoSql Database (MongoDB Atlas), user authentication using passportjs and lastly the ability to be scalable for adding more features in the future. 

# How to use the Website:

- Upon arriving at the website, the user is directed to the landing webpage where they are greeted by nice fade in and out animations of codes, organization and technology themed background. 

![alt text](https://github.com/rishiselvakumaran98/CS_Insiders/blob/master/img/StartScreen.png)

- Once the user clicks on "Get started" button at the middle of the of the screen, they are directed to the index page of the website which showcases all the blogs posted by users

![alt text](https://github.com/rishiselvakumaran98/CS_Insiders/blob/master/img/HomePage.png)


# Nav/ Menu Bar features:

1. On the Nav bar, there is the home button which can be used to direct to the home page or the index page where all the blogs are showcased. 

2. If User wishes to see blogs specific to one of the main topics, "Web Development, AI and/ or ML, Data-Science, Internship advice" listed, they could click on the topic and be redirected to blogs grouped under that specific topic.

3. If user wishes to navigate specific title of blog, they could search for it using the search toolbar located at the right hand side of the menu bar. The search bar actively searches through the blogs and displays the closest matched blog to the user.

# Login/ Signup features:

- Users who wish to add a new blog under the CS_insiders must create a profile under the website.

![alt text](https://github.com/rishiselvakumaran98/CS_Insiders/blob/master/img/LoginPage.png)

![alt text](https://github.com/rishiselvakumaran98/CS_Insiders/blob/master/img/SignupPage.png)

- Upon login, users have new features and privileges such as ability to add new blogs, add likes and comments to existing blogs, and edit/view blogs that were created by them. 

- If user forgets their password, they could request for a link to create their new password by clicking on the "forget password" button. If user forgets their name or username used for the website they could view it under their "My Profile" button located at the dropdown menu, right before the logout button.

![alt text](https://github.com/rishiselvakumaran98/CS_Insiders/blob/master/img/ForgotPW.png)


![alt text](https://github.com/rishiselvakumaran98/CS_Insiders/blob/master/img/UserEmailForgot.png)

# Main Blog features:

- Users could view more about the blogs by clicking on "Read more" button located within the summary blog tabs. 

- In the detailed show page of the blog, users could view who has written the blog (author's name), when it was written, how many likes were gathered by the blog from users, the main image used on the blog, the blog description, and the comments for the blog. 

![alt text](https://github.com/rishiselvakumaran98/CS_Insiders/blob/master/img/Comments.png)

# Constraints in Project:

- Since the blog was constructed in two weeks upon learning the fundamentals of web development, the blog creator (Rishi) wasn't able to incorporate many of the features found in professional social media websites. In the near future, more important features will be published on the website as indicated below.

- The Styling and animation rendering for the website is very bare minimal, and the developer (Rishi) hopes to achieve a better visualization for the website with more guidance, research and time given.


# Potential features in the near future:

- Email authentication for users based on google or facebook login/signup.

- Adding Pagination for the index page. (provided website starts having more blogs from users)

- Add better UI/Design template to website for a more user friendly experience.


# Important Tools/ NPM Modules used for website:

- NodeJS --> Runtime Javascript server used for compiling the website

- ExpressJS --> Javascript Web framework used for setting up the app and overall MVC structure layout for the website

- MongoDB Atlas --> A NoSQL database used in the application for storing objects and models of blogs, creating user models and also comments for each of the blogs.

- Mongoose --> A Database server model tool used for creating schema of the blog, comment, user models and using the schemas to perform CRUD operations on MongoDb such on creating, reading(getting), updating and deleting blogs, comments, and likes on the blog objects.

- PassportJS --> User login authentication module used for authenticating user, and securing user's profile with encrypted hash key.

- Nodemailer --> Used for sending email to user for resting their password in website

- Tiny Docs --> Text Box editor module used in blog creation and editing. 

- Html-to-Text --> A NPM module used for converting the html tag based elements added from the Tiny Docs text editor to a user readable text on blog description

# Website Theme:
* Website theme and structure adapted from Udemy course: The Web Developer Bootcamp by Colt Steele
