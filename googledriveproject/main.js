(function()
{
    let btn=document.querySelector("#Myfirstbutton")
    let divContainer=document.querySelector("#container");
    let mytemp=document.querySelector("#Mytemplate");
    let fid=0;
    let folders=[];
    btn.addEventListener("click",addFolder);
    function addFolder()
    {
        let fname=prompt("Please Enter Folder Name");
        if(!fname)
        {
            return;
        }
        fid++;
        addFolderInPage(fname,fid);
        folders.push(
            {
                id:fid,
                name:fname,
            }
        )
        persistFolders();
    }
    function DeleteFolder()
    {
        let foldercopy=this.parentNode;
        let divname=foldercopy.querySelector("[purpose='name']");
        let flag=confirm("Are You Sure You Want To Delete File "+divname.innerHTML);
            if(flag==true){
            divContainer.removeChild(foldercopy);
            let idx=folders.findIndex(f=>f.id==parseInt(foldercopy.getAttribute("fid")));
            folders.splice(idx,1);
            persistFolders();
            }  
        
    }
    function editFolder()
    {
        let foldercopy=this.parentNode;
        let divname=foldercopy.querySelector("[purpose='name']");
        let fname=prompt("Please enter the name");
            if(!fname)
            {
                return;
            }
           
            divname.innerHTML=fname;

            let folder=folders.find(f=>f.id==parseInt(foldercopy.getAttribute("fid")));
            folder.name=fname;
            persistFolders();
    }
   function persistFolders()
    {
        console.log(folders);
        let fjson=JSON.stringify(folders);
        localStorage.setItem("data",fjson);
    }
    function addFolderInPage(fname,fid)
    {
        let folder=mytemp.content.querySelector(".folder");
        let foldercopy=document.importNode(folder,true);
        let divname=foldercopy.querySelector("[purpose='name']");
        divname.innerHTML=fname;

        foldercopy.setAttribute("fid",fid);

     
        
     ///..........................edit..................
        let spanedit=foldercopy.querySelector("[action='edit']");
        spanedit.addEventListener("click",editFolder);
//delete
        let spandelete=foldercopy.querySelector("[action='delete']");
        spandelete.addEventListener("click",DeleteFolder);

        divContainer.appendChild(foldercopy);
     
     
    }
    function loadFoldersFromStorage(){
        let fjson = localStorage.getItem("data");
        if(!!fjson){
            folders = JSON.parse(fjson);
            let max=-1;
            folders.forEach(function(f){
                addFolderInPage(f.name, f.id);
                
                if(f.id>max)
                {
                    max=f.id;
                }
            })
            fid=max;
        }
    }

    loadFoldersFromStorage();
})();

//these all r dom api's