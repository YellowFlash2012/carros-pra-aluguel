# carros-pra-aluguel
Cars rental full stack app

![carros-pra-aluguel](/public/deborahcars_hp.png)

# Scope: This  app enables car renters to rent a car of their choice within a time range. It is inspired by this udemy <a href="https://www.udemy.com/course/mern-stack-car-rental-application-2021-react-redux-node/">course</a>

# Tech Stack:
- front end: react + redux
- back end: node/express.js + mongoDB

# Key learning points:
- ant design: very easy and lightweight as far as I saw. I really liked. This is my first time using it and I'm hooked.
- aos library to animate images or components in react

# My personal touch:
- created an "admin" middleware to make certain routes only accessible to admin
- created a "protect" middleware to make certain routes only accessible to logged in users
- use of rtk instead of old redux
- hashing of the passwords
- admin is redirected to admin section immediately after login
- normal users are redirected to normal homepage after login

# todos:
- disable unavailable time slots in <RangePicker/>
- switch from legacy stripe checkout to the modern one
- add a multi step signup form requiring way more detailed information