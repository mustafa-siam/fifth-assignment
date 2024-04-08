const buttons = document.querySelectorAll('.seat');
let clickCount=0;
let availableSeat=40;
let seatPrice=550;
let selectedSeats = [];

const couponCodeInput = document.getElementById('coupon-code');
const applyButton = document.getElementById('apply-btn');
const grandTotalDisplay = document.getElementById('grand-total');
const originalPrice = 0;

function changeBgColor(event) {
  const clickedBtn = event.target;
  const currentColor = clickedBtn.style.backgroundColor;
  
    if (currentColor === 'rgb(29, 209, 0)') {
    clickedBtn.style.backgroundColor = '';
    if (clickCount > 0) {
      clickCount = clickCount - 1;
      availableSeat++;
      const seatIndex = selectedSeats.indexOf(clickedBtn.dataset.seat);
      if (seatIndex !== -1) {
        selectedSeats.splice(seatIndex, 1);
      }
    } else {
      clickCount = 0;
    } 
  }
   else {
    if (clickCount >= 4) {
      alert("You can buy a maximum of 4 tickets at once.");
      return;
    }
    clickedBtn.style.backgroundColor = '#1DD100';
    clickCount++;
    availableSeat--;
    selectedSeats.push(clickedBtn.dataset.seat);
  }
  const countarea = document.getElementById('seat-count');
  countarea.innerText = clickCount;
  const availableseat=document.getElementById('available-seat')
  availableseat.innerText=availableSeat
  const totalcost=document.getElementById('total-cost');
  const ticketCost=clickCount*seatPrice
  totalcost.innerText=ticketCost

  if (clickCount === 1) {
    document.getElementById('first-selected-seats').innerText = clickedBtn.dataset.seat;
  } else if (clickCount === 2) {
    document.getElementById('second-selected-seats').innerText = clickedBtn.dataset.seat;
  } else if (clickCount === 3) {
    document.getElementById('third-selected-seats').innerText = clickedBtn.dataset.seat;
  } else if (clickCount === 4) {
    document.getElementById('fourth-selected-seats').innerText = clickedBtn.dataset.seat;
  }


  applyButton.addEventListener('click', function() {
    const enteredCode = couponCodeInput.value.toUpperCase();
    let discountApplied = false;
    let discountAmount = 0;
    if (clickCount < 4) {
      alert('Minimum 4 tickets must be selected to apply discount.');
      return; // Exit the function early if conditions are not met
    }
    if (clickCount === 4) {
      if (enteredCode === 'NEW15') {
        discountApplied = true;
        discountAmount = ticketCost * 0.15;
      } else if (enteredCode === 'COUPLE20') {
        discountApplied = true;
        discountAmount = ticketCost * 0.2;
      } else {
        alert('Invalid coupon code!');
      }
    } else {
      alert('Minimum 4 tickets required to apply discount!');
    }
  
    if (discountApplied) {
      discountedPrice = ticketCost - discountAmount;
      grandTotalDisplay.innerText = `BDT ${discountedPrice.toFixed(2)}`;

    }
  });
  const nextBtn = document.getElementById('nextBtn');
  const phoneNumberInput = document.getElementById('tel');
  
  nextBtn.addEventListener('click', function(event) {
    
    event.preventDefault();
  
    if (clickCount<1) {
      alert('Please select at least one seat.');
      return;
    }
   if (phoneNumberInput.value.trim() === '') {
      alert('Please enter your phone number.');
      return;
    }
    const firstPart=document.getElementById('first-part')
    firstPart.classList.add('hidden')
     document.querySelector('.background').classList.remove('hidden');
  });
}
buttons.forEach(button => {
  button.addEventListener('click', changeBgColor);
});

