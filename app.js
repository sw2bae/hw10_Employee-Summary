const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var status = "manager"


console.log("Please build your team");

function employeeInput() {
    return inquirer.prompt([
        {
            type: "input",
            message: `What is your ${status}'s name ?`,
            name: "name",
        },
        {
            type: "input",
            message: `what is your ${status}'s ID ?`,
            name: "id",
        },
        {
            type: "input",
            message: `What is your ${status}'s Email ?`,
            name: "email",
        }
    ]);
};

function managerInput() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's office number ?",
            name: "officeNum",
        },
    ]);
};

function engineerInput() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your engineer's GitHub username ?",
            name: "github",
        }
    ]);
};

function internInput() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your inter's school ?",
            name: "school",
        }
    ]);
};

function teamAdd() {
    return inquirer.prompt([
        {
            type: "list",
            message: "Which type of team memeber would you like to add ?",
            name: "add",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add anymore team members",
            ]
        }
    ]);
}

async function init() {
    try {
        const employees = [];
        let employeeInfo = await employeeInput();
        const managerInfo = await managerInput();
        const manager = new Manager(employeeInfo.name, employeeInfo.id, employeeInfo.email, managerInfo.officeNum);
        employees.push(manager);
        let userSelect = await teamAdd();
        while (userSelect.add !== "I don't want to add anymore team members") {
            if (userSelect.add === "Engineer") {
                status = "engineer";
                employeeInfo = await employeeInput();
                const engineerInfo = await engineerInput();
                const engineer = new Engineer(employeeInfo.name, employeeInfo.id, employeeInfo.email, engineerInfo.github);
                employees.push(engineer);
            } else if (userSelect.add === "Intern") {
                status = "intern";
                employeeInfo = await employeeInput();
                const internInfo = await internInput();
                const intern = new Intern(employeeInfo.name, employeeInfo.id, employeeInfo.email, internInfo.school);
                employees.push(intern);
            }
            userSelect = await teamAdd();
        }
        // console.log(employees);
        const renderHTML = render(employees); 
        await writeFileAsync(outputPath, renderHTML);
        console.log("***TEAM FILE GENERATED***");
    }
    catch (err) {
        console.error(err);
    }
}

init();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


// const employeeInfo = await employeeInput();
//         const managerInfo = await managerInput();
//         const userSelect = await teamAdd();
//         console.log(employeeInfo.name);
//         console.log(employeeInfo.id);4
//         console.log(employeeInfo.email);
//         console.log(managerInfo.officeNum);
//         console.log(userSelect.add);

//         switch(userSelect.add){
//             case "Engineer":
//                 status = "engineer";
//                 const employeeInfo_engineer= await employeeInput();
//                 const engineerInfo = await engineerInput();

//                 await teamAdd();
//                 console.log(employeeInfo_engineer.name);
//                 console.log(employeeInfo_engineer.id);
//                 console.log(employeeInfo_engineer.email);
//                 console.log(engineerInfo.github);
//                 console.log(userSelect.add);

//             case "Intern":
//                 status = "intern";
//                 const employeeInfo_inter = await employeeInput();
//                 const internInfo = await internInput();

//                 await teamAdd();
//                 console.log(employeeInfo_inter.name);
//                 console.log(employeeInfo_inter.id);
//                 console.log(employeeInfo_inter.email);
//                 console.log(internInfo.school);
//                 console.log(userSelect.add);

//             case "I don't want to add anymore team members":
//                 break;            
//         }
