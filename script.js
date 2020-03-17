let url = window.location.toString();

let getUserName = (url) => {
    let arrayUrl = url.split('=');
    let userName = arrayUrl[1];
    if (userName  == undefined) {
        userName = 'Costyanica';
    }
    return userName;
}

let name = getUserName(url);

fetch(`https://api.github.com/users/${name}`)
  .then(response => response.json())
  .then(json => {
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
          
            getImage();
            getName();
            getInfo();
  
            }
       else {
         alert('Пользователь не найден');
       }})
    .catch(err => alert(err + 'Информация о пользователе не доступна'));
