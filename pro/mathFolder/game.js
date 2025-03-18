let num1, num2, correctAnswer;
    
    function generateQuestion(operation) {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        let questionText = "";
        
        switch (operation) {
            case 'addition':
                correctAnswer = num1 + num2;
                questionText = `${num1} + ${num2} = ?`;
                break;
            case 'subtraction':
                correctAnswer = num1 - num2;
                questionText = `${num1} - ${num2} = ?`;
                break;
            case 'multiplication':
                correctAnswer = num1 * num2;
                questionText = `${num1} × ${num2} = ?`;
                break;
            case 'division':
                correctAnswer = (num1 * num2) / num1;
                questionText = `${correctAnswer} ÷ ${num1} = ?`;
                break;
        }
        document.getElementById('question').innerText = questionText;
    }

    function checkAnswer(operation) {
        let userAnswer = parseFloat(document.getElementById('answer').value);
        let feedback = document.getElementById('feedback');
        
        if (userAnswer === correctAnswer) {
            feedback.innerText = "Correct! Well done!";
            feedback.style.color = "green";
        } else {
            feedback.innerText = "Wrong! Try again.";
            feedback.style.color = "red";
        }
        
        setTimeout(() => {
            generateQuestion(operation);
            document.getElementById('answer').value = "";
            feedback.innerText = "";
        }, 2000);
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        let operation = document.title.toLowerCase().includes("addition") ? 'addition' :
                        document.title.toLowerCase().includes("subtraction") ? 'subtraction' :
                        document.title.toLowerCase().includes("multiplication") ? 'multiplication' :
                        'division';
        generateQuestion(operation);
    });