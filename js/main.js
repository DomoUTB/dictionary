var UDinput = document.querySelector('#UDinput');
var UDterm = document.querySelector('#UDterm');
var UDmeaning = document.querySelector('#UDmeaning');
var LPbutton = document.querySelector('#LPbutton');
var LPimg = document.querySelector('#LPimg');
var joke = document.querySelector('#joke');
var jokebtn = document.querySelector('#jokebtn');
var category = document.querySelector('#category');
const UDsearch = document.querySelector('#UDsearch');
const history = document.querySelector('#UDhistory');
var array = [];

function update()
{
    if(window.localStorage.getItem('2') != null)
    {
        history.innerHTML = '';
        array = JSON.parse(localStorage.getItem('2'))
        for(i = array.length-1, j = 0; i>0, j<10; i--, j++)
        {
            if(i%2!=0 && array[i-1] != null && array[i] != null)
            {
                history.innerHTML += "<a href=\""+array[i]+" \"target=\"_blank\">" + array[i-1] + "</a><br>"
            }
        }
    }
}
update();
function jokefnc()
{
    fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single')
        .then(response => response.json())
        .then(data =>
            {
                joke.innerHTML = data.joke;
                category.innerHTML = data.category;
            });
}
jokefnc();
jokebtn.addEventListener("click", jokefnc);

UDsearch.onclick = function(event)
{
    const vst = UDinput.value;

    if(vst.length > 0)
    {
        fetch('https://mashape-community-urban-dictionary.p.rapidapi.com/define?term='+vst,
            {
              method: "GET",
              headers: {
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                "x-rapidapi-key": "a9fb0095e3msh7092e19dd0034e9p1261a5jsnb924703f4137",
              },
            })
            .then(response => response.json())
            .then(data => 
                {
                    UDterm.innerHTML = data.list[0].word;
                    UDterm.href = data.list[0].permalink;
                    UDmeaning.innerHTML = data.list[0].definition.replace(/[\[\]']+/g, '');
                    array[array.length] = vst;
                    array[array.length] = data.list[0].permalink;
                    window.localStorage.setItem('2', JSON.stringify(array));
                    update();
                });
    }
}
LPbutton.onclick = function(event)
{
    LPimg.src = "https://picsum.photos/1000/500?random=" + new Date().getTime();
}