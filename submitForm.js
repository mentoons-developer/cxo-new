var files = [];
document.getElementById("files").addEventListener("change", function (e) {
  files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
  }

  if (files.length != 0) {
    //Loops through all the selected files
    for (let i = 0; i < files.length; i++) {
      //create a storage reference
      var storage = firebase.storage().ref(files[i].name);

      //upload file
      var upload = storage.put(files[i]);

      //update progress bar
      upload.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById("progress").style.display = "block";
          document.getElementById("progress").value = percentage;
        },

        function error() {
          alert("error uploading file");
        },

        function getFileUrl(filename) {
          //create a storage reference
          var storage = firebase.storage().ref(files[i].name);
          console.log(files[i].name);

          //get file url
          storage
            .getDownloadURL()
            .then(function (url) {
              // document.getElementById("linkk").innerHTML += url;
              document.getElementById("firebaseUrl").setAttribute("value", url);
              document.getElementById("submit").removeAttribute("disabled");
            })
            .catch(function (error) {
              console.log("error encountered");
            });
        }

        // function complete() {
        //   document.getElementById(
        //     "uploading"
        //   ).innerHTML += `${files[i].name} upoaded <br />`;
        // }
      );
    }
  } else {
    alert("No file chosen");
  }
});
