// the show/hide password button

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  
  // toggle the eye slash icon
  if (this.classList.contains('fa-eye')) {
    this.classList.remove('fa-eye');
    this.classList.add('fa-eye-slash');
  } else {
    this.classList.remove('fa-eye-slash');
    this.classList.add('fa-eye');
  }
});



// set profile picture

const imgDiv = document.querySelector('.profile_pic');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#upload_button');

// when user hover over the image, display the upload button
imgDiv.addEventListener('mouseenter', function(){
    uploadBtn.style.display = "block";
});

// when they hover out, hide the upload button
imgDiv.addEventListener('mouseleave', function(){
    uploadBtn.style.display = "none";
});

// choose an image to upload
file.addEventListener('change', function(){
    // this refers to the file
    const choosedFile = this.files[0];

    if (choosedFile) {
        const reader = new FileReader(); 

        // FileReader is a predefined function of JS
        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);
    }
});

