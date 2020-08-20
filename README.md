# CS_Insiders

* Created and Designed by Rishi Selvakumaran 
* Website theme and structure adapted from Udemy course: The Web Developer Bootcamp by Colt Steele

# Summary:

CS-Insiders is a blog website designed and created by Rishi as part of a summer project in learning and applying a full stack web development from scratch.
The website is simple and while it doesn't have any fancy animations or visually appealing elements added to it, it still serves its purpose in displaying a successful MVC implmentaion, Restful routing, integration with a NoSql Database (MongoDB Atlas), user authentication using passportjs and lastly the ability to be scalable and add more features in the future. 

# How to use the Website:

- Upon arriving at the website, the user is directed to the landing webpage where they are greeted by nice fade in and out animations of codes, organizationa dna technology themed background. Once the user clicks on "Get started" button at the middle of the of the screen, they are directed to the index page of the website which showcases all the blogs posted by users

# Nav/ Menu Bar features:

1. On the Nav bar, there is the home button which can be used to direct to the home page or the index page where all the blogs are showcased. 

2. User wishes to see blogs specific to one of the main topics, "Web Development, AI and/ or ML, Data-Science, Internship advice" listed, they could click on the topic and be redirected to blogs grouped under that topic.

3. If user wishes to navigate specific title of blog, they could search for it using the search toolbar located at the right hand side of the menu bar. The search bar actively searches through the blogs and displays the closest matched blog to the user.

# Login/ Signup features:

- Users who wish to add a new blog under the CS_insiders must create a profile under the website, before adding new blogs related to CS.

- Upon login, users have new features and privileges such as ability to add new blogs, add likes and comments to existing blogs, and edit/view blogs that were created by them. 

- If user forgets their name or username used for the website they could view it under their "My Profile" button located at the dropdown menu, right before the logout button. The forget password feature will be updated for the website in the near future.

# Main Blog features:

- Users could view more about the blogs by clicking on "Read more" button located within the summary blog tabs. 

- In the detailed show page of the blog, users could view who has written the blog (author's name), when it was written, how many likes were gathered by the blog from users, the main image used on the blog, the blog description, and the comments for the blog. 



# Constraints in Project:

- Since the blog was constructed in two weeks upon learning the fundamentals of web development, the blog creator (Rishi) wasn't able to incorporate many of the features found in professional social media websites. In the near future, more important features will be published on the website as indicated below.

- The Styling and animation rendering for the website is very bare minimal, and developer hopes to achieve a better visualization for the website with more guidance, research and time given.


# Potential features in the near future:

- Email authentication for users based on google or facebook login/signup and ability to recover forgotten password through email.

- Adding Pagination for the index page. (provided website starts having more blogs from users)

- Add better UI/Design template to website for a more user friendly experience.


# Important Tools/ NPM Modules used for website:

- NodeJS --> Runtime server used for compiling the website

- ExpressJS --> Javscript Web framework used for setting up the app and overall MVC layout for the website

- Mongoose --> A Database server tool used for modeling blog, comment, user schemas and performing CRUD operations on MongoDb such on creating, reading(getting), updating and deleting blogs, comments, and likes on blogs.

- PassportJS --> User login authentication module used for authentication user, and securing user's profile with encrypted hash key.

- Tiny Docs --> Text Box editor module used in blog creation and editing. 

- Html-to-Text --> A NPM module used for converting the html tag based elements added from the Tiny Docs text editor to a user readable text on blog description
