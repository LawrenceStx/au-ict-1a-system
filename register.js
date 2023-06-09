const firebaseConfig = {
 apiKey: "AIzaSyCTeDkJDvCRl21h2zx_yKM5-2hSuhsHXYA",
 authDomain: "medicalsystem-4aab8.firebaseapp.com",
 projectId: "medicalsystem-4aab8",
 storageBucket: "medicalsystem-4aab8.appspot.com",
 messagingSenderId: "195093582325",
 appId: "1:195093582325:web:4610af2ea4b23f98b550bc"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

function register () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is wrong.')
    return
  }
  if (validate_field(full_name) == false) {
    alert('Wrong name.')
    return
  }
 
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {

    var user = auth.currentUser
    var database_ref = database.ref()
    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)
    
    const alertDiv = document.getElementById('alert');
    alertDiv.style.display = 'block';
    
    window.location.href = "dashboard.html";
  })
  
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}


function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePasswordBtn.addEventListener('click', function() {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  this.textContent = type === 'password' ? 'Show password' : 'Hide password';
});