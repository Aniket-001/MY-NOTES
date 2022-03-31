//-----------JavaScript Code---------

const addBtn = document.querySelector('.addNote button');
const foot = document.querySelector('footer');
const addNote = document.querySelector('.addNote');

//add new notes--animation
const addIcon = document.createElement('i');
addIcon.classList.add("fa-solid");
addIcon.classList.add("fa-plus");
addBtn.insertAdjacentElement('afterbegin', addIcon);

addBtn.addEventListener('mouseover', () => {
        addIcon.className = "fa-solid fa-arrow-up";
});
addBtn.addEventListener('mouseout', () => {
        addIcon.className = "fa-solid fa-plus";
});
//----
//---adding txtbox for adding notes

const data1=[];
let count=0;
const cnt=()=>{
        if(count>0)
        document.querySelector('.msg').style.display = "none";
        else
        document.querySelector('.msg').style.display = "flex";  
}
const addTxtBox=(text='',heading='')=>{
        count++;
        cnt();

        const txtBox=document.createElement('div');
        txtBox.classList.add('txtarea');
        
        const txt=`
        <div class="operation">
        <input type="text" class="title" maxlength="13" data placeholder="Title...">
        <div class="func">
        <button class="edit"><i class="fa-solid"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
        </div>
                
        <div class="txtback"></div>
        <textarea></textarea>
        `;
        txtBox.insertAdjacentHTML('afterbegin',txt);
        
        const writeTxt=txtBox.querySelector('.txtarea textarea');
        const readTxt=txtBox.querySelector('.txtback');
        const rdWt=txtBox.querySelector('.edit i');
        const title=txtBox.querySelector('.title');
        
        if(heading!='' && text!=''){
                title.value=heading;
                writeTxt.value=text;
                readTxt.innerHTML=text;
        }
        
        if(text=='' || heading==''){
                readTxt.classList.add('hide');
                rdWt.classList.add("fa-floppy-disk");
        }
        else{
                writeTxt.classList.add('hide');
                rdWt.classList.add("fa-pen-to-square");
                title.readOnly= true;
        }

        writeTxt.addEventListener('change',(event)=>{
                const val=event.target.value;
                readTxt.innerHTML=val;
        });
        
        const edt=txtBox.querySelector('.edit');
        const del=txtBox.querySelector('.delete');
        
        
        const storeData=()=>{
                const key=title.value;
                const value=txtBox.querySelector('.txtarea textarea').value;
                if(title.getAttribute('data')==""){
                        data1.push(key);
                }
                else if(key!=title.getAttribute('data') && title.getAttribute('data')!=null){
                        const replac=title.getAttribute('data');
                        data1.splice(data1.indexOf(title.getAttribute('data')),1)
                        data1.push(title.value);
                        console.log('second');
                        localStorage.removeItem(replac);
                }
                localStorage.setItem(key,value);
                localStorage.setItem('data1',JSON.stringify(data1));
                title.setAttribute('data',title.value);
        }
        
        edt.addEventListener('click',() =>{
                writeTxt.classList.toggle('hide');
                readTxt.classList.toggle('hide');
                const edrd= function () {
                        if(rdWt.classList.contains('fa-floppy-disk')){
                                rdWt.classList.remove("fa-floppy-disk"); 
                                rdWt.classList.add("fa-pen-to-square"); 
                                title.readOnly= true;
                                if(txtBox.querySelector('textarea').value !='' && txtBox.querySelector('.title').value !=''){
                                        storeData(); 
                                }
                        }
                        else{
                                txtBox.querySelector("textarea").focus();
                                title.readOnly= false;
                                rdWt.classList.remove("fa-pen-to-square");  
                                rdWt.classList.add("fa-floppy-disk"); 
                        }
                };
                edrd();
        });
        
        
        del.addEventListener('click',() =>{
                const rmv=txtBox.querySelector('.title').value;
                count--;
                cnt();
                localStorage.removeItem(rmv);
                txtBox.remove();
                if (data1.indexOf(rmv) > -1) {
                        data1.splice(data1.indexOf(rmv), 1);
                }
                localStorage.setItem('data1',JSON.stringify(data1));
        });
        
        foot.insertAdjacentElement('beforebegin',txtBox);
}


addBtn.addEventListener('click',addTxtBox);

//--------------theme---
const dark=document.querySelector('.searchbox i');
const theme=()=>{
        if(dark.classList.contains('fa-moon')){
                dark.classList.remove('fa-moon');
                dark.classList.add('fa-sun');
                document.documentElement.style.setProperty('--lght1',"#5C5470" );
                document.documentElement.style.setProperty('--lght2',"#352F44" );
                document.documentElement.style.setProperty('--lght3',"#2A2438" );
                document.documentElement.style.setProperty('--lght4',"#5C5470" );
                document.documentElement.style.setProperty('--lght5',"#29435C" );
                document.documentElement.style.setProperty('--lght6',"black");
                document.documentElement.style.setProperty('--lght7',"rgb(219,218,218)");
                document.documentElement.style.setProperty('--lght8',"grey");
                document.querySelector('.addNote span').style.color="grey";
                dark.style.color="yellow";
        }
        else{
                dark.classList.remove('fa-sun');
                dark.classList.add('fa-moon');    
                document.documentElement.style.setProperty('--lght1',"gold" );
                document.documentElement.style.setProperty('--lght2',"aliceblue" );
                document.documentElement.style.setProperty('--lght3',"#fff" );
                document.documentElement.style.setProperty('--lght4',"rgb(145, 126, 22)" );
                document.documentElement.style.setProperty('--lght5',"#fff");
                document.documentElement.style.setProperty('--lght6',"rgb(207, 199, 151)");
                document.documentElement.style.setProperty('--lght7',"grey");
                document.documentElement.style.setProperty('--lght8',"black");
                document.querySelector('.addNote span').style.color="black";
                dark.style.color="#2c3333";
        }
}
dark.addEventListener('click',theme);


window.addEventListener('load',()=>{
        if(localStorage.getItem('data1')){
                const data2=JSON.parse(localStorage.getItem('data1'));
                if(data2.length>=1){
                        data2.forEach(element => {
                                data1.push(element);
                                addTxtBox(localStorage.getItem(element),element);
                        });
                }
        }
});

//-------------search-----
const search=document.querySelector('.search i');
search.addEventListener('click',()=>{
        document.querySelector('.search input').setAttribute("style", 
        `transform:translateX(0px);
        opacity:1;`);
        document.querySelector('.search input').focus();
});

const searchBox=document.querySelector('.search input');
searchBox.addEventListener('blur',()=>{
        if(searchBox.value==''){
                document.querySelector('.search input').setAttribute("style", 
                `opacity:0;
                transform:translateX(-50px);`);
        }
})

searchBox.addEventListener('keyup',()=>{
        input=searchBox.value.toLowerCase();
        let x = document.querySelectorAll('.txtarea');
          
        for (i = 0; i < x.length; i++) { 
            if (!x[i].querySelector('.title').value.toLowerCase().includes(input)) 
                x[i].style.display="none";
            else
                x[i].style.display="block";
        }
});
searchBox.addEventListener('search',()=>{
        searchBox.value='';
        let x = document.querySelectorAll('.txtarea');
        for (i = 0; i < x.length; i++)
                x[i].style.display="block";
});