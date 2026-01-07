// import employees from "../model/employees.json" with {type: "json"}

// const data = {}
// data.employees = employees
// import fsPromises from "fs/promises"
// import path from "path"
// import { fileURLToPath } from 'url';
// import { dirname as pathDirname } from 'path';
import Employee from "../model/Employee.js"

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = pathDirname(__filename);

// const employeesDB = {
//     employees,
//     setEmployees: function (data) { this.employees = data }
// }

const getAllEmployees = async (req, res)=> {
    const employees = await Employee.find()
    if(!employees) return res.status(204).json({"message": "No employees found."});
    return res.json({ data: employees })
}

const addEmployee = async (req, res)=> {
        const {firstName, lastName} = req.body
        // const employees = employeesDB.employees
        // console.log(employees, "employess in addEmployee")
        // const lastEmployee = employees.length > 1 ? employees[employees.length - 1] : employees[0]
        // const newEmployee = {
        //     id: (lastEmployee?.id || 0) + 1,
        //     firstName,
        //     lastName
        // }
        // employees.push(newEmployee)
        // employeesDB.setEmployees(employees)
        // await fsPromises.writeFile(
        //     path.join(__dirname, "..", "model", "employees.json"),
        //     JSON.stringify(employeesDB.employees)
        // )
        if(!firstName || !lastName) return res.status(400).json({"message": "firstName and lastName are required"});

        // const duplicate = await Employee.findOne({firstName: firstName}).exec()

          const newEmployee = {
            firstName,
            lastName
        }
        const result = await Employee.create(newEmployee)
        console.log(result, 'new employee created')
        res.status(201).json({
            "message": `New employee ${firstName} ${lastName} created!`,
            "employee": result
        })
    }

const updateEmployee = async (req, res)=> {
        const id = req.params.id
        if(!id){
            return res.status(400).json({"message": "id parameter is required"})
        }
        const {firstName, lastName} = req.body

        if (!firstName || !lastName) {
            return res.status(400).json({"message": "firstName and LastName is required"})
        }
        const employee = await Employee.findById(id)

         
       
        if (employee){
            // Object.assign(employee, {firstName, lastName})
            // console.log({employees})
            // res.json({
            //     "firstName": req.body.firstName,
            //     "lastName": req.body.lastName,
            // })

            const result = await Employee.findByIdAndUpdate(employee._id, {firstName, lastName}, {returnDocument: "after"})
            console.log(result, 'employee update result')
             return res.json({
            "message": `Employee ${employee._id} updated!`
        })
            
        }
        else {
            res.status(404).json({
                "message": "Employee not found"
            })
        }

    }

const deleteEmployee = async (req, res)=> {
        const {id} = req.params

        // const employees = data.employees
        // const employeeIndex = employees.findIndex((emp)=> emp.id === id)
        // employees.splice(employeeIndex, 1)
        // res.json({
        //     "id": req.body.id
        // })
          if(!id){
            return res.status(400).json({"message": "id parameter is required"})
        }

        const employee = await Employee.findById(id).exec();

        if(employee){
            await Employee.findByIdAndDelete(employee._id);
             return res.json({
            "message": `Employee ${employee._id} deleted!`
        })
        }else {
            return res.status(404).json({
                "message": "Employee not found"
            })
        }
    }

const getEmployee = async (req, res)=> {
        // res.json({
        //     "id": req.params.id
        // })
        const {id} = req.params
        if(!id){
            return res.status(400).json({"message": "id parameter is required"})
        }
        const employee = await Employee.findById(id)
        if(!employee) return res.status(404).json({"message": "Employee not found"})
        return res.json(employee)

    }

export default {
    getAllEmployees, addEmployee, updateEmployee, deleteEmployee, getEmployee
}