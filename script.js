let next=0,prev=0;
let main_url="https://www.reddit.com/r/wallpaper+wallpapers/top.json?t=week&limit=24"

function dwnld(url){
    fetch(url)
    .then(resp => resp.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = 'todo-1.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert('your file has downloaded!'); // or you know, something with better UX...
    })
    .catch(() => alert('oh no!'));
}
function open_win(url,author,permalink){
    let title="69";
    let output=`
    <div class="modal-content">
    <div id="btm">
            
    <div>
    Posted by u/${author}. 
        <a href="https://www.reddit.com${permalink}" target="_blank">
            Go upvote!
        </a>
    </div>

        <span id="close">&times;</span>

    
        </div>
        <div>
            <img src="${url}">

        </div>
        
    </div>
    `
    let modal=document.getElementById('myModal');
    modal.innerHTML=output;
    modal.style.display='block';
    document.getElementById('close').addEventListener('click',()=>{
        modal.innerHTML="";
        modal.style.display="none";
    })
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.innerHTML="";
            modal.style.display = "none";
        }
    } 
    
}
function load_posts(url){
    fetch(url)
    .then((res)=>res.json())
    .then((listing)=>{
        console.log(listing);
        posts=listing.data.children.filter((post)=>
        post.data.url.search(/(\.jpg$)|(\.png$)|(\.jpeg$)/)!=-1
        );
        let output=""
        posts.forEach((post)=>{
            console.log(post.data.title,typeof(post.data.title));
            output+=`<div class="post" onclick="open_win('${post.data.url}','${post.data.author}','${post.data.permalink}')">
            <img class="pic" src="${post.data.url}">
            
            </div>`;
            // document.addEventListener('click',()=>console.log('clicked'));
            
            //paste it inside post
            // 
            
            
        });
        document.getElementById('posts').innerHTML=output;
        
        
        //footer
        document.getElementById('footer').style.visibility="visible";
        
        // document.getElementById('prev').addEventListener('click',()=>{
        // prev++;
        // load_posts(`${main_url}${listing.data.after}&count=${cnt}`);
        // })
        document.getElementById('next').addEventListener('click',()=>{
            next++;
            // if(next>prev) cnt+=25;
            load_posts(`${main_url}&after=${listing.data.after}`);
        })
        
        
        
    })
    .catch((err)=>console.log(err));
}

load_posts(main_url);
