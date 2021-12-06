let next=0,prev=0;
let main_url="https://www.reddit.com/r/wallpapers/top.json?t=week&limit=24"
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
            console.log(post.data.url,typeof(post.data.url));
            output+=`<div class="post" onclick="console.log('${post.data.url}')">
            <img class="pic" src="${post.data.url}">
            
            </div>`;
            // document.addEventListener('click',()=>console.log('clicked'));
            
            //paste it inside post
            // <p> 
            //             <a href="https://www.reddit.com${post.data.permalink}"
            //             target="_blank">
            //             ${post.data.title}
            //         </a>
            //         Posted by ${post.data.author}
            //         </p>
            //     <button class="btn" onclick="dwnld('${post.data.url}')">
            //         Download
            //     </button>
            
            
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
