let url = window.location.toString();

let getUserName = (url) => {
    let arrayUrl = url.split('=');
    let userName = arrayUrl[1];
    if (userName == undefined) {
        userName = 'Costyanica';
    }
    return userName;
}

let getNowDate = new Promise((resolve, reject) => {
  let time = new Date();
  setTimeout(() => time ? resolve(time) : reject ('Время неустановлено'). 3000)
});

let name = getUserName(url);

let getUserData = fetch(`https://api.github.com/users/${name}`)

Promise.all([getUserData, getNowDate])
  .then([resUserData, resNowDate]) => {
      userData = resUserData;
      nowTime = resNowDate;
  }
  .then(response => userData.json())
  .then(json => {
      let name = json.login;
      if (name) { 
            let getImage = () => {
            let photo = document.querySelector('.photo');
            photo.src = json.avatar_url;
            }
            
            let getName = () => {
            let user = document.querySelector('.name');
            let link = document.querySelector('.link');
            let theName = json.name;
            user.innerHTML = theName;
            link.href = json.html_url;
            }
            
            let getInfo = () => {
            let info = document.querySelector('.info');
            info.innerHTML = json.bio;
            }

	    let getDate = () => {
            let newDate = document.createElement('p');
	    newDate.innerHTML = nowTime;
            document.body.appendChild(nowTime);

            let elementForPreloader = document.getElementById('preload');
            elementForPreloader.classList.add('hidden');
          
            getImage();
            getName();
            getInfo();
            getDate();
  
            }
       else {
         alert('Пользователь не найден');
       }})
    .catch(err => alert(err + 'Информация о пользователе не доступна'));
