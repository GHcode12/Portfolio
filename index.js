document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    let isDragging = false;
    let currentCard = null;
    let offsetX = 0;
    let offsetY = 0;

    cards.forEach(card => {
        card.addEventListener('mousedown', onMouseDown);
        card.addEventListener('mouseup', onMouseUp);
        card.addEventListener('mousemove', throttle(onMouseMove, 0));
    });

    function onMouseDown(event) {
        isDragging = true;
        currentCard = event.target;
        offsetX = event.clientX - currentCard.getBoundingClientRect().left;
        offsetY = event.clientY - currentCard.getBoundingClientRect().top;
        
    }

    function onMouseUp() {
        if (isDragging) {
            currentCard.style.display = 'none';
            let movedToLeft = false;
            let movedToRight = false;
            cards.forEach(card => {
                if (card !== currentCard) {
                    if (!movedToLeft) {
                        card.style.transition = 'left 0.5s ease-out, top 0.5s ease-out';
                        card.style.left = '10px';
                        card.style.top = '10px';
                        movedToLeft = true;
                    } else if (!movedToRight) {
                        card.style.transition = 'left 0.5s ease-out, top 0.5s ease-out';
                        card.style.left = '86.5%';
                        card.style.top = '10px';
                        movedToRight = true;
                    }
                }
            });
            currentCard.style.left = 'initial';
            currentCard.style.top = 'initial';
            handleCardSpecificActions(currentCard);
        }
        isDragging = false;
    }

    function onMouseMove(event) {
        if (!isDragging) return;
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;
        currentCard.style.left = `${x}px`;
        currentCard.style.top = `${y}px`;
    }

    function handleCardSpecificActions(card) {
        if (card.classList.contains('card1')) {
            toggleText(true); // Pass true to show boxes
            toggleText2(false);
            toggleText3(false);
        } else if (card.classList.contains('card2')) {
            toggleText(false); // Pass false to hide boxes for other cards
            toggleText2(true);
            toggleText3(false);
        }


        else if (card.classList.contains('card3')){

            toggleText(false);
            toggleText2(false);
            toggleText3(true);



        }
    }

    function toggleText(show) {
        const text = document.getElementById("slideUpText1");
        const boxes = document.querySelectorAll(".box1, .box2");
        
        if (show) {
            text.style.opacity = "1";
            text.style.scale = "100%";
            text.style.transform = "translateY(0)";
            boxes.forEach(box => box.classList.remove('hide'));
        } else {
            text.style.opacity = "0";
            text.style.scale = "0%";
            text.style.transform = "translateY(20px)";
            boxes.forEach(box => box.classList.add('hide'));
        }
    }
    function toggleText2 (show) {
        const text = document.getElementById("slideUpText2");
        const boxes = document.querySelectorAll(".box3, .box4");
        
        if (show) {
            text.style.opacity = "1";
            text.style.transform = "translateY(0)";
            text.style.transform = "scale(100%)";
            boxes.forEach(box => {
                box.classList.remove('hide');
                box.classList.remove('unclickable'); // Make it clickable
            });
        } else {
            text.style.opacity = "0";
            text.style.transform = "translateY(20px)";
            text.style.transform = "scale(0%)";
            boxes.forEach(box => {
                box.classList.add('hide');
                box.classList.add('unclickable'); // Make it unclickable
            });
        }
    }

function toggleText3(show) {
    const text = document.getElementById("slideUpText3");
    const boxes = document.querySelectorAll(".box5");
    
    if (show) {
        text.style.opacity = "1";
        text.style.transform = "translateY(0)";
        text.style.transform = "scale(100%)";
        boxes.forEach(box => {
            box.classList.remove('hide');
            box.classList.remove('unclickable'); // Make it clickable
        });
    } else {
        text.style.opacity = "0";
        text.style.transform = "translateY(20px)";
        text.style.transform = "scale(0%)";
        boxes.forEach(box => {
            box.classList.add('hide');
            box.classList.add('unclickable'); // Make it unclickable
        });
    }
}




    // Throttle function to limit the number of calls to a function within a specified time interval
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    } 
});
