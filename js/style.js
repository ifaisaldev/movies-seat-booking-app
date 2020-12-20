const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:Not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;
// functions
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat =>   [...seats].indexOf(seat)
  );

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


  const selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}
// save selected movie index price
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice)
}
// get data from local storage and populate ui
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat,index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// MOVIE  SELECT
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);    
  updateSelectedCount();                                          
});

container.addEventListener('click', e => {

  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// inital count an total set
updateSelectedCount();