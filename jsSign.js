function terms_changed(termsCheckBox) {
  if (termsCheckBox.checked) {
    document.getElementById("signbtn").style.backgroundColor = "#020843";
    document.getElementById("signbtn").disabled = false;
  } else {
    document.getElementById("signbtn").disabled = true;
    document.getElementById("signbtn").style.backgroundColor =
      "rgba(126, 155, 250, 0.596)";
  }
}

async function postdata() {
  let payload = {
    name: "Vignesh",
    password: "vignesh",
    mobile: "789654123",
    email: "vig@gmail.com",
  };
  try {
    let res = await axios.post(
      "https://6190ddab41928b001768fea0.mockapi.io/bikeruser",
      payload
    );
  } catch (error) {
    console.log(error);
  }
}

const checkEmail = (serverUsers, formData) => {
  const user = serverUsers.find((user) => user.email === formData); // extract the email from the formData
  if (user) return user;
};
const onSubmit = async (formData, data) => {
  const user = await axios
    .get("https://6190ddab41928b001768fea0.mockapi.io/bikeruser")
    .then((res) => checkEmail(res.data, formData));

  if (user) {
    let signerror = document.querySelector("#Sign-error");
    signerror.innerHTML = "UserName Already Exist";
  } else {
    //alert("not Exist");
    await axios
      .post("https://6190ddab41928b001768fea0.mockapi.io/bikeruser", data)
      .then((res) => {
        console.log(res.data);
      });
    window.location.href = "./BikeServiepage.html";
  }
};

function createAccount() {
  let SignForm = document.forms["signForm"];

  let userName = SignForm.username.value;
  let emailid = SignForm.useremail.value;
  let mobileno = SignForm.usermobile.value;
  let passwords = SignForm.pwd.value;
  let conpasswd = SignForm.cpwd.value;
  let data = {
    name: userName,
    password: passwords,
    mobile: mobileno,
    email: emailid,
  };
  if (validName(userName)) {
    if (validphone(mobileno)) {
      if (validpass(passwords)) {
        if (validconpass(passwords, conpasswd)) {
          //postdata(userName,mobileno,passwords,emailid)
          onSubmit(emailid, data);
        }
      }
    }
  }

  return false;
}

function validphone(phone) {
  let mobilerror = document.querySelector("#error-mobile");
  let phone_Pattern = /[6-9]\d{9}$/;
  if (phone.length != 10) mobilerror.innerHTML = "Should be 10 dight";
  else if (!phone_Pattern.test(phone))
    mobilerror.innerHTML = "Invalid Phone No";
  else {
    mobilerror.innerHTML = "";
    return true;
  }
  return false;
}

function validName(Name) {
  let name_Pattern = /[a-zA-Z]{3,25}/g;
  let nameerror = document.querySelector("#error-name");
  if (!name_Pattern.test(Name)) nameerror.innerHTML = "atlest 3 letter";
  else {
    nameerror.innerHTML = "";
    return true;
  }
  return false;
}

function validemail(Emails) {
  let email_Pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let mailerror = document.querySelector("#error-email");
  if (!email_Pattern.test(Emails)) mailerror.innerHTML = "Invalid Email";
  else {
    mailerror.innerHTML = "";
    return true;
  }
  return false;
}

function validpass(passwd) {
  let password_Pattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  let pwderror = document.querySelector("#error-pass");
  if (!password_Pattern.test(passwd)) pwderror.innerHTML = "not strong";
  else {
    pwderror.innerHTML = "";
    return true;
  }
  return false;
}

function validconpass(passwd, conpass) {
  let pwderror = document.querySelector("#error-cpass");
  if (passwd != conpass) pwderror.innerHTML = "Password Mismatch";
  else {
    pwderror.innerHTML = "";
    return true;
  }
  return false;
}
