const input_element = document.querySelector(".input");
const output_operation_element = document.querySelector(".operation .value");
const output_result_element = document.querySelector(".result .value");

let calculator_buttons = [
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },{
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    },,{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    }
];

let data = {
    operation : [],
    result : [],
}

function buttoncreator() {
    let rowbtns = 0;
    const calc_btn_row = 4;
    calculator_buttons.forEach((button,index)=>{
        if ( rowbtns % calc_btn_row === 0 ){
            input_element.innerHTML += `<div class = "row"></div>`
        }
        const row = document.querySelector(".row:last-child");
        row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;
        rowbtns++;
    });

}
buttoncreator();

input_element.addEventListener("click",event => {
    const target_buttons = event.target;

    calculator_buttons.forEach( button => {
        if (button.name == target_buttons.id) {calculator(button);}
    });
});

function calculator(button){
    if(button.type == "operator"){
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    }
   else if (button.type == "number"){
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    }
   else if(button.type == "key"){
       if(button.name == "delete"){
           data.operation.pop();
           data.result.pop();
       }
       else if (button.name == "clear"){
           data.result = [];
           data.operation = [];
           output_result_element.innerHTML = 0;
       }
    }
   else if (button.type == "calculate"){
       let result_tot = data.result.join("");
       data.operation = [];
       data.result = [];
       let final_result;
       try {
           final_result = eval(result_tot);
       } catch (error) {
          if( error instanceof SyntaxError){
              final_result = "Error!";
              output_result_element.innerHTML = final_result;
              return;
          }
       }

       final_result = calculate(final_result);
       data.operation.push(final_result);
       data.result.push(final_result);
       output_result_element.innerHTML = final_result;
       return;
    }
    updateOutputOperation( data.operation.join('') );
}

function updateOutputOperation(operation){
    output_operation_element.innerHTML = operation;
}
const max_output_length = 10;
const precision_length = 5;

function count_num(num){
    return num.toString().length;
}
function float_num(num){
    return num % 1 != 0;
}

function calculate(results){
    let result_num =  count_num(results);
    if(result_num > max_output_length) {
        if(float_num(results)){
            const result_int = parseInt(results);
            const result_int_length = count_num(result_int);

            if(result_int_length > max_output_length){
                return results.toPrecision(precision_length);
            }
            else {
                const digit_num = max_output_length - result_int_length;
                return results.toFixed(digit_num);

            }
        }
        else {
            return results.toPrecision(precision_length);
        }
    }
    else {
        return results;
    }
}