  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.exercises');
 

  function addItem(e){

    e.preventDefault(); //prevents refreshing of page
    const text = (this.querySelector('[name=item]')).value;
    const item = {
      text 
    };
    items.push(item); //saving our submits
    populateList(items, itemsList);
    this.reset();
  }

  function populateList(exs = [], exsList){
    exsList.innerHTML = exs.map((ex, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${ex.done ?
          'checked' : ''} /> 
          <label for="item${i}">${ex.text}</label>
        </li>
      `;
    }).join('');
  }
addItems.addEventListener('submit', addItem);

populateList(items, itemsList);