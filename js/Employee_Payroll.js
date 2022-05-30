class EmployeePayrollData{

    //getter setter method
    get id(){return this._id;}
    set id(id){
        this._id=id;
    }
    
    get name() {return this._name;}
    set name(name) {this._name=name;
    let nameRegex=RegExp('^[A-Z]{1}[a-z]{3,}$');
    if(nameRegex.test(name))
    this._name=name;
    else throw 'Name is Incorrect';
    }
    
    get profilePic(){return this._profilePic;}
    set profilePic(profilePic){
        this._profilePic=profilePic;
    }

    get gender(){return this._gender;}
    set gender(gender){
        this._gender=gender;
    }
    
    get department(){return this._department;}
    set department(department){
        this._department=department;
    }
    
    get salary(){return this._salary;}
    set salary(salary){
        this._salary=salary;
    }
    
    get note(){return this._note;}
    set note(note){
        this._note=note;
    }
    
    get startDate(){return this._startDate;}
    set startDate(startDate){
        this._startDate=startDate;
    }
    
    ///method
    toString(){
        const options={year:'numeric',month:'long',day:'numeric'};
        const empDate=!this.startDate ? "undefined": 
                     this.startDate.toLocaleDateString("en-US",options);
            return "id="+this.id+", name= "+this.name+",gender="+this.gender+
                          ", profilePic="+this.profilePic+", department="+this.department+
                         ", salary="+this.salary+" , startDate="+this.empDate+", note="+this.note;
    }
    }

    
    window.addEventListener('DOMContentLoaded',(event)=>{
        const name=document.querySelector("#name");
        const textError=document.querySelector('.text-error');
        name.addEventListener('input',function(){
            if(name.value.length==0){
                textError.textContent="";
                return;
            }
            try{
                (new EmployeePayrollData()).name=name.value;
                textError.textContent="";
            }catch(e){
                textError.textContent=e;
             }
        });

    const salary=document.querySelector("#salary");
    const output=document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input',function() {
        output.textContent=salary.value;
       }); 
    });
    
    const save = () =>{
        try{
            let employeePayRollData=createEmployeePayroll();
        } catch (e){
            return;
        }
    }
    
    const createEmployeePayroll=()=>{
        let employeePayRollData=new EmployeePayrollData();
        try{
            employeePayRollData.name=getInputValueById('#name');
        }catch(e){
            setTextValue('.text-error',e);
            throw e;
        }
    employeePayRollData.profilePic=getSelectedValue('[name=profile]').pop();
    employeePayRollData.gender=getSelectedValue('[name=gender]').pop();
    employeePayRollData.department=getSelectedValue('[name=department]').pop();
    employeePayRollData.salary=getInputValueById('#salary');
    employeePayRollData.note=getInputValueById('#note');
    let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayRollData.date=date.parse(date);
    alert(employeePayRollData.toString());
    return employeePayRollData;        
    }

    const getSelectedValue=(propertyValue) =>{
        let allItems=document.querySelectorAll(propertyValue);
        let selItems=[];
        allItems.forEach(Items => {
            if(item.checked) selItems.push(item.value);
        });
        return selItems;
    }
    const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(EmployeePayrollData);
    }catch (e) {
        return;
    }
}
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}