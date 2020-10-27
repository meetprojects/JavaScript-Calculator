const input_element = document.querySelector(".input");
const output_operation_element = document.querySelector(".operation .value");
const output_result_element = document.querySelector(".result .value");

const OPERATORS = ["+","-","*","/"];
const POWER = "POWER(";
const FACTORIAL = "FACTORIAL";


//ADDING SOME BUTTONS FOR SCIENTIFIC CALCULATOR
let calculator_buttons = [
    {
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },
    {
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigo_function"
    },
    {
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },
    {
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },
    {
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },
    {
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : "inv_trigo(Math.acos,",
        type : "trigo_function"
    },
    {
        name : "asin",
        symbol : "asin",
        formula : "inv_trigo(Math.asin,",
        type : "trigo_function"
    },
    {
        name : "atan",
        symbol : "atan",
        formula : "inv_trigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },
    {
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },
    {
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },
    {
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },
    {
        name : "factorial",
        symbol : "×!",
        formula : FACTORIAL,
        type : "math_function"
    },
    {
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "math_function"
    },
    {
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "math_function"
    },
    {
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "math_function"
    },
    {
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },
    {
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },
    {
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },
    {
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },
    {
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },
    {
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },
    {
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },
    {
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },
    {
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },
    {
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];


let data = {
    operation : [],
    result : []
}

//ADDING BUTTONS ON CALCULATOR 
function buttoncreator() {
    let rowbtns = 0;
    const calc_btn_row = 8;
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

//FUNCTION FOR RAD AND DEG
let RADIAN = true;

const rad_btn = document.getElementById("rad");
const deg_btn = document.getElementById("deg");

rad_btn.classList.add("active_angle");

function angleToggler(){
    rad_btn.classList.toggle("active_angle");
    deg_btn.classList.toggle("active_angle");
}

// TO KNOW USER CLICK ON BUTTONS
input_element.addEventListener("click",event => {
    const target_buttons = event.target;

    calculator_buttons.forEach( button => {
        if (button.name == target_buttons.id) {calculator(button);}
    });
});

//ADDING OPERATION FROM CLICK
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
       else if(button.name == "rad"){
           RADIAN = true;
           angleToggler();
       }
       else if (button.name == "deg"){
           RADIAN = false;
           angleToggler();
       }
    }
    
     else if (button.type == "math_function") {

        if (button.name == "factorial") {
            data.operation.push("!");
            data.result.push(button.formula);
        } else if (button.name == "square") {
            data.operation.push("^(");
            data.result.push(button.formula);
            data.operation.push("2)");
            data.result.push("2)");
        }
        else if (button.name == "power")
        {
            data.operation.push("^(");
            data.result.push(button.formula);

        }
        else {
            data.operation.push(button.symbol + "(");
            data.result.push(button.formula + "(");
        }
    }
    else if (button.type == "trigo_function") {
        data.operation.push(button.symbol + "(");
        data.result.push(button.formula);
    }
    
   else if (button.type == "calculate"){
       let result_tot = data.result.join("");
       
       let final_result;
       
       let power_search = searcher(data.result,POWER);

        let factorial_search = searcher(data.result,FACTORIAL);

        const power_base = power_base_search(data.result,power_search);
        power_base.forEach( ele => {
            let toReplace = ele +  POWER;
            let replacement = "Math.pow(" + ele + ",";
            result_tot = result_tot.replace(toReplace,replacement);
        })

        const facto_base = fact_base_search(data.result,factorial_search);

        facto_base.forEach(ele => {
            result_tot = result_tot.replace(ele.toReplace, ele.replacement);
        })
       
       //CHECKING SYNTAX-ERROR
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
       ans = final_result;
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

//TO FIND NUMBERS OF FACTORIAL AND POWER FROM INPUT
function searcher(array,keyword){
    let arr_search = [];
    array.forEach((ele,index) => {
        if (ele == keyword) arr_search.push(index);
    });
    return arr_search;
}
//SEARCHING POWER-BASE
function power_base_search (form_arr,pindex) {
    let pbase = [];

    pindex.forEach(power_index => {
        let pre_pindex = power_index - 1;
        let pcbase = [];
        let parenth = 0;
        while (pre_pindex >= 0) {
            if (form_arr[pre_pindex] == ")") parenth++;
            if (form_arr[pre_pindex] == "(") parenth--;
            let is_operator = false;
            OPERATORS.forEach(OPERATOR => {
                if(form_arr[pre_pindex] == OPERATOR)
                    is_operator = true;
            })

            if (is_operator && parenth == 0 || form_arr[pre_pindex] == POWER) break;

            pcbase.unshift(form_arr[pre_pindex]);
            pre_pindex--;

        }
        pbase.push(pcbase.join(""));

    })
    return pbase;
}

//SEARCHING FACTORIAL-BASE
function fact_base_search (fact_arr,findex) {
    let fbase = [];
    let fsequence = 0;

    findex.forEach(factorial_index => {
        let nex_findex = factorial_index + 1;
        let fcbase = [];
        let nex_finput = fact_arr[nex_findex];

        if (nex_finput == FACTORIAL) {
            fsequence += 1;
            return;
        }
        let first_fsequence = factorial_index - fsequence;
        let pre_findex = first_fsequence - 1;
        let parenth = 0;
        while (pre_findex >= 0) {
            if (fact_arr[pre_findex] == ")") parenth++;
            if (fact_arr[pre_findex] == "(") parenth--;
            let is_operator = false;
            OPERATORS.forEach(OPERATOR => {
                if (fact_arr[pre_findex] == OPERATOR)
                    is_operator = true;
            })

            if (is_operator && parenth == 0) break;


            fcbase.unshift(fact_arr[pre_findex]);
            pre_findex--;

        }


        let fcbasestr = fcbase.join('');
        const factorial = "factorial(", close_parenth = ")";
        let facto_times = fsequence + 1;
        let toReplace = fcbasestr + FACTORIAL.repeat(facto_times);
        let replacement = factorial.repeat(facto_times) + fcbasestr + close_parenth.repeat(facto_times);

        fbase.push({
            toReplace: toReplace,
            replacement: replacement
        });
        fsequence = 0;

    })
    return fbase;
}

//SEARCHING FACTORIAL VALUE
function factorial (facto_num){
    let facto_result = 1;
    //SEARCHING FACTORIAL VALUE FOR FLOAT NUMBERS
    if (facto_num % 1 != 0){
        return gamma(facto_num+1);

    }    
    else if (facto_num === 0 || facto_num === 1){
        return facto_result;
    }
    for (let i =1; i<= facto_num;i++){
        facto_result*=i;
        if (facto_result === Infinity) return Infinity;
    }
    return facto_result;

}


// PREFIXING MAXIMUM OUTPUT LENGTH
const max_output_length = 10;
const precision_length = 5;

function count_num(num){
    return num.toString().length;
}
function float_num(num){
    return num % 1 != 0;
}

// CHECKING THE ANSWER IS EXCEED THAN THE MAX-O/P-LENGTH
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

//ADDING TRIGO FUNCTIONS
function trigo(callback, angle){
    if(!RADIAN){
        angle = angle * Math.PI/180;
    }
    return callback(angle);
}
function inv_trigo(callback, value){
    let angle = callback(value);
    if(!RADIAN){
        angle = angle * 180/Math.PI;
    }
    return angle;


}

// FUNCTION TO CALCULATE THE FLOAT-FACTORIAL NUMBERS
function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
        return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
        n--;
        var x = p[0];
        for(var i = 1; i < g + 2; i++) {
            x += p[i] / (n + i);
        }
        var t = n + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}

