var ref = new Firebase("https://whatsablog.firebaseio.com");
var postDB = ref.child("posts"), author;

$(document).ready(function(){
  init();
var isNewUser = true;
  // $("button#login").on("click", function(){
  //   ref.authWithOAuthPopup("google", function(error, authData) {
  //     if (error) {
  //       console.log("Login Failed!", error);
  //     }
  //     else {
  //       ref.onAuth(function(authData) {
  //         if (authData && isNewUser) {
            // save the user's profile into Firebase so we can list users,
            // use them in Security and Firebase Rules, and show profiles
        //     ref.child("users").child(authData.uid).set({
        //       provider: authData.provider,
        //       name: authData.google.displayName
        //     });
        //   }
        //     author = authData.google.displayName;
        //
        // });
        // console.log("Authenticated successfully with payload:", authData);
        $("button#login").addClass("hidden");
        // $("h3#welcome").text("Welcome back " + authData.google.displayName + "!");
        $("textarea#newPost").removeClass("hidden");
        $("button#submitPost").removeClass("hidden");
      // }
    // });
  // });

  $("button#submitPost").on("click", function(){
    var text = $("textarea#newPost").val();
    var date = new Date();
    var time = date.toLocaleString();
    var blogObject = {postAuthor: 'author', postText: text, postTime: time};
    console.log(blogObject);
    postDB.push(blogObject);
    $("textarea#newPost").val("");
    // console.log("author", author);
  });

});

function init(){
  ref.once("value", function(snapshot) {
    var posts = snapshot.val().posts;
    console.log('posts:',posts);
    var $postClone = $(".blogTemplate").clone();
    // var $postArray = [];
    var $elements = $();
    Object.keys(posts).forEach(function(post){
    // for(var post in posts){
      // debugger;
      var $latestPost = $postClone.removeClass("hidden blogTemplate");
      console.log('latestPost', $latestPost);

      console.log('posts post:',posts[post]);
      var latest = posts[post];
      // console.log(latest.postAuthor);
      $latestPost.find(".author").text(latest.postAuthor);
      $latestPost.find(".timestamp").text(latest.postTime);

      $latestPost.find(".content").text(latest.postText);

      $elements.prepend($latestPost);
      console.log('elements',$elements);

    });
    // console.log('postarray', $postArray);
    $("#blogWrapper").append($elements);
  }, function (errorObject) {//what's this comma in here??!
    console.log("The read failed: " + errorObject.code);
  });

}

// we would probably save a profile when we register new users on our site
// we could also read the profile to see if it's null
// here we will just simulate this with an isNewUser boolean
