(function()
{
let btn=document.querySelector("#Myfirstbutton");
let apath=document.querySelector(".path");
let container=document.querySelector("#container");
let template=document.querySelector("#Mytemplate");
let breadCrumb=document.querySelector("#BreadCrumb");
let cfid=-1;
let fid=-1;
let folders=[];
btn.addEventListener("click",addFolder);
apath.addEventListener("click",navigateBreadCrumb);
function navigateBreadCrumb()
{
let fname=this.innerHTML;
let cfid=this.getAttribute("fid");

container.innerHTML="";

    folders.filter(f=>f.pid==cfid).forEach(f=>{
        addFolderHTMl(f.name,f.id,f.pid)
    })
    while(this.nextSibling)
    {
        this.parentNode.removeChild(this.nextSibling);
    }
}

function spanView()
{
    let divFolder=this.parentNode;
    let divName=divFolder.querySelector("div[purpose='name']");
    cfid=parseInt(divFolder.getAttribute("fid"));

    let apathtemp=template.content.querySelector(".path");
    let apath=document.importNode(apathtemp,true);
    apath.innerHTML=divName.innerHTML;
    apath.setAttribute("fid",cfid);
    apath.addEventListener("click",navigateBreadCrumb);

    apath.setAttribute("fid",cfid);
    breadCrumb.appendChild(apath);

    container.innerHTML="";

    folders.filter(f=>f.pid==cfid).forEach(f=>{
        addFolderHTMl(f.name,f.id,f.pid)
    })
}
function addFolderHTMl(fname,fid,pid)
{
let realFolder=template.content.querySelector(".folder");
let FolderCopy=document.importNode(realFolder,true);
let divname=FolderCopy.querySelector("[purpose='name']");
let spanedit=FolderCopy.querySelector("[action='edit']");
let spandelete=FolderCopy.querySelector("[action='delete']");
let spanview=FolderCopy.querySelector("[action='view']");
 
FolderCopy.setAttribute("fid",fid);
FolderCopy.setAttribute("pid",pid);
divname.innerHTML=fname;
 
spanedit.addEventListener("click",editFolder);
spandelete.addEventListener("click",deleteFolder);
spanview.addEventListener("click",spanView);
container.appendChild(FolderCopy);
}

function addFolder()
{
  let fname=prompt("Please Enter The Folder Name");
  if(!!fname)
  {
      let fidx=folders.findIndex(f=>f.name==fname);
      if(fidx==-1)
      {
      fid++;
      addFolderHTMl(fname,fid,cfid);
    folders.push(
        {
            id:fid,
            name:fname,
            pid:cfid
            
        }
    )
    saveFolder();
  }
  else{
      alert(fname+" Already Exists Please Enter New Name");
  }
}
  else{
      alert("You Have Not Entered Any Folder Name");
  }
}
function deleteFolder()
{
    let divFolder=this.parentNode;
    let divName=divFolder.querySelector("div[purpose='name']");
    let fidtbd=divFolder.getAttribute("fid");


    //ram actually
    let flag=confirm("Are You Sure You Want To Delete "+divName.innerHTML);
    if(flag==true)
    {
        let exists=folders.some(f=>f.pid==fidtbd)
        if(exists==false){
        container.removeChild(divFolder);
         //folders/
    let fidx=folders.findIndex(f=>f.id==fidtbd);
    folders.splice(fidx,1);
    //storage
    saveFolder();
    }
    else
    {
        alert("Cant delete, it has Children");
    }
}
   
}
function editFolder()
{
let divFolder=this.parentNode;
let divName=divFolder.querySelector("[purpose='name']");
let ofname=divName.innerHTML;
let fname=prompt("Enter The New Name For "+divName.innerHTML);
if(!!fname)
{  
    let exists=folders.filter(f=>f.pid==cfid).some(f=>f.name==fname);
    if(exists)
    {
        alert(fname+" name already exists")
        return;
    }
    //ram
    divName.innerHTML=fname;
    //folder
    let folder=folders.filter(f=>f.pid==cfid).find(f=>f.name==ofname);
    folder.name=fname;

    //storage
    saveFolder();
}
else
{
    alert("You have Not Entered Any Name");
}
}
function saveFolder()
{
    let fjson=JSON.stringify(folders);
    localStorage.setItem("data",fjson);
}
function loadDataFromStorage()
{
let fjson=localStorage.getItem("data");
if(!!fjson)
{
    folders=JSON.parse(fjson);
    folders.forEach(f=>
        {
            if(f.id>fid)
            {
                fid=f.id;
            }
            if(f.pid==cfid)
            addFolderHTMl(f.name,f.id,cfid);
        });

}
}
loadDataFromStorage();
})()