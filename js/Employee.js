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
});

const save=()=>{
    try{
        let employeePayrollData=createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch(e){
        return;
    }
}

const createEmployeePayroll=()=>{
    let empPayrollData=new PayrollModel();
    empPayrollData.name=getInputValueById('#name');
    empPayrollData.profilePic=getSelectedValues('[name=profile]').pop();
    empPayrollData.gender=getSelectedValues('[name=gender]').pop();
    empPayrollData.department=getSelectedValues('[name=department]');
    empPayrollData.salary=getInputValueById('#salary');
    empPayrollData.note=getInputValueById('#notes');
    let date=getInputValueById('#year')+"-"+getInputValueById("#month")+"-"+getInputValueById('#day');
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

function createAndUpdateStorage(employeePayrollDate){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!=undefined){
        employeePayrollList.push(employeePayrollDate);
    }
    else{
        employeePayrollList=[employeePayrollDate];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));

}