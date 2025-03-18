const canvas = document.getElementById("drawingCanvas");
        const ctx = canvas.getContext("2d");
        const shapeSelector = document.getElementById("shapeSelector");
        const feedback = document.getElementById("feedback");
        let drawing = false;
        let points = [];
        
        canvas.addEventListener("mousedown", (e) => {
            drawing = true;
            points = [[e.offsetX, e.offsetY]];
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        });

        canvas.addEventListener("mousemove", (e) => {
            if (!drawing) return;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = "#008080";
            ctx.lineWidth = 4;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#008080";
            ctx.stroke();
            points.push([e.offsetX, e.offsetY]);
        });

        canvas.addEventListener("mouseup", () => {
            drawing = false;
            validateShape();
        });

        function validateShape() {
            if (points.length < 10) {
                feedback.textContent = "❌ Incomplete Shape. Try again!";
                feedback.className = "feedback incorrect";
                return;
            }

            let detectedShape = "Unknown";
            const bounds = {
                xMin: Math.min(...points.map(p => p[0])),
                xMax: Math.max(...points.map(p => p[0])),
                yMin: Math.min(...points.map(p => p[1])),
                yMax: Math.max(...points.map(p => p[1]))
            };
            const width = bounds.xMax - bounds.xMin;
            const height = bounds.yMax - bounds.yMin;
            
            if (width > 50 && height > 50) {
                if (Math.abs(width - height) < 20) {
                    detectedShape = "Square";
                } else if (width > height) {
                    detectedShape = "Rectangle";
                } else {
                    detectedShape = "Triangle";
                }
            }

            if (detectedShape === shapeSelector.value) {
                feedback.textContent = "✅ Correct Shape!";
                feedback.className = "feedback correct";
                document.body.style.backgroundColor = "#d4edda";
                setTimeout(() => {
                    document.body.style.backgroundColor = "#f0f8ff";
                }, 3000);
            } else {
                feedback.textContent = "❌ Incorrect Shape. Try again!";
                feedback.className = "feedback incorrect";
            }
        }
        
        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            feedback.textContent = "";
            feedback.className = "feedback";
            points = [];
        }