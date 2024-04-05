


const API_KEY="c811400aff3046cd9f109672f20c4493";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchnews("india"));
async function fetchnews(query){
    const response=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await response.json();
    console.log(data);
    bind(data.articles);
}
function bind(articles){
    const cardsContainer=document.getElementById("News");
    const newstemp=document.getElementById("template-news");
    cardsContainer.innerHTML = "";
    articles.forEach((article) => {
        if(!article.urlToImage)return;
        const cardsclone=newstemp.content.cloneNode(true);
        filldata(cardsclone,article);
        cardsContainer.appendChild(cardsclone);

        
    });

}

function filldata(cardsclone,article){
    const image=cardsclone.querySelector('#news-img');
    const title=cardsclone.querySelector('#news-title');
    const newssource=cardsclone.querySelector('#news-source');
    const desc=cardsclone.querySelector('#news-dec');
    image.src=article.urlToImage;
    title.innerHTML=article.title;
    desc.innerHTML=article.description;
    
    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
    newssource.innerHTML=`${article.source.name} - ${date}`;
    cardsclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");

    });
}
let curse=null;
function on(id){
    fetchnews(id);
    const nav=document.getElementById(id);
    curse?.classList.remove('active');
    curse=nav;
    curse.classList.add('active');

}
const button=document.getElementById('searchbutton');
const search=document.getElementById('search');
button.addEventListener('click',()=>{
    const query=search.value;
    if(!query)return;
    fetchnews(query);

})
