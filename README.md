# HOW TO

### HOW TO INSTALL DEPENDENCIES
  1. $ npm install axios
  2. $ npm install prompt
  3. $ npm install easy-table

### HOW TO BUILD PROGRAM
  A function is already set up to build the program.
  Follow the run program command and the build will be taken care of.
### HOW TO RUN PROGRAM
  $ node foodTruck.js

### CHALLENGE OVERVIEW
  Create a program that will print out a list of food trucks

#### DATA SOURCE
   From SanFranciso govt. site https://data.sfgov.org/Economy-and-Community/Mobile-Food-Schedule/jjew-r69b

#### API RESOURCE
  Mobile Food Schedule API
    https://dev.socrata.com/foundry/data.sfgov.org/bbb8-hzi6

#### PROBLEM
  Write a command line program that prints out a list of food trucks that are
  open at the current date, when the program is being run. So if I run the
  program at noon on a Friday, I should see a list of all the food trucks that
  are open then.

  * Additional notes
    1. Please display the name and address of the trucks and sort the output
       alphabetically by name.
    2. Please display results in pages of 10 trucks.
      That is: if there are more than 10 food trucks open, the program should
      display the first 10, then wait for input from the user before displaying
      the next 10 (or fewer if there are fewer than 10 remaining), and so on
      until there are no more food trucks to display.
