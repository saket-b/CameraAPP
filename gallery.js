
let backBtn = document.querySelector(".back");
backBtn.addEventListener("click", ()=>{
    location.assign("./index.html")
});


setTimeout(()=>{

if( db)
{
    let imageDBTRansaction = db.transaction("image", 'readonly');

    let imageStore = imageDBTRansaction.objectStore("image");
    let imageRquest = imageStore.getAll();

    imageRquest.onsuccess=()=>{

        let imageresult = imageRquest.result;
        let galleryCont = document.querySelector(".gallery-cont");

        imageresult.forEach(( imgobj) => {
            let imageElem = document.createElement("div");
            imageElem.setAttribute("class", "media-cont");
            imageElem.setAttribute("id", imgobj.id);

            let url = imgobj.url;

            imageElem.innerHTML =`
            <div class= "media>
            <img src = "${url}"/>
            </div>
            <div class = "delete action-btn" > DELETE</div>
            <div class = "download action-btn">DOWNLOAD</div>
            `

            galleryCont.appendChild(imageElem);


            let deleteBtn = imageElem.querySelector(".delete");
            deleteBtn.addEventListener("click", deleteListener);

            let downloadBtn = imageElem.querySelector(".download");
            downloadBtn.addEventListener("click", downloadListener);
            
        });
    }


    let videoDBTRansaction = db.transaction("video", 'readonly');

    let videoStore = videoDBTRansaction.objectStore("video");
    let videoRquest = videoStore.getAll();

    videoRquest.onsuccess=()=>{

        let videoresult = videoRquest.result;
        let galleryCont = document.querySelector(".gallery-cont");

        videoresult.forEach(( videoObj) => {
            let videoElem = document.createElement("div");
            videoElem.setAttribute("class", "media-cont");
            videoElem.setAttribute("id", videoObj.id);

            let url = videoObj.url;

            videoElem.innerHTML =`
            <div class= "media>
            <img src = "${url}"/>
            </div>
            <div class = "delete action-btn" > DELETE</div>
            <div class = "download action-btn">DOWNLOAD</div>
            `

            galleryCont.appendChild(videoElem);


            let deleteBtn = videoElem.querySelector(".delete");
            deleteBtn.addEventListener("click", deleteListener);

            let downloadBtn = videoElem.querySelector(".download");
            downloadBtn.addEventListener("click", downloadListener);
            
        });
    }
}

}, 100);



function deleteListener(e)
{

    let id = e.target.parentElement.getAttribute("id");
    let type = id.split("-")[0];
    console.log(type);

    if( type == "vid")
    {
        let videoDBTRansaction = db.transaction("viedo", "readwrite");
        let videoStore          = videoDBTRansaction.objectStore("video");
        videoStore.delete(id);
    }
    else if( type == "img")
    {

        let imgDBTRansaction = db.transaction("image", "readwrite");
        let imgStore          = imgDBTRansaction.objectStore("image");
        imgStore.delete(id);
    }

    e.target.parentElement.remove();
    

}

function downloadListener(e) {

    let id = e.target.parentElement.getAttribute("id");
    let type = id.slit("-")[0];

    if( type == "vid")
    {
        let videoDBTRansaction = db.transaction("viedo", "readonly");
        let videoStore          = videoDBTRansaction.objectStore("video");
        let videoRequest        = videoStore.get(id);

        videoRequest.onsuccess= ()=>{
            let videoresult = videoRequest.result;
            let url = URL.createObjectURL(videoresult.blobData);

            let a =document.createElement("a");
            a.href =url;
            a.download = "video.mp4";
            a.click();
        }
    }

    if( type == "img")
    {
        let imageDBTRansaction = db.transaction("image", "readonly");
        let imageStore          = imageDBTRansaction.objectStore("image");
        let imageRequest        = imageStore.get(id);

        imageRquest.onsuccess = () => {

            let imageResult = imageRquest.result;
            let imageURL    = imageResult.url;
            let a = document.createElement("a");
            a.href = imageURL;
            a.download = "pic.png";
            a.click();

        };
    }
    
}