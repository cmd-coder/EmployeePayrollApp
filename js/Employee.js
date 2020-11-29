let isUpdate=false;
let employeePayrollObj={};

document.addEventListener('DOMContentLoaded' , (event)=> {

    const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input',function(){
        output.textContent=salary.value;
    });

    const name=document.querySelector('#name');
    const textError=document.querySelector('.text-error');
    name.addEventListener('input', function(){
        if(name.value.length==0){
            textError.textContent="";
            return;
        }
        try{
            (new PayrollModel()).name=name.value;
            textError.textContent="";
        }
        catch(e){
            textError.textContent=e;
        }
    });

    const date=document.querySelector('#date');
    const dateError=document.querySelector('.date-error');
    date.addEventListener('input', function(){
        let startDate = getInputValueById('#day')+"-"+getInputValueById("#month")+"-"+getInputValueById('#year');
        try{
            (new PayrollModel()).startDate=new Date(startDate);
            dateError.textContent="";
        }
        catch(e){
            dateError.textContent=e;
        }
    });

    checkForUpdate();
});

const save=(event)=>{
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
        //let employeePayrollData=createEmployeePayroll();
        //createAndUpdateStorage(employeePayrollData);
    }
    catch(e){
        return;
    }
}

const createEmployeePayroll=()=>{
    let empPayrollData=new PayrollModel();
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList==undefined)
        empPayrollData.id=1;
    else
        empPayrollData.id=employeePayrollList.length+1;
    empPayrollData.name=getInputValueById('#name');
    empPayrollData.profilePic=getSelectedValues('[name=profile]').pop();
    empPayrollData.gender=getSelectedValues('[name=gender]').pop();
    empPayrollData.department=getSelectedValues('[name=department]');
    empPayrollData.salary=getInputValueById('#salary');
    empPayrollData.note=getInputValueById('#notes');
    let date=getInputValueById('#day')+" "+getInputValueById("#month")+" "+getInputValueById('#year');
    try{
        empPayrollData.startDate=new Date(date);
    }
    catch(e)
    {
        alert(e);
        return;
    }
    alert("Input Successful");
    //alert(empPayrollData.toString());
    return empPayrollData;
}

const getSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    let selItems=[];
    allItems.forEach(item=>{
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById=(id)=>{
    let value=document.querySelector(id).value;
    return value;
}

const getInputElementValue=()=>{
    let value=document.getElementById(id).value;
    return value;
}

function createAndUpdateStorage(){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData=employeePayrollList.find(empData=>empData._id==employeePayrollObj._id);
        if(!empPayrollData)
            employeePayrollList.push(createEmployeePayrollData());
        else{
            const index=employeePayrollList.map(empData=>empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1,createEmployeePayrollData(empPayrollData._id));
        }
    }
    else{
        employeePayrollList=[createEmployeePayrollData()];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));

}

const createEmployeePayrollData=(id)=>{
    let employeePayrollData=new PayrollModel();
    if(!id){
        let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
        if(!employeePayrollList)
            employeePayrollData.id=1;
        else
            employeePayrollData.id=employeePayrollList.length+1;
    }
    else{
        employeePayrollData.id=id;
    }
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const resetForm=()=>{
    document.querySelector("#name").value = "";
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    document.querySelector(".salary-output").textContent=400000;
    document.querySelector("#day").value = 01;
    document.querySelector("#month").value = 01;
    document.querySelector("#year").value = 2020;
    document.querySelector("#notes").value= "";
}

const unsetSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked=false;
    });
}

const checkForUpdate=()=>{
    const employeePayrollJson=localStorage.getItem("editEmp");
    isUpdate=employeePayrollJson?true:false;
    if(!isUpdate)
        return;
    employeePayrollObj=JSON.parse(employeePayrollJson);
    setForm();
}

const setForm=()=>{
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date=stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValues=(propertyValue, value)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        if(Array.isArray(value)){
            if(value.includes(item.value))    
                item.checked=true;}
        else if(item.value===value)
            item.checked=true;
    });
}

const setValue=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}

const setTextValue=(id,value)=>{
    let element=document.querySelector(id);
    element.textContent=value;
}

const setEmployeePayrollObject=()=>{
    employeePayrollObj._name=getInputValueById('#name');
    employeePayrollObj._profilePic=getSelectedValues('[name=profile').pop();
    employeePayrollObj._gender=getSelectedValues('[name=gender').pop();
    employeePayrollObj._department=getSelectedValues('[name=department');
    employeePayrollObj._salary=getInputValueById('#salary');
    employeePayrollObj._note=getInputValueById('#notes');
    let date=getInputValueById('#day')+" "+getInputValueById("#month")+" "+getInputValueById('#year');
    employeePayrollObj._startDate=new Date(date);
}

const setEmployeePayrollData=(employeePayrollData)=>{
    try{
        employeePayrollData.name=employeePayrollObj._name;
    }
    catch(e){
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic=employeePayrollObj._profilePic;
    employeePayrollData.gender=employeePayrollObj._gender;
    employeePayrollData.department=employeePayrollObj._department;
    employeePayrollData.salary=employeePayrollObj._salary;
    employeePayrollData.note=employeePayrollObj._note;
    try{
        employeePayrollData.startDate=new Date(Date.parse(employeePayrollObj._startDate));
    }
    catch(e){
        setTextValue('.date-error', e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId=()=>{
    let empID=localStorage.getItem("EmployeeID");
    empID=!empID?1:(parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}