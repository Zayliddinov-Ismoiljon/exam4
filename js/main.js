const elUserList= document.querySelector(".user-list");
const elPostList= document.querySelector(".user-postlist");
const elCommentList= document.querySelector(".user-commentlist");


const userTemplate= document.querySelector(".user-template").content;
const postsTemplate= document.querySelector(".posts-template").content;
const commentTemplate= document.querySelector(".comments-template").content;



function renderUser(arr, element){
    element.innerHTML= "";

    const elFragment= document.createDocumentFragment();

    arr.forEach(item => {
        const clonedTemplate= userTemplate.cloneNode(true);
        clonedTemplate.querySelector(".user-template__item").value = item.id;
        clonedTemplate.querySelector(".user-template__id").textContent= item.id;
        clonedTemplate.querySelector(".user-template__name").textContent=item.name;
        clonedTemplate.querySelector(".user-template__username").textContent=item.username;
        clonedTemplate.querySelector(".user-template__email").textContent =item.email;
        clonedTemplate.querySelector(".user-template__email").href =`mailto:${item.email}`;
        clonedTemplate.querySelector(".user-template__adress").address=item.address;
        clonedTemplate.querySelector(".user-template__street").textContent= item.address.street;
        clonedTemplate.querySelector(".user-template__suite").textContent =   item.address.suite;
        clonedTemplate.querySelector(".user-template__city").textContent=item.address.city;
        clonedTemplate.querySelector(".user-template__zipcode").textContent=item.address.zipcode;
        clonedTemplate.querySelector(".user-template__lat").textContent=item.address.geo.lat;
        clonedTemplate.querySelector(".user-template__lng").textContent=item.address.geo.lng;
        clonedTemplate.querySelector(".user-template__geo").href=`https://www.google.com/maps/@${item.address.geo.lat},${item.address.geo.lng}`;
        clonedTemplate.querySelector(".user-template__phone").textContent=item.phone;
        clonedTemplate.querySelector(".user-template__phone").href=`tel:${item.phone}`;
        clonedTemplate.querySelector(".user-template__website").textContent=item.website;
        clonedTemplate.querySelector(".user-template__website").href=`https://${item.website}`;
        clonedTemplate.querySelector(".company__name").textContent =item.company.name;
        clonedTemplate.querySelector(".company__catchPhrase").textContent=item.company.catchPhrase;
        clonedTemplate.querySelector(".company__bs").textContent=item.company.bs;

        elFragment.appendChild(clonedTemplate)

    });

    element.appendChild(elFragment);

};

async function getUser(){
    const res= await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json();

    renderUser(data, elUserList);

}

getUser();


function renderPost(arr, element){
    element.innerHTML="";

    const elFragment= document.createDocumentFragment();

    arr.forEach(item=>{
        if(id == item.userId){
            const clonedTemplate= postsTemplate.cloneNode(true);
            clonedTemplate.querySelector(".posts-template__item").value=item.id;
            clonedTemplate.querySelector(".posts-template__title").textContent=item.title;
            clonedTemplate.querySelector(".posts-template__body").textContent=item.body;

            elFragment.appendChild(clonedTemplate);
        }
    })

    element.appendChild(elFragment);


};


let id;

elUserList.addEventListener("click", (evt)=>{

    // user_id = document.querySelectorAll(".user-template__id");

    // for(let j=0; j<user_id.length; j++){
    //     if(j==i){
    //         id = user_id[j].textContent
    //     }
    // }
    id=evt.target.value;

    // console.log(id);

    {

        async function getPost(){
        const res= await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await res.json()

        renderPost(data, elPostList);
    }

    getPost()
    }


});




async function renderComment(arr, element){
    element.innerHTML="";

    const elFragment = document.createDocumentFragment();

    arr.forEach(item=>{

        if(id==item.postId){
        
        const clonedTemplate= commentTemplate.cloneNode(true);

        clonedTemplate.querySelector(".comments-template__name").textContent= item.name;
        clonedTemplate.querySelector(".comments-template__email").textContent= item.email;
        clonedTemplate.querySelector(".comments-template__body").textContent= item.body;

        elFragment.appendChild(clonedTemplate);
        }


    });

    element.appendChild(elFragment);
}


elPostList.addEventListener("click", evt=>{

    post_id = evt.target.value;
    console.log(post_id);

    if(evt.target.matches(".posts-template__item"))

    {

        async function getPost(){
            const res= await fetch("https://jsonplaceholder.typicode.com/comments")
            const data = await res.json();

            // console.log(data);

            renderComment(data, elCommentList);
        }

        getPost()

    }


});