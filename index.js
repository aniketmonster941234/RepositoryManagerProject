var currIndex=0;
var windowSize=9;
var low=1;
var high=9;
var mid=1;
var totalPageCount=0;
var itemsDisplayed=0;
var itemsPerPage=10;
var previousActiveElement=null;
var data=[];
function getAllData(){
    const res= fetch("https://api.github.com/users/TheAlgorithms/repos");
    return res;
}
// A $( document ).ready() block.
document.addEventListener("DOMContentLoaded", ()=> {
  // Code to be executed when the DOM is ready
    getAllData().then((datareceived)=>{
        return datareceived.json().then((res)=>{
            data=res;
            totalPageCount=Math.ceil(data.length/itemsPerPage);
            renderData(currIndex,data);
            itemsDisplayed=itemsPerPage;
            renderPagination(1);
            disableOlderNewerButton();
        });
    });
     
});

function renderData(startIndex,data)
{
    
    let mainContent=document.getElementById("mainContent");
    if(mainContent.hasChildNodes())
    {
        mainContent.innerHTML='';
    }
    for(let i=startIndex; i<startIndex+itemsPerPage;i++)
    {
        if(i<data.length-1 && i>=0)
        {
            let repoDiv=document.createElement("div");
            repoDiv.className="repoContainer"; 
            let titleName=document.createElement("div");
            titleName.className="titleName";
            let h4=document.createElement("h4");
            h4.innerText=data[i].name;
            titleName.appendChild(h4);
            let description=document.createElement("div");
            description.className="description"
            description.innerText=data[i].description;
            let topicContainer=document.createElement("div");
            topicContainer.className="topicContainer";
            let topics=data[i].topics;
            for(let j=0;j<topics.length;j++)
            {
                let topic=document.createElement("div");
                topic.className="topic";
                topic.innerText=topics[j];
                topicContainer.appendChild(topic);

            }
            repoDiv.appendChild(titleName);
            repoDiv.appendChild(description);
            repoDiv.appendChild(topicContainer);
            mainContent.appendChild(repoDiv); 
        }
    }
    
    
}

function previousClicked(e)
{
    let newBtn2=document.getElementById("newBtn2");
    newBtn2.style.color = "black";
    let oldBtn2=document.getElementById("oldBtn2");
    oldBtn2.style.color = "rgb(11, 146, 236)";
    currIndex-=itemsPerPage;
    itemsDisplayed-=itemsPerPage;
    renderData(currIndex,data);
    mid--;
    renderPagination(mid);
    disableOlderNewerButton();
}

function nextClicked(e)
{
    currIndex+=itemsPerPage;
    itemsDisplayed+=itemsPerPage;
    let newBtn2=document.getElementById("newBtn2");
    newBtn2.style.color = "rgb(11, 146, 236)";
    let oldBtn2=document.getElementById("oldBtn2");
    oldBtn2.style.color = "black";
    renderData(currIndex,data);
    mid++;
    renderPagination(mid);
    disableOlderNewerButton();
}

function disableOlderNewerButton()
{
    if(itemsDisplayed>=data.length)
    {
        let newBtn1= document.getElementById("newBtn1");
            newBtn1.disabled = true;
            newBtn1.style.opacity=0.4;
        let newBtn2=document.getElementById("newBtn2");
            newBtn2.disabled = true;
            newBtn2.style.opacity=0.4;
    }else{
        let newBtn1= document.getElementById("newBtn1");
            newBtn1.disabled = false;
            newBtn1.style.opacity=1;
        let newBtn2=document.getElementById("newBtn2");
            newBtn2.disabled = false;
            newBtn2.style.opacity=1;
    }
    if(itemsDisplayed<=itemsPerPage)
    {
        let oldBtn1= document.getElementById("oldBtn1");
            oldBtn1.disabled = true;
            oldBtn1.style.opacity=0.4;
        let oldBtn2=document.getElementById("oldBtn2");
            oldBtn2.disabled = true;
            oldBtn2.style.opacity=0.4;
    }else{
        let oldBtn1= document.getElementById("oldBtn1");
            oldBtn1.disabled = false;
            oldBtn1.style.opacity=1;
        let oldBtn2=document.getElementById("oldBtn2");
            oldBtn2.disabled = false;
            oldBtn2.style.opacity=1;
    }
}

function renderPagination(numberActive)
{
    
    let pagination=document.getElementById("pagination");
    if(pagination.hasChildNodes())
    {
        pagination.innerHTML="";
    }
    let oldBtn1=document.createElement("button");
    oldBtn1.id="oldBtn1";
    oldBtn1.className="pageIndex";
    oldBtn1.innerText="<<";
    oldBtn1.addEventListener("click",previousClicked);
    pagination.appendChild(oldBtn1);
    if(mid>high)
    {
        high++;
        low++;
    }else if(mid<low && low>1)
    {
        low--;
        high--;
    }
    for(let i=low;i<high+1;i++)
    {
        let btn=document.createElement("button");
        btn.className="pageIndex";
        btn.innerText=i;
        if(numberActive!=undefined && i==numberActive)
        {
            btn.classList.add("active");
        }
        btn.addEventListener("click",numberClicked.bind(this));
        pagination.appendChild(btn);

    }
    let newBtn1=document.createElement("button");
    newBtn1.id="newBtn1";
    newBtn1.className="pageIndex";
    newBtn1.innerText=">>";
    newBtn1.addEventListener("click",nextClicked);
    pagination.appendChild(newBtn1);


}

function numberClicked(event)
{
    //renderPagination();
    
    if(Number(event.target.innerText)<=totalPageCount)
    {
        if(previousActiveElement==null)
        {
            previousActiveElement=event;
            event.target.className="pageIndex active";
        }else{
            previousActiveElement.target.className="pageIndex"
            previousActiveElement=event;
            event.target.className="pageIndex active";
        }
        currIndex=Number((event.target.innerText)-1)*itemsPerPage;
        itemsDisplayed=Number((event.target.innerText))*itemsPerPage;
        mid=Number(event.target.innerText);
        renderData(currIndex,data);
        renderPagination(Number(event.target.innerText));
        disableOlderNewerButton();
    }   
}

