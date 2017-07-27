
module.exports = function (db) {

  function createUsers() {
  // Create dummy users
    db.User.create({
      user_email: 'testPerson1@gmail.com', 
      password: 'password1',
      user_type: 'user',
      username:'testP1',
      votes_cast: '1,4'
    }).then(() => {
      console.log('Seeded user testPerson1@gmail.com');
    }).catch(function (err){
      console.log(err);
    });

    db.User.create({
      user_email: 'testPerson2@gmail.com', 
      password: 'password2',
      user_type: 'author', // Is an author
      username:'testP2',
      votes_cast: '2,3'
    }).then(() => {
      console.log('Seeded user testPerson2@gmail.com');
    }).catch(function (err){
      console.log(err);
    });

    db.User.create({
      user_email: 'testPerson3@gmail.com', 
      password: 'password3',
      user_type: 'user',
      username:'testP3',
      votes_cast: '1,5,3'
    }).then(() => {
      console.log('Seeded user testPerson3@gmail.com');
    }).catch(function (err){
      console.log(err);
    });
  }

  function createCurriucla() {
    // Create Curricula
    // ID1
    db.Curricula.create({
      curricula_name: 'How to learn JavaScript',
      category: 'Programming',
      sub_category: 'JavaScript',
      search_tags: 'javascript programming web development',
      votes: 10,
      description: 'Learn to program with the language of the internet.',
      submited_status: false,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on learning Javascript');
      createJavaDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });

    // ID2
    db.Curricula.create({
      curricula_name: 'How to bake a cupcake',
      category: 'Cooking',
      sub_category: 'Cupcakes',
      search_tags: 'cupcake cooking baking frosting',
      votes: 12,
      description: 'Learn how to make delicious cupcakes.',
      submited_status: true,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on cupcakes');
      createCupcakeDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });

    // ID3
    db.Curricula.create({
      curricula_name: 'Learn Python the Quick Way',
      category: 'Programming',
      sub_category: 'Python',
      search_tags: 'programming code python web dev',
      votes: 25,
      description: 'Code in python to make awesome things happen',
      submited_status: true,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on Python');
      createPythonDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });

    // ID4
    db.Curricula.create({
      curricula_name: 'The 5 Most Important Algorithms',
      category: 'Programming',
      sub_category: 'Algorithm',
      search_tags: 'programming code computer science algorithm',
      votes: 27,
      description: 'These 5 algorithms will improve your code and make your boss love you.',
      submited_status: true,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on Algorithms');
      createAlgoDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });

    // ID5
    db.Curricula.create({
      curricula_name: 'Basics of Macroeconomics',
      category: 'Economics',
      sub_category: 'Macroeconomics',
      search_tags: 'economics macroeconomics basics',
      votes: 17,
      description: 'Learn some of the basic principles of macroeconomics and understand what you hear on the news',
      submited_status: true,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on Economics');
      createEconDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });

    // ID6
    db.Curricula.create({
      curricula_name: 'How to cook steak',
      category: 'Cooking',
      sub_category: 'Steak',
      search_tags: 'steak cooking meat grill',
      votes: 90,
      description: 'Learn to cook steaks perfectly every time.',
      submited_status: true,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on learning to cook streak');
      createSteakDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });

    // ID7
    db.Curricula.create({
      curricula_name: 'How to use Passport',
      category: 'Programming',
      sub_category: 'Javascript',
      search_tags: 'javascript passport authentication',
      votes: 0,
      description: 'Learn to authenticate users with Passport.',
      submited_status: true,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on learning to use passport');
      createSteakDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });

    // ID8
    db.Curricula.create({
      curricula_name: 'How to get in shape',
      category: 'Fitness',
      sub_category: 'Weight loss',
      search_tags: 'lose weight exercise fitness',
      votes: 0,
      description: 'Get in shape for the summer!',
      submited_status: true,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on learning to use passport');
      createSteakDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });

    //ID9
    db.Curricula.create({
      curricula_name: 'How to ride a motorcycle',
      category: 'Driving',
      sub_category: 'Motorcycle',
      search_tags: 'bike motorcycle cycling motorcycles',
      votes: 0,
      description: 'Become a badass biker!',
      submited_status: true,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on motorcycles');
      createSteakDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });

    //ID10
    db.Curricula.create({
      curricula_name: 'How to build an SPA with Angular',
      category: 'Programming',
      sub_category: 'Angular',
      search_tags: 'angular spa single page app javascript',
      votes: 0,
      description: 'Learn to write an SPA using Angular!',
      submited_status: true,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on Angular');
      createSteakDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });

    //ID11
    db.Curricula.create({
      curricula_name: 'How do I balance my checkbook',
      category: 'Finance',
      sub_category: 'Banking',
      search_tags: 'banking checking checkbook',
      votes: 0,
      description: 'How do I balance my checkbook?',
      submited_status: true,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on checkbook');
      createSteakDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });

    //ID12
    db.Curricula.create({
      curricula_name: 'How to surf',
      category: 'Fitness',
      sub_category: 'Surfing',
      search_tags: 'ocean beach surfing fitness',
      votes: 0,
      description: 'Learn to ride a surfboard!',
      submited_status: true,
      authorId: 2
    }).then((data) => {
      console.log('Seeded curricula on surfboard');
      createSteakDetails(data.id);
    }).catch(function (err){
      console.log(err);
    });




  }

  function createJavaDetails(id) {
    // Add the curricula details for each curricula

    // Javascript Cur#1 Details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "Read the book Eloquent Javascript.",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded JS step 1');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 2,
      step_type: "text",
      step_content: "Try the practice problems in the book.",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded JS step 2');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 3,
      step_type: "text",
      step_content: "Build a todo list.",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded JS step 3');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 4,
      step_type: "text",
      step_content: "Watch some you-tube videos",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded JS step 4');
    }).catch(function (err){
      console.log(err);
    });
  }

  function createCupcakeDetails(id){
  // Cupcakes Cur#2 details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "Watch this video on how to bake cupcakes",
      step_url: "https://youtu.be/AmC9SmCBUj4",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Cupcake step 1');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 2,
      step_type: "text",
      step_content: "Practice, Practice, and taste test...",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Cupcake step 2');
    }).catch(function (err){
      console.log(err);
    });
  }

  function createPythonDetails(id){
    // Python Cur#3 details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "Read the book 'Learn Python the hard way.",
      step_url: "",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Python step 1');
    }).catch(function (err){
      console.log(err);
    });
  }

  function createAlgoDetails(id){
    // Algorithms Cur#4 Details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "Watch this on algorithms thinking",
      step_url: 'https://youtu.be/HtSuA80QTyo?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb',
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Algo step 1');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 2,
      step_type: "text",
      step_content: "Sorting, insert sort, merge sort",
      step_url: "https://youtu.be/Kg4bqzAqRBM?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Algo step 2');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 3,
      step_type: "text",
      step_content: "Heaps and Heap Sort",
      step_url: 'https://youtu.be/B7hVxCmfPtM?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb',
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Algo step 3');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 4,
      step_type: "text",
      step_content: "Binary search trees",
      step_url: 'https://youtu.be/9Jry5-82I68?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb',
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Algo step 4');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 5,
      step_type: "text",
      step_content: "Hashing and chaining",
      step_url: 'https://youtu.be/0M_kIqhwbFo?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb',
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Algo step 5');
    }).catch(function (err){
      console.log(err);
    });
  }

  function createEconDetails(id){
    // Economics Cur#5 Details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "This video will familiarize you with absolute basics",
      step_url: 'https://youtu.be/nQXD5Mhv5Q8',
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Econ step 1');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 2,
      step_type: "text",
      step_content: "This non-typical economics explanation on the economy",
      step_url: "https://youtu.be/PHe0bXAIuk0",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Econ step 2');
    }).catch(function (err){
      console.log(err);
    });
  }

  function createSteakDetails(id){
    // Steak Cur#6 Details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "Watch this video on cuts of meat",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Steak step 1');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 2,
      step_type: "text",
      step_content: "Watch this video on how to cook a steak",
      step_url: "https://youtu.be/AmC9SmCBUj4",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Steak step 2');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 3,
      step_type: "text",
      step_content: "Practice, Practice, Practice...",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Steak step 3');
    }).catch(function (err){
      console.log(err);
    });
  }

    function createPassportDetails(id){
    // Passport Cur#7 Details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "Watch this video on javascript",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Passport step 1');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 2,
      step_type: "text",
      step_content: "Watch this video on passport authentication",
      step_url: "https://www.youtube.com/watch?v=GHNLWHGCBEc&index=8&list=PL55RiY5tL51rajp7Xr_zk-fCFtzdlGKUp",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Passport step 2');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 3,
      step_type: "text",
      step_content: "Implement validation",
      step_url: "https://www.youtube.com/watch?v=js5hI2moBY4&index=9&list=PL55RiY5tL51rajp7Xr_zk-fCFtzdlGKUp",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Passport step 3');
    }).catch(function (err){
      console.log(err);
    });
  }

    function createInShapeDetails(id){
    // Get in shape Cur#8 Details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "Watch this video on diet",
      step_url: "https://www.youtube.com/watch?v=YPl0naO6GR0",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Fitness step 1');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 2,
      step_type: "text",
      step_content: "Watch this video on losing weight",
      step_url: "https://www.youtube.com/watch?v=bTffztrhgWc",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Fitness step 2');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 3,
      step_type: "text",
      step_content: "Go for a run!",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Fitness step 3');
    }).catch(function (err){
      console.log(err);
    });

    function createMotorcycleDetails(id){
    // Motorcycles Cur#9 Details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "Watch this video on motorcycles",
      step_url: "https://www.youtube.com/watch?v=kTQ02P4R3TM",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Motorcycle step 1');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 2,
      step_type: "text",
      step_content: "Read this guide",
      step_url: "http://www.wikihow.com/Ride-a-Motorcycle-(Beginners)",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Motorcycle step 2');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 3,
      step_type: "text",
      step_content: "Take the Motorcycle Safety Foundation Course!",
      step_url: "https://www.msf-usa.org/",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Motorcycle step 3');
    }).catch(function (err){
      console.log(err);
    });
  }

    function createAngularDetails(id){
    // Angular Cur#10 Details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "Read documentation on Angular JS",
      step_url: "https://docs.angularjs.org/api",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Angular step 1');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 2,
      step_type: "text",
      step_content: "Take a course",
      step_url: "https://www.youtube.com/watch?v=wYhl0gZjG2I",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Angular step 2');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 3,
      step_type: "text",
      step_content: "Build a to do app in angular!",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Angular step 3');
    }).catch(function (err){
      console.log(err);
    });

        function createCheckbookDetails(id){
    // Checkbook Cur#11 Details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "What does balance a checkbook mean?",
      step_url: "https://www.capitalone.com/financial-education/money-basics/balancing-budget/balance-your-checkbook/",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded checkbook step 1');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 2,
      step_type: "text",
      step_content: "Explain the process in detail",
      step_url: "http://www.dummies.com/personal-finance/how-to-balance-a-checkbook/",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded checkbook step 2');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 3,
      step_type: "text",
      step_content: "Try this at home on your own checking account!",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded Angular step 3');
    }).catch(function (err){
      console.log(err);
    });

        function createSurfingDetails(id){
    // Surfing Cur#12 Details
    db.CurriculaDetails.create({
      step_number: 1,
      step_type: "text",
      step_content: "Read a guide about surfing",
      step_url: "http://www.thesurfingsite.com/How-to-Surf.html",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded surfing step 1');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 2,
      step_type: "text",
      step_content: "How do you stand up?",
      step_url: "https://www.youtube.com/watch?v=Ts4ZVpajims",
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded surfing step 2');
    }).catch(function (err){
      console.log(err);
    });

    db.CurriculaDetails.create({
      step_number: 3,
      step_type: "text",
      step_content: "Take a course at your local beach!",
      step_url: null,
      authorId: 2,
      CurriculaId: id
    }).then(() => {
      console.log('Seeded surfing step 3');
    }).catch(function (err){
      console.log(err);
    });
  }


  createUsers()
  createCurriucla()
}