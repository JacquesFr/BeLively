var main_email;

function SignUp() {

    name = document.getElementById("name_instructor").value;
    email = document.getElementById("email_instructor").value;
    password = document.getElementById("password_instructor").value;
    password_confirm = document.getElementById("password_2_instructor").value;
    employee_id = document.getElementById("instructor_ID").value;

    if (password != password_confirm) {
        alert("Passwords do not match");
    }

    else if (password.length < 8) {
        alert("Password not long enough");
    }

    else {

        var db = firebase.firestore();

        SetEmail(email);

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {

            })

            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // github didn't deploy new code
                alert(errorMessage);
                // ...
            });

        db.collection("Instructors").doc(email).set({
            Type: "Instructor"
        })
        .then(function () {

        })
        .catch(function (error) {
            console.error("Error creating database entry: ", error);
        });

        db.collection("Instructors").doc(email).collection("Profile").doc(employee_id).set({
            Name: name,
            Email: email,
            Number: "",
            Address: "",
            ID: employee_id
        })
            .then(function () {
                window.location.href = 'instructor_homepage.html';
            })
            .catch(function (error) {
                console.error("Error creating database entry: ", error);
            });
    }
};

function SetEmail(email) {
    main_email = email;
    localStorage.setItem("user_email", main_email);
};
