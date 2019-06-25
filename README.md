# Strange Estates
![Landing page preview](https://i.imgur.com/aI5K5yl.gif)
## [Landing Page](https://floating-shore-92463.herokuapp.com/)

#### A full-stack RESTful site built on:

| Bootstrap | Node.js | Express.js |
| --------- |---------|------------|
| Mongoose  | MongoDB | Custom CSS |
| GSAP      | jQuery  | Heroku     |

The site is a heavily expanded and customised version of a coursework project.
It uses RESTful routing on a Node.js server on Heroku to render a Bootstrap 4 based web app,
styled using CSS, JavaScript libraries such as jQuery and GSAP, and API calls for image sourcing.

This is an ongoing project, and as such features will change and improve over time.

Version logs for the entire project are below...

---

## Version Logs
### V1

#### Initial setup
* Add landing page
* Add listings page to list all entries
 * Each listing has:
  * Name
  * Image

#### Layout & basic styling
* Create header & footer partials
* Add in Bootstrap

#### Creating new listings
* Setup new listing POST route
* Add in body-parser
* Setup route to show form
* Add basic form


#### Style listings page
* Add better header
* Make listings display in grid

#### Style Navbar + Form
* Add navbar to header
* Style new listing form

### V2

#### Add Mongoose
* Install & config mongoose
* Setup entry model
* Use entry model inside routes

#### Show page
* Add description to object model
* Add shoe route/template

### V3

#### Refactor
* Create models directory

#### Seed database
* Add seeds.js
* Run on server start

#### Add Comment model
* Create model
* Display on show page

### V4

#### New Comment
* Add new and create routes
* Add new comment form

### V5

#### Style show page
* Add sidebar to show
* Display comments
* Bulk out seeds
* Create CSS & link up

### V6

#### Add user model
* Install auth packages
* Define user model

#### Add user registration
* Config Passport
* Add register routes
* Add register template

#### Add user login
* Add login routes
* Add login template

#### Add logout, comment auth
* Add logout route
* Prevent comments if not signed in
* Show/hide auth links

#### Show/hide user nav links
* Add navbar links
* Show/hide as appropriate

### V7

#### Refactor routes
* Use Express router to refactor all routes

### V8

#### Users & Comments
* Associate users with comments
* Save author's name to comments

### V9

#### Users & Listings
* Prevent unauth users from creating listings
* Save user to new listings

### V10

#### Editing Listings
* Add Method-Override
* Add Edit riute
* Link to edut page
* Add update route

#### Destroy route
* Add destroy route
* Add link to show page

#### Authorisation
* Restrict users to u/d own listings
* Hide/show routs as appropriate

#### Editing Comments
* Add edit route & button
* Add update route

#### Deleting comments
* Add destroy route & button

#### Comment Auth
* Auth edit/destroy routes
* Hide/show routes

### V11

#### Refactor
* Refactor middleware

#### Add Flash
* Install & config flash
* Add alerts to header

#### Add landing page
* Add css sheet
* Add html

### V12

#### Add listing price
* Add price to listing model
* Add to routes

#### Add admin user
* Add to model
* Add to register
* Show on header
* Incorporate into routes

#### Style Partials
* Add styles to footer
* Add JS, jQuery links to footer
* Add collapse to navbar

#### Listing Page Styling
* Add background to jumbotron & change border radius (inc. media breakpoints)
* Style buttons
* Make images links & use hover transitions

#### Style landing page
* Add GSAP
* Animate background images

### V13

#### Add gallery to show page
* Set up show route via listing show page
* Add to listing model
* Add page

#### Add features
* Set route
* Add page
* Add to model

#### Further Styling
* Change colours - brand, active, buttons, body
* Change fonts - display, body
* Tweak layout in response to font changes
* Add JS to determine body size after image load, make footer sticky if needed
* Minor cosmetic tweaks

#### About page
* Add route & update links
* Add page template
* Expand template
* Link with admin users

#### Copy!
* Write Proper About Section

### V14

#### Ratings pt.1
* Integrate 1-5 rating in comment model
* Handle this in comment routes

#### Ratings pt.2
* Add check comment existence check to middleware route
* Add check comment existence check to comment route

#### Ratings pt.3
* Add average rating function to middleware
* Add to listing model with average rating
* Handle in listing show page

#### Ratings pt.4
* Add field to new comment / edit form

#### Ratings pt.5
* Add ratings to seed comments
* Update average rating in seeds after populating
* Bug fixes on comment population

### V15

#### Form styling
* Restyle edit listing form & populate correctly
* Restyle edit comment form & populate correctly
* Restyle new listing form
* Restyle new comment form

#### More styling
* Restyle login & signup pages
* Change signup button to match style
* Make consistent headers across pages

#### JavaScripting
* Pull footer to page bottom if no images on page
* Add active class to nav link if relevant

#### Alt attr to images
* Expand image in listing model to be object with src and alt
* Change edit route to handle this _(worth researching how to pass objects-in-objects later...)_
* Put alt attr on all views which handle images
* Update seeds to reflect changes
* Add src field to new & edit listing forms

### V16

#### Search bar
* Add search bar to index page
* Add regex for form validation in middleware
* Pass search term to listings index render

#### Search bar pt2
* Display search term in jumbotron
* Pass error if no results
* Only display search term if results show

#### Index page styling
* Change to Masonry-style layout
* Remove card borders
* Tweak jumbotron spacing

#### Other small styling changes
* Update Bootstrap
* Add stretched-link to cards & remove link around image
* Modify CSS selector for image styling to cover focus change
* Add JS to make navbar sticky if page is bigger than viewport

---
### Pending ideas

#### User profiles
* avatar for all users
* field & about sections for agents
* display in comments, about us section
* add to CRUD routes

#### List CRUD updating
* put gallery in new/edit forms
* update routes to pass this info
* fixed array of features as checkboxes
* update routes to pass this info

#### Copy
* Listing Name
* Listing Description
* Listing Images
* Agent Image
* Agent Description
* Agent Field
* User Image
* User Comment

#### Show page
* Combine detail/gallery/features on one page
* make one central column
* Gallery as main image

#### Misc
* better display for features?